import type { Metadata } from "next";
import { AlertTriangle, Download, Receipt, RefreshCw } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber, formatUsd, platformStats } from "@/lib/platform";

export const metadata: Metadata = { title: "Billing & Invoices" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink-soft shadow-xs transition-colors hover:bg-surface-raised hover:text-ink";

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
              <RefreshCw className="size-4" aria-hidden="true" />
              Sync
            </button>
            <button type="button" className={ghostButton}>
              <Download className="size-4" aria-hidden="true" />
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
          icon={<Receipt className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Overdue balance"
          value={formatUsd(totalOverdue / 100)}
          hint="past due date"
          icon={<AlertTriangle className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Past due schools"
          value={formatNumber(platformStats.pastDueTenants)}
          hint="dunning active"
          icon={<AlertTriangle className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Collected (Oct)"
          value={formatUsd(platformStats.mrr * 0.94)}
          hint="vs target MRR"
          icon={<Receipt className="size-5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-8">
        <Card title="Invoice list" description="Recent SaaS platform invoices across all tenants.">
          <div className="overflow-x-auto -mx-6 -mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-raised/60">
                  {["Invoice", "School", "Plan", "Period", "Amount", "Due", "Status", ""].map((h) => (
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
                {invoices.map((inv) => (
                  <tr key={inv.id} className="transition-colors hover:bg-surface-raised/40">
                    <td className="py-4 px-6 font-mono text-xs font-bold text-primary">{inv.id}</td>
                    <td className="py-4 px-6 font-bold text-ink text-sm sm:text-base">{inv.school}</td>
                    <td className="py-4 px-6">
                      <Pill tone="neutral">{inv.plan}</Pill>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-ink-soft">{inv.period}</td>
                    <td className="py-4 px-6 font-mono text-sm font-bold text-ink">
                      {formatUsd(inv.amount / 100)}
                    </td>
                    <td className="py-4 px-6 text-xs font-semibold text-ink-muted">{inv.dueDate}</td>
                    <td className="py-4 px-6">
                      <Pill tone={statusMeta[inv.status].tone}>
                        {inv.status}
                      </Pill>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        className="rounded-xl border border-line bg-surface px-4 py-1.5 text-xs font-bold text-ink-soft shadow-xs transition-colors hover:bg-surface-raised hover:text-ink"
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

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card title="Dunning policy" description="Automatic retry schedule for failed payments.">
          <ol className="space-y-3.5">
            {[
              { day: "Day 0", action: "Payment fails — retry immediately" },
              { day: "Day 3", action: "Second retry + email reminder to owner" },
              { day: "Day 7", action: "Final retry + escalation email" },
              { day: "Day 14", action: "Subscription suspended — data kept, exportable" },
              { day: "Day 90", action: "Tenant eligible for permanent closure" },
            ].map((step) => (
              <li key={step.day} className="flex items-center gap-4 text-sm font-medium">
                <span className="w-18 shrink-0 font-mono text-xs font-bold text-primary bg-primary-light/50 px-2 py-0.5 rounded-md">
                  {step.day}
                </span>
                <span className="text-ink-soft">{step.action}</span>
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Credits & adjustments" description="Manual billing adjustments this period.">
          <p className="text-sm leading-relaxed text-ink-soft">
            No manual credits or adjustments have been issued this billing period. Credits
            applied to an invoice reduce the outstanding balance and appear on the invoice
            line-item history.
          </p>
        </Card>
      </div>
    </>
  );
}
