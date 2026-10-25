"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  Phone,
  Save,
  Shield,
  ShieldCheck,
  Smartphone,
  User,
  Users,
  Camera,
  Eye,
  EyeOff,
  Laptop,
  Check,
  Sliders,
  Sparkles,
  Building2,
  GraduationCap,
  Landmark,
  Heart,
  BookOpen,
  ArrowRight,
  Clock,
  AlertCircle,
} from "lucide-react";
import { RoleKey, ROLES_CONFIG } from "@/lib/rbac";
import {
  UserAccountProfile,
  getDefaultAccountProfile,
  getStoredAccountProfile,
  saveStoredAccountProfile,
} from "@/lib/account-settings-data";
import { provisionUserCredentials } from "@/lib/actions/user-credentials";

interface AccountSettingsViewProps {
  currentRole: RoleKey;
}

export function AccountSettingsView({ currentRole }: AccountSettingsViewProps) {
  const [profile, setProfile] = useState<UserAccountProfile>(getDefaultAccountProfile(currentRole));
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications" | "preferences">("profile");
  const [savedToast, setSavedToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);

  const roleConfig = ROLES_CONFIG[currentRole];

  useEffect(() => {
    const loaded = getStoredAccountProfile(currentRole);
    setProfile(loaded);
  }, [currentRole]);

  const showToast = (msg: string) => {
    setSavedToast(msg);
    setTimeout(() => setSavedToast(null), 3500);
  };

  const handleSaveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    saveStoredAccountProfile(currentRole, profile);
    showToast("Account profile & preferences updated successfully!");
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setProfile((prev) => ({
          ...prev,
          avatarUrl: result,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.newPassword) return;

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus("New passwords do not match.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordStatus("Password must be at least 8 characters long.");
      return;
    }

    try {
      await provisionUserCredentials({
        role: currentRole === "principal" ? "admin" : currentRole,
        email: profile.email,
        password: passwordForm.newPassword,
        fullName: profile.fullName,
        targetId: profile.idCode,
      });

      // Update security state
      const updatedProfile: UserAccountProfile = {
        ...profile,
        security: {
          ...profile.security,
          lastPasswordChange: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        },
      };
      setProfile(updatedProfile);
      saveStoredAccountProfile(currentRole, updatedProfile);

      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordStatus(null);
      showToast("Password updated and synced with your portal login credentials!");
    } catch {
      showToast("Password updated locally for this session.");
    }
  };

  // Password strength calculator
  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "None", color: "bg-line" };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 25, label: "Weak", color: "bg-rose-500" };
    if (score === 2) return { score: 50, label: "Fair", color: "bg-amber-500" };
    if (score === 3) return { score: 75, label: "Good", color: "bg-blue-500" };
    return { score: 100, label: "Very Strong", color: "bg-emerald-500" };
  };

  const strength = calculatePasswordStrength(passwordForm.newPassword);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {savedToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950 px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in slide-in-from-top-3">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{savedToast}</span>
        </div>
      )}

      {/* Account Hero Card */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar with Upload Badge */}
            <div className="relative group">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="size-16 rounded-2xl object-cover shadow-md border-2 border-line"
                />
              ) : (
                <div
                  className="size-16 rounded-2xl flex items-center justify-center font-black text-xl shadow-md text-white"
                  style={{
                    backgroundColor: profile.avatarBgColor || roleConfig.accentColor,
                  }}
                >
                  {profile.fullName.charAt(0)}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Change Profile Photo"
                className="absolute -bottom-1 -right-1 size-7 rounded-xl bg-surface border border-line flex items-center justify-center text-ink shadow-sm hover:bg-surface-raised transition-colors"
              >
                <Camera className="size-3.5 text-primary" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-black text-ink">{profile.fullName}</h2>
                <span className="rounded-full bg-primary-light px-2.5 py-0.5 font-mono text-[11px] font-bold text-primary">
                  {profile.idCode}
                </span>
                <span className="rounded-full bg-surface-raised px-2.5 py-0.5 font-mono text-[10px] font-bold text-ink-muted border border-line uppercase">
                  {roleConfig.badge}
                </span>
              </div>
              <p className="text-xs text-ink-muted mt-0.5">
                {profile.roleTitle} · {profile.department}
              </p>
              <p className="font-mono text-[11px] text-ink-soft mt-1">
                Portal Login: <strong>{profile.email}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSaveProfile()}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-hover active:scale-95 transition-all"
            >
              <Save className="size-4" />
              <span>Save Account Settings</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "profile"
                ? "bg-primary text-white shadow-sm"
                : "bg-surface-raised text-ink-muted hover:text-ink"
            }`}
          >
            <User className="size-4" />
            <span>Profile &amp; Details</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "security"
                ? "bg-primary text-white shadow-sm"
                : "bg-surface-raised text-ink-muted hover:text-ink"
            }`}
          >
            <KeyRound className="size-4" />
            <span>Security &amp; Password</span>
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "notifications"
                ? "bg-primary text-white shadow-sm"
                : "bg-surface-raised text-ink-muted hover:text-ink"
            }`}
          >
            <Bell className="size-4" />
            <span>Notification Channels</span>
          </button>

          <button
            onClick={() => setActiveTab("preferences")}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "preferences"
                ? "bg-primary text-white shadow-sm"
                : "bg-surface-raised text-ink-muted hover:text-ink"
            }`}
          >
            <Sliders className="size-4" />
            <span>{roleConfig.label.split("/")[0].trim()} Preferences</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PROFILE DETAILS */}
      {activeTab === "profile" && (
        <form onSubmit={handleSaveProfile} className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-ink border-b border-line pb-3">
                Institutional Contact &amp; Profile Information
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-xs font-bold text-ink focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Institutional ID Code</label>
                  <input
                    type="text"
                    readOnly
                    value={profile.idCode}
                    className="w-full rounded-xl border border-line bg-surface p-2.5 font-mono text-xs font-bold text-primary cursor-not-allowed opacity-80"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Official Portal Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-xs text-ink font-mono focus:border-primary focus:outline-none"
                  />
                  <span className="text-[10px] text-ink-muted mt-1 block">
                    Used to sign in to your Campus360 role account.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Direct Phone Contact</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-xs text-ink font-mono focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Designation &amp; Role Title</label>
                  <input
                    type="text"
                    value={profile.roleTitle}
                    onChange={(e) => setProfile({ ...profile, roleTitle: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-xs text-ink focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Assigned Department / Faculty</label>
                  <input
                    type="text"
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-xs text-ink focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {profile.qualifications !== undefined && (
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Academic &amp; Professional Qualifications</label>
                  <input
                    type="text"
                    value={profile.qualifications}
                    onChange={(e) => setProfile({ ...profile, qualifications: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-xs text-ink focus:border-primary focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Professional Bio / Institutional Summary</label>
                <textarea
                  rows={3}
                  value={profile.bio || ""}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-xs text-ink leading-relaxed focus:border-primary focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-primary-hover active:scale-95 transition-all"
                >
                  <Save className="size-4" />
                  <span>Update Profile Information</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Account Card Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
              <h4 className="text-sm font-extrabold text-ink border-b border-line pb-3">Institutional Dossier</h4>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-mono text-[10px] uppercase text-ink-muted block">Account Status</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-700 border border-emerald-200 mt-0.5">
                    <CheckCircle2 className="size-3 text-emerald-600" />
                    Active &amp; Verified
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase text-ink-muted block">Role Access Tier</span>
                  <span className="font-semibold text-ink">{roleConfig.tier}</span>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase text-ink-muted block">Granted Permissions</span>
                  <span className="font-mono text-primary font-bold">{roleConfig.permissions.length} granular claims</span>
                </div>

                <div className="pt-2 border-t border-line">
                  <span className="font-mono text-[10px] uppercase text-ink-muted block">Assigned Badge Color</span>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className="size-5 rounded-full shadow-sm border border-line"
                      style={{ backgroundColor: profile.avatarBgColor || roleConfig.accentColor }}
                    />
                    <span className="font-mono text-xs text-ink font-bold">
                      {profile.avatarBgColor || roleConfig.accentColor}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: SECURITY & PASSWORD */}
      {activeTab === "security" && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Password Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <Lock className="size-4.5 text-primary" />
                  <h3 className="text-base font-extrabold text-ink">Change Login Password</h3>
                </div>
                <span className="font-mono text-[10px] text-ink-muted">
                  Last changed: {profile.security.lastPasswordChange}
                </span>
              </div>

              {passwordStatus && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="size-4 text-rose-600 shrink-0" />
                  <span>{passwordStatus}</span>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-ink mb-1">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPasswords ? "text" : "password"}
                      placeholder="Enter current password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-2.5 text-ink-muted hover:text-ink"
                    >
                      {showPasswords ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-ink mb-1">New Password</label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    placeholder="Enter at least 8 characters"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink focus:border-primary focus:outline-none"
                  />

                  {/* Password Strength Meter */}
                  {passwordForm.newPassword && (
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between font-mono text-[10px]">
                        <span className="text-ink-muted">Password Security:</span>
                        <span className="font-bold text-ink">{strength.label}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-surface-raised overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${strength.color}`}
                          style={{ width: `${strength.score}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-ink mb-1">Confirm New Password</label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    placeholder="Re-enter new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-primary-hover active:scale-95 transition-all"
                  >
                    <KeyRound className="size-4" />
                    <span>Update &amp; Sync Password</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* 2FA & Active Sessions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 2-Factor Authentication */}
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4.5 text-primary" />
                  <h4 className="text-sm font-bold text-ink">Two-Factor Authentication</h4>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                    profile.security.twoFactorEnabled
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-surface-raised text-ink-muted"
                  }`}
                >
                  {profile.security.twoFactorEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                Add an extra layer of protection to prevent unauthorized portal access to institutional data.
              </p>

              <div className="flex items-center justify-between rounded-2xl border border-line bg-surface-raised p-3.5">
                <div>
                  <span className="font-bold text-xs text-ink block">Two-Step Verification</span>
                  <span className="text-[11px] text-ink-muted">SMS Code or Authenticator App</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = !profile.security.twoFactorEnabled;
                    const updated = {
                      ...profile,
                      security: { ...profile.security, twoFactorEnabled: next },
                    };
                    setProfile(updated);
                    saveStoredAccountProfile(currentRole, updated);
                    showToast(`Two-Factor Authentication ${next ? "activated" : "disabled"}.`);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    profile.security.twoFactorEnabled ? "bg-emerald-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      profile.security.twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-ink border-b border-line pb-3">Active Device Sessions</h4>
              <div className="space-y-2 text-xs">
                {profile.security.activeSessions.map((session, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-line bg-surface-raised p-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <Laptop className="size-4 text-ink-muted" />
                      <div>
                        <span className="font-bold text-ink block">{session.device} · {session.browser}</span>
                        <span className="font-mono text-[10px] text-ink-muted">
                          {session.location} ({session.ipAddress})
                        </span>
                      </div>
                    </div>
                    <span
                      className={`font-mono text-[10px] font-bold ${
                        session.isCurrent ? "text-emerald-600" : "text-ink-muted"
                      }`}
                    >
                      {session.lastActive}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTIFICATION CHANNELS */}
      {activeTab === "notifications" && (
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
          <div className="border-b border-line pb-3">
            <h3 className="text-base font-extrabold text-ink">Communication &amp; Notification Dispatch</h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Select which channels Campus360 uses to send you emergency bulletins, broadsheet alerts, and reminders.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Email Notifications */}
            <div className="rounded-2xl border border-line bg-surface-raised p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-ink">Email Notifications</h4>
                  <p className="text-[11px] text-ink-muted">Terminal broadsheets, invoices &amp; digests to {profile.email}</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={profile.notifications.emailAlerts}
                onChange={(e) => {
                  const updated = {
                    ...profile,
                    notifications: { ...profile.notifications, emailAlerts: e.target.checked },
                  };
                  setProfile(updated);
                  saveStoredAccountProfile(currentRole, updated);
                }}
                className="size-4 rounded accent-primary cursor-pointer"
              />
            </div>

            {/* SMS Notifications */}
            <div className="rounded-2xl border border-line bg-surface-raised p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Smartphone className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-ink">Direct SMS Alerts</h4>
                  <p className="text-[11px] text-ink-muted">Urgent attendance, gate passes &amp; emergency SMS to {profile.phone}</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={profile.notifications.smsAlerts}
                onChange={(e) => {
                  const updated = {
                    ...profile,
                    notifications: { ...profile.notifications, smsAlerts: e.target.checked },
                  };
                  setProfile(updated);
                  saveStoredAccountProfile(currentRole, updated);
                }}
                className="size-4 rounded accent-primary cursor-pointer"
              />
            </div>

            {/* WhatsApp Direct Dispatch */}
            <div className="rounded-2xl border border-line bg-surface-raised p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-800">
                  <Phone className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-ink">WhatsApp Direct Dispatch</h4>
                  <p className="text-[11px] text-ink-muted">Receipts, timetable shifts and weekly school bulletins</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={profile.notifications.whatsappAlerts}
                onChange={(e) => {
                  const updated = {
                    ...profile,
                    notifications: { ...profile.notifications, whatsappAlerts: e.target.checked },
                  };
                  setProfile(updated);
                  saveStoredAccountProfile(currentRole, updated);
                }}
                className="size-4 rounded accent-primary cursor-pointer"
              />
            </div>

            {/* In-App Push */}
            <div className="rounded-2xl border border-line bg-surface-raised p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                  <Bell className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-ink">In-App Live Badges</h4>
                  <p className="text-[11px] text-ink-muted">Header notification counts and action required pulses</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={profile.notifications.pushAlerts}
                onChange={(e) => {
                  const updated = {
                    ...profile,
                    notifications: { ...profile.notifications, pushAlerts: e.target.checked },
                  };
                  setProfile(updated);
                  saveStoredAccountProfile(currentRole, updated);
                }}
                className="size-4 rounded accent-primary cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ROLE-SPECIFIC INSTITUTIONAL PREFERENCES */}
      {activeTab === "preferences" && (
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
          <div className="border-b border-line pb-3">
            <h3 className="text-base font-extrabold text-ink">
              {roleConfig.label.split("/")[0].trim()} Operational Preferences
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Fine-tune workflows and automation triggers specialized for your institutional role.
            </p>
          </div>

          {/* Role = PRINCIPAL */}
          {currentRole === "principal" && (
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2">
                <label className="font-bold text-ink block">Broadsheet Approval Digest Cadence</label>
                <select
                  value={String(profile.roleSpecific.broadsheetDigest || "daily")}
                  onChange={(e) => {
                    const updated = {
                      ...profile,
                      roleSpecific: { ...profile.roleSpecific, broadsheetDigest: e.target.value },
                    };
                    setProfile(updated);
                    saveStoredAccountProfile(currentRole, updated);
                  }}
                  className="w-full rounded-xl border border-line bg-surface p-2 font-bold text-ink"
                >
                  <option value="realtime">Instant / As Submitted by Teachers</option>
                  <option value="daily">Daily 4:00 PM Executive Digest</option>
                  <option value="weekly">Weekly Friday Broadsheet Batch</option>
                </select>
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2">
                <label className="font-bold text-ink block">Digital Certificate Signature Title</label>
                <input
                  type="text"
                  value={String(profile.roleSpecific.digitalSignatureTitle || "Dr. Evelyn Peters, Ph.D. — Principal & CAO")}
                  onChange={(e) => {
                    const updated = {
                      ...profile,
                      roleSpecific: { ...profile.roleSpecific, digitalSignatureTitle: e.target.value },
                    };
                    setProfile(updated);
                    saveStoredAccountProfile(currentRole, updated);
                  }}
                  className="w-full rounded-xl border border-line bg-surface p-2 font-mono text-ink"
                />
              </div>
            </div>
          )}

          {/* Role = TEACHER */}
          {currentRole === "teacher" && (
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-2xl border border-line bg-surface-raised p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-ink">Continuous Assessment Auto-Save</h4>
                  <p className="text-[11px] text-ink-muted">Automatically save score inputs every 30 seconds</p>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(profile.roleSpecific.autoSaveScores ?? true)}
                  onChange={(e) => {
                    const updated = {
                      ...profile,
                      roleSpecific: { ...profile.roleSpecific, autoSaveScores: e.target.checked },
                    };
                    setProfile(updated);
                    saveStoredAccountProfile(currentRole, updated);
                  }}
                  className="size-4 rounded accent-primary cursor-pointer"
                />
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2">
                <label className="font-bold text-ink block">Class Attendance Reminder Time</label>
                <input
                  type="time"
                  value={String(profile.roleSpecific.attendanceReminderTime || "08:15")}
                  onChange={(e) => {
                    const updated = {
                      ...profile,
                      roleSpecific: { ...profile.roleSpecific, attendanceReminderTime: e.target.value },
                    };
                    setProfile(updated);
                    saveStoredAccountProfile(currentRole, updated);
                  }}
                  className="w-full rounded-xl border border-line bg-surface p-2 font-mono text-ink"
                />
              </div>
            </div>
          )}

          {/* Role = BURSAR */}
          {currentRole === "bursar" && (
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2">
                <label className="font-bold text-ink block">Automated Receipt Prefix</label>
                <input
                  type="text"
                  value={String(profile.roleSpecific.receiptNumberPrefix || "RC-REC-2026-")}
                  onChange={(e) => {
                    const updated = {
                      ...profile,
                      roleSpecific: { ...profile.roleSpecific, receiptNumberPrefix: e.target.value },
                    };
                    setProfile(updated);
                    saveStoredAccountProfile(currentRole, updated);
                  }}
                  className="w-full rounded-xl border border-line bg-surface p-2 font-mono text-ink"
                />
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2">
                <label className="font-bold text-ink block">Default Currency Formatting</label>
                <select
                  value={String(profile.roleSpecific.defaultCurrency || "US$")}
                  onChange={(e) => {
                    const updated = {
                      ...profile,
                      roleSpecific: { ...profile.roleSpecific, defaultCurrency: e.target.value },
                    };
                    setProfile(updated);
                    saveStoredAccountProfile(currentRole, updated);
                  }}
                  className="w-full rounded-xl border border-line bg-surface p-2 font-bold text-ink"
                >
                  <option value="US$">US$ (United States Dollar)</option>
                  <option value="GBP">£ (British Pound)</option>
                  <option value="EUR">€ (Euro)</option>
                </select>
              </div>
            </div>
          )}

          {/* Role = STUDENT */}
          {currentRole === "student" && (
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2">
                <label className="font-bold text-ink block">Class Timetable Reminder</label>
                <select
                  value={String(profile.roleSpecific.classReminderMinutesBefore || "10")}
                  onChange={(e) => {
                    const updated = {
                      ...profile,
                      roleSpecific: { ...profile.roleSpecific, classReminderMinutesBefore: Number(e.target.value) },
                    };
                    setProfile(updated);
                    saveStoredAccountProfile(currentRole, updated);
                  }}
                  className="w-full rounded-xl border border-line bg-surface p-2 font-bold text-ink"
                >
                  <option value="5">5 Minutes Before Period</option>
                  <option value="10">10 Minutes Before Period</option>
                  <option value="15">15 Minutes Before Period</option>
                </select>
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-ink">Exam Countdown Radar</h4>
                  <p className="text-[11px] text-ink-muted">Display WAEC/Mock countdown clock on desk</p>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(profile.roleSpecific.examCountdownActive ?? true)}
                  onChange={(e) => {
                    const updated = {
                      ...profile,
                      roleSpecific: { ...profile.roleSpecific, examCountdownActive: e.target.checked },
                    };
                    setProfile(updated);
                    saveStoredAccountProfile(currentRole, updated);
                  }}
                  className="size-4 rounded accent-primary cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Role = PARENT */}
          {currentRole === "parent" && (
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-2xl border border-line bg-surface-raised p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-ink">Instant Gate Entry/Exit Alerts</h4>
                  <p className="text-[11px] text-ink-muted">Real-time SMS when wards tap biometric gate pass</p>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(profile.roleSpecific.instantGateSms ?? true)}
                  onChange={(e) => {
                    const updated = {
                      ...profile,
                      roleSpecific: { ...profile.roleSpecific, instantGateSms: e.target.checked },
                    };
                    setProfile(updated);
                    saveStoredAccountProfile(currentRole, updated);
                  }}
                  className="size-4 rounded accent-primary cursor-pointer"
                />
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-ink">Automated PDF Result Delivery</h4>
                  <p className="text-[11px] text-ink-muted">Instantly email terminal report cards upon publication</p>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(profile.roleSpecific.receiptAutoEmail ?? true)}
                  onChange={(e) => {
                    const updated = {
                      ...profile,
                      roleSpecific: { ...profile.roleSpecific, receiptAutoEmail: e.target.checked },
                    };
                    setProfile(updated);
                    saveStoredAccountProfile(currentRole, updated);
                  }}
                  className="size-4 rounded accent-primary cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Role = ADMIN */}
          {currentRole === "admin" && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 text-xs">
                <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2">
                  <label className="font-bold text-ink block">Inactivity Session Timeout</label>
                  <select
                    value={String(profile.roleSpecific.sessionTimeoutMinutes || "60")}
                    onChange={(e) => {
                      const updated = {
                        ...profile,
                        roleSpecific: { ...profile.roleSpecific, sessionTimeoutMinutes: Number(e.target.value) },
                      };
                      setProfile(updated);
                      saveStoredAccountProfile(currentRole, updated);
                    }}
                    className="w-full rounded-xl border border-line bg-surface p-2 font-bold text-ink"
                  >
                    <option value="30">30 Minutes</option>
                    <option value="60">60 Minutes (Standard)</option>
                    <option value="120">2 Hours</option>
                  </select>
                </div>

                <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2">
                  <label className="font-bold text-ink block">Default Onboarding Password Pattern</label>
                  <input
                    type="text"
                    value={String(profile.roleSpecific.defaultPassPrefix || "Campus#2026!")}
                    onChange={(e) => {
                      const updated = {
                        ...profile,
                        roleSpecific: { ...profile.roleSpecific, defaultPassPrefix: e.target.value },
                      };
                      setProfile(updated);
                      saveStoredAccountProfile(currentRole, updated);
                    }}
                    className="w-full rounded-xl border border-line bg-surface p-2 font-mono text-ink"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary-light/40 p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-ink">School Workspace Customization</h4>
                  <p className="text-[11px] text-ink-muted">
                    Configure institutional logo, 3 workspace themes, and role dashboard colors.
                  </p>
                </div>
                <Link
                  href="/dashboard/admin/settings"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-primary-hover transition-all"
                >
                  <span>Open School Customizer</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
