"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Send,
  Download,
  Search,
  Filter,
  Check,
  RotateCcw,
  Users,
  FileText,
  ExternalLink,
} from "lucide-react";

interface AssignmentTask {
  id: string;
  title: string;
  subject: string;
  className: string;
  maxScore: number;
  issueDate: string;
  dueDate: string;
  totalAssigned: number;
  submittedCount: number;
  gradedCount: number;
  status: "active" | "closed";
}

interface StudentSubmission {
  id: string;
  studentName: string;
  regNo: string;
  submittedAt: string;
  status: "submitted_ontime" | "submitted_late" | "missing";
  score?: number;
  feedback?: string;
  isReturnedForCorrection: boolean;
  submissionSnippet: string;
}

const INITIAL_ASSIGNMENTS: AssignmentTask[] = [
  {
    id: "asg-1",
    title: "Assignment #4: Derivatives & Product/Quotient Rules",
    subject: "Further Mathematics",
    className: "SSS 2A (Science Stream)",
    maxScore: 20,
    issueDate: "Oct 21, 2025",
    dueDate: "Oct 26, 2025 (Tomorrow, 11:59 PM)",
    totalAssigned: 34,
    submittedCount: 28,
    gradedCount: 16,
    status: "active",
  },
  {
    id: "asg-2",
    title: "Assignment #3: Trigonometric Identities & Angle Sum Proofs",
    subject: "Further Mathematics",
    className: "SSS 2A (Science Stream)",
    maxScore: 20,
    issueDate: "Oct 12, 2025",
    dueDate: "Oct 18, 2025",
    totalAssigned: 34,
    submittedCount: 33,
    gradedCount: 33,
    status: "closed",
  },
];

const INITIAL_SUBMISSIONS: StudentSubmission[] = [
  {
    id: "sub-1",
    studentName: "Adeleke Tobi",
    regNo: "RC-2023-0184",
    submittedAt: "Oct 23, 08:14 PM",
    status: "submitted_ontime",
    score: 19,
    feedback: "Flawless application of quotient theorem on problem 4.",
    isReturnedForCorrection: false,
    submissionSnippet: "Solution set worked with clean algebraic steps and Leibniz notation.",
  },
  {
    id: "sub-2",
    studentName: "Balogun Farouk",
    regNo: "RC-2023-0185",
    submittedAt: "Oct 24, 07:30 AM",
    status: "submitted_ontime",
    score: 15,
    feedback: "Check minus sign distribution on question 2b denominator.",
    isReturnedForCorrection: false,
    submissionSnippet: "Completed questions 1 to 5; minor arithmetic typo on last step.",
  },
  {
    id: "sub-3",
    studentName: "Chukwuma Kamsi",
    regNo: "RC-2023-0186",
    submittedAt: "Oct 22, 10:45 PM",
    status: "submitted_ontime",
    score: 20,
    feedback: "Excellent rigor and alternative substitution proof demonstrated.",
    isReturnedForCorrection: false,
    submissionSnippet: "Includes full graphical derivative check.",
  },
  {
    id: "sub-4",
    studentName: "Danjuma Aisha",
    regNo: "RC-2023-0187",
    submittedAt: "Oct 24, 09:12 PM",
    status: "submitted_ontime",
    score: undefined,
    feedback: "",
    isReturnedForCorrection: false,
    submissionSnippet: "Uploaded scanned worksheet PDF (3 pages).",
  },
  {
    id: "sub-5",
    studentName: "Eze Somtochukwu",
    regNo: "RC-2023-0188",
    submittedAt: "—",
    status: "missing",
    score: 0,
    feedback: "Submission overdue. Remedial clinic allocated.",
    isReturnedForCorrection: true,
    submissionSnippet: "No file uploaded by student.",
  },
];

export default function TeacherAssignmentsPage() {
  const [assignments, setAssignments] = useState<AssignmentTask[]>(INITIAL_ASSIGNMENTS);
  const [activeAssignmentId, setActiveAssignmentId] = useState<string>("asg-1");
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(INITIAL_SUBMISSIONS);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    className: "SSS 2A (Science Stream)",
    maxScore: 20,
    dueDate: "",
    instructions: "",
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleUpdateScore = (id: string, score: number) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score } : s))
    );
  };

  const handleUpdateFeedback = (id: string, feedback: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, feedback } : s))
    );
  };

  const handleToggleReturnCorrection = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, isReturnedForCorrection: !s.isReturnedForCorrection } : s
      )
    );
    showToast("Assignment returned to student for corrections / resubmission.");
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const created: AssignmentTask = {
      id: `asg-${Date.now()}`,
      title: newAssignment.title,
      subject: "Further Mathematics",
      className: newAssignment.className,
      maxScore: newAssignment.maxScore,
      issueDate: "Today",
      dueDate: newAssignment.dueDate || "Nov 02, 2025",
      totalAssigned: 34,
      submittedCount: 0,
      gradedCount: 0,
      status: "active",
    };
    setAssignments([created, ...assignments]);
    setCreateModalOpen(false);
    showToast(`Assignment "${newAssignment.title}" published to student portal.`);
  };

  const activeTask = assignments.find((a) => a.id === activeAssignmentId) || assignments[0];

  return (
    <DashboardLayout currentRole="teacher">
      <div className="space-y-6">
        {/* Top Banner & Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-[11px] font-bold text-violet-700">
                  Formative Assessment &amp; Homework
                </span>
                <span className="font-mono text-xs text-ink-muted">Subject: Further Mathematics</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Assignments &amp; Homework Desk</h2>
              <p className="text-xs text-ink-muted">
                Create homework tasks, evaluate student digital submissions, supply feedback remarks, and return work for corrections.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setCreateModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-violet-700 active:scale-95 transition-all"
              >
                <Plus className="size-4" />
                <span>+ Create Assignment</span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Reminders sent via WhatsApp/In-App to 6 missing students.")}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-raised px-4 py-2 text-xs font-bold text-ink hover:border-violet-600 active:scale-95 transition-all shadow-sm"
              >
                <Send className="size-4 text-violet-600" />
                <span>Remind Missing Students</span>
              </button>
            </div>
          </div>

          {/* Active Tasks Switcher */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-line">
            {assignments.map((task) => (
              <button
                key={task.id}
                type="button"
                onClick={() => setActiveAssignmentId(task.id)}
                className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                  task.id === activeAssignmentId
                    ? "border-violet-600 bg-violet-500/10 shadow-sm"
                    : "border-line bg-surface-raised/70 hover:border-line-strong"
                }`}
              >
                <span className="font-bold text-ink block">{task.title}</span>
                <div className="flex items-center gap-2 mt-1 font-mono text-[11px] text-ink-muted">
                  <span>Due: {task.dueDate}</span>
                  <span>•</span>
                  <span className="text-violet-700 font-bold">
                    {task.submittedCount} / {task.totalAssigned} Submitted
                  </span>
                </div>
              </button>
            ))}
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

        {/* SECTION 1: SUBMISSIONS EVALUATION TABLE */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-ink">
                Submissions Evaluation: {activeTask.title}
              </h3>
              <p className="text-xs text-ink-muted">
                Class: {activeTask.className} · Max Score: {activeTask.maxScore} Marks.
              </p>
            </div>

            <button
              type="button"
              onClick={() => showToast("Marks saved and published to student desks.")}
              className="rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
            >
              Publish Evaluated Marks
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-xs text-ink">
              <thead className="bg-surface-raised font-mono text-[11px] font-bold uppercase tracking-wider text-ink-muted border-b border-line">
                <tr>
                  <th className="p-3.5">Student</th>
                  <th className="p-3.5">Submitted Timestamp</th>
                  <th className="p-3.5">Work Snippet / Attachment</th>
                  <th className="p-3.5">Score ({activeTask.maxScore})</th>
                  <th className="p-3.5">Teacher Feedback</th>
                  <th className="p-3.5 text-right">Correction Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-surface-raised/60 transition-colors">
                    <td className="p-3.5">
                      <span className="font-bold text-ink block">{sub.studentName}</span>
                      <span className="font-mono text-[10px] text-primary">{sub.regNo}</span>
                    </td>
                    <td className="p-3.5 font-mono text-xs text-ink-muted">
                      {sub.submittedAt}
                    </td>
                    <td className="p-3.5 text-xs text-ink-soft max-w-xs">
                      <p className="line-clamp-2 italic bg-surface p-2 rounded-xl border border-line-soft">
                        "{sub.submissionSnippet}"
                      </p>
                    </td>
                    <td className="p-3.5">
                      <input
                        type="number"
                        max={activeTask.maxScore}
                        min={0}
                        value={sub.score ?? ""}
                        placeholder="—"
                        onChange={(e) => handleUpdateScore(sub.id, parseInt(e.target.value) || 0)}
                        className="w-16 rounded-xl border border-line bg-surface-raised p-1.5 font-mono font-bold text-ink text-center focus:border-violet-600 focus:outline-none"
                      />
                    </td>
                    <td className="p-3.5">
                      <input
                        type="text"
                        value={sub.feedback || ""}
                        placeholder="Enter individual remark..."
                        onChange={(e) => handleUpdateFeedback(sub.id, e.target.value)}
                        className="w-full rounded-xl border border-line bg-surface-raised p-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-violet-600 focus:outline-none"
                      />
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => handleToggleReturnCorrection(sub.id)}
                        className={`rounded-xl px-2.5 py-1 font-mono text-[11px] font-bold transition-all ${
                          sub.isReturnedForCorrection
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "border border-line bg-surface-raised text-ink-muted hover:text-ink"
                        }`}
                      >
                        {sub.isReturnedForCorrection ? "Returned" : "Return for Resubmission"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL: CREATE NEW ASSIGNMENT */}
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2 text-ink">
                  <Plus className="size-5 text-violet-600" />
                  <h3 className="text-base font-extrabold">Create Class Assignment</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="text-ink-muted hover:text-ink"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateAssignment} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Assignment Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Assignment #5: Differential Calculus Applications"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-ink-muted mb-1">Target Class Arm</label>
                    <select
                      value={newAssignment.className}
                      onChange={(e) => setNewAssignment({ ...newAssignment, className: e.target.value })}
                      className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                    >
                      <option value="SSS 2A (Science Stream)">SSS 2A (Further Math)</option>
                      <option value="SSS 1 Science">SSS 1 Science</option>
                      <option value="JSS 3 Gold">JSS 3 Gold</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-ink-muted mb-1">Max Score</label>
                    <input
                      type="number"
                      required
                      value={newAssignment.maxScore}
                      onChange={(e) => setNewAssignment({ ...newAssignment, maxScore: parseInt(e.target.value) || 20 })}
                      className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Submission Deadline</label>
                  <input
                    type="date"
                    required
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Instructions &amp; Prompts</label>
                  <textarea
                    rows={3}
                    placeholder="Provide detailed instructions or textbook problem numbers..."
                    value={newAssignment.instructions}
                    onChange={(e) => setNewAssignment({ ...newAssignment, instructions: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-violet-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-violet-700"
                  >
                    Publish Assignment
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
