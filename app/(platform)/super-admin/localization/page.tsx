import type { Metadata } from "next";
import { Globe2, Plus, Save } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Localization & Regional Settings" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink hover:bg-surface-raised transition-all shadow-xs";
const primaryButton =
  "inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-sm font-bold text-paper transition-all hover:bg-ink-soft shadow-xs";

type LocaleStatus = "active" | "beta" | "planned";

type SupportedLocale = {
  code: string;
  name: string;
  region: string;
  currency: string;
  dateFormat: string;
  status: LocaleStatus;
  schools: number;
};

const localeStatusMeta: Record<LocaleStatus, { tone: "positive" | "warning" | "muted" }> = {
  active:  { tone: "positive" },
  beta:    { tone: "warning" as "positive" },
  planned: { tone: "muted" },
};

const locales: SupportedLocale[] = [
  { code: "en-NG", name: "English (Nigeria)",    region: "West Africa",   currency: "NGN (₦)", dateFormat: "DD/MM/YYYY", status: "active",  schools: 398 },
  { code: "en-GH", name: "English (Ghana)",      region: "West Africa",   currency: "GHS (₵)", dateFormat: "DD/MM/YYYY", status: "active",  schools: 214 },
  { code: "en-KE", name: "English (Kenya)",      region: "East Africa",   currency: "KES (Ksh)", dateFormat: "DD/MM/YYYY", status: "active", schools: 187 },
  { code: "en-GB", name: "English (UK)",         region: "UK & Europe",   currency: "GBP (£)", dateFormat: "DD MMM YYYY", status: "active", schools: 143 },
  { code: "en-US", name: "English (US)",         region: "North America", currency: "USD ($)", dateFormat: "MM/DD/YYYY", status: "active",  schools: 98 },
  { code: "en-IN", name: "English (India)",      region: "South Asia",    currency: "INR (₹)", dateFormat: "DD/MM/YYYY", status: "beta",   schools: 42 },
  { code: "fr-SN", name: "Français (Sénégal)",   region: "West Africa",   currency: "XOF (CFA)", dateFormat: "DD/MM/YYYY", status: "planned", schools: 0 },
  { code: "sw-TZ", name: "Kiswahili (Tanzania)", region: "East Africa",   currency: "TZS (TSh)", dateFormat: "DD/MM/YYYY", status: "planned", schools: 0 },
];

const platformDefaults = [
  { label: "Default locale",        value: "en-NG" },
  { label: "Default timezone",      value: "Africa/Lagos (UTC+1)" },
  { label: "Default currency",      value: "USD ($)" },
  { label: "Default date format",   value: "DD MMM YYYY" },
  { label: "First day of week",     value: "Monday" },
  { label: "Number format",         value: "1,000.00 (comma thousands)" },
  { label: "Supported timezones",   value: "All tz database zones" },
];

export default function LocalizationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Settings & Compliance"
        title="Localization & regional settings."
        description="Default timezone, locale, date formats, supported currencies and language options per school."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <Plus className="size-4" aria-hidden="true" />
              Add locale
            </button>
            <button type="button" className={primaryButton}>
              <Save className="size-4" aria-hidden="true" />
              Save defaults
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Active locales"
          value={formatNumber(locales.filter((l) => l.status === "active").length)}
          hint="fully supported"
          icon={<Globe2 className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Beta locales"
          value={formatNumber(locales.filter((l) => l.status === "beta").length)}
          hint="in testing"
          icon={<Globe2 className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Planned locales"
          value={formatNumber(locales.filter((l) => l.status === "planned").length)}
          hint="on roadmap"
          icon={<Globe2 className="size-5" aria-hidden="true" />}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Locale table */}
        <Card title="Supported locales" description="Regions and languages available to tenant schools.">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line bg-surface-raised/60">
                  {["Locale", "Region", "Currency", "Date format", "Schools", "Status"].map((h) => (
                    <th key={h} className="py-4 px-6 font-sans text-xs font-bold uppercase tracking-wider text-slate-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {locales.map((locale) => (
                  <tr key={locale.code} className="hover:bg-sand/20 transition-colors">
                    <td className="py-4 px-6">
                      <p className="text-sm sm:text-base font-bold text-ink">{locale.name}</p>
                      <p className="font-mono text-xs font-bold text-primary mt-0.5">{locale.code}</p>
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-ink-soft">{locale.region}</td>
                    <td className="py-4 px-6 font-mono text-xs font-bold text-ink">{locale.currency}</td>
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-ink-muted">{locale.dateFormat}</td>
                    <td className="py-4 px-6 font-mono text-xs font-bold text-ink">{locale.schools}</td>
                    <td className="py-4 px-6">
                      <Pill tone={localeStatusMeta[locale.status].tone}>{locale.status}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Platform defaults */}
        <Card title="Platform defaults" description="Settings new tenants inherit at provisioning.">
          <dl className="space-y-4">
            {platformDefaults.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0"
              >
                <dt className="text-sm font-bold text-ink-soft">{item.label}</dt>
                <dd className="rounded-lg border border-line bg-paper px-3 py-1 font-mono text-xs font-bold text-primary">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </>
  );
}
