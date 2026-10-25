"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  FileSpreadsheet,
  FileText,
  Download,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface IssuedDocument {
  id: string;
  name: string;
  issuedBy: string;
  issueDate: string;
  fileSize: string;
  docType: "Enrollment Certificate" | "Transcript" | "Clearance Slip" | "Sports Letter";
  hash: string;
}

interface DocumentRequest {
  id: string;
  docType: string;
  purpose: string;
  urgency: "Standard (3-5 Days)" | "Urgent (24 Hours)";
  requestDate: string;
  status: "Pending Review" | "Registrar Processing" | "Ready for Download";
  readyDocId?: string;
}

export default function StudentDocumentsPage() {
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestedDocType, setRequestedDocType] = useState("Bonafide Enrollment Certificate");
  const [requestPurpose, setRequestPurpose] = useState("");
  const [requestUrgency, setRequestUrgency] = useState<"Standard (3-5 Days)" | "Urgent (24 Hours)">("Standard (3-5 Days)");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [issuedDocs, setIssuedDocs] = useState<IssuedDocument[]>([
    {
      id: "DOC-2026-018",
      name: "Official Bonafide Student Enrollment Certificate",
      issuedBy: "Directorate of Admissions & Registry",
      issueDate: "Jan 12, 2026",
      fileSize: "680 KB (PDF)",
      docType: "Enrollment Certificate",
      hash: "SHA256-ENR-2026-0184-OK",
    },
    {
      id: "DOC-2026-009",
      name: "Term 1 Certified Official Academic Transcript",
      issuedBy: "Academic Examination Secretariat & CAO",
      issueDate: "Dec 18, 2025",
      fileSize: "1.4 MB (PDF)",
      docType: "Transcript",
      hash: "SHA256-TRN-2025-0184-T1",
    },
    {
      id: "DOC-2026-003",
      name: "Riverside Central Library Clearance Docket",
      issuedBy: "Chief School Librarian",
      issueDate: "Jan 08, 2026",
      fileSize: "420 KB (PDF)",
      docType: "Clearance Slip",
      hash: "SHA256-LIB-2026-0184-CLR",
    },
    {
      id: "DOC-2025-088",
      name: "National STEM Olympiad Delegate Delegation Letter",
      issuedBy: "Dr. Evelyn Peters, Ph.D. (Principal)",
      issueDate: "Nov 24, 2025",
      fileSize: "550 KB (PDF)",
      docType: "Sports Letter",
      hash: "SHA256-OLY-2025-0184-PRN",
    },
  ]);

  const [requests, setRequests] = useState<DocumentRequest[]>([
    {
      id: "REQ-8941",
      docType: "Embassy Visa Support Letter (Summer Science Camp)",
      purpose: "Attendance at International Youth Robotics Exhibition in Manchester, UK.",
      urgency: "Standard (3-5 Days)",
      requestDate: "Feb 06, 2026",
      status: "Registrar Processing",
    },
    {
      id: "REQ-8910",
      docType: "Bonafide Enrollment Certificate",
      purpose: "Bank education trust verification.",
      urgency: "Standard (3-5 Days)",
      requestDate: "Jan 10, 2026",
      status: "Ready for Download",
      readyDocId: "DOC-2026-018",
    },
  ]);

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestPurpose.trim()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setRequests((prev) => [
        {
          id: `REQ-${Math.floor(8950 + Math.random() * 50)}`,
          docType: requestedDocType,
          purpose: requestPurpose,
          urgency: requestUrgency,
          requestDate: "Today",
          status: "Pending Review",
        },
        ...prev,
      ]);
      setIsSubmitting(false);
      setRequestPurpose("");
      setRequestModalOpen(false);
      alert(`Official document request for "${requestedDocType}" registered with the Registry.`);
    }, 1200);
  };

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <FileSpreadsheet className="size-4" />
              Student Portal · Official Letters & Transcripts
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Official Documents & Letters
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Download authenticated school certificates, letters of bonafide enrollment, and request new attestations.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setRequestModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Plus className="size-4" />
              Request Official Document
            </button>
          </div>
        </div>

        {/* Verification Policy Notice */}
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs flex items-start gap-3">
          <ShieldCheck className="size-5 text-cyan-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-ink-soft">
            <span className="font-bold text-ink block">Document Authenticity & Cryptographic Verification</span>
            <p>
              Official letters and transcripts generated through Riverside College include an embedded SHA-256 digital
              hash and cryptographic QR seal. Embassies, universities, and scholarship foundations can verify document
              validity against the central registrar database.
            </p>
          </div>
        </div>

        {/* Ready to Download Documents */}
        <div className="rounded-3xl bg-card border border-border p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-extrabold text-foreground text-base">Released Official Documents</h3>
            <span className="text-xs font-medium text-emerald-600">{issuedDocs.length} Documents Available</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {issuedDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-5 rounded-2xl border border-border bg-canvas flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 px-2 py-0.5 rounded-md bg-card border border-border">
                      {doc.docType}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">{doc.id}</span>
                  </div>

                  <h4 className="font-bold text-foreground text-sm mt-1">{doc.name}</h4>

                  <div className="text-[11px] text-muted-foreground mt-2 space-y-0.5">
                    <div>Issued by: <strong className="text-foreground">{doc.issuedBy}</strong></div>
                    <div>Date: {doc.issueDate} · Size: {doc.fileSize}</div>
                    <div className="font-mono text-[10px] text-cyan-600 truncate">Seal: {doc.hash}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> Digitally Signed
                  </span>

                  <button
                    onClick={() => alert(`Downloading verified cryptographic PDF for ${doc.name}`)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs shadow-xs transition"
                  >
                    <Download className="size-3.5" />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Request Tracking Queue */}
        <div className="rounded-3xl bg-card border border-border p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-extrabold text-foreground text-base">Document Requests & Status</h3>
            <span className="text-xs text-muted-foreground">Tracking {requests.length} Requests</span>
          </div>

          <div className="space-y-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-canvas border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-foreground text-sm">{req.docType}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">({req.id})</span>
                    <span className="text-muted-foreground">· Priority: {req.urgency}</span>
                  </div>
                  <p className="text-muted-foreground">{req.purpose}</p>
                  <span className="text-[11px] font-mono text-muted-foreground block pt-0.5">
                    Requested on: {req.requestDate}
                  </span>
                </div>

                <div className="shrink-0 flex items-center gap-3 self-start sm:self-auto">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      req.status === "Ready for Download"
                        ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
                        : "bg-amber-500/15 text-amber-600 border border-amber-500/30"
                    }`}
                  >
                    {req.status}
                  </span>

                  {req.status === "Ready for Download" && (
                    <button
                      onClick={() => alert(`Downloading ready document for request ${req.id}`)}
                      className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs"
                    >
                      Download
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Official Document Modal */}
        {requestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface border border-line rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <Send className="size-5 text-cyan-600" />
                  <h3 className="text-base font-extrabold text-ink">Request Official Document / Letter</h3>
                </div>
                <button
                  onClick={() => setRequestModalOpen(false)}
                  className="size-7 rounded-lg hover:bg-surface-raised flex items-center justify-center text-ink-muted"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                Submit a document requisition to the Admissions & Records Directorate. Certificates are cryptographically
                signed and bear the official school seal.
              </p>

              <form onSubmit={handleCreateRequest} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-ink font-semibold mb-1">Document Type</label>
                  <select
                    value={requestedDocType}
                    onChange={(e) => setRequestedDocType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none"
                  >
                    <option value="Bonafide Enrollment Certificate">Bonafide Student Enrollment Certificate</option>
                    <option value="Embassy Visa Support Letter">Embassy / Visa Support Letter</option>
                    <option value="Certified Academic Transcript">Official Certified Academic Transcript</option>
                    <option value="Recommendation Letter">Principal / Form Master Recommendation Letter</option>
                    <option value="Character Testimonial">Student Character & Conduct Testimonial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-1">Processing Urgency</label>
                  <select
                    value={requestUrgency}
                    onChange={(e) => setRequestUrgency(e.target.value as "Standard (3-5 Days)" | "Urgent (24 Hours)")}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none"
                  >
                    <option value="Standard (3-5 Days)">Standard Processing (3-5 Working Days)</option>
                    <option value="Urgent (24 Hours)">Urgent Priority (24-Hour Express Review)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-1">Purpose / Addressed Entity</label>
                  <textarea
                    rows={3}
                    required
                    value={requestPurpose}
                    onChange={(e) => setRequestPurpose(e.target.value)}
                    placeholder="e.g. For submission to the UK High Commission for Summer STEM camp visa application..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRequestModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line hover:bg-surface-raised font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Requisition"}
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
