import type { Metadata } from "next";
import { Download, TrendingDown, TrendingUp } from "lucide-react";
import { Card, PageHeader, TrendChart, BarList } from "@/components/platform/ui";
import {
  formatPercent,
  formatUsd,
  mrrSeries,
  planMix,
  platformStats,
} from "@/lib/platform";

export const metadata: Metadata = { title: "Revenue & Financial Reports" };

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";

const revenueBreakdown = [
  { label: "MRR",   value: formatUsd(platformStats.mrr),                        delta: platformStats.mrrGrowth, positive: true },
  { label: "ARR",   value: formatUsd(platformStats.arr),                        delta: platformStats.mrrGrowth, positive: true },
  { label: "NRR",   value: formatPercent(platformStats.netRevenueRetention),    delta: 1.8,                     positive: true },
  { label: "Churn", value: formatPercent(platformStats.churnRate),              delta: -0.3,                    positive: true },
];

// BarList requires { label, value } — keep "label" key, store raw number for bar width
const revenueByPlan: { label: string; value: number; hint: string }[] = [
  { label: "Enterprise", value: 94800, hint: `${formatUsd(94800)}/mo` },
  { label: "Growth",     value: 68200, hint: `${formatUsd(68200)}/mo` },
  { label: "Starter",    value: 23400, hint: `${formatUsd(23400)}/mo` },
];

const collectionSummary = [
  { label: "Collected (Oct)",  value: formatUsd(platformStats.mrr * 0.94) },
  { label: "Outstanding",      value: formatUsd(platformStats.mrr * 0.06) },
  { label: "Refunds issued",   value: formatUsd(298) },
  { label: "Credits applied",  value: formatUsd(0) },
  { label: "Net collected",    value: formatUsd(platformStats.mrr * 0.94 - 298) },
];

export default function RevenuePage() {
  return (
    <>
      <PageHeader
        eyebrow="Subscriptions & Revenue"
        title="Revenue & financial reports."
        description="MRR, ARR, collections, churn, refunds and revenue broken down by plan and period."
        actions={
          <button type="button" className={ghostButton}>
            <Download className="size-3.5" aria-hidden="true" />
            Export report
          </button>
        }
      />

      {/* Key metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {revenueBreakdown.map((m) => (
          <div key={m.label} className="rounded-2xl border border-line bg-surface p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink-muted">
              {m.label}
            </p>
            <p className="mt-2 font-display text-2xl font-light tracking-tight">{m.value}</p>
            <p
              className={`mt-1 flex items-center gap-1 text-xs ${
                m.positive ? "text-pine" : "text-vermilion-deep"
              }`}
            >
              {m.positive ? (
                <TrendingUp className="size-3.5" aria-hidden="true" />
              ) : (
                <TrendingDown className="size-3.5" aria-hidden="true" />
              )}
              {m.delta > 0 ? "+" : ""}
              {m.delta}% vs last period
            </p>
          </div>
        ))}
      </div>

      {/* MRR chart + plan mix */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.8fr_1fr]">
        <Card title="MRR trend" description="Monthly recurring revenue over the last 12 months.">
          <TrendChart data={mrrSeries} label="MRR trend" />
        </Card>
        <Card title="Revenue by plan" description="MRR split across subscription tiers.">
          {/* BarList uses hint for display, value for bar width */}
          <BarList items={revenueByPlan} />
        </Card>
      </div>

      {/* Collection summary + plan count */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card title="Collection summary — Oct 2026">
          <dl className="space-y-2.5">
            {collectionSummary.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 border-b border-line pb-2.5 text-xs last:border-0 last:pb-0"
              >
                <dt className="text-ink-soft">{row.label}</dt>
                <dd className="font-mono text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
        <Card title="Subscriptions by plan" description="Active paid schools per tier.">
          <BarList items={planMix} />
        </Card>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <p className="text-xs font-medium">Revenue recognition note</p>
        <p className="mt-1.5 text-xs leading-6 text-ink-muted">
          These figures are operational metrics derived from payment records and subscription
          data. They are not audited financial statements. Revenue recognition, deferred
          revenue, tax treatment and IFRS/GAAP compliance must be handled by a qualified
          accountant. Refunds and reversals are deducted from gross collected in this view.
        </p>
      </div>
    </>
  );
}
