"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Smartphone,
  Mail,
  MessageSquare,
  Lock,
  Save,
  Filter,
  Check,
  Calendar,
  CreditCard,
  Award,
} from "lucide-react";
import { FAMILY_DATA } from "@/lib/family-data";

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  category: "Safety & Urgent" | "Academic" | "Fees & Billing" | "Events & PTA";
  timestamp: string;
  isRead: boolean;
  channelsDelivered: string[];
  mandatory: boolean;
}

export default function ParentNotificationsPage() {
  const [filter, setFilter] = useState<string>("all");
  const [toast, setToast] = useState<string | null>(null);

  // Preference toggles
  const [gateSms, setGateSms] = useState(true);
  const [gateWhatsApp, setGateWhatsApp] = useState(true);
  const [feeReminders, setFeeReminders] = useState(true);
  const [homeworkAlerts, setHomeworkAlerts] = useState(true);
  const [ptaDigest, setPtaDigest] = useState(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "NOTIF-01",
      title: "Morning Biometric Gate Turnstile Check-in",
      body: "Tobi Adeleke and Maryam Adeleke safely arrived and checked in at Main Campus Turnstile A at 07:38 AM.",
      category: "Safety & Urgent",
      timestamp: "Today, 07:39 AM",
      isRead: false,
      channelsDelivered: ["Portal", "SMS (+234 803 291 0021)", "WhatsApp"],
      mandatory: false,
    },
    {
      id: "NOTIF-02",
      title: "Mid-Term Examination Timetable Released",
      body: "The official continuous assessment timetable for Senior Secondary (SSS 2) and Junior Secondary (JSS 2) has been published.",
      category: "Academic",
      timestamp: "Yesterday, 04:15 PM",
      isRead: true,
      channelsDelivered: ["Portal", "Email"],
      mandatory: true,
    },
    {
      id: "NOTIF-03",
      title: "Tuition 2nd Installment Notice — Maryam Adeleke",
      body: "Friendly reminder: Maryam's Term 1 second installment balance of US$ 650.00 is due by Feb 15, 2026.",
      category: "Fees & Billing",
      timestamp: "Jan 23, 2026",
      isRead: true,
      channelsDelivered: ["Portal", "Email", "WhatsApp"],
      mandatory: false,
    },
    {
      id: "NOTIF-04",
      title: "General PTA Assembly Notice & Agenda",
      body: "Riverside International College PTA General Assembly will take place on Saturday, Feb 7, 2026 at 10:00 AM.",
      category: "Events & PTA",
      timestamp: "Jan 20, 2026",
      isRead: true,
      channelsDelivered: ["Portal", "Email"],
      mandatory: false,
    },
    {
      id: "NOTIF-05",
      title: "Mandatory School Emergency Drill Notice",
      body: "Annual fire and evacuation safety drill scheduled for Friday 11:00 AM. Emergency protocols active.",
      category: "Safety & Urgent",
      timestamp: "Jan 18, 2026",
      isRead: true,
      channelsDelivered: ["Portal", "SMS", "Email"],
      mandatory: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setToast("All notices marked as read.");
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setToast("Notification delivery preferences successfully saved.");
  };

  const filteredNotifs = notifications.filter((n) => {
    if (filter === "all") return true;
    return n.category === filter;
  });

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <Bell className="w-4 h-4" />
              School Bulletins &amp; Alerts · Section I
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Notifications &amp; School Notices
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Multi-channel delivery log across SMS, WhatsApp, and email with mandatory safety protections.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={markAllAsRead}
              className="px-3.5 py-2 rounded-xl bg-card border border-border hover:bg-muted text-foreground text-xs font-semibold shadow-xs transition"
            >
              Mark All Read
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

        {/* Mandatory Policy Protection Alert */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-foreground">Mandatory Communications Policy:</span>{" "}
            <span className="text-muted-foreground">
              Critical safety alerts, campus closure announcements, examination releases, and statutory disciplinary dispatches are deemed mandatory and cannot be disabled under school safeguarding rules.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Notifications Feed (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-border pb-3">
              {(
                [
                  { key: "all", label: "All Notices" },
                  { key: "Safety & Urgent", label: "Safety & Turnstiles" },
                  { key: "Academic", label: "Academic & Exams" },
                  { key: "Fees & Billing", label: "Fees & Billing" },
                  { key: "Events & PTA", label: "Events & PTA" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    filter === tab.key
                      ? "bg-pink-600 text-white shadow-xs"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredNotifs.map((n) => (
                <div
                  key={n.id}
                  className={`p-5 rounded-2xl border transition shadow-xs space-y-2 ${
                    !n.isRead
                      ? "bg-card border-pink-500/40 ring-1 ring-pink-500/10"
                      : "bg-card/70 border-border"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md font-bold uppercase text-[10px] bg-canvas border border-border text-foreground">
                        {n.category}
                      </span>
                      {n.mandatory && (
                        <span className="px-2 py-0.5 rounded-md font-bold uppercase text-[10px] bg-amber-500/10 text-amber-600 border border-amber-500/20">
                          Mandatory
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono">{n.timestamp}</span>
                  </div>

                  <h3 className="font-bold text-foreground text-sm leading-snug">{n.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{n.body}</p>

                  <div className="pt-2 border-t border-border flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="font-semibold text-foreground">Delivered via:</span>
                    {n.channelsDelivered.map((ch, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-canvas border border-border">
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Channel Preferences Form (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-extrabold text-foreground">Delivery Channels</h3>
                <p className="text-xs text-muted-foreground">
                  Registered: {FAMILY_DATA.primaryGuardian.phone}
                </p>
              </div>

              <form onSubmit={handleSavePreferences} className="space-y-3.5 text-xs">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-canvas border border-border cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gateSms}
                    onChange={(e) => setGateSms(e.target.checked)}
                    className="mt-0.5 rounded text-pink-600 focus:ring-pink-500"
                  />
                  <div>
                    <span className="font-semibold text-foreground block">Gate Turnstile SMS Alert</span>
                    <span className="text-[11px] text-muted-foreground">Instant SMS on arrival/departure</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-canvas border border-border cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gateWhatsApp}
                    onChange={(e) => setGateWhatsApp(e.target.checked)}
                    className="mt-0.5 rounded text-pink-600 focus:ring-pink-500"
                  />
                  <div>
                    <span className="font-semibold text-foreground block">WhatsApp Direct Alerts</span>
                    <span className="text-[11px] text-muted-foreground">Receipts &amp; gate check-in photos</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-canvas border border-border cursor-pointer">
                  <input
                    type="checkbox"
                    checked={feeReminders}
                    onChange={(e) => setFeeReminders(e.target.checked)}
                    className="mt-0.5 rounded text-pink-600 focus:ring-pink-500"
                  />
                  <div>
                    <span className="font-semibold text-foreground block">Tuition Installment Reminders</span>
                    <span className="text-[11px] text-muted-foreground">Respectful notice 3 days prior</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-canvas border border-border cursor-pointer">
                  <input
                    type="checkbox"
                    checked={homeworkAlerts}
                    onChange={(e) => setHomeworkAlerts(e.target.checked)}
                    className="mt-0.5 rounded text-pink-600 focus:ring-pink-500"
                  />
                  <div>
                    <span className="font-semibold text-foreground block">Homework Due Radar</span>
                    <span className="text-[11px] text-muted-foreground">Notify when deadlines are 24h away</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-canvas border border-border cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ptaDigest}
                    onChange={(e) => setPtaDigest(e.target.checked)}
                    className="mt-0.5 rounded text-pink-600 focus:ring-pink-500"
                  />
                  <div>
                    <span className="font-semibold text-foreground block">Weekly PTA Newsletter</span>
                    <span className="text-[11px] text-muted-foreground">Community &amp; sports digest</span>
                  </div>
                </label>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Delivery Preferences
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
