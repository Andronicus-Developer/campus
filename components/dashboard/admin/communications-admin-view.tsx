"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Megaphone,
  Mail,
  MessageSquare,
  Smartphone,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ShieldAlert,
  Users,
  FileText,
  HelpCircle,
  ExternalLink,
  RotateCcw,
  Check,
} from "lucide-react";

interface AnnouncementRecord {
  id: string;
  title: string;
  channel: "sms" | "whatsapp" | "email" | "all";
  audience: string;
  recipientsCount: number;
  deliveryRate: number;
  sentAt: string;
  status: "delivered" | "sending" | "failed";
}

interface InboundTicket {
  id: string;
  ticketNo: string;
  parentName: string;
  studentName: string;
  studentClass: string;
  subject: string;
  assignedTo: string;
  priority: "High" | "Medium" | "Urgent";
  status: "open" | "routed" | "resolved";
  receivedAt: string;
}

const INITIAL_ANNOUNCEMENTS: AnnouncementRecord[] = [
  {
    id: "ann-1",
    title: "Mid-Term Academic Progress Review & Open Day",
    channel: "all",
    audience: "All Parents & Guardians (842 Students)",
    recipientsCount: 615,
    deliveryRate: 98.4,
    sentAt: "Today, 09:30 AM",
    status: "delivered",
  },
  {
    id: "ann-2",
    title: "Term 2 Tuition Settlement Reminder — Due Nov 5",
    channel: "sms",
    audience: "Owing Guardians (142 recipients)",
    recipientsCount: 142,
    deliveryRate: 99.1,
    sentAt: "Yesterday, 02:15 PM",
    status: "delivered",
  },
  {
    id: "ann-3",
    title: "SSS 3 Science Mock Examination Timetable Dispatch",
    channel: "email",
    audience: "Senior Secondary 3 Guardians",
    recipientsCount: 94,
    deliveryRate: 96.8,
    sentAt: "Oct 23, 11:00 AM",
    status: "delivered",
  },
];

const INITIAL_TICKETS: InboundTicket[] = [
  {
    id: "t-1",
    ticketNo: "INQ-2026-104",
    parentName: "Mrs. Zainab Adeleke",
    studentName: "Tobi Adeleke (SSS 2A)",
    studentClass: "SSS 2A Science",
    subject: "Requesting duplicate term payment receipt for company tax clearance",
    assignedTo: "Bursary Division (Mrs. Angela Nnamdi)",
    priority: "Medium",
    status: "routed",
    receivedAt: "Today, 08:45 AM",
  },
  {
    id: "t-2",
    ticketNo: "INQ-2026-105",
    parentName: "Dr. Mrs. Ifeoma Okafor",
    studentName: "Chidera Okafor (SSS 1)",
    studentClass: "SSS 1 Science",
    subject: "Inquiry regarding boarding hostel room change request to Mandela Hall",
    assignedTo: "Principal (Dr. Evelyn Peters)",
    priority: "High",
    status: "open",
    receivedAt: "Today, 10:12 AM",
  },
  {
    id: "t-3",
    ticketNo: "INQ-2026-106",
    parentName: "Chief Emeka Obi",
    studentName: "Somtochukwu Obi (JSS 2)",
    studentClass: "JSS 2 Diamond",
    subject: "Portal login password reset requested for father's phone number",
    assignedTo: "School Administrator (Engr. Patrick Bassey)",
    priority: "Urgent",
    status: "resolved",
    receivedAt: "Yesterday, 03:20 PM",
  },
];

export function CommunicationsAdminView() {
  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>(INITIAL_ANNOUNCEMENTS);
  const [tickets, setTickets] = useState<InboundTicket[]>(INITIAL_TICKETS);
  const [composeModalOpen, setComposeModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [composeForm, setComposeForm] = useState({
    title: "",
    body: "",
    audience: "all_parents",
    channel: "all",
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: AnnouncementRecord = {
      id: `ann-${Date.now()}`,
      title: composeForm.title,
      channel: composeForm.channel as any,
      audience:
        composeForm.audience === "all_parents"
          ? "All Parents & Guardians (842 Students)"
          : composeForm.audience === "sss"
          ? "Senior Secondary Guardians (SSS 1–3)"
          : "Junior Secondary Guardians (JSS 1–3)",
      recipientsCount: 615,
      deliveryRate: 100,
      sentAt: "Just Now",
      status: "delivered",
    };
    setAnnouncements([newRecord, ...announcements]);
    setComposeModalOpen(false);
    showToast(`Broadcast "${composeForm.title}" dispatched via ${composeForm.channel.toUpperCase()}!`);
    setComposeForm({
      title: "",
      body: "",
      audience: "all_parents",
      channel: "all",
    });
  };

  const handleRouteTicket = (ticketId: string, target: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, assignedTo: target, status: "routed" } : t))
    );
    showToast(`Inquiry routed to ${target} with instant notification.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                School Communications &amp; Parent Relations
              </span>
              <span className="text-xs text-ink-muted">SMS · WhatsApp · Push Notifications · Email</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-ink">Parent Communication &amp; Notice Broadcasting Hub</h2>
            <p className="text-xs text-ink-muted">
              Publish approved school-wide notices, dispatch targeted SMS and WhatsApp circulars, monitor delivery logs, and route guardian inquiries to the Principal or Bursar.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setComposeModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all"
            >
              <Megaphone className="size-4" />
              <span>+ Compose Broadcast</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-line">
          <div className="p-3.5 rounded-2xl bg-surface-raised border border-line-soft">
            <span className="text-[11px] text-ink-muted block font-medium">Registered Guardians</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-ink">615</span>
              <span className="text-[10px] text-emerald-600 font-bold font-mono">100% phone mapped</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[11px] text-emerald-700 block font-medium">Average Delivery Rate</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-emerald-700">98.6%</span>
              <span className="text-[10px] text-emerald-600 font-bold font-mono">SMS &amp; WhatsApp</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <span className="text-[11px] text-amber-700 block font-medium">Open Parent Tickets</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-amber-700">
                {tickets.filter((t) => t.status === "open").length}
              </span>
              <span className="text-[10px] text-amber-600 font-bold font-mono">Awaiting routing</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-primary-light/40 border border-primary/20">
            <span className="text-[11px] text-primary block font-medium">Broadcasts This Term</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-primary">18</span>
              <span className="text-[10px] text-ink-muted font-mono">Notices published</span>
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

      {/* SECTION 1: COMMUNICATION TEMPLATES */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-ink">Ready-to-Send Announcement Templates</h3>
            <p className="text-xs text-ink-muted">Click to instantly populate and review standard school administrative messages.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => {
              setComposeForm({
                title: "Mid-Term Break Notice & Resumption Date",
                body: "Dear Parent/Guardian, Riverside International College will observe its Term 2 Mid-Term Break from Thursday, Nov 12 to Monday, Nov 16. Academic classes resume Tuesday, Nov 17 at 07:45 AM. Thank you.",
                audience: "all_parents",
                channel: "all",
              });
              setComposeModalOpen(true);
            }}
            className="p-3.5 rounded-2xl border border-line bg-surface-raised/70 text-left hover:border-blue-500 transition-all group"
          >
            <span className="font-bold text-xs text-ink group-hover:text-blue-600 block">
              Mid-Term Break Announcement
            </span>
            <span className="text-[11px] text-ink-muted mt-1 block line-clamp-2">
              Formal notice detailing school closure and resumption protocol.
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setComposeForm({
                title: "Urgent: School Fees Settlement Notice",
                body: "Dear Parent/Guardian, this is a reminder that the deadline for Term 2 tuition settlement is Friday, Nov 5. Kindly settle via the portal Paystack link or school account to avoid disruptions.",
                audience: "all_parents",
                channel: "sms",
              });
              setComposeModalOpen(true);
            }}
            className="p-3.5 rounded-2xl border border-line bg-surface-raised/70 text-left hover:border-amber-500 transition-all group"
          >
            <span className="font-bold text-xs text-ink group-hover:text-amber-600 block">
              Tuition Settlement Reminder
            </span>
            <span className="text-[11px] text-ink-muted mt-1 block line-clamp-2">
              Automated polite reminder for owing parents with payment link.
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setComposeForm({
                title: "Emergency Weather / Road Advisory",
                body: "Dear Parents, due to severe localized flooding on the Lekki-Epe expressway, bus routes will commence 30 minutes earlier and after-school clubs are postponed. Student safety remains priority.",
                audience: "all_parents",
                channel: "whatsapp",
              });
              setComposeModalOpen(true);
            }}
            className="p-3.5 rounded-2xl border border-line bg-surface-raised/70 text-left hover:border-rose-500 transition-all group"
          >
            <span className="font-bold text-xs text-ink group-hover:text-rose-600 block">
              Emergency Weather / Road Advisory
            </span>
            <span className="text-[11px] text-ink-muted mt-1 block line-clamp-2">
              High-priority instant alert for unforeseen route or weather changes.
            </span>
          </button>
        </div>
      </div>

      {/* SECTION 2: BROADCAST DELIVERY LOG */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-ink">Recent Broadcast Delivery Log</h3>
        <div className="space-y-3">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-line bg-surface-raised/60 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink text-sm">{item.title}</span>
                  <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-primary-light text-primary">
                    {item.channel}
                  </span>
                </div>
                <p className="text-xs text-ink-muted">
                  Audience: <strong className="text-ink-soft">{item.audience}</strong> · Dispatched {item.sentAt}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="block font-mono text-xs font-bold text-emerald-700">
                    {item.deliveryRate}% Delivered
                  </span>
                  <span className="block font-mono text-[10px] text-ink-muted">
                    {item.recipientsCount} Guardians
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => showToast(`Full delivery logs for "${item.title}" exported.`)}
                  className="rounded-xl border border-line bg-surface px-3 py-1.5 font-mono text-xs text-ink hover:border-blue-600"
                >
                  Inspect Log
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: INBOUND GUARDIAN INQUIRIES & COMPLAINT ROUTING */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-ink">Inbound Guardian Inquiries &amp; Complaint Routing</h3>
            <p className="text-xs text-ink-muted">
              Direct administrative routing of parent requests to Principal, Bursar, or Academic Form Masters.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {tickets.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-2xl border border-line bg-surface-raised/70 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-primary px-1.5 py-0.5 rounded bg-primary-light">
                    {t.ticketNo}
                  </span>
                  <span className="font-bold text-ink text-xs">{t.parentName}</span>
                  <span className="text-[11px] text-ink-muted">({t.studentName})</span>
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                      t.priority === "Urgent"
                        ? "bg-rose-100 text-rose-700"
                        : t.priority === "High"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {t.priority}
                  </span>
                </div>
                <p className="text-xs text-ink font-medium">{t.subject}</p>
                <p className="text-[11px] text-ink-muted">
                  Assigned to: <strong className="text-ink-soft">{t.assignedTo}</strong> · Received {t.receivedAt}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {t.status === "open" ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRouteTicket(t.id, "Principal (Dr. Evelyn Peters)")}
                      className="rounded-xl border border-blue-500/30 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 hover:bg-blue-100"
                    >
                      Route to Principal
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRouteTicket(t.id, "Bursary Division (Mrs. Angela Nnamdi)")}
                      className="rounded-xl border border-amber-500/30 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 hover:bg-amber-100"
                    >
                      Route to Bursar
                    </button>
                  </div>
                ) : (
                  <span
                    className={`font-mono text-xs font-bold px-3 py-1 rounded-full ${
                      t.status === "resolved" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {t.status.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: COMPOSE BROADCAST */}
      {composeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2 text-ink">
                <Megaphone className="size-5 text-blue-600" />
                <h3 className="text-base font-extrabold">Compose Announcement Broadcast</h3>
              </div>
              <button
                type="button"
                onClick={() => setComposeModalOpen(false)}
                className="text-ink-muted hover:text-ink"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-ink-muted mb-1">Notice Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. End of Term Resumption Dates & Guidelines"
                  value={composeForm.title}
                  onChange={(e) => setComposeForm({ ...composeForm, title: e.target.value })}
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Target Audience</label>
                  <select
                    value={composeForm.audience}
                    onChange={(e) => setComposeForm({ ...composeForm, audience: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  >
                    <option value="all_parents">All Parents (842 students)</option>
                    <option value="sss">Senior Secondary Guardians</option>
                    <option value="jss">Junior Secondary Guardians</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Dispatch Channel</label>
                  <select
                    value={composeForm.channel}
                    onChange={(e) => setComposeForm({ ...composeForm, channel: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  >
                    <option value="all">Omnichannel (SMS + WhatsApp + Email)</option>
                    <option value="sms">SMS Only</option>
                    <option value="whatsapp">WhatsApp Direct</option>
                    <option value="email">Email Bulletin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-ink-muted mb-1">Announcement Body</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type the message contents..."
                  value={composeForm.body}
                  onChange={(e) => setComposeForm({ ...composeForm, body: e.target.value })}
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => setComposeModalOpen(false)}
                  className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-blue-700"
                >
                  Send Announcement Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
