"use client";

import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { Container, Eyebrow } from "@/components/site/primitives";
import { plans } from "@/lib/site-content";

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="scroll-mt-24 border-b border-line bg-canvas">
      <Container className="py-20 lg:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">
              <Zap className="size-3" aria-hidden="true" />
              Simple, per-school pricing
            </Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.8rem]">
              One price for the whole school.
            </h2>
            <p className="mt-5 text-base leading-7 text-ink-muted">
              No per-student surprises and no module add-ons. Start with a full-feature
              trial and choose a plan when you&apos;re ready.
            </p>

            {/* Toggle */}
            <div className="mt-8 flex justify-center">
              <div
                role="group"
                aria-label="Billing period"
                className="inline-flex items-center rounded-xl border border-line bg-surface p-1 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setAnnual(false)}
                  aria-pressed={!annual}
                  className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all ${
                    annual ? "text-ink-muted" : "bg-primary text-white shadow-sm"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setAnnual(true)}
                  aria-pressed={annual}
                  className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition-all ${
                    annual ? "bg-primary text-white shadow-sm" : "text-ink-muted"
                  }`}
                >
                  Annual
                  <span className="rounded-full bg-success px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    −20%
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const highlight = Boolean(plan.highlight);
            const price = annual ? plan.annual : plan.monthly;

            return (
              <Reveal key={plan.name} delay={index * 80} className={`h-full ${highlight ? "lg:-mt-4 lg:mb-4" : ""}`}>
                <article
                  className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                    highlight
                      ? "border-primary bg-gradient-to-b from-primary to-primary-deep text-white shadow-2xl shadow-primary/40"
                      : "border-line bg-surface hover:border-primary/30 hover:shadow-lg"
                  }`}
                >
                  {highlight && (
                    <span className="absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-full bg-warning px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
                      <Zap className="size-3" aria-hidden="true" />
                      Most popular
                    </span>
                  )}

                  <h3 className={`text-xl font-extrabold ${highlight ? "text-white" : "text-ink"}`}>
                    {plan.name}
                  </h3>
                  <p className={`mt-2 text-sm leading-6 ${highlight ? "text-white/70" : "text-ink-muted"}`}>
                    {plan.tagline}
                  </p>

                  <div className="mt-6">
                    {price === null ? (
                      <span className={`text-4xl font-extrabold ${highlight ? "text-white" : "text-ink"}`}>
                        Custom
                      </span>
                    ) : (
                      <div className="flex items-baseline gap-1.5">
                        <span className={`text-4xl font-extrabold ${highlight ? "text-white" : "text-ink"}`}>
                          ${price}
                        </span>
                        <span className={`text-sm ${highlight ? "text-white/60" : "text-ink-muted"}`}>
                          /month
                        </span>
                      </div>
                    )}
                    <p className={`mt-1.5 font-mono text-[10px] uppercase tracking-widest ${highlight ? "text-white/50" : "text-ink-muted"}`}>
                      {price === null
                        ? "Tailored to your group"
                        : annual
                          ? "Per school · billed annually"
                          : "Per school · billed monthly"}
                    </p>
                  </div>

                  <a
                    href={plan.ctaHref}
                    className={`mt-6 inline-flex h-11 items-center justify-center rounded-xl text-sm font-bold transition-all ${
                      highlight
                        ? "bg-white text-primary hover:bg-white/90 shadow-sm"
                        : "border border-primary bg-primary-light text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    {plan.ctaLabel}
                  </a>

                  <ul className={`mt-7 space-y-3.5 border-t pt-6 ${highlight ? "border-white/15" : "border-line"}`}>
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${highlight ? "bg-white/20" : "bg-success-light"}`}>
                          <Check className={`size-3 ${highlight ? "text-white" : "text-success-deep"}`} aria-hidden="true" />
                        </span>
                        <span className={highlight ? "text-white/85" : "text-ink-soft"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
