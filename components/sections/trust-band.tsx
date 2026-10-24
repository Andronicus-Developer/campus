import { Reveal } from "@/components/marketing/reveal";
import { Container } from "@/components/site/primitives";
import { schoolLogos, stats } from "@/lib/site-content";

export function TrustBand() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-2">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 60}>
                <div className="rounded-2xl border border-line bg-canvas p-5">
                  <p className="text-3xl font-extrabold leading-none text-ink lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-ink-muted">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* School names */}
          <Reveal delay={140}>
            <div className="rounded-2xl border border-line bg-primary-light p-6 lg:border-l-4 lg:border-l-primary">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Trusted by independent schools
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
                {schoolLogos.map((name) => (
                  <li key={name} className="text-sm font-semibold text-ink-soft">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
