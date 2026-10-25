"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Activity,
  Users,
  Trophy,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Plus,
  Sparkles,
  Award,
  ChevronRight,
  ShieldCheck,
  Megaphone,
} from "lucide-react";

interface ActivityItem {
  id: string;
  name: string;
  category: "STEM & Tech" | "Sports & Athletics" | "Arts & Culture" | "Civic & Leadership";
  coordinator: string;
  meetingTime: string;
  venue: string;
  description: string;
  status: "Joined" | "Available";
  membersCount: number;
  upcomingEvent?: string;
  eventDate?: string;
}

export default function StudentActivitiesPage() {
  const [filter, setFilter] = useState("all");
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: "act-1",
      name: "JETS & Robotics Innovation Society",
      category: "STEM & Tech",
      coordinator: "Engr. Sam Bello (Computer Studies)",
      meetingTime: "Wednesdays · 03:00 - 04:30 PM",
      venue: "ICT Innovation Center",
      description: "Student engineering society focusing on Arduino microcontrollers, automated drone piloting, and preparation for the National Science Olympiad.",
      status: "Joined",
      membersCount: 28,
      upcomingEvent: "Annual Robotics Hardware Showcase",
      eventDate: "March 20, 2026",
    },
    {
      id: "act-2",
      name: "Red Coral House Athletics Team (Senior Track & Field)",
      category: "Sports & Athletics",
      coordinator: "Coach Dan & Mrs. N. Okeke",
      meetingTime: "Fridays · 02:00 - 04:00 PM",
      venue: "Main Sports Complex & Athletics Track",
      description: "Official inter-house sports team representing Red Coral House in sprint relays (4x100m, 4x400m), long jump, and track trials.",
      status: "Joined",
      membersCount: 42,
      upcomingEvent: "Inter-House Athletics Finals",
      eventDate: "March 13, 2026",
    },
    {
      id: "act-3",
      name: "Debate & Literary Society",
      category: "Arts & Culture",
      coordinator: "Mrs. K. Adeleke (English & Literature)",
      meetingTime: "Tuesdays · 03:00 - 04:15 PM",
      venue: "Room 14 (Science Wing)",
      description: "Competitive Oxford and Parliamentary style debate training, public speaking tournaments, and essay writing competitions.",
      status: "Available",
      membersCount: 24,
      upcomingEvent: "Inter-School Invitational Debate",
      eventDate: "Feb 26, 2026",
    },
    {
      id: "act-4",
      name: "Riverside Chess & Tactical Strategy Club",
      category: "STEM & Tech",
      coordinator: "Mr. David Alabi (Mathematics)",
      meetingTime: "Mondays · 03:00 - 04:00 PM",
      venue: "Central Library Chess Nook",
      description: "FIDE rating strategy analysis, endgame puzzles, blitz tournaments, and inter-collegiate chess championships.",
      status: "Available",
      membersCount: 18,
      upcomingEvent: "Lagos State Junior Chess Open",
      eventDate: "April 04, 2026",
    },
    {
      id: "act-5",
      name: "Red Cross & Campus First Aid Cadets",
      category: "Civic & Leadership",
      coordinator: "Staff Nurse O. Williams (School Clinic)",
      meetingTime: "Thursdays · 03:00 - 04:00 PM",
      venue: "School Clinic Conference Room",
      description: "Practical emergency first aid certification, CPR training, community blood donation drives, and disaster preparedness.",
      status: "Available",
      membersCount: 30,
      upcomingEvent: "Cadet Field First Aid Drill",
      eventDate: "March 05, 2026",
    },
  ]);

  const handleJoin = (act: ActivityItem) => {
    setSelectedActivity(act);
    setJoinModalOpen(true);
  };

  const confirmJoin = () => {
    if (!selectedActivity) return;
    setActivities((prev) =>
      prev.map((a) => (a.id === selectedActivity.id ? { ...a, status: "Joined" as const } : a))
    );
    setJoinModalOpen(false);
    alert(`Registration submitted for ${selectedActivity.name}! A consent notification has been forwarded to your registered guardian.`);
  };

  const filtered = activities.filter(
    (a) => filter === "all" || (filter === "joined" && a.status === "Joined") || a.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <Activity className="size-4" />
              Student Portal · Co-Curricular & Campus Life
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              School Activities, Clubs & Athletics
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Extracurricular societies, athletics teams, house sports fixtures, and leadership development.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-mono text-xs font-bold">
              2 Active Memberships
            </span>
          </div>
        </div>

        {/* Safeguards / Parental Consent Banner */}
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs flex items-start gap-3">
          <ShieldCheck className="size-5 text-cyan-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-ink-soft">
            <span className="font-bold text-ink block">Extracurricular Participation & Consent Policy</span>
            <p>
              Joining high-exertion athletic teams or after-school travel societies requires active guardian consent
              registered via the Parent Portal. All clubs operate under faculty mentorship in designated campus venues.
            </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { key: "all", label: "All Activities" },
            { key: "joined", label: "My Enrolled Clubs (2)" },
            { key: "stem & tech", label: "STEM & Tech" },
            { key: "sports & athletics", label: "Sports & Athletics" },
            { key: "arts & culture", label: "Arts & Culture" },
            { key: "civic & leadership", label: "Civic & Leadership" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3.5 py-2 rounded-xl font-medium transition flex-shrink-0 ${
                filter === tab.key
                  ? "bg-cyan-600 text-white shadow-xs font-bold"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((act) => (
            <div
              key={act.id}
              className={`p-6 rounded-3xl bg-card border transition shadow-xs flex flex-col justify-between space-y-4 ${
                act.status === "Joined" ? "border-cyan-500/40 ring-1 ring-cyan-500/20" : "border-border"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 dark:bg-cyan-950/50 px-2.5 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-800">
                    {act.category}
                  </span>

                  {act.status === "Joined" ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 border border-emerald-500/30">
                      <CheckCircle2 className="size-3" /> Enrolled Member
                    </span>
                  ) : (
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {act.membersCount} Students Active
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  {act.name}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  {act.description}
                </p>

                <div className="mt-3 space-y-1 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Users className="size-3.5 text-cyan-600" />
                    <span>Faculty Mentor: <strong className="text-foreground">{act.coordinator}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-cyan-600" />
                    <span>Schedule: {act.meetingTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-cyan-600" />
                    <span>Location: {act.venue}</span>
                  </div>
                </div>

                {act.upcomingEvent && (
                  <div className="mt-3 p-3 rounded-2xl bg-canvas border border-border text-xs flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-cyan-600 block">Upcoming Fixture / Showcase</span>
                      <span className="font-semibold text-foreground">{act.upcomingEvent}</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-foreground bg-card px-2.5 py-1 rounded-lg border border-border">
                      {act.eventDate}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground text-[11px]">Riverside Extra-Curricular Board</span>

                {act.status === "Joined" ? (
                  <button
                    onClick={() => alert(`Accessing member workspace and schedule circulars for ${act.name}`)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-canvas border border-border hover:bg-muted font-semibold text-foreground transition"
                  >
                    <span>Member Circulars</span>
                    <ChevronRight className="size-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoin(act)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold shadow-xs transition"
                  >
                    <Plus className="size-3.5" />
                    <span>Register Interest</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Join Activity Modal */}
        {joinModalOpen && selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-card border border-border rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-foreground">
                Join {selectedActivity.name}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                By enrolling, you agree to attend weekly sessions on <strong>{selectedActivity.meetingTime}</strong>{" "}
                at <strong>{selectedActivity.venue}</strong>.
              </p>

              <div className="p-3.5 rounded-2xl bg-canvas border border-border text-xs space-y-2">
                <div className="font-semibold text-foreground">Parental Consent Notification</div>
                <p className="text-muted-foreground text-[11px]">
                  An authorization ping will be dispatched to Mrs. Zainab Adeleke (+234 803 123 4567)
                  for co-curricular sign-off.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setJoinModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-medium text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmJoin}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition shadow-sm"
                >
                  Confirm Registration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
