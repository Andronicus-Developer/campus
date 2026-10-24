import { Reveal } from "@/components/marketing/reveal";
import { Container, Eyebrow } from "@/components/site/primitives";
import { steps } from "@/lib/site-content";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-b border-line bg-canvas">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <Eyebrow>From sign-up to term one</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.8rem]">
              Live in an afternoon, not a semester.
            </h2>
            <p className="mt-5 text-base leading-7 text-ink-muted">
              You don&apos;t need a consultant or a data team. Configure your school,
              bring your people in, and get back to teaching.
            </p>

            {/* Visual decoration */}
            <div className="mt-10 flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary-light p-5">
              <div className="flex -space-x-2">
                {["SA", "TM", "RK"].map((init) => (
                  <span
                    key={init}
                    className="grid size-9 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-primary to-accent text-xs font-bold text-white"
                  >
                    {init}
                  </span>
                ))}
              </div>
              <p className="text-sm font-medium text-ink-soft">
                1,200+ schools already running
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-0">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 90}>
                <div className="flex gap-5 border-b border-line py-7 last:border-0 last:pb-0 first:pt-0">
                  {/* Step number bubble */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white shadow-md shadow-primary/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {index < steps.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-primary/30 to-transparent" />
                    )}
                  </div>
                  <div className="pb-2">
                    <h3 className="text-lg font-bold text-ink">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-ink-muted">{step.description}</p>
                    <p className="mt-2.5 inline-flex rounded-lg bg-primary-light px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
