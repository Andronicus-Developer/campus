"use client";

import { useState } from "react";
import Link from "next/link";
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
  BookMarked,
  Landmark,
  HeartHandshake,
  ArrowRight,
  GraduationCap,
  Layers,
  ClipboardCheck,
  DollarSign,
  Megaphone,
  FileText,
  BarChart3,
  Bus,
  History,
  Sliders,
  AlertTriangle,
  TrendingUp,
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
      {/* SECTION A: Admin Header & Daily Administrative Command Pulse */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                School Operations &amp; Registry Authority
              </span>
              <span className="text-xs text-ink-muted">Engr. Patrick Bassey — Director of Registry</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-ink">Administrative Command Center</h2>
            <p className="text-xs text-ink-muted">
              Centralized governance of students, faculty, daily registers, fee billing, parent communications, document vaults, and campus operations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/dashboard/admin/students"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all"
            >
              <UserPlus className="size-4" />
              <span>+ Add Student</span>
            </Link>

            <Link
              href="/dashboard/admin/staff"
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-600 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 shadow-sm hover:bg-emerald-100 active:scale-95 transition-all"
            >
              <GraduationCap className="size-4 text-emerald-700" />
              <span>+ Add Staff</span>
            </Link>

            <Link
              href="/dashboard/admin/reports"
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3.5 py-2 text-xs font-bold text-ink shadow-sm hover:border-emerald-600 hover:text-emerald-700 active:scale-95 transition-all"
            >
              <BarChart3 className="size-4 text-teal-600" />
              <span>Bulk Import &amp; Reports</span>
            </Link>
          </div>
        </div>

        {/* SECTION A.1: Daily User Totals & Institutional Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-line">
          <Link
            href="/dashboard/admin/students"
            className="p-3.5 rounded-2xl bg-surface-raised border border-line-soft hover:border-emerald-500 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-ink-muted block font-medium group-hover:text-emerald-700">
                Total Enrolled Students
              </span>
              <Users className="size-3.5 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-ink">842</span>
              <span className="text-[10px] text-emerald-600 font-bold font-mono">+38 new term</span>
            </div>
          </Link>

          <Link
            href="/dashboard/admin/staff"
            className="p-3.5 rounded-2xl bg-surface-raised border border-line-soft hover:border-emerald-500 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-ink-muted block font-medium group-hover:text-emerald-700">
                Teaching Faculty
              </span>
              <GraduationCap className="size-3.5 text-blue-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-ink">64</span>
              <span className="text-[10px] text-blue-600 font-bold font-mono">100% confirmed</span>
            </div>
          </Link>

          <Link
            href="/dashboard/admin/staff"
            className="p-3.5 rounded-2xl bg-surface-raised border border-line-soft hover:border-emerald-500 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-ink-muted block font-medium group-hover:text-emerald-700">
                Non-Teaching Staff
              </span>
              <HeartHandshake className="size-3.5 text-amber-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-ink">28</span>
              <span className="text-[10px] text-ink-muted font-mono">Bursary, Clinic, Ops</span>
            </div>
          </Link>

          <Link
            href="/dashboard/admin/students"
            className="p-3.5 rounded-2xl bg-surface-raised border border-line-soft hover:border-emerald-500 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-ink-muted block font-medium group-hover:text-emerald-700">
                Registered Parents / Guardians
              </span>
              <Contact className="size-3.5 text-purple-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-ink">615</span>
              <span className="text-[10px] text-emerald-600 font-bold font-mono">100% linked</span>
            </div>
          </Link>
        </div>

        {/* SECTION A.2: Daily Administration Alerts & Incomplete Records Radar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link
            href="/dashboard/admin/reports"
            className="p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="size-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-xs text-ink block">3 Incomplete Records</span>
                <span className="text-[11px] text-ink-muted">Missing guardian link or NIN slip</span>
              </div>
            </div>
            <span className="font-mono text-xs text-amber-700 font-bold">Fix →</span>
          </Link>

          <Link
            href="/dashboard/admin/attendance"
            className="p-3.5 rounded-2xl border border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <ClipboardCheck className="size-4 text-rose-600 shrink-0" />
              <div>
                <span className="font-bold text-xs text-ink block">2 Overdue Registers</span>
                <span className="text-[11px] text-ink-muted">JSS 3 Gold &amp; SSS 3 Arts</span>
              </div>
            </div>
            <span className="font-mono text-xs text-rose-700 font-bold">Inspect →</span>
          </Link>

          <Link
            href="/dashboard/admin/audit"
            className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-xs text-ink block">94.2% Activation Rate</span>
                <span className="text-[11px] text-ink-muted">795 students &amp; 608 parents active</span>
              </div>
            </div>
            <span className="font-mono text-xs text-emerald-700 font-bold">Audit →</span>
          </Link>
        </div>

        {/* SECTION A.3: Comprehensive Administrative Command Modules Grid */}
        <div className="border-t border-line pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-muted">
              Administrative Modules &amp; Subsystems
            </span>
            <span className="text-[11px] text-ink-muted">12 Core Administrative Portals</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/dashboard/admin/students"
              className="group rounded-2xl border border-line bg-surface-raised p-3.5 transition-all hover:border-emerald-500 hover:bg-surface hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-7 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 font-bold">
                  <Users className="size-3.5" />
                </span>
                <ArrowRight className="size-3.5 text-ink-muted group-hover:text-emerald-600 transition-colors" />
              </div>
              <h4 className="mt-2 font-bold text-xs text-ink">Students &amp; Guardians</h4>
              <p className="text-[11px] text-ink-muted">Biodata, credentials, admissions, and guardian custody.</p>
            </Link>

            <Link
              href="/dashboard/admin/staff"
              className="group rounded-2xl border border-line bg-surface-raised p-3.5 transition-all hover:border-blue-500 hover:bg-surface hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-7 items-center justify-center rounded-xl bg-blue-100 text-blue-800 font-bold">
                  <GraduationCap className="size-3.5" />
                </span>
                <ArrowRight className="size-3.5 text-ink-muted group-hover:text-blue-600 transition-colors" />
              </div>
              <h4 className="mt-2 font-bold text-xs text-ink">Staff Administration</h4>
              <p className="text-[11px] text-ink-muted">Teachers, bursars, logins, and teaching period quotas.</p>
            </Link>

            <Link
              href="/dashboard/admin/attendance"
              className="group rounded-2xl border border-line bg-surface-raised p-3.5 transition-all hover:border-emerald-500 hover:bg-surface hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-7 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 font-bold">
                  <ClipboardCheck className="size-3.5" />
                </span>
                <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700">
                  Daily
                </span>
              </div>
              <h4 className="mt-2 font-bold text-xs text-ink">Attendance Radar</h4>
              <p className="text-[11px] text-ink-muted">Class registers, submission cutoffs, and corrections.</p>
            </Link>

            <Link
              href="/dashboard/admin/finance"
              className="group rounded-2xl border border-line bg-surface-raised p-3.5 transition-all hover:border-amber-500 hover:bg-surface hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-7 items-center justify-center rounded-xl bg-amber-100 text-amber-800 font-bold">
                  <DollarSign className="size-3.5" />
                </span>
                <ArrowRight className="size-3.5 text-ink-muted group-hover:text-amber-600 transition-colors" />
              </div>
              <h4 className="mt-2 font-bold text-xs text-ink">Finance Support</h4>
              <p className="text-[11px] text-ink-muted">Fee categories, student billing, and dispute escalation.</p>
            </Link>

            <Link
              href="/dashboard/admin/communications"
              className="group rounded-2xl border border-line bg-surface-raised p-3.5 transition-all hover:border-blue-500 hover:bg-surface hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-7 items-center justify-center rounded-xl bg-blue-100 text-blue-800 font-bold">
                  <Megaphone className="size-3.5" />
                </span>
                <ArrowRight className="size-3.5 text-ink-muted group-hover:text-blue-600 transition-colors" />
              </div>
              <h4 className="mt-2 font-bold text-xs text-ink">Parent Communications</h4>
              <p className="text-[11px] text-ink-muted">Broadcast notices, SMS/WhatsApp alerts, and inquiry routing.</p>
            </Link>

            <Link
              href="/dashboard/admin/documents"
              className="group rounded-2xl border border-line bg-surface-raised p-3.5 transition-all hover:border-indigo-500 hover:bg-surface hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-7 items-center justify-center rounded-xl bg-indigo-100 text-indigo-800 font-bold">
                  <FileText className="size-3.5" />
                </span>
                <ArrowRight className="size-3.5 text-ink-muted group-hover:text-indigo-600 transition-colors" />
              </div>
              <h4 className="mt-2 font-bold text-xs text-ink">Documents &amp; Student IDs</h4>
              <p className="text-[11px] text-ink-muted">Vault archives, printable Student IDs, and class rolls.</p>
            </Link>

            <Link
              href="/dashboard/admin/reports"
              className="group rounded-2xl border border-line bg-surface-raised p-3.5 transition-all hover:border-teal-500 hover:bg-surface hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-7 items-center justify-center rounded-xl bg-teal-100 text-teal-800 font-bold">
                  <BarChart3 className="size-3.5" />
                </span>
                <ArrowRight className="size-3.5 text-ink-muted group-hover:text-teal-600 transition-colors" />
              </div>
              <h4 className="mt-2 font-bold text-xs text-ink">Reports &amp; Data Integrity</h4>
              <p className="text-[11px] text-ink-muted">Demographic stats, anomaly scanner, and bulk spreadsheet import.</p>
            </Link>

            <Link
              href="/dashboard/admin/operations"
              className="group rounded-2xl border border-line bg-surface-raised p-3.5 transition-all hover:border-orange-500 hover:bg-surface hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-7 items-center justify-center rounded-xl bg-orange-100 text-orange-800 font-bold">
                  <Bus className="size-3.5" />
                </span>
                <ArrowRight className="size-3.5 text-ink-muted group-hover:text-orange-600 transition-colors" />
              </div>
              <h4 className="mt-2 font-bold text-xs text-ink">School Operations</h4>
              <p className="text-[11px] text-ink-muted">Bus transit routes, resident boarding, and facility repair orders.</p>
            </Link>
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
