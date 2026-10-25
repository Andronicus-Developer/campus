"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Receipt,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  CreditCard,
  Building,
  Smartphone,
  Landmark,
  ArrowDownLeft,
  ExternalLink,
  PlusCircle,
  RefreshCw,
} from "lucide-react";

interface PaymentTransaction {
  id: string;
  reference: string;
  gateway: "Paystack Card" | "Paystack Transfer" | "Paystack USSD" | "Direct Bank Wire" | "POS Terminal";
  studentName: string;
  studentId: string;
  classArm: string;
  payerName: string;
  amount: number;
  feeType: string;
  channelFee: number;
  settledAmount: number;
  timestamp: string;
  status: "success" | "pending" | "failed";
}

export default function BursarPaymentsPage() {
  const [search, setSearch] = useState("");
  const [channelFilter, setChannelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "success" | "pending" | "failed">("all");
  const [selectedTx, setSelectedTx] = useState<PaymentTransaction | null>(null);

  const [transactions, setTransactions] = useState<PaymentTransaction[]>([
    {
      id: "tx-1",
      reference: "PSTK_2026_098231",
      gateway: "Paystack Card",
      studentName: "Tobi Adeleke",
      studentId: "RC-2023-0184",
      classArm: "SSS 2A",
      payerName: "Mrs. Zainab Adeleke",
      amount: 185000,
      feeType: "Term 2 Full Tuition & Levies",
      channelFee: 2000,
      settledAmount: 183000,
      timestamp: "Today, 11:24 AM",
      status: "success",
    },
    {
      id: "tx-2",
      reference: "PSTK_2026_098230",
      gateway: "Paystack Transfer",
      studentName: "Maryam Adeleke",
      studentId: "RC-2024-0091",
      classArm: "JSS 1C",
      payerName: "Mrs. Zainab Adeleke",
      amount: 100000,
      feeType: "Term 2 Part Installment",
      channelFee: 1500,
      settledAmount: 98500,
      timestamp: "Today, 10:48 AM",
      status: "success",
    },
    {
      id: "tx-3",
      reference: "BNK_WIRE_889211",
      gateway: "Direct Bank Wire",
      studentName: "Amina Yusuf",
      studentId: "RC-2022-0056",
      classArm: "SSS 3A",
      payerName: "Alhaji Bello Yusuf",
      amount: 210000,
      feeType: "Term 2 Boarding & Tuition",
      channelFee: 0,
      settledAmount: 210000,
      timestamp: "Today, 09:12 AM",
      status: "success",
    },
    {
      id: "tx-4",
      reference: "PSTK_2026_098229",
      gateway: "Paystack USSD",
      studentName: "Daniel Babatunde",
      studentId: "RC-2024-0312",
      classArm: "JSS 2A",
      payerName: "Engr. F. Babatunde",
      amount: 80000,
      feeType: "Term 2 Tuition (1st Tranche)",
      channelFee: 1200,
      settledAmount: 78800,
      timestamp: "Yesterday, 04:30 PM",
      status: "success",
    },
    {
      id: "tx-5",
      reference: "POS_TER_774102",
      gateway: "POS Terminal",
      studentName: "David Adeleke",
      studentId: "RC-2025-0104",
      classArm: "Basic 4",
      payerName: "Dr. K. Adeleke",
      amount: 95000,
      feeType: "Primary Tuition & Uniform",
      channelFee: 500,
      settledAmount: 94500,
      timestamp: "Yesterday, 02:10 PM",
      status: "success",
    },
    {
      id: "tx-6",
      reference: "PSTK_2026_098220",
      gateway: "Paystack Card",
      studentName: "Chinedu Eze",
      studentId: "RC-2023-0210",
      classArm: "SSS 2B",
      payerName: "Mr. Jude Eze",
      amount: 185000,
      feeType: "Term 2 Tuition",
      channelFee: 2000,
      settledAmount: 0,
      timestamp: "Yesterday, 11:05 AM",
      status: "failed",
    },
  ]);

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.reference.toLowerCase().includes(search.toLowerCase()) ||
      t.studentName.toLowerCase().includes(search.toLowerCase()) ||
      t.payerName.toLowerCase().includes(search.toLowerCase()) ||
      t.studentId.toLowerCase().includes(search.toLowerCase());
    const matchesChannel = channelFilter === "all" || t.gateway.includes(channelFilter);
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesChannel && matchesStatus;
  });

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <Receipt className="w-4 h-4" />
              Bursary Division · Real-Time Payment Inflows
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Payment Inflows & Transactions
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Live settlement ledger connecting Paystack digital checkouts, bank transfers, and campus POS payments.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Simulating Paystack webhook sync... 3 new settlements captured.")}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <RefreshCw className="w-4 h-4 text-amber-600" />
              Sync Paystack
            </button>
            <button
              onClick={() => alert("Downloading payment settlement log as Excel")}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              Export Inflow Register
            </button>
          </div>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Today's Collections</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">₦4,245,000</div>
            <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-semibold">+18.5%</span> vs yesterday
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Term 2 Total Settled</div>
            <div className="text-xl sm:text-2xl font-black text-foreground mt-1">₦108,420,000</div>
            <div className="text-[11px] text-muted-foreground mt-1">694 settled transactions</div>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Paystack Automated Payouts</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">₦92,150,000</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Direct to Zenith Bank #102938472</div>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Gateway Surcharge Capped</div>
            <div className="text-xl sm:text-2xl font-black text-foreground mt-1">₦348,200</div>
            <div className="text-[11px] text-muted-foreground mt-1">Absorbed by school tech levy</div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reference, student name, payer, or ID..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-canvas border border-border focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-canvas border border-border text-foreground focus:outline-none"
            >
              <option value="all">All Channels</option>
              <option value="Card">Paystack Card</option>
              <option value="Transfer">Paystack Transfer</option>
              <option value="USSD">Paystack USSD</option>
              <option value="Wire">Direct Bank Wire</option>
              <option value="POS">POS Terminal</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 text-xs rounded-xl bg-canvas border border-border text-foreground focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="success">Successful</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed / Declined</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Gateway Reference</th>
                  <th className="py-3 px-4">Student & Class</th>
                  <th className="py-3 px-4">Payer Details</th>
                  <th className="py-3 px-4">Channel / Method</th>
                  <th className="py-3 px-4 text-right">Gross Inflow</th>
                  <th className="py-3 px-4 text-right">Net Settled</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((tx) => (
                  <tr key={tx.id} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-semibold text-foreground">{tx.reference}</div>
                      <div className="text-[10px] text-muted-foreground">{tx.timestamp}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-foreground">{tx.studentName}</div>
                      <div className="text-xs text-muted-foreground">{tx.studentId} · {tx.classArm}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-foreground">{tx.payerName}</div>
                      <div className="text-xs text-muted-foreground">{tx.feeType}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-canvas border border-border text-foreground">
                        {tx.gateway.includes("Card") && <CreditCard className="w-3.5 h-3.5 text-blue-500" />}
                        {tx.gateway.includes("Transfer") && <Landmark className="w-3.5 h-3.5 text-emerald-500" />}
                        {tx.gateway.includes("USSD") && <Smartphone className="w-3.5 h-3.5 text-amber-500" />}
                        {tx.gateway.includes("Wire") && <Building className="w-3.5 h-3.5 text-purple-500" />}
                        {tx.gateway.includes("POS") && <Receipt className="w-3.5 h-3.5 text-slate-500" />}
                        {tx.gateway}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-foreground">
                      ₦{tx.amount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-600">
                      ₦{tx.settledAmount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {tx.status === "success" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> Settled
                        </span>
                      )}
                      {tx.status === "pending" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800">
                          <Clock className="w-3 h-3" /> Processing
                        </span>
                      )}
                      {tx.status === "failed" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800">
                          <AlertCircle className="w-3 h-3" /> Failed
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedTx(tx)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-medium text-foreground transition"
                      >
                        <Receipt className="w-3.5 h-3.5 text-amber-600" />
                        Slip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Receipt Voucher Modal */}
        {selectedTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="text-center pb-3 border-b border-border">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-xs uppercase font-bold text-emerald-600 tracking-wider">Payment Verified</div>
                <h3 className="text-lg font-bold text-foreground">Official E-Payment Receipt</h3>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">{selectedTx.reference}</p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-border space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student Name:</span>
                  <span className="font-semibold text-foreground">{selectedTx.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student ID / Arm:</span>
                  <span className="text-foreground">{selectedTx.studentId} · {selectedTx.classArm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payer Name:</span>
                  <span className="text-foreground">{selectedTx.payerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Channel:</span>
                  <span className="font-medium text-foreground">{selectedTx.gateway}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction Time:</span>
                  <span className="text-foreground">{selectedTx.timestamp}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border text-sm font-black">
                  <span>Amount Settled:</span>
                  <span className="text-emerald-600">₦{selectedTx.amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => alert(`Official cryptographic PDF receipt downloaded for ${selectedTx.reference}`)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium"
                >
                  Download PDF Receipt
                </button>
                <button
                  onClick={() => setSelectedTx(null)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
