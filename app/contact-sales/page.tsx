import type { Metadata } from "next";
import { CheckCircle2, Clock, Mail, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { FormShell } from "@/components/forms/form-shell";
import { SalesForm } from "@/components/forms/sales-form";
import { Eyebrow } from "@/components/site/primitives";
import { siteMeta } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Talk to sales — Campus360",
  description:
    "Talk to the Campus360 sales team about multi-campus reporting, SSO, white-glove migration, custom SLAs, and school consortium pricing.",
};

const enterpriseCapabilities = [
  "Consolidated Multi-Campus Reporting & Treasury Control",
  "Custom SAML 2.0, Okta & Azure Active Directory SSO",
  "White-Glove Legacy Data Migration with Zero Downtime",
  "Dedicated Customer Success Manager & 99.99% Uptime SLA",
  "Support for British, American, WAEC, and IB Curricula",
];

export default function ContactSalesPage() {
  return (
    <FormShell
      widthClass="max-w-[34rem]"
      aside={
        <div className="flex flex-col justify-between h-full space-y-8">
          {/* Header section */}
          <div>
            <Eyebrow tone="light">
              <Sparkles className="size-3" aria-hidden="true" />
              Institutional &amp; Group Solutions
            </Eyebrow>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight leading-tight text-white xl:text-[2.6rem]">
              Built for school trusts and expanding campuses.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Empower central leadership with real-time auditability across every campus,
              while giving each school its own autonomous timetable, grading, and fees.
            </p>

            {/* Capabilities list */}
            <ul className="mt-8 space-y-3.5">
              {enterpriseCapabilities.map((item) => (
                <li key={item} className="flex items-start gap-3 text-xs text-white/90 font-medium">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-success"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Line / Contact Box */}
          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-[11px] font-semibold text-white/90">
                Direct Enterprise Advisory Line
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                <Clock className="size-2.5" />
                &lt; 4 hr reply
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <a
                href={siteMeta.salesHref}
                className="flex items-center gap-2.5 text-xs font-semibold text-white transition-colors hover:text-emerald-300"
              >
                <Phone className="size-3.5 text-primary-light" />
                <span>{siteMeta.sales}</span>
              </a>

              <a
                href={`mailto:${siteMeta.email}`}
                className="flex items-center gap-2.5 text-xs font-semibold text-white transition-colors hover:text-emerald-300"
              >
                <Mail className="size-3.5 text-primary-light" />
                <span className="font-mono">{siteMeta.email}</span>
              </a>
            </div>
          </div>

          {/* Compliance & SLA Assurance */}
          <div className="rounded-2xl border border-white/12 bg-white/5 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <ShieldCheck className="size-4 text-success" />
              <span>Institutional SLA &amp; Data Sovereignty</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              Contractually guaranteed 99.99% uptime, complete database Row-Level Security isolation, and local jurisdiction compliance.
            </p>
          </div>
        </div>
      }
    >
      <SalesForm />
    </FormShell>
  );
}
