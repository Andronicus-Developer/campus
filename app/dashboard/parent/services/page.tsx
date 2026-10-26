"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Building2,
  Bus,
  Home,
  Utensils,
  BookOpen,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Plus,
  ShieldCheck,
  User,
} from "lucide-react";
import { CHILDREN_PROFILES, ChildProfile } from "@/lib/family-data";

export default function ParentServicesPage() {
  const [selectedChildId, setSelectedChildId] = useState<string>("child-1");
  const [activeTab, setActiveTab] = useState<"transport" | "boarding" | "meals" | "library">("transport");
  const [toast, setToast] = useState<string | null>(null);

  const activeChild =
    CHILDREN_PROFILES.find((c) => c.id === selectedChildId) || CHILDREN_PROFILES[0];

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <Building2 className="w-4 h-4" />
              Auxiliary Services &amp; Logistics · Section N
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Transport, Boarding &amp; School Services
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              School bus transit schedules, driver contacts, pastoral house allocations, and cafeteria meal plans.
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
                {c.preferredName}
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

        {/* Service Modules Tab Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("transport")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "transport"
                ? "bg-pink-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bus className="w-4 h-4" />
            School Bus Transit
          </button>
          <button
            onClick={() => setActiveTab("boarding")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "boarding"
                ? "bg-pink-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Home className="w-4 h-4" />
            Pastoral House &amp; Hostel
          </button>
          <button
            onClick={() => setActiveTab("meals")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "meals"
                ? "bg-pink-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Utensils className="w-4 h-4" />
            Cafeteria &amp; Nutrition
          </button>
          <button
            onClick={() => setActiveTab("library")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "library"
                ? "bg-pink-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Library Borrowing
          </button>
        </div>

        {/* TAB 1: School Bus Transit */}
        {activeTab === "transport" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-600 block">
                    Transit Service · {activeChild.preferredName}
                  </span>
                  <h3 className="text-base font-extrabold text-foreground">
                    Route 4 (Lekki / Victoria Island Corridor)
                  </h3>
                  <p className="text-xs text-muted-foreground">Vehicle: Toyota Coaster Bus #04 · Plate: RVS-04-LAG</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                  Subscribed &amp; Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-4 rounded-2xl bg-canvas border border-border space-y-1">
                  <span className="text-muted-foreground text-[11px] block">Morning Pickup Point &amp; Time</span>
                  <div className="font-bold text-foreground">Admiralty Way Junction / Lekki Phase 1 Gate</div>
                  <span className="text-pink-600 font-semibold block">06:45 AM (Daily Departure)</span>
                </div>

                <div className="p-4 rounded-2xl bg-canvas border border-border space-y-1">
                  <span className="text-muted-foreground text-[11px] block">Afternoon Drop-Off Point &amp; Time</span>
                  <div className="font-bold text-foreground">Admiralty Way Junction / Lekki Phase 1 Gate</div>
                  <span className="text-emerald-600 font-semibold block">04:15 PM (Campus Dismissal)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-canvas border border-border space-y-2 text-xs">
                <span className="font-semibold text-foreground block">Assigned Transport Staff:</span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-muted-foreground text-xs">
                  <div>
                    Driver: <strong className="text-foreground">Mr. Samuel Okafor</strong> · Tel: +234 802 881 0029
                  </div>
                  <div>
                    Bus Matron: <strong className="text-foreground">Mrs. B. Adeyemi</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-foreground">Route Change / Temporary Stop</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Need to authorize an alternate pickup stop or report a morning delay? Submit a notice directly to the Transport Logistics Desk.
              </p>
              <button
                onClick={() => {
                  alert("Transport notice logged with Fleet Supervisor.");
                  setToast("Transport route adjustment notice transmitted to Driver & Matron.");
                }}
                className="w-full py-2.5 rounded-xl bg-canvas border border-border hover:bg-muted text-foreground text-xs font-semibold transition"
              >
                Notify Bus Logistics Desk
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Pastoral House & Hostel */}
        {activeTab === "boarding" && (
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-foreground">Pastoral House Allocation</h3>
                <p className="text-xs text-muted-foreground">
                  Status: <strong>{activeChild.boardingStatus}</strong> · House: <strong>{activeChild.house}</strong>
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200 dark:border-blue-800">
                {activeChild.house.includes("Blue") ? "Blue House (Tigers)" : "Green House (Eagles)"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-canvas border border-border">
                <span className="text-muted-foreground block text-[11px]">House Patron</span>
                <span className="font-bold text-foreground text-sm">Dr. K. Mensah</span>
                <span className="text-[11px] text-muted-foreground mt-0.5 block">HOD Science Directorate</span>
              </div>
              <div className="p-4 rounded-2xl bg-canvas border border-border">
                <span className="text-muted-foreground block text-[11px]">Visiting Sunday Guidelines</span>
                <span className="font-bold text-foreground text-sm">First Sunday Monthly</span>
                <span className="text-[11px] text-muted-foreground mt-0.5 block">02:00 PM to 05:00 PM</span>
              </div>
              <div className="p-4 rounded-2xl bg-canvas border border-border">
                <span className="text-muted-foreground block text-[11px]">Pastoral Welfare Standing</span>
                <span className="font-bold text-emerald-600 text-sm">Exemplary Conduct</span>
                <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">Zero discipline demerits</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Cafeteria & Nutrition */}
        {activeTab === "meals" && (
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-foreground">Cafeteria Hot Lunch Plan</h3>
                <p className="text-xs text-muted-foreground">Subscribed 5-day balanced nutritional hot meal plan</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                Active Meal Subscription
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-canvas border border-border text-xs space-y-2">
              <span className="font-semibold text-foreground">Allergy &amp; Dietary Restrictions on File:</span>
              <p className="text-muted-foreground">
                No shellfish. Lactose intolerance noted on file. Kitchen catering staff provided alternate dairy-free lunch portions.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: Library Borrowing */}
        {activeTab === "library" && (
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-foreground">Library &amp; Textbook Borrowing Record</h3>
                <p className="text-xs text-muted-foreground">Titles currently checked out by {activeChild.name}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                Account Cleared (0 Overdue)
              </span>
            </div>

            <div className="divide-y divide-border text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-foreground">Advanced Engineering Mathematics (10th Ed.)</span>
                  <span className="text-muted-foreground text-[11px] block">ISBN: 978-0470458365 · Reference Section</span>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground text-[11px] block">Due Date:</span>
                  <span className="font-semibold text-foreground">Feb 20, 2026</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
