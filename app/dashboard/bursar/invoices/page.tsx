"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  FileSpreadsheet,
  Plus,
  Search,
  Filter,
  Download,
  Send,
  CheckCircle2,
  ClockAlert,
  AlertCircle,
  ArrowUpRight,
  Printer,
  ChevronRight,
  Eye,
  RefreshCw,
  FileText,
  RotateCcw,
  Users,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

interface InvoiceItem {
  id: string;
  invoiceNo: string;
  studentName: string;
  studentId: string;
  classArm: string;
  guardianName: string;
  guardianPhone: string;
  term: string;
  amount: number;
  paid: number;
  balance: number;
  dueDate: string;
  status: "paid" | "partial" | "unpaid" | "overdue";
  creditNoteIssued?: number;
  familyId?: string;
}

export default function BursarInvoicesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "partial" | "unpaid" | "overdue">("all");
  const [classFilter, setClassFilter] = useState("all");
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [creditNoteModalOpen, setCreditNoteModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);
  const [creditAmount, setCreditAmount] = useState("");
  const [creditReason, setCreditReason] = useState("");
  const [familyStatementModalOpen, setFamilyStatementModalOpen] = useState(false);

  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    {
      id: "inv-1",
      invoiceNo: "INV-2026-0841",
      studentName: "Tobi Adeleke",
      studentId: "RC-2023-0184",
      classArm: "SSS 2A (Science)",
      guardianName: "Mrs. Zainab Adeleke",
      guardianPhone: "+234 803 412 8901",
      term: "Term 2, 2025/2026",
      amount: 1450,
      paid: 1450,
      balance: 0,
      dueDate: "Jan 30, 2026",
      status: "paid",
      familyId: "FAM-0492",
    },
    {
      id: "inv-2",
      invoiceNo: "INV-2026-0842",
      studentName: "Zainab Bello",
      studentId: "RC-2023-0195",
      classArm: "SSS 2A (Science)",
      guardianName: "Alhaji Bello Yusuf",
      guardianPhone: "+234 803 555 1204",
      term: "Term 2, 2025/2026",
      amount: 1450,
      paid: 1000,
      balance: 450,
      dueDate: "Feb 15, 2026",
      status: "partial",
    },
    {
      id: "inv-3",
      invoiceNo: "INV-2026-0843",
      studentName: "Somtochukwu Eze",
      studentId: "RC-2023-0210",
      classArm: "SSS 2A (Science)",
      guardianName: "Mr. Jude Eze",
      guardianPhone: "+234 802 889 1234",
      term: "Term 2, 2025/2026",
      amount: 1450,
      paid: 0,
      balance: 1450,
      dueDate: "Jan 15, 2026",
      status: "overdue",
    },
    {
      id: "inv-4",
      invoiceNo: "INV-2026-0844",
      studentName: "Amina Yusuf",
      studentId: "RC-2023-0219",
      classArm: "JSS 3B",
      guardianName: "Mrs. Maryam Yusuf",
      guardianPhone: "+234 809 112 4001",
      term: "Term 2, 2025/2026",
      amount: 1100,
      paid: 0,
      balance: 1100,
      dueDate: "Feb 20, 2026",
      status: "unpaid",
    },
    {
      id: "inv-5",
      invoiceNo: "INV-2026-0845",
      studentName: "Kehinde Alabi",
      studentId: "RC-2023-0231",
      classArm: "JSS 1 Gold",
      guardianName: "Dr. Taiwo Alabi",
      guardianPhone: "+234 818 900 3341",
      term: "Term 2, 2025/2026",
      amount: 1100,
      paid: 0,
      balance: 1100,
      dueDate: "Jan 10, 2026",
      status: "overdue",
    },
    {
      id: "inv-6",
      invoiceNo: "INV-2026-0846",
      studentName: "Sope Adeleke",
      studentId: "RC-2024-0312",
      classArm: "JSS 2 Blue",
      guardianName: "Mrs. Zainab Adeleke",
      guardianPhone: "+234 803 412 8901",
      term: "Term 2, 2025/2026",
      amount: 1100,
      paid: 1100,
      balance: 0,
      dueDate: "Jan 30, 2026",
      status: "paid",
      familyId: "FAM-0492",
    },
  ]);

  const handleIssueCreditNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice || !creditAmount) return;

    const val = parseFloat(creditAmount);
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === selectedInvoice.id
          ? {
              ...inv,
              creditNoteIssued: (inv.creditNoteIssued || 0) + val,
              balance: Math.max(0, inv.balance - val),
              status: inv.balance - val <= 0 ? "paid" : inv.status,
            }
          : inv
      )
    );

    setCreditNoteModalOpen(false);
    setCreditAmount("");
    setCreditReason("");
    alert(`Audited Credit Note of US$ ${val.toFixed(2)} issued against ${selectedInvoice.invoiceNo}. Traceable accounting ledger entry committed.`);
  };

  const filtered = invoices.filter((inv) => {
    const matchesSearch =
      inv.studentName.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      inv.studentId.toLowerCase().includes(search.toLowerCase()) ||
      inv.guardianName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
    const matchesClass = classFilter === "all" || inv.classArm.toLowerCase().includes(classFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesClass;
  });

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <FileSpreadsheet className="size-4" />
              Bursar Portal · Receivables &amp; Billing
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Student Billing &amp; Invoicing
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Issue term invoices, produce consolidated family statements, and manage audited credit note adjustments.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setFamilyStatementModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Users className="size-4 text-amber-600" />
              Consolidated Family Statement
            </button>
            <button
              onClick={() => alert("Batch Invoicing Wizard: Generates 842 term invoices with Paystack payment links.")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Plus className="size-4" />
              Batch Generate Invoices
            </button>
          </div>
        </div>

        {/* Audit & Accounting Integrity Rule Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-start gap-3">
          <ShieldAlert className="size-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-ink-soft">
            <span className="font-bold text-ink block">Invoicing Auditability Rule</span>
            <p>
              Issued invoices cannot be overwritten or deleted. Any adjustments (e.g. scholarship application, fee waiver,
              or billing corrections) must be processed through an authorized credit note with an auditable justification.
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, invoice #, or guardian..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-canvas border border-border focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-canvas border border-border text-foreground text-xs font-semibold focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid in Full</option>
              <option value="partial">Partially Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="overdue">Overdue</option>
            </select>

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-canvas border border-border text-foreground text-xs font-semibold focus:outline-none"
            >
              <option value="all">All Class Arms</option>
              <option value="SSS">Senior Secondary (SSS)</option>
              <option value="JSS">Junior Secondary (JSS)</option>
            </select>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Student &amp; Class</th>
                  <th className="py-3 px-4">Guardian Contact</th>
                  <th className="py-3 px-4 text-right">Billed</th>
                  <th className="py-3 px-4 text-right">Paid</th>
                  <th className="py-3 px-4 text-right">Balance</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-foreground">
                      {inv.invoiceNo}
                      {inv.creditNoteIssued && (
                        <span className="block text-[10px] text-purple-600 font-semibold">
                          Credit: -US${inv.creditNoteIssued.toFixed(2)}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-foreground block">{inv.studentName}</span>
                      <span className="text-[11px] text-muted-foreground font-mono">{inv.studentId} · {inv.classArm}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-foreground block">{inv.guardianName}</span>
                      <span className="text-[11px] text-muted-foreground font-mono">{inv.guardianPhone}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-foreground">
                      US$ {inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-600">
                      US$ {inv.paid.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-amber-500">
                      US$ {inv.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          inv.status === "paid"
                            ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                            : inv.status === "partial"
                            ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200 dark:border-blue-800"
                            : inv.status === "overdue"
                            ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800"
                            : "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => alert(`Downloading verified PDF for ${inv.invoiceNo}`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border hover:bg-canvas text-xs font-semibold text-foreground"
                      >
                        <Download className="size-3" />
                        PDF
                      </button>
                      {inv.balance > 0 && (
                        <button
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setCreditNoteModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/25"
                        >
                          Credit Note
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Credit Note Issuance Modal */}
        {creditNoteModalOpen && selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface border border-line rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <RotateCcw className="size-5 text-amber-600" />
                  <h3 className="text-base font-extrabold text-ink">Issue Audited Credit Note</h3>
                </div>
                <button
                  onClick={() => setCreditNoteModalOpen(false)}
                  className="size-7 rounded-lg hover:bg-surface-raised flex items-center justify-center text-ink-muted"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                Applying a credit note to <strong>{selectedInvoice.invoiceNo}</strong> ({selectedInvoice.studentName}).
                Current balance: <strong>US$ {selectedInvoice.balance.toFixed(2)}</strong>.
              </p>

              <form onSubmit={handleIssueCreditNote} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-ink font-semibold mb-1">Credit Amount (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    max={selectedInvoice.balance}
                    required
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(e.target.value)}
                    placeholder="e.g. 150.00"
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-1">Traceable Accounting Reason</label>
                  <select
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none mb-2"
                  >
                    <option>Approved Academic Merit Scholarship Concession</option>
                    <option>Approved Sibling Discount (10% Tier)</option>
                    <option>Overcharge / Curriculum Subject Exemption Correction</option>
                    <option>Hardship Concession Approved by Principal</option>
                  </select>
                  <textarea
                    rows={3}
                    required
                    value={creditReason}
                    onChange={(e) => setCreditReason(e.target.value)}
                    placeholder="Enter audit documentation reference and Board approval date..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCreditNoteModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line hover:bg-surface-raised font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold transition"
                  >
                    Commit Credit Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Consolidated Family Statement Modal */}
        {familyStatementModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-card border border-border rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between border-b border-border pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                      FAM-0492
                    </span>
                    <span className="text-xs text-muted-foreground">Guardian: Mrs. Zainab Adeleke</span>
                  </div>
                  <h3 className="text-lg font-black text-foreground mt-1">Consolidated Family Billing Statement</h3>
                </div>
                <button
                  onClick={() => setFamilyStatementModalOpen(false)}
                  className="size-8 rounded-xl hover:bg-muted flex items-center justify-center text-muted-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-muted-foreground">
                  Consolidated multi-child ledger for all enrolled students under registered guardian Mrs. Zainab Adeleke.
                </p>

                <div className="space-y-2">
                  <div className="p-3 rounded-2xl bg-canvas border border-border flex justify-between items-center">
                    <div>
                      <span className="font-bold text-foreground">Tobi Adeleke (SSS 2A)</span>
                      <span className="text-[11px] text-muted-foreground block">INV-2026-0841 · Term 2 Tuition &amp; Science Levy</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-foreground block">US$ 1,450.00</span>
                      <span className="text-emerald-600 text-[10px] font-bold">Paid in Full</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-canvas border border-border flex justify-between items-center">
                    <div>
                      <span className="font-bold text-foreground">Sope Adeleke (JSS 2 Blue)</span>
                      <span className="text-[11px] text-muted-foreground block">INV-2026-0846 · Term 2 Junior Secondary Tuition</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-foreground block">US$ 1,100.00</span>
                      <span className="text-emerald-600 text-[10px] font-bold">Paid in Full</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Total Family Account Balance</span>
                    <span className="text-[11px] text-muted-foreground">All Term 2 obligations fully satisfied</span>
                  </div>
                  <span className="text-xl font-black text-emerald-600">US$ 0.00</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border flex justify-end gap-2">
                <button
                  onClick={() => alert("Consolidated Family Billing Statement PDF exported successfully.")}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition"
                >
                  Download Family Statement (PDF)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
