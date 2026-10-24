// Platform (super-admin) demo data.
//
// Every value in this file is illustrative sample data so the operator console
// can be designed and reviewed before the Supabase data layer is wired up.
// Nothing here performs IO, and no value is generated at request time, so the
// pages stay compatible with `cacheComponents`.

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatPercent(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* ------------------------------------------------------------------ */
/* Status, plan and severity metadata                                  */
/* ------------------------------------------------------------------ */

export type PillTone =
  | "positive"
  | "warning"
  | "critical"
  | "neutral"
  | "muted"
  | "accent";

export type TenantStatus =
  | "active"
  | "trial"
  | "onboarding"
  | "past_due"
  | "suspended"
  | "closed";

export const tenantStatusMeta: Record<
  TenantStatus,
  { label: string; tone: PillTone; description: string }
> = {
  active: {
    label: "Active",
    tone: "positive",
    description: "Paying tenant with full access to its workspace.",
  },
  trial: {
    label: "Trial",
    tone: "warning",
    description: "Full-feature trial, no payment method required.",
  },
  onboarding: {
    label: "Onboarding",
    tone: "neutral",
    description: "Provisioning, migrations or staff training in progress.",
  },
  past_due: {
    label: "Past due",
    tone: "critical",
    description: "Subscription payment failed; retry schedule is running.",
  },
  suspended: {
    label: "Suspended",
    tone: "critical",
    description: "Access revoked by a platform operator. Reason is audited.",
  },
  closed: {
    label: "Closed",
    tone: "muted",
    description: "Tenant churned. Data retained read-only for export.",
  },
};

export type PlanName = "Starter" | "Growth" | "Enterprise";

export type TenantHealth = "good" | "watch" | "at_risk";

export const healthMeta: Record<TenantHealth, { label: string; tone: PillTone }> = {
  good: { label: "Healthy", tone: "positive" },
  watch: { label: "Watch", tone: "warning" },
  at_risk: { label: "At risk", tone: "critical" },
};

export type Severity = "info" | "warning" | "critical" | "success";

export const severityMeta: Record<Severity, { label: string; tone: PillTone }> = {
  info: { label: "Info", tone: "neutral" },
  success: { label: "Success", tone: "positive" },
  warning: { label: "Warning", tone: "warning" },
  critical: { label: "Critical", tone: "critical" },
};

/* ------------------------------------------------------------------ */
/* Platform-wide metrics                                               */
/* ------------------------------------------------------------------ */

export const platformStats = {
  totalTenants: 1284,
  activeTenants: 1041,
  trialTenants: 156,
  onboardingTenants: 38,
  pastDueTenants: 31,
  suspendedTenants: 18,
  totalStudents: 482900,
  totalStaff: 38400,
  mrr: 186400,
  arr: 2236800,
  mrrGrowth: 4.6,
  netRevenueRetention: 108.4,
  churnRate: 1.8,
  uptime: 99.98,
  newThisMonth: 34,
  trialsEndingSoon: 21,
  openInvoices: 274,
} as const;

export type Tenant = {
  slug: string;
  name: string;
  region: string;
  timezone: string;
  currency: string;
  plan: PlanName;
  status: TenantStatus;
  health: TenantHealth;
  students: number;
  studentLimit: number | null;
  staff: number;
  staffLimit: number | null;
  monthlyRevenue: number;
  campuses: number;
  owner: string;
  ownerEmail: string;
  createdAt: string;
  renewalDate: string;
  lastActivity: string;
  trialEndsIn?: string;
  notes?: string;
  spark: number[];
};

// A representative slice of the directory. The full platform holds 1,284
// tenants; this list powers the drill-down screens.
export const tenants: Tenant[] = [
  {
    slug: "riverside-academy",
    name: "Riverside Academy",
    region: "London, United Kingdom",
    timezone: "Europe/London",
    currency: "USD",
    plan: "Growth",
    status: "active",
    health: "good",
    students: 1248,
    studentLimit: null,
    staff: 48,
    staffLimit: 50,
    monthlyRevenue: 349,
    campuses: 1,
    owner: "Amara Nwosu",
    ownerEmail: "amara.nwosu@riverside.example",
    createdAt: "14 Mar 2024",
    renewalDate: "14 Nov 2026",
    lastActivity: "2 hours ago",
    spark: [18, 22, 20, 26, 29, 27, 33, 36],
  },
  {
    slug: "kingsway-college",
    name: "Kingsway College",
    region: "Birmingham, United Kingdom",
    timezone: "Europe/London",
    currency: "USD",
    plan: "Enterprise",
    status: "active",
    health: "good",
    students: 3410,
    studentLimit: null,
    staff: 214,
    staffLimit: null,
    monthlyRevenue: 2450,
    campuses: 4,
    owner: "Daniel Okafor",
    ownerEmail: "d.okafor@kingsway.example",
    createdAt: "02 Sep 2023",
    renewalDate: "02 Oct 2027",
    lastActivity: "26 minutes ago",
    spark: [88, 92, 90, 96, 101, 108, 112, 119],
  },
  {
    slug: "northgate-prep",
    name: "Northgate Prep",
    region: "Manchester, United Kingdom",
    timezone: "Europe/London",
    currency: "USD",
    plan: "Starter",
    status: "trial",
    health: "watch",
    students: 268,
    studentLimit: 300,
    staff: 4,
    staffLimit: 5,
    monthlyRevenue: 0,
    campuses: 1,
    owner: "Priya Raman",
    ownerEmail: "priya.raman@northgate.example",
    createdAt: "12 Oct 2026",
    renewalDate: "26 Oct 2026",
    lastActivity: "1 hour ago",
    trialEndsIn: "6 days",
    notes: "Evaluating attendance and report cards before term ends.",
    spark: [4, 7, 9, 12, 14, 19, 22, 26],
  },
  {
    slug: "st-alden",
    name: "St. Alden's",
    region: "Leeds, United Kingdom",
    timezone: "Europe/London",
    currency: "USD",
    plan: "Growth",
    status: "past_due",
    health: "at_risk",
    students: 890,
    studentLimit: null,
    staff: 36,
    staffLimit: 50,
    monthlyRevenue: 299,
    campuses: 1,
    owner: "Marcus Bell",
    ownerEmail: "bursar@st-alden.example",
    createdAt: "21 Jan 2025",
    renewalDate: "21 Sep 2026",
    lastActivity: "3 days ago",
    notes: "Card declined twice. Dunning emails 2 of 3 sent.",
    spark: [26, 25, 27, 24, 22, 21, 20, 19],
  },
  {
    slug: "bridgewater-grammar",
    name: "Bridgewater Grammar",
    region: "Bristol, United Kingdom",
    timezone: "Europe/London",
    currency: "USD",
    plan: "Enterprise",
    status: "active",
    health: "good",
    students: 2180,
    studentLimit: null,
    staff: 168,
    staffLimit: null,
    monthlyRevenue: 1780,
    campuses: 2,
    owner: "Helen Osei",
    ownerEmail: "h.osei@bridgewater.example",
    createdAt: "08 Nov 2023",
    renewalDate: "08 Nov 2026",
    lastActivity: "12 minutes ago",
    spark: [61, 63, 66, 68, 71, 70, 74, 78],
  },
  {
    slug: "highfield-school",
    name: "Highfield School",
    region: "Glasgow, United Kingdom",
    timezone: "Europe/London",
    currency: "USD",
    plan: "Growth",
    status: "onboarding",
    health: "watch",
    students: 612,
    studentLimit: null,
    staff: 28,
    staffLimit: 50,
    monthlyRevenue: 420,
    campuses: 1,
    owner: "Grace Mensah",
    ownerEmail: "grace.mensah@highfield.example",
    createdAt: "28 Sep 2026",
    renewalDate: "28 Sep 2027",
    lastActivity: "4 hours ago",
    notes: "Migrating 612 students and 3 years of grade history from spreadsheets.",
    spark: [2, 5, 8, 11, 15, 18, 23, 27],
  },
  {
    slug: "harbourview-school",
    name: "Harbourview School",
    region: "Liverpool, United Kingdom",
    timezone: "Europe/London",
    currency: "USD",
    plan: "Enterprise",
    status: "active",
    health: "good",
    students: 2760,
    studentLimit: null,
    staff: 190,
    staffLimit: null,
    monthlyRevenue: 2100,
    campuses: 3,
    owner: "Tunde Adeyemi",
    ownerEmail: "t.adeyemi@harbourview.example",
    createdAt: "17 Apr 2024",
    renewalDate: "17 Apr 2027",
    lastActivity: "38 minutes ago",
    spark: [74, 78, 80, 85, 88, 92, 95, 99],
  },
  {
    slug: "elmwood-academy",
    name: "Elmwood Academy",
    region: "Nottingham, United Kingdom",
    timezone: "Europe/London",
    currency: "USD",
    plan: "Growth",
    status: "active",
    health: "good",
    students: 1020,
    studentLimit: null,
    staff: 41,
    staffLimit: 50,
    monthlyRevenue: 640,
    campuses: 1,
    owner: "Sofia Marchetti",
    ownerEmail: "s.marchetti@elmwood.example",
    createdAt: "05 Jun 2025",
    renewalDate: "05 Jun 2027",
    lastActivity: "5 hours ago",
    spark: [30, 32, 31, 35, 37, 36, 40, 43],
  },
  {
    slug: "meadowbrook",
    name: "Meadowbrook",
    region: "Oxford, United Kingdom",
    timezone: "Europe/London",
    currency: "USD",
    plan: "Starter",
    status: "active",
    health: "watch",
    students: 244,
    studentLimit: 300,
    staff: 5,
    staffLimit: 5,
    monthlyRevenue: 89,
    campuses: 1,
    owner: "Owen Fletcher",
    ownerEmail: "office@meadowbrook.example",
    createdAt: "19 Feb 2025",
    renewalDate: "19 Feb 2027",
    lastActivity: "Yesterday",
    notes: "At the Starter staff-seat limit; upgrade conversation open.",
    spark: [9, 10, 11, 10, 12, 13, 13, 14],
  },
  {
    slug: "southbank-college",
    name: "Southbank College",
    region: "London, United Kingdom",
    timezone: "Europe/London",
    currency: "USD",
    plan: "Starter",
    status: "trial",
    health: "good",
    students: 296,
    studentLimit: 300,
    staff: 3,
    staffLimit: 5,
    monthlyRevenue: 0,
    campuses: 1,
    owner: "Isabel Duarte",
    ownerEmail: "isabel.duarte@southbank.example",
    createdAt: "15 Oct 2026",
    renewalDate: "29 Oct 2026",
    lastActivity: "6 hours ago",
    trialEndsIn: "9 days",
    notes: "Started from a self-serve signup; no sales contact yet.",
    spark: [3, 6, 8, 11, 13, 16, 18, 21],
  },
  {
    slug: "lakeside-primary",
    name: "Lakeside Primary",
    region: "Cardiff, United Kingdom",
    timezone: "Europe/London",
    currency: "USD",
    plan: "Starter",
    status: "suspended",
    health: "at_risk",
    students: 180,
    studentLimit: 300,
    staff: 3,
    staffLimit: 5,
    monthlyRevenue: 0,
    campuses: 1,
    owner: "Rhys Morgan",
    ownerEmail: "head@lakeside.example",
    createdAt: "11 Aug 2024",
    renewalDate: "11 Aug 2026",
    lastActivity: "Reopened export 9 days ago",
    notes: "Suspended after 60 days unpaid. Read-only export retained.",
    spark: [7, 7, 6, 6, 5, 4, 3, 2],
  },
  {
    slug: "oakridge-institute",
    name: "Oakridge Institute",
    region: "Sheffield, United Kingdom",
    timezone: "Europe/London",
    currency: "USD",
    plan: "Growth",
    status: "closed",
    health: "at_risk",
    students: 540,
    studentLimit: null,
    staff: 22,
    staffLimit: 50,
    monthlyRevenue: 0,
    campuses: 1,
    owner: "Nadia Haddad",
    ownerEmail: "registry@oakridge.example",
    createdAt: "23 Mar 2025",
    renewalDate: "—",
    lastActivity: "Merged into Kingsway College",
    notes: "Churned and merged with Kingsway College. History preserved.",
    spark: [24, 22, 20, 16, 12, 8, 4, 0],
  },
];

export const directoryTotal = platformStats.totalTenants;

export function getTenant(slug: string): Tenant | undefined {
  return tenants.find((tenant) => tenant.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Overview: revenue trend, plan mix, onboarding queue                 */
/* ------------------------------------------------------------------ */

export type SeriesPoint = { label: string; value: number };

export const mrrSeries: SeriesPoint[] = [
  { label: "Nov", value: 142600 },
  { label: "Dec", value: 146100 },
  { label: "Jan", value: 151800 },
  { label: "Feb", value: 154300 },
  { label: "Mar", value: 159900 },
  { label: "Apr", value: 163400 },
  { label: "May", value: 168200 },
  { label: "Jun", value: 171500 },
  { label: "Jul", value: 174800 },
  { label: "Aug", value: 178300 },
  { label: "Sep", value: 181100 },
  { label: "Oct", value: 186400 },
];

export const newSchoolsSeries: SeriesPoint[] = [
  { label: "May", value: 21 },
  { label: "Jun", value: 24 },
  { label: "Jul", value: 19 },
  { label: "Aug", value: 28 },
  { label: "Sep", value: 31 },
  { label: "Oct", value: 34 },
];

export const planMix: { label: PlanName; value: number }[] = [
  { label: "Starter", value: 612 },
  { label: "Growth", value: 498 },
  { label: "Enterprise", value: 174 },
];

export type OnboardingItem = {
  school: string;
  slug: string;
  stage: string;
  detail: string;
  owner: string;
  due: string;
};

export const onboardingQueue: OnboardingItem[] = [
  {
    school: "Highfield School",
    slug: "highfield-school",
    stage: "Data migration",
    detail: "Importing 612 students and 3 years of grade history",
    owner: "Implementation team",
    due: "Due 24 Oct",
  },
  {
    school: "Southbank College",
    slug: "southbank-college",
    stage: "Self-serve trial",
    detail: "No sales contact yet — review before trial ends",
    owner: "Unassigned",
    due: "Due 29 Oct",
  },
  {
    school: "Northgate Prep",
    slug: "northgate-prep",
    stage: "Trial wrap-up",
    detail: "Attendance and report cards evaluation complete",
    owner: "Amelia Cross",
    due: "Due 26 Oct",
  },
  {
    school: "Bramfield High",
    slug: "bramfield-high",
    stage: "Kick-off call booked",
    detail: "Group of 2 campuses, SSO required",
    owner: "Amelia Cross",
    due: "Due 30 Oct",
  },
];

/* ------------------------------------------------------------------ */
/* Plan catalog                                                        */
/* ------------------------------------------------------------------ */

export type PlanCatalogEntry = {
  name: PlanName;
  tagline: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  tenantCount: number;
  mrr: number;
  studentLimit: string;
  staffLimit: string;
  entitlements: string[];
};

export const planCatalog: PlanCatalogEntry[] = [
  {
    name: "Starter",
    tagline: "For small schools getting organised.",
    monthlyPrice: 49,
    annualPrice: 39,
    tenantCount: 612,
    mrr: 30000,
    studentLimit: "Up to 300 students",
    staffLimit: "5 staff accounts",
    entitlements: [
      "Admissions & student records",
      "Attendance registers",
      "Assessments & report cards",
      "Email support",
    ],
  },
  {
    name: "Growth",
    tagline: "For schools running everything in one place.",
    monthlyPrice: 149,
    annualPrice: 119,
    tenantCount: 498,
    mrr: 74200,
    studentLimit: "Unlimited students",
    staffLimit: "50 staff accounts",
    entitlements: [
      "Everything in Starter",
      "Fees, invoices & receipts",
      "Parent & student portals",
      "Announcements & reminders",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For groups, districts and multi-campus schools.",
    monthlyPrice: null,
    annualPrice: null,
    tenantCount: 174,
    mrr: 82200,
    studentLimit: "Unlimited students",
    staffLimit: "Unlimited staff",
    entitlements: [
      "Multi-campus & group reporting",
      "SSO & advanced access control",
      "Data migration & onboarding",
      "Dedicated success manager",
      "SLA & audit exports",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Audit log + support access                                          */
/* ------------------------------------------------------------------ */

export type AuditEvent = {
  id: string;
  time: string;
  actor: string;
  actorRole: string;
  action: string;
  target: string;
  schoolSlug?: string;
  ip: string;
  severity: Severity;
  reason?: string;
};

export const auditEvents: AuditEvent[] = [
  {
    id: "evt-99412",
    time: "Oct 18, 2026 · 14:32",
    actor: "S. Adeyemi",
    actorRole: "Platform operator",
    action: "Suspended tenant",
    target: "Lakeside Primary",
    schoolSlug: "lakeside-primary",
    ip: "81.2.44.19",
    severity: "critical",
    reason: "60 days unpaid — subscription policy enforcement",
  },
  {
    id: "evt-99411",
    time: "Oct 18, 2026 · 14:05",
    actor: "System",
    actorRole: "Automation",
    action: "Dunning email sent",
    target: "St. Alden's — attempt 2 of 3",
    schoolSlug: "st-alden",
    ip: "—",
    severity: "warning",
  },
  {
    id: "evt-99410",
    time: "Oct 18, 2026 · 13:48",
    actor: "Amelia Cross",
    actorRole: "Implementation",
    action: "Started support access",
    target: "Highfield School",
    schoolSlug: "highfield-school",
    ip: "81.2.44.71",
    severity: "warning",
    reason: "Verifying migrated grade history",
  },
  {
    id: "evt-99409",
    time: "Oct 18, 2026 · 13:41",
    actor: "Amelia Cross",
    actorRole: "Implementation",
    action: "Ended support access",
    target: "Highfield School",
    schoolSlug: "highfield-school",
    ip: "81.2.44.71",
    severity: "info",
    reason: "Session complete",
  },
  {
    id: "evt-99408",
    time: "Oct 18, 2026 · 12:20",
    actor: "S. Adeyemi",
    actorRole: "Platform operator",
    action: "Changed plan",
    target: "Elmwood Academy → Growth",
    schoolSlug: "elmwood-academy",
    ip: "81.2.44.19",
    severity: "info",
    reason: "Upgrade agreed after seat-limit review",
  },
  {
    id: "evt-99407",
    time: "Oct 18, 2026 · 11:57",
    actor: "System",
    actorRole: "Automation",
    action: "Extending trial",
    target: "Northgate Prep (+7 days)",
    schoolSlug: "northgate-prep",
    ip: "—",
    severity: "info",
  },
  {
    id: "evt-99406",
    time: "Oct 18, 2026 · 10:12",
    actor: "Amelia Cross",
    actorRole: "Implementation",
    action: "Queued migration",
    target: "Highfield School — 612 students",
    schoolSlug: "highfield-school",
    ip: "81.2.44.71",
    severity: "info",
  },
  {
    id: "evt-99405",
    time: "Oct 18, 2026 · 07:00",
    actor: "System",
    actorRole: "Automation",
    action: "Backup completed",
    target: "All tenants — 42.1 GB",
    ip: "—",
    severity: "success",
  },
  {
    id: "evt-99404",
    time: "Oct 17, 2026 · 22:14",
    actor: "D. Okafor",
    actorRole: "Tenant admin",
    action: "Used API key",
    target: "Kingsway College — group reporting",
    schoolSlug: "kingsway-college",
    ip: "196.44.8.2",
    severity: "info",
    reason: "Scheduled finance export",
  },
  {
    id: "evt-99403",
    time: "Oct 17, 2026 · 19:02",
    actor: "System",
    actorRole: "Automation",
    action: "Past-due flagged",
    target: "St. Alden's — $299",
    schoolSlug: "st-alden",
    ip: "—",
    severity: "warning",
  },
  {
    id: "evt-99402",
    time: "Oct 17, 2026 · 16:39",
    actor: "S. Adeyemi",
    actorRole: "Platform operator",
    action: "Updated feature flag",
    target: "beta.bulk-report-cards → on",
    ip: "81.2.44.19",
    severity: "info",
    reason: "Rolling out to 5 pilot schools",
  },
  {
    id: "evt-99401",
    time: "Oct 17, 2026 · 15:27",
    actor: "System",
    actorRole: "Automation",
    action: "Webhook replayed",
    target: "Paystack — 3 failed events recovered",
    ip: "—",
    severity: "success",
  },
  {
    id: "evt-99400",
    time: "Oct 17, 2026 · 11:05",
    actor: "S. Adeyemi",
    actorRole: "Platform operator",
    action: "Created tenant",
    target: "Bramfield High",
    ip: "81.2.44.19",
    severity: "success",
    reason: "Signed Enterprise agreement",
  },
  {
    id: "evt-99399",
    time: "Oct 17, 2026 · 09:41",
    actor: "System",
    actorRole: "Automation",
    action: "Trial ending soon",
    target: "Southbank College — 9 days left",
    schoolSlug: "southbank-college",
    ip: "—",
    severity: "info",
  },
];

export type SupportSession = {
  id: string;
  operator: string;
  operatorRole: string;
  school: string;
  slug: string;
  reason: string;
  startedAt: string;
  duration: string;
  status: "active" | "ended";
};

export const supportSessions: SupportSession[] = [
  {
    id: "sup-3312",
    operator: "Amelia Cross",
    operatorRole: "Implementation",
    school: "Highfield School",
    slug: "highfield-school",
    reason: "Verifying migrated grade history",
    startedAt: "Oct 18, 2026 · 13:48",
    duration: "18 min",
    status: "active",
  },
  {
    id: "sup-3311",
    operator: "S. Adeyemi",
    operatorRole: "Platform operator",
    school: "Lakeside Primary",
    slug: "lakeside-primary",
    reason: "Confirming read-only export worked before suspension",
    startedAt: "Oct 18, 2026 · 12:31",
    duration: "7 min",
    status: "ended",
  },
  {
    id: "sup-3310",
    operator: "Amelia Cross",
    operatorRole: "Implementation",
    school: "Northgate Prep",
    slug: "northgate-prep",
    reason: "Guided tour of the report-card approval flow",
    startedAt: "Oct 17, 2026 · 15:10",
    duration: "42 min",
    status: "ended",
  },
  {
    id: "sup-3309",
    operator: "S. Adeyemi",
    operatorRole: "Platform operator",
    school: "St. Alden's",
    slug: "st-alden",
    reason: "Investigating a failed card retry",
    startedAt: "Oct 17, 2026 · 10:02",
    duration: "11 min",
    status: "ended",
  },
];

/* ------------------------------------------------------------------ */
/* Per-tenant derived views                                            */
/* ------------------------------------------------------------------ */

export type TenantMember = {
  name: string;
  email: string;
  role: string;
  status: "active" | "invited";
  lastSeen: string;
};

const tenantRoleTemplate: { role: string; local: string }[] = [
  { role: "School Owner", local: "owner" },
  { role: "Bursar / Accountant", local: "bursar" },
  { role: "Registrar", local: "registrar" },
  { role: "Principal", local: "principal" },
];

export function tenantMembers(tenant: Tenant): TenantMember[] {
  return tenantRoleTemplate.map((entry, index) => ({
    name: index === 0 ? tenant.owner : entry.role,
    email:
      index === 0 ? tenant.ownerEmail : `${entry.local}@${tenant.slug}.example`,
    role: entry.role,
    status: index < 2 ? "active" : "invited",
    lastSeen: index === 0 ? "2 hours ago" : index < 2 ? "Yesterday" : "Never",
  }));
}

export function tenantActivity(tenant: Tenant): AuditEvent[] {
  const statusEvent: AuditEvent | null =
    tenant.status === "suspended"
      ? {
          id: `${tenant.slug}-sus`,
          time: "Oct 18, 2026 · 14:32",
          actor: "S. Adeyemi",
          actorRole: "Platform operator",
          action: "Suspended tenant",
          target: tenant.name,
          ip: "81.2.44.19",
          severity: "critical",
          reason: "60 days unpaid — subscription policy enforcement",
        }
      : tenant.status === "past_due"
        ? {
            id: `${tenant.slug}-pd`,
            time: "Oct 17, 2026 · 19:02",
            actor: "System",
            actorRole: "Automation",
            action: "Payment failed",
            target: `${tenant.name} — ${formatUsd(tenant.monthlyRevenue || 299)}`,
            ip: "—",
            severity: "warning",
          }
        : null;

  return [
    ...(statusEvent ? [statusEvent] : []),
    {
      id: `${tenant.slug}-1`,
      time: tenant.lastActivity.includes("ago") ? "Oct 18, 2026" : "Oct 16, 2026",
      actor: tenant.owner,
      actorRole: "Tenant admin",
      action: "Signed in",
      target: `${tenant.name} workspace`,
      ip: "196.44.8.2",
      severity: "info",
    },
    {
      id: `${tenant.slug}-2`,
      time: "Oct 14, 2026",
      actor: "System",
      actorRole: "Automation",
      action: "Subscription renewed",
      target: `${tenant.plan} · ${formatUsd(tenant.monthlyRevenue)}/mo`,
      ip: "—",
      severity: tenant.monthlyRevenue > 0 ? "success" : "info",
    },
    {
      id: `${tenant.slug}-3`,
      time: "Oct 09, 2026",
      actor: "Amelia Cross",
      actorRole: "Implementation",
      action: "Started support access",
      target: tenant.name,
      ip: "81.2.44.71",
      severity: "warning",
      reason: "Quarterly account review",
    },
    {
      id: `${tenant.slug}-4`,
      time: tenant.createdAt,
      actor: "S. Adeyemi",
      actorRole: "Platform operator",
      action: "Created tenant",
      target: tenant.name,
      ip: "81.2.44.19",
      severity: "success",
      reason: "Provisioned on the platform",
    },
  ];
}

export type FeatureFlag = {
  key: string;
  description: string;
  scope: string;
  enabled: boolean;
  rollout: string;
};

export const featureFlags: FeatureFlag[] = [
  {
    key: "beta.bulk-report-cards",
    description: "Generate and publish report cards for a whole year group at once.",
    scope: "Pilot schools",
    enabled: true,
    rollout: "5 of 1,284 tenants",
  },
  {
    key: "beta.attendance-sms",
    description: "Send guardian SMS when a student is marked absent.",
    scope: "Global",
    enabled: false,
    rollout: "Off",
  },
  {
    key: "beta.ai-timetable",
    description: "Suggest conflict-free timetables from teaching assignments.",
    scope: "Enterprise",
    enabled: true,
    rollout: "All Enterprise tenants",
  },
  {
    key: "platform.strict-export-audit",
    description: "Require a reason for every student-data export.",
    scope: "Global",
    enabled: true,
    rollout: "Enforced",
  },
];

export type IntegrationStatus = {
  name: string;
  detail: string;
  status: "operational" | "degraded" | "down";
  meta: string;
};

export const integrations: IntegrationStatus[] = [
  {
    name: "Supabase Auth",
    detail: "Sign-in, sessions and MFA",
    status: "operational",
    meta: "99.99% · 30 days",
  },
  {
    name: "Postgres (tenant database)",
    detail: "Row-level security enforced",
    status: "operational",
    meta: "p95 42 ms",
  },
  {
    name: "Resend (email)",
    detail: "Transactional and bulk mail",
    status: "operational",
    meta: "99.4% delivered",
  },
  {
    name: "Inngest (jobs)",
    detail: "Reminders, exports, retries",
    status: "degraded",
    meta: "1 backlog draining",
  },
  {
    name: "Paystack (payments)",
    detail: "Webhooks verified & idempotent",
    status: "operational",
    meta: "0 unreconciled",
  },
  {
    name: "Supabase Storage",
    detail: "Private objects, signed URLs",
    status: "operational",
    meta: "42.1 GB used",
  },
];

export type Operator = {
  name: string;
  email: string;
  role: "Platform owner" | "Platform operator" | "Support" | "Implementation";
  mfa: boolean;
  lastActive: string;
};

export const operators: Operator[] = [
  {
    name: "S. Adeyemi",
    email: "superadmin@campus360.example",
    role: "Platform owner",
    mfa: true,
    lastActive: "Active now",
  },
  {
    name: "Amelia Cross",
    email: "amelia.cross@campus360.example",
    role: "Implementation",
    mfa: true,
    lastActive: "18 minutes ago",
  },
  {
    name: "Jonas Weber",
    email: "jonas.weber@campus360.example",
    role: "Support",
    mfa: true,
    lastActive: "2 hours ago",
  },
  {
    name: "Leah Kimani",
    email: "leah.kimani@campus360.example",
    role: "Platform operator",
    mfa: false,
    lastActive: "3 days ago",
  },
];
