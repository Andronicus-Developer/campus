import type { Metadata } from "next";
import { Clock, Sparkles, Star } from "lucide-react";
import { DemoForm } from "@/components/forms/demo-form";
import { FormShell } from "@/components/forms/form-shell";
import { Eyebrow } from "@/components/site/primitives";
import { siteMeta } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Book a demo — Campus360",
  description:
    "Book a 30-minute walkthrough of Campus360 with an Education Solutions Architect, tailored to your school's workflows.",
};

const agendaItems = [
  {
    step: "01",
    title: "Workflow Diagnosis (5 mins)",
    desc: "We discuss your current setup, student count, and bottlenecks across registers, assessments, or fees.",
  },
  {
    step: "02",
    title: "Live Role Walkthrough (20 mins)",
    desc: "Experience the actual teacher gradebook, automated report card approval, and parent tuition payment portal.",
  },
  {
    step: "03",
    title: "Migration & Rollout Q&A (5 mins)",
    desc: "Practical answers on migrating historical student records, staff onboarding, and timeline.",
  },
];

export default function BookDemoPage() {
  return (
    <FormShell
      widthClass="max-w-[34rem]"
      aside={
        <div className="flex flex-col justify-between h-full space-y-8">
          {/* Header section */}
          <div>
            <Eyebrow tone="light">
              <Sparkles className="size-3" aria-hidden="true" />
              Tailored Product Walkthrough
            </Eyebrow>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight leading-tight text-white xl:text-[2.6rem]">
              See your school workflows live in action.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              No generic slide decks. Join an interactive 30-minute demonstration with an Education
              Solutions Architect configured around your school&apos;s specific operations.
            </p>

            {/* Agenda Timeline */}
            <div className="mt-8 space-y-3.5">
              {agendaItems.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-white/12 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-accent-light">
                      {item.step}
                    </span>
                    <h3 className="text-xs font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fast Response & Direct Line */}
          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-white/15 text-white">
                <Clock className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Need an urgent walkthrough?</p>
                <p className="text-[11px] text-white/70">
                  Email us directly at{" "}
                  <a
                    href={`mailto:${siteMeta.email}`}
                    className="font-mono font-semibold text-emerald-300 underline hover:text-white"
                  >
                    {siteMeta.email}
                  </a>
                </p>
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
              &ldquo;The demo showed us how to eliminate our entire manual report card bottleneck.
              We were up and running before the new term without missing a beat.&rdquo;
            </blockquote>
            <figcaption className="mt-3.5 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
              <span className="font-semibold text-white">Dr. Helen Vance</span>
              <span className="font-mono text-[11px] text-white/60">Principal · Meadowbrook School</span>
            </figcaption>
          </figure>
        </div>
      }
    >
      <DemoForm />
    </FormShell>
  );
}
