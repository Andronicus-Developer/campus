import { Plus } from "lucide-react";
import { Reveal } from "@/components/marketing/reveal";
import { Container, Eyebrow } from "@/components/site/primitives";
import { faqs } from "@/lib/site-content";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 border-b border-line bg-surface">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Questions, answered</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.8rem]">
              The things schools ask us first.
            </h2>
            <p className="mt-5 text-base leading-7 text-ink-muted">
              Still unsure about something? Talk to a human and we&apos;ll walk you
              through it.
            </p>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-light p-5">
              <p className="text-sm font-semibold text-ink">Still have questions?</p>
              <p className="mt-1 text-sm text-ink-muted">
                Our team is available weekdays 8 am – 6 pm WAT.
              </p>
              <a
                href="/contact-sales"
                className="mt-4 inline-flex h-9 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                Chat with us
              </a>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-canvas">
              {faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                    <span className="font-semibold text-ink transition-colors group-hover:text-primary">
                      {faq.question}
                    </span>
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary-light transition-all group-open:rotate-45">
                      <Plus className="size-3.5 text-primary" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="px-6 pb-5 text-sm leading-7 text-ink-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
