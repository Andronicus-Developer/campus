import type { Metadata } from "next";
import { Eye, Megaphone, Plus, Send } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Announcements" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink hover:bg-surface-raised transition-all shadow-xs";
const primaryButton =
  "inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-sm font-bold text-paper transition-all hover:bg-ink-soft shadow-xs";

type AnnouncementStatus   = "published" | "draft" | "scheduled" | "archived";
type AnnouncementAudience = "All tenants" | "Trial tenants" | "Enterprise" | "Growth" | "Specific schools" | "Platform operators";

type Announcement = {
  id: string;
  title: string;
  audience: AnnouncementAudience;
  status: AnnouncementStatus;
  author: string;
  publishedAt: string | null;
  views: number | null;
};

const statusMeta: Record<AnnouncementStatus, { tone: "positive" | "neutral" | "muted" | "warning" }> = {
  published: { tone: "positive" },
  draft:     { tone: "muted" },
  scheduled: { tone: "neutral" },
  archived:  { tone: "muted" },
};

const announcements: Announcement[] = [
  { id: "ann-014", title: "Platform maintenance window — 25 Oct 2026 02:00–04:00 UTC", audience: "All tenants", status: "scheduled", author: "S. Adeyemi", publishedAt: "24 Oct 2026", views: null },
  { id: "ann-013", title: "New feature: Bulk attendance import now available", audience: "All tenants", status: "published", author: "S. Adeyemi", publishedAt: "18 Oct 2026", views: 1041 },
  { id: "ann-012", title: "Trial extension available — contact support before 31 Oct", audience: "Trial tenants", status: "published", author: "T. Mensah", publishedAt: "15 Oct 2026", views: 156 },
  { id: "ann-011", title: "Enterprise SLA update — response time reduced to 4 hours", audience: "Enterprise", status: "published", author: "S. Adeyemi", publishedAt: "10 Oct 2026", views: 48 },
  { id: "ann-010", title: "Q4 pricing change draft — internal review only", audience: "Platform operators", status: "draft", author: "R. Kiptoo", publishedAt: null, views: null },
  { id: "ann-009", title: "Paystack webhook retry improvements deployed", audience: "All tenants", status: "archived", author: "S. Adeyemi", publishedAt: "01 Oct 2026", views: 984 },
];

const publishedCount  = announcements.filter((a) => a.status === "published").length;
const scheduledCount  = announcements.filter((a) => a.status === "scheduled").length;
const totalViews      = announcements.reduce((acc, a) => acc + (a.views ?? 0), 0);

export default function AnnouncementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support & Communication"
        title="Announcements."
        description="Platform-wide notices, maintenance announcements and targeted messages to tenant groups."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <Eye className="size-4" aria-hidden="true" />
              Preview
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-4" aria-hidden="true" />
              New announcement
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard label="Published" value={formatNumber(publishedCount)} hint="live announcements" icon={<Megaphone className="size-5" aria-hidden="true" />} />
        <KpiCard label="Scheduled" value={formatNumber(scheduledCount)} hint="pending publish" icon={<Send className="size-5" aria-hidden="true" />} />
        <KpiCard label="Total views" value={formatNumber(totalViews)} hint="published posts" icon={<Eye className="size-5" aria-hidden="true" />} />
      </div>

      <div className="mt-8">
        <Card title="Announcement log" description="All platform announcements across all audiences.">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line bg-surface-raised/60">
                  {["Title", "Audience", "Status", "Author", "Published", "Views", ""].map((h) => (
                    <th key={h} className="py-4 px-6 font-sans text-xs font-bold uppercase tracking-wider text-slate-700 last:text-right">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {announcements.map((ann) => (
                  <tr key={ann.id} className="hover:bg-sand/20 transition-colors">
                    <td className="py-4 px-6 text-sm sm:text-base font-bold text-ink">{ann.title}</td>
                    <td className="py-4 px-6"><Pill tone="neutral">{ann.audience}</Pill></td>
                    <td className="py-4 px-6"><Pill tone={statusMeta[ann.status].tone}>{ann.status}</Pill></td>
                    <td className="py-4 px-6 text-sm font-bold text-ink-soft">{ann.author}</td>
                    <td className="py-4 px-6 text-sm font-medium text-ink-muted">{ann.publishedAt ?? "—"}</td>
                    <td className="py-4 px-6 font-mono text-xs font-bold text-ink">{ann.views != null ? formatNumber(ann.views) : "—"}</td>
                    <td className="py-4 px-6 text-right">
                      <button type="button" className="rounded-xl border border-line bg-surface px-4 py-2 text-xs font-bold text-ink hover:bg-surface-raised transition-colors shadow-xs">
                        Edit
                      </button>
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
