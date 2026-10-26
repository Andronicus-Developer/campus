"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  HelpCircle,
  Landmark,
  Mail,
  Megaphone,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";

interface EscalatedComplaint {
  id: string;
  parentName: string;
  studentName: string;
  classArm: string;
  phone: string;
  issueType: "academic" | "financial_dispute" | "portal_access" | "transport";
  subject: string;
  details: string;
  receivedDate: string;
  status: "pending" | "resolved" | "delegated_bursar" | "delegated_admin";
}

const INITIAL_COMPLAINTS: EscalatedComplaint[] = [
  {
    id: "comp-1",
    parentName: "Mrs. Folake Adeleke",
    studentName: "Tobi Adeleke",
    classArm: "SSS 2 Science A",
    phone: "+234 803 111 2233",
    issueType: "financial_dispute",
    subject: "Scholarship Waiver Concession Not Reflected in Term Invoice",
    details: "Parent submitted Olympiad 25% waiver letter, but Paystack checkout still displays full US$ 1,900.00 tuition.",
    receivedDate: "Today, 08:45 AM",
    status: "pending",
  },
  {
    id: "comp-2",
    parentName: "Dr. K. Okafor",
    studentName: "Chidera Okafor",
    classArm: "SSS 3 Science A",
    phone: "+234 802 334 5566",
    issueType: "academic",
    subject: "Inquiry on WAEC Chemistry Practical Laboratory Pacing",
    details: "Parent requests confirmation of mock lab timetable to align home revision schedule.",
    receivedDate: "Yesterday, 03:20 PM",
    status: "resolved",
  },
  {
    id: "comp-3",
    parentName: "Alhaji Danjuma",
    studentName: "Fatima Danjuma",
    classArm: "JSS 3 Arts B",
    phone: "+234 809 443 2211",
    issueType: "portal_access",
    subject: "Father unable to access Parent Portal on Android device",
    details: "Password reset link returned error; requires guardian credential re-sync.",
    receivedDate: "Feb 17, 2026",
    status: "pending",
  },
];

export default function PrincipalAnnouncementsPage() {
  const [activeTab, setActiveTab] = useState<"broadcast" | "complaints" | "ptm">("broadcast");
  const [complaints, setComplaints] = useState<EscalatedComplaint[]>(INITIAL_COMPLAINTS);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [target, setTarget] = useState("all");
  const [priority, setPriority] = useState("normal");
  const [sent, setSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const [bulletins, setBulletins] = useState([
    {
      id: "b-1",
      title: "PTA General Assembly & Term 2 Academic Open Day",
      target: "All Parents & Guardians",
      priority: "normal",
      date: "Feb 18, 2026",
      reach: "842 delivered (99.1%)",
      snippet: "School Open Day scheduled for this Saturday. Parents are cordially invited to review terminal broadsheets.",
    },
    {
      id: "b-2",
      title: "Urgent Notice: SSS 3 Mock Examination Timetable Adjustment",
      target: "Senior Secondary Faculty & Students",
      priority: "urgent",
      date: "Feb 14, 2026",
      reach: "186 delivered (100%)",
      snippet: "Biology Paper 2 practical rescheduled from Tuesday morning to Wednesday Period 3.",
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    setSent(true);
    setBulletins((prev) => [
      {
        id: `b-${Date.now()}`,
        title,
        target: target === "all" ? "All School" : target === "parents" ? "Parents & Guardians" : "Staff & Faculty",
        priority,
        date: "Just now",
        reach: "Dispatched to SMS & App Gateway",
        snippet: content,
      },
      ...prev,
    ]);
    setTimeout(() => {
      showToast("School bulletin dispatched via SMS and Parent Portal!");
      setTitle("");
      setContent("");
      setSent(false);
    }, 1500);
  };

  const handleDelegateBursar = (id: string, name: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "delegated_bursar" } : c))
    );
    showToast(`Escalated billing inquiry for ${name} routed to Bursar Mrs. Angela Nnamdi.`);
  };

  const handleDelegateAdmin = (id: string, name: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "delegated_admin" } : c))
    );
    showToast(`Portal account issue for ${name} escalated to School Admin Engr. Patrick Bassey.`);
  };

  const handleResolve = (id: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "resolved" } : c))
    );
    showToast("Complaint marked as resolved and logged.");
  };

  return (
    <DashboardLayout currentRole="principal">
      <div className="space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950 px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in slide-in-from-top-3">
            <CheckCircle2 className="size-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                  Section I · Parent &amp; Guardian Engagement
                </span>
                <span className="font-mono text-xs text-ink-muted">Community &amp; Stakeholder Relations</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">School Broadcasts &amp; Parent Escalation Desk</h2>
              <p className="text-xs text-ink-muted max-w-3xl">
                Dispatch institution-wide announcements and emergency bulletins, coordinate Parent-Teacher Meetings (PTM), manage escalated parental feedback, and route operational complaints to the Bursar or Admin.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Total Guardians Reached</span>
                <span className="text-lg font-black text-primary">842 Registered Parents</span>
              </div>
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Pending Complaints</span>
                <span className="text-lg font-black text-amber-600">
                  {complaints.filter((c) => c.status === "pending").length} Tickets
                </span>
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("broadcast")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "broadcast"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Broadcast Composer &amp; Bulletins
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("complaints")}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "complaints"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                <MessageSquare className="size-3.5 text-amber-600" />
                <span>Escalated Parent Tickets ({complaints.filter((c) => c.status === "pending").length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("ptm")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "ptm"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                PTM &amp; Academic Open Day
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs text-ink-muted">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span>Multi-channel delivery: SMS gateway + Parent Mobile App push</span>
            </div>
          </div>
        </div>

        {/* TAB 1: BROADCAST COMPOSER & HISTORY */}
        {activeTab === "broadcast" && (
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column: Broadcast Composer (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
                <div className="border-b border-line pb-4 flex items-center gap-2">
                  <Megaphone className="size-4.5 text-primary" />
                  <h3 className="text-base font-extrabold text-ink">Compose New Bulletin</h3>
                </div>

                {sent && (
                  <div className="mt-4 rounded-xl border border-success/30 bg-success-light p-3 text-xs text-success-deep font-semibold flex items-center gap-2">
                    <CheckCircle2 className="size-4" />
                    <span>Broadcast successfully dispatched to registered contacts!</span>
                  </div>
                )}

                <form onSubmit={handleSend} className="mt-4 space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-ink-muted mb-1">Target Audience</label>
                    <select
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-xs text-ink font-semibold focus:border-primary focus:outline-none"
                    >
                      <option value="all">Entire Institution (842 Parents &amp; 64 Staff)</option>
                      <option value="parents">Parents &amp; Guardians Only (842 Recipients)</option>
                      <option value="faculty">Academic Faculty &amp; Staff Only (48 Teachers)</option>
                      <option value="students">Senior Students Only (SSS 1 - 3)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-ink-muted mb-1">Priority Tier</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-xs text-ink font-semibold focus:border-primary focus:outline-none"
                    >
                      <option value="normal">Normal Bulletin (App Notification)</option>
                      <option value="urgent">Urgent Priority (App Notification + SMS)</option>
                      <option value="emergency">Emergency Alert (Instant High-Priority SMS Broadcast)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-ink-muted mb-1">Bulletin Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Resumption of Second Half of Term 2..."
                      required
                      className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-xs text-ink font-medium focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-ink-muted mb-1">Message Body</label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Provide full bulletin details..."
                      rows={4}
                      required
                      className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-xs text-ink font-medium focus:border-primary focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ink py-2.5 text-xs font-bold text-white hover:bg-ink-soft active:scale-95 transition-all"
                  >
                    <Send className="size-3.5" />
                    <span>Dispatch Broadcast Message</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Broadcast History (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
                <div className="border-b border-line pb-4 flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-ink">Recent Broadcast Archive</h3>
                  <span className="font-mono text-xs text-ink-muted">{bulletins.length} Dispatched</span>
                </div>

                <div className="mt-4 space-y-3">
                  {bulletins.map((b) => (
                    <div key={b.id} className="rounded-2xl border border-line bg-surface-raised p-4 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-ink text-sm">{b.title}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                            b.priority === "urgent" ? "bg-amber-100 text-amber-800" : "bg-primary-light text-primary"
                          }`}
                        >
                          {b.priority}
                        </span>
                      </div>
                      <p className="text-ink-soft">{b.snippet}</p>
                      <div className="mt-2 flex items-center justify-between pt-2 border-t border-line font-mono text-[11px] text-ink-muted">
                        <span>Audience: {b.target}</span>
                        <span>{b.date} · {b.reach}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ESCALATED PARENT COMPLAINTS */}
        {activeTab === "complaints" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Escalated Parent Inquiries &amp; Complaints</h3>
                <p className="text-xs text-ink-muted">
                  Review serious parental feedback. Re-route financial disputes directly to the Bursar and login credential issues to the School Admin.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-primary">
                {complaints.filter((c) => c.status === "pending").length} Actionable Tickets
              </span>
            </div>

            <div className="space-y-3">
              {complaints.map((c) => (
                <div key={c.id} className="rounded-2xl border border-line bg-surface-raised p-4 space-y-3 text-xs">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                            c.issueType === "financial_dispute"
                              ? "bg-amber-100 text-amber-800"
                              : c.issueType === "portal_access"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {c.issueType.replace("_", " ")}
                        </span>
                        <span className="font-mono text-xs text-ink-muted">{c.receivedDate}</span>
                      </div>
                      <h4 className="text-sm font-bold text-ink">{c.subject}</h4>
                      <p className="text-ink-soft">{c.details}</p>
                      <div className="pt-1 flex items-center gap-3 text-ink-muted font-mono text-[11px]">
                        <span>Guardian: <strong>{c.parentName}</strong></span>
                        <span>Student: <strong>{c.studentName} ({c.classArm})</strong></span>
                        <span>Phone: <strong>{c.phone}</strong></span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right space-y-1.5">
                      {c.status === "resolved" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success-light px-3 py-1 font-mono text-xs font-bold text-success-deep">
                          <CheckCircle2 className="size-3.5" />
                          Resolved
                        </span>
                      ) : c.status === "delegated_bursar" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 font-mono text-xs font-bold text-amber-800 border border-amber-200">
                          <Landmark className="size-3.5" />
                          Routed to Bursar Desk
                        </span>
                      ) : c.status === "delegated_admin" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 font-mono text-xs font-bold text-purple-800 border border-purple-200">
                          <ShieldCheck className="size-3.5" />
                          Routed to School Admin
                        </span>
                      ) : (
                        <div className="flex flex-wrap items-center gap-2">
                          {c.issueType === "financial_dispute" && (
                            <button
                              type="button"
                              onClick={() => handleDelegateBursar(c.id, c.parentName)}
                              className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-1.5 font-mono text-xs font-bold text-amber-900 hover:bg-amber-100"
                            >
                              Route to Bursar
                            </button>
                          )}
                          {c.issueType === "portal_access" && (
                            <button
                              type="button"
                              onClick={() => handleDelegateAdmin(c.id, c.parentName)}
                              className="rounded-xl border border-purple-300 bg-purple-50 px-3 py-1.5 font-mono text-xs font-bold text-purple-900 hover:bg-purple-100"
                            >
                              Route to Admin
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleResolve(c.id)}
                            className="rounded-xl bg-ink px-3 py-1.5 font-mono text-xs font-bold text-white hover:bg-ink-soft"
                          >
                            Mark Resolved
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PTM & ACADEMIC OPEN DAY */}
        {activeTab === "ptm" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-ink">Parent-Teacher Meeting (PTM) &amp; Open Day</h3>
                <p className="text-xs text-ink-muted">Terminal academic consultative conference schedules.</p>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600">Saturday, Feb 28, 2026</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-1 text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-primary">Senior Secondary Block</span>
                <h4 className="text-sm font-bold text-ink">Auditorium &amp; Labs</h4>
                <p className="text-ink-muted">10:00 AM - 01:00 PM</p>
                <span className="block text-[11px] text-emerald-700 font-semibold mt-1">Lead: Dr. Kenneth Obi</span>
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-1 text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-emerald-600">Junior Secondary Block</span>
                <h4 className="text-sm font-bold text-ink">Multi-Purpose Center</h4>
                <p className="text-ink-muted">01:30 PM - 04:30 PM</p>
                <span className="block text-[11px] text-emerald-700 font-semibold mt-1">Lead: Ms. Chioma Okon</span>
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-1 text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-amber-600">Bursary Helpdesk</span>
                <h4 className="text-sm font-bold text-ink">Admin Reception</h4>
                <p className="text-ink-muted">All Day Support</p>
                <span className="block text-[11px] text-amber-800 font-semibold mt-1">Lead: Mrs. Angela Nnamdi</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
