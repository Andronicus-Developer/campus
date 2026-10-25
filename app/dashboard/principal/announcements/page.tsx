"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Bell, CheckCircle2, Megaphone, Send, Users, AlertTriangle } from "lucide-react";

export default function PrincipalAnnouncementsPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [target, setTarget] = useState("all");
  const [priority, setPriority] = useState("normal");
  const [sent, setSent] = useState(false);

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
      setTitle("");
      setContent("");
      setSent(false);
    }, 2000);
  };

  return (
    <DashboardLayout currentRole="principal">
      <div className="space-y-6">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                  Institutional Broadcast Desk
                </span>
                <span className="font-mono text-xs text-ink-muted">SMS &amp; In-App Push Engine</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">School Bulletins &amp; Emergency Broadcasts</h2>
              <p className="text-xs text-ink-muted">
                Compose, schedule, and dispatch institution-wide notices to parents, students, and faculty.
              </p>
            </div>
          </div>
        </div>

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
                    <option value="all">Entire Institution (Parents, Staff &amp; Students)</option>
                    <option value="parents">Parents &amp; Guardians Only</option>
                    <option value="faculty">Academic Faculty &amp; Staff Only</option>
                    <option value="students">Senior Students Only</option>
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
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ink py-2.5 text-xs font-bold text-white hover:bg-ink-soft active:scale-95"
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
      </div>
    </DashboardLayout>
  );
}
