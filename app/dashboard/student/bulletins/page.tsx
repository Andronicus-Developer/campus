"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Bell,
  Calendar,
  Download,
  Bookmark,
  Pin,
  Megaphone,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  MessageSquare,
  Send,
  ShieldCheck,
  ShieldAlert,
  User,
  Clock,
  ChevronRight,
} from "lucide-react";

interface NoticeItem {
  id: string;
  category: "Academic" | "Clubs & Sports" | "Examinations" | "Notice" | "Urgent Alert";
  title: string;
  postedBy: string;
  date: string;
  isPinned?: boolean;
  content: string;
  hasAttachment?: boolean;
  saved?: boolean;
}

interface TeacherThread {
  id: string;
  subject: string;
  teacher: string;
  topic: string;
  studentQuestion: string;
  askedAt: string;
  teacherReply?: string;
  repliedAt?: string;
  status: "answered" | "pending";
}

export default function StudentBulletinsPage() {
  const [activeTab, setActiveTab] = useState<"bulletins" | "qna">("bulletins");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [askModalOpen, setAskModalOpen] = useState(false);
  const [newQuestionSubject, setNewQuestionSubject] = useState("Further Mathematics");
  const [newQuestionTopic, setNewQuestionTopic] = useState("");
  const [newQuestionText, setNewQuestionText] = useState("");

  const [threads, setThreads] = useState<TeacherThread[]>([
    {
      id: "th-1",
      subject: "Further Mathematics",
      teacher: "Mr. David Alabi",
      topic: "Clarification on Cramer's Rule 3x3 Determinant Expansion",
      studentQuestion: "In problem 4b of Problem Set 4, do we calculate the determinant of the augmented matrix directly or use Sarrus rule for the 3x3 coefficients first?",
      askedAt: "Yesterday · 04:30 PM",
      teacherReply: "Great question, Tobi. Evaluate the coefficient matrix determinant |A| first using Sarrus rule or row reduction. If |A| ≠ 0, proceed to replace column 1, 2, and 3 respectively with the constant matrix D to compute Dx, Dy, and Dz.",
      repliedAt: "Yesterday · 06:15 PM",
      status: "answered",
    },
    {
      id: "th-2",
      subject: "Chemistry",
      teacher: "Dr. Peter Obi",
      topic: "Concordant Titration Indicator Blank Deduction",
      studentQuestion: "Dr. Obi, for our lab report resubmission, should we deduct the 0.05 cm³ indicator blank volume before or after averaging the concordant titres?",
      askedAt: "Today · 09:10 AM",
      status: "pending",
    },
  ]);

  const [notices, setNotices] = useState<NoticeItem[]>([
    {
      id: "not-1",
      category: "Academic",
      title: "Inter-School STEM Olympiad 2026 Finals Preparation",
      postedBy: "Dr. Evelyn Peters, Principal",
      date: "Today, 08:30 AM",
      isPinned: true,
      content: "Congratulations to our Senior Science Olympiad delegates (including Tobi Adeleke & Amina Yusuf) for qualifying for the National Round. Intensive clinic sessions will be hosted every Thursday at 3:30 PM in Physics Lab 2.",
      hasAttachment: true,
      saved: true,
    },
    {
      id: "not-urgent",
      category: "Urgent Alert",
      title: "Scheduled Physics Lab 2 Venue Relocation (Thursday Period 1)",
      postedBy: "Academic Scheduling Desk",
      date: "Today, 07:15 AM",
      isPinned: true,
      content: "Due to calibration of the optical spectrometers, Thursday Period 1 practicals will convene in Physics Lab 2 instead of the main lecture room. Bring your safety logbooks.",
      hasAttachment: false,
    },
    {
      id: "not-2",
      category: "Examinations",
      title: "Term 2 Mid-Term Examination Bell Schedule",
      postedBy: "Academic Examination Secretariat",
      date: "Yesterday, 02:15 PM",
      isPinned: true,
      content: "The Mid-Term assessment cycle begins on Monday, February 16, 2026. All students are expected to have completed CA1 and practical logbooks. Review timetable outlines on your student portal.",
      hasAttachment: true,
    },
    {
      id: "not-3",
      category: "Clubs & Sports",
      title: "Annual Inter-House Sports Track & Field Heats",
      postedBy: "Coach Dan (Sports Coordinator)",
      date: "Jan 22, 2026",
      content: "Inter-house athletic trials for Blue, Yellow, Green, and Red houses commence this Friday at 2:00 PM. Clean sports kits and running trainers are compulsory.",
      hasAttachment: false,
    },
    {
      id: "not-4",
      category: "Notice",
      title: "JETS & Robotics Club Hardware Exhibition",
      postedBy: "Engr. Sam Bello (Computer Studies)",
      date: "Jan 20, 2026",
      content: "Demonstration of student-engineered Arduino weather stations and line-following robots in the Assembly Hall this Wednesday during club hour.",
      hasAttachment: false,
    },
  ]);

  const toggleSave = (id: string) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, saved: !n.saved } : n))
    );
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionTopic.trim() || !newQuestionText.trim()) return;

    const teacherMap: Record<string, string> = {
      "Further Mathematics": "Mr. David Alabi",
      "Physics": "Mr. Chukwuma Eze",
      "Chemistry": "Dr. Peter Obi",
      "Biology": "Mrs. Grace Okon",
      "Computer Science": "Engr. Sam Bello",
      "English Language": "Mrs. K. Adeleke",
    };

    setThreads((prev) => [
      {
        id: `th-${Date.now()}`,
        subject: newQuestionSubject,
        teacher: teacherMap[newQuestionSubject] || "Faculty Instructor",
        topic: newQuestionTopic,
        studentQuestion: newQuestionText,
        askedAt: "Just now",
        status: "pending",
      },
      ...prev,
    ]);

    setNewQuestionTopic("");
    setNewQuestionText("");
    setAskModalOpen(false);
    alert("Your question has been sent to the teacher through the moderated school academic desk.");
  };

  const filtered = notices.filter((n) => {
    const matchesFilter = filter === "all" || n.category.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase()) ||
      n.postedBy.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <Bell className="size-4" />
              Student Portal · Campus Community Bulletin
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              School Notices & Teacher Desk
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Official school announcements, urgent alerts, and approved academic Q&A with subject teachers.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setAskModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <MessageSquare className="size-4" />
              Ask Teacher a Question
            </button>
          </div>
        </div>

        {/* Safeguarding & Communication Moderation Policy Notice */}
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs flex items-start gap-3">
          <ShieldCheck className="size-5 text-cyan-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-ink-soft">
            <span className="font-bold text-ink block">Approved Student-Faculty Academic Communications</span>
            <p>
              All academic inquiries and teacher replies are conducted strictly through school-approved channels.
              Communications are archived and subject to the Riverside College Academic Code of Conduct and Child Safeguarding Regulations.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("bulletins")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === "bulletins"
                ? "bg-cyan-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Megaphone className="size-4" />
            Circulars & Announcements
          </button>
          <button
            onClick={() => setActiveTab("qna")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === "qna"
                ? "bg-cyan-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <MessageSquare className="size-4" />
            Teacher Academic Q&A ({threads.length})
          </button>
        </div>

        {/* TAB 1: Bulletins & Notices */}
        {activeTab === "bulletins" && (
          <div className="space-y-4">
            {/* Filter Toolbar */}
            <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              <div className="flex-1 relative">
                <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search circulars, events, examination dates..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-canvas border border-border focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>

              <div className="flex items-center gap-2 bg-canvas border border-border rounded-xl p-1 text-xs">
                {["all", "academic", "examinations", "urgent alert", "sports"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg capitalize font-medium transition ${
                      filter === cat
                        ? "bg-cyan-600 text-white shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Notices List */}
            <div className="space-y-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className={`p-6 rounded-3xl bg-card border transition shadow-xs ${
                    item.category === "Urgent Alert"
                      ? "border-amber-500/40 ring-1 ring-amber-500/20 bg-amber-500/5"
                      : item.isPinned
                      ? "border-cyan-500/40 ring-1 ring-cyan-500/20"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.isPinned && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-cyan-600 text-white">
                          <Pin className="size-3" /> PINNED
                        </span>
                      )}
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                          item.category === "Urgent Alert"
                            ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                            : "bg-canvas border border-border text-foreground"
                        }`}
                      >
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>

                    <button
                      onClick={() => toggleSave(item.id)}
                      title={item.saved ? "Remove bookmark" : "Save notice"}
                      className={`p-1.5 rounded-xl border border-border hover:bg-muted transition ${
                        item.saved ? "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40" : "text-muted-foreground"
                      }`}
                    >
                      <Bookmark className="size-4 fill-current" />
                    </button>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                    {item.content}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Posted by {item.postedBy}</span>

                    {item.hasAttachment && (
                      <button
                        onClick={() => alert(`Downloading circular document for "${item.title}"`)}
                        className="inline-flex items-center gap-1.5 text-cyan-600 hover:underline font-semibold"
                      >
                        <Download className="size-3.5" />
                        Download Attachment
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Academic Teacher Q&A */}
        {activeTab === "qna" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-canvas border border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Ask specific questions about classroom lectures, homework assignments, or upcoming assessment topics.
              </span>
              <button
                onClick={() => setAskModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
              >
                + New Inquiry
              </button>
            </div>

            <div className="space-y-4">
              {threads.map((th) => (
                <div
                  key={th.id}
                  className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-800">
                        {th.subject}
                      </span>
                      <span className="text-xs font-semibold text-foreground">Teacher: {th.teacher}</span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        th.status === "answered"
                          ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
                          : "bg-amber-500/15 text-amber-600 border border-amber-500/30"
                      }`}
                    >
                      {th.status === "answered" ? "Answered" : "Awaiting Reply"}
                    </span>
                  </div>

                  {/* Student Question */}
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-foreground text-sm">{th.topic}</div>
                    <p className="text-muted-foreground leading-relaxed">{th.studentQuestion}</p>
                    <span className="text-[10px] font-mono text-muted-foreground block pt-1">
                      Asked by you · {th.askedAt}
                    </span>
                  </div>

                  {/* Teacher Reply (if available) */}
                  {th.teacherReply ? (
                    <div className="p-4 rounded-2xl bg-canvas border border-border text-xs space-y-1.5">
                      <div className="flex items-center gap-2 font-bold text-cyan-600 text-[11px]">
                        <User className="size-3.5" />
                        <span>Teacher Response — {th.teacher}</span>
                      </div>
                      <p className="text-foreground leading-relaxed italic">{th.teacherReply}</p>
                      <span className="text-[10px] font-mono text-muted-foreground block pt-0.5">
                        Received · {th.repliedAt}
                      </span>
                    </div>
                  ) : (
                    <div className="p-3 rounded-2xl bg-canvas/50 border border-dashed border-border text-xs text-muted-foreground italic">
                      Awaiting review by {th.teacher}. Faculty members usually respond within 24 hours.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ask Teacher Modal */}
        {askModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface border border-line rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="size-5 text-cyan-600" />
                  <h3 className="text-base font-extrabold text-ink">Ask Teacher an Academic Question</h3>
                </div>
                <button
                  onClick={() => setAskModalOpen(false)}
                  className="size-7 rounded-lg hover:bg-surface-raised flex items-center justify-center text-ink-muted"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                Inquiries are sent directly to your assigned subject teacher. Keep questions focused on academic subjects,
                assignment instructions, or syllabus topics.
              </p>

              <form onSubmit={handleAskSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-ink font-semibold mb-1">Subject & Instructor</label>
                  <select
                    value={newQuestionSubject}
                    onChange={(e) => setNewQuestionSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none"
                  >
                    <option value="Further Mathematics">Further Mathematics (Mr. David Alabi)</option>
                    <option value="Physics">Physics (Mr. Chukwuma Eze)</option>
                    <option value="Chemistry">Chemistry (Dr. Peter Obi)</option>
                    <option value="Biology">Biology (Mrs. Grace Okon)</option>
                    <option value="Computer Science">Computer Science (Engr. Sam Bello)</option>
                    <option value="English Language">English Language (Mrs. K. Adeleke)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-1">Question Topic / Subject Line</label>
                  <input
                    type="text"
                    required
                    value={newQuestionTopic}
                    onChange={(e) => setNewQuestionTopic(e.target.value)}
                    placeholder="e.g. Question regarding cofactor sign matrix in theorem 2"
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-1">Your Detailed Question</label>
                  <textarea
                    rows={4}
                    required
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Provide full details of your query or working steps..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setAskModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line hover:bg-surface-raised font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
                  >
                    Submit Question
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
