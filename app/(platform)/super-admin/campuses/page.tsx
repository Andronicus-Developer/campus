import type { Metadata } from "next";
import { Briefcase, Building2, Download, MapPin, Plus, Users } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Campuses & Organisations" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink-soft shadow-xs transition-colors hover:bg-surface-raised hover:text-ink";
const primaryButton =
  "inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white shadow-xs transition-opacity hover:opacity-95";

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
        eyebrow="Schools & Estates"
        title="Campuses & organisations."
        description="Multi-campus schools, branches and organisational relationships across every active tenant."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <Download className="size-4" aria-hidden="true" />
              Export
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-4" aria-hidden="true" />
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
          icon={<Building2 className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Multi-campus schools"
          value={formatNumber(multiCampusSchools)}
          hint="2+ locations"
          icon={<Briefcase className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Inactive campuses"
          value={formatNumber(inactiveCampuses)}
          hint="suspended or closed"
          icon={<MapPin className="size-5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {campusGroups.map((group) => (
          <Card key={group.slug} title={group.school} description={group.region}>
            <ul className="divide-y divide-line">
              {group.campuses.map((campus) => (
                <li
                  key={campus.name}
                  className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3.5">
                    <MapPin className="size-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-sm sm:text-base font-bold text-ink">{campus.name}</p>
                      <p className="mt-0.5 font-sans text-xs font-bold uppercase tracking-wider text-ink-soft">
                        {campus.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
                      <Users className="size-4 text-ink-muted" aria-hidden="true" />
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
