"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  User,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Calendar,
  Phone,
  Mail,
  Home,
  QrCode,
  Download,
  AlertCircle,
  Clock,
  Sparkles,
  BookOpen,
  GraduationCap,
  Building,
  CheckCircle2,
  Send,
} from "lucide-react";

export default function StudentProfilePage() {
  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);
  const [correctionCategory, setCorrectionCategory] = useState("spelling");
  const [correctionDetails, setCorrectionDetails] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleCorrectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctionDetails.trim()) return;
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setCorrectionDetails("");
      setCorrectionModalOpen(false);
      alert("Correction request submitted to the Admissions & Registry desk (Ref: CRQ-8941). You will be notified once reviewed.");
    }, 1200);
  };

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <User className="size-4" />
              Student Portal · Official Academic Dossier
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              My Profile & Student Records
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Verified identity, guardian contacts, enrollment history, and official school records.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Digital Student ID Card downloaded in high-resolution PDF format")}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="size-4 text-cyan-600" />
              Download Digital ID
            </button>
            <button
              onClick={() => setCorrectionModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Send className="size-4" />
              Request Record Correction
            </button>
          </div>
        </div>

        {/* Security / Boundary Guard Alert */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-start gap-3">
          <ShieldAlert className="size-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-ink-soft">
            <span className="font-bold text-ink block">Official Institutional Records Policy</span>
            <p>
              Students cannot alter official grades, admission numbers, enrollment status, or official personal records directly.
              If any of your information (such as guardian telephone or address) requires an update, please submit a formal
              correction request below for verification by the Admissions & Registry Directorate.
            </p>
          </div>
        </div>

        {/* Grid: ID Card & Personal Overview */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: CR80 Digital PVC Student ID Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl border border-line bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 p-6 text-white shadow-xl relative overflow-hidden">
              {/* Background watermark */}
              <div className="absolute right-0 top-0 -mt-8 -mr-8 size-48 rounded-full bg-cyan-500/10 blur-2xl" />

              <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-cyan-500 flex items-center justify-center font-black text-xs text-white">
                    R
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider text-cyan-300">
                      Riverside College
                    </div>
                    <div className="text-[10px] text-white/70">Official Student Identity Card</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active 2025/2026
                </span>
              </div>

              <div className="relative z-10 mt-6 flex items-start gap-4">
                <div className="size-24 rounded-2xl bg-white/10 border-2 border-cyan-400/40 p-1 flex items-center justify-center font-bold text-3xl text-cyan-200 shrink-0">
                  TA
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white">Tobi Adeleke</h3>
                  <div className="font-mono text-xs font-semibold text-cyan-300">
                    Reg No: RC-2023-0184
                  </div>
                  <div className="text-xs text-white/80">
                    Grade 11 · Senior Secondary (SSS 2A)
                  </div>
                  <div className="text-[11px] text-white/70">
                    Stream: Pure Sciences · House: Red Coral
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-white/15 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div>
                  <span className="text-white/60 block text-[10px]">Date of Birth:</span>
                  <span className="font-semibold text-white">14 May 2009</span>
                </div>
                <div>
                  <span className="text-white/60 block text-[10px]">Blood Group:</span>
                  <span className="font-semibold text-white">O+ Positive</span>
                </div>
                <div>
                  <span className="text-white/60 block text-[10px]">Valid Until:</span>
                  <span className="font-semibold text-white">July 2026</span>
                </div>
                <div>
                  <span className="text-white/60 block text-[10px]">Emergency Tel:</span>
                  <span className="font-semibold text-white">+234 803 123 4567</span>
                </div>
              </div>

              {/* Barcode & Hologram Band */}
              <div className="relative z-10 mt-6 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="font-mono text-[9px] text-white/50 tracking-widest">
                  ||||| | |||| ||| |||||| |||| | |||||
                </div>
                <div className="flex items-center gap-1 font-mono text-[10px] text-cyan-300 font-bold">
                  <QrCode className="size-3.5" />
                  <span>NFC ENABLED</span>
                </div>
              </div>
            </div>

            {/* Quick Record Verification Badge */}
            <div className="rounded-2xl border border-line bg-surface p-4 shadow-xs text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-bold">
                <ShieldCheck className="size-4" />
                <span>Verified Admissions Identity</span>
              </div>
              <p className="text-ink-muted text-[11px] leading-relaxed">
                Admitted via National Entrance Examination batch 2023. Biometric gate credentials linked to Turnstiles A & B.
              </p>
            </div>
          </div>

          {/* Right: Detailed Dossier (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Personal Biodata */}
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-ink border-b border-line pb-3">
                Personal Biodata & Demographics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-2xl bg-surface-raised border border-line space-y-1">
                  <span className="text-ink-muted text-[11px]">Full Legal Name</span>
                  <div className="font-bold text-ink">Adeleke, Tobi Oluwaseun</div>
                </div>
                <div className="p-3 rounded-2xl bg-surface-raised border border-line space-y-1">
                  <span className="text-ink-muted text-[11px]">Admission Number</span>
                  <div className="font-bold text-ink font-mono">RC-2023-0184</div>
                </div>
                <div className="p-3 rounded-2xl bg-surface-raised border border-line space-y-1">
                  <span className="text-ink-muted text-[11px]">Date of Birth</span>
                  <div className="font-bold text-ink">14 May 2009 (Age: 16)</div>
                </div>
                <div className="p-3 rounded-2xl bg-surface-raised border border-line space-y-1">
                  <span className="text-ink-muted text-[11px]">Gender & Genotype</span>
                  <div className="font-bold text-ink">Male · Genotype AA · O+</div>
                </div>
                <div className="p-3 rounded-2xl bg-surface-raised border border-line space-y-1">
                  <span className="text-ink-muted text-[11px]">Nationality / State of Origin</span>
                  <div className="font-bold text-ink">Nigerian · Lagos State</div>
                </div>
                <div className="p-3 rounded-2xl bg-surface-raised border border-line space-y-1">
                  <span className="text-ink-muted text-[11px]">Residential Address</span>
                  <div className="font-bold text-ink">12 Victoria Garden City, Lekki, Lagos</div>
                </div>
              </div>
            </div>

            {/* Academic Placement & Class Allocation */}
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-ink border-b border-line pb-3">
                Academic Placement & Enrollment
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-2xl bg-surface-raised border border-line space-y-1">
                  <span className="text-ink-muted text-[11px]">Current Class & Arm</span>
                  <div className="font-bold text-ink">Senior Secondary (SSS 2A)</div>
                </div>
                <div className="p-3 rounded-2xl bg-surface-raised border border-line space-y-1">
                  <span className="text-ink-muted text-[11px]">Academic Stream</span>
                  <div className="font-bold text-ink">Pure Sciences & Applied Math</div>
                </div>
                <div className="p-3 rounded-2xl bg-surface-raised border border-line space-y-1">
                  <span className="text-ink-muted text-[11px]">Assigned Form Master</span>
                  <div className="font-bold text-ink">Mr. David Alabi (Senior Mathematics)</div>
                </div>
                <div className="p-3 rounded-2xl bg-surface-raised border border-line space-y-1">
                  <span className="text-ink-muted text-[11px]">Enrolled Subjects</span>
                  <div className="font-bold text-ink">9 Registered WAEC / Cambridge Units</div>
                </div>
                <div className="p-3 rounded-2xl bg-surface-raised border border-line space-y-1">
                  <span className="text-ink-muted text-[11px]">Enrollment Date</span>
                  <div className="font-bold text-ink">12 September 2023 (Term 1)</div>
                </div>
                <div className="p-3 rounded-2xl bg-surface-raised border border-line space-y-1">
                  <span className="text-ink-muted text-[11px]">Academic Standing</span>
                  <div className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="size-3.5" /> Good Standing · Honors List
                  </div>
                </div>
              </div>
            </div>

            {/* Permitted Guardian Contact Information */}
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="text-base font-extrabold text-ink">Permitted Guardian Contacts</h3>
                <span className="text-[11px] font-semibold text-ink-muted">Authorized Caregivers</span>
              </div>

              <div className="p-4 rounded-2xl border border-line bg-surface-raised space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="size-4 text-cyan-600" />
                    <span className="font-bold text-ink text-sm">Mrs. Zainab Adeleke</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                    Primary Guardian (Mother)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-ink-soft">
                  <div className="flex items-center gap-1.5">
                    <Phone className="size-3.5 text-cyan-600" />
                    <span>+234 803 123 4567</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="size-3.5 text-cyan-600" />
                    <span>zainab.adeleke@gmail.com</span>
                  </div>
                </div>

                <div className="text-[11px] text-ink-muted pt-2 border-t border-line">
                  Linked to Parent Portal (PAR-0492). Authorizes fee payments, leave permissions, and emergency medical decisions.
                </div>
              </div>
            </div>

            {/* Verified Student Documents Repository */}
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="text-base font-extrabold text-ink">Verified Documents Repository</h3>
                <span className="text-[11px] font-semibold text-emerald-600">4 Documents Available</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { name: "Verified Birth Certificate (National Population Commission)", date: "Verified Sep 2023", size: "1.2 MB", type: "PDF" },
                  { name: "Junior Secondary School BECE Official Result Transcript", date: "Verified Sep 2023", size: "840 KB", type: "PDF" },
                  { name: "Primary School Transfer & Character Testimonial", date: "Verified Sep 2023", size: "620 KB", type: "PDF" },
                  { name: "School Clinic Health & Immunization Record", date: "Updated Jan 2026", size: "510 KB", type: "PDF" },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl border border-line bg-surface-raised flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="size-4 text-cyan-600 shrink-0" />
                      <div>
                        <span className="font-semibold text-ink block">{doc.name}</span>
                        <span className="text-[10px] text-ink-muted">{doc.date} · {doc.size}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Downloading verified copy of: ${doc.name}`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-line hover:bg-surface text-ink text-[11px] font-medium transition"
                    >
                      <Download className="size-3" /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Record Correction Request Modal */}
        {correctionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface border border-line rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <Send className="size-5 text-cyan-600" />
                  <h3 className="text-base font-extrabold text-ink">Request Student Record Correction</h3>
                </div>
                <button
                  onClick={() => setCorrectionModalOpen(false)}
                  className="size-7 rounded-lg hover:bg-surface-raised flex items-center justify-center text-ink-muted"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                Submit an official request to the Admissions & Records Directorate. All changes to legal names,
                contact details, or guardian information require verification before being committed to your permanent file.
              </p>

              <form onSubmit={handleCorrectionSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-ink font-semibold mb-1">Correction Category</label>
                  <select
                    value={correctionCategory}
                    onChange={(e) => setCorrectionCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none"
                  >
                    <option value="spelling">Name Spelling / Correction</option>
                    <option value="dob">Date of Birth Discrepancy</option>
                    <option value="guardian_phone">Guardian Phone / Emergency Contact</option>
                    <option value="address">Residential Address Change</option>
                    <option value="blood_group">Medical / Blood Group Correction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-1">Details & Proposed Correction</label>
                  <textarea
                    rows={4}
                    required
                    value={correctionDetails}
                    onChange={(e) => setCorrectionDetails(e.target.value)}
                    placeholder="Describe the discrepancy and the exact corrected information..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="p-3 rounded-xl bg-canvas border border-line text-[11px] text-ink-muted">
                  Note: A Registry officer may request a supporting document (such as a birth certificate or utility bill) before final endorsement.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCorrectionModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line hover:bg-surface-raised font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittedMessage}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
                  >
                    {submittedMessage ? "Submitting..." : "Submit Correction Request"}
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
