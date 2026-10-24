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
          className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <code className="font-mono text-xs text-ink">{flag.key}</code>
              <Pill tone={flag.enabled ? "positive" : "muted"}>
                {flag.enabled ? "On" : "Off"}
              </Pill>
            </div>
            <p className="mt-1.5 text-xs leading-5 text-ink-muted">{flag.description}</p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
              {flag.scope} · {flag.rollout}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={flag.enabled}
            onClick={() => toggle(flag.key)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
              flag.enabled ? "bg-pine" : "bg-ink/15"
            }`}
          >
            <span className="sr-only">Toggle {flag.key}</span>
            <span
              className={`inline-block size-[18px] rounded-full bg-white shadow transition-transform ${
                flag.enabled ? "translate-x-[23px]" : "translate-x-[3px]"
              }`}
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
