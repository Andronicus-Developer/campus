"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  FolderOpen,
  Search,
  Download,
  Bookmark,
  ExternalLink,
  Video,
  FileText,
  BookOpen,
  Sparkles,
  Filter,
  CheckCircle2,
  Play,
  Layers,
} from "lucide-react";

interface ResourceItem {
  id: string;
  title: string;
  subject: string;
  category: "Lecture Notes" | "Presentation Slides" | "Past Paper" | "Video Lecture" | "E-Textbook";
  teacher: string;
  uploadedDate: string;
  fileSize: string;
  downloadUrl?: string;
  externalLink?: string;
  isBookmarked?: boolean;
  description: string;
  recommendedFor: string;
}

export default function StudentResourcesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

  const [resources, setResources] = useState<ResourceItem[]>([
    {
      id: "res-1",
      title: "Further Mathematics: Matrix Inversion & Cramer's Rule Mastery Guide",
      subject: "Further Mathematics",
      category: "Lecture Notes",
      teacher: "Mr. David Alabi",
      uploadedDate: "Feb 07, 2026",
      fileSize: "2.4 MB (PDF)",
      isBookmarked: true,
      description: "Comprehensive step-by-step notes covering cofactor expansions, adjugate matrices, and solving 3x3 systems of linear equations.",
      recommendedFor: "Term 2 Midterm Prep",
    },
    {
      id: "res-2",
      title: "Chemistry: Acid-Base Volumetric Titration Demonstration & Error Analysis",
      subject: "Chemistry",
      category: "Video Lecture",
      teacher: "Dr. Peter Obi",
      uploadedDate: "Feb 04, 2026",
      fileSize: "18 mins (1080p Stream)",
      isBookmarked: true,
      description: "Bench laboratory video demonstrating parallax error elimination, meniscus reading, and concordant volume titration with phenolphthalein.",
      recommendedFor: "Lab Practical Exam",
    },
    {
      id: "res-3",
      title: "Physics: Verification of Ohm's Law & Potentiometer Experiment Slide Deck",
      subject: "Physics",
      category: "Presentation Slides",
      teacher: "Mr. Chukwuma Eze",
      uploadedDate: "Jan 30, 2026",
      fileSize: "4.1 MB (PPTX)",
      isBookmarked: false,
      description: "Visual slides on measuring electromotive force (EMF), cell internal resistance, and gradient plotting with error bars.",
      recommendedFor: "Weekly Lecture Prep",
    },
    {
      id: "res-4",
      title: "WAEC Senior Secondary Examination: Physics Past Papers (2020 - 2025)",
      subject: "Physics",
      category: "Past Paper",
      teacher: "Academic Secretariat",
      uploadedDate: "Jan 15, 2026",
      fileSize: "8.6 MB (PDF)",
      isBookmarked: false,
      description: "Compilation of WAEC SSCE Theory and Alternative to Practical physics papers with model scoring rubrics.",
      recommendedFor: "WASSCE Revision",
    },
    {
      id: "res-5",
      title: "Computer Science: Python Object-Oriented Programming (OOP) Handbook",
      subject: "Computer Science",
      category: "E-Textbook",
      teacher: "Engr. Sam Bello",
      uploadedDate: "Jan 20, 2026",
      fileSize: "5.8 MB (PDF)",
      isBookmarked: true,
      description: "Hands-on guide to Python classes, inheritance, polymorphism, encapsulation, and exception handling with 40 code snippets.",
      recommendedFor: "Coding Projects",
    },
    {
      id: "res-6",
      title: "Biology: Photosynthesis Light & Dark Reactions Summary Sheet",
      subject: "Biology",
      category: "Lecture Notes",
      teacher: "Mrs. Grace Okon",
      uploadedDate: "Jan 22, 2026",
      fileSize: "1.7 MB (PDF)",
      isBookmarked: false,
      description: "High-resolution biochemical pathway diagrams illustrating the Z-scheme, photolysis of water, and the Calvin Cycle.",
      recommendedFor: "CA2 Test",
    },
    {
      id: "res-7",
      title: "English Language: Expository & Argumentative Essay Frameworks",
      subject: "English Language",
      category: "Lecture Notes",
      teacher: "Mrs. K. Adeleke",
      uploadedDate: "Jan 18, 2026",
      fileSize: "1.2 MB (PDF)",
      isBookmarked: false,
      description: "Guidelines on thesis crafting, counter-argument refutation, cohesive discourse markers, and formal diction rules.",
      recommendedFor: "Coursework Essay",
    },
    {
      id: "res-8",
      title: "Cambridge IGCSE Pure Mathematics 5-Year Solved Papers",
      subject: "Further Mathematics",
      category: "Past Paper",
      teacher: "Academic Secretariat",
      uploadedDate: "Jan 10, 2026",
      fileSize: "12.2 MB (PDF)",
      isBookmarked: false,
      description: "Solved past examinations with official Cambridge marking schemes and examiner commentary on common misconceptions.",
      recommendedFor: "Terminal Exams",
    },
  ]);

  const toggleBookmark = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isBookmarked: !r.isBookmarked } : r))
    );
  };

  const filtered = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.subject.toLowerCase().includes(search.toLowerCase()) ||
      r.teacher.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "all" || r.category === selectedCategory;
    const matchesSub = selectedSubject === "all" || r.subject === selectedSubject;
    return matchesSearch && matchesCat && matchesSub;
  });

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <FolderOpen className="size-4" />
              Student Portal · Digital Library & Course Vault
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Learning Resources & E-Library
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Subject lecture notes, laboratory protocols, recorded classes, past papers, and approved external simulators.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Downloading all bookmarked resources as a consolidated offline ZIP package.")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="size-4" />
              Download Bookmarked (3)
            </button>
          </div>
        </div>

        {/* External Curated Learning Simulators */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-indigo-600/10 border border-cyan-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
              <Sparkles className="size-4" /> Approved External Learning Portals & STEM Simulators
            </div>
            <span className="text-[11px] text-muted-foreground">Single Sign-On Enabled</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { name: "PhET Interactive Simulations", host: "University of Colorado", desc: "Interactive physics circuits & chemistry lab reactions", link: "https://phet.colorado.edu" },
              { name: "Khan Academy Advanced STEM", host: "Khan Academy", desc: "Calculus, organic chemistry, and biology deep-dives", link: "https://khanacademy.org" },
              { name: "Wolfram Alpha Computational", host: "Wolfram", desc: "Step-by-step mathematical limit & derivative engines", link: "https://wolframalpha.com" },
              { name: "Cambridge Digital Library", host: "Cambridge Assessment", desc: "Syllabi, specimen questions, and examiner notes", link: "https://cambridgeinternational.org" },
            ].map((ext, idx) => (
              <a
                key={idx}
                href={ext.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-card border border-border hover:border-cyan-500/40 transition shadow-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground text-xs group-hover:text-cyan-600 transition-colors">
                      {ext.name}
                    </span>
                    <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-cyan-600" />
                  </div>
                  <span className="text-[10px] text-cyan-600 block mt-0.5">{ext.host}</span>
                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{ext.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources by title, topic, or subject..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-canvas border border-border focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 rounded-xl bg-canvas border border-border text-foreground text-xs font-semibold focus:outline-none"
            >
              <option value="all">All Subjects</option>
              <option value="Further Mathematics">Further Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Computer Science">Computer Science</option>
              <option value="English Language">English Language</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-canvas border border-border text-foreground text-xs font-semibold focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="Lecture Notes">Lecture Notes</option>
              <option value="Presentation Slides">Presentation Slides</option>
              <option value="Past Paper">Past Papers</option>
              <option value="Video Lecture">Video Lectures</option>
              <option value="E-Textbook">E-Textbooks</option>
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((res) => (
            <div
              key={res.id}
              className="p-5 rounded-3xl bg-card border border-border shadow-xs hover:border-cyan-500/40 transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-800">
                      {res.subject}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-canvas border border-border text-foreground">
                      {res.category}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleBookmark(res.id)}
                    title={res.isBookmarked ? "Remove Bookmark" : "Bookmark Resource"}
                    className={`p-1.5 rounded-xl border border-border transition ${
                      res.isBookmarked
                        ? "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Bookmark className="size-4 fill-current" />
                  </button>
                </div>

                <h3 className="text-base font-bold text-foreground mt-2">
                  {res.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  {res.description}
                </p>

                <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span>Instructor: <strong className="text-foreground">{res.teacher}</strong></span>
                  <span>·</span>
                  <span>Size: {res.fileSize}</span>
                  <span>·</span>
                  <span className="text-emerald-600 font-semibold">{res.recommendedFor}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-[11px] text-muted-foreground font-mono">
                  Uploaded: {res.uploadedDate}
                </span>

                <button
                  onClick={() => alert(`Downloading "${res.title}" (${res.fileSize}) to device storage.`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold shadow-xs transition"
                >
                  {res.category === "Video Lecture" ? <Play className="size-3.5 fill-current" /> : <Download className="size-3.5" />}
                  <span>{res.category === "Video Lecture" ? "Watch Video" : "Download File"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
