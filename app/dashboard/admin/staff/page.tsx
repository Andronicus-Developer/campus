"use client";

import { useState, useEffect } from "react";
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
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Check,
  Lock,
  Clock,
  XCircle,
} from "lucide-react";
import { provisionUserCredentials } from "@/lib/actions/user-credentials";
import {
  StaffMember,
  StaffRole,
  ConfirmationStatus,
  INITIAL_STAFF,
  getStoredStaff,
  saveStoredStaff,
} from "@/lib/staff-data";

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

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "pending" | StaffRole>("all");

  // Sync with persistent store and cross-tab/cross-page events
  useEffect(() => {
    const loadStaff = () => {
      setStaff(getStoredStaff());
    };
    loadStaff();
    window.addEventListener("campus360:staff-updated", loadStaff);
    return () => window.removeEventListener("campus360:staff-updated", loadStaff);
  }, []);

  // Modals state
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [assignFormMasterStaff, setAssignFormMasterStaff] = useState<StaffMember | null>(null);
  const [assignSubjectsStaff, setAssignSubjectsStaff] = useState<StaffMember | null>(null);

  // Credential Management modal state
  const [manageCredentialsStaff, setManageCredentialsStaff] = useState<StaffMember | null>(null);
  const [staffCredentialForm, setStaffCredentialForm] = useState({
    email: "",
    password: "",
    portalAccess: true,
  });
  const [showStaffCredentialPassword, setShowStaffCredentialPassword] = useState(false);
  const [copiedStaffCreds, setCopiedStaffCreds] = useState(false);

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
    password: "Staff#2026!",
    phone: "+234 803 ",
    formClass: "None (Subject Teacher)",
    grantPortalAccess: true,
  });
  const [showOnboardPassword, setShowOnboardPassword] = useState(false);

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
      s.designation.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    if (roleFilter === "pending") {
      return matchesSearch && s.confirmationStatus === "pending";
    }
    const matchesRole = roleFilter === "all" || s.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Handler: Onboard Staff with Login Credentials & Executive Confirmation Workflow
  const handleOnboardStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardForm.firstName || !onboardForm.lastName || !onboardForm.email) return;

    const fullName = `${onboardForm.role === "bursar" ? "Mrs. " : "Mr. "}${onboardForm.firstName} ${onboardForm.lastName}`;
    const requiresPrincipalConfirmation = onboardForm.role === "teacher" || onboardForm.role === "bursar";

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
      status: requiresPrincipalConfirmation ? "Pending Confirmation" : "Active",
      confirmationStatus: requiresPrincipalConfirmation ? "pending" : "confirmed",
      onboardedBy: "Engr. Patrick Bassey (School Admin)",
      onboardedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      confirmedBy: requiresPrincipalConfirmation ? undefined : "Executive Registry",
      confirmedAt: requiresPrincipalConfirmation ? undefined : new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      loginPassword: onboardForm.password,
      portalAccess: onboardForm.grantPortalAccess,
    };

    const updatedList = [newStaff, ...staff];
    setStaff(updatedList);
    saveStoredStaff(updatedList);
    setShowOnboardModal(false);

    // Call server action to provision credentials
    try {
      await provisionUserCredentials({
        role: onboardForm.role,
        email: onboardForm.email,
        password: onboardForm.password,
        fullName,
        targetId: onboardForm.staffId,
      });
    } catch {
      // Local fallback continues smoothly
    }

    if (requiresPrincipalConfirmation) {
      showToast(
        `New ${onboardForm.role.toUpperCase()} ${fullName} onboarded. Appointment submitted for Principal confirmation.`
      );
    } else {
      showToast(
        `New Administrator ${fullName} onboarded with portal login: ${onboardForm.email}`
      );
    }

    // Reset form
    setOnboardForm({
      firstName: "",
      lastName: "",
      role: "teacher",
      staffId: `TCH-${116 + updatedList.length}`,
      designation: "Subject Teacher",
      department: "STEM & Mathematics",
      email: "",
      password: "Staff#2026!",
      phone: "+234 803 ",
      formClass: "None (Subject Teacher)",
      grantPortalAccess: true,
    });
    setShowOnboardPassword(false);
  };

  // Handler: Update / Save Credentials for existing staff
  const handleSaveStaffCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manageCredentialsStaff) return;

    const updated = staff.map((s) =>
      s.id === manageCredentialsStaff.id
        ? {
            ...s,
            email: staffCredentialForm.email,
            loginPassword: staffCredentialForm.password,
            portalAccess: staffCredentialForm.portalAccess,
          }
        : s
    );
    setStaff(updated);
    saveStoredStaff(updated);

    try {
      await provisionUserCredentials({
        role: manageCredentialsStaff.role,
        email: staffCredentialForm.email,
        password: staffCredentialForm.password,
        fullName: manageCredentialsStaff.name,
        targetId: manageCredentialsStaff.staffId,
      });
    } catch {
      // Graceful local handling
    }

    showToast(
      `Login credentials updated for ${manageCredentialsStaff.name} (${staffCredentialForm.email})`
    );
    setManageCredentialsStaff(null);
  };

  // Handler: Copy Staff Credentials to clipboard
  const copyStaffCredentials = (name: string, role: string, email: string, pass: string) => {
    const text = `Campus360 Portal Login Credentials\nUser: ${name}\nRole: ${role.toUpperCase()}\nLogin Email: ${email}\nPassword: ${pass}\nPortal Sign-in URL: ${typeof window !== "undefined" ? window.location.origin : ""}/login`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedStaffCreds(true);
    showToast("Login credentials copied to clipboard!");
    setTimeout(() => setCopiedStaffCreds(false), 2500);
  };

  // Handler: Assign Form Master
  const handleUpdateFormClass = (staffId: string, formClass: string) => {
    const updated = staff.map((s) => (s.id === staffId ? { ...s, formClass } : s));
    setStaff(updated);
    saveStoredStaff(updated);
    setAssignFormMasterStaff(null);
    showToast(`Form Master duty set to ${formClass}`);
  };

  // Handler: Add Teaching Subject Assignment
  const handleAddTeachingSubject = (staffId: string) => {
    const updated = staff.map((s) => {
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
    });
    setStaff(updated);
    saveStoredStaff(updated);
    showToast(`Teaching assignment for ${newAssignment.subject} (${newAssignment.classArm}) added!`);
  };

  // Handler: Remove Teaching Subject Assignment
  const handleRemoveTeachingSubject = (staffId: string, index: number) => {
    const updated = staff.map((s) => {
      if (s.id === staffId) {
        const nextSubs = [...s.teachingSubjects];
        nextSubs.splice(index, 1);
        return { ...s, teachingSubjects: nextSubs };
      }
      return s;
    });
    setStaff(updated);
    saveStoredStaff(updated);
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
                onClick={() => setRoleFilter("pending")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  roleFilter === "pending"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100"
                }`}
              >
                <Clock className="size-3.5 text-amber-600 animate-pulse" />
                <span>Pending Principal ({staff.filter((s) => s.confirmationStatus === "pending").length})</span>
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
                  <th className="pb-3 font-bold uppercase">Principal Approval</th>
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
                    <td className="py-3.5">
                      {s.confirmationStatus === "pending" ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-700 border border-amber-200">
                            <Clock className="size-3 text-amber-600 animate-pulse" />
                            Pending Principal
                          </span>
                          <span className="block text-[10px] text-ink-muted">
                            Awaiting Sign-off
                          </span>
                        </div>
                      ) : s.confirmationStatus === "rejected" ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-rose-700 border border-rose-200">
                            <XCircle className="size-3 text-rose-600" />
                            Declined
                          </span>
                          <span className="block text-[10px] text-rose-600 truncate max-w-[120px]" title={s.rejectionReason}>
                            {s.rejectionReason || "Needs revision"}
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="size-3 text-emerald-600" />
                            Confirmed
                          </span>
                          <span className="block text-[10px] text-ink-muted">
                            {s.confirmedBy ? s.confirmedBy.replace(" (Principal)", "") : "Dr. Peters"}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 font-mono text-ink-muted text-[11px]">
                      <div className="flex items-center gap-1.5 font-sans font-medium text-ink">
                        <Mail className="size-3 text-ink-muted" />
                        <span>{s.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded px-1.5 py-0.2 font-mono text-[10px] font-bold ${
                            s.portalAccess !== false
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          <KeyRound className="size-2.5 text-emerald-600" />
                          Portal: {s.portalAccess !== false ? "Active" : "Disabled"}
                        </span>
                        <span>{s.phone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setManageCredentialsStaff(s);
                            setStaffCredentialForm({
                              email: s.email,
                              password: s.loginPassword || "Staff#2026!",
                              portalAccess: s.portalAccess !== false,
                            });
                            setShowStaffCredentialPassword(false);
                            setCopiedStaffCreds(false);
                          }}
                          title="Manage portal login email & password"
                          className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] font-bold text-ink hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                          <KeyRound className="size-3 text-emerald-600" />
                          <span>Portal Login</span>
                        </button>

                        {s.role === "teacher" && (
                          <>
                            <button
                              type="button"
                              onClick={() => setAssignFormMasterStaff(s)}
                              className="rounded-lg border border-line bg-surface-raised px-2 py-1 font-mono text-[11px] font-semibold text-ink hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                            >
                              Form Master
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setAssignSubjectsStaff(s);
                              }}
                              className="rounded-lg bg-emerald-600 px-2 py-1 font-mono text-[11px] font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                            >
                              Subjects
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredStaff.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-xs text-ink-muted">
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

                {/* Executive Tier-1 Confirmation Callout */}
                {(onboardForm.role === "teacher" || onboardForm.role === "bursar") && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-950 flex items-start gap-2.5">
                    <ShieldCheck className="size-4.5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Principal Executive Sign-Off Required</span>
                      <span className="text-[11px] text-amber-800 leading-relaxed block mt-0.5">
                        New {onboardForm.role === "teacher" ? "Teachers" : "Bursars"} added by School Admin will enter the Principal&apos;s Tier-1 Approvals Queue for executive appointment confirmation before being confirmed.
                      </span>
                    </div>
                  </div>
                )}

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
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-ink">Work / Login Email</label>
                      {onboardForm.firstName && onboardForm.lastName && (
                        <button
                          type="button"
                          onClick={() => {
                            const suggested = `${onboardForm.firstName.toLowerCase()[0]}.${onboardForm.lastName.toLowerCase()}@riverside.edu`;
                            setOnboardForm({ ...onboardForm, email: suggested });
                          }}
                          className="text-[11px] font-semibold text-emerald-700 hover:underline"
                        >
                          ⚡ Auto-fill
                        </button>
                      )}
                    </div>
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

                {/* Portal Login Credentials Section */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                      <KeyRound className="size-3.5 text-emerald-700" />
                      <span>Staff Portal Login &amp; Password</span>
                    </div>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                      {onboardForm.role.toUpperCase()} ACCESS
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-ink">Assigned Portal Password</label>
                      <button
                        type="button"
                        onClick={() => {
                          const prefix = onboardForm.role === "bursar" ? "Bursar" : onboardForm.role === "admin" ? "Admin" : "Faculty";
                          const generated = `${prefix}#${Math.floor(1000 + Math.random() * 9000)}!`;
                          setOnboardForm({ ...onboardForm, password: generated });
                        }}
                        className="text-[11px] font-semibold text-emerald-700 hover:underline"
                      >
                        ⚡ Generate Password
                      </button>
                    </div>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-2.5 size-4 text-ink-muted" />
                      <input
                        type={showOnboardPassword ? "text" : "password"}
                        required
                        value={onboardForm.password}
                        onChange={(e) => setOnboardForm({ ...onboardForm, password: e.target.value })}
                        className="w-full rounded-xl border border-line bg-surface pl-9 pr-10 py-2 font-mono text-xs text-ink focus:border-emerald-600 focus:outline-none"
                        placeholder="Enter initial password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOnboardPassword(!showOnboardPassword)}
                        className="absolute right-2.5 top-2.5 text-ink-muted hover:text-ink"
                      >
                        {showOnboardPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    <p className="mt-1 text-[11px] text-ink-muted">
                      Admin assigns this initial password. The staff member logs in using{" "}
                      <strong className="text-ink">{onboardForm.email || "this email"}</strong> at{" "}
                      <span className="font-mono text-emerald-700">/login</span>.
                    </p>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-0.5">
                    <input
                      type="checkbox"
                      checked={onboardForm.grantPortalAccess}
                      onChange={(e) => setOnboardForm({ ...onboardForm, grantPortalAccess: e.target.checked })}
                      className="size-4 rounded border-line text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-semibold text-ink">
                      Grant immediate active portal access on creation
                    </span>
                  </label>
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

        {/* MODAL: MANAGE STAFF LOGIN CREDENTIALS */}
        {manageCredentialsStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <KeyRound className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Manage Portal Login Credentials</h3>
                    <p className="text-xs text-ink-muted">
                      {manageCredentialsStaff.name} ({manageCredentialsStaff.role.toUpperCase()} — {manageCredentialsStaff.staffId})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setManageCredentialsStaff(null)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleSaveStaffCredentials} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ink">Login Email Address</label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-2.5 size-4 text-ink-muted" />
                    <input
                      type="email"
                      required
                      value={staffCredentialForm.email}
                      onChange={(e) =>
                        setStaffCredentialForm({ ...staffCredentialForm, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-line bg-surface-raised pl-9 pr-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-ink-muted">
                    This email is used by the staff member to sign in to their {manageCredentialsStaff.role} dashboard.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-ink">Password</label>
                    <button
                      type="button"
                      onClick={() => {
                        const prefix =
                          manageCredentialsStaff.role === "bursar"
                            ? "Bursar"
                            : manageCredentialsStaff.role === "admin"
                            ? "Admin"
                            : "Faculty";
                        const generated = `${prefix}#${Math.floor(1000 + Math.random() * 9000)}!`;
                        setStaffCredentialForm({ ...staffCredentialForm, password: generated });
                      }}
                      className="text-[11px] font-semibold text-emerald-700 hover:underline"
                    >
                      ⚡ Generate New
                    </button>
                  </div>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-2.5 size-4 text-ink-muted" />
                    <input
                      type={showStaffCredentialPassword ? "text" : "password"}
                      required
                      value={staffCredentialForm.password}
                      onChange={(e) =>
                        setStaffCredentialForm({ ...staffCredentialForm, password: e.target.value })
                      }
                      className="w-full rounded-xl border border-line bg-surface-raised pl-9 pr-10 py-2 font-mono text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowStaffCredentialPassword(!showStaffCredentialPassword)}
                      className="absolute right-2.5 top-2.5 text-ink-muted hover:text-ink"
                    >
                      {showStaffCredentialPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-ink-muted">
                    School admin can reset this password anytime.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-surface-raised p-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="block text-xs font-bold text-ink">Portal Account Access</span>
                      <span className="text-[11px] text-ink-muted">
                        {staffCredentialForm.portalAccess
                          ? "Account is active and authorized to sign in."
                          : "Account is suspended; login attempts will be rejected."}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={staffCredentialForm.portalAccess}
                      onChange={(e) =>
                        setStaffCredentialForm({ ...staffCredentialForm, portalAccess: e.target.checked })
                      }
                      className="size-4 rounded border-line text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>
                </div>

                {/* Quick Copy Credentials Box */}
                <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2.5">
                  <div className="text-[11px] text-emerald-950">
                    <span className="font-bold block">Share with Staff Member</span>
                    <span className="text-emerald-700 text-[10px]">Copies login email, password, and sign-in URL</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyStaffCredentials(
                        manageCredentialsStaff.name,
                        manageCredentialsStaff.role,
                        staffCredentialForm.email,
                        staffCredentialForm.password
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                  >
                    {copiedStaffCreds ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span>{copiedStaffCreds ? "Copied!" : "Copy Credentials"}</span>
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-end gap-2 border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => setManageCredentialsStaff(null)}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                  >
                    Save &amp; Update Credentials
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

