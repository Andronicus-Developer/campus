import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, Plus, RefreshCw, Webhook } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Webhooks" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink hover:bg-surface-raised transition-all shadow-xs";
const primaryButton =
  "inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-sm font-bold text-paper transition-all hover:bg-ink-soft shadow-xs";

type WebhookStatus  = "active" | "failing" | "paused" | "disabled";
type WebhookEventStatus = "processed" | "failed" | "retrying" | "duplicate";

type WebhookEndpoint = {
  id: string;
  name: string;
  url: string;
  source: string;
  events: string[];
  status: WebhookStatus;
  successRate: string;
  lastReceived: string;
};

type WebhookEvent = {
  id: string;
  source: string;
  event: string;
  status: WebhookEventStatus;
  receivedAt: string;
  attempts: number;
};

const endpointStatusMeta: Record<WebhookStatus, { tone: "positive" | "critical" | "warning" | "muted" }> = {
  active:   { tone: "positive" },
  failing:  { tone: "critical" },
  paused:   { tone: "warning" as "positive" },
  disabled: { tone: "muted" },
};

const eventStatusMeta: Record<WebhookEventStatus, { tone: "positive" | "critical" | "warning" | "muted" }> = {
  processed: { tone: "positive" },
  failed:    { tone: "critical" },
  retrying:  { tone: "warning" as "positive" },
  duplicate: { tone: "muted" },
};

const endpoints: WebhookEndpoint[] = [
  {
    id: "wh-001",
    name: "Paystack — payment events",
    url: "/api/webhooks/paystack",
    source: "Paystack",
    events: ["charge.success", "charge.failed", "transfer.success", "refund.processed"],
    status: "active",
    successRate: "100%",
    lastReceived: "22 Oct · 14:31",
  },
  {
    id: "wh-002",
    name: "Inngest — job callbacks",
    url: "/api/inngest",
    source: "Inngest",
    events: ["inngest/function.invoked", "inngest/function.finished", "inngest/function.failed"],
    status: "active",
    successRate: "98.7%",
    lastReceived: "22 Oct · 14:28",
  },
];

const recentEvents: WebhookEvent[] = [
  { id: "evt-ps-9910", source: "Paystack", event: "charge.success",  status: "processed", receivedAt: "22 Oct · 14:31", attempts: 1 },
  { id: "evt-ps-9909", source: "Paystack", event: "charge.success",  status: "processed", receivedAt: "22 Oct · 08:44", attempts: 1 },
  { id: "evt-ps-9908", source: "Paystack", event: "charge.failed",   status: "processed", receivedAt: "21 Oct · 17:02", attempts: 1 },
  { id: "evt-ps-9907", source: "Paystack", event: "charge.success",  status: "duplicate", receivedAt: "21 Oct · 17:02", attempts: 1 },
  { id: "evt-ig-1204", source: "Inngest",  event: "function.failed",  status: "retrying",  receivedAt: "22 Oct · 09:14", attempts: 2 },
  { id: "evt-ig-1203", source: "Inngest",  event: "function.finished",status: "processed", receivedAt: "22 Oct · 09:10", attempts: 1 },
];

const processedCount = recentEvents.filter((e) => e.status === "processed").length;
const failedCount    = recentEvents.filter((e) => e.status === "failed" || e.status === "retrying").length;
const duplicateCount = recentEvents.filter((e) => e.status === "duplicate").length;

export default function WebhooksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform Operations"
        title="Webhooks."
        description="Inbound webhook endpoints, delivery attempts, event deduplication and signature verification status."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <RefreshCw className="size-4" aria-hidden="true" />
              Refresh
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-4" aria-hidden="true" />
              Add endpoint
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Processed (7d)" value={formatNumber(processedCount)} hint="verified and applied" icon={<CheckCircle2 className="size-5" aria-hidden="true" />} />
        <KpiCard label="Failed / retrying" value={formatNumber(failedCount)} hint="needs investigation" icon={<AlertTriangle className="size-5" aria-hidden="true" />} />
        <KpiCard label="Duplicates rejected" value={formatNumber(duplicateCount)} hint="idempotency working" icon={<Webhook className="size-5" aria-hidden="true" />} />
      </div>

      {/* Endpoints */}
      <div className="mt-8 flex flex-col gap-5">
        {endpoints.map((ep) => (
          <div key={ep.id} className="rounded-2xl border border-line bg-surface p-6 shadow-xs">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <p className="text-base sm:text-lg font-bold text-ink">{ep.name}</p>
                  <Pill tone={endpointStatusMeta[ep.status].tone}>{ep.status}</Pill>
                </div>
                <p className="mt-1 font-mono text-xs font-semibold text-primary">{ep.url}</p>
              </div>
              <div className="flex gap-4 font-mono text-xs font-semibold text-ink-muted">
                <span>Success: <strong className="text-ink font-bold">{ep.successRate}</strong></span>
                <span>Last: <strong className="text-ink font-bold">{ep.lastReceived}</strong></span>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {ep.events.map((ev) => (
                <span
                  key={ev}
                  className="rounded-lg border border-line bg-surface-raised px-2.5 py-1 font-mono text-xs font-medium text-ink-soft"
                >
                  {ev}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Event log */}
      <div className="mt-8">
        <Card title="Recent webhook events" description="Last inbound events across all endpoints.">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line bg-surface-raised/60">
                  {["Event ID", "Source", "Event type", "Status", "Received", "Attempts"].map((h) => (
                    <th key={h} className="py-4 px-6 font-sans text-xs font-bold uppercase tracking-wider text-slate-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recentEvents.map((ev) => (
                  <tr key={ev.id} className="hover:bg-sand/20 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs font-bold text-primary">{ev.id}</td>
                    <td className="py-4 px-6 text-sm font-bold text-ink">{ev.source}</td>
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-ink-soft">{ev.event}</td>
                    <td className="py-4 px-6"><Pill tone={eventStatusMeta[ev.status].tone}>{ev.status}</Pill></td>
                    <td className="py-4 px-6 text-sm font-medium text-ink-muted">{ev.receivedAt}</td>
                    <td className="py-4 px-6 font-mono text-xs font-bold text-ink">{ev.attempts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
