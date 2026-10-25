"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Landmark,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  ArrowRightLeft,
  Download,
  Building2,
  FileCheck,
  CreditCard,
  DollarSign,
  HelpCircle,
} from "lucide-react";

interface ReconciliationRecord {
  id: string;
  source: "Paystack Batch" | "Zenith Bank Statement" | "Internal Invoicing";
  reference: string;
  description: string;
  date: string;
  ledgerAmount: number;
  bankAmount: number;
  variance: number;
  status: "matched" | "variance" | "unmatched";
}

export default function BursarReconciliationPage() {
  const [filter, setFilter] = useState<"all" | "matched" | "variance" | "unmatched">("all");
  const [isReconciling, setIsReconciling] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [records, setRecords] = useState<ReconciliationRecord[]>([
    {
      id: "rec-1",
      source: "Paystack Batch",
      reference: "PSTK-BATCH-2026-041",
      description: "Paystack Daily Automatic Payout #041 to Zenith Bank",
      date: "Today, 06:00 AM",
      ledgerAmount: 4245000,
      bankAmount: 4245000,
      variance: 0,
      status: "matched",
    },
    {
      id: "rec-2",
      source: "Zenith Bank Statement",
      reference: "ZN-DEP-884192",
      description: "Direct Wire Transfer - Alhaji Bello Yusuf (Amina Yusuf)",
      date: "Today, 09:12 AM",
      ledgerAmount: 210000,
      bankAmount: 210000,
      variance: 0,
      status: "matched",
    },
    {
      id: "rec-3",
      source: "Zenith Bank Statement",
      reference: "ZN-DEP-884199",
      description: "Direct Teller Deposit - Unidentified Parent (Zenith Ikeja Br.)",
      date: "Yesterday, 03:40 PM",
      ledgerAmount: 0,
      bankAmount: 185000,
      variance: 185000,
      status: "unmatched",
    },
    {
      id: "rec-4",
      source: "Paystack Batch",
      reference: "PSTK-BATCH-2026-040",
      description: "Paystack Settlement Batch #040 (Net of ₦2,000 charge fee)",
      date: "Yesterday, 06:00 AM",
      ledgerAmount: 3850000,
      bankAmount: 3848000,
      variance: -2000,
      status: "variance",
    },
    {
      id: "rec-5",
      source: "Internal Invoicing",
      reference: "POS-SETTLE-091",
      description: "Campus Bursary Desk Physical POS EOD Batch",
      date: "Jan 23, 2026",
      ledgerAmount: 540000,
      bankAmount: 540000,
      variance: 0,
      status: "matched",
    },
  ]);

  const handleRunReconciliation = () => {
    setIsReconciling(true);
    setTimeout(() => {
      setIsReconciling(false);
      setToast("Algorithmic Auto-Match complete. 124 records verified against Zenith Bank API statement feed.");
    }, 1400);
  };

  const filtered = records.filter(
    (item) => filter === "all" || item.status === filter
  );

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <Landmark className="w-4 h-4" />
              Bursary Division · Treasury Ledger Reconciliation
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Bank & Gateway Reconciliation
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Three-way matching between Campus360 student ledgers, Paystack payouts, and Zenith Bank statements.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRunReconciliation}
              disabled={isReconciling}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isReconciling ? "animate-spin" : ""}`} />
              {isReconciling ? "Reconciling..." : "Run Auto-Match Algorithm"}
            </button>
            <button
              onClick={() => alert("Reconciliation Audit Certificate generated for external school auditors.")}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4 text-muted-foreground" />
              Audit Report
            </button>
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

        {/* Three-Way Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Campus360 Ledger</span>
              <FileCheck className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-foreground">₦108,420,000</div>
            <div className="text-xs text-muted-foreground mt-1">Total receipts posted in term</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Zenith Bank Main Account</span>
              <Building2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600">₦108,603,000</div>
            <div className="text-xs text-muted-foreground mt-1">Acct #102938472 · Verified Feed</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Net Variance / Unassigned</span>
              <ArrowRightLeft className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">+₦183,000</div>
            <div className="text-xs text-muted-foreground mt-1">1 unidentified teller deposit to claim</div>
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2 bg-canvas border border-border rounded-xl p-1 text-xs">
            {(["all", "matched", "variance", "unmatched"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition ${
                  filter === tab
                    ? "bg-amber-600 text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <span className="text-xs text-muted-foreground">
            Reconciliation Health: <span className="font-bold text-emerald-600">99.4% Matched</span>
          </span>
        </div>

        {/* Ledger Reconciliation Table */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Transaction / Batch</th>
                  <th className="py-3 px-4">Feed Source</th>
                  <th className="py-3 px-4 text-right">Ledger Value</th>
                  <th className="py-3 px-4 text-right">Bank Statement</th>
                  <th className="py-3 px-4 text-right">Variance</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-foreground">{item.description}</div>
                      <div className="text-xs font-mono text-muted-foreground">{item.reference} · {item.date}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-1 rounded-md text-xs font-medium bg-canvas border border-border text-foreground">
                        {item.source}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-foreground">
                      ₦{item.ledgerAmount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-emerald-600">
                      ₦{item.bankAmount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold">
                      {item.variance === 0 ? (
                        <span className="text-emerald-600">₦0</span>
                      ) : item.variance > 0 ? (
                        <span className="text-amber-600">+₦{item.variance.toLocaleString()}</span>
                      ) : (
                        <span className="text-rose-600">-₦{Math.abs(item.variance).toLocaleString()}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {item.status === "matched" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> Matched
                        </span>
                      )}
                      {item.status === "variance" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800">
                          <AlertCircle className="w-3 h-3" /> Fee Variance
                        </span>
                      )}
                      {item.status === "unmatched" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800">
                          <HelpCircle className="w-3 h-3" /> Unmatched
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {item.status === "unmatched" ? (
                        <button
                          onClick={() => alert(`Opening manual invoice allocator for bank deposit ${item.reference}`)}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium transition"
                        >
                          Assign Student
                        </button>
                      ) : (
                        <button
                          onClick={() => alert(`Reconciliation breakdown for ${item.reference} audited.`)}
                          className="px-2.5 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition"
                        >
                          Audit Slip
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
