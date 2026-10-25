"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Calendar, CheckCircle2, Clock, Filter, Save, UserCheck, Users } from "lucide-react";

interface StudentRoll {
  id: string;
  name: string;
  rollNo: string;
  status: "present" | "absent" | "late" | "excused";
  streak: number;
}

export default function TeacherAttendancePage() {
  const [selectedClass, setSelectedClass] = useState("SSS 2A");
  const [session, setSession] = useState("morning");
  const [saved, setSaved] = useState(false);

  const [students, setStudents] = useState<StudentRoll[]>([
    { id: "s-1", name: "Adeleke Tobi", rollNo: "RC-2023-0184", status: "present", streak: 18 },
    { id: "s-2", name: "Balogun Farouk", rollNo: "RC-2023-0185", status: "present", streak: 12 },
    { id: "s-3", name: "Chukwuma Kamsi", rollNo: "RC-2023-0186", status: "late", streak: 5 },
    { id: "s-4", name: "Danjuma Aisha", rollNo: "RC-2023-0187", status: "present", streak: 22 },
    { id: "s-5", name: "Eze Somtochukwu", rollNo: "RC-2023-0188", status: "absent", streak: 0 },
    { id: "s-6", name: "Ibrahim Fatima", rollNo: "RC-2023-0189", status: "present", streak: 15 },
    { id: "s-7", name: "Nnamdi Kenechi", rollNo: "RC-2023-0190", status: "present", streak: 19 },
    { id: "s-8", name: "Okafor Chimamanda", rollNo: "RC-2023-0191", status: "present", streak: 24 },
  ]);

  const setStatus = (id: string, status: "present" | "absent" | "late" | "excused") => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const markAll = (status: "present" | "absent") => {
    setStudents((prev) => prev.map((s) => ({ ...s, status })));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const presentCount = students.filter((s) => s.status === "present" || s.status === "late").length;

  return (
    <DashboardLayout currentRole="teacher">
      <div className="space-y-6">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 font-mono text-[11px] font-bold text-violet-700">
                  Form Master Attendance Register
                </span>
                <span className="font-mono text-xs text-ink-muted">Term 2 · Week 8</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Class Attendance Register</h2>
              <p className="text-xs text-ink-muted">
                Daily roll call synced in real-time to Principal radar and Parent gate check-in alerts.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs font-bold text-primary rounded-2xl border border-line bg-surface-raised px-4 py-2">
              Roll Summary: {presentCount} / {students.length} Present ({Math.round((presentCount / students.length) * 100)}%)
            </div>
          </div>
        </div>

        {/* Controls & Class Arm Picker */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block font-mono text-[10px] font-bold uppercase text-ink-muted mb-1">Select Class Arm</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-bold text-ink"
                >
                  <option value="SSS 2A">SSS 2A (Science) — 34 Students</option>
                  <option value="SSS 1B">SSS 1B (General) — 32 Students</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold uppercase text-ink-muted mb-1">Session</label>
                <select
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-bold text-ink"
                >
                  <option value="morning">Morning Roll Call (08:15 AM)</option>
                  <option value="afternoon">Afternoon Session (01:45 PM)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => markAll("present")}
                className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-bold text-ink-soft hover:bg-surface hover:text-ink"
              >
                Mark All Present
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-violet-700 active:scale-95"
              >
                <Save className="size-3.5" />
                <span>Save Attendance</span>
              </button>
            </div>
          </div>

          {saved && (
            <div className="mt-4 rounded-xl border border-success/30 bg-success-light p-3 text-xs text-success-deep font-semibold flex items-center gap-2">
              <CheckCircle2 className="size-4" />
              <span>Register saved! Parent SMS alert notifications queued for delivery.</span>
            </div>
          )}

          {/* Register List */}
          <div className="mt-4 divide-y divide-line-soft">
            {students.map((s) => (
              <div key={s.id} className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-ink block">{s.name}</span>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-ink-muted">
                    <span>{s.rollNo}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">{s.streak} Days Present Streak</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {(["present", "late", "absent", "excused"] as const).map((status) => {
                    const isSelected = s.status === status;
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setStatus(s.id, status)}
                        className={`px-3 py-1 rounded-lg font-mono text-[10px] font-bold uppercase transition-all ${
                          isSelected
                            ? status === "present"
                              ? "bg-success text-white shadow-sm"
                              : status === "late"
                              ? "bg-amber-500 text-white shadow-sm"
                              : status === "absent"
                              ? "bg-danger text-white shadow-sm"
                              : "bg-primary text-white shadow-sm"
                            : "bg-surface-raised text-ink-muted hover:text-ink"
                        }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
