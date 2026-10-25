"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  ListTodo,
  Calendar,
  Clock,
  CheckCircle2,
  Plus,
  Trash2,
  Tag,
  Target,
  Sparkles,
  Award,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

interface StudyTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  notes?: string;
}

interface RevisionGoal {
  id: string;
  goal: string;
  targetCount: number;
  currentCount: number;
  deadline: string;
  subject: string;
}

export default function StudentPlannerPage() {
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("Further Mathematics");
  const [newDueDate, setNewDueDate] = useState("");
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [newNotes, setNewNotes] = useState("");

  const [tasks, setTasks] = useState<StudyTask[]>([
    {
      id: "task-1",
      title: "Solve 15 past questions on L'Hôpital's Rule & Differential Limits",
      subject: "Further Mathematics",
      dueDate: "Tomorrow · 08:00 PM",
      priority: "High",
      completed: false,
      notes: "Refer to Bostock & Chandler chapter 7 examples 4 through 9.",
    },
    {
      id: "task-2",
      title: "Draft titration error analysis section for Chemistry Lab Report",
      subject: "Chemistry",
      dueDate: "Feb 13 · 02:00 PM",
      priority: "High",
      completed: false,
      notes: "Include concordant sample mean calculation.",
    },
    {
      id: "task-3",
      title: "Review Python BankAccount Class inheritance and test edge cases",
      subject: "Computer Science",
      dueDate: "Feb 14 · 06:00 PM",
      priority: "Medium",
      completed: true,
      notes: "Verify custom InsufficientFundsException raises correctly.",
    },
    {
      id: "task-4",
      title: "Outline expository essay paragraph arguments for coastal erosion",
      subject: "English Language",
      dueDate: "Feb 15 · 04:00 PM",
      priority: "Medium",
      completed: true,
    },
    {
      id: "task-5",
      title: "Memorize SI units and formula derivations for resistivity and Ohm's law",
      subject: "Physics",
      dueDate: "Feb 16 · 09:00 AM",
      priority: "Low",
      completed: false,
    },
  ]);

  const [goals, setGoals] = useState<RevisionGoal[]>([
    {
      id: "goal-1",
      goal: "Solve 50 WAEC Past Exam Questions in Further Math",
      targetCount: 50,
      currentCount: 38,
      deadline: "Feb 28, 2026",
      subject: "Further Mathematics",
    },
    {
      id: "goal-2",
      goal: "Master 20 Organic Chemistry Reaction Pathways",
      targetCount: 20,
      currentCount: 14,
      deadline: "March 15, 2026",
      subject: "Chemistry",
    },
    {
      id: "goal-3",
      goal: "Complete 10 Coding Exercises on Python Data Structures",
      targetCount: 10,
      currentCount: 10,
      deadline: "Feb 10, 2026",
      subject: "Computer Science",
    },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setTasks((prev) => [
      {
        id: `task-${Date.now()}`,
        title: newTitle,
        subject: newSubject,
        dueDate: newDueDate || "This Week",
        priority: newPriority,
        completed: false,
        notes: newNotes,
      },
      ...prev,
    ]);

    setNewTitle("");
    setNewDueDate("");
    setNewNotes("");
    setNewTaskModalOpen(false);
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const filteredTasks = tasks.filter(
    (t) => filterPriority === "all" || t.priority.toLowerCase() === filterPriority.toLowerCase()
  );

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <ListTodo className="size-4" />
              Student Portal · Self-Regulated Learning
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Personal Study Planner & Goals
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Organize study tasks, track revision targets, and stay ahead of assignments and examinations.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setNewTaskModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Plus className="size-4" />
              Add Study Task
            </button>
          </div>
        </div>

        {/* Boundary Notice */}
        <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-ink-soft">
          <strong>Note:</strong> Personal study plans and reminders are private to your learner account.
          They do not alter official school assignment due dates or institutional examination timetables.
        </div>

        {/* Overview Stats & Weekly Progress Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-2">
            <div className="text-xs font-medium text-muted-foreground">Weekly Task Completion</div>
            <div className="text-3xl font-black text-cyan-600">
              {completedCount} of {tasks.length} ({progressPercent}%)
            </div>
            <div className="w-full h-2 rounded-full bg-canvas border border-border overflow-hidden">
              <div
                className="h-full bg-cyan-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-1">
            <div className="text-xs font-medium text-muted-foreground">High Priority Tasks</div>
            <div className="text-3xl font-black text-amber-500">
              {tasks.filter((t) => t.priority === "High" && !t.completed).length} Due
            </div>
            <div className="text-[11px] text-muted-foreground">Requires immediate review</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-1">
            <div className="text-xs font-medium text-muted-foreground">Active Revision Targets</div>
            <div className="text-3xl font-black text-emerald-600">
              {goals.length} Goals
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold">1 Target 100% Achieved</div>
          </div>
        </div>

        {/* Revision Goals Showcase */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Target className="size-4.5 text-cyan-600" />
              <h3 className="font-extrabold text-foreground text-base">Long-Term Revision Targets</h3>
            </div>
            <span className="text-xs font-mono font-semibold text-cyan-600">Term 2 Milestones</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {goals.map((g) => {
              const pct = Math.round((g.currentCount / g.targetCount) * 100);
              const isDone = pct >= 100;

              return (
                <div
                  key={g.id}
                  className={`p-4 rounded-2xl border transition space-y-3 ${
                    isDone
                      ? "border-emerald-500/40 bg-emerald-500/5"
                      : "border-border bg-canvas"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-cyan-600 px-2 py-0.5 rounded-md bg-card border border-border">
                      {g.subject}
                    </span>
                    {isDone ? (
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="size-3" /> Completed
                      </span>
                    ) : (
                      <span className="text-[10px] text-muted-foreground">Target: {g.deadline}</span>
                    )}
                  </div>

                  <h4 className="font-bold text-foreground text-xs leading-snug">{g.goal}</h4>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-bold text-foreground">
                        {g.currentCount} / {g.targetCount} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isDone ? "bg-emerald-600" : "bg-cyan-600"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Study Tasks Checklist */}
        <div className="rounded-3xl bg-card border border-border p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <h3 className="text-base font-extrabold text-foreground">Study Tasks & Checklist</h3>
              <p className="text-xs text-muted-foreground">Track day-to-day homework problem sets and revision sessions.</p>
            </div>

            <div className="flex items-center gap-1.5 bg-canvas border border-border rounded-xl p-1 text-xs">
              {["all", "high", "medium", "low"].map((p) => (
                <button
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  className={`px-3 py-1 rounded-lg capitalize font-medium transition ${
                    filterPriority === p
                      ? "bg-cyan-600 text-white shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredTasks.map((t) => (
              <div
                key={t.id}
                className={`p-4 rounded-2xl border transition flex items-start justify-between gap-3 ${
                  t.completed
                    ? "border-border bg-canvas/40 opacity-70"
                    : "border-border bg-card hover:border-cyan-500/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(t.id)}
                    className="size-4.5 rounded-md text-cyan-600 focus:ring-cyan-500 mt-0.5 cursor-pointer"
                  />

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] font-bold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-800">
                        {t.subject}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          t.priority === "High"
                            ? "bg-rose-500/15 text-rose-600 border border-rose-500/30"
                            : t.priority === "Medium"
                            ? "bg-amber-500/15 text-amber-600 border border-amber-500/30"
                            : "bg-blue-500/15 text-blue-600 border border-blue-500/30"
                        }`}
                      >
                        {t.priority} Priority
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                        <Clock className="size-3 text-cyan-600" />
                        {t.dueDate}
                      </span>
                    </div>

                    <h4
                      className={`text-sm font-bold ${
                        t.completed ? "line-through text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {t.title}
                    </h4>

                    {t.notes && (
                      <p className="text-xs text-muted-foreground italic">{t.notes}</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(t.id)}
                  title="Delete Task"
                  className="size-8 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center justify-center transition"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Study Task Modal */}
        {newTaskModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface border border-line rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <ListTodo className="size-5 text-cyan-600" />
                  <h3 className="text-base font-extrabold text-ink">Add Personal Study Task</h3>
                </div>
                <button
                  onClick={() => setNewTaskModalOpen(false)}
                  className="size-7 rounded-lg hover:bg-surface-raised flex items-center justify-center text-ink-muted"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddTask} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-ink font-semibold mb-1">Subject</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none"
                  >
                    <option value="Further Mathematics">Further Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="English Language">English Language</option>
                    <option value="Economics">Economics</option>
                    <option value="Civic Education">Civic Education</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-1">Task Title / Activity</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Solve 10 trigonometry problems from chapter 5"
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-ink font-semibold mb-1">Target Date / Time</label>
                    <input
                      type="text"
                      value={newDueDate}
                      onChange={(e) => setNewDueDate(e.target.value)}
                      placeholder="e.g. Friday 05:00 PM"
                      className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-ink font-semibold mb-1">Priority</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as "High" | "Medium" | "Low")}
                      className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none"
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-1">Notes / Textbook References</label>
                  <textarea
                    rows={2}
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="e.g. Pages 142-148 in New School Chemistry"
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setNewTaskModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line hover:bg-surface-raised font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
                  >
                    Add Task
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
