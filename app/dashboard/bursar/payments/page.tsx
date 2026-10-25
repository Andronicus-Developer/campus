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
  FileText,
  ShieldCheck,
  RotateCcw,
  Plus,
} from "lucide-react";

interface PaymentTransaction {
  id: string;
  reference: string;
  gateway: "Paystack Card" | "Paystack Transfer" | "Direct Bank Wire" | "POS Terminal" | "Cash Counter";
  studentName: string;
  studentId: string;
  classArm: string;
  payerName: string;
  amount: number;
  feeType: string;
  channelFee: number;
  settledAmount: number;
  timestamp: string;
  status: "success" | "pending" | "failed" | "unallocated";
  cashier?: string;
}

export default function BursarPaymentsPage() {
  const [search, setSearch] = useState("");
  const [channelFilter, setChannelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [recordModalOpen, setRecordModalOpen] = useState(false);

  // New manual payment record state
  const [recStudent, setRecStudent] = useState("Tobi Adeleke (RC-2023-0184)");
  const [recAmount, setRecAmount] = useState("");
  const [recChannel, setRecChannel] = useState<"Cash Counter" | "Direct Bank Wire" | "POS Terminal">("Cash Counter");
  const [recRef, setRecRef] = useState("");
  const [recPayer, setRecPayer] = useState("");

  const [transactions, setTransactions] = useState<PaymentTransaction[]>([
    {
      id: "tx-1",
      reference: "PSTK_2026_098231",
      gateway: "Paystack Card",
      studentName: "Tobi Adeleke",
      studentId: "RC-2023-0184",
      classArm: "SSS 2A",
      payerName: "Mrs. Zainab Adeleke",
      amount: 1450,
      feeType: "Term 2 Full Tuition & Levies",
      channelFee: 21.75,
      settledAmount: 1428.25,
      timestamp: "Today, 11:24 AM",
      status: "success",
    },
    {
      id: "tx-2",
      reference: "PSTK_2026_098230",
      gateway: "Paystack Transfer",
      studentName: "Sope Adeleke",
      studentId: "RC-2024-0312",
      classArm: "JSS 2 Blue",
      payerName: "Mrs. Zainab Adeleke",
      amount: 1100,
      feeType: "Term 2 Junior Secondary Tuition",
      channelFee: 16.50,
      settledAmount: 1083.50,
      timestamp: "Today, 10:48 AM",
      status: "success",
    },
    {
      id: "tx-3",
      reference: "BNK_WIRE_889211",
      gateway: "Direct Bank Wire",
      studentName: "Amina Yusuf",
      studentId: "RC-2023-0219",
      classArm: "JSS 3B",
      payerName: "Alhaji Bello Yusuf",
      amount: 1100,
      feeType: "Term 2 Tuition Settlement",
      channelFee: 0,
      settledAmount: 1100,
      timestamp: "Today, 09:12 AM",
      status: "success",
      cashier: "Mrs. Angela Nnamdi (BUR-005)",
    },
    {
      id: "tx-4",
      reference: "BUR_CSH_2026_014",
      gateway: "Cash Counter",
      studentName: "Chinedu Eze",
      studentId: "RC-2023-0210",
      classArm: "SSS 2B",
      payerName: "Mr. Jude Eze",
      amount: 450,
      feeType: "Bus Transit Shuttle (Lekki Zone)",
      channelFee: 0,
      settledAmount: 450,
      timestamp: "Yesterday, 03:30 PM",
      status: "success",
      cashier: "Cashier Box #1 (Bursary Counter)",
    },
    {
      id: "tx-5",
      reference: "ZN_UNM_992140",
      gateway: "Direct Bank Wire",
      studentName: "Unmatched Transfer",
      studentId: "UNKNOWN",
      classArm: "Pending Verification",
      payerName: "K. Alabi Enterprises",
      amount: 1100,
      feeType: "Unallocated Bank Deposit",
      channelFee: 0,
      settledAmount: 1100,
      timestamp: "Yesterday, 01:15 PM",
      status: "unallocated",
    },
  ]);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recAmount) return;

    const val = parseFloat(recAmount);
    const newTx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      reference: recRef || `BUR_${Date.now().toString().slice(-6)}`,
      gateway: recChannel,
      studentName: recStudent.split("(")[0].trim(),
      studentId: recStudent.includes("(") ? recStudent.split("(")[1].replace(")", "") : "RC-2023-0184",
      classArm: "SSS 2A",
      payerName: recPayer || "Guardian Depositor",
      amount: val,
      feeType: "Term 2 Fee Deposit",
      channelFee: 0,
      settledAmount: val,
      timestamp: "Just now",
      status: "success",
      cashier: "Mrs. Angela Nnamdi (BUR-005)",
    };

    setTransactions([newTx, ...transactions]);
    setRecordModalOpen(false);
    setRecAmount("");
    setRecRef("");
    setRecPayer("");
    alert(`Payment of US$ ${val.toFixed(2)} recorded successfully! Official Receipt generated with serial RC-REC-${Date.now().toString().slice(-4)}.`);
  };

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.studentName.toLowerCase().includes(search.toLowerCase()) ||
      tx.reference.toLowerCase().includes(search.toLowerCase()) ||
      tx.payerName.toLowerCase().includes(search.toLowerCase()) ||
      tx.studentId.toLowerCase().includes(search.toLowerCase());
    const matchesChannel = channelFilter === "all" || tx.gateway.toLowerCase().includes(channelFilter.toLowerCase());
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    return matchesSearch && matchesChannel && matchesStatus;
  });

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <Receipt className="size-4" />
              Bursar Portal · Multi-Channel Cash &amp; Digital Inflows
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Payment Inflow Ledger &amp; Collections
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Record physical counter cash, direct bank deposits, POS transactions, and automated Paystack callbacks.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Downloading verified payment transaction broadsheet (CSV & PDF)")}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="size-4 text-amber-600" />
              Export Inflow Ledger
            </button>
            <button
              onClick={() => setRecordModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Plus className="size-4" />
              Record Cash / Bank Deposit
            </button>
          </div>
        </div>

        {/* Server-Side Verification Safeguard Notice */}
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs flex items-start gap-3">
          <ShieldCheck className="size-5 text-cyan-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-ink-soft">
            <span className="font-bold text-ink block">Cryptographic Server-Side Payment Verification</span>
            <p>
              In compliance with financial audit standards, online gateway settlements rely exclusively on authenticated
              server-side provider callbacks (webhook SHA-256 HMAC) rather than browser-side redirect claims.
              Receipts are issued only upon confirmed fund clearance.
            </p>
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
              placeholder="Search by student, payer name, bank reference..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-canvas border border-border focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-canvas border border-border text-foreground text-xs font-semibold focus:outline-none"
            >
              <option value="all">All Channels</option>
              <option value="paystack">Paystack Gateway</option>
              <option value="bank">Direct Bank Wires</option>
              <option value="cash">Bursary Cash Counter</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-canvas border border-border text-foreground text-xs font-semibold focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="success">Verified (Cleared)</option>
              <option value="unallocated">Unallocated Wires</option>
            </select>
          </div>
        </div>

        {/* Payments Table */}
        <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Payment Ref</th>
                  <th className="py-3 px-4">Channel / Method</th>
                  <th className="py-3 px-4">Student &amp; Class</th>
                  <th className="py-3 px-4">Payer / Remitter</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-right">Net Settled</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((tx) => (
                  <tr key={tx.id} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-foreground">
                      {tx.reference}
                      <span className="block text-[10px] text-muted-foreground font-normal">{tx.timestamp}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-foreground block">{tx.gateway}</span>
                      {tx.cashier && (
                        <span className="text-[10px] text-muted-foreground block">By: {tx.cashier}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-foreground block">{tx.studentName}</span>
                      <span className="text-[11px] text-muted-foreground font-mono">{tx.studentId} · {tx.classArm}</span>
                    </td>
                    <td className="py-3.5 px-4 text-foreground font-medium">
                      {tx.payerName}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-foreground">
                      US$ {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-600">
                      US$ {tx.settledAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {tx.status === "success" ? (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                          Verified Cleared
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800 animate-pulse">
                          Unallocated Wire
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {tx.status === "success" ? (
                        <button
                          onClick={() => alert(`Downloading verified cryptographic PDF receipt for ${tx.reference}`)}
                          className="inline-flex items-center gap-1 font-semibold text-amber-600 hover:underline"
                        >
                          <Download className="size-3" />
                          <span>Receipt</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => alert(`Matching unallocated wire ${tx.reference} to student account`)}
                          className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-bold text-xs"
                        >
                          Match
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Record Manual Payment Modal */}
        {recordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface border border-line rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <Receipt className="size-5 text-amber-600" />
                  <h3 className="text-base font-extrabold text-ink">Record Physical Cash / Bank Deposit</h3>
                </div>
                <button
                  onClick={() => setRecordModalOpen(false)}
                  className="size-7 rounded-lg hover:bg-surface-raised flex items-center justify-center text-ink-muted"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                Log authenticated cash collections at the Bursary counter or direct bank teller wire transfers.
                A unique, signed electronic receipt will be generated.
              </p>

              <form onSubmit={handleRecordPayment} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-ink font-semibold mb-1">Select Student &amp; Admission Number</label>
                  <select
                    value={recStudent}
                    onChange={(e) => setRecStudent(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none"
                  >
                    <option value="Tobi Adeleke (RC-2023-0184)">Tobi Adeleke (RC-2023-0184) — SSS 2A</option>
                    <option value="Zainab Bello (RC-2023-0195)">Zainab Bello (RC-2023-0195) — SSS 2A</option>
                    <option value="Somtochukwu Eze (RC-2023-0210)">Somtochukwu Eze (RC-2023-0210) — SSS 2A</option>
                    <option value="Amina Yusuf (RC-2023-0219)">Amina Yusuf (RC-2023-0219) — JSS 3B</option>
                    <option value="Kehinde Alabi (RC-2023-0231)">Kehinde Alabi (RC-2023-0231) — JSS 1 Gold</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-ink font-semibold mb-1">Amount Paid (USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={recAmount}
                      onChange={(e) => setRecAmount(e.target.value)}
                      placeholder="e.g. 1450.00"
                      className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                  <div>
                    <label className="block text-ink font-semibold mb-1">Payment Method</label>
                    <select
                      value={recChannel}
                      onChange={(e) => setRecChannel(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none"
                    >
                      <option value="Cash Counter">Cash at Bursary Counter</option>
                      <option value="Direct Bank Wire">Direct Bank Wire (Zenith/GTB)</option>
                      <option value="POS Terminal">Bursary POS Terminal</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-ink font-semibold mb-1">Payer / Remitter Name</label>
                    <input
                      type="text"
                      required
                      value={recPayer}
                      onChange={(e) => setRecPayer(e.target.value)}
                      placeholder="e.g. Mrs. Zainab Adeleke"
                      className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-ink font-semibold mb-1">Bank Teller / Reference #</label>
                    <input
                      type="text"
                      value={recRef}
                      onChange={(e) => setRecRef(e.target.value)}
                      placeholder="e.g. ZN-TELL-88214"
                      className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-canvas border border-line text-[11px] text-ink-muted">
                  Logged by authenticated cashier: <strong>Mrs. Angela Nnamdi (BUR-005)</strong>. A permanent receipt number will be issued.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRecordModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line hover:bg-surface-raised font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold transition"
                  >
                    Confirm &amp; Issue Receipt
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
