"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Contact, Download, Filter, Plus, Search, UserCheck, Users } from "lucide-react";

export default function AdminStudentsPage() {
  const [search, setSearch] = useState("");
  const students = [
    { name: "Adeleke Tobi", id: "RC-2023-0184", class: "SSS 2A", stream: "Sciences", gender: "Male", guardian: "Mrs. Zainab Adeleke", status: "Active" },
    { name: "Balogun Farouk", id: "RC-2023-0185", class: "SSS 2A", stream: "Sciences", gender: "Male", guardian: "Chief T. Balogun", status: "Active" },
    { name: "Chukwuma Kamsi", id: "RC-2023-0186", class: "SSS 2A", stream: "Sciences", gender: "Female", guardian: "Dr. K. Chukwuma", status: "Active" },
    { name: "Danjuma Aisha", id: "RC-2023-0187", class: "SSS 2A", stream: "Sciences", gender: "Female", guardian: "Alhaji S. Danjuma", status: "Active" },
    { name: "Eze Somtochukwu", id: "RC-2023-0188", class: "SSS 2A", stream: "Sciences", gender: "Male", guardian: "Engr. P. Eze", status: "Active" },
    { name: "Mohammed Zainab", id: "RC-2024-0012", class: "JSS 2 Gold", stream: "Junior", gender: "Female", guardian: "Alhaji Bello", status: "Active" },
  ];

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout currentRole="admin">
      <div className="space-y-6">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                  Registry Database
                </span>
                <span className="font-mono text-xs text-ink-muted">842 Active Enrolled Students</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Student Directory &amp; Records</h2>
              <p className="text-xs text-ink-muted">
                Student master identities, matriculation registries, emergency contacts, and class placements.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 size-4 text-ink-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by student name or ID..."
                className="w-full rounded-xl border border-line bg-surface-raised pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                  <th className="pb-3 font-bold uppercase">Student Name</th>
                  <th className="pb-3 font-bold uppercase">Matric No</th>
                  <th className="pb-3 font-bold uppercase">Class Arm</th>
                  <th className="pb-3 font-bold uppercase">Stream</th>
                  <th className="pb-3 font-bold uppercase">Gender</th>
                  <th className="pb-3 font-bold uppercase">Guardian</th>
                  <th className="pb-3 font-bold uppercase text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-surface-raised">
                    <td className="py-3.5 font-bold text-ink">{s.name}</td>
                    <td className="py-3.5 font-mono text-primary font-bold">{s.id}</td>
                    <td className="py-3.5 font-medium text-ink">{s.class}</td>
                    <td className="py-3.5 font-mono text-ink-muted">{s.stream}</td>
                    <td className="py-3.5 text-ink-soft">{s.gender}</td>
                    <td className="py-3.5 font-medium text-ink">{s.guardian}</td>
                    <td className="py-3.5 text-right">
                      <span className="inline-block rounded-full bg-success-light px-2.5 py-0.5 font-mono text-[10px] font-bold text-success-deep">
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
