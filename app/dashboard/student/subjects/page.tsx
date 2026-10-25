"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  BookMarked,
  User,
  Clock,
  BookOpen,
  Download,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  FileText,
  Search,
} from "lucide-react";

interface SubjectDetail {
  code: string;
  name: string;
  category: "Core" | "Science Elective" | "General Elective";
  teacher: string;
  teacherEmail: string;
  periodsPerWeek: number;
  syllabusProgress: number;
  currentCA: number;
  recommendedText: string;
}

export default function StudentSubjectsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const subjects: SubjectDetail[] = [
    {
      code: "MTH-201",
      name: "General Mathematics",
      category: "Core",
      teacher: "Mr. David Alabi",
      teacherEmail: "d.alabi@riverside.edu",
      periodsPerWeek: 5,
      syllabusProgress: 78,
      currentCA: 29, // out of 30
      recommendedText: "New General Mathematics for Senior Secondary Books 2",
    },
    {
      code: "FMTH-201",
      name: "Further Mathematics",
      category: "Science Elective",
      teacher: "Mr. David Alabi",
      teacherEmail: "d.alabi@riverside.edu",
      periodsPerWeek: 4,
      syllabusProgress: 75,
      currentCA: 29,
      recommendedText: "Pure Mathematics for Advanced Level (Bostock & Chandler)",
    },
    {
      code: "PHY-201",
      name: "Physics (Theory & Practical)",
      category: "Science Elective",
      teacher: "Mr. Chukwuma Eze",
      teacherEmail: "c.eze@riverside.edu",
      periodsPerWeek: 5,
      syllabusProgress: 72,
      currentCA: 27,
      recommendedText: "Senior Secondary Physics by P.N. Okeke & Anyakoha",
    },
    {
      code: "CHM-201",
      name: "Chemistry",
      category: "Science Elective",
      teacher: "Dr. Peter Obi",
      teacherEmail: "p.obi@riverside.edu",
      periodsPerWeek: 5,
      syllabusProgress: 80,
      currentCA: 27,
      recommendedText: "New School Chemistry for Senior Secondary by Osei Yaw Ababio",
    },
    {
      code: "BIO-201",
      name: "Biology",
      category: "Science Elective",
      teacher: "Mrs. Grace Okon",
      teacherEmail: "g.okon@riverside.edu",
      periodsPerWeek: 4,
      syllabusProgress: 82,
      currentCA: 26,
      recommendedText: "Modern Biology for Senior Secondary Schools by Sarojini T. Ramalingam",
    },
    {
      code: "ENG-201",
      name: "English Language & Oral Diction",
      category: "Core",
      teacher: "Mrs. K. Adeleke",
      teacherEmail: "k.adeleke@riverside.edu",
      periodsPerWeek: 5,
      syllabusProgress: 70,
      currentCA: 25,
      recommendedText: "Intensive English for Senior Secondary Schools",
    },
    {
      code: "CSC-201",
      name: "Computer Science & Python Coding",
      category: "Science Elective",
      teacher: "Engr. Sam Bello",
      teacherEmail: "s.bello@riverside.edu",
      periodsPerWeek: 3,
      syllabusProgress: 85,
      currentCA: 30,
      recommendedText: "Computer Studies for Senior Secondary Schools & Python Handbook",
    },
    {
      code: "ECN-201",
      name: "Economics",
      category: "General Elective",
      teacher: "Mr. B. Adeleke",
      teacherEmail: "b.adeleke@riverside.edu",
      periodsPerWeek: 3,
      syllabusProgress: 68,
      currentCA: 25,
      recommendedText: "Comprehensive Economics for Senior Secondary Schools",
    },
    {
      code: "CIV-201",
      name: "Civic Education",
      category: "Core",
      teacher: "Mr. E. Peters",
      teacherEmail: "e.peters@riverside.edu",
      periodsPerWeek: 2,
      syllabusProgress: 85,
      currentCA: 27,
      recommendedText: "Essential Civic Education for Senior Secondary Schools",
    },
  ];

  const filtered = subjects.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.teacher.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || s.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <BookMarked className="w-4 h-4" />
              Student Portal · Academic Course Load
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Enrolled Subjects & Syllabus Pacing
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Grade 11 · Senior Secondary (SSS 2A) · 9 Registered WAEC / Cambridge Subjects
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Downloading Unified Schemes of Work & Course Outlines (PDF)")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              Course Syllabus
            </button>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by subject name, course code, or teacher..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-canvas border border-border focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>

          <div className="flex items-center gap-2 bg-canvas border border-border rounded-xl p-1 text-xs">
            {["all", "core", "science", "elective"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition ${
                  categoryFilter === cat
                    ? "bg-cyan-600 text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <div
              key={s.code}
              className="p-5 rounded-2xl bg-card border border-border shadow-xs hover:border-cyan-500/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-semibold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-800">
                    {s.code}
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {s.periodsPerWeek} periods/wk
                  </span>
                </div>

                <h3 className="font-bold text-foreground text-base mb-1">{s.name}</h3>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <User className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{s.teacher}</span>
                </div>

                <div className="space-y-1.5 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Syllabus Covered:</span>
                    <span className="font-bold text-foreground">{s.syllabusProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-canvas border border-border overflow-hidden">
                    <div
                      className="h-full bg-cyan-600 rounded-full transition-all duration-500"
                      style={{ width: `${s.syllabusProgress}%` }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground line-clamp-1 italic">
                  Book: {s.recommendedText}
                </p>
              </div>

              <div className="pt-4 border-t border-border mt-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">CA Standing</div>
                  <div className="text-base font-black text-emerald-600">{s.currentCA} / 30 pts</div>
                </div>

                <button
                  onClick={() => alert(`Opening lecture notes & assignment portal for ${s.name}`)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-canvas border border-border hover:bg-muted text-xs font-medium text-foreground transition"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-600" />
                  Notes & CA
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
