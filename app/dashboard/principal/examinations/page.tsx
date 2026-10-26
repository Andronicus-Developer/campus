"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  AlertOctagon,
  AlertTriangle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Filter,
  GraduationCap,
  History,
  Lock,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

interface BroadsheetBatch {
  id: string;
  classArm: string;
  candidates: number;
  passRate: number;
  averageScore: number;
  distinctions: number;
  submittedBy: string;
  submissionDate: string;
  status: "pending_publication" | "published";
}

const INITIAL_BROADSHEETS: BroadsheetBatch[] = [
  {
    id: "bs-1",
    classArm: "SSS 3 Senior Secondary (WAEC Simulation)",
    candidates: 124,
    passRate: 94.2,
    averageScore: 78.4,
    distinctions: 48,
    submittedBy: "Mr. David Alabi (Head of Academics)",
    submissionDate: "Today, 10:15 AM",
    status: "pending_publication",
  },
  {
    id: "bs-2",
    classArm: "SSS 2 Science & Commercial Streams",
    candidates: 142,
    passRate: 95.8,
    averageScore: 76.2,
    distinctions: 52,
    submittedBy: "Dr. Kenneth Obi (HOD Sciences)",
    submissionDate: "Yesterday, 04:00 PM",
    status: "published",
  },
  {
    id: "bs-3",
    classArm: "JSS 3 Basic Education Certificate Mock",
    candidates: 148,
    passRate: 93.9,
    averageScore: 74.8,
    distinctions: 42,
    submittedBy: "Ms. Chioma Okon (Junior Head)",
    submissionDate: "Feb 17, 2026",
    status: "published",
  },
];

interface MissingMarkItem {
  id: string;
  subject: string;
  classArm: string;
  teacher: string;
  pendingCount: number;
  totalStudents: number;
  deadline: string;
  status: "overdue" | "due_today";
}

const MISSING_MARKS: MissingMarkItem[] = [
  {
    id: "mm-1",
    subject: "Further Mathematics CA2",
    classArm: "SSS 2 Science A",
    teacher: "Mr. David Alabi",
    pendingCount: 6,
    totalStudents: 34,
    deadline: "Today, 02:00 PM",
    status: "due_today",
  },
  {
    id: "mm-2",
    subject: "Technical Drawing CA2",
    classArm: "SSS 1 Science",
    teacher: "Mr. Kenneth Adeleke",
    pendingCount: 12,
    totalStudents: 32,
    deadline: "Yesterday, 05:00 PM",
    status: "overdue",
  },
];

interface GradeAmendmentAudit {
  id: string;
  studentName: string;
  admissionNo: string;
  subject: string;
  teacher: string;
  originalScore: number;
  amendedScore: number;
  justification: string;
  date: string;
  status: "pending" | "authorized";
}

const GRADE_AMENDMENTS: GradeAmendmentAudit[] = [
  {
    id: "ga-1",
    studentName: "Adeleke Tobi",
    admissionNo: "RC-2023-0184",
    subject: "Chemistry Practical",
    teacher: "Dr. Kenneth Obi",
    originalScore: 68,
    amendedScore: 82,
    justification: "Re-evaluation of spectrophotometer titration titration curves verified during laboratory audit.",
    date: "Feb 18, 2026",
    status: "pending",
  },
];

export default function PrincipalExaminationsPage() {
  const [broadsheets, setBroadsheets] = useState<BroadsheetBatch[]>(INITIAL_BROADSHEETS);
  const [amendments, setAmendments] = useState<GradeAmendmentAudit[]>(GRADE_AMENDMENTS);
  const [activeTab, setActiveTab] = useState<"broadsheets" | "missing" | "schedules" | "audit">("broadsheets");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handlePublishBroadsheet = (id: string, classArm: string) => {
    setBroadsheets((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "published" } : b))
    );
    showToast(`Executive authorization granted! Official report cards for ${classArm} published to parents & students.`);
  };

  const handleAuthorizeAmendment = (id: string, studentName: string) => {
    setAmendments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "authorized" } : a))
    );
    showToast(`Grade amendment for ${studentName} approved and logged in immutable examination audit ledger.`);
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
                <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                  Section F · Examinations, Assessments &amp; Results
                </span>
                <span className="font-mono text-xs text-ink-muted">Terminal Assessment Board</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Examination Broadsheet Review &amp; Publication</h2>
              <p className="text-xs text-ink-muted max-w-3xl">
                Authorize terminal broadsheets, approve report card release to parents, enforce teacher score entry deadlines, and audit grade amendments with complete institutional traceability.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Overall Pass Rate</span>
                <span className="text-lg font-black text-emerald-600">94.8%</span>
              </div>
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Score Submission Progress</span>
                <span className="text-lg font-black text-primary">94.2% Logged</span>
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("broadsheets")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "broadsheets"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Broadsheets &amp; Report Card Release ({broadsheets.filter((b) => b.status === "pending_publication").length} Pending)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("missing")}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "missing"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                <Clock className="size-3.5 text-amber-600 animate-pulse" />
                <span>Mark Deadlines &amp; Missing Scores ({MISSING_MARKS.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("schedules")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "schedules"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Exam Timetable &amp; Invigilation
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("audit")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "audit"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Grade Amendments &amp; Irregularities ({amendments.filter((a) => a.status === "pending").length})
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs text-ink-muted">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span>Immutable audit trail for all post-submission grade alterations</span>
            </div>
          </div>
        </div>

        {/* TAB 1: BROADSHEETS & PUBLICATION DESK */}
        {activeTab === "broadsheets" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Terminal Broadsheets Awaiting Executive Sign-Off</h3>
                <p className="text-xs text-ink-muted">
                  Once approved by the Principal, term grades and PDF report cards become immediately visible in Parent &amp; Student portals.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-primary">
                {broadsheets.filter((b) => b.status === "pending_publication").length} Awaiting Authorization
              </span>
            </div>

            <div className="space-y-4">
              {broadsheets.map((b) => (
                <div
                  key={b.id}
                  className={`rounded-2xl border p-5 transition-all ${
                    b.status === "pending_publication"
                      ? "border-2 border-primary/40 bg-primary-light/10 shadow-sm"
                      : "border-line bg-surface-raised"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-primary-light px-2.5 py-0.5 font-mono text-[10px] font-bold text-primary">
                          Examination Broadsheet
                        </span>
                        <span className="font-mono text-xs text-ink-muted">{b.submissionDate}</span>
                      </div>
                      <h4 className="text-base font-black text-ink">{b.classArm}</h4>
                      <p className="text-xs text-ink-muted">
                        Compiled by <strong>{b.submittedBy}</strong> across all core and elective subjects.
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
                        <div className="rounded-xl border border-line bg-surface p-2.5">
                          <span className="text-[10px] uppercase text-ink-muted block font-sans">Candidates</span>
                          <span className="font-bold text-ink">{b.candidates} Students</span>
                        </div>
                        <div className="rounded-xl border border-line bg-surface p-2.5">
                          <span className="text-[10px] uppercase text-ink-muted block font-sans">Pass Rate</span>
                          <span className="font-bold text-emerald-600">{b.passRate}%</span>
                        </div>
                        <div className="rounded-xl border border-line bg-surface p-2.5">
                          <span className="text-[10px] uppercase text-ink-muted block font-sans">Class Avg</span>
                          <span className="font-bold text-ink">{b.averageScore}%</span>
                        </div>
                        <div className="rounded-xl border border-line bg-surface p-2.5">
                          <span className="text-[10px] uppercase text-ink-muted block font-sans">Distinctions</span>
                          <span className="font-bold text-primary">{b.distinctions}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 text-right space-y-2">
                      {b.status === "published" ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-success-light px-4 py-1.5 font-mono text-xs font-bold text-success-deep">
                            <CheckCircle2 className="size-4" />
                            Published to Parents
                          </span>
                          <span className="block text-[10px] font-mono text-ink-muted">Live in Parent Portal</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={() => handlePublishBroadsheet(b.id, b.classArm)}
                            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-mono text-xs font-bold text-white shadow-md hover:bg-primary-hover active:scale-95 transition-all"
                          >
                            <Send className="size-4" />
                            <span>Authorize &amp; Publish Report Cards</span>
                          </button>
                          <span className="block text-[10px] font-mono text-ink-muted">
                            Broadcasts SMS notice to 124 parents
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MISSING MARKS & ENTRY DEADLINES */}
        {activeTab === "missing" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Score Submission Deadlines &amp; Missing Marks Radar</h3>
                <p className="text-xs text-ink-muted">
                  Enforce assessment submission cut-offs to guarantee timely broadsheet consolidation.
                </p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 font-mono text-xs font-bold text-amber-800 border border-amber-200">
                2 Batches Pending Score Input
              </span>
            </div>

            <div className="space-y-3">
              {MISSING_MARKS.map((m) => (
                <div key={m.id} className="rounded-2xl border border-line bg-surface-raised p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink text-sm">{m.subject}</span>
                      <span className="font-mono text-ink-muted">({m.classArm})</span>
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                          m.status === "overdue" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {m.status === "overdue" ? "Overdue" : "Due Today"}
                      </span>
                    </div>
                    <p className="text-ink-soft mt-1">
                      Assigned Instructor: <strong>{m.teacher}</strong> · Missing:{" "}
                      <strong className="text-danger">{m.pendingCount} of {m.totalStudents} students</strong>
                    </p>
                    <span className="font-mono text-[11px] text-ink-muted">Cutoff: {m.deadline}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast(`Automated urgency notification sent to ${m.teacher}`)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-3.5 py-1.5 font-mono text-xs font-bold text-white hover:bg-ink-soft active:scale-95"
                  >
                    <span>Issue Faculty Reminder</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SCHEDULES & INVIGILATION */}
        {activeTab === "schedules" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-ink">Approved Examination Timetable &amp; Invigilator Roster</h3>
                <p className="text-xs text-ink-muted">Senior &amp; Junior terminal mock examination schedules.</p>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600">All Halls Staffed</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2 text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-primary">Hall A (Assembly Auditorium)</span>
                <h4 className="text-sm font-bold text-ink">Senior Secondary SSS 3 WAEC Simulation</h4>
                <p className="text-ink-muted">124 candidates · Subjects: English Paper 1 &amp; 2, Mathematics</p>
                <div className="pt-2 border-t border-line font-mono text-[11px] text-ink-soft space-y-1">
                  <div>Chief Invigilator: <strong>Dr. Kenneth Obi</strong></div>
                  <div>Assisting Invigilators: <strong>Mrs. Grace Okon, Mr. Friday Eze</strong></div>
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2 text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-emerald-600">Hall B (Multi-Purpose Centre)</span>
                <h4 className="text-sm font-bold text-ink">Junior Secondary JSS 3 BECE Simulation</h4>
                <p className="text-ink-muted">148 candidates · Subjects: Basic Science, National Values</p>
                <div className="pt-2 border-t border-line font-mono text-[11px] text-ink-soft space-y-1">
                  <div>Chief Invigilator: <strong>Ms. Chioma Okon</strong></div>
                  <div>Assisting Invigilators: <strong>Mrs. Ngozi Udoh, Mr. Kenneth Adeleke</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GRADE AMENDMENT AUDIT TRAIL */}
        {activeTab === "audit" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Exceptional Grade Amendment Ledger</h3>
                <p className="text-xs text-ink-muted">
                  Strict regulatory policy: Any mark modification after official teacher submission requires verified rationale and Principal authorization.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-primary">
                {amendments.filter((a) => a.status === "pending").length} Pending Authorization
              </span>
            </div>

            <div className="space-y-3">
              {amendments.map((a) => (
                <div key={a.id} className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2 text-xs">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink text-sm">{a.studentName}</span>
                        <span className="font-mono text-primary font-bold">({a.admissionNo})</span>
                        <span className="font-mono text-ink-muted">· {a.subject}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-3 font-mono">
                        <span className="text-ink-muted">Original: <del>{a.originalScore}%</del></span>
                        <span className="text-emerald-700 font-bold">Amended: {a.amendedScore}%</span>
                        <span className="text-ink-muted">Requested by: {a.teacher}</span>
                      </div>
                      <p className="text-ink-soft mt-1 leading-relaxed">
                        Reason: <strong>{a.justification}</strong>
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      {a.status === "authorized" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success-light px-3 py-1 font-mono text-xs font-bold text-success-deep">
                          <CheckCircle2 className="size-3.5" />
                          Authorized
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAuthorizeAmendment(a.id, a.studentName)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
                        >
                          <CheckCircle2 className="size-3.5" />
                          <span>Authorize Grade Correction</span>
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
