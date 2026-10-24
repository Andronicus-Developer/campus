import type { Metadata } from "next";
import { Flag, Plus, Save } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { featureFlags, formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Feature Flags" };

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";
const primaryButton =
  "inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-xs font-medium text-paper transition-colors hover:bg-ink-soft";

const enabledCount  = featureFlags.filter((f) => f.enabled).length;
const disabledCount = featureFlags.filter((f) => !f.enabled).length;

export default function FlagsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform Operations"
        title="Feature flags."
        description="Enable or disable platform capabilities globally, by plan, or for individual schools."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <Save className="size-3.5" aria-hidden="true" />
              Save changes
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-3.5" aria-hidden="true" />
              New flag
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Total flags" value={formatNumber(featureFlags.length)} hint="defined in catalogue" icon={<Flag className="size-3.5" aria-hidden="true" />} />
        <KpiCard label="Enabled" value={formatNumber(enabledCount)} hint="active platform-wide" icon={<Flag className="size-3.5" aria-hidden="true" />} />
        <KpiCard label="Disabled" value={formatNumber(disabledCount)} hint="rolled back or staged" icon={<Flag className="size-3.5" aria-hidden="true" />} />
      </div>

      <div className="mt-6">
        <Card
          title="Flag catalogue"
          description="Toggle features globally. Plan-scoped or school-scoped overrides can be applied per tenant."
        >
          <ul className="divide-y divide-line">
            {featureFlags.map((flag) => (
              <li key={flag.key} className="flex flex-wrap items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-medium text-ink">{flag.key}</span>
                    {flag.scope && (
                      <Pill tone="neutral">{flag.scope}</Pill>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-ink-muted">{flag.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Pill tone={flag.enabled ? "positive" : "muted"}>
                    {flag.enabled ? "Enabled" : "Disabled"}
                  </Pill>
                  <label className="relative inline-flex cursor-pointer items-center" aria-label={`Toggle ${flag.key}`}>
                    <input
                      type="checkbox"
                      defaultChecked={flag.enabled}
                      className="peer sr-only"
                    />
                    <div className="h-5 w-9 rounded-full bg-line transition-colors peer-checked:bg-pine after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-4" />
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <p className="text-xs font-medium">Flag governance</p>
        <p className="mt-1.5 text-xs leading-6 text-ink-muted">
          Every flag change is recorded in the platform audit log with the acting operator,
          timestamp and previous value. Flags are evaluated server-side only — they cannot
          be overridden by client requests. Plan-gated flags are re-evaluated on each
          request against the tenant&apos;s active subscription entitlements.
        </p>
      </div>
    </>
  );
}
