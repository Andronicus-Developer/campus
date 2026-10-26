import type { Metadata } from "next";
import { Download, Plus } from "lucide-react";
import { PageHeader, Pill } from "@/components/platform/ui";
import { TenantDirectory } from "@/components/platform/tenant-directory";
import { directoryTotal, formatNumber, platformStats, tenants } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Schools",
};

const ghostButton =
  "inline-flex h-11 items-center gap-2.5 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink-soft transition-all hover:border-primary/40 hover:bg-primary-light hover:text-primary shadow-xs cursor-pointer";
const primaryButton =
  "inline-flex h-11 items-center gap-2.5 rounded-xl bg-primary hover:bg-primary-hover px-6 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all cursor-pointer";

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
        eyebrow="Tenant Directory"
        title="Every School on the Platform"
        description={`${formatNumber(directoryTotal)} tenants in total. Search, filter and drill into any school to inspect its subscription, seats, members and audit history.`}
        actions={
          <>
            <button type="button" className={ghostButton}>
              <Download className="size-4" aria-hidden="true" />
              Export CSV
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-4" aria-hidden="true" />
              Provision School
            </button>
          </>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        {summary.map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-2.5 shadow-xs"
          >
            <Pill tone={item.tone}>{item.label}</Pill>
            <span className="font-sans text-sm font-bold text-ink">{formatNumber(item.value)}</span>
          </span>
        ))}
      </div>

      <TenantDirectory items={tenants} />
    </>
  );
}

