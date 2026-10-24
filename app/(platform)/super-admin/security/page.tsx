import type { Metadata } from "next";
import {
  AlertTriangle,
  Clock,
  Globe2,
  Lock,
  LogOut,
  Save,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Security & Access" };

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";
const primaryButton =
  "inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-xs font-medium text-paper transition-colors hover:bg-ink-soft";
const dangerButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-vermilion/30 bg-vermilion/10 px-4 text-xs font-medium text-vermilion-deep transition-colors hover:bg-vermilion/15";

type SessionRecord = {
  operator: string;
  ip: string;
  location: string;
  device: string;
  startedAt: string;
  current: boolean;
};

const sessions: SessionRecord[] = [
  { operator: "S. Adeyemi",   ip: "41.58.102.14",  location: "Lagos, NG",   device: "Chrome · macOS",   startedAt: "Today · 09:14",     current: true },
  { operator: "T. Mensah",    ip: "154.72.8.220",  location: "Accra, GH",   device: "Firefox · Windows", startedAt: "Today · 08:52",     current: false },
  { operator: "R. Kiptoo",    ip: "197.248.3.11",  location: "Nairobi, KE", device: "Safari · macOS",   startedAt: "Yesterday · 17:40", current: false },
  { operator: "A. Osei",      ip: "154.72.9.44",   location: "Accra, GH",   device: "Chrome · Windows", startedAt: "21 Oct · 11:05",    current: false },
];

const securityPolicies = [
  { label: "MFA required for Super Admin", enabled: true },
  { label: "MFA required for all operators", enabled: false },
  { label: "Session timeout (idle)", value: "60 min" },
  { label: "Max concurrent sessions per operator", value: "3" },
  { label: "Login rate limit", value: "10 attempts / 15 min" },
  { label: "Support access auto-expire", value: "60 min" },
  { label: "Audit sensitive actions", enabled: true },
  { label: "Re-auth for privileged operations", enabled: true },
];

const recentAlerts = [
  { event: "Failed login — 5 attempts", actor: "Unknown", ip: "91.108.4.200", time: "21 Oct · 23:44", tone: "warning" as const },
  { event: "Support session opened (unreviewed)", actor: "T. Mensah", ip: "154.72.8.220", time: "20 Oct · 14:12", tone: "neutral" as const },
  { event: "Operator account suspended", actor: "S. Adeyemi", ip: "41.58.102.14", time: "10 Oct · 09:30", tone: "critical" as const },
];

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Users & Security"
        title="Security & access."
        description="MFA status, active sessions, privileged access controls and suspicious activity."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              Run security check
            </button>
            <button type="button" className={primaryButton}>
              <Save className="size-3.5" aria-hidden="true" />
              Save policies
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Active sessions"
          value={formatNumber(sessions.length)}
          hint="platform operators"
          icon={<Globe2 className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="MFA enrolled"
          value="4 / 6"
          hint="operators with 2FA"
          icon={<ShieldCheck className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Security alerts"
          value={formatNumber(recentAlerts.length)}
          hint="last 30 days"
          icon={<AlertTriangle className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Session timeout"
          value="60 min"
          hint="idle auto-expire"
          icon={<Clock className="size-3.5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* Active sessions */}
        <Card title="Active sessions" description="Current authenticated operator sessions.">
          <ul className="divide-y divide-line">
            {sessions.map((session) => (
              <li
                key={`${session.operator}-${session.startedAt}`}
                className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <Globe2 className="size-4 shrink-0 text-ink-muted" aria-hidden="true" />
                  <div>
                    <p className="flex items-center gap-2 text-xs font-medium">
                      {session.operator}
                      {session.current && <Pill tone="positive">You</Pill>}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-ink-muted">
                      {session.ip} · {session.location}
                    </p>
                    <p className="font-mono text-[10px] text-ink-muted">{session.device}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-ink-muted">{session.startedAt}</span>
                  {!session.current && (
                    <button
                      type="button"
                      aria-label={`Revoke session for ${session.operator}`}
                      className="inline-flex size-7 items-center justify-center rounded-full border border-vermilion/30 text-vermilion-deep transition-colors hover:bg-vermilion/10"
                    >
                      <LogOut className="size-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-line pt-4">
            <button type="button" className={dangerButton}>
              <LogOut className="size-3.5" aria-hidden="true" />
              Revoke all other sessions
            </button>
          </div>
        </Card>

        {/* Security policies */}
        <Card title="Security policies" description="Platform-wide authentication and access rules.">
          <ul className="divide-y divide-line">
            {securityPolicies.map((policy) => (
              <li key={policy.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <span className="text-xs text-ink-soft">{policy.label}</span>
                {"enabled" in policy ? (
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      defaultChecked={policy.enabled}
                      className="peer sr-only"
                      aria-label={policy.label}
                    />
                    <div className="h-5 w-9 rounded-full bg-line transition-colors peer-checked:bg-pine after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-4" />
                  </label>
                ) : (
                  <span className="rounded-lg border border-line bg-paper px-2.5 py-1 font-mono text-[10px] text-ink-soft">
                    {policy.value}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Security alerts */}
      <div className="mt-6">
        <Card title="Recent security alerts" description="Suspicious activity and privileged events in the last 30 days.">
          {recentAlerts.length === 0 ? (
            <div className="flex items-center gap-2 text-xs text-pine">
              <ShieldCheck className="size-4" aria-hidden="true" />
              No security alerts in the last 30 days.
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {recentAlerts.map((alert) => (
                <li key={`${alert.event}-${alert.time}`} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    {alert.tone === "critical" ? (
                      <ShieldOff className="size-4 shrink-0 text-vermilion-deep" aria-hidden="true" />
                    ) : (
                      <AlertTriangle className="size-4 shrink-0 text-amber-600" aria-hidden="true" />
                    )}
                    <div>
                      <p className="text-xs font-medium">{alert.event}</p>
                      <p className="mt-0.5 font-mono text-[10px] text-ink-muted">
                        {alert.actor} · {alert.ip}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Pill tone={alert.tone}>{alert.tone}</Pill>
                    <span className="font-mono text-[10px] text-ink-muted">{alert.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-start gap-3">
          <Lock className="mt-0.5 size-4 shrink-0 text-ink-muted" aria-hidden="true" />
          <div>
            <p className="text-xs font-medium">Privileged operation re-authentication</p>
            <p className="mt-1 text-xs leading-6 text-ink-muted">
              Actions such as tenant suspension, support access grants, bulk exports and
              operator account changes require password re-confirmation regardless of active
              session age. This cannot be bypassed via API.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
