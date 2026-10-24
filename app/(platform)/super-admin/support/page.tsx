import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, KeyRound, LifeBuoy, ShieldCheck, Smartphone } from "lucide-react";
import { Avatar, Card, Dot, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber, operators, supportSessions } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Support access",
};

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";
const dangerButton =
  "inline-flex h-8 items-center gap-2 rounded-full border border-vermilion/30 bg-vermilion/10 px-3 text-xs font-medium text-vermilion-deep transition-colors hover:bg-vermilion/15";

const activeSessions = supportSessions.filter((session) => session.status === "active");
const mfaCount = operators.filter((operator) => operator.mfa).length;

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Governance"
        title="Support access & impersonation."
        description="Operators can view a tenant workspace only through a time-boxed support session that requires a reason and is visible to that school's administrators."
        actions={
          <button type="button" className={ghostButton}>
            <LifeBuoy className="size-3.5" aria-hidden="true" />
            Start session
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Active sessions"
          value={formatNumber(activeSessions.length)}
          hint="auto-expire in 60 min"
          icon={<LifeBuoy className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Sessions this week"
          value={formatNumber(supportSessions.length)}
          hint="all with a written reason"
          icon={<Clock3 className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Average duration"
          value="20 min"
          hint="longest 42 min"
          icon={<Clock3 className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Operators with MFA"
          value={`${mfaCount}/${operators.length}`}
          hint="MFA required to start a session"
          icon={<Smartphone className="size-3.5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-4">
          <Card
            title="Session history"
            description="Every privileged session, with who, why and for how long."
            padded={false}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-sand/50">
                  <tr className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                    <th className="px-5 py-2.5 font-normal">Operator</th>
                    <th className="px-3 py-2.5 font-normal">School</th>
                    <th className="px-3 py-2.5 font-normal">Reason</th>
                    <th className="px-3 py-2.5 font-normal">Started</th>
                    <th className="px-3 py-2.5 font-normal">Duration</th>
                    <th className="px-5 py-2.5 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {supportSessions.map((session) => (
                    <tr key={session.id} className="transition-colors hover:bg-sand/30">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={session.operator} className="size-7" />
                          <div>
                            <span className="block text-xs font-medium">{session.operator}</span>
                            <span className="block text-[10px] text-ink-muted">
                              {session.operatorRole}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <Link
                          href={`/super-admin/tenants/${session.slug}`}
                          className="text-xs font-medium hover:underline"
                        >
                          {session.school}
                        </Link>
                      </td>
                      <td className="px-3 py-3 max-w-[220px] text-[11px] leading-5 text-ink-muted">
                        {session.reason}
                      </td>
                      <td className="px-3 py-3 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
                        {session.startedAt}
                      </td>
                      <td className="px-3 py-3 font-mono text-xs">{session.duration}</td>
                      <td className="px-5 py-3">
                        {session.status === "active" ? (
                          <div className="flex items-center gap-2">
                            <Pill tone="warning">Active</Pill>
                            <button type="button" className={dangerButton}>
                              End
                            </button>
                          </div>
                        ) : (
                          <Pill tone="muted">Ended</Pill>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card
            title="Platform operators"
            description="Who can hold privileged access. Revocation takes effect immediately."
            padded={false}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-sand/50">
                  <tr className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                    <th className="px-5 py-2.5 font-normal">Operator</th>
                    <th className="px-3 py-2.5 font-normal">Role</th>
                    <th className="px-3 py-2.5 font-normal">MFA</th>
                    <th className="px-5 py-2.5 font-normal">Last active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {operators.map((operator) => (
                    <tr key={operator.email}>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={operator.name} className="size-7" />
                          <div className="min-w-0">
                            <span className="block truncate text-xs font-medium">
                              {operator.name}
                            </span>
                            <span className="block truncate font-mono text-[10px] text-ink-muted">
                              {operator.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-xs text-ink-soft">{operator.role}</td>
                      <td className="px-3 py-3">
                        <Pill tone={operator.mfa ? "positive" : "critical"}>
                          {operator.mfa ? "Enabled" : "Missing"}
                        </Pill>
                      </td>
                      <td className="px-5 py-3 text-xs text-ink-muted">{operator.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card title="How a session works">
            <ol className="space-y-4">
              {[
                "Operator selects a school and writes the reason for access.",
                "The session is time-boxed to 60 minutes and can be ended at any time.",
                "The school's own administrators can see that support is viewing the workspace.",
                "Start and end are both written to the platform audit log with an IP address.",
              ].map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 font-mono text-[10px] text-vermilion">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs leading-6 text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
          </Card>

          <Card title="Guardrails">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <KeyRound className="mt-0.5 size-4 shrink-0 text-pine" aria-hidden="true" />
                <span className="text-xs leading-6 text-ink-soft">
                  No shared administrator accounts — every operator signs in as themselves
                  with MFA.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-pine" aria-hidden="true" />
                <span className="text-xs leading-6 text-ink-soft">
                  Support access never bypasses tenant boundaries; row-level security still
                  applies to every query.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Dot tone="critical" />
                <span className="text-xs leading-6 text-ink-soft">
                  Privileges are verified against the database on each request, so
                  revocation is immediate — no waiting for a token to expire.
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
