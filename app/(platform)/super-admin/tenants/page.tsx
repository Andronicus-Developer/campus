import type { Metadata } from "next";
import { Download, Plus } from "lucide-react";
import { PageHeader, Pill } from "@/components/platform/ui";
import { TenantDirectory } from "@/components/platform/tenant-directory";
import { directoryTotal, formatNumber, platformStats, tenants } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Schools",
};

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";
const primaryButton =
  "inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-xs font-medium text-paper transition-colors hover:bg-ink-soft";

const summary = [
  { label: "Active", value: platformStats.activeTenants, tone: "positive" as const },
  { label: "Trial", value: platformStats.trialTenants, tone: "warning" as const },
  { label: "Onboarding", value: platformStats.onboardingTenants, tone: "neutral" as const },
  { label: "Past due", value: platformStats.pastDueTenants, tone: "critical" as const },
  { label: "Suspended", value: platformStats.suspendedTenants, tone: "critical" as const },
];

export default function TenantsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tenant directory"
        title="Every school on the platform."
        description={`${formatNumber(directoryTotal)} tenants in total. Search, filter and drill into any school to inspect its subscription, seats, members and audit history.`}
        actions={
          <>
            <button type="button" className={ghostButton}>
              <Download className="size-3.5" aria-hidden="true" />
              Export CSV
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-3.5" aria-hidden="true" />
              Add school
            </button>
          </>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        {summary.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2"
          >
            <Pill tone={item.tone}>{item.label}</Pill>
            <span className="font-mono text-xs text-ink-soft">{formatNumber(item.value)}</span>
          </span>
        ))}
      </div>

      <TenantDirectory items={tenants} />
    </>
  );
}
