"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  BookMarked,
  BookOpen,
  CheckCircle2,
  DoorOpen,
  Filter,
  GraduationCap,
  Layers,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
  X,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

interface SubjectRecord {
  id: string;
  code: string;
  name: string;
  category: "Core" | "Sciences" | "Arts" | "Commercial" | "Vocational";
  level: "Junior Secondary" | "Senior Secondary" | "All Tiers";
  periodsPerWeek: number;
  isElective: boolean;
  assignedTeachers: string[];
  description: string;
}

interface AllocationRecord {
  id: string;
  teacherId: string;
  teacherName: string;
  subjectCode: string;
  subjectName: string;
  classArm: string;
  periodsPerWeek: number;
  term: string;
}

interface StudentElectiveEnrollment {
  studentId: string;
  studentName: string;
  matricNo: string;
  classArm: string;
  coreCount: number;
  electives: string[];
}

const INITIAL_SUBJECTS: SubjectRecord[] = [
  {
    id: "sub-01",
    code: "MTH-101",
    name: "Mathematics",
    category: "Core",
    level: "All Tiers",
    periodsPerWeek: 5,
    isElective: false,
    assignedTeachers: ["Mr. David Alabi"],
    description: "Compulsory national curriculum algebra, geometry, trigonometry, and statistics.",
  },
  {
    id: "sub-02",
    code: "ENG-101",
    name: "English Language & Literature",
    category: "Core",
    level: "All Tiers",
    periodsPerWeek: 5,
    isElective: false,
    assignedTeachers: ["Mrs. Nneka Udoh"],
    description: "Grammar, comprehension, oral English, and African and international prose.",
  },
  {
    id: "sub-03",
    code: "PHY-201",
    name: "Physics",
    category: "Sciences",
    level: "Senior Secondary",
    periodsPerWeek: 4,
    isElective: false,
    assignedTeachers: ["Mr. Francis Eze"],
    description: "Mechanics, optics, thermodynamics, waves, and modern physics practicals.",
  },
  {
    id: "sub-04",
    code: "CHE-201",
    name: "Chemistry",
    category: "Sciences",
    level: "Senior Secondary",
    periodsPerWeek: 4,
    isElective: false,
    assignedTeachers: ["Mrs. Grace Okon"],
    description: "Inorganic, organic, physical chemistry, stoichiometry, and laboratory analysis.",
  },
  {
    id: "sub-05",
    code: "BIO-201",
    name: "Biology",
    category: "Sciences",
    level: "Senior Secondary",
    periodsPerWeek: 4,
    isElective: false,
    assignedTeachers: ["Mrs. Grace Okon"],
    description: "Cell biology, ecology, mammalian physiology, genetics, and ecology fieldworks.",
  },
  {
    id: "sub-06",
    code: "FMT-202",
    name: "Further Mathematics",
    category: "Sciences",
    level: "Senior Secondary",
    periodsPerWeek: 3,
    isElective: true,
    assignedTeachers: ["Mr. David Alabi"],
    description: "Pure calculus, matrices, vectors, coordinate geometry, and advanced dynamics.",
  },
  {
    id: "sub-07",
    code: "ACC-301",
    name: "Financial Accounting",
    category: "Commercial",
    level: "Senior Secondary",
    periodsPerWeek: 4,
    isElective: false,
    assignedTeachers: ["Mr. K. Adeleke"],
    description: "Double entry bookkeeping, ledger balancing, company accounts, and auditing.",
  },
  {
    id: "sub-08",
    code: "TD-204",
    name: "Technical Drawing",
    category: "Vocational",
    level: "Senior Secondary",
    periodsPerWeek: 3,
    isElective: true,
    assignedTeachers: ["Mr. Francis Eze"],
    description: "Orthographic projections, isometric view drawing, and CAD blueprint fundamentals.",
  },
  {
    id: "sub-09",
    code: "BSC-102",
    name: "Basic Science & Technology",
    category: "Core",
    level: "Junior Secondary",
    periodsPerWeek: 4,
    isElective: false,
    assignedTeachers: ["Ms. Chioma Okon"],
    description: "Introductory sciences, simple machines, computer appreciation, and hygiene.",
  },
];

const INITIAL_ALLOCATIONS: AllocationRecord[] = [
  {
    id: "alc-01",
    teacherId: "tch-01",
    teacherName: "Mr. David Alabi",
    subjectCode: "MTH-101",
    subjectName: "Mathematics",
    classArm: "SSS 2A (Pure Science)",
    periodsPerWeek: 5,
    term: "Term 2, 2025/2026",
  },
  {
    id: "alc-02",
    teacherId: "tch-01",
    teacherName: "Mr. David Alabi",
    subjectCode: "MTH-101",
    subjectName: "Mathematics",
    classArm: "SSS 1 Science",
    periodsPerWeek: 5,
    term: "Term 2, 2025/2026",
  },
  {
    id: "alc-03",
    teacherId: "tch-04",
    teacherName: "Mr. Francis Eze",
    subjectCode: "PHY-201",
    subjectName: "Physics",
    classArm: "SSS 3 Science A",
    periodsPerWeek: 4,
    term: "Term 2, 2025/2026",
  },
  {
    id: "alc-04",
    teacherId: "tch-04",
    teacherName: "Mr. Francis Eze",
    subjectCode: "PHY-201",
    subjectName: "Physics",
    classArm: "SSS 2A (Pure Science)",
    periodsPerWeek: 4,
    term: "Term 2, 2025/2026",
  },
  {
    id: "alc-05",
    teacherId: "tch-02",
    teacherName: "Mrs. Grace Okon",
    subjectCode: "BIO-201",
    subjectName: "Biology",
    classArm: "SSS 2A (Pure Science)",
    periodsPerWeek: 4,
    term: "Term 2, 2025/2026",
  },
  {
    id: "alc-06",
    teacherId: "tch-05",
    teacherName: "Mrs. Nneka Udoh",
    subjectCode: "ENG-101",
    subjectName: "English Language & Literature",
    classArm: "SSS 3 Arts",
    periodsPerWeek: 5,
    term: "Term 2, 2025/2026",
  },
  {
    id: "alc-07",
    teacherId: "tch-03",
    teacherName: "Ms. Chioma Okon",
    subjectCode: "BSC-102",
    subjectName: "Basic Science & Technology",
    classArm: "JSS 2 Gold",
    periodsPerWeek: 4,
    term: "Term 2, 2025/2026",
  },
];

const INITIAL_STUDENT_ENROLLMENTS: StudentElectiveEnrollment[] = [
  { studentId: "std-01", studentName: "Adeleke Tobi", matricNo: "RC-2023-0184", classArm: "SSS 2A (Pure Science)", coreCount: 7, electives: ["Further Mathematics", "Technical Drawing"] },
  { studentId: "std-02", studentName: "Balogun Farouk", matricNo: "RC-2023-0185", classArm: "SSS 2A (Pure Science)", coreCount: 7, electives: ["Further Mathematics"] },
  { studentId: "std-03", studentName: "Chukwuma Kamsi", matricNo: "RC-2023-0186", classArm: "SSS 2A (Pure Science)", coreCount: 7, electives: ["Technical Drawing"] },
  { studentId: "std-04", studentName: "Danjuma Aisha", matricNo: "RC-2023-0187", classArm: "SSS 2A (Pure Science)", coreCount: 7, electives: ["Further Mathematics", "Technical Drawing"] },
  { studentId: "std-05", studentName: "Eze Somtochukwu", matricNo: "RC-2023-0188", classArm: "SSS 2A (Pure Science)", coreCount: 7, electives: ["Technical Drawing"] },
  { studentId: "std-06", studentName: "Mohammed Zainab", matricNo: "RC-2024-0012", classArm: "JSS 2 Gold", coreCount: 8, electives: [] },
];

const AVAILABLE_TEACHERS = [
  { id: "tch-01", name: "Mr. David Alabi", dept: "STEM & Mathematics" },
  { id: "tch-02", name: "Mrs. Grace Okon", dept: "Pure Sciences" },
  { id: "tch-03", name: "Ms. Chioma Okon", dept: "Junior Secondary" },
  { id: "tch-04", name: "Mr. Francis Eze", dept: "Applied Sciences" },
  { id: "tch-05", name: "Mrs. Nneka Udoh", dept: "Humanities" },
  { id: "tch-06", name: "Mr. T. Balogun", dept: "Commercial Studies" },
  { id: "tch-07", name: "Mrs. S. Danjuma", dept: "Languages & Arts" },
  { id: "tch-08", name: "Mr. K. Adeleke", dept: "Social Sciences" },
];

const AVAILABLE_CLASSES = [
  "SSS 3 Science A",
  "SSS 3 Arts",
  "SSS 2A (Pure Science)",
  "SSS 2B (Commercial)",
  "SSS 1 Science",
  "JSS 3 Alpha",
  "JSS 2 Gold",
  "JSS 1 Alpha",
];

export default function AdminSubjectsPage() {
  const [activeTab, setActiveTab] = useState<"catalog" | "allocations" | "students">("catalog");
  const [subjects, setSubjects] = useState<SubjectRecord[]>(INITIAL_SUBJECTS);
  const [allocations, setAllocations] = useState<AllocationRecord[]>(INITIAL_ALLOCATIONS);
  const [studentEnrollments, setStudentEnrollments] = useState<StudentElectiveEnrollment[]>(INITIAL_STUDENT_ENROLLMENTS);

  // Search & Filter
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modals state
  const [showCreateSubjectModal, setShowCreateSubjectModal] = useState(false);
  const [showAllocateTeacherModal, setShowAllocateTeacherModal] = useState(false);
  const [selectedStudentForElectives, setSelectedStudentForElectives] = useState<StudentElectiveEnrollment | null>(null);

  // Success toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Form: Create Subject
  const [newSubjectForm, setNewSubjectForm] = useState({
    code: "GEO-201",
    name: "Geography",
    category: "Arts" as SubjectRecord["category"],
    level: "Senior Secondary" as SubjectRecord["level"],
    periodsPerWeek: 4,
    isElective: false,
    description: "Physical and human geography, cartography, and ecological systems.",
  });

  // Form: Allocate Teacher
  const [newAllocationForm, setNewAllocationForm] = useState({
    teacherId: AVAILABLE_TEACHERS[0].id,
    subjectCode: INITIAL_SUBJECTS[0].code,
    classArm: AVAILABLE_CLASSES[0],
    periodsPerWeek: 4,
  });

  // Filtered Subjects
  const filteredSubjects = subjects.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || s.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Filtered Allocations
  const filteredAllocations = allocations.filter((a) => {
    return (
      a.teacherName.toLowerCase().includes(search.toLowerCase()) ||
      a.subjectName.toLowerCase().includes(search.toLowerCase()) ||
      a.classArm.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Handler: Create Subject
  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectForm.code || !newSubjectForm.name) return;

    const newRec: SubjectRecord = {
      id: `sub-${Date.now()}`,
      code: newSubjectForm.code.toUpperCase(),
      name: newSubjectForm.name,
      category: newSubjectForm.category,
      level: newSubjectForm.level,
      periodsPerWeek: Number(newSubjectForm.periodsPerWeek),
      isElective: Boolean(newSubjectForm.isElective),
      assignedTeachers: [],
      description: newSubjectForm.description,
    };

    setSubjects([...subjects, newRec]);
    setShowCreateSubjectModal(false);
    showToast(`New Subject "${newRec.name}" (${newRec.code}) created successfully!`);

    setNewSubjectForm({
      code: "GEO-201",
      name: "Geography",
      category: "Arts",
      level: "Senior Secondary",
      periodsPerWeek: 4,
      isElective: false,
      description: "Physical and human geography, cartography, and ecological systems.",
    });
  };

  // Handler: Allocate Teacher to Subject & Class
  const handleAllocateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = AVAILABLE_TEACHERS.find((t) => t.id === newAllocationForm.teacherId);
    const subject = subjects.find((s) => s.code === newAllocationForm.subjectCode);
    if (!teacher || !subject) return;

    const newAlloc: AllocationRecord = {
      id: `alc-${Date.now()}`,
      teacherId: teacher.id,
      teacherName: teacher.name,
      subjectCode: subject.code,
      subjectName: subject.name,
      classArm: newAllocationForm.classArm,
      periodsPerWeek: Number(newAllocationForm.periodsPerWeek),
      term: "Term 2, 2025/2026",
    };

    setAllocations([newAlloc, ...allocations]);

    // Update assigned teachers on subject record
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.code === subject.code && !s.assignedTeachers.includes(teacher.name)) {
          return { ...s, assignedTeachers: [...s.assignedTeachers, teacher.name] };
        }
        return s;
      })
    );

    setShowAllocateTeacherModal(false);
    showToast(
      `Assigned ${teacher.name} to teach ${subject.name} in ${newAllocationForm.classArm}!`
    );
  };

  // Handler: Remove Allocation
  const handleRemoveAllocation = (allocId: string) => {
    setAllocations(allocations.filter((a) => a.id !== allocId));
    showToast("Teaching allocation removed.");
  };

  // Handler: Toggle Student Elective
  const handleToggleStudentElective = (studentId: string, electiveName: string) => {
    setStudentEnrollments((prev) =>
      prev.map((s) => {
        if (s.studentId === studentId) {
          const exists = s.electives.includes(electiveName);
          const updated = exists
            ? s.electives.filter((e) => e !== electiveName)
            : [...s.electives, electiveName];
          return { ...s, electives: updated };
        }
        return s;
      })
    );
    showToast(`Updated subject enrollment for student.`);
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
                  Curriculum &amp; Teaching Allocations
                </span>
                <span className="font-mono text-xs text-ink-muted">
                  {subjects.length} Accredited Subjects • {allocations.length} Active Teaching Slots
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">
                Subjects &amp; Teaching Allocations
              </h2>
              <p className="text-xs text-ink-muted">
                Admin controls to create subjects, assign teachers to class arms &amp; subjects, and manage student subject enrollment.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCreateSubjectModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all"
              >
                <Plus className="size-4" />
                <span>+ Create New Subject</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAllocateTeacherModal(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-600 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800 shadow-sm hover:bg-emerald-100 active:scale-95 transition-all"
              >
                <UserCheck className="size-4 text-emerald-700" />
                <span>+ Allocate Teacher to Subject</span>
              </button>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab("catalog")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "catalog"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                <BookOpen className="size-4" />
                <span>Subject Catalog ({subjects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("allocations")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "allocations"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                <Layers className="size-4" />
                <span>Teacher &amp; Class Matrix ({allocations.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("students")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "students"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                <GraduationCap className="size-4" />
                <span>Student Subject Enrollment</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              {activeTab === "catalog" && (
                <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                  <Filter className="size-3.5" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="rounded-xl border border-line bg-surface-raised px-2.5 py-1.5 text-xs font-medium text-ink focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="core">Core Curriculum</option>
                    <option value="sciences">Pure &amp; Applied Sciences</option>
                    <option value="arts">Arts &amp; Humanities</option>
                    <option value="commercial">Commercial &amp; Business</option>
                    <option value="vocational">Vocational / Electives</option>
                  </select>
                </div>
              )}

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 size-4 text-ink-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search subject, code, teacher..."
                  className="w-full rounded-xl border border-line bg-surface-raised pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TAB 1: SUBJECT CATALOG */}
        {activeTab === "catalog" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                    <th className="pb-3 font-bold uppercase">Code</th>
                    <th className="pb-3 font-bold uppercase">Subject Title</th>
                    <th className="pb-3 font-bold uppercase">Category</th>
                    <th className="pb-3 font-bold uppercase">Target Tier</th>
                    <th className="pb-3 font-bold uppercase">Periods / Wk</th>
                    <th className="pb-3 font-bold uppercase">Type</th>
                    <th className="pb-3 font-bold uppercase">Assigned Teachers</th>
                    <th className="pb-3 font-bold uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-soft">
                  {filteredSubjects.map((s) => (
                    <tr key={s.id} className="hover:bg-surface-raised transition-colors">
                      <td className="py-3.5 font-mono font-bold text-primary">{s.code}</td>
                      <td className="py-3.5">
                        <span className="font-bold text-ink block">{s.name}</span>
                        <span className="text-[11px] text-ink-muted line-clamp-1 max-w-xs">
                          {s.description}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className="rounded bg-surface-raised px-2 py-0.5 font-mono text-[10px] font-bold text-ink border border-line">
                          {s.category}
                        </span>
                      </td>
                      <td className="py-3.5 text-ink-soft">{s.level}</td>
                      <td className="py-3.5 font-mono font-bold text-ink">{s.periodsPerWeek} periods</td>
                      <td className="py-3.5">
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                            s.isElective
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {s.isElective ? "Elective" : "Compulsory"}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {s.assignedTeachers.map((t, i) => (
                            <span
                              key={i}
                              className="rounded bg-blue-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-blue-800 border border-blue-200"
                            >
                              {t}
                            </span>
                          ))}
                          {s.assignedTeachers.length === 0 && (
                            <span className="font-mono text-[10px] text-ink-muted">No teacher assigned</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setNewAllocationForm({
                              ...newAllocationForm,
                              subjectCode: s.code,
                            });
                            setShowAllocateTeacherModal(true);
                          }}
                          className="rounded-lg border border-line bg-surface-raised px-2 py-1 font-mono text-[11px] font-semibold text-ink hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                          Allocate Teacher
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredSubjects.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-xs text-ink-muted">
                        No subjects match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: TEACHING ALLOCATION MATRIX */}
        {activeTab === "allocations" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                    <th className="pb-3 font-bold uppercase">Appointed Teacher</th>
                    <th className="pb-3 font-bold uppercase">Subject Code &amp; Name</th>
                    <th className="pb-3 font-bold uppercase">Target Class Arm</th>
                    <th className="pb-3 font-bold uppercase">Weekly Teaching Load</th>
                    <th className="pb-3 font-bold uppercase">Academic Term</th>
                    <th className="pb-3 font-bold uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-soft">
                  {filteredAllocations.map((a) => (
                    <tr key={a.id} className="hover:bg-surface-raised transition-colors">
                      <td className="py-3.5 font-bold text-ink">
                        <div className="flex items-center gap-2">
                          <div className="flex size-7 items-center justify-center rounded-full bg-blue-100 font-mono text-xs font-bold text-blue-800">
                            {a.teacherName[0]}
                          </div>
                          <span>{a.teacherName}</span>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className="font-mono font-bold text-primary mr-1.5">{a.subjectCode}</span>
                        <span className="font-semibold text-ink">{a.subjectName}</span>
                      </td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-surface-raised px-2.5 py-1 font-mono text-xs font-bold text-emerald-800 border border-line">
                          <DoorOpen className="size-3 text-emerald-600" />
                          {a.classArm}
                        </span>
                      </td>
                      <td className="py-3.5 font-mono text-ink">
                        <span className="font-bold">{a.periodsPerWeek} Periods</span> / week
                      </td>
                      <td className="py-3.5 font-mono text-ink-muted text-[11px]">{a.term}</td>
                      <td className="py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveAllocation(a.id)}
                          className="rounded-lg p-1.5 text-danger hover:bg-danger-light transition-colors"
                          title="Remove allocation"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredAllocations.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-xs text-ink-muted">
                        No teaching allocations match your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: STUDENT SUBJECT ENROLLMENT */}
        {activeTab === "students" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Student Subject Enrollment &amp; Electives</h3>
                <p className="text-xs text-ink-muted">
                  Assign and tailor student elective courses (e.g. Further Mathematics, Technical Drawing) for each student.
                </p>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                    <th className="pb-3 font-bold uppercase">Student Name</th>
                    <th className="pb-3 font-bold uppercase">Matric No</th>
                    <th className="pb-3 font-bold uppercase">Class Arm</th>
                    <th className="pb-3 font-bold uppercase">Core Subjects</th>
                    <th className="pb-3 font-bold uppercase">Enrolled Electives</th>
                    <th className="pb-3 font-bold uppercase text-right">Manage Electives</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-soft">
                  {studentEnrollments.map((s) => (
                    <tr key={s.studentId} className="hover:bg-surface-raised transition-colors">
                      <td className="py-3.5 font-bold text-ink">{s.studentName}</td>
                      <td className="py-3.5 font-mono text-primary font-bold">{s.matricNo}</td>
                      <td className="py-3.5 font-mono text-ink-muted">{s.classArm}</td>
                      <td className="py-3.5 font-mono text-ink">
                        <span className="font-bold text-emerald-700">{s.coreCount} Core Subjects</span> (Standard)
                      </td>
                      <td className="py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {s.electives.map((e, i) => (
                            <span
                              key={i}
                              className="rounded bg-amber-50 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800 border border-amber-200"
                            >
                              {e}
                            </span>
                          ))}
                          {s.electives.length === 0 && (
                            <span className="font-mono text-[10px] text-ink-muted">None (Core Only)</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedStudentForElectives(s)}
                          className="rounded-lg border border-line bg-surface-raised px-2.5 py-1 text-ink font-semibold hover:border-emerald-600 transition-colors"
                        >
                          Assign Electives
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: CREATE SUBJECT */}
        {showCreateSubjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <BookMarked className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Admin: Create New Subject</h3>
                    <p className="text-xs text-ink-muted">Add course unit to the accredited school curriculum catalog.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateSubjectModal(false)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleCreateSubject} className="mt-4 space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">Subject Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. GEO-201, FRE-101"
                      value={newSubjectForm.code}
                      onChange={(e) => setNewSubjectForm({ ...newSubjectForm, code: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 font-mono text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Subject Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Geography"
                      value={newSubjectForm.name}
                      onChange={(e) => setNewSubjectForm({ ...newSubjectForm, name: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">Curriculum Category</label>
                    <select
                      value={newSubjectForm.category}
                      onChange={(e) =>
                        setNewSubjectForm({
                          ...newSubjectForm,
                          category: e.target.value as SubjectRecord["category"],
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="Core">Core Curriculum</option>
                      <option value="Sciences">Pure &amp; Applied Sciences</option>
                      <option value="Arts">Arts &amp; Humanities</option>
                      <option value="Commercial">Commercial &amp; Business</option>
                      <option value="Vocational">Vocational / Technical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Education Level Tier</label>
                    <select
                      value={newSubjectForm.level}
                      onChange={(e) =>
                        setNewSubjectForm({
                          ...newSubjectForm,
                          level: e.target.value as SubjectRecord["level"],
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="All Tiers">All Tiers (Junior &amp; Senior)</option>
                      <option value="Junior Secondary">Junior Secondary (JSS 1-3)</option>
                      <option value="Senior Secondary">Senior Secondary (SSS 1-3)</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">Periods per Week</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={10}
                      value={newSubjectForm.periodsPerWeek}
                      onChange={(e) =>
                        setNewSubjectForm({ ...newSubjectForm, periodsPerWeek: Number(e.target.value) })
                      }
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 font-mono text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Enrollment Requirement</label>
                    <select
                      value={newSubjectForm.isElective ? "elective" : "compulsory"}
                      onChange={(e) =>
                        setNewSubjectForm({ ...newSubjectForm, isElective: e.target.value === "elective" })
                      }
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="compulsory">Compulsory Core</option>
                      <option value="elective">Optional Elective</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink">Curriculum Syllabus Description</label>
                  <textarea
                    rows={2}
                    value={newSubjectForm.description}
                    onChange={(e) => setNewSubjectForm({ ...newSubjectForm, description: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="mt-6 flex items-center justify-end gap-2 border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateSubjectModal(false)}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                  >
                    Create Subject Unit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ALLOCATE TEACHER TO SUBJECT & CLASS */}
        {showAllocateTeacherModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <UserCheck className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Assign Teacher to Subject &amp; Class</h3>
                    <p className="text-xs text-ink-muted">Set up teaching assignment and weekly period quota.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAllocateTeacherModal(false)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleAllocateTeacher} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ink">Select Teacher</label>
                  <select
                    value={newAllocationForm.teacherId}
                    onChange={(e) => setNewAllocationForm({ ...newAllocationForm, teacherId: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                  >
                    {AVAILABLE_TEACHERS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} — {t.dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink">Select Subject</label>
                  <select
                    value={newAllocationForm.subjectCode}
                    onChange={(e) => setNewAllocationForm({ ...newAllocationForm, subjectCode: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                  >
                    {subjects.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.code} — {s.name} ({s.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">Target Class Arm</label>
                    <select
                      value={newAllocationForm.classArm}
                      onChange={(e) => setNewAllocationForm({ ...newAllocationForm, classArm: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    >
                      {AVAILABLE_CLASSES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Periods per Week</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={10}
                      value={newAllocationForm.periodsPerWeek}
                      onChange={(e) =>
                        setNewAllocationForm({ ...newAllocationForm, periodsPerWeek: Number(e.target.value) })
                      }
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 font-mono text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-2 border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAllocateTeacherModal(false)}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                  >
                    Confirm Teaching Allocation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: MANAGE STUDENT ELECTIVES */}
        {selectedStudentForElectives && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <GraduationCap className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Elective Subject Enrollment</h3>
                    <p className="text-xs text-ink-muted">
                      {selectedStudentForElectives.studentName} ({selectedStudentForElectives.matricNo})
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudentForElectives(null)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <p className="text-xs text-ink-muted">
                  Click on an elective to toggle enrollment for this student:
                </p>

                <div className="space-y-2">
                  {subjects
                    .filter((s) => s.isElective)
                    .map((elective) => {
                      const isEnrolled = studentEnrollments
                        .find((s) => s.studentId === selectedStudentForElectives.studentId)
                        ?.electives.includes(elective.name);

                      return (
                        <div
                          key={elective.code}
                          onClick={() => handleToggleStudentElective(selectedStudentForElectives.studentId, elective.name)}
                          className={`flex items-center justify-between rounded-xl p-3 text-xs font-semibold cursor-pointer transition-all border ${
                            isEnrolled
                              ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                              : "bg-surface-raised border-line text-ink hover:border-emerald-400"
                          }`}
                        >
                          <div>
                            <span className="font-bold block">{elective.name}</span>
                            <span className="font-mono text-[10px] text-ink-muted">
                              {elective.code} • {elective.periodsPerWeek} periods/wk
                            </span>
                          </div>
                          <span
                            className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                              isEnrolled ? "bg-emerald-600 text-white" : "bg-surface text-ink-muted border border-line"
                            }`}
                          >
                            {isEnrolled ? "Enrolled ✓" : "+ Enroll"}
                          </span>
                        </div>
                      );
                    })}
                </div>

                <div className="flex justify-end pt-3 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setSelectedStudentForElectives(null)}
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
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
