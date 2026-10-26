"use client";

import { useState } from "react";
import Link from "next/link";
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
  Activity,
  AlertTriangle,
  ChevronRight,
  BookOpen,
  FileText,
  Building2,
  Bus,
  CheckSquare,
  AlertCircle,
  TrendingUp,
  Receipt,
  FileSpreadsheet,
} from "lucide-react";
import { CHILDREN_PROFILES, FAMILY_DATA, ChildProfile } from "@/lib/family-data";

export function ParentDashboardView() {
  const [selectedChildId, setSelectedChildId] = useState<string>("child-1");
  const [messageText, setMessageText] = useState("");
  const [messageRecipient, setMessageRecipient] = useState("form_teacher");
  const [messageSent, setMessageSent] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const activeChild =
    CHILDREN_PROFILES.find((c) => c.id === selectedChildId) || CHILDREN_PROFILES[0];

  const totalFamilyDue = CHILDREN_PROFILES.reduce((sum, c) => sum + c.balanceDue, 0);
  const totalFamilyPaid = CHILDREN_PROFILES.reduce((sum, c) => sum + c.amountPaid, 0);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageText("");
      setMessageSent(false);
      setToast(`Message successfully delivered to ${activeChild.classTeacher.name}. You will be notified on reply.`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
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

      {/* Parent Header */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-pink-500/10 border border-pink-500/20 px-3 py-1 font-mono text-[11px] font-bold text-pink-600">
                Family Portal · File #{FAMILY_DATA.familyCode}
              </span>
              <span className="text-xs text-muted-foreground">{FAMILY_DATA.primaryGuardian.name}</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Family Education &amp; Billing Workspace
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Monitoring {CHILDREN_PROFILES.length} enrolled students across Junior &amp; Senior Secondary divisions at Riverside International College.
            </p>
          </div>

          {/* Child Profile Switcher */}
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-1.5 shadow-xs">
            {CHILDREN_PROFILES.map((c) => {
              const isSelected = c.id === selectedChildId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedChildId(c.id)}
                  className={`flex items-center gap-2.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-pink-600 text-white shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`size-6 rounded-full flex items-center justify-center text-[10px] font-extrabold ${
                      isSelected ? "bg-white/20 text-white" : "bg-canvas border border-border text-foreground"
                    }`}
                  >
                    {c.avatar}
                  </span>
                  <div className="text-left">
                    <span className="block leading-none">{c.preferredName}</span>
                    <span className={`text-[10px] ${isSelected ? "text-pink-100" : "text-muted-foreground"}`}>
                      {c.classGroup.split(" (")[0]}
                    </span>
                  </div>
                  {c.balanceDue > 0 && (
                    <span className={`size-2 rounded-full ${isSelected ? "bg-white" : "bg-amber-500"}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Child Identity & Status Banner */}
      <div className="rounded-3xl border border-pink-500/20 bg-gradient-to-r from-pink-600 via-rose-600 to-indigo-800 p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center font-black text-2xl text-white">
              {activeChild.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                  Active Student Context
                </span>
                <span className="text-xs text-pink-200 font-mono">Admission: {activeChild.admissionNo}</span>
              </div>
              <h2 className="text-2xl font-black">{activeChild.name}</h2>
              <p className="text-xs text-white/80 font-medium">
                {activeChild.classGroup} · Form Tutor: <strong>{activeChild.classTeacher.name}</strong> · House: {activeChild.house}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-xl bg-white/10 border border-white/15 px-3.5 py-2 font-mono text-xs text-white backdrop-blur-md">
              Attendance Streak: <strong className="text-emerald-300 font-bold">{activeChild.attendancePct}</strong>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/15 px-3.5 py-2 font-mono text-xs text-white backdrop-blur-md">
              Cumulative GPA: <strong className="text-amber-200 font-bold">{activeChild.gpa}</strong>
            </div>
            <Link
              href="/dashboard/parent/results"
              className="px-3.5 py-2 rounded-xl bg-white text-pink-700 font-bold text-xs shadow-xs hover:bg-pink-50 transition"
            >
              Report Card
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Navigation Command Pills (All 15 Modules) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <Link
          href="/dashboard/parent/children"
          className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <Users className="w-3.5 h-3.5 text-blue-500" />
          Profiles & Handbooks
        </Link>
        <Link
          href="/dashboard/parent/attendance"
          className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <Activity className="w-3.5 h-3.5 text-emerald-500" />
          Gate & Class Attendance
        </Link>
        <Link
          href="/dashboard/parent/results"
          className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <Award className="w-3.5 h-3.5 text-amber-500" />
          Term Grades & Reports
        </Link>
        <Link
          href="/dashboard/parent/assignments"
          className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <FileText className="w-3.5 h-3.5 text-purple-500" />
          Homework & Worksheets
        </Link>
        <Link
          href="/dashboard/parent/fees"
          className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <CreditCard className="w-3.5 h-3.5 text-pink-500" />
          Fees & Paystack Checkout
        </Link>
        <Link
          href="/dashboard/parent/ptm"
          className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <HeartHandshake className="w-3.5 h-3.5 text-cyan-500" />
          PTM Consultations
        </Link>
        <Link
          href="/dashboard/parent/calendar"
          className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <Calendar className="w-3.5 h-3.5 text-orange-500" />
          Events & Excursion Consent
        </Link>
        <Link
          href="/dashboard/parent/guardians"
          className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-semibold flex items-center gap-1.5 shadow-2xs"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
          Guardian & Pickup PIN
        </Link>
      </div>

      {/* Critical Alert Banner (if any) */}
      {activeChild.alerts.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <Bell className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-foreground">Action Required for {activeChild.preferredName}:</span>{" "}
            <span className="text-muted-foreground">{activeChild.alerts[0].title}</span>{" "}
            <span className="text-amber-600 font-semibold">({activeChild.alerts[0].date})</span>
          </div>
        </div>
      )}

      {/* Two Column Layout: Academic & Invoicing Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tuition & Fees + Assignments (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tuition Fee Standing */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 block">
                  Bursary Ledger · 2025/2026 Term 1
                </span>
                <h3 className="text-base font-extrabold text-foreground">
                  Fee Statement for {activeChild.preferredName}
                </h3>
                <p className="text-xs text-muted-foreground">Invoice #{activeChild.invoiceNo}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  activeChild.feeStatus === "cleared"
                    ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                    : "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800"
                }`}
              >
                {activeChild.feeStatus === "cleared" ? "Cleared / Paid" : "Installment Balance Due"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-canvas border border-border text-xs">
              <div>
                <span className="text-muted-foreground block text-[11px]">Billed Tariff</span>
                <span className="font-bold text-foreground">
                  US$ {activeChild.termTuition.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Paid to Date</span>
                <span className="font-bold text-emerald-600">
                  US$ {activeChild.amountPaid.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Outstanding</span>
                <span
                  className={`font-black ${
                    activeChild.balanceDue > 0 ? "text-amber-600" : "text-emerald-600"
                  }`}
                >
                  US$ {activeChild.balanceDue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-muted-foreground" />
                Latest Receipt: <strong>{activeChild.receiptNo}</strong>
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard/parent/fees"
                  className="px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-xs transition"
                >
                  {activeChild.balanceDue > 0
                    ? `Pay US$ ${activeChild.balanceDue.toFixed(2)} Online`
                    : "View Receipt"}
                </Link>
              </div>
            </div>
          </div>

          {/* Upcoming Assignments Radar */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-base font-extrabold text-foreground">Homework &amp; Continuous Assessment</h3>
                <p className="text-xs text-muted-foreground">
                  Monitoring assignments for {activeChild.preferredName} (Student completes work independently)
                </p>
              </div>
              <Link
                href="/dashboard/parent/assignments"
                className="text-xs font-semibold text-pink-600 hover:underline flex items-center gap-1"
              >
                All Homework <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {activeChild.upcomingAssignments.map((asg) => (
                <div
                  key={asg.id}
                  className="p-3.5 rounded-xl bg-canvas border border-border flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-card border border-border text-foreground">
                      {asg.subject}
                    </span>
                    <h4 className="font-semibold text-foreground text-xs mt-1">{asg.title}</h4>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      Due: {asg.dueDate}
                    </p>
                    {asg.feedback && (
                      <p className="text-[11px] text-emerald-600 mt-1 italic">
                        Teacher Feedback: "{asg.feedback}"
                      </p>
                    )}
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      asg.status === "graded"
                        ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                        : "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800"
                    }`}
                  >
                    {asg.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Attendance Radar & Direct Note to Teacher (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Biometric Gate Attendance Radar */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-base font-extrabold text-foreground">Gate Arrival Radar</h3>
                <p className="text-xs text-muted-foreground">RFID turnstile check-in log</p>
              </div>
              <span className="flex size-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="p-4 rounded-2xl bg-canvas border border-border text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground">Today&apos;s Arrival:</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                  On Time &amp; Verified
                </span>
              </div>
              <p className="font-mono text-muted-foreground">{activeChild.lastArrival}</p>
              <div className="pt-1 text-[11px] text-muted-foreground flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Instant SMS &amp; push notification delivered to Mrs. Adeleke</span>
              </div>
            </div>

            <Link
              href="/dashboard/parent/attendance"
              className="w-full py-2 rounded-xl bg-canvas border border-border hover:bg-muted text-foreground text-xs font-semibold flex items-center justify-center gap-1 transition"
            >
              Submit Absence Note / Doctor's Slip
            </Link>
          </div>

          {/* Direct Note to School / Class Teacher */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <MessageSquareText className="w-4 h-4 text-pink-600" />
              <div>
                <h3 className="text-base font-extrabold text-foreground">Message Form Teacher</h3>
                <p className="text-xs text-muted-foreground">
                  Direct message to {activeChild.classTeacher.name}
                </p>
              </div>
            </div>

            {messageSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center text-xs">
                <CheckCircle2 className="mx-auto w-5 h-5 text-emerald-600 mb-1" />
                <span className="font-bold text-foreground block">Message Transmitted</span>
                <span className="text-muted-foreground">Tutor will reply directly via portal chats.</span>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Inquiry Topic</label>
                  <select
                    value={messageRecipient}
                    onChange={(e) => setMessageRecipient(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    <option value="form_teacher">Class Form Teacher ({activeChild.classTeacher.name})</option>
                    <option value="bursar">Bursar &amp; Accounts (Fee / Receipt Queries)</option>
                    <option value="admin">School Admin (Registry &amp; Letters)</option>
                    <option value="principal">Principal (Executive Matters)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Your Message</label>
                  <textarea
                    rows={3}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder={`e.g. Good morning, please note that ${activeChild.preferredName} will need to leave 30 minutes early on Thursday for a dentist appointment...`}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Note to School
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
