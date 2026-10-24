"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Check, Globe, Lock, Mail, Sparkles, User } from "lucide-react";
import { SelectField } from "@/components/forms/select-field";
import { TextField } from "@/components/forms/text-field";
import { Eyebrow } from "@/components/site/primitives";

export function SignupForm() {
  const [schoolName, setSchoolName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Generate safe subdomain preview from school name
  const slug = schoolName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "your-school";

  const getStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div>
      {/* Top eyebrow badge */}
      <div className="mb-4">
        <Eyebrow>
          <Sparkles className="size-3" aria-hidden="true" />
          14-Day Full-Feature Trial
        </Eyebrow>
      </div>

      <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        Create your school <span className="text-gradient">workspace</span>
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Start managing admissions, attendance, report cards, and fees. No credit card required.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-success/30 bg-success-light p-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success text-white shadow-md shadow-success/30">
            <Check className="size-6" />
          </div>
          <h2 className="mt-3 text-base font-bold text-ink">Workspace Created!</h2>
          <p className="mt-1 text-xs text-ink-muted">
            Your workspace <span className="font-mono font-semibold text-primary">{slug}.campus360.app</span> is being provisioned. Redirecting to your onboarding wizard...
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
              placeholder="amara@school.edu"
              autoComplete="email"
              icon={Mail}
              required
            />
          </div>

          {/* School Name */}
          <div>
            <TextField
              label="School Name"
              name="school"
              placeholder="Riverside Academy"
              autoComplete="organization"
              icon={Building2}
              required
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            />

            {/* Subdomain slug preview */}
            <div className="mt-2 flex items-center justify-between rounded-xl border border-line bg-surface-raised px-3.5 py-2 text-xs">
              <div className="flex items-center gap-1.5 font-mono text-ink-muted">
                <Globe className="size-3.5 text-primary shrink-0" />
                <span className="font-semibold text-primary">{slug}</span>
                <span>.campus360.app</span>
              </div>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-success uppercase tracking-wider">
                <span className="size-1.5 rounded-full bg-success" />
                Available
              </span>
            </div>
          </div>

          {/* Role & Students */}
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Your Role"
              name="role"
              options={[
                "Principal / Head of School",
                "School Administrator",
                "Bursar / Finance Officer",
                "IT Director",
                "Teacher / Academic Head",
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

          {/* Password with strength bar */}
          <div>
            <TextField
              label="Password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              icon={Lock}
              hint="8+ characters"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Password strength meter */}
            {password.length > 0 ? (
              <div className="mt-2 flex items-center gap-2">
                <div className="grid flex-1 grid-cols-4 gap-1.5">
                  <div className={`h-1.5 rounded-full transition-colors ${strength >= 1 ? "bg-danger" : "bg-line"}`} />
                  <div className={`h-1.5 rounded-full transition-colors ${strength >= 2 ? "bg-warning" : "bg-line"}`} />
                  <div className={`h-1.5 rounded-full transition-colors ${strength >= 3 ? "bg-primary" : "bg-line"}`} />
                  <div className={`h-1.5 rounded-full transition-colors ${strength >= 4 ? "bg-success" : "bg-line"}`} />
                </div>
                <span className="font-mono text-[10px] font-semibold text-ink-muted">
                  {strength <= 1 ? "Weak" : strength <= 2 ? "Fair" : strength === 3 ? "Good" : "Strong"}
                </span>
              </div>
            ) : null}
          </div>

          {/* Terms checkbox */}
          <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-relaxed text-ink-soft select-none">
            <input
              type="checkbox"
              name="terms"
              required
              defaultChecked
              className="mt-0.5 size-4 rounded border-line text-primary accent-primary focus:ring-primary/20"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="font-semibold text-primary underline-offset-2 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-semibold text-primary underline-offset-2 hover:underline">
                Privacy Policy
              </a>
              . Your school&apos;s data is isolated and encrypted.
            </span>
          </label>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
          >
            {loading ? (
              <span>Creating your workspace...</span>
            ) : (
              <>
                <span>Create school workspace</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      )}

      {/* Switch to Sign in */}
      <p className="mt-6 text-center text-xs text-ink-muted">
        Already have a school workspace?{" "}
        <Link
          href="/login"
          className="font-bold text-primary transition-colors hover:text-primary-hover hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
