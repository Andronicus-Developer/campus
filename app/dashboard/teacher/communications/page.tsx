"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  MessageSquareText,
  Send,
  Calendar,
  CheckCircle2,
  Users,
  Clock,
  Search,
  Plus,
  ShieldCheck,
  FileText,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

interface ClassMessage {
  id: string;
  senderName: string;
  senderRole: "Parent" | "Student" | "Staff";
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  studentName?: string;
}

const INITIAL_MESSAGES: ClassMessage[] = [
  {
    id: "msg-1",
    senderName: "Mrs. Zainab Adeleke",
    senderRole: "Parent",
    subject: "Clarification on Further Mathematics Term 2 Project Guidelines",
    preview: "Good afternoon Mr. Alabi, Tobi mentioned the robotics simulation project requires special software. Could you kindly confirm if Python or MATLAB is preferred?",
    timestamp: "Today, 11:20 AM",
    isRead: false,
    studentName: "Tobi Adeleke (SSS 2A)",
  },
  {
    id: "msg-2",
    senderName: "Dr. Evelyn Peters (Principal)",
    senderRole: "Staff",
    subject: "Broadsheet CA2 Verification & Academic Committee Meeting",
    preview: "Dear Mr. Alabi, please ensure SSS 2 Further Math broadsheets are finalized prior to Friday 4 PM for the CA review panel.",
    timestamp: "Yesterday, 03:45 PM",
    isRead: true,
  },
  {
    id: "msg-3",
    senderName: "Chief Emeka Obi",
    senderRole: "Parent",
    subject: "Somtochukwu's Extra Coaching & Clinic Attendance",
    preview: "Thank you for scheduling the math remedial clinic for Somtochukwu. We will ensure he stays back after school today.",
    timestamp: "Oct 23, 09:10 AM",
    isRead: true,
    studentName: "Somtochukwu Obi (SSS 2A)",
  },
];

export default function TeacherCommunicationsPage() {
  const [messages, setMessages] = useState<ClassMessage[]>(INITIAL_MESSAGES);
  const [selectedMessage, setSelectedMessage] = useState<ClassMessage | null>(INITIAL_MESSAGES[0]);
  const [replyText, setReplyText] = useState("");
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [broadcastForm, setBroadcastForm] = useState({
    title: "",
    targetAudience: "SSS 2A Parents & Students",
    content: "",
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    showToast(`Reply sent through secure school portal channel to ${selectedMessage?.senderName}.`);
    setReplyText("");
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastModalOpen(false);
    showToast(`Class announcement "${broadcastForm.title}" sent to ${broadcastForm.targetAudience}.`);
    setBroadcastForm({
      title: "",
      targetAudience: "SSS 2A Parents & Students",
      content: "",
    });
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
                  Secure Faculty Communications
                </span>
                <span className="font-mono text-xs text-ink-muted">Mr. David Alabi · Form Master SSS 2A</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Class Messages &amp; Parent Collaboration</h2>
              <p className="text-xs text-ink-muted">
                Approved communication channels for student academic inquiries, parent advisories, and scheduling parent-teacher conferences.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setMeetingModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-raised px-4 py-2 text-xs font-bold text-ink hover:border-violet-600 hover:text-violet-700 active:scale-95 transition-all shadow-sm"
              >
                <Calendar className="size-4 text-violet-600" />
                <span>Schedule Parent Meeting</span>
              </button>

              <button
                type="button"
                onClick={() => setBroadcastModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-violet-700 active:scale-95 transition-all"
              >
                <Send className="size-4" />
                <span>+ Send Class Announcement</span>
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

        {/* SECTION 1: INBOX & MESSAGING CONVERSATION SPLIT VIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Messages List */}
          <div className="lg:col-span-5 rounded-3xl border border-line bg-surface p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-extrabold text-sm text-ink">Academic Inquiries Inbox</h3>
              <span className="font-mono text-xs text-violet-700 font-bold bg-violet-50 px-2 py-0.5 rounded">
                1 Unread
              </span>
            </div>

            <div className="space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all text-xs ${
                    msg.id === selectedMessage?.id
                      ? "border-violet-600 bg-violet-500/10 shadow-sm"
                      : "border-line bg-surface-raised/70 hover:border-line-strong"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink">{msg.senderName}</span>
                    <span className="font-mono text-[10px] text-ink-muted">{msg.timestamp}</span>
                  </div>
                  {msg.studentName && (
                    <span className="font-mono text-[10px] text-primary block mt-0.5">
                      Ward: {msg.studentName}
                    </span>
                  )}
                  <h4 className="font-semibold text-ink text-xs mt-1 line-clamp-1">{msg.subject}</h4>
                  <p className="text-[11px] text-ink-muted line-clamp-2 mt-1">{msg.preview}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Conversation & Reply Pane */}
          <div className="lg:col-span-7 rounded-3xl border border-line bg-surface p-6 shadow-sm flex flex-col justify-between space-y-4">
            {selectedMessage ? (
              <>
                <div className="space-y-3 border-b border-line pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-base text-ink">{selectedMessage.subject}</h3>
                    <span className="font-mono text-[10px] bg-primary-light text-primary px-2 py-0.5 rounded font-bold">
                      {selectedMessage.senderRole}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-ink-muted">
                    <span>
                      From: <strong className="text-ink">{selectedMessage.senderName}</strong>
                      {selectedMessage.studentName && ` · (${selectedMessage.studentName})`}
                    </span>
                    <span className="font-mono text-[11px]">{selectedMessage.timestamp}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-raised border border-line text-xs text-ink leading-relaxed">
                    {selectedMessage.preview}
                  </div>
                </div>

                {/* Reply composer */}
                <div className="space-y-2 pt-2">
                  <label className="block font-semibold text-xs text-ink-muted">
                    Send Direct Portal Reply to {selectedMessage.senderName}:
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Type professional academic reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full rounded-2xl border border-line bg-surface-raised p-3 text-xs text-ink focus:border-violet-600 focus:outline-none resize-none"
                  />
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-ink-muted">
                      Official communication records are retained in compliance with student safeguarding policy.
                    </span>
                    <button
                      type="button"
                      onClick={handleSendReply}
                      className="rounded-xl bg-violet-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-violet-700"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center text-ink-muted text-xs">
                Select an inquiry from the inbox to read and respond.
              </div>
            )}
          </div>
        </div>

        {/* MODAL: BROADCAST CLASS ANNOUNCEMENT */}
        {broadcastModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2 text-ink">
                  <Send className="size-5 text-violet-600" />
                  <h3 className="text-base font-extrabold">Send Class Announcement</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setBroadcastModalOpen(false)}
                  className="text-ink-muted hover:text-ink"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSendBroadcast} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Subject / Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SSS 2A Further Math Homework Submission Reminder"
                    value={broadcastForm.title}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Target Audience</label>
                  <select
                    value={broadcastForm.targetAudience}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, targetAudience: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  >
                    <option value="SSS 2A Parents & Students">SSS 2A Parents &amp; Students (34 students)</option>
                    <option value="SSS 1 Science Class">SSS 1 Science Class</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Message Content</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type the class notice or homework guideline..."
                    value={broadcastForm.content}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, content: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setBroadcastModalOpen(false)}
                    className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-violet-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-violet-700"
                  >
                    Send Notice Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: SCHEDULE PARENT MEETING */}
        {meetingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2 text-ink">
                  <Calendar className="size-5 text-violet-600" />
                  <h3 className="text-base font-extrabold">Schedule Parent-Teacher Conference</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMeetingModalOpen(false)}
                  className="text-ink-muted hover:text-ink"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Select Guardian</label>
                  <select className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink">
                    <option value="Adeleke">Mrs. Zainab Adeleke (Tobi Adeleke)</option>
                    <option value="Obi">Chief Emeka Obi (Somtochukwu Obi)</option>
                    <option value="Balogun">Chief T. Balogun (Farouk Balogun)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-ink-muted mb-1">Proposed Date</label>
                    <input
                      type="date"
                      className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-ink-muted mb-1">Proposed Time</label>
                    <input
                      type="time"
                      defaultValue="14:00"
                      className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Meeting Agenda</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Mid-term academic progress and remedial tutoring plan..."
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => setMeetingModalOpen(false)}
                  className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMeetingModalOpen(false);
                    showToast("Meeting invite sent to guardian calendar and WhatsApp.");
                  }}
                  className="rounded-xl bg-violet-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-violet-700"
                >
                  Send Meeting Invite
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
