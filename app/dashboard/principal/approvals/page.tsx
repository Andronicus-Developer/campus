"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Award,
  CheckCircle2,
  Clock,
  DollarSign,
  FileSpreadsheet,
  GraduationCap,
  Landmark,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
  XCircle,
  DoorOpen,
  BookOpen,
  Mail,
  KeyRound,
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

interface StaticApprovalItem {
  id: string;
  category: "results" | "waiver" | "leave";
  title: string;
  submittedBy: string;
  submittedAt: string;
  department: string;
  description: string;
  metrics: string;
  status: "pending" | "approved" | "rejected";
}

const STATIC_APPROVALS: StaticApprovalItem[] = [
  {
    id: "app-1",
    category: "results",
    title: "SSS 3 Senior Mock Broadsheet (WAEC Simulation)",
    submittedBy: "Mr. David Alabi (Head of Academics)",
    submittedAt: "Today, 10:15 AM",
    department: "Senior Secondary Faculty",
    description: "124 candidates evaluated across 9 subjects. Broadsheet audited by academic examination board.",
    metrics: "Pass Rate: 94.2% · Distinctions: 38% · Interventions: 7 students",
    status: "pending",
  },
  {
    id: "app-2",
    category: "results",
    title: "JSS 2 Term 2 Continuous Assessment (CA2) Result Batch",
    submittedBy: "Ms. Chioma Okon (Junior Head)",
    submittedAt: "Today, 09:45 AM",
    department: "Junior Secondary Faculty",
    description: "Scores for 138 junior students in Mathematics, Basic Science, and English.",
    metrics: "Average: 76.8% · Pending: None",
    status: "pending",
  },
  {
    id: "app-3",
    category: "waiver",
    title: "Academic Excellence Tuition Waiver (Student RC-2023-0184)",
    submittedBy: "Mrs. Angela Nnamdi (Bursar)",
    submittedAt: "Yesterday, 04:30 PM",
    department: "Bursary Division",
    description: "Annual 25% academic concession for Tobi Adeleke (1st position in STEM Olympiad).",
    metrics: "Credit: $46,250 concession · Term balance adjusted",
    status: "pending",
  },
  {
    id: "app-4",
    category: "leave",
    title: "Faculty Emergency Medical Leave Request",
    submittedBy: "Mrs. Grace Okon (Biology Senior Faculty)",
    submittedAt: "Yesterday, 02:15 PM",
    department: "Sciences Division",
    description: "3-day medical recuperation leave. Lesson periods covered by Mr. E. Peters.",
    metrics: "Periods delegated: 6 lectures covered across SSS 1 & 2",
    status: "pending",
  },
];

export default function PrincipalApprovalsPage() {
  const [filter, setFilter] = useState<"all" | "staff" | "results" | "waiver" | "leave">("all");
  const [staticApprovals, setStaticApprovals] = useState<StaticApprovalItem[]>(STATIC_APPROVALS);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Synchronize with stored staff
  useEffect(() => {
    const loadStaff = () => {
      setStaffList(getStoredStaff());
    };
    loadStaff();
    window.addEventListener("campus360:staff-updated", loadStaff);
    return () => window.removeEventListener("campus360:staff-updated", loadStaff);
  }, []);

  const handleStaticAction = (id: string, newStatus: "approved" | "rejected") => {
    setStaticApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  // Principal Action: Confirm Teacher or Bursar
  const handleConfirmStaff = async (staffMember: StaffMember) => {
    const updated = confirmStaffInStorage(staffMember.id, "Dr. Evelyn Peters (Principal)");
    setStaffList(updated);

    try {
      await confirmStaffAppointment({
        staffId: staffMember.id,
        principalName: "Dr. Evelyn Peters (Principal)",
      });
    } catch {
      // Local fallback continues
    }

    showToast(
      `Appointment Confirmed: ${staffMember.name} has been officially authorized as active ${staffMember.role.toUpperCase()}.`
    );
  };

  // Principal Action: Reject / Request Revision on Staff
  const handleRejectStaff = async (staffMember: StaffMember) => {
    const reason = "Qualifications or duties require administrative revision";
    const updated = rejectStaffInStorage(staffMember.id, reason);
    setStaffList(updated);

    try {
      await rejectStaffAppointment({
        staffId: staffMember.id,
        reason,
      });
    } catch {
      // Local fallback continues
    }

    showToast(
      `Appointment Returned: ${staffMember.name} was returned to School Admin for revision.`
    );
  };

  const pendingStaff = staffList.filter((s) => s.confirmationStatus === "pending");
  const confirmedStaff = staffList.filter(
    (s) => s.confirmationStatus === "confirmed" && s.confirmedBy?.includes("Principal")
  );

  return (
    <DashboardLayout currentRole="principal">
      <div className="space-y-6">
        {/* Toast Notification */}
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
                  Tier 1 Executive Clearance
                </span>
                <span className="font-mono text-xs text-ink-muted">Principal Authorization Only</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Executive Sign-Off &amp; Approvals Queue</h2>
              <p className="text-xs text-ink-muted">
                Formal executive authority to confirm Teachers &amp; Bursars onboarded by School Admin, release terminal broadsheets, and authorize fee waivers.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-line bg-surface-raised p-1.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-xl px-3 py-1.5 capitalize transition-all ${
                  filter === "all"
                    ? "bg-surface text-primary shadow-sm font-bold"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                All Queue ({pendingStaff.length + staticApprovals.filter((a) => a.status === "pending").length})
              </button>

              <button
                type="button"
                onClick={() => setFilter("staff")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all ${
                  filter === "staff"
                    ? "bg-surface text-primary shadow-sm font-bold"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                <Users className="size-3.5 text-primary" />
                <span>Staff Appointments</span>
                {pendingStaff.length > 0 && (
                  <span className="rounded-full bg-amber-500 px-1.5 py-0.2 font-mono text-[10px] text-white font-bold animate-pulse">
                    {pendingStaff.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setFilter("results")}
                className={`rounded-xl px-3 py-1.5 capitalize transition-all ${
                  filter === "results"
                    ? "bg-surface text-primary shadow-sm font-bold"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Academic Results
              </button>

              <button
                type="button"
                onClick={() => setFilter("waiver")}
                className={`rounded-xl px-3 py-1.5 capitalize transition-all ${
                  filter === "waiver"
                    ? "bg-surface text-primary shadow-sm font-bold"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Fee Waivers
              </button>

              <button
                type="button"
                onClick={() => setFilter("leave")}
                className={`rounded-xl px-3 py-1.5 capitalize transition-all ${
                  filter === "leave"
                    ? "bg-surface text-primary shadow-sm font-bold"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Faculty Leaves
              </button>
            </div>
          </div>
        </div>

        {/* SECTION: STAFF APPOINTMENTS WAITING PRINCIPAL CONFIRMATION */}
        {(filter === "all" || filter === "staff") && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <UserCheck className="size-4" />
                </span>
                <h3 className="text-base font-extrabold text-ink">
                  Staff Appointment Authorizations (Teachers &amp; Bursars)
                </h3>
              </div>
              <span className="font-mono text-xs text-ink-muted">
                {pendingStaff.length} Candidate(s) Awaiting Executive Confirmation
              </span>
            </div>

            {/* Pending Staff Cards */}
            {pendingStaff.map((staffMember) => (
              <div
                key={staffMember.id}
                className="rounded-3xl border-2 border-amber-300/80 bg-surface p-6 shadow-md transition-all hover:border-amber-400"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                          staffMember.role === "bursar"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-blue-100 text-blue-800 border border-blue-300"
                        }`}
                      >
                        {staffMember.role === "bursar" ? "Bursar Appointment" : "Teacher Appointment"}
                      </span>
                      <span className="rounded-full bg-amber-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800">
                        Pending Principal Confirmation
                      </span>
                      <span className="font-mono text-xs text-ink-muted">
                        Submitted: {staffMember.onboardedAt || "Today"}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="font-mono text-xs text-ink-muted">{staffMember.department}</span>
                    </div>

                    <div>
                      <h4 className="text-lg font-black text-ink">
                        {staffMember.name}{" "}
                        <span className="font-mono text-sm font-semibold text-primary">
                          ({staffMember.staffId})
                        </span>
                      </h4>
                      <p className="text-xs font-semibold text-ink-soft">
                        {staffMember.designation} · {staffMember.department}
                      </p>
                    </div>

                    <p className="text-xs text-ink-muted leading-relaxed">
                      Onboarded by School Admin (<strong>{staffMember.onboardedBy || "Engr. Patrick Bassey"}</strong>).
                      {staffMember.qualifications ? ` Qualifications: ${staffMember.qualifications}.` : ""}
                    </p>

                    {/* Duty / Subject breakdown */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      {staffMember.role === "teacher" ? (
                        <>
                          <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-mono text-ink">
                            <DoorOpen className="size-3.5 text-emerald-600" />
                            <span>Form Class: <strong>{staffMember.formClass}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-mono text-ink">
                            <BookOpen className="size-3.5 text-primary" />
                            <span>
                              Subjects:{" "}
                              {staffMember.teachingSubjects.length > 0
                                ? staffMember.teachingSubjects
                                    .map((s) => `${s.subject} (${s.classArm})`)
                                    .join(", ")
                                : "Awaiting Subject Assignment"}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-mono text-ink">
                          <Landmark className="size-3.5 text-amber-600" />
                          <span>Responsibility: <strong>Student Billings, Revenue &amp; Treasury Desk</strong></span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-mono text-ink">
                        <KeyRound className="size-3.5 text-emerald-600" />
                        <span>Portal Login: <strong>{staffMember.email}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Principal Confirmation Action Buttons */}
                  <div className="shrink-0 text-right space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleRejectStaff(staffMember)}
                        className="rounded-xl border border-line bg-surface-raised px-3.5 py-2 text-xs font-bold text-ink-muted hover:border-danger hover:text-danger active:scale-95 transition-all"
                      >
                        Request Revision
                      </button>
                      <button
                        type="button"
                        onClick={() => handleConfirmStaff(staffMember)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
                      >
                        <CheckCircle2 className="size-4" />
                        <span>Confirm Appointment</span>
                      </button>
                    </div>
                    <span className="block text-[10px] font-mono text-ink-muted">
                      Grants Full Operational Status
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {pendingStaff.length === 0 && filter === "staff" && (
              <div className="rounded-3xl border border-line bg-surface p-8 text-center">
                <CheckCircle2 className="mx-auto size-8 text-emerald-600" />
                <h4 className="mt-2 text-sm font-bold text-ink">All Staff Appointments Confirmed</h4>
                <p className="mt-1 text-xs text-ink-muted">
                  There are no candidate Teachers or Bursars currently awaiting Principal authorization.
                </p>
              </div>
            )}
          </div>
        )}

        {/* SECTION: ACADEMIC, WAIVER, LEAVE ITEMS */}
        {(filter === "all" || filter !== "staff") && (
          <div className="space-y-4">
            {filter === "all" && (
              <div className="flex items-center gap-2 pt-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-surface-raised text-ink">
                  <FileSpreadsheet className="size-4" />
                </span>
                <h3 className="text-base font-extrabold text-ink">
                  Academic, Financial &amp; Administrative Approvals
                </h3>
              </div>
            )}

            {staticApprovals
              .filter((item) => filter === "all" || item.category === filter)
              .map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-line bg-surface p-6 shadow-sm transition-all hover:border-primary/40"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1.5 max-w-3xl">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                            item.category === "results"
                              ? "bg-primary-light text-primary"
                              : item.category === "waiver"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {item.category === "results"
                            ? "Result Sign-off"
                            : item.category === "waiver"
                            ? "Bursary Waiver"
                            : "Staff Leave"}
                        </span>
                        <span className="font-mono text-xs text-ink-muted">{item.submittedAt}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-xs text-ink-muted">{item.department}</span>
                      </div>

                      <h3 className="text-base font-extrabold text-ink">{item.title}</h3>
                      <p className="text-xs text-ink-soft leading-relaxed">{item.description}</p>

                      <div className="rounded-xl border border-line-soft bg-surface-raised p-3 text-xs font-mono text-ink">
                        <strong className="text-primary font-bold">Audit Metrics:</strong> {item.metrics}
                      </div>

                      <span className="block text-[11px] text-ink-muted">
                        Submitted by: <strong className="text-ink">{item.submittedBy}</strong>
                      </span>
                    </div>

                    <div className="shrink-0 text-right space-y-2">
                      {item.status === "approved" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-light px-3.5 py-1.5 font-mono text-xs font-bold text-success-deep">
                          <CheckCircle2 className="size-4" />
                          Sign-off Authorized
                        </span>
                      ) : item.status === "rejected" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-light px-3.5 py-1.5 font-mono text-xs font-bold text-danger">
                          <XCircle className="size-4" />
                          Rejected
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleStaticAction(item.id, "rejected")}
                            className="rounded-xl border border-line bg-surface-raised px-3.5 py-2 text-xs font-bold text-ink-muted hover:border-danger hover:text-danger transition-colors"
                          >
                            Decline
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStaticAction(item.id, "approved")}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-primary-hover active:scale-95 transition-all"
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
        )}
      </div>
    </DashboardLayout>
  );
}
