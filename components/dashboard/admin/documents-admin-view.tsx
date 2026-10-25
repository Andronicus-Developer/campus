"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  FolderOpen,
  Upload,
  Lock,
  ShieldCheck,
  Search,
  Filter,
  Download,
  Printer,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Plus,
  Users,
  Building2,
  Sparkles,
} from "lucide-react";

interface SchoolDoc {
  id: string;
  name: string;
  category: "admission" | "student_file" | "staff_doc" | "policy" | "restricted_safeguarding";
  fileType: string;
  fileSize: string;
  uploadedBy: string;
  uploadedAt: string;
  accessLevel: "Public" | "Staff Only" | "Restricted";
}

interface StudentIdPreview {
  id: string;
  studentNumber: string;
  fullName: string;
  className: string;
  dob: string;
  bloodGroup: string;
  emergencyContact: string;
  guardianName: string;
  academicYear: string;
  avatarGradient: string;
  avatarInitial: string;
}

const INITIAL_DOCS: SchoolDoc[] = [
  {
    id: "doc-1",
    name: "2025-2026 Academic Parent & Student Handbook.pdf",
    category: "policy",
    fileType: "PDF",
    fileSize: "4.8 MB",
    uploadedBy: "Engr. Patrick Bassey",
    uploadedAt: "Aug 15, 2025",
    accessLevel: "Public",
  },
  {
    id: "doc-2",
    name: "Ministry of Education Certified Curriculum Accreditation.pdf",
    category: "policy",
    fileType: "PDF",
    fileSize: "2.1 MB",
    uploadedBy: "Dr. Evelyn Peters",
    uploadedAt: "Sep 01, 2025",
    accessLevel: "Public",
  },
  {
    id: "doc-3",
    name: "Term 2 Senior Secondary Admission Forms Bundle (JSS1-SSS3).zip",
    category: "admission",
    fileType: "ZIP",
    fileSize: "18.4 MB",
    uploadedBy: "Engr. Patrick Bassey",
    uploadedAt: "Oct 10, 2025",
    accessLevel: "Staff Only",
  },
  {
    id: "doc-4",
    name: "Confidential Student Medical & Dietary Allergy Records.pdf",
    category: "restricted_safeguarding",
    fileType: "PDF",
    fileSize: "1.2 MB",
    uploadedBy: "School Infirmary Matron",
    uploadedAt: "Oct 12, 2025",
    accessLevel: "Restricted",
  },
  {
    id: "doc-5",
    name: "Faculty Employment & Background Clearance Dossier 2025.pdf",
    category: "staff_doc",
    fileType: "PDF",
    fileSize: "6.4 MB",
    uploadedBy: "Registry Office",
    uploadedAt: "Aug 28, 2025",
    accessLevel: "Restricted",
  },
];

const PRESET_STUDENTS: StudentIdPreview[] = [
  {
    id: "std-1",
    studentNumber: "RC-2023-0184",
    fullName: "Tobi Adeleke",
    className: "Senior Secondary (SSS 2A)",
    dob: "14 May 2009",
    bloodGroup: "O+",
    emergencyContact: "+234 802 345 6789",
    guardianName: "Mrs. Zainab Adeleke",
    academicYear: "2025 / 2026 Session",
    avatarGradient: "from-blue-600 to-indigo-700",
    avatarInitial: "T",
  },
  {
    id: "std-2",
    studentNumber: "RC-2024-0091",
    fullName: "Somtochukwu Obi",
    className: "Junior Secondary (JSS 2 Diamond)",
    dob: "22 Sep 2011",
    bloodGroup: "A+",
    emergencyContact: "+234 803 111 2233",
    guardianName: "Chief Emeka Obi",
    academicYear: "2025 / 2026 Session",
    avatarGradient: "from-emerald-600 to-teal-700",
    avatarInitial: "S",
  },
  {
    id: "std-3",
    studentNumber: "RC-2025-0012",
    fullName: "Zainab Mohammed",
    className: "Junior Secondary (JSS 1 Alpha)",
    dob: "03 Jan 2012",
    bloodGroup: "B+",
    emergencyContact: "+234 803 291 0021",
    guardianName: "Alhaji Bello Mohammed",
    academicYear: "2025 / 2026 Session",
    avatarGradient: "from-pink-600 to-rose-700",
    avatarInitial: "Z",
  },
];

export function DocumentsAdminView() {
  const [docs, setDocs] = useState<SchoolDoc[]>(INITIAL_DOCS);
  const [selectedStudent, setSelectedStudent] = useState<StudentIdPreview>(PRESET_STUDENTS[0]);
  const [activeTab, setActiveTab] = useState<"repository" | "id_generator" | "class_lists">("repository");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filteredDocs = docs.filter((d) => {
    if (selectedCategory === "all") return true;
    return d.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-indigo-100 px-3 py-1 font-mono text-[11px] font-bold text-indigo-700">
                Institutional Records &amp; Vault
              </span>
              <span className="text-xs text-ink-muted">Encrypted Document Storage</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-ink">Documents, Official Handbooks &amp; ID Generator</h2>
            <p className="text-xs text-ink-muted">
              Organize official school circulars, admission files, and staff credentials; enforce role-based access for sensitive medical files; and generate verified student ID cards with barcodes.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setUploadModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-indigo-700 active:scale-95 transition-all"
            >
              <Upload className="size-4" />
              <span>+ Upload Document</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-line">
          <button
            type="button"
            onClick={() => setActiveTab("repository")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "repository"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-surface-raised text-ink-muted hover:text-ink"
            }`}
          >
            <FolderOpen className="size-4" />
            <span>Document Repository ({docs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("id_generator")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "id_generator"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-surface-raised text-ink-muted hover:text-ink"
            }`}
          >
            <QrCode className="size-4" />
            <span>Digital Student ID Card Generator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("class_lists")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "class_lists"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-surface-raised text-ink-muted hover:text-ink"
            }`}
          >
            <Users className="size-4" />
            <span>Official Class Lists &amp; Master Rolls</span>
          </button>
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

      {/* TAB 1: DOCUMENT REPOSITORY */}
      {activeTab === "repository" && (
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-ink">Institutional Document Vault</h3>
              <p className="text-xs text-ink-muted">All uploaded school records classified by retention tier.</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-semibold text-ink focus:border-indigo-600 focus:outline-none"
              >
                <option value="all">All Document Folders</option>
                <option value="policy">Policies &amp; Handbooks</option>
                <option value="admission">Admission Files</option>
                <option value="staff_doc">Staff Contracts</option>
                <option value="restricted_safeguarding">Restricted / Safeguarding</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-left text-xs text-ink">
              <thead className="bg-surface-raised font-mono text-[11px] font-bold uppercase tracking-wider text-ink-muted border-b border-line">
                <tr>
                  <th className="p-3.5">Document Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Access Tier</th>
                  <th className="p-3.5">File Size</th>
                  <th className="p-3.5">Uploaded By</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-surface-raised/60 transition-colors">
                    <td className="p-3.5 font-bold text-ink">
                      <div className="flex items-center gap-2.5">
                        <FileText className="size-4 text-indigo-600 shrink-0" />
                        <span className="line-clamp-1">{doc.name}</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-ink-muted">
                      {doc.category === "policy" && "Policies & Handbook"}
                      {doc.category === "admission" && "Admissions Intake"}
                      {doc.category === "staff_doc" && "Staff Credentials"}
                      {doc.category === "restricted_safeguarding" && "Medical & Safeguarding"}
                    </td>
                    <td className="p-3.5">
                      {doc.accessLevel === "Restricted" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-rose-700">
                          <Lock className="size-3 text-rose-600" />
                          <span>Restricted</span>
                        </span>
                      ) : doc.accessLevel === "Staff Only" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-700">
                          <ShieldCheck className="size-3 text-amber-600" />
                          <span>Staff Only</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
                          <span>Public</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 font-mono text-ink-muted">{doc.fileSize}</td>
                    <td className="p-3.5 text-ink-soft">{doc.uploadedBy}</td>
                    <td className="p-3.5 font-mono text-[11px] text-ink-muted">{doc.uploadedAt}</td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => showToast(`Downloaded "${doc.name}" securely.`)}
                        className="rounded-xl border border-line bg-surface-raised px-2.5 py-1 font-mono text-[11px] font-semibold text-ink hover:border-indigo-600"
                      >
                        <Download className="size-3 text-indigo-600 inline mr-1" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: STUDENT ID CARD GENERATOR */}
      {activeTab === "id_generator" && (
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-ink">Dynamic Student ID Card Studio</h3>
              <p className="text-xs text-ink-muted">
                Generate official high-resolution, PVC-standard Student Identification Cards with secure barcode credentials.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-ink-muted">Select Student:</label>
              <select
                value={selectedStudent.id}
                onChange={(e) => {
                  const found = PRESET_STUDENTS.find((s) => s.id === e.target.value);
                  if (found) setSelectedStudent(found);
                }}
                className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-bold text-ink focus:border-indigo-600 focus:outline-none"
              >
                {PRESET_STUDENTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.fullName} ({s.studentNumber})
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => showToast(`Sending ID card for ${selectedStudent.fullName} to high-res card printer.`)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
              >
                <Printer className="size-3.5" />
                <span>Print Card</span>
              </button>
            </div>
          </div>

          {/* ID CARD PREVIEW (FRONT & BACK) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-3xl bg-surface-raised/40 border border-line">
            {/* FRONT OF CARD */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold text-ink-muted block text-center">
                Front Face (CR80 PVC Standard)
              </span>
              <div className="w-full max-w-sm mx-auto aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-5 shadow-xl relative overflow-hidden flex flex-col justify-between border border-white/10">
                {/* Background watermarks */}
                <div className="absolute -right-10 -bottom-10 size-44 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-white/15 pb-2">
                  <div>
                    <h4 className="font-black text-xs tracking-wider uppercase">Riverside College</h4>
                    <span className="text-[9px] text-white/70 font-mono tracking-widest block">STUDENT IDENTITY CARD</span>
                  </div>
                  <span className="font-mono text-[9px] bg-white/20 px-2 py-0.5 rounded font-bold">
                    {selectedStudent.academicYear}
                  </span>
                </div>

                {/* Card Center: Avatar + Info */}
                <div className="flex items-center gap-4 my-2">
                  <div
                    className={`size-16 rounded-xl bg-gradient-to-tr ${selectedStudent.avatarGradient} text-white flex items-center justify-center font-black text-2xl shadow-md border-2 border-white/40 shrink-0`}
                  >
                    {selectedStudent.avatarInitial}
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <h5 className="font-black text-sm text-white leading-tight">{selectedStudent.fullName}</h5>
                    <p className="font-mono text-[11px] text-indigo-300 font-bold">{selectedStudent.studentNumber}</p>
                    <p className="text-[10px] text-white/80">{selectedStudent.className}</p>
                    <p className="text-[9px] text-white/60 font-mono">DOB: {selectedStudent.dob}</p>
                  </div>
                </div>

                {/* Card Footer with Barcode graphic */}
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[9px] font-mono text-white/70">
                  <div className="space-y-0.5">
                    <span>BLOOD GROUP: {selectedStudent.bloodGroup}</span>
                    <span className="block font-bold text-white/90">VALID THRU: 08/2026</span>
                  </div>
                  <div className="bg-white px-2 py-1 rounded text-slate-950 font-black tracking-widest text-[9px]">
                    ||| | |||| | |||
                  </div>
                </div>
              </div>
            </div>

            {/* BACK OF CARD */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold text-ink-muted block text-center">
                Reverse Face (Security &amp; Emergency)
              </span>
              <div className="w-full max-w-sm mx-auto aspect-[1.586/1] rounded-2xl bg-slate-900 text-white p-5 shadow-xl relative overflow-hidden flex flex-col justify-between border border-white/10 text-xs">
                {/* Magnetic Stripe simulation */}
                <div className="w-full h-8 bg-black/80 -mx-5 -mt-2 mb-2 rounded-t" />

                <div className="space-y-1.5 text-[10px] text-white/80">
                  <p className="leading-snug">
                    This card remains the property of <strong>Riverside International College</strong>. If found, please return to Registry Office or call:
                  </p>
                  <p className="font-mono font-bold text-indigo-300">
                    Emergency: {selectedStudent.emergencyContact} ({selectedStudent.guardianName})
                  </p>
                  <p className="text-[9px] text-white/60">
                    12 Admiralty Way, Victoria Island, Lagos · security@riverside.edu
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/15 text-[9px] font-mono text-white/70">
                  <div className="space-y-0.5">
                    <span className="block">AUTHORIZED SIGNATURE</span>
                    <span className="italic text-indigo-300">Dr. Evelyn Peters, Ph.D.</span>
                  </div>
                  <div className="size-10 bg-white p-1 rounded flex items-center justify-center text-slate-950">
                    <QrCode className="size-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: OFFICIAL CLASS ROLLS */}
      {activeTab === "class_lists" && (
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-ink">Official Class Master Rolls</h3>
              <p className="text-xs text-ink-muted">Generate certified class lists with guardian details for faculty registers.</p>
            </div>
            <button
              type="button"
              onClick={() => showToast("Exporting Master Rolls for all 32 class arms.")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3.5 py-1.5 text-xs font-bold text-ink hover:border-indigo-600"
            >
              <Download className="size-3.5 text-indigo-600" />
              <span>Export All Classes (PDF)</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl border border-line bg-surface-raised/40 space-y-3">
            <div className="flex items-center justify-between border-b border-line pb-2">
              <div>
                <span className="font-bold text-sm text-ink">Class Arm: SSS 2A Science (34 Students)</span>
                <span className="text-xs text-ink-muted block">Form Master: Mr. David Alabi · Classroom: Science Block Rm 104</span>
              </div>
              <button
                type="button"
                onClick={() => showToast("Class register for SSS 2A printed.")}
                className="rounded-xl bg-indigo-600 px-3 py-1 font-mono text-xs font-bold text-white shadow-sm hover:bg-indigo-700"
              >
                Print Roster
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-surface border border-line-soft font-mono">
                <span>1. Tobi Adeleke (RC-2023-0184)</span>
                <span className="text-ink-muted">Guardian: Mrs. Zainab Adeleke (+234 802 345 6789)</span>
                <span className="text-emerald-600 font-bold">Enrolled</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-surface border border-line-soft font-mono">
                <span>2. Oluwaseun Balogun (RC-2023-0185)</span>
                <span className="text-ink-muted">Guardian: Chief T. Balogun (+234 703 118 7632)</span>
                <span className="text-emerald-600 font-bold">Enrolled</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD DOCUMENT */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2 text-ink">
                <Upload className="size-5 text-indigo-600" />
                <h3 className="text-base font-extrabold">Upload School Document</h3>
              </div>
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="text-ink-muted hover:text-ink"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-ink-muted mb-1">Document Title</label>
                <input
                  type="text"
                  placeholder="e.g. Approved Academic Calendar 2026.pdf"
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-muted mb-1">Category &amp; Access Tier</label>
                <select className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink">
                  <option value="policy">Policy / Handbook (Public)</option>
                  <option value="admission">Admission Intake Forms (Staff Only)</option>
                  <option value="staff_doc">Staff Contracts &amp; Credentials (Restricted)</option>
                  <option value="safeguarding">Medical / Safeguarding File (Restricted)</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-line rounded-2xl p-6 text-center text-ink-muted">
                <Upload className="size-8 mx-auto text-indigo-500 mb-2" />
                <span className="font-semibold block text-ink">Drag &amp; drop PDF, Excel, or Word doc</span>
                <span className="text-[11px] text-ink-muted">Up to 25MB per document</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setUploadModalOpen(false);
                  showToast("Document uploaded and indexed in repository.");
                }}
                className="rounded-xl bg-indigo-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-indigo-700"
              >
                Upload File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
