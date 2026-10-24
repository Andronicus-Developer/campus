import type { Metadata } from "next";
import { Briefcase, Building2, Download, MapPin, Plus, Users } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Campuses & Organisations" };

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";
const primaryButton =
  "inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-xs font-medium text-paper transition-colors hover:bg-ink-soft";

type CampusGroup = {
  school: string;
  slug: string;
  region: string;
  campuses: { name: string; city: string; students: number; status: "active" | "inactive" }[];
};

const campusGroups: CampusGroup[] = [
  {
    school: "Greenfield Academy",
    slug: "greenfield",
    region: "Lagos, Nigeria",
    campuses: [
      { name: "Greenfield Main Campus", city: "Ikeja", students: 1420, status: "active" },
      { name: "Greenfield Annex — VI", city: "Victoria Island", students: 680, status: "active" },
    ],
  },
  {
    school: "Horizon International",
    slug: "horizon",
    region: "Nairobi, Kenya",
    campuses: [
      { name: "Westlands Campus", city: "Westlands", students: 890, status: "active" },
      { name: "Karen Campus", city: "Karen", students: 530, status: "active" },
      { name: "Thika Road Campus", city: "Thika Road", students: 310, status: "inactive" },
    ],
  },
  {
    school: "Meridian Schools",
    slug: "meridian",
    region: "London, UK",
    campuses: [
      { name: "Meridian North", city: "Islington", students: 740, status: "active" },
      { name: "Meridian South", city: "Brixton", students: 660, status: "active" },
    ],
  },
  {
    school: "Pinnacle Academy",
    slug: "pinnacle",
    region: "Accra, Ghana",
    campuses: [
      { name: "East Legon Campus", city: "East Legon", students: 1100, status: "active" },
    ],
  },
];

const totalCampuses = campusGroups.reduce((acc, g) => acc + g.campuses.length, 0);
const multiCampusSchools = campusGroups.filter((g) => g.campuses.length > 1).length;
const inactiveCampuses = campusGroups.flatMap((g) => g.campuses).filter((c) => c.status === "inactive").length;

export default function CampusesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Schools"
        title="Campuses & organisations."
        description="Multi-campus schools, branches and organisational relationships across every active tenant."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <Download className="size-3.5" aria-hidden="true" />
              Export
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-3.5" aria-hidden="true" />
              Add campus
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Total campuses"
          value={formatNumber(totalCampuses)}
          hint="across all tenants"
          icon={<Building2 className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Multi-campus schools"
          value={formatNumber(multiCampusSchools)}
          hint="2+ locations"
          icon={<Briefcase className="size-3.5" aria-hidden="true" />}
        />
        <KpiCard
          label="Inactive campuses"
          value={formatNumber(inactiveCampuses)}
          hint="suspended or closed"
          icon={<MapPin className="size-3.5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {campusGroups.map((group) => (
          <Card key={group.slug} title={group.school} description={group.region}>
            <ul className="divide-y divide-line">
              {group.campuses.map((campus) => (
                <li
                  key={campus.name}
                  className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="size-4 shrink-0 text-ink-muted" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-medium">{campus.name}</p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
                        {campus.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-ink-soft">
                      <Users className="size-3.5 text-ink-muted" aria-hidden="true" />
                      {formatNumber(campus.students)} students
                    </span>
                    <Pill tone={campus.status === "active" ? "positive" : "muted"}>
                      {campus.status}
                    </Pill>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </>
  );
}
