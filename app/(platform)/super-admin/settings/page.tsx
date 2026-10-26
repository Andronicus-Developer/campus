import type { Metadata } from "next";
import { AlertTriangle, Database, Globe2, RefreshCw, Save, Server, Trash2 } from "lucide-react";
import { Card, PageHeader, Pill } from "@/components/platform/ui";
import { FeatureFlagList } from "@/components/platform/feature-flag-list";

export const metadata: Metadata = {
  title: "Settings",
};

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink hover:bg-surface-raised transition-all shadow-xs";
const primaryButton =
  "inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-sm font-bold text-paper transition-all hover:bg-ink-soft shadow-xs";
const dangerButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-vermilion/30 bg-vermilion/10 px-5 text-sm font-bold text-vermilion-deep transition-all hover:bg-vermilion/20 shadow-xs";

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
              <RefreshCw className="size-4" aria-hidden="true" />
              Reload
            </button>
            <button type="button" className={primaryButton}>
              <Save className="size-4" aria-hidden="true" />
              Save changes
            </button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
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
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {defaults.map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-4 border-b border-line pb-4">
                  <div>
                    <dt className="text-sm font-bold text-ink">{item.label}</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-ink-muted">{item.hint}</dd>
                  </div>
                  <span className="shrink-0 rounded-lg border border-line bg-paper px-3 py-1 font-mono text-xs font-bold text-primary">
                    {item.value}
                  </span>
                </div>
              ))}
            </dl>
            <label className="mt-6 flex items-start gap-3.5 rounded-2xl border border-line bg-sand/30 p-5">
              <input
                type="checkbox"
                defaultChecked
                className="mt-1 size-4 accent-[#0f3d33]"
              />
              <span className="text-sm leading-relaxed text-ink-soft">
                Require a reason for every student-data export and bulk operation, platform-wide.
              </span>
            </label>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card title="Connected services" description="Live status of platform dependencies.">
            <ul className="divide-y divide-line">
              {services.map((service) => (
                <li key={service.name} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-3 text-sm sm:text-base font-bold text-ink">
                      <Server className="size-4 text-primary" aria-hidden="true" />
                      {service.name}
                    </span>
                    <Pill tone={service.tone}>
                      {service.tone === "positive" ? "Operational" : "Degraded"}
                    </Pill>
                  </div>
                  <p className="mt-1.5 pl-7 font-mono text-xs font-semibold text-ink-muted">
                    {service.meta}
                  </p>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Backups & retention">
            <ul className="space-y-4 text-sm">
              <li className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-3 text-sm font-bold text-ink-soft">
                  <Database className="size-4 text-primary" aria-hidden="true" />
                  Last backup
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-ink">Today · 07:00</span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-3 text-sm font-bold text-ink-soft">
                  <Globe2 className="size-4 text-primary" aria-hidden="true" />
                  Region
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-ink">eu-west-1</span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-3 text-sm font-bold text-ink-soft">
                  <Server className="size-4 text-primary" aria-hidden="true" />
                  Frequency
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-ink">Daily · 30-day PITR</span>
              </li>
            </ul>
            <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-ink-soft">
              Last restore drill passed 6 days ago. Backups never leave the tenant
              region and student photos are stored as private objects.
            </p>
          </Card>

          <Card title="Danger zone" description="Actions that affect every tenant.">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm sm:text-base font-bold text-ink">Maintenance mode</p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                    Show a read-only banner to all non-operator users.
                  </p>
                </div>
                <button type="button" className={ghostButton}>
                  Enable
                </button>
              </div>
              <div className="flex items-start justify-between gap-4 border-t border-line pt-4">
                <div>
                  <p className="flex items-center gap-2 text-sm sm:text-base font-bold text-vermilion-deep">
                    <AlertTriangle className="size-4" aria-hidden="true" />
                    Purge closed tenant data
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                    Permanently delete data for tenants closed for 90+ days.
                  </p>
                </div>
                <button type="button" className={dangerButton}>
                  <Trash2 className="size-4" aria-hidden="true" />
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
