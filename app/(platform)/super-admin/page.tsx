"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Download,
  ExternalLink,
  GraduationCap,
  HardDrive,
  LayoutDashboard,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import {
  BarList,
  Card,
  Dot,
  KpiCard,
  Meter,
  PageHeader,
  Pill,
  TrendChart,
} from "@/components/platform/ui";
import {
  auditEvents,
  featureFlags,
  formatNumber,
  formatPercent,
  formatUsd,
  mrrSeries,
  newSchoolsSeries,
  onboardingQueue,
  planMix,
  platformStats,
  severityMeta,
  tenantStatusMeta,
  tenants,
  type TenantStatus,
} from "@/lib/platform";

const ghostButton =
  "inline-flex h-11 items-center gap-2.5 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink-soft transition-all hover:border-primary/40 hover:bg-primary-light hover:text-primary shadow-xs cursor-pointer";
const primaryButton =
  "inline-flex h-11 items-center gap-2.5 rounded-xl bg-primary hover:bg-primary-hover px-6 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all cursor-pointer";

const statusOrder: TenantStatus[] = [
  "active",
  "trial",
  "onboarding",
  "past_due",
  "suspended",
  "closed",
];

const statusCounts: Record<TenantStatus, number> = {
  active: platformStats.activeTenants,
  trial: platformStats.trialTenants,
  onboarding: platformStats.onboardingTenants,
  past_due: platformStats.pastDueTenants,
  suspended: platformStats.suspendedTenants,
  closed:
    platformStats.totalTenants -
    (platformStats.activeTenants +
      platformStats.trialTenants +
      platformStats.onboardingTenants +
      platformStats.pastDueTenants +
      platformStats.suspendedTenants),
};

const attention = tenants.filter(
  (tenant) =>
    tenant.status !== "active" &&
    tenant.status !== "closed" &&
    (tenant.status === "past_due" ||
      tenant.status === "suspended" ||
      tenant.health === "at_risk" ||
      Boolean(tenant.trialEndsIn) ||
      Boolean(tenant.notes)),
);

const activeFlags = featureFlags.filter((flag) => flag.enabled);

export default function PlatformOverviewPage() {
  return (
    <div className="space-y-8">
      {/* ── Landing Page Themed Hero Banner ────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-9 shadow-xs">
        {/* Dot-grid background from landing page */}
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50" aria-hidden="true" />

        {/* Colour glow blobs */}
        <div className="pointer-events-none absolute -top-32 -right-24 size-[480px] gradient-blob-blue opacity-40" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 size-[360px] gradient-blob-violet opacity-30" aria-hidden="true" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            {/* Landing page eyebrow pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-light px-4 py-1.5 text-xs font-bold text-primary shadow-xs">
              <Sparkles className="size-4" aria-hidden="true" />
              <span>Multi-Tenant Platform Governance</span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight text-ink leading-tight">
              Platform Overview &{" "}
              <span className="text-gradient">Control Center</span>
            </h1>

            <p className="mt-3.5 max-w-2xl text-base sm:text-lg leading-relaxed text-ink-soft">
              Live oversight across all 48 school tenants, recurring subscription revenue,
              automated Paystack settlements, and isolated cloud databases.
            </p>

            {/* Proof Points & Platform Health Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-raised px-4 py-2 font-sans font-bold text-ink-soft shadow-xs">
                <Building2 className="size-4 text-primary" />
                <span>48 Active Schools</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-raised px-4 py-2 font-sans font-bold text-ink-soft shadow-xs">
                <Users className="size-4 text-accent" />
                <span>24,180 Students Enrolled</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-success/30 bg-success-light px-4 py-2 font-sans font-bold text-success-deep shadow-xs">
                <CheckCircle2 className="size-4 text-success" />
                <span>99.98% Platform Uptime</span>
              </span>
            </div>
          </div>

          {/* Quick Actions matching Landing Page Buttons */}
          <div className="flex flex-wrap lg:flex-col items-stretch gap-3 shrink-0">
            <Link
              href="/super-admin/tenants"
              className={primaryButton}
            >
              <Plus className="size-4.5" aria-hidden="true" />
              <span>Provision New School</span>
            </Link>

            <button
              type="button"
              onClick={() => alert("Generating unified platform financial and compliance audit report...")}
              className={ghostButton}
            >
              <Download className="size-4.5" aria-hidden="true" />
              <span>Export Audit Report</span>
            </button>

            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-primary/25 bg-primary-light/70 px-5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white shadow-xs"
            >
              <span>Explore School Workspaces</span>
              <ExternalLink className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 8 Core KPI Cards with Landing Page Hover Lift ─────────────── */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Monthly Recurring Revenue"
          value={formatUsd(platformStats.mrr)}
          delta={platformStats.mrrGrowth}
          hint="vs. last month"
          icon={<TrendingUp className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Active School Tenants"
          value={formatNumber(platformStats.activeTenants)}
          hint={`of ${formatNumber(platformStats.totalTenants)} total schools`}
          icon={<Building2 className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Total Students Managed"
          value={formatNumber(platformStats.totalStudents)}
          hint={`${formatNumber(platformStats.totalStaff)} faculty & staff`}
          icon={<GraduationCap className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Net Revenue Retention"
          value={formatPercent(platformStats.netRevenueRetention)}
          delta={2.1}
          hint="expansion vs. churn"
          icon={<Activity className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Annual Recurring Revenue"
          value={formatUsd(platformStats.arr)}
          hint="run-rate on current MRR"
          icon={<TrendingUp className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Trials Ending Soon"
          value={formatNumber(platformStats.trialsEndingSoon)}
          hint="next 14 days"
          icon={<Zap className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Net Churn Rate"
          value={formatPercent(platformStats.churnRate)}
          hint={`${platformStats.newThisMonth} new schools this month`}
          icon={<Users className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Infrastructure SLA Uptime"
          value={formatPercent(platformStats.uptime, 2)}
          hint="trailing 30 days"
          icon={<ShieldCheck className="size-5" aria-hidden="true" />}
        />
      </div>

      {/* ── Recurring Revenue & Plan Mix ──────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          className="lg:col-span-2"
          title="Platform Recurring Revenue (MRR)"
          description="Consolidated subscription MRR across all institutional tenants over the last 12 months."
          action={
            <Pill tone="positive">
              <TrendingUp className="size-3.5" aria-hidden="true" />
              +{formatPercent(platformStats.mrrGrowth)} MoM
            </Pill>
          }
        >
          <TrendChart
            data={mrrSeries}
            gradientId="mrr-fill"
            label="Monthly recurring revenue over the last 12 months"
          />
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 sm:grid-cols-3">
            <div className="p-4 rounded-xl bg-surface-raised border border-line">
              <dt className="font-sans text-xs font-bold uppercase tracking-wider text-ink-soft">
                Current Monthly Run-Rate
              </dt>
              <dd className="mt-1.5 font-sans text-2xl font-black text-ink">{formatUsd(platformStats.mrr)}</dd>
            </div>
            <div className="p-4 rounded-xl bg-surface-raised border border-line">
              <dt className="font-sans text-xs font-bold uppercase tracking-wider text-ink-soft">
                Annual ARR Projected
              </dt>
              <dd className="mt-1.5 font-sans text-2xl font-black text-primary">{formatUsd(platformStats.arr)}</dd>
            </div>
            <div className="p-4 rounded-xl bg-surface-raised border border-line">
              <dt className="font-sans text-xs font-bold uppercase tracking-wider text-ink-soft">
                12-Month Growth Pace
              </dt>
              <dd className="mt-1.5 font-sans text-2xl font-black text-success-deep">+30.7%</dd>
            </div>
          </dl>
        </Card>

        <div className="flex flex-col gap-6">
          <Card title="Plan Distribution" description="Active tenants by subscription tier.">
            <BarList
              tone="accent"
              items={planMix.map((entry) => ({
                label: entry.label,
                value: entry.value,
                hint: `${formatNumber(entry.value)} schools`,
              }))}
            />
          </Card>

          <Card title="Monthly Acquisition" description="New school onboardings per month.">
            <BarList
              items={newSchoolsSeries.map((entry) => ({
                label: entry.label,
                value: entry.value,
                hint: `${entry.value} schools`,
              }))}
            />
            <p className="mt-4 flex items-center gap-2 border-t border-line pt-3.5 text-sm font-medium text-ink-soft">
              <TrendingUp className="size-4 text-success" aria-hidden="true" />
              <span>{platformStats.newThisMonth} new schools onboarded this month — pacing ahead of Q1 targets.</span>
            </p>
          </Card>
        </div>
      </div>

      {/* ── Tenant Lifecycle & Attention Radar ────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <Card
          title="Tenant Lifecycle State"
          description="Health and compliance status across the 48-school estate."
        >
          <ul className="divide-y divide-line">
            {statusOrder.map((status) => {
              const meta = tenantStatusMeta[status];
              const count = statusCounts[status];
              return (
                <li key={status} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="flex w-40 shrink-0 items-center gap-2.5">
                    <Dot tone={meta.tone} />
                    <span className="text-sm font-bold text-ink">{meta.label}</span>
                  </span>
                  <span className="flex-1">
                    <Meter
                      value={count}
                      max={platformStats.totalTenants}
                      tone={
                        meta.tone === "critical"
                          ? "danger"
                          : meta.tone === "warning"
                            ? "warning"
                            : "success"
                      }
                    />
                  </span>
                  <span className="w-20 shrink-0 text-right font-sans text-sm font-bold text-ink">
                    {formatNumber(count)}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 border-t border-line pt-4 text-sm text-ink-soft font-medium">
            {metaSummary()}
          </p>
        </Card>

        <Card
          title="Accounts Requiring Attention"
          description="Tenants with expiring trials, past due invoices, or flagged alerts."
        >
          <ul className="divide-y divide-line">
            {attention.map((tenant) => {
              const meta = tenantStatusMeta[tenant.status];
              return (
                <li key={tenant.slug} className="py-4 first:pt-0 last:pb-0">
                  <Link
                    href={`/super-admin/tenants/${tenant.slug}`}
                    className="flex items-start gap-3 rounded-xl p-2.5 -mx-2.5 transition-all hover:bg-surface-raised group"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2.5">
                        <span className="truncate text-sm sm:text-base font-bold text-ink group-hover:text-primary transition-colors">
                          {tenant.name}
                        </span>
                        <Pill tone={meta.tone}>{meta.label}</Pill>
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                        {tenant.trialEndsIn
                          ? `Trial expires in ${tenant.trialEndsIn}`
                          : tenant.notes}
                      </span>
                    </span>
                    <ArrowRight className="mt-1 size-4.5 shrink-0 text-ink-muted group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      {/* ── Provisioning Queue & Audit Log ───────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <Card
          title="School Implementation & Migration Pipeline"
          description="Provisioning batches currently in flight across self-serve and guided rollout."
          action={
            <Link href="/super-admin/tenants" className={ghostButton}>
              View All Schools
            </Link>
          }
          padded={false}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-surface-raised border-b border-line">
                <tr className="font-sans text-xs font-bold uppercase tracking-wider text-ink-soft">
                  <th className="px-6 py-4">School Name</th>
                  <th className="px-4 py-4">Milestone Stage</th>
                  <th className="px-4 py-4">Account Lead</th>
                  <th className="px-6 py-4">Go-Live Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {onboardingQueue.map((item) => (
                  <tr key={item.slug} className="hover:bg-surface-raised/60 transition-colors">
                    <td className="px-6 py-4">
                      <span className="block font-bold text-ink text-sm sm:text-base">{item.school}</span>
                      <span className="block text-xs sm:text-sm text-ink-muted mt-0.5">{item.detail}</span>
                    </td>
                    <td className="px-4 py-4">
                      <Pill tone="neutral">{item.stage}</Pill>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-ink-soft">{item.owner}</td>
                    <td className="px-6 py-4 font-sans text-sm font-bold text-ink">
                      {item.due}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card
            title="Real-Time Platform Activity"
            description="Cross-tenant audit trail and governance events."
            action={
              <Link href="/super-admin/audit" className="text-sm font-bold text-primary hover:underline">
                Full Audit Trail →
              </Link>
            }
          >
            <ul className="divide-y divide-line">
              {auditEvents.slice(0, 5).map((event) => {
                const meta = severityMeta[event.severity];
                return (
                  <li key={event.id} className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0">
                    <Dot tone={meta.tone} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-ink">
                        {event.action} · {event.target}
                      </span>
                      <span className="block font-sans text-xs text-ink-muted mt-1">
                        {event.actor} · {event.time}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card
            title="Live Feature Flags"
            description={`${activeFlags.length} feature flags enabled globally.`}
            action={
              <Link href="/super-admin/flags" className="text-sm font-bold text-primary hover:underline">
                Manage Flags →
              </Link>
            }
          >
            <ul className="space-y-3">
              {activeFlags.map((flag) => (
                <li key={flag.key} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-raised border border-line">
                  <code className="truncate font-mono text-xs sm:text-sm font-bold text-primary">{flag.key}</code>
                  <Pill tone="muted">{flag.rollout}</Pill>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function metaSummary() {
  return `${formatNumber(platformStats.activeTenants)} active schools · ${formatNumber(
    platformStats.pastDueTenants,
  )} past due · ${formatNumber(platformStats.suspendedTenants)} suspended · ${formatNumber(
    platformStats.openInvoices,
  )} open invoices platform-wide`;
}
