"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Contact,
  Download,
  Filter,
  Plus,
  Search,
  UserCheck,
  Users,
  UserPlus,
  Link as LinkIcon,
  CheckCircle2,
  X,
  Phone,
  Mail,
  GraduationCap,
  Shield,
  HeartHandshake,
  DoorOpen,
  BookOpen,
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Check,
  Lock,
} from "lucide-react";
import { provisionUserCredentials } from "@/lib/actions/user-credentials";

interface StudentRecord {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  studentNumber: string;
  classArm: string;
  stream: string;
  gender: "Male" | "Female";
  guardianName: string;
  guardianId: string;
  relationship: string;
  status: "Active" | "Graduated" | "Transferred";
  enrolledSubjects: string[];
  loginEmail: string;
  loginPassword?: string;
  portalAccess?: boolean;
}

interface GuardianRecord {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  occupation: string;
  address: string;
  wards: { studentId: string; studentName: string; relationship: string; isPrimary: boolean }[];
  loginPassword?: string;
  portalAccess?: boolean;
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

const INITIAL_GUARDIANS: GuardianRecord[] = [
  {
    id: "grd-01",
    name: "Mrs. Zainab Adeleke",
    firstName: "Zainab",
    lastName: "Adeleke",
    email: "zainab.adeleke@gmail.com",
    phone: "+234 803 445 1190",
    occupation: "Senior Legal Counsel",
    address: "14 Victoria Garden Estate, Lekki",
    wards: [{ studentId: "std-01", studentName: "Adeleke Tobi", relationship: "Mother", isPrimary: true }],
    loginPassword: "Parent#2026!",
    portalAccess: true,
  },
  {
    id: "grd-02",
    name: "Chief T. Balogun",
    firstName: "Tunde",
    lastName: "Balogun",
    email: "t.balogun@apexlogistics.ng",
    phone: "+234 802 331 4455",
    occupation: "Managing Director",
    address: "28 Bourdillon Road, Ikoyi",
    wards: [{ studentId: "std-02", studentName: "Balogun Farouk", relationship: "Father", isPrimary: true }],
    loginPassword: "Parent#2026!",
    portalAccess: true,
  },
  {
    id: "grd-03",
    name: "Dr. K. Chukwuma",
    firstName: "Kelechi",
    lastName: "Chukwuma",
    email: "dr.k.chukwuma@medcenter.org",
    phone: "+234 818 902 3344",
    occupation: "Consultant Neurosurgeon",
    address: "7 Parkview Avenue, Ikoyi",
    wards: [{ studentId: "std-03", studentName: "Chukwuma Kamsi", relationship: "Father", isPrimary: true }],
    loginPassword: "Parent#2026!",
    portalAccess: true,
  },
  {
    id: "grd-04",
    name: "Alhaji S. Danjuma",
    firstName: "Sanusi",
    lastName: "Danjuma",
    email: "s.danjuma@tradewinds.com",
    phone: "+234 703 112 8899",
    occupation: "Commodities Broker",
    address: "19 Admiralty Way, Lekki Phase 1",
    wards: [{ studentId: "std-04", studentName: "Danjuma Aisha", relationship: "Father", isPrimary: true }],
    loginPassword: "Parent#2026!",
    portalAccess: true,
  },
  {
    id: "grd-05",
    name: "Engr. P. Eze",
    firstName: "Patrick",
    lastName: "Eze",
    email: "p.eze@constructgroup.com",
    phone: "+234 809 334 1122",
    occupation: "Civil Engineering Partner",
    address: "42 Glover Road, Ikoyi",
    wards: [{ studentId: "std-05", studentName: "Eze Somtochukwu", relationship: "Father", isPrimary: true }],
    loginPassword: "Parent#2026!",
    portalAccess: true,
  },
  {
    id: "grd-06",
    name: "Alhaji Bello Mohammed",
    firstName: "Bello",
    lastName: "Mohammed",
    email: "bello.mohammed@horizon.ng",
    phone: "+234 803 291 0021",
    occupation: "Chartered Surveyor",
    address: "10 Banana Island Estate, Ikoyi",
    wards: [{ studentId: "std-06", studentName: "Mohammed Zainab", relationship: "Father", isPrimary: true }],
    loginPassword: "Parent#2026!",
    portalAccess: true,
  },
];

const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: "std-01",
    name: "Adeleke Tobi",
    firstName: "Tobi",
    lastName: "Adeleke",
    studentNumber: "RC-2023-0184",
    classArm: "SSS 2A (Pure Science)",
    stream: "Sciences",
    gender: "Male",
    guardianName: "Mrs. Zainab Adeleke",
    guardianId: "grd-01",
    relationship: "Mother",
    status: "Active",
    enrolledSubjects: ["Mathematics", "English", "Physics", "Chemistry", "Biology"],
    loginEmail: "tobi.adeleke@student.campus360.edu",
    loginPassword: "Student#2026!",
    portalAccess: true,
  },
  {
    id: "std-02",
    name: "Balogun Farouk",
    firstName: "Farouk",
    lastName: "Balogun",
    studentNumber: "RC-2023-0185",
    classArm: "SSS 2A (Pure Science)",
    stream: "Sciences",
    gender: "Male",
    guardianName: "Chief T. Balogun",
    guardianId: "grd-02",
    relationship: "Father",
    status: "Active",
    enrolledSubjects: ["Mathematics", "English", "Physics", "Chemistry", "Further Maths"],
    loginEmail: "farouk.balogun@student.campus360.edu",
    loginPassword: "Student#2026!",
    portalAccess: true,
  },
  {
    id: "std-03",
    name: "Chukwuma Kamsi",
    firstName: "Kamsi",
    lastName: "Chukwuma",
    studentNumber: "RC-2023-0186",
    classArm: "SSS 2A (Pure Science)",
    stream: "Sciences",
    gender: "Female",
    guardianName: "Dr. K. Chukwuma",
    guardianId: "grd-03",
    relationship: "Father",
    status: "Active",
    enrolledSubjects: ["Mathematics", "English", "Physics", "Chemistry", "Biology"],
    loginEmail: "kamsi.chukwuma@student.campus360.edu",
    loginPassword: "Student#2026!",
    portalAccess: true,
  },
  {
    id: "std-04",
    name: "Danjuma Aisha",
    firstName: "Aisha",
    lastName: "Danjuma",
    studentNumber: "RC-2023-0187",
    classArm: "SSS 2A (Pure Science)",
    stream: "Sciences",
    gender: "Female",
    guardianName: "Alhaji S. Danjuma",
    guardianId: "grd-04",
    relationship: "Father",
    status: "Active",
    enrolledSubjects: ["Mathematics", "English", "Physics", "Chemistry", "Technical Drawing"],
    loginEmail: "aisha.danjuma@student.campus360.edu",
    loginPassword: "Student#2026!",
    portalAccess: true,
  },
  {
    id: "std-05",
    name: "Eze Somtochukwu",
    firstName: "Somtochukwu",
    lastName: "Eze",
    studentNumber: "RC-2023-0188",
    classArm: "SSS 2A (Pure Science)",
    stream: "Sciences",
    gender: "Male",
    guardianName: "Engr. P. Eze",
    guardianId: "grd-05",
    relationship: "Father",
    status: "Active",
    enrolledSubjects: ["Mathematics", "English", "Physics", "Chemistry", "Economics"],
    loginEmail: "somtochukwu.eze@student.campus360.edu",
    loginPassword: "Student#2026!",
    portalAccess: true,
  },
  {
    id: "std-06",
    name: "Mohammed Zainab",
    firstName: "Zainab",
    lastName: "Mohammed",
    studentNumber: "RC-2024-0012",
    classArm: "JSS 2 Gold",
    stream: "Junior",
    gender: "Female",
    guardianName: "Alhaji Bello Mohammed",
    guardianId: "grd-06",
    relationship: "Father",
    status: "Active",
    enrolledSubjects: ["Mathematics", "English", "Basic Science", "Social Studies"],
    loginEmail: "zainab.mohammed@student.campus360.edu",
    loginPassword: "Student#2026!",
    portalAccess: true,
  },
];

export default function AdminStudentsPage() {
  const [activeTab, setActiveTab] = useState<"students" | "guardians">("students");
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [guardians, setGuardians] = useState<GuardianRecord[]>(INITIAL_GUARDIANS);

  // Search and filters
  const [search, setSearch] = useState("");
  const [selectedClassFilter, setSelectedClassFilter] = useState("all");

  // Modals state
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddGuardianModal, setShowAddGuardianModal] = useState(false);
  const [assignClassStudent, setAssignClassStudent] = useState<StudentRecord | null>(null);
  const [assignGuardianStudent, setAssignGuardianStudent] = useState<StudentRecord | null>(null);

  // Credential Management modals state
  const [manageStudentCredentials, setManageStudentCredentials] = useState<StudentRecord | null>(null);
  const [studentCredForm, setStudentCredForm] = useState({
    email: "",
    password: "",
    portalAccess: true,
  });
  const [showStudentCredPass, setShowStudentCredPass] = useState(false);
  const [copiedStudentCreds, setCopiedStudentCreds] = useState(false);

  const [manageGuardianCredentials, setManageGuardianCredentials] = useState<GuardianRecord | null>(null);
  const [guardianCredForm, setGuardianCredForm] = useState({
    email: "",
    password: "",
    portalAccess: true,
  });
  const [showGuardianCredPass, setShowGuardianCredPass] = useState(false);
  const [copiedGuardianCreds, setCopiedGuardianCreds] = useState(false);

  // Success message toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Form states for Add Student with Credentials
  const [newStudentForm, setNewStudentForm] = useState({
    firstName: "",
    lastName: "",
    studentNumber: "RC-2026-0245",
    classArm: INITIAL_CLASSES[0],
    gender: "Male" as "Male" | "Female",
    guardianId: INITIAL_GUARDIANS[0].id,
    relationship: "Father",
    loginEmail: "",
    password: "Student#2026!",
    grantPortalAccess: true,
  });
  const [showNewStudentPassword, setShowNewStudentPassword] = useState(false);

  // Form states for Add Guardian with Credentials
  const [newGuardianForm, setNewGuardianForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "Parent#2026!",
    phone: "",
    occupation: "",
    address: "",
    linkedStudentId: "",
    relationship: "Mother",
    grantPortalAccess: true,
  });
  const [showNewGuardianPassword, setShowNewGuardianPassword] = useState(false);

  // Filtered Students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.studentNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.guardianName.toLowerCase().includes(search.toLowerCase()) ||
      s.loginEmail.toLowerCase().includes(search.toLowerCase());
    const matchesClass = selectedClassFilter === "all" || s.classArm === selectedClassFilter;
    return matchesSearch && matchesClass;
  });

  // Filtered Guardians
  const filteredGuardians = guardians.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase()) ||
      g.phone.includes(search)
  );

  // Handler: Add Student with Login Credentials
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentForm.firstName || !newStudentForm.lastName) return;

    const guardian = guardians.find((g) => g.id === newStudentForm.guardianId);
    const newStudentId = `std-${Date.now()}`;
    const fullName = `${newStudentForm.lastName} ${newStudentForm.firstName}`;
    const effectiveEmail =
      newStudentForm.loginEmail ||
      `${newStudentForm.firstName.toLowerCase()}.${newStudentForm.lastName.toLowerCase()}@student.campus360.edu`;

    const newRecord: StudentRecord = {
      id: newStudentId,
      name: fullName,
      firstName: newStudentForm.firstName,
      lastName: newStudentForm.lastName,
      studentNumber: newStudentForm.studentNumber,
      classArm: newStudentForm.classArm,
      stream: newStudentForm.classArm.startsWith("JSS") ? "Junior" : "Senior",
      gender: newStudentForm.gender,
      guardianName: guardian ? guardian.name : "Unassigned",
      guardianId: guardian ? guardian.id : "",
      relationship: newStudentForm.relationship,
      status: "Active",
      enrolledSubjects: ["Mathematics", "English", "General Science"],
      loginEmail: effectiveEmail,
      loginPassword: newStudentForm.password,
      portalAccess: newStudentForm.grantPortalAccess,
    };

    setStudents([newRecord, ...students]);

    // Update guardian wards if selected
    if (guardian) {
      setGuardians((prev) =>
        prev.map((g) =>
          g.id === guardian.id
            ? {
                ...g,
                wards: [
                  ...g.wards,
                  {
                    studentId: newStudentId,
                    studentName: fullName,
                    relationship: newStudentForm.relationship,
                    isPrimary: true,
                  },
                ],
              }
            : g
        )
      );
    }

    setShowAddStudentModal(false);

    // Call server action to provision login account
    try {
      await provisionUserCredentials({
        role: "student",
        email: effectiveEmail,
        password: newStudentForm.password,
        fullName,
        targetId: newStudentForm.studentNumber,
      });
    } catch {
      // Local fallback continues
    }

    showToast(
      `Student ${fullName} registered with portal credentials: ${effectiveEmail}`
    );

    // reset form
    setNewStudentForm({
      firstName: "",
      lastName: "",
      studentNumber: `RC-2026-0${246 + students.length}`,
      classArm: INITIAL_CLASSES[0],
      gender: "Male",
      guardianId: INITIAL_GUARDIANS[0].id,
      relationship: "Father",
      loginEmail: "",
      password: "Student#2026!",
      grantPortalAccess: true,
    });
    setShowNewStudentPassword(false);
  };

  // Handler: Add Guardian with Login Credentials
  const handleAddGuardian = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuardianForm.firstName || !newGuardianForm.lastName || !newGuardianForm.phone) return;

    const guardianId = `grd-${Date.now()}`;
    const fullName = `${newGuardianForm.firstName} ${newGuardianForm.lastName}`;
    const linkedStudent = students.find((s) => s.id === newGuardianForm.linkedStudentId);
    const effectiveEmail =
      newGuardianForm.email ||
      `${newGuardianForm.firstName.toLowerCase()}.${newGuardianForm.lastName.toLowerCase()}@gmail.com`;

    const newGrd: GuardianRecord = {
      id: guardianId,
      name: fullName,
      firstName: newGuardianForm.firstName,
      lastName: newGuardianForm.lastName,
      email: effectiveEmail,
      phone: newGuardianForm.phone,
      occupation: newGuardianForm.occupation || "Professional",
      address: newGuardianForm.address || "Lekki Peninsula, Lagos",
      wards: linkedStudent
        ? [
            {
              studentId: linkedStudent.id,
              studentName: linkedStudent.name,
              relationship: newGuardianForm.relationship,
              isPrimary: true,
            },
          ]
        : [],
      loginPassword: newGuardianForm.password,
      portalAccess: newGuardianForm.grantPortalAccess,
    };

    setGuardians([newGrd, ...guardians]);

    // If student was chosen, update that student
    if (linkedStudent) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === linkedStudent.id
            ? {
                ...s,
                guardianName: fullName,
                guardianId: guardianId,
                relationship: newGuardianForm.relationship,
              }
            : s
        )
      );
    }

    setShowAddGuardianModal(false);

    // Call server action to provision login account
    try {
      await provisionUserCredentials({
        role: "parent",
        email: effectiveEmail,
        password: newGuardianForm.password,
        fullName,
        targetId: guardianId,
      });
    } catch {
      // Local fallback continues
    }

    showToast(`Parent/Guardian ${fullName} registered with portal credentials: ${effectiveEmail}`);
    setNewGuardianForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "Parent#2026!",
      phone: "",
      occupation: "",
      address: "",
      linkedStudentId: "",
      relationship: "Mother",
      grantPortalAccess: true,
    });
    setShowNewGuardianPassword(false);
  };

  // Handler: Update Student Credentials
  const handleSaveStudentCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manageStudentCredentials) return;

    setStudents((prev) =>
      prev.map((s) =>
        s.id === manageStudentCredentials.id
          ? {
              ...s,
              loginEmail: studentCredForm.email,
              loginPassword: studentCredForm.password,
              portalAccess: studentCredForm.portalAccess,
            }
          : s
      )
    );

    try {
      await provisionUserCredentials({
        role: "student",
        email: studentCredForm.email,
        password: studentCredForm.password,
        fullName: manageStudentCredentials.name,
        targetId: manageStudentCredentials.studentNumber,
      });
    } catch {
      // Local fallback
    }

    showToast(`Student credentials updated for ${manageStudentCredentials.name}`);
    setManageStudentCredentials(null);
  };

  // Handler: Update Guardian Credentials
  const handleSaveGuardianCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manageGuardianCredentials) return;

    setGuardians((prev) =>
      prev.map((g) =>
        g.id === manageGuardianCredentials.id
          ? {
              ...g,
              email: guardianCredForm.email,
              loginPassword: guardianCredForm.password,
              portalAccess: guardianCredForm.portalAccess,
            }
          : g
      )
    );

    try {
      await provisionUserCredentials({
        role: "parent",
        email: guardianCredForm.email,
        password: guardianCredForm.password,
        fullName: manageGuardianCredentials.name,
        targetId: manageGuardianCredentials.id,
      });
    } catch {
      // Local fallback
    }

    showToast(`Parent portal credentials updated for ${manageGuardianCredentials.name}`);
    setManageGuardianCredentials(null);
  };

  // Copy Student Credentials to clipboard
  const copyStudentCredentials = (name: string, studentNo: string, email: string, pass: string) => {
    const text = `Campus360 Student Portal Login\nStudent: ${name} (${studentNo})\nLogin Email: ${email}\nPassword: ${pass}\nPortal URL: ${typeof window !== "undefined" ? window.location.origin : ""}/login`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedStudentCreds(true);
    showToast("Student credentials copied to clipboard!");
    setTimeout(() => setCopiedStudentCreds(false), 2500);
  };

  // Copy Guardian Credentials to clipboard
  const copyGuardianCredentials = (name: string, email: string, pass: string) => {
    const text = `Campus360 Parent Portal Login\nGuardian: ${name}\nLogin Email: ${email}\nPassword: ${pass}\nPortal URL: ${typeof window !== "undefined" ? window.location.origin : ""}/login`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedGuardianCreds(true);
    showToast("Parent credentials copied to clipboard!");
    setTimeout(() => setCopiedGuardianCreds(false), 2500);
  };

  // Handler: Reassign Student Class
  const handleAssignClass = (studentId: string, newClass: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, classArm: newClass } : s))
    );
    setAssignClassStudent(null);
    showToast(`Class assignment updated to ${newClass}`);
  };

  // Handler: Assign Parent to Student
  const handleAssignParentToStudent = (studentId: string, guardianId: string, relationship: string) => {
    const parent = guardians.find((g) => g.id === guardianId);
    if (!parent) return;

    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              guardianId,
              guardianName: parent.name,
              relationship,
            }
          : s
      )
    );

    // Update guardian wards list
    setGuardians((prev) =>
      prev.map((g) => {
        if (g.id === guardianId) {
          const studentObj = students.find((s) => s.id === studentId);
          const alreadyLinked = g.wards.some((w) => w.studentId === studentId);
          if (!alreadyLinked && studentObj) {
            return {
              ...g,
              wards: [
                ...g.wards,
                { studentId, studentName: studentObj.name, relationship, isPrimary: true },
              ],
            };
          }
        }
        return g;
      })
    );

    setAssignGuardianStudent(null);
    showToast(`Guardian ${parent.name} linked as ${relationship}`);
  };

  return (
    <DashboardLayout currentRole="admin">
      <div className="space-y-6">
        {/* Toast Banner */}
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
                  {students.length} Enrolled Students • {guardians.length} Registered Guardians
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">
                Students &amp; Guardians Registry
              </h2>
              <p className="text-xs text-ink-muted">
                Admin controls to create students and parents, assign students to class arms, and link parent custody relationships.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddStudentModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all"
              >
                <UserPlus className="size-4" />
                <span>+ Add New Student</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAddGuardianModal(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-600 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800 shadow-sm hover:bg-emerald-100 active:scale-95 transition-all"
              >
                <HeartHandshake className="size-4 text-emerald-700" />
                <span>+ Add Parent / Guardian</span>
              </button>
            </div>
          </div>

          {/* Tab Selector & Controls */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("students")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "students"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                <GraduationCap className="size-4" />
                <span>Students Roster ({students.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("guardians")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "guardians"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                <Users className="size-4" />
                <span>Parents &amp; Guardians Directory ({guardians.length})</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {activeTab === "students" && (
                <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                  <Filter className="size-3.5" />
                  <select
                    value={selectedClassFilter}
                    onChange={(e) => setSelectedClassFilter(e.target.value)}
                    className="rounded-xl border border-line bg-surface-raised px-2.5 py-1.5 text-xs font-medium text-ink focus:border-primary focus:outline-none"
                  >
                    <option value="all">All Class Arms</option>
                    {INITIAL_CLASSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 size-4 text-ink-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={
                    activeTab === "students"
                      ? "Search student name or ID..."
                      : "Search parent name, phone..."
                  }
                  className="w-full rounded-xl border border-line bg-surface-raised pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TAB 1: STUDENTS ROSTER */}
        {activeTab === "students" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                    <th className="pb-3 font-bold uppercase">Student Name</th>
                    <th className="pb-3 font-bold uppercase">Matric No</th>
                    <th className="pb-3 font-bold uppercase">Assigned Class Arm</th>
                    <th className="pb-3 font-bold uppercase">Gender</th>
                    <th className="pb-3 font-bold uppercase">Linked Parent / Guardian</th>
                    <th className="pb-3 font-bold uppercase">Status</th>
                    <th className="pb-3 font-bold uppercase text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-soft">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-surface-raised transition-colors">
                      <td className="py-3.5">
                        <span className="font-bold text-ink block">{s.name}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-[10px] text-ink-muted">{s.stream} Stream</span>
                          <span
                            className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.2 font-mono text-[10px] font-bold ${
                              s.portalAccess !== false
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                          >
                            <KeyRound className="size-2.5 text-emerald-600" />
                            {s.loginEmail}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 font-mono text-primary font-bold">{s.studentNumber}</td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface-raised px-2.5 py-1 font-semibold text-ink border border-line">
                          <DoorOpen className="size-3 text-emerald-600" />
                          {s.classArm}
                        </span>
                      </td>
                      <td className="py-3.5 text-ink-soft">{s.gender}</td>
                      <td className="py-3.5">
                        <div>
                          <span className="font-semibold text-ink block">{s.guardianName}</span>
                          <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
                            {s.relationship}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className="inline-block rounded-full bg-success-light px-2.5 py-0.5 font-mono text-[10px] font-bold text-success-deep">
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setManageStudentCredentials(s);
                              setStudentCredForm({
                                email: s.loginEmail,
                                password: s.loginPassword || "Student#2026!",
                                portalAccess: s.portalAccess !== false,
                              });
                              setShowStudentCredPass(false);
                              setCopiedStudentCreds(false);
                            }}
                            title="Manage student login email & password"
                            className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface-raised px-2 py-1 font-mono text-[11px] font-bold text-ink hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                          >
                            <KeyRound className="size-3 text-emerald-600" />
                            <span>Portal Login</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setAssignClassStudent(s)}
                            title="Assign to another class arm"
                            className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface-raised px-2 py-1 font-mono text-[11px] font-semibold text-ink hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                          >
                            <DoorOpen className="size-3" />
                            <span>Class</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setAssignGuardianStudent(s)}
                            title="Assign or re-link parent"
                            className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface-raised px-2 py-1 font-mono text-[11px] font-semibold text-ink hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                          >
                            <LinkIcon className="size-3" />
                            <span>Parent</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-xs text-ink-muted">
                        No students found matching your search and filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PARENTS & GUARDIANS DIRECTORY */}
        {activeTab === "guardians" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                    <th className="pb-3 font-bold uppercase">Parent / Guardian Name</th>
                    <th className="pb-3 font-bold uppercase">Contact &amp; Portal Account</th>
                    <th className="pb-3 font-bold uppercase">Occupation</th>
                    <th className="pb-3 font-bold uppercase">Residential Address</th>
                    <th className="pb-3 font-bold uppercase">Linked Student Wards</th>
                    <th className="pb-3 font-bold uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-soft">
                  {filteredGuardians.map((g) => (
                    <tr key={g.id} className="hover:bg-surface-raised transition-colors">
                      <td className="py-3.5 font-bold text-ink">
                        <div className="flex items-center gap-2">
                          <div className="flex size-7 items-center justify-center rounded-full bg-emerald-100 font-mono text-xs font-bold text-emerald-800">
                            {g.firstName[0]}
                            {g.lastName[0]}
                          </div>
                          <div>
                            <span className="block font-bold text-ink">{g.name}</span>
                            <span className="font-mono text-[10px] text-ink-muted">ID: {g.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <div className="space-y-0.5">
                          <span className="flex items-center gap-1.5 text-ink font-medium">
                            <Mail className="size-3 text-ink-muted" />
                            {g.email}
                          </span>
                          <div className="flex items-center gap-1.5 font-mono text-ink-muted text-[10px]">
                            <Phone className="size-3 text-ink-muted" />
                            <span>{g.phone}</span>
                            <span
                              className={`inline-flex items-center gap-1 rounded px-1.5 py-0.2 font-mono font-bold ${
                                g.portalAccess !== false
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : "bg-rose-50 text-rose-700 border border-rose-200"
                              }`}
                            >
                              <KeyRound className="size-2.5 text-emerald-600" />
                              Portal: {g.portalAccess !== false ? "Active" : "Disabled"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 text-ink-muted font-medium">{g.occupation}</td>
                      <td className="py-3.5 text-ink-muted text-[11px] max-w-[180px] truncate">{g.address}</td>
                      <td className="py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {g.wards.map((w) => (
                            <span
                              key={w.studentId}
                              className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-700 border border-emerald-100"
                            >
                              <GraduationCap className="size-3" />
                              {w.studentName} ({w.relationship})
                            </span>
                          ))}
                          {g.wards.length === 0 && (
                            <span className="font-mono text-[10px] text-ink-muted">No wards assigned</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setManageGuardianCredentials(g);
                              setGuardianCredForm({
                                email: g.email,
                                password: g.loginPassword || "Parent#2026!",
                                portalAccess: g.portalAccess !== false,
                              });
                              setShowGuardianCredPass(false);
                              setCopiedGuardianCreds(false);
                            }}
                            title="Manage parent login email & password"
                            className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] font-bold text-ink hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                          >
                            <KeyRound className="size-3 text-emerald-600" />
                            <span>Portal Login</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              showToast(`Parent profile ${g.name} verified.`);
                            }}
                            className="rounded-lg border border-line bg-surface-raised px-2.5 py-1 text-ink font-semibold hover:border-emerald-600 transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredGuardians.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-xs text-ink-muted">
                        No parents or guardians found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: ADD NEW STUDENT */}
        {showAddStudentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <UserPlus className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Admin: Register New Student</h3>
                    <p className="text-xs text-ink-muted">Add student profile, assign class arm, and link parent.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddStudentModal(false)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleAddStudent} className="mt-4 space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oluwaseun"
                      value={newStudentForm.firstName}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, firstName: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Last Name / Surname</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adeleke"
                      value={newStudentForm.lastName}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, lastName: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">Matriculation / Student ID</label>
                    <input
                      type="text"
                      required
                      value={newStudentForm.studentNumber}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, studentNumber: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 font-mono text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Gender</label>
                    <select
                      value={newStudentForm.gender}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, gender: e.target.value as "Male" | "Female" })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink">Assign to Class Arm</label>
                  <select
                    value={newStudentForm.classArm}
                    onChange={(e) => setNewStudentForm({ ...newStudentForm, classArm: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                  >
                    {INITIAL_CLASSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">Assign Parent / Guardian</label>
                    <select
                      value={newStudentForm.guardianId}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, guardianId: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    >
                      {guardians.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name} ({g.phone})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Relationship</label>
                    <select
                      value={newStudentForm.relationship}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, relationship: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Legal Guardian</option>
                      <option value="Sponsor">Sponsor</option>
                      <option value="Uncle">Uncle / Aunt</option>
                    </select>
                  </div>
                </div>

                {/* Student Portal Login Credentials Section */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                      <KeyRound className="size-3.5 text-emerald-700" />
                      <span>Student Portal Login &amp; Password</span>
                    </div>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                      STUDENT ACCESS
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-ink">Student Portal Email</label>
                      {newStudentForm.firstName && newStudentForm.lastName && (
                        <button
                          type="button"
                          onClick={() => {
                            const suggested = `${newStudentForm.firstName.toLowerCase()}.${newStudentForm.lastName.toLowerCase()}@student.campus360.edu`;
                            setNewStudentForm({ ...newStudentForm, loginEmail: suggested });
                          }}
                          className="text-[11px] font-semibold text-emerald-700 hover:underline"
                        >
                          ⚡ Auto-fill
                        </button>
                      )}
                    </div>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-2.5 size-4 text-ink-muted" />
                      <input
                        type="email"
                        placeholder={`${newStudentForm.firstName ? newStudentForm.firstName.toLowerCase() : "student"}.${newStudentForm.lastName ? newStudentForm.lastName.toLowerCase() : "name"}@student.campus360.edu`}
                        value={newStudentForm.loginEmail}
                        onChange={(e) => setNewStudentForm({ ...newStudentForm, loginEmail: e.target.value })}
                        className="w-full rounded-xl border border-line bg-surface pl-9 pr-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-ink">Student Portal Password</label>
                      <button
                        type="button"
                        onClick={() => {
                          const generated = `Student#${Math.floor(1000 + Math.random() * 9000)}!`;
                          setNewStudentForm({ ...newStudentForm, password: generated });
                        }}
                        className="text-[11px] font-semibold text-emerald-700 hover:underline"
                      >
                        ⚡ Generate Password
                      </button>
                    </div>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-2.5 size-4 text-ink-muted" />
                      <input
                        type={showNewStudentPassword ? "text" : "password"}
                        required
                        value={newStudentForm.password}
                        onChange={(e) => setNewStudentForm({ ...newStudentForm, password: e.target.value })}
                        className="w-full rounded-xl border border-line bg-surface pl-9 pr-10 py-2 font-mono text-xs text-ink focus:border-emerald-600 focus:outline-none"
                        placeholder="Enter initial password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewStudentPassword(!showNewStudentPassword)}
                        className="absolute right-2.5 top-2.5 text-ink-muted hover:text-ink"
                      >
                        {showNewStudentPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    <p className="mt-1 text-[11px] text-ink-muted">
                      The student will use this email and password to log in to their student portal.
                    </p>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-0.5">
                    <input
                      type="checkbox"
                      checked={newStudentForm.grantPortalAccess}
                      onChange={(e) => setNewStudentForm({ ...newStudentForm, grantPortalAccess: e.target.checked })}
                      className="size-4 rounded border-line text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-semibold text-ink">
                      Grant immediate active portal access upon enrollment
                    </span>
                  </label>
                </div>

                <div className="mt-6 flex items-center justify-end gap-2 border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddStudentModal(false)}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                  >
                    Create &amp; Enroll Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD NEW PARENT / GUARDIAN */}
        {showAddGuardianModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <HeartHandshake className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Admin: Register Parent / Guardian</h3>
                    <p className="text-xs text-ink-muted">Create guardian identity and assign ward relationships.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddGuardianModal(false)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleAddGuardian} className="mt-4 space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Funke"
                      value={newGuardianForm.firstName}
                      onChange={(e) => setNewGuardianForm({ ...newGuardianForm, firstName: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Last Name / Surname</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Balogun"
                      value={newGuardianForm.lastName}
                      onChange={(e) => setNewGuardianForm({ ...newGuardianForm, lastName: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">Primary Phone Number</label>
                    <input
                      type="text"
                      required
                      placeholder="+234 803 000 0000"
                      value={newGuardianForm.phone}
                      onChange={(e) => setNewGuardianForm({ ...newGuardianForm, phone: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 font-mono text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Email Address</label>
                    <input
                      type="email"
                      placeholder="parent@example.com"
                      value={newGuardianForm.email}
                      onChange={(e) => setNewGuardianForm({ ...newGuardianForm, email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">Occupation / Profession</label>
                    <input
                      type="text"
                      placeholder="e.g. Financial Analyst"
                      value={newGuardianForm.occupation}
                      onChange={(e) => setNewGuardianForm({ ...newGuardianForm, occupation: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Residential Address</label>
                    <input
                      type="text"
                      placeholder="e.g. Victoria Island, Lagos"
                      value={newGuardianForm.address}
                      onChange={(e) => setNewGuardianForm({ ...newGuardianForm, address: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Parent Portal Login Credentials Section */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                      <KeyRound className="size-3.5 text-emerald-700" />
                      <span>Parent Portal Login &amp; Password</span>
                    </div>
                    <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800">
                      PARENT ACCESS
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-ink">Parent Login Password</label>
                      <button
                        type="button"
                        onClick={() => {
                          const generated = `Parent#${Math.floor(1000 + Math.random() * 9000)}!`;
                          setNewGuardianForm({ ...newGuardianForm, password: generated });
                        }}
                        className="text-[11px] font-semibold text-emerald-700 hover:underline"
                      >
                        ⚡ Generate Password
                      </button>
                    </div>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-2.5 size-4 text-ink-muted" />
                      <input
                        type={showNewGuardianPassword ? "text" : "password"}
                        required
                        value={newGuardianForm.password}
                        onChange={(e) => setNewGuardianForm({ ...newGuardianForm, password: e.target.value })}
                        className="w-full rounded-xl border border-line bg-surface pl-9 pr-10 py-2 font-mono text-xs text-ink focus:border-emerald-600 focus:outline-none"
                        placeholder="Enter initial password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewGuardianPassword(!showNewGuardianPassword)}
                        className="absolute right-2.5 top-2.5 text-ink-muted hover:text-ink"
                      >
                        {showNewGuardianPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    <p className="mt-1 text-[11px] text-ink-muted">
                      Parent uses <strong className="text-ink">{newGuardianForm.email || "their email address"}</strong> and this password to sign in and monitor their ward&apos;s scores, attendance, and fee status.
                    </p>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-0.5">
                    <input
                      type="checkbox"
                      checked={newGuardianForm.grantPortalAccess}
                      onChange={(e) => setNewGuardianForm({ ...newGuardianForm, grantPortalAccess: e.target.checked })}
                      className="size-4 rounded border-line text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-semibold text-ink">
                      Grant immediate active parent portal access
                    </span>
                  </label>
                </div>

                <div className="border-t border-line pt-3">
                  <span className="font-mono text-[11px] font-bold uppercase text-ink-muted">
                    Assign Immediately to Student Ward (Optional)
                  </span>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-ink">Select Student</label>
                      <select
                        value={newGuardianForm.linkedStudentId}
                        onChange={(e) => setNewGuardianForm({ ...newGuardianForm, linkedStudentId: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                      >
                        <option value="">None (Link Later)</option>
                        {students.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.studentNumber} - {s.classArm})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink">Relationship to Ward</label>
                      <select
                        value={newGuardianForm.relationship}
                        onChange={(e) => setNewGuardianForm({ ...newGuardianForm, relationship: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                      >
                        <option value="Mother">Mother</option>
                        <option value="Father">Father</option>
                        <option value="Guardian">Legal Guardian</option>
                        <option value="Sponsor">Sponsor</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-2 border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddGuardianModal(false)}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                  >
                    Register Parent / Guardian
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ASSIGN CLASS TO STUDENT */}
        {assignClassStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <DoorOpen className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Assign Student to Class</h3>
                    <p className="text-xs text-ink-muted">{assignClassStudent.name} ({assignClassStudent.studentNumber})</p>
                  </div>
                </div>
                <button
                  onClick={() => setAssignClassStudent(null)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div className="rounded-xl bg-surface-raised p-3 text-xs">
                  <span className="text-ink-muted block">Current Class Arm:</span>
                  <span className="font-bold text-ink">{assignClassStudent.classArm}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink">Select New Class Arm</label>
                  <div className="mt-2 space-y-1.5 max-h-56 overflow-y-auto">
                    {INITIAL_CLASSES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => handleAssignClass(assignClassStudent.id, c)}
                        className={`w-full flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-left transition-all ${
                          assignClassStudent.classArm === c
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            : "bg-surface-raised text-ink hover:bg-surface hover:border hover:border-emerald-600"
                        }`}
                      >
                        <span>{c}</span>
                        {assignClassStudent.classArm === c && <CheckCircle2 className="size-4 text-emerald-700" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setAssignClassStudent(null)}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-raised"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: ASSIGN PARENT TO STUDENT */}
        {assignGuardianStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <HeartHandshake className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Assign Parent to Student</h3>
                    <p className="text-xs text-ink-muted">Ward: {assignGuardianStudent.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setAssignGuardianStudent(null)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ink">Select Parent / Guardian</label>
                  <select
                    id="select-parent-guardian"
                    defaultValue={assignGuardianStudent.guardianId || guardians[0].id}
                    className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                  >
                    {guardians.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name} ({g.phone})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink">Custody Relationship</label>
                  <select
                    id="select-parent-relationship"
                    defaultValue={assignGuardianStudent.relationship || "Mother"}
                    className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Guardian">Legal Guardian</option>
                    <option value="Sponsor">Educational Sponsor</option>
                    <option value="Uncle">Uncle / Aunt</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setAssignGuardianStudent(null)}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const selParent = (document.getElementById("select-parent-guardian") as HTMLSelectElement).value;
                      const selRel = (document.getElementById("select-parent-relationship") as HTMLSelectElement).value;
                      handleAssignParentToStudent(assignGuardianStudent.id, selParent, selRel);
                    }}
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                  >
                    Link Parent to Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: MANAGE STUDENT LOGIN CREDENTIALS */}
        {manageStudentCredentials && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <KeyRound className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Manage Student Portal Credentials</h3>
                    <p className="text-xs text-ink-muted">
                      {manageStudentCredentials.name} ({manageStudentCredentials.studentNumber} — {manageStudentCredentials.classArm})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setManageStudentCredentials(null)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleSaveStudentCredentials} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ink">Student Login Email</label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-2.5 size-4 text-ink-muted" />
                    <input
                      type="email"
                      required
                      value={studentCredForm.email}
                      onChange={(e) =>
                        setStudentCredForm({ ...studentCredForm, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-line bg-surface-raised pl-9 pr-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-ink-muted">
                    Student uses this address to log in to their student station.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-ink">Portal Password</label>
                    <button
                      type="button"
                      onClick={() => {
                        const generated = `Student#${Math.floor(1000 + Math.random() * 9000)}!`;
                        setStudentCredForm({ ...studentCredForm, password: generated });
                      }}
                      className="text-[11px] font-semibold text-emerald-700 hover:underline"
                    >
                      ⚡ Generate New
                    </button>
                  </div>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-2.5 size-4 text-ink-muted" />
                    <input
                      type={showStudentCredPass ? "text" : "password"}
                      required
                      value={studentCredForm.password}
                      onChange={(e) =>
                        setStudentCredForm({ ...studentCredForm, password: e.target.value })
                      }
                      className="w-full rounded-xl border border-line bg-surface-raised pl-9 pr-10 py-2 font-mono text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowStudentCredPass(!showStudentCredPass)}
                      className="absolute right-2.5 top-2.5 text-ink-muted hover:text-ink"
                    >
                      {showStudentCredPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-ink-muted">
                    School admin can reset this password at any time.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-surface-raised p-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="block text-xs font-bold text-ink">Student Portal Status</span>
                      <span className="text-[11px] text-ink-muted">
                        {studentCredForm.portalAccess
                          ? "Account is active and student can sign in."
                          : "Account suspended; student sign-in is blocked."}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={studentCredForm.portalAccess}
                      onChange={(e) =>
                        setStudentCredForm({ ...studentCredForm, portalAccess: e.target.checked })
                      }
                      className="size-4 rounded border-line text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>
                </div>

                {/* Quick Copy Credentials Box */}
                <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2.5">
                  <div className="text-[11px] text-emerald-950">
                    <span className="font-bold block">Share with Student / Parent</span>
                    <span className="text-emerald-700 text-[10px]">Copies login email, password, and sign-in URL</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyStudentCredentials(
                        manageStudentCredentials.name,
                        manageStudentCredentials.studentNumber,
                        studentCredForm.email,
                        studentCredForm.password
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                  >
                    {copiedStudentCreds ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span>{copiedStudentCreds ? "Copied!" : "Copy Details"}</span>
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-end gap-2 border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => setManageStudentCredentials(null)}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                  >
                    Save Credentials
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: MANAGE PARENT / GUARDIAN LOGIN CREDENTIALS */}
        {manageGuardianCredentials && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <KeyRound className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Manage Parent Portal Credentials</h3>
                    <p className="text-xs text-ink-muted">{manageGuardianCredentials.name} (Guardian ID: {manageGuardianCredentials.id})</p>
                  </div>
                </div>
                <button
                  onClick={() => setManageGuardianCredentials(null)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleSaveGuardianCredentials} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ink">Parent Login Email</label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-2.5 size-4 text-ink-muted" />
                    <input
                      type="email"
                      required
                      value={guardianCredForm.email}
                      onChange={(e) =>
                        setGuardianCredForm({ ...guardianCredForm, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-line bg-surface-raised pl-9 pr-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-ink-muted">
                    Parent signs in to track their student wards, view terminal report cards, and pay school fees.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-ink">Password</label>
                    <button
                      type="button"
                      onClick={() => {
                        const generated = `Parent#${Math.floor(1000 + Math.random() * 9000)}!`;
                        setGuardianCredForm({ ...guardianCredForm, password: generated });
                      }}
                      className="text-[11px] font-semibold text-emerald-700 hover:underline"
                    >
                      ⚡ Generate New
                    </button>
                  </div>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-2.5 size-4 text-ink-muted" />
                    <input
                      type={showGuardianCredPass ? "text" : "password"}
                      required
                      value={guardianCredForm.password}
                      onChange={(e) =>
                        setGuardianCredForm({ ...guardianCredForm, password: e.target.value })
                      }
                      className="w-full rounded-xl border border-line bg-surface-raised pl-9 pr-10 py-2 font-mono text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowGuardianCredPass(!showGuardianCredPass)}
                      className="absolute right-2.5 top-2.5 text-ink-muted hover:text-ink"
                    >
                      {showGuardianCredPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-ink-muted">
                    School admin can reset parent credentials whenever requested.
                  </p>
                </div>

                <div className="rounded-2xl border border-line bg-surface-raised p-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="block text-xs font-bold text-ink">Parent Portal Access</span>
                      <span className="text-[11px] text-ink-muted">
                        {guardianCredForm.portalAccess
                          ? "Parent account is active and authorized to sign in."
                          : "Parent account is suspended; login blocked."}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={guardianCredForm.portalAccess}
                      onChange={(e) =>
                        setGuardianCredForm({ ...guardianCredForm, portalAccess: e.target.checked })
                      }
                      className="size-4 rounded border-line text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>
                </div>

                {/* Quick Copy Credentials Box */}
                <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2.5">
                  <div className="text-[11px] text-emerald-950">
                    <span className="font-bold block">Share with Parent</span>
                    <span className="text-emerald-700 text-[10px]">Copies login email, password, and sign-in URL</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyGuardianCredentials(
                        manageGuardianCredentials.name,
                        guardianCredForm.email,
                        guardianCredForm.password
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[11px] font-bold text-white shadow-sm hover:bg-emerald-700 transition-colors"
                  >
                    {copiedGuardianCreds ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span>{copiedGuardianCreds ? "Copied!" : "Copy Credentials"}</span>
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-end gap-2 border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => setManageGuardianCredentials(null)}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                  >
                    Save Credentials
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

