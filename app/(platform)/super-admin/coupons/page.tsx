import type { Metadata } from "next";
import { Calendar, Download, Percent, Plus, Tag, Users } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Coupons & Promotions" };

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";
const primaryButton =
  "inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-xs font-medium text-paper transition-colors hover:bg-ink-soft";

type CouponStatus = "active" | "expired" | "scheduled" | "paused";

type Coupon = {
  code: string;
  description: string;
  discount: string;
  type: "percent" | "fixed";
  appliesTo: string;
  uses: number;
  maxUses: number | null;
  status: CouponStatus;
  expires: string | null;
};

const statusMeta: Record<CouponStatus, { tone: "positive" | "muted" | "neutral" | "warning" }> = {
  active:    { tone: "positive" },
  expired:   { tone: "muted" },
  scheduled: { tone: "neutral" },
  paused:    { tone: "warning" },
};

const coupons: Coupon[] = [
  { code: "LAUNCH30", description: "30% off first 3 months — launch offer", discount: "30%", type: "percent", appliesTo: "All plans", uses: 84, maxUses: 200, status: "active", expires: "31 Dec 2026" },
  { code: "EDU2026", description: "Annual plan discount for NGOs", discount: "20%", type: "percent", appliesTo: "Enterprise annual", uses: 12, maxUses: 50, status: "active", expires: "31 Dec 2026" },
  { code: "REFER50", description: "Referral credit — $50 off first invoice", discount: "$50", type: "fixed", appliesTo: "Starter, Growth", uses: 203, maxUses: null, status: "active", expires: null },
  { code: "BETA2025", description: "Beta-tester lifetime discount", discount: "15%", type: "percent", appliesTo: "All plans", uses: 31, maxUses: 31, status: "expired", expires: "01 Jan 2026" },
  { code: "EARLYBIRD", description: "Early-bird annual pricing", discount: "25%", type: "percent", appliesTo: "Annual plans", uses: 0, maxUses: 100, status: "scheduled", expires: "01 Nov 2026" },
];

const activeCoupons = coupons.filter((c) => c.status === "active").length;
const totalUses = coupons.reduce((acc, c) => acc + c.uses, 0);

export default function CouponsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Subscriptions & Revenue"
        title="Coupons & promotions."
        description="Discount codes, promotional offers and time-limited pricing for new and existing tenants."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <Download className="size-3.5" aria-hidden="true" />
              Export
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-3.5" aria-hidden="true" />
              Create coupon
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Active coupons"
          value={formatNumber(activeCoupons)}
          hint="currently redeemable"
          icon={<Tag className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Total redemptions"
          value={formatNumber(totalUses)}
          hint="all time"
          icon={<Users className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Expiring this month"
          value="2"
          hint="need review"
          icon={<Calendar className="size-3.5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-6">
        <Card title="Coupon catalogue" description="All discount codes across all promotions.">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-line">
                  {["Code", "Description", "Discount", "Applies to", "Uses", "Expires", "Status"].map((h) => (
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
                {coupons.map((coupon) => (
                  <tr key={coupon.code}>
                    <td className="py-3 pr-4">
                      <span className="rounded-lg border border-line bg-paper px-2 py-1 font-mono text-[10px] font-medium">
                        {coupon.code}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-ink-soft">{coupon.description}</td>
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-1 font-mono text-[11px] font-medium text-ink">
                        <Percent className="size-3 text-ink-muted" aria-hidden="true" />
                        {coupon.discount}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-ink-muted">{coupon.appliesTo}</td>
                    <td className="py-3 pr-4 font-mono text-ink-soft">
                      {coupon.uses}
                      {coupon.maxUses ? ` / ${coupon.maxUses}` : " / ∞"}
                    </td>
                    <td className="py-3 pr-4 text-ink-muted">
                      {coupon.expires ?? "No expiry"}
                    </td>
                    <td className="py-3">
                      <Pill tone={statusMeta[coupon.status].tone}>{coupon.status}</Pill>
                    </td>
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
