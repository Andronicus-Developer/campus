"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DoorOpen, Plus, Users } from "lucide-react";

export default function AdminClassesPage() {
  const classes = [
    { name: "SSS 3 Science A", level: "Senior Secondary 3", formTeacher: "Mr. Francis Eze", room: "Room 301", count: 34, capacity: 35 },
    { name: "SSS 3 Arts", level: "Senior Secondary 3", formTeacher: "Mrs. Nneka Udoh", room: "Room 302", count: 32, capacity: 35 },
    { name: "SSS 2A (Pure Science)", level: "Senior Secondary 2", formTeacher: "Mr. David Alabi", room: "Room 204", count: 34, capacity: 35 },
    { name: "SSS 2B (Commercial)", level: "Senior Secondary 2", formTeacher: "Mr. K. Adeleke", room: "Room 205", count: 32, capacity: 35 },
    { name: "SSS 1 Science", level: "Senior Secondary 1", formTeacher: "Mrs. Grace Okon", room: "Room 101", count: 35, capacity: 35 },
    { name: "JSS 3 Alpha", level: "Junior Secondary 3", formTeacher: "Mr. T. Balogun", room: "Hall A", count: 33, capacity: 40 },
    { name: "JSS 2 Gold", level: "Junior Secondary 2", formTeacher: "Ms. Chioma Okon", room: "Hall B", count: 36, capacity: 40 },
    { name: "JSS 1 Alpha", level: "Junior Secondary 1", formTeacher: "Mrs. S. Danjuma", room: "Hall C", count: 38, capacity: 40 },
  ];

  return (
    <DashboardLayout currentRole="admin">
      <div className="space-y-6">
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                  Academic Organization
                </span>
                <span className="font-mono text-xs text-ink-muted">32 Classroom Arms</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Class Streams &amp; Room Allocations</h2>
              <p className="text-xs text-ink-muted">
                Classroom capacities, assigned Form Masters, and campus room facilities.
              </p>
            </div>

            <button
              type="button"
              onClick={() => alert("Create Class Arm Wizard")}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95"
            >
              <Plus className="size-4" />
              <span>Create New Class Arm</span>
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {classes.map((c) => {
            const isFull = c.count >= c.capacity;
            const pct = Math.round((c.count / c.capacity) * 100);
            return (
              <div key={c.name} className="card-lift rounded-3xl border border-line bg-surface p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase text-primary tracking-wider">
                    {c.room}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                      isFull ? "bg-amber-100 text-amber-800" : "bg-success-light text-success-deep"
                    }`}
                  >
                    {isFull ? "At Capacity" : "Available"}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-ink">{c.name}</h3>
                  <span className="text-[11px] text-ink-muted block mt-0.5">{c.level}</span>
                </div>

                <div className="pt-2 border-t border-line text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Occupancy:</span>
                    <span className="font-mono font-bold text-ink">{c.count} / {c.capacity} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-raised overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isFull ? "bg-amber-500" : "bg-emerald-500"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-line text-[11px]">
                  <span className="text-ink-muted block">Form Master:</span>
                  <span className="font-bold text-ink">{c.formTeacher}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
