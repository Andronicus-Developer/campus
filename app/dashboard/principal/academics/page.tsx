"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Award, BookOpen, GraduationCap, LineChart, TrendingUp, Users } from "lucide-react";

export default function PrincipalAcademicsPage() {
  return (
    <DashboardLayout currentRole="principal">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                  Institutional Academic Radar
                </span>
                <span className="font-mono text-xs text-ink-muted">2025/2026 Term 2</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Academic Performance Analytics</h2>
              <p className="text-xs text-ink-muted">
                Cross-division evaluation across Senior Secondary (Sciences, Arts, Commercial) and Junior Secondary.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs font-bold text-primary">
              Overall Pass Rate: 94.8%
            </div>
          </div>
        </div>

        {/* Division Breakdown Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <span className="font-mono text-[10px] font-bold text-primary uppercase tracking-wider block">Senior Science Stream</span>
            <h3 className="mt-2 text-xl font-extrabold text-ink">Pure Sciences (SSS 1 - 3)</h3>
            <p className="text-xs text-ink-muted mt-1">214 candidates enrolled across 6 arms</p>
            <div className="mt-4 pt-3 border-t border-line space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-ink-muted">Math &amp; Further Math</span><span className="font-bold text-ink">88.4% avg</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">Physics &amp; Chemistry</span><span className="font-bold text-ink">84.2% avg</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">Biology &amp; Tech</span><span className="font-bold text-ink">81.6% avg</span></div>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <span className="font-mono text-[10px] font-bold text-accent uppercase tracking-wider block">Senior Arts &amp; Humanities</span>
            <h3 className="mt-2 text-xl font-extrabold text-ink">Arts &amp; Social Sc. (SSS 1 - 3)</h3>
            <p className="text-xs text-ink-muted mt-1">198 candidates enrolled across 6 arms</p>
            <div className="mt-4 pt-3 border-t border-line space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-ink-muted">Literature in English</span><span className="font-bold text-ink">86.1% avg</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">Government &amp; History</span><span className="font-bold text-ink">89.4% avg</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">Economics</span><span className="font-bold text-ink">79.5% avg</span></div>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Junior Secondary School</span>
            <h3 className="mt-2 text-xl font-extrabold text-ink">Junior Division (JSS 1 - 3)</h3>
            <p className="text-xs text-ink-muted mt-1">430 candidates enrolled across 12 arms</p>
            <div className="mt-4 pt-3 border-t border-line space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-ink-muted">Basic Science &amp; Tech</span><span className="font-bold text-ink">83.9% avg</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">National Values</span><span className="font-bold text-ink">91.2% avg</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">Pre-Vocational Studies</span><span className="font-bold text-ink">87.0% avg</span></div>
            </div>
          </div>
        </div>

        {/* Top 5 Scholars Table */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="border-b border-line pb-4">
            <h3 className="text-base font-extrabold text-ink">Principal&apos;s Honor Roll (Term 2 Scholars)</h3>
            <p className="text-xs text-ink-muted">Top academic achievers across the institution.</p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                  <th className="pb-3 font-bold uppercase">Rank</th>
                  <th className="pb-3 font-bold uppercase">Student Name</th>
                  <th className="pb-3 font-bold uppercase">Class Stream</th>
                  <th className="pb-3 font-bold uppercase">Term Average</th>
                  <th className="pb-3 font-bold uppercase">GPA</th>
                  <th className="pb-3 font-bold uppercase text-right">Award Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {[
                  { rank: "1st", name: "Chidera Okafor", class: "SSS 3 Science A", avg: "96.4%", gpa: "4.00", badge: "Gold Laureate" },
                  { rank: "2nd", name: "Zainab Mohammed", class: "JSS 2 Gold", avg: "95.8%", gpa: "3.98", badge: "Silver Medal" },
                  { rank: "3rd", name: "Somtochukwu Eze", class: "SSS 2 Commercial", avg: "94.9%", gpa: "3.95", badge: "Bronze Medal" },
                  { rank: "4th", name: "Adeleke Tobi", class: "SSS 2 Science A", avg: "94.2%", gpa: "3.82", badge: "STEM Distinction" },
                  { rank: "5th", name: "Farouk Balogun", class: "SSS 1 Science B", avg: "93.7%", gpa: "3.78", badge: "Honor Roll" },
                ].map((s) => (
                  <tr key={s.name} className="hover:bg-surface-raised">
                    <td className="py-3 font-mono font-bold text-primary">{s.rank}</td>
                    <td className="py-3 font-bold text-ink">{s.name}</td>
                    <td className="py-3 font-medium text-ink-muted">{s.class}</td>
                    <td className="py-3 font-mono font-bold text-ink">{s.avg}</td>
                    <td className="py-3 font-mono font-bold text-emerald-600">{s.gpa}</td>
                    <td className="py-3 text-right">
                      <span className="rounded-full bg-primary-light px-2.5 py-0.5 font-mono text-[10px] font-bold text-primary">
                        {s.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
