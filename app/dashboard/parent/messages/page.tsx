"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  MessageSquareText,
  Send,
  Search,
  CheckCheck,
  User,
  Paperclip,
  Smile,
  ShieldCheck,
  PhoneCall,
  Clock,
  HeartHandshake,
  Building2,
  Calendar,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { CHILDREN_PROFILES, FAMILY_DATA } from "@/lib/family-data";

interface ContactChannel {
  id: string;
  name: string;
  roleTitle: string;
  department: string;
  avatar: string;
  category: "Teacher" | "Bursar" | "Admin" | "Principal";
  lastMessage: string;
  time: string;
  unreadCount?: number;
}

interface MessageBubble {
  id: string;
  sender: "parent" | "staff";
  text: string;
  time: string;
}

export default function ParentMessagesPage() {
  const [selectedContactId, setSelectedContactId] = useState<string>("contact-1");
  const [inputText, setInputText] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const contacts: ContactChannel[] = [
    {
      id: "contact-1",
      name: "Mr. David Alabi",
      roleTitle: "Form Master & Further Mathematics",
      department: "Senior Secondary (Tobi's Tutor)",
      avatar: "DA",
      category: "Teacher",
      lastMessage: "Tobi scored 94% on the calculus mock simulation. Keep up the high standard!",
      time: "10:30 AM",
      unreadCount: 1,
    },
    {
      id: "contact-2",
      name: "Ms. Chioma Okon",
      roleTitle: "Form Master & English Studies",
      department: "Junior Secondary (Maryam's Tutor)",
      avatar: "CO",
      category: "Teacher",
      lastMessage: "Maryam submitted her reading journal on African folktales. Very articulate reflection.",
      time: "Yesterday",
    },
    {
      id: "contact-3",
      name: "J. Mensah (Bursary Division)",
      roleTitle: "Bursar & Head of Financial Accounts",
      department: "Bursary & Treasury",
      avatar: "JM",
      category: "Bursar",
      lastMessage: "Your sibling 10% discount on Maryam's ledger has been forwarded for credit note approval.",
      time: "Jan 24",
    },
    {
      id: "contact-4",
      name: "Engr. Patrick Bassey",
      roleTitle: "Director of Registry & Operations",
      department: "School Administration",
      avatar: "PB",
      category: "Admin",
      lastMessage: "Address update verified against the uploaded utility slip in your family file.",
      time: "Jan 22",
    },
    {
      id: "contact-5",
      name: "Dr. Harrison Peters",
      roleTitle: "School Principal & Executive Head",
      department: "Executive Directorate",
      avatar: "HP",
      category: "Principal",
      lastMessage: "Thank you for attending the PTA Executive Committee planning meeting, Mrs. Adeleke.",
      time: "Jan 18",
    },
  ];

  const [chatThreads, setChatThreads] = useState<Record<string, MessageBubble[]>>({
    "contact-1": [
      { id: "m-1", sender: "parent", text: "Good morning Mr. Alabi, please how is Tobi coping with the advanced calculus curriculum?", time: "09:15 AM" },
      { id: "m-2", sender: "staff", text: "Good morning Mrs. Adeleke! Tobi is performing exceptionally well. He scored 94% on the calculus mock simulation. Keep up the high standard!", time: "10:30 AM" },
    ],
    "contact-2": [
      { id: "m-3", sender: "parent", text: "Hello Ms. Okon, just checking if Maryam submitted her reading journal on time yesterday.", time: "Yesterday, 02:10 PM" },
      { id: "m-4", sender: "staff", text: "Maryam submitted her reading journal on African folktales. Very articulate reflection.", time: "Yesterday, 03:45 PM" },
    ],
    "contact-3": [
      { id: "m-5", sender: "staff", text: "Your sibling 10% discount on Maryam's ledger has been forwarded for credit note approval.", time: "Jan 24, 11:20 AM" },
    ],
    "contact-4": [
      { id: "m-6", sender: "staff", text: "Address update verified against the uploaded utility slip in your family file.", time: "Jan 22, 04:00 PM" },
    ],
    "contact-5": [
      { id: "m-7", sender: "staff", text: "Thank you for attending the PTA Executive Committee planning meeting, Mrs. Adeleke.", time: "Jan 18, 05:30 PM" },
    ],
  });

  const activeContact = contacts.find((c) => c.id === selectedContactId) || contacts[0];
  const currentMessages = chatThreads[selectedContactId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: MessageBubble = {
      id: `m-${Date.now()}`,
      sender: "parent",
      text: inputText,
      time: "Just now",
    };

    setChatThreads((prev) => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMsg],
    }));

    setInputText("");

    setTimeout(() => {
      setToast(`Message delivered to ${activeContact.name}. Staff will reply via portal messages.`);
    }, 400);
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <MessageSquareText className="w-4 h-4" />
              Direct Communication Desk · Section G
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Teacher &amp; Administration Messaging
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Secure messaging with Form Tutors, Subject Teachers, the School Admin, Bursar, and Principal.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-card border border-border px-3.5 py-2 rounded-xl shadow-xs">
            <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>End-to-End Audited &amp; Confidential Channel</span>
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
            <span className="font-bold text-foreground">Communication Safeguards:</span>{" "}
            <span className="text-muted-foreground">
              Direct messaging connects you with authorized staff members managing your linked children. To maintain student safeguarding and data privacy, parents cannot message arbitrary students or view internal faculty deliberations.
            </span>
          </div>
        </div>

        {/* Messaging Layout (Sidebar Contacts + Chat Window) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-card border border-border overflow-hidden shadow-xs min-h-[580px]">
          {/* Contacts Sidebar (4 cols) */}
          <div className="lg:col-span-4 border-r border-border flex flex-col bg-canvas/40">
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search teachers or departments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-500/30"
                />
              </div>
            </div>

            <div className="divide-y divide-border overflow-y-auto flex-1">
              {filteredContacts.map((c) => {
                const isSelected = c.id === selectedContactId;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedContactId(c.id)}
                    className={`w-full p-4 text-left transition flex items-start gap-3 ${
                      isSelected ? "bg-card shadow-xs border-l-4 border-pink-600" : "hover:bg-canvas"
                    }`}
                  >
                    <div className="size-10 rounded-xl bg-pink-600/10 text-pink-600 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-foreground text-xs truncate">{c.name}</span>
                        <span className="text-[10px] text-muted-foreground">{c.time}</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground block truncate">{c.roleTitle}</span>
                      <p className="text-[11px] text-muted-foreground/80 truncate mt-1">{c.lastMessage}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Chat Conversation Area (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-card">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-canvas/30">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-pink-600/10 text-pink-600 font-bold flex items-center justify-center text-xs">
                  {activeContact.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">{activeContact.name}</h3>
                  <span className="text-xs text-muted-foreground">{activeContact.department}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard/parent/ptm"
                  className="px-3 py-1.5 rounded-xl bg-canvas border border-border hover:bg-muted text-foreground text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-pink-600" />
                  Schedule PTM Consultation
                </Link>
              </div>
            </div>

            {/* Conversation Messages Feed */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 max-h-[420px]">
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "parent" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 shadow-2xs ${
                      msg.sender === "parent"
                        ? "bg-pink-600 text-white rounded-br-xs"
                        : "bg-canvas border border-border text-foreground rounded-bl-xs"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <div
                      className={`text-[10px] flex items-center justify-end gap-1 ${
                        msg.sender === "parent" ? "text-pink-100" : "text-muted-foreground"
                      }`}
                    >
                      <span>{msg.time}</span>
                      {msg.sender === "parent" && <CheckCheck className="w-3 h-3 text-pink-200" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-canvas/30 flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert("Simulating document attachment...")}
                className="p-2.5 rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder={`Type message to ${activeContact.name}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-pink-500/30"
              />

              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
