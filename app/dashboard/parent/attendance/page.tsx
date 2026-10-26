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
  Plus,
  Upload,
  FileText,
  HelpCircle,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import { CHILDREN_PROFILES } from "@/lib/family-data";

interface AttendanceLog {
  id: string;
  date: string;
  day: string;
  arrival: string;
  departure: string;
  gateLocation: string;
  status: "on-time" | "late" | "absent" | "excused";
  note?: string;
}

interface AbsenceRequest {
  id: string;
  childName: string;
  type: "Unplanned Absence Explanation" | "Planned Leave Notice" | "Attendance Correction";
  date: string;
  reason: string;
  documentName?: string;
  status: "approved" | "under_review" | "rejected";
  reviewedBy?: string;
  submittedAt: string;
}

export default function ParentAttendancePage() {
  const [selectedChildId, setSelectedChildId] = useState<string>("child-1");
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"daily_logs" | "absence_notes">("daily_logs");

  // Absence modal states
  const [isAbsenceModalOpen, setIsAbsenceModalOpen] = useState(false);
  const [requestType, setRequestType] = useState<AbsenceRequest["type"]>("Unplanned Absence Explanation");
  const [absenceDate, setAbsenceDate] = useState("2026-01-26");
  const [reasonText, setReasonText] = useState("");
  const [docAttached, setDocAttached] = useState("Doctor_Medical_Certificate.pdf");

  const activeChild =
    CHILDREN_PROFILES.find((c) => c.id === selectedChildId) || CHILDREN_PROFILES[0];

  const [tobiLogs, setTobiLogs] = useState<AttendanceLog[]>([
    { id: "LOG-01", date: "Jan 25, 2026", day: "Friday", arrival: "07:34 AM", departure: "03:45 PM", gateLocation: "Main Gate Turnstile A", status: "on-time" },
    { id: "LOG-02", date: "Jan 24, 2026", day: "Thursday", arrival: "07:38 AM", departure: "03:50 PM", gateLocation: "Main Gate Turnstile A", status: "on-time" },
    { id: "LOG-03", date: "Jan 23, 2026", day: "Wednesday", arrival: "07:42 AM", departure: "04:10 PM", gateLocation: "Main Gate Turnstile B", status: "on-time" },
    { id: "LOG-04", date: "Jan 22, 2026", day: "Tuesday", arrival: "07:58 AM", departure: "03:45 PM", gateLocation: "Main Gate Turnstile A", status: "late", note: "Heavy morning traffic on Lekki toll road" },
    { id: "LOG-05", date: "Jan 21, 2026", day: "Monday", arrival: "07:30 AM", departure: "03:45 PM", gateLocation: "Main Gate Turnstile A", status: "on-time" },
  ]);

  const [maryamLogs, setMaryamLogs] = useState<AttendanceLog[]>([
    { id: "LOG-06", date: "Jan 25, 2026", day: "Friday", arrival: "07:34 AM", departure: "03:45 PM", gateLocation: "Main Gate Turnstile A", status: "on-time" },
    { id: "LOG-07", date: "Jan 24, 2026", day: "Thursday", arrival: "07:38 AM", departure: "03:45 PM", gateLocation: "Main Gate Turnstile A", status: "on-time" },
    { id: "LOG-08", date: "Jan 23, 2026", day: "Wednesday", arrival: "07:35 AM", departure: "03:45 PM", gateLocation: "Main Gate Turnstile A", status: "on-time" },
    { id: "LOG-09", date: "Jan 22, 2026", day: "Tuesday", arrival: "07:36 AM", departure: "03:45 PM", gateLocation: "Main Gate Turnstile A", status: "on-time" },
    { id: "LOG-10", date: "Jan 21, 2026", day: "Monday", arrival: "07:30 AM", departure: "03:45 PM", gateLocation: "Main Gate Turnstile A", status: "on-time" },
  ]);

  const [absenceRequests, setAbsenceRequests] = useState<AbsenceRequest[]>([
    {
      id: "ABS-101",
      childName: "Tobi Adeleke",
      type: "Unplanned Absence Explanation",
      date: "Jan 12, 2026",
      reason: "Dental extraction procedure under mild sedation; excused for full afternoon session.",
      documentName: "St_Nicholas_Dental_Clinic_Note.pdf",
      status: "approved",
      reviewedBy: "Mr. David Alabi (Form Master)",
      submittedAt: "Jan 12, 2026, 09:15 AM",
    },
    {
      id: "ABS-102",
      childName: "Maryam Adeleke",
      type: "Planned Leave Notice",
      date: "Feb 13, 2026",
      reason: "Traveling with family for maternal grandmother 80th anniversary in Ibadan.",
      documentName: "Parent_Travel_Notification.pdf",
      status: "under_review",
      submittedAt: "Yesterday, 04:30 PM",
    },
  ]);

  const currentLogs = selectedChildId === "child-1" ? tobiLogs : maryamLogs;

  const handleCreateAbsenceRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reasonText.trim()) return;

    const newReq: AbsenceRequest = {
      id: `ABS-${Math.floor(100 + Math.random() * 900)}`,
      childName: activeChild.name,
      type: requestType,
      date: absenceDate,
      reason: reasonText,
      documentName: docAttached,
      status: "under_review",
      submittedAt: "Just now",
    };

    setAbsenceRequests([newReq, ...absenceRequests]);
    setIsAbsenceModalOpen(false);
    setReasonText("");
    setToast(
      `${requestType} recorded for ${activeChild.preferredName}. Routed to ${activeChild.classTeacher.name} for official register review.`
    );
  };

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <Activity className="w-4 h-4" />
              Family Safety &amp; Attendance · Section C
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Attendance Monitoring &amp; Gate Radar
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Live RFID biometric turnstile check-ins, automated SMS alerts, and absence excuse workflows.
            </p>
          </div>

          {/* Child Switcher & Action */}
          <div className="flex flex-wrap items-center gap-2.5">
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

            <button
              onClick={() => setIsAbsenceModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              Submit Absence Note
            </button>
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

        {/* Governance Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-foreground">Attendance Policy Standard:</span>{" "}
            <span className="text-muted-foreground">
              Absence notes and medical certificates submitted by parents do not automatically mutate the official school attendance register. Each entry is audited by the Form Teacher or Vice Principal (Pastoral) before status update.
            </span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Term Compliance</span>
              <Activity className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600">{activeChild.attendancePct}</div>
            <div className="text-xs text-muted-foreground mt-1">Excellent attendance record</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Days Present</span>
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-foreground">58 of 59 Days</div>
            <div className="text-xs text-muted-foreground mt-1">Term 1 Session (1 absence excused)</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Punctuality Radar</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">1 Lateness Logged</div>
            <div className="text-xs text-muted-foreground mt-1">Resolved (Morning traffic on Jan 22)</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>SMS / Push Broadcasts</span>
              <Smartphone className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-black text-purple-600">Active</div>
            <div className="text-xs text-muted-foreground mt-1">Sent to +234 803 291 0021</div>
          </div>
        </div>

        {/* Tabs: Daily Logs vs Absence Requests */}
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("daily_logs")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "daily_logs"
                ? "bg-pink-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Daily RFID Turnstile Check-Ins ({activeChild.preferredName})
          </button>
          <button
            onClick={() => setActiveTab("absence_notes")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "absence_notes"
                ? "bg-pink-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Absence Notes &amp; Planned Leave ({absenceRequests.length})
          </button>
        </div>

        {/* TAB 1: Daily Turnstile Logs */}
        {activeTab === "daily_logs" && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Date / Day</th>
                      <th className="py-3 px-4">Morning Turnstile Check-In</th>
                      <th className="py-3 px-4">Afternoon Departure</th>
                      <th className="py-3 px-4">Gate Location</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {currentLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-canvas/50 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-foreground">{log.date}</div>
                          <div className="text-xs text-muted-foreground">{log.day}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-semibold text-foreground">
                          {log.arrival}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-muted-foreground">
                          {log.departure}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-muted-foreground">
                          {log.gateLocation}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {log.status === "on-time" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                              <CheckCircle2 className="w-3 h-3" /> Present On-Time
                            </span>
                          )}
                          {log.status === "late" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800">
                              <Clock className="w-3 h-3" /> Late Arrival
                            </span>
                          )}
                          {log.status === "excused" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200 dark:border-blue-800">
                              <ShieldCheck className="w-3 h-3" /> Excused
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              alert(`Attendance entry audited: ${log.date}. Gate device RFID token match confirmed.`);
                            }}
                            className="px-2.5 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-medium text-foreground transition"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Absence Notes & Tracking */}
        {activeTab === "absence_notes" && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Request Ref / Child</th>
                      <th className="py-3 px-4">Request Type</th>
                      <th className="py-3 px-4">Absence Date</th>
                      <th className="py-3 px-4">Reason &amp; Documentation</th>
                      <th className="py-3 px-4 text-center">Review Status</th>
                      <th className="py-3 px-4 text-right">Auditor Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {absenceRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-canvas/50 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-foreground">{req.childName}</div>
                          <div className="text-xs font-mono text-pink-600">{req.id}</div>
                          <div className="text-[11px] text-muted-foreground">{req.submittedAt}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-canvas border border-border text-foreground">
                            {req.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-foreground">
                          {req.date}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="text-xs text-foreground line-clamp-2">{req.reason}</p>
                          {req.documentName && (
                            <span className="text-[11px] text-blue-600 underline flex items-center gap-1 mt-1 cursor-pointer">
                              <FileText className="w-3 h-3" /> {req.documentName}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {req.status === "approved" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                              <CheckCircle2 className="w-3 h-3" /> Approved by Tutor
                            </span>
                          )}
                          {req.status === "under_review" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800">
                              <Clock className="w-3 h-3" /> Under Review
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right text-xs text-muted-foreground">
                          {req.reviewedBy || "Pending Review by Form Master"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Submit Absence Note */}
        {isAbsenceModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-pink-600" />
                  <h3 className="font-bold text-foreground text-base">Submit Absence Note or Planned Leave</h3>
                </div>
                <button
                  onClick={() => setIsAbsenceModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateAbsenceRequest} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Select Child</label>
                  <select
                    value={selectedChildId}
                    onChange={(e) => setSelectedChildId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    {CHILDREN_PROFILES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.classGroup})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Notification Type</label>
                    <select
                      value={requestType}
                      onChange={(e) => setRequestType(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    >
                      <option value="Unplanned Absence Explanation">Unplanned Absence Note (Illness)</option>
                      <option value="Planned Leave Notice">Planned Leave Notice (Excursion/Family)</option>
                      <option value="Attendance Correction">Attendance Register Correction</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Effective Date</label>
                    <input
                      type="date"
                      value={absenceDate}
                      onChange={(e) => setAbsenceDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Detailed Explanation &amp; Reason</label>
                  <textarea
                    rows={3}
                    placeholder="Provide specific medical or family reason..."
                    value={reasonText}
                    onChange={(e) => setReasonText(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Attach Supporting Medical Document / Slip</label>
                  <input
                    type="text"
                    value={docAttached}
                    onChange={(e) => setDocAttached(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  />
                  <span className="text-[11px] text-muted-foreground mt-0.5 block">
                    Upload medical slip, doctor note or hospital discharge summary (PDF/JPG)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-canvas border border-border text-[11px] text-muted-foreground">
                  Note: Form Teacher {activeChild.classTeacher.name} will verify and update the official electronic attendance register accordingly.
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsAbsenceModalOpen(false)}
                    className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold"
                  >
                    Submit Absence Notice
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
