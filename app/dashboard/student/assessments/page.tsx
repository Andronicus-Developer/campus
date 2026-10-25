"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  ClipboardCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Award,
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  FileText,
  Calendar,
} from "lucide-react";

interface AssessmentItem {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  type: "Online Quiz" | "Written Exam" | "Lab Practical";
  scheduledWindow: string;
  durationMins: number;
  totalMarks: number;
  status: "active_now" | "upcoming" | "completed";
  score?: number;
  instructions: string;
  venue: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctExplanation?: string;
}

export default function StudentAssessmentsPage() {
  const [activeTab, setActiveTab] = useState<"available" | "past">("available");
  const [quizSimulatorOpen, setQuizSimulatorOpen] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [confirmSubmitModal, setConfirmSubmitModal] = useState(false);

  const assessments: AssessmentItem[] = [
    {
      id: "as-101",
      title: "Physics Continuous Assessment 2 (Electricity & Magnetism)",
      subject: "Physics",
      teacher: "Mr. Chukwuma Eze",
      type: "Online Quiz",
      scheduledWindow: "Today · 08:00 AM - 06:00 PM",
      durationMins: 15,
      totalMarks: 15,
      status: "active_now",
      instructions: "5 Computer-Based Questions on Ohm's Law, Wheatstone Bridge, and internal resistance. Once started, the timer will not pause.",
      venue: "Computer-Based Testing (CBT) Portal",
    },
    {
      id: "as-102",
      title: "Term 2 Mid-Term Examination: Further Mathematics",
      subject: "Further Mathematics",
      teacher: "Mr. David Alabi",
      type: "Written Exam",
      scheduledWindow: "Monday, Feb 16 · 09:00 - 11:00 AM",
      durationMins: 120,
      totalMarks: 60,
      status: "upcoming",
      instructions: "Section A (Compulsory Short Answers) and Section B (Answer 4 of 6 structural questions). Non-programmable calculators allowed.",
      venue: "Examination Hall B (Desk 42)",
    },
    {
      id: "as-103",
      title: "Chemistry Volumetric Lab Practical Assessment",
      subject: "Chemistry",
      teacher: "Dr. Peter Obi",
      type: "Lab Practical",
      scheduledWindow: "Wednesday, Feb 18 · 09:00 - 11:30 AM",
      durationMins: 150,
      totalMarks: 40,
      status: "upcoming",
      instructions: "Individual bench apparatus. Standardize 0.05M Na2CO3 against unknown HCl. Report average concordance to two decimal places.",
      venue: "Chemistry Lab A (Bench 12)",
    },
    {
      id: "as-104",
      title: "Computer Science Python Algorithms CBT Quiz 1",
      subject: "Computer Science",
      teacher: "Engr. Sam Bello",
      type: "Online Quiz",
      scheduledWindow: "Completed Jan 29, 2026",
      durationMins: 20,
      totalMarks: 20,
      status: "completed",
      score: 20,
      instructions: "Multiple choice on time complexity and Python dictionary operations.",
      venue: "CBT Portal",
    },
    {
      id: "as-105",
      title: "Biology Term 1 Examination (Annual Comprehensive)",
      subject: "Biology",
      teacher: "Mrs. Grace Okon",
      type: "Written Exam",
      scheduledWindow: "Completed Dec 14, 2025",
      durationMins: 120,
      totalMarks: 60,
      status: "completed",
      score: 53,
      instructions: "Comprehensive evaluation of cells, physiology, and plant ecology.",
      venue: "Examination Hall B",
    },
  ];

  const sampleQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "According to Ohm's Law, what is the mathematical relationship between Voltage (V), Current (I), and Resistance (R) under constant temperature?",
      options: ["V = I / R", "V = I × R", "I = V × R", "R = V × I"],
      correctExplanation: "Ohm's Law states that V = I × R. The electric potential difference is directly proportional to the current through the conductor.",
    },
    {
      id: 2,
      question: "A cell of electromotive force (EMF) 2.0V and internal resistance 0.5Ω is connected to an external resistor of 3.5Ω. What is the total current flowing in the circuit?",
      options: ["0.25 A", "0.50 A", "1.00 A", "2.00 A"],
      correctExplanation: "Total resistance R_total = 3.5Ω + 0.5Ω = 4.0Ω. Current I = E / R_total = 2.0V / 4.0Ω = 0.50 A.",
    },
    {
      id: 3,
      question: "Which of the following instruments is designed to measure electrical potential difference without drawing current from the circuit at balance?",
      options: ["Moving Coil Voltmeter", "Metre Bridge", "Potentiometer", "Ballistic Galvanometer"],
      correctExplanation: "A potentiometer operates on the null deflection principle, drawing zero current from the source at balance.",
    },
    {
      id: 4,
      question: "In a Wheatstone Bridge circuit, what condition must be satisfied for zero current to flow through the central galvanometer?",
      options: ["R1 × R4 = R2 × R3", "R1 + R4 = R2 + R3", "R1 / R2 = R4 / R3", "R1 × R2 = R3 × R4"],
      correctExplanation: "At bridge balance, the ratio of opposite arm resistances is equal: R1 / R2 = R3 / R4, meaning R1 × R4 = R2 × R3.",
    },
    {
      id: 5,
      question: "What is the SI unit of electric resistivity (ρ)?",
      options: ["Ohm (Ω)", "Ohm per metre (Ω/m)", "Ohm-metre (Ω·m)", "Siemens per metre (S/m)"],
      correctExplanation: "Resistivity ρ = (R × A) / L has SI units of (Ω × m²) / m = Ω·m (Ohm-metre).",
    },
  ];

  // Timer countdown
  useEffect(() => {
    if (!quizSimulatorOpen || quizSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setQuizSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [quizSimulatorOpen, quizSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx,
    }));
  };

  const handleFinishQuiz = () => {
    setConfirmSubmitModal(false);
    setQuizSubmitted(true);
  };

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <ClipboardCheck className="size-4" />
              Student Portal · Examination & CBT Terminal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Online Tests & Examinations
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Authorized computer-based assessments, examination venue allocations, and released score breakdowns.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-mono text-xs font-bold">
              1 Active Testing Window
            </span>
          </div>
        </div>

        {/* Security / FERPA Safeguards Banner */}
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs flex items-start gap-3">
          <ShieldCheck className="size-5 text-cyan-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-ink-soft">
            <span className="font-bold text-ink block">Assessment Integrity & Privacy Protection</span>
            <p>
              In accordance with school academic policy, answer keys for active assessments and other students&apos;
              responses remain strictly confidential. Results and permitted pedagogical explanations are released
              only after authorized moderation by the Form Master and CAO.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("available")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === "available"
                ? "bg-cyan-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Clock className="size-4" />
            Scheduled & Active Tests
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === "past"
                ? "bg-cyan-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Award className="size-4" />
            Released Results & History
          </button>
        </div>

        {/* TAB 1: Scheduled & Active Tests */}
        {activeTab === "available" && (
          <div className="space-y-4">
            {assessments
              .filter((a) => a.status !== "completed")
              .map((test) => (
                <div
                  key={test.id}
                  className={`p-6 rounded-3xl bg-card border transition shadow-xs space-y-4 ${
                    test.status === "active_now"
                      ? "border-purple-500/40 ring-1 ring-purple-500/30"
                      : "border-border"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono text-xs font-bold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-800">
                          {test.subject}
                        </span>
                        <span className="text-xs text-muted-foreground">Examiner: {test.teacher}</span>
                        <span className="text-xs font-medium text-foreground">· Duration: {test.durationMins} Mins</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-foreground">
                        {test.title}
                      </h3>

                      <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                        {test.instructions}
                      </p>
                    </div>

                    <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                      {test.status === "active_now" ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white animate-pulse">
                          ● Testing Window Open
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-card border border-border text-foreground">
                          Scheduled Assessment
                        </span>
                      )}

                      <span className="font-mono text-xs font-bold text-cyan-600">
                        Max Marks: {test.totalMarks} Points
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <span className="text-muted-foreground block text-[11px]">Testing Venue & Window:</span>
                      <span className="font-semibold text-foreground">{test.venue} · {test.scheduledWindow}</span>
                    </div>

                    {test.status === "active_now" ? (
                      <button
                        onClick={() => {
                          setTimeLeft(600);
                          setQuizSubmitted(false);
                          setSelectedAnswers({});
                          setCurrentQuestionIdx(0);
                          setQuizSimulatorOpen(true);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition"
                      >
                        <Play className="size-4 fill-current" />
                        Launch Assessment Simulator
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Assessment instructions for "${test.title}" are registered on your student examination ticket.`)}
                        className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-foreground font-medium text-xs transition"
                      >
                        View Instructions Slip
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* TAB 2: Past Released Results */}
        {activeTab === "past" && (
          <div className="space-y-4">
            {assessments
              .filter((a) => a.status === "completed")
              .map((test) => (
                <div
                  key={test.id}
                  className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-800">
                        {test.subject}
                      </span>
                      <h3 className="text-base font-bold text-foreground mt-1">{test.title}</h3>
                      <p className="text-xs text-muted-foreground">{test.scheduledWindow} · Examiner: {test.teacher}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black text-emerald-600">
                        {test.score} / {test.totalMarks}
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-600">
                        Verified & Released
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{test.instructions}</span>
                    <button
                      onClick={() => alert(`Opening detailed pedagogical question breakdown and teacher notes for ${test.title}`)}
                      className="inline-flex items-center gap-1 font-semibold text-cyan-600 hover:underline"
                    >
                      <span>Review Explanations</span>
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Interactive CBT Quiz Simulator Modal */}
        {quizSimulatorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="bg-card border border-border rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[95vh] overflow-y-auto">
              {/* Quiz Header Bar */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                      CBT Examination Simulator In Progress
                    </span>
                  </div>
                  <h3 className="text-base font-black text-foreground mt-0.5">
                    Physics CA2 (Electricity & Magnetism)
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 font-mono text-sm font-black text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                    <Clock className="size-4" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to exit the quiz session? Your answers will be saved as draft.")) {
                        setQuizSimulatorOpen(false);
                      }
                    }}
                    className="size-8 rounded-xl hover:bg-muted flex items-center justify-center text-muted-foreground"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {!quizSubmitted ? (
                <div className="space-y-6">
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">
                      Question {currentQuestionIdx + 1} of {sampleQuestions.length}
                    </span>
                    <span className="text-muted-foreground">
                      Answered: {Object.keys(selectedAnswers).length} / {sampleQuestions.length}
                    </span>
                  </div>

                  {/* Question Box */}
                  <div className="p-5 rounded-2xl bg-canvas border border-border space-y-4">
                    <div className="text-sm font-semibold text-foreground leading-relaxed">
                      {sampleQuestions[currentQuestionIdx].question}
                    </div>

                    {/* Options */}
                    <div className="space-y-2.5">
                      {sampleQuestions[currentQuestionIdx].options.map((opt, optIdx) => {
                        const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectOption(currentQuestionIdx, optIdx)}
                            className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition flex items-center gap-3 ${
                              isSelected
                                ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                                : "bg-card border-border text-foreground hover:bg-muted"
                            }`}
                          >
                            <span
                              className={`size-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                                isSelected ? "bg-white/20 text-white" : "bg-canvas text-muted-foreground border border-border"
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Question Palette Shortcuts */}
                  <div className="flex items-center gap-2 justify-center flex-wrap">
                    {sampleQuestions.map((q, idx) => {
                      const isAnswered = selectedAnswers[idx] !== undefined;
                      const isCurrent = currentQuestionIdx === idx;
                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIdx(idx)}
                          className={`size-8 rounded-lg font-mono text-xs font-bold transition ${
                            isCurrent
                              ? "ring-2 ring-purple-600 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
                              : isAnswered
                              ? "bg-purple-600 text-white"
                              : "bg-canvas border border-border text-muted-foreground"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Nav Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <button
                      type="button"
                      disabled={currentQuestionIdx === 0}
                      onClick={() => setCurrentQuestionIdx((p) => p - 1)}
                      className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-medium disabled:opacity-40 transition flex items-center gap-1.5"
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>

                    {currentQuestionIdx < sampleQuestions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentQuestionIdx((p) => p + 1)}
                        className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition flex items-center gap-1.5"
                      >
                        Next <ChevronRight className="size-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmSubmitModal(true)}
                        className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
                      >
                        Submit Assessment
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Post-Submission Screen */
                <div className="text-center py-6 space-y-4">
                  <div className="size-16 rounded-3xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="size-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-foreground">Assessment Submitted Successfully!</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Reference Code: <strong className="font-mono text-foreground">CBT-PHY-9842</strong> · Recorded at {new Date().toLocaleTimeString()}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-canvas border border-border max-w-md mx-auto text-xs space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Questions Answered:</span>
                      <span className="font-bold text-foreground">{Object.keys(selectedAnswers).length} of 5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time Expended:</span>
                      <span className="font-bold text-foreground font-mono">{formatTime(600 - timeLeft)}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2">
                      <span className="text-muted-foreground">Evaluation Status:</span>
                      <span className="font-bold text-purple-600">Provisional Score Auto-Scored</span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => setQuizSimulatorOpen(false)}
                      className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 shadow-sm"
                    >
                      Return to Examination Terminal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-card border border-border rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
              <AlertTriangle className="size-10 text-amber-500 mx-auto" />
              <h4 className="text-base font-bold text-foreground">Final Assessment Submission</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You have answered <strong>{Object.keys(selectedAnswers).length}</strong> of{" "}
                <strong>{sampleQuestions.length}</strong> questions. Once submitted, your answers cannot be modified.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => setConfirmSubmitModal(false)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-medium"
                >
                  Review Answers
                </button>
                <button
                  onClick={handleFinishQuiz}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
