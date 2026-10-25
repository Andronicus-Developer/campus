"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  AlertCircle,
  CheckCircle2,
  Send,
  Download,
  ShieldCheck,
  Building2,
  Calendar,
} from "lucide-react";

interface InvigilationDuty {
  id: string;
  examTitle: string;
  classGroup: string;
  room: string;
  date: string;
  timeSlot: string;
  coInvigilator: string;
}

const SCHEDULE_ROWS = [
  { time: "08:15 - 09:00 AM", mon: "Further Math (SSS 2A)", tue: "Staff Dev Briefing", wed: "Further Math (SSS 2A)", thu: "Math (SSS 1B)", fri: "Form Room Inspection" },
  { time: "09:00 - 09:45 AM", mon: "Math (SSS 1B)", tue: "Math (SSS 1B)", wed: "Chemistry Lab Collab", thu: "Further Math (SSS 2A)", fri: "Further Math (SSS 2A)" },
  { time: "09:45 - 10:15 AM", mon: "Morning Break", tue: "Morning Break", wed: "Morning Break", thu: "Morning Break", fri: "Morning Break" },
  { time: "10:15 - 11:00 AM", mon: "Prep / Marking", tue: "Further Math (SSS 2A)", wed: "Prep / Marking", thu: "Math (SSS 1B)", fri: "Math (SSS 1B)" },
  { time: "11:00 - 11:45 AM", mon: "Math (SSS 1B)", tue: "Prep / Marking", wed: "Further Math (SSS 2A - Active)", thu: "Free Period", fri: "Math Olympiad Club" },
  { time: "01:00 - 01:45 PM", mon: "Remedial Clinic", tue: "Further Math (SSS 2A)", wed: "Lesson Prep", thu: "Prep / Marking", fri: "Staff Assembly" },
];

const INVIGILATION_DUTIES: InvigilationDuty[] = [
  {
    id: "inv-1",
    examTitle: "SSS 3 Mock Examination (Mathematics Paper 1)",
    classGroup: "SSS 3 (All Streams)",
    room: "Main Auditorium (West Wing)",
    date: "March 04, 2026",
    timeSlot: "09:00 AM - 11:30 AM",
    coInvigilator: "Mrs. Folake Adeyemi",
  },
  {
    id: "inv-2",
    examTitle: "JSS 3 Mid-Term Diagnostic Olympiad",
    classGroup: "JSS 3 Gold & Diamond",
    room: "STEM Lab Hall A",
    date: "March 18, 2026",
    timeSlot: "01:00 PM - 02:30 PM",
    coInvigilator: "Dr. Oladipo Johnson",
  },
];

export default function TeacherSchedulePage() {
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [conflictForm, setConflictForm] = useState({
    timeSlot: "Wednesday 11:00 AM",
    reason: "",
    suggestedPeriod: "Thursday Free Period",
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSubmitConflict = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictModalOpen(false);
    showToast(
      `Timetable adjustment request submitted to Registry Administrator (Engr. Patrick Bassey) for period re-allocation.`
    );
  };

  return (
    <DashboardLayout currentRole="teacher">
      <div className="space-y-6">
        {/* Top Banner & Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-[11px] font-bold text-violet-700">
                  Faculty Weekly Timetable
                </span>
                <span className="font-mono text-xs text-ink-muted">Mr. David Alabi · 18 Periods Weekly</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Master Teaching Timetable &amp; Invigilation</h2>
              <p className="text-xs text-ink-muted">
                Assigned lecture periods, classroom locations, examination invigilation shifts, and substitute cover schedules.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setConflictModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-raised px-4 py-2 text-xs font-bold text-ink hover:border-violet-600 active:scale-95 transition-all shadow-sm"
              >
                <span>Request Schedule Adjustment</span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Exported Weekly Teaching Timetable to PDF.")}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-violet-700 active:scale-95 transition-all"
              >
                <Download className="size-4" />
                <span>Export Timetable (PDF)</span>
              </button>
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

        {/* Timetable Grid */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="text-base font-extrabold text-ink">Assigned Weekly Periods (Bell Schedule)</h3>
            <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              Wednesday · Active Session
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-line font-mono text-[11px] text-ink-muted bg-surface-raised">
                  <th className="p-3.5 font-bold uppercase">Time Period</th>
                  <th className="p-3.5 font-bold uppercase">Monday</th>
                  <th className="p-3.5 font-bold uppercase">Tuesday</th>
                  <th className="p-3.5 font-bold uppercase text-primary">Wednesday (Today)</th>
                  <th className="p-3.5 font-bold uppercase">Thursday</th>
                  <th className="p-3.5 font-bold uppercase">Friday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft font-mono">
                {SCHEDULE_ROWS.map((row) => (
                  <tr key={row.time} className="hover:bg-surface-raised">
                    <td className="p-3.5 font-bold text-ink whitespace-nowrap bg-surface-raised/40">{row.time}</td>
                    <td className="p-3.5 text-ink-soft">{row.mon}</td>
                    <td className="p-3.5 text-ink-soft">{row.tue}</td>
                    <td className={`p-3.5 font-bold ${row.wed.includes("Active") ? "bg-primary-light text-primary" : "text-ink"}`}>
                      {row.wed}
                    </td>
                    <td className="p-3.5 text-ink-soft">{row.thu}</td>
                    <td className="p-3.5 text-ink-soft">{row.fri}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Examination Invigilation Roster */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <h3 className="text-base font-extrabold text-ink">Assigned Examination Invigilation Duties</h3>
              <p className="text-xs text-ink-muted">Term 2 mock exams and standardized examination hall supervision.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INVIGILATION_DUTIES.map((inv) => (
              <div
                key={inv.id}
                className="p-4 rounded-2xl border border-line bg-surface-raised/70 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ink text-sm">{inv.examTitle}</span>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-violet-100 text-violet-800">
                    {inv.classGroup}
                  </span>
                </div>
                <div className="space-y-1 text-ink-soft">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-violet-600" />
                    <span>Venue: <strong>{inv.room}</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-violet-600" />
                    <span className="font-mono">{inv.date} · {inv.timeSlot}</span>
                  </p>
                  <p className="text-ink-muted text-[11px]">
                    Co-Invigilator: <strong>{inv.coInvigilator}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL: REQUEST TIMETABLE ADJUSTMENT */}
        {conflictModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2 text-ink">
                  <Calendar className="size-5 text-violet-600" />
                  <h3 className="text-base font-extrabold">Request Timetable Adjustment</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setConflictModalOpen(false)}
                  className="text-ink-muted hover:text-ink"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitConflict} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Affected Time Slot</label>
                  <input
                    type="text"
                    required
                    value={conflictForm.timeSlot}
                    onChange={(e) => setConflictForm({ ...conflictForm, timeSlot: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Suggested Re-Allocation</label>
                  <input
                    type="text"
                    required
                    value={conflictForm.suggestedPeriod}
                    onChange={(e) => setConflictForm({ ...conflictForm, suggestedPeriod: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Pedagogical Justification / Reason</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. Science lab equipment setup requires double period block..."
                    value={conflictForm.reason}
                    onChange={(e) => setConflictForm({ ...conflictForm, reason: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setConflictModalOpen(false)}
                    className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-violet-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-violet-700"
                  >
                    Submit Adjustment Request
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
