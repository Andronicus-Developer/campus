"use client";

import { useState } from "react";
import {
  Award,
  Bell,
  BookMarked,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Download,
  GraduationCap,
  Sparkles,
  TrendingUp,
  User,
} from "lucide-react";

export function StudentDashboardView() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("Official Cryptographically Signed Report Card PDF downloaded successfully!");
    }, 1500);
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

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-blue-900 shadow-md transition-all hover:bg-white/90 active:scale-95 disabled:opacity-75"
            >
              <Download className="size-4" />
              <span>{downloading ? "Generating PDF..." : "Download Report Card"}</span>
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-white/15 text-xs font-mono text-white/90">
          <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1">
            <CheckCircle2 className="size-3.5 text-emerald-300" />
            <span>Attendance: 98.2% (Present)</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1">
            <Award className="size-3.5 text-amber-300" />
            <span>Class Rank: 4th of 34</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1">
            <TrendingUp className="size-3.5 text-cyan-300" />
            <span>Current GPA: 3.82 / 4.0</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Today's Schedule + Subject Scores */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Today's Class Timetable (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4.5 text-primary" />
                <h3 className="text-base font-extrabold text-ink">Today&apos;s Lecture Schedule</h3>
              </div>
              <span className="font-mono text-xs font-bold text-primary">Wednesday · 6 Periods</span>
            </div>

            <div className="mt-4 space-y-3">
              {[
                { period: "Period 1", time: "08:15 - 09:00 AM", subject: "English Language", teacher: "Mrs. N. Okeke", room: "Room 204", active: false },
                { period: "Period 2", time: "09:00 - 09:45 AM", subject: "Chemistry (Practical)", teacher: "Dr. K. Bello", room: "Lab 3", active: false },
                { period: "Period 3", time: "10:45 - 11:30 AM", subject: "Further Mathematics", teacher: "Mr. David Alabi", room: "Room 204", active: true },
                { period: "Period 4", time: "11:35 - 12:20 PM", subject: "Physics", teacher: "Engr. C. Eze", room: "Room 204", active: false },
                { period: "Period 5", time: "01:00 - 01:45 PM", subject: "Biology", teacher: "Mrs. Grace Okon", room: "Lab 1", active: false },
                { period: "Period 6", time: "02:00 - 02:45 PM", subject: "Civic Education", teacher: "Mr. S. Danjuma", room: "Room 204", active: false },
              ].map((p) => (
                <div
                  key={p.period}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs transition-colors ${
                    p.active
                      ? "border-primary/40 bg-primary-light/40 shadow-sm"
                      : "border-line bg-surface-raised"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono font-bold text-xs ${p.active ? "text-primary" : "text-ink-muted"}`}>
                      {p.period}
                    </span>
                    <div>
                      <span className="font-bold text-ink block">{p.subject}</span>
                      <span className="text-[11px] text-ink-muted">{p.teacher} · {p.room}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-[11px] font-semibold text-ink-soft block">{p.time}</span>
                    {p.active && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-primary">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                        In Session
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Enrolled Subjects & Midterm Broadsheet (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h3 className="text-base font-extrabold text-ink">My Subject Progress</h3>
              <span className="font-mono text-xs font-bold text-success">Average: 82.4%</span>
            </div>

            <div className="mt-4 space-y-3">
              {[
                { subject: "Further Mathematics", ca1: "18 / 20", ca2: "17 / 20", exam: "52 / 60", total: 87, grade: "A" },
                { subject: "Physics", ca1: "16 / 20", ca2: "18 / 20", exam: "49 / 60", total: 83, grade: "A" },
                { subject: "Chemistry", ca1: "17 / 20", ca2: "15 / 20", exam: "46 / 60", total: 78, grade: "A" },
                { subject: "Biology", ca1: "15 / 20", ca2: "16 / 20", exam: "45 / 60", total: 76, grade: "A" },
                { subject: "English Language", ca1: "14 / 20", ca2: "15 / 20", exam: "44 / 60", total: 73, grade: "B" },
              ].map((s) => (
                <div key={s.subject} className="rounded-2xl border border-line bg-surface-raised p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink">{s.subject}</span>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-xs font-bold text-emerald-800">
                      Grade {s.grade} ({s.total}%)
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-ink-muted">
                    <span>CA 1: {s.ca1}</span>
                    <span>CA 2: {s.ca2}</span>
                    <span>Exam: {s.exam}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Teacher Remarks Box */}
            <div className="mt-5 rounded-2xl border border-primary/20 bg-primary-light/20 p-4">
              <span className="font-mono text-[10px] font-bold uppercase text-primary tracking-wider block">
                Form Teacher Term Remark
              </span>
              <p className="mt-1 text-xs italic text-ink-soft leading-relaxed">
                &ldquo;Tobi is an exceptionally disciplined student with strong aptitude in mathematical analysis.
                Maintains exemplary attendance and class participation.&rdquo;
              </p>
              <span className="mt-2 block font-semibold text-[11px] text-ink">— Mr. David Alabi (Form Master)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
