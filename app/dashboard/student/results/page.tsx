"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Award,
  Download,
  CheckCircle2,
  TrendingUp,
  FileText,
  QrCode,
  ShieldCheck,
  Star,
  Printer,
  ChevronDown,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Send,
} from "lucide-react";

interface SubjectScore {
  subject: string;
  ca1: number;
  ca2: number;
  project: number;
  exam: number;
  total: number;
  grade: string;
  classAvg: number;
  remark: string;
}

export default function StudentResultsPage() {
  const [selectedTerm, setSelectedTerm] = useState("Term 1, 2025/2026");
  const [showQrModal, setShowQrModal] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewSubject, setReviewSubject] = useState("Economics");
  const [reviewReason, setReviewReason] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const scores: SubjectScore[] = [
    { subject: "Mathematics", ca1: 15, ca2: 14, project: 10, exam: 58, total: 97, grade: "A1", classAvg: 74.2, remark: "Exceptional mathematical rigour" },
    { subject: "Further Mathematics", ca1: 14, ca2: 15, project: 9, exam: 56, total: 94, grade: "A1", classAvg: 68.5, remark: "Mastery of advanced calculus" },
    { subject: "Physics", ca1: 14, ca2: 13, project: 10, exam: 55, total: 92, grade: "A1", classAvg: 71.0, remark: "Outstanding practical experimentation" },
    { subject: "Chemistry", ca1: 13, ca2: 14, project: 10, exam: 54, total: 91, grade: "A1", classAvg: 72.8, remark: "Thorough lab technique and theory" },
    { subject: "Biology", ca1: 13, ca2: 13, project: 9, exam: 53, total: 88, grade: "A1", classAvg: 69.4, remark: "Excellent biological illustrations" },
    { subject: "English Language", ca1: 13, ca2: 12, project: 9, exam: 51, total: 85, grade: "A1", classAvg: 76.1, remark: "Strong analytical prose and diction" },
    { subject: "Computer Science & Coding", ca1: 15, ca2: 15, project: 10, exam: 58, total: 98, grade: "A1", classAvg: 75.6, remark: "Top coder in grade level" },
    { subject: "Economics", ca1: 12, ca2: 13, project: 8, exam: 48, total: 81, grade: "B2", classAvg: 66.2, remark: "Very sound comprehension" },
    { subject: "Civic Education", ca1: 14, ca2: 13, project: 9, exam: 47, total: 83, grade: "B2", classAvg: 73.9, remark: "High civic responsibility" },
  ];

  const totalPoints = scores.reduce((sum, s) => sum + s.total, 0);
  const averagePercentage = (totalPoints / scores.length).toFixed(1);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewReason.trim()) return;
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setReviewReason("");
      setReviewModalOpen(false);
      alert(`Result remarking request for ${reviewSubject} logged with the Academic Examination Committee (Ticket: REV-491).`);
    }, 1200);
  };

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <Award className="size-4" />
              Student Portal · Academic Transcripts & Records
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Results, Broadsheets & Report Cards
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Verified term report cards signed by the Principal, Form Master, and Examination Board.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setReviewModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <RotateCcw className="size-4 text-cyan-600" />
              Request Result Review
            </button>
            <button
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <QrCode className="size-4 text-cyan-600" />
              Verify QR Seal
            </button>
            <button
              onClick={() => alert("Downloading Official Signed Terminal Report Card (PDF with SHA-256 seal)")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="size-4" />
              Download Report Card
            </button>
          </div>
        </div>

        {/* Official Promotion & Standing Banner */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-600/15 via-teal-600/10 to-transparent border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <div className="font-bold text-emerald-800 dark:text-emerald-300 text-sm sm:text-base">
                Academic Promotion Status: Approved for SSS 3 (Honors Track)
              </div>
              <p className="text-ink-muted">
                Met all graduation and promotional criteria with Distinction standing (92.4% Cumulative Average).
              </p>
            </div>
          </div>

          <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 px-3 py-1.5 rounded-xl border border-emerald-500/30 shrink-0">
            Principal Sign-Off: Confirmed
          </span>
        </div>

        {/* Term Switcher */}
        <div className="flex items-center justify-between bg-card border border-border p-3 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>Evaluating Period:</span>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-canvas border border-border text-foreground font-semibold focus:outline-none"
            >
              <option>Term 1, 2025/2026 (Published)</option>
              <option>Term 3, 2024/2025 (Annual Final)</option>
              <option>Term 2, 2024/2025</option>
            </select>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="size-3.5" />
            Officially Released
          </span>
        </div>

        {/* Highlight Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Terminal Average</div>
            <div className="text-3xl font-black text-cyan-600 mt-1">{averagePercentage}%</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="size-3.5" /> +2.4% vs previous term
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Class Ranking</div>
            <div className="text-3xl font-black text-amber-500 mt-1">1st / 38</div>
            <div className="text-[11px] text-muted-foreground mt-1">Top in SSS 2A Science Arm</div>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Grade Point (GPA)</div>
            <div className="text-3xl font-black text-foreground mt-1">4.89 / 5.0</div>
            <div className="text-[11px] text-muted-foreground mt-1">First Class Standing</div>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Distinctions Count</div>
            <div className="text-3xl font-black text-emerald-600 mt-1">7 A1s</div>
            <div className="text-[11px] text-muted-foreground mt-1">7 of 9 subjects at A1 grade</div>
          </div>
        </div>

        {/* Result Table */}
        <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-3 text-right">CA 1 (15)</th>
                  <th className="py-3 px-3 text-right">CA 2 (15)</th>
                  <th className="py-3 px-3 text-right">Project (10)</th>
                  <th className="py-3 px-3 text-right">Exam (60)</th>
                  <th className="py-3 px-3 text-right">Total (100)</th>
                  <th className="py-3 px-3 text-center">Grade</th>
                  <th className="py-3 px-3 text-right">Class Avg</th>
                  <th className="py-3 px-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {scores.map((sc) => (
                  <tr key={sc.subject} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4 font-semibold text-foreground">{sc.subject}</td>
                    <td className="py-3.5 px-3 text-right font-medium text-muted-foreground">{sc.ca1}</td>
                    <td className="py-3.5 px-3 text-right font-medium text-muted-foreground">{sc.ca2}</td>
                    <td className="py-3.5 px-3 text-right font-medium text-muted-foreground">{sc.project}</td>
                    <td className="py-3.5 px-3 text-right font-semibold text-foreground">{sc.exam}</td>
                    <td className="py-3.5 px-3 text-right font-black text-cyan-600">{sc.total}</td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-black bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                        {sc.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right text-xs text-muted-foreground">{sc.classAvg}%</td>
                    <td className="py-3.5 px-4 text-xs text-muted-foreground">{sc.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Institutional Assessment Comments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-card border border-border shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase font-bold text-cyan-600 tracking-wider">
              <Star className="size-4" /> Form Master&apos;s Appraisal
            </div>
            <p className="text-xs sm:text-sm text-foreground italic leading-relaxed">
              &ldquo;Tobi has maintained exemplary academic consistency throughout the term. His analytical dedication in STEM subjects is remarkable, and he demonstrates mature peer leadership in class discussions.&rdquo;
            </p>
            <div className="text-xs font-semibold text-muted-foreground pt-1">
              — Mr. David Alabi, Senior Form Tutor (SSS 2A)
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-card border border-border shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase font-bold text-amber-600 tracking-wider">
              <CheckCircle2 className="size-4" /> Principal&apos;s Executive Endorsement
            </div>
            <p className="text-xs sm:text-sm text-foreground italic leading-relaxed">
              &ldquo;An extraordinary performance, leading the senior science cohort with 7 distinctions. Highly commendable character and discipline. Approved for Academic Merit Bursary.&rdquo;
            </p>
            <div className="text-xs font-semibold text-muted-foreground pt-1">
              — Dr. Evelyn Peters, Ph.D., Principal & CAO
            </div>
          </div>
        </div>

        {/* Result Review Request Modal */}
        {reviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface border border-line rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <RotateCcw className="size-5 text-cyan-600" />
                  <h3 className="text-base font-extrabold text-ink">Request Official Result Review / Remarking</h3>
                </div>
                <button
                  onClick={() => setReviewModalOpen(false)}
                  className="size-7 rounded-lg hover:bg-surface-raised flex items-center justify-center text-ink-muted"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                If you believe there is a computational anomaly or omission in your published continuous assessment or examination score,
                submit a formal review request. The examination committee will re-audit the original mark script.
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-ink font-semibold mb-1">Subject for Review</label>
                  <select
                    value={reviewSubject}
                    onChange={(e) => setReviewSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none"
                  >
                    {scores.map((sc) => (
                      <option key={sc.subject} value={sc.subject}>
                        {sc.subject} (Published: {sc.total} / 100 - Grade {sc.grade})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-1">Reason / Explanation of Discrepancy</label>
                  <textarea
                    rows={4}
                    required
                    value={reviewReason}
                    onChange={(e) => setReviewReason(e.target.value)}
                    placeholder="e.g. In CA2 assessment project, my group score was 10/10 but appears recorded as 8/10 on this broadsheet..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line hover:bg-surface-raised font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={reviewSubmitted}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
                  >
                    {reviewSubmitted ? "Submitting..." : "Submit Review Request"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* QR Verification Modal */}
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-card border border-border rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
              <div className="size-16 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center mx-auto">
                <QrCode className="size-10" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Cryptographic Result Certificate</h3>
              <p className="text-xs text-muted-foreground">
                Scan this tamper-proof verification seal with any mobile camera to validate academic scores against the Riverside School Registrar registry.
              </p>
              <div className="p-4 rounded-xl bg-canvas border border-border text-xs font-mono">
                HASH: SHA256-RC-2023-0184-T1-9794
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="w-full py-2.5 rounded-xl bg-cyan-600 text-white font-medium text-xs hover:bg-cyan-700"
              >
                Close Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
