"use client";

import { useState } from "react";
import {
  Award,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  HeartHandshake,
  Lock,
  Mail,
  MessageSquareText,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from "lucide-react";

interface ChildInfo {
  id: string;
  name: string;
  regNo: string;
  classGroup: string;
  avatar: string;
  feeStatus: "paid" | "due";
  feeAmount: string;
  attendancePct: string;
  lastArrival: string;
  classTeacher: string;
  gpa: string;
}

export function ParentDashboardView() {
  const [selectedChildId, setSelectedChildId] = useState("child-1");
  const [paying, setPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const children: ChildInfo[] = [
    {
      id: "child-1",
      name: "Tobi Adeleke",
      regNo: "RC-2023-0184",
      classGroup: "SSS 2A (Senior Science)",
      avatar: "TA",
      feeStatus: "due",
      feeAmount: "₦185,000",
      attendancePct: "98.2%",
      lastArrival: "Today, 07:42 AM (Gate Check-in)",
      classTeacher: "Mr. David Alabi",
      gpa: "3.82 / 4.0",
    },
    {
      id: "child-2",
      name: "Kemi Adeleke",
      regNo: "RC-2025-0412",
      classGroup: "JSS 1 Alpha (Junior Secondary)",
      avatar: "KA",
      feeStatus: "paid",
      feeAmount: "₦145,000",
      attendancePct: "100%",
      lastArrival: "Today, 07:40 AM (Gate Check-in)",
      classTeacher: "Ms. Chioma Okon",
      gpa: "3.95 / 4.0",
    },
  ];

  const activeChild = children.find((c) => c.id === selectedChildId) || children[0];

  const handlePaystackPay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaymentSuccess(true);
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageText("");
      setMessageSent(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Parent Header */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-pink-100 px-3 py-1 font-mono text-[11px] font-bold text-pink-700">
                Guardian Caregiver Portal
              </span>
              <span className="text-xs text-ink-muted">Mrs. Zainab Adeleke</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-ink">Family Academic &amp; Billing Hub</h2>
            <p className="text-xs text-ink-muted">
              Monitoring 2 enrolled students at Riverside International College.
            </p>
          </div>

          {/* Child Switcher Pill Tabs */}
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface-raised p-1.5">
            {children.map((c) => {
              const isSelected = c.id === selectedChildId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSelectedChildId(c.id);
                    setPaymentSuccess(false);
                  }}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-surface text-primary shadow-sm"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  <span className="size-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">
                    {c.avatar}
                  </span>
                  <span>{c.name.split(" ")[0]}</span>
                  <span className="text-[10px] text-ink-muted">({c.classGroup.split(" ")[0]})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Child Identity Banner */}
      <div className="rounded-3xl border border-pink-500/20 bg-gradient-to-r from-pink-600 via-rose-600 to-indigo-800 p-6 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center font-bold text-xl text-white">
              {activeChild.avatar}
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-pink-200 uppercase tracking-wider block">
                Viewing Child Profile
              </span>
              <h3 className="text-2xl font-black">{activeChild.name}</h3>
              <span className="text-xs text-white/80 font-mono">
                {activeChild.classGroup} · ID: {activeChild.regNo} · Form Teacher: {activeChild.classTeacher}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-xl bg-white/10 px-3.5 py-2 font-mono text-xs text-white backdrop-blur-md">
              Term Attendance: <strong className="text-emerald-300 font-bold">{activeChild.attendancePct}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Fee Payment Card + Daily Attendance Tracker */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Tuition Fee Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Term 2 School Fee Statement</h3>
                <p className="text-xs text-ink-muted">Invoice Ref: INV-2025-0842 · Due Date: End of Week 8</p>
              </div>

              <span
                className={`rounded-full px-3 py-1 font-mono text-xs font-bold uppercase ${
                  activeChild.feeStatus === "paid" || paymentSuccess
                    ? "bg-success-light text-success-deep"
                    : "bg-danger-light text-danger"
                }`}
              >
                {paymentSuccess ? "Paid in Full" : activeChild.feeStatus === "paid" ? "Paid in Full" : "Payment Due"}
              </span>
            </div>

            {/* Fee Breakdown */}
            <div className="mt-4 divide-y divide-line-soft text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-ink">Senior Secondary Tuition &amp; Instruction</span>
                <span className="font-mono font-bold text-ink">₦130,000</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-ink">Science Laboratory &amp; ICT Practical Levy</span>
                <span className="font-mono font-bold text-ink">₦30,000</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-ink">Parent-Teacher Association (PTA) Levy</span>
                <span className="font-mono font-bold text-ink">₦15,000</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-ink">Co-curricular Sports &amp; Health Clinic Retainer</span>
                <span className="font-mono font-bold text-ink">₦10,000</span>
              </div>
              <div className="pt-3 flex justify-between font-bold text-sm">
                <span className="text-ink">Total Terminal Fee</span>
                <span className="font-mono text-primary text-base">{activeChild.feeAmount}</span>
              </div>
            </div>

            {/* Pay Button / Receipt Download */}
            <div className="mt-6 border-t border-line pt-4">
              {paymentSuccess || activeChild.feeStatus === "paid" ? (
                <div className="rounded-2xl border border-success/30 bg-success-light p-4 text-center">
                  <CheckCircle2 className="mx-auto size-6 text-success" />
                  <span className="mt-1 block font-bold text-xs text-ink">Payment Confirmed &amp; Reconciled</span>
                  <p className="text-[11px] text-ink-muted">Receipt #REC-2025-9921 is available for download.</p>
                  <button
                    type="button"
                    onClick={() => alert("Downloading verified PDF receipt...")}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-xs font-bold text-white hover:bg-ink-soft"
                  >
                    <Download className="size-3.5" />
                    <span>Download Official Receipt</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-ink-muted">
                    <Lock className="size-3.5 text-success" />
                    <span>Secured with 256-bit Paystack PCI-DSS Gateway</span>
                  </div>

                  <button
                    type="button"
                    onClick={handlePaystackPay}
                    disabled={paying}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 active:scale-95 disabled:opacity-75"
                  >
                    <CreditCard className="size-4" />
                    <span>{paying ? "Connecting to Paystack..." : `Pay ${activeChild.feeAmount} Online`}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Attendance Alert & Message Form Master (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Daily Gate Attendance Card */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h3 className="text-base font-extrabold text-ink">Gate Check-in Radar</h3>
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="mt-4 p-4 rounded-2xl border border-line bg-surface-raised text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-ink">Today&apos;s Arrival Status:</span>
                <span className="rounded-full bg-success-light px-2.5 py-0.5 font-mono text-[10px] font-bold text-success-deep">
                  Present &amp; On Time
                </span>
              </div>
              <p className="font-mono text-[11px] text-ink-muted">{activeChild.lastArrival}</p>
              <span className="text-[10px] text-ink-faint block">
                Automated SMS notification dispatched to registered mobile: +234 803 291 0021
              </span>
            </div>
          </div>

          {/* Direct Note to Form Teacher */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-line pb-4">
              <MessageSquareText className="size-4 text-primary" />
              <div>
                <h3 className="text-base font-extrabold text-ink">Message Class Form Master</h3>
                <p className="text-xs text-ink-muted">Direct line to {activeChild.classTeacher}</p>
              </div>
            </div>

            {messageSent ? (
              <div className="mt-4 rounded-2xl border border-success/30 bg-success-light p-4 text-center">
                <CheckCircle2 className="mx-auto size-6 text-success" />
                <span className="mt-1 block font-bold text-xs text-ink">Message Delivered</span>
                <span className="text-[11px] text-ink-muted">Teacher will reply via your portal dashboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="mt-4 space-y-3">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="e.g. Good morning Mr. Alabi, please note that Tobi will be attending an inter-school science exhibition on Friday..."
                  rows={3}
                  className="w-full rounded-xl border border-line bg-surface-raised p-3 text-xs text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
                />

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-ink py-2 text-xs font-bold text-white hover:bg-ink-soft active:scale-95"
                >
                  <Send className="size-3.5" />
                  <span>Send Message to Teacher</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
