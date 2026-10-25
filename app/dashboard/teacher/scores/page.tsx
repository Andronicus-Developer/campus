"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Award,
  CheckCircle2,
  FileSpreadsheet,
  GraduationCap,
  Save,
  Send,
  AlertCircle,
  Download,
  Filter,
  Search,
  Lock,
  ShieldCheck,
  Check,
  TrendingUp,
} from "lucide-react";

interface StudentScoreEntry {
  id: string;
  name: string;
  rollNo: string;
  ca1: number; // Max 20
  ca2: number; // Max 20
  project: number; // Max 10
  exam: number; // Max 50
  teacherRemark: string;
  isLocked: boolean;
}

const INITIAL_MARKS: StudentScoreEntry[] = [
  {
    id: "m-1",
    name: "Adeleke Tobi",
    rollNo: "RC-2023-0184",
    ca1: 18,
    ca2: 17,
    project: 10,
    exam: 44,
    teacherRemark: "Outstanding mastery of calculus and analytical geometry.",
    isLocked: false,
  },
  {
    id: "m-2",
    name: "Balogun Farouk",
    rollNo: "RC-2023-0185",
    ca1: 15,
    ca2: 16,
    project: 8,
    exam: 36,
    teacherRemark: "Good effort; needs more practice on trigonometry identities.",
    isLocked: false,
  },
  {
    id: "m-3",
    name: "Chukwuma Kamsi",
    rollNo: "RC-2023-0186",
    ca1: 19,
    ca2: 18,
    project: 10,
    exam: 48,
    teacherRemark: "Exceptional mathematical rigor and exemplary conduct.",
    isLocked: false,
  },
  {
    id: "m-4",
    name: "Danjuma Aisha",
    rollNo: "RC-2023-0187",
    ca1: 17,
    ca2: 19,
    project: 9,
    exam: 42,
    teacherRemark: "Very disciplined student; consistent homework submissions.",
    isLocked: false,
  },
  {
    id: "m-5",
    name: "Eze Somtochukwu",
    rollNo: "RC-2023-0188",
    ca1: 14,
    ca2: 12,
    project: 6,
    exam: 28,
    teacherRemark: "Falling behind; recommended for twice-weekly remedial clinic.",
    isLocked: false,
  },
];

export default function TeacherScoresPage() {
  const [subject, setSubject] = useState("Further Mathematics");
  const [classGroup, setClassGroup] = useState("SSS 2A");
  const [marks, setMarks] = useState<StudentScoreEntry[]>(INITIAL_MARKS);
  const [isSubmittedToPrincipal, setIsSubmittedToPrincipal] = useState(false);
  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);
  const [correctionStudent, setCorrectionStudent] = useState<StudentScoreEntry | null>(null);
  const [correctionReason, setCorrectionReason] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const updateMark = (id: string, field: "ca1" | "ca2" | "project" | "exam", val: number) => {
    if (isSubmittedToPrincipal) {
      showToast("Broadsheet is locked pending Principal review. Use Authorized Mark Correction.");
      return;
    }
    const maxLimits = { ca1: 20, ca2: 20, project: 10, exam: 50 };
    const bounded = Math.min(Math.max(0, val), maxLimits[field]);
    setMarks((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: bounded } : m))
    );
  };

  const updateRemark = (id: string, remark: string) => {
    if (isSubmittedToPrincipal) return;
    setMarks((prev) =>
      prev.map((m) => (m.id === id ? { ...m, teacherRemark: remark } : m))
    );
  };

  const getScoreData = (m: StudentScoreEntry) => {
    const total = m.ca1 + m.ca2 + m.project + m.exam; // out of 100
    let grade = "F";
    let color = "text-danger bg-danger-light";
    if (total >= 75) {
      grade = "A (Distinction)";
      color = "text-emerald-700 bg-emerald-100";
    } else if (total >= 65) {
      grade = "B (Credit)";
      color = "text-blue-700 bg-blue-100";
    } else if (total >= 50) {
      grade = "C (Merit)";
      color = "text-amber-700 bg-amber-100";
    } else if (total >= 40) {
      grade = "D (Pass)";
      color = "text-orange-700 bg-orange-100";
    }
    return { total, grade, color };
  };

  const handleSubmitBroadsheet = () => {
    setIsSubmittedToPrincipal(true);
    showToast(
      "Terminal broadsheet submitted to Principal (Dr. Evelyn Peters) for executive result sign-off."
    );
  };

  const handleRequestMarkCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    setCorrectionModalOpen(false);
    showToast(
      `Mark amendment request for ${correctionStudent?.name} sent to Principal for authorization.`
    );
    setCorrectionStudent(null);
    setCorrectionReason("");
  };

  const totalStudents = marks.length;
  const distinctions = marks.filter((m) => getScoreData(m).total >= 75).length;
  const credits = marks.filter((m) => getScoreData(m).total >= 65 && getScoreData(m).total < 75).length;
  const remedials = marks.filter((m) => getScoreData(m).total < 50).length;

  return (
    <DashboardLayout currentRole="teacher">
      <div className="space-y-6">
        {/* Top Banner & Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-[11px] font-bold text-violet-700">
                  Continuous Assessment Broadsheet
                </span>
                <span className="font-mono text-xs text-ink-muted">Term 2 · Weight: CA (50%) + Exam (50%)</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Gradebook &amp; Terminal Marks Entry</h2>
              <p className="text-xs text-ink-muted">
                Record Continuous Assessment tests (CA1, CA2), STEM projects, and terminal exam marks. Automated grade calculation, score distribution, and Principal sign-off workflow.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => showToast("Exporting official subject mark sheet to Excel.")}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-raised px-4 py-2 text-xs font-bold text-ink hover:border-violet-600 active:scale-95 transition-all shadow-sm"
              >
                <Download className="size-4" />
                <span>Export Mark Sheet (Excel)</span>
              </button>

              {!isSubmittedToPrincipal ? (
                <button
                  type="button"
                  onClick={handleSubmitBroadsheet}
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-violet-700 active:scale-95 transition-all"
                >
                  <Send className="size-4" />
                  <span>Submit Broadsheet to Principal</span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-blue-500/10 px-4 py-2 font-mono text-xs font-bold text-blue-700 border border-blue-500/20">
                  <CheckCircle2 className="size-4 text-blue-600" />
                  <span>Submitted · Awaiting Principal Sign-Off</span>
                </span>
              )}
            </div>
          </div>

          {/* Score Performance Distribution Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-line">
            <div className="p-3.5 rounded-2xl bg-surface-raised border border-line-soft">
              <span className="text-[11px] text-ink-muted block font-medium">Class Candidates</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-ink">{totalStudents}</span>
                <span className="text-[10px] text-ink-muted font-mono">{classGroup}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[11px] text-emerald-800 block font-medium">Distinctions (A)</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-emerald-700">{distinctions}</span>
                <span className="text-[10px] text-emerald-600 font-bold font-mono">
                  {Math.round((distinctions / totalStudents) * 100)}% of class
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <span className="text-[11px] text-blue-800 block font-medium">Credits &amp; Merits (B/C)</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-blue-700">{credits + 1}</span>
                <span className="text-[10px] text-blue-600 font-bold font-mono">Good progress</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
              <span className="text-[11px] text-rose-800 block font-medium">Remedial Support Needed</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-rose-700">{remedials}</span>
                <span className="text-[10px] text-rose-600 font-bold font-mono">Score &lt; 50%</span>
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

        {/* SECTION 1: MARKS ENTRY TABLE */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="rounded-xl border border-line bg-surface-raised px-3.5 py-1.5 text-xs font-bold text-ink focus:border-violet-600 focus:outline-none"
              >
                <option value="Further Mathematics">Further Mathematics</option>
                <option value="General Mathematics">General Mathematics</option>
              </select>

              <select
                value={classGroup}
                onChange={(e) => setClassGroup(e.target.value)}
                className="rounded-xl border border-line bg-surface-raised px-3.5 py-1.5 text-xs font-bold text-ink focus:border-violet-600 focus:outline-none"
              >
                <option value="SSS 2A">SSS 2A (Science Stream)</option>
                <option value="SSS 1 Science">SSS 1 Science</option>
              </select>
            </div>

            <div className="text-xs text-ink-muted font-mono">
              Maximum Scores: CA1 (20) · CA2 (20) · Project (10) · Exam (50)
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-xs text-ink">
              <thead className="bg-surface-raised font-mono text-[11px] font-bold uppercase tracking-wider text-ink-muted border-b border-line">
                <tr>
                  <th className="p-3.5">Candidate / Reg #</th>
                  <th className="p-3.5 text-center">CA 1 (20)</th>
                  <th className="p-3.5 text-center">CA 2 (20)</th>
                  <th className="p-3.5 text-center">Project (10)</th>
                  <th className="p-3.5 text-center">Exam (50)</th>
                  <th className="p-3.5 text-center">Total (100)</th>
                  <th className="p-3.5">Final Grade</th>
                  <th className="p-3.5">Teacher Remark</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {marks.map((m) => {
                  const result = getScoreData(m);
                  return (
                    <tr key={m.id} className="hover:bg-surface-raised/60 transition-colors">
                      <td className="p-3.5">
                        <span className="font-bold text-ink block">{m.name}</span>
                        <span className="font-mono text-[10px] text-primary font-bold">{m.rollNo}</span>
                      </td>
                      <td className="p-3.5 text-center">
                        <input
                          type="number"
                          max={20}
                          min={0}
                          disabled={isSubmittedToPrincipal}
                          value={m.ca1}
                          onChange={(e) => updateMark(m.id, "ca1", parseInt(e.target.value) || 0)}
                          className="w-14 rounded-xl border border-line bg-surface-raised p-1.5 font-mono font-bold text-ink text-center focus:border-violet-600 disabled:opacity-60"
                        />
                      </td>
                      <td className="p-3.5 text-center">
                        <input
                          type="number"
                          max={20}
                          min={0}
                          disabled={isSubmittedToPrincipal}
                          value={m.ca2}
                          onChange={(e) => updateMark(m.id, "ca2", parseInt(e.target.value) || 0)}
                          className="w-14 rounded-xl border border-line bg-surface-raised p-1.5 font-mono font-bold text-ink text-center focus:border-violet-600 disabled:opacity-60"
                        />
                      </td>
                      <td className="p-3.5 text-center">
                        <input
                          type="number"
                          max={10}
                          min={0}
                          disabled={isSubmittedToPrincipal}
                          value={m.project}
                          onChange={(e) => updateMark(m.id, "project", parseInt(e.target.value) || 0)}
                          className="w-14 rounded-xl border border-line bg-surface-raised p-1.5 font-mono font-bold text-ink text-center focus:border-violet-600 disabled:opacity-60"
                        />
                      </td>
                      <td className="p-3.5 text-center">
                        <input
                          type="number"
                          max={50}
                          min={0}
                          disabled={isSubmittedToPrincipal}
                          value={m.exam}
                          onChange={(e) => updateMark(m.id, "exam", parseInt(e.target.value) || 0)}
                          className="w-14 rounded-xl border border-line bg-surface-raised p-1.5 font-mono font-bold text-ink text-center focus:border-violet-600 disabled:opacity-60"
                        />
                      </td>
                      <td className="p-3.5 text-center font-mono text-sm font-black text-ink">
                        {result.total}
                      </td>
                      <td className="p-3.5">
                        <span className={`inline-block font-mono text-[10px] font-bold px-2 py-0.5 rounded ${result.color}`}>
                          {result.grade}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <input
                          type="text"
                          disabled={isSubmittedToPrincipal}
                          value={m.teacherRemark}
                          onChange={(e) => updateRemark(m.id, e.target.value)}
                          className="w-full min-w-[200px] rounded-xl border border-line bg-surface-raised p-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-violet-600 disabled:opacity-60"
                        />
                      </td>
                      <td className="p-3.5 text-right">
                        {isSubmittedToPrincipal ? (
                          <button
                            type="button"
                            onClick={() => {
                              setCorrectionStudent(m);
                              setCorrectionModalOpen(true);
                            }}
                            className="rounded-xl border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] text-ink-muted hover:text-ink hover:border-violet-600"
                          >
                            Amend Mark
                          </button>
                        ) : (
                          <span className="font-mono text-[11px] text-emerald-600 font-bold">Draft</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL: POST-SUBMISSION MARK AMENDMENT REQUEST */}
        {correctionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2 text-ink">
                  <ShieldCheck className="size-5 text-violet-600" />
                  <h3 className="text-base font-extrabold">Controlled Mark Amendment Request</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCorrectionModalOpen(false)}
                  className="text-ink-muted hover:text-ink"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleRequestMarkCorrection} className="space-y-3.5 text-xs">
                <p className="text-ink">
                  Student: <strong>{correctionStudent?.name}</strong> ({correctionStudent?.rollNo})
                </p>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Assessment Component</label>
                  <select className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink">
                    <option value="exam">Terminal Examination (Currently: {correctionStudent?.exam}/50)</option>
                    <option value="ca2">CA 2 Mid-Term Test (Currently: {correctionStudent?.ca2}/20)</option>
                    <option value="ca1">CA 1 Continuous Test (Currently: {correctionStudent?.ca1}/20)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Amended Score</label>
                  <input
                    type="number"
                    required
                    placeholder="Enter corrected score..."
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono font-bold text-ink"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Audit Justification</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. Scored script re-evaluated; question 4 addition tally corrected..."
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
                    Submit for Principal Approval
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
