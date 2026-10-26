"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  GraduationCap,
  Mail,
  Phone,
  Search,
  Send,
  ShieldCheck,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";

interface AttendanceCorrection {
  id: string;
  studentName: string;
  admissionNo: string;
  classArm: string;
  originalStatus: "Absent";
  requestedStatus: "Excused Absence (Official Representation)";
  reason: string;
  submittedBy: string;
  date: string;
  status: "pending" | "approved";
}

const INITIAL_CORRECTIONS: AttendanceCorrection[] = [
  {
    id: "corr-1",
    studentName: "Somtochukwu Eze",
    admissionNo: "RC-2023-0105",
    classArm: "SSS 2 Commercial",
    originalStatus: "Absent",
    requestedStatus: "Excused Absence (Official Representation)",
    reason: "Represented school in the National Junior Debate Championship in Abuja",
    submittedBy: "Mrs. Ngozi Udoh (Debate Coach)",
    date: "Feb 17, 2026",
    status: "pending",
  },
  {
    id: "corr-2",
    studentName: "Farouk Balogun",
    admissionNo: "RC-2024-0220",
    classArm: "SSS 1 Science B",
    originalStatus: "Absent",
    requestedStatus: "Excused Absence (Official Representation)",
    reason: "Certified medical hospital admission note provided by General Hospital",
    submittedBy: "Mr. Kenneth Adeleke (Form Master)",
    date: "Feb 16, 2026",
    status: "pending",
  },
];

export default function PrincipalAttendancePage() {
  const [corrections, setCorrections] = useState<AttendanceCorrection[]>(INITIAL_CORRECTIONS);
  const [activeTab, setActiveTab] = useState<"daily" | "registers" | "chronic" | "corrections">("daily");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleApproveCorrection = (id: string, name: string) => {
    setCorrections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c))
    );
    showToast(`Attendance correction authorized for ${name}. Record updated in register.`);
  };

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
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                  Section E · Attendance &amp; Punctuality Oversight
                </span>
                <span className="font-mono text-xs text-ink-muted">Term 2 · Week 8</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Institutional Attendance Radar</h2>
              <p className="text-xs text-ink-muted max-w-3xl">
                Monitor school-wide daily student attendance, supervise faculty punctuality, audit incomplete class registers, review chronic absenteeism patterns, and authorize exceptional attendance corrections.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Students Present Today</span>
                <span className="text-lg font-black text-emerald-600">802 / 842 (95.2%)</span>
              </div>
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Faculty on Duty</span>
                <span className="text-lg font-black text-primary">46 / 48 (96%)</span>
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("daily")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "daily"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Daily Pulse &amp; Day-by-Day
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("registers")}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "registers"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                <Clock className="size-3.5 text-amber-600 animate-pulse" />
                <span>Class Registers Compliance (1 Pending)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("chronic")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "chronic"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Chronic Absenteeism Radar (4)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("corrections")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "corrections"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Attendance Exceptions &amp; Corrections ({corrections.filter((c) => c.status === "pending").length})
              </button>
            </div>

            <span className="font-mono text-xs text-ink-muted">
              Teachers record registers · Principal oversees &amp; authorizes corrections
            </span>
          </div>
        </div>

        {/* TAB 1: DAILY PULSE & DAY-BY-DAY */}
        {activeTab === "daily" && (
          <div className="space-y-6">
            {/* Weekly Day-by-Day Aggregate */}
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-5">
              {[
                { day: "Monday", pct: "96.4%", present: "812 / 842", absent: "30", staff: "47 / 48" },
                { day: "Tuesday", pct: "95.8%", present: "807 / 842", absent: "35", staff: "46 / 48" },
                { day: "Wednesday (Today)", pct: "95.2%", present: "802 / 842", absent: "40", staff: "46 / 48" },
                { day: "Thursday", pct: "94.9% (Projected)", present: "800 / 842", absent: "42", staff: "48 / 48" },
                { day: "Friday", pct: "93.8% (Avg)", present: "790 / 842", absent: "52", staff: "46 / 48" },
              ].map((d, idx) => (
                <div key={d.day} className={`p-4 rounded-2xl border ${idx === 2 ? "border-primary bg-primary-light/30 shadow-sm" : "border-line bg-surface"}`}>
                  <span className="font-mono text-[10px] font-bold uppercase text-ink-muted block">{d.day}</span>
                  <span className="mt-1 font-mono text-2xl font-extrabold text-ink block">{d.pct.split(" ")[0]}</span>
                  <span className="mt-1 font-mono text-[11px] text-ink-muted block">{d.present}</span>
                  <div className="mt-2 pt-2 border-t border-line-soft flex items-center justify-between text-[10px]">
                    <span className="text-danger font-semibold">{d.absent} absentees</span>
                    <span className="font-mono text-ink-muted">Staff: {d.staff}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Division Level Comparison */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
                <span className="font-mono text-[10px] font-bold text-primary uppercase">Senior Secondary (SSS 1 - 3)</span>
                <span className="mt-2 block font-mono text-2xl font-black text-ink">96.8%</span>
                <p className="text-xs text-ink-muted mt-1">399 / 412 students present today</p>
                <div className="mt-3 h-2 w-full rounded-full bg-surface-raised overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "96.8%" }} />
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
                <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase">Junior Secondary (JSS 1 - 3)</span>
                <span className="mt-2 block font-mono text-2xl font-black text-ink">93.7%</span>
                <p className="text-xs text-ink-muted mt-1">403 / 430 students present today</p>
                <div className="mt-3 h-2 w-full rounded-full bg-surface-raised overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: "93.7%" }} />
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
                <span className="font-mono text-[10px] font-bold text-indigo-600 uppercase">Instructional Staff</span>
                <span className="mt-2 block font-mono text-2xl font-black text-ink">95.8%</span>
                <p className="text-xs text-ink-muted mt-1">46 present · 2 on authorized leave</p>
                <div className="mt-3 h-2 w-full rounded-full bg-surface-raised overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: "95.8%" }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INCOMPLETE REGISTERS RADAR */}
        {activeTab === "registers" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Morning Roll-Call Register Compliance</h3>
                <p className="text-xs text-ink-muted">
                  School policy requires all Form Masters to submit daily class registers by 09:00 AM.
                </p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 font-mono text-xs font-bold text-amber-800 border border-amber-200">
                1 Register Pending
              </span>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-amber-200 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-900">
                      Unsubmitted Register
                    </span>
                    <span className="font-bold text-ink text-sm">JSS 2 Silver (32 Students)</span>
                  </div>
                  <p className="text-xs text-ink-muted">
                    Form Master: <strong>Ms. Chioma Okon</strong> · Cutoff: 09:00 AM (Overdue by 45 mins)
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => showToast("SMS Reminder sent to Ms. Chioma Okon to finalize JSS 2 Silver roll-call.")}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-3.5 py-1.5 font-mono text-xs font-bold text-white shadow-sm hover:bg-ink-soft active:scale-95"
                  >
                    <Send className="size-3.5" />
                    <span>Nudge Teacher</span>
                  </button>
                </div>
              </div>

              {[
                { classArm: "SSS 3 Science A", teacher: "Mr. David Alabi", time: "08:18 AM", present: "34 / 34 (100%)" },
                { classArm: "SSS 3 Science B", teacher: "Dr. Kenneth Obi", time: "08:22 AM", present: "31 / 32 (96.9%)" },
                { classArm: "SSS 2 Commercial", teacher: "Mr. Friday Eze", time: "08:30 AM", present: "28 / 29 (96.5%)" },
                { classArm: "JSS 1 Gold", teacher: "Mrs. Ngozi Udoh", time: "08:15 AM", present: "30 / 32 (93.8%)" },
              ].map((c) => (
                <div key={c.classArm} className="rounded-2xl border border-line bg-surface-raised p-3.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-ink">{c.classArm}</span>
                    <span className="text-[11px] text-ink-muted ml-2">Form Master: {c.teacher}</span>
                  </div>
                  <div className="flex items-center gap-4 font-mono">
                    <span className="text-emerald-700 font-bold">{c.present}</span>
                    <span className="text-ink-muted text-[11px]">Submitted {c.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CHRONIC ABSENTEEISM RADAR */}
        {activeTab === "chronic" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-ink">Early Intervention &amp; Chronic Absenteeism Flag</h3>
                <p className="text-xs text-ink-muted">Students with &gt; 3 unexcused absences flagged for mandatory parental follow-up.</p>
              </div>
              <span className="rounded-full bg-danger-light px-3 py-1 font-mono text-xs font-bold text-danger">4 At Risk</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                    <th className="pb-3 font-bold uppercase">Student Name</th>
                    <th className="pb-3 font-bold uppercase">Class Arm</th>
                    <th className="pb-3 font-bold uppercase">Absences</th>
                    <th className="pb-3 font-bold uppercase">Form Master</th>
                    <th className="pb-3 font-bold uppercase">Guardian Phone</th>
                    <th className="pb-3 font-bold uppercase text-right">Principal Directive</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-soft">
                  {[
                    { name: "Chukwuma Obi", class: "SSS 2 Science A", absent: "4 Days", teacher: "Mr. David Alabi", phone: "+234 805 778 9900" },
                    { name: "Fatima Danjuma", class: "JSS 3 Arts B", absent: "4 Days", teacher: "Ms. Chioma Okon", phone: "+234 809 443 2211" },
                    { name: "Alabi Kehinde", class: "JSS 1 Gold", absent: "4 Days", teacher: "Mrs. N. Udoh", phone: "+234 818 900 3341" },
                    { name: "Okonkwo Emeka", class: "SSS 1 Science", absent: "4 Days", teacher: "Mr. F. Eze", phone: "+234 802 331 9904" },
                  ].map((row) => (
                    <tr key={row.name} className="hover:bg-surface-raised">
                      <td className="py-3 font-bold text-ink">{row.name}</td>
                      <td className="py-3 font-mono text-ink-muted">{row.class}</td>
                      <td className="py-3 font-mono font-bold text-danger">{row.absent}</td>
                      <td className="py-3 text-ink-muted">{row.teacher}</td>
                      <td className="py-3 font-mono text-ink">{row.phone}</td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => showToast(`Counselor inquiry call scheduled for ${row.name}`)}
                          className="rounded-lg bg-primary-light px-3 py-1 font-mono text-xs font-bold text-primary hover:bg-primary hover:text-white transition-all"
                        >
                          Dispatch Inquiry
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ATTENDANCE CORRECTIONS DESK */}
        {activeTab === "corrections" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Exceptional Attendance Correction Sign-Off</h3>
                <p className="text-xs text-ink-muted">
                  Authorize retroactive updates to official attendance registers where students were representing the institution or provide certified medical proof.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-primary">
                {corrections.filter((c) => c.status === "pending").length} Awaiting Executive Sign-Off
              </span>
            </div>

            <div className="space-y-3">
              {corrections.map((c) => (
                <div key={c.id} className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink text-sm">{c.studentName}</span>
                        <span className="font-mono text-xs text-primary">({c.admissionNo})</span>
                        <span className="font-mono text-xs text-ink-muted">{c.classArm}</span>
                        <span className="font-mono text-xs text-ink-muted">· {c.date}</span>
                      </div>
                      <p className="text-xs text-ink-muted">
                        Requested Adjustment: From <span className="text-danger font-bold">{c.originalStatus}</span> to{" "}
                        <span className="text-emerald-700 font-bold">{c.requestedStatus}</span>
                      </p>
                      <p className="text-xs text-ink-soft">Justification: <strong>{c.reason}</strong></p>
                      <span className="block text-[11px] text-ink-muted">Submitted by: {c.submittedBy}</span>
                    </div>

                    <div className="shrink-0 text-right">
                      {c.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success-light px-3 py-1 font-mono text-xs font-bold text-success-deep">
                          <CheckCircle2 className="size-3.5" />
                          Authorized &amp; Register Adjusted
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApproveCorrection(c.id, c.studentName)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
                        >
                          <CheckCircle2 className="size-3.5" />
                          <span>Authorize Correction</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
