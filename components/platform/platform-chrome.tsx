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
  Menu,
  Megaphone,
  MessageSquare,
  Package,
  Plug,
  Receipt,
  ScrollText,
  Search,
  Settings2,
  ShieldCheck,
  Tag,
  Timer,
  TrendingUp,
  UserCog,
  Users,
  Wallet,
  Webhook,
  X,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/site/logo";
import { Avatar } from "@/components/platform/ui";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
  badge?: string;
};

type NavGroup = {
  id: string;
  title: string;
  items: NavItem[];
};

/* ------------------------------------------------------------------ */
/* Navigation structure                                                */
/* ------------------------------------------------------------------ */

const navGroups: NavGroup[] = [
  {
    id: "overview",
    title: "Overview",
    items: [
      { label: "Dashboard",          href: "/super-admin",           icon: LayoutDashboard, exact: true },
      { label: "Platform Analytics", href: "/super-admin/analytics", icon: BarChart3 },
      { label: "System Health",      href: "/super-admin/health",    icon: Activity },
    ],
  },
  {
    id: "schools",
    title: "Schools",
    items: [
      { label: "Schools / Tenants", href: "/super-admin/tenants",    icon: Building2 },
      { label: "Campuses & Orgs",   href: "/super-admin/campuses",   icon: Briefcase },
      { label: "Onboarding",        href: "/super-admin/onboarding", icon: Heart },
    ],
  },
  {
    id: "revenue",
    title: "Subscriptions & Revenue",
    items: [
      { label: "Plans & Pricing",  href: "/super-admin/plans",         icon: Package },
      { label: "Subscriptions",    href: "/super-admin/subscriptions",  icon: CreditCard },
      { label: "Billing & Invoices",href: "/super-admin/billing",       icon: Receipt },
      { label: "Payments",         href: "/super-admin/payments",       icon: Wallet },
      { label: "Revenue Reports",  href: "/super-admin/revenue",        icon: TrendingUp },
      { label: "Coupons & Promos", href: "/super-admin/coupons",        icon: Tag },
    ],
  },
  {
    id: "people",
    title: "Users & Security",
    items: [
      { label: "Platform Users",     href: "/super-admin/users",    icon: Users },
      { label: "Roles & Permissions",href: "/super-admin/roles",    icon: UserCog },
      { label: "Security & Access",  href: "/super-admin/security", icon: ShieldCheck },
      { label: "Audit Logs",         href: "/super-admin/audit",    icon: ScrollText },
    ],
  },
  {
    id: "support",
    title: "Support & Communication",
    items: [
      { label: "Support Tickets",     href: "/super-admin/tickets",       icon: MessageSquare, badge: "12" },
      { label: "Tenant Support",      href: "/super-admin/support",       icon: LifeBuoy },
      { label: "Announcements",       href: "/super-admin/announcements", icon: Megaphone },
      { label: "Notifications",       href: "/super-admin/notifications", icon: Bell },
      { label: "Email Templates",     href: "/super-admin/email",         icon: Mail },
    ],
  },
  {
    id: "operations",
    title: "Platform Operations",
    items: [
      { label: "Feature Flags",    href: "/super-admin/flags",        icon: Flag },
      { label: "Integrations",     href: "/super-admin/integrations", icon: Plug },
      { label: "Webhooks",         href: "/super-admin/webhooks",     icon: Webhook },
      { label: "Background Jobs",  href: "/super-admin/jobs",         icon: Timer },
      { label: "Storage",          href: "/super-admin/storage",      icon: HardDrive },
      { label: "Errors & Monitoring",href: "/super-admin/monitoring", icon: AlertTriangle },
    ],
  },
  {
    id: "config",
    title: "Settings & Compliance",
    items: [
      { label: "Platform Settings", href: "/super-admin/settings",      icon: Settings2 },
      { label: "Localization",      href: "/super-admin/localization",   icon: Globe2 },
      { label: "Legal & Privacy",   href: "/super-admin/legal",         icon: FileText },
      { label: "Maintenance",       href: "/super-admin/maintenance",    icon: Database },
      { label: "Docs & Help Center",href: "/super-admin/docs",           icon: BookOpen },
    ],
  },
  {
    id: "account",
    title: "My Account",
    items: [
      { label: "My Profile", href: "/super-admin/profile", icon: UserCog },
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
  if (/^\/super-admin\/tenants\/[^/]+$/.test(pathname)) return "School detail";
  const active = resolveActiveHref(pathname);
  return allItems.find((item) => item.href === active)?.label ?? "Platform";
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
    <div className="mb-0.5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 pb-1 pt-4"
        aria-expanded={open}
      >
        <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/35">
          {group.title}
        </span>
        <ChevronDown
          className={`size-3 text-white/25 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white text-primary shadow-sm"
                      : "text-white/65 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`size-4 shrink-0 ${isActive ? "text-primary" : "text-white/50"}`}
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
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="px-4 pb-3 pt-5">
        <Link href="/super-admin" onClick={onNavigate} className="inline-flex rounded-xl">
          <Logo tone="light" />
        </Link>
      </div>

      {/* Zone badge */}
      <div className="mx-3 mb-1 rounded-xl border border-white/10 bg-white/8 px-3.5 py-2.5">
        <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/40">
          Zone
        </p>
        <p className="mt-0.5 text-xs font-medium text-white/75">
          Platform operator console
        </p>
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
      <div className="border-t border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={onNavigate}
            className="text-xs font-medium text-white/45 transition-colors hover:text-white"
          >
            ← Back to campus360.com
          </Link>
          <Link
            href="/super-admin/profile"
            onClick={onNavigate}
            aria-label="Sign out"
            className="inline-flex size-7 items-center justify-center rounded-lg text-white/35 transition-colors hover:bg-white/10 hover:text-white"
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
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="min-h-screen bg-canvas lg:flex">
      {/* Desktop sidebar — vibrant indigo gradient */}
      <aside className="sticky top-0 hidden h-screen w-[17rem] shrink-0 overflow-hidden lg:block">
        {/* Gradient background */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary-deep via-primary to-accent"
          aria-hidden="true"
        />
        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
        {/* Glow blob */}
        <div
          className="pointer-events-none absolute -bottom-24 -right-12 size-64 rounded-full bg-accent/30 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative h-full">
          <SidebarContent pathname={pathname} />
        </div>
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 w-[17.5rem] max-w-[88%] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-deep via-primary to-accent" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
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
        {/* Top header */}
        <header className="sticky top-0 z-30 border-b border-line bg-surface/90 shadow-sm backdrop-blur-md">
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
                Super admin
              </p>
              <p className="truncate text-sm font-bold leading-tight text-ink">
                {resolveTitle(pathname)}
              </p>
            </div>

            {/* Header actions */}
            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              {/* Search */}
              <label className="hidden h-9 items-center gap-2 rounded-xl border border-line bg-canvas px-3.5 transition-colors focus-within:border-primary focus-within:bg-surface md:flex">
                <Search className="size-3.5 text-ink-muted" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search schools, users…"
                  className="w-36 bg-transparent text-xs text-ink outline-none placeholder:text-ink-muted lg:w-52"
                />
              </label>

              {/* Notifications */}
              <Link
                href="/super-admin/notifications"
                aria-label="Notifications"
                className="relative inline-flex size-9 items-center justify-center rounded-xl border border-line bg-surface text-ink-soft transition-colors hover:bg-primary-light hover:text-primary"
              >
                <Bell className="size-4" aria-hidden="true" />
                <span
                  className="absolute right-1.5 top-1.5 size-2 rounded-full bg-danger ring-2 ring-surface"
                  aria-hidden="true"
                />
              </Link>

              {/* Avatar / profile */}
              <Link
                href="/super-admin/profile"
                className="flex items-center gap-2 rounded-xl border border-line bg-surface py-1 pl-1 pr-3 transition-colors hover:border-primary/30 hover:bg-primary-light"
                aria-label="My profile"
              >
                <Avatar name="S. Adeyemi" className="size-7" />
                <span className="hidden text-xs font-semibold text-ink sm:block">
                  S. Adeyemi
                </span>
                <span className="hidden font-mono text-[9px] font-bold uppercase tracking-widest text-primary lg:block">
                  Owner
                </span>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
