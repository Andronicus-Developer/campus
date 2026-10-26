"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Users,
  User,
  BookOpen,
  Award,
  Calendar,
  Download,
  AlertCircle,
  CheckCircle2,
  Edit3,
  ShieldCheck,
  FileText,
  Mail,
  Phone,
  Home,
  Bus,
} from "lucide-react";
import { CHILDREN_PROFILES, ChildProfile } from "@/lib/family-data";

export default function ParentChildrenProfilePage() {
  const [selectedChildId, setSelectedChildId] = useState<string>("child-1");
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [correctionTopic, setCorrectionTopic] = useState("Home Address / Contact");
  const [correctionNote, setCorrectionNote] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const activeChild =
    CHILDREN_PROFILES.find((c) => c.id === selectedChildId) || CHILDREN_PROFILES[0];

  const handleRequestCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCorrectionModalOpen(false);
    setToast(
      `Registry Correction Request logged for ${activeChild.preferredName} (#REQ-${Math.floor(
        1000 + Math.random() * 9000
      )}). School Administrator will review supporting documentation.`
    );
    setCorrectionNote("");
  };

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <Users className="w-4 h-4" />
              Family Education Records · Section B
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Child Profiles &amp; Academic Information
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Official school enrollment details, assigned teachers, promotion status, and student handbooks.
            </p>
          </div>

          {/* Child Switcher */}
          <div className="flex items-center gap-2 bg-card border border-border rounded-2xl p-1.5 shadow-xs">
            {CHILDREN_PROFILES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedChildId(c.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  selectedChildId === c.id
                    ? "bg-pink-600 text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c.preferredName} ({c.classGroup.split(" (")[0]})
              </button>
            ))}
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

        {/* Governance Boundary Alert */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-foreground">Registry Verification Safeguard:</span>{" "}
            <span className="text-muted-foreground">
              Official academic records, admission numbers, class stream allocations, and terminal scores cannot be directly edited by parents. To amend biodata or medical details, submit a certified Registry Correction Request.
            </span>
          </div>
        </div>

        {/* Profile Card & Enrollment Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Identity Summary Card */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-2xl bg-pink-600/10 border border-pink-600/20 text-pink-600 flex items-center justify-center font-black text-2xl">
                {activeChild.avatar}
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-pink-600 block">{activeChild.admissionNo}</span>
                <h2 className="text-lg font-black text-foreground">{activeChild.name}</h2>
                <p className="text-xs text-muted-foreground">{activeChild.classGroup}</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-border text-xs">
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Academic Year:</span>
                <span className="font-semibold text-foreground">2025/2026 Session</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Year Group:</span>
                <span className="font-semibold text-foreground">{activeChild.yearGroup}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Gender &amp; DOB:</span>
                <span className="text-foreground">{activeChild.gender} · {activeChild.dateOfBirth}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Athletics House:</span>
                <span className="font-semibold text-foreground">{activeChild.house}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Enrollment Status:</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active &amp; Good Standing
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Promotion Clearance:</span>
                <span className="font-semibold text-blue-600">On-Track for Grade 12</span>
              </div>
            </div>

            <button
              onClick={() => setIsCorrectionModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-canvas border border-border hover:bg-muted text-foreground text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <Edit3 className="w-3.5 h-3.5 text-pink-600" />
              Request Registry Record Update
            </button>
          </div>

          {/* Form Teacher & Contact Details */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 block">Academic Faculty</span>
              <h3 className="text-base font-extrabold text-foreground">Class Form Teacher</h3>
              <p className="text-xs text-muted-foreground">Primary pastoral tutor responsible for {activeChild.preferredName}</p>
            </div>

            <div className="p-4 rounded-2xl bg-canvas border border-border space-y-3 text-xs">
              <div>
                <span className="font-bold text-foreground block text-sm">{activeChild.classTeacher.name}</span>
                <span className="text-muted-foreground text-[11px]">{activeChild.classTeacher.subject} Master</span>
              </div>
              <div className="space-y-1.5 pt-1 text-[11px]">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-3.5 h-3.5 text-pink-600" />
                  <span>{activeChild.classTeacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{activeChild.classTeacher.phone}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-foreground">School Policies &amp; Student Handbooks</h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => alert("Downloading Senior Secondary Academic Curriculum & Assessment Guide (PDF)...")}
                  className="w-full p-2.5 rounded-xl bg-canvas border border-border hover:bg-muted text-left flex items-center justify-between text-xs transition"
                >
                  <span className="flex items-center gap-2 text-foreground font-medium">
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                    Student Academic Handbook 2025/2026
                  </span>
                  <Download className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button
                  onClick={() => alert("Downloading Riverside Code of Conduct & Pastoral Welfare Rules (PDF)...")}
                  className="w-full p-2.5 rounded-xl bg-canvas border border-border hover:bg-muted text-left flex items-center justify-between text-xs transition"
                >
                  <span className="flex items-center gap-2 text-foreground font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Code of Conduct &amp; Safety Policy
                  </span>
                  <Download className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Transportation & House Allocations */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 block">Auxiliary Services</span>
              <h3 className="text-base font-extrabold text-foreground">Campus Route &amp; House</h3>
              <p className="text-xs text-muted-foreground">Transportation schedule and boarding/day status</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-canvas border border-border space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <Bus className="w-4 h-4 text-amber-500" />
                  <span>Bus Transit Allocation</span>
                </div>
                <p className="text-muted-foreground">{activeChild.busRoute}</p>
                <span className="text-[11px] text-emerald-600 block font-semibold">Morning Pickup: 06:45 AM · Route 4</span>
              </div>

              <div className="p-4 rounded-2xl bg-canvas border border-border space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <Home className="w-4 h-4 text-purple-500" />
                  <span>Boarding &amp; Pastoral House</span>
                </div>
                <p className="text-muted-foreground">{activeChild.boardingStatus} · {activeChild.house}</p>
                <span className="text-[11px] text-muted-foreground block">Housemaster: Dr. K. Mensah</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Subjects & Faculty Roster */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                Enrolled Subjects &amp; Teaching Faculty ({activeChild.subjects.length} Subjects)
              </h3>
              <p className="text-xs text-muted-foreground">
                Curriculum syllabus assigned to {activeChild.name} for the current term.
              </p>
            </div>
            <Link
              href="/dashboard/parent/results"
              className="px-3 py-1.5 rounded-xl bg-canvas border border-border hover:bg-muted text-xs font-semibold text-foreground transition"
            >
              View Full Report Card
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {activeChild.subjects.map((sub, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-canvas border border-border space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{sub.name}</span>
                  <span className="px-2 py-0.5 rounded-md font-bold text-[11px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                    {sub.grade}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground">Instructor: {sub.teacher}</div>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-border/60">
                  <span className="text-muted-foreground">CA: {sub.caScore}/40</span>
                  <span className="text-muted-foreground">Exam: {sub.examScore}/60</span>
                  <span className="font-bold text-foreground">Total: {sub.total}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: Correction Request */}
        {isCorrectionModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <span className="text-xs font-mono text-pink-600 font-bold">{activeChild.admissionNo}</span>
                  <h3 className="font-bold text-foreground text-base">Registry Record Update Request</h3>
                </div>
                <button
                  onClick={() => setIsCorrectionModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleRequestCorrection} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Information to Update</label>
                  <select
                    value={correctionTopic}
                    onChange={(e) => setCorrectionTopic(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    <option value="Home Address / Contact">Home Address / Contact Information</option>
                    <option value="Medical & Allergy Details">Medical, Dietary &amp; Allergy Record</option>
                    <option value="Authorized Emergency Contact">Emergency Contact / Pickup Individual</option>
                    <option value="Name Spelling / Biodata">Spelling of Name or Date of Birth (Affidavit required)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Details &amp; Reason for Amendment</label>
                  <textarea
                    rows={3}
                    placeholder="Provide exact new details and reason for update..."
                    value={correctionNote}
                    onChange={(e) => setCorrectionNote(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    required
                  />
                </div>

                <div className="p-3 rounded-xl bg-canvas border border-border text-[11px] text-muted-foreground">
                  Supporting document (e.g. Utility bill, birth certificate, or medical note) may be requested by the School Administrator.
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsCorrectionModalOpen(false)}
                    className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold"
                  >
                    Submit to Registry
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
