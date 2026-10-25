"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  DoorOpen,
  BookOpen,
  GraduationCap,
  Landmark,
  Mail,
  Phone,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
  X,
  XCircle,
  KeyRound,
} from "lucide-react";
import {
  StaffMember,
  StaffRole,
  INITIAL_STAFF,
  getStoredStaff,
  confirmStaffInStorage,
  rejectStaffInStorage,
} from "@/lib/staff-data";
import {
  confirmStaffAppointment,
  rejectStaffAppointment,
} from "@/lib/actions/staff-confirmation";

export default function PrincipalStaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "teacher" | "bursar">("all");
  const [reviewStaff, setReviewStaff] = useState<StaffMember | null>(null);
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
      // Local fallback continues
    }

    showToast(
      `Appointment Confirmed: ${staffMember.name} has been authorized as active ${staffMember.role.toUpperCase()}.`
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
      // Local fallback continues
    }

    showToast(
      `Appointment Declined: ${staffMember.name} was returned to School Admin for revision.`
    );
  };

  const pendingStaff = staff.filter((s) => s.confirmationStatus === "pending");

  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.staffId.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.designation.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    if (filter === "pending") {
      return matchesSearch && s.confirmationStatus === "pending";
    }
    if (filter === "teacher") {
      return matchesSearch && s.role === "teacher";
    }
    if (filter === "bursar") {
      return matchesSearch && s.role === "bursar";
    }
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
                  Faculty &amp; Staff Administration
                </span>
                <span className="font-mono text-xs text-ink-muted">
                  {staff.length} Academic &amp; Admin Personnel
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Institutional Staff Roster &amp; Approvals</h2>
              <p className="text-xs text-ink-muted">
                Tier-1 oversight of instructional staff and bursary officers, teaching workloads, Form Master designations, and executive appointment confirmation.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs font-bold text-success">
                {staff.filter((s) => s.status === "Active").length} / {staff.length} Confirmed Active
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  filter === "all"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                All Personnel ({staff.length})
              </button>

              <button
                onClick={() => setFilter("pending")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  filter === "pending"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                }`}
              >
                <Clock className="size-3.5 text-amber-600 animate-pulse" />
                <span>Pending Confirmation ({pendingStaff.length})</span>
              </button>

              <button
                onClick={() => setFilter("teacher")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  filter === "teacher"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                <GraduationCap className="size-3.5" />
                <span>Teachers ({staff.filter((s) => s.role === "teacher").length})</span>
              </button>

              <button
                onClick={() => setFilter("bursar")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  filter === "bursar"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                <Landmark className="size-3.5" />
                <span>Bursar / Treasury ({staff.filter((s) => s.role === "bursar").length})</span>
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 size-4 text-ink-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search staff name, ID, subject..."
                className="w-full rounded-xl border border-line bg-surface-raised pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* PENDING CONFIRMATION ALERT BANNER */}
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
                  Teachers and Bursars onboarded by School Admin require Tier-1 Principal authorization before their appointments are finalized into active duty.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFilter("pending")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-700 active:scale-95 transition-all"
            >
              <span>Review Pending Candidates ({pendingStaff.length})</span>
            </button>
          </div>
        )}

        {/* Staff Table */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                  <th className="pb-3 font-bold uppercase">Staff Member</th>
                  <th className="pb-3 font-bold uppercase">Staff ID</th>
                  <th className="pb-3 font-bold uppercase">Role &amp; Department</th>
                  <th className="pb-3 font-bold uppercase">Allocated Duties</th>
                  <th className="pb-3 font-bold uppercase">Qualifications</th>
                  <th className="pb-3 font-bold uppercase">Executive Status</th>
                  <th className="pb-3 font-bold uppercase text-right">Principal Action</th>
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
                          {s.teachingLoad || "Financial Administration"}
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
                          Pending Confirmation
                        </span>
                      ) : s.confirmationStatus === "rejected" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-rose-700 border border-rose-200">
                          <XCircle className="size-3 text-rose-600" />
                          Declined
                        </span>
                      ) : (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="size-3 text-emerald-600" />
                            Confirmed · Active
                          </span>
                          <span className="block text-[10px] text-ink-muted font-mono">
                            {s.confirmedBy ? s.confirmedBy.replace(" (Principal)", "") : "Dr. Peters"}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 text-right">
                      {s.confirmationStatus === "pending" ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setReviewStaff(s)}
                            className="rounded-lg border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] font-semibold text-ink hover:border-primary hover:text-primary transition-colors"
                          >
                            Review
                          </button>
                          <button
                            type="button"
                            onClick={() => handleConfirm(s)}
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1 font-mono text-[11px] font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all"
                          >
                            <CheckCircle2 className="size-3" />
                            <span>Confirm</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setReviewStaff(s)}
                          className="rounded-lg border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] font-medium text-ink-muted hover:border-line-strong hover:text-ink transition-colors"
                        >
                          View Dossier
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredStaff.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-xs text-ink-muted">
                      No staff members match the chosen search or filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL: CANDIDATE DOSSIER & CONFIRMATION */}
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
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
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
