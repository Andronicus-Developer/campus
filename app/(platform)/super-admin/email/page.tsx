import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, Mail, RefreshCw, Send } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Email Templates & Delivery" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink hover:bg-surface-raised transition-all shadow-xs";

type TemplateStatus = "active" | "draft" | "deprecated";
type DeliveryStatus = "delivered" | "bounced" | "failed" | "pending";

type EmailTemplate = {
  id: string;
  name: string;
  trigger: string;
  subject: string;
  status: TemplateStatus;
  lastSent: string | null;
};

type DeliveryLog = {
  id: string;
  template: string;
  recipient: string;
  school: string;
  status: DeliveryStatus;
  sentAt: string;
  attempts: number;
};

const templateStatusMeta: Record<TemplateStatus, { tone: "positive" | "muted" | "neutral" }> = {
  active:     { tone: "positive" },
  draft:      { tone: "muted" },
  deprecated: { tone: "neutral" },
};

const deliveryStatusMeta: Record<DeliveryStatus, { tone: "positive" | "critical" | "warning" | "neutral" }> = {
  delivered: { tone: "positive" },
  bounced:   { tone: "critical" },
  failed:    { tone: "critical" },
  pending:   { tone: "neutral" },
};

const templates: EmailTemplate[] = [
  { id: "tpl-001", name: "Welcome — school owner",       trigger: "Tenant provisioned",         subject: "Welcome to Campus360",                status: "active",     lastSent: "22 Oct 2026" },
  { id: "tpl-002", name: "Invoice issued",               trigger: "Invoice created",             subject: "Your invoice is ready",               status: "active",     lastSent: "22 Oct 2026" },
  { id: "tpl-003", name: "Payment confirmed",            trigger: "Payment webhook success",     subject: "Payment received — thank you",        status: "active",     lastSent: "22 Oct 2026" },
  { id: "tpl-004", name: "Payment failed",               trigger: "Payment webhook failed",      subject: "Action required: payment failed",     status: "active",     lastSent: "21 Oct 2026" },
  { id: "tpl-005", name: "Trial ending reminder",        trigger: "Trial T-3 days (Inngest)",    subject: "Your trial ends in 3 days",           status: "active",     lastSent: "21 Oct 2026" },
  { id: "tpl-006", name: "Trial expired",                trigger: "Trial ended",                 subject: "Your trial has ended",                status: "active",     lastSent: "18 Oct 2026" },
  { id: "tpl-007", name: "Subscription suspended",       trigger: "Dunning — suspension",        subject: "Your account has been suspended",     status: "active",     lastSent: "10 Oct 2026" },
  { id: "tpl-008", name: "Support access notification",  trigger: "Support session opened",      subject: "A support session was opened",        status: "active",     lastSent: "20 Oct 2026" },
  { id: "tpl-009", name: "Password reset (operator)",    trigger: "Operator reset request",      subject: "Reset your password",                 status: "active",     lastSent: "15 Oct 2026" },
  { id: "tpl-010", name: "Legacy welcome (v1)",          trigger: "Deprecated",                  subject: "Welcome (old)",                       status: "deprecated", lastSent: "01 Jun 2026" },
];

const deliveryLogs: DeliveryLog[] = [
  { id: "eml-4401", template: "Invoice issued",        recipient: "d.okafor@greenfield.edu", school: "Greenfield",   status: "delivered", sentAt: "22 Oct · 09:01", attempts: 1 },
  { id: "eml-4400", template: "Payment confirmed",     recipient: "k.asante@pinnacle.edu",   school: "Pinnacle",     status: "delivered", sentAt: "22 Oct · 08:44", attempts: 1 },
  { id: "eml-4399", template: "Payment failed",        recipient: "m.njeru@horizon.edu",     school: "Horizon",      status: "delivered", sentAt: "21 Oct · 17:02", attempts: 1 },
  { id: "eml-4398", template: "Trial ending reminder", recipient: "f.bashir@alnoor.edu",     school: "Al-Noor",      status: "delivered", sentAt: "21 Oct · 08:00", attempts: 1 },
  { id: "eml-4397", template: "Invoice issued",        recipient: "c.hughes@westprep.co.uk", school: "Westminster",  status: "bounced",   sentAt: "20 Oct · 09:01", attempts: 3 },
  { id: "eml-4396", template: "Welcome — school owner",recipient: "r.patel@galaxy.in",       school: "Galaxy",       status: "delivered", sentAt: "19 Oct · 14:30", attempts: 1 },
];

const deliveredCount = deliveryLogs.filter((l) => l.status === "delivered").length;
const bouncedCount   = deliveryLogs.filter((l) => l.status === "bounced").length;
const activeTemplates = templates.filter((t) => t.status === "active").length;

export default function EmailPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support & Communication"
        title="Email templates & delivery."
        description="Transactional email templates, delivery status, bounces, retries and Resend provider status."
        actions={
          <button type="button" className={ghostButton}>
            <RefreshCw className="size-4" aria-hidden="true" />
            Sync Resend
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Active templates" value={formatNumber(activeTemplates)} hint="live and sending" icon={<Mail className="size-5" aria-hidden="true" />} />
        <KpiCard label="Delivered (7d)" value={formatNumber(deliveredCount)} hint="confirmed received" icon={<Send className="size-5" aria-hidden="true" />} />
        <KpiCard label="Bounces" value={formatNumber(bouncedCount)} hint="require review" icon={<AlertTriangle className="size-5" aria-hidden="true" />} />
      </div>

      {/* Provider status */}
      <div className="mt-8 rounded-2xl border border-line bg-surface p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Mail className="size-6 text-primary shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm sm:text-base font-bold text-ink">Resend — email provider</p>
              <p className="mt-0.5 text-xs font-semibold text-ink-muted">Transactional + bulk delivery · domain verified</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-pine">
              <CheckCircle2 className="size-4" aria-hidden="true" />
              Operational
            </div>
            <span className="font-mono text-xs font-bold text-ink-muted">99.4% delivery · 0 queued</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Templates */}
        <Card title="Email templates" description="All transactional templates and their trigger events.">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line bg-surface-raised/60">
                  {["Template", "Trigger", "Status", "Last sent", ""].map((h) => (
                    <th key={h} className="py-4 px-6 font-sans text-xs font-bold uppercase tracking-wider text-slate-700 last:text-right">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {templates.map((tpl) => (
                  <tr key={tpl.id} className="hover:bg-sand/20 transition-colors">
                    <td className="py-4 px-6">
                      <p className="text-sm sm:text-base font-bold text-ink">{tpl.name}</p>
                      <p className="text-xs font-medium text-ink-muted mt-0.5">{tpl.subject}</p>
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-ink-soft">{tpl.trigger}</td>
                    <td className="py-4 px-6">
                      <Pill tone={templateStatusMeta[tpl.status].tone}>{tpl.status}</Pill>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-ink-muted">{tpl.lastSent ?? "—"}</td>
                    <td className="py-4 px-6 text-right">
                      <button type="button" className="rounded-xl border border-line bg-surface px-4 py-2 text-xs font-bold text-ink hover:bg-surface-raised transition-colors shadow-xs">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Delivery log */}
        <Card title="Recent delivery log" description="Last email events with status and retry count.">
          <ul className="divide-y divide-line">
            {deliveryLogs.map((log) => (
              <li key={log.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold text-ink">{log.template}</p>
                  <Pill tone={deliveryStatusMeta[log.status].tone}>{log.status}</Pill>
                </div>
                <p className="mt-1 text-xs font-semibold text-ink-soft">
                  {log.recipient} · {log.school}
                </p>
                <p className="mt-1 font-mono text-xs font-medium text-ink-muted">
                  {log.sentAt} · {log.attempts} attempt{log.attempts !== 1 ? "s" : ""}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
