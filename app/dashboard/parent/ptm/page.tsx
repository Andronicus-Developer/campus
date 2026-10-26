"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  HeartHandshake,
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Plus,
  User,
  ShieldCheck,
  FileText,
  X,
  ExternalLink,
} from "lucide-react";
import { CHILDREN_PROFILES, ChildProfile } from "@/lib/family-data";

interface PtmBooking {
  id: string;
  childName: string;
  teacherName: string;
  subject: string;
  date: string;
  timeSlot: string;
  mode: "Virtual Video Call" | "Campus Meeting Room";
  locationDetails: string;
  discussionFocus: string;
  status: "confirmed" | "completed" | "cancelled";
  meetingLink?: string;
  sharedFollowUpNotes?: string;
}

export default function ParentPtmPage() {
  const [selectedChildId, setSelectedChildId] = useState<string>("child-1");
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form states
  const [bookTeacher, setBookTeacher] = useState("Mr. David Alabi (Further Mathematics)");
  const [bookDate, setBookDate] = useState("2026-02-12");
  const [bookSlot, setBookSlot] = useState("03:30 PM - 03:50 PM");
  const [bookMode, setBookMode] = useState<PtmBooking["mode"]>("Virtual Video Call");
  const [bookTopic, setBookTopic] = useState("Mid-term examination strategy & calculus revision plan");

  const activeChild =
    CHILDREN_PROFILES.find((c) => c.id === selectedChildId) || CHILDREN_PROFILES[0];

  const [bookings, setBookings] = useState<PtmBooking[]>([
    {
      id: "PTM-091",
      childName: "Tobi Adeleke",
      teacherName: "Mr. David Alabi",
      subject: "Further Mathematics",
      date: "Thursday, Feb 12, 2026",
      timeSlot: "03:30 PM - 03:50 PM",
      mode: "Virtual Video Call",
      locationDetails: "Riverside Google Meet Room #401",
      discussionFocus: "Preparation for National Olympiad and WAEC Advanced Calculus syllabus",
      status: "confirmed",
      meetingLink: "https://meet.google.com/rvs-ptm-401",
    },
    {
      id: "PTM-088",
      childName: "Maryam Adeleke",
      teacherName: "Ms. Chioma Okon",
      subject: "English Studies",
      date: "Jan 16, 2026",
      timeSlot: "02:00 PM - 02:20 PM",
      mode: "Campus Meeting Room",
      locationDetails: "Room 104, Junior Academic Block",
      discussionFocus: "Creative writing competition entry and vocabulary development",
      status: "completed",
      sharedFollowUpNotes: "Parent agreed to encourage 30 minutes of nightly novel reading. Teacher provided recommended literature list.",
    },
  ]);

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: PtmBooking = {
      id: `PTM-${Math.floor(100 + Math.random() * 900)}`,
      childName: activeChild.name,
      teacherName: bookTeacher.split(" (")[0],
      subject: bookTeacher.split("(")[1]?.replace(")", "") || "General Academic",
      date: bookDate,
      timeSlot: bookSlot,
      mode: bookMode,
      locationDetails:
        bookMode === "Virtual Video Call"
          ? "Riverside Teleconference Room #402"
          : "Administrative Boardroom A",
      discussionFocus: bookTopic,
      status: "confirmed",
      meetingLink: bookMode === "Virtual Video Call" ? "https://meet.google.com/rvs-ptm-402" : undefined,
    };

    setBookings([newBooking, ...bookings]);
    setIsBookModalOpen(false);
    setToast(
      `Conference slot reserved with ${newBooking.teacherName} on ${newBooking.date} at ${newBooking.timeSlot}. Calendar invite dispatched to your email.`
    );
  };

  const handleCancelMeeting = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
    );
    setToast("Meeting cancelled. Teacher schedule reopened for other parents.");
  };

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <HeartHandshake className="w-4 h-4" />
              Parent-Teacher Partnership · Section H
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Parent-Teacher Consultation Meetings (PTM)
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Book one-on-one consultation slots, attend virtual conferences, and review shared teacher action notes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              Book Teacher Conference
            </button>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              {toast}
            </span>
            <button onClick={() => setToast(null)} className="text-emerald-600 hover:underline text-xs ml-4">
              Dismiss
            </button>
          </div>
        )}

        {/* Confidentiality Boundary Alert */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-foreground">Confidentiality Protocol:</span>{" "}
            <span className="text-muted-foreground">
              Action notes recorded during PTM conferences are shared explicitly with authorized guardians. Internal pastoral faculty notes and peer evaluations remain strictly private under child protection policies.
            </span>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-foreground">Your Scheduled &amp; Completed Consultations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-6 rounded-3xl bg-card border border-border hover:border-pink-500/30 transition shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-pink-600 font-bold">{b.id}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        b.status === "confirmed"
                          ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                          : b.status === "completed"
                          ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200 dark:border-blue-800"
                          : "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground leading-snug">
                    {b.teacherName} — {b.subject}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Student: <strong>{b.childName}</strong>
                  </p>

                  <div className="mt-3 p-3.5 rounded-2xl bg-canvas border border-border space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-foreground font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-pink-600" />
                      <span>{b.date} · {b.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {b.mode === "Virtual Video Call" ? (
                        <Video className="w-3.5 h-3.5 text-blue-500" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                      <span>{b.locationDetails}</span>
                    </div>
                    <div className="text-muted-foreground pt-1 border-t border-border">
                      Focus: <span className="text-foreground italic">"{b.discussionFocus}"</span>
                    </div>
                  </div>

                  {b.sharedFollowUpNotes && (
                    <div className="mt-3 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300">
                      <strong>Agreed Follow-Up Action:</strong> {b.sharedFollowUpNotes}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border text-xs">
                  {b.status === "confirmed" && b.meetingLink && (
                    <a
                      href={b.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold transition shadow-xs"
                    >
                      <Video className="w-3.5 h-3.5" />
                      Join Google Meet
                    </a>
                  )}

                  {b.status === "confirmed" && (
                    <button
                      onClick={() => handleCancelMeeting(b.id)}
                      className="px-3 py-1.5 rounded-xl border border-border hover:bg-muted text-rose-600 font-semibold transition"
                    >
                      Cancel Slot
                    </button>
                  )}

                  {b.status === "completed" && (
                    <span className="text-muted-foreground text-[11px] italic">
                      Conference concluded &amp; minutes archived.
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: Book Conference */}
        {isBookModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-5 h-5 text-pink-600" />
                  <h3 className="font-bold text-foreground text-base">Book Parent-Teacher Conference</h3>
                </div>
                <button
                  onClick={() => setIsBookModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateBooking} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Select Child</label>
                  <select
                    value={selectedChildId}
                    onChange={(e) => setSelectedChildId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    {CHILDREN_PROFILES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.classGroup})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Teacher &amp; Subject</label>
                  <select
                    value={bookTeacher}
                    onChange={(e) => setBookTeacher(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    <option value="Mr. David Alabi (Further Mathematics)">
                      Mr. David Alabi (Form Master &amp; Further Mathematics)
                    </option>
                    <option value="Ms. Chioma Okon (English Studies)">
                      Ms. Chioma Okon (Form Master &amp; English Studies)
                    </option>
                    <option value="Dr. K. Mensah (Chemistry)">Dr. K. Mensah (HOD Chemistry)</option>
                    <option value="Engr. Patrick Bassey (Physics)">Engr. Patrick Bassey (Physics)</option>
                    <option value="Mrs. A. Adeleke (Biology)">Mrs. A. Adeleke (Biology)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Conference Date</label>
                    <input
                      type="date"
                      value={bookDate}
                      onChange={(e) => setBookDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Available 20-Min Slot</label>
                    <select
                      value={bookSlot}
                      onChange={(e) => setBookSlot(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    >
                      <option value="03:00 PM - 03:20 PM">03:00 PM - 03:20 PM</option>
                      <option value="03:30 PM - 03:50 PM">03:30 PM - 03:50 PM</option>
                      <option value="04:00 PM - 04:20 PM">04:00 PM - 04:20 PM</option>
                      <option value="04:30 PM - 04:50 PM">04:30 PM - 04:50 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Meeting Attendance Mode</label>
                  <select
                    value={bookMode}
                    onChange={(e) => setBookMode(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    <option value="Virtual Video Call">Virtual Video Call (Google Meet / Zoom)</option>
                    <option value="Campus Meeting Room">In-Person on Campus (Academic Block)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Discussion Focus / Questions</label>
                  <textarea
                    rows={2}
                    placeholder="Briefly state topics you wish to discuss with the instructor..."
                    value={bookTopic}
                    onChange={(e) => setBookTopic(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsBookModalOpen(false)}
                    className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold"
                  >
                    Confirm Booking
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
