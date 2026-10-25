"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  FileText,
  Search,
  Download,
  Printer,
  Send,
  RotateCcw,
  CheckCircle2,
  Calendar,
  DollarSign,
  ShieldAlert,
  ShieldCheck,
  QrCode,
  Eye,
  AlertTriangle,
} from "lucide-react";

interface ReceiptItem {
  id: string;
  receiptNo: string;
  studentName: string;
  studentId: string;
  classArm: string;
  payerName: string;
  amount: number;
  paymentMethod: string;
  reference: string;
  issueDate: string;
  cashier: string;
  status: "Confirmed" | "Voided";
  voidReason?: string;
}

export default function BursarReceiptsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptItem | null>(null);
  const [voidModalOpen, setVoidModalOpen] = useState(false);
  const [voidReason, setVoidReason] = useState("");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  const [receipts, setReceipts] = useState<ReceiptItem[]>([
    {
      id: "rec-1",
      receiptNo: "RC-REC-2026-0841",
      studentName: "Tobi Adeleke",
      studentId: "RC-2023-0184",
      classArm: "SSS 2A",
      payerName: "Mrs. Zainab Adeleke",
      amount: 1450,
      paymentMethod: "Paystack (Debit Card)",
      reference: "PSTK_98240182",
      issueDate: "Jan 12, 2026 · 11:24 AM",
      cashier: "Automated Gateway",
      status: "Confirmed",
    },
    {
      id: "rec-2",
      receiptNo: "RC-REC-2026-0842",
      studentName: "Sope Adeleke",
      studentId: "RC-2024-0312",
      classArm: "JSS 2 Blue",
      payerName: "Mrs. Zainab Adeleke",
      amount: 1100,
      paymentMethod: "Paystack (Bank Transfer)",
      reference: "PSTK_98240230",
      issueDate: "Jan 12, 2026 · 11:28 AM",
      cashier: "Automated Gateway",
      status: "Confirmed",
    },
    {
      id: "rec-3",
      receiptNo: "RC-REC-2026-0843",
      studentName: "Amina Yusuf",
      studentId: "RC-2023-0219",
      classArm: "JSS 3B",
      payerName: "Alhaji Bello Yusuf",
      amount: 1100,
      paymentMethod: "Direct Bank Wire (Zenith)",
      reference: "BNK_WIRE_889211",
      issueDate: "Jan 14, 2026 · 09:40 AM",
      cashier: "Mrs. Angela Nnamdi (BUR-005)",
      status: "Confirmed",
    },
    {
      id: "rec-4",
      receiptNo: "RC-REC-2026-0844",
      studentName: "Chinedu Eze",
      studentId: "RC-2023-0210",
      classArm: "SSS 2B",
      payerName: "Mr. Jude Eze",
      amount: 450,
      paymentMethod: "Cash at Bursary Counter",
      reference: "BUR_CSH_014",
      issueDate: "Jan 15, 2026 · 03:30 PM",
      cashier: "Cashier Box #1",
      status: "Confirmed",
    },
    {
      id: "rec-5",
      receiptNo: "RC-REC-2026-0810",
      studentName: "Duplicated Payment Entry",
      studentId: "RC-2023-0991",
      classArm: "JSS 1 Gold",
      payerName: "Emeka Okafor",
      amount: 1100,
      paymentMethod: "Direct Bank Wire",
      reference: "BNK_DUP_0012",
      issueDate: "Jan 08, 2026",
      cashier: "Mrs. Angela Nnamdi",
      status: "Voided",
      voidReason: "Customer accidentally transferred twice; duplicate wire refunded via Zenith Bank reversal #8812.",
    },
  ]);

  const handleVoidReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReceipt || !voidReason.trim()) return;

    setReceipts((prev) =>
      prev.map((r) =>
        r.id === selectedReceipt.id
          ? { ...r, status: "Voided", voidReason: voidReason }
          : r
      )
    );

    setVoidModalOpen(false);
    setVoidReason("");
    alert(`Receipt ${selectedReceipt.receiptNo} voided. Audited accounting reversal logged with reason.`);
  };

  const filtered = receipts.filter((r) => {
    const matchesSearch =
      r.receiptNo.toLowerCase().includes(search.toLowerCase()) ||
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.reference.toLowerCase().includes(search.toLowerCase()) ||
      r.payerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <FileText className="size-4" />
              Bursar Portal · Confirmed Receipts &amp; Fiscal Records
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Receipts Repository &amp; Cashier Log
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Issue verified payment receipts, reprint certified copies, dispatch via WhatsApp/Email, and audit voided transactions.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Daily Cashier Collections Summary PDF exported with counter balancing totals.")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="size-4" />
              Daily Cashier Summary
            </button>
          </div>
        </div>

        {/* Audit Guard Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-start gap-3">
          <ShieldAlert className="size-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-ink-soft">
            <span className="font-bold text-ink block">Fiscal Confirmation &amp; Anti-Void Protocol</span>
            <p>
              An official receipt represents confirmed funds cleared into the school account. Receipts cannot be silently
              deleted. Voiding a receipt requires an audited reason (e.g. verified bank duplicate or approved refund)
              and preserves a permanent audit record.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by receipt #, student name, reference, or payer..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-canvas border border-border focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-canvas border border-border text-foreground text-xs font-semibold focus:outline-none"
            >
              <option value="all">All Receipts</option>
              <option value="confirmed">Confirmed</option>
              <option value="voided">Voided Records</option>
            </select>
          </div>
        </div>

        {/* Receipts Table */}
        <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Receipt #</th>
                  <th className="py-3 px-4">Student &amp; Class</th>
                  <th className="py-3 px-4">Payer / Remitter</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-foreground">
                      {r.receiptNo}
                      <span className="block text-[10px] text-muted-foreground font-normal">{r.issueDate}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-foreground block">{r.studentName}</span>
                      <span className="text-[11px] text-muted-foreground font-mono">{r.studentId} · {r.classArm}</span>
                    </td>
                    <td className="py-3.5 px-4 text-foreground font-medium">
                      {r.payerName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-foreground block">{r.paymentMethod}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Ref: {r.reference}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-foreground">
                      US$ {r.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {r.status === "Confirmed" ? (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                          Confirmed
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800">
                          Voided
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedReceipt(r);
                          setPreviewModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border hover:bg-canvas text-xs font-semibold text-foreground"
                      >
                        <Eye className="size-3" /> View
                      </button>
                      <button
                        onClick={() => alert(`Reissuing PDF receipt copy for ${r.receiptNo}`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border hover:bg-canvas text-xs font-semibold text-foreground"
                      >
                        <Download className="size-3" /> PDF
                      </button>
                      {r.status === "Confirmed" && (
                        <button
                          onClick={() => {
                            setSelectedReceipt(r);
                            setVoidModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 text-xs font-semibold hover:bg-rose-500/25"
                        >
                          Void
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View / Print Receipt Preview Modal */}
        {previewModalOpen && selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-card border border-border rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-start justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="size-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black">
                    R
                  </div>
                  <div>
                    <h3 className="text-base font-black text-foreground">Riverside College Bursary</h3>
                    <p className="text-[11px] text-muted-foreground">Official E-Receipt · {selectedReceipt.receiptNo}</p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewModalOpen(false)}
                  className="size-8 rounded-xl hover:bg-muted flex items-center justify-center text-muted-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-canvas border border-border space-y-3 text-xs">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Receipt Number:</span>
                  <span className="font-mono font-bold text-foreground">{selectedReceipt.receiptNo}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Student Name:</span>
                  <span className="font-bold text-foreground">{selectedReceipt.studentName} ({selectedReceipt.studentId})</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Payer / Remitter:</span>
                  <span className="font-medium text-foreground">{selectedReceipt.payerName}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Payment Channel:</span>
                  <span className="font-medium text-foreground">{selectedReceipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-muted-foreground">Transaction Reference:</span>
                  <span className="font-mono text-foreground">{selectedReceipt.reference}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="font-bold text-foreground text-sm">Total Paid Amount:</span>
                  <span className="text-lg font-black text-emerald-600">
                    US$ {selectedReceipt.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>Cashier: {selectedReceipt.cashier}</span>
                <span className="flex items-center gap-1 font-bold text-emerald-600">
                  <CheckCircle2 className="size-3" /> Signed &amp; Sealed
                </span>
              </div>

              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <button
                  onClick={() => alert(`Receipt dispatched via WhatsApp and Email to ${selectedReceipt.payerName}`)}
                  className="px-4 py-2 rounded-xl bg-canvas border border-border hover:bg-muted text-xs font-semibold text-foreground transition"
                >
                  Send to Parent
                </button>
                <button
                  onClick={() => alert(`Printing official receipt ${selectedReceipt.receiptNo}`)}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition"
                >
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Void Receipt Modal */}
        {voidModalOpen && selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface border border-line rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="size-5 text-rose-600" />
                  <h3 className="text-base font-extrabold text-ink">Void Official Receipt</h3>
                </div>
                <button
                  onClick={() => setVoidModalOpen(false)}
                  className="size-7 rounded-lg hover:bg-surface-raised flex items-center justify-center text-ink-muted"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                You are initiating an audited cancellation of <strong>{selectedReceipt.receiptNo}</strong> (Amount: US$ {selectedReceipt.amount.toFixed(2)}).
                This action reverses the payment credit on the student ledger.
              </p>

              <form onSubmit={handleVoidReceipt} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-ink font-semibold mb-1">Reason for Voiding</label>
                  <textarea
                    rows={4}
                    required
                    value={voidReason}
                    onChange={(e) => setVoidReason(e.target.value)}
                    placeholder="Enter reason (e.g. Bank wire duplicated, refund issued, or incorrect student account allocated)..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setVoidModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line hover:bg-surface-raised font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold transition"
                  >
                    Confirm Void
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
