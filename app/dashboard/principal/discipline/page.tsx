"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  AlertOctagon,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  HeartHandshake,
  Lock,
  MessageSquare,
  Phone,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
  Users,
  XCircle,
} from "lucide-react";

interface IncidentCase {
  id: string;
  studentName: string;
  admissionNo: string;
  classArm: string;
  category: "routine" | "escalated" | "safeguarding";
  infraction: string;
  reportedBy: string;
  date: string;
  location: string;
  recommendedAction: string;
  principalDecision?: string;
  parentNotified: boolean;
  status: "pending_review" | "resolved" | "conference_booked";
}

const INITIAL_INCIDENTS: IncidentCase[] = [
  {
    id: "inc-1",
    studentName: "Somtochukwu Eze",
    admissionNo: "RC-2023-0105",
    classArm: "SSS 2 Commercial",
    category: "routine",
    infraction: "Persistent unauthorized mobile phone usage during Financial Accounting lectures",
    reportedBy: "Mr. Friday Eze (Subject Teacher)",
    date: "Feb 18, 2026",
    location: "Commercial Block Classroom 4",
    recommendedAction: "Device confiscation for 1 week and written reflective essay.",
    principalDecision: "Approved: Device placed in safe custody. Form Master to counsel.",
    parentNotified: true,
    status: "resolved",
  },
  {
    id: "inc-2",
    studentName: "Chukwuma Obi",
    admissionNo: "RC-2024-0312",
    classArm: "SSS 2 Science A",
    category: "escalated",
    infraction: "Classroom disruption and insubordination to Biology cover instructor during double practical period",
    reportedBy: "Mr. Emmanuel Peters (Cover Teacher)",
    date: "Feb 17, 2026",
    location: "Science Lab 1",
    recommendedAction: "Formal parental summons and 2-day internal study isolation.",
    status: "pending_review",
    parentNotified: true,
  },
  {
    id: "inc-3",
    studentName: "Protected Case (Confidential)",
    admissionNo: "RC-2024-XXXX",
    classArm: "Junior Division",
    category: "safeguarding",
    infraction: "Student welfare and trauma concern flagged during pastoral counseling interview",
    reportedBy: "Mrs. Ngozi Udoh (Pastoral Lead)",
    date: "Feb 16, 2026",
    location: "Counseling Suite",
    recommendedAction: "Tightly restricted safeguarding protocol. Direct referral to Designated Safeguarding Lead.",
    status: "pending_review",
    parentNotified: false,
  },
];

export default function PrincipalDisciplinePage() {
  const [incidents, setIncidents] = useState<IncidentCase[]>(INITIAL_INCIDENTS);
  const [activeTab, setActiveTab] = useState<"routine" | "conferences" | "safeguarding">("routine");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleApproveAction = (id: string, action: string) => {
    setIncidents((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "resolved", principalDecision: action } : i
      )
    );
    showToast(`Disciplinary sanction authorized and recorded in student behavioral dossier.`);
  };

  return (
    <DashboardLayout currentRole="principal">
      <div className="space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950 px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in slide-in-from-top-3">
            <CheckCircle2 className="size-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                  Section H · Discipline &amp; Student Welfare
                </span>
                <span className="font-mono text-xs text-ink-muted">Pastoral Board</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Student Conduct &amp; Welfare Oversight</h2>
              <p className="text-xs text-ink-muted max-w-3xl">
                Review behavioral referrals, approve disciplinary interventions in compliance with school policy, coordinate parent conferences, and oversee protected safeguarding cases with strict confidentiality boundaries.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Routine Infractions (Term 2)</span>
                <span className="text-lg font-black text-ink">14 Resolved (93%)</span>
              </div>
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Pending Principal Review</span>
                <span className="text-lg font-black text-amber-600">
                  {incidents.filter((i) => i.status === "pending_review").length} Cases
                </span>
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("routine")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "routine"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Disciplinary Referrals ({incidents.filter((i) => i.category !== "safeguarding").length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("conferences")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "conferences"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Parent Conferences Scheduled (2)
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("safeguarding")}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "safeguarding"
                    ? "bg-purple-700 text-white shadow-sm"
                    : "bg-purple-50 text-purple-900 border border-purple-200"
                }`}
              >
                <Lock className="size-3.5" />
                <span>Restricted Safeguarding &amp; Welfare (1)</span>
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs text-ink-muted">
              <ShieldAlert className="size-3.5 text-amber-600" />
              <span>Routine discipline partitioned from sensitive welfare files</span>
            </div>
          </div>
        </div>

        {/* TAB 1: DISCIPLINARY REFERRALS */}
        {activeTab === "routine" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Teacher Incident Referrals &amp; Escalations</h3>
                <p className="text-xs text-ink-muted">
                  Requires Principal authorization before applying internal suspension or formal behavioral demerits.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-primary">
                {incidents.filter((i) => i.status === "pending_review" && i.category !== "safeguarding").length} Pending Authorization
              </span>
            </div>

            <div className="space-y-3">
              {incidents
                .filter((i) => i.category !== "safeguarding")
                .map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-line bg-surface-raised p-5 space-y-3 transition-all hover:border-primary/40"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                              item.category === "escalated" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {item.category} Incident
                          </span>
                          <span className="font-mono text-xs text-ink-muted">{item.date}</span>
                          <span className="text-slate-300">•</span>
                          <span className="font-mono text-xs text-ink-muted">{item.location}</span>
                        </div>

                        <h4 className="text-base font-bold text-ink">
                          {item.studentName}{" "}
                          <span className="font-mono text-xs font-semibold text-primary">
                            ({item.admissionNo} · {item.classArm})
                          </span>
                        </h4>

                        <p className="text-xs text-ink font-medium leading-relaxed bg-surface border border-line-soft p-3 rounded-xl">
                          <strong>Infraction:</strong> {item.infraction}
                        </p>

                        <div className="text-xs text-ink-muted space-y-1">
                          <p>Reported by: <strong>{item.reportedBy}</strong></p>
                          <p>Teacher Recommendation: <strong>{item.recommendedAction}</strong></p>
                        </div>

                        {item.principalDecision && (
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-2.5 text-xs text-emerald-800">
                            <strong>Principal Action Logged:</strong> {item.principalDecision}
                          </div>
                        )}
                      </div>

                      <div className="shrink-0 text-right space-y-2">
                        {item.status === "resolved" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-success-light px-3 py-1 font-mono text-xs font-bold text-success-deep">
                            <CheckCircle2 className="size-3.5" />
                            Sanction Executed
                          </span>
                        ) : (
                          <div className="space-y-2">
                            <button
                              type="button"
                              onClick={() => handleApproveAction(item.id, "Sanction approved: 2-day internal study isolation + parent conference.")}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-ink-soft active:scale-95"
                            >
                              <ShieldCheck className="size-3.5" />
                              <span>Authorize Sanction</span>
                            </button>
                            <span className="block text-[10px] font-mono text-ink-muted">
                              Dispatches SMS to parent
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 2: PARENT CONFERENCES */}
        {activeTab === "conferences" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-ink">Pastoral Parent Conferences</h3>
                <p className="text-xs text-ink-muted">Meetings arranged between parents, Form Masters, and the Principal.</p>
              </div>
              <span className="font-mono text-xs font-bold text-primary">2 Meetings Booked</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ink text-sm">Chukwuma Obi (SSS 2 Science A)</span>
                  <span className="rounded bg-amber-100 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800">
                    Tomorrow, 10:30 AM
                  </span>
                </div>
                <p className="text-ink-muted">Guardian: <strong>Mr. B. Obi (+234 805 778 9900)</strong></p>
                <p className="text-ink-soft">Agenda: Repeated academic disengagement and insubordination in science lab.</p>
                <div className="pt-2 border-t border-line text-[11px] text-ink-muted">
                  Attendees: Dr. Evelyn Peters (Principal), Mr. David Alabi (VP), Form Master
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ink text-sm">Fatima Danjuma (JSS 3 Arts B)</span>
                  <span className="rounded bg-blue-100 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-800">
                    Friday, 02:00 PM
                  </span>
                </div>
                <p className="text-ink-muted">Guardian: <strong>Alhaji S. Danjuma (+234 809 443 2211)</strong></p>
                <p className="text-ink-soft">Agenda: Chronic Monday absenteeism and math remedial agreement.</p>
                <div className="pt-2 border-t border-line text-[11px] text-ink-muted">
                  Attendees: Dr. Evelyn Peters (Principal), Ms. Chioma Okon (Junior Head)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RESTRICTED SAFEGUARDING & WELFARE */}
        {activeTab === "safeguarding" && (
          <div className="rounded-3xl border-2 border-purple-300 bg-purple-50/40 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-purple-200 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-xl bg-purple-200 text-purple-900">
                  <Lock className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-purple-950">Restricted Safeguarding &amp; Welfare Vault</h3>
                  <p className="text-xs text-purple-800/90">
                    Strict isolation protocol: Accessible only to the Principal, Designated Safeguarding Lead (DSL), and School Counselor.
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-purple-200 px-3 py-1 font-mono text-xs font-bold text-purple-900">
                Audit Logged Access
              </span>
            </div>

            <div className="rounded-2xl border border-purple-200 bg-surface p-4 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-900">Case ID: SG-2026-004</span>
                <span className="rounded bg-purple-100 px-2 py-0.5 font-mono text-[10px] font-bold text-purple-800">
                  Under DSL Investigation
                </span>
              </div>
              <p className="text-ink font-semibold">
                Confidential pastoral support plan initiated with external certified adolescent psychologist.
              </p>
              <div className="pt-2 border-t border-line flex items-center justify-between font-mono text-[11px] text-ink-muted">
                <span>Lead Officer: Mrs. Ngozi Udoh (DSL)</span>
                <span>Last Updated: Feb 16, 2026 · Confidential</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
