"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { BookOpen, CheckCircle2, Clock, FileText, Layers, Sparkles } from "lucide-react";

export default function TeacherCurriculumPage() {
  const topics = [
    { week: "Week 1", topic: "Quadratic Equations & Roots of Equations", status: "Completed", date: "Jan 12 - Jan 16" },
    { week: "Week 2", topic: "Simultaneous Linear & Quadratic Equations", status: "Completed", date: "Jan 19 - Jan 23" },
    { week: "Week 3", topic: "Indices, Logarithms & Exponential Equations", status: "Completed", date: "Jan 26 - Jan 30" },
    { week: "Week 4", topic: "Permutations & Combinations (Counting Principles)", status: "Completed", date: "Feb 02 - Feb 06" },
    { week: "Week 5", topic: "Binomial Expansion Theorem & Approximations", status: "Completed", date: "Feb 09 - Feb 13" },
    { week: "Week 6", topic: "Mid-Term Review & Continuous Assessment (CA1)", status: "Completed", date: "Feb 16 - Feb 20" },
    { week: "Week 7", topic: "Trigonometry: Compound & Double Angle Formulae", status: "Completed", date: "Feb 23 - Feb 27" },
    { week: "Week 8", topic: "Calculus: Differentiation from First Principles (Active)", status: "In Progress", date: "Mar 02 - Mar 06" },
    { week: "Week 9", topic: "Calculus: Product & Quotient Rules of Derivatives", status: "Upcoming", date: "Mar 09 - Mar 13" },
    { week: "Week 10", topic: "Coordinate Geometry: The Straight Line & Tangents", status: "Upcoming", date: "Mar 16 - Mar 20" },
  ];

  return (
    <DashboardLayout currentRole="teacher">
      <div className="space-y-6">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-[11px] font-bold text-violet-700">
                  Scheme of Work &amp; Syllabus
                </span>
                <span className="font-mono text-xs text-ink-muted">Subject: Further Mathematics · SSS 2</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Curriculum Coverage Tracker</h2>
              <p className="text-xs text-ink-muted">
                Term 2 syllabus milestones, lesson plans, laboratory experiments, and pacing guide.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs font-bold text-primary">
              Progress: 7 of 10 Modules (70% Covered)
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="space-y-3">
            {topics.map((t) => (
              <div
                key={t.week}
                className={`flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border text-xs ${
                  t.status === "In Progress"
                    ? "border-primary bg-primary-light/40 shadow-sm"
                    : "border-line bg-surface-raised"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-ink-muted w-16">{t.week}</span>
                  <div>
                    <span className="font-bold text-ink text-sm block">{t.topic}</span>
                    <span className="font-mono text-[11px] text-ink-muted">{t.date}</span>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase ${
                    t.status === "Completed"
                      ? "bg-success-light text-success-deep"
                      : t.status === "In Progress"
                      ? "bg-primary text-white"
                      : "bg-surface text-ink-muted"
                  }`}
                >
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
