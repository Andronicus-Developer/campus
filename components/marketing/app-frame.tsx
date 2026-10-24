import type { ReactNode } from "react";
import { Lock } from "lucide-react";

export function AppFrame({
  children,
  address = "app.campus360.com",
  className = "",
}: {
  children: ReactNode;
  address?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_90px_-42px_rgba(20,18,14,0.5)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-sand/60 px-4 py-3">
        <span className="size-2.5 rounded-full bg-vermilion/60" />
        <span className="size-2.5 rounded-full bg-ink/15" />
        <span className="size-2.5 rounded-full bg-ink/15" />
        <div className="mx-auto flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[10px] text-ink-muted">
          <Lock className="size-3" aria-hidden="true" />
          {address}
        </div>
      </div>
      {children}
    </div>
  );
}
