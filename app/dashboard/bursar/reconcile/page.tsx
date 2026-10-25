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
  Lock,
  Unlock,
  ShieldCheck,
  FileSpreadsheet,
  Upload,
  UserCheck,
  CheckSquare,
  AlertTriangle,
  Clock,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

interface ReconciliationRecord {
  id: string;
  source: "Gateway Settlement" | "Bank Direct Wire" | "Physical Cash Drawer" | "Mobile Money";
  reference: string;
  description: string;
  date: string;
  ledgerAmount: number;
  bankAmount: number;
  variance: number;
  status: "matched" | "variance" | "unmatched";
  matchedBy?: string;
  notes?: string;
}

interface CashierShift {
  id: string;
  cashierName: string;
  counterId: string;
  date: string;
  systemTotal: number;
  countedCash: number;
  variance: number;
  status: "balanced" | "shortage" | "overage" | "pending_review";
  auditedBy?: string;
}

export default function BursarReconciliationPage() {
  const [activeTab, setActiveTab] = useState<"statement_matching" | "cashier_drawers" | "period_closing">("statement_matching");
  const [filter, setFilter] = useState<"all" | "matched" | "variance" | "unmatched">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isReconciling, setIsReconciling] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<ReconciliationRecord | null>(null);
  const [varianceReason, setVarianceReason] = useState("Gateway Transaction Processing Fee ($24.50 deducted by gateway processor)");
  const [periodLocked, setPeriodLocked] = useState(false);
  const [lockModalOpen, setLockModalOpen] = useState(false);
  const [lockTimestamp, setLockTimestamp] = useState<string | null>("Jan 15, 2026, 05:30 PM by Bursar (BURS-001)");

  const [records, setRecords] = useState<ReconciliationRecord[]>([
    {
      id: "REC-2026-001",
      source: "Gateway Settlement",
      reference: "PSTK-BATCH-2026-041",
      description: "Paystack Card / Web Checkout Net Settlement Batch #041",
      date: "Today, 06:00 AM",
      ledgerAmount: 18450.0,
      bankAmount: 18450.0,
      variance: 0.0,
      status: "matched",
      matchedBy: "Auto-Reconcile Bot v2.4",
      notes: "Direct settlement credited to Chase Operating Account *8812.",
    },
    {
      id: "REC-2026-002",
      source: "Bank Direct Wire",
      reference: "CHASE-WIRE-884192",
      description: "Direct ACH Wire — Marcus Sterling (Student: David Sterling)",
      date: "Today, 09:12 AM",
      ledgerAmount: 1450.0,
      bankAmount: 1450.0,
      variance: 0.0,
      status: "matched",
      matchedBy: "J. Mensah (Bursar)",
      notes: "Matched to Invoice #INV-2026-001.",
    },
    {
      id: "REC-2026-003",
      source: "Bank Direct Wire",
      reference: "CHASE-DEP-99104",
      description: "Counter Teller Cash Wire Deposit — Unspecified Reference",
      date: "Yesterday, 03:40 PM",
      ledgerAmount: 0.0,
      bankAmount: 1250.0,
      variance: 1250.0,
      status: "unmatched",
      notes: "Deposited at Downtown branch without student admission number.",
    },
    {
      id: "REC-2026-004",
      source: "Gateway Settlement",
      reference: "FLW-PAYOUT-088",
      description: "Flutterwave / Apple Pay Terminal Batch #088 (Net fee variance)",
      date: "Yesterday, 06:00 AM",
      ledgerAmount: 6400.0,
      bankAmount: 6375.5,
      variance: -24.5,
      status: "variance",
      notes: "Discrepancy due to gateway interchange fee $24.50.",
    },
    {
      id: "REC-2026-005",
      source: "Physical Cash Drawer",
      reference: "CASH-EOD-0124",
      description: "Admin Bursary Window #1 Cash Drawer Handover (Jan 24)",
      date: "Jan 24, 2026",
      ledgerAmount: 3450.0,
      bankAmount: 3450.0,
      variance: 0.0,
      status: "matched",
      matchedBy: "Senior Auditor O. Adeleke",
      notes: "Sealed tamper-proof bag #9901 banked at 04:30 PM.",
    },
    {
      id: "REC-2026-006",
      source: "Mobile Money",
      reference: "MPESA-STMT-4401",
      description: "M-Pesa / Mobile Wallet Direct Merchant Aggregation Settlement",
      date: "Jan 23, 2026",
      ledgerAmount: 2180.0,
      bankAmount: 2180.0,
      variance: 0.0,
      status: "matched",
      matchedBy: "Auto-Reconcile Bot v2.4",
      notes: "Bulk settlement from 12 student lunch/bus top-ups.",
    },
  ]);

  const [cashierShifts, setCashierShifts] = useState<CashierShift[]>([
    {
      id: "SHIFT-091",
      cashierName: "Grace Temitope (Cashier Desk #1)",
      counterId: "Counter 1 — Main Admin Hall",
      date: "Today (Session 1: 08:00 - 16:00)",
      systemTotal: 2850.0,
      countedCash: 2850.0,
      variance: 0.0,
      status: "balanced",
      auditedBy: "J. Mensah (Bursar)",
    },
    {
      id: "SHIFT-092",
      cashierName: "David O. Okafor (Cashier Desk #2)",
      counterId: "Counter 2 — Boarding House Admissions",
      date: "Today (Session 1: 08:00 - 16:00)",
      systemTotal: 1950.0,
      countedCash: 1950.0,
      variance: 0.0,
      status: "balanced",
      auditedBy: "J. Mensah (Bursar)",
    },
    {
      id: "SHIFT-093",
      cashierName: "Amina Al-Hassan (Express Window)",
      counterId: "Counter 3 — Uniform & Book Depot",
      date: "Yesterday (EOD Closing)",
      systemTotal: 840.0,
      countedCash: 830.0,
      variance: -10.0,
      status: "shortage",
      auditedBy: "Pending Bursar Sign-off",
    },
  ]);

  const handleRunReconciliation = () => {
    setIsReconciling(true);
    setTimeout(() => {
      setIsReconciling(false);
      setToast("Algorithmic 3-way match complete. 182 records verified against Chase Bank API statement feed.");
    }, 1200);
  };

  const handleResolveVariance = () => {
    if (!selectedRecord) return;
    setRecords((prev) =>
      prev.map((r) =>
        r.id === selectedRecord.id
          ? {
              ...r,
              status: "matched",
              variance: 0,
              notes: `Variance resolved: ${varianceReason} (Signed off by Bursar)`,
              matchedBy: "J. Mensah (Bursar Sign-off)",
            }
          : r
      )
    );
    setSelectedRecord(null);
    setToast(`Record ${selectedRecord.reference} variance successfully adjusted and booked to financial fees account.`);
  };

  const handleToggleLockPeriod = () => {
    if (periodLocked) {
      setPeriodLocked(false);
      setLockTimestamp(null);
      setToast("Financial period unlocked. Authorizations permitted for adjustment journals.");
    } else {
      setPeriodLocked(true);
      const nowStr = new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setLockTimestamp(`${nowStr} by Bursar (BURS-001)`);
      setToast("Term 1 2025/2026 financial records locked. No retroactive receipt or invoice edits permitted.");
    }
    setLockModalOpen(false);
  };

  const filteredRecords = records.filter((item) => {
    const matchesFilter = filter === "all" || item.status === filter;
    const matchesSearch =
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <Landmark className="w-4 h-4" />
              Treasury Operations · Internal Controls & Segregation of Duties
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Financial Reconciliation & Verification
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Three-way matching between Campus360 student receipts, bank statement feeds, and physical cashier drawers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleRunReconciliation}
              disabled={isReconciling}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isReconciling ? "animate-spin" : ""}`} />
              {isReconciling ? "Verifying Feeds..." : "Run Auto-Match Algorithm"}
            </button>

            <button
              onClick={() => setLockModalOpen(true)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm shadow-sm transition ${
                periodLocked
                  ? "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800"
                  : "bg-card border border-border hover:bg-muted text-foreground"
              }`}
            >
              {periodLocked ? <Lock className="w-4 h-4 text-rose-600" /> : <Unlock className="w-4 h-4 text-emerald-600" />}
              {periodLocked ? "Period Locked" : "Lock Books"}
            </button>

            <button
              onClick={() => {
                alert("Downloading Certified Reconciliation Report (CSV & PDF signed by Bursar)...");
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4 text-muted-foreground" />
              Audit Certificate
            </button>
          </div>
        </div>

        {/* Toast Notification */}
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

        {/* Period Lock Status Banner */}
        {periodLocked && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-foreground">Term 1 2025/2026 Books Finalized & Period Locked.</span>{" "}
              <span className="text-muted-foreground">
                Locked on {lockTimestamp}. All adjustments require School Owner supervisory authorization override.
              </span>
            </div>
          </div>
        )}

        {/* Accounting Core Distinction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Campus360 Ledger</span>
              <FileCheck className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-foreground">US$ 1,048,450.00</div>
            <div className="text-xs text-muted-foreground mt-1">Total receipts posted in term</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Chase Bank Operating Acct</span>
              <Building2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600">US$ 1,045,250.00</div>
            <div className="text-xs text-muted-foreground mt-1">Acct *8812 · Verified Statement Feed</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Gateway Settlement Clearing</span>
              <CreditCard className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="text-2xl font-black text-cyan-600">US$ 1,950.00</div>
            <div className="text-xs text-muted-foreground mt-1">T+1 automated rolling settlement</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Unidentified / Variance</span>
              <ArrowRightLeft className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">US$ 1,225.50</div>
            <div className="text-xs text-muted-foreground mt-1">1 unmatched wire + $24.50 fee variance</div>
          </div>
        </div>

        {/* Tab Switching */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("statement_matching")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "statement_matching"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Bank & Gateway Three-Way Matching
          </button>
          <button
            onClick={() => setActiveTab("cashier_drawers")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "cashier_drawers"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Cashier Drawer Daily Sign-Off
          </button>
          <button
            onClick={() => setActiveTab("period_closing")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "period_closing"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Period Closing & Audit Trail
          </button>
        </div>

        {/* TAB 1: Statement Matching */}
        {activeTab === "statement_matching" && (
          <div className="space-y-4">
            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-1 text-xs">
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

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search ref, source or batch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Reconciliation Table */}
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
                      <th className="py-3 px-4 text-center">Audit Status</th>
                      <th className="py-3 px-4 text-right">Internal Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredRecords.map((item) => (
                      <tr key={item.id} className="hover:bg-canvas/50 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-foreground">{item.description}</div>
                          <div className="text-xs font-mono text-muted-foreground">
                            {item.reference} · {item.date}
                          </div>
                          {item.notes && (
                            <div className="text-[11px] text-muted-foreground/80 mt-0.5 italic">
                              Note: {item.notes}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-1 rounded-md text-xs font-medium bg-canvas border border-border text-foreground">
                            {item.source}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-medium text-foreground">
                          US$ {item.ledgerAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3.5 px-4 text-right font-semibold text-emerald-600">
                          US$ {item.bankAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold">
                          {item.variance === 0 ? (
                            <span className="text-emerald-600">US$ 0.00</span>
                          ) : item.variance > 0 ? (
                            <span className="text-amber-600">
                              +US$ {item.variance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </span>
                          ) : (
                            <span className="text-rose-600">
                              -US$ {Math.abs(item.variance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </span>
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
                          {item.status === "variance" ? (
                            <button
                              onClick={() => setSelectedRecord(item)}
                              className="px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium transition"
                            >
                              Resolve Fee
                            </button>
                          ) : item.status === "unmatched" ? (
                            <button
                              onClick={() => {
                                alert(`Opening student ledger matching interface for unreferenced bank wire ${item.reference}`);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium transition"
                            >
                              Match Student
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                alert(`Audit Certificate #${item.id}\nVerified By: ${item.matchedBy || "Bursar"}\nRef: ${item.reference}\nNo discrepancies identified.`);
                              }}
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
        )}

        {/* TAB 2: Cashier Drawers */}
        {activeTab === "cashier_drawers" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-foreground">Physical Cashier Desk Verification</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Segregation of duties: Cash counter receipts entered by Cashier must be audited and balanced by the Bursar before bank courier dispatch.
                </p>
              </div>
              <button
                onClick={() => {
                  alert("Initiating new cash counter session for bursary windows.");
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                Open Cash Counter Shift
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cashierShifts.map((shift) => (
                <div key={shift.id} className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-600">{shift.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                        shift.status === "balanced"
                          ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                          : "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800"
                      }`}
                    >
                      {shift.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-foreground">{shift.cashierName}</h4>
                    <p className="text-xs text-muted-foreground">{shift.counterId}</p>
                    <p className="text-[11px] text-muted-foreground/70 mt-1">{shift.date}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-canvas border border-border text-xs">
                    <div>
                      <span className="text-muted-foreground block text-[11px]">System Receipts</span>
                      <span className="font-bold text-foreground">
                        US$ {shift.systemTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Physical Drawer</span>
                      <span className="font-bold text-emerald-600">
                        US$ {shift.countedCash.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  {shift.variance !== 0 && (
                    <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
                      Discrepancy: -US$ {Math.abs(shift.variance).toFixed(2)} (Cash Shortage detected)
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
                    <span className="text-muted-foreground">Bursar Sign-off:</span>
                    <span className="font-semibold text-foreground">{shift.auditedBy}</span>
                  </div>

                  <button
                    onClick={() => {
                      alert(`Cashier Shift ${shift.id} confirmed and locked into bank deposit manifest #BD-098.`);
                    }}
                    className="w-full py-2 rounded-xl bg-canvas border border-border hover:bg-muted text-foreground text-xs font-medium transition"
                  >
                    Generate Bank Deposit Slip
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Period Closing */}
        {activeTab === "period_closing" && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-foreground">Accounting Period Finalization & Safeguards</h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
                    Finalizing an accounting period locks all invoices, payments, and receipts. Once finalized, no staff member can backdate transactions or alter historical statements without external auditor & School Owner authorization.
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    periodLocked
                      ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800"
                      : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                  }`}
                >
                  {periodLocked ? "Current State: Books Locked" : "Current State: Open Period"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-canvas border border-border">
                  <span className="text-xs text-muted-foreground block">Active Academic Period</span>
                  <span className="text-sm font-bold text-foreground">2025/2026 — Term 1</span>
                </div>
                <div className="p-4 rounded-xl bg-canvas border border-border">
                  <span className="text-xs text-muted-foreground block">Last Reconciliation Audit</span>
                  <span className="text-sm font-bold text-foreground">Jan 25, 2026 (100% Cleared)</span>
                </div>
                <div className="p-4 rounded-xl bg-canvas border border-border">
                  <span className="text-xs text-muted-foreground block">Supervisory Approver</span>
                  <span className="text-sm font-bold text-foreground">School Owner & Board Audit</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  onClick={() => setLockModalOpen(true)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition ${
                    periodLocked
                      ? "bg-rose-600 hover:bg-rose-700 text-white"
                      : "bg-amber-600 hover:bg-amber-700 text-white"
                  }`}
                >
                  {periodLocked ? "Request Owner Unlock Override" : "Finalize & Lock Current Term Books"}
                </button>

                <button
                  onClick={() => alert("Exporting General Ledger Reconciliation Package for External Audit...")}
                  className="px-4 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground text-xs sm:text-sm font-semibold transition"
                >
                  Export Audit Trail Package (ZIP / PDF)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Resolve Variance */}
        {selectedRecord && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-foreground text-base">Resolve Fee Variance</h3>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <div>
                  <span className="font-semibold text-foreground">Reference:</span> {selectedRecord.reference}
                </div>
                <div>
                  <span className="font-semibold text-foreground">Ledger Amount:</span> US${" "}
                  {selectedRecord.ledgerAmount.toFixed(2)}
                </div>
                <div>
                  <span className="font-semibold text-foreground">Bank Settlement Amount:</span> US${" "}
                  {selectedRecord.bankAmount.toFixed(2)}
                </div>
                <div>
                  <span className="font-semibold text-foreground">Discrepancy Variance:</span> US${" "}
                  {selectedRecord.variance.toFixed(2)}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Accounting Disposition / Fee Justification
                </label>
                <select
                  value={varianceReason}
                  onChange={(e) => setVarianceReason(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-canvas border border-border text-foreground focus:ring-2 focus:ring-amber-500/30"
                >
                  <option value="Gateway Transaction Processing Fee ($24.50 deducted by gateway processor)">
                    Gateway Transaction Processing Fee ($24.50 deducted by gateway processor)
                  </option>
                  <option value="International Wire Transfer Intermediary Bank Levy">
                    International Wire Transfer Intermediary Bank Levy
                  </option>
                  <option value="Bank Stamp Duty & Electronic Transfer Levy">
                    Bank Stamp Duty & Electronic Transfer Levy
                  </option>
                  <option value="Merchant POS Daily Settlement Merchant Fee">
                    Merchant POS Daily Settlement Merchant Fee
                  </option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="px-3 py-2 rounded-xl text-xs font-medium border border-border hover:bg-muted text-foreground transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResolveVariance}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition"
                >
                  Approve Adjustment & Match
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Lock/Unlock Period */}
        {lockModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-foreground text-base">
                  {periodLocked ? "Unlock Financial Books" : "Finalize & Lock Financial Books"}
                </h3>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {periodLocked
                  ? "Unlocking historical financial periods requires authorized compliance justification. All retrospective edits will be flagged on the external auditor register."
                  : "Locking the accounting period locks all invoices, payment allocations, and receipt journals for Term 1 2025/2026. Only the School Owner or certified auditor can authorize reversals thereafter."}
              </p>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300">
                Audited Signatory: Bursar & Head of Accounts (Bursar Key: #BURS-001)
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => setLockModalOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-medium border border-border hover:bg-muted text-foreground transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleToggleLockPeriod}
                  className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition ${
                    periodLocked ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
                  }`}
                >
                  {periodLocked ? "Confirm Period Unlock" : "Confirm Period Lock"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
