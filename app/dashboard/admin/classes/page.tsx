"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  DoorOpen,
  Plus,
  Users,
  Search,
  Filter,
  CheckCircle2,
  X,
  GraduationCap,
  Sparkles,
  Building2,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

interface ClassArm {
  id: string;
  name: string;
  level: string;
  stream: string;
  formTeacher: string;
  teacherId: string;
  room: string;
  count: number;
  capacity: number;
}

const AVAILABLE_TEACHERS = [
  { id: "tch-01", name: "Mr. David Alabi", dept: "STEM & Mathematics" },
  { id: "tch-02", name: "Mrs. Grace Okon", dept: "Pure Sciences" },
  { id: "tch-03", name: "Ms. Chioma Okon", dept: "Junior Secondary" },
  { id: "tch-04", name: "Mr. Francis Eze", dept: "Applied Sciences" },
  { id: "tch-05", name: "Mrs. Nneka Udoh", dept: "Humanities" },
  { id: "tch-06", name: "Mr. T. Balogun", dept: "Commercial Studies" },
  { id: "tch-07", name: "Mrs. S. Danjuma", dept: "Languages & Arts" },
  { id: "tch-08", name: "Mr. K. Adeleke", dept: "Social Sciences" },
];

const INITIAL_CLASSES: ClassArm[] = [
  { id: "cls-01", name: "SSS 3 Science A", level: "Senior Secondary 3", stream: "Sciences", formTeacher: "Mr. Francis Eze", teacherId: "tch-04", room: "Room 301", count: 34, capacity: 35 },
  { id: "cls-02", name: "SSS 3 Arts", level: "Senior Secondary 3", stream: "Arts & Humanities", formTeacher: "Mrs. Nneka Udoh", teacherId: "tch-05", room: "Room 302", count: 32, capacity: 35 },
  { id: "cls-03", name: "SSS 2A (Pure Science)", level: "Senior Secondary 2", stream: "Sciences", formTeacher: "Mr. David Alabi", teacherId: "tch-01", room: "Room 204", count: 34, capacity: 35 },
  { id: "cls-04", name: "SSS 2B (Commercial)", level: "Senior Secondary 2", stream: "Commercial", formTeacher: "Mr. K. Adeleke", teacherId: "tch-08", room: "Room 205", count: 32, capacity: 35 },
  { id: "cls-05", name: "SSS 1 Science", level: "Senior Secondary 1", stream: "Sciences", formTeacher: "Mrs. Grace Okon", teacherId: "tch-02", room: "Room 101", count: 35, capacity: 35 },
  { id: "cls-06", name: "JSS 3 Alpha", level: "Junior Secondary 3", stream: "General", formTeacher: "Mr. T. Balogun", teacherId: "tch-06", room: "Hall A", count: 33, capacity: 40 },
  { id: "cls-07", name: "JSS 2 Gold", level: "Junior Secondary 2", stream: "General", formTeacher: "Ms. Chioma Okon", teacherId: "tch-03", room: "Hall B", count: 36, capacity: 40 },
  { id: "cls-08", name: "JSS 1 Alpha", level: "Junior Secondary 1", stream: "General", formTeacher: "Mrs. S. Danjuma", teacherId: "tch-07", room: "Hall C", count: 38, capacity: 40 },
];

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<ClassArm[]>(INITIAL_CLASSES);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedClassForTeacher, setSelectedClassForTeacher] = useState<ClassArm | null>(null);

  // Success toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Form state for Create Class
  const [newClassForm, setNewClassForm] = useState({
    levelPrefix: "SSS 1",
    armSuffix: "Emerald",
    streamCategory: "Sciences",
    capacity: 35,
    room: "Room 103",
    formTeacherId: AVAILABLE_TEACHERS[0].id,
  });

  // Filtered classes
  const filteredClasses = classes.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.room.toLowerCase().includes(search.toLowerCase()) ||
      c.formTeacher.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === "all" || c.level.toLowerCase().includes(levelFilter.toLowerCase());
    return matchesSearch && matchesLevel;
  });

  // Handler: Create Class
  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    const teacher = AVAILABLE_TEACHERS.find((t) => t.id === newClassForm.formTeacherId);
    const className = `${newClassForm.levelPrefix} ${newClassForm.armSuffix}`;

    const newRecord: ClassArm = {
      id: `cls-${Date.now()}`,
      name: className,
      level: newClassForm.levelPrefix.startsWith("SSS")
        ? `Senior Secondary ${newClassForm.levelPrefix.split(" ")[1]}`
        : `Junior Secondary ${newClassForm.levelPrefix.split(" ")[1]}`,
      stream: newClassForm.streamCategory,
      formTeacher: teacher ? teacher.name : "Unassigned",
      teacherId: teacher ? teacher.id : "",
      room: newClassForm.room,
      count: 0,
      capacity: Number(newClassForm.capacity),
    };

    setClasses([...classes, newRecord]);
    setShowCreateModal(false);
    showToast(`Class Arm "${className}" created with ${teacher?.name} appointed as Form Master!`);

    setNewClassForm({
      levelPrefix: "SSS 1",
      armSuffix: "Emerald",
      streamCategory: "Sciences",
      capacity: 35,
      room: "Room 103",
      formTeacherId: AVAILABLE_TEACHERS[0].id,
    });
  };

  // Handler: Change Form Master
  const handleChangeFormTeacher = (classId: string, newTeacherId: string) => {
    const teacher = AVAILABLE_TEACHERS.find((t) => t.id === newTeacherId);
    if (!teacher) return;

    setClasses((prev) =>
      prev.map((c) =>
        c.id === classId
          ? { ...c, formTeacher: teacher.name, teacherId: teacher.id }
          : c
      )
    );

    setSelectedClassForTeacher(null);
    showToast(`Form Master for class updated to ${teacher.name}!`);
  };

  return (
    <DashboardLayout currentRole="admin">
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="flex items-center justify-between rounded-2xl bg-emerald-600 px-5 py-3 text-white shadow-lg animate-in fade-in slide-in-from-top duration-300">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* Header Hero */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                  Academic Organization
                </span>
                <span className="font-mono text-xs text-ink-muted">
                  {classes.length} Active Classroom Arms
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Class Streams &amp; Room Allocations</h2>
              <p className="text-xs text-ink-muted">
                Admin controls to create class arms, set capacity quotas, assign physical rooms, and appoint Form Masters.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all"
              >
                <Plus className="size-4" />
                <span>+ Create New Class Arm</span>
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setLevelFilter("all")}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  levelFilter === "all"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                All Levels ({classes.length})
              </button>

              <button
                onClick={() => setLevelFilter("Junior")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  levelFilter === "Junior"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                <DoorOpen className="size-3.5" />
                <span>Junior Secondary (JSS 1-3)</span>
              </button>

              <button
                onClick={() => setLevelFilter("Senior")}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  levelFilter === "Senior"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                <GraduationCap className="size-3.5" />
                <span>Senior Secondary (SSS 1-3)</span>
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 size-4 text-ink-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search class name, room, teacher..."
                className="w-full rounded-xl border border-line bg-surface-raised pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-ink-muted focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Classes Card Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredClasses.map((c) => {
            const isFull = c.count >= c.capacity;
            const pct = Math.round((c.count / c.capacity) * 100);
            return (
              <div
                key={c.id}
                className="card-lift rounded-3xl border border-line bg-surface p-5 shadow-sm space-y-3 hover:border-emerald-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase text-primary tracking-wider bg-surface-raised px-2 py-0.5 rounded-md border border-line">
                    {c.room}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                      isFull ? "bg-amber-100 text-amber-800" : "bg-success-light text-success-deep"
                    }`}
                  >
                    {isFull ? "At Capacity" : `${c.capacity - c.count} Seats Left`}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-ink">{c.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-ink-muted">{c.level}</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">
                      {c.stream}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-line text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-ink-muted">Enrolled Students:</span>
                    <span className="font-mono font-bold text-ink">
                      {c.count} / {c.capacity} ({pct}%)
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-raised overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-line text-[11px] flex items-center justify-between">
                  <div>
                    <span className="text-ink-muted block text-[10px]">Form Master:</span>
                    <span className="font-bold text-ink">{c.formTeacher}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedClassForTeacher(c)}
                    className="rounded-lg border border-line bg-surface-raised px-2 py-1 font-mono text-[10px] font-semibold text-ink hover:border-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Change
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredClasses.length === 0 && (
          <div className="rounded-3xl border border-line bg-surface p-12 text-center text-xs text-ink-muted shadow-sm">
            No class arms found matching your filter criteria.
          </div>
        )}

        {/* MODAL: CREATE CLASS ARM */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <DoorOpen className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Admin: Create New Class Arm</h3>
                    <p className="text-xs text-ink-muted">Set up stream level, room facility, and appoint Form Master.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={handleCreateClass} className="mt-4 space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">Class Grade / Level</label>
                    <select
                      value={newClassForm.levelPrefix}
                      onChange={(e) => setNewClassForm({ ...newClassForm, levelPrefix: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="JSS 1">JSS 1 (Junior 1)</option>
                      <option value="JSS 2">JSS 2 (Junior 2)</option>
                      <option value="JSS 3">JSS 3 (Junior 3)</option>
                      <option value="SSS 1">SSS 1 (Senior 1)</option>
                      <option value="SSS 2">SSS 2 (Senior 2)</option>
                      <option value="SSS 3">SSS 3 (Senior 3)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Arm / Stream Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Emerald, Science A, Gold"
                      value={newClassForm.armSuffix}
                      onChange={(e) => setNewClassForm({ ...newClassForm, armSuffix: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">Stream Academic Track</label>
                    <select
                      value={newClassForm.streamCategory}
                      onChange={(e) => setNewClassForm({ ...newClassForm, streamCategory: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="Sciences">Sciences</option>
                      <option value="Arts & Humanities">Arts &amp; Humanities</option>
                      <option value="Commercial">Commercial &amp; Business</option>
                      <option value="General">General / Junior Core</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Classroom Room / Hall</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Room 208, Block C"
                      value={newClassForm.room}
                      onChange={(e) => setNewClassForm({ ...newClassForm, room: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 font-mono text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">Max Student Capacity</label>
                    <input
                      type="number"
                      required
                      min={10}
                      max={60}
                      value={newClassForm.capacity}
                      onChange={(e) => setNewClassForm({ ...newClassForm, capacity: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 font-mono text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-ink">Appoint Form Master (Teacher)</label>
                    <select
                      value={newClassForm.formTeacherId}
                      onChange={(e) => setNewClassForm({ ...newClassForm, formTeacherId: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-line bg-surface-raised px-3 py-2 text-xs text-ink focus:border-emerald-600 focus:outline-none"
                    >
                      {AVAILABLE_TEACHERS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.dept})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="rounded-xl bg-surface-raised p-3 text-xs">
                  <span className="text-ink-muted">Preview Name:</span>
                  <span className="font-mono font-bold text-ink ml-2">
                    {newClassForm.levelPrefix} {newClassForm.armSuffix} ({newClassForm.room})
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-end gap-2 border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-raised"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                  >
                    Create Class Arm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: CHANGE FORM MASTER */}
        {selectedClassForTeacher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-ink">Change Form Master</h3>
                    <p className="text-xs text-ink-muted">{selectedClassForTeacher.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedClassForTeacher(null)}
                  className="rounded-lg p-1 text-ink-muted hover:bg-surface-raised hover:text-ink"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div className="rounded-xl bg-surface-raised p-3 text-xs">
                  <span className="text-ink-muted block">Current Form Master:</span>
                  <span className="font-bold text-ink">{selectedClassForTeacher.formTeacher}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink">Select New Teacher</label>
                  <div className="mt-2 space-y-1.5 max-h-56 overflow-y-auto">
                    {AVAILABLE_TEACHERS.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleChangeFormTeacher(selectedClassForTeacher.id, t.id)}
                        className={`w-full flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold text-left transition-all ${
                          selectedClassForTeacher.teacherId === t.id
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            : "bg-surface-raised text-ink hover:border hover:border-emerald-600"
                        }`}
                      >
                        <div>
                          <span className="block font-bold">{t.name}</span>
                          <span className="text-[10px] text-ink-muted">{t.dept}</span>
                        </div>
                        {selectedClassForTeacher.teacherId === t.id && (
                          <CheckCircle2 className="size-4 text-emerald-700" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setSelectedClassForTeacher(null)}
                    className="rounded-xl border border-line px-4 py-2 text-xs font-semibold text-ink hover:bg-surface-raised"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
