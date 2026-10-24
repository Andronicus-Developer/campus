import { Check } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { Container, Eyebrow } from "@/components/site/primitives";
import { features } from "@/lib/site-content";

// Bright accent colours cycling through feature cards
const iconBg = [
  "bg-primary text-white",
  "bg-accent text-white",
  "bg-success text-white",
  "bg-orange text-white",
  "bg-warning text-ink",
  "bg-primary text-white",
  "bg-accent text-white",
  "bg-success text-white",
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 border-b border-line bg-canvas">
      <Container className="py-20 lg:py-28">
        <Reveal>
          <Eyebrow>Everything a school runs on</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.8rem]">
            One platform, every daily workflow.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-ink-muted">
            Stop stitching together spreadsheets, chat groups and paper registers.
            Campus360 keeps academic, administrative and financial work in one place.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 3) * 80} className="h-full">
              <article className="card-lift group flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <span
                  className={`grid size-11 place-items-center rounded-xl text-sm font-bold shadow-sm ${iconBg[index % iconBg.length]}`}
                >
                  <feature.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{feature.title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-ink-muted">
                  {feature.description}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-xs text-ink-soft">
                      <span className="grid size-4 shrink-0 place-items-center rounded-full bg-primary-light">
                        <Check className="size-2.5 text-primary" aria-hidden="true" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
