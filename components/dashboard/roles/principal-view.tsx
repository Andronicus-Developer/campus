"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  FileSpreadsheet,
  GraduationCap,
  Landmark,
  Megaphone,
  Percent,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import { ROLES_CONFIG } from "@/lib/rbac";
import {
  StaffMember,
  getStoredStaff,
  confirmStaffInStorage,
} from "@/lib/staff-data";

export function PrincipalDashboardView() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);

  useEffect(() => {
    const loadStaff = () => {
      setStaffList(getStoredStaff());
    };
    loadStaff();
    window.addEventListener("campus360:staff-updated", loadStaff);
    return () => window.removeEventListener("campus360:staff-updated", loadStaff);
  }, []);

  const pendingStaff = staffList.filter((s) => s.confirmationStatus === "pending");

  const handleConfirmStaffMember = (id: string) => {
    const updated = confirmStaffInStorage(id, "Dr. Evelyn Peters (Principal)");
    setStaffList(updated);
  };

  const [approvals, setApprovals] = useState([
    {
      id: "app-1",
      title: "SSS 3 Terminal Broadsheet & Grade Publication",
      submittedBy: "Mr. David Alabi (Head of Academics)",
      date: "Today, 10:15 AM",
      badge: "High Priority",
      type: "Academic Sign-Off",
      details: "124 candidates evaluated across 9 subjects. Pass rate 94.2%.",
      status: "pending",
    },
    {
      id: "app-2",
      title: "Tuition Concession / Bursary Request (RC-2023-0184)",
      submittedBy: "Mrs. Angela Nnamdi (Bursar)",
      date: "Today, 09:30 AM",
      badge: "Financial Exemption",
      type: "Bursary Waiver",
      details: "Requesting 25% academic scholarship credit for Tobi Adeleke.",
      status: "pending",
    },
    {
      id: "app-3",
      title: "Staff Medical Leave Request (3 Days)",
      submittedBy: "Mrs. Grace Okon (Biology Faculty)",
      date: "Yesterday",
      badge: "Staff Duty",
      type: "Leave Authorization",
      details: "Substitution arranged with Mr. E. Peters for JSS 2 Biology periods.",
      status: "pending",
    },
  ]);

  const [announcementText, setAnnouncementText] = useState("");
  const [announcementSent, setAnnouncementSent] = useState(false);

  const handleApprove = (id: string) => {
    setApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "approved" } : item))
    );
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    setAnnouncementSent(true);
    setTimeout(() => {
      setAnnouncementText("");
      setAnnouncementSent(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Executive Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-mono text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="size-3.5 text-emerald-300" />
            <span>Tier 1 Executive Authority Active</span>
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Institutional Oversight Cockpit
          </h2>
          <p className="mt-2 text-sm text-white/80 leading-relaxed">
            Riverside International College · 2025/2026 Academic Session · Term 2 (Week 8).
            Full administrative, academic review, and result publication rights enabled.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-white/90">
            <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
              <Users className="size-3.5 text-blue-300" />
              <span>842 Active Enrolled Students</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-300" />
              <span>95.2% Daily Attendance</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5">
              <DollarSign className="size-3.5 text-amber-300" />
              <span>$42.6M Collected (88.4%)</span>
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-10 -bottom-10 size-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Primary KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1: Total Enrollment */}
        <div className="card-lift rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
              Enrollment
            </span>
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Users className="size-4.5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="font-mono text-3xl font-extrabold text-ink">842</span>
            <span className="ml-2 font-mono text-xs font-bold text-success">+38 this term</span>
          </div>
          <p className="mt-2 text-xs text-ink-muted">32 class streams across JSS1 to SSS3</p>
        </div>

        {/* KPI 2: Attendance Rate */}
        <div className="card-lift rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
              Attendance Today
            </span>
            <span className="flex size-9 items-center justify-center rounded-xl bg-success-light text-success-deep">
              <UserCheck className="size-4.5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="font-mono text-3xl font-extrabold text-ink">95.2%</span>
            <span className="ml-2 font-mono text-xs font-bold text-success">802 / 842</span>
          </div>
          <p className="mt-2 text-xs text-ink-muted">28 excused · 12 late arrivals logged</p>
        </div>

        {/* KPI 3: Term Tuition Inflow */}
        <div className="card-lift rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
              Term Fee Recovery
            </span>
            <span className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <TrendingUp className="size-4.5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="font-mono text-3xl font-extrabold text-ink">88.4%</span>
            <span className="ml-2 font-mono text-xs font-bold text-ink-muted">$42.6M</span>
          </div>
          <p className="mt-2 text-xs text-ink-muted">$5.6M outstanding pending Paystack/transfer</p>
        </div>

        {/* KPI 4: Faculty Roster */}
        <div className="card-lift rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
              Staff on Duty
            </span>
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent-light text-accent">
              <GraduationCap className="size-4.5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="font-mono text-3xl font-extrabold text-ink">46 / 48</span>
            <span className="ml-2 font-mono text-xs font-bold text-success">96% active</span>
          </div>
          <p className="mt-2 text-xs text-ink-muted">2 faculty on approved academic leave</p>
        </div>
      </div>

      {/* Main Grid: Approvals Queue + Academic Pulse */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Urgent Executive Approvals Queue (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Executive Sign-Off &amp; Approvals</h3>
                <p className="text-xs text-ink-muted">
                  Requires Tier-1 Principal authorization before publication, appointment, or dispatch.
                </p>
              </div>
              <span className="rounded-full bg-danger-light px-2.5 py-1 font-mono text-xs font-bold text-danger">
                {approvals.filter((a) => a.status === "pending").length + pendingStaff.length} Pending
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {/* PENDING TEACHER & BURSAR APPOINTMENTS FROM SCHOOL ADMIN */}
              {pendingStaff.map((staffMember) => (
                <div
                  key={staffMember.id}
                  className="rounded-2xl border-2 border-amber-300 bg-amber-50/50 p-4 transition-all hover:border-amber-400"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-amber-100 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800 border border-amber-200">
                          {staffMember.role === "bursar" ? "Bursar Appointment" : "Teacher Appointment"}
                        </span>
                        <span className="font-mono text-[10px] text-amber-700 font-semibold animate-pulse">
                          Awaiting Confirmation
                        </span>
                        <span className="font-mono text-[10px] text-ink-muted">
                          {staffMember.onboardedAt || "Today"}
                        </span>
                      </div>
                      <h4 className="mt-1 text-sm font-bold text-ink">
                        Confirm Appointment: {staffMember.name} ({staffMember.staffId})
                      </h4>
                      <p className="mt-1 text-xs text-ink-muted">
                        {staffMember.designation} · {staffMember.department}
                        {staffMember.role === "teacher" && staffMember.formClass
                          ? ` · Form Master: ${staffMember.formClass}`
                          : ""}
                      </p>
                      <span className="mt-2 block text-[11px] font-medium text-ink-soft">
                        Submitted by: <strong className="text-ink">{staffMember.onboardedBy || "Engr. Patrick Bassey (School Admin)"}</strong>
                      </span>
                    </div>

                    <div className="shrink-0 text-right">
                      <button
                        type="button"
                        onClick={() => handleConfirmStaffMember(staffMember.id)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
                      >
                        <CheckCircle2 className="size-3.5" />
                        <span>Confirm Appointment</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {approvals.map((app) => (
                <div
                  key={app.id}
                  className="rounded-2xl border border-line bg-surface-raised p-4 transition-all hover:border-primary/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-primary-light px-2 py-0.5 font-mono text-[10px] font-bold text-primary">
                          {app.type}
                        </span>
                        <span className="font-mono text-[10px] text-ink-muted">{app.date}</span>
                      </div>
                      <h4 className="mt-1 text-sm font-bold text-ink">{app.title}</h4>
                      <p className="mt-1 text-xs text-ink-muted">{app.details}</p>
                      <span className="mt-2 block text-[11px] font-medium text-ink-soft">
                        Submitted by: <strong className="text-ink">{app.submittedBy}</strong>
                      </span>
                    </div>

                    <div className="shrink-0 text-right">
                      {app.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success-light px-3 py-1 font-mono text-xs font-bold text-success-deep">
                          <CheckCircle2 className="size-3.5" />
                          Authorized
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApprove(app.id)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-primary-hover active:scale-95"
                        >
                          <CheckCircle2 className="size-3.5" />
                          <span>Authorize Sign-off</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-line pt-3 flex items-center justify-between text-xs">
              <span className="text-ink-muted">Need full broadsheet and faculty dossier audit?</span>
              <Link
                href="/dashboard/principal/approvals"
                className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
              >
                <span>Open Approvals Cockpit</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* Academic Grade Distribution Radar */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Academic Performance Radar</h3>
                <p className="text-xs text-ink-muted">Term 2 Grade Band aggregates across secondary divisions</p>
              </div>
              <span className="font-mono text-xs font-bold text-success">Pass Rate: 94.8%</span>
            </div>

            <div className="mt-5 space-y-3.5">
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-ink">Distinction (Grade A: 75% - 100%)</span>
                  <span className="font-mono text-primary font-bold">286 students (34%)</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-surface-raised overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "34%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-ink">Credit (Grade B: 65% - 74%)</span>
                  <span className="font-mono text-indigo-600 font-bold">345 students (41%)</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-surface-raised overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "41%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-ink">Merit (Grade C: 50% - 64%)</span>
                  <span className="font-mono text-amber-600 font-bold">160 students (19%)</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-surface-raised overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "19%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-ink">Pass &amp; Academic Intervention (&lt; 50%)</span>
                  <span className="font-mono text-danger font-bold">51 students (6%)</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-surface-raised overflow-hidden">
                  <div className="h-full bg-danger rounded-full" style={{ width: "6%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Attendance Pulse & Broadcast (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Class Attendance Heatmap Pulse */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Class Attendance Pulse</h3>
                <p className="text-xs text-ink-muted">Live sync from class registers</p>
              </div>
              <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="mt-4 divide-y divide-line-soft">
              {[
                { name: "SSS 3 Science A", teacher: "Mr. David Alabi", present: "34 / 34", pct: "100%", tone: "text-emerald-600" },
                { name: "SSS 2 Commercial", teacher: "Mrs. N. Udoh", present: "28 / 29", pct: "96.5%", tone: "text-emerald-600" },
                { name: "JSS 3 Arts A", teacher: "Mr. F. Eze", present: "31 / 33", pct: "93.9%", tone: "text-emerald-600" },
                { name: "JSS 1 Gold", teacher: "Ms. C. Okon", present: "29 / 32", pct: "90.6%", tone: "text-amber-600" },
                { name: "SSS 1 Science B", teacher: "Mr. K. Adeleke", present: "32 / 32", pct: "100%", tone: "text-emerald-600" },
              ].map((cls) => (
                <div key={cls.name} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-ink block">{cls.name}</span>
                    <span className="text-[11px] text-ink-muted">{cls.teacher}</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-ink">{cls.present}</span>
                    <span className={`block text-[11px] font-bold ${cls.tone}`}>{cls.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* School-Wide Broadcast Announcement */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-line pb-4">
              <Megaphone className="size-4 text-primary" />
              <div>
                <h3 className="text-base font-extrabold text-ink">Emergency &amp; General Broadcast</h3>
                <p className="text-xs text-ink-muted">Sends immediate SMS &amp; In-App push to parents &amp; faculty</p>
              </div>
            </div>

            {announcementSent ? (
              <div className="mt-4 rounded-2xl border border-success/30 bg-success-light p-4 text-center">
                <CheckCircle2 className="mx-auto size-6 text-success" />
                <span className="mt-1 block font-bold text-xs text-ink">Bulletin Dispatched!</span>
                <span className="text-[11px] text-ink-muted">Sent to 842 parents and 48 staff members.</span>
              </div>
            ) : (
              <form onSubmit={handleBroadcast} className="mt-4 space-y-3">
                <textarea
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="e.g. Notice: Term 2 Open Day and PTA General Meeting scheduled for Saturday 10:00 AM..."
                  rows={3}
                  className="w-full rounded-xl border border-line bg-surface-raised p-3 text-xs text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-ink-muted">Recipient: All School</span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-ink-soft active:scale-95"
                  >
                    <Send className="size-3.5" />
                    <span>Broadcast Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
