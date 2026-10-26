import type { Metadata } from "next";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Database,
  HardDrive,
  Mail,
  RefreshCw,
  Server,
  Webhook,
  Zap,
} from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatPercent, platformStats } from "@/lib/platform";

export const metadata: Metadata = { title: "System Health" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink-soft shadow-xs transition-colors hover:bg-surface-raised hover:text-ink";

type ServiceStatus = "operational" | "degraded" | "outage";

type Service = {
  name: string;
  category: string;
  status: ServiceStatus;
  latency?: string;
  uptime?: string;
  meta: string;
  icon: typeof Server;
};

const services: Service[] = [
  { name: "Next.js app (Vercel)",  category: "Application",     status: "operational", latency: "p95 110 ms", uptime: "99.98%", meta: "All regions healthy",                              icon: Zap         },
  { name: "Supabase Postgres",     category: "Database",        status: "operational", latency: "p95 42 ms",  uptime: "99.99%", meta: "Row-level security enabled · 38 active connections", icon: Database    },
  { name: "Supabase Auth",         category: "Authentication",  status: "operational", latency: "p95 68 ms",  uptime: "99.99%", meta: "MFA enforced for operators",                        icon: Server      },
  { name: "Supabase Storage",      category: "Storage",         status: "operational", latency: "p95 190 ms", uptime: "99.95%", meta: "42.1 GB used · private buckets only",               icon: HardDrive   },
  { name: "Resend (email)",        category: "Email",           status: "degraded",                           uptime: "99.4%",  meta: "Delivery rate 99.4% · 3 bounces pending review",    icon: Mail        },
  { name: "Inngest (jobs)",        category: "Background jobs", status: "degraded",                                             meta: "1 job backlog draining · last run 4 min ago",       icon: Clock       },
  { name: "Paystack (payments)",   category: "Payments",        status: "operational",                                          meta: "Webhooks verified · 0 unreconciled events",          icon: Webhook     },
  { name: "Sentry (monitoring)",   category: "Observability",   status: "operational",                                          meta: "2 open issues · PII scrubbing active",               icon: AlertTriangle },
];

const statusMeta: Record<ServiceStatus, { label: string; tone: "positive" | "warning" | "critical"; bg: string }> = {
  operational: { label: "Operational", tone: "positive", bg: "bg-success-light text-success-deep"  },
  degraded:    { label: "Degraded",    tone: "warning",  bg: "bg-warning-light text-warning"        },
  outage:      { label: "Outage",      tone: "critical", bg: "bg-danger-light text-danger-deep"     },
};

const recentIncidents = [
  {
    title: "Inngest job backlog — report generation",
    time: "Today · 09:14",
    status: "Monitoring",
    tone: "warning" as const,
    detail: "Bulk report-card generation for 3 schools queued behind a large export. Jobs are draining normally; no data loss.",
  },
  {
    title: "Resend bounce spike — 3 addresses",
    time: "Yesterday · 22:05",
    status: "Resolved",
    tone: "positive" as const,
    detail: "Three school contact emails returned hard bounces. Contacts flagged for manual review. No further impact.",
  },
  {
    title: "Postgres connection pool peak",
    time: "21 Oct · 14:38",
    status: "Resolved",
    tone: "positive" as const,
    detail: "Connection pool hit 94% during peak import window. Pool ceiling raised; query plan optimized.",
  },
];

const operationalCount = services.filter((s) => s.status === "operational").length;
const degradedCount    = services.filter((s) => s.status === "degraded").length;
const outageCount      = services.filter((s) => s.status === "outage").length;

export default function HealthPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform Reliability"
        title="System health."
        description="Application availability, database health, storage, email delivery, failed jobs, payment webhook health and error rates."
        actions={
          <button type="button" className={ghostButton}>
            <RefreshCw className="size-4" aria-hidden="true" />
            Refresh now
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Platform uptime"
          value={formatPercent(platformStats.uptime, 2)}
          hint="rolling 30 days"
          icon={<Activity className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Services operational"
          value={`${operationalCount} / ${services.length}`}
          hint="all regions"
          icon={<CheckCircle2 className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Degraded"
          value={String(degradedCount)}
          hint="requires attention"
          icon={<AlertTriangle className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Outages"
          value={String(outageCount)}
          hint="last 30 days"
          icon={<Server className="size-5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-8">
        <Card title="Connected services" description="Live status of every platform dependency.">
          <ul className="divide-y divide-line">
            {services.map((service) => {
              const meta = statusMeta[service.status];
              return (
                <li key={service.name} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4.5 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    <service.icon className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-sm sm:text-base font-bold text-ink">{service.name}</span>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-xs font-bold uppercase tracking-wider ${meta.bg}`}>
                          {meta.label}
                        </span>
                        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-ink-soft bg-surface-raised px-2.5 py-0.5 rounded-md">
                          {service.category}
                        </span>
                      </div>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink-soft">{service.meta}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-4 font-mono text-xs font-semibold text-ink-soft">
                    {service.latency ? <span className="bg-surface-raised px-2.5 py-1 rounded-md">{service.latency}</span> : null}
                    {service.uptime  ? <span className="bg-surface-raised px-2.5 py-1 rounded-md text-ink">{service.uptime} uptime</span> : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <div className="mt-8">
        <Card title="Recent incidents" description="Events in the last 7 days that required operator attention.">
          {recentIncidents.length === 0 ? (
            <p className="text-sm text-ink-muted">No incidents in the last 7 days.</p>
          ) : (
            <ul className="space-y-4">
              {recentIncidents.map((incident) => (
                <li key={incident.title} className="rounded-2xl border border-line bg-surface p-5 shadow-xs transition-all hover:border-line-strong">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 size-4.5 shrink-0 text-warning" aria-hidden="true" />
                      <p className="text-sm sm:text-base font-bold text-ink">{incident.title}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Pill tone={incident.tone}>{incident.status}</Pill>
                      <span className="font-mono text-xs font-semibold text-ink-soft">{incident.time}</span>
                    </div>
                  </div>
                  <p className="mt-2.5 pl-7.5 text-xs sm:text-sm leading-relaxed text-ink-soft">{incident.detail}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        <Card title="Backup status">
          <ul className="space-y-3.5 text-sm font-medium text-ink-soft">
            <li className="flex items-center justify-between gap-2 border-b border-line pb-3">
              <span>Last backup</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-ink">Today · 07:00</span>
            </li>
            <li className="flex items-center justify-between gap-2 border-b border-line pb-3">
              <span>Region</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-ink">eu-west-1</span>
            </li>
            <li className="flex items-center justify-between gap-2 border-b border-line pb-3">
              <span>Frequency</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-ink">Daily · 30-day PITR</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>Last restore drill</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-success">Passed · 6 days ago</span>
            </li>
          </ul>
        </Card>

        <Card title="Error rate (Sentry)">
          <ul className="space-y-3.5 text-sm font-medium text-ink-soft">
            <li className="flex items-center justify-between gap-2 border-b border-line pb-3">
              <span>Open issues</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-ink">2</span>
            </li>
            <li className="flex items-center justify-between gap-2 border-b border-line pb-3">
              <span>Errors (24h)</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-ink">14</span>
            </li>
            <li className="flex items-center justify-between gap-2 border-b border-line pb-3">
              <span>Transactions (24h)</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-ink">48,320</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>PII scrubbing</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-success">Active</span>
            </li>
          </ul>
        </Card>

        <Card title="Job queue (Inngest)">
          <ul className="space-y-3.5 text-sm font-medium text-ink-soft">
            <li className="flex items-center justify-between gap-2 border-b border-line pb-3">
              <span>Pending jobs</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-warning">1 backlog</span>
            </li>
            <li className="flex items-center justify-between gap-2 border-b border-line pb-3">
              <span>Completed (24h)</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-ink">2,841</span>
            </li>
            <li className="flex items-center justify-between gap-2 border-b border-line pb-3">
              <span>Failed (24h)</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-ink">0</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>Avg. duration</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-ink">1.4 s</span>
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
}
