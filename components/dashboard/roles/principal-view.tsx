"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  Calendar,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  DollarSign,
  DoorOpen,
  FileSpreadsheet,
  GraduationCap,
  Landmark,
  LineChart,
  Megaphone,
  Percent,
  PlusCircle,
  RefreshCw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  TrendingDown,
  TrendingUp,
  UserCheck,
  UserPlus,
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  useEffect(() => {
    const loadStaff = () => {
      setStaffList(getStoredStaff());
    };
    loadStaff();
    window.addEventListener("campus360:staff-updated", loadStaff);
    return () => window.removeEventListener("campus360:staff-updated", loadStaff);
  }, []);

  const pendingStaff = staffList.filter((s) => s.confirmationStatus === "pending");

  const handleConfirmStaffMember = (id: string, name: string) => {
    const updated = confirmStaffInStorage(id, "Dr. Evelyn Peters (Principal)");
    setStaffList(updated);
    showToast(`Appointment confirmed: ${name} is authorized into active duty.`);
  };

  const [approvals, setApprovals] = useState([
    {
      id: "app-1",
      title: "SSS 3 Terminal Broadsheet & Grade Publication",
      submittedBy: "Mr. David Alabi (Head of Academics)",
      date: "Today, 10:15 AM",
      badge: "Academic Authority",
      type: "Result Broadsheet",
      details: "124 candidates evaluated across 9 subjects. Pass rate 94.2%. Needs executive release to parents.",
      status: "pending",
    },
    {
      id: "app-2",
      title: "Tuition Concession / Bursary Request (RC-2023-0184)",
      submittedBy: "Mrs. Angela Nnamdi (Bursar)",
      date: "Today, 09:30 AM",
      badge: "Fee Waiver",
      type: "Scholarship Concession",
      details: "Requesting 25% academic scholarship credit (US$ 475.00) for Tobi Adeleke (Olympiad winner).",
      status: "pending",
    },
    {
      id: "app-3",
      title: "Staff Medical Leave & Cover Arrangement (3 Days)",
      submittedBy: "Mrs. Grace Okon (Biology Senior Faculty)",
      date: "Yesterday",
      badge: "Faculty Duty",
      type: "Leave Authorization",
      details: "Emergency recuperation leave. Substitution arranged with Mr. E. Peters for JSS 2 Biology periods.",
      status: "pending",
    },
    {
      id: "app-4",
      title: "Science Lab Equipment Requisition (US$ 2,450.00)",
      submittedBy: "Dr. Kenneth Obi (Head of Sciences)",
      date: "Yesterday",
      badge: "Finance < $5k",
      type: "Operational Expense",
      details: "Replenishment of spectrophotometers and titrants for WAEC Chemistry practicals.",
      status: "pending",
    },
  ]);

  const [announcementText, setAnnouncementText] = useState("");
  const [announcementTarget, setAnnouncementTarget] = useState("all");
  const [announcementSent, setAnnouncementSent] = useState(false);

  const handleApprove = (id: string, title: string) => {
    setApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "approved" } : item))
    );
    showToast(`Authorized: ${title}`);
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    setAnnouncementSent(true);
    setTimeout(() => {
      showToast("School bulletin dispatched via SMS and Parent Portal!");
      setAnnouncementText("");
      setAnnouncementSent(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950 px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in slide-in-from-top-3">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Executive Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-mono text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="size-3.5 text-emerald-300" />
              <span>Tier 1 Executive Authority Active</span>
            </div>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 font-mono text-xs font-bold text-emerald-300 border border-emerald-400/30">
              Session 2025/2026 · Term 2 (Week 8)
            </span>
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Institutional Oversight &amp; Executive Cockpit
          </h2>
          <p className="mt-2 text-sm text-white/80 leading-relaxed max-w-2xl">
            Welcome, Dr. Evelyn Peters. Monitor student body KPIs, curriculum coverage, teacher attendance, fee collection health, and exercise final release sign-offs for broadsheets and appointments.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs font-mono text-white/95">
            <span className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm">
              <Users className="size-3.5 text-blue-300" />
              <span><strong>842</strong> Students (+38 this term)</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm">
              <GraduationCap className="size-3.5 text-indigo-300" />
              <span><strong>48</strong> Teachers · 16 Admin Staff</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm">
              <UserCheck className="size-3.5 text-emerald-300" />
              <span><strong>95.2%</strong> Attendance Today</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-sm">
              <DollarSign className="size-3.5 text-amber-300" />
              <span><strong>US$ 1,048,450.00</strong> Collected (88.5%)</span>
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-10 -bottom-10 size-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* QUICK COMMAND PILLS: 15 Core Modules (A-O) */}
      <div className="rounded-2xl border border-line bg-surface p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
            <Compass className="size-3.5 text-primary" />
            Executive Command Suite (Sections A — O)
          </span>
          <span className="font-mono text-[11px] text-ink-muted">15 Dedicated Workspaces</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { label: "My Approvals", href: "/dashboard/principal/approvals", icon: CheckCircle2, badge: `${approvals.filter(a => a.status === "pending").length + pendingStaff.length}` },
            { label: "Curriculum & Syllabi", href: "/dashboard/principal/academics", icon: LineChart },
            { label: "Faculty Supervision", href: "/dashboard/principal/staff", icon: Briefcase },
            { label: "Student Oversight", href: "/dashboard/principal/students", icon: GraduationCap },
            { label: "Attendance Pulse", href: "/dashboard/principal/attendance", icon: Users },
            { label: "Exams & Results", href: "/dashboard/principal/examinations", icon: Award },
            { label: "Timetable & Rooms", href: "/dashboard/principal/timetable", icon: CalendarDays },
            { label: "Discipline & Welfare", href: "/dashboard/principal/discipline", icon: ShieldAlert },
            { label: "Parent Circulars", href: "/dashboard/principal/announcements", icon: Megaphone },
            { label: "Financial Pulse", href: "/dashboard/principal/finance", icon: DollarSign },
            { label: "School Calendar", href: "/dashboard/principal/calendar", icon: Calendar },
            { label: "Analytics & Reports", href: "/dashboard/principal/reports", icon: BarChart3 },
            { label: "Quality Assurance", href: "/dashboard/principal/quality", icon: ShieldCheck },
            { label: "Academic Settings", href: "/dashboard/principal/settings", icon: Sliders },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5 font-semibold text-ink hover:border-primary hover:text-primary hover:shadow-sm transition-all"
              >
                <Icon className="size-3.5 text-primary" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1 rounded-full bg-danger px-1.5 py-0.2 font-mono text-[10px] font-bold text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Primary KPI Cards (A. Principal dashboard & school performance) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1: Student Enrollment & Movement */}
        <div className="card-lift rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
              Student Body
            </span>
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary-light text-primary">
              <Users className="size-4.5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="font-mono text-3xl font-extrabold text-ink">842</span>
            <span className="ml-2 font-mono text-xs font-bold text-success">+38 Net</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-ink-muted border-t border-line-soft pt-2">
            <span>Admissions: <strong>44</strong></span>
            <span>Transfers: <strong>4</strong></span>
            <span>Withdrawals: <strong>2</strong></span>
          </div>
        </div>

        {/* KPI 2: Attendance Today */}
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
          <div className="mt-2 flex items-center justify-between text-xs text-ink-muted border-t border-line-soft pt-2">
            <span>Staff on Duty: <strong>46/48 (96%)</strong></span>
            <span className="text-amber-600 font-bold">1 Register Pending</span>
          </div>
        </div>

        {/* KPI 3: Academic & Curriculum Health */}
        <div className="card-lift rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
              Curriculum &amp; Pass
            </span>
            <span className="flex size-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Award className="size-4.5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="font-mono text-3xl font-extrabold text-ink">94.8%</span>
            <span className="ml-2 font-mono text-xs font-bold text-indigo-600">Pass Rate</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-ink-muted border-t border-line-soft pt-2">
            <span>Syllabus: <strong>88.4%</strong></span>
            <span>Lesson Plans: <strong>91.2%</strong></span>
          </div>
        </div>

        {/* KPI 4: Financial Health (US$) */}
        <div className="card-lift rounded-2xl border border-line bg-surface p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
              Fee Collections (US$)
            </span>
            <span className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <DollarSign className="size-4.5" />
            </span>
          </div>
          <div className="mt-3">
            <span className="font-mono text-2xl font-extrabold text-ink">US$ 1.05M</span>
            <span className="ml-2 font-mono text-xs font-bold text-emerald-600">88.5%</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-ink-muted border-t border-line-soft pt-2">
            <span>Billed: <strong>US$ 1,185,000</strong></span>
            <span className="text-danger font-mono font-bold">US$ 136,550 Due</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Approvals Queue + Academic Radar & Early Warnings */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Urgent Executive Approvals & Confirmations (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Executive Approvals Queue */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Executive Sign-Off &amp; Approvals</h3>
                <p className="text-xs text-ink-muted">
                  Requires Tier-1 Principal sign-off before official publication, recruitment completion, or budget release.
                </p>
              </div>
              <span className="rounded-full bg-danger-light px-2.5 py-1 font-mono text-xs font-bold text-danger">
                {approvals.filter((a) => a.status === "pending").length + pendingStaff.length} Action Items
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {/* PENDING TEACHER & BURSAR CONFIRMATIONS */}
              {pendingStaff.map((staffMember) => (
                <div
                  key={staffMember.id}
                  className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-4 transition-all hover:border-amber-400"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-amber-100 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800 border border-amber-200">
                          {staffMember.role === "bursar" ? "Bursar Appointment" : "Teacher Appointment"}
                        </span>
                        <span className="font-mono text-[10px] text-amber-700 font-semibold animate-pulse">
                          Awaiting Principal Confirmation
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
                        onClick={() => handleConfirmStaffMember(staffMember.id, staffMember.name)}
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
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-primary-light px-2 py-0.5 font-mono text-[10px] font-bold text-primary">
                          {app.type}
                        </span>
                        <span className="font-mono text-[10px] text-ink-muted">{app.date}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-[10px] text-ink-muted">{app.badge}</span>
                      </div>
                      <h4 className="text-sm font-bold text-ink">{app.title}</h4>
                      <p className="text-xs text-ink-muted">{app.details}</p>
                      <span className="block text-[11px] font-medium text-ink-soft">
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
                          onClick={() => handleApprove(app.id, app.title)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-primary-hover active:scale-95"
                        >
                          <CheckCircle2 className="size-3.5" />
                          <span>Authorize</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-line pt-3 flex items-center justify-between text-xs">
              <span className="text-ink-muted">Need to review full broadsheets or audit histories?</span>
              <Link
                href="/dashboard/principal/approvals"
                className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
              >
                <span>View My Approvals Cockpit</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* At-Risk Students & Early Academic Warning Radar */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-ink">At-Risk Student Early Warning Radar</h3>
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 font-mono text-[10px] font-bold text-rose-700">
                    5 Students Flagged
                  </span>
                </div>
                <p className="text-xs text-ink-muted">
                  Identified by automated cross-correlation of falling continuous assessment marks (&lt; 50%) and repeated absences (&gt; 3 days).
                </p>
              </div>
              <Link
                href="/dashboard/principal/students"
                className="font-mono text-xs font-bold text-primary hover:underline"
              >
                Full Radar &rarr;
              </Link>
            </div>

            <div className="mt-4 divide-y divide-line-soft">
              {[
                { name: "Chukwuma Obi", class: "SSS 2 Science A", concern: "Scored 42% in Chemistry & Physics; 4 unexcused absences", teacher: "Mr. David Alabi", action: "AIP Remedial Assigned" },
                { name: "Fatima Danjuma", class: "JSS 3 Arts B", concern: "Falling grade in Mathematics (38%); persistent Monday lateness", teacher: "Ms. Chioma Okon", action: "Parent Conference Scheduled" },
                { name: "David Adeleke", class: "SSS 1 Science", concern: "Missing 2 CA2 assessment submissions; sick bay visits", teacher: "Mr. Kenneth Adeleke", action: "Counselor Review" },
                { name: "Blessing Nnaji", class: "JSS 1 Gold", concern: "Declining English Literature scores; quiet withdrawn behavior", teacher: "Mrs. N. Udoh", action: "Peer Tutoring Clinic" },
              ].map((s) => (
                <div key={s.name} className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-ink text-sm">{s.name}</span>
                    <span className="ml-2 font-mono text-[11px] text-ink-muted">({s.class})</span>
                    <p className="text-rose-700 font-medium text-xs mt-0.5">{s.concern}</p>
                    <span className="text-[11px] text-ink-muted mt-0.5 block">Form Master: {s.teacher}</span>
                  </div>
                  <span className="rounded-xl border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] font-bold text-primary">
                    {s.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Attendance Heatmap, Behavior & Quick Broadcast (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Academic Grade Distribution Radar */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Academic Performance Radar</h3>
                <p className="text-xs text-ink-muted">Term 2 Grade Band aggregates across 842 students</p>
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

            <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs">
              <span className="text-ink-muted">Previous Term Pass Rate: 93.6%</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1 font-mono">
                <TrendingUp className="size-3.5" /> +1.2% Improvement
              </span>
            </div>
          </div>

          {/* Disciplinary & Welfare Incidents Snapshot */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Discipline &amp; Welfare Overview</h3>
                <p className="text-xs text-ink-muted">Routine conduct referrals &amp; confidential student welfare</p>
              </div>
              <Link
                href="/dashboard/principal/discipline"
                className="font-mono text-xs font-bold text-primary hover:underline"
              >
                Cases &rarr;
              </Link>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="rounded-2xl border border-line bg-surface-raised p-3 flex items-start justify-between">
                <div>
                  <span className="font-bold text-ink block">Classroom Disruption / Bunking</span>
                  <span className="text-[11px] text-ink-muted">2 SSS 2 students · Detention completed &amp; guardian notified</span>
                </div>
                <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                  Resolved
                </span>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3 flex items-start justify-between">
                <div>
                  <span className="font-bold text-amber-950 block">Repeated Lateness &amp; Uniform Infraction</span>
                  <span className="text-[11px] text-amber-800">3 JSS students · Form Master parent conference booked</span>
                </div>
                <span className="rounded bg-amber-100 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800">
                  In Progress
                </span>
              </div>

              <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-3 flex items-start justify-between">
                <div>
                  <span className="font-bold text-purple-950 block flex items-center gap-1">
                    <ShieldCheck className="size-3.5 text-purple-700" />
                    Confidential Welfare / Counselor Referral
                  </span>
                  <span className="text-[11px] text-purple-800">1 Student case under designated safeguarding lead review</span>
                </div>
                <span className="rounded bg-purple-100 px-2 py-0.5 font-mono text-[10px] font-bold text-purple-800">
                  Restricted
                </span>
              </div>
            </div>
          </div>

          {/* School-Wide Broadcast Announcement */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-line pb-4">
              <Megaphone className="size-4 text-primary" />
              <div>
                <h3 className="text-base font-extrabold text-ink">Urgent &amp; General School Broadcast</h3>
                <p className="text-xs text-ink-muted">Direct dispatch to 842 parents and 64 staff members via SMS &amp; Portal</p>
              </div>
            </div>

            {announcementSent ? (
              <div className="mt-4 rounded-2xl border border-success/30 bg-success-light p-4 text-center">
                <CheckCircle2 className="mx-auto size-6 text-success" />
                <span className="mt-1 block font-bold text-xs text-ink">Dispatched Successfully!</span>
                <span className="text-[11px] text-ink-muted">Delivered via SMS gateway and parent portal.</span>
              </div>
            ) : (
              <form onSubmit={handleBroadcast} className="mt-4 space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-ink-muted mb-1">Target Group</label>
                  <select
                    value={announcementTarget}
                    onChange={(e) => setAnnouncementTarget(e.target.value)}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2 text-xs font-semibold text-ink"
                  >
                    <option value="all">Entire Institution (842 Parents &amp; 64 Staff)</option>
                    <option value="parents">Parents &amp; Guardians Only</option>
                    <option value="staff">Academic Faculty &amp; Staff Only</option>
                    <option value="senior">Senior Secondary Students Only (SSS 1 - 3)</option>
                  </select>
                </div>

                <textarea
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="e.g. Notice: Term 2 Open Day and PTA General Meeting scheduled for Saturday 10:00 AM..."
                  rows={3}
                  className="w-full rounded-xl border border-line bg-surface-raised p-3 text-xs text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-ink-muted">Immediate Delivery</span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-ink-soft active:scale-95"
                  >
                    <Send className="size-3.5" />
                    <span>Send Broadcast</span>
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
