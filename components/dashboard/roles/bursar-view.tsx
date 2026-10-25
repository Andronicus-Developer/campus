"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  ClockAlert,
  CreditCard,
  DollarSign,
  Download,
  FileSpreadsheet,
  FileText,
  Landmark,
  Layers,
  MessageSquare,
  Plus,
  Receipt,
  Search,
  Send,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  ChevronRight,
  Award,
  History,
  BarChart3,
  Sliders,
  Check,
} from "lucide-react";

interface PaymentItem {
  id: string;
  student: string;
  studentId: string;
  amount: number;
  channel: string;
  reference: string;
  date: string;
  status: "verified" | "pending";
}

interface OverdueInvoice {
  id: string;
  student: string;
  classGroup: string;
  amountDue: number;
  daysOverdue: number;
  guardianPhone: string;
  reminded: boolean;
}

export function BursarDashboardView() {
  const [termFilter, setTermFilter] = useState("Term 2, 2025/2026");
  const [downloadingSummary, setDownloadingSummary] = useState(false);

  const [payments, setPayments] = useState<PaymentItem[]>([
    {
      id: "pay-1",
      student: "Tobi Adeleke",
      studentId: "RC-2023-0184",
      amount: 1450,
      channel: "Paystack (Debit Card)",
      reference: "PSTK_98240182",
      date: "Today, 11:20 AM",
      status: "verified",
    },
    {
      id: "pay-2",
      student: "Zainab Bello",
      studentId: "RC-2023-0195",
      amount: 1200,
      channel: "Direct Bank Wire (Zenith)",
      reference: "ZN_TRF_772109",
      date: "Today, 10:45 AM",
      status: "verified",
    },
    {
      id: "pay-3",
      student: "Emeka Okonkwo",
      studentId: "RC-2023-0202",
      amount: 1450,
      channel: "Flutterwave (USSD)",
      reference: "FLW_98240091",
      date: "Today, 09:15 AM",
      status: "verified",
    },
    {
      id: "pay-4",
      student: "Aisha Danjuma",
      studentId: "RC-2023-0187",
      amount: 450,
      channel: "Cash at Bursary Counter",
      reference: "BUR_REC_0842",
      date: "Yesterday, 03:40 PM",
      status: "verified",
    },
  ]);

  const [overdues, setOverdues] = useState<OverdueInvoice[]>([
    {
      id: "inv-1",
      student: "Somtochukwu Eze",
      classGroup: "SSS 2A",
      amountDue: 1450,
      daysOverdue: 24,
      guardianPhone: "+234 803 445 1029",
      reminded: false,
    },
    {
      id: "inv-2",
      student: "Aminu Mohammed",
      classGroup: "JSS 3B",
      amountDue: 980,
      daysOverdue: 18,
      guardianPhone: "+234 809 112 4001",
      reminded: false,
    },
    {
      id: "inv-3",
      student: "Kehinde Alabi",
      classGroup: "JSS 1 Gold",
      amountDue: 1100,
      daysOverdue: 32,
      guardianPhone: "+234 818 900 3341",
      reminded: false,
    },
  ]);

  const handleSendReminder = (id: string) => {
    setOverdues((prev) =>
      prev.map((o) => (o.id === id ? { ...o, reminded: true } : o))
    );
    alert("Payment notice dispatched via automated SMS and WhatsApp gateway to guardian.");
  };

  const handleExportSummary = () => {
    setDownloadingSummary(true);
    setTimeout(() => {
      setDownloadingSummary(false);
      alert("Executive Financial Summary (PDF & CSV) exported with audited reconciliations.");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Bursary Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center font-bold text-2xl text-white shadow-inner">
              AN
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-0.5 font-mono text-[11px] font-bold">
                <span>Treasury &amp; Financial Controller · Bursary Division</span>
              </div>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black">Mrs. Angela Nnamdi, FCA</h2>
              <p className="text-xs text-white/80 font-mono">
                Staff ID: <strong className="text-white">BUR-005</strong> · Authorized Custodian: Multi-Channel Fee Ledger
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={termFilter}
              onChange={(e) => setTermFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/25 text-white font-semibold text-xs backdrop-blur-md focus:outline-none"
            >
              <option value="Term 2, 2025/2026" className="text-ink">Term 2, 2025/2026 (Active)</option>
              <option value="Term 1, 2025/2026" className="text-ink">Term 1, 2025/2026 (Audited)</option>
              <option value="Annual 2024/2025" className="text-ink">Annual Session 2024/2025</option>
            </select>

            <button
              type="button"
              onClick={handleExportSummary}
              disabled={downloadingSummary}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-amber-900 shadow-md transition-all hover:bg-white/90 active:scale-95 disabled:opacity-75"
            >
              <Download className="size-4" />
              <span>{downloadingSummary ? "Exporting..." : "Financial Summary"}</span>
            </button>
          </div>
        </div>

        {/* Real-Time Operational Pulse */}
        <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-white/15 text-xs font-mono text-white/90">
          <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1">
            <CheckCircle2 className="size-3.5 text-emerald-300" />
            <span>Collection Realization: 85.9% of Billed Target</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1">
            <ClockAlert className="size-3.5 text-amber-200" />
            <span>8 Unmatched Bank Wires ($6,420 Pending)</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1">
            <Landmark className="size-3.5 text-cyan-200" />
            <span>Bank Reconciliation: Synced to 06:00 AM Today</span>
          </span>
        </div>
      </div>

      {/* Accounting Totals Grid (Distinct Billed, Collected, Outstanding, Reconciled) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Billed */}
        <div className="p-5 rounded-3xl bg-surface border border-line shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-ink-muted">
            <span>Total Fees Billed</span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-700 dark:text-blue-300">
              842 Invoices
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-ink">
            US$ 1,220,900.00
          </div>
          <div className="text-[11px] text-ink-muted">
            Net of approved concessions ($34,500)
          </div>
        </div>

        {/* 2. Total Collected */}
        <div className="p-5 rounded-3xl bg-surface border border-line shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-ink-muted">
            <span>Total Collections Confirmed</span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              85.9%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">
            US$ 1,048,450.00
          </div>
          <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <TrendingUp className="size-3" /> +14.2% vs last term cadence
          </div>
        </div>

        {/* 3. Outstanding Debts */}
        <div className="p-5 rounded-3xl bg-surface border border-line shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-ink-muted">
            <span>Outstanding Balance</span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300">
              118 Accounts
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-500">
            US$ 172,450.00
          </div>
          <div className="text-[11px] text-amber-600 font-semibold">
            $42,800 Overdue &gt; 30 Days
          </div>
        </div>

        {/* 4. Cash / Funds Reconciled */}
        <div className="p-5 rounded-3xl bg-surface border border-line shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-ink-muted">
            <span>Bank &amp; Cash Reconciled</span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
              Audited
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-primary">
            US$ 1,045,250.00
          </div>
          <div className="text-[11px] text-ink-muted font-mono">
            Variance: -$3,200 (In Transit / Wires)
          </div>
        </div>
      </div>

      {/* 12-Module Command Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Link
          href="/dashboard/bursar/fees"
          className="p-3.5 rounded-2xl bg-surface border border-line hover:border-amber-500/40 hover:bg-surface-raised transition shadow-xs flex items-center gap-3 group"
        >
          <div className="size-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <Layers className="size-4.5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink">Fee Structures</div>
            <div className="text-[10px] text-ink-muted font-medium">Tariffs &amp; Plans</div>
          </div>
        </Link>

        <Link
          href="/dashboard/bursar/invoices"
          className="p-3.5 rounded-2xl bg-surface border border-line hover:border-amber-500/40 hover:bg-surface-raised transition shadow-xs flex items-center gap-3 group"
        >
          <div className="size-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
            <FileSpreadsheet className="size-4.5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink">Student Invoices</div>
            <div className="text-[10px] text-blue-600 font-semibold">842 Billed</div>
          </div>
        </Link>

        <Link
          href="/dashboard/bursar/payments"
          className="p-3.5 rounded-2xl bg-surface border border-line hover:border-amber-500/40 hover:bg-surface-raised transition shadow-xs flex items-center gap-3 group"
        >
          <div className="size-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            <Receipt className="size-4.5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink">Payment Inflows</div>
            <div className="text-[10px] text-emerald-600 font-semibold">Live Feed</div>
          </div>
        </Link>

        <Link
          href="/dashboard/bursar/receipts"
          className="p-3.5 rounded-2xl bg-surface border border-line hover:border-amber-500/40 hover:bg-surface-raised transition shadow-xs flex items-center gap-3 group"
        >
          <div className="size-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
            <FileText className="size-4.5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink">Receipts Vault</div>
            <div className="text-[10px] text-ink-muted font-medium">Audited Copies</div>
          </div>
        </Link>

        <Link
          href="/dashboard/bursar/debt"
          className="p-3.5 rounded-2xl bg-surface border border-line hover:border-amber-500/40 hover:bg-surface-raised transition shadow-xs flex items-center gap-3 group"
        >
          <div className="size-9 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
            <ClockAlert className="size-4.5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink">Debt Aging</div>
            <div className="text-[10px] text-rose-600 font-semibold">$172K Overdue</div>
          </div>
        </Link>

        <Link
          href="/dashboard/bursar/reconcile"
          className="p-3.5 rounded-2xl bg-surface border border-line hover:border-amber-500/40 hover:bg-surface-raised transition shadow-xs flex items-center gap-3 group"
        >
          <div className="size-9 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center font-bold">
            <Landmark className="size-4.5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-bold text-ink">Reconciliation</div>
            <div className="text-[10px] text-cyan-600 font-semibold">Bank &amp; Gateway</div>
          </div>
        </Link>
      </div>

      {/* Main Grid: Collections Breakdown & Real-Time Inflow Stream */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Recent Confirmed Inflows & Verification Queue (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Confirmed Collections Ledger */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <Receipt className="size-4.5 text-emerald-600" />
                <h3 className="text-base font-extrabold text-ink">Recent Confirmed Collections</h3>
              </div>
              <Link href="/dashboard/bursar/payments" className="font-bold text-xs text-primary hover:underline">
                View All Ledger Entries
              </Link>
            </div>

            <div className="space-y-3">
              {payments.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-2xl border border-line bg-surface-raised flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink text-sm">{p.student}</span>
                      <span className="font-mono text-[11px] text-ink-muted">({p.studentId})</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                        Confirmed
                      </span>
                    </div>
                    <div className="text-ink-muted text-[11px]">
                      Channel: <strong className="text-ink">{p.channel}</strong> · Ref: <span className="font-mono">{p.reference}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-emerald-600 block">
                      US$ {p.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-ink-muted font-mono">{p.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-ink-muted border-t border-line">
              <span>Automated verification enabled via server-side provider webhooks.</span>
              <span className="font-semibold text-ink">Today Total: US$ 18,450.00</span>
            </div>
          </div>

          {/* Collections by Channel & Level Matrix */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h3 className="text-base font-extrabold text-ink">Inflow Distribution by Channel &amp; Level</h3>
              <span className="font-mono text-xs font-semibold text-ink-muted">Term 2 Analytics</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-surface-raised border border-line space-y-1">
                <span className="text-ink-muted text-[11px] block">Paystack Card/USSD</span>
                <span className="font-black text-ink text-sm block">US$ 545,200.00</span>
                <span className="text-[10px] text-emerald-600 font-semibold">52.0% of total</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-raised border border-line space-y-1">
                <span className="text-ink-muted text-[11px] block">Direct Bank Wires</span>
                <span className="font-black text-ink text-sm block">US$ 293,550.00</span>
                <span className="text-[10px] text-ink-muted">28.0% of total</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-raised border border-line space-y-1">
                <span className="text-ink-muted text-[11px] block">Cash Counter</span>
                <span className="font-black text-ink text-sm block">US$ 146,800.00</span>
                <span className="text-[10px] text-ink-muted">14.0% of total</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-raised border border-line space-y-1">
                <span className="text-ink-muted text-[11px] block">Mobile Money</span>
                <span className="font-black text-ink text-sm block">US$ 62,900.00</span>
                <span className="text-[10px] text-ink-muted">6.0% of total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Overdue Action Radar, Discrepancies & Concessions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Overdue Accounts & Direct Reminders */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <ClockAlert className="size-4.5 text-rose-600" />
                <h3 className="text-base font-extrabold text-ink">High Priority Overdue Accounts</h3>
              </div>
              <Link href="/dashboard/bursar/debt" className="font-bold text-xs text-primary hover:underline">
                View Aging (118)
              </Link>
            </div>

            <div className="space-y-3">
              {overdues.map((o) => (
                <div
                  key={o.id}
                  className="p-3.5 rounded-2xl border border-line bg-surface-raised flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-ink">{o.student}</div>
                    <div className="text-[11px] text-ink-muted">
                      {o.classGroup} · {o.daysOverdue} Days Overdue
                    </div>
                    <div className="text-[11px] font-mono text-rose-600 font-bold">
                      Owing: US$ {o.amountDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSendReminder(o.id)}
                    disabled={o.reminded}
                    className={`px-3 py-1.5 rounded-xl font-semibold text-xs transition flex items-center gap-1.5 ${
                      o.reminded
                        ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
                        : "bg-primary text-white hover:bg-primary-hover shadow-xs"
                    }`}
                  >
                    {o.reminded ? (
                      <>
                        <Check className="size-3.5" /> Reminded
                      </>
                    ) : (
                      <>
                        <Send className="size-3.5" /> Remind
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Verifications & Unreconciled Wires Notice */}
          <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 shadow-sm space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
              <AlertTriangle className="size-4.5 text-amber-600 shrink-0" />
              <span>Pending Reconciliation Tasks (8 Items)</span>
            </div>
            <p className="text-ink-soft leading-relaxed">
              8 direct bank wire transfers ($6,420 total) deposited into Zenith Bank account #1019284910 require student registration matching.
            </p>
            <div className="pt-2 flex justify-between items-center">
              <span className="font-mono text-[11px] text-ink-muted">Cut-off: Today, 04:00 PM</span>
              <Link
                href="/dashboard/bursar/reconcile"
                className="font-bold text-amber-700 dark:text-amber-300 hover:underline"
              >
                Launch Reconciliation Matcher →
              </Link>
            </div>
          </div>

          {/* Scholarships, Concessions & Budget Status */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <Award className="size-4.5 text-purple-600" />
                <h3 className="text-base font-extrabold text-ink">Scholarship &amp; Budget Ledger</h3>
              </div>
              <Link href="/dashboard/bursar/concessions" className="font-bold text-xs text-primary hover:underline">
                Concessions
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-surface-raised border border-line space-y-1">
                <div className="flex justify-between font-bold text-ink">
                  <span>Approved Bursaries &amp; Waivers</span>
                  <span className="font-mono text-purple-600">US$ 34,500.00</span>
                </div>
                <div className="text-[11px] text-ink-muted">
                  34 Students on Academic &amp; Sibling Concessions (Budget: $50,000)
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-surface-raised border border-line space-y-1">
                <div className="flex justify-between font-bold text-ink">
                  <span>Term Departmental Expenditure</span>
                  <span className="font-mono text-emerald-600">US$ 312,400.00</span>
                </div>
                <div className="text-[11px] text-ink-muted">
                  71.8% of Term 2 operating budget utilized across 6 departments
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
