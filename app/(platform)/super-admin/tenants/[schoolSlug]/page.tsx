import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Ban,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  Globe2,
  GraduationCap,
  KeyRound,
  LifeBuoy,
  Mail,
  Package,
  Users,
} from "lucide-react";
import { Avatar, Card, Dot, KpiCard, Meter, PageHeader, Pill } from "@/components/platform/ui";
import {
  formatNumber,
  formatUsd,
  getTenant,
  healthMeta,
  planCatalog,
  severityMeta,
  supportSessions,
  tenantActivity,
  tenantMembers,
  tenantStatusMeta,
  tenants,
} from "@/lib/platform";

export function generateStaticParams() {
  return tenants.map((tenant) => ({ schoolSlug: tenant.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ schoolSlug: string }>;
}): Promise<Metadata> {
  const { schoolSlug } = await params;
  const tenant = getTenant(schoolSlug);
  return { title: tenant ? tenant.name : "School" };
}

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";
const dangerButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-danger/30 bg-danger/10 px-4 text-xs font-medium text-danger-deep transition-colors hover:bg-danger/15";

export default async function TenantDetailPage({
  params,
}: {
  params: Promise<{ schoolSlug: string }>;
}) {
  const { schoolSlug } = await params;
  const tenant = getTenant(schoolSlug);
  if (!tenant) notFound();

  const statusMeta = tenantStatusMeta[tenant.status];
  const health = healthMeta[tenant.health];
  const plan = planCatalog.find((entry) => entry.name === tenant.plan);
  const members = tenantMembers(tenant);
  const activity = tenantActivity(tenant);
  const liveSupport = supportSessions.find(
    (session) => session.slug === tenant.slug && session.status === "active",
  );
  const needsAttention =
    tenant.status === "past_due" || tenant.status === "suspended" || tenant.health === "at_risk";

  return (
    <>
      <Link
        href="/super-admin/tenants"
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        All schools
      </Link>

      <PageHeader
        eyebrow={tenant.region}
        title={tenant.name}
        description={`${tenant.plan} plan · ${tenant.campuses} ${tenant.campuses > 1 ? "campuses" : "campus"} · tenant since ${tenant.createdAt}`}
        actions={
          <>
            <Pill tone={statusMeta.tone}>{statusMeta.label}</Pill>
            <Pill tone={health.tone}>{health.label}</Pill>
            <button type="button" className={ghostButton}>
              <Package className="size-3.5" aria-hidden="true" />
              Change plan
            </button>
            <button type="button" className={ghostButton}>
              <LifeBuoy className="size-3.5" aria-hidden="true" />
              Start support access
            </button>
          </>
        }
      />

      {needsAttention ? (
        <div className="mb-6 flex flex-wrap items-start gap-3 rounded-2xl border border-danger/25 bg-danger/5 px-5 py-4">
          <Ban className="mt-0.5 size-4 shrink-0 text-danger-deep" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-danger-deep">
              {tenant.status === "suspended"
                ? "This tenant is suspended."
                : tenant.status === "past_due"
                  ? "Subscription payment is past due."
                  : "This account is flagged at risk."}
            </p>
            <p className="mt-1 text-xs leading-5 text-ink-soft">{tenant.notes}</p>
          </div>
        </div>
      ) : null}

      {liveSupport ? (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-warning/30 bg-warning-light px-5 py-4">
          <Dot tone="warning" />
          <p className="text-sm">
            <span className="font-semibold">{liveSupport.operator}</span> is viewing this
            workspace now — {liveSupport.reason}.
          </p>
          <Link href="/super-admin/support" className="ml-auto text-xs text-ink-muted hover:text-ink">
            Support access log
          </Link>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Students"
          value={formatNumber(tenant.students)}
          hint={tenant.studentLimit ? `limit ${formatNumber(tenant.studentLimit)}` : "unlimited"}
          icon={<GraduationCap className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Staff accounts"
          value={formatNumber(tenant.staff)}
          hint={tenant.staffLimit ? `limit ${formatNumber(tenant.staffLimit)}` : "unlimited"}
          icon={<Users className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Monthly revenue"
          value={tenant.monthlyRevenue > 0 ? formatUsd(tenant.monthlyRevenue) : "—"}
          hint={tenant.status === "trial" ? "trial — no charge" : `renews ${tenant.renewalDate}`}
          icon={<CreditCard className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Last activity"
          value={tenant.lastActivity}
          hint={tenant.trialEndsIn ? `trial ends in ${tenant.trialEndsIn}` : "within policy"}
          icon={<CalendarClock className="size-3.5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-4">
          <Card title="Subscription & usage" description="Plan entitlements and current consumption.">
            <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-primary/20 bg-primary-light p-4">
              <div>
                <p className="text-lg font-bold leading-tight">{tenant.plan}</p>
                <p className="mt-1 text-xs text-ink-muted">{plan?.tagline}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold leading-tight">
                  {tenant.monthlyRevenue > 0 ? `${formatUsd(tenant.monthlyRevenue)}/mo` : "Trial"}
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  {tenant.status === "trial" ? `Ends in ${tenant.trialEndsIn}` : `Renews ${tenant.renewalDate}`}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">Student seats</span>
                  <span className="font-mono text-ink-muted">
                    {formatNumber(tenant.students)}
                    {tenant.studentLimit ? ` / ${formatNumber(tenant.studentLimit)}` : " / unlimited"}
                  </span>
                </div>
                <div className="mt-2">
                  {tenant.studentLimit ? (
                    <Meter value={tenant.students} max={tenant.studentLimit} tone="success" />
                  ) : (
                    <Meter value={1} max={null} tone="success" />
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">Staff seats</span>
                  <span className="font-mono text-ink-muted">
                    {formatNumber(tenant.staff)}
                    {tenant.staffLimit ? ` / ${formatNumber(tenant.staffLimit)}` : " / unlimited"}
                  </span>
                </div>
                <div className="mt-2">
                  {tenant.staffLimit ? (
                    <Meter
                      value={tenant.staff}
                      max={tenant.staffLimit}
                      tone={tenant.staff >= tenant.staffLimit ? "warning" : "success"}
                    />
                  ) : (
                    <Meter value={1} max={null} tone="success" />
                  )}
                </div>
              </div>
            </div>

            <ul className="mt-5 grid gap-2 border-t border-line pt-4">
              {plan?.entitlements.map((entitlement) => (
                <li key={entitlement} className="flex items-center gap-2 text-xs text-ink-soft">
                  <CheckCircle2 className="size-3.5 shrink-0 text-success" aria-hidden="true" />
                  {entitlement}
                </li>
              ))}
            </ul>
          </Card>

          <Card
            title="Members"
            description="People with access to this workspace and the roles they hold."
            padded={false}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-canvas">
                  <tr className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-muted">
                    <th className="px-5 py-2.5 font-normal">Member</th>
                    <th className="px-3 py-2.5 font-normal">Role</th>
                    <th className="px-3 py-2.5 font-normal">Status</th>
                    <th className="px-5 py-2.5 font-normal">Last seen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {members.map((member) => (
                    <tr key={member.email}>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={member.name} className="size-7" />
                          <div className="min-w-0">
                            <span className="block truncate text-sm font-semibold">{member.name}</span>
                            <span className="block truncate font-mono text-[10px] text-ink-muted">{member.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-xs text-ink-soft">{member.role}</td>
                      <td className="px-3 py-3">
                        <Pill tone={member.status === "active" ? "positive" : "muted"}>
                          {member.status === "active" ? "Active" : "Invited"}
                        </Pill>
                      </td>
                      <td className="px-5 py-3 text-xs text-ink-muted">{member.lastSeen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Activity timeline" description="Subscription, access and audit events for this tenant.">
            <ol className="relative border-l border-line pl-5">
              {activity.map((event) => {
                const meta = severityMeta[event.severity];
                return (
                  <li key={event.id} className="relative pb-5 last:pb-0">
                    <span className="absolute -left-[26px] top-1 grid size-3.5 place-items-center rounded-full border-2 border-surface bg-canvas">
                      <Dot tone={meta.tone} />
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold">{event.action}</span>
                      <Pill tone={meta.tone}>{meta.label}</Pill>
                    </div>
                    <p className="mt-1 text-xs text-ink-soft">{event.target}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
                      {event.actor} · {event.time}
                    </p>
                    {event.reason ? (
                      <p className="mt-1.5 rounded-xl bg-canvas px-3 py-1.5 text-[11px] leading-5 text-ink-soft">
                        {event.reason}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card title="School profile">
            <dl className="space-y-3.5 text-sm">
              {[
                { icon: Globe2,        label: "Region",             value: tenant.region                        },
                { icon: CalendarClock, label: "Timezone & currency",value: `${tenant.timezone} · ${tenant.currency}` },
                { icon: Users,         label: "Tenant slug",        value: tenant.slug,      mono: true          },
              ].map(({ icon: Icon, label, value, mono }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-4 shrink-0 text-ink-muted" aria-hidden="true" />
                  <div>
                    <dt className="text-xs text-ink-muted">{label}</dt>
                    <dd className={mono ? "font-mono text-xs" : ""}>{value}</dd>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-ink-muted" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="text-xs text-ink-muted">Primary contact</dt>
                  <dd className="truncate">{tenant.owner}</dd>
                  <dd className="truncate font-mono text-[10px] text-ink-muted">{tenant.ownerEmail}</dd>
                </div>
              </div>
            </dl>
            <div className="mt-4 border-t border-line pt-4">
              <Link
                href={`/super-admin/tenants/${tenant.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-primary"
              >
                <ExternalLink className="size-3.5" aria-hidden="true" />
                Open tenant workspace
              </Link>
            </div>
          </Card>

          <Card title="Operator actions" description="Every privileged action records a reason in the audit log.">
            <div className="flex flex-wrap gap-2">
              <button type="button" className={ghostButton}>
                <Package className="size-3.5" aria-hidden="true" />
                Change plan
              </button>
              {tenant.status === "trial" ? (
                <button type="button" className={ghostButton}>
                  <CalendarClock className="size-3.5" aria-hidden="true" />
                  Extend trial
                </button>
              ) : null}
              <button type="button" className={ghostButton}>
                <KeyRound className="size-3.5" aria-hidden="true" />
                Reset owner access
              </button>
              <button type="button" className={ghostButton}>
                <LifeBuoy className="size-3.5" aria-hidden="true" />
                Start support access
              </button>
              {tenant.status === "suspended" ? (
                <button type="button" className={ghostButton}>
                  <CheckCircle2 className="size-3.5" aria-hidden="true" />
                  Reactivate tenant
                </button>
              ) : (
                <button type="button" className={dangerButton}>
                  <Ban className="size-3.5" aria-hidden="true" />
                  Suspend tenant
                </button>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="action-reason" className="block font-mono text-[9px] font-bold uppercase tracking-widest text-ink-muted">
                Reason (required)
              </label>
              <textarea
                id="action-reason"
                name="reason"
                rows={3}
                placeholder="Explain why this action is being taken — stored with your name and timestamp."
                className="mt-2 w-full resize-y rounded-xl border border-line bg-canvas p-3 text-xs leading-5 outline-none placeholder:text-ink-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </Card>

          <Card title="Internal notes" description="Visible only to platform operators.">
            <p className="text-sm leading-6 text-ink-soft">
              {tenant.notes ?? "No notes recorded for this tenant yet."}
            </p>
            <ul className="mt-4 space-y-2 border-t border-line pt-4">
              {supportSessions
                .filter((session) => session.slug === tenant.slug)
                .map((session) => (
                  <li key={session.id} className="flex items-start gap-2 text-[11px] leading-5 text-ink-muted">
                    <Dot tone={session.status === "active" ? "warning" : "muted"} />
                    {session.operator} — {session.reason} · {session.startedAt}
                  </li>
                ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
