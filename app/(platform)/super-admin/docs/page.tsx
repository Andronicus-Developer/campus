import type { Metadata } from "next";
import { BookOpen, ExternalLink, FileText, Search } from "lucide-react";
import { Card, PageHeader } from "@/components/platform/ui";

export const metadata: Metadata = { title: "Docs & Help Center" };

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";

type DocCategory = {
  title: string;
  description: string;
  articles: { title: string; href: string; updated: string }[];
};

const categories: DocCategory[] = [
  {
    title: "Getting started",
    description: "Onboarding a new school from registration to live.",
    articles: [
      { title: "School registration and provisioning checklist", href: "#", updated: "Oct 2026" },
      { title: "Inviting the school owner and first admin", href: "#", updated: "Oct 2026" },
      { title: "Configuring academic calendar and first term", href: "#", updated: "Sep 2026" },
    ],
  },
  {
    title: "Tenant management",
    description: "Suspending, reactivating and closing tenant accounts.",
    articles: [
      { title: "How to suspend a tenant — required reason and audit", href: "#", updated: "Oct 2026" },
      { title: "Reactivating a suspended school", href: "#", updated: "Sep 2026" },
      { title: "Closing a tenant and data export process", href: "#", updated: "Sep 2026" },
    ],
  },
  {
    title: "Billing & payments",
    description: "Managing invoices, dunning and Paystack reconciliation.",
    articles: [
      { title: "How invoices are generated and dispatched", href: "#", updated: "Oct 2026" },
      { title: "Understanding the dunning cycle", href: "#", updated: "Oct 2026" },
      { title: "Reconciling a failed Paystack webhook", href: "#", updated: "Oct 2026" },
      { title: "Issuing a manual credit or refund", href: "#", updated: "Sep 2026" },
    ],
  },
  {
    title: "Support access",
    description: "Safe procedures for accessing tenant workspaces.",
    articles: [
      { title: "Requesting and granting support access", href: "#", updated: "Oct 2026" },
      { title: "Support access audit trail and impersonation banner", href: "#", updated: "Oct 2026" },
      { title: "Revoking an active support session", href: "#", updated: "Sep 2026" },
    ],
  },
  {
    title: "Security & compliance",
    description: "Operator security policies and data protection guidance.",
    articles: [
      { title: "Enforcing MFA for all operators", href: "#", updated: "Oct 2026" },
      { title: "Rotating integration credentials safely", href: "#", updated: "Oct 2026" },
      { title: "Data retention and right-to-erasure process", href: "#", updated: "Sep 2026" },
    ],
  },
  {
    title: "Platform operations",
    description: "Feature flags, jobs, storage and monitoring runbooks.",
    articles: [
      { title: "Deploying a feature flag — rollout and rollback", href: "#", updated: "Oct 2026" },
      { title: "Retrying a failed background job", href: "#", updated: "Oct 2026" },
      { title: "Responding to a Sentry error alert", href: "#", updated: "Sep 2026" },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Settings & Compliance"
        title="Docs & help center."
        description="Internal operator guidance, runbooks and procedural documentation."
        actions={
          <button type="button" className={ghostButton}>
            <ExternalLink className="size-3.5" aria-hidden="true" />
            Open public docs
          </button>
        }
      />

      {/* Search */}
      <div className="mb-6 flex h-12 items-center gap-3 rounded-2xl border border-line bg-surface px-4">
        <Search className="size-4 shrink-0 text-ink-muted" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search operator documentation…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-muted"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {categories.map((cat) => (
          <Card key={cat.title} title={cat.title} description={cat.description}>
            <ul className="space-y-2.5">
              {cat.articles.map((article) => (
                <li key={article.title}>
                  <a
                    href={article.href}
                    className="group flex items-start gap-2 text-xs text-ink-soft transition-colors hover:text-ink"
                  >
                    <FileText
                      className="mt-0.5 size-3.5 shrink-0 text-ink-muted group-hover:text-ink-soft"
                      aria-hidden="true"
                    />
                    <span className="flex-1 leading-5">{article.title}</span>
                    <span className="shrink-0 font-mono text-[9px] text-ink-muted">
                      {article.updated}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-0.5 size-4 shrink-0 text-ink-muted" aria-hidden="true" />
          <div>
            <p className="text-xs font-medium">Contributing to operator docs</p>
            <p className="mt-1 text-xs leading-6 text-ink-muted">
              Runbooks and guides live in the repository at{" "}
              <code className="rounded bg-sand px-1 font-mono text-[10px]">docs/operator/</code>.
              Submit a PR with updates — all docs are reviewed before merging to ensure they
              reflect the current production behaviour.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
