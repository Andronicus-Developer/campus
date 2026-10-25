"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  DollarSign,
  FileText,
  CreditCard,
  Building2,
  ArrowUpRight,
  Download,
  Plus,
  Eye,
  AlertTriangle,
  Send,
  HelpCircle,
  FileCheck,
} from "lucide-react";

interface RefundRecord {
  id: string;
  refundRef: string;
  studentName: string;
  admissionNo: string;
  classGrade: string;
  guardianName: string;
  originalReceiptNo: string;
  invoiceNo: string;
  originalAmount: number;
  refundAmount: number;
  refundType: "Full" | "Partial";
  reasonCategory: "Relocation / Transfer" | "Duplicate Transfer" | "Boarding to Day Status" | "Overpayment";
  reasonDetails: string;
  requestDate: string;
  status: "pending_bursar" | "owner_approval_required" | "approved" | "processed" | "rejected";
  payoutMethod: "Original Bank Account" | "Card Reversal" | "Credit Note Applied";
  bankDetails?: string;
  policyEligible: boolean;
  approvalChain: {
    bursarReviewed: boolean;
    bursarDate?: string;
    ownerApproved?: boolean;
    ownerDate?: string;
    approverNote?: string;
  };
}

export default function BursarRefundsPage() {
  const [filter, setFilter] = useState<"all" | "pending_bursar" | "owner_approval_required" | "approved" | "processed" | "rejected">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [selectedRefund, setSelectedRefund] = useState<RefundRecord | null>(null);
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [reviewNote, setReviewNote] = useState("");

  const [refunds, setRefunds] = useState<RefundRecord[]>([
    {
      id: "REF-001",
      refundRef: "RFND-2026-008",
      studentName: "Somtochukwu Eze",
      admissionNo: "RVS-2024-008",
      classGrade: "Grade 11 (SSS 2B)",
      guardianName: "Dr. Chidi Eze",
      originalReceiptNo: "REC-2026-0004",
      invoiceNo: "INV-2026-004",
      originalAmount: 1850.0,
      refundAmount: 925.0,
      refundType: "Partial",
      reasonCategory: "Boarding to Day Status",
      reasonDetails: "Student approved by Principal for medical day-student status; 50% term boarding fee refundable per school constitution.",
      requestDate: "Jan 23, 2026",
      status: "owner_approval_required",
      payoutMethod: "Original Bank Account",
      bankDetails: "Zenith Bank · Acct #2019948201 · Dr. Chidi Eze",
      policyEligible: true,
      approvalChain: {
        bursarReviewed: true,
        bursarDate: "Jan 23, 2026 by J. Mensah",
        ownerApproved: false,
        approverNote: "Amount exceeds $500 Bursar threshold. Routed to School Owner for statutory authorization.",
      },
    },
    {
      id: "REF-002",
      refundRef: "RFND-2026-007",
      studentName: "Farida Al-Mansoor",
      admissionNo: "RVS-2024-006",
      classGrade: "Grade 10 (SSS 1B)",
      guardianName: "Alhaji Bello Mansoor",
      originalReceiptNo: "REC-2026-0006",
      invoiceNo: "INV-2026-006",
      originalAmount: 1450.0,
      refundAmount: 1450.0,
      refundType: "Full",
      reasonCategory: "Duplicate Transfer",
      reasonDetails: "Guardian inadvertently paid invoice online via Paystack card and later via ACH direct bank deposit.",
      requestDate: "Jan 22, 2026",
      status: "processed",
      payoutMethod: "Card Reversal",
      bankDetails: "Paystack Gateway Reversal #PSTK-REV-9918",
      policyEligible: true,
      approvalChain: {
        bursarReviewed: true,
        bursarDate: "Jan 22, 2026 by J. Mensah",
        ownerApproved: true,
        ownerDate: "Jan 22, 2026 by School Owner (Alh. R. Sterling)",
        approverNote: "Verified duplicate gateway transaction confirmed with Chase Bank.",
      },
    },
    {
      id: "REF-003",
      refundRef: "RFND-2026-006",
      studentName: "Chiamaka Okafor",
      admissionNo: "RVS-2024-003",
      classGrade: "Grade 9 (JSS 3A)",
      guardianName: "Engr. Obi Okafor",
      originalReceiptNo: "REC-2026-0003",
      invoiceNo: "INV-2026-003",
      originalAmount: 180.0,
      refundAmount: 180.0,
      refundType: "Full",
      reasonCategory: "Overpayment",
      reasonDetails: "Computer Lab levy paid twice due to bank app automated recurring payment standing order.",
      requestDate: "Jan 24, 2026",
      status: "approved",
      payoutMethod: "Credit Note Applied",
      policyEligible: true,
      approvalChain: {
        bursarReviewed: true,
        bursarDate: "Jan 24, 2026 by J. Mensah",
        approverNote: "Within Bursar $500 threshold. Approved for credit note rollout to Term 2 ledger.",
      },
    },
    {
      id: "REF-004",
      refundRef: "RFND-2026-005",
      studentName: "Tariq Danjuma",
      admissionNo: "RVS-2024-089",
      classGrade: "Grade 12 (SSS 3A)",
      guardianName: "Col. Y. Danjuma (Rtd)",
      originalReceiptNo: "REC-2026-0089",
      invoiceNo: "INV-2026-089",
      originalAmount: 1600.0,
      refundAmount: 800.0,
      refundType: "Partial",
      reasonCategory: "Relocation / Transfer",
      reasonDetails: "Withdrawal notice submitted after statutory 14-day refund window deadline per Academic handbook.",
      requestDate: "Jan 18, 2026",
      status: "rejected",
      payoutMethod: "Original Bank Account",
      policyEligible: false,
      approvalChain: {
        bursarReviewed: true,
        bursarDate: "Jan 19, 2026 by J. Mensah",
        ownerApproved: false,
        approverNote: "Non-compliant with school refund deadline. 100% of term tuition forfeited per clause 4.2.",
      },
    },
  ]);

  // Form states for new refund
  const [newStudent, setNewStudent] = useState("David Sterling (RVS-2024-001)");
  const [newReceiptNo, setNewReceiptNo] = useState("REC-2026-0001");
  const [newAmount, setNewAmount] = useState("250.00");
  const [newType, setNewType] = useState<"Full" | "Partial">("Partial");
  const [newReasonCat, setNewReasonCat] = useState<RefundRecord["reasonCategory"]>("Overpayment");
  const [newReasonDetails, setNewReasonDetails] = useState("Overpaid bus transport surcharge due to family address relocation.");
  const [newPayoutMethod, setNewPayoutMethod] = useState<RefundRecord["payoutMethod"]>("Original Bank Account");

  const handleCreateRefundRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(newAmount) || 0;
    const requiresOwner = amountNum > 500;

    const newRecord: RefundRecord = {
      id: `REF-${String(refunds.length + 1).padStart(3, "0")}`,
      refundRef: `RFND-2026-${String(refunds.length + 9).padStart(3, "0")}`,
      studentName: newStudent.split(" (")[0],
      admissionNo: newStudent.split("(")[1]?.replace(")", "") || "RVS-2024-001",
      classGrade: "Grade 11 (SSS 2A)",
      guardianName: "Marcus Sterling",
      originalReceiptNo: newReceiptNo,
      invoiceNo: "INV-2026-001",
      originalAmount: 1450.0,
      refundAmount: amountNum,
      refundType: newType,
      reasonCategory: newReasonCat,
      reasonDetails: newReasonDetails,
      requestDate: "Today",
      status: requiresOwner ? "owner_approval_required" : "pending_bursar",
      payoutMethod: newPayoutMethod,
      bankDetails: "Chase Bank Operating Wire",
      policyEligible: true,
      approvalChain: {
        bursarReviewed: true,
        bursarDate: "Today by Bursar",
        ownerApproved: false,
        approverNote: requiresOwner
          ? "High-value refund (> US$ 500.00). Dispatched to School Owner for formal governance sign-off."
          : "Under US$ 500.00 Bursar delegation limit.",
      },
    };

    setRefunds([newRecord, ...refunds]);
    setIsNewRequestOpen(false);
    setToast(
      requiresOwner
        ? `Refund request ${newRecord.refundRef} generated (US$ ${amountNum.toFixed(2)}). Sent to School Owner for authorization.`
        : `Refund request ${newRecord.refundRef} created. Approved under Bursar delegated threshold.`
    );
  };

  const handleOwnerApprove = (recordId: string) => {
    setRefunds((prev) =>
      prev.map((r) =>
        r.id === recordId
          ? {
              ...r,
              status: "approved",
              approvalChain: {
                ...r.approvalChain,
                ownerApproved: true,
                ownerDate: "Today by School Owner",
                approverNote: reviewNote || "Executive School Owner sign-off completed.",
              },
            }
          : r
      )
    );
    setIsOwnerModalOpen(false);
    setSelectedRefund(null);
    setToast("School Owner approval recorded. Bursary may now process payment disbursement.");
  };

  const handleProcessDisbursement = (recordId: string) => {
    setRefunds((prev) =>
      prev.map((r) =>
        r.id === recordId
          ? {
              ...r,
              status: "processed",
            }
          : r
      )
    );
    setToast("Disbursement recorded. Traceable bank wire debit posted to treasury general ledger.");
  };

  const filteredRefunds = refunds.filter((r) => {
    const matchesFilter = filter === "all" || r.status === filter;
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.refundRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.originalReceiptNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.guardianName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalRequested = refunds.reduce((sum, r) => sum + r.refundAmount, 0);
  const pendingApprovals = refunds.filter((r) => r.status === "owner_approval_required" || r.status === "pending_bursar").reduce((sum, r) => sum + r.refundAmount, 0);
  const totalDisbursed = refunds.filter((r) => r.status === "processed").reduce((sum, r) => sum + r.refundAmount, 0);

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <RotateCcw className="w-4 h-4" />
              Financial Governance · Section H
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Refunds, Reversals & Disputed Payments
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Strict multi-tier approval workflow for tuition refunds, gateway chargeback defense, and payment reversals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsNewRequestOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              Initiate Refund Request
            </button>
            <button
              onClick={() => {
                alert("Generating Audited Refund & Reversal Register (PDF & CSV)...");
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4 text-muted-foreground" />
              Export Register
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

        {/* Governance Control Alert */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-foreground">Multi-Tier Financial Segregation Policy:</span>{" "}
            <span className="text-muted-foreground">
              The Bursar may prepare, review, and disburse refunds up to <strong>US$ 500.00</strong>. Refunds exceeding <strong>US$ 500.00</strong> or involving full tuition withdrawal require electronic approval from the School Owner or Board Chairman.
            </span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Total Requests Logged</span>
              <FileText className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-foreground">
              US$ {totalRequested.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground mt-1">{refunds.length} total refund cases on record</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Awaiting Owner Sign-Off</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">
              US$ {pendingApprovals.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {refunds.filter((r) => r.status === "owner_approval_required").length} high-value cases pending
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Disbursed & Closed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600">
              US$ {totalDisbursed.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Executed via bank wire / gateway reversal</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Disputes & Chargebacks</span>
              <HelpCircle className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-black text-rose-600">0 Active</div>
            <div className="text-xs text-muted-foreground mt-1">100% gateway evidence defended</div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 bg-card border border-border rounded-xl p-1 text-xs">
            {(
              [
                { key: "all", label: "All Cases" },
                { key: "owner_approval_required", label: "Owner Gate (> $500)" },
                { key: "approved", label: "Approved" },
                { key: "processed", label: "Processed" },
                { key: "rejected", label: "Rejected" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition ${
                  filter === tab.key ? "bg-amber-600 text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search student, ref, receipt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Refund Records Table */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Refund Ref / Student</th>
                  <th className="py-3 px-4">Category & Reason</th>
                  <th className="py-3 px-4">Orig. Receipt</th>
                  <th className="py-3 px-4 text-right">Refund Amount</th>
                  <th className="py-3 px-4 text-center">Eligibility</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredRefunds.map((item) => (
                  <tr key={item.id} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-foreground">{item.studentName}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.admissionNo} · {item.classGrade}
                      </div>
                      <div className="text-[11px] font-mono text-amber-600 mt-0.5">{item.refundRef}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-canvas border border-border text-foreground block w-fit mb-1">
                        {item.reasonCategory} ({item.refundType})
                      </span>
                      <p className="text-xs text-muted-foreground line-clamp-1">{item.reasonDetails}</p>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-muted-foreground">
                      <div>{item.originalReceiptNo}</div>
                      <div className="text-[11px] text-muted-foreground/70">Inv: {item.invoiceNo}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-foreground">
                      <div>US$ {item.refundAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
                      <div className="text-[11px] text-muted-foreground font-normal">
                        of US$ {item.originalAmount.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {item.policyEligible ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Eligible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600">
                          <AlertCircle className="w-3.5 h-3.5" /> Non-Compliant
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {item.status === "owner_approval_required" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800">
                          <Clock className="w-3 h-3" /> Owner Review
                        </span>
                      )}
                      {item.status === "approved" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200 dark:border-blue-800">
                          <CheckCircle2 className="w-3 h-3" /> Approved
                        </span>
                      )}
                      {item.status === "processed" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                          <FileCheck className="w-3 h-3" /> Disbursed
                        </span>
                      )}
                      {item.status === "rejected" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800">
                          <AlertCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedRefund(item)}
                          className="px-2.5 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-medium text-foreground transition"
                        >
                          Details
                        </button>

                        {item.status === "owner_approval_required" && (
                          <button
                            onClick={() => {
                              setSelectedRefund(item);
                              setIsOwnerModalOpen(true);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium transition"
                          >
                            Owner Sign-Off
                          </button>
                        )}

                        {item.status === "approved" && (
                          <button
                            onClick={() => handleProcessDisbursement(item.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition"
                          >
                            Disburse
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Initiate Refund Request */}
        {isNewRequestOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-foreground text-base">Initiate Formal Refund Request</h3>
                </div>
                <button
                  onClick={() => setIsNewRequestOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateRefundRequest} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Student & Account</label>
                  <select
                    value={newStudent}
                    onChange={(e) => setNewStudent(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    <option value="David Sterling (RVS-2024-001)">David Sterling (RVS-2024-001) · Grade 11</option>
                    <option value="Somtochukwu Eze (RVS-2024-008)">Somtochukwu Eze (RVS-2024-008) · Grade 11</option>
                    <option value="Zainab Abubakar (RVS-2024-002)">Zainab Abubakar (RVS-2024-002) · Grade 10</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Original Receipt No.</label>
                    <input
                      type="text"
                      value={newReceiptNo}
                      onChange={(e) => setNewReceiptNo(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Refund Amount (US$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Refund Type</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    >
                      <option value="Partial">Partial Fee Refund</option>
                      <option value="Full">100% Full Refund</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Reason Classification</label>
                    <select
                      value={newReasonCat}
                      onChange={(e) => setNewReasonCat(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    >
                      <option value="Overpayment">Overpayment / Credit</option>
                      <option value="Duplicate Transfer">Duplicate Transfer</option>
                      <option value="Boarding to Day Status">Boarding to Day Status</option>
                      <option value="Relocation / Transfer">Relocation / Transfer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Detailed Justification & File Ref</label>
                  <textarea
                    rows={2}
                    value={newReasonDetails}
                    onChange={(e) => setNewReasonDetails(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Disbursement Channel</label>
                  <select
                    value={newPayoutMethod}
                    onChange={(e) => setNewPayoutMethod(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    <option value="Original Bank Account">Original Bank Account (ACH/Wire)</option>
                    <option value="Card Reversal">Card Gateway Reversal (Paystack/Stripe)</option>
                    <option value="Credit Note Applied">Credit Note to Student Ledger</option>
                  </select>
                </div>

                {parseFloat(newAmount) > 500 && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300">
                    <strong>Notice:</strong> This request exceeds US$ 500.00 and will automatically be routed to the School Owner for statutory sign-off.
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsNewRequestOpen(false)}
                    className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: View Details */}
        {selectedRefund && !isOwnerModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <span className="text-xs font-mono text-amber-600 font-bold">{selectedRefund.refundRef}</span>
                  <h3 className="font-bold text-foreground text-base">{selectedRefund.studentName}</h3>
                </div>
                <button
                  onClick={() => setSelectedRefund(null)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Original Receipt:</span>
                  <span className="font-mono font-medium text-foreground">{selectedRefund.originalReceiptNo}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Original Payment:</span>
                  <span className="font-medium text-foreground">US$ {selectedRefund.originalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Refund Claimed:</span>
                  <span className="font-bold text-foreground">US$ {selectedRefund.refundAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Payout Method:</span>
                  <span className="text-foreground">{selectedRefund.payoutMethod}</span>
                </div>
                <div className="py-1">
                  <span className="text-muted-foreground block mb-0.5">Reason & Policy Notes:</span>
                  <div className="p-2.5 rounded-xl bg-canvas border border-border text-foreground">
                    {selectedRefund.reasonDetails}
                  </div>
                </div>
                <div className="py-1">
                  <span className="text-muted-foreground block mb-0.5">Audit & Approval Trail:</span>
                  <div className="p-2.5 rounded-xl bg-canvas border border-border space-y-1 text-[11px]">
                    <div>Bursar Review: {selectedRefund.approvalChain.bursarDate || "Pending"}</div>
                    {selectedRefund.approvalChain.ownerDate && (
                      <div className="text-emerald-600">Owner Sign-off: {selectedRefund.approvalChain.ownerDate}</div>
                    )}
                    {selectedRefund.approvalChain.approverNote && (
                      <div className="italic text-muted-foreground">"{selectedRefund.approvalChain.approverNote}"</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => setSelectedRefund(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-canvas border border-border hover:bg-muted text-foreground"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: School Owner Approval Gate */}
        {isOwnerModalOpen && selectedRefund && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-foreground text-base">School Owner Statutory Sign-Off</h3>
              </div>

              <div className="text-xs text-muted-foreground space-y-1.5">
                <p>
                  You are evaluating high-value refund request <strong>{selectedRefund.refundRef}</strong> for student{" "}
                  <strong>{selectedRefund.studentName}</strong>.
                </p>
                <div className="p-3 rounded-xl bg-canvas border border-border">
                  <div className="flex justify-between text-foreground">
                    <span>Authorized Amount:</span>
                    <span className="font-bold text-amber-600 text-sm">
                      US$ {selectedRefund.refundAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    Justification: {selectedRefund.reasonCategory}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Owner Executive Review Remarks
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter approval conditions or confirmation notes..."
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => setIsOwnerModalOpen(false)}
                  className="px-3 py-2 rounded-xl text-xs font-medium border border-border hover:bg-muted text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleOwnerApprove(selectedRefund.id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white"
                >
                  Authorize High-Value Refund
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
