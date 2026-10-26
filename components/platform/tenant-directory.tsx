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
  "h-11 rounded-xl border border-line bg-surface px-4 text-sm font-semibold text-ink-soft outline-none transition-colors hover:border-primary/40 focus:border-primary shadow-xs";

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
    <div className="rounded-2xl border border-line bg-surface shadow-xs overflow-hidden">
      <div className="flex flex-wrap items-center gap-3.5 border-b border-line bg-surface-raised/60 px-6 py-4.5">
        <label className="flex h-11 min-w-[240px] flex-1 items-center gap-3 rounded-xl border border-line bg-surface px-4 shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          <Search className="size-4 text-ink-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by school, slug, region or owner…"
            aria-label="Search schools"
            className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-ink-muted"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2.5">
          <SlidersHorizontal className="size-4 text-ink-muted" aria-hidden="true" />
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
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-line px-4 text-sm font-semibold text-ink-soft transition-colors hover:bg-surface-raised hover:text-ink"
            >
              <X className="size-3.5" aria-hidden="true" />
              Clear
            </button>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] text-left text-sm">
          <thead className="bg-surface-raised border-b border-line">
            <tr className="font-sans text-xs font-bold uppercase tracking-wider text-slate-700">
              <th className="px-6 py-4 font-extrabold">School</th>
              <th className="px-4 py-4 font-extrabold">Plan</th>
              <th className="px-4 py-4 font-extrabold">Status</th>
              <th className="px-4 py-4 font-extrabold">Students</th>
              <th className="px-4 py-4 font-extrabold">MRR</th>
              <th className="px-4 py-4 font-extrabold">Health</th>
              <th className="px-4 py-4 font-extrabold">Last activity</th>
              <th className="px-6 py-4 font-extrabold" />
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
                <tr key={tenant.slug} className="transition-colors hover:bg-surface-raised/60">
                  <td className="px-6 py-4">
                    <Link
                      href={`/super-admin/tenants/${tenant.slug}`}
                      className="block max-w-[280px]"
                    >
                      <span className="block truncate text-base font-bold text-ink hover:text-primary transition-colors">
                        {tenant.name}
                      </span>
                      <span className="block truncate font-sans text-xs font-medium text-ink-muted mt-0.5">
                        {tenant.region}
                        {tenant.campuses > 1 ? ` · ${tenant.campuses} campuses` : ""}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-sm font-bold text-ink">{tenant.plan}</td>
                  <td className="px-4 py-4">
                    <Pill tone={statusMeta.tone}>{statusMeta.label}</Pill>
                  </td>
                  <td className="px-4 py-4">
                    <span className="block font-sans text-sm font-bold text-ink">
                      {formatNumber(tenant.students)}
                      {tenant.studentLimit ? (
                        <span className="text-xs font-medium text-ink-muted"> / {formatNumber(tenant.studentLimit)}</span>
                      ) : (
                        <span className="text-xs font-medium text-ink-muted"> / ∞</span>
                      )}
                    </span>
                    {tenant.studentLimit ? (
                      <span className="mt-2 block w-28">
                        <Meter
                          value={tenant.students}
                          max={tenant.studentLimit}
                          tone={seatRatio && seatRatio >= 90 ? "warning" : "success"}
                        />
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-4">
                    <span className="block font-sans text-sm font-black text-ink">
                      {tenant.monthlyRevenue > 0 ? formatUsd(tenant.monthlyRevenue) : "—"}
                    </span>
                    <span className="mt-1.5 block">
                      <Sparkline
                        data={tenant.spark}
                        tone={tenant.monthlyRevenue > 0 ? "success" : "danger"}
                      />
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <Pill tone={health.tone}>{health.label}</Pill>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-ink-muted">{tenant.lastActivity}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/super-admin/tenants/${tenant.slug}`}
                      aria-label={`Open ${tenant.name}`}
                      className="inline-flex size-9 items-center justify-center rounded-xl border border-line bg-surface text-ink-soft transition-all hover:bg-primary hover:border-primary hover:text-white shadow-xs"
                    >
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-6 py-4 bg-surface-raised/40">
        <p className="text-sm font-medium text-ink-muted">
          Showing <span className="font-bold text-ink">{filtered.length}</span> of <span className="font-bold text-ink">{items.length}</span> sampled schools ·{" "}
          <span className="font-bold text-ink">{formatNumber(directoryTotal)}</span> tenants on the platform
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled
            className="inline-flex h-9 items-center rounded-xl border border-line px-4 text-xs font-bold text-ink-muted disabled:opacity-40"
          >
            Previous
          </button>
          <span className="font-sans text-xs font-bold text-ink-soft">Page 1 of 108</span>
          <button
            type="button"
            className="inline-flex h-9 items-center rounded-xl border border-line px-4 text-xs font-bold text-ink-soft transition-colors hover:bg-surface-raised hover:text-ink shadow-xs"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
