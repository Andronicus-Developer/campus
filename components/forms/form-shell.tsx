import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { siteMeta } from "@/lib/site-content";

export function FormShell({
  children,
  aside,
  widthClass = "max-w-[32rem]",
}: {
  children: ReactNode;
  aside: ReactNode;
  widthClass?: string;
}) {
  return (
    <div className="grid min-h-screen bg-canvas lg:grid-cols-[1.12fr_1fr]">
      {/* Form column (Left) */}
      <div className="relative flex flex-col justify-between">
        {/* Subtle background dot-grid for depth */}
        <div
          className="pointer-events-none absolute inset-0 bg-dot-grid opacity-50"
          aria-hidden="true"
        />

        {/* Top navigation bar */}
        <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 lg:py-7">
          <Link
            href="/"
            className="inline-flex rounded-lg transition-transform hover:scale-[1.02]"
            aria-label="Campus360 — back to homepage"
          >
            <Logo />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-xs font-semibold text-ink-muted shadow-sm backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary-light hover:text-primary"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            <span>Back to website</span>
          </Link>
        </header>

        {/* Form container */}
        <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-8 sm:py-12">
          <div
            className={`w-full ${widthClass} rounded-3xl border border-line bg-surface p-7 shadow-xl shadow-primary/5 sm:p-10`}
          >
            {children}
          </div>
        </main>

        {/* Footer info */}
        <footer className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-6 py-5 text-xs text-ink-muted sm:px-10">
          <p>
            © {siteMeta.year} {siteMeta.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 font-mono text-[11px] text-ink-faint">
            <ShieldCheck className="size-3.5 text-success" aria-hidden="true" />
            <span>256-bit SSL · SOC 2 Compliant</span>
          </div>
        </footer>
      </div>

      {/* Brand Showcase Column (Right) */}
      <aside className="relative hidden flex-col justify-between overflow-hidden border-l border-line/60 bg-gradient-to-br from-[#0c142b] via-[#131f42] to-[#1e1b4b] p-12 text-white shadow-2xl lg:flex xl:p-16">
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40"
          aria-hidden="true"
        />

        {/* Glowing atmospheric color blobs */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 size-[500px] gradient-blob-blue opacity-50"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-32 size-[460px] gradient-blob-violet opacity-40"
          aria-hidden="true"
        />

        {/* Ambient top light */}
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          aria-hidden="true"
        />

        {/* Aside content inserted from page */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          {aside}
        </div>
      </aside>
    </div>
  );
}
