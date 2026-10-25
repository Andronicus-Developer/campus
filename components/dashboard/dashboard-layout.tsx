"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Building2,
  CalendarDays,
  FileSpreadsheet,
  Receipt,
  Award,
  CreditCard,
  Briefcase,
  Megaphone,
  UserCheck,
  BookOpen,
  UserPlus,
  Contact,
  DoorOpen,
  Sliders,
  Layers,
  ClockAlert,
  Landmark,
  BookMarked,
  Activity,
  MessageSquareText,
  Calendar,
  Crown,
  Globe,
  FileText,
  BarChart3,
  Bus,
  History,
  DollarSign,
  ClipboardCheck,
  FolderOpen,
  User,
  ListTodo,
} from "lucide-react";
import { RoleConfig, RoleKey, ROLES_CONFIG } from "@/lib/rbac";
import { RolePrivilegeModal } from "./role-privilege-modal";
import {
  WorkspaceConfig,
  WorkspaceBranding,
  DEFAULT_WORKSPACE_CONFIG,
  getStoredWorkspaceConfig,
} from "@/lib/workspace-customization";

interface DashboardLayoutProps {
  currentRole: RoleKey;
  children: React.ReactNode;
}

function SchoolLogoBadge({ branding }: { branding: WorkspaceBranding }) {
  if (branding.logoType === "upload" && branding.logoUrl) {
    return (
      <img
        src={branding.logoUrl}
        alt={branding.schoolName}
        className="size-9 rounded-xl object-cover shadow-md border border-line shrink-0"
      />
    );
  }

  if (branding.logoType === "initials") {
    return (
      <div
        className="size-9 rounded-xl flex items-center justify-center font-black text-sm shadow-md shrink-0"
        style={{ backgroundColor: branding.logoBgColor, color: branding.logoTextColor }}
      >
        {branding.logoInitials || "RC"}
      </div>
    );
  }

  // Preset Crests
  const icon = branding.logoPreset;
  return (
    <div
      className="size-9 rounded-xl flex items-center justify-center shadow-md transition-all shrink-0"
      style={{ backgroundColor: branding.logoBgColor, color: branding.logoTextColor }}
    >
      {icon === "shield-crest" && <Shield className="size-5" />}
      {icon === "university-pillar" && <Landmark className="size-5" />}
      {icon === "golden-quill" && <BookOpen className="size-5" />}
      {icon === "royal-crown" && <Crown className="size-5" />}
      {icon === "laurel-globe" && <Globe className="size-5" />}
    </div>
  );
}

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  CheckCheck: CheckCircle2,
  LineChart: Activity,
  Users,
  Briefcase,
  Megaphone,
  UserCheck,
  GraduationCap,
  CalendarDays,
  BookOpen,
  UserPlus,
  Contact,
  ShieldCheck,
  DoorOpen,
  Sliders,
  FileSpreadsheet,
  Receipt,
  Layers,
  ClockAlert,
  Landmark,
  Award,
  BookMarked,
  Bell,
  CreditCard,
  Activity,
  MessageSquareText,
  Calendar,
  FileText,
  BarChart3,
  Bus,
  History,
  DollarSign,
  ClipboardCheck,
  FolderOpen,
  User,
  ListTodo,
  Sparkles,
};

export function DashboardLayout({ currentRole, children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPrivilegeModal, setShowPrivilegeModal] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [workspaceConfig, setWorkspaceConfig] = useState<WorkspaceConfig>(DEFAULT_WORKSPACE_CONFIG);

  useEffect(() => {
    const syncConfig = () => {
      setWorkspaceConfig(getStoredWorkspaceConfig());
    };
    syncConfig();
    window.addEventListener("campus360:workspace-customized", syncConfig);
    window.addEventListener("storage", syncConfig);
    return () => {
      window.removeEventListener("campus360:workspace-customized", syncConfig);
      window.removeEventListener("storage", syncConfig);
    };
  }, []);

  const roleConfig = ROLES_CONFIG[currentRole];
  const roleColor = workspaceConfig.dashboardColors[currentRole];

  const handleRoleSwitch = (newRole: RoleKey) => {
    setRoleDropdownOpen(false);
    router.push(`/dashboard/${newRole}`);
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col antialiased">
      {/* Top Universal Role Switcher Ribbon */}
      <aside aria-label="Demo Role Simulator" className="bg-slate-900 text-white border-b border-slate-800 text-xs py-2 px-4 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] font-semibold text-slate-300">
              ROLE SIMULATOR · Live Preview
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">
              Switch roles to evaluate distinct rights, permissions &amp; screens:
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar">
            {(Object.keys(ROLES_CONFIG) as RoleKey[]).map((rKey) => {
              const r = ROLES_CONFIG[rKey];
              const isActive = rKey === currentRole;
              return (
                <button
                  key={rKey}
                  type="button"
                  onClick={() => handleRoleSwitch(rKey)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition-all shrink-0 ${
                    isActive
                      ? "bg-primary text-white shadow-sm ring-1 ring-white/20"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {r.label.split("/")[0].trim()}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Navigation Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-72 bg-surface border-r border-line transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-68 flex flex-col ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* School Identifier */}
          <div className="p-5 border-b border-line">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2.5 min-w-0">
                <SchoolLogoBadge branding={workspaceConfig.branding} />
                <div className="min-w-0 flex-1">
                  <h1 className="font-extrabold text-sm text-ink leading-tight truncate" title={workspaceConfig.branding.schoolName}>
                    {workspaceConfig.branding.schoolName}
                  </h1>
                  <span className="font-mono text-[10px] font-semibold text-primary block truncate" title={workspaceConfig.branding.motto}>
                    {workspaceConfig.branding.motto || "Campus360 Workspace"}
                  </span>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-ink-muted hover:text-ink shrink-0 ml-2"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Academic Session Pill */}
            <div className="mt-3.5 flex items-center justify-between rounded-xl border border-line bg-surface-raised px-3 py-1.5 font-mono text-[10px] text-ink-muted">
              <span className="flex items-center gap-1.5 font-bold text-ink-soft">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {workspaceConfig.calendar.academicYear} Term {workspaceConfig.calendar.currentTerm}
              </span>
              <span className="rounded bg-primary-light px-1.5 py-0.5 font-bold text-primary">
                Active
              </span>
            </div>
          </div>

          {/* Active Persona Profile Card */}
          <div className="p-4 border-b border-line-soft">
            <div
              className="p-3 rounded-2xl text-white shadow-sm transition-all"
              style={{
                background: `linear-gradient(135deg, ${roleColor || "#4f6ef7"} 0%, #0f172a 100%)`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-white/80">
                  {roleConfig.badge}
                </span>
                <span className="size-2 rounded-full bg-emerald-400" />
              </div>
              <h2 className="mt-1.5 font-bold text-sm leading-snug">{roleConfig.persona.name}</h2>
              <p className="text-[11px] text-white/80 line-clamp-1">{roleConfig.persona.roleTitle}</p>
              <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/20 text-[10px] font-mono">
                <span>{roleConfig.persona.idCode}</span>
                <button
                  type="button"
                  onClick={() => setShowPrivilegeModal(true)}
                  className="font-bold underline text-white hover:text-white/80"
                >
                  View Rights →
                </button>
              </div>
            </div>
          </div>

          {/* Role Navigation Items */}
          <nav aria-label="Role Navigation" className="flex-1 overflow-y-auto p-3 space-y-1">
            <div className="px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-muted">
              Role Modules &amp; Privileges
            </div>

            {roleConfig.navItems.map((item, idx) => {
              const Icon = iconMap[item.icon] || LayoutDashboard;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm shadow-primary/20"
                      : "text-ink-soft hover:bg-surface-raised hover:text-ink"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-primary-light text-primary"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer with Privilege Compliance */}
          <div className="p-4 border-t border-line space-y-2.5">
            <button
              type="button"
              onClick={() => setShowPrivilegeModal(true)}
              className="w-full flex items-center justify-between rounded-xl border border-line bg-surface-raised p-2.5 text-left text-xs transition-colors hover:border-primary/40 hover:bg-primary-light/30"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary shrink-0" />
                <div>
                  <span className="block font-bold text-ink">Role Rights Active</span>
                  <span className="block font-mono text-[10px] text-ink-muted">
                    {roleConfig.permissions.length} granular claims granted
                  </span>
                </div>
              </div>
              <ChevronDown className="size-3.5 text-ink-muted -rotate-90" />
            </button>

            <div className="flex items-center justify-between pb-1.5 border-b border-line-soft text-[11px]">
              <Link
                href={`/dashboard/${currentRole}/settings`}
                className="flex items-center gap-1.5 text-ink-muted hover:text-ink font-semibold transition-colors"
                title="Manage your account profile, password, and preferences"
              >
                <Sliders className="size-3.5 text-primary" />
                <span>Account Settings</span>
              </Link>
              <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px] text-ink-muted font-medium">
              <Link href="/" className="hover:text-ink">
                Public Website
              </Link>
              <Link href="/login" className="flex items-center gap-1 text-danger hover:underline">
                <LogOut className="size-3" />
                <span>Log out</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Right Content View */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Operational Bar */}
          <header className="sticky top-0 z-20 h-16 bg-surface/90 border-b border-line backdrop-blur-md px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-line bg-surface text-ink hover:bg-surface-raised"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" />
              </button>

              <div>
                <h1 className="font-extrabold text-base sm:text-lg text-ink leading-tight flex items-center gap-2">
                  <span>{roleConfig.label}</span>
                  <span className="hidden sm:inline-flex items-center rounded-full bg-primary-light px-2.5 py-0.5 font-mono text-[10px] font-bold text-primary">
                    {roleConfig.tier.split("—")[0].trim()}
                  </span>
                </h1>
                <p className="text-xs text-ink-muted hidden sm:block">
                  Logged in as <strong className="text-ink-soft">{roleConfig.persona.name}</strong> · {roleConfig.persona.department}
                </p>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Role Inspector Trigger Button */}
              <button
                type="button"
                onClick={() => setShowPrivilegeModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary-light/60 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary-light"
              >
                <ShieldCheck className="size-3.5" />
                <span className="hidden md:inline">Inspect Privileges</span>
              </button>

              {/* Account Settings Header Link */}
              <Link
                href={`/dashboard/${currentRole}/settings`}
                className="p-2 rounded-xl border border-line bg-surface text-ink hover:bg-surface-raised transition-colors"
                title="Account Settings"
                aria-label="Account Settings"
              >
                <Sliders className="size-4.5 text-ink-muted hover:text-ink" />
              </Link>

              {/* Notifications */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative p-2 rounded-xl border border-line bg-surface text-ink hover:bg-surface-raised transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="size-4.5" />
                  <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-danger ring-2 ring-surface" />
                </button>

                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-line bg-surface p-4 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-2 border-b border-line">
                      <span className="font-bold text-xs text-ink">Role Alerts ({roleConfig.label.split("/")[0].trim()})</span>
                      <span className="font-mono text-[10px] text-primary">2 Unread</span>
                    </div>
                    <div className="mt-2 space-y-2 text-xs">
                      <div className="p-2 rounded-xl bg-surface-raised border border-line-soft">
                        <span className="font-bold text-ink block">Term 2 Week 8 Attendance Verification</span>
                        <span className="text-ink-muted text-[11px]">Due today before 4:00 PM for all class groups.</span>
                      </div>
                      <div className="p-2 rounded-xl bg-surface-raised border border-line-soft">
                        <span className="font-bold text-ink block">Broadsheet CA Upload Window Open</span>
                        <span className="text-ink-muted text-[11px]">Academic committee has unlocked marks submission.</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Persona Quick Pill */}
              <Link
                href={`/dashboard/${currentRole}/settings`}
                className="flex items-center gap-2 pl-2 border-l border-line hover:opacity-85 transition-opacity"
                title="My Account Settings"
              >
                <div className={`size-8 rounded-full bg-gradient-to-tr ${roleConfig.gradient} text-white flex items-center justify-center font-bold text-xs shadow-sm`}>
                  {roleConfig.persona.name.charAt(0)}
                </div>
                <div className="hidden xl:block text-left text-xs leading-tight">
                  <span className="block font-bold text-ink">{roleConfig.persona.name}</span>
                  <span className="block font-mono text-[10px] text-ink-muted">{roleConfig.persona.idCode}</span>
                </div>
              </Link>
            </div>
          </header>

          {/* Main Dashboard Child View */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>

      {/* Role Privilege Inspector Modal */}
      <RolePrivilegeModal
        roleConfig={roleConfig}
        isOpen={showPrivilegeModal}
        onClose={() => setShowPrivilegeModal(false)}
      />
    </div>
  );
}
