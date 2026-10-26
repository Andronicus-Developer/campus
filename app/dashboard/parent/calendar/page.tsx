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
  FileCheck,
  ShieldCheck,
  AlertTriangle,
  Send,
  Plus,
} from "lucide-react";
import { CHILDREN_PROFILES, ChildProfile } from "@/lib/family-data";

interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: "Excursion / Trip" | "PTA Meeting" | "Examination" | "Sports & Athletics" | "Clubs & Activities";
  description: string;
  consentRequired: boolean;
  consentSigned?: boolean;
  transportProvided: boolean;
  eligibility: string;
}

export default function ParentCalendarPage() {
  const [filter, setFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<SchoolEvent | null>(null);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [consentChild, setConsentChild] = useState("Tobi Adeleke");
  const [medicalClearance, setMedicalClearance] = useState(true);
  const [parentSignName, setParentSignName] = useState("Mrs. Zainab Adeleke");
  const [toast, setToast] = useState<string | null>(null);

  const [events, setEvents] = useState<SchoolEvent[]>([
    {
      id: "EV-01",
      title: "Senior STEM Robotics & Space Observatory Excursion",
      date: "Friday, Feb 20, 2026",
      time: "08:30 AM - 04:30 PM",
      location: "National Space Research & Technology Center, Abuja",
      category: "Excursion / Trip",
      description: "Hands-on satellite telemetry workshops, rocketry simulations, and planetary observatory tour.",
      consentRequired: true,
      consentSigned: false,
      transportProvided: true,
      eligibility: "Senior Secondary (Grade 10 - 12)",
    },
    {
      id: "EV-02",
      title: "Annual Inter-House Athletics & Track Championship",
      date: "Saturday, Feb 28, 2026",
      time: "09:00 AM - 05:00 PM",
      location: "Riverside Main Sports Stadium & Track Arena",
      category: "Sports & Athletics",
      description: "Track events, 100m sprint, relay, long jump, and parent-staff novelty race. Tigers (Blue) vs Eagles (Green).",
      consentRequired: false,
      transportProvided: true,
      eligibility: "All Enrolled Students & Families",
    },
    {
      id: "EV-03",
      title: "Term 2 PTA General Assembly & Executive Election",
      date: "Saturday, Feb 7, 2026",
      time: "10:00 AM - 01:00 PM",
      location: "School Main Auditorium & Zoom Stream",
      category: "PTA Meeting",
      description: "Deliberation on new science lab building, bus fleet additions, and election of parent arm representatives.",
      consentRequired: false,
      transportProvided: false,
      eligibility: "All Registered Parents & Guardians",
    },
    {
      id: "EV-04",
      title: "Mid-Term Formative CA Examination Week",
      date: "Feb 16 - Feb 20, 2026",
      time: "08:00 AM Daily",
      location: "All Classrooms & Examination Hall",
      category: "Examination",
      description: "Continuous assessment tests accounting for 40% of term terminal grade marks.",
      consentRequired: false,
      transportProvided: true,
      eligibility: "JSS 1 through SSS 3",
    },
    {
      id: "EV-05",
      title: "Junior French Immersion & Cultural Theatre Day",
      date: "Wednesday, Mar 4, 2026",
      time: "11:00 AM - 02:30 PM",
      location: "Alliance Française Cultural Centre, Ikoyi",
      category: "Excursion / Trip",
      description: "Interactive French drama, Francophone poetry competition, and cultural gastronomy showcase.",
      consentRequired: true,
      consentSigned: false,
      transportProvided: true,
      eligibility: "Junior Secondary (JSS 1 - JSS 3)",
    },
  ]);

  const handleSignConsent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    setEvents((prev) =>
      prev.map((ev) => (ev.id === selectedEvent.id ? { ...ev, consentSigned: true } : ev))
    );

    setIsConsentModalOpen(false);
    setToast(
      `Electronic Parental Consent Form successfully recorded for ${consentChild} (${selectedEvent.title}). Stamped by ${parentSignName}.`
    );
  };

  const filteredEvents = events.filter((ev) => {
    if (filter === "all") return true;
    return ev.category === filter;
  });

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <CalendarIcon className="w-4 h-4" />
              School Calendar &amp; Activities · Section K
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              School Events, Excursions &amp; Consent
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              School-wide calendar, inter-house sports days, and legally verified digital excursion consent forms.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Exporting Riverside School Calendar (iCal/Google Calendar format)...")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground text-xs font-semibold shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5 text-muted-foreground" />
              Export to Google Calendar
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

        {/* Safeguarding Alert */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-foreground">Minor Protection &amp; Excursion Safety Policy:</span>{" "}
            <span className="text-muted-foreground">
              Students cannot board school excursion buses without digitally signed parental consent and verified emergency contact credentials on record.
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-border pb-3">
          {(
            [
              { key: "all", label: "All Events" },
              { key: "Excursion / Trip", label: "Excursions & Field Trips" },
              { key: "Sports & Athletics", label: "Sports & Inter-House" },
              { key: "PTA Meeting", label: "PTA Assemblies" },
              { key: "Examination", label: "Exams & CA Tests" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filter === tab.key
                  ? "bg-pink-600 text-white shadow-xs"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="p-6 rounded-3xl bg-card border border-border hover:border-pink-500/30 transition shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2.5 py-0.5 rounded-md font-bold uppercase text-[10px] bg-canvas border border-border text-foreground">
                    {ev.category}
                  </span>
                  {ev.consentRequired && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        ev.consentSigned
                          ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                          : "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800"
                      }`}
                    >
                      {ev.consentSigned ? "Consent Signed" : "Consent Required"}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-foreground leading-snug">{ev.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{ev.description}</p>

                <div className="mt-3 p-3.5 rounded-2xl bg-canvas border border-border space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <Clock className="w-3.5 h-3.5 text-pink-600" />
                    <span>{ev.date} · {ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{ev.location}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Eligibility: <strong className="text-foreground">{ev.eligibility}</strong>
                    {ev.transportProvided && " · School Bus Transport Provided"}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border text-xs">
                {ev.consentRequired ? (
                  ev.consentSigned ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      Parental Clearance Active
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedEvent(ev);
                        setIsConsentModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-xs transition"
                    >
                      Sign Digital Consent Form
                    </button>
                  )
                ) : (
                  <span className="text-muted-foreground text-[11px]">
                    Open attendance · No consent form needed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Digital Consent Form */}
        {isConsentModalOpen && selectedEvent && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-pink-600" />
                  <h3 className="font-bold text-foreground text-base">Parental Excursion Consent</h3>
                </div>
                <button
                  onClick={() => setIsConsentModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSignConsent} className="space-y-3.5 text-xs">
                <div className="p-3.5 rounded-xl bg-canvas border border-border space-y-1">
                  <span className="text-[11px] font-bold uppercase text-pink-600">Event Trip Title</span>
                  <div className="font-bold text-foreground">{selectedEvent.title}</div>
                  <div className="text-muted-foreground text-[11px]">{selectedEvent.date} · {selectedEvent.location}</div>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Participating Student</label>
                  <select
                    value={consentChild}
                    onChange={(e) => setConsentChild(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    {CHILDREN_PROFILES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.classGroup})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-canvas border border-border space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={medicalClearance}
                      onChange={(e) => setMedicalClearance(e.target.checked)}
                      className="mt-0.5 rounded text-pink-600 focus:ring-pink-500"
                      required
                    />
                    <span className="text-foreground leading-relaxed">
                      I confirm that {consentChild} is medically fit to participate in the activities planned for this trip, and authorize school first-aid personnel to administer certified emergency care if required.
                    </span>
                  </label>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Guardian Electronic Signature</label>
                  <input
                    type="text"
                    value={parentSignName}
                    onChange={(e) => setParentSignName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground font-bold"
                    required
                  />
                  <span className="text-[11px] text-muted-foreground mt-0.5 block">
                    Type your full legal name as authorized guardian on file.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsConsentModalOpen(false)}
                    className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold"
                  >
                    Authorize &amp; Sign Consent
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
