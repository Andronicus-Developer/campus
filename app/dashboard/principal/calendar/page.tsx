"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  AlertTriangle,
  Award,
  BookOpen,
  Calendar,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  GraduationCap,
  MapPin,
  Megaphone,
  PlusCircle,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

interface SchoolEvent {
  id: string;
  title: string;
  category: "academic" | "meeting" | "examination" | "co-curricular";
  date: string;
  time: string;
  venue: string;
  leadCoordinator: string;
  description: string;
  status: "approved" | "pending";
  publishedToParents: boolean;
}

const INITIAL_EVENTS: SchoolEvent[] = [
  {
    id: "evt-1",
    title: "Terminal Academic Open Day & PTA General Assembly",
    category: "meeting",
    date: "Saturday, Feb 28, 2026",
    time: "10:00 AM - 03:00 PM",
    venue: "Main Auditorium & Classrooms",
    leadCoordinator: "Mr. David Alabi (VP Academics)",
    description: "Parents meet Form Masters and subject teachers to review continuous assessment broadsheets.",
    status: "approved",
    publishedToParents: true,
  },
  {
    id: "evt-2",
    title: "Senior WAEC Practical Simulation Mock (Chemistry & Physics)",
    category: "examination",
    date: "March 03 - March 06, 2026",
    time: "08:30 AM - 02:00 PM",
    venue: "Science Labs 1 & 2",
    leadCoordinator: "Dr. Kenneth Obi (HOD Sciences)",
    description: "Full-scale practical simulation with external WAEC certified invigilation guidelines.",
    status: "approved",
    publishedToParents: true,
  },
  {
    id: "evt-3",
    title: "Inter-House Sports Athletics Championship",
    category: "co-curricular",
    date: "Friday, March 13, 2026",
    time: "09:00 AM - 04:30 PM",
    venue: "Main Athletics Field & Pavilion",
    leadCoordinator: "Mr. Kenneth Adeleke (Sports Master)",
    description: "Annual sports day across Red, Blue, Green, and Gold houses with invited sister schools.",
    status: "pending",
    publishedToParents: false,
  },
  {
    id: "evt-4",
    title: "All-Faculty Academic Review & Moderation Meeting",
    category: "meeting",
    date: "Monday, March 16, 2026",
    time: "03:30 PM - 05:00 PM",
    venue: "Staff Common Room",
    leadCoordinator: "Dr. Evelyn Peters (Principal)",
    description: "Departmental review of mock results and final preparations for promotion broadsheets.",
    status: "approved",
    publishedToParents: false,
  },
];

export default function PrincipalCalendarPage() {
  const [events, setEvents] = useState<SchoolEvent[]>(INITIAL_EVENTS);
  const [filter, setFilter] = useState<string>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleApproveEvent = (id: string, title: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "approved", publishedToParents: true } : e))
    );
    showToast(`Event approved: "${title}" is now added to the master calendar and published to parents.`);
  };

  return (
    <DashboardLayout currentRole="principal">
      <div className="space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950 px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in slide-in-from-top-3">
            <CheckCircle2 className="size-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                  Section K · School Events &amp; Academic Calendar
                </span>
                <span className="font-mono text-xs text-ink-muted">Term 2 · Week 8 of 12</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Master Institutional Calendar</h2>
              <p className="text-xs text-ink-muted max-w-3xl">
                Coordinate and approve major academic events, faculty meetings, mock examinations, and co-curricular festivals with automatic portal synchronization to parents and students.
              </p>
            </div>

            <button
              type="button"
              onClick={() => alert("Creating new institutional event")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-primary-hover active:scale-95"
            >
              <PlusCircle className="size-4" />
              <span>Schedule New Event</span>
            </button>
          </div>

          {/* Quick Filters */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4 text-xs font-semibold">
            {["all", "academic", "examination", "meeting", "co-curricular"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-xl px-3 py-1.5 capitalize transition-all ${
                  filter === cat
                    ? "bg-primary text-white shadow-sm font-bold"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Term 2 Week Progression Tracker */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-ink">Term 2 Timeline (Jan 12 — April 10, 2026)</span>
            <span className="font-mono text-primary font-bold">Week 8 of 12 (66% Elapsed)</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-surface-raised overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" style={{ width: "66.6%" }} />
          </div>
          <div className="flex items-center justify-between text-[11px] text-ink-muted font-mono pt-1">
            <span>Resumption</span>
            <span>Mid-Term Break (Week 6)</span>
            <span className="text-primary font-bold">Current (Week 8)</span>
            <span>Mock Exams (Week 10)</span>
            <span>Vacation</span>
          </div>
        </div>

        {/* Events List */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
          <div className="border-b border-line pb-4 flex items-center justify-between">
            <h3 className="text-base font-extrabold text-ink">Upcoming Institutional Dates &amp; Events</h3>
            <span className="font-mono text-xs text-ink-muted">{events.length} Scheduled</span>
          </div>

          <div className="space-y-3">
            {events
              .filter((e) => filter === "all" || e.category === filter)
              .map((evt) => (
                <div
                  key={evt.id}
                  className="rounded-2xl border border-line bg-surface-raised p-5 space-y-3 transition-all hover:border-primary/40"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                            evt.category === "examination"
                              ? "bg-rose-100 text-rose-800"
                              : evt.category === "meeting"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {evt.category}
                        </span>
                        <span className="font-mono font-bold text-ink">{evt.date}</span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-ink-muted">{evt.time}</span>
                      </div>

                      <h4 className="text-base font-bold text-ink">{evt.title}</h4>
                      <p className="text-ink-soft">{evt.description}</p>

                      <div className="pt-1 flex flex-wrap items-center gap-4 text-ink-muted font-mono text-[11px]">
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3 text-primary" />
                          <span>Venue: <strong>{evt.venue}</strong></span>
                        </span>
                        <span>Coordinator: <strong>{evt.leadCoordinator}</strong></span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right space-y-2">
                      {evt.status === "approved" ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-success-light px-3.5 py-1.5 font-mono text-xs font-bold text-success-deep">
                            <CheckCircle2 className="size-4" />
                            Approved &amp; Live
                          </span>
                          <span className="block text-[10px] font-mono text-ink-muted">
                            Visible to all portals
                          </span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApproveEvent(evt.id, evt.title)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
                        >
                          <CheckCircle2 className="size-3.5" />
                          <span>Approve Event</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
