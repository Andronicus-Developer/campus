"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  AlertCircle,
  AlertTriangle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  Download,
  Eye,
  FileCheck,
  FileText,
  Filter,
  GraduationCap,
  LineChart,
  MessageSquare,
  PlusCircle,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

interface SyllabusCoverageItem {
  id: string;
  department: string;
  subject: string;
  classArm: string;
  teacher: string;
  completedTopics: number;
  totalTopics: number;
  coveragePct: number;
  status: "on-track" | "ahead" | "behind";
  currentTopic: string;
  notes: string;
}

const SYLLABUS_DATA: SyllabusCoverageItem[] = [
  {
    id: "syl-1",
    department: "Sciences Division",
    subject: "Chemistry",
    classArm: "SSS 3 Science A & B",
    teacher: "Dr. Kenneth Obi",
    completedTopics: 9,
    totalTopics: 10,
    coveragePct: 90,
    status: "on-track",
    currentTopic: "Organic Reaction Mechanisms & WAEC Practicals",
    notes: "Practical sessions completed in Lab 1. Ready for mock examinations.",
  },
  {
    id: "syl-2",
    department: "Sciences Division",
    subject: "Further Mathematics",
    classArm: "SSS 2 Science A",
    teacher: "Mr. David Alabi",
    completedTopics: 6,
    totalTopics: 9,
    coveragePct: 67,
    status: "behind",
    currentTopic: "Vector Geometry & Differential Calculus",
    notes: "Lagging by 1 topic due to sports week interruption. Remedial booster session scheduled for Thursdays.",
  },
  {
    id: "syl-3",
    department: "Sciences Division",
    subject: "Biology",
    classArm: "SSS 1 Science",
    teacher: "Mrs. Grace Okon",
    completedTopics: 8,
    totalTopics: 9,
    coveragePct: 89,
    status: "on-track",
    currentTopic: "Genetics & Hereditary Characteristics",
    notes: "Cover teacher handled week 7 seamlessly. On schedule.",
  },
  {
    id: "syl-4",
    department: "Arts & Humanities",
    subject: "Literature in English",
    classArm: "SSS 2 Arts",
    teacher: "Mrs. Ngozi Udoh",
    completedTopics: 8,
    totalTopics: 8,
    coveragePct: 100,
    status: "ahead",
    currentTopic: "African Poetry: Analysis of 'Ambush' & Revision",
    notes: "Syllabus completed 1 week ahead. Reviewing past paper essay structures.",
  },
  {
    id: "syl-5",
    department: "Commercial Division",
    subject: "Financial Accounting",
    classArm: "SSS 2 Commercial",
    teacher: "Mr. Friday Eze",
    completedTopics: 7,
    totalTopics: 8,
    coveragePct: 88,
    status: "on-track",
    currentTopic: "Partnership Accounts & Goodwill Valuation",
    notes: "Students responding well to ledger balance balance sheets.",
  },
  {
    id: "syl-6",
    department: "Junior Secondary",
    subject: "Basic Science & Technology",
    classArm: "JSS 2 Gold & Silver",
    teacher: "Ms. Chioma Okon",
    completedTopics: 7,
    totalTopics: 9,
    coveragePct: 78,
    status: "behind",
    currentTopic: "Kinetic Theory & Thermal Energy Transfer",
    notes: "Extra workshop scheduled during club period on Wednesday.",
  },
];

interface LessonPlanItem {
  id: string;
  teacher: string;
  subject: string;
  classArm: string;
  week: number;
  topic: string;
  submittedAt: string;
  status: "approved" | "pending" | "revision-requested";
  feedback?: string;
}

const LESSON_PLANS: LessonPlanItem[] = [
  {
    id: "lp-1",
    teacher: "Dr. Kenneth Obi",
    subject: "Chemistry",
    classArm: "SSS 3 Science",
    week: 8,
    topic: "Titration Techniques and Redox Reactions",
    submittedAt: "Feb 17, 08:30 AM",
    status: "approved",
    feedback: "Comprehensive lab safety outline and clear behavioral objectives.",
  },
  {
    id: "lp-2",
    teacher: "Mr. David Alabi",
    subject: "Further Mathematics",
    classArm: "SSS 2 Science",
    week: 8,
    topic: "Integration by Substitution and Applications",
    submittedAt: "Feb 18, 09:15 AM",
    status: "pending",
  },
  {
    id: "lp-3",
    teacher: "Mrs. Ngozi Udoh",
    subject: "Literature in English",
    classArm: "SSS 2 Arts",
    week: 8,
    topic: "Themes of Colonialism in Post-Colonial Drama",
    submittedAt: "Feb 16, 04:20 PM",
    status: "approved",
    feedback: "Excellent peer-discussion prompts included.",
  },
  {
    id: "lp-4",
    teacher: "Mr. Friday Eze",
    subject: "Financial Accounting",
    classArm: "SSS 2 Commercial",
    week: 8,
    topic: "Manufacturing Accounts & Direct Cost Allocation",
    submittedAt: "Feb 18, 11:00 AM",
    status: "pending",
  },
  {
    id: "lp-5",
    teacher: "Ms. Chioma Okon",
    subject: "Basic Science",
    classArm: "JSS 2 Gold",
    week: 8,
    topic: "Solar System and Gravitational Fields",
    submittedAt: "Feb 17, 02:45 PM",
    status: "approved",
    feedback: "Good use of multimedia projection models.",
  },
];

interface ObservationItem {
  id: string;
  teacher: string;
  subject: string;
  classArm: string;
  date: string;
  observer: string;
  rating: number; // out of 5
  strengths: string;
  recommendations: string;
}

const OBSERVATION_LOGS: ObservationItem[] = [
  {
    id: "obs-1",
    teacher: "Dr. Kenneth Obi",
    subject: "Chemistry Practical",
    classArm: "SSS 3 Science A",
    date: "Feb 12, 2026",
    observer: "Dr. Evelyn Peters (Principal)",
    rating: 4.8,
    strengths: "Exceptional mastery of subject matter, meticulous lab safety adherence, interactive questioning.",
    recommendations: "Encourage quieter students in rear workstations to lead data recording.",
  },
  {
    id: "obs-2",
    teacher: "Mrs. Ngozi Udoh",
    subject: "English Literature",
    classArm: "SSS 2 Arts",
    date: "Feb 06, 2026",
    observer: "Dr. Evelyn Peters (Principal)",
    rating: 4.6,
    strengths: "Vibrant classroom debate, students referenced text citations unprompted.",
    recommendations: "Provide graphic organizer handouts for thematic breakdown.",
  },
  {
    id: "obs-3",
    teacher: "Mr. Friday Eze",
    subject: "Commerce & Accounting",
    classArm: "SSS 1 Commercial",
    date: "Jan 28, 2026",
    observer: "Mr. David Alabi (VP Academics)",
    rating: 4.2,
    strengths: "Clear whiteboard illustrations of balance sheets and ledgers.",
    recommendations: "Incorporate spreadsheet software demo into secondary commercial curriculum.",
  },
];

export default function PrincipalAcademicsPage() {
  const [activeTab, setActiveTab] = useState<"syllabus" | "lesson-plans" | "observations" | "targets">("syllabus");
  const [plans, setPlans] = useState<LessonPlanItem[]>(LESSON_PLANS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleApprovePlan = (id: string, teacher: string) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "approved", feedback: "Approved by Principal without reservation." } : p))
    );
    showToast(`Lesson plan approved for ${teacher}.`);
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
                  Section B · Academic Leadership
                </span>
                <span className="font-mono text-xs text-ink-muted">Term 2 · Week 8 of 12</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Curriculum Oversight &amp; Academic Standards</h2>
              <p className="text-xs text-ink-muted max-w-3xl">
                Oversee curriculum implementation, audit department syllabus completion, evaluate lesson plans, conduct classroom observations, and coordinate remedial targets for academic excellence.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Overall Syllabus Coverage</span>
                <span className="text-lg font-black text-primary">88.4%</span>
              </div>
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Lesson Plans Submitted</span>
                <span className="text-lg font-black text-emerald-600">44 / 48 (91.7%)</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4">
            <button
              type="button"
              onClick={() => setActiveTab("syllabus")}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "syllabus"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface-raised text-ink-muted hover:text-ink"
              }`}
            >
              <LineChart className="size-3.5" />
              <span>Syllabus Coverage &amp; Gaps</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("lesson-plans")}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "lesson-plans"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface-raised text-ink-muted hover:text-ink"
              }`}
            >
              <FileCheck className="size-3.5" />
              <span>Lesson Plans &amp; Schemes ({plans.filter((p) => p.status === "pending").length} Pending)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("observations")}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "observations"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface-raised text-ink-muted hover:text-ink"
              }`}
            >
              <Eye className="size-3.5" />
              <span>Teaching Quality &amp; Observations</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("targets")}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "targets"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-surface-raised text-ink-muted hover:text-ink"
              }`}
            >
              <Target className="size-3.5" />
              <span>Academic Targets &amp; Remedials</span>
            </button>
          </div>
        </div>

        {/* TAB 1: SYLLABUS COVERAGE & GAP ANALYSIS */}
        {activeTab === "syllabus" && (
          <div className="space-y-6">
            {/* Division Metric Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
                <span className="font-mono text-[10px] font-bold text-primary uppercase">Sciences Division</span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-mono text-2xl font-extrabold text-ink">91.2%</span>
                  <span className="font-mono text-xs font-bold text-emerald-600">On Track</span>
                </div>
                <p className="mt-1 text-xs text-ink-muted">214 students · 6 class arms</p>
                <div className="mt-3 h-2 w-full rounded-full bg-surface-raised overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "91.2%" }} />
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
                <span className="font-mono text-[10px] font-bold text-accent uppercase">Arts &amp; Humanities</span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-mono text-2xl font-extrabold text-ink">88.5%</span>
                  <span className="font-mono text-xs font-bold text-emerald-600">On Track</span>
                </div>
                <p className="mt-1 text-xs text-ink-muted">198 students · 6 class arms</p>
                <div className="mt-3 h-2 w-full rounded-full bg-surface-raised overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: "88.5%" }} />
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
                <span className="font-mono text-[10px] font-bold text-amber-600 uppercase">Commercial Division</span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-mono text-2xl font-extrabold text-ink">89.0%</span>
                  <span className="font-mono text-xs font-bold text-emerald-600">On Track</span>
                </div>
                <p className="mt-1 text-xs text-ink-muted">142 students · 4 class arms</p>
                <div className="mt-3 h-2 w-full rounded-full bg-surface-raised overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "89%" }} />
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
                <span className="font-mono text-[10px] font-bold text-indigo-600 uppercase">Junior Secondary</span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-mono text-2xl font-extrabold text-ink">86.4%</span>
                  <span className="font-mono text-xs font-bold text-amber-600">Remedial Booster</span>
                </div>
                <p className="mt-1 text-xs text-ink-muted">288 students · 12 class arms</p>
                <div className="mt-3 h-2 w-full rounded-full bg-surface-raised overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "86.4%" }} />
                </div>
              </div>
            </div>

            {/* Detailed Subject Syllabus Audit Table */}
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                <div>
                  <h3 className="text-base font-extrabold text-ink">Departmental Curriculum Audit &amp; Gaps</h3>
                  <p className="text-xs text-ink-muted">
                    Topic milestones vs. academic scheme of work targets for Term 2.
                  </p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 font-mono text-xs font-bold text-amber-800 border border-amber-200">
                  2 Subjects Require Remedial Pacing
                </span>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                      <th className="pb-3 font-bold uppercase">Subject &amp; Class</th>
                      <th className="pb-3 font-bold uppercase">Instructor</th>
                      <th className="pb-3 font-bold uppercase">Department</th>
                      <th className="pb-3 font-bold uppercase">Current Topic</th>
                      <th className="pb-3 font-bold uppercase">Coverage</th>
                      <th className="pb-3 font-bold uppercase">Pacing Status</th>
                      <th className="pb-3 font-bold uppercase text-right">Academic Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-soft">
                    {SYLLABUS_DATA.map((row) => (
                      <tr key={row.id} className="hover:bg-surface-raised transition-colors">
                        <td className="py-3.5">
                          <span className="font-bold text-ink block">{row.subject}</span>
                          <span className="font-mono text-[11px] text-ink-muted">{row.classArm}</span>
                        </td>
                        <td className="py-3.5 font-medium text-ink">{row.teacher}</td>
                        <td className="py-3.5 text-ink-soft">{row.department}</td>
                        <td className="py-3.5 font-medium text-ink max-w-xs">{row.currentTopic}</td>
                        <td className="py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-ink">{row.coveragePct}%</span>
                            <span className="font-mono text-[10px] text-ink-muted">
                              ({row.completedTopics}/{row.totalTopics})
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5">
                          {row.status === "on-track" ? (
                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700 border border-emerald-200">
                              On Track
                            </span>
                          ) : row.status === "ahead" ? (
                            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-blue-700 border border-blue-200">
                              Ahead of Target
                            </span>
                          ) : (
                            <span className="rounded-full bg-rose-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-rose-700 border border-rose-200 animate-pulse">
                              Behind Schedule
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 text-right text-ink-muted text-[11px] max-w-xs">
                          {row.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LESSON PLANS & SCHEMES OF WORK */}
        {activeTab === "lesson-plans" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Lesson-Plan Submissions (Week 8)</h3>
                <p className="text-xs text-ink-muted">
                  Audit lesson plans for clear instructional objectives, laboratory safety standards, and pedagogical quality.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-primary">
                {plans.filter((p) => p.status === "pending").length} Awaiting Principal Approval
              </span>
            </div>

            <div className="space-y-3">
              {plans.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-line bg-surface-raised p-4 transition-all hover:border-primary/40"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-primary-light px-2 py-0.5 font-mono text-[10px] font-bold text-primary">
                          Week {p.week} Plan
                        </span>
                        <span className="font-mono text-[11px] text-ink-muted">{p.submittedAt}</span>
                      </div>
                      <h4 className="text-sm font-bold text-ink">
                        {p.subject} ({p.classArm}) — <span className="text-primary">{p.topic}</span>
                      </h4>
                      <p className="text-xs text-ink-muted">Instructor: <strong>{p.teacher}</strong></p>
                      {p.feedback && (
                        <div className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50/50 p-2 text-[11px] text-emerald-800 flex items-center gap-1.5">
                          <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                          <span><strong>Feedback:</strong> {p.feedback}</span>
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 text-right">
                      {p.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success-light px-3 py-1 font-mono text-xs font-bold text-success-deep">
                          <CheckCircle2 className="size-3.5" />
                          Approved
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => alert(`Reviewing PDF schema for: ${p.topic}`)}
                            className="rounded-xl border border-line bg-surface px-3 py-1.5 font-mono text-xs font-semibold text-ink hover:border-primary"
                          >
                            Inspect PDF
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApprovePlan(p.id, p.teacher)}
                            className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3.5 py-1.5 font-mono text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                          >
                            <CheckCircle2 className="size-3.5" />
                            <span>Approve Plan</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TEACHING QUALITY & OBSERVATIONS */}
        {activeTab === "observations" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Classroom Observations &amp; Teaching Appraisals</h3>
                <p className="text-xs text-ink-muted">
                  Recorded pedagogical observations, instructional rubric ratings, and structured executive recommendations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => alert("Initiating new Classroom Observation Rubric session")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 font-mono text-xs font-bold text-white shadow-sm hover:bg-primary-hover"
              >
                <PlusCircle className="size-3.5" />
                <span>Log New Observation</span>
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {OBSERVATION_LOGS.map((obs) => (
                <div key={obs.id} className="rounded-2xl border border-line bg-surface-raised p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary">{obs.date}</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800 border border-emerald-200">
                      ★ {obs.rating} / 5.0
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-ink">{obs.teacher}</h4>
                    <p className="font-mono text-xs text-ink-muted">{obs.subject} · {obs.classArm}</p>
                    <span className="text-[10px] text-ink-muted block mt-0.5">Observer: {obs.observer}</span>
                  </div>

                  <div className="rounded-xl border border-line bg-surface p-2.5 text-xs space-y-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-emerald-700 block">Observed Strengths</span>
                    <p className="text-ink-soft leading-relaxed">{obs.strengths}</p>
                  </div>

                  <div className="rounded-xl border border-line bg-surface p-2.5 text-xs space-y-1">
                    <span className="font-mono text-[10px] uppercase font-bold text-primary block">Principal Recommendations</span>
                    <p className="text-ink-soft leading-relaxed">{obs.recommendations}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ACADEMIC TARGETS & REMEDIALS */}
        {activeTab === "targets" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
            <div className="border-b border-line pb-4">
              <h3 className="text-base font-extrabold text-ink">Academic Improvement Targets &amp; Remedial Clinics</h3>
              <p className="text-xs text-ink-muted">
                Institutional targets set for Term 2 examinations and enrichment tracks for high achievers and students needing support.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-primary/20 bg-primary-light/20 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="size-4 text-primary" />
                  <h4 className="text-sm font-bold text-ink">Target 1: WAEC SSS 3 Distinction Goal (95%+)</h4>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Targeting minimum 5 credits including English &amp; Mathematics across all 124 senior candidates.
                </p>
                <div className="rounded-xl border border-primary/20 bg-surface p-3 text-xs space-y-1 font-mono">
                  <div className="flex justify-between"><span>Current Mock Baseline:</span><span className="font-bold text-ink">94.2%</span></div>
                  <div className="flex justify-between"><span>Intervention Clinic:</span><span className="font-bold text-primary">Saturday Intensive Clinics</span></div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/30 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-emerald-600" />
                  <h4 className="text-sm font-bold text-ink">Target 2: Junior Division STEM Enrichment</h4>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Introduce coding, robotics lab modules, and science fair mentorship for JSS 1 to 3 students.
                </p>
                <div className="rounded-xl border border-emerald-500/20 bg-surface p-3 text-xs space-y-1 font-mono">
                  <div className="flex justify-between"><span>Active Participants:</span><span className="font-bold text-emerald-600">86 Students</span></div>
                  <div className="flex justify-between"><span>Lead Faculty:</span><span className="font-bold text-ink">Dr. Kenneth Obi</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
