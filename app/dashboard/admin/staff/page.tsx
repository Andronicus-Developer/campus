"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
  Search,
  Filter,
  X,
  DoorOpen,
  BookOpen,
  Mail,
  Phone,
  Landmark,
  ShieldAlert,
  GraduationCap,
  Sparkles,
} from "lucide-react";

type StaffRole = "teacher" | "bursar" | "admin";

interface StaffMember {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  staffId: string;
  role: StaffRole;
  designation: string;
  department: string;
  email: string;
  phone: string;
  formClass: string;
  teachingSubjects: { subject: string; classArm: string; periodsPerWeek: number }[];
  status: "Active" | "On Leave";
}

const INITIAL_CLASSES = [
  "SSS 3 Science A",
  "SSS 3 Arts",
  "SSS 2A (Pure Science)",
  "SSS 2B (Commercial)",
  "SSS 1 Science",
  "JSS 3 Alpha",
  "JSS 2 Gold",
  "JSS 1 Alpha",
];

const INITIAL_SUBJECTS = [
  "Mathematics",
  "English Language & Literature",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Basic Science & Tech",
  "Social Studies",
  "Financial Accounting",
  "Technical Drawing",
];

const INITIAL_STAFF: StaffMember[] = [
  {
    id: "stf-01",
    name: "Mr. David Alabi",
    firstName: "David",
    lastName: "Alabi",
    staffId: "TCH-084",
    role: "teacher",
    designation: "Senior Mathematics Master",
    department: "STEM & Mathematics",
    email: "d.alabi@riverside.edu",
    phone: "+234 803 119 4432",
    formClass: "SSS 2A (Pure Science)",
    teachingSubjects: [
      { subject: "Mathematics", classArm: "SSS 2A (Pure Science)", periodsPerWeek: 5 },
      { subject: "Mathematics", classArm: "SSS 1 Science", periodsPerWeek: 5 },
    ],
    status: "Active",
  },
  {
    id: "stf-02",
    name: "Mrs. Grace Okon",
    firstName: "Grace",
    lastName: "Okon",
    staffId: "TCH-092",
    role: "teacher",
    designation: "Biology Senior Faculty",
    department: "Pure Sciences",
    email: "g.okon@riverside.edu",
    phone: "+234 802 331 8844",
    formClass: "SSS 1 Science",
    teachingSubjects: [
      { subject: "Biology", classArm: "SSS 1 Science", periodsPerWeek: 4 },
      { subject: "Biology", classArm: "SSS 2A (Pure Science)", periodsPerWeek: 4 },
    ],
    status: "Active",
  },
  {
    id: "stf-03",
    name: "Ms. Chioma Okon",
    firstName: "Chioma",
    lastName: "Okon",
    staffId: "TCH-104",
    role: "teacher",
    designation: "Basic Science Faculty Lead",
    department: "Junior Secondary",
    email: "c.okon@riverside.edu",
    phone: "+234 818 902 3310",
    formClass: "JSS 2 Gold",
    teachingSubjects: [
      { subject: "Basic Science & Tech", classArm: "JSS 2 Gold", periodsPerWeek: 4 },
      { subject: "Basic Science & Tech", classArm: "JSS 1 Alpha", periodsPerWeek: 4 },
    ],
    status: "Active",
  },
  {
    id: "stf-04",
    name: "Mr. Francis Eze",
    firstName: "Francis",
    lastName: "Eze",
    staffId: "TCH-078",
    role: "teacher",
    designation: "Physics & Technical Drawing Lead",
    department: "Applied Sciences",
    email: "f.eze@riverside.edu",
    phone: "+234 703 112 9901",
    formClass: "SSS 3 Science A",
    teachingSubjects: [
      { subject: "Physics", classArm: "SSS 3 Science A", periodsPerWeek: 5 },
      { subject: "Physics", classArm: "SSS 2A (Pure Science)", periodsPerWeek: 5 },
      { subject: "Technical Drawing", classArm: "SSS 2A (Pure Science)", periodsPerWeek: 3 },
    ],
    status: "Active",
  },
  {
    id: "stf-05",
    name: "Mrs. Nneka Udoh",
    firstName: "Nneka",
    lastName: "Udoh",
    staffId: "TCH-110",
    role: "teacher",
    designation: "English & Literature Faculty",
    department: "Humanities & Languages",
    email: "n.udoh@riverside.edu",
    phone: "+234 809 445 1120",
    formClass: "SSS 3 Arts",
    teachingSubjects: [
      { subject: "English Language & Literature", classArm: "SSS 3 Arts", periodsPerWeek: 5 },
      { subject: "English Language & Literature", classArm: "SSS 2A (Pure Science)", periodsPerWeek: 5 },
    ],
    status: "Active",
  },
  {
    id: "stf-06",
    name: "Mrs. Angela Nnamdi, FCA",
    firstName: "Angela",
    lastName: "Nnamdi",
    staffId: "BUR-005",
    role: "bursar",
    designation: "Bursar & Head of Financial Accounts",
    department: "Bursary & Treasury Division",
    email: "a.nnamdi@riverside.edu",
    phone: "+234 802 555 7711",
    formClass: "None (Bursary Division)",
    teachingSubjects: [],
    status: "Active",
  },
  {
    id: "stf-07",
    name: "Mr. Samuel Oladipo",
    firstName: "Samuel",
    lastName: "Oladipo",
    staffId: "BUR-006",
    role: "bursar",
    designation: "Deputy Bursar & Student Billings",
    department: "Bursary & Treasury Division",
    email: "s.oladipo@riverside.edu",
    phone: "+234 803 881 2290",
    formClass: "None (Bursary Division)",
    teachingSubjects: [],
    status: "Active",
  },
  {
    id: "stf-08",
    name: "Engr. Patrick Bassey",
    firstName: "Patrick",
    lastName: "Bassey",
    staffId: "ADM-012",
    role: "admin",
    designation: "Director of Registry & Operations",
    department: "Admissions & Records",
    email: "p.bassey@riverside.edu",
    phone: "+234 803 999 1100",
    formClass: "None (School Administration)",
    teachingSubjects: [],
    status: "Active",
  },
];

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | StaffRole>("all");

  // Modals state
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [assignFormMasterStaff, setAssignFormMasterStaff] = useState<StaffMember | null>(null);
  const [assignSubjectsStaff, setAssignSubjectsStaff] = useState<StaffMember | null>(null);

  // Success toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Form state for Onboard Staff
  const [onboardForm, setOnboardForm] = useState({
    firstName: "",
    lastName: "",
    role: "teacher" as StaffRole,
    staffId: "TCH-115",
    designation: "Subject Teacher",
    department: "STEM & Mathematics",
    email: "",
    phone: "+234 803 ",
    formClass: "None (Subject Teacher)",
  });

  // Teaching Assignment form state
  const [newAssignment, setNewAssignment] = useState({
    subject: INITIAL_SUBJECTS[0],
    classArm: INITIAL_CLASSES[0],
    periodsPerWeek: 5,
  });

  // Filtered staff list
  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.staffId.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.designation.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || s.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Handler: Onboard Staff
  const handleOnboardStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardForm.firstName || !onboardForm.lastName || !onboardForm.email) return;

    const fullName = `${onboardForm.role === "bursar" ? "Mrs. " : "Mr. "}${onboardForm.firstName} ${onboardForm.lastName}`;
    const newStaff: StaffMember = {
      id: `stf-${Date.now()}`,
      name: fullName,
      firstName: onboardForm.firstName,
      lastName: onboardForm.lastName,
      staffId: onboardForm.staffId,
      role: onboardForm.role,
      designation: onboardForm.designation,
      department: onboardForm.department,
      email: onboardForm.email,
      phone: onboardForm.phone,
      formClass: onboardForm.role === "teacher" ? onboardForm.formClass : "None (Office)",
      teachingSubjects: [],
      status: "Active",
    };

    setStaff([newStaff, ...staff]);
    setShowOnboardModal(false);
    showToast(
      `New ${onboardForm.role.toUpperCase()} ${fullName} (${onboardForm.staffId}) successfully onboarded!`
    );

    // Reset form
    setOnboardForm({
      firstName: "",
      lastName: "",
      role: "teacher",
      staffId: `TCH-${116 + staff.length}`,
      designation: "Subject Teacher",
      department: "STEM & Mathematics",
      email: "",
      phone: "+234 803 ",
      formClass: "None (Subject Teacher)",
    });
  };

  // Handler: Assign Form Master
  const handleUpdateFormClass = (staffId: string, formClass: string) => {
    setStaff((prev) =>
      prev.map((s) => (s.id === staffId ? { ...s, formClass } : s))
    );
    setAssignFormMasterStaff(null);
    showToast(`Form Master duty set to ${formClass}`);
  };

  // Handler: Add Teaching Subject Assignment
  const handleAddTeachingSubject = (staffId: string) => {
    setStaff((prev) =>
      prev.map((s) => {
        if (s.id === staffId) {
          return {
            ...s,
            teachingSubjects: [
              ...s.teachingSubjects,
              {
                subject: newAssignment.subject,
                classArm: newAssignment.classArm,
                periodsPerWeek: Number(newAssignment.periodsPerWeek),
              },
            ],
          };
        }
        return s;
      })
    );

    showToast(`Teaching assignment for ${newAssignment.subject} (${newAssignment.classArm}) added!`);
  };

  // Handler: Remove Teaching Subject Assignment
  const handleRemoveTeachingSubject = (staffId: string, index: number) => {
    setStaff((prev) =>
      prev.map((s) => {
        if (s.id === staffId) {
          const updated = [...s.teachingSubjects];
          updated.splice(index, 1);
          return { ...s, teachingSubjects: updated };
        }
        return s;
      })
    );
    showToast("Teaching allocation removed.");
  };

  return (
    <DashboardLayout currentRole="admin">
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="flex items-center justify-between rounded-2xl bg-emerald-600 px-5 py-3 text-white shadow-lg animate-in fade-in slide-in-from-top duration-300">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* Header Hero */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                  School Admin Authority
                </span>
                <span className="font-mono text-xs text-ink-muted">
                  {staff.length} Appointed Staff Members
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Staff Management &amp; Assignments</h2>
              <p className="text-xs text-ink-muted">
                Add and create Teachers, Bursars, and Administrators, designate Form Masters, and allocate teaching subjects.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowOnboardModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all"
              >
                <UserPlus className="size-4" />
                <span>+ Onboard Staff (Teacher / Bursar)</span>
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setRoleFilter("all")}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  roleFilter === "all"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                All Staff ({staff.length})
              </button>

              <button
                onClick={() => setRoleFilter("teacher")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  roleFilter === "teacher"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                <GraduationCap className="size-3.5" />
                <span>Teachers ({staff.filter((s) => s.role === "teacher").length})</span>
              </button>

              <button
                onClick={() => setRoleFilter("bursar")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  roleFilter === "bursar"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                <Landmark className="size-3.5" />
                <span>Bursar / Finance ({staff.filter((s) => s.role === "bursar").length})</span>
              </button>

              <button
                onClick={() => setRoleFilter("admin")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  roleFilter === "admin"
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                <ShieldCheck className="size-3.5" />
                <span>Administrators ({staff.filter((s) => s.role === "admin").length})</span>
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 size-4 text-ink-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search staff name, ID, subject..."
                className="w-full rounded-xl border border-line bg-surface-raised pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                  <th className="pb-3 font-bold uppercase">Staff Name &amp; Role</th>
                  <th className="pb-3 font-bold uppercase">Staff ID</th>
                  <th className="pb-3 font-bold uppercase">Department &amp; Title</th>
                  <th className="pb-3 font-bold uppercase">Form Class Arm</th>
                  <th className="pb-3 font-bold uppercase">Teaching Subjects</th>
                  <th className="pb-3 font-bold uppercase">Email &amp; Contact</th>
                  <th className="pb-3 font-bold uppercase text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {filteredStaff.map((s) => (
                  <tr key={s.id} className="hover:bg-surface-raised transition-colors">
                    <td className="py-3.5">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex size-8 items-center justify-center rounded-full font-mono text-xs font-bold ${
                            s.role === "bursar"
                              ? "bg-amber-100 text-amber-800"
                              : s.role === "admin"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {s.firstName[0]}
                          {s.lastName[0]}
                        </div>
                        <div>
                          <span className="font-bold text-ink block">{s.name}</span>
                          <span
                            className={`inline-block rounded px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                              s.role === "bursar"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : s.role === "admin"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-blue-50 text-blue-700 border border-blue-200"
                            }`}
                          >
                            {s.role}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 font-mono font-bold text-primary">{s.staffId}</td>
                    <td className="py-3.5">
                      <span className="font-semibold text-ink block">{s.designation}</span>
                      <span className="text-[11px] text-ink-muted">{s.department}</span>
                    </td>
                    <td className="py-3.5">
                      {s.role === "teacher" ? (
                        <span className="inline-flex items-center gap-1 font-mono font-bold text-emerald-700">
                          <DoorOpen className="size-3 text-emerald-600" />
                          {s.formClass}
                        </span>
                      ) : (
                        <span className="font-mono text-ink-muted text-[11px]">N/A (Officer)</span>
                      )}
                    </td>
                    <td className="py-3.5">
                      {s.role === "teacher" ? (
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {s.teachingSubjects.map((sub, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 rounded bg-surface-raised px-1.5 py-0.5 font-mono text-[10px] text-ink border border-line"
                            >
                              <BookOpen className="size-2.5 text-primary" />
                              {sub.subject} ({sub.classArm})
                            </span>
                          ))}
                          {s.teachingSubjects.length === 0 && (
                            <span className="font-mono text-[10px] text-ink-muted">No subjects assigned</span>
                          )}
                        </div>
                      ) : (
                        <span className="font-mono text-[10px] text-ink-muted">N/A (Non-Teaching)</span>
                      )}
                    </td>
                    <td className="py-3.5 font-mono text-ink-muted text-[11px]">
                      <span className="block text-ink font-sans">{s.email}</span>
                      <span>{s.phone}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      {s.role === "teacher" ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setAssignFormMasterStaff(s)}
                            className="rounded-lg border border-line bg-surface-raised px-2 py-1 font-mono text-[11px] font-semibold text-ink hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                          >
                            Set Form Master
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setAssignSubjectsStaff(s);
                            }}
                            className="rounded-lg bg-emerald-600 px-2 py-1 font-mono text-[11px] font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                          >
                            Assign Subjects
                          </button>
                        </div>
                      ) : (
                        <span className="font-mono text-[11px] font-bold text-success-deep">
                          Authorized {s.role.toUpperCase()}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredStaff.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-xs text-ink-muted">
                      No staff members match the chosen search or role filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL: ONBOARD NEW STAFF (TEACHER / BURSAR / ADMIN) */}
        {showOnboardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <UserPlus className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Admin: Onboard New Staff Member</h3>
                    <p className="text-xs text-ink-muted">Create Teacher, Bursar, or Administrator account.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowOnboardModal(false)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleOnboardStaff} className="mt-4 space-y-4">
                {/* Role Selector Cards */}
                <div>
                  <label className="block text-xs font-bold text-ink">Select Staff Role</label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setOnboardForm({
                          ...onboardForm,
                          role: "teacher",
                          staffId: `TCH-${115 + staff.length}`,
                          designation: "Subject Teacher & Faculty",
                          department: "STEM & Mathematics",
                        })
                      }
                      className={`flex flex-col items-center gap-1 rounded-2xl border p-3 text-center transition-all ${
                        onboardForm.role === "teacher"
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                          : "border-line bg-surface-raised text-ink hover:border-line-strong"
                      }`}
                    >
                      <GraduationCap className="size-5 text-emerald-700" />
                      <span className="font-bold text-xs">Teacher</span>
                      <span className="text-[10px] text-ink-muted">Instruction &amp; Scores</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setOnboardForm({
                          ...onboardForm,
                          role: "bursar",
                          staffId: `BUR-00${staff.filter((s) => s.role === "bursar").length + 7}`,
                          designation: "Accounts Officer & Bursar",
                          department: "Bursary & Finance Division",
                        })
                      }
                      className={`flex flex-col items-center gap-1 rounded-2xl border p-3 text-center transition-all ${
                        onboardForm.role === "bursar"
                          ? "border-amber-600 bg-amber-50 text-amber-900"
                          : "border-line bg-surface-raised text-ink hover:border-line-strong"
                      }`}
                    >
                      <Landmark className="size-5 text-amber-700" />
                      <span className="font-bold text-xs">Bursar</span>
                      <span className="text-[10px] text-ink-muted">Treasury &amp; Fees</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setOnboardForm({
                          ...onboardForm,
                          role: "admin",
                          staffId: `ADM-0${staff.filter((s) => s.role === "admin").length + 14}`,
                          designation: "Operations & Registry Officer",
                          department: "Admissions & Registry",
                        })
                      }
                      className={`flex flex-col items-center gap-1 rounded-2xl border p-3 text-center transition-all ${
                        onboardForm.role === "admin"
                          ? "border-emerald-800 bg-emerald-50 text-emerald-950"
                          : "border-line bg-surface-raised text-ink hover:border-line-strong"
                      }`}
                    >
                      <ShieldCheck className="size-5 text-emerald-800" />
                      <span className="font-bold text-xs">Administrator</span>
                      <span className="text-[10px] text-ink-muted">Registry &amp; Quotas</span>
                    </button>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David"
                      value={onboardForm.firstName}
                      onChange={(e) => setOnboardForm({ ...onboardForm, firstName: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Last Name / Surname</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alabi"
                      value={onboardForm.lastName}
                      onChange={(e) => setOnboardForm({ ...onboardForm, lastName: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">Staff ID Code</label>
                    <input
                      type="text"
                      required
                      value={onboardForm.staffId}
                      onChange={(e) => setOnboardForm({ ...onboardForm, staffId: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 font-mono text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="staff@riverside.edu"
                      value={onboardForm.email}
                      onChange={(e) => setOnboardForm({ ...onboardForm, email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">Designation / Title</label>
                    <input
                      type="text"
                      required
                      value={onboardForm.designation}
                      onChange={(e) => setOnboardForm({ ...onboardForm, designation: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Department</label>
                    <input
                      type="text"
                      required
                      value={onboardForm.department}
                      onChange={(e) => setOnboardForm({ ...onboardForm, department: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                {onboardForm.role === "teacher" && (
                  <div>
                    <label className="block text-xs font-bold text-ink">Appoint Form Master Class Arm (Optional)</label>
                    <select
                      value={onboardForm.formClass}
                      onChange={(e) => setOnboardForm({ ...onboardForm, formClass: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="None (Subject Teacher)">None (Subject Teacher Only)</option>
                      {INITIAL_CLASSES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-end gap-2 border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => setShowOnboardModal(false)}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                  >
                    Create &amp; Provision Staff Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ASSIGN FORM MASTER */}
        {assignFormMasterStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <DoorOpen className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Assign Form Master Class</h3>
                    <p className="text-xs text-ink-muted">Teacher: {assignFormMasterStaff.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setAssignFormMasterStaff(null)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div className="rounded-xl bg-surface-raised p-3 text-xs">
                  <span className="text-ink-muted block">Current Assignment:</span>
                  <span className="font-bold text-ink">{assignFormMasterStaff.formClass}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink">Select Class Arm to Assign</label>
                  <div className="mt-2 space-y-1.5 max-h-56 overflow-y-auto">
                    <button
                      type="button"
                      onClick={() => handleUpdateFormClass(assignFormMasterStaff.id, "None (Subject Teacher)")}
                      className="w-full rounded-xl p-2.5 text-xs font-semibold text-left bg-surface-raised text-ink hover:border hover:border-emerald-600"
                    >
                      None (Relieve Form Master duties)
                    </button>
                    {INITIAL_CLASSES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => handleUpdateFormClass(assignFormMasterStaff.id, c)}
                        className={`w-full flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-left transition-all ${
                          assignFormMasterStaff.formClass === c
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            : "bg-surface-raised text-ink hover:border hover:border-emerald-600"
                        }`}
                      >
                        <span>{c}</span>
                        {assignFormMasterStaff.formClass === c && <CheckCircle2 className="size-4 text-emerald-700" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setAssignFormMasterStaff(null)}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-raised"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ASSIGN SUBJECTS & CLASSES TO TEACHER */}
        {assignSubjectsStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-xl rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <BookOpen className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Teaching Allocations</h3>
                    <p className="text-xs text-ink-muted">Teacher: {assignSubjectsStaff.name} ({assignSubjectsStaff.staffId})</p>
                  </div>
                </div>
                <button
                  onClick={() => setAssignSubjectsStaff(null)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {/* Current Teaching Matrix */}
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase text-ink-muted">
                    Current Assigned Teaching Units ({assignSubjectsStaff.teachingSubjects.length})
                  </span>
                  <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                    {assignSubjectsStaff.teachingSubjects.map((sub, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl bg-surface-raised p-2.5 text-xs border border-line"
                      >
                        <div>
                          <span className="font-bold text-ink block">{sub.subject}</span>
                          <span className="font-mono text-primary text-[11px]">{sub.classArm}</span>
                          <span className="text-ink-muted text-[10px] ml-2">({sub.periodsPerWeek} periods/wk)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveTeachingSubject(assignSubjectsStaff.id, idx)}
                          className="rounded-lg p-1 text-danger hover:bg-danger-light"
                          title="Remove assignment"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    ))}
                    {assignSubjectsStaff.teachingSubjects.length === 0 && (
                      <p className="text-xs text-ink-muted py-2">No subjects currently assigned to this teacher.</p>
                    )}
                  </div>
                </div>

                {/* Add New Subject Assignment */}
                <div className="rounded-2xl border border-line bg-surface-raised p-4">
                  <span className="font-bold text-xs text-ink block mb-3">
                    + Allocate New Subject &amp; Class Arm
                  </span>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="block text-[11px] font-bold text-ink">Subject</label>
                      <select
                        value={newAssignment.subject}
                        onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-line bg-surface px-2.5 py-1.5 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                      >
                        {INITIAL_SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-ink">Class Arm</label>
                      <select
                        value={newAssignment.classArm}
                        onChange={(e) => setNewAssignment({ ...newAssignment, classArm: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-line bg-surface px-2.5 py-1.5 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                      >
                        {INITIAL_CLASSES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-ink">Periods/Wk</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={newAssignment.periodsPerWeek}
                        onChange={(e) => setNewAssignment({ ...newAssignment, periodsPerWeek: Number(e.target.value) })}
                        className="mt-1 w-full rounded-xl border border-line bg-surface px-2.5 py-1.5 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleAddTeachingSubject(assignSubjectsStaff.id)}
                      className="rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                    >
                      Add Teaching Assignment
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setAssignSubjectsStaff(null)}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-raised"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
