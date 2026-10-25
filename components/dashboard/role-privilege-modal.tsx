"use client";

import { CheckCircle2, XCircle, ShieldCheck, X, Sparkles, Lock, ArrowRight } from "lucide-react";
import { RoleConfig } from "@/lib/rbac";

interface RolePrivilegeModalProps {
  roleConfig: RoleConfig;
  isOpen: boolean;
  onClose: () => void;
}

export function RolePrivilegeModal({ roleConfig, isOpen, onClose }: RolePrivilegeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Modal Top Banner */}
        <div className={`p-6 text-white bg-gradient-to-r ${roleConfig.gradient}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold backdrop-blur-md">
                <ShieldCheck className="size-3.5" />
                <span>{roleConfig.tier}</span>
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-tight">{roleConfig.label}</h2>
              <p className="mt-1 text-xs text-white/80">{roleConfig.description}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close dialog"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-white/15 text-xs text-white/90 font-mono">
            <span>Identity: {roleConfig.persona.name}</span>
            <span>•</span>
            <span>ID: {roleConfig.persona.idCode}</span>
            <span>•</span>
            <span className="text-emerald-300 font-bold">RLS Enforced</span>
          </div>
        </div>

        {/* Privileges Matrix */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {roleConfig.privileges.map((category) => (
            <div key={category.category} className="space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-ink-muted">
                {category.category}
              </h3>

              <div className="grid gap-2.5">
                {category.items.map((item) => (
                  <div
                    key={item.action}
                    className={`flex items-start gap-3 rounded-2xl border p-3.5 transition-colors ${
                      item.allowed
                        ? "border-success/30 bg-success-light/40"
                        : "border-line bg-surface-raised opacity-75"
                    }`}
                  >
                    {item.allowed ? (
                      <CheckCircle2 className="size-4.5 text-success shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="size-4.5 text-ink-faint shrink-0 mt-0.5" />
                    )}

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${item.allowed ? "text-ink" : "text-ink-muted line-through"}`}>
                          {item.action}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold ${
                            item.allowed
                              ? "bg-success text-white"
                              : "bg-ink-faint/20 text-ink-muted"
                          }`}
                        >
                          {item.allowed ? "GRANULAR ACCESS" : "RESTRICTED"}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Database Permissions Raw Tag Cloud */}
          <div className="rounded-2xl border border-line bg-surface-raised p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-ink">
              <Lock className="size-3.5 text-primary" />
              <span>Database Level Row-Security Claims (Supabase RBAC)</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {roleConfig.permissions.map((perm) => (
                <span
                  key={perm}
                  className="rounded-lg border border-primary/20 bg-primary-light px-2.5 py-1 font-mono text-[11px] font-semibold text-primary"
                >
                  {perm}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-line bg-surface-raised px-6 py-4">
          <span className="font-mono text-xs text-ink-muted">
            Campus360 Enterprise RBAC Engine v2.4
          </span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            <span>Close Privileges</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
