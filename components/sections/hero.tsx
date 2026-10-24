import Link from "next/link";
import { ArrowRight, CalendarCheck, Check, Sparkles } from "lucide-react";
import { AppFrame } from "@/components/marketing/app-frame";
import { HeroPreview } from "@/components/marketing/hero-preview";
import { Container, Eyebrow } from "@/components/site/primitives";

const proofPoints = ["Setup in an afternoon", "No card required", "Cancel anytime"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      {/* Dot-grid background */}
      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60" aria-hidden="true" />

      {/* Colour blobs */}
      <div className="pointer-events-none absolute -top-40 -right-32 size-[640px] gradient-blob-blue opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-[440px] gradient-blob-violet opacity-40" aria-hidden="true" />

      <Container className="relative pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          {/* Left copy */}
          <div>
            <div className="load-rise">
              <Eyebrow>
                <Sparkles className="size-3" aria-hidden="true" />
                Multi-tenant school management
              </Eyebrow>
            </div>

            <h1
              className="load-rise mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[4rem]"
              style={{ animationDelay: "80ms" }}
            >
              Run your whole school{" "}
              <span className="text-gradient">smarter and&nbsp;faster.</span>
            </h1>

            <p
              className="load-rise mt-6 max-w-xl text-base leading-7 text-ink-muted sm:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              Campus360 brings admissions, attendance, assessments, report cards and fee
              collection into one beautifully unified platform — every school&rsquo;s data
              isolated, every action auditable.
            </p>

            <div
              className="load-rise mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                href="/signup"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover hover:shadow-primary/40"
              >
                Start free trial
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/book-demo"
                className="inline-flex h-12 items-center rounded-xl border border-line bg-surface px-7 text-sm font-semibold text-ink transition-colors hover:border-primary/40 hover:bg-primary-light hover:text-primary"
              >
                Book a demo
              </Link>
            </div>

            <ul
              className="load-rise mt-7 flex flex-wrap gap-x-6 gap-y-2"
              style={{ animationDelay: "320ms" }}
            >
              {proofPoints.map((point) => (
                <li key={point} className="flex items-center gap-2 text-sm text-ink-muted">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-success-light">
                    <Check className="size-3 text-success-deep" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — app preview */}
          <div className="load-rise relative" style={{ animationDelay: "200ms" }}>
            <AppFrame>
              <HeroPreview />
            </AppFrame>

            {/* Floating badge — attendance */}
            <div className="absolute top-14 -right-4 hidden items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-xl lg:flex">
              <span className="grid size-9 place-items-center rounded-xl bg-success-light">
                <CalendarCheck className="size-4 text-success-deep" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold">Register saved</span>
                <span className="block font-mono text-[10px] text-ink-muted">
                  Grade 7B · 08:12
                </span>
              </span>
            </div>

            {/* Floating badge — fee collection */}
            <div className="absolute -bottom-6 -left-6 hidden w-48 rounded-2xl border border-line bg-surface p-4 shadow-xl lg:block">
              <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">
                Fee collection
              </p>
              <p className="mt-1.5 text-2xl font-extrabold leading-none text-ink">82%</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
                <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-primary to-accent" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
