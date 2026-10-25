"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Briefcase, CheckCircle2, ShieldCheck, UserCheck, UserPlus, Users } from "lucide-react";

export default function AdminStaffPage() {
  const staff = [
    { name: "Mr. David Alabi", id: "TCH-084", role: "Senior Mathematics Teacher", dept: "STEM & Mathematics", email: "d.alabi@riverside.edu", phone: "+234 803 119 4432", formClass: "SSS 2A" },
    { name: "Mrs. Grace Okon", id: "TCH-092", role: "Biology Senior Faculty", dept: "Pure Sciences", email: "g.okon@riverside.edu", phone: "+234 802 331 8844", formClass: "SSS 1 Science" },
    { name: "Ms. Chioma Okon", id: "TCH-104", role: "Basic Science Faculty", dept: "Junior Secondary", email: "c.okon@riverside.edu", phone: "+234 818 902 3310", formClass: "JSS 1 Alpha" },
    { name: "Mr. Francis Eze", id: "TCH-078", role: "Physics & Technical Drawing", dept: "Applied Sciences", email: "f.eze@riverside.edu", phone: "+234 703 112 9901", formClass: "None (Subject Teacher)" },
    { name: "Mrs. Nneka Udoh", id: "TCH-110", role: "English & Literature Faculty", dept: "Humanities", email: "n.udoh@riverside.edu", phone: "+234 809 445 1120", formClass: "JSS 2 Gold" },
  ];

  return (
    <DashboardLayout currentRole="admin">
      <div className="space-y-6">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                  Staff Administration
                </span>
                <span className="font-mono text-xs text-ink-muted">48 Certified Teaching &amp; Admin Staff</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Staff Management &amp; Assignments</h2>
              <p className="text-xs text-ink-muted">
                Staff profile records, Form Master appointments, subject allocations, and contact credentials.
              </p>
            </div>

            <button
              type="button"
              onClick={() => alert("Staff Onboarding Wizard")}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
            >
              <UserPlus className="size-4" />
              <span>Onboard New Staff</span>
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                  <th className="pb-3 font-bold uppercase">Staff Name</th>
                  <th className="pb-3 font-bold uppercase">Staff ID</th>
                  <th className="pb-3 font-bold uppercase">Designation &amp; Department</th>
                  <th className="pb-3 font-bold uppercase">Form Class Arm</th>
                  <th className="pb-3 font-bold uppercase">Email &amp; Phone</th>
                  <th className="pb-3 font-bold uppercase text-right">Actions</th>
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
                    <td className="py-3.5 font-mono font-bold text-primary">{s.formClass}</td>
                    <td className="py-3.5 font-mono text-ink-muted">
                      <span className="block text-ink">{s.email}</span>
                      <span>{s.phone}</span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Editing assignments for ${s.name}`)}
                        className="rounded-lg bg-surface-raised border border-line px-2.5 py-1 text-ink font-semibold hover:border-primary"
                      >
                        Edit Duties
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
