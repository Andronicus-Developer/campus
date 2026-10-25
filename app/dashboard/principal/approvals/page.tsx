"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Award,
  CheckCircle2,
  Clock,
  DollarSign,
  FileSpreadsheet,
  GraduationCap,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  XCircle,
} from "lucide-react";

interface ApprovalItem {
  id: string;
  category: "results" | "waiver" | "leave";
  title: string;
  submittedBy: string;
  submittedAt: string;
  department: string;
  description: string;
  metrics: string;
  status: "pending" | "approved" | "rejected";
}

export default function PrincipalApprovalsPage() {
  const [filter, setFilter] = useState<"all" | "results" | "waiver" | "leave">("all");
  const [approvals, setApprovals] = useState<ApprovalItem[]>([
    {
      id: "app-1",
      category: "results",
      title: "SSS 3 Senior Mock Broadsheet (WAEC Simulation)",
      submittedBy: "Mr. David Alabi (Head of Academics)",
      submittedAt: "Today, 10:15 AM",
      department: "Senior Secondary Faculty",
      description: "124 candidates evaluated across 9 subjects. Broadsheet audited by academic examination board.",
      metrics: "Pass Rate: 94.2% · Distinctions: 38% · Interventions: 7 students",
      status: "pending",
    },
    {
      id: "app-2",
      category: "results",
      title: "JSS 2 Term 2 Continuous Assessment (CA2) Result Batch",
      submittedBy: "Ms. Chioma Okon (Junior Head)",
      submittedAt: "Today, 09:45 AM",
      department: "Junior Secondary Faculty",
      description: "Scores for 138 junior students in Mathematics, Basic Science, and English.",
      metrics: "Average: 76.8% · Pending: None",
      status: "pending",
    },
    {
      id: "app-3",
      category: "waiver",
      title: "Academic Excellence Tuition Waiver (Student RC-2023-0184)",
      submittedBy: "Mrs. Angela Nnamdi (Bursar)",
      submittedAt: "Yesterday, 04:30 PM",
      department: "Bursary Division",
      description: "Annual 25% academic concession for Tobi Adeleke (1st position in STEM Olympiad).",
      metrics: "Credit: ₦46,250 concession · Term balance adjusted",
      status: "pending",
    },
    {
      id: "app-4",
      category: "leave",
      title: "Faculty Emergency Medical Leave Request",
      submittedBy: "Mrs. Grace Okon (Biology Senior Faculty)",
      submittedAt: "Yesterday, 02:15 PM",
      department: "Sciences Division",
      description: "3-day medical recuperation leave. Lesson periods covered by Mr. E. Peters.",
      metrics: "Periods delegated: 6 lectures covered across SSS 1 & 2",
      status: "pending",
    },
  ]);

  const handleAction = (id: string, newStatus: "approved" | "rejected") => {
    setApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const filteredItems = approvals.filter(
    (item) => filter === "all" || item.category === filter
  );

  return (
    <DashboardLayout currentRole="principal">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                  Tier 1 Executive Clearance
                </span>
                <span className="font-mono text-xs text-ink-muted">Principal Authorization Only</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Result &amp; Financial Approvals Queue</h2>
              <p className="text-xs text-ink-muted">
                Formal executive sign-offs releasing terminal broadsheets, bursary waivers, and faculty duty leaves.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 rounded-2xl border border-line bg-surface-raised p-1.5 text-xs font-semibold">
              {(["all", "results", "waiver", "leave"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`rounded-xl px-3 py-1.5 capitalize transition-all ${
                    filter === tab
                      ? "bg-surface text-primary shadow-sm font-bold"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {tab === "all" ? "All Queue" : tab === "results" ? "Academic Results" : tab === "waiver" ? "Fee Waivers" : "Faculty Leaves"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Approvals Items List */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-line bg-surface p-6 shadow-sm transition-all hover:border-primary/40"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                        item.category === "results"
                          ? "bg-primary-light text-primary"
                          : item.category === "waiver"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {item.category === "results" ? "Result Sign-off" : item.category === "waiver" ? "Bursary Waiver" : "Staff Leave"}
                    </span>
                    <span className="font-mono text-xs text-ink-muted">{item.submittedAt}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono text-xs text-ink-muted">{item.department}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-ink">{item.title}</h3>
                  <p className="text-xs text-ink-soft leading-relaxed">{item.description}</p>
                  
                  <div className="rounded-xl border border-line-soft bg-surface-raised p-3 text-xs font-mono text-ink">
                    <strong className="text-primary font-bold">Audit Metrics:</strong> {item.metrics}
                  </div>

                  <span className="block text-[11px] text-ink-muted">
                    Submitted by: <strong className="text-ink">{item.submittedBy}</strong>
                  </span>
                </div>

                <div className="shrink-0 text-right space-y-2">
                  {item.status === "approved" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-success-light px-3.5 py-1.5 font-mono text-xs font-bold text-success-deep">
                      <CheckCircle2 className="size-4" />
                      Sign-off Authorized
                    </span>
                  ) : item.status === "rejected" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-light px-3.5 py-1.5 font-mono text-xs font-bold text-danger">
                      <XCircle className="size-4" />
                      Rejected
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAction(item.id, "rejected")}
                        className="rounded-xl border border-line bg-surface-raised px-3.5 py-2 text-xs font-bold text-ink-muted hover:border-danger hover:text-danger transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(item.id, "approved")}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-primary-hover active:scale-95 transition-all"
                      >
                        <CheckCircle2 className="size-4" />
                        <span>Authorize Sign-off</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
