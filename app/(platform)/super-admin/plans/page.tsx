import type { Metadata } from "next";
import { Check, Minus, Pencil, Plus, ShieldCheck } from "lucide-react";
import { Card, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber, formatUsd, planCatalog } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Plans",
};

const primaryButton =
  "inline-flex h-9 items-center gap-2 rounded-full bg-primary px-4 text-xs font-medium text-white transition-colors hover:bg-primary-hover";
const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";

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
    return <Check className="mx-auto size-4 text-success" aria-label="Included" />;
  }
  if (value === false) {
    return <Minus className="mx-auto size-4 text-ink-muted" aria-label="Not included" />;
  }
  return <span className="text-xs text-ink-soft">{value}</span>;
}

export default function PlansPage() {
  const totalTenants = planCatalog.reduce((sum, plan) => sum + plan.tenantCount, 0);
  const totalMrr = planCatalog.reduce((sum, plan) => sum + plan.mrr, 0);

  return (
    <>
      <PageHeader
        eyebrow="Plan catalog"
        title="Plans and entitlements."
        description="The live plan catalog every tenant subscribes to. Entitlements and limits are enforced server-side, not just hidden in the interface."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <Pencil className="size-3.5" aria-hidden="true" />
              Edit pricing
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-3.5" aria-hidden="true" />
              New plan
            </button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {planCatalog.map((plan) => {
          const share = Math.round((plan.tenantCount / totalTenants) * 100);
          return (
            <Card key={plan.name} className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold leading-tight">{plan.name}</h2>
                  <p className="mt-1 text-xs leading-5 text-ink-muted">{plan.tagline}</p>
                </div>
                <Pill tone={plan.monthlyPrice ? "neutral" : "accent"}>
                  {plan.monthlyPrice ? "Self-serve" : "Sales-led"}
                </Pill>
              </div>

              <p className="mt-5 text-2xl font-extrabold leading-none">
                {plan.monthlyPrice ? `${formatUsd(plan.monthlyPrice)}` : "Custom"}
                {plan.monthlyPrice ? (
                  <span className="ml-1 text-xs font-normal text-ink-muted">/mo</span>
                ) : null}
              </p>
              <p className="mt-1.5 text-[11px] text-ink-muted">
                {plan.annualPrice
                  ? `${formatUsd(plan.annualPrice)}/mo billed annually`
                  : "Priced per group and campus count"}
              </p>

              <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-4">
                <div>
                  <dt className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-muted">
                    Tenants
                  </dt>
                  <dd className="mt-1 text-base font-extrabold">{formatNumber(plan.tenantCount)}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-muted">
                    MRR
                  </dt>
                  <dd className="mt-1 text-base font-extrabold">{formatUsd(plan.mrr)}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-muted">
                    Mix
                  </dt>
                  <dd className="mt-1 text-base font-extrabold">{share}%</dd>
                </div>
              </dl>

              <ul className="mt-4 flex-1 space-y-2">
                <li className="text-xs text-ink-soft">{plan.studentLimit}</li>
                <li className="text-xs text-ink-soft">{plan.staffLimit}</li>
                {plan.entitlements.map((entitlement) => (
                  <li key={entitlement} className="flex items-start gap-2 text-xs text-ink-soft">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden="true" />
                    {entitlement}
                  </li>
                ))}
              </ul>

              <button type="button" className={`${ghostButton} mt-5 w-full justify-center`}>
                Edit {plan.name}
              </button>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card
          title="Entitlement matrix"
          description="What each plan grants. Changes apply to new and existing subscriptions."
          padded={false}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-canvas">
                <tr className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-muted">
                  <th className="px-5 py-3 font-normal">Entitlement</th>
                  {planCatalog.map((plan) => (
                    <th key={plan.name} className="px-3 py-3 text-center font-normal">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {matrix.map((row) => (
                  <tr key={row.label}>
                    <td className="px-5 py-3 text-xs text-ink-soft">{row.label}</td>
                    {row.values.map((value, index) => (
                      <td key={planCatalog[index].name} className="px-3 py-3 text-center">
                        <MatrixCell value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card title="Billing model">
            <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary-light p-4">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-xs leading-6 text-ink-soft">
                Platform subscription billing is kept entirely separate from each
                school&apos;s own fee collection. A school&apos;s invoices, receipts and
                reconciliation never touch the platform&apos;s own billing records.
              </p>
            </div>
            <dl className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-muted">Catalog total tenants</dt>
                <dd className="font-mono">{formatNumber(totalTenants)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-muted">Catalog MRR</dt>
                <dd className="font-mono">{formatUsd(totalMrr)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-muted">Trial length</dt>
                <dd className="font-mono">14 days</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-muted">Dunning retries</dt>
                <dd className="font-mono">3 attempts</dd>
              </div>
            </dl>
          </Card>

          <Card title="Plan changes (last 30 days)">
            <ul className="space-y-3 text-xs">
              <li className="flex items-center justify-between gap-3">
                <span className="text-ink-soft">Upgrades</span>
                <Pill tone="positive">18</Pill>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="text-ink-soft">Downgrades</span>
                <Pill tone="warning">6</Pill>
              </li>
              <li className="flex items-center justify-between gap-3">
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
