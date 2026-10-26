"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  FileSpreadsheet,
  FileText,
  Filter,
  GraduationCap,
  Landmark,
  Lock,
  PieChart,
  Search,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";

interface ExpenditureRequisition {
  id: string;
  department: string;
  title: string;
  amountUsd: number;
  submittedBy: string;
  date: string;
  purpose: string;
  withinLimit: boolean; // limit is $5,000.00
  status: "pending" | "approved" | "escalated_owner";
}

const INITIAL_REQUISITIONS: ExpenditureRequisition[] = [
  {
    id: "req-1",
    department: "Sciences Division",
    title: "WAEC Science Practical Reagents & Titrants",
    amountUsd: 2450.0,
    submittedBy: "Dr. Kenneth Obi (HOD Sciences)",
    date: "Today, 09:30 AM",
    purpose: "Replenishment of spectrophotometers, hydrochloric acid solutions, and volumetric flasks for mock practicals.",
    withinLimit: true,
    status: "pending",
  },
  {
    id: "req-2",
    department: "Sports & Physical Education",
    title: "Inter-House Sports Trophies & Track Equipment",
    amountUsd: 1800.0,
    submittedBy: "Mr. Kenneth Adeleke (Sports Master)",
    date: "Yesterday, 02:15 PM",
    purpose: "Medals, ribbons, track timing gates, and first aid kits for annual sports day.",
    withinLimit: true,
    status: "pending",
  },
  {
    id: "req-3",
    department: "ICT & Infrastructure",
    title: "Campus Fibre-Optic Core Switch Upgrade",
    amountUsd: 6850.0,
    submittedBy: "Engr. Patrick Bassey (School Admin)",
    date: "Feb 16, 2026",
    purpose: "Enterprise gigabit switch replacement for student computer laboratory.",
    withinLimit: false, // > $5,000.00 requires School Owner
    status: "escalated_owner",
  },
];

interface ScholarshipItem {
  id: string;
  studentName: string;
  admissionNo: string;
  classArm: string;
  waiverType: "Academic Merit" | "Staff Child Concession" | "Financial Hardship";
  amountUsd: number;
  percentage: number;
  justification: string;
  status: "pending" | "approved";
}

const INITIAL_SCHOLARSHIPS: ScholarshipItem[] = [
  {
    id: "sch-1",
    studentName: "Tobi Adeleke",
    admissionNo: "RC-2023-0184",
    classArm: "SSS 2 Science A",
    waiverType: "Academic Merit",
    amountUsd: 475.0,
    percentage: 25,
    justification: "Gold medal laureate in National Mathematics & STEM Olympiad.",
    status: "pending",
  },
  {
    id: "sch-2",
    studentName: "Kemi Peters",
    admissionNo: "RC-2024-0512",
    classArm: "JSS 1 Silver",
    waiverType: "Staff Child Concession",
    amountUsd: 380.0,
    percentage: 20,
    justification: "Daughter of full-time academic biology instructor Mrs. Grace Okon.",
    status: "approved",
  },
];

export default function PrincipalFinancePage() {
  const [requisitions, setRequisitions] = useState<ExpenditureRequisition[]>(INITIAL_REQUISITIONS);
  const [scholarships, setScholarships] = useState<ScholarshipItem[]>(INITIAL_SCHOLARSHIPS);
  const [activeTab, setActiveTab] = useState<"overview" | "requisitions" | "scholarships" | "budgets">("overview");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleApproveRequisition = (id: string, title: string, amount: number) => {
    setRequisitions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
    );
    showToast(`Approved US$ ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} for "${title}". Bursar notified.`);
  };

  const handleApproveScholarship = (id: string, student: string) => {
    setScholarships((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "approved" } : s))
    );
    showToast(`Tuition waiver approved for ${student}. Concession credited to bursary invoice.`);
  };

  return (
    <DashboardLayout currentRole="principal">
      <div className="space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950 px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in slide-in-from-top-3">
            <CheckCircle2 className="size-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-amber-100 px-3 py-1 font-mono text-[11px] font-bold text-amber-800">
                  Section J · Financial Oversight
                </span>
                <span className="font-mono text-xs text-ink-muted">Delegated Authority Limit: US$ 5,000.00</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Institutional Revenue Pulse &amp; Budget Oversight</h2>
              <p className="text-xs text-ink-muted max-w-3xl">
                Monitor fee collection trends in US$, track uncollected balances, endorse academic scholarships, and exercise signing authority for operational requisitions within your delegated US$ 5,000.00 limit.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Total Fees Collected</span>
                <span className="text-lg font-black text-emerald-600">US$ 1,048,450.00</span>
              </div>
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Outstanding Debt</span>
                <span className="text-lg font-black text-danger">US$ 136,550.00</span>
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "overview"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Collection Pulse &amp; Recovery
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("requisitions")}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "requisitions"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                <Clock className="size-3.5 text-amber-600 animate-pulse" />
                <span>Expense Requisitions ({requisitions.filter((r) => r.status === "pending").length} Pending)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("scholarships")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "scholarships"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Scholarships &amp; Fee Waivers ({scholarships.filter((s) => s.status === "pending").length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("budgets")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "budgets"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Departmental Budgets vs Actuals
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs text-ink-muted">
              <Lock className="size-3.5 text-amber-600" />
              <span>Cash receipts &amp; bank reconciliations strictly restricted to Bursary division</span>
            </div>
          </div>
        </div>

        {/* TAB 1: COLLECTION PULSE */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Primary KPI Cards (US$) */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
                <span className="font-mono text-[10px] font-bold text-ink-muted uppercase">Total Billed (Term 2)</span>
                <span className="mt-2 block font-mono text-2xl font-black text-ink">US$ 1,185,000.00</span>
                <p className="text-xs text-ink-muted mt-1">842 students enrolled across 32 arms</p>
              </div>

              <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
                <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase">Confirmed Collections</span>
                <span className="mt-2 block font-mono text-2xl font-black text-emerald-600">US$ 1,048,450.00</span>
                <p className="text-xs text-emerald-700 font-semibold mt-1">88.5% recovery rate</p>
              </div>

              <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
                <span className="font-mono text-[10px] font-bold text-danger uppercase">Outstanding Receivables</span>
                <span className="mt-2 block font-mono text-2xl font-black text-danger">US$ 136,550.00</span>
                <p className="text-xs text-ink-muted mt-1">11.5% balance across 98 guardians</p>
              </div>

              <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
                <span className="font-mono text-[10px] font-bold text-primary uppercase">Scholarships &amp; Waivers</span>
                <span className="mt-2 block font-mono text-2xl font-black text-primary">US$ 42,600.00</span>
                <p className="text-xs text-ink-muted mt-1">Authorized concessions &amp; aid</p>
              </div>
            </div>

            {/* Collection Progress by Class Stream */}
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
              <div className="border-b border-line pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-ink">Tuition Recovery by Class Division</h3>
                  <p className="text-xs text-ink-muted">Aggregated financial progress reported by the Bursar.</p>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-600">Average: 88.5% Recovery</span>
              </div>

              <div className="space-y-4">
                {[
                  { division: "Senior Secondary 3 (Graduating Class)", billed: 235600, collected: 228532, pct: 97.0 },
                  { division: "Senior Secondary 2 (Sciences & Commercial)", billed: 269800, collected: 240122, pct: 89.0 },
                  { division: "Senior Secondary 1 (Entry Class)", billed: 254600, collected: 221502, pct: 87.0 },
                  { division: "Junior Secondary (JSS 1 - 3)", billed: 425000, collected: 358294, pct: 84.3 },
                ].map((div) => (
                  <div key={div.division} className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span className="text-ink">{div.division}</span>
                      <span className="font-mono text-ink">
                        US$ {div.collected.toLocaleString()} / US$ {div.billed.toLocaleString()}{" "}
                        <strong className="text-emerald-600 ml-1">({div.pct}%)</strong>
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-surface-raised overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${div.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EXPENDITURE REQUISITIONS */}
        {activeTab === "requisitions" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Departmental Expenditure Requisitions</h3>
                <p className="text-xs text-ink-muted">
                  Principal possesses delegated sign-off authority for expenditures up to <strong>US$ 5,000.00</strong>. Requisitions above this ceiling are automatically escalated to the School Owner.
                </p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 font-mono text-xs font-bold text-amber-800 border border-amber-200">
                {requisitions.filter((r) => r.status === "pending").length} Requisition(s) Pending Sign-Off
              </span>
            </div>

            <div className="space-y-3">
              {requisitions.map((req) => (
                <div
                  key={req.id}
                  className={`rounded-2xl border p-5 transition-all ${
                    !req.withinLimit
                      ? "border-purple-300 bg-purple-50/40"
                      : "border-line bg-surface-raised"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl text-xs">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-primary-light px-2.5 py-0.5 font-mono text-[10px] font-bold text-primary">
                          {req.department}
                        </span>
                        <span className="font-mono text-ink-muted">{req.date}</span>
                        {!req.withinLimit && (
                          <span className="rounded bg-purple-100 px-2 py-0.5 font-mono text-[10px] font-bold text-purple-800">
                            Exceeds $5k Ceiling &rarr; Owner Approval
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-ink">{req.title}</h4>
                      <p className="text-ink-soft">{req.purpose}</p>

                      <div className="pt-1 flex items-center gap-4 font-mono text-[11px] text-ink-muted">
                        <span>Submitted by: <strong>{req.submittedBy}</strong></span>
                        <span>Amount: <strong className="text-ink text-sm">US$ {req.amountUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right space-y-1.5">
                      {req.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success-light px-3.5 py-1.5 font-mono text-xs font-bold text-success-deep">
                          <CheckCircle2 className="size-4" />
                          Approved by Principal
                        </span>
                      ) : req.status === "escalated_owner" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3.5 py-1.5 font-mono text-xs font-bold text-purple-900 border border-purple-300">
                          <ShieldCheck className="size-4" />
                          Escalated to School Owner
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApproveRequisition(req.id, req.title, req.amountUsd)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all"
                        >
                          <CheckCircle2 className="size-4" />
                          <span>Authorize US$ {req.amountUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SCHOLARSHIPS & WAIVERS */}
        {activeTab === "scholarships" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Scholarship &amp; Tuition Fee Waiver Endorsements</h3>
                <p className="text-xs text-ink-muted">
                  Endorse merit and staff concessions for Bursar ledger adjustment.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-primary">
                {scholarships.filter((s) => s.status === "pending").length} Awaiting Principal Endorsement
              </span>
            </div>

            <div className="space-y-3">
              {scholarships.map((s) => (
                <div key={s.id} className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2 text-xs">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink text-sm">{s.studentName}</span>
                        <span className="font-mono text-primary font-bold">({s.admissionNo})</span>
                        <span className="rounded bg-amber-100 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800">
                          {s.waiverType} ({s.percentage}%)
                        </span>
                      </div>
                      <p className="text-ink-soft mt-1">Justification: <strong>{s.justification}</strong></p>
                      <span className="font-mono text-xs font-bold text-emerald-700 mt-1 block">
                        Credit Concession: US$ {s.amountUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="shrink-0 text-right">
                      {s.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success-light px-3 py-1 font-mono text-xs font-bold text-success-deep">
                          <CheckCircle2 className="size-3.5" />
                          Endorsed
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApproveScholarship(s.id, s.studentName)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
                        >
                          <CheckCircle2 className="size-3.5" />
                          <span>Endorse Waiver</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DEPARTMENTAL BUDGETS */}
        {activeTab === "budgets" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-ink">Departmental Operating Budgets vs Actual Spend</h3>
                <p className="text-xs text-ink-muted">Term 2 allocated budgets overseen by academic leadership.</p>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600">All Departments Within Budget</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: "Sciences & Labs", budget: 15000, spent: 10450, pct: 69.7 },
                { name: "ICT & Computing", budget: 12000, spent: 8900, pct: 74.2 },
                { name: "Sports & Athletics", budget: 8000, spent: 4800, pct: 60.0 },
                { name: "Arts & Humanities", budget: 6000, spent: 3400, pct: 56.7 },
              ].map((b) => (
                <div key={b.name} className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2 text-xs">
                  <span className="font-bold text-ink text-sm block">{b.name}</span>
                  <div className="flex justify-between font-mono">
                    <span className="text-ink-muted">Spent: US$ {b.spent.toLocaleString()}</span>
                    <span className="font-bold text-ink">US$ {b.budget.toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-surface overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${b.pct}%` }} />
                  </div>
                  <span className="text-[10px] text-ink-muted block text-right font-mono">{b.pct}% utilized</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
