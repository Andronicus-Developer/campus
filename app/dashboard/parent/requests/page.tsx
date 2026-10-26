"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  ClipboardCheck,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Search,
  Filter,
  User,
  Building2,
  Calendar,
  ShieldCheck,
  Send,
  HelpCircle,
} from "lucide-react";
import { CHILDREN_PROFILES, ChildProfile } from "@/lib/family-data";

interface SchoolServiceRequest {
  id: string;
  childName: string;
  category: "Planned Leave of Absence" | "Enrollment Verification Letter (Visa/Embassy)" | "Academic Recommendation Letter" | "Profile / Address Update";
  routedTo: string;
  dateSubmitted: string;
  details: string;
  documentRef?: string;
  status: "approved" | "under_review" | "action_required" | "rejected";
  officialResponse?: string;
  downloadableDoc?: string;
}

export default function ParentRequestsPage() {
  const [selectedChildId, setSelectedChildId] = useState<string>("child-1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form states
  const [reqCategory, setReqCategory] = useState<SchoolServiceRequest["category"]>("Enrollment Verification Letter (Visa/Embassy)");
  const [reqDetails, setReqDetails] = useState("Official bonafide student letter addressed to the Canadian High Commission for family summer travel visa application.");
  const [reqDoc, setReqDoc] = useState("Flight_Booking_Itinerary.pdf");

  const activeChild =
    CHILDREN_PROFILES.find((c) => c.id === selectedChildId) || CHILDREN_PROFILES[0];

  const [requests, setRequests] = useState<SchoolServiceRequest[]>([
    {
      id: "REQ-2026-081",
      childName: "Tobi Adeleke",
      category: "Enrollment Verification Letter (Visa/Embassy)",
      routedTo: "Engr. Patrick Bassey (Director of Registry)",
      dateSubmitted: "Jan 22, 2026",
      details: "Official bonafide student letter addressed to the Canadian High Commission for family summer travel visa application.",
      documentRef: "Flight_Booking_Itinerary.pdf",
      status: "approved",
      officialResponse: "Certified letter generated with school watermarked stamp and digital QR verification code.",
      downloadableDoc: "Riverside_Bonafide_Enrollment_Letter_Tobi_Adeleke.pdf",
    },
    {
      id: "REQ-2026-078",
      childName: "Maryam Adeleke",
      category: "Planned Leave of Absence",
      routedTo: "Ms. Chioma Okon (Form Teacher) & VP Pastoral",
      dateSubmitted: "Jan 24, 2026",
      details: "Requesting 1-day excused absence on Feb 13, 2026 to travel with family for grandmother's 80th birthday thanksgiving.",
      status: "under_review",
      officialResponse: "Application received. Form Teacher checking syllabus impact for missed French & Math classes.",
    },
    {
      id: "REQ-2026-074",
      childName: "Tobi Adeleke",
      category: "Academic Recommendation Letter",
      routedTo: "Dr. Harrison Peters (Principal)",
      dateSubmitted: "Jan 15, 2026",
      details: "Principal recommendation letter for Pan-African STEM Leadership Academy application.",
      status: "approved",
      officialResponse: "Signed by Principal Dr. Peters. Original dispatched via courier, digital copy available below.",
      downloadableDoc: "Principal_Endorsement_Letter_Tobi.pdf",
    },
  ]);

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqDetails.trim()) return;

    let targetStaff = "Engr. Patrick Bassey (Registry)";
    if (reqCategory === "Planned Leave of Absence") {
      targetStaff = `${activeChild.classTeacher.name} & Vice Principal`;
    } else if (reqCategory === "Academic Recommendation Letter") {
      targetStaff = "Dr. Harrison Peters (Principal's Office)";
    }

    const newReq: SchoolServiceRequest = {
      id: `REQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      childName: activeChild.name,
      category: reqCategory,
      routedTo: targetStaff,
      dateSubmitted: "Today",
      details: reqDetails,
      documentRef: reqDoc,
      status: "under_review",
      officialResponse: `Assigned to ${targetStaff}. Standard turnaround time: 48 working hours.`,
    };

    setRequests([newReq, ...requests]);
    setIsModalOpen(false);
    setToast(
      `Service request ${newReq.id} recorded for ${activeChild.preferredName}. Routed to ${targetStaff}.`
    );
  };

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <ClipboardCheck className="w-4 h-4" />
              Administrative Self-Service · Section J
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Leave, Absence &amp; School Requests
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Submit planned leave notices, request official enrollment/embassy letters, and track administrative approvals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              New Administrative Request
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

        {/* Automatic Routing Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-foreground">Intelligent Departmental Routing:</span>{" "}
            <span className="text-muted-foreground">
              Requests are dynamically routed to the appropriate school official (Class Teacher for leave, Registry for bonafide certificates, Bursar for fee adjustments, and Principal for formal recommendations).
            </span>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-foreground">Active &amp; Historical Service Requests</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requests.map((r) => (
              <div
                key={r.id}
                className="p-6 rounded-3xl bg-card border border-border hover:border-pink-500/30 transition shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-pink-600 font-bold">{r.id}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        r.status === "approved"
                          ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                          : r.status === "under_review"
                          ? "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800"
                          : "bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200 dark:border-blue-800"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground leading-snug">{r.category}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    For Student: <strong>{r.childName}</strong> · Submitted: {r.dateSubmitted}
                  </p>

                  <div className="mt-3 p-3.5 rounded-2xl bg-canvas border border-border space-y-2 text-xs">
                    <div className="text-muted-foreground">
                      Assigned Reviewer: <span className="font-semibold text-foreground">{r.routedTo}</span>
                    </div>
                    <div className="text-foreground leading-relaxed italic">"{r.details}"</div>
                    {r.documentRef && (
                      <div className="text-[11px] text-blue-600 flex items-center gap-1 mt-1">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Supporting File: {r.documentRef}</span>
                      </div>
                    )}
                  </div>

                  {r.officialResponse && (
                    <div className="mt-3 p-3 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-xs text-pink-800 dark:text-pink-300">
                      <strong>School Administration Response:</strong> {r.officialResponse}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border text-xs">
                  {r.downloadableDoc ? (
                    <button
                      onClick={() => {
                        alert(`Downloading certified document: ${r.downloadableDoc}`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold transition shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Official Letter
                    </button>
                  ) : (
                    <span className="text-muted-foreground text-[11px] italic">
                      Staff review in progress...
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: Create Request */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-pink-600" />
                  <h3 className="font-bold text-foreground text-base">New School Service Request</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateRequest} className="space-y-3.5 text-xs">
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
                  <label className="font-semibold text-foreground block mb-1">Request Category</label>
                  <select
                    value={reqCategory}
                    onChange={(e) => setReqCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    <option value="Enrollment Verification Letter (Visa/Embassy)">
                      Enrollment Verification Letter (Visa / Embassy / Passport)
                    </option>
                    <option value="Planned Leave of Absence">
                      Planned Leave of Absence (Excursion / Travel / Medical)
                    </option>
                    <option value="Academic Recommendation Letter">
                      Academic Recommendation Letter (Principal Endorsement)
                    </option>
                    <option value="Profile / Address Update">
                      Registry Profile / Contact Update
                    </option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Details &amp; Specific Purpose</label>
                  <textarea
                    rows={3}
                    placeholder="Provide specific institution address or dates for absence..."
                    value={reqDetails}
                    onChange={(e) => setReqDetails(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Attach Supporting Document / Itinerary</label>
                  <input
                    type="text"
                    value={reqDoc}
                    onChange={(e) => setReqDoc(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  />
                  <span className="text-[11px] text-muted-foreground mt-0.5 block">
                    Upload flight ticket, visa appointment slip, or medical note (PDF/JPG)
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold"
                  >
                    Transmit Request
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
