"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  FileSpreadsheet,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Users,
  Search,
  Filter,
  PieChart,
  TrendingUp,
  FileText,
  ShieldCheck,
  Check,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface DataQualityIssue {
  id: string;
  studentName: string;
  studentId: string;
  className: string;
  issueType: "missing_guardian" | "missing_nin_doc" | "duplicate_contact" | "unassigned_class";
  description: string;
  severity: "high" | "medium";
}

const INITIAL_ISSUES: DataQualityIssue[] = [
  {
    id: "iss-1",
    studentName: "Chidera Okafor",
    studentId: "RC-2025-0015",
    className: "SSS 1 Science",
    issueType: "missing_nin_doc",
    description: "National Identification Number (NIN) slip not uploaded to student dossier.",
    severity: "medium",
  },
  {
    id: "iss-2",
    studentName: "Farouk Danjuma",
    studentId: "RC-2023-0142",
    className: "SSS 1 Science A",
    issueType: "missing_guardian",
    description: "No registered primary guardian or emergency phone mapped to student record.",
    severity: "high",
  },
  {
    id: "iss-3",
    studentName: "Zainab Mohammed",
    studentId: "RC-2025-0012",
    className: "JSS 1 Alpha",
    issueType: "duplicate_contact",
    description: "Guardian phone +234 803 291 0021 is also registered under applicant ADM-2025-099.",
    severity: "medium",
  },
];

export function ReportsAdminView() {
  const [issues, setIssues] = useState<DataQualityIssue[]>(INITIAL_ISSUES);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importStage, setImportStage] = useState<"idle" | "preview" | "complete">("idle");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleResolveIssue = (id: string) => {
    setIssues((prev) => prev.filter((i) => i.id !== id));
    showToast("Data quality discrepancy resolved and validated.");
  };

  const handleSimulateUpload = () => {
    setImportStage("preview");
  };

  const handleConfirmImport = () => {
    setImportStage("complete");
    setTimeout(() => {
      setImportModalOpen(false);
      setImportStage("idle");
      showToast("Successfully imported 48 validated student records from Excel spreadsheet.");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-teal-100 px-3 py-1 font-mono text-[11px] font-bold text-teal-800">
                Institutional Analytics &amp; Data Integrity
              </span>
              <span className="text-xs text-ink-muted">Master Roll · Demographic Reports · Bulk CSV Importer</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-ink">Reports, Demographic Analytics &amp; Data Quality Hub</h2>
            <p className="text-xs text-ink-muted">
              Generate real-time demographic distributions, detect and resolve incomplete student dossiers or missing guardian links, and import or export spreadsheet data with validation.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setImportModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-raised px-4 py-2 text-xs font-bold text-ink hover:border-teal-600 hover:text-teal-700 active:scale-95 transition-all shadow-sm"
            >
              <Upload className="size-4 text-teal-600" />
              <span>Bulk Spreadsheet Import</span>
            </button>

            <button
              type="button"
              onClick={() => showToast("Exported Student Master Roll (842 students) to CSV / Excel.")}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-teal-700 active:scale-95 transition-all"
            >
              <Download className="size-4" />
              <span>Export Master Roll</span>
            </button>
          </div>
        </div>

        {/* Demographic Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-line">
          <div className="p-3.5 rounded-2xl bg-surface-raised border border-line-soft">
            <span className="text-[11px] text-ink-muted block font-medium">Total Enrolled Roll</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-ink">842</span>
              <span className="text-[10px] text-emerald-600 font-bold font-mono">100% Active</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20">
            <span className="text-[11px] text-teal-700 block font-medium">Gender Distribution</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-sm font-bold text-teal-800">432 Boys (51.3%)</span>
              <span className="text-xs text-teal-600 font-bold">410 Girls</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <span className="text-[11px] text-blue-700 block font-medium">Boarding vs. Day</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-sm font-bold text-blue-800">185 Boarders (22%)</span>
              <span className="text-xs text-blue-600">657 Day</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            <span className="text-[11px] text-rose-700 block font-medium">Data Quality Alerts</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-rose-700">{issues.length}</span>
              <span className="text-[10px] text-rose-600 font-bold font-mono">Action needed</span>
            </div>
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

      {/* SECTION 1: DATA QUALITY & INCOMPLETE RECORDS RADAR */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-rose-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-rose-700">
                Data Integrity Radar
              </span>
              <h3 className="text-base font-extrabold text-ink">Incomplete Records &amp; Data Anomalies</h3>
            </div>
            <p className="text-xs text-ink-muted">
              System automated audit identifying missing guardian profiles, missing medical/NIN documents, or duplicate contacts.
            </p>
          </div>
          <span className="font-mono text-xs text-ink-muted">
            {issues.length} Issues Remaining
          </span>
        </div>

        {issues.length === 0 ? (
          <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 text-center space-y-2">
            <CheckCircle2 className="size-8 mx-auto text-emerald-600" />
            <h4 className="font-bold text-sm text-emerald-900">All Student Records 100% Complete &amp; Validated!</h4>
            <p className="text-xs text-emerald-700">
              No missing documents, unlinked guardians, or duplicate phone numbers detected across the active school database.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="p-4 rounded-2xl border border-line bg-surface-raised/70 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink text-sm">{issue.studentName}</span>
                    <span className="font-mono text-[11px] text-ink-muted">{issue.studentId}</span>
                    <span className="rounded bg-primary-light px-2 py-0.5 font-mono text-[10px] font-bold text-primary">
                      {issue.className}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                        issue.severity === "high"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {issue.severity.toUpperCase()} PRIORITY
                    </span>
                  </div>
                  <p className="text-xs text-ink font-medium">{issue.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard/admin/students"
                    className="rounded-xl border border-line bg-surface px-3 py-1.5 font-mono text-xs text-ink hover:border-teal-600"
                  >
                    Edit Student Dossier
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleResolveIssue(issue.id)}
                    className="inline-flex items-center gap-1 rounded-xl bg-teal-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-teal-700"
                  >
                    <Check className="size-3.5" />
                    <span>Mark Resolved</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: EXPORT SUITE & DEMOGRAPHIC SUMMARIES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl border border-line bg-surface space-y-3">
          <div className="flex items-center gap-2 text-ink font-bold text-sm">
            <Users className="size-4 text-teal-600" />
            <span>Enrollment &amp; Admissions Summary</span>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Detailed breakdown of active student registrations, class arm densities, and term retention rates.
          </p>
          <button
            type="button"
            onClick={() => showToast("Exported Enrollment Summary to Excel.")}
            className="w-full rounded-xl border border-line bg-surface-raised py-2 text-xs font-bold text-ink hover:border-teal-600"
          >
            Export Report (Excel)
          </button>
        </div>

        <div className="p-5 rounded-3xl border border-line bg-surface space-y-3">
          <div className="flex items-center gap-2 text-ink font-bold text-sm">
            <FileSpreadsheet className="size-4 text-teal-600" />
            <span>Staff Workload &amp; Allocations</span>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Faculty period quotas, Form Master assignments, and weekly curriculum period distributions.
          </p>
          <button
            type="button"
            onClick={() => showToast("Exported Staff Allocations to Excel.")}
            className="w-full rounded-xl border border-line bg-surface-raised py-2 text-xs font-bold text-ink hover:border-teal-600"
          >
            Export Report (Excel)
          </button>
        </div>

        <div className="p-5 rounded-3xl border border-line bg-surface space-y-3">
          <div className="flex items-center gap-2 text-ink font-bold text-sm">
            <TrendingUp className="size-4 text-teal-600" />
            <span>Attendance Compliance Audit</span>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Term aggregate attendance rates, unexcused absence streaks, and form teacher register submission timeliness.
          </p>
          <button
            type="button"
            onClick={() => showToast("Exported Attendance Compliance Audit to PDF.")}
            className="w-full rounded-xl border border-line bg-surface-raised py-2 text-xs font-bold text-ink hover:border-teal-600"
          >
            Export Report (PDF)
          </button>
        </div>
      </div>

      {/* MODAL: BULK SPREADSHEET IMPORTER */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2 text-ink">
                <FileSpreadsheet className="size-5 text-teal-600" />
                <h3 className="text-base font-extrabold">Bulk Data Import &amp; Validation</h3>
              </div>
              <button
                type="button"
                onClick={() => setImportModalOpen(false)}
                className="text-ink-muted hover:text-ink"
              >
                ✕
              </button>
            </div>

            {importStage === "idle" && (
              <div className="space-y-4 text-xs">
                <p className="text-ink-muted">
                  Upload an Excel or CSV file containing new students, staff, or parents. The validator will check for duplicate email addresses, duplicate student IDs, and missing required columns before importing.
                </p>

                <div
                  onClick={handleSimulateUpload}
                  className="border-2 border-dashed border-teal-500/40 bg-teal-50/20 rounded-2xl p-8 text-center cursor-pointer hover:bg-teal-50/40 transition-colors"
                >
                  <Upload className="size-10 mx-auto text-teal-600 mb-2" />
                  <span className="font-bold text-sm block text-ink">Click to upload spreadsheet file</span>
                  <span className="text-[11px] text-ink-muted">Supports .xlsx, .xls, and .csv formats</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-ink-muted pt-2 border-t border-line">
                  <span>Need the standard template?</span>
                  <button
                    type="button"
                    onClick={() => showToast("Downloaded sample_students_import_template.xlsx")}
                    className="text-teal-600 font-bold underline"
                  >
                    Download Template (.xlsx)
                  </button>
                </div>
              </div>
            )}

            {importStage === "preview" && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800">
                  <span className="font-bold">Dry-Run Validation Complete: 48 Valid Rows, 0 Errors</span>
                  <span className="font-mono text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded">Ready</span>
                </div>

                <div className="max-h-48 overflow-y-auto rounded-xl border border-line divide-y divide-line text-[11px]">
                  <div className="p-2.5 bg-surface-raised font-mono font-bold flex justify-between">
                    <span>Student Name</span>
                    <span>Class Stream</span>
                    <span>Status</span>
                  </div>
                  <div className="p-2.5 flex justify-between font-mono">
                    <span>Kayode Adeleke</span>
                    <span>JSS 1 Alpha</span>
                    <span className="text-emerald-600 font-bold">Valid</span>
                  </div>
                  <div className="p-2.5 flex justify-between font-mono">
                    <span>Nkechi Eze</span>
                    <span>SSS 1 Science</span>
                    <span className="text-emerald-600 font-bold">Valid</span>
                  </div>
                  <div className="p-2.5 flex justify-between font-mono">
                    <span>Ahmad Bello</span>
                    <span>JSS 2 Diamond</span>
                    <span className="text-emerald-600 font-bold">Valid</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setImportStage("idle")}
                    className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmImport}
                    className="rounded-xl bg-teal-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-teal-700"
                  >
                    Import 48 Records Now
                  </button>
                </div>
              </div>
            )}

            {importStage === "complete" && (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="size-12 mx-auto text-emerald-600 animate-bounce" />
                <h4 className="font-bold text-base text-ink">Import Completed Successfully!</h4>
                <p className="text-xs text-ink-muted">All 48 records have been created and assigned.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
