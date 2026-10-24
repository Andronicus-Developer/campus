import type { Metadata } from "next";
import { CheckCircle2, Lock, Sparkles, Star } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { FormShell } from "@/components/forms/form-shell";
import { Eyebrow } from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Sign in — Campus360",
  description:
    "Sign in to your Campus360 workspace to manage admissions, attendance, assessments and fees.",
};

const securityHighlights = [
  "Strict Row-Level Security isolates every school's data",
  "Immutable audit logs track every sensitive academic & fee action",
  "Instant role-based authorization for teachers, bursars & parents",
  "Compatible with Google Workspace & Microsoft 365 SSO",
];

export default function LoginPage() {
  return (
    <FormShell
      widthClass="max-w-[28rem]"
      aside={
        <div className="flex flex-col justify-between h-full space-y-8">
          {/* Header section */}
          <div>
            <Eyebrow tone="light">
              <Sparkles className="size-3" aria-hidden="true" />
              Multi-Tenant School Architecture
            </Eyebrow>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight leading-tight text-white xl:text-[2.6rem]">
              One sign-in for your entire campus.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Leadership, educators, finance teams, and guardians each land on
              the precise view their permissions authorize — protected by database-enforced RLS.
            </p>

            {/* Security checklist */}
            <ul className="mt-8 space-y-3.5">
              {securityHighlights.map((item) => (
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

          {/* Interactive Live Status Card */}
          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-success" />
                </span>
                <span className="font-mono text-[11px] font-semibold text-white/90">
                  Tenant Isolation Verified
                </span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 font-mono text-[10px] text-white/80">
                <Lock className="size-2.5" />
                RLS Enforced
              </span>
            </div>

            <div className="mt-3.5 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-white/5 p-2.5">
                <span className="block text-base font-extrabold text-white">45k+</span>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-white/60">Students</span>
              </div>
              <div className="rounded-xl bg-white/5 p-2.5">
                <span className="block text-base font-extrabold text-white">99.98%</span>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-white/60">Uptime</span>
              </div>
              <div className="rounded-xl bg-white/5 p-2.5">
                <span className="block text-base font-extrabold text-emerald-400">0</span>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-white/60">Leaks</span>
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
              &ldquo;We retired four different spreadsheets and a WhatsApp coordination group
              within 48 hours of onboarding. Attendance and gradebooks are seamless.&rdquo;
            </blockquote>
            <figcaption className="mt-3.5 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
              <span className="font-semibold text-white">Dr. Marcus Sterling</span>
              <span className="font-mono text-[11px] text-white/60">Principal · Meadowbrook School</span>
            </figcaption>
          </figure>
        </div>
      }
    >
      <LoginForm />
    </FormShell>
  );
}
