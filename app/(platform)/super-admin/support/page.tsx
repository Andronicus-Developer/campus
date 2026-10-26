import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, KeyRound, LifeBuoy, ShieldCheck, Smartphone } from "lucide-react";
import { Avatar, Card, Dot, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber, operators, supportSessions } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Support access",
};

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink hover:bg-surface-raised transition-all shadow-xs";
const dangerButton =
  "inline-flex h-9 items-center gap-2 rounded-xl border border-vermilion/30 bg-vermilion/10 px-4 text-xs font-bold text-vermilion-deep transition-all hover:bg-vermilion/20 shadow-xs";

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
            <LifeBuoy className="size-4" aria-hidden="true" />
            Start session
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Active sessions"
          value={formatNumber(activeSessions.length)}
          hint="auto-expire in 60 min"
          icon={<LifeBuoy className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Sessions this week"
          value={formatNumber(supportSessions.length)}
          hint="all with a written reason"
          icon={<Clock3 className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Average duration"
          value="20 min"
          hint="longest 42 min"
          icon={<Clock3 className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Operators with MFA"
          value={`${mfaCount}/${operators.length}`}
          hint="MFA required to start a session"
          icon={<Smartphone className="size-5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <Card
            title="Session history"
            description="Every privileged session, with who, why and for how long."
            padded={false}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-line bg-surface-raised/60">
                  <tr className="font-sans text-xs font-bold uppercase tracking-wider text-slate-700">
                    <th className="py-4 px-6">Operator</th>
                    <th className="py-4 px-6">School</th>
                    <th className="py-4 px-6">Reason</th>
                    <th className="py-4 px-6">Started</th>
                    <th className="py-4 px-6">Duration</th>
                    <th className="py-4 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {supportSessions.map((session) => (
                    <tr key={session.id} className="transition-colors hover:bg-sand/20">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Avatar name={session.operator} className="size-9 ring-1 ring-line" />
                          <div>
                            <span className="block text-sm sm:text-base font-bold text-ink">{session.operator}</span>
                            <span className="block text-xs font-medium text-ink-muted">
                              {session.operatorRole}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Link
                          href={`/super-admin/tenants/${session.slug}`}
                          className="text-sm sm:text-base font-bold text-primary hover:underline"
                        >
                          {session.school}
                        </Link>
                      </td>
                      <td className="py-4 px-6 max-w-[220px] text-sm leading-relaxed text-ink-soft">
                        {session.reason}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs font-semibold text-ink-muted">
                        {session.startedAt}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs font-bold text-ink">{session.duration}</td>
                      <td className="py-4 px-6">
                        {session.status === "active" ? (
                          <div className="flex items-center gap-2.5">
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
              <table className="w-full text-left">
                <thead className="border-b border-line bg-surface-raised/60">
                  <tr className="font-sans text-xs font-bold uppercase tracking-wider text-slate-700">
                    <th className="py-4 px-6">Operator</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">MFA</th>
                    <th className="py-4 px-6">Last active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {operators.map((operator) => (
                    <tr key={operator.email} className="transition-colors hover:bg-sand/20">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <Avatar name={operator.name} className="size-9 ring-1 ring-line" />
                          <div className="min-w-0">
                            <span className="block truncate text-sm sm:text-base font-bold text-ink">
                              {operator.name}
                            </span>
                            <span className="block truncate font-mono text-xs font-semibold text-primary">
                              {operator.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm font-bold text-ink-soft">{operator.role}</td>
                      <td className="py-4 px-6">
                        <Pill tone={operator.mfa ? "positive" : "critical"}>
                          {operator.mfa ? "Enabled" : "Missing"}
                        </Pill>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-ink-muted">{operator.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card title="How a session works">
            <ol className="space-y-4">
              {[
                "Operator selects a school and writes the reason for access.",
                "The session is time-boxed to 60 minutes and can be ended at any time.",
                "The school's own administrators can see that support is viewing the workspace.",
                "Start and end are both written to the platform audit log with an IP address.",
              ].map((step, index) => (
                <li key={step} className="flex gap-3.5">
                  <span className="mt-0.5 font-mono text-xs font-black text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
          </Card>

          <Card title="Guardrails">
            <ul className="space-y-4">
              <li className="flex items-start gap-3.5">
                <KeyRound className="mt-0.5 size-5 shrink-0 text-pine" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-ink-soft">
                  No shared administrator accounts — every operator signs in as themselves
                  with MFA.
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-pine" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-ink-soft">
                  Support access never bypasses tenant boundaries; row-level security still
                  applies to every query.
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <Dot tone="critical" />
                <span className="text-sm leading-relaxed text-ink-soft">
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
