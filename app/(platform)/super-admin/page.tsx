import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Building2,
  Download,
  GraduationCap,
  Plus,
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
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";
const primaryButton =
  "inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-xs font-medium text-paper transition-colors hover:bg-ink-soft";

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
    <>
      <PageHeader
        eyebrow="Platform overview"
        title="Every school, plan and operator signal in one console."
        description="Monitor tenant health, recurring revenue, onboarding progress and anything that needs a human decision today."
        actions={
          <>
            <span className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 font-mono text-[10px] uppercase tracking-wide text-ink-muted sm:inline-flex">
              Last 30 days
            </span>
            <button type="button" className={ghostButton}>
              <Download className="size-3.5" aria-hidden="true" />
              Export report
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-3.5" aria-hidden="true" />
              Add school
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Monthly recurring revenue"
          value={formatUsd(platformStats.mrr)}
          delta={platformStats.mrrGrowth}
          hint="vs. last month"
          icon={<TrendingUp className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Active tenants"
          value={formatNumber(platformStats.activeTenants)}
          hint={`of ${formatNumber(platformStats.totalTenants)} schools`}
          icon={<Building2 className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Students managed"
          value={formatNumber(platformStats.totalStudents)}
          hint={`${formatNumber(platformStats.totalStaff)} staff accounts`}
          icon={<GraduationCap className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Net revenue retention"
          value={formatPercent(platformStats.netRevenueRetention)}
          delta={2.1}
          hint="expansion vs. churn"
          icon={<Activity className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Annual recurring revenue"
          value={formatUsd(platformStats.arr)}
          hint="run-rate on current MRR"
          icon={<TrendingUp className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Trials ending soon"
          value={formatNumber(platformStats.trialsEndingSoon)}
          hint="next 14 days"
          icon={<Zap className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Net churn"
          value={formatPercent(platformStats.churnRate)}
          hint={`${platformStats.newThisMonth} new schools this month`}
          icon={<Users className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Platform uptime"
          value={formatPercent(platformStats.uptime, 2)}
          hint="trailing 30 days"
          icon={<Activity className="size-3.5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card
          className="lg:col-span-2"
          title="Recurring revenue"
          description="Subscription MRR across all tenants, last 12 months."
          action={
            <Pill tone="positive">
              <TrendingUp className="size-3" aria-hidden="true" />
              +{formatPercent(platformStats.mrrGrowth)} MoM
            </Pill>
          }
        >
          <TrendChart
            data={mrrSeries}
            gradientId="mrr-fill"
            label="Monthly recurring revenue over the last 12 months"
          />
          <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                Current MRR
              </dt>
              <dd className="mt-1 font-display text-lg">{formatUsd(platformStats.mrr)}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                ARR run-rate
              </dt>
              <dd className="mt-1 font-display text-lg">{formatUsd(platformStats.arr)}</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                12-month growth
              </dt>
              <dd className="mt-1 font-display text-lg">+30.7%</dd>
            </div>
          </dl>
        </Card>

        <div className="flex flex-col gap-4">
          <Card title="Plan mix" description="Tenants by subscription plan.">
            <BarList
              tone="success"
              items={planMix.map((entry) => ({
                label: entry.label,
                value: entry.value,
                hint: `${formatNumber(entry.value)} schools`,
              }))}
            />
          </Card>

          <Card title="New schools" description="Signups per month.">
            <BarList
              items={newSchoolsSeries.map((entry) => ({
                label: entry.label,
                value: entry.value,
                hint: `${entry.value}`,
              }))}
            />
            <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-[11px] text-ink-muted">
              <TrendingUp className="size-3 text-success" aria-hidden="true" />
              {platformStats.newThisMonth} new schools this month — up from 31 in September.
            </p>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <Card
          title="Tenant status"
          description="Lifecycle state across the estate. Suspensions require a reason and are audited."
        >
          <ul className="divide-y divide-line">
            {statusOrder.map((status) => {
              const meta = tenantStatusMeta[status];
              const count = statusCounts[status];
              return (
                <li key={status} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                  <span className="flex w-32 shrink-0 items-center gap-2">
                    <Dot tone={meta.tone} />
                    <span className="text-sm">{meta.label}</span>
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
                  <span className="w-14 shrink-0 text-right font-mono text-xs text-ink-soft">
                    {formatNumber(count)}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 border-t border-line pt-4 text-[11px] text-ink-muted">
            {metaSummary()}
          </p>
        </Card>

        <Card
          title="Needs attention"
          description="Accounts a platform operator should look at today."
        >
          <ul className="divide-y divide-line">
            {attention.map((tenant) => {
              const meta = tenantStatusMeta[tenant.status];
              return (
                <li key={tenant.slug} className="py-3 first:pt-0 last:pb-0">
                  <Link
                    href={`/super-admin/tenants/${tenant.slug}`}
                    className="flex items-start gap-3 rounded-lg transition-colors hover:opacity-80"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">{tenant.name}</span>
                        <Pill tone={meta.tone}>{meta.label}</Pill>
                      </span>
                      <span className="mt-1 block text-[11px] leading-5 text-ink-muted">
                        {tenant.trialEndsIn
                          ? `Trial ends in ${tenant.trialEndsIn}`
                          : tenant.notes}
                      </span>
                    </span>
                    <ArrowRight className="mt-1 size-4 shrink-0 text-ink-muted" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <Card
          title="Onboarding & migration queue"
          description="Provisioning work in flight across implementation and self-serve."
          action={
            <Link href="/super-admin/tenants" className={ghostButton}>
              View schools
            </Link>
          }
          padded={false}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-sand/50">
                <tr className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                  <th className="px-5 py-2.5 font-normal">School</th>
                  <th className="px-3 py-2.5 font-normal">Stage</th>
                  <th className="px-3 py-2.5 font-normal">Owner</th>
                  <th className="px-5 py-2.5 font-normal">Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {onboardingQueue.map((item) => (
                  <tr key={item.slug}>
                    <td className="px-5 py-3">
                      <span className="block text-sm font-medium">{item.school}</span>
                      <span className="block text-[11px] text-ink-muted">{item.detail}</span>
                    </td>
                    <td className="px-3 py-3">
                      <Pill tone="neutral">{item.stage}</Pill>
                    </td>
                    <td className="px-3 py-3 text-xs text-ink-soft">{item.owner}</td>
                    <td className="px-5 py-3 font-mono text-[10px] uppercase text-ink-muted">
                      {item.due}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card
            title="Recent platform activity"
            description="Cross-tenant events, newest first."
            action={
              <Link href="/super-admin/audit" className="text-xs text-ink-muted hover:text-ink">
                Full audit log
              </Link>
            }
          >
            <ul className="divide-y divide-line">
              {auditEvents.slice(0, 5).map((event) => {
                const meta = severityMeta[event.severity];
                return (
                  <li key={event.id} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                    <Dot tone={meta.tone} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-medium">
                        {event.action} · {event.target}
                      </span>
                      <span className="block font-mono text-[10px] text-ink-muted">
                        {event.actor} · {event.time}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card
            title="Feature flags live"
            description={`${activeFlags.length} flags enabled across the estate.`}
            action={
              <Link href="/super-admin/settings" className="text-xs text-ink-muted hover:text-ink">
                Manage
              </Link>
            }
          >
            <ul className="space-y-2.5">
              {activeFlags.map((flag) => (
                <li key={flag.key} className="flex items-center justify-between gap-3">
                  <code className="truncate font-mono text-[11px] text-ink-soft">{flag.key}</code>
                  <Pill tone="muted">{flag.rollout}</Pill>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}

function metaSummary() {
  return `${formatNumber(platformStats.activeTenants)} active · ${formatNumber(
    platformStats.pastDueTenants,
  )} past due · ${formatNumber(platformStats.suspendedTenants)} suspended · ${formatNumber(
    platformStats.openInvoices,
  )} open invoices platform-wide`;
}
