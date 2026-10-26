"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Award,
  Download,
  CheckCircle2,
  TrendingUp,
  Star,
  Printer,
  ChevronRight,
  ShieldCheck,
  User,
  MessageSquare,
  HelpCircle,
  FileCheck,
  Calendar,
  Sparkles,
} from "lucide-react";
import { CHILDREN_PROFILES, ChildProfile } from "@/lib/family-data";

export default function ParentResultsPage() {
  const [selectedChildId, setSelectedChildId] = useState<string>("child-1");
  const [selectedTerm, setSelectedTerm] = useState("Term 1, 2025/2026");
  const [toast, setToast] = useState<string | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewSubject, setReviewSubject] = useState("Mathematics");
  const [reviewReason, setReviewReason] = useState("");
  const [isReportCardModalOpen, setIsReportCardModalOpen] = useState(false);

  const activeChild =
    CHILDREN_PROFILES.find((c) => c.id === selectedChildId) || CHILDREN_PROFILES[0];

  const overallAverage = (
    activeChild.subjects.reduce((sum, s) => sum + s.total, 0) / activeChild.subjects.length
  ).toFixed(1);

  const handleRequestReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReviewModalOpen(false);
    setToast(
      `Academic Grade Review Request logged for ${activeChild.preferredName} in ${reviewSubject} (#REV-${Math.floor(
        1000 + Math.random() * 9000
      )}). Academic Faculty will re-verify exam script marks.`
    );
    setReviewReason("");
  };

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <Award className="w-4 h-4" />
              Academic Performance &amp; Evaluation · Section D
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Academic Progress &amp; Report Cards
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Verified terminal evaluations, teacher recommendations, and official downloadable transcripts.
            </p>
          </div>

          {/* Child Switcher & Term Select */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-card border border-border rounded-2xl p-1 shadow-xs">
              {CHILDREN_PROFILES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedChildId(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedChildId === c.id
                      ? "bg-pink-600 text-white shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c.preferredName}
                </button>
              ))}
            </div>

            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="px-3 py-2 rounded-xl bg-card border border-border text-xs font-semibold text-foreground"
            >
              <option value="Term 1, 2025/2026">Term 1, 2025/2026 (Published)</option>
              <option value="Term 3, 2024/2025">Term 3, 2024/2025 (Archived)</option>
              <option value="Term 2, 2024/2025">Term 2, 2024/2025 (Archived)</option>
            </select>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              {toast}
            </span>
            <button onClick={() => setToast(null)} className="text-emerald-600 hover:underline text-xs ml-4">
              Dismiss
            </button>
          </div>
        )}

        {/* Privacy Safeguard */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-foreground">Strict Peer Privacy Protection:</span>{" "}
            <span className="text-muted-foreground">
              Under school data governance policies, parents can strictly view the academic scores of their verified linked children. Peer student ranks and score sheets are protected.
            </span>
          </div>
        </div>

        {/* Performance Overview Banner */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
                Official Term Evaluation · {selectedTerm}
              </span>
              <h2 className="text-xl font-extrabold text-foreground mt-0.5">
                {activeChild.name} — {activeChild.classGroup}
              </h2>
              <p className="text-xs text-muted-foreground">
                Class Form Master: <strong>{activeChild.classTeacher.name}</strong> · Admission #{activeChild.admissionNo}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsReportCardModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-xs transition"
              >
                <Download className="w-4 h-4" />
                Download Verified PDF Report
              </button>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-canvas border border-border hover:bg-muted text-foreground font-semibold text-xs transition"
              >
                <HelpCircle className="w-4 h-4 text-muted-foreground" />
                Request Score Review
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-canvas border border-border">
              <span className="text-xs text-muted-foreground block">Term Cumulative Average</span>
              <span className="text-2xl font-black text-foreground">{overallAverage}%</span>
              <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Distinction Standing</span>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border">
              <span className="text-xs text-muted-foreground block">Grade Point Average</span>
              <span className="text-2xl font-black text-pink-600">{activeChild.gpa}</span>
              <span className="text-[11px] text-muted-foreground block mt-1">4.0 Academic Grading Scale</span>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border">
              <span className="text-xs text-muted-foreground block">Enrolled Subjects</span>
              <span className="text-2xl font-black text-blue-600">{activeChild.subjects.length} Subjects</span>
              <span className="text-[11px] text-muted-foreground block mt-1">100% Curriculum Completion</span>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border">
              <span className="text-xs text-muted-foreground block">Promotion Status</span>
              <span className="text-2xl font-black text-emerald-600">Cleared</span>
              <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Eligible for Advance Placement</span>
            </div>
          </div>
        </div>

        {/* Subject Score Breakdown Table */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Subject Name &amp; Instructor</th>
                  <th className="py-3 px-4 text-center">CA Marks (40)</th>
                  <th className="py-3 px-4 text-center">Exam Marks (60)</th>
                  <th className="py-3 px-4 text-center">Total (100)</th>
                  <th className="py-3 px-4 text-center">Grade</th>
                  <th className="py-3 px-4">Instructor Remark</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {activeChild.subjects.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-foreground">{sub.name}</div>
                      <div className="text-xs text-muted-foreground">{sub.teacher}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-medium text-foreground">
                      {sub.caScore}
                    </td>
                    <td className="py-3.5 px-4 text-center font-medium text-foreground">
                      {sub.examScore}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-foreground text-sm">
                      {sub.total}%
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                        {sub.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-muted-foreground italic max-w-xs">
                      {sub.total >= 90
                        ? "Exemplary mastery of theoretical and practical concepts."
                        : "Very good analytical rigor. Commendable effort throughout the term."}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setReviewSubject(sub.name);
                          setIsReviewModalOpen(true);
                        }}
                        className="px-2.5 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-medium text-foreground transition"
                      >
                        Inquire
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Request Result Review */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-pink-600" />
                  <h3 className="font-bold text-foreground text-base">Request Grade Re-Verification</h3>
                </div>
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleRequestReview} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Subject for Remarking</label>
                  <select
                    value={reviewSubject}
                    onChange={(e) => setReviewSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground font-medium"
                  >
                    {activeChild.subjects.map((s, i) => (
                      <option key={i} value={s.name}>
                        {s.name} (Current Mark: {s.total}%)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Reason for Query</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Student scored 39/40 on CA tests but exam score appears lower than mock results; request verification of script addition..."
                    value={reviewReason}
                    onChange={(e) => setReviewReason(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    required
                  />
                </div>

                <div className="p-3 rounded-xl bg-canvas border border-border text-[11px] text-muted-foreground">
                  The Head of Department will review the physical examination answer script against the official marking scheme and notify you within 3 working days.
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold"
                  >
                    Submit Review Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Official PDF Report Card Preview */}
        {isReportCardModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <span className="text-xs font-mono text-pink-600 font-bold">OFFICIAL TRANSCRIPT · QR-VERIFIED</span>
                  <h3 className="font-bold text-foreground text-base">Terminal Academic Report Card</h3>
                </div>
                <button
                  onClick={() => setIsReportCardModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              {/* Printable Report Card Sheet */}
              <div className="p-6 rounded-xl bg-canvas border border-border space-y-4 text-xs">
                <div className="text-center pb-3 border-b border-border">
                  <h4 className="font-black text-sm uppercase text-foreground">Riverside International College</h4>
                  <p className="text-muted-foreground text-[11px]">Academic Registrar &amp; Assessment Directorate</p>
                  <p className="font-bold text-pink-600 mt-1">
                    Continuous Assessment &amp; Terminal Report — {selectedTerm}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[11px]">
                  <div>
                    <span className="text-muted-foreground">Student Name:</span>{" "}
                    <span className="font-bold text-foreground">{activeChild.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground">Admission No:</span>{" "}
                    <span className="font-mono font-bold text-foreground">{activeChild.admissionNo}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Class &amp; Stream:</span>{" "}
                    <span className="font-semibold text-foreground">{activeChild.classGroup}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground">Term GPA:</span>{" "}
                    <span className="font-black text-emerald-600">{activeChild.gpa}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-card border border-border">
                  <div className="flex justify-between font-bold text-foreground">
                    <span>Overall Terminal Average:</span>
                    <span>{overallAverage}%</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    Form Master Remark: "An exceptionally dedicated scholar who has demonstrated outstanding academic leadership and exemplary discipline."
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    Principal's Executive Endorsement: "Promoted with honors. Keep up the high standard."
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-muted-foreground flex justify-between">
                  <span>Cryptographic Seal: SHA256-RVS-2026-OK</span>
                  <span>Date Issued: Jan 25, 2026</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => {
                    alert(`Printing official report card for ${activeChild.name}...`);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted text-foreground flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Official Document
                </button>
                <button
                  onClick={() => {
                    alert(`Downloading verified PDF report card for ${activeChild.name}...`);
                    setIsReportCardModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-700 text-white flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Verified PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
