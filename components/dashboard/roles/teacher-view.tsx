"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  DoorOpen,
  FileSpreadsheet,
  GraduationCap,
  Save,
  Search,
  Sparkles,
  UserCheck,
  Users,
  XCircle,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  MessageSquare,
  FileText,
  Sliders,
  Send,
  Plus,
} from "lucide-react";

interface StudentAttendance {
  id: string;
  name: string;
  rollNo: string;
  status: "present" | "absent" | "late" | "excused";
}

interface StudentGrade {
  id: string;
  name: string;
  ca1: number;
  ca2: number;
  exam: number;
}

export function TeacherDashboardView() {
  const [selectedClass, setSelectedClass] = useState("SSS 2A");
  const [attendanceSaved, setAttendanceSaved] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [students, setStudents] = useState<StudentAttendance[]>([
    { id: "st-1", name: "Adeleke Tobi", rollNo: "RC-2023-0184", status: "present" },
    { id: "st-2", name: "Balogun Farouk", rollNo: "RC-2023-0185", status: "present" },
    { id: "st-3", name: "Chukwuma Kamsi", rollNo: "RC-2023-0186", status: "late" },
    { id: "st-4", name: "Danjuma Aisha", rollNo: "RC-2023-0187", status: "present" },
    { id: "st-5", name: "Eze Somtochukwu", rollNo: "RC-2023-0188", status: "absent" },
    { id: "st-6", name: "Ibrahim Fatima", rollNo: "RC-2023-0189", status: "present" },
    { id: "st-7", name: "Nnamdi Kenechi", rollNo: "RC-2023-0190", status: "present" },
    { id: "st-8", name: "Okafor Chimamanda", rollNo: "RC-2023-0191", status: "present" },
  ]);

  const [grades, setGrades] = useState<StudentGrade[]>([
    { id: "st-1", name: "Adeleke Tobi", ca1: 18, ca2: 17, exam: 52 },
    { id: "st-2", name: "Balogun Farouk", ca1: 15, ca2: 16, exam: 48 },
    { id: "st-3", name: "Chukwuma Kamsi", ca1: 19, ca2: 18, exam: 55 },
    { id: "st-4", name: "Danjuma Aisha", ca1: 17, ca2: 19, exam: 50 },
    { id: "st-5", name: "Eze Somtochukwu", ca1: 14, ca2: 15, exam: 42 },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const setStatus = (id: string, status: "present" | "absent" | "late" | "excused") => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const markAllPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, status: "present" })));
    showToast("All students marked present in quick register.");
  };

  const handleSaveAttendance = () => {
    setAttendanceSaved(true);
    showToast("Morning register submitted to School Admin and Principal radar.");
    setTimeout(() => setAttendanceSaved(false), 3000);
  };

  const getScoreTotal = (ca1: number, ca2: number, exam: number) => ca1 + ca2 + exam;
  const getLetterGrade = (total: number) => {
    if (total >= 75) return { grade: "A", color: "text-emerald-600 bg-emerald-50" };
    if (total >= 65) return { grade: "B", color: "text-blue-600 bg-blue-50" };
    if (total >= 50) return { grade: "C", color: "text-amber-600 bg-amber-50" };
    if (total >= 40) return { grade: "D", color: "text-orange-600 bg-orange-50" };
    return { grade: "F", color: "text-red-600 bg-red-50" };
  };

  return (
    <div className="space-y-6">
      {/* SECTION A.1: Teacher Workspace Header & Persona Station */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-[11px] font-bold text-violet-700">
                Form Master · Senior Secondary SSS 2A
              </span>
              <span className="text-xs text-ink-muted">Mr. David Alabi · Mathematics &amp; STEM Faculty</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-ink">Teacher Faculty Station</h2>
            <p className="text-xs text-ink-muted">
              Personalized instructional workspace for your assigned classes, daily registers, homework evaluations, and continuous assessments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/dashboard/teacher/attendance"
              className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-violet-700 active:scale-95 transition-all"
            >
              <UserCheck className="size-4" />
              <span>Take Attendance</span>
            </Link>

            <Link
              href="/dashboard/teacher/assignments"
              className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/40 bg-violet-50 px-3.5 py-2 text-xs font-bold text-violet-800 shadow-sm hover:bg-violet-100 active:scale-95 transition-all"
            >
              <FileSpreadsheet className="size-4 text-violet-700" />
              <span>Grade Tasks (12)</span>
            </Link>

            <Link
              href="/dashboard/teacher/scores"
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3.5 py-2 text-xs font-bold text-ink shadow-sm hover:border-violet-600 hover:text-violet-700 active:scale-95 transition-all"
            >
              <GraduationCap className="size-4 text-violet-600" />
              <span>Enter CA Scores</span>
            </Link>
          </div>
        </div>

        {/* SECTION A.2: Assigned Classes & Daily Workload Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-line">
          <Link
            href="/dashboard/teacher/roster"
            className="p-3.5 rounded-2xl bg-surface-raised border border-line-soft hover:border-violet-500 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-ink-muted block font-medium group-hover:text-violet-700">
                Assigned Students
              </span>
              <Users className="size-3.5 text-violet-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-ink">98</span>
              <span className="text-[10px] text-ink-muted font-mono">Across 3 class arms</span>
            </div>
          </Link>

          <Link
            href="/dashboard/teacher/attendance"
            className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 hover:border-amber-500 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-amber-800 block font-medium">Morning Register</span>
              <Clock className="size-3.5 text-amber-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-sm font-bold text-amber-900">Due Today</span>
              <span className="text-[10px] text-amber-700 font-bold font-mono">SSS 2A Form Arm</span>
            </div>
          </Link>

          <Link
            href="/dashboard/teacher/assignments"
            className="p-3.5 rounded-2xl bg-surface-raised border border-line-soft hover:border-violet-500 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-ink-muted block font-medium group-hover:text-violet-700">
                Awaiting Grading
              </span>
              <FileSpreadsheet className="size-3.5 text-violet-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-ink">12</span>
              <span className="text-[10px] text-violet-600 font-bold font-mono">Further Math HW #4</span>
            </div>
          </Link>

          <Link
            href="/dashboard/teacher/curriculum"
            className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-emerald-800 block font-medium">Curriculum Covered</span>
              <CheckCircle2 className="size-3.5 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-700">70%</span>
              <span className="text-[10px] text-emerald-600 font-bold font-mono">7 of 10 Modules</span>
            </div>
          </Link>
        </div>

        {/* SECTION A.3: Deadlines & Students Needing Academic Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl border border-violet-500/30 bg-violet-500/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-violet-800 font-bold text-xs">
                <Clock className="size-4 text-violet-600" />
                <span>Upcoming Examination &amp; Grade Entry Deadlines</span>
              </div>
              <span className="font-mono text-[10px] text-violet-700 font-bold">Term 2 Week 8</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-ink">
                <span>• Continuous Assessment CA2 Score Submissions</span>
                <span className="font-mono text-[11px] font-bold text-rose-600">Friday, 04:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-ink">
                <span>• SSS 3 Mock Examination Timetable Verification</span>
                <span className="font-mono text-[11px] font-bold text-ink-muted">Next Tuesday</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-500/5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                <AlertTriangle className="size-4 text-rose-600" />
                <span>Students Flagged for Academic Attention</span>
              </div>
              <Link href="/dashboard/teacher/roster" className="text-[11px] font-bold text-rose-700 underline">
                View Roster →
              </Link>
            </div>
            <div className="space-y-1 text-xs text-ink">
              <p>
                <strong>Somtochukwu Eze (SSS 2A)</strong>: 3 unexcused absences this week &amp; CA1 score of 14/20.
              </p>
              <p className="text-[11px] text-ink-muted">
                Remedial clinic allocated for Period 6 today in Room 204.
              </p>
            </div>
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

      {/* SECTION A.4: Today's Timetable Schedule Banner */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4.5 text-violet-600" />
            <h3 className="text-base font-extrabold text-ink">Today&apos;s Lecture Schedule (Wednesday)</h3>
          </div>
          <span className="font-mono text-xs font-semibold text-ink-muted">Term 2 · Week 8</span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-violet-500/40 bg-violet-500/10 p-4 relative overflow-hidden">
            <span className="absolute top-2 right-2 flex size-2 rounded-full bg-violet-600 animate-ping" />
            <span className="font-mono text-[10px] font-bold text-violet-700 uppercase">Current Period 3</span>
            <h4 className="mt-1 text-sm font-extrabold text-ink">Further Mathematics</h4>
            <span className="text-xs text-ink-muted block mt-0.5">SSS 2A · Science Rm 204</span>
            <span className="mt-3 inline-block font-mono text-[11px] font-semibold text-violet-700">
              10:45 - 11:30 AM
            </span>
          </div>

          <div className="rounded-2xl border border-line bg-surface-raised p-4">
            <span className="font-mono text-[10px] font-bold text-ink-muted uppercase">Period 4</span>
            <h4 className="mt-1 text-sm font-extrabold text-ink">General Mathematics</h4>
            <span className="text-xs text-ink-muted block mt-0.5">SSS 1 Science · Hall B</span>
            <span className="mt-3 inline-block font-mono text-[11px] text-ink-muted">11:35 - 12:20 PM</span>
          </div>

          <div className="rounded-2xl border border-line bg-surface-raised p-4">
            <span className="font-mono text-[10px] font-bold text-ink-muted uppercase">Period 5</span>
            <h4 className="mt-1 text-sm font-extrabold text-ink">Lesson Prep &amp; Homework Marking</h4>
            <span className="text-xs text-ink-muted block mt-0.5">Faculty Room 12</span>
            <span className="mt-3 inline-block font-mono text-[11px] text-ink-muted">01:00 - 01:45 PM</span>
          </div>

          <div className="rounded-2xl border border-line bg-surface-raised p-4">
            <span className="font-mono text-[10px] font-bold text-ink-muted uppercase">Period 6</span>
            <h4 className="mt-1 text-sm font-extrabold text-ink">Mathematics Remedial Clinic</h4>
            <span className="text-xs text-ink-muted block mt-0.5">SSS 2A · Science Rm 204</span>
            <span className="mt-3 inline-block font-mono text-[11px] text-ink-muted">02:00 - 02:45 PM</span>
          </div>
        </div>
      </div>

      {/* Quick Attendance Widget for Form Master */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-2">
              <UserCheck className="size-4.5 text-violet-600" />
              <h3 className="text-base font-extrabold text-ink">Quick Class Attendance Register</h3>
            </div>
            <p className="text-xs text-ink-muted">
              Class: <strong>{selectedClass}</strong> · Form Master Morning Roll Call.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={markAllPresent}
              className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 font-mono text-xs font-bold text-ink hover:border-violet-600 transition-colors"
            >
              Mark All Present
            </button>
            <button
              type="button"
              onClick={handleSaveAttendance}
              className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-1.5 font-mono text-xs font-bold text-white shadow-sm hover:bg-violet-700 transition-colors"
            >
              <Save className="size-3.5" />
              <span>{attendanceSaved ? "Submitted!" : "Submit Register"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {students.map((st) => (
            <div
              key={st.id}
              className="p-3 rounded-2xl border border-line bg-surface-raised/70 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-ink">{st.name}</span>
                <span className="font-mono text-[10px] text-ink-muted">{st.rollNo}</span>
              </div>
              <div className="flex items-center gap-1 pt-1">
                {(["present", "late", "absent", "excused"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatus(st.id, status)}
                    className={`flex-1 py-1 rounded-lg text-[10px] font-mono font-bold capitalize transition-all ${
                      st.status === status
                        ? status === "present"
                          ? "bg-emerald-600 text-white"
                          : status === "late"
                          ? "bg-amber-600 text-white"
                          : status === "absent"
                          ? "bg-rose-600 text-white"
                          : "bg-blue-600 text-white"
                        : "bg-surface border border-line-soft text-ink-muted hover:text-ink"
                    }`}
                  >
                    {status.charAt(0).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
