"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { CheckCircle2, Contact, Mail, Phone, Search, Users } from "lucide-react";

export default function TeacherRosterPage() {
  const students = [
    { name: "Adeleke Tobi", regNo: "RC-2023-0184", arm: "SSS 2A (Science)", guardian: "Mrs. Zainab Adeleke", phone: "+234 803 291 0021", standing: "Distinction (Rank 4)", blood: "O+" },
    { name: "Balogun Farouk", regNo: "RC-2023-0185", arm: "SSS 2A (Science)", guardian: "Chief T. Balogun", phone: "+234 703 118 7632", standing: "Credit (Rank 9)", blood: "A+" },
    { name: "Chukwuma Kamsi", regNo: "RC-2023-0186", arm: "SSS 2A (Science)", guardian: "Dr. K. Chukwuma", phone: "+234 802 443 1198", standing: "Distinction (Rank 2)", blood: "B+" },
    { name: "Danjuma Aisha", regNo: "RC-2023-0187", arm: "SSS 2A (Science)", guardian: "Alhaji S. Danjuma", phone: "+234 818 902 4432", standing: "Distinction (Rank 5)", blood: "O+" },
    { name: "Eze Somtochukwu", regNo: "RC-2023-0188", arm: "SSS 2A (Science)", guardian: "Engr. P. Eze", phone: "+234 803 445 1029", standing: "Merit (Rank 18)", blood: "O-" },
  ];

  return (
    <DashboardLayout currentRole="teacher">
      <div className="space-y-6">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-[11px] font-bold text-violet-700">
                  Form Class Directory
                </span>
                <span className="font-mono text-xs text-ink-muted">Form Master: Mr. David Alabi</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">SSS 2A Student Roster</h2>
              <p className="text-xs text-ink-muted">
                34 enrolled students · Academic tracking, emergency medical notes, and guardian contacts.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                  <th className="pb-3 font-bold uppercase">Candidate Name</th>
                  <th className="pb-3 font-bold uppercase">Student ID</th>
                  <th className="pb-3 font-bold uppercase">Registered Guardian &amp; Phone</th>
                  <th className="pb-3 font-bold uppercase">Academic Standing</th>
                  <th className="pb-3 font-bold uppercase">Blood Group</th>
                  <th className="pb-3 font-bold uppercase text-right">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {students.map((s) => (
                  <tr key={s.regNo} className="hover:bg-surface-raised">
                    <td className="py-3.5 font-bold text-ink">{s.name}</td>
                    <td className="py-3.5 font-mono text-primary font-bold">{s.regNo}</td>
                    <td className="py-3.5">
                      <span className="font-semibold text-ink block">{s.guardian}</span>
                      <span className="font-mono text-[11px] text-ink-muted">{s.phone}</span>
                    </td>
                    <td className="py-3.5 font-medium text-ink">{s.standing}</td>
                    <td className="py-3.5 font-mono text-ink-muted">{s.blood}</td>
                    <td className="py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Opening student profile for ${s.name}`)}
                        className="rounded-lg bg-surface-raised border border-line px-2.5 py-1 text-ink font-semibold hover:border-primary"
                      >
                        Profile Notes
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
