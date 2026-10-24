import type { Metadata } from "next";
import { AlertTriangle, Download, Receipt, RefreshCw } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber, formatUsd, platformStats } from "@/lib/platform";

export const metadata: Metadata = { title: "Billing & Invoices" };

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";

type InvoiceStatus = "paid" | "open" | "overdue" | "voided";

type Invoice = {
  id: string;
  school: string;
  amount: number;
  currency: string;
  period: string;
  plan: string;
  status: InvoiceStatus;
  dueDate: string;
  issuedAt: string;
};

const statusMeta: Record<InvoiceStatus, { tone: "positive" | "neutral" | "critical" | "muted" }> = {
  paid:    { tone: "positive" },
  open:    { tone: "neutral" },
  overdue: { tone: "critical" },
  voided:  { tone: "muted" },
};

const invoices: Invoice[] = [
  { id: "INV-2026-1041", school: "Greenfield Academy", amount: 29900, currency: "USD", period: "Oct 2026", plan: "Growth", status: "paid", dueDate: "01 Oct 2026", issuedAt: "01 Oct 2026" },
  { id: "INV-2026-1042", school: "Horizon International", amount: 79900, currency: "USD", period: "Oct 2026", plan: "Enterprise", status: "overdue", dueDate: "01 Oct 2026", issuedAt: "01 Oct 2026" },
  { id: "INV-2026-1043", school: "Meridian Schools", amount: 14900, currency: "USD", period: "Oct 2026", plan: "Starter", status: "open", dueDate: "01 Nov 2026", issuedAt: "22 Oct 2026" },
  { id: "INV-2026-1044", school: "Pinnacle Academy", amount: 29900, currency: "USD", period: "Oct 2026", plan: "Growth", status: "paid", dueDate: "01 Oct 2026", issuedAt: "01 Oct 2026" },
  { id: "INV-2026-1045", school: "Sunrise Primary", amount: 14900, currency: "USD", period: "Oct 2026", plan: "Starter", status: "overdue", dueDate: "01 Oct 2026", issuedAt: "01 Oct 2026" },
  { id: "INV-2026-1046", school: "St. Catherine's", amount: 29900, currency: "USD", period: "Oct 2026", plan: "Growth", status: "open", dueDate: "01 Nov 2026", issuedAt: "22 Oct 2026" },
  { id: "INV-2026-1047", school: "Galaxy International", amount: 29900, currency: "USD", period: "Sep 2026", plan: "Growth", status: "voided", dueDate: "01 Sep 2026", issuedAt: "01 Sep 2026" },
];

const totalOverdue = invoices
  .filter((inv) => inv.status === "overdue")
  .reduce((acc, inv) => acc + inv.amount, 0);

export default function BillingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Subscriptions & Revenue"
        title="Billing & invoices."
        description="SaaS invoices, invoice status, overdue balances, credits and billing history across all tenants."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <RefreshCw className="size-3.5" aria-hidden="true" />
              Sync
            </button>
            <button type="button" className={ghostButton}>
              <Download className="size-3.5" aria-hidden="true" />
              Export
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Open invoices"
          value={formatNumber(platformStats.openInvoices)}
          hint="awaiting payment"
          icon={<Receipt className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Overdue balance"
          value={formatUsd(totalOverdue / 100)}
          hint="past due date"
          icon={<AlertTriangle className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Past due schools"
          value={formatNumber(platformStats.pastDueTenants)}
          hint="dunning active"
          icon={<AlertTriangle className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Collected (Oct)"
          value={formatUsd(platformStats.mrr * 0.94)}
          hint="vs target MRR"
          icon={<Receipt className="size-3.5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-6">
        <Card title="Invoice list" description="Recent SaaS platform invoices across all tenants.">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-line">
                  {["Invoice", "School", "Plan", "Period", "Amount", "Due", "Status", ""].map((h) => (
                    <th
                      key={h}
                      className="pb-3 pr-4 text-left font-mono text-[9px] uppercase tracking-[0.15em] text-ink-muted last:pr-0"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td className="py-3 pr-4 font-mono text-[10px] text-ink-muted">{inv.id}</td>
                    <td className="py-3 pr-4 font-medium">{inv.school}</td>
                    <td className="py-3 pr-4">
                      <Pill tone="neutral">{inv.plan}</Pill>
                    </td>
                    <td className="py-3 pr-4 text-ink-soft">{inv.period}</td>
                    <td className="py-3 pr-4 font-mono text-ink-soft">
                      {formatUsd(inv.amount / 100)}
                    </td>
                    <td className="py-3 pr-4 text-ink-muted">{inv.dueDate}</td>
                    <td className="py-3 pr-4">
                      <Pill tone={statusMeta[inv.status].tone}>
                        {inv.status}
                      </Pill>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        className="rounded-full border border-line bg-surface px-3 py-1 text-[11px] text-ink-soft transition-colors hover:text-ink"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card title="Dunning policy" description="Automatic retry schedule for failed payments.">
          <ol className="space-y-3">
            {[
              { day: "Day 0", action: "Payment fails — retry immediately" },
              { day: "Day 3", action: "Second retry + email reminder to owner" },
              { day: "Day 7", action: "Final retry + escalation email" },
              { day: "Day 14", action: "Subscription suspended — data kept, exportable" },
              { day: "Day 90", action: "Tenant eligible for permanent closure" },
            ].map((step) => (
              <li key={step.day} className="flex gap-3 text-xs">
                <span className="w-14 shrink-0 font-mono text-[10px] font-medium text-ink-muted">
                  {step.day}
                </span>
                <span className="text-ink-soft">{step.action}</span>
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Credits & adjustments" description="Manual billing adjustments this period.">
          <p className="text-xs text-ink-muted">
            No manual credits or adjustments have been issued this billing period. Credits
            applied to an invoice reduce the outstanding balance and appear on the invoice
            line-item history.
          </p>
        </Card>
      </div>
    </>
  );
}
