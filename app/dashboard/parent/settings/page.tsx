"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AccountSettingsView } from "@/components/dashboard/account-settings-view";
import {
  Sliders,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Phone,
  Mail,
  Home,
  Users,
  HelpCircle,
  Send,
  Save,
  KeyRound,
  FileText,
} from "lucide-react";
import { FAMILY_DATA, CHILDREN_PROFILES } from "@/lib/family-data";

export default function ParentSettingsPage() {
  const [activeTab, setActiveTab] = useState<"family_profile" | "security_account" | "support">("family_profile");
  const [toast, setToast] = useState<string | null>(null);

  // Form states for contact update request
  const [editPhone, setEditPhone] = useState(FAMILY_DATA.primaryGuardian.phone);
  const [editEmail, setEditEmail] = useState(FAMILY_DATA.primaryGuardian.email);
  const [editAddress, setEditAddress] = useState(FAMILY_DATA.residentialAddress);
  const [verificationReason, setVerificationReason] = useState("Relocation of family residence within Lekki");

  // Support Ticket Form
  const [ticketSubject, setTicketSubject] = useState("Report Inaccurate Access / Safeguarding Inquiry");
  const [ticketMessage, setTicketMessage] = useState("");

  const handleUpdateContact = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(
      "Contact change request submitted to Registry. An SMS verification OTP has been sent to your primary mobile to authorize changes."
    );
  };

  const handleCreateSupportTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;
    setToast(
      `Support case (#CASE-${Math.floor(1000 + Math.random() * 9000)}) logged with School Administrator. Response SLA: within 4 hours.`
    );
    setTicketMessage("");
  };

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <Sliders className="w-4 h-4" />
              Guardian Account &amp; Security · Section O
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Parent Profile, Security &amp; Help Desk
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage family contact verification, two-factor authentication, linked children profiles, and support tickets.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-1 text-xs">
            <button
              onClick={() => setActiveTab("family_profile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === "family_profile"
                  ? "bg-pink-600 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Family File &amp; Contacts
            </button>
            <button
              onClick={() => setActiveTab("security_account")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === "security_account"
                  ? "bg-pink-600 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              Password &amp; 2FA
            </button>
            <button
              onClick={() => setActiveTab("support")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === "support"
                  ? "bg-pink-600 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Help Desk
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

        {/* TAB 1: Family File & Contact Verification */}
        {activeTab === "family_profile" && (
          <div className="space-y-6">
            {/* Verification Warning Alert */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-foreground">Guardian Identity Verification Standard:</span>{" "}
                <span className="text-muted-foreground">
                  Modifications to phone numbers, emergency contacts, or residential addresses require two-step SMS verification and administrative approval to protect minor students from unauthorized access.
                </span>
              </div>
            </div>

            {/* Linked Children Overview */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 block">
                  Family File #{FAMILY_DATA.familyCode}
                </span>
                <h3 className="text-base font-extrabold text-foreground">
                  Linked Student Beneficiaries ({CHILDREN_PROFILES.length} Children)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {CHILDREN_PROFILES.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl bg-canvas border border-border flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-pink-600/10 text-pink-600 font-bold flex items-center justify-center text-xs">
                        {c.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{c.name}</div>
                        <div className="text-muted-foreground">{c.classGroup} · ID: {c.admissionNo}</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                      Linked
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details Update Form */}
            <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-extrabold text-foreground">Primary Guardian Contact Information</h3>
                <p className="text-xs text-muted-foreground">
                  Updates trigger an automated confirmation alert to all registered family guardians.
                </p>
              </div>

              <form onSubmit={handleUpdateContact} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Primary Guardian Name</label>
                    <input
                      type="text"
                      value={FAMILY_DATA.primaryGuardian.name}
                      disabled
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Occupation &amp; Firm</label>
                    <input
                      type="text"
                      value={FAMILY_DATA.primaryGuardian.occupation}
                      disabled
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Primary Mobile Phone (Gate Alerts)</label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Notification Email</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Residential Address</label>
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Reason for Information Amendment</label>
                  <input
                    type="text"
                    value={verificationReason}
                    onChange={(e) => setVerificationReason(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Submit Contact Verification Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: Password, 2FA & Security Credentials */}
        {activeTab === "security_account" && (
          <div className="pt-2">
            <AccountSettingsView currentRole="parent" />
          </div>
        )}

        {/* TAB 3: Parent Support & Help Desk */}
        {activeTab === "support" && (
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-foreground">Parent Support &amp; Incident Desk</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Report incorrect account linkages, suspicious gate turnstile check-ins, or submit urgent custody notices.
              </p>
            </div>

            <form onSubmit={handleCreateSupportTicket} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-foreground block mb-1">Incident Category</label>
                <select
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                >
                  <option value="Report Inaccurate Access / Safeguarding Inquiry">
                    Report Inaccurate Access / Safeguarding Inquiry
                  </option>
                  <option value="Suspicious Gate RFID Turnstile Log">
                    Suspicious Gate RFID Turnstile Log / Unrecognized Alert
                  </option>
                  <option value="Legal Custody Notice / Court Order Submission">
                    Legal Custody Notice / Court Order Submission
                  </option>
                  <option value="General Parent Portal Access Assistance">
                    General Parent Portal Access Assistance
                  </option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-1">Detailed Explanation</label>
                <textarea
                  rows={4}
                  placeholder="Provide detailed information regarding your inquiry..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Transmit Case to School Administration
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
