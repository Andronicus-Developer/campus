import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { FormShell } from "@/components/forms/form-shell";
import { Eyebrow } from "@/components/site/primitives";

const highlights = [
  "Admissions, attendance and assessments in one workspace",
  "Fees, invoices and receipts that reconcile themselves",
  "Every school isolated by row-level security",
];

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <FormShell
      aside={
        <>
          <div className="relative">
            <Eyebrow tone="light">Multi-tenant school management</Eyebrow>
            <h2 className="mt-6 max-w-md font-display text-3xl font-light leading-tight tracking-tight xl:text-[2.6rem]">
              One sign-in for every part of the school.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-paper/70">
              Admins, teachers, bursars and families each land on exactly the view
              their role allows — nothing more.
            </p>
          </div>

          <ul className="relative mt-12 space-y-4">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-sm text-paper/85"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-vermilion"
                  aria-hidden="true"
                />
                {highlight}
              </li>
            ))}
          </ul>

          <figure className="relative mt-12 rounded-2xl border border-white/12 bg-white/5 p-5">
            <blockquote className="font-display text-lg leading-snug text-paper">
              &ldquo;We retired four spreadsheets and a chat group in the first
              week.&rdquo;
            </blockquote>
            <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55">
              Registrar · Meadowbrook School
            </figcaption>
          </figure>
        </>
      }
    >
      {children}
    </FormShell>
  );
}
