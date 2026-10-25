"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  CheckCircle2,
  Calendar,
  Clock,
  Flame,
  ShieldCheck,
  AlertCircle,
  UploadCloud,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface DayAttendance {
  date: string;
  day: string;
  checkIn: string;
  checkOut: string;
  status: "present" | "late" | "excused";
  gate: string;
}

export default function StudentAttendancePage() {
  const [selectedMonth, setSelectedMonth] = useState("January 2026");
  const [excuseModalOpen, setExcuseModalOpen] = useState(false);

  const attendanceLog: DayAttendance[] = [
    { date: "Jan 25, 2026", day: "Friday", checkIn: "07:34 AM", checkOut: "03:45 PM", status: "present", gate: "Main Gate Turnstile A" },
    { date: "Jan 24, 2026", day: "Thursday", checkIn: "07:38 AM", checkOut: "03:50 PM", status: "present", gate: "Main Gate Turnstile A" },
    { date: "Jan 23, 2026", day: "Wednesday", checkIn: "07:42 AM", checkOut: "04:10 PM", status: "present", gate: "Main Gate Turnstile B" },
    { date: "Jan 22, 2026", day: "Tuesday", checkIn: "07:55 AM", checkOut: "03:45 PM", status: "late", gate: "Main Gate Turnstile A" },
    { date: "Jan 21, 2026", day: "Monday", checkIn: "07:30 AM", checkOut: "03:45 PM", status: "present", gate: "Main Gate Turnstile A" },
    { date: "Jan 18, 2026", day: "Friday", checkIn: "07:35 AM", checkOut: "03:40 PM", status: "present", gate: "Main Gate Turnstile A" },
    { date: "Jan 17, 2026", day: "Thursday", checkIn: "—", checkOut: "—", status: "excused", gate: "Medical Exemption Filed" },
    { date: "Jan 16, 2026", day: "Wednesday", checkIn: "07:39 AM", checkOut: "03:45 PM", status: "present", gate: "Main Gate Turnstile B" },
    { date: "Jan 15, 2026", day: "Tuesday", checkIn: "07:31 AM", checkOut: "03:45 PM", status: "present", gate: "Main Gate Turnstile A" },
    { date: "Jan 14, 2026", day: "Monday", checkIn: "07:28 AM", checkOut: "03:50 PM", status: "present", gate: "Main Gate Turnstile A" },
  ];

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              Student Portal · Attendance Compliance
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              My Attendance & Punctuality Streak
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Real-time biometric gate check-in records, punctuality rates, and statutory attendance compliance.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setExcuseModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <FileText className="w-4 h-4" />
              Submit Excuse Slip
            </button>
          </div>
        </div>

        {/* Attendance Highlight Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Compliance Percentage</div>
            <div className="text-3xl font-black text-cyan-600 mt-1">98.2%</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Well above 85% requirement
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Current Streak</div>
            <div className="text-3xl font-black text-amber-500 mt-1 flex items-center gap-1.5">
              <Flame className="w-7 h-7 text-amber-500" />
              42 Days
            </div>
            <div className="text-[11px] text-muted-foreground mt-1">Perfect consecutive attendance</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">School Sessions Held</div>
            <div className="text-3xl font-black text-foreground mt-1">56 Days</div>
            <div className="text-[11px] text-muted-foreground mt-1">Term 2, 2025/2026 session</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Average Morning Arrival</div>
            <div className="text-3xl font-black text-foreground mt-1">07:35 AM</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">25 min prior to morning bell</div>
          </div>
        </div>

        {/* Daily Biometric Gate History */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="p-4 bg-canvas border-b border-border flex items-center justify-between">
            <div className="font-bold text-foreground text-sm">Biometric Gate Logs & Roll Call</div>
            <div className="text-xs text-muted-foreground font-medium">Logged via Smart RFID Turnstile</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Day</th>
                  <th className="py-3 px-4">Morning Check-In</th>
                  <th className="py-3 px-4">Afternoon Departure</th>
                  <th className="py-3 px-4">Gate Location</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {attendanceLog.map((log) => (
                  <tr key={log.date} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4 font-semibold text-foreground">{log.date}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{log.day}</td>
                    <td className="py-3.5 px-4 font-mono font-medium text-foreground">{log.checkIn}</td>
                    <td className="py-3.5 px-4 font-mono text-muted-foreground">{log.checkOut}</td>
                    <td className="py-3.5 px-4 text-xs text-muted-foreground">{log.gate}</td>
                    <td className="py-3.5 px-4 text-center">
                      {log.status === "present" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> Present On-Time
                        </span>
                      )}
                      {log.status === "late" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800">
                          <Clock className="w-3 h-3" /> Tardy (Late)
                        </span>
                      )}
                      {log.status === "excused" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200 dark:border-blue-800">
                          Excused Sick
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Absence Excuse Slip Modal */}
        {excuseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-foreground">Submit Medical / Absence Excuse</h3>
              <p className="text-xs text-muted-foreground">
                Formal notes uploaded here are forwarded to Mr. David Alabi (Form Master) and the school health office for administrative endorsement.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-muted-foreground mb-1 font-medium">Dates Affected</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 rounded-xl bg-canvas border border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-muted-foreground mb-1 font-medium">Reason for Absence</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly state clinical or compassionate reason..."
                    className="w-full px-3 py-2 rounded-xl bg-canvas border border-border text-foreground"
                  />
                </div>
                <div className="border-2 border-dashed border-border rounded-xl p-4 text-center">
                  <UploadCloud className="w-8 h-8 text-muted-foreground mx-auto mb-1" />
                  <div className="text-xs font-semibold text-foreground">Upload Doctor Note or Slip</div>
                  <div className="text-[10px] text-muted-foreground">PDF, PNG or JPG up to 5MB</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setExcuseModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Absence excuse slip submitted to Form Master.");
                    setExcuseModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-medium hover:bg-cyan-700"
                >
                  Submit Excuse
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
