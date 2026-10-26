import type { Metadata } from "next";
import { AlertTriangle, FileText, Save, Scale, ShieldCheck } from "lucide-react";
import { Card, PageHeader, Pill } from "@/components/platform/ui";

export const metadata: Metadata = { title: "Legal, Privacy & Compliance" };

const primaryButton =
  "inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-xs transition-opacity hover:opacity-95";

type DocumentStatus = "current" | "draft" | "review";

type LegalDocument = {
  name: string;
  description: string;
  version: string;
  effectiveDate: string;
  status: DocumentStatus;
};

const docStatusMeta: Record<DocumentStatus, { tone: "positive" | "warning" | "neutral" }> = {
  current: { tone: "positive" },
  draft:   { tone: "muted" as "warning" },
  review:  { tone: "warning" },
};

const documents: LegalDocument[] = [
  { name: "Terms of Service",         description: "Governing terms for school tenants and platform use.",       version: "v2.1", effectiveDate: "01 Oct 2026", status: "current" },
  { name: "Privacy Policy",           description: "How platform and school data is collected and processed.",   version: "v2.0", effectiveDate: "01 Oct 2026", status: "current" },
  { name: "Data Processing Agreement", description: "DPA for tenants in the EU/UK and regulated markets.",      version: "v1.4", effectiveDate: "01 Oct 2026", status: "current" },
  { name: "Cookie Policy",            description: "Cookies and tracking used on the platform.",                version: "v1.1", effectiveDate: "01 Oct 2026", status: "current" },
  { name: "SLA (Enterprise)",         description: "Service level agreement for Enterprise plan tenants.",       version: "v1.0", effectiveDate: "01 Oct 2026", status: "review" },
  { name: "Acceptable Use Policy",    description: "Rules for tenants, staff and student data handling.",       version: "v1.2-draft", effectiveDate: "—", status: "draft" },
];

const retentionPolicies = [
  { category: "Audit logs",             retention: "24 months — then archived", required: true },
  { category: "Student records",        retention: "Configurable per school — min 7 years (default)", required: true },
  { category: "Financial records",      retention: "7 years (regulatory minimum)", required: true },
  { category: "Application logs",       retention: "90 days", required: false },
  { category: "Analytics events",       retention: "12 months (PostHog)", required: false },
  { category: "Email delivery logs",    retention: "30 days", required: false },
  { category: "Closed tenant data",     retention: "90 days exportable, then purge on request", required: true },
];

const complianceChecklist = [
  { item: "Privacy policy linked in platform footer", done: true },
  { item: "Terms of service accepted at tenant signup", done: true },
  { item: "DPA available for EU/UK tenants on request", done: true },
  { item: "Data retention policies documented and enforced", done: true },
  { item: "Student PII excluded from Sentry and PostHog", done: true },
  { item: "Right-to-erasure process defined and tested", done: false },
  { item: "Legal review by qualified counsel for target markets", done: false },
  { item: "GDPR/data protection officer identified (if applicable)", done: false },
];

export default function LegalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Settings & Compliance"
        title="Legal, privacy & compliance."
        description="Terms of service, privacy policy, data retention rules and data-processing responsibilities."
        actions={
          <button type="button" className={primaryButton}>
            <Save className="size-4" aria-hidden="true" />
            Save changes
          </button>
        }
      />

      {/* Disclaimer */}
      <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 shadow-xs">
        <div className="flex items-start gap-3.5">
          <Scale className="mt-0.5 size-5 shrink-0 text-amber-700" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-ink-soft">
            <span className="font-bold text-ink">Legal disclaimer — </span>
            This section provides operational records and internal reference only. The platform
            does not claim legal compliance without qualified professional review. Terms of
            service, privacy policies and DPAs must be reviewed by legal counsel for each
            target market before launch or material updates.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Legal documents */}
        <Card title="Legal documents" description="Published and draft policy documents.">
          <ul className="divide-y divide-line">
            {documents.map((doc) => (
              <li key={doc.name} className="flex flex-wrap items-start justify-between gap-4 py-4.5 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3.5">
                  <FileText className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm sm:text-base font-bold text-ink">{doc.name}</p>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink-soft">{doc.description}</p>
                    <p className="mt-1.5 font-mono text-xs font-semibold text-ink-soft">
                      {doc.version} · Effective {doc.effectiveDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Pill tone={docStatusMeta[doc.status].tone}>{doc.status}</Pill>
                  <button
                    type="button"
                    className="rounded-xl border border-line bg-surface px-4 py-1.5 text-xs font-bold text-ink-soft shadow-xs transition-colors hover:bg-surface-raised hover:text-ink"
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Compliance checklist */}
        <Card title="Compliance checklist" description="Pre-launch and ongoing obligations.">
          <ul className="space-y-3.5">
            {complianceChecklist.map((item) => (
              <li key={item.item} className="flex items-start gap-3 text-sm font-medium">
                {item.done ? (
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
                ) : (
                  <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden="true" />
                )}
                <span className={item.done ? "text-ink-soft" : "text-ink font-bold"}>{item.item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Retention policies */}
      <div className="mt-8">
        <Card title="Data retention policies" description="How long different data categories are kept before archival or deletion.">
          <div className="overflow-x-auto -mx-6 -mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-raised/60">
                  {["Category", "Retention period", "Regulatory"].map((h) => (
                    <th key={h} className="py-4 px-6 text-left font-sans text-xs font-bold uppercase tracking-wider text-slate-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {retentionPolicies.map((policy) => (
                  <tr key={policy.category} className="transition-colors hover:bg-surface-raised/40">
                    <td className="py-4 px-6 font-bold text-ink text-sm sm:text-base">{policy.category}</td>
                    <td className="py-4 px-6 text-sm font-medium text-ink-soft">{policy.retention}</td>
                    <td className="py-4 px-6">
                      <Pill tone={policy.required ? "neutral" : "muted"}>
                        {policy.required ? "Required" : "Operational"}
                      </Pill>
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
