"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Briefcase, CheckCircle2, GraduationCap, Mail, Phone, Search, UserCheck, Users } from "lucide-react";

export default function PrincipalStaffPage() {
  const staff = [
    { name: "Dr. Evelyn Peters", id: "PRIN-001", role: "Principal & CAO", dept: "Executive", qual: "Ph.D. Educational Mgt.", load: "Executive", status: "On Duty" },
    { name: "Mr. David Alabi", id: "TCH-084", role: "Senior Math Teacher & Form Master", dept: "STEM & Mathematics", qual: "B.Sc. Ed. Mathematics", load: "18 Periods/wk", status: "On Duty" },
    { name: "Mrs. Angela Nnamdi", id: "BUR-005", role: "Bursar & Head of Accounts", dept: "Bursary Division", qual: "B.Sc. Accounting, FCA", load: "Financial Admin", status: "On Duty" },
    { name: "Engr. Patrick Bassey", id: "ADM-012", role: "Director of Registry", dept: "Operations", qual: "B.Eng. Computer Eng.", load: "Registry Operations", status: "On Duty" },
    { name: "Mrs. Grace Okon", id: "TCH-092", role: "Biology Senior Faculty", dept: "Pure Sciences", qual: "M.Sc. Cell Biology", load: "16 Periods/wk", status: "On Medical Leave" },
    { name: "Ms. Chioma Okon", id: "TCH-104", role: "Basic Science Faculty & Form Master", dept: "Junior Secondary", qual: "B.Ed. Science Education", load: "20 Periods/wk", status: "On Duty" },
  ];

  return (
    <DashboardLayout currentRole="principal">
      <div className="space-y-6">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                  Faculty &amp; Staff Administration
                </span>
                <span className="font-mono text-xs text-ink-muted">48 Academic &amp; Admin Personnel</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Institutional Staff Roster</h2>
              <p className="text-xs text-ink-muted">
                Teaching workload distributions, Form Master appointments, qualifications, and duty logs.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs font-bold text-success">
              46 / 48 On Duty (96% Present)
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                  <th className="pb-3 font-bold uppercase">Staff Name</th>
                  <th className="pb-3 font-bold uppercase">Staff ID</th>
                  <th className="pb-3 font-bold uppercase">Designation &amp; Department</th>
                  <th className="pb-3 font-bold uppercase">Qualifications</th>
                  <th className="pb-3 font-bold uppercase">Teaching Load</th>
                  <th className="pb-3 font-bold uppercase text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {staff.map((s) => (
                  <tr key={s.id} className="hover:bg-surface-raised">
                    <td className="py-3.5 font-bold text-ink">{s.name}</td>
                    <td className="py-3.5 font-mono text-ink-muted">{s.id}</td>
                    <td className="py-3.5">
                      <span className="font-semibold text-ink block">{s.role}</span>
                      <span className="text-[11px] text-ink-muted">{s.dept}</span>
                    </td>
                    <td className="py-3.5 font-medium text-ink-soft">{s.qual}</td>
                    <td className="py-3.5 font-mono text-ink-muted">{s.load}</td>
                    <td className="py-3.5 text-right">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                          s.status === "On Duty"
                            ? "bg-success-light text-success-deep"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {s.status}
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
