"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  GraduationCap,
  LineChart,
  Lock,
  Printer,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

interface ReportTemplate {
  id: string;
  category: "academic" | "attendance" | "faculty" | "finance" | "pastoral";
  title: string;
  description: string;
  lastGenerated: string;
  metrics: string;
}

const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: "rep-1",
    category: "academic",
    title: "Terminal Academic Broadsheet & Grade Distribution",
    description: "Full institutional grade breakdown across SSS 1-3 and JSS 1-3 with pass rates and distinction percentages.",
    lastGenerated: "Today, 10:15 AM",
    metrics: "842 Candidates · Pass Rate: 94.8% · GPA: 3.42",
  },
  {
    id: "rep-2",
    category: "academic",
    title: "Curriculum Syllabus Coverage & Milestone Audit",
    description: "Evaluates topic completion across Science, Arts, Commercial, and Junior divisions vs. term calendar.",
    lastGenerated: "Yesterday",
    metrics: "88.4% Syllabus Covered · 2 Subjects in Remedial Pacing",
  },
  {
    id: "rep-3",
    category: "attendance",
    title: "School-Wide Student Attendance & Chronic Absenteeism",
    description: "Daily roll-call averages, class register compliance, and list of students flagged with > 3 unexcused absences.",
    lastGenerated: "Today, 09:30 AM",
    metrics: "95.2% Daily Average · 4 Students Flagged",
  },
  {
    id: "rep-4",
    category: "faculty",
    title: "Teacher Workload & Lesson-Plan Completion Audit",
    description: "Weekly instructional periods allocated per teacher, Form Master duties, and weekly lesson plan submission compliance.",
    lastGenerated: "Feb 17, 2026",
    metrics: "48 Faculty · 91.7% Lesson-Plan Submission Rate",
  },
  {
    id: "rep-5",
    category: "finance",
    title: "Institutional Fee Recovery & Operational Requisitions Summary",
    description: "Term tuition collections in US$, debt recovery status, approved scholarships, and requisitions under $5k limit.",
    lastGenerated: "Today, 08:00 AM",
    metrics: "US$ 1,048,450.00 Collected (88.5%) · US$ 136,550.00 Due",
  },
  {
    id: "rep-6",
    category: "pastoral",
    title: "Discipline, Behavioral Trends & At-Risk Intervention Summary",
    description: "Routine behavioral referrals, executed detentions, parent conferences, and active AIP learning clinics.",
    lastGenerated: "Feb 16, 2026",
    metrics: "14 Resolved · 2 Conferences · 5 Active AIPs",
  },
];

export default function PrincipalReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportTemplate>(REPORT_TEMPLATES[0]);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleExport = (format: "PDF" | "Excel" | "CSV") => {
    showToast(`Export generated: "${selectedReport.title}" downloaded as ${format} with institutional seal.`);
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
                <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                  Section L · Executive Reports &amp; Analytics
                </span>
                <span className="font-mono text-xs text-ink-muted">Riverside International College</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Institutional Analytics &amp; Official Dossiers</h2>
              <p className="text-xs text-ink-muted max-w-3xl">
                Generate, compare, and export accredited school-wide reports covering academic achievement, curriculum pacing, staff workloads, attendance health, and fee revenue without exposing out-of-tenant data.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleExport("PDF")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-primary-hover active:scale-95 transition-all"
              >
                <Download className="size-3.5" />
                <span>Export Official PDF</span>
              </button>
              <button
                type="button"
                onClick={() => handleExport("Excel")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-4 py-2 font-mono text-xs font-bold text-ink hover:border-primary active:scale-95 transition-all"
              >
                <FileSpreadsheet className="size-3.5 text-emerald-600" />
                <span>Excel (XLSX)</span>
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4 text-xs font-semibold">
            {["all", "academic", "attendance", "faculty", "finance", "pastoral"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilterCategory(c)}
                className={`rounded-xl px-3 py-1.5 capitalize transition-all ${
                  filterCategory === c
                    ? "bg-primary text-white shadow-sm font-bold"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Report Selector (5 cols) + Report Preview (7 cols) */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column: Available Templates */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted px-1">
              Select Report Template
            </h3>

            {REPORT_TEMPLATES.filter(
              (r) => filterCategory === "all" || r.category === filterCategory
            ).map((rep) => (
              <div
                key={rep.id}
                onClick={() => setSelectedReport(rep)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all text-xs ${
                  selectedReport.id === rep.id
                    ? "border-2 border-primary bg-primary-light/10 shadow-sm"
                    : "border-line bg-surface hover:border-primary/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded bg-primary-light px-2 py-0.5 font-mono text-[10px] font-bold text-primary uppercase">
                    {rep.category}
                  </span>
                  <span className="font-mono text-[10px] text-ink-muted">{rep.lastGenerated}</span>
                </div>
                <h4 className="mt-1.5 text-sm font-bold text-ink">{rep.title}</h4>
                <p className="mt-1 text-ink-soft leading-relaxed">{rep.description}</p>
                <div className="mt-2 pt-2 border-t border-line-soft font-mono text-[11px] text-primary font-semibold">
                  {rep.metrics}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Interactive Report Preview */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase font-bold text-primary">Live Institutional Preview</span>
                  <h3 className="text-lg font-black text-ink mt-0.5">{selectedReport.title}</h3>
                  <span className="font-mono text-xs text-ink-muted">Session 2025/2026 · Term 2 (Week 8)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleExport("PDF")}
                    className="rounded-xl border border-line bg-surface-raised p-2 text-ink hover:text-primary hover:border-primary"
                    title="Print Document"
                  >
                    <Printer className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExport("CSV")}
                    className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 font-mono text-xs font-bold text-ink hover:text-primary hover:border-primary"
                  >
                    CSV
                  </button>
                </div>
              </div>

              {/* Multi-Term Comparison Snapshot */}
              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-3">
                <span className="font-mono text-[10px] uppercase font-bold text-ink-muted block">
                  Multi-Term Trend Comparison
                </span>
                <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                  <div className="rounded-xl border border-line bg-surface p-2.5">
                    <span className="text-[10px] text-ink-muted block">2024/2025 Term 3</span>
                    <span className="font-bold text-ink text-sm">92.4% Avg</span>
                  </div>
                  <div className="rounded-xl border border-line bg-surface p-2.5">
                    <span className="text-[10px] text-ink-muted block">2025/2026 Term 1</span>
                    <span className="font-bold text-ink text-sm">93.6% Avg</span>
                  </div>
                  <div className="rounded-xl border border-primary/30 bg-primary-light/20 p-2.5">
                    <span className="text-[10px] text-primary font-bold block">Current Term 2</span>
                    <span className="font-bold text-primary text-sm">94.8% Avg (+1.2%)</span>
                  </div>
                </div>
              </div>

              {/* Sample Data Table within Preview */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase font-bold text-ink-muted block">
                  Executive Division Breakdown
                </span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                        <th className="pb-2 font-bold uppercase">Division Arm</th>
                        <th className="pb-2 font-bold uppercase">Enrollment</th>
                        <th className="pb-2 font-bold uppercase">Pass Rate</th>
                        <th className="pb-2 font-bold uppercase">Attendance</th>
                        <th className="pb-2 font-bold uppercase text-right">Standing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line-soft">
                      {[
                        { arm: "Senior Sciences (SSS 1-3)", count: "214 Students", pass: "96.2%", att: "96.4%", badge: "Distinction Track" },
                        { arm: "Senior Arts & Social (SSS 1-3)", count: "198 Students", pass: "94.8%", att: "95.8%", badge: "Good Standing" },
                        { arm: "Senior Commercial (SSS 1-3)", count: "142 Students", pass: "95.1%", att: "94.9%", badge: "Good Standing" },
                        { arm: "Junior Secondary (JSS 1-3)", count: "288 Students", pass: "93.4%", att: "93.7%", badge: "Remedial Track" },
                      ].map((row) => (
                        <tr key={row.arm} className="hover:bg-surface-raised">
                          <td className="py-2.5 font-bold text-ink">{row.arm}</td>
                          <td className="py-2.5 font-mono text-ink-muted">{row.count}</td>
                          <td className="py-2.5 font-mono font-bold text-emerald-600">{row.pass}</td>
                          <td className="py-2.5 font-mono text-ink">{row.att}</td>
                          <td className="py-2.5 text-right">
                            <span className="rounded-full bg-primary-light px-2.5 py-0.5 font-mono text-[10px] font-bold text-primary">
                              {row.badge}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Institutional Endorsement Seal */}
              <div className="pt-3 border-t border-line flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-600" />
                  <span className="text-ink-muted font-mono text-[11px]">
                    Authorized by: <strong>Dr. Evelyn Peters (Principal)</strong>
                  </span>
                </div>
                <span className="font-mono text-[10px] text-ink-muted">
                  Strict Multi-Tenant Isolation Enforced
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
