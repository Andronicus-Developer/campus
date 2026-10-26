"use client";

import { useState } from "react";
import { Pill } from "@/components/platform/ui";
import { featureFlags } from "@/lib/platform";

export function FeatureFlagList() {
  const [flags, setFlags] = useState(featureFlags);

  function toggle(key: string) {
    setFlags((previous) =>
      previous.map((flag) =>
        flag.key === key ? { ...flag, enabled: !flag.enabled } : flag,
      ),
    );
  }

  return (
    <ul className="divide-y divide-line">
      {flags.map((flag) => (
        <li
          key={flag.key}
          className="flex items-start justify-between gap-4 py-4.5 first:pt-0 last:pb-0"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <code className="font-mono text-sm font-bold text-primary bg-primary-light/50 px-2.5 py-1 rounded-lg border border-primary/20">
                {flag.key}
              </code>
              <Pill tone={flag.enabled ? "positive" : "muted"}>
                {flag.enabled ? "Enabled" : "Disabled"}
              </Pill>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{flag.description}</p>
            <p className="mt-2 font-sans text-xs font-bold uppercase tracking-wider text-ink-soft">
              {flag.scope} · {flag.rollout}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={flag.enabled}
            onClick={() => toggle(flag.key)}
            className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer shadow-xs ${
              flag.enabled ? "bg-success" : "bg-slate-300"
            }`}
          >
            <span className="sr-only">Toggle {flag.key}</span>
            <span
              className={`inline-block size-5 rounded-full bg-white shadow-md transition-transform ${
                flag.enabled ? "translate-x-[25px]" : "translate-x-[3px]"
              }`}
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

