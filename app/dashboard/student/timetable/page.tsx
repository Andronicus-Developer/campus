"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Download,
  Calendar,
  Sparkles,
  BookOpen,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface TimetableSlot {
  period: number;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  category: "Science" | "Core" | "Elective" | "Break";
  currentTopic?: string;
  isCurrent?: boolean;
}

export default function StudentTimetablePage() {
  const [selectedDay, setSelectedDay] = useState<"Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday">("Monday");

  const timetableData: Record<string, TimetableSlot[]> = {
    Monday: [
      { period: 1, time: "08:00 - 08:45 AM", subject: "Further Mathematics", teacher: "Mr. David Alabi", room: "Room 14 (Science Wing)", category: "Science", currentTopic: "Matrices & Determinants" },
      { period: 2, time: "08:45 - 09:30 AM", subject: "English Language & Literature", teacher: "Mrs. K. Adeleke", room: "Room 14 (Science Wing)", category: "Core", currentTopic: "Oral Poetry & Phonetics" },
      { period: 3, time: "09:30 - 10:15 AM", subject: "Chemistry (Practical Lab)", teacher: "Dr. Peter Obi", room: "Chemistry Lab A", category: "Science", currentTopic: "Acid-Base Titration Techniques", isCurrent: true },
      { period: 4, time: "10:15 - 10:55 AM", subject: "Morning Recess & Snack", teacher: "Duty Staff", room: "School Cafeteria", category: "Break" },
      { period: 5, time: "10:55 - 11:40 AM", subject: "Physics", teacher: "Mr. Chukwuma Eze", room: "Physics Lab 2", category: "Science", currentTopic: "Electromagnetism & Faraday Laws" },
      { period: 6, time: "11:40 - 12:25 PM", subject: "Biology", teacher: "Mrs. Grace Okon", room: "Bio Lab 1", category: "Science", currentTopic: "Photosynthesis & Cellular Respiration" },
      { period: 7, time: "12:25 - 01:10 PM", subject: "Civic Education", teacher: "Mr. E. Peters", room: "Room 14", category: "Core", currentTopic: "Democratic Governance" },
    ],
    Tuesday: [
      { period: 1, time: "08:00 - 08:45 AM", subject: "General Mathematics", teacher: "Mr. David Alabi", room: "Room 14", category: "Core", currentTopic: "Quadratic Graphs" },
      { period: 2, time: "08:45 - 09:30 AM", subject: "Physics", teacher: "Mr. Chukwuma Eze", room: "Physics Lab 2", category: "Science", currentTopic: "Simple Harmonic Motion" },
      { period: 3, time: "09:30 - 10:15 AM", subject: "Computer Science & Coding", teacher: "Engr. Sam Bello", room: "ICT Innovation Center", category: "Elective", currentTopic: "Python Algorithms & Data Types" },
      { period: 4, time: "10:15 - 10:55 AM", subject: "Morning Recess", teacher: "Duty Staff", room: "Cafeteria", category: "Break" },
      { period: 5, time: "10:55 - 11:40 AM", subject: "Technical Drawing", teacher: "Arch. Tony Musa", room: "Design Studio", category: "Elective", currentTopic: "Isometric Projection" },
      { period: 6, time: "11:40 - 12:25 PM", subject: "English Language", teacher: "Mrs. K. Adeleke", room: "Room 14", category: "Core", currentTopic: "Expository Essay Writing" },
      { period: 7, time: "12:25 - 01:10 PM", subject: "Sports & Physical Education", teacher: "Coach Dan", room: "Sports Complex", category: "Elective", currentTopic: "Track & Field Relay" },
    ],
    Wednesday: [
      { period: 1, time: "08:00 - 08:45 AM", subject: "Chemistry Theory", teacher: "Dr. Peter Obi", room: "Room 14", category: "Science", currentTopic: "Periodic Table Periodic Trends" },
      { period: 2, time: "08:45 - 09:30 AM", subject: "Further Mathematics", teacher: "Mr. David Alabi", room: "Room 14", category: "Science", currentTopic: "Vectors in 3-Dimensional Space" },
      { period: 3, time: "09:30 - 10:15 AM", subject: "Biology Lab", teacher: "Mrs. Grace Okon", room: "Bio Lab 1", category: "Science", currentTopic: "Microscopic Cell Structure" },
      { period: 4, time: "10:15 - 10:55 AM", subject: "Morning Recess", teacher: "Duty Staff", room: "Cafeteria", category: "Break" },
      { period: 5, time: "10:55 - 11:40 AM", subject: "Economics", teacher: "Mr. B. Adeleke", room: "Room 14", category: "Elective", currentTopic: "Elasticity of Demand & Supply" },
      { period: 6, time: "11:40 - 12:25 PM", subject: "Agricultural Science", teacher: "Mr. Moses K.", room: "School Farm Hub", category: "Science", currentTopic: "Crop Propagation Methods" },
      { period: 7, time: "12:25 - 01:10 PM", subject: "Library & Independent Study", teacher: "Chief Librarian", room: "Central Library", category: "Core", currentTopic: "Research & Assignment Prep" },
    ],
    Thursday: [
      { period: 1, time: "08:00 - 08:45 AM", subject: "Physics Practical", teacher: "Mr. Chukwuma Eze", room: "Physics Lab 2", category: "Science", currentTopic: "Ohm's Law Verification" },
      { period: 2, time: "08:45 - 09:30 AM", subject: "English Literature", teacher: "Mrs. K. Adeleke", room: "Room 14", category: "Core", currentTopic: "Shakespeare Analysis" },
      { period: 3, time: "09:30 - 10:15 AM", subject: "General Mathematics", teacher: "Mr. David Alabi", room: "Room 14", category: "Core", currentTopic: "Logarithmic Functions" },
      { period: 4, time: "10:15 - 10:55 AM", subject: "Morning Recess", teacher: "Duty Staff", room: "Cafeteria", category: "Break" },
      { period: 5, time: "10:55 - 11:40 AM", subject: "Chemistry", teacher: "Dr. Peter Obi", room: "Room 14", category: "Science", currentTopic: "Chemical Equilibrium" },
      { period: 6, time: "11:40 - 12:25 PM", subject: "French Language", teacher: "Mme. Claire", room: "Language Lab", category: "Elective", currentTopic: "Conversational Grammar" },
      { period: 7, time: "12:25 - 01:10 PM", subject: "Civic Education", teacher: "Mr. E. Peters", room: "Room 14", category: "Core", currentTopic: "Human Rights Charter" },
    ],
    Friday: [
      { period: 1, time: "08:00 - 08:45 AM", subject: "Biology", teacher: "Mrs. Grace Okon", room: "Bio Lab 1", category: "Science", currentTopic: "Genetics & Mendelian Ratios" },
      { period: 2, time: "08:45 - 09:30 AM", subject: "Further Mathematics", teacher: "Mr. David Alabi", room: "Room 14", category: "Science", currentTopic: "Differential Calculus Intro" },
      { period: 3, time: "09:30 - 10:15 AM", subject: "Computer Science", teacher: "Engr. Sam Bello", room: "ICT Center", category: "Elective", currentTopic: "Web Architecture Basics" },
      { period: 4, time: "10:15 - 10:55 AM", subject: "Morning Recess", teacher: "Duty Staff", room: "Cafeteria", category: "Break" },
      { period: 5, time: "10:55 - 11:40 AM", subject: "English Language", teacher: "Mrs. K. Adeleke", room: "Room 14", category: "Core", currentTopic: "Formal Letter Structure" },
      { period: 6, time: "11:40 - 12:25 PM", subject: "Clubs & Societies / JETS Club", teacher: "Faculty Mentors", room: "Assembly Hall", category: "Elective", currentTopic: "Robotics Drone Exhibition" },
      { period: 7, time: "12:25 - 01:10 PM", subject: "Form Teacher Pastoral Check-in", teacher: "Mr. David Alabi", room: "Room 14", category: "Core", currentTopic: "Weekly Progress Review" },
    ],
  };

  const days: ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday")[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <CalendarDays className="w-4 h-4" />
              Student Portal · Academic Schedule
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Class Timetable & Periods
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Grade 11 · Senior Secondary (SSS 2A Science Stream) · Term 2, 2025/2026
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Calendar synced! Timetable events added to device calendar.")}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Calendar className="w-4 h-4 text-cyan-600" />
              Sync to Calendar
            </button>
            <button
              onClick={() => alert("Downloading official class timetable as PDF")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              Download Timetable
            </button>
          </div>
        </div>

        {/* Live Period Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-600/15 via-blue-600/10 to-transparent border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              P3
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                  Currently In Session
                </span>
              </div>
              <h3 className="font-bold text-foreground text-sm sm:text-base">
                Chemistry (Practical Lab) · Acid-Base Titration
              </h3>
              <p className="text-xs text-muted-foreground">
                Dr. Peter Obi · Chemistry Lab A · Ends at 10:15 AM
              </p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground flex items-center gap-1.5 self-start sm:self-auto bg-card border border-border px-3 py-1.5 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-cyan-600" />
            Next: Morning Recess (10:15 AM)
          </div>
        </div>

        {/* Day Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex-shrink-0 ${
                selectedDay === day
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Period Cards List for Selected Day */}
        <div className="space-y-3">
          {timetableData[selectedDay].map((slot) => (
            <div
              key={slot.period}
              className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                slot.isCurrent
                  ? "bg-cyan-500/10 border-cyan-500/40 ring-1 ring-cyan-500/30"
                  : slot.category === "Break"
                  ? "bg-canvas/50 border-dashed border-border"
                  : "bg-card border-border hover:border-cyan-500/30"
              }`}
            >
              <div className="flex items-start sm:items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-black text-sm flex-shrink-0 ${
                    slot.isCurrent
                      ? "bg-cyan-600 text-white shadow-sm"
                      : slot.category === "Break"
                      ? "bg-muted text-muted-foreground"
                      : "bg-canvas border border-border text-foreground"
                  }`}
                >
                  <span className="text-[10px] font-medium leading-none text-muted-foreground">Period</span>
                  <span>{slot.period}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-mono font-semibold text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-600" />
                      {slot.time}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        slot.category === "Science"
                          ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200 dark:border-blue-800"
                          : slot.category === "Core"
                          ? "bg-purple-50 dark:bg-purple-950/50 text-purple-600 border border-purple-200 dark:border-purple-800"
                          : slot.category === "Break"
                          ? "bg-amber-50 dark:bg-amber-950/50 text-amber-600"
                          : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                      }`}
                    >
                      {slot.category}
                    </span>
                    {slot.isCurrent && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white">
                        ACTIVE NOW
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-foreground text-sm sm:text-base">
                    {slot.subject}
                  </h3>

                  {slot.currentTopic && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Topic: <span className="text-foreground font-medium">{slot.currentTopic}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground self-start sm:self-auto border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{slot.teacher}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                  <span className="font-medium text-foreground">{slot.room}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
