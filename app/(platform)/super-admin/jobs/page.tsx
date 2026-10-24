import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, Clock, Play, RefreshCw, Timer, XCircle } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Background Jobs" };

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";

type JobStatus = "completed" | "running" | "failed" | "queued" | "retrying";

type JobRecord = {
  id: string;
  name: string;
  trigger: string;
  school: string | null;
  status: JobStatus;
  duration: string | null;
  attempts: number;
  startedAt: string;
};

const statusMeta: Record<JobStatus, { tone: "positive" | "critical" | "warning" | "neutral" | "muted" }> = {
  completed: { tone: "positive" },
  running:   { tone: "neutral" },
  failed:    { tone: "critical" },
  queued:    { tone: "muted" },
  retrying:  { tone: "warning" as "neutral" },
};

const jobs: JobRecord[] = [
  { id: "job-8841", name: "Report card batch generation", trigger: "Manual",          school: "Greenfield Academy",   status: "running",   duration: null,     attempts: 1, startedAt: "22 Oct · 14:30" },
  { id: "job-8840", name: "Monthly invoice dispatch",     trigger: "Scheduled",       school: null,                   status: "completed", duration: "4m 12s", attempts: 1, startedAt: "22 Oct · 09:00" },
  { id: "job-8839", name: "Trial expiry reminders",       trigger: "Scheduled",       school: null,                   status: "completed", duration: "12s",    attempts: 1, startedAt: "22 Oct · 08:00" },
  { id: "job-8838", name: "Fee reminder emails",          trigger: "Scheduled",       school: null,                   status: "completed", duration: "28s",    attempts: 1, startedAt: "22 Oct · 07:30" },
  { id: "job-8837", name: "Student data export",          trigger: "Manual",          school: "Horizon International", status: "retrying",  duration: null,     attempts: 2, startedAt: "22 Oct · 11:15" },
  { id: "job-8836", name: "Attendance summary rollup",    trigger: "Scheduled",       school: null,                   status: "completed", duration: "1m 03s", attempts: 1, startedAt: "21 Oct · 22:00" },
  { id: "job-8835", name: "Storage cleanup — expired files", trigger: "Scheduled",   school: null,                   status: "completed", duration: "8s",     attempts: 1, startedAt: "21 Oct · 03:00" },
  { id: "job-8834", name: "Webhook replay — ps-9907",     trigger: "Manual",          school: null,                   status: "failed",    duration: "2s",     attempts: 3, startedAt: "21 Oct · 17:05" },
];

const completedCount = jobs.filter((j) => j.status === "completed").length;
const failedCount    = jobs.filter((j) => j.status === "failed").length;
const runningCount   = jobs.filter((j) => j.status === "running" || j.status === "retrying").length;

const scheduledJobs = [
  { name: "Trial expiry reminders",     cron: "0 8 * * *",    nextRun: "23 Oct · 08:00" },
  { name: "Fee reminder emails",         cron: "30 7 * * *",   nextRun: "23 Oct · 07:30" },
  { name: "Monthly invoice dispatch",   cron: "0 9 1 * *",    nextRun: "01 Nov · 09:00" },
  { name: "Attendance summary rollup",  cron: "0 22 * * *",   nextRun: "22 Oct · 22:00" },
  { name: "Storage cleanup",            cron: "0 3 * * *",    nextRun: "23 Oct · 03:00" },
  { name: "Dunning retry cycle",        cron: "0 10 */3 * *", nextRun: "25 Oct · 10:00" },
];

export default function JobsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform Operations"
        title="Background jobs."
        description="Scheduled tasks, email jobs, reminders, retries, job failures and execution history."
        actions={
          <button type="button" className={ghostButton}>
            <RefreshCw className="size-3.5" aria-hidden="true" />
            Refresh
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Completed (24h)" value={formatNumber(completedCount)} hint="successful runs" icon={<CheckCircle2 className="size-3.5" aria-hidden="true" />} />
        <KpiCard label="Active / retrying" value={formatNumber(runningCount)} hint="in progress" icon={<Timer className="size-3.5" aria-hidden="true" />} />
        <KpiCard label="Failed" value={formatNumber(failedCount)} hint="needs investigation" icon={<XCircle className="size-3.5" aria-hidden="true" />} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Job run log */}
        <Card title="Recent job runs" description="Last 24 hours of job execution history.">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-line">
                  {["Job", "School", "Status", "Duration", "Attempts", "Started", ""].map((h) => (
                    <th key={h} className="pb-3 pr-4 text-left font-mono text-[9px] uppercase tracking-[0.15em] text-ink-muted last:pr-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="py-3 pr-4 font-medium">{job.name}</td>
                    <td className="py-3 pr-4 text-ink-muted">{job.school ?? "Platform"}</td>
                    <td className="py-3 pr-4">
                      <Pill tone={statusMeta[job.status].tone}>{job.status}</Pill>
                    </td>
                    <td className="py-3 pr-4 font-mono text-ink-muted">{job.duration ?? "—"}</td>
                    <td className="py-3 pr-4 font-mono text-ink-muted">{job.attempts}</td>
                    <td className="py-3 pr-4 text-ink-muted">{job.startedAt}</td>
                    <td className="py-3 text-right">
                      {job.status === "failed" && (
                        <button
                          type="button"
                          className="flex items-center gap-1 rounded-full border border-line bg-surface px-3 py-1 text-[11px] text-ink-soft transition-colors hover:text-ink"
                        >
                          <Play className="size-3" aria-hidden="true" />
                          Retry
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Scheduled jobs */}
        <Card title="Scheduled jobs" description="Recurring Inngest jobs and their next run times.">
          <ul className="divide-y divide-line">
            {scheduledJobs.map((job) => (
              <li key={job.name} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium">{job.name}</p>
                  <span className="shrink-0 font-mono text-[10px] text-ink-muted">{job.cron}</span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-ink-muted">
                  <Clock className="size-3" aria-hidden="true" />
                  Next: {job.nextRun}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Safety note */}
      <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-ink-muted" aria-hidden="true" />
          <div>
            <p className="text-xs font-medium">Job safety guarantees</p>
            <p className="mt-1 text-xs leading-6 text-ink-muted">
              All jobs are tenant-aware and idempotent — re-running a completed job will not
              duplicate invoices, emails or audit entries. Retry-safe side effects are enforced
              at the handler level. Failed jobs are retried up to 3 times with exponential
              back-off before alerting operators.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
