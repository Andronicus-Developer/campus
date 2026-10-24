import {
  Backpack,
  BookOpen,
  Building2,
  CalendarCheck,
  FileText,
  GraduationCap,
  HeartHandshake,
  LineChart,
  MessageSquare,
  Receipt,
  Settings2,
  ShieldCheck,
  UserPlus,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export const siteMeta = {
  name: "Campus360",
  year: "2026",
  email: "hello@campus360.example",
  sales: "sales@campus360.example",
  salesHref: "mailto:sales@campus360.example?subject=Campus360%20demo%20request",
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Product", href: "#product" },
  { label: "Roles", href: "#roles" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "1,200+", label: "Schools onboarded" },
  { value: "480k", label: "Students managed" },
  { value: "3.1M", label: "Invoices processed" },
  { value: "99.98%", label: "Platform uptime" },
];

export const schoolLogos: string[] = [
  "Riverside Academy",
  "Northgate Prep",
  "Kingsway College",
  "St. Alden's",
  "Meadowbrook",
  "Highfield School",
];

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
};

export const features: Feature[] = [
  {
    icon: UserPlus,
    title: "Admissions & records",
    description:
      "Take an application from first enquiry to enrolled student without duplicate data entry.",
    points: ["Online applications", "Guardian links", "Enrolment history"],
  },
  {
    icon: CalendarCheck,
    title: "Attendance",
    description:
      "Class and session-level registers with corrections that keep a full before-and-after trail.",
    points: ["One register per session", "Late & excused states", "Guardian alerts"],
  },
  {
    icon: GraduationCap,
    title: "Assessments & report cards",
    description:
      "Configure grading scales once, capture marks, route them for approval and publish in batches.",
    points: ["Custom grade scales", "Approval workflow", "Printable report cards"],
  },
  {
    icon: Wallet,
    title: "Fees & payments",
    description:
      "Build fee structures, raise invoices, allocate payments and issue receipts automatically.",
    points: ["Invoice line items", "Allocations & refunds", "Reconciliation"],
  },
  {
    icon: MessageSquare,
    title: "Communication",
    description:
      "Target announcements by class, role or individual — with delivery and audit history.",
    points: ["Targeted sends", "Delivery tracking", "Scheduled reminders"],
  },
  {
    icon: ShieldCheck,
    title: "Multi-tenant security",
    description:
      "Every school is an isolated workspace, enforced by row-level security in the database.",
    points: ["Tenant isolation", "Role-based access", "Audit trails"],
  },
];

export type ShowcaseTabId = "overview" | "attendance" | "assessments" | "finance";

export type ShowcaseTab = { id: ShowcaseTabId; label: string };

export const showcaseTabs: ShowcaseTab[] = [
  { id: "overview", label: "Overview" },
  { id: "attendance", label: "Attendance" },
  { id: "assessments", label: "Assessments" },
  { id: "finance", label: "Finance" },
];

export type Role = { icon: LucideIcon; name: string; description: string };

export const roles: Role[] = [
  {
    icon: Building2,
    name: "Platform admin",
    description: "Tenant lifecycle, plans, onboarding and platform configuration.",
  },
  {
    icon: Settings2,
    name: "School admin",
    description: "Branding, calendar, classes, staff, roles and subscription.",
  },
  {
    icon: LineChart,
    name: "Principal",
    description: "Attendance, staff activity, result approval and school reports.",
  },
  {
    icon: FileText,
    name: "Registrar",
    description: "Admissions, student records, placement, transfers and archives.",
  },
  {
    icon: BookOpen,
    name: "Teacher",
    description: "Assigned classes, registers, assessments and marks entry.",
  },
  {
    icon: Receipt,
    name: "Bursar",
    description: "Fee structures, invoices, payments, receipts and reconciliation.",
  },
  {
    icon: HeartHandshake,
    name: "Parent",
    description: "Their children's attendance, results, announcements and balances.",
  },
  {
    icon: Backpack,
    name: "Student",
    description: "Timetable, attendance, published results and shared resources.",
  },
];

export type Step = { title: string; description: string; detail: string };

export const steps: Step[] = [
  {
    title: "Configure your school",
    description:
      "Set the academic calendar, terms, grading scales, fee categories and your own branding.",
    detail: "Takes an afternoon",
  },
  {
    title: "Bring in your people",
    description:
      "Import students and guardians, invite staff, and assign the roles each person should hold.",
    detail: "Bulk import supported",
  },
  {
    title: "Run daily operations",
    description:
      "Take attendance, capture marks, publish results, collect fees and keep families informed.",
    detail: "Every action audited",
  },
];

export type SecurityPoint = { title: string; description: string };

export const securityPoints: SecurityPoint[] = [
  {
    title: "Isolated by design",
    description:
      "Every record belongs to exactly one school, and row-level security prevents any query from crossing that line.",
  },
  {
    title: "Role-based access",
    description:
      "Eight built-in roles with granular permissions. Revoke access and sessions take effect immediately.",
  },
  {
    title: "Complete audit trail",
    description:
      "Sensitive actions, corrections and privileged support access are logged with actor, time and reason.",
  },
  {
    title: "Private documents",
    description:
      "Student files live in private storage and are streamed only to authorised members of that school.",
  },
  {
    title: "Payment integrity",
    description:
      "Provider webhooks are verified and idempotent, so every payment reconciles against the invoice it settles.",
  },
];

export type Plan = {
  name: string;
  tagline: string;
  monthly: number | null;
  annual: number | null;
  highlight?: boolean;
  ctaLabel: string;
  ctaHref: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    name: "Starter",
    tagline: "For small schools getting organised.",
    monthly: 49,
    annual: 39,
    ctaLabel: "Start free trial",
    ctaHref: "/signup",
    features: [
      "Up to 300 students",
      "Admissions & student records",
      "Attendance registers",
      "Assessments & report cards",
      "5 staff accounts",
      "Email support",
    ],
  },
  {
    name: "Growth",
    tagline: "For schools running everything in one place.",
    monthly: 149,
    annual: 119,
    highlight: true,
    ctaLabel: "Start free trial",
    ctaHref: "/signup",
    features: [
      "Unlimited students",
      "Everything in Starter",
      "Fees, invoices & receipts",
      "Parent & student portals",
      "Announcements & reminders",
      "50 staff accounts",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For groups, districts and multi-campus schools.",
    monthly: null,
    annual: null,
    ctaLabel: "Talk to sales",
    ctaHref: "/contact-sales",
    features: [
      "Multi-campus & group reporting",
      "SSO & advanced access control",
      "Data migration & onboarding",
      "Custom integrations",
      "Dedicated success manager",
      "SLA & audit exports",
    ],
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "How is each school's data kept separate?",
    answer:
      "Each school is a separate tenant. Every tenant-owned record carries a school identifier and is protected by row-level security inside the database, so a request from one school can never read or modify another school's data — even if a bug slips through in the application layer.",
  },
  {
    question: "Can we migrate our existing student records?",
    answer:
      "Yes. Spot-check imports are available on every plan, and Growth and Enterprise include assisted migration. We map your existing spreadsheet or export into students, guardians, classes and enrolment history without losing academic history.",
  },
  {
    question: "Is there a free trial, and what happens when it ends?",
    answer:
      "Every plan starts with a full-feature trial — no card required. If you choose not to continue, the workspace becomes read-only so you can still export your data; nothing is deleted without an explicit request.",
  },
  {
    question: "Does it work on phones and tablets?",
    answer:
      "Yes. Teachers take registers and parents check results on a phone, while bursars and registrars work comfortably on a laptop. Wide tables degrade into stacked, scrollable views on small screens.",
  },
  {
    question: "Who can see student data?",
    answer:
      "Only members of that school, and only what their role allows. Teachers see their assigned classes, parents see their own children, and every access to sensitive or exported information is recorded in the audit log.",
  },
  {
    question: "How current is the information parents see?",
    answer:
      "Attendance and balances update as soon as staff save them. Results become visible to families only after they are explicitly published, so drafts never leak ahead of an approval.",
  },
];

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Product tour", href: "#product" },
      { label: "Roles", href: "#roles" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Security", href: "#security" },
      { label: "FAQ", href: "#faq" },
      { label: "Book a demo", href: "/book-demo" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Talk to sales", href: "/contact-sales" },
      { label: "General enquiries", href: `mailto:${siteMeta.email}` },
    ],
  },
];
