"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  Receipt,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Layers,
  Send,
  Download,
  Plus,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  Clock,
  Check,
} from "lucide-react";

interface FeeCategory {
  id: string;
  code: string;
  name: string;
  applicableClass: string;
  termAmountUSD: number;
  isMandatory: boolean;
  assignedStudents: number;
}

interface StudentBillingRecord {
  id: string;
  studentNumber: string;
  studentName: string;
  className: string;
  guardianName: string;
  guardianPhone: string;
  invoiceNumber: string;
  totalBilledUSD: number;
  totalPaidUSD: number;
  balanceUSD: number;
  status: "paid" | "partial" | "pending_payment" | "invoice_unassigned";
}

const INITIAL_CATEGORIES: FeeCategory[] = [
  {
    id: "fc-1",
    code: "TUI-JSS",
    name: "Junior Secondary Tuition & Facilities",
    applicableClass: "JSS 1 – JSS 3",
    termAmountUSD: 850,
    isMandatory: true,
    assignedStudents: 412,
  },
  {
    id: "fc-2",
    code: "TUI-SSS",
    name: "Senior Secondary Tuition & Lab Access",
    applicableClass: "SSS 1 – SSS 3",
    termAmountUSD: 1100,
    isMandatory: true,
    assignedStudents: 430,
  },
  {
    id: "fc-3",
    code: "BRD-TERM",
    name: "Boarding & Resident Accommodation",
    applicableClass: "Boarders (All Levels)",
    termAmountUSD: 950,
    isMandatory: false,
    assignedStudents: 185,
  },
  {
    id: "fc-4",
    code: "SCI-LAB",
    name: "Advanced STEM Robotics & Science Lab",
    applicableClass: "SSS Science Stream",
    termAmountUSD: 220,
    isMandatory: true,
    assignedStudents: 160,
  },
  {
    id: "fc-5",
    code: "PTA-DEV",
    name: "PTA Special Capital Projects Levy",
    applicableClass: "All Enrolled Students",
    termAmountUSD: 80,
    isMandatory: true,
    assignedStudents: 842,
  },
];

const INITIAL_BILLING_RECORDS: StudentBillingRecord[] = [
  {
    id: "rec-1",
    studentNumber: "RC-2023-0184",
    studentName: "Tobi Adeleke",
    className: "SSS 2A Science",
    guardianName: "Mrs. Zainab Adeleke",
    guardianPhone: "+234 802 345 6789",
    invoiceNumber: "INV-2026-0842",
    totalBilledUSD: 1400,
    totalPaidUSD: 1400,
    balanceUSD: 0,
    status: "paid",
  },
  {
    id: "rec-2",
    studentNumber: "RC-2024-0091",
    studentName: "Somtochukwu Obi",
    className: "JSS 2 Diamond",
    guardianName: "Chief Emeka Obi",
    guardianPhone: "+234 803 111 2233",
    invoiceNumber: "INV-2026-0843",
    totalBilledUSD: 930,
    totalPaidUSD: 500,
    balanceUSD: 430,
    status: "partial",
  },
  {
    id: "rec-3",
    studentNumber: "RC-2025-0012",
    studentName: "Zainab Mohammed",
    className: "JSS 1 Alpha",
    guardianName: "Alhaji Bello Mohammed",
    guardianPhone: "+234 803 291 0021",
    invoiceNumber: "INV-2026-0844",
    totalBilledUSD: 930,
    totalPaidUSD: 0,
    balanceUSD: 930,
    status: "pending_payment",
  },
  {
    id: "rec-4",
    studentNumber: "RC-2025-0015",
    studentName: "Chidera Okafor",
    className: "SSS 1 Science",
    guardianName: "Dr. Mrs. Ifeoma Okafor",
    guardianPhone: "+234 802 443 8922",
    invoiceNumber: "— (Draft Required)",
    totalBilledUSD: 0,
    totalPaidUSD: 0,
    balanceUSD: 0,
    status: "invoice_unassigned",
  },
];

export function FinanceAdminView() {
  const [categories, setCategories] = useState<FeeCategory[]>(INITIAL_CATEGORIES);
  const [billingRecords, setBillingRecords] = useState<StudentBillingRecord[]>(INITIAL_BILLING_RECORDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState<StudentBillingRecord | null>(null);
  const [disputeModalOpen, setDisputeModalOpen] = useState(false);
  const [disputeForm, setDisputeForm] = useState({
    studentId: "",
    guardianName: "",
    amountDisputed: "",
    reason: "",
    urgency: "Normal",
  });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleGenerateInvoice = (id: string) => {
    setBillingRecords((prev) =>
      prev.map((rec) =>
        rec.id === id
          ? {
              ...rec,
              invoiceNumber: `INV-2026-0${Math.floor(850 + Math.random() * 100)}`,
              totalBilledUSD: 1400,
              balanceUSD: 1400,
              status: "pending_payment",
            }
          : rec
      )
    );
    showToast("Official student fee invoice generated and assigned successfully.");
  };

  const handleBatchGenerateInvoices = () => {
    setBillingRecords((prev) =>
      prev.map((rec) =>
        rec.status === "invoice_unassigned"
          ? {
              ...rec,
              invoiceNumber: `INV-2026-0${Math.floor(850 + Math.random() * 100)}`,
              totalBilledUSD: 1400,
              balanceUSD: 1400,
              status: "pending_payment",
            }
          : rec
      )
    );
    showToast("Batch generated invoices for all unbilled students in Term 2.");
  };

  const handleForwardDisputeToBursar = (e: React.FormEvent) => {
    e.preventDefault();
    setDisputeModalOpen(false);
    showToast(
      `Discrepancy for ${disputeForm.studentId || "student"} forwarded to Bursar desk (Mrs. Angela Nnamdi) with high-priority tracking token #DISP-902.`
    );
    setDisputeForm({
      studentId: "",
      guardianName: "",
      amountDisputed: "",
      reason: "",
      urgency: "Normal",
    });
  };

  const filteredRecords = billingRecords.filter((rec) => {
    const matchesSearch =
      rec.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.studentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.guardianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || rec.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const unassignedCount = billingRecords.filter((r) => r.status === "invoice_unassigned").length;

  return (
    <div className="space-y-6">
      {/* Header & Functional Authority Station */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-100 px-3 py-1 font-mono text-[11px] font-bold text-amber-800">
                Finance Administration Support
              </span>
              <span className="text-xs text-ink-muted">Bursary Operations Liaison</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-ink">Fee Structure Assignment &amp; Invoicing Support</h2>
            <p className="text-xs text-ink-muted">
              Maintain fee schedules, assign tariffs to classes, generate student invoices, support guardians with billing links, and forward payment discrepancies directly to the Bursar.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setDisputeModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100 active:scale-95 transition-all shadow-sm"
            >
              <ShieldAlert className="size-4 text-amber-700" />
              <span>Forward Dispute to Bursar</span>
            </button>

            <button
              type="button"
              onClick={handleBatchGenerateInvoices}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
            >
              <FileSpreadsheet className="size-4" />
              <span>Batch Generate Invoices ({unassignedCount})</span>
            </button>
          </div>
        </div>

        {/* Operational Boundary Notice */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 text-xs text-blue-900 flex items-start gap-3">
          <HelpCircle className="size-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">Administrative Role Boundary Notice</span>
            <p className="text-blue-800 text-[11px] leading-relaxed">
              The School Administrator manages student fee allocations, invoice issuance, and guardian billing assistance. Confirmation of bank transactions, Paystack digital reconciliations, refunds, and financial ledger adjustments remain restricted to the <strong>Bursar Division (Mrs. Angela Nnamdi, FCA)</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMsg && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950 p-4 text-xs text-white font-semibold flex items-center justify-between shadow-xl animate-in slide-in-from-top-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="size-4.5 text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-300">Live Active</span>
        </div>
      )}

      {/* SECTION 1: APPROVED FEE CATEGORIES & TARIFFS */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-ink">Approved Term Fee Categories &amp; Tariffs</h3>
            <p className="text-xs text-ink-muted">Configured schedules assigned to academic classes and boarding streams.</p>
          </div>
          <button
            type="button"
            onClick={() => showToast("New Fee Category template opened.")}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-bold text-ink hover:border-emerald-600"
          >
            <Plus className="size-3.5 text-emerald-600" />
            <span>+ Add Fee Category</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-2xl border border-line bg-surface-raised/70 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-primary-light text-primary">
                  {cat.code}
                </span>
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  US${cat.termAmountUSD.toLocaleString()} / Term
                </span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-ink">{cat.name}</h4>
                <p className="text-[11px] text-ink-muted mt-0.5">Applies to: {cat.applicableClass}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-line text-[11px] font-mono text-ink-muted">
                <span>{cat.assignedStudents} Students Billed</span>
                <span className={cat.isMandatory ? "text-amber-700 font-bold" : "text-ink-soft"}>
                  {cat.isMandatory ? "Mandatory" : "Optional Stream"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: STUDENT BILLING & INVOICE MANAGEMENT TABLE */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-ink">Student Invoicing &amp; Payment Completeness</h3>
            <p className="text-xs text-ink-muted">Monitor invoice generation status and provide immediate payment link assistance to parents.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-3.5 text-ink-muted" />
              <input
                type="text"
                placeholder="Search student, guardian, or invoice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 rounded-xl border border-line bg-surface-raised pl-8 pr-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-semibold text-ink focus:border-emerald-600 focus:outline-none"
            >
              <option value="all">All Invoices ({billingRecords.length})</option>
              <option value="paid">Fully Settled</option>
              <option value="partial">Partially Paid</option>
              <option value="pending_payment">Awaiting Settlement</option>
              <option value="invoice_unassigned">Missing Invoices ({unassignedCount})</option>
            </select>
          </div>
        </div>

        {/* Billing Table */}
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-xs text-ink">
            <thead className="bg-surface-raised font-mono text-[11px] font-bold uppercase tracking-wider text-ink-muted border-b border-line">
              <tr>
                <th className="p-3.5">Student / Matric</th>
                <th className="p-3.5">Class Arm</th>
                <th className="p-3.5">Guardian &amp; Contact</th>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Total Billed / Paid</th>
                <th className="p-3.5">Balance Due</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Support Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-surface-raised/60 transition-colors">
                  <td className="p-3.5">
                    <span className="font-bold text-ink block">{rec.studentName}</span>
                    <span className="font-mono text-[10px] text-ink-muted">{rec.studentNumber}</span>
                  </td>
                  <td className="p-3.5 text-ink-soft">
                    <span>{rec.className}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-ink block">{rec.guardianName}</span>
                    <span className="font-mono text-[10px] text-ink-muted">{rec.guardianPhone}</span>
                  </td>
                  <td className="p-3.5 font-mono text-xs font-bold text-ink">
                    {rec.invoiceNumber}
                  </td>
                  <td className="p-3.5 font-mono text-xs">
                    <span className="text-ink font-bold">US${rec.totalBilledUSD.toLocaleString()}</span>
                    <span className="text-ink-muted text-[10px] block">Paid: US${rec.totalPaidUSD.toLocaleString()}</span>
                  </td>
                  <td className="p-3.5 font-mono text-xs font-bold">
                    {rec.balanceUSD > 0 ? (
                      <span className="text-rose-600">US${rec.balanceUSD.toLocaleString()}</span>
                    ) : (
                      <span className="text-emerald-600">US$0.00</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    {rec.status === "paid" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
                        <Check className="size-3 text-emerald-600" />
                        <span>Settled</span>
                      </span>
                    )}
                    {rec.status === "partial" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-700">
                        <Clock className="size-3 text-amber-600" />
                        <span>Partially Paid</span>
                      </span>
                    )}
                    {rec.status === "pending_payment" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-blue-700">
                        <span>Awaiting</span>
                      </span>
                    )}
                    {rec.status === "invoice_unassigned" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-red-700">
                        <span>Not Invoiced</span>
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    {rec.status === "invoice_unassigned" ? (
                      <button
                        type="button"
                        onClick={() => handleGenerateInvoice(rec.id)}
                        className="rounded-xl bg-emerald-600 px-3 py-1 font-mono text-[11px] font-bold text-white hover:bg-emerald-700 shadow-sm"
                      >
                        Generate Invoice
                      </button>
                    ) : (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRecord(rec);
                            showToast(`Payment portal link copied for ${rec.guardianName}.`);
                          }}
                          className="rounded-xl border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] text-ink-muted hover:text-ink hover:border-emerald-600"
                          title="Copy Paystack link or resend to parent"
                        >
                          <Send className="size-3 text-emerald-600 inline mr-1" />
                          <span>Resend</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: FORWARD PAYMENT DISPUTE TO BURSAR */}
      {disputeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2 text-ink">
                <ShieldAlert className="size-5 text-amber-600" />
                <h3 className="text-base font-extrabold">Forward Payment Discrepancy to Bursar</h3>
              </div>
              <button
                type="button"
                onClick={() => setDisputeModalOpen(false)}
                className="text-ink-muted hover:text-ink"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-ink-muted">
              Use this administrative dispatch channel to escalate guardian payment receipts, uncredited bank transfers, or billing queries directly to Mrs. Angela Nnamdi (Head of Bursary).
            </p>

            <form onSubmit={handleForwardDisputeToBursar} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-ink-muted mb-1">Student ID / Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RC-2023-0184 / Tobi Adeleke"
                  value={disputeForm.studentId}
                  onChange={(e) => setDisputeForm({ ...disputeForm, studentId: e.target.value })}
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Guardian Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mrs. Zainab Adeleke"
                    value={disputeForm.guardianName}
                    onChange={(e) => setDisputeForm({ ...disputeForm, guardianName: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Disputed Amount (US$)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 500"
                    value={disputeForm.amountDisputed}
                    onChange={(e) => setDisputeForm({ ...disputeForm, amountDisputed: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-ink-muted mb-1">Explanation &amp; Bank Reference</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the discrepancy, bank transaction reference, or guardian claim..."
                  value={disputeForm.reason}
                  onChange={(e) => setDisputeForm({ ...disputeForm, reason: e.target.value })}
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => setDisputeModalOpen(false)}
                  className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-amber-700"
                >
                  Forward to Bursary Desk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
