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
  "inline-flex h-11 items-center gap-2.5 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink-soft transition-all hover:border-primary/40 hover:bg-primary-light hover:text-primary shadow-xs cursor-pointer";

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
        title="Platform Analytics"
        description="School growth, user growth, trial conversion, churn, subscription trends and feature adoption across all tenants."
        actions={
          <>
            <span className="hidden items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-ink-soft shadow-xs sm:inline-flex">
              Last 90 days
            </span>
            <button type="button" className={ghostButton}>
              <RefreshCw className="size-4" aria-hidden="true" />
              Refresh
            </button>
            <button type="button" className={ghostButton}>
              <Download className="size-4" aria-hidden="true" />
              Export CSV
            </button>
          </>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total schools"
          value={formatNumber(platformStats.totalTenants)}
          hint={`+${platformStats.newThisMonth} this month`}
          icon={<Building2 className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Total students"
          value={formatNumber(platformStats.totalStudents)}
          delta={3.2}
          icon={<Users className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="MRR"
          value={formatUsd(platformStats.mrr)}
          delta={platformStats.mrrGrowth}
          icon={<TrendingUp className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="ARR"
          value={formatUsd(platformStats.arr)}
          delta={platformStats.mrrGrowth}
          icon={<BarChart3 className="size-5" aria-hidden="true" />}
        />
      </div>

      {/* Conversion metrics */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {conversionMetrics.map((m) => (
          <div key={m.label} className="card-lift rounded-2xl border border-line bg-surface p-6 shadow-xs">
            <p className="font-sans text-xs font-bold uppercase tracking-wider text-ink-soft">{m.label}</p>
            <p className="mt-2.5 font-sans text-3xl font-black tracking-tight text-ink">{m.value}</p>
            <p className={`mt-2 flex items-center gap-1.5 text-sm font-bold ${m.positive ? "text-success" : "text-danger"}`}>
              {m.positive ? (
                <TrendingUp className="size-4" aria-hidden="true" />
              ) : (
                <TrendingDown className="size-4" aria-hidden="true" />
              )}
              {m.delta > 0 ? "+" : ""}
              {m.delta}pp vs last period
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card title="Monthly Recurring Revenue" description="MRR over the last 12 months.">
          <TrendChart data={mrrSeries} label="Monthly recurring revenue" />
        </Card>
        <Card title="New Schools Per Month" description="Trials + direct sign-ups combined.">
          <TrendChart data={newSchoolsSeries} label="New schools per month" gradientId="new-schools-fill" />
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr]">
        <Card title="Feature Adoption" description="% of active schools using each module.">
          <ul className="space-y-4">
            {featureAdoption.map((f) => (
              <li key={f.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-bold text-ink">{f.label}</span>
                  <span className="font-sans font-bold text-ink-soft">{f.value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-primary-light">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${f.value}%` }}
                    aria-hidden="true"
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Schools by Plan" description="Distribution across tiers.">
          <BarList items={planMix} />
        </Card>

        <Card title="Schools by Region" description="Where active tenants are based.">
          <BarList items={regionBreakdown} />
        </Card>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-surface p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-base font-bold text-ink">Cohort and Retention Analysis</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
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
