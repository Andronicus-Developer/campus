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
    <div className="rounded-2xl border border-line bg-surface shadow-xs overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-surface-raised/60 px-6 py-4.5">
        <div className="flex flex-wrap items-center gap-2">
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
                className={`rounded-xl border px-4 py-2 text-sm font-bold transition-all shadow-xs cursor-pointer ${
                  selected
                    ? "border-primary bg-primary text-white shadow-primary/25"
                    : "border-line bg-surface text-ink-soft hover:border-primary/40 hover:bg-primary-light hover:text-primary"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <label className="flex h-11 min-w-[240px] items-center gap-3 rounded-xl border border-line bg-surface px-4 shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          <Search className="size-4 text-ink-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search actor, action, target or IP…"
            aria-label="Search audit events"
            className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-ink-muted"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="px-6 py-12 text-center text-sm font-semibold text-ink-muted">
          No events match the current filters.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-surface-raised border-b border-line">
              <tr className="font-sans text-xs font-bold uppercase tracking-wider text-slate-700">
                <th className="px-6 py-4 font-extrabold">Time</th>
                <th className="px-4 py-4 font-extrabold">Severity</th>
                <th className="px-4 py-4 font-extrabold">Actor</th>
                <th className="px-4 py-4 font-extrabold">Action</th>
                <th className="px-4 py-4 font-extrabold">Target</th>
                <th className="px-6 py-4 font-extrabold">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((event) => {
                const meta = severityMeta[event.severity];
                return (
                  <tr key={event.id} className="align-top transition-colors hover:bg-surface-raised/60">
                    <td className="whitespace-nowrap px-6 py-4 font-sans text-xs font-bold text-ink-muted">
                      {event.time}
                    </td>
                    <td className="px-4 py-4">
                      <Pill tone={meta.tone}>{meta.label}</Pill>
                    </td>
                    <td className="px-4 py-4">
                      <span className="block text-sm font-bold text-ink">{event.actor}</span>
                      <span className="block text-xs font-medium text-ink-muted mt-0.5">{event.actorRole}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="block text-sm font-bold text-ink">{event.action}</span>
                      {event.reason ? (
                        <span className="mt-1 block max-w-[320px] text-xs leading-relaxed text-ink-muted">
                          {event.reason}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-ink-soft">{event.target}</td>
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-ink-muted">{event.ip}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="border-t border-line px-6 py-4 bg-surface-raised/40">
        <p className="text-sm font-medium text-ink-muted">
          Showing <span className="font-bold text-ink">{filtered.length}</span> of <span className="font-bold text-ink">{events.length}</span> recent events · audit history is
          append-only and retained for 24 months
        </p>
      </div>
    </div>
  );
}

