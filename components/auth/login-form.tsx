"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, GraduationCap, Lock, Mail, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { TextField } from "@/components/forms/text-field";
import { Eyebrow } from "@/components/site/primitives";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [portalType, setPortalType] = useState<"staff" | "portal">("staff");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string)?.trim() || "";
    const password = (formData.get("password") as string) || "";

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred during authentication."
      );
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Top eyebrow badge */}
      <div className="mb-4">
        <Eyebrow>
          <Lock className="size-3" aria-hidden="true" />
          Secure Workspace Login
        </Eyebrow>
      </div>

      <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        Welcome back to <span className="text-gradient">Campus360</span>
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Sign in to manage your school&apos;s admissions, attendance, assessments, and finances.
      </p>

      {/* Role Switcher Pill Tabs */}
      <div className="mt-6 rounded-2xl border border-line bg-surface-raised p-1 shadow-inner">
        <div className="grid grid-cols-2 gap-1 text-center text-xs font-semibold">
          <button
            type="button"
            onClick={() => setPortalType("staff")}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 transition-all ${
              portalType === "staff"
                ? "bg-surface text-primary shadow-sm font-bold"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            <UserCheck className="size-3.5" />
            <span>Staff &amp; Admin</span>
          </button>
          <button
            type="button"
            onClick={() => setPortalType("portal")}
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 transition-all ${
              portalType === "portal"
                ? "bg-surface text-primary shadow-sm font-bold"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            <GraduationCap className="size-3.5" />
            <span>Parent &amp; Student</span>
          </button>
        </div>
      </div>

      {submitted ? (
        <div className="mt-8 rounded-2xl border border-success/30 bg-success-light p-6 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success text-white shadow-md shadow-success/30">
            <Sparkles className="size-6" />
          </div>
          <h2 className="mt-3 text-base font-bold text-ink">Redirecting to workspace...</h2>
          <p className="mt-1 text-xs text-ink-muted">
            Verifying your school membership credentials and permissions.
          </p>
        </div>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger-light p-3 text-xs text-danger">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}
          <TextField
            label={portalType === "staff" ? "Work Email" : "Student / Guardian ID or Email"}
            name="email"
            type="email"
            placeholder={portalType === "staff" ? "amara.okafor@riverside.edu" : "parent@family.com"}
            autoComplete="email"
            icon={Mail}
            required
            autoFocus
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            icon={Lock}
            required
          />

          <div className="flex items-center justify-between gap-4 pt-1">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-ink-soft select-none">
              <input
                type="checkbox"
                name="remember"
                defaultChecked
                className="size-4 rounded border-line text-primary accent-primary focus:ring-primary/20"
              />
              <span>Remember me for 30 days</span>
            </label>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Please contact your school administrator or IT department to reset your credentials.");
              }}
              className="text-xs font-semibold text-primary transition-colors hover:text-primary-hover hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign in to {portalType === "staff" ? "Workspace" : "Portal"}</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      )}

      {/* Divider */}
      <div className="my-6 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-line" />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
          or single sign-on
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      {/* SSO button */}
      <button
        type="button"
        onClick={() => {
          alert("Connecting with your school Identity Provider (Google Workspace / Microsoft 365)...");
        }}
        className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-line bg-surface text-xs font-semibold text-ink shadow-sm transition-all hover:border-primary/40 hover:bg-primary-light/40 hover:text-primary"
      >
        <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
        <span>Continue with Google or Microsoft SSO</span>
      </button>

      {/* Switch to Signup */}
      <div className="mt-8 rounded-2xl border border-line-soft bg-canvas/70 p-4 text-center">
        <p className="text-xs text-ink-muted">
          Looking to adopt Campus360 for your school?
        </p>
        <Link
          href="/signup"
          className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:text-primary-hover hover:underline"
        >
          <span>Start a 14-day free school trial</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}
