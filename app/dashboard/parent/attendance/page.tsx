"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Activity,
  CheckCircle2,
  Clock,
  Smartphone,
  ShieldCheck,
  Bell,
  MessageSquare,
  AlertCircle,
  Calendar,
} from "lucide-react";

interface GateRecord {
  date: string;
  day: string;
  arrival: string;
  departure: string;
  gateLocation: string;
  smsSentTo: string;
  status: "on-time" | "late" | "excused";
}

export default function ParentAttendancePage() {
  const [selectedChild, setSelectedChild] = useState<"tobi" | "maryam">("tobi");
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);

  const records: GateRecord[] = [
    { date: "Jan 25, 2026", day: "Friday", arrival: "07:34 AM", departure: "03:45 PM", gateLocation: "Main Campus Gate Turnstile A", smsSentTo: "+234 803 412 8901", status: "on-time" },
    { date: "Jan 24, 2026", day: "Thursday", arrival: "07:38 AM", departure: "03:50 PM", gateLocation: "Main Campus Gate Turnstile A", smsSentTo: "+234 803 412 8901", status: "on-time" },
    { date: "Jan 23, 2026", day: "Wednesday", arrival: "07:42 AM", departure: "04:10 PM", gateLocation: "Main Campus Gate Turnstile B", smsSentTo: "+234 803 412 8901", status: "on-time" },
    { date: "Jan 22, 2026", day: "Tuesday", arrival: "07:55 AM", departure: "03:45 PM", gateLocation: "Main Campus Gate Turnstile A", smsSentTo: "+234 803 412 8901", status: "late" },
    { date: "Jan 21, 2026", day: "Monday", arrival: "07:30 AM", departure: "03:45 PM", gateLocation: "Main Campus Gate Turnstile A", smsSentTo: "+234 803 412 8901", status: "on-time" },
  ];

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <Activity className="w-4 h-4" />
              Family Portal · Real-Time Safety & Gate Monitoring
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Daily Gate Attendance & SMS Alerts
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Live biometric RFID turnstile check-in tracking and automated arrival notifications.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Simulating test SMS arrival alert to registered guardian phone.")}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Smartphone className="w-4 h-4 text-pink-600" />
              Test SMS Alert
            </button>
          </div>
        </div>

        {/* Child Selector Tabs */}
        <div className="flex items-center gap-2 bg-card border border-border p-1.5 rounded-2xl shadow-xs">
          <button
            onClick={() => setSelectedChild("tobi")}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
              selectedChild === "tobi"
                ? "bg-pink-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <span>Tobi Adeleke (SSS 2A)</span>
          </button>

          <button
            onClick={() => setSelectedChild("maryam")}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
              selectedChild === "maryam"
                ? "bg-pink-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <span>Maryam Adeleke (JSS 1C)</span>
          </button>
        </div>

        {/* Today's Live Status Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600/15 via-pink-600/10 to-transparent border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-300">
                  Safely On Campus
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Arrived at 07:34 AM today via Turnstile A
              </h3>
              <p className="text-xs text-muted-foreground">
                SMS arrival broadcast delivered to Mrs. Zainab Adeleke (+234 803 412 8901) at 07:34:12 AM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-card border border-border px-3.5 py-2 rounded-xl text-xs">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Expected Dismissal: <strong>03:45 PM</strong></span>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-pink-600" />
            <div>
              <h4 className="font-bold text-foreground text-sm">Gate Alert Delivery Channels</h4>
              <p className="text-xs text-muted-foreground">Receive instant notifications when your child taps their smart card at the gate.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={smsEnabled}
                onChange={(e) => setSmsEnabled(e.target.checked)}
                className="rounded border-border text-pink-600 focus:ring-pink-500"
              />
              <span className="font-medium text-foreground">SMS Notifications</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={whatsappEnabled}
                onChange={(e) => setWhatsappEnabled(e.target.checked)}
                className="rounded border-border text-pink-600 focus:ring-pink-500"
              />
              <span className="font-medium text-foreground">WhatsApp Alerts</span>
            </label>
          </div>
        </div>

        {/* Log History */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="p-4 bg-canvas border-b border-border font-bold text-foreground text-sm">
            Recent Gate Check-In & Departure Logs
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Date & Day</th>
                  <th className="py-3 px-4">Morning Entry</th>
                  <th className="py-3 px-4">Afternoon Exit</th>
                  <th className="py-3 px-4">Gate Station</th>
                  <th className="py-3 px-4">SMS Delivery Log</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {records.map((r) => (
                  <tr key={r.date} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4 font-semibold text-foreground">
                      {r.date}
                      <div className="text-[11px] text-muted-foreground font-normal">{r.day}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-foreground">{r.arrival}</td>
                    <td className="py-3.5 px-4 font-mono text-muted-foreground">{r.departure}</td>
                    <td className="py-3.5 px-4 text-xs text-muted-foreground">{r.gateLocation}</td>
                    <td className="py-3.5 px-4 text-xs text-muted-foreground font-mono">
                      Delivered to {r.smsSentTo}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {r.status === "on-time" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> On Time
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800">
                          <Clock className="w-3 h-3" /> Late Arrival
                        </span>
                      )}
                    </td>
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
