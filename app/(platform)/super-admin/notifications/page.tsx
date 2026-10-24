import type { Metadata } from "next";
import { Bell, CheckCheck, Settings2 } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Notifications" };

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";

type NotifStatus = "delivered" | "pending" | "failed" | "read";
type NotifType   = "system" | "billing" | "security" | "support" | "announcement";

type NotifRecord = {
  id: string;
  title: string;
  recipient: string;
  type: NotifType;
  status: NotifStatus;
  channel: "in-app" | "email";
  createdAt: string;
};

const statusMeta: Record<NotifStatus, { tone: "positive" | "neutral" | "critical" | "muted" }> = {
  delivered: { tone: "positive" },
  read:      { tone: "muted" },
  pending:   { tone: "neutral" },
  failed:    { tone: "critical" },
};

const typeMeta: Record<NotifType, { tone: "neutral" | "warning" | "critical" | "muted" | "positive" }> = {
  system:       { tone: "neutral" },
  billing:      { tone: "warning" as "neutral" },
  security:     { tone: "critical" },
  support:      { tone: "neutral" },
  announcement: { tone: "muted" },
};

const notifications: NotifRecord[] = [
  { id: "ntf-8821", title: "Support session opened for Greenfield Academy", recipient: "S. Adeyemi", type: "security", status: "read", channel: "in-app", createdAt: "22 Oct · 11:02" },
  { id: "ntf-8820", title: "Invoice overdue — Horizon International", recipient: "R. Kiptoo", type: "billing", status: "delivered", channel: "in-app", createdAt: "22 Oct · 09:00" },
  { id: "ntf-8819", title: "Trial ending in 3 days — Al-Noor Academy", recipient: "T. Mensah", type: "billing", status: "delivered", channel: "email", createdAt: "21 Oct · 08:00" },
  { id: "ntf-8818", title: "Failed login attempt — 5 tries from unknown IP", recipient: "S. Adeyemi", type: "security", status: "read", channel: "in-app", createdAt: "21 Oct · 23:44" },
  { id: "ntf-8817", title: "New ticket escalated — TKT-0436", recipient: "S. Adeyemi", type: "support", status: "delivered", channel: "in-app", createdAt: "20 Oct · 09:00" },
  { id: "ntf-8816", title: "Maintenance announcement published to all tenants", recipient: "All operators", type: "announcement", status: "delivered", channel: "in-app", createdAt: "18 Oct · 12:00" },
  { id: "ntf-8815", title: "Paystack webhook signature validation failed", recipient: "S. Adeyemi", type: "system", status: "failed", channel: "email", createdAt: "15 Oct · 04:22" },
];

const deliveredCount = notifications.filter((n) => n.status === "delivered" || n.status === "read").length;
const failedCount    = notifications.filter((n) => n.status === "failed").length;
const unreadCount    = notifications.filter((n) => n.status === "delivered").length;

const notifRules = [
  { event: "Invoice overdue",         channels: ["In-app", "Email"], recipients: "Finance Ops, Super Admin" },
  { event: "Failed login spike",       channels: ["In-app"],          recipients: "Super Admin" },
  { event: "Support access opened",   channels: ["In-app"],          recipients: "Super Admin" },
  { event: "Trial ending (3 days)",   channels: ["In-app", "Email"], recipients: "Support Agent" },
  { event: "Webhook validation fail", channels: ["Email"],           recipients: "Super Admin" },
  { event: "Ticket escalated",        channels: ["In-app"],          recipients: "Super Admin, Support Agent" },
];

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support & Communication"
        title="Notifications."
        description="In-app notification feed, delivery status and platform-wide notification rules."
        actions={
          <button type="button" className={ghostButton}>
            <Settings2 className="size-3.5" aria-hidden="true" />
            Notification rules
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Delivered (7d)" value={formatNumber(deliveredCount)} hint="in-app + email" icon={<Bell className="size-3.5" aria-hidden="true" />} />
        <KpiCard label="Unread" value={formatNumber(unreadCount)} hint="awaiting action" icon={<Bell className="size-3.5" aria-hidden="true" />} />
        <KpiCard label="Failed" value={formatNumber(failedCount)} hint="delivery errors" icon={<Bell className="size-3.5" aria-hidden="true" />} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card title="Notification feed" description="Recent notifications for all platform operators.">
          <ul className="divide-y divide-line">
            {notifications.map((n) => (
              <li key={n.id} className="flex flex-wrap items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <Bell className="mt-0.5 size-4 shrink-0 text-ink-muted" aria-hidden="true" />
                  <div>
                    <p className={`text-xs ${n.status === "read" ? "text-ink-muted" : "font-medium text-ink"}`}>
                      {n.title}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-ink-muted">
                      {n.recipient} · {n.channel} · {n.createdAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Pill tone={typeMeta[n.type].tone}>{n.type}</Pill>
                  <Pill tone={statusMeta[n.status].tone}>{n.status}</Pill>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-line pt-4">
            <button type="button" className={ghostButton}>
              <CheckCheck className="size-3.5" aria-hidden="true" />
              Mark all read
            </button>
          </div>
        </Card>

        <Card title="Notification rules" description="Which events trigger notifications and to whom.">
          <ul className="divide-y divide-line">
            {notifRules.map((rule) => (
              <li key={rule.event} className="py-3 first:pt-0 last:pb-0">
                <p className="text-xs font-medium">{rule.event}</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {rule.channels.map((ch) => (
                    <Pill key={ch} tone="muted">{ch}</Pill>
                  ))}
                </div>
                <p className="mt-1 text-[11px] text-ink-muted">→ {rule.recipients}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
