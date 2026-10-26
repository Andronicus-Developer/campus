import type { Metadata } from "next";
import { Plus, ShieldCheck, UserCog } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Roles & Permissions" };

const primaryButton =
  "inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-xs transition-opacity hover:opacity-95";

type PlatformRole = {
  name: string;
  description: string;
  memberCount: number;
  permissions: string[];
  system: boolean;
};

const platformRoles: PlatformRole[] = [
  {
    name: "Super Admin",
    description: "Full platform control — tenant lifecycle, billing, security and configuration.",
    memberCount: 1,
    system: true,
    permissions: [
      "platform.tenants.manage",
      "platform.billing.manage",
      "platform.users.manage",
      "platform.settings.manage",
      "platform.audit.view",
      "platform.support.access",
      "platform.flags.manage",
    ],
  },
  {
    name: "Support Agent",
    description: "Read tenant data, raise support access requests and respond to tickets.",
    memberCount: 2,
    system: true,
    permissions: [
      "platform.tenants.read",
      "platform.support.access.request",
      "platform.tickets.manage",
      "platform.audit.view",
    ],
  },
  {
    name: "Finance Ops",
    description: "View and export billing, invoices, payments and revenue reports.",
    memberCount: 1,
    system: true,
    permissions: [
      "platform.billing.view",
      "platform.payments.view",
      "platform.revenue.export",
      "platform.subscriptions.view",
    ],
  },
  {
    name: "Read Only",
    description: "View-only access to dashboards, analytics and tenant list. No mutations.",
    memberCount: 1,
    system: false,
    permissions: [
      "platform.dashboard.view",
      "platform.tenants.read",
      "platform.analytics.view",
    ],
  },
];

const allPermissions = [
  { key: "platform.tenants.manage",         description: "Create, suspend, reactivate and close tenants" },
  { key: "platform.tenants.read",           description: "View tenant profiles and usage data" },
  { key: "platform.billing.manage",         description: "Issue invoices, apply credits and manage billing" },
  { key: "platform.billing.view",           description: "View invoices and billing history" },
  { key: "platform.payments.view",          description: "View transaction log and reconciliation" },
  { key: "platform.revenue.export",         description: "Export financial and revenue reports" },
  { key: "platform.subscriptions.view",     description: "View subscription status and plan details" },
  { key: "platform.users.manage",           description: "Invite, suspend and manage operator accounts" },
  { key: "platform.settings.manage",        description: "Modify platform configuration and defaults" },
  { key: "platform.audit.view",             description: "Read the append-only audit log" },
  { key: "platform.support.access",         description: "Grant and revoke tenant support access sessions" },
  { key: "platform.support.access.request", description: "Request support access (requires approval)" },
  { key: "platform.tickets.manage",         description: "View, respond to and close support tickets" },
  { key: "platform.flags.manage",           description: "Enable, disable and scope feature flags" },
  { key: "platform.dashboard.view",         description: "Access overview dashboard and KPIs" },
  { key: "platform.analytics.view",         description: "View platform analytics pages" },
];

export default function RolesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Users & Security"
        title="Roles & permissions."
        description="Platform roles, permission catalogue and access policies for operator accounts."
        actions={
          <button type="button" className={primaryButton}>
            <Plus className="size-4" aria-hidden="true" />
            New role
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Platform roles"
          value={formatNumber(platformRoles.length)}
          hint="system + custom"
          icon={<UserCog className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Permissions defined"
          value={formatNumber(allPermissions.length)}
          hint="granular actions"
          icon={<ShieldCheck className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Custom roles"
          value={formatNumber(platformRoles.filter((r) => !r.system).length)}
          hint="non-system roles"
          icon={<UserCog className="size-5" aria-hidden="true" />}
        />
      </div>

      {/* Role cards */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {platformRoles.map((role) => (
          <div key={role.name} className="rounded-2xl border border-line bg-surface p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-base sm:text-lg font-bold text-ink">{role.name}</h2>
                    {role.system && (
                      <Pill tone="neutral">System</Pill>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{role.description}</p>
                </div>
                <span className="shrink-0 font-mono text-xs font-semibold text-ink-soft bg-surface-raised px-2.5 py-1 rounded-md">
                  {role.memberCount} member{role.memberCount !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {role.permissions.map((perm) => (
                  <span
                    key={perm}
                    className="rounded-lg border border-line bg-surface-raised px-2.5 py-1 font-mono text-xs font-semibold text-ink-soft"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
            {!role.system && (
              <div className="mt-6 border-t border-line pt-4 text-right">
                <button
                  type="button"
                  className="rounded-xl border border-line bg-surface px-4 py-1.5 text-xs font-bold text-ink-soft shadow-xs transition-colors hover:bg-surface-raised hover:text-ink"
                >
                  Edit role
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Permission catalogue */}
      <div className="mt-8">
        <Card
          title="Permission catalogue"
          description="All granular permissions available to platform roles."
        >
          <div className="overflow-x-auto -mx-6 -mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-raised/60">
                  {["Permission key", "Description", "Assigned to"].map((h) => (
                    <th
                      key={h}
                      className="py-4 px-6 text-left font-sans text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {allPermissions.map((perm) => {
                  const assignedRoles = platformRoles
                    .filter((r) => r.permissions.includes(perm.key))
                    .map((r) => r.name);
                  return (
                    <tr key={perm.key} className="transition-colors hover:bg-surface-raised/40">
                      <td className="py-4 px-6">
                        <span className="font-mono text-xs font-bold text-primary">{perm.key}</span>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-ink-soft">{perm.description}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1.5">
                          {assignedRoles.map((r) => (
                            <Pill key={r} tone="muted">{r}</Pill>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
