"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  DollarSign,
  FileText,
  Users,
  Calendar,
  Download,
  Plus,
  Percent,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  FileCheck,
  ExternalLink,
} from "lucide-react";

interface ConcessionRecord {
  id: string;
  code: string;
  studentName: string;
  admissionNo: string;
  classGrade: string;
  category: "Academic Merit" | "Sibling Discount" | "Staff Dependent" | "Need-Based Bursary" | "Sports Endowment";
  discountType: "Percentage" | "Fixed Amount";
  value: number; // e.g., 50 for 50%, or 500 for $500
  effectiveTerms: string; // e.g., "Full Year (Terms 1 - 3)"
  expiryDate: string;
  approvedBy: string;
  referenceDoc: string;
  status: "active" | "expiring_soon" | "pending_approval" | "expired";
  utilizationUsd: number;
}

export default function BursarConcessionsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "expiring_soon" | "pending_approval" | "expired">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConcession, setSelectedConcession] = useState<ConcessionRecord | null>(null);

  // Form inputs
  const [studentName, setStudentName] = useState("Kelechi Nwosu");
  const [admissionNo, setAdmissionNo] = useState("RVS-2024-034");
  const [classGrade, setClassGrade] = useState("Grade 10 (SSS 1A)");
  const [category, setCategory] = useState<ConcessionRecord["category"]>("Academic Merit");
  const [discountType, setDiscountType] = useState<ConcessionRecord["discountType"]>("Percentage");
  const [value, setValue] = useState("25");
  const [effectiveTerms, setEffectiveTerms] = useState("Full Year (Terms 1 - 3)");
  const [referenceDoc, setReferenceDoc] = useState("Board Minute #BM-2026-11");
  const [approver, setApprover] = useState("School Owner (Executive Chair)");

  const [concessions, setConcessions] = useState<ConcessionRecord[]>([
    {
      id: "CON-001",
      code: "SCHOLAR-2026-01",
      studentName: "David Sterling",
      admissionNo: "RVS-2024-001",
      classGrade: "Grade 11 (SSS 2A)",
      category: "Sibling Discount",
      discountType: "Percentage",
      value: 10,
      effectiveTerms: "Full Year (Terms 1 - 3)",
      expiryDate: "Jul 31, 2026",
      approvedBy: "School Bursary Policy (Automatic)",
      referenceDoc: "Family File #FAM-0492",
      status: "active",
      utilizationUsd: 435.0,
    },
    {
      id: "CON-002",
      code: "SCHOLAR-2026-02",
      studentName: "Somtochukwu Eze",
      admissionNo: "RVS-2024-008",
      classGrade: "Grade 11 (SSS 2B)",
      category: "Academic Merit",
      discountType: "Percentage",
      value: 50,
      effectiveTerms: "Full Year (Terms 1 - 3)",
      expiryDate: "Jul 31, 2026",
      approvedBy: "Principal & School Owner",
      referenceDoc: "Executive Resolution #RES-882",
      status: "active",
      utilizationUsd: 2175.0,
    },
    {
      id: "CON-003",
      code: "SCHOLAR-2026-03",
      studentName: "Zainab Abubakar",
      admissionNo: "RVS-2024-002",
      classGrade: "Grade 10 (SSS 1B)",
      category: "Need-Based Bursary",
      discountType: "Fixed Amount",
      value: 600,
      effectiveTerms: "Term 1 & Term 2",
      expiryDate: "Mar 30, 2026",
      approvedBy: "Bursary Welfare Committee",
      referenceDoc: "Welfare Grant #WLF-091",
      status: "expiring_soon",
      utilizationUsd: 600.0,
    },
    {
      id: "CON-004",
      code: "SCHOLAR-2026-04",
      studentName: "Daniel Bassey",
      admissionNo: "RVS-2024-015",
      classGrade: "Grade 8 (JSS 2A)",
      category: "Staff Dependent",
      discountType: "Percentage",
      value: 40,
      effectiveTerms: "Full Year (Terms 1 - 3)",
      expiryDate: "Jul 31, 2026",
      approvedBy: "HR & School Administrator",
      referenceDoc: "Staff Entitlement #EMP-012",
      status: "active",
      utilizationUsd: 1440.0,
    },
    {
      id: "CON-005",
      code: "SCHOLAR-2026-05",
      studentName: "Emeka Okonkwo",
      admissionNo: "RVS-2024-067",
      classGrade: "Grade 9 (JSS 3B)",
      category: "Sports Endowment",
      discountType: "Percentage",
      value: 30,
      effectiveTerms: "Term 1 Only",
      expiryDate: "Dec 15, 2025",
      approvedBy: "Athletics Director & Bursar",
      referenceDoc: "Athletics Voucher #ATH-441",
      status: "expired",
      utilizationUsd: 435.0,
    },
    {
      id: "CON-006",
      code: "SCHOLAR-2026-06",
      studentName: "Fatima Al-Hassan",
      admissionNo: "RVS-2024-090",
      classGrade: "Grade 12 (SSS 3A)",
      category: "Academic Merit",
      discountType: "Percentage",
      value: 75,
      effectiveTerms: "Terms 2 & 3",
      expiryDate: "Jul 31, 2026",
      approvedBy: "Pending School Owner Sign-Off",
      referenceDoc: "Merit Application #APP-2026-9",
      status: "pending_approval",
      utilizationUsd: 0.0,
    },
  ]);

  const totalBudget = 60000.0;
  const utilizedBudget = concessions.reduce((acc, c) => acc + c.utilizationUsd, 0);
  const remainingBudget = totalBudget - utilizedBudget;
  const activeCount = concessions.filter((c) => c.status === "active").length;
  const expiringCount = concessions.filter((c) => c.status === "expiring_soon").length;

  const handleCreateConcession = (e: React.FormEvent) => {
    e.preventDefault();
    const valNum = parseFloat(value) || 0;
    const isHighValue = (discountType === "Percentage" && valNum > 25) || (discountType === "Fixed Amount" && valNum > 500);

    const newRecord: ConcessionRecord = {
      id: `CON-${String(concessions.length + 1).padStart(3, "0")}`,
      code: `SCHOLAR-2026-${String(concessions.length + 1).padStart(2, "0")}`,
      studentName,
      admissionNo,
      classGrade,
      category,
      discountType,
      value: valNum,
      effectiveTerms,
      expiryDate: "Jul 31, 2026",
      approvedBy: isHighValue ? "Pending School Owner Approval" : approver,
      referenceDoc,
      status: isHighValue ? "pending_approval" : "active",
      utilizationUsd: discountType === "Fixed Amount" ? valNum : (1450 * valNum) / 100,
    };

    setConcessions([newRecord, ...concessions]);
    setIsModalOpen(false);
    setToast(
      isHighValue
        ? `Concession ${newRecord.code} recorded. Since waiver exceeds 25%, it requires School Owner approval.`
        : `Concession ${newRecord.code} created and applied to student billing ledger.`
    );
  };

  const filteredConcessions = concessions.filter((c) => {
    const matchesFilter = filter === "all" || c.status === filter;
    const matchesSearch =
      c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <Award className="w-4 h-4" />
              Financial Assistance & Concessions · Section I
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Scholarships, Discounts & Fee Waivers
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Strict governance of authorized sibling discounts, academic endowments, and staff tuition waivers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              Record Approved Concession
            </button>
            <button
              onClick={() => {
                alert("Generating Annual Scholarship & Concession Utilization Audit (PDF & Excel)...");
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4 text-muted-foreground" />
              Waiver Report
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

        {/* Governance Safeguard */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-foreground">Discretionary Waiver Authority Cap:</span>{" "}
            <span className="text-muted-foreground">
              The Bursar may only record scholarships that cite verified Board minutes, HR staff entitlements, or automated sibling rebates. Concessions exceeding <strong>25%</strong> of tuition strictly require electronic sign-off from the School Owner.
            </span>
          </div>
        </div>

        {/* Budget Utilization Tracker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Annual Waiver Budget</span>
              <DollarSign className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-foreground">
              US$ {totalBudget.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Authorized Board cap for 2025/2026</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Utilized / Allocated</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">
              US$ {utilizedBudget.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {((utilizedBudget / totalBudget) * 100).toFixed(1)}% of annual endowment allocated
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Remaining Grant Pool</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600">
              US$ {remainingBudget.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Available for hardship/exceptional cases</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Active Beneficiaries</span>
              <Users className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-black text-purple-600">{activeCount} Students</div>
            <div className="text-xs text-amber-600 font-semibold mt-1">
              {expiringCount} concessions expiring this term
            </div>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 bg-card border border-border rounded-xl p-1 text-xs">
            {(
              [
                { key: "all", label: "All Concessions" },
                { key: "active", label: "Active" },
                { key: "expiring_soon", label: "Expiring Soon" },
                { key: "pending_approval", label: "Pending Owner" },
                { key: "expired", label: "Expired" },
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
              placeholder="Search student, concession ref..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Concessions Table */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Student / Code</th>
                  <th className="py-3 px-4">Concession Category</th>
                  <th className="py-3 px-4 text-center">Benefit / Rate</th>
                  <th className="py-3 px-4 text-right">Term Value</th>
                  <th className="py-3 px-4">Validity / Expiry</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Audit Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredConcessions.map((item) => (
                  <tr key={item.id} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-foreground">{item.studentName}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.admissionNo} · {item.classGrade}
                      </div>
                      <div className="text-[11px] font-mono text-amber-600 mt-0.5">{item.code}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-canvas border border-border text-foreground">
                        {item.category}
                      </span>
                      <div className="text-[11px] text-muted-foreground mt-1">Ref: {item.referenceDoc}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-foreground">
                      {item.discountType === "Percentage" ? (
                        <span className="inline-flex items-center gap-0.5 text-blue-600 font-extrabold text-sm">
                          {item.value}% <span className="text-[11px] font-normal text-muted-foreground">off</span>
                        </span>
                      ) : (
                        <span className="text-emerald-600 font-extrabold text-sm">
                          US$ {item.value.toFixed(2)}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-foreground">
                      US$ {item.utilizationUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-foreground font-medium">{item.effectiveTerms}</div>
                      <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        Expires: {item.expiryDate}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {item.status === "active" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      )}
                      {item.status === "expiring_soon" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800">
                          <AlertTriangle className="w-3 h-3" /> Expiring Soon
                        </span>
                      )}
                      {item.status === "pending_approval" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-50 dark:bg-purple-950/50 text-purple-600 border border-purple-200 dark:border-purple-800">
                          <Clock className="w-3 h-3" /> Owner Approval
                        </span>
                      )}
                      {item.status === "expired" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                          Expired
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedConcession(item)}
                          className="px-2.5 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-medium text-foreground transition"
                        >
                          Certificate
                        </button>
                        {item.status === "pending_approval" && (
                          <button
                            onClick={() => {
                              alert(`Forwarding Concession Request ${item.code} to School Owner dashboard.`);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium transition"
                          >
                            Route
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

        {/* Modal: Record Approved Concession */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-foreground text-base">Record Approved Scholarship or Concession</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateConcession} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Student Full Name</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Admission Number</label>
                    <input
                      type="text"
                      value={admissionNo}
                      onChange={(e) => setAdmissionNo(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Class / Form</label>
                    <input
                      type="text"
                      value={classGrade}
                      onChange={(e) => setClassGrade(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Concession Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    >
                      <option value="Academic Merit">Academic Merit (Top Performer)</option>
                      <option value="Sibling Discount">Sibling Discount (10% rebate)</option>
                      <option value="Staff Dependent">Staff Dependent (Teaching/Admin)</option>
                      <option value="Need-Based Bursary">Need-Based Bursary (Hardship)</option>
                      <option value="Sports Endowment">Sports & Arts Endowment</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Waiver Calculation Basis</label>
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    >
                      <option value="Percentage">Percentage of Tuition (%)</option>
                      <option value="Fixed Amount">Fixed Lump-Sum Credit ($)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">
                      {discountType === "Percentage" ? "Discount Rate (%)" : "Credit Amount (US$)"}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground font-semibold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Effective Academic Terms</label>
                  <select
                    value={effectiveTerms}
                    onChange={(e) => setEffectiveTerms(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    <option value="Full Year (Terms 1 - 3)">Full Academic Year (Terms 1 - 3)</option>
                    <option value="Term 1 Only">Term 1 Only</option>
                    <option value="Terms 2 & 3">Terms 2 & 3</option>
                    <option value="Continuous (Until Graduation)">Continuous (Until Graduation)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Official Reference Document / Minute</label>
                    <input
                      type="text"
                      value={referenceDoc}
                      onChange={(e) => setReferenceDoc(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Authorizing Body / Signatory</label>
                    <input
                      type="text"
                      value={approver}
                      onChange={(e) => setApprover(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                      required
                    />
                  </div>
                </div>

                {parseFloat(value) > 25 && discountType === "Percentage" && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300">
                    <strong>High-Waiver Policy Warning:</strong> This discount exceeds 25% and must be confirmed by the School Owner before invoices reflect the concession deduction.
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold"
                  >
                    Save Concession Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: View Certificate */}
        {selectedConcession && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <span className="text-xs font-mono text-amber-600 font-bold">{selectedConcession.code}</span>
                  <h3 className="font-bold text-foreground text-base">Scholarship Verification Slip</h3>
                </div>
                <button
                  onClick={() => setSelectedConcession(null)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Student Name:</span>
                  <span className="font-semibold text-foreground">{selectedConcession.studentName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Class & Admission:</span>
                  <span className="text-foreground">{selectedConcession.classGrade} · {selectedConcession.admissionNo}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Waiver Classification:</span>
                  <span className="font-medium text-foreground">{selectedConcession.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Benefit Allocation:</span>
                  <span className="font-bold text-amber-600 text-sm">
                    {selectedConcession.discountType === "Percentage"
                      ? `${selectedConcession.value}% Tuition Reduction`
                      : `US$ ${selectedConcession.value.toFixed(2)} Fixed Grant`}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Audited Reference Doc:</span>
                  <span className="font-mono text-foreground">{selectedConcession.referenceDoc}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Authorizing Signatory:</span>
                  <span className="text-foreground">{selectedConcession.approvedBy}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Validity Expiration:</span>
                  <span className="text-foreground">{selectedConcession.expiryDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => {
                    alert(`Printing Official Concession Award Certificate for ${selectedConcession.studentName}...`);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-medium border border-border hover:bg-muted text-foreground flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Print Award Certificate
                </button>
                <button
                  onClick={() => setSelectedConcession(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white"
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
