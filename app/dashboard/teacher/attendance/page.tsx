"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Save,
  UserCheck,
  Users,
  AlertTriangle,
  RotateCcw,
  Send,
  Download,
  ShieldCheck,
  Check,
  X,
} from "lucide-react";

interface StudentRoll {
  id: string;
  name: string;
  rollNo: string;
  status: "present" | "absent" | "late" | "excused";
  streak: number;
  unexcusedAbsencesThisMonth: number;
  absenceReason?: string;
}

const INITIAL_STUDENTS: StudentRoll[] = [
  { id: "s-1", name: "Adeleke Tobi", rollNo: "RC-2023-0184", status: "present", streak: 18, unexcusedAbsencesThisMonth: 0 },
  { id: "s-2", name: "Balogun Farouk", rollNo: "RC-2023-0185", status: "present", streak: 12, unexcusedAbsencesThisMonth: 1 },
  { id: "s-3", name: "Chukwuma Kamsi", rollNo: "RC-2023-0186", status: "late", streak: 5, unexcusedAbsencesThisMonth: 0 },
  { id: "s-4", name: "Danjuma Aisha", rollNo: "RC-2023-0187", status: "present", streak: 22, unexcusedAbsencesThisMonth: 0 },
  { id: "s-5", name: "Eze Somtochukwu", rollNo: "RC-2023-0188", status: "absent", streak: 0, unexcusedAbsencesThisMonth: 3, absenceReason: "Unexplained absence — 3rd consecutive day" },
  { id: "s-6", name: "Ibrahim Fatima", rollNo: "RC-2023-0189", status: "present", streak: 15, unexcusedAbsencesThisMonth: 0 },
  { id: "s-7", name: "Nnamdi Kenechi", rollNo: "RC-2023-0190", status: "present", streak: 19, unexcusedAbsencesThisMonth: 0 },
  { id: "s-8", name: "Okafor Chimamanda", rollNo: "RC-2023-0191", status: "present", streak: 24, unexcusedAbsencesThisMonth: 0 },
];

export default function TeacherAttendancePage() {
  const [selectedClass, setSelectedClass] = useState("SSS 2A");
  const [registerType, setRegisterType] = useState<"morning_roll" | "subject_period">("morning_roll");
  const [students, setStudents] = useState<StudentRoll[]>(INITIAL_STUDENTS);
  const [isFinalized, setIsFinalized] = useState(false);
  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);
  const [correctionStudent, setCorrectionStudent] = useState<StudentRoll | null>(null);
  const [correctionReason, setCorrectionReason] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const setStatus = (id: string, status: "present" | "absent" | "late" | "excused") => {
    if (isFinalized) {
      showToast("Register is finalized. Please use the Authorized Correction Request channel to modify.");
      return;
    }
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const markAll = (status: "present" | "absent") => {
    if (isFinalized) return;
    setStudents((prev) => prev.map((s) => ({ ...s, status })));
    showToast(`All students marked ${status}.`);
  };

  const handleFinalizeRegister = () => {
    setIsFinalized(true);
    showToast("Official attendance register finalized and synced to Registry and Principal dashboards.");
  };

  const handleRequestCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    setCorrectionModalOpen(false);
    showToast(
      `Correction request for ${correctionStudent?.name} sent to School Registry Admin for executive sign-off.`
    );
    setCorrectionStudent(null);
    setCorrectionReason("");
  };

  const handleNotifyAdminAbsence = (student: StudentRoll) => {
    showToast(
      `Instant alert sent to Registry Admin regarding repeated absence for ${student.name} (${student.rollNo}).`
    );
  };

  const presentCount = students.filter((s) => s.status === "present").length;
  const lateCount = students.filter((s) => s.status === "late").length;
  const absentCount = students.filter((s) => s.status === "absent").length;
  const excusedCount = students.filter((s) => s.status === "excused").length;

  return (
    <DashboardLayout currentRole="teacher">
      <div className="space-y-6">
        {/* Top Banner & Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-[11px] font-bold text-violet-700">
                  Daily Attendance Operations
                </span>
                <span className="font-mono text-xs text-ink-muted">Academic Term 2 · Week 8</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Class Attendance Register &amp; Roll Call</h2>
              <p className="text-xs text-ink-muted">
                Daily roll call synced in real time to the Principal&apos;s radar, Registry records, and automated guardian SMS notifications.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => showToast("Attendance summary sheet for SSS 2A exported to PDF.")}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-raised px-4 py-2 text-xs font-bold text-ink hover:border-violet-600 hover:text-violet-700 active:scale-95 transition-all shadow-sm"
              >
                <Download className="size-4" />
                <span>Export Attendance Sheet</span>
              </button>

              {!isFinalized ? (
                <button
                  type="button"
                  onClick={handleFinalizeRegister}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-violet-700 active:scale-95 transition-all"
                >
                  <Save className="size-4" />
                  <span>Finalize &amp; Submit Register</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/10 px-4 py-2 font-mono text-xs font-bold text-emerald-700 border border-emerald-500/20">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>Register Finalized &amp; Audited</span>
                </span>
              )}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-line">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[11px] text-emerald-800 block font-medium">Marked Present</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-emerald-700">{presentCount}</span>
                <span className="text-[10px] text-emerald-600 font-bold font-mono">
                  {Math.round((presentCount / students.length) * 100)}% on time
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-[11px] text-amber-800 block font-medium">Marked Late</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-amber-700">{lateCount}</span>
                <span className="text-[10px] text-amber-600 font-bold font-mono">Arrived post 08:00 AM</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
              <span className="text-[11px] text-rose-800 block font-medium">Unexcused Absent</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-rose-700">{absentCount}</span>
                <span className="text-[10px] text-rose-600 font-bold font-mono">Guardian alert queued</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <span className="text-[11px] text-blue-800 block font-medium">Officially Excused</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-blue-700">{excusedCount}</span>
                <span className="text-[10px] text-blue-600 font-bold font-mono">Clinic / Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMsg && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950 p-4 text-xs text-white font-semibold flex items-center justify-between shadow-xl animate-in slide-in-from-top-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="size-4.5 text-emerald-400" />
              <span>{toastMsg}</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-300">Live Active</span>
          </div>
        )}

        {/* SECTION 1: REGISTER CONTROLS & TABLE */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="rounded-xl border border-line bg-surface-raised px-3.5 py-1.5 text-xs font-bold text-ink focus:border-violet-600 focus:outline-none"
              >
                <option value="SSS 2A">SSS 2A (Form Class Morning Roll Call)</option>
                <option value="SSS 1 Science">SSS 1 Science (Further Math Period 4)</option>
              </select>

              <select
                value={registerType}
                onChange={(e) => setRegisterType(e.target.value as any)}
                className="rounded-xl border border-line bg-surface-raised px-3.5 py-1.5 text-xs font-bold text-ink focus:border-violet-600 focus:outline-none"
              >
                <option value="morning_roll">Morning Form Register</option>
                <option value="subject_period">Subject Period Register</option>
              </select>
            </div>

            {!isFinalized && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => markAll("present")}
                  className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 font-mono text-xs font-bold text-ink hover:border-violet-600"
                >
                  Mark All Present
                </button>
              </div>
            )}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-xs text-ink">
              <thead className="bg-surface-raised font-mono text-[11px] font-bold uppercase tracking-wider text-ink-muted border-b border-line">
                <tr>
                  <th className="p-3.5">Student / Matric</th>
                  <th className="p-3.5">Attendance Streak</th>
                  <th className="p-3.5">Monthly Absences</th>
                  <th className="p-3.5">Status Selection</th>
                  <th className="p-3.5">Absence Remarks</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-surface-raised/60 transition-colors">
                    <td className="p-3.5">
                      <span className="font-bold text-ink block">{st.name}</span>
                      <span className="font-mono text-[10px] text-primary font-bold">{st.rollNo}</span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-emerald-700">
                      {st.streak} Days Present
                    </td>
                    <td className="p-3.5 font-mono text-xs font-bold">
                      {st.unexcusedAbsencesThisMonth > 0 ? (
                        <span className="text-rose-600">{st.unexcusedAbsencesThisMonth} days absent</span>
                      ) : (
                        <span className="text-emerald-600">0 days</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1">
                        {(["present", "late", "absent", "excused"] as const).map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setStatus(st.id, status)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold capitalize transition-all ${
                              st.status === status
                                ? status === "present"
                                  ? "bg-emerald-600 text-white"
                                  : status === "late"
                                  ? "bg-amber-600 text-white"
                                  : status === "absent"
                                  ? "bg-rose-600 text-white"
                                  : "bg-blue-600 text-white"
                                : "bg-surface border border-line-soft text-ink-muted hover:text-ink"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 text-xs text-ink-muted">
                      {st.absenceReason || <span className="text-ink-soft italic">—</span>}
                    </td>
                    <td className="p-3.5 text-right">
                      {isFinalized ? (
                        <button
                          type="button"
                          onClick={() => {
                            setCorrectionStudent(st);
                            setCorrectionModalOpen(true);
                          }}
                          className="rounded-xl border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] text-ink-muted hover:text-ink hover:border-violet-600"
                        >
                          Request Correction
                        </button>
                      ) : st.status === "absent" && st.unexcusedAbsencesThisMonth >= 3 ? (
                        <button
                          type="button"
                          onClick={() => handleNotifyAdminAbsence(st)}
                          className="rounded-xl border border-rose-300 bg-rose-50 px-2.5 py-1 font-mono text-[11px] text-rose-700 font-bold hover:bg-rose-100"
                        >
                          Alert Admin
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL: POST-FINALIZATION ATTENDANCE CORRECTION REQUEST */}
        {correctionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2 text-ink">
                  <ShieldCheck className="size-5 text-violet-600" />
                  <h3 className="text-base font-extrabold">Authorized Attendance Correction</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCorrectionModalOpen(false)}
                  className="text-ink-muted hover:text-ink"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleRequestCorrection} className="space-y-3.5 text-xs">
                <p className="text-ink">
                  Student: <strong>{correctionStudent?.name}</strong> ({correctionStudent?.rollNo})
                </p>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Requested Amended Status</label>
                  <select className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink">
                    <option value="present">Present (Arrived with Clinic / Admin pass)</option>
                    <option value="excused">Excused (Approved School Event / Athletic)</option>
                    <option value="late">Late (Verified Transit Delay)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Official Justification / Note</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Enter reason for retrospective change..."
                    value={correctionReason}
                    onChange={(e) => setCorrectionReason(e.target.value)}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setCorrectionModalOpen(false)}
                    className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-violet-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-violet-700"
                  >
                    Submit Correction to Registry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
