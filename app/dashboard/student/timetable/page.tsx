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
  AlertCircle,
  Bell,
  Plus,
  ShieldCheck,
  Tag,
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
  assignmentDue?: string;
  studentReminder?: string;
}

export default function StudentTimetablePage() {
  const [activeTab, setActiveTab] = useState<"weekly" | "exams" | "calendar">("weekly");
  const [selectedDay, setSelectedDay] = useState<"Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday">("Monday");
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [targetSlot, setTargetSlot] = useState<string>("");
  const [reminderNote, setReminderNote] = useState("");
  const [customReminders, setCustomReminders] = useState<Record<string, string>>({
    "Monday-Period 1": "Bring Further Maths Formula Sheet and Graph Book",
    "Thursday-Period 1": "Prepare Physics Practical logbook with observations table",
  });

  const timetableData: Record<string, TimetableSlot[]> = {
    Monday: [
      { period: 1, time: "08:00 - 08:45 AM", subject: "Further Mathematics", teacher: "Mr. David Alabi", room: "Room 14 (Science Wing)", category: "Science", currentTopic: "Matrices & Determinants", assignmentDue: "Problem Set 4" },
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
      { period: 5, time: "10:55 - 11:40 AM", subject: "Economics", teacher: "Mr. B. Adeleke", room: "Room 14", category: "Elective", currentTopic: "Elasticity of Demand & Supply" },
      { period: 6, time: "11:40 - 12:25 PM", subject: "English Language", teacher: "Mrs. K. Adeleke", room: "Room 14", category: "Core", currentTopic: "Expository Essay Writing" },
      { period: 7, time: "12:25 - 01:10 PM", subject: "Sports & Physical Education", teacher: "Coach Dan", room: "Sports Complex", category: "Elective", currentTopic: "Track & Field Relay" },
    ],
    Wednesday: [
      { period: 1, time: "08:00 - 08:45 AM", subject: "Chemistry Theory", teacher: "Dr. Peter Obi", room: "Room 14", category: "Science", currentTopic: "Periodic Table Trends" },
      { period: 2, time: "08:45 - 09:30 AM", subject: "Further Mathematics", teacher: "Mr. David Alabi", room: "Room 14", category: "Science", currentTopic: "Vectors in 3D Space" },
      { period: 3, time: "09:30 - 10:15 AM", subject: "Biology Lab", teacher: "Mrs. Grace Okon", room: "Bio Lab 1", category: "Science", currentTopic: "Microscopic Cell Structure" },
      { period: 4, time: "10:15 - 10:55 AM", subject: "Morning Recess", teacher: "Duty Staff", room: "Cafeteria", category: "Break" },
      { period: 5, time: "10:55 - 11:40 AM", subject: "Economics", teacher: "Mr. B. Adeleke", room: "Room 14", category: "Elective", currentTopic: "Elasticity of Demand" },
      { period: 6, time: "11:40 - 12:25 PM", subject: "Computer Science Lab", teacher: "Engr. Sam Bello", room: "ICT Center", category: "Elective", currentTopic: "OOP Python Exercises" },
      { period: 7, time: "12:25 - 01:10 PM", subject: "Library & Independent Study", teacher: "Chief Librarian", room: "Central Library", category: "Core", currentTopic: "Research & Assignment Prep" },
    ],
    Thursday: [
      { period: 1, time: "08:00 - 08:45 AM", subject: "Physics Practical", teacher: "Mr. Chukwuma Eze", room: "Physics Lab 2", category: "Science", currentTopic: "Ohm's Law Verification", assignmentDue: "Lab Observations" },
      { period: 2, time: "08:45 - 09:30 AM", subject: "English Literature", teacher: "Mrs. K. Adeleke", room: "Room 14", category: "Core", currentTopic: "Shakespeare Analysis" },
      { period: 3, time: "09:30 - 10:15 AM", subject: "General Mathematics", teacher: "Mr. David Alabi", room: "Room 14", category: "Core", currentTopic: "Logarithmic Functions" },
      { period: 4, time: "10:15 - 10:55 AM", subject: "Morning Recess", teacher: "Duty Staff", room: "Cafeteria", category: "Break" },
      { period: 5, time: "10:55 - 11:40 AM", subject: "Chemistry", teacher: "Dr. Peter Obi", room: "Room 14", category: "Science", currentTopic: "Chemical Equilibrium" },
      { period: 6, time: "11:40 - 12:25 PM", subject: "Economics", teacher: "Mr. B. Adeleke", room: "Room 14", category: "Elective", currentTopic: "Fiscal Policy Analysis" },
      { period: 7, time: "12:25 - 01:10 PM", subject: "Civic Education", teacher: "Mr. E. Peters", room: "Room 14", category: "Core", currentTopic: "Human Rights Charter" },
    ],
    Friday: [
      { period: 1, time: "08:00 - 08:45 AM", subject: "Biology", teacher: "Mrs. Grace Okon", room: "Bio Lab 1", category: "Science", currentTopic: "Genetics & Mendelian Ratios" },
      { period: 2, time: "08:45 - 09:30 AM", subject: "Further Mathematics", teacher: "Mr. David Alabi", room: "Room 14", category: "Science", currentTopic: "Differential Calculus Intro" },
      { period: 3, time: "09:30 - 10:15 AM", subject: "Computer Science", teacher: "Engr. Sam Bello", room: "ICT Center", category: "Elective", currentTopic: "Web Architecture Basics" },
      { period: 4, time: "10:15 - 10:55 AM", subject: "Morning Recess", teacher: "Duty Staff", room: "Cafeteria", category: "Break" },
      { period: 5, time: "10:55 - 11:40 AM", subject: "English Language", teacher: "Mrs. K. Adeleke", room: "Room 14", category: "Core", currentTopic: "Formal Letter Structure" },
      { period: 6, time: "11:40 - 12:25 PM", subject: "Clubs & Societies / JETS", teacher: "Faculty Mentors", room: "Assembly Hall", category: "Elective", currentTopic: "Robotics Drone Exhibition" },
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

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderNote.trim() || !targetSlot) return;
    setCustomReminders((prev) => ({
      ...prev,
      [targetSlot]: reminderNote,
    }));
    setReminderNote("");
    setReminderModalOpen(false);
    alert("Personal study reminder attached to your timetable view!");
  };

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <CalendarDays className="size-4" />
              Student Portal · Official Academic Schedule
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Timetable & Academic Calendar
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Grade 11 · Senior Secondary (SSS 2A Science Stream) · Term 2, 2025/2026
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Calendar synced! Timetable events added to device calendar via iCal export.")}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Calendar className="size-4 text-cyan-600" />
              Sync to Device
            </button>
            <button
              onClick={() => alert("Downloading official class timetable as PDF")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="size-4" />
              Download Timetable
            </button>
          </div>
        </div>

        {/* Timetable Change Notification Ticker */}
        <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Bell className="size-4 text-cyan-600 shrink-0" />
            <span className="text-foreground">
              <strong className="font-semibold text-cyan-700 dark:text-cyan-300">Timetable Notice:</strong>{" "}
              Period 1 on Thursday (Physics Practical) will convene at Physics Lab 2 for the potentiometer verification experiment.
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground shrink-0 hidden sm:inline">
            Updated Today, 07:15 AM
          </span>
        </div>

        {/* Multi-View Tabs */}
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("weekly")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === "weekly"
                ? "bg-cyan-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <CalendarDays className="size-4" />
            Class Periods & Timetable
          </button>
          <button
            onClick={() => setActiveTab("exams")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === "exams"
                ? "bg-cyan-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <CheckCircle2 className="size-4" />
            Examination Schedules
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === "calendar"
                ? "bg-cyan-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Calendar className="size-4" />
            Term Calendar & Holidays
          </button>
        </div>

        {/* TAB 1: Weekly Class Timetable */}
        {activeTab === "weekly" && (
          <div className="space-y-6">
            {/* Live Period Banner */}
            <div className="p-4 rounded-3xl bg-gradient-to-r from-cyan-600/15 via-blue-600/10 to-transparent border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-cyan-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  P3
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                      Currently In Session · Monday
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
                <Clock className="size-3.5 text-cyan-600" />
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
              {timetableData[selectedDay].map((slot) => {
                const reminderKey = `${selectedDay}-Period ${slot.period}`;
                const hasReminder = customReminders[reminderKey];

                return (
                  <div
                    key={slot.period}
                    className={`p-4 rounded-3xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      slot.isCurrent
                        ? "bg-cyan-500/10 border-cyan-500/40 ring-1 ring-cyan-500/30"
                        : slot.category === "Break"
                        ? "bg-canvas/50 border-dashed border-border"
                        : "bg-card border-border hover:border-cyan-500/30"
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div
                        className={`size-12 rounded-2xl flex flex-col items-center justify-center font-black text-sm flex-shrink-0 ${
                          slot.isCurrent
                            ? "bg-cyan-600 text-white shadow-sm"
                            : slot.category === "Break"
                            ? "bg-muted text-muted-foreground"
                            : "bg-canvas border border-border text-foreground"
                        }`}
                      >
                        <span className="text-[10px] font-medium leading-none text-muted-foreground">P</span>
                        <span>{slot.period}</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono font-semibold text-muted-foreground flex items-center gap-1">
                            <Clock className="size-3 text-cyan-600" />
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
                          {slot.assignmentDue && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-600 border border-amber-500/30">
                              Due: {slot.assignmentDue}
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-foreground text-sm sm:text-base">
                          {slot.subject}
                        </h3>

                        {slot.currentTopic && (
                          <p className="text-xs text-muted-foreground">
                            Topic: <span className="text-foreground font-medium">{slot.currentTopic}</span>
                          </p>
                        )}

                        {hasReminder && (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary-light/40 border border-primary/20 text-primary text-[11px] font-medium">
                            <Tag className="size-3" />
                            <span>My Reminder: {hasReminder}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground self-start sm:self-auto border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="space-y-0.5 text-right sm:text-left">
                        <div className="flex items-center gap-1.5">
                          <User className="size-3.5 text-cyan-600" />
                          <span>{slot.teacher}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="size-3.5 text-cyan-600" />
                          <span className="font-medium text-foreground">{slot.room}</span>
                        </div>
                      </div>

                      {slot.category !== "Break" && (
                        <button
                          onClick={() => {
                            setTargetSlot(reminderKey);
                            setReminderModalOpen(true);
                          }}
                          title="Add personal study reminder"
                          className="px-2.5 py-1.5 rounded-xl border border-border hover:bg-muted text-foreground text-xs font-medium transition"
                        >
                          + Reminder
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Examination Schedule */}
        {activeTab === "exams" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-purple-700 dark:text-purple-300">Term 2 Mid-Term Examination Cycle</span>
                <p className="text-muted-foreground">Examination Hall assignments are strictly strictly monitored. Candidate desk slips will be issued on Friday.</p>
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-purple-600 text-white">Starts Feb 16</span>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold">
                  <tr>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Subject & Code</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Venue</th>
                    <th className="py-3 px-4">Invigilator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { date: "Mon, Feb 16 · 09:00 AM", subject: "Further Mathematics (FMTH-201)", duration: "2 Hours", venue: "Examination Hall B (Desk 42)", invigilator: "Mr. Chukwuma Eze" },
                    { date: "Tue, Feb 17 · 09:00 AM", subject: "English Language (ENG-201)", duration: "2.5 Hours", venue: "Examination Hall B (Desk 42)", invigilator: "Mrs. N. Okeke" },
                    { date: "Wed, Feb 18 · 09:00 AM", subject: "Chemistry Theory & Practical (CHM-201)", duration: "2.5 Hours", venue: "Chemistry Lab A", invigilator: "Dr. Peter Obi" },
                    { date: "Thu, Feb 19 · 09:00 AM", subject: "Physics Theory (PHY-201)", duration: "2 Hours", venue: "Examination Hall B (Desk 42)", invigilator: "Mr. David Alabi" },
                    { date: "Fri, Feb 20 · 09:00 AM", subject: "Biology Theory (BIO-201)", duration: "2 Hours", venue: "Examination Hall B (Desk 42)", invigilator: "Mrs. Grace Okon" },
                    { date: "Mon, Feb 23 · 09:00 AM", subject: "Computer Studies Practical (CSC-201)", duration: "1.5 Hours", venue: "ICT Center 1", invigilator: "Engr. Sam Bello" },
                  ].map((ex, i) => (
                    <tr key={i} className="hover:bg-canvas/50 transition">
                      <td className="py-3.5 px-4 font-mono font-semibold text-foreground">{ex.date}</td>
                      <td className="py-3.5 px-4 font-bold text-foreground">{ex.subject}</td>
                      <td className="py-3.5 px-4 text-muted-foreground">{ex.duration}</td>
                      <td className="py-3.5 px-4 font-medium text-cyan-600">{ex.venue}</td>
                      <td className="py-3.5 px-4 text-muted-foreground">{ex.invigilator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Academic Term Calendar & Holidays */}
        {activeTab === "calendar" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Mid-Term Assessment Week", date: "Feb 16 - Feb 23, 2026", type: "Examination", badge: "Academic" },
                { title: "Mid-Term Open Day & PTA Consultations", date: "Friday, Feb 27, 2026", type: "Parent Conference", badge: "School Wide" },
                { title: "Mid-Term Break (No Classes)", date: "March 2 - March 4, 2026", type: "School Holiday", badge: "Holiday" },
                { title: "Annual Inter-House Sports Athletics Day", date: "Friday, March 13, 2026", type: "Extra-Curricular", badge: "Sports" },
                { title: "National STEM Exhibition & Robotics Fair", date: "March 20, 2026", type: "Symposium", badge: "Special Event" },
                { title: "End of Term Examinations", date: "April 6 - April 17, 2026", type: "Terminal Exams", badge: "Mandatory" },
                { title: "Easter Public Holiday", date: "April 3 - April 6, 2026", type: "Statutory Holiday", badge: "Holiday" },
                { title: "Report Card Release & Speech Day", date: "Friday, April 24, 2026", type: "Terminal Sign-Off", badge: "Closing" },
              ].map((ev, i) => (
                <div key={i} className="p-4 rounded-2xl bg-card border border-border shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 px-2 py-0.5 rounded-md bg-canvas border border-border">
                      {ev.badge}
                    </span>
                    <span className="text-xs font-mono font-medium text-muted-foreground">{ev.type}</span>
                  </div>
                  <h4 className="font-bold text-foreground text-sm">{ev.title}</h4>
                  <div className="text-xs font-mono font-semibold text-foreground flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-cyan-600" />
                    {ev.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Personal Study Reminder Modal */}
        {reminderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface border border-line rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <Tag className="size-5 text-cyan-600" />
                  <h3 className="text-base font-extrabold text-ink">Add Personal Timetable Reminder</h3>
                </div>
                <button
                  onClick={() => setReminderModalOpen(false)}
                  className="size-7 rounded-lg hover:bg-surface-raised flex items-center justify-center text-ink-muted"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                Add a private study reminder or preparation checklist for <strong>{targetSlot}</strong>.
                This does not modify the school&apos;s official timetable.
              </p>

              <form onSubmit={handleAddReminder} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-ink font-semibold mb-1">Reminder Note / Checklist</label>
                  <input
                    type="text"
                    required
                    value={reminderNote}
                    onChange={(e) => setReminderNote(e.target.value)}
                    placeholder="e.g. Bring lab coat, submit assignment draft, review theorem 4"
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReminderModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line hover:bg-surface-raised font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
                  >
                    Save Reminder
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
