"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Download,
  Users,
  CheckCircle2,
  Bell,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  day: string;
  time: string;
  location: string;
  category: "PTA Meeting" | "Examination" | "Visiting Day" | "Sports" | "Holiday";
  description: string;
  forParents: boolean;
  reminderSet?: boolean;
}

export default function ParentCalendarPage() {
  const [filter, setFilter] = useState("all");

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "ev-1",
      title: "Term 2 Parent-Teacher Association (PTA) General Assembly",
      date: "Saturday, Feb 7, 2026",
      day: "Feb 07",
      time: "10:00 AM - 01:00 PM",
      location: "Riverside School Main Auditorium & Zoom Stream",
      category: "PTA Meeting",
      description: "Discussion on school infrastructure projects, bus fleet upgrades, and election of parent arm representatives.",
      forParents: true,
      reminderSet: true,
    },
    {
      id: "ev-2",
      title: "Mid-Term Continuous Assessment Test Week",
      date: "Feb 16 - Feb 20, 2026",
      day: "Feb 16",
      time: "08:00 AM Daily",
      location: "All Classrooms",
      category: "Examination",
      description: "Formative mid-term examinations covering topics taught in Weeks 1 to 6.",
      forParents: false,
    },
    {
      id: "ev-3",
      title: "Senior Boarding House Parents' Visiting Sunday",
      date: "Sunday, Feb 22, 2026",
      day: "Feb 22",
      time: "01:00 PM - 05:30 PM",
      location: "Boarding Hall Lawns",
      category: "Visiting Day",
      description: "Open visitation for parents of residential boarding students. Refreshments and pastoral consultations.",
      forParents: true,
    },
    {
      id: "ev-4",
      title: "Annual Inter-House Track & Field Athletic Championship",
      date: "Friday, March 6, 2026",
      day: "Mar 06",
      time: "09:00 AM - 04:00 PM",
      location: "Main Sports Complex & Track",
      category: "Sports",
      description: "Grand athletic finale featuring all four school houses (Red, Blue, Yellow, Green) and parent sprint novelty race.",
      forParents: true,
    },
    {
      id: "ev-5",
      title: "Term 2 Final Promotion Examinations",
      date: "March 23 - April 3, 2026",
      day: "Mar 23",
      time: "08:30 AM Daily",
      location: "Examination Hall A & B",
      category: "Examination",
      description: "Comprehensive end-of-term examinations determining term average and promotion broadsheets.",
      forParents: false,
    },
  ]);

  const toggleReminder = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, reminderSet: !e.reminderSet } : e))
    );
  };

  const filtered = events.filter((e) => {
    if (filter === "parents") return e.forParents;
    if (filter === "exams") return e.category === "Examination";
    if (filter === "pta") return e.category === "PTA Meeting";
    return true;
  });

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <CalendarIcon className="w-4 h-4" />
              Family Portal · Academic Year Schedule
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              School Calendar & PTA Events
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Key school fixtures, examination schedules, visiting days, and PTA community assemblies.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Syncing school term calendar to Google / Apple Calendar")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              Sync to Calendar
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2 bg-canvas border border-border rounded-xl p-1 text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filter === "all" ? "bg-pink-600 text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilter("parents")}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filter === "parents" ? "bg-pink-600 text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Parent Required
            </button>
            <button
              onClick={() => setFilter("exams")}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filter === "exams" ? "bg-pink-600 text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Examinations
            </button>
            <button
              onClick={() => setFilter("pta")}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                filter === "pta" ? "bg-pink-600 text-white shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              PTA Meetings
            </button>
          </div>

          <span className="text-xs text-muted-foreground hidden sm:inline">
            Academic Year: <strong>2025/2026</strong>
          </span>
        </div>

        {/* Event Cards */}
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-card border border-border shadow-xs hover:border-pink-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-600 font-black text-center flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-xs uppercase leading-none font-bold">
                    {item.day.split(" ")[0]}
                  </span>
                  <span className="text-lg leading-tight">
                    {item.day.split(" ")[1]}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-canvas border border-border text-foreground">
                      {item.category}
                    </span>
                    {item.forParents && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-pink-50 dark:bg-pink-950/50 text-pink-600 border border-pink-200 dark:border-pink-800">
                        Parent Attendance
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-foreground mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl mb-2">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-pink-600" />
                      {item.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-pink-600" />
                      {item.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-end">
                <button
                  onClick={() => toggleReminder(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
                    item.reminderSet
                      ? "bg-pink-50 dark:bg-pink-950/50 text-pink-600 border-pink-200 dark:border-pink-800"
                      : "bg-canvas border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Bell className={`w-3.5 h-3.5 ${item.reminderSet ? "fill-current" : ""}`} />
                  {item.reminderSet ? "Reminder Set" : "Set Reminder"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
