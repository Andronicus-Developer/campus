"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Building2, CheckCircle2, Save, Settings, ShieldCheck, Sliders } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout currentRole="admin">
      <div className="space-y-6">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                  Institution System Configuration
                </span>
                <span className="font-mono text-xs text-ink-muted">Tenant ID: 94a1-rc-lagos</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">School Settings &amp; Preferences</h2>
              <p className="text-xs text-ink-muted">
                Academic session parameters, term dates, school crest &amp; branding, and official grading scales.
              </p>
            </div>
          </div>
        </div>

        {saved && (
          <div className="rounded-2xl border border-success/30 bg-success-light p-4 text-xs text-success-deep font-semibold flex items-center gap-2">
            <CheckCircle2 className="size-4" />
            <span>School parameters updated and synced across all teacher broadsheets!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-2">
          {/* Institutional Identity Card */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4 text-xs">
            <h3 className="text-base font-extrabold text-ink border-b border-line pb-3">Institutional Profile</h3>

            <div>
              <label className="block font-semibold text-ink-muted mb-1">Official School Name</label>
              <input
                type="text"
                defaultValue="Riverside International College"
                className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-ink-muted mb-1">School Code</label>
                <input
                  type="text"
                  defaultValue="RC-LOS-001"
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink"
                />
              </div>
              <div>
                <label className="block font-semibold text-ink-muted mb-1">Subdomain Slug</label>
                <input
                  type="text"
                  defaultValue="riverside"
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-ink-muted mb-1">Official Motto</label>
              <input
                type="text"
                defaultValue="Excellence, Integrity and Wisdom"
                className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink italic"
              />
            </div>
          </div>

          {/* Academic Calendar Settings */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4 text-xs">
            <h3 className="text-base font-extrabold text-ink border-b border-line pb-3">Term &amp; Calendar Parameters</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-ink-muted mb-1">Academic Year</label>
                <input
                  type="text"
                  defaultValue="2025/2026"
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink"
                />
              </div>
              <div>
                <label className="block font-semibold text-ink-muted mb-1">Current Term</label>
                <select defaultValue="2" className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink">
                  <option value="1">Term 1 (First Term)</option>
                  <option value="2">Term 2 (Second Term - Active)</option>
                  <option value="3">Term 3 (Third Term)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-ink-muted mb-1">Term Start Date</label>
                <input
                  type="date"
                  defaultValue="2026-01-12"
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink"
                />
              </div>
              <div>
                <label className="block font-semibold text-ink-muted mb-1">Term End Date</label>
                <input
                  type="date"
                  defaultValue="2026-04-10"
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
              >
                <Save className="size-4" />
                <span>Save School Configuration</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
