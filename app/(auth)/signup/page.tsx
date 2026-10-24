import type { Metadata } from "next";
import { CheckCircle2, Sparkles, Star, Zap } from "lucide-react";
import { SignupForm } from "@/components/auth/signup-form";
import { FormShell } from "@/components/forms/form-shell";
import { Eyebrow } from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Create your account — Campus360",
  description:
    "Start a full-feature Campus360 trial for your school. No card required.",
};

const trialBenefits = [
  "All 35+ academic and financial modules unlocked",
  "Automated student attendance & parent SMS alerts",
  "Instant continuous assessment & report card generator",
  "Automated fee invoicing, card payments & reconciliation",
  "Dedicated school subdomain: yourschool.campus360.app",
];

export default function SignupPage() {
  return (
    <FormShell
      widthClass="max-w-[34rem]"
      aside={
        <div className="flex flex-col justify-between h-full space-y-8">
          {/* Header section */}
          <div>
            <Eyebrow tone="light">
              <Sparkles className="size-3" aria-hidden="true" />
              Instant School Onboarding
            </Eyebrow>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight leading-tight text-white xl:text-[2.6rem]">
              Everything your school needs from Day 1.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Experience the full power of a modern multi-tenant school operating system.
              Zero setup fees, no card required, and export your data at any time.
            </p>

            {/* Feature benefits */}
            <ul className="mt-8 space-y-3.5">
              {trialBenefits.map((item) => (
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

          {/* Provisioning preview card */}
          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-[11px] font-semibold text-white/90">
                Workspace Provisioning Engine
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/20 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
                <Zap className="size-2.5" />
                Instant
              </span>
            </div>

            <div className="mt-3 space-y-2 font-mono text-[11px] text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3 text-success shrink-0" />
                <span>Isolated tenant database &amp; storage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3 text-success shrink-0" />
                <span>46 pre-seeded role permissions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-3 text-success shrink-0" />
                <span>Academic year &amp; term structure initialized</span>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <figure className="rounded-2xl border border-white/12 bg-white/5 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-1 text-amber-400 mb-2.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <blockquote className="text-sm font-medium leading-relaxed text-white/95">
              &ldquo;We set up our entire 800-student school in an afternoon. Fee collection
              improved by 35% in our very first term because parent reminders went out automatically.&rdquo;
            </blockquote>
            <figcaption className="mt-3.5 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
              <span className="font-semibold text-white">Sister Claire Nnamdi</span>
              <span className="font-mono text-[11px] text-white/60">Administrator · St. Peter&apos;s College</span>
            </figcaption>
          </figure>
        </div>
      }
    >
      <SignupForm />
    </FormShell>
  );
}
