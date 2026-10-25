"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  User,
  Calendar,
  MessageSquare,
  ShieldCheck,
  ShieldAlert,
  Send,
  HelpCircle,
  FileText,
} from "lucide-react";

export default function StudentSupportPage() {
  const [requestHelpModalOpen, setRequestHelpModalOpen] = useState(false);
  const [supportSubject, setSupportSubject] = useState("Economics");
  const [supportType, setSupportType] = useState("Teacher 1-on-1 Consultation");
  const [supportTopic, setSupportTopic] = useState("");
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportTopic.trim()) return;
    setSupportSubmitted(true);
    setTimeout(() => {
      setSupportSubmitted(false);
      setSupportTopic("");
      setRequestHelpModalOpen(false);
      alert(`Academic assistance consultation for ${supportSubject} requested. The Form Master and instructor have been notified.`);
    }, 1200);
  };

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <Sparkles className="size-4" />
              Student Portal · Academic Growth & Remediation
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Learning Support & Academic Progress
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Personal academic standing radar, approved accommodations, teacher recommendations, and consultation requests.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setRequestHelpModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Send className="size-4" />
              Request Academic Help / Consultation
            </button>
          </div>
        </div>

        {/* Privacy & Safeguarding Notice */}
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs flex items-start gap-3">
          <ShieldCheck className="size-5 text-cyan-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-ink-soft">
            <span className="font-bold text-ink block">Academic Support & Privacy Protocol</span>
            <p>
              This portal tracks pedagogical recommendations and approved classroom accommodations.
              In accordance with child protection standards, sensitive clinical counselling, safeguarding case files,
              and confidential psychological notes are strictly segregated and not displayed in the student portal.
            </p>
          </div>
        </div>

        {/* Academic Radar: Strengths & Focus Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths Card */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Award className="size-5 text-emerald-600" />
                <h3 className="font-extrabold text-foreground text-base">Key Academic Strengths</h3>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600">Top 5% Cohort</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm block">
                  Further Mathematics & Calculus (94% Average)
                </span>
                <p className="text-muted-foreground">
                  Superior analytical modeling, matrix algebraic reduction, and rapid problem-solving speed.
                  Recommended for National STEM Olympiad representation.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm block">
                  Computer Science & Python Coding (98% Average)
                </span>
                <p className="text-muted-foreground">
                  Flawless object-oriented programming implementation, algorithm optimization, and ICT project leadership.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm block">
                  Physics Experimental Technique (92% Average)
                </span>
                <p className="text-muted-foreground">
                  Precise potentiometer null-deflection balancing, meticulous error bar deduction, and clean lab documentation.
                </p>
              </div>
            </div>
          </div>

          {/* Growth & Target Areas */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="size-5 text-amber-500" />
                <h3 className="font-extrabold text-foreground text-base">Target Areas for Improvement</h3>
              </div>
              <span className="font-mono text-xs font-bold text-amber-500">Actionable Remediation</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-300 text-sm block">
                  Economics: Demand Elasticity Curves & Macro Calculations (81%)
                </span>
                <p className="text-muted-foreground">
                  Review graphical shifts versus movements along the supply curve. Focus on formula deduction for cross-elasticity coefficients.
                </p>
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-cyan-600 hover:underline cursor-pointer">
                    → Launch Economics Remedial Worksheet 3
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-300 text-sm block">
                  English Language: Expository Argumentative Diction (85%)
                </span>
                <p className="text-muted-foreground">
                  Incorporate more sophisticated transitional connectives and tighten paragraph coherence in essay conclusion statements.
                </p>
                <div className="pt-1">
                  <span className="text-[11px] font-semibold text-cyan-600 hover:underline cursor-pointer">
                    → Review Essay Transitional Devices Guide
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <span className="font-bold text-amber-800 dark:text-amber-300 text-sm block">
                  Chemistry: Titration Meniscus Parallax Error Control (91%)
                </span>
                <p className="text-muted-foreground">
                  Ensure eye level is maintained perpendicular to burette calibration marks to eliminate concordant titre variances.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Approved Classroom Learning Accommodations */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-cyan-600" />
              <h3 className="font-extrabold text-foreground text-base">Approved Academic Accommodations</h3>
            </div>
            <span className="text-xs font-semibold text-muted-foreground">Active for 2025/2026 Academic Session</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-canvas border border-border space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground text-sm">Classroom Ergonomic Seating Placement</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                  Approved
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Front-middle row seating in Room 14 and Science Laboratories to optimize optical whiteboard view and teacher proximity.
              </p>
              <span className="text-[11px] font-mono text-muted-foreground block pt-1">
                Authorized by: Dr. Evelyn Peters (Principal) & Health Office
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-canvas border border-border space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground text-sm">STEM Olympiad Extended Laboratory Access</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                  Active Pass
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Supervised after-hours access to Physics Lab 2 and Chemistry Lab A on Thursdays for Olympiad experiment rehearsals.
              </p>
              <span className="text-[11px] font-mono text-muted-foreground block pt-1">
                Faculty Mentor: Mr. Chukwuma Eze & Dr. Peter Obi
              </span>
            </div>
          </div>
        </div>

        {/* Request Academic Assistance Modal */}
        {requestHelpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface border border-line rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <Send className="size-5 text-cyan-600" />
                  <h3 className="text-base font-extrabold text-ink">Request Academic Consultation / Support</h3>
                </div>
                <button
                  onClick={() => setRequestHelpModalOpen(false)}
                  className="size-7 rounded-lg hover:bg-surface-raised flex items-center justify-center text-ink-muted"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                Connect with your subject instructor or request peer tutoring assistance for challenging concepts.
                Sessions are scheduled during designated consultation periods.
              </p>

              <form onSubmit={handleSupportSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-ink font-semibold mb-1">Subject</label>
                  <select
                    value={supportSubject}
                    onChange={(e) => setSupportSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none"
                  >
                    <option value="Economics">Economics (Mr. B. Adeleke)</option>
                    <option value="English Language">English Language (Mrs. K. Adeleke)</option>
                    <option value="Chemistry">Chemistry (Dr. Peter Obi)</option>
                    <option value="Physics">Physics (Mr. Chukwuma Eze)</option>
                    <option value="Further Mathematics">Further Mathematics (Mr. David Alabi)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-1">Support Mode</label>
                  <select
                    value={supportType}
                    onChange={(e) => setSupportType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none"
                  >
                    <option value="Teacher 1-on-1 Consultation">Teacher 1-on-1 Consultation Hour</option>
                    <option value="Senior Peer Tutoring Group">Senior Peer Tutoring Study Group</option>
                    <option value="Remedial Practice Pack">Remedial Practice Pack & Problem Sets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-1">Specific Topics / Problem Sets Requiring Clarification</label>
                  <textarea
                    rows={4}
                    required
                    value={supportTopic}
                    onChange={(e) => setSupportTopic(e.target.value)}
                    placeholder="e.g. I need guidance on calculating cross elasticity of demand from table data and interpreting the sign of the coefficient..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRequestHelpModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line hover:bg-surface-raised font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={supportSubmitted}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
                  >
                    {supportSubmitted ? "Submitting..." : "Submit Consultation Request"}
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
