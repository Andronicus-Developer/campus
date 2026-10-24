import type { Metadata } from "next";
import { AlertTriangle, ArrowDownLeft, ArrowUpRight, Download, RefreshCw, Wallet } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber, formatUsd } from "@/lib/platform";

export const metadata: Metadata = { title: "Payments & Transactions" };

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";

type TxStatus = "success" | "failed" | "pending" | "refunded" | "reversed";

type Transaction = {
  ref: string;
  school: string;
  amount: number;
  currency: string;
  provider: string;
  providerRef: string;
  status: TxStatus;
  type: "charge" | "refund";
  createdAt: string;
};

const statusMeta: Record<TxStatus, { tone: "positive" | "critical" | "warning" | "neutral" | "muted" }> = {
  success:  { tone: "positive" },
  failed:   { tone: "critical" },
  pending:  { tone: "warning" },
  refunded: { tone: "neutral" },
  reversed: { tone: "muted" },
};

const transactions: Transaction[] = [
  { ref: "TXN-00981", school: "Greenfield Academy", amount: 29900, currency: "USD", provider: "Paystack", providerRef: "ps_001abc", status: "success", type: "charge", createdAt: "22 Oct 2026" },
  { ref: "TXN-00980", school: "Pinnacle Academy", amount: 29900, currency: "USD", provider: "Paystack", providerRef: "ps_002def", status: "success", type: "charge", createdAt: "22 Oct 2026" },
  { ref: "TXN-00979", school: "Horizon International", amount: 79900, currency: "USD", provider: "Paystack", providerRef: "ps_003ghi", status: "failed", type: "charge", createdAt: "21 Oct 2026" },
  { ref: "TXN-00978", school: "Galaxy International", amount: 29900, currency: "USD", provider: "Paystack", providerRef: "ps_004jkl", status: "refunded", type: "refund", createdAt: "20 Oct 2026" },
  { ref: "TXN-00977", school: "Sunrise Primary", amount: 14900, currency: "USD", provider: "Paystack", providerRef: "ps_005mno", status: "failed", type: "charge", createdAt: "20 Oct 2026" },
  { ref: "TXN-00976", school: "Meridian Schools", amount: 14900, currency: "USD", provider: "Paystack", providerRef: "ps_006pqr", status: "pending", type: "charge", createdAt: "19 Oct 2026" },
  { ref: "TXN-00975", school: "St. Catherine's", amount: 29900, currency: "USD", provider: "Paystack", providerRef: "ps_007stu", status: "success", type: "charge", createdAt: "19 Oct 2026" },
];

const totalCollected = transactions
  .filter((t) => t.status === "success" && t.type === "charge")
  .reduce((acc, t) => acc + t.amount, 0);
const failedCount = transactions.filter((t) => t.status === "failed").length;
const refundedTotal = transactions
  .filter((t) => t.status === "refunded")
  .reduce((acc, t) => acc + t.amount, 0);

export default function PaymentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Subscriptions & Revenue"
        title="Payments & transactions."
        description="Payment records, failed payments, refunds, provider references and reconciliation status."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <RefreshCw className="size-3.5" aria-hidden="true" />
              Reconcile
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
          label="Collected (shown)"
          value={formatUsd(totalCollected / 100)}
          hint="successful charges"
          icon={<Wallet className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Failed payments"
          value={formatNumber(failedCount)}
          hint="requires retry"
          icon={<AlertTriangle className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Refunded"
          value={formatUsd(refundedTotal / 100)}
          hint="this period"
          icon={<ArrowDownLeft className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Unreconciled"
          value="0"
          hint="webhook events"
          icon={<ArrowUpRight className="size-3.5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-6">
        <Card
          title="Transaction log"
          description="All payment events with provider references. Amounts verified server-side."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-line">
                  {["Reference", "School", "Amount", "Provider ref", "Type", "Status", "Date"].map((h) => (
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
                {transactions.map((tx) => (
                  <tr key={tx.ref}>
                    <td className="py-3 pr-4 font-mono text-[10px] text-ink-muted">{tx.ref}</td>
                    <td className="py-3 pr-4 font-medium">{tx.school}</td>
                    <td className="py-3 pr-4 font-mono text-ink-soft">
                      {formatUsd(tx.amount / 100)}
                    </td>
                    <td className="py-3 pr-4 font-mono text-[10px] text-ink-muted">
                      {tx.providerRef}
                    </td>
                    <td className="py-3 pr-4">
                      <Pill tone={tx.type === "charge" ? "neutral" : "muted"}>
                        {tx.type}
                      </Pill>
                    </td>
                    <td className="py-3 pr-4">
                      <Pill tone={statusMeta[tx.status].tone}>{tx.status}</Pill>
                    </td>
                    <td className="py-3 text-ink-muted">{tx.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card title="Webhook integrity" description="Paystack event verification status.">
          <ul className="space-y-2.5 text-xs text-ink-soft">
            {[
              { label: "Signature verification", value: "Active (HMAC-SHA512)" },
              { label: "Event deduplication", value: "WebhookEvent table" },
              { label: "Idempotency", value: "provider ref + amount + currency" },
              { label: "Last webhook received", value: "22 Oct 2026 · 14:31" },
              { label: "Unprocessed events", value: "0" },
            ].map((row) => (
              <li key={row.label} className="flex items-center justify-between gap-4 border-b border-line pb-2.5 last:border-0 last:pb-0">
                <span>{row.label}</span>
                <span className="font-mono text-[10px] text-ink-muted">{row.value}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Reconciliation policy">
          <p className="text-xs leading-6 text-ink-muted">
            Payments are confirmed exclusively via server-side webhook. Browser redirects
            are informational only and never used to update payment status. Each event is
            verified by signature, deduplicated by provider reference, and amount and
            currency are validated against the internal record before any allocation is
            written.
          </p>
        </Card>
      </div>
    </>
  );
}
