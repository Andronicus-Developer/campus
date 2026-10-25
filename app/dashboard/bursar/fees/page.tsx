"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Copy,
  Download,
  ShieldCheck,
  Percent,
  Sliders,
  DollarSign,
  AlertCircle,
  Clock,
  ShieldAlert,
  Search,
  Filter,
  History,
  Send,
} from "lucide-react";

interface FeeItem {
  id: string;
  name: string;
  category: "Tuition" | "Admission" | "Examination" | "Meals" | "Transport" | "Boarding" | "Technology";
  applicableTo: "SSS" | "JSS" | "Primary" | "All";
  amount: number;
  frequency: "Per Term" | "Annual" | "One-Time";
  installmentsAllowed: boolean;
  installmentSplit?: string;
  description: string;
  approvalStatus: "Approved by Board" | "Pending Owner Review";
}

export default function BursarFeeStructuresPage() {
  const [activeTab, setActiveTab] = useState<"SSS" | "JSS" | "All">("SSS");
  const [search, setSearch] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeItem | null>(null);
  const [ownerApprovalModalOpen, setOwnerApprovalModalOpen] = useState(false);
  const [proposalReason, setProposalReason] = useState("");

  const [feeItems, setFeeItems] = useState<FeeItem[]>([
    {
      id: "fee-1",
      name: "Senior Secondary Tuition & Core Instruction",
      category: "Tuition",
      applicableTo: "SSS",
      amount: 1450,
      frequency: "Per Term",
      installmentsAllowed: true,
      installmentSplit: "60% Resumption / 40% Mid-Term",
      description: "Classroom instruction, master faculty hours, continuous assessments, and library access.",
      approvalStatus: "Approved by Board",
    },
    {
      id: "fee-2",
      name: "Senior Science STEM & Practical Apparatus Levy",
      category: "Examination",
      applicableTo: "SSS",
      amount: 180,
      frequency: "Per Term",
      installmentsAllowed: false,
      description: "Reagents, lab apparatus, chemistry/physics equipment, and laboratory safety gear.",
      approvalStatus: "Approved by Board",
    },
    {
      id: "fee-3",
      name: "Junior Secondary Tuition & Formative Modules",
      category: "Tuition",
      applicableTo: "JSS",
      amount: 1100,
      frequency: "Per Term",
      installmentsAllowed: true,
      installmentSplit: "50% Resumption / 50% Mid-Term",
      description: "Basic secondary education curriculum, remedial clinics, and continuous assessments.",
      approvalStatus: "Approved by Board",
    },
    {
      id: "fee-4",
      name: "Basic Technology & Creative Arts Materials",
      category: "Technology",
      applicableTo: "JSS",
      amount: 120,
      frequency: "Per Term",
      installmentsAllowed: false,
      description: "Introductory electronics, woodcraft workshop materials, and technical drawing supplies.",
      approvalStatus: "Approved by Board",
    },
    {
      id: "fee-5",
      name: "Digital Campus Cloud & LMS Portal License",
      category: "Technology",
      applicableTo: "All",
      amount: 70,
      frequency: "Per Term",
      installmentsAllowed: false,
      description: "Cloud student portal access, biometric turnstile security integration, and SMS/WhatsApp notifications.",
      approvalStatus: "Approved by Board",
    },
    {
      id: "fee-6",
      name: "Term Residential Boarding & Dining Services",
      category: "Boarding",
      applicableTo: "All",
      amount: 1850,
      frequency: "Per Term",
      installmentsAllowed: true,
      installmentSplit: "70% Resumption / 30% Mid-Term",
      description: "3 daily chef meals, laundry services, 24/7 boarding supervisor care, and weekend study halls.",
      approvalStatus: "Approved by Board",
    },
    {
      id: "fee-7",
      name: "School Bus Transit & Shuttle Service (Tier 1 Lekki Zone)",
      category: "Transport",
      applicableTo: "All",
      amount: 250,
      frequency: "Per Term",
      installmentsAllowed: false,
      description: "Air-conditioned morning and afternoon student shuttle transit with GPS vehicle tracking.",
      approvalStatus: "Approved by Board",
    },
    {
      id: "fee-8",
      name: "New Student Admission Dossier & Diagnostic Testing",
      category: "Admission",
      applicableTo: "All",
      amount: 150,
      frequency: "One-Time",
      installmentsAllowed: false,
      description: "Registration processing, entry diagnostic examination, and permanent cumulative file creation.",
      approvalStatus: "Approved by Board",
    },
  ]);

  const filteredFees = feeItems.filter((f) => {
    const matchesTab = activeTab === "All" || f.applicableTo === activeTab || f.applicableTo === "All";
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleEditFee = (fee: FeeItem) => {
    setSelectedFee(fee);
    setEditModalOpen(true);
  };

  const handleRequestOwnerApproval = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposalReason.trim()) return;
    setOwnerApprovalModalOpen(false);
    setProposalReason("");
    alert("Fee structure tariff adjustment proposal dispatched to the School Owner and Board of Governors for formal approval.");
  };

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <Layers className="size-4" />
              Bursar Portal · Financial Policy &amp; Tariffs
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Fee Structures &amp; Schedules
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Configure tuition, boarding, laboratory, and technology fee schedules by class and term.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Official 2025/2026 Parent Fee Schedule PDF downloaded successfully.")}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="size-4 text-amber-600" />
              Publish Schedule (PDF)
            </button>
            <button
              onClick={() => setOwnerApprovalModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Plus className="size-4" />
              Propose Tariff Adjustment
            </button>
          </div>
        </div>

        {/* Governance / Approval Gate Alert */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-start gap-3">
          <ShieldAlert className="size-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-ink-soft">
            <span className="font-bold text-ink block">Fee Increase &amp; Governance Policy Control</span>
            <p>
              Fee adjustments, new mandatory levy creations, and school-wide pricing changes require formal sign-off
              from the School Owner or Board of Trustees before becoming active. The Bursar administers billing
              within approved financial policies.
            </p>
          </div>
        </div>

        {/* Level Filters & Search Bar */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fee category, description, or level..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-canvas border border-border focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-canvas border border-border rounded-xl p-1 text-xs">
            {(["SSS", "JSS", "All"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg font-bold transition ${
                  activeTab === tab
                    ? "bg-amber-600 text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "All" ? "All Levels" : `${tab} Cohort`}
              </button>
            ))}
          </div>
        </div>

        {/* Fee Structures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFees.map((fee) => (
            <div
              key={fee.id}
              className="p-5 rounded-3xl bg-card border border-border shadow-xs hover:border-amber-500/40 transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                    {fee.category}
                  </span>
                  <span className="font-mono text-xs font-semibold text-muted-foreground">
                    {fee.frequency}
                  </span>
                </div>

                <h3 className="text-base font-bold text-foreground">
                  {fee.name}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2">
                  {fee.description}
                </p>

                <div className="mt-4 p-3 rounded-2xl bg-canvas border border-border space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Approved Tariff</span>
                  <div className="text-xl font-black text-foreground">
                    US$ {fee.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  {fee.installmentsAllowed && fee.installmentSplit && (
                    <div className="text-[11px] text-emerald-600 font-semibold pt-0.5">
                      Installments: {fee.installmentSplit}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 text-[11px]">
                  <CheckCircle2 className="size-3" /> {fee.approvalStatus}
                </span>

                <button
                  onClick={() => handleEditFee(fee)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border hover:bg-muted font-semibold text-foreground transition"
                >
                  <Edit2 className="size-3" />
                  Edit Rule
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Missing Fee Structure Radar Notice */}
        <div className="p-5 rounded-3xl bg-card border border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600" />
              <span>Student Cohort Fee Assignment Status</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              842 of 842 registered students have assigned fee structures for Term 2. 0 missing configurations detected.
            </p>
          </div>

          <button
            onClick={() => alert("Verification run completed: 100% of students mapped to active fee structures.")}
            className="px-4 py-2 rounded-xl bg-canvas border border-border hover:bg-muted text-foreground font-semibold text-xs transition shrink-0"
          >
            Run Integrity Audit
          </button>
        </div>

        {/* Propose Tariff Adjustment Modal */}
        {ownerApprovalModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface border border-line rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="size-5 text-amber-600" />
                  <h3 className="text-base font-extrabold text-ink">Propose Fee Structure Modification</h3>
                </div>
                <button
                  onClick={() => setOwnerApprovalModalOpen(false)}
                  className="size-7 rounded-lg hover:bg-surface-raised flex items-center justify-center text-ink-muted"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                In compliance with school financial governance, all fee tariff adjustments require approval by the
                School Owner or Board. Submit proposed rates with fiscal justification.
              </p>

              <form onSubmit={handleRequestOwnerApproval} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-ink font-semibold mb-1">Fee Category to Adjust</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none">
                    <option>Senior Secondary Tuition Fee</option>
                    <option>Senior Science Laboratory Consumables</option>
                    <option>Residential Boarding &amp; Catering</option>
                    <option>School Bus Transit Shuttle</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-ink font-semibold mb-1">Proposed Amount (USD)</label>
                    <input
                      type="number"
                      placeholder="e.g. 1550"
                      className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-ink font-semibold mb-1">Effective Term</label>
                    <input
                      type="text"
                      defaultValue="Term 3, 2025/2026"
                      className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-1">Fiscal Justification / Reason</label>
                  <textarea
                    rows={4}
                    required
                    value={proposalReason}
                    onChange={(e) => setProposalReason(e.target.value)}
                    placeholder="e.g. Laboratory apparatus renewal, inflation on imported consumables, or curriculum expansion..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setOwnerApprovalModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line hover:bg-surface-raised font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold transition"
                  >
                    Submit for Owner Approval
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
