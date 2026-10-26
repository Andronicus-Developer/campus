import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, Clock, Play, RefreshCw, Timer, XCircle } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Background Jobs" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink-soft shadow-xs transition-colors hover:bg-surface-raised hover:text-ink";

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
            <RefreshCw className="size-4" aria-hidden="true" />
            Refresh
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Completed (24h)" value={formatNumber(completedCount)} hint="successful runs" icon={<CheckCircle2 className="size-5" aria-hidden="true" />} />
        <KpiCard label="Active / retrying" value={formatNumber(runningCount)} hint="in progress" icon={<Timer className="size-5" aria-hidden="true" />} />
        <KpiCard label="Failed" value={formatNumber(failedCount)} hint="needs investigation" icon={<XCircle className="size-5" aria-hidden="true" />} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Job run log */}
        <Card title="Recent job runs" description="Last 24 hours of job execution history.">
          <div className="overflow-x-auto -mx-6 -mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-raised/60">
                  {["Job", "School", "Status", "Duration", "Attempts", "Started", ""].map((h) => (
                    <th key={h} className="py-4 px-6 text-left font-sans text-xs font-bold uppercase tracking-wider text-slate-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {jobs.map((job) => (
                  <tr key={job.id} className="transition-colors hover:bg-surface-raised/40">
                    <td className="py-4 px-6 font-bold text-ink text-sm sm:text-base">{job.name}</td>
                    <td className="py-4 px-6 text-sm font-medium text-ink-soft">{job.school ?? "Platform"}</td>
                    <td className="py-4 px-6">
                      <Pill tone={statusMeta[job.status].tone}>{job.status}</Pill>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-ink-soft">{job.duration ?? "—"}</td>
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-ink-soft">{job.attempts}</td>
                    <td className="py-4 px-6 text-xs font-medium text-ink-muted">{job.startedAt}</td>
                    <td className="py-4 px-6 text-right">
                      {job.status === "failed" && (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-4 py-1.5 text-xs font-bold text-ink-soft shadow-xs transition-colors hover:bg-surface-raised hover:text-ink"
                        >
                          <Play className="size-3.5" aria-hidden="true" />
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
              <li key={job.name} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm sm:text-base font-bold text-ink">{job.name}</p>
                  <span className="shrink-0 font-mono text-xs font-bold text-primary bg-primary-light/50 px-2 py-0.5 rounded-md">{job.cron}</span>
                </div>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs sm:text-sm text-ink-soft">
                  <Clock className="size-3.5" aria-hidden="true" />
                  Next: {job.nextRun}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Safety note */}
      <div className="mt-8 rounded-2xl border border-line bg-surface p-6 shadow-xs">
        <div className="flex items-start gap-3.5">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden="true" />
          <div>
            <p className="text-sm sm:text-base font-bold text-ink">Job safety guarantees</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
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
