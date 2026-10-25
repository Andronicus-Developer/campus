"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  BarChart3,
  FileSpreadsheet,
  Download,
  Calendar,
  Filter,
  Search,
  CheckCircle2,
  FileText,
  Printer,
  Share2,
  DollarSign,
  TrendingUp,
  PieChart,
  ShieldCheck,
  Eye,
  Layers,
  Building2,
  Landmark,
} from "lucide-react";

interface ReportItem {
  id: string;
  title: string;
  category: "Executive & Statutory" | "Collections & Billing" | "Channel & Cashier" | "Debt & Receivables";
  description: string;
  lastGenerated: string;
  format: "PDF & Excel" | "CSV Only" | "PDF Only";
  frequency: "Daily" | "Weekly" | "Termly" | "Annual";
  sensitivity: "Owner & Principal" | "Bursar Internal" | "Standard Finance";
}

export default function BursarReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [academicYear, setAcademicYear] = useState("2025/2026");
  const [academicTerm, setAcademicTerm] = useState("Term 1");
  const [toast, setToast] = useState<string | null>(null);
  const [previewReport, setPreviewReport] = useState<ReportItem | null>(null);

  const reports: ReportItem[] = [
    {
      id: "REP-001",
      title: "Comprehensive Income & Expenditure Statement",
      category: "Executive & Statutory",
      description: "Audited statement of terminal revenue realization, operational outlays, net operating surplus, and capital reserves.",
      lastGenerated: "Today, 08:30 AM",
      format: "PDF & Excel",
      frequency: "Termly",
      sensitivity: "Owner & Principal",
    },
    {
      id: "REP-002",
      title: "Terminal Fee Collection Summary by Class & Grade",
      category: "Collections & Billing",
      description: "Granular breakdown of billings, collections, and outstanding receivables across Nursery, Primary, JSS, and SSS streams.",
      lastGenerated: "Today, 09:15 AM",
      format: "PDF & Excel",
      frequency: "Weekly",
      sensitivity: "Bursar Internal",
    },
    {
      id: "REP-003",
      title: "Accounts Receivable Aging & Debt Recovery Schedule",
      category: "Debt & Receivables",
      description: "Aged debtor schedule categorized into 0-30 days, 31-60 days, and 60+ days with promised payment milestones.",
      lastGenerated: "Yesterday",
      format: "PDF & Excel",
      frequency: "Weekly",
      sensitivity: "Bursar Internal",
    },
    {
      id: "REP-004",
      title: "Daily Cash Counter & Bursary Desk Settlement Report",
      category: "Channel & Cashier",
      description: "Reconciled physical cash register intake by cashier desk, cash drawer count sign-offs, and bank courier manifest.",
      lastGenerated: "Today, 04:45 PM",
      format: "PDF & Excel",
      frequency: "Daily",
      sensitivity: "Standard Finance",
    },
    {
      id: "REP-005",
      title: "Bank & Payment Gateway Settlement Reconciliation Certificate",
      category: "Channel & Cashier",
      description: "Three-way verification ledger matching Campus360 receipts with Chase Bank feed and Paystack/Flutterwave payouts.",
      lastGenerated: "Jan 25, 2026",
      format: "PDF Only",
      frequency: "Termly",
      sensitivity: "Owner & Principal",
    },
    {
      id: "REP-006",
      title: "Scholarship, Sibling Concession & Fee Waiver Audit",
      category: "Executive & Statutory",
      description: "Utilization audit of authorized academic scholarships, staff dependent rebates, and hardship bursaries against budget caps.",
      lastGenerated: "Jan 24, 2026",
      format: "PDF & Excel",
      frequency: "Termly",
      sensitivity: "Owner & Principal",
    },
    {
      id: "REP-007",
      title: "Fee Category Revenue Realization (Tuition vs Boarding vs Transport)",
      category: "Collections & Billing",
      description: "Analysis of revenue yields per tariff component: Tuition, Science Lab, Boarding House, Meals, Uniforms, and ICT levy.",
      lastGenerated: "Jan 23, 2026",
      format: "PDF & Excel",
      frequency: "Termly",
      sensitivity: "Bursar Internal",
    },
    {
      id: "REP-008",
      title: "Departmental Budget vs. Actual Expenditure Variance",
      category: "Executive & Statutory",
      description: "Comparison of approved department budgets against incurred PO expenses and remaining operating buffers.",
      lastGenerated: "Jan 22, 2026",
      format: "PDF & Excel",
      frequency: "Termly",
      sensitivity: "Owner & Principal",
    },
  ];

  const handleExport = (report: ReportItem, format: "pdf" | "excel" | "csv") => {
    setToast(`Generating ${format.toUpperCase()} for "${report.title}" (${academicYear} ${academicTerm})...`);
    setTimeout(() => {
      setToast(`Downloaded: ${report.title.replace(/\s+/g, "_")}_${academicTerm}.${format}`);
    }, 900);
  };

  const filteredReports = reports.filter((r) => {
    if (selectedCategory === "all") return true;
    return r.category === selectedCategory;
  });

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <BarChart3 className="w-4 h-4" />
              Financial Intelligence · Section K
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Financial Reporting & Analytics
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Authorized institutional reports for school management, the Principal, the School Owner, and external auditors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="px-3 py-2 rounded-xl bg-card border border-border text-xs font-semibold text-foreground focus:ring-2 focus:ring-amber-500/30"
            >
              <option value="2025/2026">Academic Year: 2025/2026</option>
              <option value="2024/2025">Academic Year: 2024/2025</option>
            </select>

            <select
              value={academicTerm}
              onChange={(e) => setAcademicTerm(e.target.value)}
              className="px-3 py-2 rounded-xl bg-card border border-border text-xs font-semibold text-foreground focus:ring-2 focus:ring-amber-500/30"
            >
              <option value="Term 1">Active: Term 1 (First Term)</option>
              <option value="Term 2">Term 2 (Second Term)</option>
              <option value="Term 3">Term 3 (Third Term)</option>
              <option value="Full Year">Consolidated Full Year</option>
            </select>
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

        {/* Executive Realization Summary Matrix */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Institutional Financial Standing · {academicYear} {academicTerm}
              </span>
              <h2 className="text-lg font-black text-foreground">Core Realization Summary</h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
              Collection Rate: 85.9%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-canvas border border-border">
              <span className="text-xs text-muted-foreground block">1. Total Invoiced (Billed)</span>
              <span className="text-xl font-black text-foreground">US$ 1,220,900.00</span>
              <span className="text-[11px] text-muted-foreground block mt-1">480 student billing statements</span>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border">
              <span className="text-xs text-muted-foreground block">2. Total Received (Collected)</span>
              <span className="text-xl font-black text-emerald-600">US$ 1,048,450.00</span>
              <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                412 confirmed receipts issued
              </span>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border">
              <span className="text-xs text-muted-foreground block">3. Receivables (Outstanding)</span>
              <span className="text-xl font-black text-amber-600">US$ 172,450.00</span>
              <span className="text-[11px] text-amber-600 font-semibold block mt-1">68 accounts under recovery</span>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border">
              <span className="text-xs text-muted-foreground block">4. Treasury Reconciled Funds</span>
              <span className="text-xl font-black text-blue-600">US$ 1,045,250.00</span>
              <span className="text-[11px] text-blue-600 font-semibold block mt-1">
                Net in-bank / 99.7% matched
              </span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-border pb-3">
          {(
            [
              { key: "all", label: "All Reports" },
              { key: "Executive & Statutory", label: "Executive & Statutory" },
              { key: "Collections & Billing", label: "Collections & Billing" },
              { key: "Channel & Cashier", label: "Channel & Cashier" },
              { key: "Debt & Receivables", label: "Debt & Receivables" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === tab.key
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="p-5 rounded-2xl bg-card border border-border hover:border-amber-500/30 transition shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-amber-600 font-bold">{report.id}</span>
                  <span className="px-2 py-0.5 rounded-md bg-canvas border border-border text-[11px] font-medium text-foreground">
                    {report.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-foreground leading-snug">{report.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{report.description}</p>

                <div className="flex flex-wrap items-center gap-3 pt-3 text-[11px] text-muted-foreground">
                  <span>Frequency: <strong className="text-foreground">{report.frequency}</strong></span>
                  <span>·</span>
                  <span>Formats: <strong className="text-foreground">{report.format}</strong></span>
                  <span>·</span>
                  <span>Audience: <strong className="text-amber-600">{report.sensitivity}</strong></span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <button
                  onClick={() => setPreviewReport(report)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-canvas border border-border hover:bg-muted text-foreground transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleExport(report, "pdf")}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition"
                  >
                    <Download className="w-3 h-3" />
                    PDF
                  </button>
                  <button
                    onClick={() => handleExport(report, "excel")}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-foreground text-xs font-semibold transition"
                  >
                    <FileSpreadsheet className="w-3 h-3" />
                    Excel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Report Preview */}
        {previewReport && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <span className="text-xs font-mono text-amber-600 font-bold">{previewReport.id}</span>
                  <h3 className="font-bold text-foreground text-base">{previewReport.title}</h3>
                </div>
                <button
                  onClick={() => setPreviewReport(null)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              {/* Formatted Preview Sheet */}
              <div className="p-6 rounded-xl bg-canvas border border-border space-y-4 text-xs">
                <div className="text-center pb-3 border-b border-border">
                  <h4 className="font-extrabold text-sm uppercase text-foreground">Riverside International College</h4>
                  <p className="text-muted-foreground text-[11px]">Bursary & Treasury Division · Official Financial Certificate</p>
                  <p className="font-bold text-amber-600 mt-1">
                    {previewReport.title} — {academicYear} ({academicTerm})
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[11px]">
                  <div>
                    <span className="text-muted-foreground">Certified By:</span>{" "}
                    <span className="font-semibold text-foreground">J. Mensah (Bursar & Head of Accounts)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground">Generated Date:</span>{" "}
                    <span className="font-semibold text-foreground">{previewReport.lastGenerated}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border space-y-2">
                  <div className="flex justify-between font-bold text-foreground">
                    <span>Gross Fee Invoicing (480 Students)</span>
                    <span>US$ 1,220,900.00</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Less: Authorized Scholarships & Sibling Rebates</span>
                    <span className="text-rose-600">-US$ 42,300.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-foreground pt-1 border-t border-border">
                    <span>Net Collectible Billed Revenue</span>
                    <span>US$ 1,178,600.00</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Actual Reconciled Inflows Received</span>
                    <span>US$ 1,048,450.00</span>
                  </div>
                  <div className="flex justify-between text-amber-600 font-bold">
                    <span>Outstanding Recoverable Balance</span>
                    <span>US$ 172,450.00</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-muted-foreground flex justify-between">
                  <span>Signatory Seal: BURSARY-OFFICIAL-STAMP-2026</span>
                  <span>Target Distribution: School Owner & Principal</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => {
                    alert(`Printing ${previewReport.title}...`);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted text-foreground flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Official Document
                </button>
                <button
                  onClick={() => {
                    handleExport(previewReport, "pdf");
                    setPreviewReport(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
