"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Pill } from "@/components/platform/ui";
import { severityMeta, type AuditEvent, type Severity } from "@/lib/platform";

const severityOptions: ("all" | Severity)[] = ["all", "critical", "warning", "success", "info"];

export function AuditFeed({ events }: { events: AuditEvent[] }) {
  const [severity, setSeverity] = useState<"all" | Severity>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return events.filter((event) => {
      if (severity !== "all" && event.severity !== severity) return false;
      if (!needle) return true;
      return `${event.actor} ${event.actorRole} ${event.action} ${event.target} ${
        event.schoolSlug ?? ""
      } ${event.ip}`
        .toLowerCase()
        .includes(needle);
    });
  }, [events, severity, query]);

  return (
    <div className="rounded-2xl border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {severityOptions.map((option) => {
            const selected = severity === option;
            const label =
              option === "all" ? "All events" : severityMeta[option].label;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setSeverity(option)}
                aria-pressed={selected}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  selected
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-soft hover:border-ink/25 hover:text-ink"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <label className="flex h-9 min-w-[220px] items-center gap-2 rounded-full border border-line bg-paper px-3.5">
          <Search className="size-3.5 text-ink-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search actor, action, target or IP…"
            aria-label="Search audit events"
            className="w-full bg-transparent text-xs outline-none placeholder:text-ink-muted"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-ink-muted">
          No events match the current filters.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-sand/50">
              <tr className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                <th className="px-5 py-2.5 font-normal">Time</th>
                <th className="px-3 py-2.5 font-normal">Severity</th>
                <th className="px-3 py-2.5 font-normal">Actor</th>
                <th className="px-3 py-2.5 font-normal">Action</th>
                <th className="px-3 py-2.5 font-normal">Target</th>
                <th className="px-5 py-2.5 font-normal">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((event) => {
                const meta = severityMeta[event.severity];
                return (
                  <tr key={event.id} className="align-top transition-colors hover:bg-sand/30">
                    <td className="whitespace-nowrap px-5 py-3 font-mono text-[10px] uppercase tracking-wide text-ink-muted">
                      {event.time}
                    </td>
                    <td className="px-3 py-3">
                      <Pill tone={meta.tone}>{meta.label}</Pill>
                    </td>
                    <td className="px-3 py-3">
                      <span className="block text-xs font-medium">{event.actor}</span>
                      <span className="block text-[10px] text-ink-muted">{event.actorRole}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="block text-xs font-medium">{event.action}</span>
                      {event.reason ? (
                        <span className="mt-1 block max-w-[280px] text-[11px] leading-5 text-ink-muted">
                          {event.reason}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-3 py-3 text-xs text-ink-soft">{event.target}</td>
                    <td className="px-5 py-3 font-mono text-[10px] text-ink-muted">{event.ip}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="border-t border-line px-5 py-3.5">
        <p className="text-[11px] text-ink-muted">
          Showing {filtered.length} of {events.length} recent events · audit history is
          append-only and retained for 24 months
        </p>
      </div>
    </div>
  );
}
