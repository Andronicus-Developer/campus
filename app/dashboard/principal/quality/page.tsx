"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  AlertTriangle,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCheck,
  FileText,
  Filter,
  GraduationCap,
  Layers,
  Lock,
  PlusCircle,
  Search,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

interface PolicyItem {
  id: string;
  code: string;
  title: string;
  category: "academic" | "assessment" | "safety" | "safeguarding";
  version: string;
  lastReviewed: string;
  complianceRate: string;
  summary: string;
  status: "Active" | "Under Revision";
}

const INSTITUTIONAL_POLICIES: PolicyItem[] = [
  {
    id: "pol-1",
    code: "POL-ACAD-01",
    title: "Lesson Plan Submission & Pedagogical Quality Standard",
    category: "academic",
    version: "v3.2",
    lastReviewed: "Jan 10, 2026",
    complianceRate: "91.7% Compliance (44/48 Faculty)",
    summary: "Requires all instructional staff to upload verified weekly schemes of work with behavioral objectives by Friday 04:00 PM.",
    status: "Active",
  },
  {
    id: "pol-2",
    code: "POL-ASMT-02",
    title: "Continuous Assessment & Examination Weighting Standard",
    category: "assessment",
    version: "v4.0",
    lastReviewed: "Jan 12, 2026",
    complianceRate: "100% Departmental Adherence",
    summary: "Mandates CA1 (20%), CA2 (20%), and Terminal Exam (60%). Post-submission score modifications strictly require Principal audit sign-off.",
    status: "Active",
  },
  {
    id: "pol-3",
    code: "POL-SAFE-03",
    title: "Science Laboratory Chemical Safety & Emergency Protocol",
    category: "safety",
    version: "v2.1",
    lastReviewed: "Dec 05, 2025",
    complianceRate: "98% Audit Score (Lab 1 & 2)",
    summary: "Standard operating procedures for chemical titrants, eye-wash stations, fire blankets, and personal protective equipment.",
    status: "Active",
  },
  {
    id: "pol-4",
    code: "POL-PAST-04",
    title: "Child Safeguarding, Anti-Bullying & Pastoral Welfare",
    category: "safeguarding",
    version: "v3.0",
    lastReviewed: "Nov 20, 2025",
    complianceRate: "100% Faculty Certified",
    summary: "Mandatory annual background verification, designated safeguarding lead reporting pathways, and zero-tolerance harassment.",
    status: "Active",
  },
];

interface QAActionItem {
  id: string;
  title: string;
  department: string;
  assignedLead: string;
  targetDate: string;
  priority: "High" | "Medium";
  status: "In Progress" | "Completed";
}

const QA_ACTION_ITEMS: QAActionItem[] = [
  {
    id: "qa-1",
    title: "Accreditation Self-Study Dossier for Ministry of Education Inspection",
    department: "Executive Leadership",
    assignedLead: "Dr. Evelyn Peters (Principal)",
    targetDate: "March 20, 2026",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "qa-2",
    title: "Upgrade Fume Extractors & Gas Sensor Valves in Chemistry Lab 1",
    department: "Sciences Division",
    assignedLead: "Dr. Kenneth Obi (HOD Sciences)",
    targetDate: "March 05, 2026",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "qa-3",
    title: "Annual Faculty Professional Development on Formative Rubrics",
    department: "Academics Board",
    assignedLead: "Mr. David Alabi (VP Academics)",
    targetDate: "Feb 10, 2026",
    priority: "Medium",
    status: "Completed",
  },
];

export default function PrincipalQualityPage() {
  const [activeTab, setActiveTab] = useState<"policies" | "actions" | "accreditation">("policies");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
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

        {/* Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                  Section N · School Policies &amp; Quality Assurance
                </span>
                <span className="font-mono text-xs text-ink-muted">Governance &amp; Accreditation Standards</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Institutional Quality Assurance &amp; Compliance</h2>
              <p className="text-xs text-ink-muted max-w-3xl">
                Oversee adherence to academic policies and pedagogical standards, track staff and guardian policy acknowledgments, maintain school improvement action plans, and lead accreditation readiness.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">QA Compliance Index</span>
                <span className="text-lg font-black text-emerald-600">96.8% Compliant</span>
              </div>
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Faculty Policy Sign-Off</span>
                <span className="text-lg font-black text-primary">48 / 48 Certified</span>
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("policies")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "policies"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Institutional Policies ({INSTITUTIONAL_POLICIES.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("actions")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "actions"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Improvement Action Items ({QA_ACTION_ITEMS.filter((a) => a.status === "In Progress").length} Open)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("accreditation")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "accreditation"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Accreditation &amp; Inspection Readiness
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs text-ink-muted">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              <span>Full compliance with National Quality Assurance Standards</span>
            </div>
          </div>
        </div>

        {/* TAB 1: POLICIES */}
        {activeTab === "policies" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-ink">Active School Policies &amp; Teaching Standards</h3>
                <p className="text-xs text-ink-muted">Official institutional guidelines audited by executive leadership.</p>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600">All 4 Policies Verified</span>
            </div>

            <div className="space-y-3">
              {INSTITUTIONAL_POLICIES.map((pol) => (
                <div key={pol.id} className="rounded-2xl border border-line bg-surface-raised p-5 space-y-2 text-xs">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary">{pol.code}</span>
                        <span className="rounded bg-primary-light px-2 py-0.5 font-mono text-[10px] font-bold text-primary uppercase">
                          {pol.category}
                        </span>
                        <span className="font-mono text-ink-muted">Version {pol.version}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-ink-muted">Reviewed: {pol.lastReviewed}</span>
                      </div>
                      <h4 className="text-sm font-bold text-ink">{pol.title}</h4>
                      <p className="text-ink-soft leading-relaxed">{pol.summary}</p>
                      <div className="pt-1 font-mono text-[11px] text-emerald-700 font-semibold">
                        Compliance Rate: {pol.complianceRate}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <button
                        type="button"
                        onClick={() => showToast(`Opening official policy dossier for ${pol.code}`)}
                        className="rounded-xl border border-line bg-surface px-3 py-1.5 font-mono text-xs font-semibold text-primary hover:border-primary"
                      >
                        Inspect Dossier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ACTION ITEMS */}
        {activeTab === "actions" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-ink">Quality Assurance Improvement Actions</h3>
                <p className="text-xs text-ink-muted">Measurable milestones tracked for institutional enhancement.</p>
              </div>
              <button
                type="button"
                onClick={() => alert("Creating new QA Action Item")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 font-mono text-xs font-bold text-white shadow-sm hover:bg-primary-hover"
              >
                <PlusCircle className="size-3.5" />
                <span>Add Action Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {QA_ACTION_ITEMS.map((item) => (
                <div key={item.id} className="rounded-2xl border border-line bg-surface-raised p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink text-sm">{item.title}</span>
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                          item.priority === "High" ? "bg-rose-100 text-rose-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.priority} Priority
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-ink-muted font-mono text-[11px]">
                      <span>Division: <strong>{item.department}</strong></span>
                      <span>Lead: <strong>{item.assignedLead}</strong></span>
                      <span>Target: <strong>{item.targetDate}</strong></span>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 font-mono text-xs font-bold ${
                      item.status === "Completed"
                        ? "bg-success-light text-success-deep"
                        : "bg-amber-100 text-amber-900 animate-pulse"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ACCREDITATION READINESS */}
        {activeTab === "accreditation" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-ink">External Inspection &amp; Accreditation Status</h3>
                <p className="text-xs text-ink-muted">Accreditation credentials and preparation checklists.</p>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600">Accredited A-Tier</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-surface-raised p-5 space-y-3 text-xs">
                <span className="font-mono text-[10px] font-bold text-primary uppercase">Government Inspection</span>
                <h4 className="text-sm font-bold text-ink">Ministry of Education Quality Assurance Bureau</h4>
                <p className="text-ink-soft leading-relaxed">
                  Full accreditation renewed with Distinction in STEM laboratories, instructional leadership, and ICT infrastructure.
                </p>
                <div className="pt-2 border-t border-line font-mono text-[11px] text-ink-muted">
                  Next Scheduled Audit: October 2026 · Dossier Ready
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-5 space-y-3 text-xs">
                <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase">International Certification</span>
                <h4 className="text-sm font-bold text-ink">Cambridge International School Centre Registration</h4>
                <p className="text-ink-soft leading-relaxed">
                  Certified examination centre for IGCSE and WAEC senior secondary school diplomas with secure vault storage.
                </p>
                <div className="pt-2 border-t border-line font-mono text-[11px] text-ink-muted">
                  Centre Number: NG-4081 · Security Audited
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
