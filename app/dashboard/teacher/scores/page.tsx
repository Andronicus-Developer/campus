"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Award, CheckCircle2, FileSpreadsheet, GraduationCap, Save, Send } from "lucide-react";

interface StudentMark {
  id: string;
  name: string;
  rollNo: string;
  ca1: number;
  ca2: number;
  project: number;
  exam: number;
}

export default function TeacherScoresPage() {
  const [subject, setSubject] = useState("Further Mathematics");
  const [classGroup, setClassGroup] = useState("SSS 2A");
  const [submitted, setSubmitted] = useState(false);

  const [marks, setMarks] = useState<StudentMark[]>([
    { id: "m-1", name: "Adeleke Tobi", rollNo: "RC-2023-0184", ca1: 18, ca2: 17, project: 10, exam: 42 },
    { id: "m-2", name: "Balogun Farouk", rollNo: "RC-2023-0185", ca1: 15, ca2: 16, project: 8, exam: 44 },
    { id: "m-3", name: "Chukwuma Kamsi", rollNo: "RC-2023-0186", ca1: 19, ca2: 18, project: 10, exam: 48 },
    { id: "m-4", name: "Danjuma Aisha", rollNo: "RC-2023-0187", ca1: 17, ca2: 19, project: 9, exam: 45 },
    { id: "m-5", name: "Eze Somtochukwu", rollNo: "RC-2023-0188", ca1: 14, ca2: 15, project: 7, exam: 36 },
  ]);

  const updateMark = (id: string, field: "ca1" | "ca2" | "project" | "exam", val: number) => {
    setMarks((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: Math.max(0, val) } : m))
    );
  };

  const getScoreData = (m: StudentMark) => {
    const total = m.ca1 + m.ca2 + m.project + m.exam; // out of 100
    let grade = "F";
    let color = "text-danger bg-danger-light";
    if (total >= 75) { grade = "A (Distinction)"; color = "text-emerald-700 bg-emerald-100"; }
    else if (total >= 65) { grade = "B (Credit)"; color = "text-blue-700 bg-blue-100"; }
    else if (total >= 50) { grade = "C (Merit)"; color = "text-amber-700 bg-amber-100"; }
    else if (total >= 40) { grade = "D (Pass)"; color = "text-orange-700 bg-orange-100"; }
    return { total, grade, color };
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <DashboardLayout currentRole="teacher">
      <div className="space-y-6">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-[11px] font-bold text-violet-700">
                  Continuous Assessment Broadsheet
                </span>
                <span className="font-mono text-xs text-ink-muted">Term 2 Examination Marks</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Enter CA &amp; Exam Scores</h2>
              <p className="text-xs text-ink-muted">
                Weighted assessment calculator: CA1 (20%) + CA2 (20%) + Project (10%) + Terminal Exam (50%).
              </p>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-violet-700 active:scale-95"
            >
              <Send className="size-4" />
              <span>Submit Broadsheet to Principal</span>
            </button>
          </div>
        </div>

        {submitted && (
          <div className="rounded-2xl border border-success/30 bg-success-light p-4 text-xs text-success-deep font-semibold flex items-center gap-2">
            <CheckCircle2 className="size-4" />
            <span>Marks broadsheet successfully transmitted to Principal &amp; Academic Committee for sign-off!</span>
          </div>
        )}

        {/* Broadsheet Entry Matrix */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <div className="flex items-center gap-3">
              <div>
                <label className="block font-mono text-[10px] font-bold uppercase text-ink-muted mb-1">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-bold text-ink"
                >
                  <option value="Further Mathematics">Further Mathematics</option>
                  <option value="General Mathematics">General Mathematics</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold uppercase text-ink-muted mb-1">Class</label>
                <select
                  value={classGroup}
                  onChange={(e) => setClassGroup(e.target.value)}
                  className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-bold text-ink"
                >
                  <option value="SSS 2A">SSS 2A (Pure Science)</option>
                  <option value="SSS 1B">SSS 1B (General)</option>
                </select>
              </div>
            </div>

            <span className="font-mono text-xs text-ink-muted">Scale: 100 Marks Cumulative</span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                  <th className="pb-3 font-bold uppercase">Candidate</th>
                  <th className="pb-3 font-bold uppercase">CA 1 (20)</th>
                  <th className="pb-3 font-bold uppercase">CA 2 (20)</th>
                  <th className="pb-3 font-bold uppercase">Project (10)</th>
                  <th className="pb-3 font-bold uppercase">Exam (50)</th>
                  <th className="pb-3 font-bold uppercase">Total (100)</th>
                  <th className="pb-3 font-bold uppercase text-right">Computed Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft font-mono">
                {marks.map((m) => {
                  const data = getScoreData(m);
                  return (
                    <tr key={m.id} className="hover:bg-surface-raised">
                      <td className="py-3 font-sans">
                        <span className="font-bold text-ink block">{m.name}</span>
                        <span className="font-mono text-[10px] text-ink-muted">{m.rollNo}</span>
                      </td>
                      <td className="py-3">
                        <input
                          type="number"
                          value={m.ca1}
                          max={20}
                          min={0}
                          onChange={(e) => updateMark(m.id, "ca1", Number(e.target.value))}
                          className="w-16 rounded-lg border border-line bg-surface px-2 py-1 font-bold text-ink focus:border-primary focus:outline-none"
                        />
                      </td>
                      <td className="py-3">
                        <input
                          type="number"
                          value={m.ca2}
                          max={20}
                          min={0}
                          onChange={(e) => updateMark(m.id, "ca2", Number(e.target.value))}
                          className="w-16 rounded-lg border border-line bg-surface px-2 py-1 font-bold text-ink focus:border-primary focus:outline-none"
                        />
                      </td>
                      <td className="py-3">
                        <input
                          type="number"
                          value={m.project}
                          max={10}
                          min={0}
                          onChange={(e) => updateMark(m.id, "project", Number(e.target.value))}
                          className="w-16 rounded-lg border border-line bg-surface px-2 py-1 font-bold text-ink focus:border-primary focus:outline-none"
                        />
                      </td>
                      <td className="py-3">
                        <input
                          type="number"
                          value={m.exam}
                          max={50}
                          min={0}
                          onChange={(e) => updateMark(m.id, "exam", Number(e.target.value))}
                          className="w-16 rounded-lg border border-line bg-surface px-2 py-1 font-bold text-ink focus:border-primary focus:outline-none"
                        />
                      </td>
                      <td className="py-3 font-bold text-ink text-sm">{data.total}%</td>
                      <td className="py-3 text-right">
                        <span className={`inline-block rounded-md px-2 py-0.5 font-mono text-xs font-bold ${data.color}`}>
                          {data.grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
