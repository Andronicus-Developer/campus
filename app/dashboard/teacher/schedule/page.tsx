"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { CalendarDays, Clock, MapPin, User } from "lucide-react";

export default function TeacherSchedulePage() {
  const schedule = [
    { time: "08:15 - 09:00 AM", mon: "Further Math (SSS 2A)", tue: "Staff Dev Briefing", wed: "Further Math (SSS 2A)", thu: "Math (SSS 1B)", fri: "Form Room Inspection" },
    { time: "09:00 - 09:45 AM", mon: "Math (SSS 1B)", tue: "Math (SSS 1B)", wed: "Chemistry Lab Collab", thu: "Further Math (SSS 2A)", fri: "Further Math (SSS 2A)" },
    { time: "09:45 - 10:15 AM", mon: "Morning Break", tue: "Morning Break", wed: "Morning Break", thu: "Morning Break", fri: "Morning Break" },
    { time: "10:15 - 11:00 AM", mon: "Prep / Marking", tue: "Further Math (SSS 2A)", wed: "Prep / Marking", thu: "Math (SSS 1B)", fri: "Math (SSS 1B)" },
    { time: "11:00 - 11:45 AM", mon: "Math (SSS 1B)", tue: "Prep / Marking", wed: "Further Math (SSS 2A - Active)", thu: "Free Period", fri: "Math Olympiad Club" },
    { time: "01:00 - 01:45 PM", mon: "Remedial Clinic", tue: "Further Math (SSS 2A)", wed: "Lesson Prep", thu: "Prep / Marking", fri: "Staff Assembly" },
  ];

  return (
    <DashboardLayout currentRole="teacher">
      <div className="space-y-6">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-[11px] font-bold text-violet-700">
                  Faculty Weekly Timetable
                </span>
                <span className="font-mono text-xs text-ink-muted">Mr. David Alabi · 18 Periods Weekly</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Master Teaching Timetable</h2>
              <p className="text-xs text-ink-muted">
                Assigned lecture periods, laboratory practical allocations, and remedial study clinics.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs font-bold text-primary">
              Term 2 Bell Schedule Active
            </div>
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
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
                {schedule.map((row) => (
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
      </div>
    </DashboardLayout>
  );
}
