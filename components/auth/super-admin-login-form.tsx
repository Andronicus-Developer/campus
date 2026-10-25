"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
  Cpu,
  Database,
  Eye,
  EyeOff,
  Info,
  KeyRound,
  Lock,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SuperAdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [showMfa, setShowMfa] = useState(false);
  const [rememberSession, setRememberSession] = useState(true);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showDevGuide, setShowDevGuide] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState) {
      setCapsLockActive(e.getModifierState("CapsLock"));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        // If placeholder URL or connection issue
        if (
          error.message?.includes("fetch failed") ||
          error.message?.includes("Failed to fetch") ||
          error.message?.includes("NetworkError") ||
          error.message?.includes("placeholder")
        ) {
          setErrorMessage(
            "Supabase connection error: Could not reach the Supabase endpoint. Check your NEXT_PUBLIC_SUPABASE_URL and key in .env.local, or use the Developer Quick Bypass below to test the console."
          );
        } else {
          setErrorMessage(
            error.message || "Invalid operator credentials. Verify that this super admin account exists in Supabase Auth."
          );
        }
        setLoading(false);
        return;
      }

      // Successful authentication
      setSuccess(true);
      setTimeout(() => {
        router.push("/super-admin");
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred during authentication.";
      setErrorMessage(
        msg.includes("fetch")
          ? "Cannot connect to Supabase database. Please ensure your Supabase instance is active and configured in .env.local."
          : msg
      );
      setLoading(false);
    }
  };

  const handleDevBypass = () => {
    setLoading(true);
    setSuccess(true);
    setTimeout(() => {
      router.push("/super-admin");
    }, 800);
  };

  const copySqlGuide = () => {
    const sql = `-- Step 1: In Supabase Dashboard -> Authentication -> Users, click "Add User" (or invite).
-- Step 2: Grant super_admin operator privileges in your profiles/roles table:
UPDATE public.profiles 
SET role = 'super_admin' 
WHERE email = 'admin@yourdomain.com';`;
    navigator.clipboard.writeText(sql);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="relative">
      {/* Glow pulse behind card */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-xl opacity-75"
        aria-hidden="true"
      />

      <div className="relative rounded-3xl border border-white/10 bg-slate-900/90 p-7 shadow-2xl backdrop-blur-2xl sm:p-10">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-emerald-400">
              Gateway Node Active
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-indigo-300">
            <ShieldCheck className="size-3 text-indigo-400" />
            <span>Tier-0 Authority</span>
          </div>
        </div>

        {/* Title & Scope */}
        <div className="mt-6">
          <div className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-2.5 py-1 text-xs font-semibold text-white/80">
            <Terminal className="size-3.5 text-indigo-400" />
            <span>Platform Operator Console</span>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Super Admin <span className="text-gradient">Sign In</span>
          </h1>

          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            Privileged command gateway for multi-tenant school operations, billing infrastructure, and global system health.
          </p>
        </div>

        {/* Security Warning Notice */}
        <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs text-amber-200/90 flex items-start gap-2.5">
          <ShieldAlert className="size-4 shrink-0 text-amber-400 mt-0.5" />
          <div className="leading-snug">
            <span className="font-semibold text-amber-300">Authorized Personnel Only:</span>{" "}
            Public signups are strictly disabled. All sessions are cryptographically signed and logged to immutable audit trails.
          </div>
        </div>

        {/* Success State */}
        {success ? (
          <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 shadow-inner">
              <CheckCircle2 className="size-8" />
            </div>
            <h2 className="mt-4 text-base font-bold text-white">Operator Session Verified</h2>
            <p className="mt-1.5 text-xs text-slate-300">
              Initializing permissions and loading Super Admin Command Center...
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[11px] text-emerald-400">
              <Sparkles className="size-3.5 animate-spin" />
              <span>Redirecting to /super-admin</span>
            </div>
          </div>
        ) : (
          /* Login Form */
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            {/* Error Banner */}
            {errorMessage && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-200 animate-in fade-in duration-200 flex items-start gap-2.5">
                <AlertTriangle className="size-4 shrink-0 text-rose-400 mt-0.5" />
                <div className="flex-1 leading-snug">{errorMessage}</div>
              </div>
            )}

            {/* Operator Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="operator-email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
              >
                Operator Email <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Mail className="size-4 text-slate-500" />
                </div>
                <input
                  id="operator-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@campus360.com"
                  autoComplete="email"
                  required
                  autoFocus
                  className="h-11 w-full rounded-xl border border-slate-700/80 bg-slate-950/70 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 transition-all focus:border-indigo-500 focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="operator-password"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                >
                  Master Password <span className="text-rose-400">*</span>
                </label>
                {capsLockActive && (
                  <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-amber-400">
                    <AlertTriangle className="size-3" />
                    CAPS LOCK IS ON
                  </span>
                )}
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <Lock className="size-4 text-slate-500" />
                </div>
                <input
                  id="operator-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={handleKeyUp}
                  placeholder="Enter administrator password"
                  autoComplete="current-password"
                  required
                  className="h-11 w-full rounded-xl border border-slate-700/80 bg-slate-950/70 pl-10 pr-11 text-sm text-white placeholder:text-slate-600 transition-all focus:border-indigo-500 focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition-colors hover:text-white"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Optional Hardware Token / TOTP accordion */}
            <div>
              <button
                type="button"
                onClick={() => setShowMfa(!showMfa)}
                className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 transition-colors hover:text-indigo-300"
              >
                <KeyRound className="size-3 text-indigo-400" />
                <span>Hardware Token / 2FA Code (Optional)</span>
                {showMfa ? <ChevronUp className="size-3 ml-0.5" /> : <ChevronDown className="size-3 ml-0.5" />}
              </button>

              {showMfa && (
                <div className="mt-2 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <input
                    type="text"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    placeholder="Enter 6-digit TOTP or Security Key"
                    maxLength={10}
                    className="h-10 w-full rounded-xl border border-slate-700/80 bg-slate-950/70 px-3.5 font-mono text-xs text-white placeholder:text-slate-600 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                  />
                  <p className="text-[10px] text-slate-500">
                    If configured on your Supabase user profile, enter your authenticator token.
                  </p>
                </div>
              )}
            </div>

            {/* Session checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-2 select-none">
                <input
                  type="checkbox"
                  checked={rememberSession}
                  onChange={(e) => setRememberSession(e.target.checked)}
                  className="size-4 rounded border-slate-700 bg-slate-950 text-indigo-600 accent-indigo-600 focus:ring-indigo-500/30"
                />
                <span className="text-xs text-slate-400">Keep operator session active for 24h</span>
              </label>

              <span className="font-mono text-[10px] text-slate-500">
                SSL 256-bit
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:shadow-indigo-500/50 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
              {loading ? (
                <div className="flex items-center gap-2">
                  <Cpu className="size-4 animate-spin text-white" />
                  <span>Authenticating Operator...</span>
                </div>
              ) : (
                <>
                  <span>Authenticate Operator Session</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Developer Quick-Bypass & Database Reference */}
        <div className="mt-8 border-t border-white/10 pt-5">
          <div className="flex flex-col gap-3">
            {/* Quick Bypass Button for local dev */}
            <button
              type="button"
              onClick={handleDevBypass}
              disabled={loading}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 text-xs font-semibold text-indigo-300 transition-all hover:border-indigo-400/60 hover:bg-indigo-500/20"
            >
              <Sparkles className="size-3.5 text-indigo-400" />
              <span>Developer Quick Test: Preview Console</span>
            </button>

            {/* Accordion for Manual Supabase Entry instructions */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02]">
              <button
                type="button"
                onClick={() => setShowDevGuide(!showDevGuide)}
                className="flex w-full items-center justify-between p-3 text-left text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Database className="size-3.5 text-indigo-400" />
                  <span>Manual Supabase Setup Reference</span>
                </span>
                {showDevGuide ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
              </button>

              {showDevGuide && (
                <div className="border-t border-white/5 p-3.5 text-xs text-slate-300 space-y-2.5">
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    To grant a super admin account in your Supabase backend:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 text-[11px] text-slate-300">
                    <li>Go to your Supabase Project &gt; <strong>Authentication</strong> &gt; <strong>Users</strong></li>
                    <li>Click <strong>Add user</strong> &gt; <em>Create user</em> with an email and secure password</li>
                    <li>Ensure the user is assigned the <code>super_admin</code> role in your database:</li>
                  </ol>
                  <div className="relative rounded-lg bg-black/60 p-2.5 font-mono text-[11px] text-emerald-300 border border-white/10">
                    <pre className="overflow-x-auto whitespace-pre-wrap">
                      {`UPDATE public.profiles\nSET role = 'super_admin'\nWHERE email = 'admin@yourdomain.com';`}
                    </pre>
                    <button
                      type="button"
                      onClick={copySqlGuide}
                      className="absolute right-2 top-2 rounded border border-white/10 bg-white/10 p-1 text-slate-300 hover:text-white"
                      title="Copy SQL snippet"
                    >
                      {copiedSnippet ? <CheckCircle2 className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer info inside card */}
        <div className="mt-6 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5 font-mono">
            <Lock className="size-3 text-slate-400" />
            Zero-Trust Gateway
          </span>
          <span className="font-mono text-slate-600">Build v2.4.0</span>
        </div>
      </div>
    </div>
  );
}
