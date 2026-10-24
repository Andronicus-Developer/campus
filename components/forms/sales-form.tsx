"use client";

import { useState } from "react";
import { ArrowRight, Building2, Check, Mail, Phone, Send, User } from "lucide-react";
import { SelectField } from "@/components/forms/select-field";
import { TextField } from "@/components/forms/text-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { Eyebrow } from "@/components/site/primitives";

export function SalesForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
          <Building2 className="size-3" aria-hidden="true" />
          Enterprise &amp; School Groups
        </Eyebrow>
      </div>

      <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        Talk with our <span className="text-gradient">Solutions Team</span>
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Whether you operate an independent school or a multi-campus educational trust,
        we&apos;ll tailor licensing, migration, and SLAs to how you work.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-success/30 bg-success-light p-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success text-white shadow-md shadow-success/30">
            <Check className="size-6" />
          </div>
          <h2 className="mt-3 text-base font-bold text-ink">Inquiry Received!</h2>
          <p className="mt-1 text-xs text-ink-muted">
            A Senior Education Solutions Director has been assigned to your institution and will reach out within 4 business hours.
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

          {/* School Name & Phone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="School or Group Name"
              name="organization"
              placeholder="Riverside Education Trust"
              autoComplete="organization"
              icon={Building2}
              required
            />
            <TextField
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+234 800 123 4567"
              autoComplete="tel"
              icon={Phone}
              required
            />
          </div>

          {/* Role & Campuses */}
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Your Role"
              name="role"
              options={[
                "School Owner / Trustee",
                "Principal / Head of School",
                "Chief Financial Officer / Bursar",
                "IT & Operations Director",
                "Academic Director",
                "Other Leadership Role",
              ]}
              required
            />
            <SelectField
              label="Number of Campuses"
              name="campuses"
              options={[
                "1 campus",
                "2 – 5 campuses",
                "6 – 20 campuses",
                "More than 20 campuses",
              ]}
              required
            />
          </div>

          {/* Student Population & Timeline */}
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Student Population"
              name="students"
              options={[
                "Under 500 students",
                "500 – 1,500 students",
                "1,500 – 5,000 students",
                "5,000+ students",
              ]}
              required
            />
            <SelectField
              label="Implementation Target"
              name="timeline"
              options={[
                "Immediate (Within 30 days)",
                "Next Academic Term",
                "Next Academic Year",
                "Exploring / Planning",
              ]}
              required
            />
          </div>

          {/* Plan of Interest */}
          <SelectField
            label="Plan of Interest"
            name="plan"
            options={[
              "Growth Plan (Single Campus, up to 1,500 students)",
              "Enterprise Group (Multi-Campus, Unlimited students)",
              "Starter Plan (Single Campus, up to 400 students)",
              "Custom Multi-School Consortium Agreement",
            ]}
          />

          {/* Requirements textarea */}
          <TextareaField
            label="What are you looking to achieve?"
            name="message"
            placeholder="Tell us about your multi-campus consolidation, current software challenges (e.g. Excel spreadsheets, legacy desktop systems), custom fee schedules, or timetable requirements..."
            required
            rows={4}
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
          >
            {loading ? (
              <span>Connecting with Solutions Team...</span>
            ) : (
              <>
                <Send className="size-4" aria-hidden="true" />
                <span>Request Custom Quote &amp; Consultation</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-ink-muted">
            Direct response from a senior solutions consultant within 4 business hours.
          </p>
        </form>
      )}
    </div>
  );
}
