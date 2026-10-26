"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  FileSpreadsheet,
  Download,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ShieldCheck,
  Plus,
  Eye,
  Check,
  FolderOpen,
} from "lucide-react";
import { CHILDREN_PROFILES, FAMILY_DATA } from "@/lib/family-data";

interface SchoolDocument {
  id: string;
  title: string;
  type: "Downloadable Record" | "Required Compliance Upload" | "Digital Sign Form";
  childOrFamily: string;
  category: "Academic Transcript" | "Fee Receipt" | "Enrollment & Legal" | "Health & Medical";
  date: string;
  status: "accepted" | "under_review" | "required" | "downloadable";
  fileName?: string;
  fileSize?: string;
}

export default function ParentDocumentsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "downloads" | "uploads">("all");
  const [toast, setToast] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Form states
  const [uploadDocType, setUploadDocType] = useState("Updated Immunization & Vaccination Card");
  const [uploadChild, setUploadChild] = useState("Maryam Adeleke (Grade 8)");
  const [uploadFileName, setUploadFileName] = useState("Maryam_Vaccination_Record_2026.pdf");

  const [documents, setDocuments] = useState<SchoolDocument[]>([
    {
      id: "DOC-01",
      title: "Term 1 Verified Official Academic Report Card",
      type: "Downloadable Record",
      childOrFamily: "Tobi Adeleke (Grade 11)",
      category: "Academic Transcript",
      date: "Jan 25, 2026",
      status: "downloadable",
      fileName: "Tobi_Adeleke_Report_Card_Term1_2026.pdf",
      fileSize: "1.4 MB",
    },
    {
      id: "DOC-02",
      title: "Term 1 Verified Official Academic Report Card",
      type: "Downloadable Record",
      childOrFamily: "Maryam Adeleke (Grade 8)",
      category: "Academic Transcript",
      date: "Jan 25, 2026",
      status: "downloadable",
      fileName: "Maryam_Adeleke_Report_Card_Term1_2026.pdf",
      fileSize: "1.2 MB",
    },
    {
      id: "DOC-03",
      title: "Official Tuition Settlement Receipt #REC-2026-0004",
      type: "Downloadable Record",
      childOrFamily: "Tobi Adeleke (Grade 11)",
      category: "Fee Receipt",
      date: "Jan 22, 2026",
      status: "downloadable",
      fileName: "Official_Receipt_REC-2026-0004.pdf",
      fileSize: "480 KB",
    },
    {
      id: "DOC-04",
      title: "Bonafide Student Verification Letter (Embassy/Visa)",
      type: "Downloadable Record",
      childOrFamily: "Tobi Adeleke (Grade 11)",
      category: "Enrollment & Legal",
      date: "Jan 23, 2026",
      status: "downloadable",
      fileName: "Riverside_Enrollment_Letter_Tobi_Adeleke.pdf",
      fileSize: "820 KB",
    },
    {
      id: "DOC-05",
      title: "Residential Utility Proof of Address Document",
      type: "Required Compliance Upload",
      childOrFamily: "Family File #FAM-0492",
      category: "Enrollment & Legal",
      date: "Jan 10, 2026",
      status: "accepted",
      fileName: "Lekki_Utility_Bill_Adeleke.pdf",
      fileSize: "1.8 MB",
    },
    {
      id: "DOC-06",
      title: "Updated Immunization & Vaccination Record",
      type: "Required Compliance Upload",
      childOrFamily: "Maryam Adeleke (Grade 8)",
      category: "Health & Medical",
      date: "Pending Upload",
      status: "required",
    },
  ]);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: SchoolDocument = {
      id: `DOC-0${documents.length + 1}`,
      title: uploadDocType,
      type: "Required Compliance Upload",
      childOrFamily: uploadChild,
      category: "Health & Medical",
      date: "Today",
      status: "under_review",
      fileName: uploadFileName,
      fileSize: "1.1 MB",
    };

    setDocuments([newDoc, ...documents]);
    setIsUploadModalOpen(false);
    setToast(`Document "${uploadFileName}" uploaded to Registry. Staff review in progress.`);
  };

  const filteredDocs = documents.filter((doc) => {
    if (activeTab === "downloads") return doc.type === "Downloadable Record";
    if (activeTab === "uploads") return doc.type === "Required Compliance Upload";
    return true;
  });

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <FileSpreadsheet className="w-4 h-4" />
              Document Vault &amp; Registry Forms · Section L
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Documents, Certificates &amp; Digital Forms
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Download certified report cards, bursary receipts, and submit mandatory health or enrollment files.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Upload className="w-4 h-4" />
              Upload Required Document
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

        {/* Status Tracker Tabs */}
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "all"
                ? "bg-pink-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All Family Documents ({documents.length})
          </button>
          <button
            onClick={() => setActiveTab("downloads")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "downloads"
                ? "bg-pink-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Downloadable School Records
          </button>
          <button
            onClick={() => setActiveTab("uploads")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "uploads"
                ? "bg-pink-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Required Family Uploads
          </button>
        </div>

        {/* Documents Table */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Document Title</th>
                  <th className="py-3 px-4">Subject Student / Account</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4">Issue / Upload Date</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-foreground flex items-center gap-2">
                        <FileText className="w-4 h-4 text-pink-600 flex-shrink-0" />
                        <span>{doc.title}</span>
                      </div>
                      {doc.fileName && (
                        <div className="text-[11px] text-muted-foreground font-mono ml-6">
                          {doc.fileName} · {doc.fileSize}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-foreground font-medium">
                      {doc.childOrFamily}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-canvas border border-border text-foreground">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground text-xs">
                      {doc.date}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {doc.status === "downloadable" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> Ready
                        </span>
                      )}
                      {doc.status === "accepted" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200 dark:border-blue-800">
                          <Check className="w-3 h-3" /> Registry Accepted
                        </span>
                      )}
                      {doc.status === "under_review" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800">
                          <Clock className="w-3 h-3" /> Under Review
                        </span>
                      )}
                      {doc.status === "required" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800">
                          <AlertCircle className="w-3 h-3" /> Action Required
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {doc.status === "downloadable" ? (
                        <button
                          onClick={() => {
                            alert(`Downloading certified PDF: ${doc.fileName}`);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold transition"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      ) : doc.status === "required" ? (
                        <button
                          onClick={() => setIsUploadModalOpen(true)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition"
                        >
                          <Upload className="w-3 h-3" />
                          Upload Now
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            alert(`Viewing document record: ${doc.title}`);
                          }}
                          className="px-2.5 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-medium text-foreground transition"
                        >
                          Details
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Upload Document */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-pink-600" />
                  <h3 className="font-bold text-foreground text-base">Upload Compliance Document</h3>
                </div>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Student / Beneficiary</label>
                  <select
                    value={uploadChild}
                    onChange={(e) => setUploadChild(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    <option value="Maryam Adeleke (Grade 8)">Maryam Adeleke (Grade 8)</option>
                    <option value="Tobi Adeleke (Grade 11)">Tobi Adeleke (Grade 11)</option>
                    <option value="Family File #FAM-0492">General Family File #FAM-0492</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Document Classification</label>
                  <select
                    value={uploadDocType}
                    onChange={(e) => setUploadDocType(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    <option value="Updated Immunization & Vaccination Card">
                      Updated Immunization &amp; Vaccination Card
                    </option>
                    <option value="Certified Medical Fitness Report">Certified Medical Fitness Report</option>
                    <option value="Birth Certificate / Passport Copy">Birth Certificate / International Passport</option>
                    <option value="Custody / Guardian Legal Order">Custody / Guardian Legal Order</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Select File (PDF, JPG or PNG)</label>
                  <input
                    type="text"
                    value={uploadFileName}
                    onChange={(e) => setUploadFileName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground font-mono"
                    required
                  />
                  <span className="text-[11px] text-muted-foreground mt-0.5 block">
                    Upload file from device (Max 10 MB per file)
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
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
