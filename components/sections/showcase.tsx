"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AppFrame } from "@/components/marketing/app-frame";
import { Reveal } from "@/components/marketing/reveal";
import {
  AssessmentsPanel,
  AttendancePanel,
  FinancePanel,
  OverviewPanel,
} from "@/components/marketing/showcase-panels";
import { Container, Eyebrow } from "@/components/site/primitives";
import { showcaseTabs, type ShowcaseTabId } from "@/lib/site-content";

const panels: Record<ShowcaseTabId, ReactNode> = {
  overview:    <OverviewPanel />,
  attendance:  <AttendancePanel />,
  assessments: <AssessmentsPanel />,
  finance:     <FinancePanel />,
};

export function Showcase() {
  const [active, setActive] = useState<ShowcaseTabId>("overview");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const currentIndex = showcaseTabs.findIndex((tab) => tab.id === active);
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight")      nextIndex = (currentIndex + 1) % showcaseTabs.length;
    else if (event.key === "ArrowLeft")  nextIndex = (currentIndex - 1 + showcaseTabs.length) % showcaseTabs.length;
    else if (event.key === "Home")       nextIndex = 0;
    else if (event.key === "End")        nextIndex = showcaseTabs.length - 1;
    else return;
    event.preventDefault();
    setActive(showcaseTabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section id="product" className="scroll-mt-24 border-b border-line bg-surface">
      <Container className="py-20 lg:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Product tour</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.8rem]">
              See the day-to-day, not just the feature list.
            </h2>
            <p className="mt-5 text-base leading-7 text-ink-muted">
              Switch between the modules your team lives in — the same screens a school
              admin, teacher and bursar open every morning.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          {/* Tab bar */}
          <div
            role="tablist"
            aria-label="Campus360 modules"
            onKeyDown={handleKeyDown}
            className="flex flex-wrap gap-2"
          >
            {showcaseTabs.map((tab, index) => {
              const selected = tab.id === active;
              return (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[index] = el; }}
                  role="tab"
                  type="button"
                  id={`showcase-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`showcase-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(tab.id)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                    selected
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "border border-line bg-surface text-ink-soft hover:border-primary/30 hover:bg-primary-light hover:text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`showcase-panel-${active}`}
            aria-labelledby={`showcase-tab-${active}`}
            className="mt-7"
          >
            <AppFrame address={`app.campus360.com/${active}`}>
              <div key={active} className="load-rise">
                {panels[active]}
              </div>
            </AppFrame>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
