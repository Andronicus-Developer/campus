"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import { Meter, Pill, Sparkline } from "@/components/platform/ui";
import {
  directoryTotal,
  formatNumber,
  formatUsd,
  healthMeta,
  tenantStatusMeta,
  type PlanName,
  type Tenant,
  type TenantStatus,
} from "@/lib/platform";

const statusOptions = Object.keys(tenantStatusMeta) as TenantStatus[];
const planOptions: PlanName[] = ["Starter", "Growth", "Enterprise"];

const selectClass =
  "h-9 rounded-full border border-line bg-surface px-3 text-xs text-ink-soft outline-none transition-colors hover:text-ink";

export function TenantDirectory({ items }: { items: Tenant[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | TenantStatus>("all");
  const [plan, setPlan] = useState<"all" | PlanName>("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return items.filter((tenant) => {
      if (status !== "all" && tenant.status !== status) return false;
      if (plan !== "all" && tenant.plan !== plan) return false;
      if (!needle) return true;
      return (
        tenant.name.toLowerCase().includes(needle) ||
        tenant.slug.toLowerCase().includes(needle) ||
        tenant.region.toLowerCase().includes(needle) ||
        tenant.owner.toLowerCase().includes(needle)
      );
    });
  }, [items, query, status, plan]);

  const isFiltered = query.trim() !== "" || status !== "all" || plan !== "all";

  function reset() {
    setQuery("");
    setStatus("all");
    setPlan("all");
  }

  return (
    <div className="rounded-2xl border border-line bg-surface">
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4">
        <label className="flex h-9 min-w-[220px] flex-1 items-center gap-2 rounded-full border border-line bg-paper px-3.5">
          <Search className="size-3.5 text-ink-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by school, slug, region or owner…"
            aria-label="Search schools"
            className="w-full bg-transparent text-xs outline-none placeholder:text-ink-muted"
          />
        </label>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-3.5 text-ink-muted" aria-hidden="true" />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as "all" | TenantStatus)}
            aria-label="Filter by status"
            className={selectClass}
          >
            <option value="all">All statuses</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {tenantStatusMeta[option].label}
              </option>
            ))}
          </select>
          <select
            value={plan}
            onChange={(event) => setPlan(event.target.value as "all" | PlanName)}
            aria-label="Filter by plan"
            className={selectClass}
          >
            <option value="all">All plans</option>
            {planOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {isFiltered ? (
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-xs text-ink-muted transition-colors hover:text-ink"
            >
              <X className="size-3" aria-hidden="true" />
              Clear
            </button>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-sand/50">
            <tr className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
              <th className="px-5 py-3 font-normal">School</th>
              <th className="px-3 py-3 font-normal">Plan</th>
              <th className="px-3 py-3 font-normal">Status</th>
              <th className="px-3 py-3 font-normal">Students</th>
              <th className="px-3 py-3 font-normal">MRR</th>
              <th className="px-3 py-3 font-normal">Health</th>
              <th className="px-3 py-3 font-normal">Last activity</th>
              <th className="px-5 py-3 font-normal" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((tenant) => {
              const statusMeta = tenantStatusMeta[tenant.status];
              const health = healthMeta[tenant.health];
              const seatRatio = tenant.studentLimit
                ? Math.round((tenant.students / tenant.studentLimit) * 100)
                : null;

              return (
                <tr key={tenant.slug} className="transition-colors hover:bg-sand/30">
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/super-admin/tenants/${tenant.slug}`}
                      className="block max-w-[260px]"
                    >
                      <span className="block truncate text-sm font-medium">
                        {tenant.name}
                      </span>
                      <span className="block truncate font-mono text-[10px] text-ink-muted">
                        {tenant.region}
                        {tenant.campuses > 1 ? ` · ${tenant.campuses} campuses` : ""}
                      </span>
                    </Link>
                  </td>
                  <td className="px-3 py-3.5 text-xs text-ink-soft">{tenant.plan}</td>
                  <td className="px-3 py-3.5">
                    <Pill tone={statusMeta.tone}>{statusMeta.label}</Pill>
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="block font-mono text-xs">
                      {formatNumber(tenant.students)}
                      {tenant.studentLimit ? (
                        <span className="text-ink-muted"> / {formatNumber(tenant.studentLimit)}</span>
                      ) : (
                        <span className="text-ink-muted"> / ∞</span>
                      )}
                    </span>
                    {tenant.studentLimit ? (
                      <span className="mt-1.5 block w-24">
                        <Meter
                          value={tenant.students}
                          max={tenant.studentLimit}
                          tone={seatRatio && seatRatio >= 90 ? "warning" : "success"}
                        />
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 py-3.5">
                    <span className="block font-mono text-xs">
                      {tenant.monthlyRevenue > 0 ? formatUsd(tenant.monthlyRevenue) : "—"}
                    </span>
                    <span className="mt-1 block">
                      <Sparkline
                        data={tenant.spark}
                        tone={tenant.monthlyRevenue > 0 ? "success" : "danger"}
                      />
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <Pill tone={health.tone}>{health.label}</Pill>
                  </td>
                  <td className="px-3 py-3.5 text-xs text-ink-muted">{tenant.lastActivity}</td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/super-admin/tenants/${tenant.slug}`}
                      aria-label={`Open ${tenant.name}`}
                      className="inline-flex size-8 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:text-ink"
                    >
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3.5">
        <p className="text-[11px] text-ink-muted">
          Showing {filtered.length} of {items.length} sampled schools ·{" "}
          {formatNumber(directoryTotal)} tenants on the platform
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled
            className="inline-flex h-8 items-center rounded-full border border-line px-3 text-xs text-ink-muted disabled:opacity-50"
          >
            Previous
          </button>
          <span className="font-mono text-[10px] text-ink-muted">Page 1 of 108</span>
          <button
            type="button"
            className="inline-flex h-8 items-center rounded-full border border-line px-3 text-xs text-ink-soft transition-colors hover:text-ink"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
