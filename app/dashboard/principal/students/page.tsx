"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  AlertTriangle,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  Filter,
  GraduationCap,
  HeartPulse,
  Lock,
  Mail,
  Phone,
  Search,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  UserCheck,
  UserMinus,
  UserPlus,
  Users,
  X,
} from "lucide-react";

interface StudentRecord {
  id: string;
  admissionNo: string;
  name: string;
  classArm: string;
  gender: string;
  attendanceRate: number;
  termAverage: number;
  gpa: number;
  status: "Active" | "Transferred" | "AIP Intervention";
  guardianName: string;
  guardianPhone: string;
  flags?: string[];
}

const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: "stu-1",
    admissionNo: "RC-2023-0184",
    name: "Tobi Adeleke",
    classArm: "SSS 2 Science A",
    gender: "Male",
    attendanceRate: 98.4,
    termAverage: 94.2,
    gpa: 3.82,
    status: "Active",
    guardianName: "Chief M. Adeleke",
    guardianPhone: "+234 803 111 2233",
  },
  {
    id: "stu-2",
    admissionNo: "RC-2023-0092",
    name: "Chidera Okafor",
    classArm: "SSS 3 Science A",
    gender: "Female",
    attendanceRate: 99.1,
    termAverage: 96.4,
    gpa: 4.00,
    status: "Active",
    guardianName: "Engr. Kenneth Okafor",
    guardianPhone: "+234 802 334 5566",
  },
  {
    id: "stu-3",
    admissionNo: "RC-2024-0312",
    name: "Chukwuma Obi",
    classArm: "SSS 2 Science A",
    gender: "Male",
    attendanceRate: 84.0,
    termAverage: 46.8,
    gpa: 1.85,
    status: "AIP Intervention",
    guardianName: "Mr. B. Obi",
    guardianPhone: "+234 805 778 9900",
    flags: ["Falling Chemistry & Physics", "4 Unexcused Absences"],
  },
  {
    id: "stu-4",
    admissionNo: "RC-2024-0405",
    name: "Fatima Danjuma",
    classArm: "JSS 3 Arts B",
    gender: "Female",
    attendanceRate: 86.5,
    termAverage: 48.2,
    gpa: 1.92,
    status: "AIP Intervention",
    guardianName: "Alhaji S. Danjuma",
    guardianPhone: "+234 809 443 2211",
    flags: ["Math Deficiency", "Persistent Lateness"],
  },
  {
    id: "stu-5",
    admissionNo: "RC-2025-0610",
    name: "Zainab Mohammed",
    classArm: "JSS 2 Gold",
    gender: "Female",
    attendanceRate: 97.8,
    termAverage: 95.8,
    gpa: 3.98,
    status: "Active",
    guardianName: "Dr. A. Mohammed",
    guardianPhone: "+234 813 998 7766",
  },
  {
    id: "stu-6",
    admissionNo: "RC-2023-0105",
    name: "Somtochukwu Eze",
    classArm: "SSS 2 Commercial",
    gender: "Male",
    attendanceRate: 96.0,
    termAverage: 94.9,
    gpa: 3.95,
    status: "Active",
    guardianName: "Barr. C. Eze",
    guardianPhone: "+234 803 445 1029",
  },
];

interface AIPPlan {
  id: string;
  studentName: string;
  classArm: string;
  subject: string;
  mentorTeacher: string;
  diagnosedIssue: string;
  weeklyTarget: string;
  status: "Active" | "Review Required" | "Completed";
}

const INITIAL_AIP: AIPPlan[] = [
  {
    id: "aip-1",
    studentName: "Chukwuma Obi",
    classArm: "SSS 2 Science A",
    subject: "Chemistry & Physics",
    mentorTeacher: "Dr. Kenneth Obi",
    diagnosedIssue: "Struggling with stoichiometry formulas and laboratory write-ups",
    weeklyTarget: "2 Hours Thursday Remedial Clinic + Guided Problem Sets",
    status: "Active",
  },
  {
    id: "aip-2",
    studentName: "Fatima Danjuma",
    classArm: "JSS 3 Arts B",
    subject: "Basic Mathematics",
    mentorTeacher: "Mr. David Alabi",
    diagnosedIssue: "Gaps in linear equations and algebraic factorization",
    weeklyTarget: "Peer tutoring with JSS 3 Math Olympiad Scholar",
    status: "Active",
  },
];

export default function PrincipalStudentsPage() {
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [aipList, setAipList] = useState<AIPPlan[]>(INITIAL_AIP);
  const [activeTab, setActiveTab] = useState<"directory" | "at-risk" | "aip" | "movement">("directory");
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredStudents = students.filter((s) => {
    const matches =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
      s.classArm.toLowerCase().includes(search.toLowerCase());
    if (activeTab === "at-risk") return matches && (s.status === "AIP Intervention" || (s.flags && s.flags.length > 0));
    return matches;
  });

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

        {/* Header Banner */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                  Section D · Student Oversight &amp; Academic Support
                </span>
                <span className="font-mono text-xs text-ink-muted">842 Students Enrolled</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Student Academic Health &amp; Intervention</h2>
              <p className="text-xs text-ink-muted max-w-3xl">
                Track holistic educational progress, identify students with declining marks, coordinate Academic Intervention Plans (AIP), and review enrollment exceptions, transfers, and promotions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Honor Roll GPA &ge; 3.5</span>
                <span className="text-lg font-black text-emerald-600">324 Students (38.5%)</span>
              </div>
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Active AIP Interventions</span>
                <span className="text-lg font-black text-rose-600">5 Students</span>
              </div>
            </div>
          </div>

          {/* Sub Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("directory")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "directory"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Student Body Overview ({students.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("at-risk")}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "at-risk"
                    ? "bg-rose-600 text-white shadow-sm"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                <AlertTriangle className="size-3.5" />
                <span>At-Risk &amp; Early Warnings (2)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("aip")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "aip"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Intervention Plans (AIP) ({aipList.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("movement")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "movement"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Admissions, Transfers &amp; Promotion
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs text-ink-muted">
              <Lock className="size-3.5 text-purple-600" />
              <span>Medical &amp; safeguarding files isolated in restricted vault</span>
            </div>
          </div>
        </div>

        {/* TAB 1: STUDENT DIRECTORY */}
        {activeTab === "directory" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 size-4 text-ink-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student, admission #, class..."
                  className="w-full rounded-xl border border-line bg-surface pl-9 pr-3 py-2 text-xs text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                      <th className="pb-3 font-bold uppercase">Student Name</th>
                      <th className="pb-3 font-bold uppercase">Admission No</th>
                      <th className="pb-3 font-bold uppercase">Class Arm</th>
                      <th className="pb-3 font-bold uppercase">Attendance</th>
                      <th className="pb-3 font-bold uppercase">Term Avg</th>
                      <th className="pb-3 font-bold uppercase">GPA</th>
                      <th className="pb-3 font-bold uppercase">Status</th>
                      <th className="pb-3 font-bold uppercase text-right">Dossier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-soft">
                    {filteredStudents.map((s) => (
                      <tr key={s.id} className="hover:bg-surface-raised transition-colors">
                        <td className="py-3.5">
                          <span className="font-bold text-ink block">{s.name}</span>
                          <span className="text-[10px] text-ink-muted">{s.guardianName}</span>
                        </td>
                        <td className="py-3.5 font-mono font-bold text-primary">{s.admissionNo}</td>
                        <td className="py-3.5 font-medium text-ink">{s.classArm}</td>
                        <td className="py-3.5 font-mono">
                          <span className={s.attendanceRate >= 90 ? "text-emerald-600 font-bold" : "text-danger font-bold"}>
                            {s.attendanceRate}%
                          </span>
                        </td>
                        <td className="py-3.5 font-mono font-bold text-ink">{s.termAverage}%</td>
                        <td className="py-3.5 font-mono font-bold text-primary">{s.gpa.toFixed(2)}</td>
                        <td className="py-3.5">
                          {s.status === "AIP Intervention" ? (
                            <span className="rounded-full bg-rose-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-rose-700 border border-rose-200">
                              AIP Active
                            </span>
                          ) : (
                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700 border border-emerald-200">
                              Good Standing
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedStudent(s)}
                            className="rounded-lg border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] font-semibold text-primary hover:border-primary"
                          >
                            Inspect Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AT-RISK STUDENTS RADAR */}
        {activeTab === "at-risk" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Early Intervention &amp; Falling Performance Radar</h3>
                <p className="text-xs text-ink-muted">
                  Cross-checks academic averages below 50% and attendance falling below 85% to trigger support before term exams.
                </p>
              </div>
              <span className="rounded-full bg-rose-100 px-3 py-1 font-mono text-xs font-bold text-rose-800">
                Active Intervention Mandated
              </span>
            </div>

            <div className="space-y-3">
              {students
                .filter((s) => s.status === "AIP Intervention")
                .map((s) => (
                  <div key={s.id} className="rounded-2xl border-2 border-rose-200 bg-rose-50/40 p-4 space-y-2">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-ink text-sm">{s.name}</span>
                          <span className="font-mono text-xs text-primary">({s.admissionNo})</span>
                          <span className="font-mono text-xs text-ink-muted">{s.classArm}</span>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {s.flags?.map((f) => (
                            <span key={f} className="rounded bg-rose-100 px-2 py-0.5 font-mono text-[10px] font-bold text-rose-800">
                              {f}
                            </span>
                          ))}
                        </div>
                        <div className="mt-2 text-xs text-ink-soft space-x-4">
                          <span>Term Average: <strong className="text-danger">{s.termAverage}%</strong></span>
                          <span>Attendance: <strong className="text-danger">{s.attendanceRate}%</strong></span>
                          <span>Guardian: <strong>{s.guardianName} ({s.guardianPhone})</strong></span>
                        </div>
                      </div>

                      <div className="shrink-0 text-right space-y-1.5">
                        <button
                          type="button"
                          onClick={() => showToast(`Counselor & parent conference requested for ${s.name}`)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-3 py-1.5 font-mono text-xs font-bold text-white shadow-sm hover:bg-ink-soft"
                        >
                          <Phone className="size-3.5" />
                          <span>Contact Guardian</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 3: ACADEMIC INTERVENTION PLANS (AIP) */}
        {activeTab === "aip" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Active Academic Intervention Plans (AIP)</h3>
                <p className="text-xs text-ink-muted">
                  Structured remediation programmes assigned with dedicated teacher mentors and target milestones.
                </p>
              </div>
              <button
                type="button"
                onClick={() => alert("Creating new AIP Intervention Protocol")}
                className="inline-flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 font-mono text-xs font-bold text-white shadow-sm hover:bg-primary-hover"
              >
                Create AIP Plan
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {aipList.map((plan) => (
                <div key={plan.id} className="rounded-2xl border border-line bg-surface-raised p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-ink">{plan.studentName}</h4>
                      <p className="font-mono text-xs text-primary">{plan.classArm} · {plan.subject}</p>
                    </div>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800 border border-amber-200">
                      {plan.status}
                    </span>
                  </div>

                  <div className="rounded-xl border border-line bg-surface p-2.5 text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-ink-muted block">Diagnosed Academic Gap</span>
                    <p className="text-ink-soft">{plan.diagnosedIssue}</p>
                  </div>

                  <div className="rounded-xl border border-line bg-surface p-2.5 text-xs space-y-1 font-mono">
                    <span className="text-[10px] uppercase font-bold text-primary block">Intervention Action</span>
                    <p className="text-ink font-semibold">{plan.weeklyTarget}</p>
                    <span className="block text-[10px] text-ink-muted mt-1">Lead Mentor: {plan.mentorTeacher}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ENROLLMENT EXCEPTIONS & MOVEMENT */}
        {activeTab === "movement" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="border-b border-line pb-4">
              <h3 className="text-base font-extrabold text-ink">Admissions, Transfers &amp; Promotion Decisions</h3>
              <p className="text-xs text-ink-muted">
                Executive authorization of midterm enrollment exceptions, external transfers, withdrawals, and year-end promotion board outcomes.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-surface-raised p-4">
                <span className="font-mono text-xs font-bold text-emerald-600 block uppercase">New Admissions</span>
                <span className="mt-2 block font-mono text-2xl font-black text-ink">44 Students</span>
                <p className="text-xs text-ink-muted mt-1">Enrolled and class-streamed for Term 2.</p>
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4">
                <span className="font-mono text-xs font-bold text-blue-600 block uppercase">Transfers In / Out</span>
                <span className="mt-2 block font-mono text-2xl font-black text-ink">4 Transfers</span>
                <p className="text-xs text-ink-muted mt-1">Official transcripts and clearance signed.</p>
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4">
                <span className="font-mono text-xs font-bold text-ink block uppercase">Approved Withdrawals</span>
                <span className="mt-2 block font-mono text-2xl font-black text-ink">2 Relocations</span>
                <p className="text-xs text-ink-muted mt-1">Bursary clearance finalized.</p>
              </div>
            </div>
          </div>
        )}

        {/* STUDENT PROFILE INSPECTION MODAL */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <h3 className="text-base font-extrabold text-ink">{selectedStudent.name}</h3>
                  <p className="font-mono text-xs text-primary">{selectedStudent.admissionNo} · {selectedStudent.classArm}</p>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="rounded-xl border border-line bg-surface-raised p-3 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-ink-muted uppercase font-mono block">Attendance Rate</span>
                    <span className="font-mono font-bold text-ink">{selectedStudent.attendanceRate}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-muted uppercase font-mono block">Term Average</span>
                    <span className="font-mono font-bold text-ink">{selectedStudent.termAverage}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-muted uppercase font-mono block">Cumulative GPA</span>
                    <span className="font-mono font-bold text-primary">{selectedStudent.gpa.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-ink-muted uppercase font-mono block">Standing</span>
                    <span className="font-bold text-emerald-600">{selectedStudent.status}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-line bg-surface-raised p-3 space-y-1">
                  <span className="text-[10px] text-ink-muted uppercase font-mono block">Guardian Record</span>
                  <p className="font-semibold text-ink">{selectedStudent.guardianName}</p>
                  <p className="font-mono text-ink-muted">{selectedStudent.guardianPhone}</p>
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="rounded-xl bg-primary px-4 py-2 font-mono text-xs font-bold text-white hover:bg-primary-hover"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
