"use client";

import { useState } from "react";
import { ArrowRight, Building2, Calendar, Check, Mail, User } from "lucide-react";
import { SelectField } from "@/components/forms/select-field";
import { TextField } from "@/components/forms/text-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { Eyebrow } from "@/components/site/primitives";

const availableModules = [
  { id: "admissions", label: "Admissions & Records", icon: "📝" },
  { id: "attendance", label: "Attendance & SMS Alerts", icon: "⏱" },
  { id: "assessments", label: "Assessments & Report Cards", icon: "📊" },
  { id: "fees", label: "Fee Invoicing & Payments", icon: "💳" },
  { id: "portal", label: "Parent & Student Portal", icon: "👨‍👩‍👧" },
  { id: "multicampus", label: "Multi-Campus Governance", icon: "🏫" },
];

export function DemoForm() {
  const [selectedModules, setSelectedModules] = useState<string[]>([
    "attendance",
    "assessments",
    "fees",
  ]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div>
      {/* Top eyebrow badge */}
      <div className="mb-4">
        <Eyebrow>
          <Calendar className="size-3" aria-hidden="true" />
          1-on-1 Product Walkthrough
        </Eyebrow>
      </div>

      <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        See Campus360 tailored to <span className="text-gradient">your school</span>
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Join a 30-minute private walkthrough with an Education Solutions Architect.
        We&apos;ll show you the exact workflows you care about.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-success/30 bg-success-light p-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success text-white shadow-md shadow-success/30">
            <Check className="size-6" />
          </div>
          <h2 className="mt-3 text-base font-bold text-ink">Demo Request Received!</h2>
          <p className="mt-1 text-xs text-ink-muted">
            We have dispatched a calendar invitation and confirmation email with meeting details. An architect will reach out shortly.
          </p>
        </div>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Name & Email */}
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Full Name"
              name="name"
              placeholder="Amara Okafor"
              autoComplete="name"
              icon={User}
              required
              autoFocus
            />
            <TextField
              label="Work Email"
              name="email"
              type="email"
              placeholder="you@school.edu"
              autoComplete="email"
              icon={Mail}
              required
            />
          </div>

          {/* School Name */}
          <TextField
            label="School Name"
            name="school"
            placeholder="Riverside Academy"
            autoComplete="organization"
            icon={Building2}
            required
          />

          {/* Role & Students */}
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Your Role"
              name="role"
              options={[
                "Principal / Head of School",
                "School Administrator",
                "Registrar",
                "Bursar / Finance Officer",
                "Teacher / Academic Head",
                "School Board / Director",
              ]}
              required
            />
            <SelectField
              label="Student Population"
              name="students"
              options={[
                "Up to 300 students",
                "301 – 800 students",
                "801 – 2,000 students",
                "2,000+ students",
              ]}
              required
            />
          </div>

          {/* Date & Time */}
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Preferred Date"
              name="date"
              type="date"
              required
            />
            <SelectField
              label="Preferred Time Window"
              name="time"
              options={[
                "Morning (09:00 – 12:00)",
                "Afternoon (12:00 – 15:00)",
                "Late Afternoon (15:00 – 18:00)",
                "Evening (18:00 – 20:00)",
              ]}
              required
            />
          </div>

          {/* Module checklist */}
          <div>
            <div className="flex items-baseline justify-between">
              <label className="text-sm font-semibold text-ink">
                What would you like to explore?
              </label>
              <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-ink-muted">
                Select all that apply
              </span>
            </div>

            <div className="mt-2.5 flex flex-wrap gap-2">
              {availableModules.map((module) => {
                const isSelected = selectedModules.includes(module.id);
                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => toggleModule(module.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                      isSelected
                        ? "border-primary bg-primary text-white shadow-sm shadow-primary/20"
                        : "border-line bg-surface text-ink-soft hover:border-primary/40 hover:bg-primary-light/50 hover:text-primary"
                    }`}
                  >
                    <span>{module.icon}</span>
                    <span>{module.label}</span>
                    {isSelected ? <Check className="ml-1 size-3 stroke-[3]" /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Specific notes */}
          <TextareaField
            label="Anything specific you'd like us to focus on?"
            name="notes"
            placeholder="e.g. Migrating from Excel spreadsheets, multiple curricula (WAEC, Cambridge), parent fee portal..."
            hint="Optional"
            rows={3}
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
          >
            {loading ? (
              <span>Scheduling your session...</span>
            ) : (
              <>
                <Calendar className="size-4" aria-hidden="true" />
                <span>Confirm Demo Booking</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-ink-muted">
            No sales pressure. No card required. Confirmation sent within 2 hours.
          </p>
        </form>
      )}
    </div>
  );
}
