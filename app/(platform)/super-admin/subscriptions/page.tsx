import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, RefreshCw, TrendingUp, Wallet } from "lucide-react";
import { BarList, Card, KpiCard, PageHeader, Pill, TrendChart } from "@/components/platform/ui";
import {
  auditEvents,
  formatNumber,
  formatPercent,
  formatUsd,
  mrrSeries,
  planCatalog,
  platformStats,
  tenantStatusMeta,
  tenants,
} from "@/lib/platform";

export const metadata: Metadata = {
  title: "Subscriptions",
};

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";

const renewals = tenants
  .filter((tenant) => tenant.renewalDate !== "—")
  .sort((a, b) => a.renewalDate.localeCompare(b.renewalDate));

const paymentIssues = tenants.filter(
  (tenant) => tenant.status === "past_due" || tenant.status === "suspended",
);

const billingEvents = auditEvents.filter((event) =>
  /plan|subscription|payment|dunning|past-due|renewed|trial/i.test(
    `${event.action} ${event.target}`,
  ),
);

export default function SubscriptionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Subscriptions & revenue"
        title="Recurring revenue, renewals and recovery."
        description="Track what the estate is worth, what renews next, and which accounts need a payment conversation."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <RefreshCw className="size-3.5" aria-hidden="true" />
              Sync provider
            </button>
            <button type="button" className={ghostButton}>
              <Wallet className="size-3.5" aria-hidden="true" />
              Reconciliation report
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
          label="Annual recurring revenue"
          value={formatUsd(platformStats.arr)}
          hint="current run-rate"
          icon={<TrendingUp className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Net revenue retention"
          value={formatPercent(platformStats.netRevenueRetention)}
          delta={2.1}
          hint="expansion vs. churn"
          icon={<RefreshCw className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Accounts needing recovery"
          value={formatNumber(paymentIssues.length)}
          hint={`${formatNumber(platformStats.pastDueTenants)} past due platform-wide`}
          icon={<AlertTriangle className="size-3.5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card
          className="lg:col-span-2"
          title="Revenue trend"
          description="Subscription MRR across all tenants, last 12 months."
        >
          <TrendChart
            data={mrrSeries}
            gradientId="subs-fill"
            label="Monthly recurring revenue over the last 12 months"
          />
        </Card>

        <Card title="MRR by plan" description="Where recurring revenue comes from.">
          <BarList
            tone="success"
            items={planCatalog.map((plan) => ({
              label: plan.name,
              value: plan.mrr,
              hint: formatUsd(plan.mrr),
            }))}
          />
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card
          title="Upcoming renewals"
          description="Renewal dates across the sampled tenant directory."
          padded={false}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-sand/50">
                <tr className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                  <th className="px-5 py-2.5 font-normal">School</th>
                  <th className="px-3 py-2.5 font-normal">Plan</th>
                  <th className="px-3 py-2.5 font-normal">Amount</th>
                  <th className="px-3 py-2.5 font-normal">Renews</th>
                  <th className="px-5 py-2.5 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {renewals.map((tenant) => (
                  <tr key={tenant.slug} className="transition-colors hover:bg-sand/30">
                    <td className="px-5 py-3">
                      <Link
                        href={`/super-admin/tenants/${tenant.slug}`}
                        className="text-sm font-medium hover:underline"
                      >
                        {tenant.name}
                      </Link>
                    </td>
                    <td className="px-3 py-3 text-xs text-ink-soft">{tenant.plan}</td>
                    <td className="px-3 py-3 font-mono text-xs">
                      {tenant.monthlyRevenue > 0 ? `${formatUsd(tenant.monthlyRevenue)}/mo` : "—"}
                    </td>
                    <td className="px-3 py-3 font-mono text-[11px] text-ink-muted">
                      {tenant.renewalDate}
                    </td>
                    <td className="px-5 py-3">
                      <Pill tone={tenantStatusMeta[tenant.status].tone}>
                        {tenantStatusMeta[tenant.status].label}
                      </Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card
            title="Payment recovery"
            description="Verified webhooks only — client-supplied status is never trusted."
          >
            {paymentIssues.length === 0 ? (
              <p className="text-sm text-ink-muted">No accounts in recovery.</p>
            ) : (
              <ul className="divide-y divide-line">
                {paymentIssues.map((tenant) => (
                  <li key={tenant.slug} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/super-admin/tenants/${tenant.slug}`}
                          className="block truncate text-sm font-medium hover:underline"
                        >
                          {tenant.name}
                        </Link>
                        <p className="mt-0.5 text-[11px] leading-5 text-ink-muted">
                          {tenant.notes}
                        </p>
                      </div>
                      <Pill tone={tenantStatusMeta[tenant.status].tone}>
                        {tenantStatusMeta[tenant.status].label}
                      </Pill>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 border-t border-line pt-4 text-[11px] leading-5 text-ink-muted">
              Dunning sends three reminders before a tenant is suspended. Suspension
              keeps data read-only and exportable.
            </p>
          </Card>

          <Card title="Recent billing events" description="From the platform audit log.">
            <ul className="divide-y divide-line">
              {billingEvents.slice(0, 6).map((event) => (
                <li key={event.id} className="py-2.5 first:pt-0 last:pb-0">
                  <p className="truncate text-xs font-medium">
                    {event.action} · {event.target}
                  </p>
                  <p className="font-mono text-[10px] text-ink-muted">
                    {event.actor} · {event.time}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/super-admin/audit"
              className="mt-4 inline-flex items-center gap-1.5 border-t border-line pt-4 text-xs text-ink-muted transition-colors hover:text-ink"
            >
              Open audit log
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </Card>
        </div>
      </div>
    </>
  );
}
