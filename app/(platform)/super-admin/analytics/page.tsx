import type { Metadata } from "next";
import {
  BarChart3,
  Download,
  TrendingDown,
  TrendingUp,
  Users,
  Building2,
  RefreshCw,
} from "lucide-react";
import { Card, KpiCard, PageHeader, Pill, TrendChart, BarList } from "@/components/platform/ui";
import {
  formatNumber,
  formatPercent,
  formatUsd,
  mrrSeries,
  newSchoolsSeries,
  planMix,
  platformStats,
} from "@/lib/platform";

export const metadata: Metadata = { title: "Platform Analytics" };

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";

const conversionMetrics = [
  { label: "Trial → Paid (30-day)", value: "38.4%", delta: 2.1, positive: true },
  { label: "Avg. trial length", value: "11.2 days", delta: -0.4, positive: false },
  { label: "Churn rate (monthly)", value: formatPercent(platformStats.churnRate), delta: -0.3, positive: true },
  { label: "Net revenue retention", value: formatPercent(platformStats.netRevenueRetention), delta: 1.8, positive: true },
];

const featureAdoption = [
  { label: "Attendance module", value: 94 },
  { label: "Fee & payments",    value: 87 },
  { label: "Report cards",      value: 76 },
  { label: "Parent portal",     value: 71 },
  { label: "Announcements",     value: 65 },
  { label: "Timetable builder", value: 48 },
];

const regionBreakdown = [
  { label: "West Africa",   value: 412 },
  { label: "East Africa",   value: 298 },
  { label: "South Asia",    value: 187 },
  { label: "UK & Europe",   value: 143 },
  { label: "North America", value: 98  },
  { label: "Other",         value: 146 },
];

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Platform analytics."
        description="School growth, user growth, trial conversion, churn, subscription trends and feature adoption across all tenants."
        actions={
          <>
            <span className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 font-mono text-[10px] uppercase tracking-wide text-ink-muted sm:inline-flex">
              Last 90 days
            </span>
            <button type="button" className={ghostButton}>
              <RefreshCw className="size-3.5" aria-hidden="true" />
              Refresh
            </button>
            <button type="button" className={ghostButton}>
              <Download className="size-3.5" aria-hidden="true" />
              Export
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total schools"
          value={formatNumber(platformStats.totalTenants)}
          hint={`+${platformStats.newThisMonth} this month`}
          icon={<Building2 className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Total students"
          value={formatNumber(platformStats.totalStudents)}
          delta={3.2}
          icon={<Users className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="MRR"
          value={formatUsd(platformStats.mrr)}
          delta={platformStats.mrrGrowth}
          icon={<TrendingUp className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="ARR"
          value={formatUsd(platformStats.arr)}
          delta={platformStats.mrrGrowth}
          icon={<BarChart3 className="size-3.5" aria-hidden="true" />}
        />
      </div>

      {/* Conversion metrics */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {conversionMetrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-line bg-surface p-5">
            <p className="text-xs font-medium text-ink-muted">{m.label}</p>
            <p className="mt-2 text-2xl font-extrabold leading-tight">{m.value}</p>
            <p className={`mt-1 flex items-center gap-1 text-xs font-semibold ${m.positive ? "text-success" : "text-danger"}`}>
              {m.positive ? (
                <TrendingUp className="size-3.5" aria-hidden="true" />
              ) : (
                <TrendingDown className="size-3.5" aria-hidden="true" />
              )}
              {m.delta > 0 ? "+" : ""}
              {m.delta}pp vs last period
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card title="Monthly recurring revenue" description="MRR over the last 12 months.">
          <TrendChart data={mrrSeries} label="Monthly recurring revenue" />
        </Card>
        <Card title="New schools per month" description="Trials + direct sign-ups combined.">
          <TrendChart data={newSchoolsSeries} label="New schools per month" gradientId="new-schools-fill" />
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
        <Card title="Feature adoption" description="% of active schools using each module.">
          <ul className="space-y-2.5">
            {featureAdoption.map((f) => (
              <li key={f.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-ink-soft">{f.label}</span>
                  <span className="font-mono text-ink-muted">{f.value}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${f.value}%` }}
                    aria-hidden="true"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Schools by plan" description="Distribution across tiers.">
          <BarList items={planMix} />
        </Card>

        <Card title="Schools by region" description="Where active tenants are based.">
          <BarList items={regionBreakdown} />
        </Card>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold">Cohort and retention analysis</p>
            <p className="mt-1 text-xs leading-6 text-ink-muted">
              Monthly cohort tables, logo retention and revenue retention by plan are available
              in the detailed revenue report. Data is aggregate only — no student PII is
              included in any analytics export.
            </p>
          </div>
          <Pill tone="neutral">Coming soon</Pill>
        </div>
      </div>
    </>
  );
}
