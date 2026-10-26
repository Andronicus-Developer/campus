import type { Metadata } from "next";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Database,
  Download,
  Eye,
  Power,
  RotateCcw,
  Terminal,
} from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";

export const metadata: Metadata = { title: "Maintenance & System Updates" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink-soft shadow-xs transition-colors hover:bg-surface-raised hover:text-ink";
const dangerButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-5 text-sm font-bold text-danger-deep transition-colors hover:bg-danger/20";

type MaintenanceStatus = "completed" | "scheduled" | "in-progress" | "cancelled";

const windowStatusMeta: Record<MaintenanceStatus, { tone: "positive" | "neutral" | "warning" | "muted" }> = {
  completed:     { tone: "positive" },
  scheduled:     { tone: "neutral"  },
  "in-progress": { tone: "warning"  },
  cancelled:     { tone: "muted"    },
};

const windows = [
  {
    id: "mw-008", status: "scheduled" as MaintenanceStatus,
    title: "Database migration — feature_usage index",
    description: "Adding composite index on (school_id, feature_key, recorded_at) for analytics queries.",
    scheduledFor: "25 Oct 2026 · 02:00–03:00 UTC", duration: "~60 min",
    affectedServices: ["Postgres", "Analytics API"],
  },
  {
    id: "mw-007", status: "completed" as MaintenanceStatus,
    title: "Inngest job queue upgrade",
    description: "Upgrading Inngest SDK to latest stable; no API changes expected.",
    scheduledFor: "22 Oct 2026 · 04:00–04:30 UTC", duration: "~30 min",
    affectedServices: ["Background jobs"],
  },
  {
    id: "mw-006", status: "completed" as MaintenanceStatus,
    title: "Resend webhook signing key rotation",
    description: "Rotating Resend webhook signing key as part of quarterly credential rotation.",
    scheduledFor: "15 Oct 2026 · 22:00–22:15 UTC", duration: "~15 min",
    affectedServices: ["Email delivery"],
  },
  {
    id: "mw-005", status: "completed" as MaintenanceStatus,
    title: "Supabase storage bucket policy update",
    description: "Tightening storage RLS policies to enforce per-school object ownership.",
    scheduledFor: "10 Oct 2026 · 03:00–03:30 UTC", duration: "~30 min",
    affectedServices: ["Supabase Storage"],
  },
];

const releases = [
  { version: "v1.4.2", date: "22 Oct 2026", type: "patch", summary: "Fix: attendance correction audit log missing old value" },
  { version: "v1.4.1", date: "19 Oct 2026", type: "patch", summary: "Fix: report card PDF renderer stack overflow on large cohorts" },
  { version: "v1.4.0", date: "14 Oct 2026", type: "minor", summary: "Feature: bulk attendance import, Paystack recurring billing" },
  { version: "v1.3.5", date: "07 Oct 2026", type: "patch", summary: "Security: tighten storage bucket policies, add object ownership check" },
  { version: "v1.3.0", date: "01 Oct 2026", type: "minor", summary: "Feature: parent portal, guardian notifications, receipt downloads" },
];

const maintenanceMode = false;

export default function MaintenancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Settings & Compliance"
        title="Maintenance & system updates."
        description="Maintenance mode, scheduled downtime, platform status and release notices."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <Eye className="size-4" aria-hidden="true" />
              Preview banner
            </button>
            <button type="button" className={ghostButton}>
              <Calendar className="size-4" aria-hidden="true" />
              Schedule window
            </button>
          </>
        }
      />

      {/* Maintenance mode banner */}
      <div className={`mb-6 rounded-2xl border p-6 shadow-xs ${maintenanceMode ? "border-danger/30 bg-danger/5" : "border-line bg-surface"}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <Power
              className={`mt-0.5 size-6 shrink-0 ${maintenanceMode ? "text-danger" : "text-ink-soft"}`}
              aria-hidden="true"
            />
            <div>
              <p className="text-base sm:text-lg font-bold text-ink">
                Maintenance mode is{" "}
                <span className={maintenanceMode ? "text-danger" : "text-success"}>
                  {maintenanceMode ? "active" : "off"}
                </span>
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                When enabled, a read-only banner is shown to all non-operator users.
                Operator console access is unaffected.
              </p>
            </div>
          </div>
          {maintenanceMode ? (
            <button type="button" className={dangerButton}>
              <Power className="size-4" aria-hidden="true" />
              Disable maintenance
            </button>
          ) : (
            <button type="button" className={ghostButton}>
              <Power className="size-4" aria-hidden="true" />
              Enable maintenance
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Upcoming windows"
          value={String(windows.filter((w) => w.status === "scheduled").length)}
          hint="scheduled"
          icon={<Calendar className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Completed (90d)"
          value={String(windows.filter((w) => w.status === "completed").length)}
          hint="without incident"
          icon={<CheckCircle2 className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Last restore drill"
          value="Passed"
          hint="6 days ago"
          icon={<RotateCcw className="size-5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-8">
        <Card title="Maintenance windows" description="Scheduled and historical downtime events.">
          <ul className="divide-y divide-line">
            {windows.map((w) => (
              <li key={w.id} className="py-4.5 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <Database className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-sm sm:text-base font-bold text-ink">{w.title}</p>
                      <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink-soft">{w.description}</p>
                    </div>
                  </div>
                  <Pill tone={windowStatusMeta[w.status].tone}>{w.status}</Pill>
                </div>
                <div className="mt-2.5 pl-8.5 flex flex-wrap gap-4 font-mono text-xs font-semibold text-ink-soft">
                  <span className="flex items-center gap-1.5 bg-surface-raised px-2.5 py-1 rounded-md">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {w.scheduledFor}
                  </span>
                  <span className="bg-surface-raised px-2.5 py-1 rounded-md">Duration: {w.duration}</span>
                  <span className="bg-surface-raised px-2.5 py-1 rounded-md">Affected: {w.affectedServices.join(", ")}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-8">
        <Card title="Release history" description="Recent platform releases and change summaries.">
          <ul className="divide-y divide-line">
            {releases.map((release) => (
              <li key={release.version} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <Terminal className="size-4.5 shrink-0 text-ink-soft" aria-hidden="true" />
                  <span className="font-mono text-xs sm:text-sm font-bold text-primary bg-primary-light/50 px-2.5 py-0.5 rounded-md">{release.version}</span>
                  <Pill tone={release.type === "minor" ? "neutral" : "muted"}>{release.type}</Pill>
                </div>
                <span className="flex-1 text-sm font-medium text-ink-soft">{release.summary}</span>
                <span className="shrink-0 font-mono text-xs font-semibold text-ink-muted">{release.date}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-line pt-4">
            <button type="button" className={ghostButton}>
              <Download className="size-4" aria-hidden="true" />
              Full changelog
            </button>
          </div>
        </Card>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-surface p-6 shadow-xs">
        <p className="flex items-center gap-2 text-sm font-bold text-danger">
          <AlertTriangle className="size-4.5" aria-hidden="true" />
          Danger zone
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Destructive platform operations — database restores, full tenant data purges and
          rolling back releases — must be performed by an authorised operator with a written
          reason. These actions are irreversible and are captured in the audit log.
        </p>
      </div>
    </>
  );
}
