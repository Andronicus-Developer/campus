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
} from "lucide-react";

interface NoticeItem {
  id: string;
  category: "Academic" | "Clubs & Sports" | "Examinations" | "Notice";
  title: string;
  postedBy: string;
  date: string;
  isPinned?: boolean;
  content: string;
  hasAttachment?: boolean;
  saved?: boolean;
}

export default function StudentBulletinsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

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
              <Bell className="w-4 h-4" />
              Student Portal · Campus Community Bulletin
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              School Notices & Circulars
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Official school announcements, examination timetables, and extra-curricular fixtures.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Subscribed to instant push notifications for school circulars")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Megaphone className="w-4 h-4" />
              Notification Settings
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search circulars, events, examination dates..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-canvas border border-border focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </div>

          <div className="flex items-center gap-2 bg-canvas border border-border rounded-xl p-1 text-xs">
            {["all", "academic", "examinations", "sports"].map((cat) => (
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
              className={`p-6 rounded-2xl bg-card border transition shadow-xs ${
                item.isPinned ? "border-cyan-500/40 ring-1 ring-cyan-500/20" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {item.isPinned && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-cyan-600 text-white">
                      <Pin className="w-3 h-3" /> PINNED
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-canvas border border-border text-foreground">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>

                <button
                  onClick={() => toggleSave(item.id)}
                  title={item.saved ? "Remove bookmark" : "Save notice"}
                  className={`p-1.5 rounded-lg border border-border hover:bg-muted transition ${
                    item.saved ? "text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40" : "text-muted-foreground"
                  }`}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
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
                    <Download className="w-3.5 h-3.5" />
                    Download Attachment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
