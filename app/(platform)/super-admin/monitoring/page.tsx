import type { Metadata } from "next";
import {
  AlertTriangle,
  BarChart3,
  Bug,
  ExternalLink,
  RefreshCw,
  Zap,
} from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Errors & Monitoring" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink hover:bg-surface-raised transition-all shadow-xs";

type IssueLevel    = "error" | "warning" | "info";
type IssueStatus   = "open" | "resolved" | "ignored" | "regressed";

type SentryIssue = {
  id: string;
  title: string;
  level: IssueLevel;
  status: IssueStatus;
  occurrences: number;
  affectedUsers: number;
  firstSeen: string;
  lastSeen: string;
};

const levelMeta: Record<IssueLevel, { tone: "critical" | "warning" | "neutral" }> = {
  error:   { tone: "critical" },
  warning: { tone: "warning" as "critical" },
  info:    { tone: "neutral" },
};

const statusMeta: Record<IssueStatus, { tone: "critical" | "positive" | "muted" | "warning" }> = {
  open:       { tone: "critical" },
  resolved:   { tone: "positive" },
  ignored:    { tone: "muted" },
  regressed:  { tone: "warning" as "critical" },
};

const issues: SentryIssue[] = [
  { id: "SNT-1041", title: "TypeError: Cannot read properties of undefined (reading 'schoolId')", level: "error",   status: "open",     occurrences: 14,  affectedUsers: 3,  firstSeen: "20 Oct 2026", lastSeen: "22 Oct · 13:55" },
  { id: "SNT-1040", title: "ChunkLoadError: Loading chunk vendors failed", level: "error", status: "open", occurrences: 6, affectedUsers: 6, firstSeen: "21 Oct 2026", lastSeen: "22 Oct · 11:30" },
  { id: "SNT-1039", title: "Unhandled promise rejection: fetch failed — /api/inngest", level: "warning", status: "resolved", occurrences: 3, affectedUsers: 0, firstSeen: "22 Oct 2026", lastSeen: "22 Oct · 09:18" },
  { id: "SNT-1038", title: "RangeError: Maximum call stack size exceeded — report card renderer", level: "error", status: "resolved", occurrences: 1, affectedUsers: 1, firstSeen: "19 Oct 2026", lastSeen: "19 Oct 2026" },
  { id: "SNT-1037", title: "Warning: RLS policy missing on new feature_usage table", level: "warning", status: "resolved", occurrences: 1, affectedUsers: 0, firstSeen: "18 Oct 2026", lastSeen: "18 Oct 2026" },
];

const performanceMetrics = [
  { label: "p50 response time",  value: "48 ms",   good: true },
  { label: "p95 response time",  value: "110 ms",  good: true },
  { label: "p99 response time",  value: "340 ms",  good: true },
  { label: "Error rate (24h)",   value: "0.029%",  good: true },
  { label: "Apdex score",        value: "0.96",    good: true },
  { label: "Transactions (24h)", value: "48,320",  good: true },
];

const openCount     = issues.filter((i) => i.status === "open").length;
const resolvedCount = issues.filter((i) => i.status === "resolved").length;
const totalOccurrences = issues.reduce((acc, i) => acc + i.occurrences, 0);

export default function MonitoringPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform Operations"
        title="Errors & monitoring."
        description="Application exceptions, performance issues, incidents and alerts via Sentry."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <RefreshCw className="size-4" aria-hidden="true" />
              Refresh
            </button>
            <a
              href="https://sentry.io"
              target="_blank"
              rel="noopener noreferrer"
              className={ghostButton}
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              Open Sentry
            </a>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Open issues" value={formatNumber(openCount)} hint="need investigation" icon={<Bug className="size-5" aria-hidden="true" />} />
        <KpiCard label="Resolved (7d)" value={formatNumber(resolvedCount)} hint="closed this week" icon={<Bug className="size-5" aria-hidden="true" />} />
        <KpiCard label="Occurrences (24h)" value={formatNumber(totalOccurrences)} hint="across all issues" icon={<AlertTriangle className="size-5" aria-hidden="true" />} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Issue list */}
        <Card title="Sentry issues" description="Errors and warnings captured from the running application.">
          <ul className="divide-y divide-line">
            {issues.map((issue) => (
              <li key={issue.id} className="py-5 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Pill tone={levelMeta[issue.level].tone}>{issue.level}</Pill>
                    <Pill tone={statusMeta[issue.status].tone}>{issue.status}</Pill>
                  </div>
                  <span className="font-mono text-xs font-bold text-primary">{issue.id}</span>
                </div>
                <p className="mt-2 text-sm sm:text-base font-bold text-ink leading-snug">{issue.title}</p>
                <div className="mt-2 flex flex-wrap gap-4 font-mono text-xs font-semibold text-ink-muted">
                  <span><strong className="text-ink font-bold">{issue.occurrences}</strong> occurrences</span>
                  <span><strong className="text-ink font-bold">{issue.affectedUsers}</strong> users affected</span>
                  <span>Last: <strong className="text-ink font-bold">{issue.lastSeen}</strong></span>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Performance */}
        <Card title="Performance metrics" description="Response times and throughput (Sentry tracing).">
          <ul className="divide-y divide-line">
            {performanceMetrics.map((m) => (
              <li key={m.label} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3 text-sm font-bold text-ink-soft">
                  <Zap className="size-4 text-primary shrink-0" aria-hidden="true" />
                  {m.label}
                </div>
                <span
                  className={`font-mono text-sm font-black ${m.good ? "text-pine" : "text-vermilion-deep"}`}
                >
                  {m.value}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* PII & privacy */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card title="PII scrubbing">
          <p className="text-sm leading-relaxed text-ink-soft">
            Sentry is configured to scrub student names, email addresses, phone numbers,
            payment card data and authentication tokens from all error events and performance
            traces before transmission. Review scrubbing rules when adding new data models.
          </p>
        </Card>
        <Card title="Alert configuration">
          <ul className="space-y-3 text-sm font-medium text-ink-soft">
            {[
              "Error rate > 1% for 5 min → page on-call",
              "p95 latency > 2 s for 5 min → notify team",
              "New issue with 10+ users → immediate alert",
              "Webhook signature failure → immediate alert",
              "Unresolved critical issue after 24 h → escalate",
            ].map((rule) => (
              <li key={rule} className="flex items-start gap-3">
                <BarChart3 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {rule}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
