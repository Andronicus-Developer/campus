import type { Metadata } from "next";
import {
  CheckCircle2,
  Circle,
  Clock,
  Download,
  Heart,
  MailCheck,
  Plus,
  Timer,
} from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber, platformStats } from "@/lib/platform";

export const metadata: Metadata = { title: "Onboarding & Approvals" };

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";
const primaryButton =
  "inline-flex h-9 items-center gap-2 rounded-full bg-primary px-4 text-xs font-medium text-white transition-colors hover:bg-primary-hover";

type OnboardingStage = "registered" | "verifying" | "provisioning" | "training" | "live";

type OnboardingRecord = {
  id: string;
  school: string;
  owner: string;
  email: string;
  country: string;
  plan: string;
  stage: OnboardingStage;
  progress: number;
  submittedAt: string;
  daysOpen: number;
};

const stageMeta: Record<OnboardingStage, { label: string; tone: "neutral" | "warning" | "positive" | "muted" }> = {
  registered:   { label: "Registered",  tone: "muted"    },
  verifying:    { label: "Verifying",   tone: "neutral"  },
  provisioning: { label: "Provisioning",tone: "warning"  },
  training:     { label: "Training",    tone: "neutral"  },
  live:         { label: "Live",        tone: "positive" },
};

const queue: OnboardingRecord[] = [
  { id: "onb-001", school: "Sunrise Primary School",  owner: "D. Okafor", email: "d.okafor@sunrise.edu",     country: "Nigeria", plan: "Growth",     stage: "verifying",    progress: 35, submittedAt: "20 Oct 2026", daysOpen: 2 },
  { id: "onb-002", school: "St. Catherine's College", owner: "M. Njeru",  email: "m.njeru@stcath.ac.ke",     country: "Kenya",   plan: "Starter",    stage: "provisioning", progress: 60, submittedAt: "19 Oct 2026", daysOpen: 3 },
  { id: "onb-003", school: "Al-Noor Academy",         owner: "F. Bashir", email: "f.bashir@alnoor.edu",      country: "Ghana",   plan: "Enterprise", stage: "training",     progress: 80, submittedAt: "17 Oct 2026", daysOpen: 5 },
  { id: "onb-004", school: "Westminster Prep",        owner: "C. Hughes", email: "c.hughes@westprep.co.uk",  country: "UK",      plan: "Growth",     stage: "registered",   progress: 10, submittedAt: "22 Oct 2026", daysOpen: 0 },
  { id: "onb-005", school: "Brighter Futures School", owner: "A. Mensah", email: "a.mensah@bfs.gh",          country: "Ghana",   plan: "Starter",    stage: "provisioning", progress: 55, submittedAt: "18 Oct 2026", daysOpen: 4 },
  { id: "onb-006", school: "Galaxy International",    owner: "R. Patel",  email: "r.patel@galaxy.in",        country: "India",   plan: "Growth",     stage: "verifying",    progress: 30, submittedAt: "21 Oct 2026", daysOpen: 1 },
];

const onboardingSteps = [
  "School registration form submitted",
  "Domain and contact verification",
  "Tenant provisioning (database, storage)",
  "Owner account created and invited",
  "Initial configuration walkthrough",
  "Pilot data import (optional)",
  "Staff training session",
  "Go-live sign-off",
];

export default function OnboardingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Schools"
        title="Onboarding & approvals."
        description="New-school registrations, onboarding progress, verification and activation queue."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <Download className="size-3.5" aria-hidden="true" />
              Export
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-3.5" aria-hidden="true" />
              Invite school
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="In queue"          value={formatNumber(queue.length)}                      hint="awaiting action"       icon={<Timer     className="size-3.5" aria-hidden="true" />} />
        <KpiCard label="Onboarding"        value={formatNumber(platformStats.onboardingTenants)}   hint="active onboarding"     icon={<Heart     className="size-3.5" aria-hidden="true" />} />
        <KpiCard label="Trials ending soon"value={formatNumber(platformStats.trialsEndingSoon)}    hint="within 7 days"         icon={<Clock     className="size-3.5" aria-hidden="true" />} />
        <KpiCard label="Avg. time to live" value="6.4 days"                                        hint="registration → active" icon={<MailCheck className="size-3.5" aria-hidden="true" />} />
      </div>

      <div className="mt-6">
        <Card title="Onboarding queue" description="Schools registered and awaiting completion.">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-line">
                  {["School", "Owner", "Country", "Plan", "Stage", "Progress", "Days open", ""].map((h) => (
                    <th key={h} className="pb-3 pr-4 text-left font-mono text-[9px] font-bold uppercase tracking-widest text-ink-muted last:pr-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {queue.map((row) => {
                  const sm = stageMeta[row.stage];
                  return (
                    <tr key={row.id} className="group">
                      <td className="py-3 pr-4">
                        <p className="font-semibold text-ink">{row.school}</p>
                        <p className="text-ink-muted">{row.email}</p>
                      </td>
                      <td className="py-3 pr-4 text-ink-soft">{row.owner}</td>
                      <td className="py-3 pr-4 text-ink-soft">{row.country}</td>
                      <td className="py-3 pr-4"><Pill tone="neutral">{row.plan}</Pill></td>
                      <td className="py-3 pr-4"><Pill tone={sm.tone}>{sm.label}</Pill></td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-line">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${row.progress}%` }}
                              aria-hidden="true"
                            />
                          </div>
                          <span className="font-mono text-[10px] text-ink-muted">{row.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`font-mono text-[10px] font-semibold ${row.daysOpen > 3 ? "text-danger" : "text-ink-muted"}`}>
                          {row.daysOpen}d
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button type="button" className="rounded-lg border border-line bg-surface px-3 py-1 text-[11px] font-medium text-ink-soft transition-colors hover:border-primary/30 hover:text-primary">
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card title="Standard onboarding checklist" description="Steps every new school completes before going live.">
          <ol className="space-y-2.5">
            {onboardingSteps.map((step, i) => (
              <li key={step} className="flex items-center gap-3 text-xs text-ink-soft">
                {i < 4 ? (
                  <CheckCircle2 className="size-4 shrink-0 text-success" aria-hidden="true" />
                ) : (
                  <Circle className="size-4 shrink-0 text-ink-muted" aria-hidden="true" />
                )}
                {step}
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  );
}
