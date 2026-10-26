"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  ShieldCheck,
  Users,
  User,
  Plus,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Phone,
  Mail,
  Eye,
  EyeOff,
  UserCheck,
  XCircle,
  FileText,
} from "lucide-react";
import { FAMILY_DATA, CHILDREN_PROFILES } from "@/lib/family-data";

interface GuardianProfile {
  id: string;
  name: string;
  relationship: string;
  roleType: "Primary Guardian" | "Secondary Guardian" | "Authorized Pickup Contact" | "Emergency Contact Only";
  phone: string;
  email?: string;
  canViewGrades: boolean;
  canViewFinances: boolean;
  canPickUpChild: boolean;
  gatePin?: string;
  status: "active" | "restricted" | "pending_verification";
}

export default function ParentGuardiansPage() {
  const [toast, setToast] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [newName, setNewName] = useState("");
  const [newRel, setNewRel] = useState("Maternal Grandmother");
  const [newPhone, setNewPhone] = useState("+234 802 ");
  const [newRole, setNewRole] = useState<GuardianProfile["roleType"]>("Authorized Pickup Contact");
  const [newCanPickup, setNewCanPickup] = useState(true);
  const [newCanGrades, setNewCanGrades] = useState(false);
  const [newCanFinances, setNewCanFinances] = useState(false);

  const [guardians, setGuardians] = useState<GuardianProfile[]>([
    {
      id: "G-01",
      name: "Mrs. Zainab Adeleke",
      relationship: "Mother",
      roleType: "Primary Guardian",
      phone: "+234 803 291 0021",
      email: "zainab.adeleke@gmail.com",
      canViewGrades: true,
      canViewFinances: true,
      canPickUpChild: true,
      gatePin: "PIN-8841",
      status: "active",
    },
    {
      id: "G-02",
      name: "Dr. Babatunde Adeleke",
      relationship: "Father",
      roleType: "Secondary Guardian",
      phone: "+234 802 110 9942",
      email: "babatunde.adeleke@firm.com",
      canViewGrades: true,
      canViewFinances: true,
      canPickUpChild: true,
      gatePin: "PIN-9912",
      status: "active",
    },
    {
      id: "G-03",
      name: "Mrs. Folake Adeleke-Cole",
      relationship: "Paternal Aunt",
      roleType: "Authorized Pickup Contact",
      phone: "+234 805 441 3320",
      canViewGrades: false,
      canViewFinances: false,
      canPickUpChild: true,
      gatePin: "PIN-8421",
      status: "active",
    },
    {
      id: "G-04",
      name: "Mr. Emmanuel Chukwu",
      relationship: "Family Chauffeur",
      roleType: "Authorized Pickup Contact",
      phone: "+234 814 990 1204",
      canViewGrades: false,
      canViewFinances: false,
      canPickUpChild: true,
      gatePin: "PIN-4409",
      status: "active",
    },
  ]);

  const handleAddGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newG: GuardianProfile = {
      id: `G-0${guardians.length + 1}`,
      name: newName,
      relationship: newRel,
      roleType: newRole,
      phone: newPhone,
      canViewGrades: newCanGrades,
      canViewFinances: newCanFinances,
      canPickUpChild: newCanPickup,
      gatePin: `PIN-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "active",
    };

    setGuardians([...guardians, newG]);
    setIsAddModalOpen(false);
    setNewName("");
    setToast(
      `Authorized contact ${newG.name} registered. Gate biometric PIN (${newG.gatePin}) generated for campus security desk.`
    );
  };

  const handleToggleRevoke = (id: string) => {
    setGuardians((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              status: g.status === "active" ? "restricted" : "active",
            }
          : g
      )
    );
    setToast("Security gate authorization updated.");
  };

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <ShieldCheck className="w-4 h-4" />
              Family Safeguarding &amp; Access Controls · Section M
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Multiple Guardians &amp; Authorized Pickup
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Control permissions for financial statements, academic results, and manage campus turnstile gate pickup PINs.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Add Authorized Pickup Contact
          </button>
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

        {/* Strict Child Protection Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-foreground">Strict Access Boundary Safeguard:</span>{" "}
            <span className="text-muted-foreground">
              Being designated as an emergency contact or driver does not automatically grant visibility into school invoices, tuition payments, or terminal examination scores. Each permission is audited independently.
            </span>
          </div>
        </div>

        {/* Guardians Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guardians.map((g) => (
            <div
              key={g.id}
              className="p-6 rounded-3xl bg-card border border-border hover:border-pink-500/30 transition shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-pink-600 font-bold">{g.id}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      g.status === "active"
                        ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                        : "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800"
                    }`}
                  >
                    {g.status === "active" ? "Authorized" : "Revoked / Paused"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl bg-pink-600/10 text-pink-600 font-bold flex items-center justify-center text-sm flex-shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground leading-snug">{g.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {g.relationship} · <strong>{g.roleType}</strong>
                    </p>
                  </div>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{g.phone}</span>
                  </div>
                  {g.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-pink-600" />
                      <span>{g.email}</span>
                    </div>
                  )}
                </div>

                {/* Permission Matrix Badges */}
                <div className="mt-3 p-3 rounded-2xl bg-canvas border border-border space-y-2 text-xs">
                  <span className="font-semibold text-foreground text-[11px] block">Permitted Access Rights:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      {g.canViewGrades ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                      <span className={g.canViewGrades ? "text-foreground font-medium" : "text-muted-foreground"}>
                        Academic Grades
                      </span>
                    </span>

                    <span className="flex items-center gap-1.5">
                      {g.canViewFinances ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                      <span className={g.canViewFinances ? "text-foreground font-medium" : "text-muted-foreground"}>
                        Invoices &amp; Payments
                      </span>
                    </span>

                    <span className="flex items-center gap-1.5">
                      {g.canPickUpChild ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                      <span className={g.canPickUpChild ? "text-foreground font-medium" : "text-muted-foreground"}>
                        Campus Gate Pickup
                      </span>
                    </span>

                    {g.gatePin && (
                      <span className="flex items-center gap-1.5 font-mono font-bold text-pink-600">
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>{g.gatePin}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border text-xs">
                {g.roleType !== "Primary Guardian" ? (
                  <button
                    onClick={() => handleToggleRevoke(g.id)}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition ${
                      g.status === "active"
                        ? "border border-border hover:bg-muted text-rose-600"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    {g.status === "active" ? "Revoke Gate Pickup" : "Reactivate Authorization"}
                  </button>
                ) : (
                  <span className="text-[11px] text-muted-foreground italic">
                    Primary Account Holder · Permanent Signatory
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Add Authorized Contact */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-pink-600" />
                  <h3 className="font-bold text-foreground text-base">Add Authorized Guardian / Pickup Contact</h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddGuardian} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Mrs. Folashade Adeleke"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Relationship to Child</label>
                    <input
                      type="text"
                      value={newRel}
                      onChange={(e) => setNewRel(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Contact Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    <option value="Authorized Pickup Contact">Authorized Pickup Contact (Campus Collection)</option>
                    <option value="Secondary Guardian">Secondary Guardian (Co-Parent)</option>
                    <option value="Emergency Contact Only">Emergency Contact Only (No Pickup PIN)</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-canvas border border-border space-y-2">
                  <span className="font-semibold text-foreground block">Assign Permissions:</span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newCanPickup}
                      onChange={(e) => setNewCanPickup(e.target.checked)}
                      className="rounded text-pink-600 focus:ring-pink-500"
                    />
                    <span>Authorized to pick up child at security gate</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newCanGrades}
                      onChange={(e) => setNewCanGrades(e.target.checked)}
                      className="rounded text-pink-600 focus:ring-pink-500"
                    />
                    <span>Allow viewing published terminal grades &amp; reports</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newCanFinances}
                      onChange={(e) => setNewCanFinances(e.target.checked)}
                      className="rounded text-pink-600 focus:ring-pink-500"
                    />
                    <span>Allow viewing school tuition invoices &amp; fee receipts</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold"
                  >
                    Save Authorized Contact
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
