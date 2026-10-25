"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  Download,
  Calendar,
  Settings,
  UserCheck,
  RotateCcw,
  ShieldCheck,
  Plus,
  Eye,
  Check,
  X,
  FileSpreadsheet,
  Users,
} from "lucide-react";

interface ClassRegisterStatus {
  id: string;
  className: string;
  formMaster: string;
  enrolledStudents: number;
  markedPresent: number;
  markedAbsent: number;
  markedLate: number;
  status: "submitted_ontime" | "submitted_late" | "pending" | "inconsistent";
  submissionTime?: string;
  inconsistentReason?: string;
}

interface CorrectionRequest {
  id: string;
  studentName: string;
  studentId: string;
  className: string;
  date: string;
  originalStatus: "Absent" | "Present" | "Late";
  requestedStatus: "Present" | "Excused";
  reason: string;
  teacherName: string;
  requestedAt: string;
  status: "pending" | "approved" | "rejected";
}

const INITIAL_REGISTERS: ClassRegisterStatus[] = [
  {
    id: "reg-1",
    className: "JSS 1 Alpha",
    formMaster: "Mr. Chukwudi Eze",
    enrolledStudents: 32,
    markedPresent: 31,
    markedAbsent: 1,
    markedLate: 0,
    status: "submitted_ontime",
    submissionTime: "08:14 AM",
  },
  {
    id: "reg-2",
    className: "JSS 1 Beta",
    formMaster: "Mrs. Folake Adeyemi",
    enrolledStudents: 30,
    markedPresent: 28,
    markedAbsent: 2,
    markedLate: 1,
    status: "submitted_ontime",
    submissionTime: "08:22 AM",
  },
  {
    id: "reg-3",
    className: "JSS 2 Diamond",
    formMaster: "Mr. David Alabi",
    enrolledStudents: 34,
    markedPresent: 33,
    markedAbsent: 1,
    markedLate: 2,
    status: "submitted_late",
    submissionTime: "09:45 AM",
  },
  {
    id: "reg-4",
    className: "JSS 3 Gold",
    formMaster: "Ms. Amina Yusuf",
    enrolledStudents: 28,
    markedPresent: 0,
    markedAbsent: 0,
    markedLate: 0,
    status: "pending",
  },
  {
    id: "reg-5",
    className: "SSS 1 Science A",
    formMaster: "Dr. Oladipo Johnson",
    enrolledStudents: 36,
    markedPresent: 35,
    markedAbsent: 1,
    markedLate: 0,
    status: "submitted_ontime",
    submissionTime: "08:05 AM",
  },
  {
    id: "reg-6",
    className: "SSS 2 Commercial",
    formMaster: "Mrs. Grace Briggs",
    enrolledStudents: 30,
    markedPresent: 31, // Inconsistent headcount
    markedAbsent: 0,
    markedLate: 1,
    status: "inconsistent",
    submissionTime: "08:35 AM",
    inconsistentReason: "Present headcount (31) exceeds registered class size (30). Possible duplicate entry.",
  },
  {
    id: "reg-7",
    className: "SSS 3 Arts",
    formMaster: "Mr. Anthony Okafor",
    enrolledStudents: 26,
    markedPresent: 0,
    markedAbsent: 0,
    markedLate: 0,
    status: "pending",
  },
];

const INITIAL_CORRECTIONS: CorrectionRequest[] = [
  {
    id: "cor-1",
    studentName: "Somtochukwu Obi",
    studentId: "RC-2024-0091",
    className: "JSS 2 Diamond",
    date: "Today, Oct 25",
    originalStatus: "Absent",
    requestedStatus: "Present",
    reason: "Student arrived at 08:30 AM with certified clinic admission slip from School Infirmary.",
    teacherName: "Mr. David Alabi",
    requestedAt: "09:50 AM",
    status: "pending",
  },
  {
    id: "cor-2",
    studentName: "Farouk Danjuma",
    studentId: "RC-2023-0142",
    className: "SSS 1 Science A",
    date: "Yesterday, Oct 24",
    originalStatus: "Absent",
    requestedStatus: "Excused",
    reason: "Represented Riverside College at State Inter-School STEM Olympiad finals.",
    teacherName: "Dr. Oladipo Johnson",
    requestedAt: "Oct 24, 04:15 PM",
    status: "pending",
  },
];

export function AttendanceAdminView() {
  const [registers, setRegisters] = useState<ClassRegisterStatus[]>(INITIAL_REGISTERS);
  const [corrections, setCorrections] = useState<CorrectionRequest[]>(INITIAL_CORRECTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCorrection, setSelectedCorrection] = useState<CorrectionRequest | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Attendance rules configuration state
  const [rulesConfig, setRulesConfig] = useState({
    morningRollCallStart: "07:45",
    morningCutoffDeadline: "08:30",
    afternoonRollCallRequired: true,
    lateThresholdMinutes: 15,
    autoAlertParentsOnAbsence: true,
    requireAdminApprovalForCorrections: true,
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleApproveCorrection = (id: string) => {
    setCorrections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c))
    );
    setSelectedCorrection(null);
    showToast("Attendance correction approved and audited in school records.");
  };

  const handleRejectCorrection = (id: string) => {
    setCorrections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "rejected" } : c))
    );
    setSelectedCorrection(null);
    showToast("Attendance correction request declined.");
  };

  const handleSendReminder = (className: string, teacher: string) => {
    showToast(`Instant push & SMS reminder dispatched to Form Master ${teacher} (${className}).`);
  };

  const filteredRegisters = registers.filter((r) => {
    const matchesSearch =
      r.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.formMaster.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalClasses = registers.length;
  const submittedCount = registers.filter((r) => r.status === "submitted_ontime" || r.status === "submitted_late").length;
  const pendingCount = registers.filter((r) => r.status === "pending").length;
  const inconsistentCount = registers.filter((r) => r.status === "inconsistent").length;
  const totalEnrolled = registers.reduce((sum, r) => sum + r.enrolledStudents, 0);
  const totalPresent = registers.reduce((sum, r) => sum + r.markedPresent, 0);
  const attendanceRate = Math.round((totalPresent / (totalEnrolled || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                School Operations &amp; Daily Registers
              </span>
              <span className="text-xs text-ink-muted">Academic Term 2 · Week 8</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-ink">Attendance Administration &amp; Session Radar</h2>
            <p className="text-xs text-ink-muted">
              Configure attendance rules, monitor class register submissions in real-time, detect duplicate or inconsistent headcounts, and authorize faculty register corrections.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setConfigModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-raised px-4 py-2 text-xs font-bold text-ink hover:border-emerald-600 hover:text-emerald-700 active:scale-95 transition-all shadow-sm"
            >
              <Settings className="size-4" />
              <span>Configure Rules &amp; Cutoffs</span>
            </button>

            <button
              type="button"
              onClick={() => showToast("Daily Attendance Broadsheet exported to CSV / Excel.")}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
            >
              <Download className="size-4" />
              <span>Export Today's Summary</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-line">
          <div className="p-3.5 rounded-2xl bg-surface-raised border border-line-soft">
            <span className="text-[11px] text-ink-muted block font-medium">Class Arms Monitored</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-ink">{totalClasses}</span>
              <span className="text-[10px] text-ink-muted font-mono">Stream arms</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-[11px] text-emerald-700 block font-medium">Registers Submitted</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-emerald-700">{submittedCount}</span>
              <span className="text-[10px] text-emerald-600 font-bold font-mono">
                {Math.round((submittedCount / totalClasses) * 100)}% compliance
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <span className="text-[11px] text-amber-700 block font-medium">Pending Registers</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-amber-700">{pendingCount}</span>
              <span className="text-[10px] text-amber-600 font-bold font-mono">Due by 08:30 AM</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20">
            <span className="text-[11px] text-rose-700 block font-medium">Inconsistent Records</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-rose-700">{inconsistentCount}</span>
              <span className="text-[10px] text-rose-600 font-bold font-mono">Action Required</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-primary-light/40 border border-primary/20">
            <span className="text-[11px] text-primary block font-medium">Aggregate Attendance</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-primary">{attendanceRate}%</span>
              <span className="text-[10px] text-ink-muted font-mono">{totalPresent} present</span>
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

      {/* SECTION 1: INCONSISTENCY & AUDIT ALERT NOTICES */}
      {inconsistentCount > 0 && (
        <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-5 dark:bg-rose-950/20 dark:border-rose-900/40 space-y-3">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
            <AlertTriangle className="size-4.5 text-rose-600" />
            <span>Attendance Inconsistency Detected in Class SSS 2 Commercial</span>
          </div>
          <p className="text-xs text-rose-600/90 dark:text-rose-300 leading-relaxed">
            Form Master Mrs. Grace Briggs marked <strong>31 students present</strong>, which exceeds the authorized enrolled class roll of 30. A student transfer or duplicated registration code may be unassigned.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <Link
              href="/dashboard/admin/classes"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300 underline hover:no-underline"
            >
              Verify Class Arm Enrollment Roll →
            </Link>
            <button
              type="button"
              onClick={() => showToast("Flagged entry sent to Form Master Mrs. Grace Briggs for verification.")}
              className="rounded-xl border border-rose-300 bg-white dark:bg-rose-900/40 px-3 py-1 text-xs font-bold text-rose-700 dark:text-rose-200 hover:bg-rose-100"
            >
              Request Headcount Recount
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: CLASS REGISTERS RADAR TABLE */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-ink">Daily Class Register Status</h3>
            <p className="text-xs text-ink-muted">Real-time status of morning registers submitted by assigned Form Masters.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-3.5 text-ink-muted" />
              <input
                type="text"
                placeholder="Search class or teacher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 rounded-xl border border-line bg-surface-raised pl-8 pr-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-emerald-600 focus:outline-none"
              />
            </div>

            {/* Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-semibold text-ink focus:border-emerald-600 focus:outline-none"
            >
              <option value="all">All Statuses ({registers.length})</option>
              <option value="submitted_ontime">Submitted On-Time</option>
              <option value="submitted_late">Submitted Late</option>
              <option value="pending">Pending Register</option>
              <option value="inconsistent">Inconsistent Headcount</option>
            </select>
          </div>
        </div>

        {/* Registers Table */}
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-xs text-ink">
            <thead className="bg-surface-raised font-mono text-[11px] font-bold uppercase tracking-wider text-ink-muted border-b border-line">
              <tr>
                <th className="p-3.5">Class Arm</th>
                <th className="p-3.5">Assigned Form Master</th>
                <th className="p-3.5">Enrolled Roll</th>
                <th className="p-3.5">Present / Absent / Late</th>
                <th className="p-3.5">Submission Time</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Administrative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredRegisters.map((reg) => (
                <tr key={reg.id} className="hover:bg-surface-raised/60 transition-colors">
                  <td className="p-3.5 font-bold text-ink">
                    <span>{reg.className}</span>
                  </td>
                  <td className="p-3.5 text-ink-soft">
                    <span>{reg.formMaster}</span>
                  </td>
                  <td className="p-3.5 font-mono text-ink-muted font-bold">
                    {reg.enrolledStudents} students
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-emerald-600 font-bold">{reg.markedPresent}P</span>
                      <span className="text-rose-600 font-bold">{reg.markedAbsent}A</span>
                      <span className="text-amber-600 font-bold">{reg.markedLate}L</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-xs text-ink-muted">
                    {reg.submissionTime || <span className="text-amber-600 font-bold">Pending submission</span>}
                  </td>
                  <td className="p-3.5">
                    {reg.status === "submitted_ontime" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="size-3 text-emerald-600" />
                        <span>On Time</span>
                      </span>
                    )}
                    {reg.status === "submitted_late" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-700 dark:text-amber-400">
                        <Clock className="size-3 text-amber-600" />
                        <span>Submitted Late</span>
                      </span>
                    )}
                    {reg.status === "pending" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-rose-700 dark:text-rose-400">
                        <Clock className="size-3 text-rose-600" />
                        <span>Overdue</span>
                      </span>
                    )}
                    {reg.status === "inconsistent" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-red-700 dark:text-red-400 animate-pulse">
                        <AlertTriangle className="size-3 text-red-600" />
                        <span>Inconsistent</span>
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    {reg.status === "pending" ? (
                      <button
                        type="button"
                        onClick={() => handleSendReminder(reg.className, reg.formMaster)}
                        className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-[11px] font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-500/20"
                      >
                        Send Reminder
                      </button>
                    ) : reg.status === "inconsistent" ? (
                      <button
                        type="button"
                        onClick={() => alert(reg.inconsistentReason)}
                        className="rounded-xl bg-rose-600 px-3 py-1 font-mono text-[11px] font-bold text-white hover:bg-rose-700"
                      >
                        Inspect Flag
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => showToast(`Register for ${reg.className} verified.`)}
                        className="rounded-xl border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] text-ink-muted hover:text-ink"
                      >
                        View Entries
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: AUTHORIZED ATTENDANCE CORRECTIONS QUEUE */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 font-mono text-[10px] font-bold text-blue-700">
                Audit Trail
              </span>
              <h3 className="text-base font-extrabold text-ink">Authorized Attendance Correction Requests</h3>
            </div>
            <p className="text-xs text-ink-muted">
              Faculty submissions requesting retrospective modification of marked absences (e.g. medical slip, athletic representation).
            </p>
          </div>
          <span className="font-mono text-xs text-ink-muted">
            {corrections.filter((c) => c.status === "pending").length} Pending Administrative Approvals
          </span>
        </div>

        <div className="space-y-3">
          {corrections.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-line bg-surface-raised/70 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink text-sm">{item.studentName}</span>
                  <span className="font-mono text-[11px] text-ink-muted">{item.studentId}</span>
                  <span className="rounded bg-primary-light px-1.5 py-0.5 font-mono text-[10px] font-bold text-primary">
                    {item.className}
                  </span>
                </div>
                <p className="text-xs text-ink-soft">
                  Teacher: <strong>{item.teacherName}</strong> requested change from{" "}
                  <span className="line-through text-rose-600 font-bold">{item.originalStatus}</span> to{" "}
                  <span className="text-emerald-600 font-bold">{item.requestedStatus}</span>
                </p>
                <p className="text-[11px] text-ink-muted italic bg-surface p-2 rounded-xl border border-line-soft">
                  "{item.reason}"
                </p>
              </div>

              <div className="flex items-center gap-2">
                {item.status === "pending" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleRejectCorrection(item.id)}
                      className="inline-flex items-center gap-1 rounded-xl border border-line px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                    >
                      <X className="size-3.5" />
                      <span>Decline</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApproveCorrection(item.id)}
                      className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                    >
                      <Check className="size-3.5" />
                      <span>Authorize Correction</span>
                    </button>
                  </>
                ) : (
                  <span
                    className={`font-mono text-xs font-bold px-3 py-1 rounded-full ${
                      item.status === "approved"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-rose-500/10 text-rose-600"
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL: CONFIGURE ATTENDANCE RULES */}
      {configModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2 text-ink">
                <Settings className="size-5 text-emerald-600" />
                <h3 className="text-base font-extrabold">Configure Attendance Rules &amp; Cutoffs</h3>
              </div>
              <button
                type="button"
                onClick={() => setConfigModalOpen(false)}
                className="text-ink-muted hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Morning Roll Call Open</label>
                  <input
                    type="time"
                    value={rulesConfig.morningRollCallStart}
                    onChange={(e) => setRulesConfig({ ...rulesConfig, morningRollCallStart: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Morning Submission Cutoff</label>
                  <input
                    type="time"
                    value={rulesConfig.morningCutoffDeadline}
                    onChange={(e) => setRulesConfig({ ...rulesConfig, morningCutoffDeadline: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-ink-muted mb-1">Late Leniency (Minutes)</label>
                <input
                  type="number"
                  value={rulesConfig.lateThresholdMinutes}
                  onChange={(e) => setRulesConfig({ ...rulesConfig, lateThresholdMinutes: parseInt(e.target.value) || 0 })}
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                />
              </div>

              <div className="space-y-2.5 pt-2 border-t border-line">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rulesConfig.afternoonRollCallRequired}
                    onChange={(e) => setRulesConfig({ ...rulesConfig, afternoonRollCallRequired: e.target.checked })}
                    className="size-4 rounded text-emerald-600"
                  />
                  <span className="font-semibold text-ink">Enforce Afternoon Subject Roll Call</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rulesConfig.autoAlertParentsOnAbsence}
                    onChange={(e) => setRulesConfig({ ...rulesConfig, autoAlertParentsOnAbsence: e.target.checked })}
                    className="size-4 rounded text-emerald-600"
                  />
                  <span className="font-semibold text-ink">Send Automated SMS / WhatsApp to Guardians upon unexcused absence</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rulesConfig.requireAdminApprovalForCorrections}
                    onChange={(e) => setRulesConfig({ ...rulesConfig, requireAdminApprovalForCorrections: e.target.checked })}
                    className="size-4 rounded text-emerald-600"
                  />
                  <span className="font-semibold text-ink">Require Registry approval before retrospectively amending marks</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
              <button
                type="button"
                onClick={() => setConfigModalOpen(false)}
                className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfigModalOpen(false);
                  showToast("Attendance rules and cutoff schedules updated successfully!");
                }}
                className="rounded-xl bg-emerald-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-emerald-700"
              >
                Save Attendance Rules
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
