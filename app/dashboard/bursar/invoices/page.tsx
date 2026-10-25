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
}

export default function BursarInvoicesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "partial" | "unpaid" | "overdue">("all");
  const [classFilter, setClassFilter] = useState("all");
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);
  const [batchNotice, setBatchNotice] = useState<string | null>(null);

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
      amount: 185000,
      paid: 185000,
      balance: 0,
      dueDate: "Jan 30, 2026",
      status: "paid",
    },
    {
      id: "inv-2",
      invoiceNo: "INV-2026-0842",
      studentName: "Maryam Adeleke",
      studentId: "RC-2024-0091",
      classArm: "JSS 1C (Junior)",
      guardianName: "Mrs. Zainab Adeleke",
      guardianPhone: "+234 803 412 8901",
      term: "Term 2, 2025/2026",
      amount: 165000,
      paid: 100000,
      balance: 65000,
      dueDate: "Feb 15, 2026",
      status: "partial",
    },
    {
      id: "inv-3",
      invoiceNo: "INV-2026-0843",
      studentName: "Chinedu Eze",
      studentId: "RC-2023-0210",
      classArm: "SSS 2B (Commercial)",
      guardianName: "Mr. Jude Eze",
      guardianPhone: "+234 802 889 1234",
      term: "Term 2, 2025/2026",
      amount: 185000,
      paid: 0,
      balance: 185000,
      dueDate: "Jan 15, 2026",
      status: "overdue",
    },
    {
      id: "inv-4",
      invoiceNo: "INV-2026-0844",
      studentName: "Amina Yusuf",
      studentId: "RC-2022-0056",
      classArm: "SSS 3A (Science)",
      guardianName: "Alhaji Bello Yusuf",
      guardianPhone: "+234 809 777 5543",
      term: "Term 2, 2025/2026",
      amount: 210000,
      paid: 210000,
      balance: 0,
      dueDate: "Jan 25, 2026",
      status: "paid",
    },
    {
      id: "inv-5",
      invoiceNo: "INV-2026-0845",
      studentName: "Daniel Babatunde",
      studentId: "RC-2024-0312",
      classArm: "JSS 2A (Junior)",
      guardianName: "Engr. F. Babatunde",
      guardianPhone: "+234 805 112 3344",
      term: "Term 2, 2025/2026",
      amount: 160000,
      paid: 80000,
      balance: 80000,
      dueDate: "Feb 10, 2026",
      status: "partial",
    },
    {
      id: "inv-6",
      invoiceNo: "INV-2026-0846",
      studentName: "Emeka Okafor",
      studentId: "RC-2023-0112",
      classArm: "SSS 1B (Arts)",
      guardianName: "Mrs. N. Okafor",
      guardianPhone: "+234 803 999 1122",
      term: "Term 2, 2025/2026",
      amount: 175000,
      paid: 0,
      balance: 175000,
      dueDate: "Feb 28, 2026",
      status: "unpaid",
    },
  ]);

  const handleSendReminder = (invoice: InvoiceItem) => {
    alert(`Automated WhatsApp and SMS payment reminder sent to ${invoice.guardianName} (${invoice.guardianPhone}) for outstanding balance ₦${invoice.balance.toLocaleString()}.`);
  };

  const handleBatchRun = () => {
    setBatchNotice("Generating Term 2 billing batch across all 32 class arms... 842 invoices synthesized.");
    setTimeout(() => {
      setBatchNotice("Batch Billing Run Complete: 842 invoices generated, total billed ₦142,850,000. Invoices published to parent portals.");
      setBatchModalOpen(false);
    }, 1200);
  };

  const filtered = invoices.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.studentId.toLowerCase().includes(search.toLowerCase()) ||
      item.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      item.guardianName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesClass = classFilter === "all" || item.classArm.startsWith(classFilter);
    return matchesSearch && matchesStatus && matchesClass;
  });

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <FileSpreadsheet className="w-4 h-4" />
              Bursary Division · Fee Invoicing & Billing
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Term Invoices & Fee Billing
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Generate student billing rolls, monitor settlement balances, and trigger automated payment links.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setBatchModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <RefreshCw className="w-4 h-4" />
              Run Batch Invoicing
            </button>
            <button
              onClick={() => alert("Downloading complete terminal billing register as Excel / CSV")}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4 text-muted-foreground" />
              Export
            </button>
          </div>
        </div>

        {/* Batch Notice */}
        {batchNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              {batchNotice}
            </span>
            <button onClick={() => setBatchNotice(null)} className="text-emerald-600 hover:underline text-xs ml-4">
              Dismiss
            </button>
          </div>
        )}

        {/* Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Total Invoiced (Term 2)</div>
            <div className="text-xl sm:text-2xl font-black text-foreground mt-1">₦142,850,000</div>
            <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-semibold">842 Students</span> across 32 class arms
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Settled Inflows</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">₦108,420,000</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">75.9% collection rate</div>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Pending Partial Balance</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">₦28,830,000</div>
            <div className="text-[11px] text-muted-foreground mt-1">118 accounts with balance</div>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Overdue / Delinquent</div>
            <div className="text-xl sm:text-2xl font-black text-rose-600 mt-1">₦5,600,000</div>
            <div className="text-[11px] text-rose-600 font-semibold mt-1">32 accounts past 30 days</div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student, ID, invoice #, guardian..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-canvas border border-border focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-canvas border border-border rounded-xl p-1 text-xs">
              {(["all", "paid", "partial", "unpaid", "overdue"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg capitalize font-medium transition ${
                    statusFilter === status
                      ? "bg-amber-600 text-white shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-canvas border border-border text-foreground focus:outline-none"
            >
              <option value="all">All Classes</option>
              <option value="SSS">Senior (SSS)</option>
              <option value="JSS">Junior (JSS)</option>
            </select>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Invoice No</th>
                  <th className="py-3 px-4">Student & Class</th>
                  <th className="py-3 px-4">Guardian Contact</th>
                  <th className="py-3 px-4 text-right">Invoiced</th>
                  <th className="py-3 px-4 text-right">Paid</th>
                  <th className="py-3 px-4 text-right">Balance</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4 font-mono font-medium text-foreground">
                      {inv.invoiceNo}
                      <div className="text-[10px] text-muted-foreground font-sans">Due: {inv.dueDate}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-foreground">{inv.studentName}</div>
                      <div className="text-xs text-muted-foreground">{inv.studentId} · {inv.classArm}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-foreground">{inv.guardianName}</div>
                      <div className="text-xs text-muted-foreground">{inv.guardianPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium text-foreground">
                      ₦{inv.amount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-emerald-600">
                      ₦{inv.paid.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-foreground">
                      {inv.balance > 0 ? (
                        <span className="text-rose-600">₦{inv.balance.toLocaleString()}</span>
                      ) : (
                        <span className="text-emerald-600">₦0</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {inv.status === "paid" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> Paid Full
                        </span>
                      )}
                      {inv.status === "partial" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800">
                          <ClockAlert className="w-3 h-3" /> Partial
                        </span>
                      )}
                      {inv.status === "unpaid" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          Unpaid
                        </span>
                      )}
                      {inv.status === "overdue" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800">
                          <AlertCircle className="w-3 h-3" /> Overdue
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          title="View Invoice Details"
                          className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {inv.balance > 0 && (
                          <button
                            onClick={() => handleSendReminder(inv)}
                            title="Send Automated Reminder"
                            className="p-1.5 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 transition"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => alert(`Printing official receipt for ${inv.invoiceNo}`)}
                          title="Print Receipt"
                          className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Detail Modal */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <div className="text-xs uppercase font-bold text-amber-600 tracking-wider">Official School Bill</div>
                  <h3 className="text-lg font-bold text-foreground">{selectedInvoice.invoiceNo}</h3>
                </div>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-muted-foreground">Student:</span>
                  <div className="font-semibold text-foreground text-sm">{selectedInvoice.studentName}</div>
                  <div className="text-muted-foreground">{selectedInvoice.studentId} · {selectedInvoice.classArm}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Guardian:</span>
                  <div className="font-semibold text-foreground text-sm">{selectedInvoice.guardianName}</div>
                  <div className="text-muted-foreground">{selectedInvoice.guardianPhone}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-canvas border border-border space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Tuition & Instructional Levy</span>
                  <span className="font-medium text-foreground">₦120,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Science Lab & STEM Fee</span>
                  <span className="font-medium text-foreground">₦35,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">PTA Development Levy</span>
                  <span className="font-medium text-foreground">₦15,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Digital Campus & Portal License</span>
                  <span className="font-medium text-foreground">₦15,000</span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold">
                  <span>Total Invoiced:</span>
                  <span className="text-foreground">₦{selectedInvoice.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-emerald-600">
                  <span>Total Paid via Paystack:</span>
                  <span>- ₦{selectedInvoice.paid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-black pt-1 border-t border-border text-rose-600">
                  <span>Balance Due:</span>
                  <span>₦{selectedInvoice.balance.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => alert(`Receipt downloaded for ${selectedInvoice.invoiceNo}`)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-medium"
                >
                  Download PDF Receipt
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-medium hover:bg-amber-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Batch Billing Modal */}
        {batchModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Generate Batch Invoices</h3>
                  <p className="text-xs text-muted-foreground">Term 2, 2025/2026 Academic Session</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-canvas border border-border text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target Population:</span>
                  <span className="font-semibold text-foreground">842 Active Enrolled Students</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Class Arms Covered:</span>
                  <span className="font-semibold text-foreground">All 32 Classes (JSS 1 - SSS 3)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Applicable Fee Schedule:</span>
                  <span className="font-semibold text-foreground">Term 2 Standard Matrix</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Term Inflows:</span>
                  <span className="font-semibold text-amber-600">₦142,850,000</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Running this batch will generate unified digital invoices and dispatch automated SMS/Email billing statements with instant Paystack checkout links to all guardians.
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setBatchModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBatchRun}
                  className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-medium hover:bg-amber-700 shadow-sm"
                >
                  Execute Batch Billing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
