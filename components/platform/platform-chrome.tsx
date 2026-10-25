"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  CreditCard,
  Database,
  FileText,
  Flag,
  Globe2,
  HardDrive,
  Heart,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  MessageSquare,
  Package,
  Plug,
  Receipt,
  ScrollText,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Tag,
  Timer,
  TrendingUp,
  UserCog,
  Users,
  Wallet,
  Webhook,
  X,
} from "lucide-react";
import { Logo } from "@/components/site/logo";
import { Avatar } from "@/components/platform/ui";

/* ------------------------------------------------------------------ */
/* Navigation items                                                   */
/* ------------------------------------------------------------------ */

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
  badge?: string;
}

interface NavGroup {
  id: string;
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    id: "overview",
    title: "Console",
    items: [
      { label: "Dashboard",          href: "/super-admin",           icon: LayoutDashboard, exact: true },
      { label: "Platform Analytics", href: "/super-admin/analytics", icon: BarChart3 },
      { label: "System Health",      href: "/super-admin/health",    icon: Activity },
    ],
  },
  {
    id: "tenants",
    title: "Schools & Campuses",
    items: [
      { label: "Schools / Tenants", href: "/super-admin/tenants",    icon: Building2 },
      { label: "Campuses & Orgs",   href: "/super-admin/campuses",   icon: Briefcase },
      { label: "Onboarding Queue",  href: "/super-admin/onboarding", icon: Heart },
    ],
  },
  {
    id: "billing",
    title: "Revenue & Subscriptions",
    items: [
      { label: "Plans & Pricing",  href: "/super-admin/plans",         icon: Package },
      { label: "Subscriptions",    href: "/super-admin/subscriptions", icon: CreditCard },
      { label: "Billing & Invoices",href: "/super-admin/billing",       icon: Receipt },
      { label: "Payments & Paystack",href: "/super-admin/payments",     icon: Wallet },
      { label: "Revenue Reports",  href: "/super-admin/revenue",        icon: TrendingUp },
      { label: "Coupons & Promos", href: "/super-admin/coupons",        icon: Tag },
    ],
  },
  {
    id: "access",
    title: "Security & Governance",
    items: [
      { label: "Platform Users",     href: "/super-admin/users",    icon: Users },
      { label: "Roles & Permissions",href: "/super-admin/roles",    icon: UserCog },
      { label: "Security & Access",  href: "/super-admin/security", icon: ShieldCheck },
      { label: "Audit Logs",         href: "/super-admin/audit",    icon: ScrollText },
    ],
  },
  {
    id: "support",
    title: "Communications & Help",
    items: [
      { label: "Support Tickets",     href: "/super-admin/tickets",       icon: MessageSquare, badge: "12" },
      { label: "Tenant Support Desk", href: "/super-admin/support",       icon: LifeBuoy },
      { label: "Broadcasts",          href: "/super-admin/announcements", icon: Megaphone },
      { label: "Notifications Feed",  href: "/super-admin/notifications", icon: Bell },
      { label: "Email Templates",     href: "/super-admin/email",         icon: Mail },
    ],
  },
  {
    id: "infrastructure",
    title: "System & DevOps",
    items: [
      { label: "Feature Flags",    href: "/super-admin/flags",        icon: Flag },
      { label: "Integrations",     href: "/super-admin/integrations", icon: Plug },
      { label: "Webhooks Engine",  href: "/super-admin/webhooks",     icon: Webhook },
      { label: "Background Jobs",  href: "/super-admin/jobs",         icon: Timer },
      { label: "Supabase Storage", href: "/super-admin/storage",      icon: HardDrive },
      { label: "Errors & Logs",    href: "/super-admin/monitoring",   icon: AlertTriangle },
    ],
  },
  {
    id: "platform-settings",
    title: "Platform Settings",
    items: [
      { label: "Global Settings",     href: "/super-admin/settings",      icon: Settings2 },
      { label: "Localization",        href: "/super-admin/localization",  icon: Globe2 },
      { label: "Legal & Compliance",  href: "/super-admin/legal",         icon: FileText },
      { label: "Maintenance Windows", href: "/super-admin/maintenance",   icon: Database },
      { label: "Docs & Architecture", href: "/super-admin/docs",          icon: BookOpen },
      { label: "My Profile",          href: "/super-admin/profile",       icon: UserCog },
    ],
  },
];

const allItems = navGroups.flatMap((g) => g.items);

/* ------------------------------------------------------------------ */
/* Active-link resolution                                              */
/* ------------------------------------------------------------------ */

function resolveActiveHref(pathname: string): string {
  const matches = allItems
    .filter((item) =>
      item.exact ? pathname === item.href : pathname.startsWith(item.href),
    )
    .sort((a, b) => b.href.length - a.href.length);
  return matches[0]?.href ?? "";
}

function resolveTitle(pathname: string): string {
  if (/^\/super-admin\/tenants\/[^/]+$/.test(pathname)) return "School Detail";
  const active = resolveActiveHref(pathname);
  return allItems.find((item) => item.href === active)?.label ?? "Platform Console";
}

/* ------------------------------------------------------------------ */
/* Collapsible nav group                                               */
/* ------------------------------------------------------------------ */

function NavGroupSection({
  group,
  active,
  onNavigate,
  defaultOpen,
}: {
  group: NavGroup;
  active: string;
  onNavigate?: () => void;
  defaultOpen: boolean;
}) {
  const hasActive = group.items.some((item) => item.href === active);
  const [open, setOpen] = useState(defaultOpen || hasActive);

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 pb-1.5 pt-3.5 group cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-300 transition-colors">
          {group.title}
        </span>
        <ChevronDown
          className={`size-3 text-slate-500 transition-transform duration-200 group-hover:text-slate-400 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul className="mt-0.5 space-y-0.5">
          {group.items.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`size-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`}
                    aria-hidden="true"
                  />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge ? (
                    <span className="shrink-0 rounded-full bg-danger px-1.5 py-0.5 font-mono text-[9px] font-bold leading-none text-white">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar content                                                     */
/* ------------------------------------------------------------------ */

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = resolveActiveHref(pathname);
  const activeGroupId =
    navGroups.find((g) => g.items.some((i) => i.href === active))?.id ?? "overview";

  return (
    <div className="flex h-full flex-col bg-slate-900 border-r border-slate-800 text-white">
      {/* Brand Header */}
      <div className="px-5 pb-3 pt-5">
        <Link href="/super-admin" onClick={onNavigate} className="inline-flex rounded-xl">
          <Logo tone="light" />
        </Link>
      </div>

      {/* Operator Status Pill */}
      <div className="mx-3.5 mb-2 rounded-2xl border border-slate-800 bg-slate-800/60 p-3 flex items-center justify-between shadow-xs">
        <div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400 block">
            SUPER ADMIN ZONE
          </span>
          <span className="text-xs font-semibold text-white flex items-center gap-1.5 mt-0.5">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            Global Platform Console
          </span>
        </div>
        <span className="rounded-md bg-primary-light/20 px-2 py-0.5 font-mono text-[10px] font-bold text-primary">
          Root
        </span>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Platform navigation"
        className="mt-1 flex-1 overflow-y-auto px-3 pb-4 hide-scrollbar"
      >
        {navGroups.map((group) => (
          <NavGroupSection
            key={group.id}
            group={group}
            active={active}
            onNavigate={onNavigate}
            defaultOpen={group.id === activeGroupId || group.id === "overview"}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800/80 px-4 py-3 bg-slate-950/40">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={onNavigate}
            className="text-xs font-semibold text-slate-400 transition-colors hover:text-white"
          >
            ← Back to campus360.app
          </Link>
          <Link
            href="/super-admin/profile"
            onClick={onNavigate}
            aria-label="Super admin profile"
            className="inline-flex size-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <LogOut className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Platform chrome (layout shell)                                      */
/* ------------------------------------------------------------------ */

export function PlatformChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (pathname === "/super-admin/login") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open, pathname]);

  // If viewing the super admin login page, bypass the platform sidebar and operator chrome
  if (pathname === "/super-admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-canvas lg:flex antialiased">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[17.5rem] shrink-0 overflow-hidden lg:block z-30">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/60 backdrop-blur-xs"
          />
          <div className="absolute inset-y-0 left-0 w-[17.5rem] max-w-[88%] overflow-hidden shadow-2xl">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 z-10 inline-flex size-8 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
            <div className="relative h-full">
              <SidebarContent pathname={pathname} onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}

      {/* Main content area */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        {/* Top Operational Header */}
        <header className="sticky top-0 z-20 border-b border-line bg-surface/90 shadow-xs backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-ink-soft transition-colors hover:bg-primary-light hover:text-primary lg:hidden"
            >
              <Menu className="size-4" aria-hidden="true" />
            </button>

            {/* Page title */}
            <div className="min-w-0">
              <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-primary">
                Super Admin Console
              </p>
              <p className="truncate text-base font-extrabold leading-tight text-ink">
                {resolveTitle(pathname)}
              </p>
            </div>

            {/* Header actions */}
            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              {/* Live status badge */}
              <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success-light px-3 py-1 font-mono text-[10px] font-bold text-success-deep">
                <span className="size-2 rounded-full bg-success animate-pulse" />
                <span>48 Tenants Healthy</span>
              </div>

              {/* Global search */}
              <label className="hidden h-9.5 items-center gap-2 rounded-xl border border-line bg-surface-raised px-3.5 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 md:flex">
                <Search className="size-3.5 text-ink-muted" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search schools, users, plans…"
                  className="w-36 bg-transparent text-xs text-ink outline-none placeholder:text-ink-muted lg:w-56"
                />
              </label>

              {/* Notifications */}
              <Link
                href="/super-admin/notifications"
                aria-label="Notifications"
                className="relative inline-flex size-9 items-center justify-center rounded-xl border border-line bg-surface text-ink-soft transition-all hover:border-primary/40 hover:bg-primary-light hover:text-primary"
              >
                <Bell className="size-4" aria-hidden="true" />
                <span
                  className="absolute right-1.5 top-1.5 size-2 rounded-full bg-danger ring-2 ring-surface"
                  aria-hidden="true"
                />
              </Link>

              {/* Operator Avatar */}
              <Link
                href="/super-admin/profile"
                className="flex items-center gap-2 rounded-xl border border-line bg-surface py-1 pl-1 pr-3 transition-all hover:border-primary/40 hover:bg-primary-light"
                aria-label="My profile"
              >
                <Avatar name="Platform Super Admin" className="size-7" />
                <div className="hidden sm:block text-left text-xs leading-tight">
                  <span className="block font-bold text-ink">Super Admin</span>
                  <span className="block font-mono text-[10px] text-primary font-semibold">Root Operator</span>
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
