"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Bell,
  BookMarked,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Sparkles,
  TrendingUp,
  User,
  ArrowRight,
  ClipboardCheck,
  AlertCircle,
  HelpCircle,
  FolderOpen,
  ListTodo,
  ShieldCheck,
  DollarSign,
  ChevronRight,
  FileSpreadsheet,
  Activity,
  Flame,
  CheckSquare,
  MessageSquareText,
} from "lucide-react";

export function StudentDashboardView() {
  const [downloading, setDownloading] = useState(false);
  const [quickQuestionOpen, setQuickQuestionOpen] = useState(false);
  const [quickQuestionSubject, setQuickQuestionSubject] = useState("Further Mathematics");
  const [quickQuestionText, setQuickQuestionText] = useState("");
  const [questionSent, setQuestionSent] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("Official Cryptographically Signed Report Card PDF (SHA-256 Verified) downloaded successfully!");
    }, 1500);
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickQuestionText.trim()) return;
    setQuestionSent(true);
    setTimeout(() => {
      setQuestionSent(false);
      setQuickQuestionText("");
      setQuickQuestionOpen(false);
      alert("Your academic query has been submitted to the teacher via the monitored school portal.");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Student Profile Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center font-bold text-2xl text-white shadow-inner">
              TA
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-0.5 font-mono text-[11px] font-bold">
                <span>Grade 11 · Senior Secondary (SSS 2A)</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black">Tobi Adeleke</h2>
              <p className="text-xs text-white/80 font-mono">
                Reg No: <strong className="text-white">RC-2023-0184</strong> · House: Red Coral · Stream: Pure Sciences
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/student/profile"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-3.5 py-2 text-xs font-bold text-white hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              <User className="size-4" />
              <span>Student ID & Profile</span>
            </Link>
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-blue-900 shadow-md transition-all hover:bg-white/90 active:scale-95 disabled:opacity-75"
            >
              <Download className="size-4" />
              <span>{downloading ? "Generating PDF..." : "Download Report Card"}</span>
            </button>
          </div>
        </div>

        {/* Live Academic Pulse */}
        <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-white/15 text-xs font-mono text-white/90">
          <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1">
            <CheckCircle2 className="size-3.5 text-emerald-300" />
            <span>Attendance: 98.2% (42-Day Streak)</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1">
            <Award className="size-3.5 text-amber-300" />
            <span>Class Rank: 1st of 38</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1">
            <TrendingUp className="size-3.5 text-cyan-300" />
            <span>Current GPA: 4.89 / 5.0 (92.4% Avg)</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1">
            <ShieldCheck className="size-3.5 text-emerald-300" />
            <span>Term 2 Fees: Fully Cleared ($0.00 Balance)</span>
          </span>
        </div>
      </div>

      {/* Quick Access Shortcut Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Link
          href="/dashboard/student/assignments"
          className="p-3.5 rounded-2xl bg-surface border border-line hover:border-cyan-500/40 hover:bg-surface-raised transition shadow-xs flex items-center gap-3 group"
        >
          <div className="size-9 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center font-bold">
            <FileText className="size-4.5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink">Assignments</div>
            <div className="text-[10px] text-amber-600 font-semibold">2 Due Soon</div>
          </div>
        </Link>

        <Link
          href="/dashboard/student/assessments"
          className="p-3.5 rounded-2xl bg-surface border border-line hover:border-cyan-500/40 hover:bg-surface-raised transition shadow-xs flex items-center gap-3 group"
        >
          <div className="size-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
            <ClipboardCheck className="size-4.5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink">CBT Quizzes</div>
            <div className="text-[10px] text-purple-600 font-semibold">1 Live Active</div>
          </div>
        </Link>

        <Link
          href="/dashboard/student/timetable"
          className="p-3.5 rounded-2xl bg-surface border border-line hover:border-cyan-500/40 hover:bg-surface-raised transition shadow-xs flex items-center gap-3 group"
        >
          <div className="size-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
            <CalendarDays className="size-4.5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink">Timetable</div>
            <div className="text-[10px] text-ink-muted font-medium">Period 3 Now</div>
          </div>
        </Link>

        <Link
          href="/dashboard/student/planner"
          className="p-3.5 rounded-2xl bg-surface border border-line hover:border-cyan-500/40 hover:bg-surface-raised transition shadow-xs flex items-center gap-3 group"
        >
          <div className="size-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            <ListTodo className="size-4.5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink">Study Planner</div>
            <div className="text-[10px] text-emerald-600 font-semibold">3 Tasks Pending</div>
          </div>
        </Link>

        <Link
          href="/dashboard/student/resources"
          className="p-3.5 rounded-2xl bg-surface border border-line hover:border-cyan-500/40 hover:bg-surface-raised transition shadow-xs flex items-center gap-3 group"
        >
          <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <FolderOpen className="size-4.5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink">E-Library</div>
            <div className="text-[10px] text-ink-muted font-medium">Notes & Slides</div>
          </div>
        </Link>

        <button
          onClick={() => setQuickQuestionOpen(true)}
          className="p-3.5 rounded-2xl bg-surface border border-line hover:border-cyan-500/40 hover:bg-surface-raised transition shadow-xs flex items-center gap-3 text-left group"
        >
          <div className="size-9 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
            <MessageSquareText className="size-4.5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink">Ask Teacher</div>
            <div className="text-[10px] text-rose-600 font-semibold">Academic Q&A</div>
          </div>
        </button>
      </div>

      {/* Main Grid: Today's Schedule + Academic Radar & Deadlines */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Today's Lecture Schedule & In-Session Period (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Period Banner */}
          <div className="p-4 rounded-3xl bg-gradient-to-r from-cyan-600/15 via-blue-600/10 to-transparent border border-cyan-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                P3
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                    Currently In Session · Ends in 22 mins
                  </span>
                </div>
                <h3 className="font-extrabold text-ink text-sm sm:text-base">
                  Further Mathematics · Matrices & Determinants
                </h3>
                <p className="text-xs text-ink-muted">
                  Mr. David Alabi · Room 14 (Science Wing)
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/student/subjects"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-line text-xs font-semibold text-primary hover:bg-surface-raised transition self-start sm:self-auto"
            >
              <BookOpen className="size-3.5" />
              <span>Lesson Notes</span>
            </Link>
          </div>

          {/* Today's Timetable Card */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4.5 text-primary" />
                <h3 className="text-base font-extrabold text-ink">Today&apos;s Lecture Timetable</h3>
              </div>
              <span className="font-mono text-xs font-bold text-primary">Wednesday · Term 2 Week 4</span>
            </div>

            <div className="mt-4 space-y-2.5">
              {[
                { period: "P1", time: "08:15 - 09:00 AM", subject: "English Language", teacher: "Mrs. N. Okeke", room: "Room 14", status: "completed" },
                { period: "P2", time: "09:00 - 09:45 AM", subject: "Chemistry (Practical)", teacher: "Dr. Peter Obi", room: "Chem Lab A", status: "completed" },
                { period: "P3", time: "10:45 - 11:30 AM", subject: "Further Mathematics", teacher: "Mr. David Alabi", room: "Room 14", status: "active" },
                { period: "P4", time: "11:35 - 12:20 PM", subject: "Physics", teacher: "Mr. Chukwuma Eze", room: "Physics Lab 2", status: "upcoming" },
                { period: "P5", time: "01:00 - 01:45 PM", subject: "Biology", teacher: "Mrs. Grace Okon", room: "Bio Lab 1", status: "upcoming" },
                { period: "P6", time: "02:00 - 02:45 PM", subject: "Civic Education", teacher: "Mr. E. Peters", room: "Room 14", status: "upcoming" },
              ].map((p) => (
                <div
                  key={p.period}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs transition-colors ${
                    p.status === "active"
                      ? "border-primary/40 bg-primary-light/40 shadow-xs"
                      : p.status === "completed"
                      ? "border-line bg-surface-raised/40 opacity-75"
                      : "border-line bg-surface-raised"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`size-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                        p.status === "active"
                          ? "bg-primary text-white"
                          : p.status === "completed"
                          ? "bg-line text-ink-muted"
                          : "bg-surface border border-line text-ink"
                      }`}
                    >
                      {p.period}
                    </span>
                    <div>
                      <span className="font-bold text-ink block">{p.subject}</span>
                      <span className="text-[11px] text-ink-muted">{p.teacher} · {p.room}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-[11px] font-semibold text-ink-soft block">{p.time}</span>
                    {p.status === "active" && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-primary">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                        In Session
                      </span>
                    )}
                    {p.status === "completed" && (
                      <span className="text-[10px] font-semibold text-emerald-600">Finished</span>
                    )}
                    {p.status === "upcoming" && (
                      <span className="text-[10px] font-medium text-ink-muted">Upcoming</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-line flex items-center justify-between text-xs">
              <span className="text-ink-muted">Need to check full weekly periods or room schedules?</span>
              <Link href="/dashboard/student/timetable" className="font-bold text-primary hover:underline flex items-center gap-1">
                Full Weekly Timetable <ChevronRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Assignments Due Soon & Coursework Radar */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <FileText className="size-4.5 text-amber-500" />
                <h3 className="text-base font-extrabold text-ink">Assignments & Coursework Due</h3>
              </div>
              <Link href="/dashboard/student/assignments" className="font-bold text-xs text-primary hover:underline">
                View All (8 Total)
              </Link>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: "as-1",
                  title: "Further Mathematics: Problem Set 4 (Calculus Limits)",
                  subject: "Further Mathematics",
                  teacher: "Mr. David Alabi",
                  dueDate: "Tomorrow, 11:59 PM",
                  maxMarks: "20 pts",
                  status: "Pending",
                  urgent: true,
                },
                {
                  id: "as-2",
                  title: "Chemistry Lab Practical Report: Acid-Base Titration Graph",
                  subject: "Chemistry",
                  teacher: "Dr. Peter Obi",
                  dueDate: "Friday, Feb 13, 04:00 PM",
                  maxMarks: "15 pts",
                  status: "Pending",
                  urgent: false,
                },
                {
                  id: "as-3",
                  title: "English Language: Expository Essay on Climate Adaptation",
                  subject: "English Language",
                  teacher: "Mrs. K. Adeleke",
                  dueDate: "Submitted (Graded)",
                  maxMarks: "20 pts",
                  status: "Graded: 18/20",
                  urgent: false,
                },
              ].map((asg) => (
                <div
                  key={asg.id}
                  className="p-4 rounded-2xl border border-line bg-surface-raised flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-ink text-sm">{asg.title}</span>
                      {asg.urgent && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 border border-amber-500/30">
                          Due in 18 hrs
                        </span>
                      )}
                    </div>
                    <div className="text-ink-muted">
                      {asg.subject} · {asg.teacher} · Max: {asg.maxMarks}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="text-right">
                      <span className="font-mono text-[11px] block font-semibold text-ink">{asg.dueDate}</span>
                      <span
                        className={`text-[10px] font-bold ${
                          asg.status.startsWith("Graded")
                            ? "text-emerald-600"
                            : "text-amber-600"
                        }`}
                      >
                        {asg.status}
                      </span>
                    </div>

                    <Link
                      href="/dashboard/student/assignments"
                      className="px-3 py-1.5 rounded-xl bg-primary text-white font-semibold text-xs hover:bg-primary-hover transition"
                    >
                      {asg.status.startsWith("Graded") ? "Feedback" : "Submit"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Grades + Upcoming Assessments & Circulars (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Tests, Quizzes & Exam Countdown */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="size-4.5 text-purple-600" />
                <h3 className="text-base font-extrabold text-ink">Upcoming Tests & Quizzes</h3>
              </div>
              <span className="font-mono text-xs font-bold text-purple-600">Term 2 Cycle</span>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "Physics CA2 Online Quiz",
                  date: "Active Today",
                  window: "Open until 06:00 PM",
                  venue: "Online CBT Portal (15 mins)",
                  active: true,
                },
                {
                  title: "Mid-Term Examination: Chemistry",
                  date: "Monday, Feb 16",
                  window: "09:00 - 11:00 AM",
                  venue: "School Main Hall",
                  active: false,
                },
                {
                  title: "Biology Practical Logbook Defense",
                  date: "Thursday, Feb 19",
                  window: "11:00 AM",
                  venue: "Biology Lab 1",
                  active: false,
                },
              ].map((test, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border text-xs ${
                    test.active
                      ? "border-purple-500/40 bg-purple-500/10"
                      : "border-line bg-surface-raised"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink">{test.title}</span>
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        test.active
                          ? "bg-purple-600 text-white animate-pulse"
                          : "bg-surface text-ink-muted border border-line"
                      }`}
                    >
                      {test.date}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-ink-muted text-[11px]">
                    <span>{test.venue}</span>
                    <span>{test.window}</span>
                  </div>
                  {test.active && (
                    <div className="mt-2 pt-2 border-t border-purple-500/20 flex justify-end">
                      <Link
                        href="/dashboard/student/assessments"
                        className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] shadow-xs"
                      >
                        Launch Quiz Now →
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Subject Performance Highlights */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <Award className="size-4.5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-ink">Continuous Assessment (CA)</h3>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600">Term 2 Progress</span>
            </div>

            <div className="space-y-3">
              {[
                { subject: "Further Mathematics", ca: "29 / 30", grade: "A1", pace: "Leading cohort" },
                { subject: "Physics Theory & Lab", ca: "27 / 30", grade: "A1", pace: "Top 5%" },
                { subject: "Computer Science (Python)", ca: "30 / 30", grade: "A1", pace: "100% Score" },
                { subject: "Chemistry", ca: "27 / 30", grade: "A1", pace: "Well above avg" },
                { subject: "English Oral & Literature", ca: "25 / 30", grade: "B2", pace: "Consistent" },
              ].map((s) => (
                <div key={s.subject} className="rounded-2xl border border-line bg-surface-raised p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink">{s.subject}</span>
                    <span className="rounded bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      {s.grade} ({s.ca})
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-ink-muted">
                    <span>CA 1 (15) + CA 2 (15)</span>
                    <span className="text-primary font-medium">{s.pace}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-ink-muted">Official report card verified by CAO</span>
              <Link href="/dashboard/student/results" className="font-bold text-primary hover:underline">
                View Full Broadsheet →
              </Link>
            </div>
          </div>

          {/* School Announcements & Circulars */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <Bell className="size-4.5 text-primary" />
                <h3 className="text-base font-extrabold text-ink">Campus Circulars</h3>
              </div>
              <Link href="/dashboard/student/bulletins" className="font-bold text-xs text-primary hover:underline">
                All Circulars
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-surface-raised border border-line text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-ink">
                  <span>National STEM Olympiad Qualifier</span>
                  <span className="font-mono text-[10px] text-primary">Today</span>
                </div>
                <p className="text-ink-muted text-[11px] line-clamp-2">
                  Tobi Adeleke & Amina Yusuf qualify for National Finals. Intensive clinics on Thursday 3:30 PM.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-surface-raised border border-line text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-ink">
                  <span>Inter-House Athletic Trials (Heats)</span>
                  <span className="font-mono text-[10px] text-ink-muted">Jan 22</span>
                </div>
                <p className="text-ink-muted text-[11px] line-clamp-2">
                  Trials commence this Friday at 2:00 PM for Red Coral, Blue, Green, and Yellow houses.
                </p>
              </div>
            </div>
          </div>

          {/* Account & Fee Status Banner */}
          <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-ink">Tuition & Levies Account</div>
                <div className="text-[11px] text-emerald-600 font-semibold">Good Financial Standing · Cleared</div>
              </div>
            </div>
            <Link
              href="/dashboard/student/fees"
              className="px-3 py-1.5 rounded-xl border border-line hover:bg-surface-raised text-xs font-semibold text-ink transition shrink-0"
            >
              Fee Notice
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Question to Teacher Modal */}
      {quickQuestionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-surface border border-line rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <MessageSquareText className="size-5 text-primary" />
                <h3 className="text-base font-extrabold text-ink">Ask Teacher an Academic Question</h3>
              </div>
              <button
                onClick={() => setQuickQuestionOpen(false)}
                className="size-7 rounded-lg hover:bg-surface-raised flex items-center justify-center text-ink-muted"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-ink-muted leading-relaxed">
              Submit an academic query regarding today&apos;s lectures, homework instructions, or revision topics.
              Messages are routed through approved school channels and monitored for academic safety.
            </p>

            <form onSubmit={handleSendQuestion} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-ink font-semibold mb-1">Target Subject & Teacher</label>
                <select
                  value={quickQuestionSubject}
                  onChange={(e) => setQuickQuestionSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none"
                >
                  <option value="Further Mathematics">Further Mathematics (Mr. David Alabi)</option>
                  <option value="Physics">Physics (Mr. Chukwuma Eze)</option>
                  <option value="Chemistry">Chemistry (Dr. Peter Obi)</option>
                  <option value="Biology">Biology (Mrs. Grace Okon)</option>
                  <option value="Computer Science">Computer Science (Engr. Sam Bello)</option>
                  <option value="English Language">English Language (Mrs. K. Adeleke)</option>
                </select>
              </div>

              <div>
                <label className="block text-ink font-semibold mb-1">Your Question / Inquiry</label>
                <textarea
                  rows={4}
                  required
                  value={quickQuestionText}
                  onChange={(e) => setQuickQuestionText(e.target.value)}
                  placeholder="e.g., In Period 3 regarding matrix inversions using cofactors, could you clarify question 4b from the textbook exercise?"
                  className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-ink-muted italic">Safeguarding rules apply to all inquiries.</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuickQuestionOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line hover:bg-surface-raised font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={questionSent}
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold transition"
                  >
                    {questionSent ? "Sending..." : "Submit Question"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
