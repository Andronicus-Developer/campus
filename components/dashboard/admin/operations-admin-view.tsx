"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bus,
  Building2,
  Wrench,
  Package,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  Check,
  Sliders,
} from "lucide-react";

interface BusRoute {
  id: string;
  name: string;
  code: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  assignedStudents: number;
  pickupTime: string;
  status: "active" | "maintenance";
}

interface HostelHall {
  id: string;
  name: string;
  gender: "Boys" | "Girls";
  wardenName: string;
  capacity: number;
  occupiedBeds: number;
  roomsCount: number;
}

interface MaintenanceTicket {
  id: string;
  ticketNo: string;
  facility: string;
  issue: string;
  priority: "High" | "Medium" | "Urgent";
  reportedBy: string;
  status: "open" | "in_progress" | "resolved";
  costEstimateUSD: number;
}

const INITIAL_ROUTES: BusRoute[] = [
  {
    id: "br-1",
    name: "Route A — Lekki Phase 1 & Ikate Corridor",
    code: "BUS-01",
    busNumber: "LAG-842-XY (Toyota Coaster)",
    driverName: "Mr. Sunday Adeleke",
    driverPhone: "+234 803 445 1122",
    capacity: 32,
    assignedStudents: 30,
    pickupTime: "06:45 AM",
    status: "active",
  },
  {
    id: "br-2",
    name: "Route B — Victoria Island & Ikoyi Enclave",
    code: "BUS-02",
    busNumber: "LAG-192-AA (Mercedes Sprinter)",
    driverName: "Mr. Emmanuel Okon",
    driverPhone: "+234 802 998 3344",
    capacity: 28,
    assignedStudents: 26,
    pickupTime: "07:00 AM",
    status: "active",
  },
  {
    id: "br-3",
    name: "Route C — Ikeja GRA & Maryland Expressway",
    code: "BUS-03",
    busNumber: "LAG-551-ZZ (Toyota HiAce)",
    driverName: "Mr. Rasheed Jimoh",
    driverPhone: "+234 818 772 9011",
    capacity: 18,
    assignedStudents: 18,
    pickupTime: "06:30 AM",
    status: "active",
  },
];

const INITIAL_HALLS: HostelHall[] = [
  {
    id: "h-1",
    name: "Nelson Mandela Hall (Boys Boarding)",
    gender: "Boys",
    wardenName: "Mr. David Alabi",
    capacity: 96,
    occupiedBeds: 88,
    roomsCount: 24,
  },
  {
    id: "h-2",
    name: "Queen Amina Hall (Girls Boarding)",
    gender: "Girls",
    wardenName: "Mrs. Folake Adeyemi",
    capacity: 100,
    occupiedBeds: 97,
    roomsCount: 25,
  },
];

const INITIAL_MAINTENANCE: MaintenanceTicket[] = [
  {
    id: "mt-1",
    ticketNo: "MNT-2026-042",
    facility: "Senior Science Physics Laboratory",
    issue: "HVAC cooling unit leak causing humidity spikes in optical equipment room.",
    priority: "High",
    reportedBy: "Dr. Oladipo Johnson",
    status: "in_progress",
    costEstimateUSD: 180,
  },
  {
    id: "mt-2",
    ticketNo: "MNT-2026-043",
    facility: "Sports Complex Floodlights",
    issue: "Replace 3 high-intensity LED luminaire bulbs before inter-house sports heats.",
    priority: "Medium",
    reportedBy: "Coach Patrick Eze",
    status: "open",
    costEstimateUSD: 240,
  },
];

export function OperationsAdminView() {
  const [routes, setRoutes] = useState<BusRoute[]>(INITIAL_ROUTES);
  const [halls, setHalls] = useState<HostelHall[]>(INITIAL_HALLS);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(INITIAL_MAINTENANCE);
  const [activeSection, setActiveSection] = useState<"transport" | "hostel" | "facilities" | "settings">("transport");
  const [newTicketModalOpen, setNewTicketModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Module enablement toggles
  const [modulesConfig, setModulesConfig] = useState({
    transportEnabled: true,
    boardingEnabled: true,
    facilitiesEnabled: true,
    inventoryEnabled: true,
    roomBookingEnabled: true,
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleResolveTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "resolved" } : t))
    );
    showToast("Maintenance ticket marked resolved and logged in facilities ledger.");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-orange-100 px-3 py-1 font-mono text-[11px] font-bold text-orange-800">
                School Logistics &amp; Operational Modules
              </span>
              <span className="text-xs text-ink-muted">Transport · Boarding · Facilities · Maintenance</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-ink">School Operations, Transport &amp; Facilities</h2>
            <p className="text-xs text-ink-muted">
              Administer bus transport routes and student allocations, monitor boarding hostel occupancy, and process facility maintenance work orders.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setNewTicketModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-orange-700 active:scale-95 transition-all"
            >
              <Plus className="size-4" />
              <span>+ Log Maintenance Order</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-line">
          <button
            type="button"
            onClick={() => setActiveSection("transport")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeSection === "transport"
                ? "bg-orange-600 text-white shadow-sm"
                : "bg-surface-raised text-ink-muted hover:text-ink"
            }`}
          >
            <Bus className="size-4" />
            <span>School Bus Routes ({routes.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("hostel")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeSection === "hostel"
                ? "bg-orange-600 text-white shadow-sm"
                : "bg-surface-raised text-ink-muted hover:text-ink"
            }`}
          >
            <Building2 className="size-4" />
            <span>Boarding &amp; Hostels ({halls.length} Halls)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("facilities")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeSection === "facilities"
                ? "bg-orange-600 text-white shadow-sm"
                : "bg-surface-raised text-ink-muted hover:text-ink"
            }`}
          >
            <Wrench className="size-4" />
            <span>Facilities &amp; Maintenance ({tickets.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection("settings")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeSection === "settings"
                ? "bg-orange-600 text-white shadow-sm"
                : "bg-surface-raised text-ink-muted hover:text-ink"
            }`}
          >
            <Sliders className="size-4" />
            <span>Operations Module Settings</span>
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

      {/* SECTION 1: TRANSPORT BUS ROUTES */}
      {activeSection === "transport" && (
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-ink">Active Student Transit Routes</h3>
              <p className="text-xs text-ink-muted">Bus fleet allocations, morning pickup schedules, and capacity monitoring.</p>
            </div>
            <button
              type="button"
              onClick={() => showToast("Exporting bus passenger manifests.")}
              className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 font-mono text-xs font-bold text-ink hover:border-orange-600"
            >
              Export Manifests (PDF)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {routes.map((route) => (
              <div
                key={route.id}
                className="p-5 rounded-2xl border border-line bg-surface-raised/70 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                    {route.code}
                  </span>
                  <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                    {route.assignedStudents} / {route.capacity} Seats
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-xs text-ink">{route.name}</h4>
                  <p className="text-[11px] text-ink-muted mt-0.5">{route.busNumber}</p>
                </div>

                <div className="space-y-1 text-xs pt-2 border-t border-line text-ink-soft">
                  <p>Driver: <strong>{route.driverName}</strong></p>
                  <p className="font-mono text-[11px] text-ink-muted">Phone: {route.driverPhone}</p>
                  <p className="font-mono text-[11px] text-orange-700 font-bold">First Pickup: {route.pickupTime}</p>
                </div>

                <button
                  type="button"
                  onClick={() => showToast(`Student ridership roster opened for ${route.code}.`)}
                  className="w-full mt-2 rounded-xl border border-line bg-surface py-1.5 font-mono text-xs font-bold text-ink hover:border-orange-600"
                >
                  Manage Student Roster →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: BOARDING HOSTELS */}
      {activeSection === "hostel" && (
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-ink">Hostels &amp; Resident Halls</h3>
              <p className="text-xs text-ink-muted">Room allocations, resident wardens, and capacity tracking.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {halls.map((hall) => {
              const occupancyPct = Math.round((hall.occupiedBeds / hall.capacity) * 100);
              return (
                <div
                  key={hall.id}
                  className="p-5 rounded-2xl border border-line bg-surface-raised/70 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-ink">{hall.name}</h4>
                      <p className="text-xs text-ink-muted">Hall Warden: {hall.wardenName}</p>
                    </div>
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                      {occupancyPct}% Occupied
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span>Bed Spaces</span>
                      <span className="font-bold">{hall.occupiedBeds} of {hall.capacity} Beds</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-line overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${occupancyPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-line text-xs">
                    <span className="font-mono text-ink-muted">{hall.roomsCount} Resident Dorms</span>
                    <button
                      type="button"
                      onClick={() => showToast(`Room bed assignment map for ${hall.name} opened.`)}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      View Bed Allocations →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: FACILITIES & MAINTENANCE */}
      {activeSection === "facilities" && (
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-ink">Facilities Maintenance Orders</h3>
              <p className="text-xs text-ink-muted">Track routine servicing, contractor repairs, and campus infrastructure.</p>
            </div>
          </div>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl border border-line bg-surface-raised/70 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded">
                      {t.ticketNo}
                    </span>
                    <span className="font-bold text-ink text-xs">{t.facility}</span>
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                        t.priority === "Urgent" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {t.priority}
                    </span>
                  </div>
                  <p className="text-xs text-ink">{t.issue}</p>
                  <p className="text-[11px] text-ink-muted font-mono">
                    Reported by: {t.reportedBy} · Est. Cost: US${t.costEstimateUSD}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {t.status === "resolved" ? (
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                      RESOLVED
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleResolveTicket(t.id)}
                      className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: MODULE SETTINGS */}
      {activeSection === "settings" && (
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-ink">School Operations Module Toggles</h3>
          <p className="text-xs text-ink-muted">
            Enable or disable optional operational modules according to your institution's licensing tier.
          </p>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-line bg-surface-raised cursor-pointer">
              <div>
                <span className="font-bold text-xs text-ink block">Bus Fleet &amp; Transit Routes</span>
                <span className="text-[11px] text-ink-muted">Manage routes, driver contacts, and student bus lists</span>
              </div>
              <input
                type="checkbox"
                checked={modulesConfig.transportEnabled}
                onChange={(e) => setModulesConfig({ ...modulesConfig, transportEnabled: e.target.checked })}
                className="size-4 rounded text-orange-600"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-line bg-surface-raised cursor-pointer">
              <div>
                <span className="font-bold text-xs text-ink block">Hostels &amp; Boarding Residency</span>
                <span className="text-[11px] text-ink-muted">Dormitory bed allocations, wardens, and meal manifests</span>
              </div>
              <input
                type="checkbox"
                checked={modulesConfig.boardingEnabled}
                onChange={(e) => setModulesConfig({ ...modulesConfig, boardingEnabled: e.target.checked })}
                className="size-4 rounded text-orange-600"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl border border-line bg-surface-raised cursor-pointer">
              <div>
                <span className="font-bold text-xs text-ink block">Facilities &amp; Maintenance Helpdesk</span>
                <span className="text-[11px] text-ink-muted">Work order tracking and campus contractor repairs</span>
              </div>
              <input
                type="checkbox"
                checked={modulesConfig.facilitiesEnabled}
                onChange={(e) => setModulesConfig({ ...modulesConfig, facilitiesEnabled: e.target.checked })}
                className="size-4 rounded text-orange-600"
              />
            </label>
          </div>
        </div>
      )}

      {/* MODAL: LOG MAINTENANCE WORK ORDER */}
      {newTicketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2 text-ink">
                <Wrench className="size-5 text-orange-600" />
                <h3 className="text-base font-extrabold">Log Maintenance Order</h3>
              </div>
              <button
                type="button"
                onClick={() => setNewTicketModalOpen(false)}
                className="text-ink-muted hover:text-ink"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-ink-muted mb-1">Facility / Campus Location</label>
                <input
                  type="text"
                  placeholder="e.g. Science Block Floor 2, Auditorium, Sports Pitch"
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink-muted mb-1">Description of Issue</label>
                <textarea
                  rows={3}
                  placeholder="Describe repair needed..."
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Priority</label>
                  <select className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink">
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Estimated Cost (US$)</label>
                  <input
                    type="number"
                    placeholder="e.g. 150"
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
              <button
                type="button"
                onClick={() => setNewTicketModalOpen(false)}
                className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewTicketModalOpen(false);
                  showToast("Maintenance order logged and dispatched to facilities team.");
                }}
                className="rounded-xl bg-orange-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-orange-700"
              >
                Create Work Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
