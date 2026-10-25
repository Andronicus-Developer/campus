"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Layers,
  Sparkles,
  Plus,
  Send,
  Download,
  Check,
  ArrowRight,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

interface LessonTopic {
  id: string;
  week: string;
  topic: string;
  subtopic: string;
  learningObjectives: string;
  teachingMethod: string;
  durationMins: number;
  resourcesAttached: string[];
  status: "Completed" | "In Progress" | "Upcoming";
  date: string;
  hodReviewStatus: "Approved" | "Pending Review" | "Revisions Requested";
  hodFeedback?: string;
}

const INITIAL_TOPICS: LessonTopic[] = [
  {
    id: "top-1",
    week: "Week 1",
    topic: "Quadratic Equations & Roots of Equations",
    subtopic: "Sum and product of roots, formation of quadratic equations from roots",
    learningObjectives: "Students will be able to construct quadratic equations given symmetric roots α and β.",
    teachingMethod: "Guided Direct Instruction & Socratic Questioning",
    durationMins: 45,
    resourcesAttached: ["Worksheet_Quadratic_Roots.pdf", "Formulas_Summary_Sheet.png"],
    status: "Completed",
    date: "Jan 12 - Jan 16",
    hodReviewStatus: "Approved",
    hodFeedback: "Excellent pacing and clear practice problems.",
  },
  {
    id: "top-2",
    week: "Week 2",
    topic: "Simultaneous Linear & Quadratic Equations",
    subtopic: "Substitution method, graphical intersections and real-world trajectories",
    learningObjectives: "Solve systems of linear and non-linear simultaneous equations analytically.",
    teachingMethod: "Collaborative Small-Group Problem Solving",
    durationMins: 45,
    resourcesAttached: ["Graph_Paper_Template.pdf"],
    status: "Completed",
    date: "Jan 19 - Jan 23",
    hodReviewStatus: "Approved",
  },
  {
    id: "top-3",
    week: "Week 3",
    topic: "Indices, Logarithms & Exponential Equations",
    subtopic: "Laws of logarithms, change of base theorem, exponential growth models",
    learningObjectives: "Apply logarithmic laws to simplify multivariable algebraic expressions.",
    teachingMethod: "Worked Examples & Timed Mini-Quizzes",
    durationMins: 45,
    resourcesAttached: ["Logarithm_Reference_Cards.pdf"],
    status: "Completed",
    date: "Jan 26 - Jan 30",
    hodReviewStatus: "Approved",
  },
  {
    id: "top-4",
    week: "Week 4",
    topic: "Permutations & Combinations (Counting Principles)",
    subtopic: "Factorials, permutations with restrictions, combination selections",
    learningObjectives: "Differentiate between ordered permutations and unordered selections.",
    teachingMethod: "Card-sorting and probability hands-on exercises",
    durationMins: 45,
    resourcesAttached: ["Permutations_Worksheet_A.pdf"],
    status: "Completed",
    date: "Feb 02 - Feb 06",
    hodReviewStatus: "Approved",
  },
  {
    id: "top-5",
    week: "Week 5",
    topic: "Binomial Expansion Theorem & Approximations",
    subtopic: "Pascal's triangle, general term expansion, rational power approximation",
    learningObjectives: "Expand binomial expressions to arbitrary positive integer powers.",
    teachingMethod: "Interactive Whiteboard Derivations",
    durationMins: 45,
    resourcesAttached: ["Pascals_Triangle_Visual.pdf"],
    status: "Completed",
    date: "Feb 09 - Feb 13",
    hodReviewStatus: "Approved",
  },
  {
    id: "top-6",
    week: "Week 6",
    topic: "Mid-Term Review & Continuous Assessment (CA1)",
    subtopic: "Comprehensive review of weeks 1-5, formative diagnostic testing",
    learningObjectives: "Evaluate student baseline retention and identify remedial cohorts.",
    teachingMethod: "Standardized Timed Examination & Self-Assessment Rubric",
    durationMins: 90,
    resourcesAttached: ["CA1_Question_Paper_Master.pdf", "Marking_Guide_Rubric.pdf"],
    status: "Completed",
    date: "Feb 16 - Feb 20",
    hodReviewStatus: "Approved",
  },
  {
    id: "top-7",
    week: "Week 7",
    topic: "Trigonometry: Compound & Double Angle Formulae",
    subtopic: "Derivations of sin(A±B), cos(A±B), tan(A±B), proof of trigonometric identities",
    learningObjectives: "Prove and evaluate double-angle identities without electronic calculators.",
    teachingMethod: "Peer Proof Defense & Rigorous Deductions",
    durationMins: 45,
    resourcesAttached: ["Trigonometry_Identity_CheatSheet.pdf"],
    status: "Completed",
    date: "Feb 23 - Feb 27",
    hodReviewStatus: "Approved",
  },
  {
    id: "top-8",
    week: "Week 8",
    topic: "Calculus: Differentiation from First Principles (Active)",
    subtopic: "Secant slopes to tangent limits, definition of derivative f'(x) = lim[h→0]",
    learningObjectives: "Derive derivatives of polynomial functions f(x) = x^n using first principles.",
    teachingMethod: "Limit-definition visual graphs & guided algebraic expansion",
    durationMins: 45,
    resourcesAttached: ["First_Principles_Calculus_Notes.pdf", "Derivative_Practice_Set.pdf"],
    status: "In Progress",
    date: "Mar 02 - Mar 06",
    hodReviewStatus: "Pending Review",
    hodFeedback: "Submitted to Dr. Evelyn Peters (Principal) & STEM Department Head.",
  },
  {
    id: "top-9",
    week: "Week 9",
    topic: "Calculus: Product & Quotient Rules of Derivatives",
    subtopic: "Leibniz notation, differentiation of rational and composite functions",
    learningObjectives: "Apply product and quotient algorithms to differentiate rational polynomial fractions.",
    teachingMethod: "Algorithmic Step-by-Step Drills",
    durationMins: 45,
    resourcesAttached: ["Product_Quotient_Rules_Handout.pdf"],
    status: "Upcoming",
    date: "Mar 09 - Mar 13",
    hodReviewStatus: "Pending Review",
  },
  {
    id: "top-10",
    week: "Week 10",
    topic: "Coordinate Geometry: The Straight Line & Tangents",
    subtopic: "Perpendicular gradients, angle between two lines, normal vectors",
    learningObjectives: "Find tangent and normal equations to curves using coordinate geometry techniques.",
    teachingMethod: "Desmos digital plotting & graphing exercise",
    durationMins: 45,
    resourcesAttached: ["Coordinate_Geometry_Workbook.pdf"],
    status: "Upcoming",
    date: "Mar 16 - Mar 20",
    hodReviewStatus: "Pending Review",
  },
];

export default function TeacherCurriculumPage() {
  const [topics, setTopics] = useState<LessonTopic[]>(INITIAL_TOPICS);
  const [selectedTopic, setSelectedTopic] = useState<LessonTopic | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [newPlan, setNewPlan] = useState({
    topic: "",
    subtopic: "",
    learningObjectives: "",
    teachingMethod: "",
    durationMins: 45,
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleToggleCompleted = (id: string) => {
    setTopics((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "Completed" ? "In Progress" : "Completed",
            }
          : t
      )
    );
    showToast("Curriculum pacing tracker updated.");
  };

  const handleCreateLessonPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const created: LessonTopic = {
      id: `top-${Date.now()}`,
      week: `Week ${topics.length + 1}`,
      topic: newPlan.topic,
      subtopic: newPlan.subtopic,
      learningObjectives: newPlan.learningObjectives,
      teachingMethod: newPlan.teachingMethod,
      durationMins: newPlan.durationMins,
      resourcesAttached: ["Lesson_Notes_Draft.pdf"],
      status: "Upcoming",
      date: "Upcoming Module",
      hodReviewStatus: "Pending Review",
    };
    setTopics([...topics, created]);
    setCreateModalOpen(false);
    showToast(`Lesson plan "${newPlan.topic}" created and submitted for HOD review.`);
    setNewPlan({
      topic: "",
      subtopic: "",
      learningObjectives: "",
      teachingMethod: "",
      durationMins: 45,
    });
  };

  const completedCount = topics.filter((t) => t.status === "Completed").length;
  const coveragePct = Math.round((completedCount / topics.length) * 100);

  return (
    <DashboardLayout currentRole="teacher">
      <div className="space-y-6">
        {/* Top Banner & Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-[11px] font-bold text-violet-700">
                  Scheme of Work &amp; Syllabus
                </span>
                <span className="font-mono text-xs text-ink-muted">Subject: Further Mathematics · SSS 2</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Lesson Plans &amp; Curriculum Coverage</h2>
              <p className="text-xs text-ink-muted">
                Term 2 syllabus milestones, behavioral learning objectives, teaching methodologies, and HOD review approvals.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setCreateModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-violet-700 active:scale-95 transition-all"
              >
                <Plus className="size-4" />
                <span>+ Create Lesson Plan</span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Exporting Term 2 Scheme of Work & Lesson Plans to PDF.")}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-raised px-4 py-2 text-xs font-bold text-ink hover:border-violet-600 active:scale-95 transition-all shadow-sm"
              >
                <Download className="size-4" />
                <span>Export Scheme (PDF)</span>
              </button>
            </div>
          </div>

          {/* Curriculum Coverage Progress Bar */}
          <div className="p-4 rounded-2xl bg-surface-raised border border-line space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-ink">
                Term 2 Syllabus Pacing: {completedCount} of {topics.length} Units Completed
              </span>
              <span className="font-mono font-bold text-violet-700">{coveragePct}% Coverage</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-line overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${coveragePct}%` }}
              />
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

        {/* SECTION 1: SYLLABUS TOPICS & LESSON PLANS LIST */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-ink">Term 2 Weekly Modules &amp; Lesson Deliverables</h3>

          <div className="space-y-3">
            {topics.map((t) => (
              <div
                key={t.id}
                className={`p-4 rounded-2xl border transition-all text-xs ${
                  t.status === "In Progress"
                    ? "border-violet-500/60 bg-violet-500/5 shadow-sm"
                    : "border-line bg-surface-raised/70"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => handleToggleCompleted(t.id)}
                      className={`size-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        t.status === "Completed"
                          ? "bg-emerald-600 text-white"
                          : "border border-line bg-surface text-transparent hover:border-violet-600"
                      }`}
                      title="Toggle completed"
                    >
                      <Check className="size-3.5" />
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded text-[10px]">
                          {t.week}
                        </span>
                        <h4 className="font-black text-sm text-ink">{t.topic}</h4>
                        <span
                          className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                            t.status === "Completed"
                              ? "bg-emerald-100 text-emerald-800"
                              : t.status === "In Progress"
                              ? "bg-violet-100 text-violet-800 animate-pulse"
                              : "bg-surface text-ink-muted border border-line-soft"
                          }`}
                        >
                          {t.status}
                        </span>
                      </div>

                      <p className="text-xs text-ink-soft">{t.subtopic}</p>
                      <p className="text-[11px] text-ink-muted">
                        Target Objectives: <strong className="text-ink-soft">{t.learningObjectives}</strong>
                      </p>
                      <p className="text-[11px] text-ink-muted font-mono">
                        Teaching Strategy: {t.teachingMethod} · Duration: {t.durationMins} Mins · Date: {t.date}
                      </p>

                      {t.hodFeedback && (
                        <div className="mt-2 p-2.5 rounded-xl bg-surface border border-line-soft text-[11px] flex items-center gap-2">
                          <MessageSquare className="size-3.5 text-violet-600 shrink-0" />
                          <span>
                            <strong>HOD / Principal Feedback:</strong> {t.hodFeedback}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTopic(t);
                      }}
                      className="rounded-xl border border-line bg-surface px-3 py-1.5 font-mono text-xs font-bold text-ink hover:border-violet-600"
                    >
                      View Full Plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL: VIEW DETAILED LESSON PLAN */}
        {selectedTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2 text-ink">
                  <BookOpen className="size-5 text-violet-600" />
                  <h3 className="text-base font-extrabold">{selectedTopic.topic}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTopic(null)}
                  className="text-ink-muted hover:text-ink"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-semibold text-ink-muted block">Subtopic</span>
                  <span className="font-bold text-ink">{selectedTopic.subtopic}</span>
                </div>

                <div>
                  <span className="font-semibold text-ink-muted block">Specific Learning Outcomes (SWBAT)</span>
                  <p className="text-ink bg-surface-raised p-2.5 rounded-xl border border-line-soft">
                    {selectedTopic.learningObjectives}
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-ink-muted block">Instructional Method &amp; Activities</span>
                  <p className="text-ink">{selectedTopic.teachingMethod}</p>
                </div>

                <div>
                  <span className="font-semibold text-ink-muted block">Attached Lesson Materials</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedTopic.resourcesAttached.map((res, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 rounded-lg bg-surface-raised border border-line px-2.5 py-1 font-mono text-[11px] text-primary"
                      >
                        <FileText className="size-3" />
                        <span>{res}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => setSelectedTopic(null)}
                  className="rounded-xl bg-violet-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-violet-700"
                >
                  Close Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CREATE LESSON PLAN */}
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2 text-ink">
                  <Plus className="size-5 text-violet-600" />
                  <h3 className="text-base font-extrabold">Create New Lesson Plan</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="text-ink-muted hover:text-ink"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateLessonPlan} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Curriculum Topic</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Integral Calculus: Definite Integrals"
                    value={newPlan.topic}
                    onChange={(e) => setNewPlan({ ...newPlan, topic: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Subtopics &amp; Scope</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Riemann sums, Fundamental Theorem of Calculus"
                    value={newPlan.subtopic}
                    onChange={(e) => setNewPlan({ ...newPlan, subtopic: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Learning Objectives (SWBAT)</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Students will be able to calculate area under curves..."
                    value={newPlan.learningObjectives}
                    onChange={(e) => setNewPlan({ ...newPlan, learningObjectives: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-ink-muted mb-1">Teaching Method</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Inquiry-based lab"
                      value={newPlan.teachingMethod}
                      onChange={(e) => setNewPlan({ ...newPlan, teachingMethod: e.target.value })}
                      className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-ink-muted mb-1">Duration (Minutes)</label>
                    <input
                      type="number"
                      required
                      value={newPlan.durationMins}
                      onChange={(e) => setNewPlan({ ...newPlan, durationMins: parseInt(e.target.value) || 45 })}
                      className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink"
                    />
                  </div>
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
                    Save &amp; Submit for HOD Review
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
