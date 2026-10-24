import type { Metadata } from "next";
import { AlertTriangle, Download, ScrollText, ShieldAlert, Users } from "lucide-react";
import { Card, KpiCard, PageHeader } from "@/components/platform/ui";
import { AuditFeed } from "@/components/platform/audit-feed";
import { auditEvents, formatNumber } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Audit log",
};

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";

const criticalCount = auditEvents.filter((event) => event.severity === "critical").length;
const warningCount = auditEvents.filter((event) => event.severity === "warning").length;
const distinctActors = new Set(auditEvents.map((event) => event.actor)).size;

export default function AuditPage() {
  return (
    <>
      <PageHeader
        eyebrow="Governance"
        title="Platform audit log."
        description="Every privileged action — suspensions, plan changes, support access, exports — is recorded with actor, time, IP and reason."
        actions={
          <button type="button" className={ghostButton}>
            <Download className="size-3.5" aria-hidden="true" />
            Export audit trail
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Events (last 48h)"
          value={formatNumber(auditEvents.length)}
          hint="append-only"
          icon={<ScrollText className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Critical events"
          value={formatNumber(criticalCount)}
          hint="require review"
          icon={<ShieldAlert className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Warnings"
          value={formatNumber(warningCount)}
          hint="dunning & support access"
          icon={<AlertTriangle className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Distinct actors"
          value={formatNumber(distinctActors)}
          hint="operators and automation"
          icon={<Users className="size-3.5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-6">
        <AuditFeed events={auditEvents} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card title="What gets logged" description="Sensitive actions captured by default.">
          <ul className="space-y-2.5 text-xs text-ink-soft">
            <li>Tenant create, suspend, reactivate and close</li>
            <li>Plan and entitlement changes</li>
            <li>Support access sessions, with reason and duration</li>
            <li>Role and permission changes</li>
            <li>Student-data exports and bulk operations</li>
            <li>Feature flag and platform configuration changes</li>
            <li>Payment webhook replays and reconciliation</li>
          </ul>
        </Card>

        <Card title="Retention & integrity">
          <p className="text-xs leading-6 text-ink-soft">
            Audit entries are append-only: operators can add records but never edit or
            delete them. Records are retained for 24 months, then archived to private
            storage with signed-URL access only.
          </p>
        </Card>

        <Card title="Support access policy">
          <p className="text-xs leading-6 text-ink-soft">
            Support access requires a written reason, expires automatically after 60
            minutes, and is visible to the tenant&apos;s own administrators. Privileged
            access can be revoked immediately at the database level.
          </p>
        </Card>
      </div>
    </>
  );
}
