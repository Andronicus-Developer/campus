"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Plus,
  Phone,
  Contact,
  ShieldCheck,
  Send,
  Eye,
  Lock,
  HeartHandshake,
  Check,
} from "lucide-react";

interface TeacherStudentProfile {
  id: string;
  name: string;
  regNo: string;
  className: string;
  guardianName: string;
  guardianPhone: string;
  subjectScoreAvg: number;
  attendancePct: number;
  standing: string;
  supportNote?: string;
  accommodations?: string[];
  needsRemedial: boolean;
}

const INITIAL_ROSTER: TeacherStudentProfile[] = [
  {
    id: "std-1",
    name: "Adeleke Tobi",
    regNo: "RC-2023-0184",
    className: "SSS 2A (Science Stream)",
    guardianName: "Mrs. Zainab Adeleke",
    guardianPhone: "+234 802 345 6789",
    subjectScoreAvg: 88,
    attendancePct: 98.5,
    standing: "Distinction (Rank 4)",
    supportNote: "Strong analytical grasp of calculus; recommended for National STEM Olympiad.",
    accommodations: ["Accelerated Math Track"],
    needsRemedial: false,
  },
  {
    id: "std-2",
    name: "Balogun Farouk",
    regNo: "RC-2023-0185",
    className: "SSS 2A (Science Stream)",
    guardianName: "Chief T. Balogun",
    guardianPhone: "+234 703 118 7632",
    subjectScoreAvg: 68,
    attendancePct: 92.0,
    standing: "Credit (Rank 9)",
    supportNote: "Shows consistent improvement in trigonometry homework.",
    needsRemedial: false,
  },
  {
    id: "std-3",
    name: "Chukwuma Kamsi",
    regNo: "RC-2023-0186",
    className: "SSS 2A (Science Stream)",
    guardianName: "Dr. K. Chukwuma",
    guardianPhone: "+234 802 443 1198",
    subjectScoreAvg: 94,
    attendancePct: 99.2,
    standing: "Distinction (Rank 2)",
    supportNote: "Excels in peer study group leadership.",
    needsRemedial: false,
  },
  {
    id: "std-4",
    name: "Danjuma Aisha",
    regNo: "RC-2023-0187",
    className: "SSS 2A (Science Stream)",
    guardianName: "Alhaji S. Danjuma",
    guardianPhone: "+234 818 902 4432",
    subjectScoreAvg: 84,
    attendancePct: 96.0,
    standing: "Distinction (Rank 5)",
    accommodations: ["Visual Accommodation — Front Row Seating"],
    needsRemedial: false,
  },
  {
    id: "std-5",
    name: "Eze Somtochukwu",
    regNo: "RC-2023-0188",
    className: "SSS 2A (Science Stream)",
    guardianName: "Engr. P. Eze",
    guardianPhone: "+234 803 445 1029",
    subjectScoreAvg: 48,
    attendancePct: 78.5,
    standing: "Pass (Rank 28) · Attention",
    supportNote: "Struggling with quadratic factoring; 3 unexcused absences this week.",
    needsRemedial: true,
  },
];

export default function TeacherRosterPage() {
  const [students, setStudents] = useState<TeacherStudentProfile[]>(INITIAL_ROSTER);
  const [selectedClass, setSelectedClass] = useState("SSS 2A");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRemedial, setFilterRemedial] = useState(false);
  const [selectedStudentForNote, setSelectedStudentForNote] = useState<TeacherStudentProfile | null>(null);
  const [noteText, setNoteText] = useState("");
  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);
  const [correctionForm, setCorrectionForm] = useState({
    studentId: "",
    fieldToCorrect: "guardian_phone",
    suggestedValue: "",
    reason: "",
  });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSaveNote = () => {
    if (!selectedStudentForNote) return;
    setStudents((prev) =>
      prev.map((s) => (s.id === selectedStudentForNote.id ? { ...s, supportNote: noteText } : s))
    );
    setSelectedStudentForNote(null);
    setNoteText("");
    showToast("Learning support observation saved to student's academic profile.");
  };

  const handleSubmitCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    setCorrectionModalOpen(false);
    showToast(
      `Record correction request for ${correctionForm.studentId} routed to Registry Administrator (Engr. Patrick Bassey).`
    );
    setCorrectionForm({
      studentId: "",
      fieldToCorrect: "guardian_phone",
      suggestedValue: "",
      reason: "",
    });
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.guardianName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRemedial = filterRemedial ? s.needsRemedial : true;
    return matchesSearch && matchesRemedial;
  });

  return (
    <DashboardLayout currentRole="teacher">
      <div className="space-y-6">
        {/* Top Banner & Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-[11px] font-bold text-violet-700">
                  Faculty Student Directory
                </span>
                <span className="font-mono text-xs text-ink-muted">Form Master: Mr. David Alabi</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">My Classes &amp; Student Roster</h2>
              <p className="text-xs text-ink-muted">
                Student academic performance in your subjects, authorized guardian contacts, learning support observations, and teaching accommodations.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setCorrectionModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-raised px-4 py-2 text-xs font-bold text-ink hover:border-violet-600 hover:text-violet-700 active:scale-95 transition-all shadow-sm"
              >
                <span>Request Record Correction</span>
              </button>

              <button
                type="button"
                onClick={() => showToast("Exporting official class list for SSS 2A to PDF.")}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-violet-700 active:scale-95 transition-all"
              >
                <Download className="size-4" />
                <span>Export Class List (PDF)</span>
              </button>
            </div>
          </div>

          {/* Operational Boundaries Notice */}
          <div className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4 text-xs text-violet-900 flex items-start gap-3">
            <Lock className="size-4 text-violet-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Authorized Teacher Scope &amp; Privacy Protections</span>
              <p className="text-violet-800 text-[11px] leading-relaxed">
                You have authorized access to academic marks, subject performance, and emergency guardian contacts for students in your assigned classes. In compliance with school privacy policy, <strong>teachers cannot edit official student biodata, fee payment ledgers, or confidential medical/safeguarding case files</strong>. Use the Request Correction channel for registry discrepancies.
              </p>
            </div>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMsg && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950 p-4 text-xs text-white font-semibold flex items-center justify-between shadow-xl animate-in slide-in-from-top-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="size-4.5 text-emerald-400" />
              <span>{toastMsg}</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-300">Live Active</span>
          </div>
        )}

        {/* SECTION 1: ROSTER TABLE */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="rounded-xl border border-line bg-surface-raised px-3.5 py-1.5 text-xs font-bold text-ink focus:border-violet-600 focus:outline-none"
              >
                <option value="SSS 2A">SSS 2A (Form Class · 34 students)</option>
                <option value="SSS 1 Science">SSS 1 Science (Mathematics · 36 students)</option>
                <option value="JSS 3 Gold">JSS 3 Gold (Mathematics · 28 students)</option>
              </select>

              <button
                type="button"
                onClick={() => setFilterRemedial(!filterRemedial)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold font-mono transition-all ${
                  filterRemedial
                    ? "bg-rose-600 text-white shadow-sm"
                    : "border border-line bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                {filterRemedial ? "Showing: Needs Remedial" : "Filter: Needs Support"}
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-3.5 text-ink-muted" />
              <input
                type="text"
                placeholder="Search student or reg no..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 rounded-xl border border-line bg-surface-raised pl-8 pr-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-violet-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-xs text-ink">
              <thead className="bg-surface-raised font-mono text-[11px] font-bold uppercase tracking-wider text-ink-muted border-b border-line">
                <tr>
                  <th className="p-3.5">Student Name / ID</th>
                  <th className="p-3.5">Guardian Contact</th>
                  <th className="p-3.5">Subject Average</th>
                  <th className="p-3.5">Attendance Streak</th>
                  <th className="p-3.5">Academic Standing</th>
                  <th className="p-3.5">Support &amp; Accommodations</th>
                  <th className="p-3.5 text-right">Observation Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-surface-raised/60 transition-colors">
                    <td className="p-3.5">
                      <span className="font-bold text-ink block">{st.name}</span>
                      <span className="font-mono text-[10px] text-primary font-bold">{st.regNo}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-ink block">{st.guardianName}</span>
                      <span className="font-mono text-[10px] text-ink-muted">{st.guardianPhone}</span>
                    </td>
                    <td className="p-3.5 font-mono">
                      <span
                        className={`text-xs font-bold ${
                          st.subjectScoreAvg >= 75
                            ? "text-emerald-600"
                            : st.subjectScoreAvg >= 60
                            ? "text-blue-600"
                            : "text-rose-600"
                        }`}
                      >
                        {st.subjectScoreAvg}%
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-xs font-bold">
                      <span className={st.attendancePct >= 90 ? "text-emerald-700" : "text-amber-700"}>
                        {st.attendancePct}%
                      </span>
                    </td>
                    <td className="p-3.5 text-ink-soft font-medium">
                      {st.standing}
                    </td>
                    <td className="p-3.5">
                      <div className="space-y-1">
                        {st.accommodations?.map((acc, i) => (
                          <span
                            key={i}
                            className="inline-block rounded bg-primary-light px-2 py-0.5 font-mono text-[10px] font-bold text-primary mr-1"
                          >
                            {acc}
                          </span>
                        ))}
                        {st.needsRemedial && (
                          <span className="inline-block rounded bg-rose-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-rose-700">
                            Remedial Recommended
                          </span>
                        )}
                        {st.supportNote && (
                          <p className="text-[11px] text-ink-muted italic line-clamp-1">
                            "{st.supportNote}"
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedStudentForNote(st);
                          setNoteText(st.supportNote || "");
                        }}
                        className="rounded-xl border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] font-semibold text-ink hover:border-violet-600"
                      >
                        Add Note
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL: ADD LEARNING SUPPORT NOTE */}
        {selectedStudentForNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2 text-ink">
                  <FileText className="size-5 text-violet-600" />
                  <h3 className="text-base font-extrabold">Learning Support Observation</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStudentForNote(null)}
                  className="text-ink-muted hover:text-ink"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-ink">
                  Student: <strong>{selectedStudentForNote.name}</strong> ({selectedStudentForNote.regNo})
                </p>
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">
                    Academic Observation / Intervention Note
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Enter academic strengths, learning bottlenecks, or extra study advice..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => setSelectedStudentForNote(null)}
                  className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="rounded-xl bg-violet-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-violet-700"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: REQUEST STUDENT RECORD CORRECTION */}
        {correctionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2 text-ink">
                  <ShieldCheck className="size-5 text-violet-600" />
                  <h3 className="text-base font-extrabold">Request Registry Record Correction</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCorrectionModalOpen(false)}
                  className="text-ink-muted hover:text-ink"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitCorrection} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Student ID / Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. RC-2023-0184 / Tobi Adeleke"
                    value={correctionForm.studentId}
                    onChange={(e) => setCorrectionForm({ ...correctionForm, studentId: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Field to Correct</label>
                  <select
                    value={correctionForm.fieldToCorrect}
                    onChange={(e) => setCorrectionForm({ ...correctionForm, fieldToCorrect: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  >
                    <option value="guardian_phone">Guardian Phone Number</option>
                    <option value="spelling">Name Spelling / Middle Name</option>
                    <option value="class_stream">Class Arm Allocation Discrepancy</option>
                    <option value="subject_elective">Elective Subject Enrolment</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Corrected Value</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter correct value..."
                    value={correctionForm.suggestedValue}
                    onChange={(e) => setCorrectionForm({ ...correctionForm, suggestedValue: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Reason / Supporting Note</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Parent reported new mobile contact in morning diary..."
                    value={correctionForm.reason}
                    onChange={(e) => setCorrectionForm({ ...correctionForm, reason: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setCorrectionModalOpen(false)}
                    className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-violet-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-violet-700"
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
