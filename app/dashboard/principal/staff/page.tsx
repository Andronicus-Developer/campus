"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  AlertTriangle,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  DoorOpen,
  Eye,
  GraduationCap,
  KeyRound,
  Landmark,
  Lock,
  Mail,
  Phone,
  PlusCircle,
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
  INITIAL_STAFF,
  getStoredStaff,
  confirmStaffInStorage,
  rejectStaffInStorage,
} from "@/lib/staff-data";
import {
  confirmStaffAppointment,
  rejectStaffAppointment,
} from "@/lib/actions/staff-confirmation";

interface LeaveRequest {
  id: string;
  staffName: string;
  role: string;
  dates: string;
  reason: string;
  substituteTeacher: string;
  periodsCovered: string;
  status: "pending" | "approved" | "rejected";
}

const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: "leave-1",
    staffName: "Mrs. Grace Okon",
    role: "Senior Biology Faculty",
    dates: "Feb 23 - Feb 25 (3 Days)",
    reason: "Medical appointment & recuperation",
    substituteTeacher: "Mr. Emmanuel Peters (Biology cover)",
    periodsCovered: "6 Periods in SSS 1 & 2",
    status: "pending",
  },
  {
    id: "leave-2",
    staffName: "Mr. Friday Eze",
    role: "Commerce & Accounting",
    dates: "March 02 (1 Day)",
    reason: "ICAN Professional Development Conference",
    substituteTeacher: "Mrs. Angela Nnamdi (Bursary guest session)",
    periodsCovered: "3 Periods in SSS 2 Commercial",
    status: "approved",
  },
];

export default function PrincipalStaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"roster" | "workload" | "leaves" | "appraisal">("roster");
  const [filter, setFilter] = useState<"all" | "pending" | "teacher" | "bursar">("all");
  const [reviewStaff, setReviewStaff] = useState<StaffMember | null>(null);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(INITIAL_LEAVES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const loadStaff = () => {
      setStaff(getStoredStaff());
    };
    loadStaff();
    window.addEventListener("campus360:staff-updated", loadStaff);
    return () => window.removeEventListener("campus360:staff-updated", loadStaff);
  }, []);

  const handleConfirm = async (staffMember: StaffMember) => {
    const updated = confirmStaffInStorage(staffMember.id, "Dr. Evelyn Peters (Principal)");
    setStaff(updated);
    setReviewStaff(null);

    try {
      await confirmStaffAppointment({
        staffId: staffMember.id,
        principalName: "Dr. Evelyn Peters (Principal)",
      });
    } catch {
      // Local fallback
    }

    showToast(
      `Appointment Confirmed: ${staffMember.name} authorized as active ${staffMember.role.toUpperCase()}.`
    );
  };

  const handleReject = async (staffMember: StaffMember, reason: string) => {
    const updated = rejectStaffInStorage(staffMember.id, reason);
    setStaff(updated);
    setReviewStaff(null);

    try {
      await rejectStaffAppointment({
        staffId: staffMember.id,
        reason,
      });
    } catch {
      // Local fallback
    }

    showToast(`Appointment Returned: ${staffMember.name} sent back to School Admin for revision.`);
  };

  const handleApproveLeave = (id: string, name: string) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "approved" } : l))
    );
    showToast(`Leave and substitution cover approved for ${name}.`);
  };

  const pendingStaff = staff.filter((s) => s.confirmationStatus === "pending");

  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.staffId.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.designation.toLowerCase().includes(search.toLowerCase());

    if (filter === "pending") return matchesSearch && s.confirmationStatus === "pending";
    if (filter === "teacher") return matchesSearch && s.role === "teacher";
    if (filter === "bursar") return matchesSearch && s.role === "bursar";
    return matchesSearch;
  });

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
                  Section C · Faculty Supervision &amp; Staff Administration
                </span>
                <span className="font-mono text-xs text-ink-muted">{staff.length} Faculty Members</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Instructional Staff &amp; Leadership Oversight</h2>
              <p className="text-xs text-ink-muted max-w-3xl">
                Supervise teaching workloads, review Form Master and classroom duties, approve emergency leaves with cover teachers, and exercise executive sign-off confirming newly appointed teachers and bursars.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs font-bold text-emerald-600">
                {staff.filter((s) => s.status === "Active").length} / {staff.length} Confirmed Active
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("roster")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "roster"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Staff Roster &amp; Appointments ({staff.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("workload")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "workload"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Workloads &amp; Duty Allocations
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("leaves")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "leaves"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Leaves &amp; Substitute Cover ({leaves.filter((l) => l.status === "pending").length})
              </button>
            </div>

            {/* Confidentiality Callout */}
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs text-ink-muted">
              <Lock className="size-3.5 text-amber-600" />
              <span>Confidential HR payroll records strictly restricted to Bursar &amp; Owner</span>
            </div>
          </div>
        </div>

        {/* TAB 1: STAFF ROSTER & EXECUTIVE APPOINTMENT CONFIRMATION */}
        {activeTab === "roster" && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="rounded-3xl border border-line bg-surface p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    filter === "all" ? "bg-primary text-white" : "bg-surface-raised text-ink-muted hover:text-ink"
                  }`}
                >
                  All ({staff.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("pending")}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    filter === "pending"
                      ? "bg-amber-600 text-white"
                      : "bg-amber-50 text-amber-800 border border-amber-200"
                  }`}
                >
                  <Clock className="size-3.5 text-amber-600 animate-pulse" />
                  <span>Pending Confirmation ({pendingStaff.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("teacher")}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    filter === "teacher" ? "bg-primary text-white" : "bg-surface-raised text-ink-muted hover:text-ink"
                  }`}
                >
                  Teachers ({staff.filter((s) => s.role === "teacher").length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("bursar")}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                    filter === "bursar" ? "bg-primary text-white" : "bg-surface-raised text-ink-muted hover:text-ink"
                  }`}
                >
                  Bursars ({staff.filter((s) => s.role === "bursar").length})
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 size-4 text-ink-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search staff, ID, department..."
                  className="w-full rounded-xl border border-line bg-surface-raised pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Pending Alert banner */}
            {pendingStaff.length > 0 && filter !== "pending" && (
              <div className="rounded-3xl border-2 border-amber-300 bg-amber-50/70 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-amber-200 text-amber-800">
                    <Clock className="size-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-amber-950">
                      {pendingStaff.length} Candidate Appointment(s) Awaiting Executive Confirmation
                    </h4>
                    <p className="text-xs text-amber-800/90 mt-0.5">
                      Newly onboarded faculty registered by School Admin require Tier-1 Principal authorization before their active duty is enabled.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFilter("pending")}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-700 active:scale-95"
                >
                  Review Pending Candidates
                </button>
              </div>
            )}

            {/* Staff Roster Table */}
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                      <th className="pb-3 font-bold uppercase">Staff Member</th>
                      <th className="pb-3 font-bold uppercase">Staff ID</th>
                      <th className="pb-3 font-bold uppercase">Role &amp; Department</th>
                      <th className="pb-3 font-bold uppercase">Duties &amp; Classes</th>
                      <th className="pb-3 font-bold uppercase">Qualifications</th>
                      <th className="pb-3 font-bold uppercase">Confirmation Status</th>
                      <th className="pb-3 font-bold uppercase text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-soft">
                    {filteredStaff.map((s) => (
                      <tr key={s.id} className="hover:bg-surface-raised transition-colors">
                        <td className="py-3.5">
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex size-8 items-center justify-center rounded-full font-mono text-xs font-bold ${
                                s.role === "bursar"
                                  ? "bg-amber-100 text-amber-800"
                                  : s.role === "admin"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {s.firstName[0]}
                              {s.lastName[0]}
                            </div>
                            <div>
                              <span className="font-bold text-ink block">{s.name}</span>
                              <span className="font-mono text-[10px] text-ink-muted">{s.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 font-mono font-bold text-primary">{s.staffId}</td>
                        <td className="py-3.5">
                          <span className="font-semibold text-ink block">{s.designation}</span>
                          <span className="text-[11px] text-ink-muted">{s.department}</span>
                        </td>
                        <td className="py-3.5">
                          {s.role === "teacher" ? (
                            <div className="space-y-0.5">
                              <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-700">
                                <DoorOpen className="size-3 text-emerald-600" />
                                {s.formClass}
                              </span>
                              <span className="block text-[11px] text-ink-muted font-mono">
                                {s.teachingSubjects.length > 0
                                  ? s.teachingSubjects.map((sub) => sub.subject).join(", ")
                                  : s.teachingLoad || "Subject Teacher"}
                              </span>
                            </div>
                          ) : (
                            <span className="font-mono text-[11px] text-ink-muted">
                              {s.teachingLoad || "Treasury Operations"}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 text-ink-soft">
                          {s.qualifications || "Academic Degree & Certified"}
                        </td>
                        <td className="py-3.5">
                          {s.confirmationStatus === "pending" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-700 border border-amber-200">
                              <Clock className="size-3 text-amber-600 animate-pulse" />
                              Pending Approval
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="size-3 text-emerald-600" />
                              Confirmed
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 text-right">
                          {s.confirmationStatus === "pending" ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => setReviewStaff(s)}
                                className="rounded-lg border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] font-semibold text-ink hover:border-primary hover:text-primary"
                              >
                                Review
                              </button>
                              <button
                                type="button"
                                onClick={() => handleConfirm(s)}
                                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1 font-mono text-[11px] font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
                              >
                                <CheckCircle2 className="size-3" />
                                <span>Confirm</span>
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setReviewStaff(s)}
                              className="rounded-lg border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] font-medium text-ink-muted hover:border-line-strong hover:text-ink"
                            >
                              Dossier
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WORKLOADS & DUTY ALLOCATIONS */}
        {activeTab === "workload" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Instructional Workload Distribution</h3>
                <p className="text-xs text-ink-muted">
                  Audits weekly teaching period allocations (Standard load: 18 - 24 periods per week) and non-teaching co-curricular roles.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-primary">All Faculty within Balanced Load</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Dr. Kenneth Obi", role: "HOD Sciences", load: 20, classes: "SSS 3 Chem, SSS 2 Chem", extra: "Lab 1 Safety Officer · STEM Club" },
                { name: "Mr. David Alabi", role: "VP Academics", load: 18, classes: "SSS 3 Further Math, SSS 2 Math", extra: "Timetable Committee Chair" },
                { name: "Mrs. Ngozi Udoh", role: "HOD Arts & Lit", load: 22, classes: "SSS 2 & 3 Literature", extra: "Debate Society Patron" },
                { name: "Mrs. Grace Okon", role: "Biology Faculty", load: 20, classes: "SSS 1 & 2 Biology", extra: "Health & Sanitation Master" },
                { name: "Mr. Friday Eze", role: "Commerce Lead", load: 19, classes: "SSS 1 - 3 Accounting", extra: "Junior Achievement Advisor" },
                { name: "Ms. Chioma Okon", role: "Junior Science Lead", load: 24, classes: "JSS 1 & 2 Basic Science", extra: "House Mistress (Blue House)" },
              ].map((w) => (
                <div key={w.name} className="rounded-2xl border border-line bg-surface-raised p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-ink">{w.name}</h4>
                      <p className="font-mono text-xs text-primary">{w.role}</p>
                    </div>
                    <span className="rounded-full bg-primary-light px-2.5 py-0.5 font-mono text-xs font-bold text-primary">
                      {w.load} Periods/wk
                    </span>
                  </div>

                  <div className="rounded-xl border border-line bg-surface p-2.5 text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-ink-muted block">Teaching Sets</span>
                    <span className="font-medium text-ink block">{w.classes}</span>
                  </div>

                  <div className="rounded-xl border border-line bg-surface p-2.5 text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-ink-muted block">Co-Curricular &amp; School Duty</span>
                    <span className="text-ink-soft block">{w.extra}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LEAVES & SUBSTITUTE COVER */}
        {activeTab === "leaves" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Staff Leave Requests &amp; Substitute Cover</h3>
                <p className="text-xs text-ink-muted">
                  Authorize academic and medical leaves with pre-arranged classroom cover so student learning is never disrupted.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-amber-700">
                {leaves.filter((l) => l.status === "pending").length} Pending Authorization
              </span>
            </div>

            <div className="space-y-3">
              {leaves.map((l) => (
                <div key={l.id} className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink text-sm">{l.staffName}</span>
                        <span className="rounded bg-primary-light px-2 py-0.5 font-mono text-[10px] font-bold text-primary">
                          {l.role}
                        </span>
                        <span className="font-mono text-xs text-ink-muted">{l.dates}</span>
                      </div>
                      <p className="text-xs text-ink-muted mt-1">Reason: <strong>{l.reason}</strong></p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-emerald-800">
                        <span className="rounded-lg bg-emerald-50 px-2 py-1 border border-emerald-200">
                          Substitute: <strong>{l.substituteTeacher}</strong>
                        </span>
                        <span className="rounded-lg bg-blue-50 px-2 py-1 border border-blue-200 text-blue-800">
                          Periods: {l.periodsCovered}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      {l.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success-light px-3 py-1 font-mono text-xs font-bold text-success-deep">
                          <CheckCircle2 className="size-3.5" />
                          Authorized
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApproveLeave(l.id, l.staffName)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
                        >
                          <CheckCircle2 className="size-3.5" />
                          <span>Authorize Leave &amp; Cover</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: STAFF CONFIRMATION DOSSIER */}
        {reviewStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <UserCheck className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">
                      Principal Executive Review: Staff Appointment
                    </h3>
                    <p className="text-xs text-ink-muted">Candidate verification and institutional authorization.</p>
                  </div>
                </div>
                <button
                  onClick={() => setReviewStaff(null)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3.5 text-xs">
                <div className="rounded-2xl border border-line bg-surface-raised p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-ink">{reviewStaff.name}</h4>
                      <p className="font-mono text-xs text-primary">{reviewStaff.staffId}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                        reviewStaff.role === "bursar"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {reviewStaff.role}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-ink-soft">
                    <div>
                      <span className="font-mono text-[10px] text-ink-muted block uppercase">Designation</span>
                      <span className="font-semibold text-ink">{reviewStaff.designation}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-ink-muted block uppercase">Department</span>
                      <span className="font-semibold text-ink">{reviewStaff.department}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-ink-muted block uppercase">Portal Email</span>
                      <span className="font-semibold text-ink">{reviewStaff.email}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-ink-muted block uppercase">Phone</span>
                      <span className="font-semibold text-ink">{reviewStaff.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-line bg-surface-raised p-3.5 space-y-1.5">
                  <span className="font-mono text-[10px] text-ink-muted uppercase block">
                    Institutional Governance Audit
                  </span>
                  <p className="text-ink">
                    Onboarded by: <strong>{reviewStaff.onboardedBy || "Engr. Patrick Bassey (School Admin)"}</strong>
                  </p>
                  <p className="text-ink">
                    Submission Date: <strong>{reviewStaff.onboardedAt || "Today"}</strong>
                  </p>
                  {reviewStaff.qualifications && (
                    <p className="text-ink">
                      Qualifications: <strong>{reviewStaff.qualifications}</strong>
                    </p>
                  )}
                  {reviewStaff.role === "teacher" && (
                    <p className="text-ink">
                      Assigned Form Class: <strong>{reviewStaff.formClass}</strong>
                    </p>
                  )}
                </div>

                {reviewStaff.confirmationStatus === "pending" && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-amber-900">
                    <p className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="size-4 text-amber-700" />
                      Executive Appointment Sign-Off
                    </p>
                    <p className="text-[11px] text-amber-800 mt-1 leading-relaxed">
                      By confirming this appointment, you officially formalize {reviewStaff.name}&apos;s position at Riverside International College and activate all operational and grade management permissions.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-end gap-2 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => setReviewStaff(null)}
                  className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
                >
                  Close
                </button>
                {reviewStaff.confirmationStatus === "pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleReject(reviewStaff, "Returned for administrative duty adjustment")}
                      className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-bold text-rose-600 hover:bg-rose-50 hover:border-rose-300"
                    >
                      Request Revision
                    </button>
                    <button
                      type="button"
                      onClick={() => handleConfirm(reviewStaff)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-emerald-700 active:scale-95"
                    >
                      <CheckCircle2 className="size-4" />
                      <span>Confirm &amp; Authorize Appointment</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
