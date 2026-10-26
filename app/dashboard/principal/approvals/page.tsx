"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  AlertTriangle,
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  DollarSign,
  DoorOpen,
  FileSpreadsheet,
  FileText,
  Filter,
  GraduationCap,
  KeyRound,
  Landmark,
  Layers,
  MessageSquare,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Users,
  X,
  XCircle,
} from "lucide-react";
import {
  StaffMember,
  getStoredStaff,
  confirmStaffInStorage,
  rejectStaffInStorage,
} from "@/lib/staff-data";
import {
  confirmStaffAppointment,
  rejectStaffAppointment,
} from "@/lib/actions/staff-confirmation";

interface ApprovalTask {
  id: string;
  category: "staff" | "results" | "finance" | "leave" | "attendance" | "timetable";
  title: string;
  submittedBy: string;
  department: string;
  submittedAt: string;
  summary: string;
  auditMetrics: string;
  amountUsd?: number;
  status: "pending" | "approved" | "rejected";
}

const STATIC_TASKS: ApprovalTask[] = [
  {
    id: "task-1",
    category: "results",
    title: "SSS 3 Senior WAEC Mock Broadsheet & Grade Release",
    submittedBy: "Mr. David Alabi (Head of Academics)",
    department: "Senior Secondary Faculty",
    submittedAt: "Today, 10:15 AM",
    summary: "124 candidates evaluated across 9 subjects. Audited by academic examination board. Requires executive release to Parent Portal.",
    auditMetrics: "Pass Rate: 94.2% · Distinctions: 38% · Interventions: 7 students",
    status: "pending",
  },
  {
    id: "task-2",
    category: "finance",
    title: "Academic Excellence Scholarship Concession (Student RC-2023-0184)",
    submittedBy: "Mrs. Angela Nnamdi (Bursar)",
    department: "Bursary Division",
    submittedAt: "Today, 09:30 AM",
    summary: "Annual 25% academic concession credit (US$ 475.00) for Tobi Adeleke (Olympiad gold medallist).",
    auditMetrics: "Credit: US$ 475.00 concession · Balance adjusted to US$ 1,425.00",
    amountUsd: 475.0,
    status: "pending",
  },
  {
    id: "task-3",
    category: "finance",
    title: "Science Lab Practical Reagents Requisition",
    submittedBy: "Dr. Kenneth Obi (HOD Sciences)",
    department: "Sciences Division",
    submittedAt: "Yesterday, 04:30 PM",
    summary: "Procurement of spectrophotometers and titrant reagents for mock practicals. Within Principal delegated US$ 5,000.00 ceiling.",
    auditMetrics: "Amount: US$ 2,450.00 · Budget: 69% utilized",
    amountUsd: 2450.0,
    status: "pending",
  },
  {
    id: "task-4",
    category: "leave",
    title: "Faculty Emergency Medical Leave & Substitution Cover",
    submittedBy: "Mrs. Grace Okon (Biology Senior Faculty)",
    department: "Sciences Division",
    submittedAt: "Yesterday, 02:15 PM",
    summary: "3-day medical recuperation leave. Classroom coverage arranged with Mr. Emmanuel Peters for 6 periods.",
    auditMetrics: "Periods covered: 6 lectures in SSS 1 & 2 Biology",
    status: "pending",
  },
  {
    id: "task-5",
    category: "attendance",
    title: "Official Representation Attendance Correction (RC-2023-0105)",
    submittedBy: "Mrs. Ngozi Udoh (Debate Patron)",
    department: "Arts & Humanities",
    submittedAt: "Feb 17, 2026",
    summary: "Retroactive correction from Absent to Excused for Somtochukwu Eze representing school at National Junior Debate.",
    auditMetrics: "Register: SSS 2 Commercial · Official School Duty",
    status: "pending",
  },
  {
    id: "task-6",
    category: "timetable",
    title: "Room Allocation Adjustment: Chemistry to Lab 1",
    submittedBy: "Dr. Kenneth Obi (HOD Sciences)",
    department: "Sciences Division",
    submittedAt: "Feb 17, 2026",
    summary: "Move Wednesday Period 3 & 4 SSS 3 Chemistry from Room 12 to Science Lab 1. 0 room collisions detected.",
    auditMetrics: "Conflict Radar: Clean · Affects 34 Students",
    status: "pending",
  },
];

export default function PrincipalApprovalsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [tasks, setTasks] = useState<ApprovalTask[]>(STATIC_TASKS);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const loadStaff = () => {
      setStaffList(getStoredStaff());
    };
    loadStaff();
    window.addEventListener("campus360:staff-updated", loadStaff);
    return () => window.removeEventListener("campus360:staff-updated", loadStaff);
  }, []);

  const handleTaskAction = (id: string, newStatus: "approved" | "rejected", title: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    showToast(`${newStatus === "approved" ? "Authorized" : "Declined"}: "${title}"`);
  };

  const handleConfirmStaff = async (staffMember: StaffMember) => {
    const updated = confirmStaffInStorage(staffMember.id, "Dr. Evelyn Peters (Principal)");
    setStaffList(updated);

    try {
      await confirmStaffAppointment({
        staffId: staffMember.id,
        principalName: "Dr. Evelyn Peters (Principal)",
      });
    } catch {
      // Local fallback
    }

    showToast(`Appointment Confirmed: ${staffMember.name} officially authorized into active duty.`);
  };

  const handleRejectStaff = async (staffMember: StaffMember) => {
    const reason = "Returned to School Admin for duty load revision";
    const updated = rejectStaffInStorage(staffMember.id, reason);
    setStaffList(updated);

    try {
      await rejectStaffAppointment({
        staffId: staffMember.id,
        reason,
      });
    } catch {
      // Local fallback
    }

    showToast(`Appointment Returned: ${staffMember.name} sent back to School Admin.`);
  };

  const pendingStaff = staffList.filter((s) => s.confirmationStatus === "pending");
  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const totalPending = pendingStaff.length + pendingTasks.length;

  return (
    <DashboardLayout currentRole="principal">
      <div className="space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950 px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in slide-in-from-top-3">
            <CheckCircle2 className="size-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                  Section M · Approvals &amp; Decision Management
                </span>
                <span className="font-mono text-xs text-ink-muted">Central Executive Cockpit</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">My Tasks &amp; Institutional Approvals</h2>
              <p className="text-xs text-ink-muted max-w-3xl">
                Unified executive clearinghouse for staff appointments, broadsheet releases, expenditure requisitions up to US$ 5,000.00, leave cover authorizations, and attendance corrections.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs font-bold text-primary">
                {totalPending} Action Items Pending
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4 text-xs font-semibold">
            {[
              { id: "all", label: `All Tasks (${totalPending})` },
              { id: "staff", label: `Staff Appointments (${pendingStaff.length})` },
              { id: "results", label: "Broadsheet Results" },
              { id: "finance", label: "Finance & Waivers" },
              { id: "leave", label: "Faculty Leave" },
              { id: "attendance", label: "Attendance Exceptions" },
              { id: "timetable", label: "Timetable Changes" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`rounded-xl px-3 py-1.5 transition-all ${
                  filter === tab.id
                    ? "bg-primary text-white shadow-sm font-bold"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* SECTION: STAFF APPOINTMENTS (Teachers & Bursars onboarded by School Admin) */}
        {(filter === "all" || filter === "staff") && pendingStaff.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                <UserCheck className="size-4" />
              </span>
              <h3 className="text-base font-extrabold text-ink">
                Candidate Staff Appointments Awaiting Executive Confirmation
              </h3>
            </div>

            <div className="space-y-3">
              {pendingStaff.map((staffMember) => (
                <div
                  key={staffMember.id}
                  className="rounded-3xl border-2 border-amber-300 bg-amber-50/70 p-6 shadow-sm transition-all hover:border-amber-400"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2 max-w-2xl text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                            staffMember.role === "bursar"
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : "bg-blue-100 text-blue-800 border border-blue-300"
                          }`}
                        >
                          {staffMember.role === "bursar" ? "Bursar Appointment" : "Teacher Appointment"}
                        </span>
                        <span className="font-mono text-amber-800 font-bold animate-pulse">
                          Awaiting Principal Authorization
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-ink-muted">{staffMember.department}</span>
                      </div>

                      <h4 className="text-base font-black text-ink">
                        {staffMember.name}{" "}
                        <span className="font-mono text-sm font-semibold text-primary">
                          ({staffMember.staffId})
                        </span>
                      </h4>

                      <p className="text-ink-soft">
                        {staffMember.designation} · {staffMember.department}
                        {staffMember.role === "teacher" && staffMember.formClass
                          ? ` · Form Master: ${staffMember.formClass}`
                          : ""}
                      </p>

                      <div className="pt-1 text-ink-muted">
                        Submitted by: <strong>{staffMember.onboardedBy || "Engr. Patrick Bassey (School Admin)"}</strong> ·{" "}
                        Qualifications: <strong>{staffMember.qualifications || "B.Sc / PGDE Certified"}</strong>
                      </div>
                    </div>

                    <div className="shrink-0 text-right space-y-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleRejectStaff(staffMember)}
                          className="rounded-xl border border-line bg-surface px-3 py-2 font-mono text-xs font-bold text-ink-muted hover:border-danger hover:text-danger active:scale-95"
                        >
                          Return for Revision
                        </button>
                        <button
                          type="button"
                          onClick={() => handleConfirmStaff(staffMember)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-emerald-700 active:scale-95"
                        >
                          <CheckCircle2 className="size-4" />
                          <span>Confirm Appointment</span>
                        </button>
                      </div>
                      <span className="block text-[10px] font-mono text-ink-muted">
                        Activates full system permissions
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: ACADEMIC, FINANCIAL, LEAVE, AND ATTENDANCE TASKS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-ink">
              Operational Approvals Queue
            </h3>
            <span className="font-mono text-xs text-ink-muted">
              {tasks.filter((t) => filter === "all" || t.category === filter).length} Items
            </span>
          </div>

          <div className="space-y-3">
            {tasks
              .filter((t) => filter === "all" || t.category === filter)
              .map((task) => (
                <div
                  key={task.id}
                  className="rounded-3xl border border-line bg-surface p-6 shadow-sm transition-all hover:border-primary/40"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2 max-w-2xl text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                            task.category === "results"
                              ? "bg-primary-light text-primary"
                              : task.category === "finance"
                              ? "bg-amber-100 text-amber-800"
                              : task.category === "leave"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {task.category} Sign-off
                        </span>
                        <span className="font-mono text-ink-muted">{task.submittedAt}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-ink-muted">{task.department}</span>
                      </div>

                      <h4 className="text-base font-extrabold text-ink">{task.title}</h4>
                      <p className="text-ink-soft leading-relaxed">{task.summary}</p>

                      <div className="rounded-xl border border-line-soft bg-surface-raised p-2.5 font-mono text-xs">
                        <span className="text-primary font-bold">Audit Metrics:</span> {task.auditMetrics}
                      </div>

                      <div className="text-[11px] text-ink-muted">
                        Submitted by: <strong>{task.submittedBy}</strong>
                      </div>
                    </div>

                    <div className="shrink-0 text-right space-y-2">
                      {task.status === "approved" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-light px-4 py-2 font-mono text-xs font-bold text-success-deep">
                          <CheckCircle2 className="size-4" />
                          Sign-off Authorized
                        </span>
                      ) : task.status === "rejected" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-light px-4 py-2 font-mono text-xs font-bold text-danger">
                          <XCircle className="size-4" />
                          Declined
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleTaskAction(task.id, "rejected", task.title)}
                            className="rounded-xl border border-line bg-surface-raised px-3.5 py-2 font-mono text-xs font-bold text-ink-muted hover:border-danger hover:text-danger active:scale-95"
                          >
                            Decline
                          </button>
                          <button
                            type="button"
                            onClick={() => handleTaskAction(task.id, "approved", task.title)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-primary-hover active:scale-95 transition-all"
                          >
                            <CheckCircle2 className="size-4" />
                            <span>Authorize Sign-off</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
