"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  Download,
  Calendar,
  MessageSquare,
  Award,
  ChevronRight,
  Filter,
  Search,
  RotateCcw,
  Sparkles,
  Paperclip,
  Check,
  Send,
} from "lucide-react";

type AssignmentStatus = "draft" | "submitted" | "late" | "returned" | "graded" | "resubmission required";

interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  issueDate: string;
  dueDate: string;
  maxMarks: number;
  status: AssignmentStatus;
  score?: number;
  submittedAt?: string;
  instructions: string;
  attachmentName?: string;
  teacherFeedback?: string;
  submissionDraft?: string;
  allowedFormats: string;
}

export default function StudentAssignmentsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState<AssignmentItem | null>(null);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [submissionText, setSubmissionText] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [assignments, setAssignments] = useState<AssignmentItem[]>([
    {
      id: "asg-1",
      title: "Further Mathematics: Problem Set 4 (Calculus Limits & Inverses)",
      subject: "Further Mathematics",
      teacher: "Mr. David Alabi",
      issueDate: "Feb 08, 2026",
      dueDate: "Tomorrow, Feb 12 · 11:59 PM",
      maxMarks: 20,
      status: "draft",
      instructions: "Solve exercises 4A (questions 1 through 10) on calculating limits using L'Hôpital's rule and determinant inversions. Show all intermediate matrix reductions clearly.",
      attachmentName: "FMTH_Problem_Set_4_Calculus.pdf",
      allowedFormats: "PDF, JPG, PNG",
      submissionDraft: "Question 1 limit proof started in scratch notebook...",
    },
    {
      id: "asg-2",
      title: "Chemistry Lab Report: Acid-Base Volumetric Titration",
      subject: "Chemistry",
      teacher: "Dr. Peter Obi",
      issueDate: "Feb 05, 2026",
      dueDate: "Friday, Feb 13 · 04:00 PM",
      maxMarks: 15,
      status: "resubmission required",
      instructions: "Tabulate concordant titration titres (within 0.10 cm³ accuracy). Compute molarity of unknown hydrochloric acid solution using Na2CO3 primary standard.",
      attachmentName: "Chem_Titration_Lab_Protocol.pdf",
      teacherFeedback: "Your concordant titres in Table 2 omitted indicator blank volume deduction. Please recalculate sample average and re-upload.",
      allowedFormats: "PDF, DOCX",
      submittedAt: "Feb 07, 2026 · 02:40 PM",
    },
    {
      id: "asg-3",
      title: "Physics Lab Experiment: Verification of Ohm's Law",
      subject: "Physics",
      teacher: "Mr. Chukwuma Eze",
      issueDate: "Jan 28, 2026",
      dueDate: "Feb 04, 2026 · 11:59 PM",
      maxMarks: 20,
      status: "graded",
      score: 19,
      submittedAt: "Feb 03, 2026 · 07:15 PM",
      instructions: "Plot voltage (V) against current (I) from laboratory potentiometer data. Calculate the gradient and find the internal resistance 'r' of the experimental dry cell.",
      attachmentName: "Ohms_Law_Plot_Template.xlsx",
      teacherFeedback: "Outstanding linear regression plot and very accurate deduction of slope. Clear error margin notation.",
      allowedFormats: "PDF, XLSX",
    },
    {
      id: "asg-4",
      title: "English Language: Expository Essay on Coastal Erosion in West Africa",
      subject: "English Language",
      teacher: "Mrs. K. Adeleke",
      issueDate: "Jan 25, 2026",
      dueDate: "Feb 02, 2026 · 11:59 PM",
      maxMarks: 20,
      status: "graded",
      score: 18,
      submittedAt: "Feb 02, 2026 · 04:30 PM",
      instructions: "Write a 500-word expository essay examining coastal erosion mitigation strategies along the Gulf of Guinea. Cite two ecological studies.",
      attachmentName: "Expository_Essay_Rubric.pdf",
      teacherFeedback: "Compelling thesis statement and smooth paragraph transitions. Excellent vocabulary choices.",
      allowedFormats: "PDF, DOCX",
    },
    {
      id: "asg-5",
      title: "Computer Science: Python Object-Oriented Banking Simulation",
      subject: "Computer Science",
      teacher: "Engr. Sam Bello",
      issueDate: "Feb 01, 2026",
      dueDate: "Feb 10, 2026 · 11:59 PM",
      maxMarks: 25,
      status: "submitted",
      submittedAt: "Feb 09, 2026 · 09:20 PM",
      instructions: "Implement a Python `BankAccount` class with `deposit()`, `withdraw()`, and `transfer()` methods, incorporating custom exception handling for insufficient funds.",
      attachmentName: "Banking_OOP_Spec.pdf",
      allowedFormats: "PY, ZIP, PDF",
    },
    {
      id: "asg-6",
      title: "Biology: Microscopic Cell Structure & Organelle Diagram Drawing",
      subject: "Biology",
      teacher: "Mrs. Grace Okon",
      issueDate: "Jan 18, 2026",
      dueDate: "Jan 24, 2026 · 03:00 PM",
      maxMarks: 15,
      status: "graded",
      score: 15,
      submittedAt: "Jan 23, 2026 · 01:10 PM",
      instructions: "Neat, labeled pencil drawing of plant cell showing cell wall, chloroplasts, and vacuole. Mag: x400.",
      attachmentName: "Bio_Drawing_Standards.pdf",
      teacherFeedback: "Flawless biological drawing standards adhered to with crisp guidelines and magnification notations.",
      allowedFormats: "PDF, JPG, PNG",
    },
  ]);

  const filtered = assignments.filter((asg) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && (asg.status === "draft" || asg.status === "resubmission required")) ||
      (filter === "submitted" && asg.status === "submitted") ||
      (filter === "graded" && asg.status === "graded");
    const matchesSearch =
      asg.title.toLowerCase().includes(search.toLowerCase()) ||
      asg.subject.toLowerCase().includes(search.toLowerCase()) ||
      asg.teacher.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleOpenSubmission = (asg: AssignmentItem) => {
    setSelectedAssignment(asg);
    setSubmissionText(asg.submissionDraft || "");
    setUploadedFileName("");
    setSubmissionModalOpen(true);
  };

  const handleSaveDraft = () => {
    if (!selectedAssignment) return;
    setAssignments((prev) =>
      prev.map((a) => (a.id === selectedAssignment.id ? { ...a, submissionDraft: submissionText } : a))
    );
    alert("Draft saved successfully to your local student session!");
  };

  const handleSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === selectedAssignment.id
            ? {
                ...a,
                status: "submitted",
                submittedAt: "Just now · Feb 11, 2026",
                submissionDraft: undefined,
              }
            : a
        )
      );
      setIsSubmitting(false);
      setSubmissionModalOpen(false);
      alert(`Assignment "${selectedAssignment.title}" submitted successfully! Recorded timestamp: ${new Date().toLocaleTimeString()}`);
    }, 1200);
  };

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <FileText className="size-4" />
              Student Portal · Coursework & Submissions
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Assignments & Homework Desk
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Submit coursework, review teacher feedback, download rubrics, and track continuous assessment scores.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-mono text-xs font-bold">
              6 of 6 On Track · 94.2% Avg Score
            </span>
          </div>
        </div>

        {/* Status Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
            <span className="text-xs font-medium text-muted-foreground block">Pending Submissions</span>
            <span className="text-2xl font-black text-amber-500 mt-1 block">2 Tasks</span>
            <span className="text-[10px] text-muted-foreground">Due this week</span>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
            <span className="text-xs font-medium text-muted-foreground block">Submitted (In Review)</span>
            <span className="text-2xl font-black text-cyan-600 mt-1 block">1 Task</span>
            <span className="text-[10px] text-muted-foreground">Awaiting grading</span>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
            <span className="text-xs font-medium text-muted-foreground block">Graded & Returned</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">3 Tasks</span>
            <span className="text-[10px] text-muted-foreground">Average: 17.3 / 20</span>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
            <span className="text-xs font-medium text-muted-foreground block">Resubmission Alerts</span>
            <span className="text-2xl font-black text-rose-500 mt-1 block">1 Task</span>
            <span className="text-[10px] text-rose-600 font-semibold">Teacher feedback pending</span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assignments by subject, title, or teacher..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-canvas border border-border focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-canvas border border-border rounded-xl p-1 text-xs">
            {[
              { key: "all", label: "All Work" },
              { key: "pending", label: "Pending (2)" },
              { key: "submitted", label: "Submitted (1)" },
              { key: "graded", label: "Graded (3)" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  filter === tab.key
                    ? "bg-cyan-600 text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Assignments Cards */}
        <div className="space-y-4">
          {filtered.map((asg) => (
            <div
              key={asg.id}
              className={`p-6 rounded-3xl bg-card border transition shadow-xs space-y-4 ${
                asg.status === "resubmission required"
                  ? "border-rose-500/40 ring-1 ring-rose-500/20"
                  : asg.status === "draft"
                  ? "border-amber-500/40"
                  : "border-border"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-mono text-xs font-bold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-800">
                      {asg.subject}
                    </span>
                    <span className="text-xs text-muted-foreground">Instructor: {asg.teacher}</span>
                    <span className="text-xs text-muted-foreground">· Max: {asg.maxMarks} Points</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {asg.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    {asg.instructions}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  {asg.status === "draft" && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 border border-amber-500/30">
                      Draft Saved
                    </span>
                  )}
                  {asg.status === "resubmission required" && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-600 border border-rose-500/30">
                      Resubmission Required
                    </span>
                  )}
                  {asg.status === "submitted" && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-600 border border-blue-500/30">
                      Submitted
                    </span>
                  )}
                  {asg.status === "graded" && (
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 block">
                        Score: {asg.score} / {asg.maxMarks}
                      </span>
                    </div>
                  )}

                  <div className="text-[11px] font-mono text-muted-foreground">
                    Due: <strong className="text-foreground">{asg.dueDate}</strong>
                  </div>
                </div>
              </div>

              {/* Teacher Feedback Alert Box (if present) */}
              {asg.teacherFeedback && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-ink-soft space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
                    <MessageSquare className="size-3.5" />
                    <span>Teacher Evaluation Remark</span>
                  </div>
                  <p className="italic">{asg.teacherFeedback}</p>
                </div>
              )}

              {/* Action Bar */}
              <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  {asg.attachmentName && (
                    <button
                      onClick={() => alert(`Downloading assignment brief: ${asg.attachmentName}`)}
                      className="inline-flex items-center gap-1.5 text-cyan-600 font-semibold hover:underline"
                    >
                      <Paperclip className="size-3.5" />
                      <span>{asg.attachmentName}</span>
                    </button>
                  )}
                  {asg.submittedAt && (
                    <span className="text-muted-foreground font-mono text-[11px]">
                      Submitted on: {asg.submittedAt}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {(asg.status === "draft" || asg.status === "resubmission required") && (
                    <button
                      onClick={() => handleOpenSubmission(asg)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold shadow-xs transition"
                    >
                      <UploadCloud className="size-3.5" />
                      <span>{asg.status === "resubmission required" ? "Resubmit Work" : "Upload & Submit"}</span>
                    </button>
                  )}
                  {asg.status === "submitted" && (
                    <button
                      onClick={() => handleOpenSubmission(asg)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-border hover:bg-muted text-foreground font-medium transition"
                    >
                      <RotateCcw className="size-3.5" />
                      <span>Edit Submission</span>
                    </button>
                  )}
                  {asg.status === "graded" && (
                    <button
                      onClick={() => alert(`Reviewing full grading rubric for "${asg.title}" (Score: ${asg.score}/${asg.maxMarks})`)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-border hover:bg-muted text-foreground font-medium transition"
                    >
                      <Award className="size-3.5 text-emerald-600" />
                      <span>View Rubric</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submission Drawer / Modal */}
        {submissionModalOpen && selectedAssignment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-card border border-border rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between border-b border-border pb-3">
                <div>
                  <span className="font-mono text-xs font-bold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-800">
                    {selectedAssignment.subject}
                  </span>
                  <h3 className="text-lg font-black text-foreground mt-1">
                    {selectedAssignment.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSubmissionModalOpen(false)}
                  className="size-8 rounded-xl hover:bg-muted flex items-center justify-center text-muted-foreground"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitWork} className="space-y-4 text-xs">
                <div>
                  <label className="block text-foreground font-semibold mb-1">
                    Online Text Answer / Solution Summary
                  </label>
                  <textarea
                    rows={4}
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    placeholder="Type or paste your solution, working notes, or commentary here..."
                    className="w-full px-3 py-2.5 rounded-xl bg-canvas border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-foreground font-semibold">
                    Upload Work Document (Allowed: {selectedAssignment.allowedFormats})
                  </label>
                  <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center hover:bg-canvas/50 transition cursor-pointer">
                    <UploadCloud className="size-8 text-cyan-600 mx-auto mb-2" />
                    <div className="font-bold text-foreground">
                      {uploadedFileName || "Click to browse or drag & drop assignment file"}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1">
                      Max file size: 25MB · Supported formats: {selectedAssignment.allowedFormats}
                    </div>
                    <input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setUploadedFileName(e.target.files[0].name);
                        }
                      }}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="mt-3 inline-block px-3 py-1.5 rounded-lg bg-canvas border border-border text-foreground font-semibold cursor-pointer hover:bg-muted"
                    >
                      Select File
                    </label>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-canvas border border-border text-[11px] text-muted-foreground space-y-1">
                  <div className="font-semibold text-foreground">Academic Integrity Pledge</div>
                  <p>
                    By submitting, you certify that this work represents your own academic endeavor in accordance
                    with the Riverside College Code of Conduct.
                  </p>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-4 py-2 rounded-xl border border-border hover:bg-muted font-medium text-foreground transition"
                  >
                    Save Draft
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSubmissionModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-border hover:bg-muted font-medium text-foreground"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Assignment"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
