"use client";

import { useState } from "react";
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

  const setStatus = (id: string, status: "present" | "absent" | "late" | "excused") => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const markAllPresent = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, status: "present" })));
  };

  const handleSaveAttendance = () => {
    setAttendanceSaved(true);
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
      {/* Teacher Workspace Header */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-[11px] font-bold text-violet-700">
                Form Master · Senior Secondary
              </span>
              <span className="text-xs text-ink-muted">Mr. David Alabi (Mathematics)</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-ink">Teacher Faculty Station</h2>
            <p className="text-xs text-ink-muted">
              Active assigned class: <strong className="text-primary font-bold">SSS 2A (Science Stream)</strong> · Room 204
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs text-ink-muted">
              Period: <strong className="text-ink">3 of 6 (10:45 AM - 11:30 AM)</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Today's Timetable Schedule Banner */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4.5 text-primary" />
            <h3 className="text-base font-extrabold text-ink">Today&apos;s Class Schedule (Wednesday)</h3>
          </div>
          <span className="font-mono text-xs font-semibold text-ink-muted">Term 2 · Week 8</span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-primary/40 bg-primary-light/40 p-4 relative overflow-hidden">
            <span className="absolute top-2 right-2 flex size-2 rounded-full bg-primary animate-ping" />
            <span className="font-mono text-[10px] font-bold text-primary uppercase">Current Period 3</span>
            <h4 className="mt-1 text-sm font-extrabold text-ink">Further Mathematics</h4>
            <span className="text-xs text-ink-muted block mt-0.5">SSS 2A · Room 204</span>
            <span className="mt-3 inline-block font-mono text-[11px] font-semibold text-primary">10:45 - 11:30 AM</span>
          </div>

          <div className="rounded-2xl border border-line bg-surface-raised p-4">
            <span className="font-mono text-[10px] font-bold text-ink-muted uppercase">Period 4</span>
            <h4 className="mt-1 text-sm font-extrabold text-ink">General Mathematics</h4>
            <span className="text-xs text-ink-muted block mt-0.5">SSS 1 Science · Hall B</span>
            <span className="mt-3 inline-block font-mono text-[11px] text-ink-muted">11:35 - 12:20 PM</span>
          </div>

          <div className="rounded-2xl border border-line bg-surface-raised p-4">
            <span className="font-mono text-[10px] font-bold text-ink-muted uppercase">Period 5</span>
            <h4 className="mt-1 text-sm font-extrabold text-ink">Lesson Prep &amp; Marking</h4>
            <span className="text-xs text-ink-muted block mt-0.5">Faculty Room 12</span>
            <span className="mt-3 inline-block font-mono text-[11px] text-ink-muted">01:00 - 01:45 PM</span>
          </div>

          <div className="rounded-2xl border border-line bg-surface-raised p-4">
            <span className="font-mono text-[10px] font-bold text-ink-muted uppercase">Period 6</span>
            <h4 className="mt-1 text-sm font-extrabold text-ink">Mathematics Remedial</h4>
            <span className="text-xs text-ink-muted block mt-0.5">SSS 2A · Room 204</span>
            <span className="mt-3 inline-block font-mono text-[11px] text-ink-muted">02:00 - 02:45 PM</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Live Attendance Register & Marks Entry */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Attendance Register (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Daily Attendance Register</h3>
                <p className="text-xs text-ink-muted">Class: SSS 2A · Roll Call for Today</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={markAllPresent}
                  className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-surface hover:text-ink"
                >
                  Mark All Present
                </button>
                <button
                  type="button"
                  onClick={handleSaveAttendance}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-primary-hover active:scale-95"
                >
                  <Save className="size-3.5" />
                  <span>Save Register</span>
                </button>
              </div>
            </div>

            {attendanceSaved && (
              <div className="mt-4 rounded-xl border border-success/30 bg-success-light p-3 text-xs text-success-deep font-semibold flex items-center gap-2">
                <CheckCircle2 className="size-4" />
                <span>Attendance register recorded &amp; synced to parent SMS gateway!</span>
              </div>
            )}

            {/* Students Register List */}
            <div className="mt-4 divide-y divide-line-soft">
              {students.map((student) => (
                <div key={student.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-xs text-ink block">{student.name}</span>
                    <span className="font-mono text-[10px] text-ink-muted">{student.rollNo}</span>
                  </div>

                  {/* Status Pills */}
                  <div className="flex items-center gap-1">
                    {(["present", "late", "absent", "excused"] as const).map((st) => {
                      const isSelected = student.status === st;
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setStatus(student.id, st)}
                          className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold uppercase transition-all ${
                            isSelected
                              ? st === "present"
                                ? "bg-success text-white shadow-sm"
                                : st === "late"
                                ? "bg-amber-500 text-white shadow-sm"
                                : st === "absent"
                                ? "bg-danger text-white shadow-sm"
                                : "bg-primary text-white shadow-sm"
                              : "bg-surface-raised text-ink-muted hover:text-ink"
                          }`}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Continuous Assessment (CA) Score Entry (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="border-b border-line pb-4">
              <h3 className="text-base font-extrabold text-ink">Continuous Assessment (CA) Marks</h3>
              <p className="text-xs text-ink-muted">Subject: Further Mathematics · Midterm Broadsheet</p>
            </div>

            <div className="mt-4 space-y-3">
              {grades.map((g) => {
                const total = getScoreTotal(g.ca1, g.ca2, g.exam);
                const letter = getLetterGrade(total);
                return (
                  <div key={g.id} className="rounded-2xl border border-line bg-surface-raised p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ink">{g.name}</span>
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${letter.color}`}>
                        {letter.grade} ({total}%)
                      </span>
                    </div>

                    <div className="mt-2.5 grid grid-cols-3 gap-2 font-mono text-[11px]">
                      <div className="rounded-lg bg-surface border border-line p-2 text-center">
                        <span className="block text-[10px] text-ink-muted">CA 1 (20)</span>
                        <span className="font-bold text-ink">{g.ca1}</span>
                      </div>
                      <div className="rounded-lg bg-surface border border-line p-2 text-center">
                        <span className="block text-[10px] text-ink-muted">CA 2 (20)</span>
                        <span className="font-bold text-ink">{g.ca2}</span>
                      </div>
                      <div className="rounded-lg bg-surface border border-line p-2 text-center">
                        <span className="block text-[10px] text-ink-muted">Exam (60)</span>
                        <span className="font-bold text-ink">{g.exam}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => alert("Marks broadsheet submitted to Principal for publication review.")}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-violet-700 active:scale-95"
            >
              <Award className="size-4" />
              <span>Submit Marks to Principal Broadsheet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
