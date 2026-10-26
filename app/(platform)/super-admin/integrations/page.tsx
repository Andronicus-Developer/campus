import type { Metadata } from "next";
import { CheckCircle2, ExternalLink, Plug, RefreshCw, XCircle } from "lucide-react";
import { KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Integrations" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink-soft shadow-xs transition-colors hover:bg-surface-raised hover:text-ink";

type IntegrationStatus = "connected" | "degraded" | "disconnected" | "pending";

type Integration = {
  name: string;
  category: string;
  description: string;
  status: IntegrationStatus;
  lastPing: string;
  docsUrl: string;
  credentials: string;
};

const statusMeta: Record<IntegrationStatus, { tone: "positive" | "warning" | "critical" | "neutral" }> = {
  connected:    { tone: "positive" },
  degraded:     { tone: "warning" as "positive" },
  disconnected: { tone: "critical" },
  pending:      { tone: "neutral" },
};

const integrations: Integration[] = [
  {
    name: "Supabase",
    category: "Database & Auth",
    description: "Primary data platform — Postgres, Auth, Storage and Realtime.",
    status: "connected",
    lastPing: "22 Oct · 14:35",
    docsUrl: "https://supabase.com/docs",
    credentials: "SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY",
  },
  {
    name: "Resend",
    category: "Email delivery",
    description: "Transactional email for invoices, reminders and notifications.",
    status: "connected",
    lastPing: "22 Oct · 14:30",
    docsUrl: "https://resend.com/docs",
    credentials: "RESEND_API_KEY",
  },
  {
    name: "Inngest",
    category: "Background jobs",
    description: "Scheduled reminders, bulk exports, report generation and retries.",
    status: "degraded",
    lastPing: "22 Oct · 14:20",
    docsUrl: "https://www.inngest.com/docs",
    credentials: "INNGEST_EVENT_KEY + INNGEST_SIGNING_KEY",
  },
  {
    name: "Paystack",
    category: "Payments",
    description: "School-fee collection and SaaS subscription billing where supported.",
    status: "connected",
    lastPing: "22 Oct · 14:31",
    docsUrl: "https://paystack.com/docs",
    credentials: "PAYSTACK_SECRET_KEY + PAYSTACK_PUBLIC_KEY",
  },
  {
    name: "Sentry",
    category: "Error monitoring",
    description: "Application exceptions, performance traces and PII scrubbing.",
    status: "connected",
    lastPing: "22 Oct · 14:34",
    docsUrl: "https://docs.sentry.io",
    credentials: "SENTRY_DSN",
  },
  {
    name: "PostHog",
    category: "Product analytics",
    description: "Privacy-conscious usage analytics. No student PII is sent.",
    status: "connected",
    lastPing: "22 Oct · 14:33",
    docsUrl: "https://posthog.com/docs",
    credentials: "NEXT_PUBLIC_POSTHOG_KEY",
  },
  {
    name: "Vercel",
    category: "Hosting & CI/CD",
    description: "Next.js deployment, preview environments and edge network.",
    status: "connected",
    lastPing: "22 Oct · 14:36",
    docsUrl: "https://vercel.com/docs",
    credentials: "Managed via Vercel dashboard",
  },
];

const connectedCount = integrations.filter((i) => i.status === "connected").length;
const degradedCount  = integrations.filter((i) => i.status === "degraded").length;

export default function IntegrationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform Operations"
        title="Integrations."
        description="Connected services, provider credentials status and connection health for all platform dependencies."
        actions={
          <button type="button" className={ghostButton}>
            <RefreshCw className="size-4" aria-hidden="true" />
            Test all
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Total integrations" value={formatNumber(integrations.length)} hint="configured" icon={<Plug className="size-5" aria-hidden="true" />} />
        <KpiCard label="Connected" value={formatNumber(connectedCount)} hint="healthy" icon={<CheckCircle2 className="size-5" aria-hidden="true" />} />
        <KpiCard label="Degraded" value={formatNumber(degradedCount)} hint="needs attention" icon={<XCircle className="size-5" aria-hidden="true" />} />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {integrations.map((integ) => (
          <div key={integ.name} className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 shadow-xs">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base sm:text-lg font-bold text-ink">{integ.name}</p>
                <span className="mt-1 inline-block font-sans text-xs font-bold uppercase tracking-wider text-ink-soft bg-surface-raised px-2.5 py-0.5 rounded-md">
                  {integ.category}
                </span>
              </div>
              <Pill tone={statusMeta[integ.status].tone}>{integ.status}</Pill>
            </div>

            <p className="text-sm leading-relaxed text-ink-soft">{integ.description}</p>

            <div className="mt-auto space-y-2.5 border-t border-line pt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-ink-soft font-medium">Last ping</span>
                <span className="font-mono text-ink font-bold">{integ.lastPing}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-soft font-medium">Credentials</span>
                <span className="font-mono text-xs font-semibold text-primary">{integ.credentials.split("+")[0].trim()}…</span>
              </div>
            </div>

            <a
              href={integ.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:text-primary-deep"
            >
              <ExternalLink className="size-3.5" aria-hidden="true" />
              Documentation
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 shadow-xs">
        <p className="text-sm sm:text-base font-bold text-ink">Credential security reminder</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Integration credentials are stored as server-side environment variables and are
          never displayed in full after saving. Rotate keys in the provider dashboard and
          update the corresponding environment variable. Never commit secrets to source
          control or expose them via <code className="rounded-md bg-surface-raised border border-line px-1.5 py-0.5 font-mono text-xs font-bold text-primary">NEXT_PUBLIC_</code> variables.
        </p>
      </div>
    </>
  );
}
