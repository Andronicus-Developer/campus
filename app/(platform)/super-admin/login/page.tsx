import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Database,
  Globe2,
  HardDrive,
  Lock,
  Radio,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/site/logo";
import { SuperAdminLoginForm } from "@/components/auth/super-admin-login-form";

export const metadata: Metadata = {
  title: "Super Admin Gateway — Campus360 Platform",
  description:
    "Restricted-access platform operator console for Campus360 system architects and DevOps administrators.",
  robots: { index: false, follow: false },
};

const infrastructureHighlights = [
  {
    title: "Kernel-Level Tenant Isolation",
    desc: "Enforced at the PostgreSQL row level. Zero data leakage between school institutions.",
    icon: Database,
  },
  {
    title: "Cryptographic Audit Stream",
    desc: "Every tenant mutation, billing adjustment, and plan modification is permanently journaled.",
    icon: ShieldCheck,
  },
  {
    title: "Global Edge Resilience",
    desc: "Distributed session verification with failover routing and sub-50ms token validation.",
    icon: Zap,
  },
];

export default function SuperAdminLoginPage() {
  return (
    <div className="relative min-h-screen bg-[#070b14] text-white selection:bg-indigo-600 selection:text-white">
      {/* Background Animated Grids & Ambient Lights */}
      <div
        className="pointer-events-none fixed inset-0 bg-grid-dark opacity-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed -top-40 -left-40 size-[650px] rounded-full bg-blue-600/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed -bottom-40 -right-40 size-[650px] rounded-full bg-indigo-600/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] rounded-full bg-purple-600/10 blur-[180px]"
        aria-hidden="true"
      />

      {/* Top Header */}
      <header className="relative z-20 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center transition-transform hover:scale-105"
              aria-label="Back to Campus360 Home"
            >
              <Logo tone="light" />
            </Link>

            <span className="hidden h-5 w-px bg-white/15 sm:block" />

            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-slate-300 sm:flex">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SysOps Terminal · Core v2.4</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-xs font-bold text-slate-300 shadow-sm backdrop-blur-sm transition-all hover:border-indigo-400/40 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="size-3.5" />
              <span>Public Website</span>
            </Link>

            <Link
              href="/login"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 text-xs font-bold text-indigo-300 transition-all hover:bg-indigo-500/20 hover:text-white"
            >
              <Lock className="size-3.5" />
              <span>School Staff Login</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Super Admin Login Form */}
          <div className="lg:col-span-6 xl:col-span-5">
            <SuperAdminLoginForm />
          </div>

          {/* Right Column: Platform Cockpit Showcase */}
          <div className="lg:col-span-6 xl:col-span-7 xl:pl-6">
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-950/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
              {/* Header inside showcase */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Radio className="size-4 text-indigo-400 animate-pulse" />
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-400">
                      Live Telemetry Stream
                    </span>
                  </div>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                    High-Assurance Infrastructure
                  </h2>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 font-mono text-xs font-bold text-emerald-300">
                  <Activity className="size-4 text-emerald-400" />
                  <span>All Systems Operational</span>
                </div>
              </div>

              {/* Live Metric Counters */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 text-center">
                  <span className="block font-mono text-3xl font-black text-white">24</span>
                  <span className="mt-1.5 block font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                    Tenants Active
                  </span>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 text-center">
                  <span className="block font-mono text-3xl font-black text-emerald-400">99.99%</span>
                  <span className="mt-1.5 block font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                    Uptime SLA
                  </span>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 text-center">
                  <span className="block font-mono text-3xl font-black text-indigo-400">100%</span>
                  <span className="mt-1.5 block font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                    RLS Enforced
                  </span>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 text-center">
                  <span className="block font-mono text-3xl font-black text-purple-400">0</span>
                  <span className="mt-1.5 block font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                    Security Leaks
                  </span>
                </div>
              </div>

              {/* Infrastructure Highlight Cards */}
              <div className="mt-6 space-y-4">
                {infrastructureHighlights.map((feat) => (
                  <div
                    key={feat.title}
                    className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-white/15 hover:bg-white/[0.05]"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      <feat.icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{feat.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security Compliance Callout */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/60 p-6 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2 text-slate-200 font-bold mb-2 text-xs">
                  <Lock className="size-4 text-indigo-400" />
                  <span>REGULATORY &amp; COMPLIANCE NOTICE</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-400">
                  This console provides direct supervisory control over student identity repositories, academic records, fee escrow, and platform subscriptions. All interactions are subject to strict data governance under FERPA, GDPR, and ISO/IEC 27001 standards.
                </p>
              </div>

              {/* Edge Node Info */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 font-mono text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-2">
                  <Server className="size-4 text-slate-400" />
                  Primary Region: AWS us-east-1 (N. Virginia)
                </span>
                <span className="flex items-center gap-2">
                  <Globe2 className="size-4 text-slate-400" />
                  Supabase DB Pool: Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 bg-slate-950/80 py-6 text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 Campus360 Technologies Inc. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="size-3.5" />
              SOC-2 Type II Certified
            </span>
            <span className="text-white/20">·</span>
            <span>256-bit AES-GCM</span>
            <span className="text-white/20">·</span>
            <span>Restricted Operator Area</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
