import { Lock, ShieldCheck, ShieldOff } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { Container, Eyebrow } from "@/components/site/primitives";
import { securityPoints } from "@/lib/site-content";

export function Security() {
  return (
    <section
      id="security"
      className="relative scroll-mt-24 overflow-hidden border-b border-line bg-ink text-white"
    >
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden="true" />
      {/* Colour blobs */}
      <div className="pointer-events-none absolute -top-32 -right-32 size-[500px] gradient-blob-blue opacity-30" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 size-[400px] gradient-blob-violet opacity-25" aria-hidden="true" />

      <Container className="relative py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <Eyebrow tone="light">
              <ShieldCheck className="size-3" aria-hidden="true" />
              Security &amp; multi-tenancy
            </Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]">
              Isolation enforced{" "}
              <span className="text-gradient">in the database</span>,
              not just the app.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/65">
              School records are some of the most sensitive data an institution
              holds. Campus360 assumes a mistake in the application layer should
              never become a data leak, so the boundary lives where the data does.
            </p>

            {/* Feature badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: ShieldCheck, text: "Row-level security on every table" },
                { icon: Lock,        text: "Signed URLs for all file access" },
                { icon: ShieldOff,   text: "Cross-tenant denial tested in CI" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5"
                >
                  <Icon className="size-4 text-primary" aria-hidden="true" />
                  <span className="text-sm text-white/80">{text}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="flex flex-col gap-0">
            {securityPoints.map((point, index) => (
              <Reveal key={point.title} delay={index * 70}>
                <div className="flex gap-5 border-b border-white/10 py-6 last:border-0 last:pb-0 first:pt-0">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/20 font-mono text-[10px] font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">{point.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-white/60">{point.description}</p>
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
