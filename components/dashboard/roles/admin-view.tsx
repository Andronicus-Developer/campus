"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Contact,
  DoorOpen,
  FileCheck2,
  Filter,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";

interface AdmissionApp {
  id: string;
  appNo: string;
  applicant: string;
  classApplied: string;
  guardian: string;
  phone: string;
  status: "submitted" | "under_review" | "accepted" | "enrolled";
}

export function AdminDashboardView() {
  const [apps, setApps] = useState<AdmissionApp[]>([
    {
      id: "app-101",
      appNo: "ADM-2025-084",
      applicant: "Zainab Mohammed",
      classApplied: "JSS 1 Alpha",
      guardian: "Alhaji Bello Mohammed",
      phone: "+234 803 291 0021",
      status: "submitted",
    },
    {
      id: "app-102",
      appNo: "ADM-2025-085",
      applicant: "Chidera Okafor",
      classApplied: "SSS 1 Science",
      guardian: "Dr. Mrs. Ifeoma Okafor",
      phone: "+234 802 443 8922",
      status: "under_review",
    },
    {
      id: "app-103",
      appNo: "ADM-2025-086",
      applicant: "David K. Adeleke",
      classApplied: "JSS 2 Gold",
      guardian: "Engr. Kunle Adeleke",
      phone: "+234 818 902 1145",
      status: "accepted",
    },
    {
      id: "app-104",
      appNo: "ADM-2025-087",
      applicant: "Oluwaseun Balogun",
      classApplied: "SSS 2 Commercial",
      guardian: "Chief T. Balogun",
      phone: "+234 703 118 7632",
      status: "submitted",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleEnroll = (id: string) => {
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "enrolled" } : a))
    );
  };

  const handleAccept = (id: string) => {
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "accepted" } : a))
    );
  };

  const filteredApps = apps.filter(
    (a) =>
      a.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.appNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.classApplied.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                School Operations &amp; Registry
              </span>
              <span className="text-xs text-ink-muted">Engr. Patrick Bassey</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-ink">Administrative Command Center</h2>
            <p className="text-xs text-ink-muted">
              Admissions workflow, student matriculation, staff scheduling, and class quota management.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert("New Student Enrollment Modal opened")}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
            >
              <UserPlus className="size-4" />
              <span>Enroll New Student</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admissions Funnel KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
            New Submissions
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-mono text-3xl font-extrabold text-ink">24</span>
            <span className="font-mono text-xs font-bold text-primary">Pending verification</span>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
            Under Review
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-mono text-3xl font-extrabold text-ink">12</span>
            <span className="font-mono text-xs font-bold text-amber-600">Interview scheduled</span>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
            Offer Letters Accepted
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-mono text-3xl font-extrabold text-ink">19</span>
            <span className="font-mono text-xs font-bold text-emerald-600">Deposit received</span>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
            Enrolled This Term
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-mono text-3xl font-extrabold text-ink">38</span>
            <span className="font-mono text-xs font-bold text-success">Matriculated</span>
          </div>
        </div>
      </div>

      {/* Main Section: Admissions Pipeline Queue */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <h3 className="text-base font-extrabold text-ink">Active Admissions Pipeline</h3>
            <p className="text-xs text-ink-muted">Process applications, verify birth certificates, and enroll students.</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 size-4 text-ink-muted" />
            <input
              type="text"
              placeholder="Search candidate, app no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-line bg-surface-raised pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Admissions Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                <th className="pb-3 font-bold uppercase">Applicant Name</th>
                <th className="pb-3 font-bold uppercase">App ID</th>
                <th className="pb-3 font-bold uppercase">Target Class</th>
                <th className="pb-3 font-bold uppercase">Guardian &amp; Phone</th>
                <th className="pb-3 font-bold uppercase">Status</th>
                <th className="pb-3 font-bold uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft font-sans">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-surface-raised">
                  <td className="py-3.5 font-bold text-ink">{app.applicant}</td>
                  <td className="py-3.5 font-mono text-ink-muted">{app.appNo}</td>
                  <td className="py-3.5 font-medium text-ink">{app.classApplied}</td>
                  <td className="py-3.5">
                    <span className="font-semibold text-ink block">{app.guardian}</span>
                    <span className="font-mono text-[11px] text-ink-muted">{app.phone}</span>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                        app.status === "enrolled"
                          ? "bg-success-light text-success-deep"
                          : app.status === "accepted"
                          ? "bg-blue-50 text-blue-700"
                          : app.status === "under_review"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-surface-raised text-ink-muted"
                      }`}
                    >
                      {app.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    {app.status === "submitted" && (
                      <button
                        type="button"
                        onClick={() => handleAccept(app.id)}
                        className="rounded-lg bg-primary-light px-3 py-1 font-mono text-xs font-bold text-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        Accept &amp; Issue Letter
                      </button>
                    )}
                    {app.status === "under_review" && (
                      <button
                        type="button"
                        onClick={() => handleAccept(app.id)}
                        className="rounded-lg bg-blue-100 px-3 py-1 font-mono text-xs font-bold text-blue-700 hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        Approve Candidate
                      </button>
                    )}
                    {app.status === "accepted" && (
                      <button
                        type="button"
                        onClick={() => handleEnroll(app.id)}
                        className="rounded-lg bg-emerald-600 px-3 py-1 font-mono text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                      >
                        Matriculate Student →
                      </button>
                    )}
                    {app.status === "enrolled" && (
                      <span className="font-mono text-xs font-bold text-success flex items-center justify-end gap-1">
                        <CheckCircle2 className="size-3.5" />
                        Enrolled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Class Arm Occupancy & Quotas */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="text-base font-extrabold text-ink">Class Capacity &amp; Stream Occupancy</h3>
            <span className="font-mono text-xs text-ink-muted">Total: 842 / 960 (87.7%)</span>
          </div>

          <div className="mt-4 space-y-3.5 text-xs">
            {[
              { level: "JSS 1 (Junior 1)", count: "142 / 160", pct: 88, status: "Normal" },
              { level: "JSS 2 (Junior 2)", count: "138 / 160", pct: 86, status: "Normal" },
              { level: "JSS 3 (Junior 3)", count: "148 / 160", pct: 92, status: "Near Full" },
              { level: "SSS 1 (Senior 1)", count: "146 / 160", pct: 91, status: "Near Full" },
              { level: "SSS 2 (Senior 2)", count: "136 / 160", pct: 85, status: "Normal" },
              { level: "SSS 3 (Senior 3)", count: "132 / 160", pct: 82, status: "Normal" },
            ].map((stream) => (
              <div key={stream.level}>
                <div className="flex justify-between font-semibold">
                  <span className="text-ink">{stream.level}</span>
                  <span className="font-mono text-ink-muted">{stream.count} ({stream.pct}%)</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-surface-raised overflow-hidden">
                  <div
                    className={`h-full rounded-full ${stream.pct >= 90 ? "bg-amber-500" : "bg-emerald-500"}`}
                    style={{ width: `${stream.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Calendar Milestones */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h3 className="text-base font-extrabold text-ink">Academic Calendar Milestones</h3>
            <span className="font-mono text-xs text-emerald-600 font-bold">Term 2 Active</span>
          </div>

          <div className="mt-4 space-y-3">
            {[
              { event: "Mid-Term Continuous Assessment Week", date: "Feb 10 - Feb 14", status: "Completed" },
              { event: "Open Day & PTA General Assembly", date: "Feb 22, 2026", status: "Upcoming This Saturday" },
              { event: "Mock Examination for SSS 3 Candidates", date: "March 02 - March 12", status: "Scheduled" },
              { event: "Terminal Examination Period", date: "March 23 - April 03", status: "Scheduled" },
              { event: "Term 2 Vacation & Report Card Publishing", date: "April 10, 2026", status: "Term Close" },
            ].map((mile) => (
              <div key={mile.event} className="flex items-center justify-between rounded-xl bg-surface-raised p-3 text-xs">
                <div>
                  <span className="font-bold text-ink block">{mile.event}</span>
                  <span className="font-mono text-[11px] text-ink-muted">{mile.date}</span>
                </div>
                <span className="rounded-lg bg-surface border border-line px-2.5 py-1 font-mono text-[10px] font-bold text-primary">
                  {mile.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
