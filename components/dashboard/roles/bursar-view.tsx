"use client";

import { useState } from "react";
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
} from "lucide-react";

interface PaymentItem {
  id: string;
  student: string;
  studentId: string;
  amount: string;
  channel: string;
  reference: string;
  date: string;
  status: "verified" | "pending";
}

interface OverdueInvoice {
  id: string;
  student: string;
  classGroup: string;
  amountDue: string;
  daysOverdue: number;
  guardianPhone: string;
  reminded: boolean;
}

export function BursarDashboardView() {
  const [payments, setPayments] = useState<PaymentItem[]>([
    {
      id: "pay-1",
      student: "Adeleke Tobi",
      studentId: "RC-2023-0184",
      amount: "₦185,000",
      channel: "Paystack (Debit Card)",
      reference: "PSTK_98240182",
      date: "Today, 11:20 AM",
      status: "verified",
    },
    {
      id: "pay-2",
      student: "Bello Zainab",
      studentId: "RC-2023-0195",
      amount: "₦120,000",
      channel: "Bank Direct Transfer",
      reference: "GTB_TRF_772109",
      date: "Today, 10:45 AM",
      status: "verified",
    },
    {
      id: "pay-3",
      student: "Okonkwo Emeka",
      studentId: "RC-2023-0202",
      amount: "₦210,000",
      channel: "Paystack (USSD)",
      reference: "PSTK_98240091",
      date: "Today, 09:15 AM",
      status: "verified",
    },
    {
      id: "pay-4",
      student: "Danjuma Aisha",
      studentId: "RC-2023-0187",
      amount: "₦65,000",
      channel: "Cash at Bursary",
      reference: "BUR_REC_0842",
      date: "Yesterday",
      status: "verified",
    },
  ]);

  const [overdues, setOverdues] = useState<OverdueInvoice[]>([
    {
      id: "inv-1",
      student: "Eze Somtochukwu",
      classGroup: "SSS 2A",
      amountDue: "₦140,000",
      daysOverdue: 24,
      guardianPhone: "+234 803 445 1029",
      reminded: false,
    },
    {
      id: "inv-2",
      student: "Mohammed Aminu",
      classGroup: "JSS 3B",
      amountDue: "₦95,000",
      daysOverdue: 18,
      guardianPhone: "+234 809 112 4001",
      reminded: false,
    },
    {
      id: "inv-3",
      student: "Alabi Kehinde",
      classGroup: "JSS 1 Gold",
      amountDue: "₦120,000",
      daysOverdue: 32,
      guardianPhone: "+234 818 900 3341",
      reminded: false,
    },
  ]);

  const handleSendReminder = (id: string) => {
    setOverdues((prev) =>
      prev.map((o) => (o.id === id ? { ...o, reminded: true } : o))
    );
  };

  return (
    <div className="space-y-6">
      {/* Bursary Header */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-100 px-3 py-1 font-mono text-[11px] font-bold text-amber-800">
                Treasury &amp; Financial Controller
              </span>
              <span className="text-xs text-ink-muted">Mrs. Angela Nnamdi, FCA</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-ink">Bursary Financial Console</h2>
            <p className="text-xs text-ink-muted">
              Term 2 Fee billing, automated Paystack payment ledger, debts recovery, and receipts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert("Batch Invoicing Wizard: Generates 842 term invoices with Paystack payment links.")}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-amber-700 active:scale-95"
            >
              <FileSpreadsheet className="size-4" />
              <span>Generate Term Invoices</span>
            </button>
          </div>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
            Total Invoiced (Term 2)
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-mono text-3xl font-extrabold text-ink">₦48.2M</span>
            <span className="font-mono text-xs font-bold text-ink-muted">842 invoices</span>
          </div>
          <p className="mt-2 text-xs text-ink-muted">Tuition, boarding, levies &amp; uniforms</p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
            Total Collected (88.4%)
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-mono text-3xl font-extrabold text-success">₦42.6M</span>
            <span className="font-mono text-xs font-bold text-success">+₦850k today</span>
          </div>
          <p className="mt-2 text-xs text-ink-muted">Settled via Paystack &amp; direct bank transfers</p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
            Outstanding Tuition Debt
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-mono text-3xl font-extrabold text-danger">₦5.6M</span>
            <span className="font-mono text-xs font-bold text-danger">64 accounts</span>
          </div>
          <p className="mt-2 text-xs text-ink-muted">Subject to auto payment reminders</p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
            Today&apos;s Cash &amp; Bank Inflow
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-mono text-3xl font-extrabold text-primary">₦850,000</span>
            <span className="font-mono text-xs font-bold text-primary">6 transactions</span>
          </div>
          <p className="mt-2 text-xs text-ink-muted">Verified &amp; reconciled in realtime</p>
        </div>
      </div>

      {/* Main Grid: Payment Inflows & Debt Recovery */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Live Inflows (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Recent Payment Inflow Stream</h3>
                <p className="text-xs text-ink-muted">Live settlements with instant PDF receipt generation.</p>
              </div>
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="mt-4 divide-y divide-line-soft">
              {payments.map((p) => (
                <div key={p.id} className="py-3.5 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-ink block">{p.student}</span>
                    <span className="font-mono text-[11px] text-ink-muted">
                      {p.studentId} · {p.channel}
                    </span>
                    <span className="font-mono text-[10px] text-primary block mt-0.5">
                      Ref: {p.reference}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-sm font-extrabold text-ink block">{p.amount}</span>
                    <span className="font-mono text-[10px] text-ink-muted block">{p.date}</span>
                    <button
                      type="button"
                      onClick={() => alert(`Downloading verified e-receipt for ${p.reference}...`)}
                      className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] font-bold text-primary hover:underline"
                    >
                      <Download className="size-3" />
                      <span>Download Receipt</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Debt Recovery Aging (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="border-b border-line pb-4">
              <h3 className="text-base font-extrabold text-ink">Overdue Fee Recovery Queue</h3>
              <p className="text-xs text-ink-muted">Automated WhatsApp &amp; SMS Debt Reminders</p>
            </div>

            <div className="mt-4 space-y-3">
              {overdues.map((o) => (
                <div key={o.id} className="rounded-2xl border border-line bg-surface-raised p-3.5 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-ink block">{o.student}</span>
                      <span className="font-mono text-[11px] text-ink-muted">Class: {o.classGroup}</span>
                      <span className="font-mono text-[10px] text-danger font-bold block mt-0.5">
                        {o.daysOverdue} days past due
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-sm font-extrabold text-danger block">{o.amountDue}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-line pt-2">
                    <span className="font-mono text-[10px] text-ink-muted">{o.guardianPhone}</span>
                    {o.reminded ? (
                      <span className="font-mono text-[10px] font-bold text-success flex items-center gap-1">
                        <CheckCircle2 className="size-3" />
                        Reminder Sent
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSendReminder(o.id)}
                        className="inline-flex items-center gap-1 rounded-lg bg-primary-light px-2.5 py-1 font-mono text-[10px] font-bold text-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        <Send className="size-3" />
                        <span>Send SMS Alert</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
