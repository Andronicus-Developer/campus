import type { Metadata } from "next";
import { Check, Minus, Pencil, Plus, ShieldCheck } from "lucide-react";
import { Card, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber, formatUsd, planCatalog } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Plans",
};

const primaryButton =
  "inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-xs transition-opacity hover:opacity-95";
const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink-soft shadow-xs transition-colors hover:bg-surface-raised hover:text-ink";

type Cell = string | boolean;

const matrix: { label: string; values: [Cell, Cell, Cell] }[] = [
  { label: "Student limit", values: ["Up to 300", "Unlimited", "Unlimited"] },
  { label: "Staff accounts", values: ["5", "50", "Unlimited"] },
  { label: "Admissions & records", values: [true, true, true] },
  { label: "Attendance registers", values: [true, true, true] },
  { label: "Assessments & report cards", values: [true, true, true] },
  { label: "Fees, invoices & receipts", values: [false, true, true] },
  { label: "Parent & student portals", values: [false, true, true] },
  { label: "Announcements & reminders", values: [false, true, true] },
  { label: "Multi-campus & group reporting", values: [false, false, true] },
  { label: "SSO & advanced access control", values: [false, false, true] },
  { label: "Data migration", values: ["Spot-check", "Assisted", "Assisted"] },
  { label: "Support level", values: ["Email", "Priority", "Dedicated CSM"] },
  { label: "SLA & audit exports", values: [false, false, true] },
];

function MatrixCell({ value }: { value: Cell }) {
  if (value === true) {
    return <Check className="mx-auto size-5 text-success" aria-label="Included" />;
  }
  if (value === false) {
    return <Minus className="mx-auto size-5 text-ink-muted/50" aria-label="Not included" />;
  }
  return <span className="text-sm font-semibold text-ink-soft">{value}</span>;
}

export default function PlansPage() {
  const totalTenants = planCatalog.reduce((sum, plan) => sum + plan.tenantCount, 0);
  const totalMrr = planCatalog.reduce((sum, plan) => sum + plan.mrr, 0);

  return (
    <>
      <PageHeader
        eyebrow="Plan Catalog"
        title="Plans and entitlements."
        description="The live plan catalog every tenant subscribes to. Entitlements and limits are enforced server-side, not just hidden in the interface."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <Pencil className="size-4" aria-hidden="true" />
              Edit pricing
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-4" aria-hidden="true" />
              New plan
            </button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {planCatalog.map((plan) => {
          const share = Math.round((plan.tenantCount / totalTenants) * 100);
          return (
            <Card key={plan.name} className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-ink">{plan.name}</h2>
                  <p className="mt-1 text-sm text-ink-soft leading-snug">{plan.tagline}</p>
                </div>
                <Pill tone={plan.monthlyPrice ? "neutral" : "accent"}>
                  {plan.monthlyPrice ? "Self-serve" : "Sales-led"}
                </Pill>
              </div>

              <p className="mt-5 text-3xl font-black leading-none text-ink">
                {plan.monthlyPrice ? `${formatUsd(plan.monthlyPrice)}` : "Custom"}
                {plan.monthlyPrice ? (
                  <span className="ml-1 text-sm font-medium text-ink-muted">/mo</span>
                ) : null}
              </p>
              <p className="mt-1.5 text-xs font-semibold text-ink-muted">
                {plan.annualPrice
                  ? `${formatUsd(plan.annualPrice)}/mo billed annually`
                  : "Priced per group and campus count"}
              </p>

              <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-4">
                <div>
                  <dt className="font-sans text-xs font-bold uppercase tracking-wider text-ink-soft">
                    Tenants
                  </dt>
                  <dd className="mt-1 text-lg font-black text-ink">{formatNumber(plan.tenantCount)}</dd>
                </div>
                <div>
                  <dt className="font-sans text-xs font-bold uppercase tracking-wider text-ink-soft">
                    MRR
                  </dt>
                  <dd className="mt-1 text-lg font-black text-ink">{formatUsd(plan.mrr)}</dd>
                </div>
                <div>
                  <dt className="font-sans text-xs font-bold uppercase tracking-wider text-ink-soft">
                    Mix
                  </dt>
                  <dd className="mt-1 text-lg font-black text-ink">{share}%</dd>
                </div>
              </dl>

              <ul className="mt-5 flex-1 space-y-2.5">
                <li className="text-sm font-semibold text-ink-soft">{plan.studentLimit}</li>
                <li className="text-sm font-semibold text-ink-soft">{plan.staffLimit}</li>
                {plan.entitlements.map((entitlement) => (
                  <li key={entitlement} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    {entitlement}
                  </li>
                ))}
              </ul>

              <button type="button" className={`${ghostButton} mt-6 w-full justify-center`}>
                Edit {plan.name}
              </button>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card
          title="Entitlement matrix"
          description="What each plan grants. Changes apply to new and existing subscriptions."
          padded={false}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-surface-raised/60">
                <tr className="border-b border-line font-sans text-xs font-bold uppercase tracking-wider text-slate-700">
                  <th className="px-6 py-4">Entitlement</th>
                  {planCatalog.map((plan) => (
                    <th key={plan.name} className="px-4 py-4 text-center">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {matrix.map((row) => (
                  <tr key={row.label} className="transition-colors hover:bg-surface-raised/30">
                    <td className="px-6 py-3.5 text-sm font-semibold text-ink">{row.label}</td>
                    {row.values.map((value, index) => (
                      <td key={planCatalog[index].name} className="px-4 py-3.5 text-center">
                        <MatrixCell value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card title="Billing model">
            <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary-light/50 p-4.5">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-ink-soft">
                Platform subscription billing is kept entirely separate from each
                school&apos;s own fee collection. A school&apos;s invoices, receipts and
                reconciliation never touch the platform&apos;s own billing records.
              </p>
            </div>
            <dl className="mt-5 space-y-3.5 text-sm font-medium">
              <div className="flex items-center justify-between gap-3 border-b border-line pb-2.5">
                <dt className="text-ink-soft">Catalog total tenants</dt>
                <dd className="font-mono font-bold text-ink">{formatNumber(totalTenants)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-line pb-2.5">
                <dt className="text-ink-soft">Catalog MRR</dt>
                <dd className="font-mono font-bold text-ink">{formatUsd(totalMrr)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-line pb-2.5">
                <dt className="text-ink-soft">Trial length</dt>
                <dd className="font-mono font-bold text-ink">14 days</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-soft">Dunning retries</dt>
                <dd className="font-mono font-bold text-ink">3 attempts</dd>
              </div>
            </dl>
          </Card>

          <Card title="Plan changes (last 30 days)">
            <ul className="space-y-3.5 text-sm font-medium">
              <li className="flex items-center justify-between gap-3 border-b border-line pb-2.5">
                <span className="text-ink-soft">Upgrades</span>
                <Pill tone="positive">18</Pill>
              </li>
              <li className="flex items-center justify-between gap-3 border-b border-line pb-2.5">
                <span className="text-ink-soft">Downgrades</span>
                <Pill tone="warning">6</Pill>
              </li>
              <li className="flex items-center justify-between gap-3 border-b border-line pb-2.5">
                <span className="text-ink-soft">Trials converted</span>
                <Pill tone="positive">41</Pill>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="text-ink-soft">Assisted Enterprise deals</span>
                <Pill tone="neutral">7</Pill>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
