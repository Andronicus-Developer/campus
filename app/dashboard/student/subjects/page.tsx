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
  ExternalLink,
  Video,
  Sparkles,
  Info,
  Calendar,
  Layers,
  MapPin,
  Megaphone,
} from "lucide-react";

interface SubjectDetail {
  code: string;
  name: string;
  category: "Core" | "Science Elective" | "General Elective";
  teacher: string;
  teacherEmail: string;
  consultationHour: string;
  room: string;
  periodsPerWeek: number;
  schedule: string;
  syllabusProgress: number;
  currentCA: number;
  recommendedText: string;
  courseOverview: string;
  learningObjectives: string[];
  activeTopic: string;
  digitalClassroomUrl?: string;
  announcements?: string;
  resourcesCount: number;
}

export default function StudentSubjectsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState<SubjectDetail | null>(null);

  const subjects: SubjectDetail[] = [
    {
      code: "MTH-201",
      name: "General Mathematics",
      category: "Core",
      teacher: "Mr. David Alabi",
      teacherEmail: "d.alabi@riverside.edu",
      consultationHour: "Tuesdays 02:00 - 03:00 PM",
      room: "Room 14 (Science Wing)",
      periodsPerWeek: 5,
      schedule: "Mon 08:00 AM, Tue 08:00 AM, Thu 09:30 AM",
      syllabusProgress: 78,
      currentCA: 29,
      recommendedText: "New General Mathematics for Senior Secondary Books 2",
      courseOverview: "Advanced algebraic operations, quadratic and logarithmic functions, plane geometry theorems, and coordinate geometry fundamentals aligned with WAEC and Cambridge IGCSE curricula.",
      learningObjectives: [
        "Master quadratic graph modeling and optimization",
        "Apply circle theorems to geometric proofs",
        "Solve simultaneous linear and non-linear equations",
        "Compute probability distributions and standard deviation",
      ],
      activeTopic: "Quadratic Equation Factorization & Parabolic Curves",
      digitalClassroomUrl: "https://meet.google.com/mth-201-sec",
      announcements: "Class assignment 3 submission closes on Thursday at midnight.",
      resourcesCount: 14,
    },
    {
      code: "FMTH-201",
      name: "Further Mathematics",
      category: "Science Elective",
      teacher: "Mr. David Alabi",
      teacherEmail: "d.alabi@riverside.edu",
      consultationHour: "Wednesdays 03:00 - 04:00 PM",
      room: "Room 14 (Science Wing)",
      periodsPerWeek: 4,
      schedule: "Mon 08:00 AM, Wed 08:45 AM, Fri 08:45 AM",
      syllabusProgress: 75,
      currentCA: 29,
      recommendedText: "Pure Mathematics for Advanced Level (Bostock & Chandler)",
      courseOverview: "Rigorous analytical mathematics covering matrix transformations, determinants, vectors in 3D, and an introductory calculus sequence (differentiation and integration).",
      learningObjectives: [
        "Invert 3x3 matrices using cofactor expansion and adjugates",
        "Differentiate polynomial and trigonometric functions from first principles",
        "Apply integration to area under curves and rotational volumes",
        "Resolve 3-dimensional vector equations and scalar products",
      ],
      activeTopic: "Matrices & Determinants (Cramer's Rule & Inverses)",
      digitalClassroomUrl: "https://meet.google.com/fmth-201-adv",
      announcements: "STEM Olympiad preparatory session every Thursday at 3:30 PM.",
      resourcesCount: 18,
    },
    {
      code: "PHY-201",
      name: "Physics (Theory & Practical)",
      category: "Science Elective",
      teacher: "Mr. Chukwuma Eze",
      teacherEmail: "c.eze@riverside.edu",
      consultationHour: "Mondays 02:00 - 03:00 PM",
      room: "Physics Lab 2",
      periodsPerWeek: 5,
      schedule: "Mon 10:55 AM, Tue 08:45 AM, Thu 08:00 AM (Lab)",
      syllabusProgress: 72,
      currentCA: 27,
      recommendedText: "Senior Secondary Physics by P.N. Okeke & Anyakoha",
      courseOverview: "Fundamental physical principles spanning classical mechanics, wave optics, electromagnetism, simple harmonic motion, and laboratory instrumentation.",
      learningObjectives: [
        "Verify Ohm's Law and calculate internal resistance of cells",
        "Model simple harmonic motion using simple pendulums and spiral springs",
        "Derive electromagnetic induction equations and transformer ratios",
        "Interpret refraction through glass prisms and Snell's Law",
      ],
      activeTopic: "Ohm's Law Verification & Potentiometer Circuits",
      digitalClassroomUrl: "https://meet.google.com/phy-201-lab",
      announcements: "Practical logbooks must be submitted before Thursday's experiment.",
      resourcesCount: 16,
    },
    {
      code: "CHM-201",
      name: "Chemistry",
      category: "Science Elective",
      teacher: "Dr. Peter Obi",
      teacherEmail: "p.obi@riverside.edu",
      consultationHour: "Thursdays 01:30 - 02:30 PM",
      room: "Chemistry Lab A",
      periodsPerWeek: 5,
      schedule: "Mon 09:30 AM (Lab), Wed 08:00 AM, Thu 10:55 AM",
      syllabusProgress: 80,
      currentCA: 27,
      recommendedText: "New School Chemistry for Senior Secondary by Osei Yaw Ababio",
      courseOverview: "Inorganic chemistry, periodic trends, chemical equilibrium, volumetric titration, and introductory organic functional groups.",
      learningObjectives: [
        "Carry out precise acid-base titrations with methyl orange and phenolphthalein",
        "Analyze trends in ionization energy and electronegativity across Period 3",
        "Apply Le Chatelier's Principle to reversible gaseous equilibria",
        "Differentiate aliphatic hydrocarbons, alkanes, alkenes, and alkynes",
      ],
      activeTopic: "Volumetric Analysis: Acid-Base Neutralization Titrations",
      digitalClassroomUrl: "https://meet.google.com/chm-201-exp",
      announcements: "Laboratory safety goggles and lab coats mandatory for Monday practicals.",
      resourcesCount: 21,
    },
    {
      code: "BIO-201",
      name: "Biology",
      category: "Science Elective",
      teacher: "Mrs. Grace Okon",
      teacherEmail: "g.okon@riverside.edu",
      consultationHour: "Fridays 11:40 AM - 12:30 PM",
      room: "Bio Lab 1",
      periodsPerWeek: 4,
      schedule: "Mon 11:40 AM, Wed 09:30 AM, Fri 08:00 AM",
      syllabusProgress: 82,
      currentCA: 26,
      recommendedText: "Modern Biology for Senior Secondary Schools by Sarojini T. Ramalingam",
      courseOverview: "Cellular respiration, photosynthesis, genetics, Mendelian inheritance, ecological adaptations, and mammalian organ physiology.",
      learningObjectives: [
        "Demonstrate light reactions and Calvin cycle in photosynthesis",
        "Perform monohybrid and dihybrid genetic crosses using Punnett squares",
        "Dissect mammalian heart and examine coronary circulatory pathways",
        "Identify ecological sampling techniques using quadrats and transects",
      ],
      activeTopic: "Mendelian Genetics, DNA Structure & Inheritance Patterns",
      digitalClassroomUrl: "https://meet.google.com/bio-201-life",
      announcements: "Plant specimen collections due for inspection next Tuesday.",
      resourcesCount: 12,
    },
    {
      code: "ENG-201",
      name: "English Language & Oral Diction",
      category: "Core",
      teacher: "Mrs. K. Adeleke",
      teacherEmail: "k.adeleke@riverside.edu",
      consultationHour: "Wednesdays 01:00 - 02:00 PM",
      room: "Room 14",
      periodsPerWeek: 5,
      schedule: "Mon 08:45 AM, Tue 11:40 AM, Thu 08:45 AM, Fri 10:55 AM",
      syllabusProgress: 70,
      currentCA: 25,
      recommendedText: "Intensive English for Senior Secondary Schools",
      courseOverview: "Grammatical syntax, expository and argumentative essay structures, summary writing strategies, and phonological oral diction.",
      learningObjectives: [
        "Craft persuasive arguments with cohesive transitions and thesis clarity",
        "Master vowel phonemes, consonant clusters, and intonation stress patterns",
        "Extract core arguments in complex comprehension passages",
        "Write professional formal correspondence and official memoranda",
      ],
      activeTopic: "Expository Essay Composition & Rhetorical Devices",
      digitalClassroomUrl: "https://meet.google.com/eng-201-lit",
      announcements: "Term 2 speech competition preliminaries start next week.",
      resourcesCount: 15,
    },
    {
      code: "CSC-201",
      name: "Computer Science & Python Coding",
      category: "Science Elective",
      teacher: "Engr. Sam Bello",
      teacherEmail: "s.bello@riverside.edu",
      consultationHour: "Fridays 02:00 - 03:00 PM",
      room: "ICT Innovation Center",
      periodsPerWeek: 3,
      schedule: "Tue 09:30 AM, Fri 09:30 AM",
      syllabusProgress: 85,
      currentCA: 30,
      recommendedText: "Computer Studies for Senior Secondary Schools & Python Handbook",
      courseOverview: "Object-oriented programming in Python, algorithms, data structures (lists, dictionaries), computer network topologies, and web systems.",
      learningObjectives: [
        "Develop modular Python programs with classes, functions, and error handling",
        "Implement search and sort algorithms (Binary Search, Bubble Sort)",
        "Design relational database schemas and basic SQL queries",
        "Configure IPv4 addressing and network security protocols",
      ],
      activeTopic: "Python Object-Oriented Programming (Classes & Inheritance)",
      digitalClassroomUrl: "https://meet.google.com/csc-201-code",
      announcements: "Robotics club hackathon project submission portal is open.",
      resourcesCount: 24,
    },
    {
      code: "ECN-201",
      name: "Economics",
      category: "General Elective",
      teacher: "Mr. B. Adeleke",
      teacherEmail: "b.adeleke@riverside.edu",
      consultationHour: "Tuesdays 01:00 - 02:00 PM",
      room: "Room 14",
      periodsPerWeek: 3,
      schedule: "Wed 10:55 AM, Thu 11:40 AM",
      syllabusProgress: 68,
      currentCA: 25,
      recommendedText: "Comprehensive Economics for Senior Secondary Schools",
      courseOverview: "Micro and macroeconomic principles, market structures, price elasticity, national income accounting, and monetary policy mechanisms.",
      learningObjectives: [
        "Calculate price, income, and cross elasticity of demand",
        "Distinguish perfect competition, monopolies, and oligopoly market forms",
        "Calculate GDP, GNP, and Net National Product from macroeconomic tables",
        "Examine Central Bank monetary instruments and inflationary pressures",
      ],
      activeTopic: "Price Elasticity of Demand & Market Equilibrium Shifts",
      digitalClassroomUrl: "https://meet.google.com/ecn-201-econ",
      announcements: "Bring graphing calculators and rulers for Wednesday's session.",
      resourcesCount: 9,
    },
    {
      code: "CIV-201",
      name: "Civic Education",
      category: "Core",
      teacher: "Mr. E. Peters",
      teacherEmail: "e.peters@riverside.edu",
      consultationHour: "Thursdays 02:00 - 03:00 PM",
      room: "Room 14",
      periodsPerWeek: 2,
      schedule: "Mon 12:25 PM, Thu 12:25 PM",
      syllabusProgress: 85,
      currentCA: 27,
      recommendedText: "Essential Civic Education for Senior Secondary Schools",
      courseOverview: "Constitutional governance, fundamental human rights, rule of law, anti-corruption frameworks, and citizen civic responsibilities.",
      learningObjectives: [
        "Examine constitutional separation of powers (Executive, Legislature, Judiciary)",
        "Analyze the Universal Declaration of Human Rights and citizen recourse",
        "Assess community advocacy in anti-narcotics and traffic compliance",
        "Evaluate democratic voter franchise and electoral integrity",
      ],
      activeTopic: "Constitutional Governance & Fundamental Human Rights",
      digitalClassroomUrl: "https://meet.google.com/civ-201-gov",
      announcements: "Field trip to the High Court scheduled for late February.",
      resourcesCount: 8,
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
              <BookMarked className="size-4" />
              Student Portal · Academic Course Load
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Enrolled Subjects & Classes
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Grade 11 · Senior Secondary (SSS 2A) · 9 Registered WAEC / Cambridge Subjects
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Unified Curriculum Scheme of Work (PDF) downloaded successfully!")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="size-4" />
              Course Syllabus (PDF)
            </button>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by subject name, code, or teacher..."
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
              className="p-5 rounded-3xl bg-card border border-border shadow-xs hover:border-cyan-500/40 transition flex flex-col justify-between group"
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

                <h3 className="font-bold text-foreground text-base mb-1 group-hover:text-cyan-600 transition-colors">
                  {s.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <User className="size-3.5 text-cyan-600" />
                  <span>{s.teacher}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-3">
                  <MapPin className="size-3 text-cyan-600" />
                  <span>{s.room} · {s.schedule}</span>
                </div>

                {/* Active Topic Tag */}
                <div className="p-2.5 rounded-xl bg-canvas border border-border text-xs mb-3 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-cyan-600 tracking-wider">
                    Current Syllabus Topic
                  </div>
                  <div className="font-medium text-foreground line-clamp-1">
                    {s.activeTopic}
                  </div>
                </div>

                {/* Syllabus Coverage Bar */}
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
              </div>

              <div className="pt-4 border-t border-border mt-2 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Current CA</div>
                  <div className="text-base font-black text-emerald-600">{s.currentCA} / 30 pts</div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedSubject(s)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-canvas border border-border hover:bg-muted text-xs font-semibold text-foreground transition"
                  >
                    <Info className="size-3.5 text-cyan-600" />
                    Details
                  </button>
                  {s.digitalClassroomUrl && (
                    <button
                      onClick={() => alert(`Launching digital classroom space for ${s.name} (${s.digitalClassroomUrl})`)}
                      title="Launch Digital Classroom Space"
                      className="size-8 rounded-xl bg-cyan-600 text-white flex items-center justify-center hover:bg-cyan-700 transition shadow-xs"
                    >
                      <Video className="size-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Subject Modal */}
        {selectedSubject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-card border border-border rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between border-b border-border pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-800">
                      {selectedSubject.code}
                    </span>
                    <span className="text-xs text-muted-foreground">{selectedSubject.category}</span>
                  </div>
                  <h2 className="text-xl font-black text-foreground">{selectedSubject.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="size-8 rounded-xl hover:bg-muted flex items-center justify-center text-muted-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Teacher & Schedule Card */}
                <div className="p-4 rounded-2xl bg-canvas border border-border grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Subject Teacher</span>
                    <span className="font-bold text-foreground text-sm">{selectedSubject.teacher}</span>
                    <span className="text-[11px] text-cyan-600 block">{selectedSubject.teacherEmail}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Room & Consultation</span>
                    <span className="font-medium text-foreground">{selectedSubject.room}</span>
                    <span className="text-[11px] text-muted-foreground block">{selectedSubject.consultationHour}</span>
                  </div>
                </div>

                {/* Course Overview */}
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground text-xs uppercase tracking-wider text-cyan-600">
                    Course Description & Syllabus Scope
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedSubject.courseOverview}
                  </p>
                </div>

                {/* Learning Objectives */}
                <div className="space-y-1.5">
                  <h4 className="font-bold text-foreground text-xs uppercase tracking-wider text-cyan-600">
                    Term 2 Learning Objectives (SWBAT)
                  </h4>
                  <div className="space-y-1.5">
                    {selectedSubject.learningObjectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-2 text-foreground">
                        <CheckCircle2 className="size-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Text & Resources */}
                <div className="p-3.5 rounded-2xl bg-surface-raised border border-border space-y-1">
                  <span className="text-muted-foreground text-[11px] block">Prescribed Core Textbook</span>
                  <span className="font-semibold text-foreground italic">{selectedSubject.recommendedText}</span>
                </div>

                {/* Class Announcements */}
                {selectedSubject.announcements && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-ink-soft space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
                      <Megaphone className="size-3.5" />
                      <span>Class Announcement</span>
                    </div>
                    <p className="text-[11px]">{selectedSubject.announcements}</p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">
                  {selectedSubject.resourcesCount} Learning Materials Uploaded
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      alert(`Accessing course materials repository for ${selectedSubject.name}`);
                      setSelectedSubject(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-canvas border border-border hover:bg-muted text-xs font-medium text-foreground transition"
                  >
                    View Class Resources
                  </button>
                  <button
                    onClick={() => {
                      alert(`Launching virtual classroom video session for ${selectedSubject.name}`);
                      setSelectedSubject(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold shadow-sm transition"
                  >
                    Join Virtual Lab
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
