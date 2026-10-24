import type { Metadata } from "next";
import { AlertTriangle, Database, Globe2, RefreshCw, Save, Server, Trash2 } from "lucide-react";
import { Card, PageHeader, Pill } from "@/components/platform/ui";
import { FeatureFlagList } from "@/components/platform/feature-flag-list";

export const metadata: Metadata = {
  title: "Settings",
};

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";
const primaryButton =
  "inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-xs font-medium text-paper transition-colors hover:bg-ink-soft";
const dangerButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-vermilion/30 bg-vermilion/10 px-4 text-xs font-medium text-vermilion-deep transition-colors hover:bg-vermilion/15";

const defaults: { label: string; value: string; hint: string }[] = [
  { label: "Default currency", value: "USD ($)", hint: "Applied to new tenants" },
  { label: "Default timezone", value: "Europe/London", hint: "Overridden per school" },
  { label: "Date format", value: "DD MMM YYYY", hint: "Rendered in each school's timezone" },
  { label: "Trial length", value: "14 days", hint: "Full-feature, no card required" },
  { label: "Dunning attempts", value: "3 reminders", hint: "Then suspend, data stays exportable" },
  { label: "Support session timeout", value: "60 minutes", hint: "Auto-expire privileged access" },
  { label: "Audit retention", value: "24 months", hint: "Append-only, then archived" },
  { label: "Storage region", value: "eu-west-1", hint: "Private bucket, signed URLs only" },
];

const services: { name: string; meta: string; tone: "positive" | "warning" | "critical" }[] = [
  { name: "Supabase Auth", meta: "Sign-in, sessions, MFA · 99.99%", tone: "positive" },
  { name: "Postgres (tenant data)", meta: "Row-level security · p95 42 ms", tone: "positive" },
  { name: "Resend (email)", meta: "Transactional + bulk · 99.4% delivered", tone: "positive" },
  { name: "Inngest (jobs)", meta: "1 backlog draining", tone: "warning" },
  { name: "Paystack (payments)", meta: "Webhooks verified · 0 unreconciled", tone: "positive" },
  { name: "Supabase Storage", meta: "42.1 GB used · private objects", tone: "positive" },
];

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform configuration"
        title="Settings and platform controls."
        description="Roll out features, inspect integrations and tune the defaults new schools inherit at provisioning."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <RefreshCw className="size-3.5" aria-hidden="true" />
              Reload
            </button>
            <button type="button" className={primaryButton}>
              <Save className="size-3.5" aria-hidden="true" />
              Save changes
            </button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-4">
          <Card
            title="Feature flags"
            description="Toggle platform capabilities and control rollout scope."
          >
            <FeatureFlagList />
          </Card>

          <Card
            title="Platform defaults"
            description="Defaults every new tenant inherits at provisioning."
          >
            <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {defaults.map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-4 border-b border-line pb-3">
                  <div>
                    <dt className="text-xs font-medium">{item.label}</dt>
                    <dd className="mt-0.5 text-[11px] leading-5 text-ink-muted">{item.hint}</dd>
                  </div>
                  <span className="shrink-0 rounded-lg border border-line bg-paper px-2.5 py-1 font-mono text-[11px] text-ink-soft">
                    {item.value}
                  </span>
                </div>
              ))}
            </dl>
            <label className="mt-4 flex items-start gap-3 rounded-xl border border-line bg-sand/30 p-4">
              <input
                type="checkbox"
                defaultChecked
                className="mt-0.5 size-4 accent-[#0f3d33]"
              />
              <span className="text-xs leading-6 text-ink-soft">
                Require a reason for every student-data export and bulk operation, platform-wide.
              </span>
            </label>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card title="Connected services" description="Live status of platform dependencies.">
            <ul className="divide-y divide-line">
              {services.map((service) => (
                <li key={service.name} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2.5 text-xs font-medium">
                      <Server className="size-3.5 text-ink-muted" aria-hidden="true" />
                      {service.name}
                    </span>
                    <Pill tone={service.tone}>
                      {service.tone === "positive" ? "Operational" : "Degraded"}
                    </Pill>
                  </div>
                  <p className="mt-1 pl-6 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
                    {service.meta}
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Backups & retention">
            <ul className="space-y-3 text-xs">
              <li className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-ink-soft">
                  <Database className="size-3.5 text-ink-muted" aria-hidden="true" />
                  Last backup
                </span>
                <span className="font-mono text-ink-soft">Today · 07:00</span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-ink-soft">
                  <Globe2 className="size-3.5 text-ink-muted" aria-hidden="true" />
                  Region
                </span>
                <span className="font-mono text-ink-soft">eu-west-1</span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-ink-soft">
                  <Server className="size-3.5 text-ink-muted" aria-hidden="true" />
                  Frequency
                </span>
                <span className="font-mono text-ink-soft">Daily · 30-day PITR</span>
              </li>
            </ul>
            <p className="mt-4 border-t border-line pt-4 text-[11px] leading-5 text-ink-muted">
              Last restore drill passed 6 days ago. Backups never leave the tenant
              region and student photos are stored as private objects.
            </p>
          </Card>

          <Card title="Danger zone" description="Actions that affect every tenant.">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium">Maintenance mode</p>
                  <p className="mt-0.5 text-[11px] leading-5 text-ink-muted">
                    Show a read-only banner to all non-operator users.
                  </p>
                </div>
                <button type="button" className={ghostButton}>
                  Enable
                </button>
              </div>
              <div className="flex items-start justify-between gap-3 border-t border-line pt-3">
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-medium text-vermilion-deep">
                    <AlertTriangle className="size-3.5" aria-hidden="true" />
                    Purge closed tenant data
                  </p>
                  <p className="mt-0.5 text-[11px] leading-5 text-ink-muted">
                    Permanently delete data for tenants closed for 90+ days.
                  </p>
                </div>
                <button type="button" className={dangerButton}>
                  <Trash2 className="size-3.5" aria-hidden="true" />
                  Purge
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
