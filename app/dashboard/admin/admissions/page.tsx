"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { CheckCircle2, FileText, Filter, Plus, Search, UserCheck, UserPlus, Users } from "lucide-react";

export default function AdminAdmissionsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "enrolled">("all");
  const [candidates, setCandidates] = useState([
    { id: "c-1", name: "Zainab Mohammed", appNo: "ADM-2025-084", class: "JSS 1 Alpha", guardian: "Alhaji Bello Mohammed", phone: "+234 803 291 0021", date: "Feb 18, 2026", status: "pending" },
    { id: "c-2", name: "Chidera Okafor", appNo: "ADM-2025-085", class: "SSS 1 Science", guardian: "Dr. Mrs. Ifeoma Okafor", phone: "+234 802 443 8922", date: "Feb 17, 2026", status: "approved" },
    { id: "c-3", name: "David K. Adeleke", appNo: "ADM-2025-086", class: "JSS 2 Gold", guardian: "Engr. Kunle Adeleke", phone: "+234 818 902 1145", date: "Feb 16, 2026", status: "enrolled" },
    { id: "c-4", name: "Oluwaseun Balogun", appNo: "ADM-2025-087", class: "SSS 2 Commercial", guardian: "Chief T. Balogun", phone: "+234 703 118 7632", date: "Feb 15, 2026", status: "pending" },
    { id: "c-5", name: "Nkechi Eze", appNo: "ADM-2025-088", class: "JSS 1 Alpha", guardian: "Mr. Chukwudi Eze", phone: "+234 809 332 1109", date: "Feb 14, 2026", status: "approved" },
  ]);

  const handleEnroll = (id: string) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, status: "enrolled" } : c)));
  };

  const handleApprove = (id: string) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c)));
  };

  const filtered = candidates.filter((c) => activeTab === "all" || c.status === activeTab);

  return (
    <DashboardLayout currentRole="admin">
      <div className="space-y-6">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                  Admissions Command
                </span>
                <span className="font-mono text-xs text-ink-muted">2026/2027 Academic Intake</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Admissions Queue &amp; Matriculation</h2>
              <p className="text-xs text-ink-muted">
                Candidate document verification, entrance screening, and official student number generation.
              </p>
            </div>

            <div className="flex items-center gap-1.5 rounded-2xl border border-line bg-surface-raised p-1.5 text-xs font-semibold">
              {(["all", "pending", "approved", "enrolled"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-xl px-3 py-1.5 capitalize transition-all ${
                    activeTab === tab
                      ? "bg-surface text-primary shadow-sm font-bold"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Candidate Table */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                  <th className="pb-3 font-bold uppercase">Applicant Name</th>
                  <th className="pb-3 font-bold uppercase">App ID</th>
                  <th className="pb-3 font-bold uppercase">Target Class</th>
                  <th className="pb-3 font-bold uppercase">Guardian &amp; Contact</th>
                  <th className="pb-3 font-bold uppercase">Status</th>
                  <th className="pb-3 font-bold uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-raised">
                    <td className="py-3.5 font-bold text-ink">{c.name}</td>
                    <td className="py-3.5 font-mono text-ink-muted">{c.appNo}</td>
                    <td className="py-3.5 font-medium text-ink">{c.class}</td>
                    <td className="py-3.5">
                      <span className="font-semibold text-ink block">{c.guardian}</span>
                      <span className="font-mono text-[11px] text-ink-muted">{c.phone}</span>
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                          c.status === "enrolled"
                            ? "bg-success-light text-success-deep"
                            : c.status === "approved"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      {c.status === "pending" && (
                        <button
                          type="button"
                          onClick={() => handleApprove(c.id)}
                          className="rounded-lg bg-primary-light px-3 py-1 font-mono text-xs font-bold text-primary hover:bg-primary hover:text-white"
                        >
                          Approve Candidate
                        </button>
                      )}
                      {c.status === "approved" && (
                        <button
                          type="button"
                          onClick={() => handleEnroll(c.id)}
                          className="rounded-lg bg-emerald-600 px-3 py-1 font-mono text-xs font-bold text-white hover:bg-emerald-700"
                        >
                          Matriculate Student →
                        </button>
                      )}
                      {c.status === "enrolled" && (
                        <span className="font-mono text-xs font-bold text-success flex items-center justify-end gap-1">
                          <CheckCircle2 className="size-3.5" />
                          Matriculated
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
