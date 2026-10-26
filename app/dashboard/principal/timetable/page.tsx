"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  AlertTriangle,
  Building,
  Calendar,
  CalendarDays,
  CheckCircle2,
  Clock,
  DoorOpen,
  Filter,
  GraduationCap,
  Layers,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

interface TimetableChangeRequest {
  id: string;
  requester: string;
  department: string;
  changeType: "Room Swap" | "Period Adjustment" | "Emergency Cover";
  details: string;
  affectedClasses: string;
  status: "pending" | "approved";
}

const INITIAL_REQUESTS: TimetableChangeRequest[] = [
  {
    id: "req-1",
    requester: "Dr. Kenneth Obi (HOD Sciences)",
    department: "Sciences",
    changeType: "Room Swap",
    details: "Move SSS 3 Chemistry from Room 12 to Science Lab 1 on Wednesday Periods 3 & 4 for WAEC titration practicals.",
    affectedClasses: "SSS 3 Science A (34 students)",
    status: "pending",
  },
  {
    id: "req-2",
    requester: "Mr. David Alabi (VP Academics)",
    department: "Academics Timetable Committee",
    changeType: "Period Adjustment",
    details: "Swap Friday Period 6 & 7 to accommodate Inter-House Sports marching rehearsal.",
    affectedClasses: "Entire School (JSS 1 - SSS 3)",
    status: "approved",
  },
];

export default function PrincipalTimetablePage() {
  const [requests, setRequests] = useState<TimetableChangeRequest[]>(INITIAL_REQUESTS);
  const [activeTab, setActiveTab] = useState<"overview" | "requests" | "rooms">("overview");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleApproveRequest = (id: string, details: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
    );
    showToast(`Timetable modification approved! Affected faculty and student portals notified.`);
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
                  Section G · Timetable &amp; Resource Coordination
                </span>
                <span className="font-mono text-xs text-ink-muted">Term 2 Master Schedule</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Timetable Approval &amp; Facility Allocations</h2>
              <p className="text-xs text-ink-muted max-w-3xl">
                Review master class schedules, authorize timetable drafts and emergency adjustments, resolve room scheduling conflicts, and coordinate specialized facility allocations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Conflict Radar</span>
                <span className="text-lg font-black text-emerald-600">0 Collisions Detected</span>
              </div>
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs">
                <span className="text-ink-muted block text-[10px] uppercase font-bold">Total Weekly Periods</span>
                <span className="text-lg font-black text-primary">320 Periods Scheduled</span>
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "overview"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Master Schedule Overview
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("requests")}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "requests"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}
              >
                <Clock className="size-3.5 text-amber-600 animate-pulse" />
                <span>Change Requests ({requests.filter((r) => r.status === "pending").length} Pending)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("rooms")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "rooms"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Specialist Labs &amp; Room Allocations
              </button>
            </div>

            <span className="font-mono text-xs text-ink-muted">
              School Admin/Coordinator sets up · Principal approves academic changes
            </span>
          </div>
        </div>

        {/* TAB 1: MASTER SCHEDULE OVERVIEW */}
        {activeTab === "overview" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Master Daily Schedule Snapshot (Today — Wednesday)</h3>
                <p className="text-xs text-ink-muted">Active periods across senior and junior secondary blocks.</p>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600">8 Periods / Day (40 mins each)</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                    <th className="pb-3 font-bold uppercase">Class Set</th>
                    <th className="pb-3 font-bold uppercase">Period 1 (08:30)</th>
                    <th className="pb-3 font-bold uppercase">Period 2 (09:10)</th>
                    <th className="pb-3 font-bold uppercase">Period 3 (09:50)</th>
                    <th className="pb-3 font-bold uppercase">Period 4 (10:30)</th>
                    <th className="pb-3 font-bold uppercase">Break</th>
                    <th className="pb-3 font-bold uppercase">Period 5 (11:40)</th>
                    <th className="pb-3 font-bold uppercase">Period 6 (12:20)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-soft">
                  {[
                    { arm: "SSS 3 Science A", p1: "Chemistry (Lab 1)", p2: "Chemistry (Lab 1)", p3: "Maths (Rm 12)", p4: "English (Rm 12)", p5: "Physics (Rm 12)", p6: "Civics" },
                    { arm: "SSS 2 Science A", p1: "Further Maths", p2: "Physics (Lab 2)", p3: "Biology", p4: "English", p5: "Maths", p6: "Chemistry" },
                    { arm: "SSS 2 Commercial", p1: "Financial Acct", p2: "Economics", p3: "Commerce", p4: "Maths", p5: "English", p6: "Govt" },
                    { arm: "JSS 3 Arts A", p1: "Basic Science", p2: "Basic Tech", p3: "English Lang", p4: "Social Studies", p5: "Maths", p6: "French" },
                    { arm: "JSS 1 Gold", p1: "Maths", p2: "English Lang", p3: "Basic Science", p4: "PVS", p5: "CRS/IRS", p6: "Art" },
                  ].map((row) => (
                    <tr key={row.arm} className="hover:bg-surface-raised transition-colors">
                      <td className="py-3 font-bold text-ink">{row.arm}</td>
                      <td className="py-3 font-mono text-primary">{row.p1}</td>
                      <td className="py-3 font-mono text-primary">{row.p2}</td>
                      <td className="py-3 font-mono text-ink-soft">{row.p3}</td>
                      <td className="py-3 font-mono text-ink-soft">{row.p4}</td>
                      <td className="py-3 font-mono text-[10px] text-amber-700 font-bold bg-amber-50/50 text-center">BREAK</td>
                      <td className="py-3 font-mono text-ink-soft">{row.p5}</td>
                      <td className="py-3 font-mono text-ink-soft">{row.p6}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: CHANGE REQUESTS */}
        {activeTab === "requests" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-base font-extrabold text-ink">Timetable Modification Requests</h3>
                <p className="text-xs text-ink-muted">
                  Requires Principal authorization to ensure teacher workloads, room allocations, and student timetables remain conflict-free.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-primary">
                {requests.filter((r) => r.status === "pending").length} Awaiting Authorization
              </span>
            </div>

            <div className="space-y-3">
              {requests.map((r) => (
                <div key={r.id} className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2 text-xs">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-primary-light px-2 py-0.5 font-mono text-[10px] font-bold text-primary">
                          {r.changeType}
                        </span>
                        <span className="font-mono text-xs text-ink-muted">{r.department}</span>
                      </div>
                      <h4 className="text-sm font-bold text-ink">{r.details}</h4>
                      <p className="text-ink-muted">Affected: <strong>{r.affectedClasses}</strong></p>
                      <span className="block text-[11px] text-ink-muted">Requested by: {r.requester}</span>
                    </div>

                    <div className="shrink-0 text-right">
                      {r.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success-light px-3 py-1 font-mono text-xs font-bold text-success-deep">
                          <CheckCircle2 className="size-3.5" />
                          Authorized
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleApproveRequest(r.id, r.details)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
                        >
                          <CheckCircle2 className="size-3.5" />
                          <span>Authorize Modification</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SPECIALIST ROOM ALLOCATIONS */}
        {activeTab === "rooms" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-ink">Specialist Laboratories &amp; Facility Occupancy</h3>
                <p className="text-xs text-ink-muted">Real-time scheduling of shared high-demand academic spaces.</p>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600">5 Facilities Active</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Science Lab 1 (Chemistry)", capacity: "40 Workstations", lead: "Dr. Kenneth Obi", status: "Occupied (SSS 3 Chem)", color: "text-emerald-700" },
                { name: "Science Lab 2 (Physics/Biology)", capacity: "36 Workstations", lead: "Mrs. Grace Okon", status: "Available Next Period", color: "text-primary" },
                { name: "ICT Innovation Centre", capacity: "45 PCs & Gigabit LAN", lead: "Engr. Patrick Bassey", status: "JSS 2 Coding Set", color: "text-emerald-700" },
                { name: "Arts & Drama Studio", capacity: "60 Seats", lead: "Mrs. Ngozi Udoh", status: "Available", color: "text-ink-muted" },
                { name: "Assembly Auditorium", capacity: "900 Seats", lead: "Mr. David Alabi", status: "Reserved (PTA Meeting Sat)", color: "text-amber-700" },
              ].map((f) => (
                <div key={f.name} className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink">{f.name}</span>
                    <span className="font-mono text-[10px] text-ink-muted">{f.capacity}</span>
                  </div>
                  <div className="rounded-xl border border-line bg-surface p-2 font-mono">
                    <span className={`font-bold ${f.color}`}>{f.status}</span>
                  </div>
                  <span className="text-[10px] text-ink-muted block">Facility Custodian: {f.lead}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
