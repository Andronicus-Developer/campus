import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { PillTone } from "@/lib/platform";

/* ------------------------------------------------------------------ */
/* Pills                                                               */
/* ------------------------------------------------------------------ */

const pillTone: Record<PillTone, string> = {
  positive: "bg-success-light text-success-deep border border-success/20",
  warning:  "bg-warning-light text-warning border border-warning/30",
  critical: "bg-danger-light text-danger-deep border border-danger/20",
  neutral:  "bg-primary-light text-primary border border-primary/20",
  muted:    "bg-line-soft text-ink-muted border border-line",
  accent:   "bg-accent text-white border border-accent",
};

export function Pill({
  children,
  tone = "muted",
  className = "",
}: {
  children: ReactNode;
  tone?: PillTone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${pillTone[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Dot({ tone = "muted" }: { tone?: PillTone }) {
  const map: Record<PillTone, string> = {
    positive: "bg-success",
    warning:  "bg-warning",
    critical: "bg-danger",
    neutral:  "bg-primary",
    muted:    "bg-ink-faint",
    accent:   "bg-accent",
  };
  return (
    <span
      className={`inline-block size-2 shrink-0 rounded-full ${map[tone]}`}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Layout blocks                                                       */
/* ------------------------------------------------------------------ */

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-1.5 text-2xl font-extrabold tracking-tight text-ink sm:text-[1.85rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-ink-muted">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}

export function Card({
  title,
  description,
  action,
  children,
  className = "",
  padded = true,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section
      className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-sm ${className}`}
    >
      {title || action ? (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-raised px-5 py-4">
          <div className="min-w-0">
            {title ? (
              <h2 className="text-sm font-bold text-ink leading-tight">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-0.5 text-xs leading-5 text-ink-muted">{description}</p>
            ) : null}
          </div>
          {action}
        </header>
      ) : null}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </section>
  );
}

export function Avatar({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const label = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-white size-8 ${className}`}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-canvas px-6 py-12 text-center">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mx-auto mt-1.5 max-w-sm text-sm text-ink-muted">{description}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Metrics                                                             */
/* ------------------------------------------------------------------ */

export function KpiCard({
  label,
  value,
  delta,
  hint,
  icon,
}: {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  icon?: ReactNode;
}) {
  const up = delta !== undefined && delta >= 0;
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[9px] font-semibold uppercase tracking-widest text-ink-muted">
          {label}
        </p>
        {icon ? (
          <span className="grid size-8 place-items-center rounded-xl bg-primary-light text-primary">
            {icon}
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-2xl font-extrabold leading-none text-ink">{value}</p>
      <div className="mt-2 flex min-h-[18px] items-center gap-2">
        {delta !== undefined ? (
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
              up
                ? "bg-success-light text-success-deep"
                : "bg-danger-light text-danger-deep"
            }`}
          >
            {up ? (
              <ArrowUpRight className="size-3" aria-hidden="true" />
            ) : (
              <ArrowDownRight className="size-3" aria-hidden="true" />
            )}
            {Math.abs(delta)}%
          </span>
        ) : null}
        {hint ? (
          <span className="text-[11px] leading-4 text-ink-muted">{hint}</span>
        ) : null}
      </div>
    </div>
  );
}

export function Meter({
  value,
  max,
  tone = "primary",
}: {
  value: number;
  max: number | null;
  tone?: "primary" | "success" | "danger" | "warning";
}) {
  const bar =
    tone === "danger"
      ? "bg-danger"
      : tone === "warning"
        ? "bg-warning"
        : tone === "success"
          ? "bg-success"
          : "bg-primary";

  const percent = max ? Math.min(100, Math.round((value / max) * 100)) : 100;

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-line">
      <div className={`h-full rounded-full ${bar}`} style={{ width: `${percent}%` }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Charts (dependency-free SVG / CSS)                                  */
/* ------------------------------------------------------------------ */

export function TrendChart({
  data,
  height = 170,
  gradientId = "trend-fill",
  label,
}: {
  data: { label: string; value: number }[];
  height?: number;
  gradientId?: string;
  label: string;
}) {
  const width = 640;
  const inset = 14;
  const values = data.map((p) => p.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const stepX = data.length > 1 ? width / (data.length - 1) : width;

  const points = data.map((p, i) => ({
    x: i * stepX,
    y: height - inset - ((p.value - min) / span) * (height - inset * 2),
  }));

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;

  return (
    <figure>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-44 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label={label}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4f6ef7" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#4f6ef7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1="0"
            x2={width}
            y1={height * ratio}
            y2={height * ratio}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
        ))}
        <path d={area} fill={`url(#${gradientId})`} />
        <path
          d={line}
          fill="none"
          stroke="#4f6ef7"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <figcaption className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-wide text-ink-muted">
        {data.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </figcaption>
    </figure>
  );
}

export function BarList({
  items,
  tone = "primary",
}: {
  items: { label: string; value: number; hint?: string }[];
  tone?: "primary" | "success" | "accent";
}) {
  const max = Math.max(...items.map((item) => item.value));
  const bar =
    tone === "success"
      ? "bg-success"
      : tone === "accent"
        ? "bg-accent"
        : "bg-primary";
  const track = "bg-primary-light";

  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item.label}>
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-ink">{item.label}</span>
            <span className="font-mono text-ink-muted">{item.hint ?? item.value}</span>
          </div>
          <div className={`mt-1.5 h-2 overflow-hidden rounded-full ${track}`}>
            <div
              className={`h-full rounded-full ${bar}`}
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Sparkline({
  data,
  tone = "primary",
}: {
  data: number[];
  tone?: "primary" | "success" | "danger";
}) {
  const width = 96;
  const height = 28;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const stepX = data.length > 1 ? width / (data.length - 1) : width;
  const stroke =
    tone === "danger" ? "#ef4444" : tone === "success" ? "#10b981" : "#4f6ef7";

  const line = data
    .map((value, i) => {
      const x = i * stepX;
      const y = height - 3 - ((value - min) / span) * (height - 6);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-7 w-24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
