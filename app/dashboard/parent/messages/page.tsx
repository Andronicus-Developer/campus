"use client";

import { useState } from "react";
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
} from "lucide-react";

interface TeacherContact {
  id: string;
  name: string;
  role: string;
  childSubject: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
}

interface MessageBubble {
  id: string;
  sender: "parent" | "teacher";
  text: string;
  time: string;
}

export default function ParentMessagesPage() {
  const [selectedTeacherId, setSelectedTeacherId] = useState("t-1");
  const [inputText, setInputText] = useState("");

  const contacts: TeacherContact[] = [
    {
      id: "t-1",
      name: "Mr. David Alabi",
      role: "Senior Form Master",
      childSubject: "Tobi's Class Tutor · Further Maths",
      avatar: "DA",
      lastMessage: "Tobi has done exceptionally well in the WAEC simulation mock.",
      time: "10:30 AM",
      unreadCount: 1,
    },
    {
      id: "t-2",
      name: "Ms. Chioma Okon",
      role: "Junior Form Teacher",
      childSubject: "Maryam's Class Tutor · English Studies",
      avatar: "CO",
      lastMessage: "Good morning Mrs. Adeleke, Maryam submitted her reading journal.",
      time: "Yesterday",
    },
    {
      id: "t-3",
      name: "Mrs. Angela Nnamdi",
      role: "Bursar & Accounts",
      childSubject: "Tuition & Receipts Desk",
      avatar: "AN",
      lastMessage: "Payment of ₦100,000 for Maryam verified on Paystack.",
      time: "Jan 22",
    },
  ];

  const [chatMessages, setChatMessages] = useState<Record<string, MessageBubble[]>>({
    "t-1": [
      { id: "m-1", sender: "teacher", text: "Good day Mrs. Adeleke! Trust you are having a wonderful week.", time: "10:15 AM" },
      { id: "m-2", sender: "parent", text: "Good morning Mr. Alabi. How is Tobi settling in with the Olympiad clinic preparation?", time: "10:20 AM" },
      { id: "m-3", sender: "teacher", text: "Tobi has done exceptionally well in the WAEC simulation mock. He scored 97% in Advanced Mathematics and is leading the science cohort.", time: "10:30 AM" },
    ],
    "t-2": [
      { id: "m-4", sender: "teacher", text: "Good morning Mrs. Adeleke, Maryam submitted her reading journal today and did a great job on her creative essay.", time: "Yesterday, 03:15 PM" },
      { id: "m-5", sender: "parent", text: "Thank you Ms. Okon, she spent the weekend reading the literature novel.", time: "Yesterday, 04:00 PM" },
    ],
    "t-3": [
      { id: "m-6", sender: "teacher", text: "Payment of ₦100,000 for Maryam verified on Paystack. Balance remaining is ₦65,000.", time: "Jan 22, 11:10 AM" },
    ],
  });

  const activeContact = contacts.find((c) => c.id === selectedTeacherId) || contacts[0];
  const activeMessages = chatMessages[activeContact.id] || [];

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: MessageBubble = {
      id: `m-${Date.now()}`,
      sender: "parent",
      text: inputText,
      time: "Just now",
    };
    setChatMessages((prev) => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMessage],
    }));
    setInputText("");
  };

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <MessageSquareText className="w-4 h-4" />
              Family Portal · Direct Educator Communication
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Teacher & Form Master Messages
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Direct line to your children's form tutors and school academic administration.
            </p>
          </div>
        </div>

        {/* Messaging Layout (Split Screen) */}
        <div className="rounded-2xl bg-card border border-border shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[580px]">
          {/* Contacts Sidebar */}
          <div className="border-r border-border bg-canvas/40 flex flex-col">
            <div className="p-3.5 border-b border-border">
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search teachers & tutors..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-card border border-border focus:outline-none"
                />
              </div>
            </div>

            <div className="flex-1 divide-y divide-border overflow-y-auto">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedTeacherId(contact.id)}
                  className={`p-3.5 cursor-pointer transition flex items-start gap-3 ${
                    selectedTeacherId === contact.id
                      ? "bg-pink-500/10 border-l-4 border-l-pink-600"
                      : "hover:bg-muted/40"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs">
                    {contact.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-foreground text-xs truncate">{contact.name}</h4>
                      <span className="text-[10px] text-muted-foreground">{contact.time}</span>
                    </div>
                    <div className="text-[11px] font-medium text-pink-600 truncate">{contact.role}</div>
                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">{contact.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Conversation Window */}
          <div className="md:col-span-2 flex flex-col justify-between bg-card">
            {/* Conversation Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-canvas/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-600 text-white font-bold text-xs flex items-center justify-center">
                  {activeContact.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                    {activeContact.name}
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  </h3>
                  <p className="text-xs text-muted-foreground">{activeContact.childSubject}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Initiating direct voice call to ${activeContact.name}...`)}
                  className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition"
                >
                  <PhoneCall className="w-4 h-4 text-pink-600" />
                </button>
              </div>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[420px]">
              {activeMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "parent" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      msg.sender === "parent"
                        ? "bg-pink-600 text-white rounded-br-xs"
                        : "bg-canvas border border-border text-foreground rounded-bl-xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1 flex items-center gap-1">
                    {msg.time}
                    {msg.sender === "parent" && <CheckCheck className="w-3 h-3 text-pink-600" />}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-4 py-2 border-t border-border flex items-center gap-2 overflow-x-auto text-[11px]">
              <button
                onClick={() => setInputText("Thank you for the update! We appreciate your guidance.")}
                className="px-2.5 py-1 rounded-full bg-canvas border border-border hover:bg-muted text-muted-foreground whitespace-nowrap"
              >
                Thank you for the update
              </button>
              <button
                onClick={() => setInputText("Could we schedule a 10-minute consultation during PTA hour?")}
                className="px-2.5 py-1 rounded-full bg-canvas border border-border hover:bg-muted text-muted-foreground whitespace-nowrap"
              >
                Schedule consultation
              </button>
            </div>

            {/* Message Input Box */}
            <div className="p-3 border-t border-border flex items-center gap-2 bg-canvas/30">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message to Form Master..."
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-pink-500/30 text-foreground"
              />
              <button
                onClick={handleSend}
                className="p-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white shadow-sm transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
