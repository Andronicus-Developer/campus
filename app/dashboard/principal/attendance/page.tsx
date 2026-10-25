"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { CheckCircle2, Clock, Filter, Search, UserCheck, Users, XCircle } from "lucide-react";

export default function PrincipalAttendancePage() {
  return (
    <DashboardLayout currentRole="principal">
      <div className="space-y-6">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                  School-Wide Punctuality &amp; Attendance Pulse
                </span>
                <span className="font-mono text-xs text-ink-muted">Term 2 · Week 8</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Institutional Attendance Radar</h2>
              <p className="text-xs text-ink-muted">
                Daily student presence tracking across all 32 class arms and aggregate attendance compliance.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs font-bold text-emerald-600">
              Today: 95.2% Present (802 / 842)
            </div>
          </div>
        </div>

        {/* Weekly Day-by-Day Aggregate */}
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-5">
          {[
            { day: "Monday", pct: "96.4%", present: "812 / 842", absent: "30" },
            { day: "Tuesday", pct: "95.8%", present: "807 / 842", absent: "35" },
            { day: "Wednesday (Today)", pct: "95.2%", present: "802 / 842", absent: "40" },
            { day: "Thursday", pct: "94.9% (Projected)", present: "800 / 842", absent: "42" },
            { day: "Friday", pct: "93.8% (Avg)", present: "790 / 842", absent: "52" },
          ].map((d, idx) => (
            <div key={d.day} className={`p-4 rounded-2xl border ${idx === 2 ? "border-primary bg-primary-light/40" : "border-line bg-surface"}`}>
              <span className="font-mono text-[10px] font-bold uppercase text-ink-muted block">{d.day}</span>
              <span className="mt-1 font-mono text-2xl font-extrabold text-ink block">{d.pct.split(" ")[0]}</span>
              <span className="mt-1 font-mono text-[11px] text-ink-muted block">{d.present}</span>
              <span className="text-[10px] text-danger font-semibold mt-0.5 block">{d.absent} absentees</span>
            </div>
          ))}
        </div>

        {/* Chronic Absenteeism Flag Table */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="border-b border-line pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-ink">Early Intervention &amp; At-Risk Alerts</h3>
              <p className="text-xs text-ink-muted">Students with &gt; 3 unexcused absences this term flagged for counselor follow-up.</p>
            </div>
            <span className="rounded-full bg-danger-light px-3 py-1 font-mono text-xs font-bold text-danger">4 At Risk</span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                  <th className="pb-3 font-bold uppercase">Student Name</th>
                  <th className="pb-3 font-bold uppercase">Class Arm</th>
                  <th className="pb-3 font-bold uppercase">Absence Count</th>
                  <th className="pb-3 font-bold uppercase">Form Master</th>
                  <th className="pb-3 font-bold uppercase">Guardian Phone</th>
                  <th className="pb-3 font-bold uppercase text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {[
                  { name: "Eze Somtochukwu", class: "SSS 2A", absent: "5 Days", teacher: "Mr. David Alabi", phone: "+234 803 445 1029" },
                  { name: "Mohammed Aminu", class: "JSS 3B", absent: "4 Days", teacher: "Ms. Chioma Okon", phone: "+234 809 112 4001" },
                  { name: "Alabi Kehinde", class: "JSS 1 Gold", absent: "4 Days", teacher: "Mrs. N. Udoh", phone: "+234 818 900 3341" },
                  { name: "Okonkwo Emeka", class: "SSS 1 Science", absent: "4 Days", teacher: "Mr. F. Eze", phone: "+234 802 331 9904" },
                ].map((row) => (
                  <tr key={row.name} className="hover:bg-surface-raised">
                    <td className="py-3 font-bold text-ink">{row.name}</td>
                    <td className="py-3 font-mono text-ink-muted">{row.class}</td>
                    <td className="py-3 font-mono font-bold text-danger">{row.absent}</td>
                    <td className="py-3 text-ink-muted">{row.teacher}</td>
                    <td className="py-3 font-mono text-ink">{row.phone}</td>
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Counselor SMS and parent inquiry call scheduled for ${row.name}`)}
                        className="rounded-lg bg-primary-light px-3 py-1 font-mono text-xs font-bold text-primary hover:bg-primary hover:text-white"
                      >
                        Contact Guardian
                      </button>
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
