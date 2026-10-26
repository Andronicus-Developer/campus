import type { Metadata } from "next";
import { Flag, Plus, Save } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { featureFlags, formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Feature Flags" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink hover:bg-surface-raised transition-all shadow-xs";
const primaryButton =
  "inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-sm font-bold text-paper transition-all hover:bg-ink-soft shadow-xs";

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
              <Save className="size-4" aria-hidden="true" />
              Save changes
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-4" aria-hidden="true" />
              New flag
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Total flags" value={formatNumber(featureFlags.length)} hint="defined in catalogue" icon={<Flag className="size-5" aria-hidden="true" />} />
        <KpiCard label="Enabled" value={formatNumber(enabledCount)} hint="active platform-wide" icon={<Flag className="size-5" aria-hidden="true" />} />
        <KpiCard label="Disabled" value={formatNumber(disabledCount)} hint="rolled back or staged" icon={<Flag className="size-5" aria-hidden="true" />} />
      </div>

      <div className="mt-8">
        <Card
          title="Flag catalogue"
          description="Toggle features globally. Plan-scoped or school-scoped overrides can be applied per tenant."
        >
          <ul className="divide-y divide-line">
            {featureFlags.map((flag) => (
              <li key={flag.key} className="flex flex-wrap items-center justify-between gap-4 py-5 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-sm font-bold text-primary bg-primary-light/50 px-2.5 py-1 rounded-lg">{flag.key}</span>
                    {flag.scope && (
                      <Pill tone="neutral">{flag.scope}</Pill>
                    )}
                  </div>
                  <p className="mt-2 text-sm font-medium text-ink-soft">{flag.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Pill tone={flag.enabled ? "positive" : "muted"}>
                    {flag.enabled ? "Enabled" : "Disabled"}
                  </Pill>
                  <label className="relative inline-flex cursor-pointer items-center" aria-label={`Toggle ${flag.key}`}>
                    <input
                      type="checkbox"
                      defaultChecked={flag.enabled}
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-line transition-colors peer-checked:bg-pine after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-5" />
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-surface-raised/40 p-6 shadow-xs">
        <p className="text-sm sm:text-base font-bold text-ink">Flag governance</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
          Every flag change is recorded in the platform audit log with the acting operator,
          timestamp and previous value. Flags are evaluated server-side only — they cannot
          be overridden by client requests. Plan-gated flags are re-evaluated on each
          request against the tenant&apos;s active subscription entitlements.
        </p>
      </div>
    </>
  );
}
