"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Download,
  Search,
  Filter,
  Send,
  BookOpen,
  FolderOpen,
  Calendar,
  ShieldCheck,
  User,
  Sparkles,
} from "lucide-react";
import { CHILDREN_PROFILES, ChildProfile } from "@/lib/family-data";

interface ParentHomeworkItem {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  assignedDate: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded" | "overdue";
  instructions: string;
  learningResource?: string;
  grade?: string;
  feedback?: string;
}

export default function ParentAssignmentsPage() {
  const [selectedChildId, setSelectedChildId] = useState<string>("child-1");
  const [filter, setFilter] = useState<"all" | "pending" | "submitted" | "graded">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<ParentHomeworkItem | null>(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [parentQuestion, setParentQuestion] = useState("");

  const activeChild =
    CHILDREN_PROFILES.find((c) => c.id === selectedChildId) || CHILDREN_PROFILES[0];

  const [tobiHomework, setTobiHomework] = useState<ParentHomeworkItem[]>([
    {
      id: "ASG-101",
      title: "Calculus Optimization Lab Report & Derivative Applications",
      subject: "Further Mathematics",
      teacher: "Mr. David Alabi",
      assignedDate: "Jan 22, 2026",
      dueDate: "Tomorrow, 04:00 PM",
      status: "pending",
      instructions: "Complete exercises 4.2 to 4.5 in Calculus Volume II. Graph maxima and minima for quadratic surface models.",
      learningResource: "Calculus_Optimization_Summary_Notes.pdf",
    },
    {
      id: "ASG-102",
      title: "Spectroscopy & Ionic Bonding Worksheet Analysis",
      subject: "Chemistry",
      teacher: "Dr. K. Mensah",
      assignedDate: "Jan 20, 2026",
      dueDate: "Friday, 11:59 PM",
      status: "pending",
      instructions: "Analyze infrared spectrum data for organic compounds and balance 10 complex redox reactions.",
      learningResource: "Infrared_Spectra_Reference_Chart.pdf",
    },
    {
      id: "ASG-103",
      title: "Electromagnetic Induction Simulation Laboratory Report",
      subject: "Physics",
      teacher: "Engr. P. Bassey",
      assignedDate: "Jan 15, 2026",
      dueDate: "Jan 22, 2026",
      status: "graded",
      instructions: "Run PhET Faraday law coil simulations and submit empirical induced voltage graph.",
      grade: "96 / 100 (A1)",
      feedback: "Exceptional precision in circuit impedance calculations and error margin estimations.",
    },
    {
      id: "ASG-104",
      title: "Object-Oriented Python Class Hierarchy & Inheritance",
      subject: "Computer Science",
      teacher: "Engr. P. Bassey",
      assignedDate: "Jan 18, 2026",
      dueDate: "Jan 24, 2026",
      status: "submitted",
      instructions: "Write a modular school library system class hierarchy with polymorphism and unit tests.",
      learningResource: "OOP_Inheritance_Cheatsheet.py",
    },
  ]);

  const [maryamHomework, setMaryamHomework] = useState<ParentHomeworkItem[]>([
    {
      id: "ASG-201",
      title: "African Folktales Comparative Character Essay",
      subject: "English Studies",
      teacher: "Ms. Chioma Okon",
      assignedDate: "Jan 23, 2026",
      dueDate: "Thursday, 05:00 PM",
      status: "pending",
      instructions: "Write a 500-word essay comparing the trickster archetypes in Anansi stories and Yoruba folklore.",
      learningResource: "Folktale_Themes_Study_Guide.pdf",
    },
    {
      id: "ASG-202",
      title: "Algebraic Factorization & Quadratic Expansion Set B",
      subject: "Mathematics",
      teacher: "Mr. T. Balogun",
      assignedDate: "Jan 24, 2026",
      dueDate: "Friday, 02:00 PM",
      status: "pending",
      instructions: "Solve problems 1 through 25 on page 84 of New General Mathematics for Junior Secondary.",
    },
    {
      id: "ASG-203",
      title: "Hydrological Cycle & Water Purification Project",
      subject: "Basic Science & Technology",
      teacher: "Mr. J. Peter",
      assignedDate: "Jan 16, 2026",
      dueDate: "Jan 21, 2026",
      status: "graded",
      grade: "94 / 100 (A1)",
      instructions: "Construct a desktop filtration column model using sand, charcoal and gravel layers.",
      feedback: "Very creative filtration model. Clean diagrammatic illustrations.",
    },
  ]);

  const currentList = selectedChildId === "child-1" ? tobiHomework : maryamHomework;

  const filteredTasks = currentList.filter((item) => {
    const matchesFilter = filter === "all" || item.status === filter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentQuestion.trim() || !selectedTask) return;
    setIsQuestionModalOpen(false);
    setToast(
      `Clarification message for "${selectedTask.title}" delivered to ${selectedTask.teacher}. Response will appear in your messages.`
    );
    setParentQuestion("");
  };

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <FileText className="w-4 h-4" />
              Learning Support &amp; Homework · Section E
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Assignments &amp; Homework Monitoring
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Track deadlines, submission status, and teacher feedback. Support your child without completing work on their behalf.
            </p>
          </div>

          {/* Child Switcher */}
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

        {/* Learner Autonomy Safeguard Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-foreground">Learner Autonomy Safeguard:</span>{" "}
            <span className="text-muted-foreground">
              Students submit assignments and complete quizzes independently via their own Student Portal. Parents can monitor instructions, track deadlines, and send clarifying questions to teachers.
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Total Active Tasks</span>
              <BookOpen className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-foreground">{currentList.length} Tasks</div>
            <div className="text-xs text-muted-foreground mt-1">Assigned this academic cycle</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Pending / Due Soon</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">
              {currentList.filter((t) => t.status === "pending").length} Due
            </div>
            <div className="text-xs text-muted-foreground mt-1">Deadlines approaching this week</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Submitted / Marked</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600">
              {currentList.filter((t) => t.status === "graded" || t.status === "submitted").length} Finished
            </div>
            <div className="text-xs text-muted-foreground mt-1">100% on-time submission rate</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Overdue Tasks</span>
              <AlertCircle className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600">0 Overdue</div>
            <div className="text-xs text-muted-foreground mt-1">Zero missing homework</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 bg-card border border-border rounded-xl p-1 text-xs">
            {(["all", "pending", "submitted", "graded"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition ${
                  filter === tab
                    ? "bg-pink-600 text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "all" ? "All Homework" : tab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search title, subject, teacher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-pink-500/30 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Homework Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-card border border-border hover:border-pink-500/30 transition shadow-xs flex flex-col justify-between space-y-3.5"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="px-2 py-0.5 rounded-md font-bold uppercase text-[10px] bg-canvas border border-border text-foreground">
                    {item.subject}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.status === "graded"
                        ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                        : item.status === "submitted"
                        ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200 dark:border-blue-800"
                        : "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-foreground leading-snug">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Teacher: {item.teacher}</p>

                <div className="mt-2 p-3 rounded-xl bg-canvas border border-border text-xs text-muted-foreground leading-relaxed">
                  {item.instructions}
                </div>

                {item.learningResource && (
                  <div className="mt-2 text-[11px] text-blue-600 flex items-center gap-1.5 cursor-pointer hover:underline">
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>Resource: {item.learningResource}</span>
                  </div>
                )}

                {item.feedback && (
                  <div className="mt-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-800 dark:text-emerald-300">
                    <strong>Feedback ({item.grade}):</strong> "{item.feedback}"
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border text-xs">
                <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  Due: <strong>{item.dueDate}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setSelectedTask(item);
                      setIsQuestionModalOpen(true);
                    }}
                    className="px-2.5 py-1.5 rounded-lg border border-border hover:bg-muted text-foreground text-xs font-medium flex items-center gap-1 transition"
                  >
                    <HelpCircle className="w-3 h-3" />
                    Ask Teacher
                  </button>
                  <button
                    onClick={() => setSelectedTask(item)}
                    className="px-2.5 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold transition"
                  >
                    View Task
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Ask Clarifying Question to Teacher */}
        {isQuestionModalOpen && selectedTask && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <span className="text-xs font-mono text-pink-600 font-bold">{selectedTask.subject}</span>
                  <h3 className="font-bold text-foreground text-base">Question for {selectedTask.teacher}</h3>
                </div>
                <button
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs text-muted-foreground p-3 rounded-xl bg-canvas border border-border">
                Task: <strong>{selectedTask.title}</strong> (Due: {selectedTask.dueDate})
              </div>

              <form onSubmit={handleSendQuestion} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Your Question or Clarification</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Good afternoon, does the lab report require handwritten graphs or can Tobi use digital plotting software?..."
                    value={parentQuestion}
                    onChange={(e) => setParentQuestion(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsQuestionModalOpen(false)}
                    className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold"
                  >
                    Send to Teacher
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: View Full Task Rubric */}
        {selectedTask && !isQuestionModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <span className="text-xs font-mono text-pink-600 font-bold">{selectedTask.id}</span>
                  <h3 className="font-bold text-foreground text-base">{selectedTask.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Subject &amp; Teacher:</span>
                  <span className="font-semibold text-foreground">{selectedTask.subject} · {selectedTask.teacher}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Due Deadline:</span>
                  <span className="font-bold text-amber-600">{selectedTask.dueDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Submission Status:</span>
                  <span className="font-bold uppercase text-foreground">{selectedTask.status}</span>
                </div>
                <div className="py-1">
                  <span className="text-muted-foreground block mb-1">Full Instructions:</span>
                  <div className="p-3 rounded-xl bg-canvas border border-border text-foreground leading-relaxed">
                    {selectedTask.instructions}
                  </div>
                </div>
                {selectedTask.grade && (
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Assessed Mark:</span>
                    <span className="font-bold text-emerald-600 text-sm">{selectedTask.grade}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => setSelectedTask(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
