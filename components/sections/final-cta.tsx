import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { Container, Eyebrow } from "@/components/site/primitives";

export function FinalCta() {
  return (
    <section id="demo" className="scroll-mt-24 bg-canvas">
      <Container className="py-20 lg:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-deep to-accent px-8 py-16 text-center shadow-2xl shadow-primary/30 lg:px-16 lg:py-24">
            {/* Grid overlay */}
            <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" aria-hidden="true" />
            {/* Glow blobs */}
            <div className="pointer-events-none absolute -top-24 right-[-6%] size-[360px] gradient-blob-violet opacity-40" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 -left-12 size-[300px] gradient-blob-blue opacity-30" aria-hidden="true" />

            <div className="relative">
              <Eyebrow tone="light" className="justify-center">
                <Sparkles className="size-3" aria-hidden="true" />
                Book a demo
              </Eyebrow>

              <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[3rem]">
                Bring your whole school into one smart, unified workspace.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/70">
                See Campus360 with your own classes and workflows, or start a
                full-feature trial today. No card required.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  href="/signup"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-7 text-sm font-bold text-primary shadow-lg transition-all hover:bg-white/90 hover:shadow-xl"
                >
                  Start free trial
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact-sales"
                  className="inline-flex h-12 items-center rounded-xl border border-white/25 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Talk to sales
                </Link>
              </div>

              {/* Social proof row */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                {["1,200+ schools", "No credit card", "Setup in a day"].map((item) => (
                  <span key={item} className="flex items-center gap-2 text-sm text-white/70">
                    <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
