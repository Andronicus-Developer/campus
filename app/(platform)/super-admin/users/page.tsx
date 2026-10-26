import type { Metadata } from "next";
import { Download, Plus, ShieldCheck, UserCog, Users } from "lucide-react";
import { Avatar, Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Platform Users" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink-soft shadow-xs transition-colors hover:bg-surface-raised hover:text-ink";
const primaryButton =
  "inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-xs transition-opacity hover:opacity-95";

type OperatorStatus = "active" | "invited" | "suspended";
type OperatorRole = "Super Admin" | "Support Agent" | "Finance Ops" | "Read Only";

type Operator = {
  id: string;
  name: string;
  email: string;
  role: OperatorRole;
  status: OperatorStatus;
  mfa: boolean;
  lastLogin: string;
  createdAt: string;
};

const statusMeta: Record<OperatorStatus, { tone: "positive" | "warning" | "critical" }> = {
  active:    { tone: "positive" },
  invited:   { tone: "warning" },
  suspended: { tone: "critical" },
};

const operators: Operator[] = [
  { id: "op-001", name: "S. Adeyemi",     email: "s.adeyemi@campus360.io",   role: "Super Admin",    status: "active",    mfa: true,  lastLogin: "Today · 09:14",       createdAt: "Jan 2025" },
  { id: "op-002", name: "T. Mensah",      email: "t.mensah@campus360.io",    role: "Support Agent",  status: "active",    mfa: true,  lastLogin: "Today · 08:52",       createdAt: "Mar 2025" },
  { id: "op-003", name: "R. Kiptoo",      email: "r.kiptoo@campus360.io",    role: "Finance Ops",    status: "active",    mfa: true,  lastLogin: "Yesterday · 17:40",   createdAt: "Jun 2025" },
  { id: "op-004", name: "A. Osei",        email: "a.osei@campus360.io",      role: "Support Agent",  status: "active",    mfa: false, lastLogin: "21 Oct · 11:05",      createdAt: "Aug 2025" },
  { id: "op-005", name: "C. Nwosu",       email: "c.nwosu@campus360.io",     role: "Read Only",      status: "invited",   mfa: false, lastLogin: "—",                   createdAt: "22 Oct 2026" },
  { id: "op-006", name: "L. Fernandez",   email: "l.fernandez@campus360.io", role: "Support Agent",  status: "suspended", mfa: true,  lastLogin: "10 Oct · 16:22",      createdAt: "Feb 2025" },
];

const activeCount   = operators.filter((o) => o.status === "active").length;
const mfaCount      = operators.filter((o) => o.mfa).length;
const invitedCount  = operators.filter((o) => o.status === "invited").length;

export default function UsersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Users & Security"
        title="Platform users."
        description="Super Admins, platform staff and support agents with access to the operator console."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <Download className="size-4" aria-hidden="true" />
              Export
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-4" aria-hidden="true" />
              Invite operator
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Active operators"
          value={formatNumber(activeCount)}
          hint="can access console"
          icon={<Users className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="MFA enrolled"
          value={`${mfaCount} / ${operators.length}`}
          hint="2-factor active"
          icon={<ShieldCheck className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Pending invites"
          value={formatNumber(invitedCount)}
          hint="awaiting sign-up"
          icon={<UserCog className="size-5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-8">
        <Card title="Operator accounts" description="All platform-level user accounts and their current status.">
          <div className="overflow-x-auto -mx-6 -mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-raised/60">
                  {["Operator", "Role", "MFA", "Status", "Last login", "Member since", ""].map((h) => (
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
                {operators.map((op) => (
                  <tr key={op.id} className="transition-colors hover:bg-surface-raised/40">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <Avatar name={op.name} className="size-9 shrink-0" />
                        <div>
                          <p className="font-bold text-ink text-sm sm:text-base">{op.name}</p>
                          <p className="text-xs font-medium text-ink-muted mt-0.5">{op.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Pill tone="neutral">{op.role}</Pill>
                    </td>
                    <td className="py-4 px-6">
                      {op.mfa ? (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-success">
                          <ShieldCheck className="size-4" aria-hidden="true" />
                          On
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-danger">Off</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <Pill tone={statusMeta[op.status].tone}>{op.status}</Pill>
                    </td>
                    <td className="py-4 px-6 text-xs font-medium text-ink-muted">{op.lastLogin}</td>
                    <td className="py-4 px-6 text-xs font-medium text-ink-muted">{op.createdAt}</td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        className="rounded-xl border border-line bg-surface px-4 py-1.5 text-xs font-bold text-ink-soft shadow-xs transition-colors hover:bg-surface-raised hover:text-ink"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 shadow-xs">
        <div className="flex items-start gap-3.5">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-ink-soft">
            <span className="font-bold text-ink">MFA not enforced for all operators.</span>{" "}
            {operators.length - mfaCount} operator{operators.length - mfaCount !== 1 ? "s do" : " does"} not have
            multi-factor authentication enabled. Consider requiring MFA for all platform accounts
            in <a href="/super-admin/security" className="font-bold underline hover:text-ink">Security & Access</a>.
          </p>
        </div>
      </div>
    </>
  );
}
