"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  ClockAlert,
  Search,
  Filter,
  Send,
  PhoneCall,
  Download,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  FileText,
  DollarSign,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  Plus,
} from "lucide-react";

interface DebtorItem {
  id: string;
  studentName: string;
  studentId: string;
  classArm: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  balance: number;
  agingDays: number;
  bucket: "0-30" | "31-60" | "60+";
  lastPaymentDate: string;
  promisedDate?: string;
  status: "first-notice" | "second-notice" | "final-demand" | "payment-plan";
}

export default function BursarDebtRecoveryPage() {
  const [bucketFilter, setBucketFilter] = useState<"all" | "0-30" | "31-60" | "60+">("all");
  const [search, setSearch] = useState("");
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [selectedDebtor, setSelectedDebtor] = useState<DebtorItem | null>(null);
  const [promisedDate, setPromisedDate] = useState("");
  const [planNotes, setPlanNotes] = useState("");

  const [debtors, setDebtors] = useState<DebtorItem[]>([
    {
      id: "deb-1",
      studentName: "Chinedu Eze",
      studentId: "RC-2023-0210",
      classArm: "SSS 2B",
      guardianName: "Mr. Jude Eze",
      guardianPhone: "+234 802 889 1234",
      guardianEmail: "jude.eze@gmail.com",
      balance: 1450,
      agingDays: 42,
      bucket: "31-60",
      lastPaymentDate: "Nov 12, 2025",
      promisedDate: "Feb 20, 2026",
      status: "payment-plan",
    },
    {
      id: "deb-2",
      studentName: "Emeka Okafor",
      studentId: "RC-2023-0112",
      classArm: "JSS 3A",
      guardianName: "Mrs. Nneka Okafor",
      guardianPhone: "+234 803 111 8892",
      guardianEmail: "nneka.okafor@yahoo.com",
      balance: 980,
      agingDays: 68,
      bucket: "60+",
      lastPaymentDate: "Oct 28, 2025",
      status: "final-demand",
    },
    {
      id: "deb-3",
      studentName: "Somtochukwu Eze",
      studentId: "RC-2023-0215",
      classArm: "SSS 2A",
      guardianName: "Mr. Somto Eze Sr.",
      guardianPhone: "+234 803 445 1029",
      guardianEmail: "somto.sr@gmail.com",
      balance: 1450,
      agingDays: 24,
      bucket: "0-30",
      lastPaymentDate: "Jan 05, 2026",
      status: "first-notice",
    },
    {
      id: "deb-4",
      studentName: "Kehinde Alabi",
      studentId: "RC-2023-0231",
      classArm: "JSS 1 Gold",
      guardianName: "Dr. Taiwo Alabi",
      guardianPhone: "+234 818 900 3341",
      guardianEmail: "taiwo.alabi@gmail.com",
      balance: 1100,
      agingDays: 32,
      bucket: "31-60",
      lastPaymentDate: "Dec 10, 2025",
      status: "second-notice",
    },
  ]);

  const handleSendReminder = (d: DebtorItem) => {
    alert(`Polite, respectful payment notice dispatched to ${d.guardianName} (${d.guardianPhone}) via SMS & WhatsApp.`);
  };

  const handleSavePaymentPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDebtor || !promisedDate) return;

    setDebtors((prev) =>
      prev.map((d) =>
        d.id === selectedDebtor.id
          ? {
              ...d,
              status: "payment-plan",
              promisedDate: promisedDate,
            }
          : d
      )
    );

    setPlanModalOpen(false);
    setPromisedDate("");
    setPlanNotes("");
    alert(`Approved payment arrangement recorded for ${selectedDebtor.studentName}. Promised settlement date: ${promisedDate}.`);
  };

  const filtered = debtors.filter((d) => {
    const matchesSearch =
      d.studentName.toLowerCase().includes(search.toLowerCase()) ||
      d.guardianName.toLowerCase().includes(search.toLowerCase()) ||
      d.studentId.toLowerCase().includes(search.toLowerCase());
    const matchesBucket = bucketFilter === "all" || d.bucket === bucketFilter;
    return matchesSearch && matchesBucket;
  });

  const totalOutstanding = debtors.reduce((acc, d) => acc + d.balance, 0);

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 mb-1">
              <ClockAlert className="size-4" />
              Bursar Portal · Receivables Recovery &amp; Debt Aging
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Outstanding Balances &amp; Debt Aging
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Monitor overdue invoices across 30, 60, and 90+ day aging buckets, manage payment arrangements, and dispatch reminders.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Comprehensive Debt Aging Report (Excel & PDF) downloaded.")}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="size-4 text-rose-600" />
              Aging Report (Excel)
            </button>
          </div>
        </div>

        {/* Privacy & Professional Reminders Policy Notice */}
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs flex items-start gap-3">
          <ShieldCheck className="size-5 text-cyan-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-ink-soft">
            <span className="font-bold text-ink block">Respectful &amp; Privacy-Compliant Debt Protocol</span>
            <p>
              In accordance with educational child protection policies, student debt status must never be disclosed
              publicly, announced in classrooms, or shared with unauthorized third parties. Reminders are sent directly
              and privately to registered guardians.
            </p>
          </div>
        </div>

        {/* Debt Aging Buckets */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-card border border-border shadow-xs space-y-1">
            <span className="text-xs font-medium text-muted-foreground block">Total Outstanding Debt</span>
            <span className="text-2xl font-black text-rose-600 block mt-1">
              US$ {totalOutstanding.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[10px] text-muted-foreground">4 Active Overdue Accounts</span>
          </div>

          <div className="p-5 rounded-3xl bg-card border border-border shadow-xs space-y-1">
            <span className="text-xs font-medium text-muted-foreground block">Current (0-30 Days)</span>
            <span className="text-2xl font-black text-amber-500 block mt-1">US$ 1,450.00</span>
            <span className="text-[10px] text-amber-600 font-semibold">1 Student · Soft Reminder</span>
          </div>

          <div className="p-5 rounded-3xl bg-card border border-border shadow-xs space-y-1">
            <span className="text-xs font-medium text-muted-foreground block">31 - 60 Days Aging</span>
            <span className="text-2xl font-black text-orange-600 block mt-1">US$ 2,550.00</span>
            <span className="text-[10px] text-orange-600 font-semibold">2 Students · Formal Notice</span>
          </div>

          <div className="p-5 rounded-3xl bg-card border border-border shadow-xs space-y-1">
            <span className="text-xs font-medium text-muted-foreground block">60+ Days (High Risk)</span>
            <span className="text-2xl font-black text-rose-700 block mt-1">US$ 980.00</span>
            <span className="text-[10px] text-rose-700 font-bold">1 Student · Escalated to Principal</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student, guardian, or admission number..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-canvas border border-border focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-canvas border border-border rounded-xl p-1 text-xs">
            {(["all", "0-30", "31-60", "60+"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBucketFilter(b)}
                className={`px-3.5 py-1.5 rounded-lg capitalize font-medium transition ${
                  bucketFilter === b
                    ? "bg-rose-600 text-white shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {b === "all" ? "All Buckets" : `${b} Days`}
              </button>
            ))}
          </div>
        </div>

        {/* Debtors List */}
        <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Student &amp; Class</th>
                  <th className="py-3 px-4">Guardian Contact</th>
                  <th className="py-3 px-4 text-right">Balance Due</th>
                  <th className="py-3 px-4 text-center">Aging Bucket</th>
                  <th className="py-3 px-4">Arrangement / Promised</th>
                  <th className="py-3 px-4 text-center">Recovery Stage</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-foreground block">{d.studentName}</span>
                      <span className="text-[11px] text-muted-foreground font-mono">{d.studentId} · {d.classArm}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-foreground block">{d.guardianName}</span>
                      <span className="text-[11px] text-muted-foreground font-mono">{d.guardianPhone}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-rose-600">
                      US$ {d.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-canvas border border-border text-foreground">
                        {d.agingDays} Days ({d.bucket})
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {d.promisedDate ? (
                        <div className="space-y-0.5">
                          <span className="font-bold text-emerald-600 block text-[11px]">Plan Approved</span>
                          <span className="text-[10px] text-muted-foreground font-mono">Promised: {d.promisedDate}</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted-foreground italic">No arrangement logged</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          d.status === "payment-plan"
                            ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                            : d.status === "final-demand"
                            ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800"
                            : "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800"
                        }`}
                      >
                        {d.status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleSendReminder(d)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
                      >
                        <Send className="size-3" /> Remind
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDebtor(d);
                          setPlanModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border hover:bg-canvas text-xs font-semibold text-foreground"
                      >
                        Set Plan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Record Approved Payment Arrangement Modal */}
        {planModalOpen && selectedDebtor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface border border-line rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="size-5 text-amber-600" />
                  <h3 className="text-base font-extrabold text-ink">Record Payment Arrangement</h3>
                </div>
                <button
                  onClick={() => setPlanModalOpen(false)}
                  className="size-7 rounded-lg hover:bg-surface-raised flex items-center justify-center text-ink-muted"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                Log a mutually agreed installment plan or promised settlement date for{" "}
                <strong>{selectedDebtor.studentName}</strong> (Owing: US$ {selectedDebtor.balance.toFixed(2)}).
              </p>

              <form onSubmit={handleSavePaymentPlan} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-ink font-semibold mb-1">Promised Settlement Date</label>
                  <input
                    type="date"
                    required
                    value={promisedDate}
                    onChange={(e) => setPromisedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-1">Guardian Agreement Notes</label>
                  <textarea
                    rows={3}
                    value={planNotes}
                    onChange={(e) => setPlanNotes(e.target.value)}
                    placeholder="e.g. Guardian Mrs. Adeleke agreed on phone to clear outstanding balance on Friday payday..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setPlanModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line hover:bg-surface-raised font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold transition"
                  >
                    Save Arrangement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
