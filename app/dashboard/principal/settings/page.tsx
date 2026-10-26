"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AccountSettingsView } from "@/components/dashboard/account-settings-view";
import {
  AlertTriangle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  DoorOpen,
  GraduationCap,
  KeyRound,
  Landmark,
  Layers,
  Lock,
  Percent,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  UserCheck,
  Users,
} from "lucide-react";
import { ROLES_CONFIG } from "@/lib/rbac";

export default function PrincipalSettingsPage() {
  const [activeTab, setActiveTab] = useState<"structure" | "grading" | "governance" | "profile">("structure");

  return (
    <DashboardLayout currentRole="principal">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                  Section O · School Settings &amp; Institutional Governance
                </span>
                <span className="font-mono text-xs text-ink-muted">Principal Delegated Authority</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">Academic Structure &amp; Governance Matrix</h2>
              <p className="text-xs text-ink-muted max-w-3xl">
                Review academic divisions, examine continuous assessment grading rubrics, audit role permission boundaries, and configure principal credentials with strict institutional boundaries.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-2xl border border-line bg-surface-raised px-4 py-2 font-mono text-xs font-bold text-emerald-600">
                Tier-1 Academic Head Active
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("structure")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "structure"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Academic Structure &amp; Divisions
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("grading")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "grading"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Grading Rules &amp; Weightings
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("governance")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "governance"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Governance Matrix &amp; Boundaries
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  activeTab === "profile"
                    ? "bg-primary text-white shadow-sm"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                Executive Profile &amp; Security
              </button>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs text-ink-muted">
              <Lock className="size-3.5 text-amber-600" />
              <span>SaaS subscription &amp; tenant deletion strictly reserved for School Owner</span>
            </div>
          </div>
        </div>

        {/* TAB 1: ACADEMIC STRUCTURE */}
        {activeTab === "structure" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-ink">Riverside International College Structure</h3>
                <p className="text-xs text-ink-muted">32 Class Arms across Junior and Senior Secondary divisions.</p>
              </div>
              <span className="font-mono text-xs font-bold text-primary">842 Total Enrolled</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2 text-xs">
                <span className="font-mono text-[10px] font-bold text-primary uppercase">Senior Science</span>
                <h4 className="text-sm font-bold text-ink">SSS 1 - 3 (6 Arms)</h4>
                <p className="text-ink-muted">214 candidates enrolled</p>
                <div className="pt-2 border-t border-line text-[11px] text-ink-soft">
                  Lead: Dr. Kenneth Obi (HOD Sciences)
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2 text-xs">
                <span className="font-mono text-[10px] font-bold text-accent uppercase">Senior Arts</span>
                <h4 className="text-sm font-bold text-ink">SSS 1 - 3 (6 Arms)</h4>
                <p className="text-ink-muted">198 candidates enrolled</p>
                <div className="pt-2 border-t border-line text-[11px] text-ink-soft">
                  Lead: Mrs. Ngozi Udoh (HOD Arts)
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2 text-xs">
                <span className="font-mono text-[10px] font-bold text-amber-600 uppercase">Senior Commercial</span>
                <h4 className="text-sm font-bold text-ink">SSS 1 - 3 (4 Arms)</h4>
                <p className="text-ink-muted">142 candidates enrolled</p>
                <div className="pt-2 border-t border-line text-[11px] text-ink-soft">
                  Lead: Mr. Friday Eze (Commerce Lead)
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-2 text-xs">
                <span className="font-mono text-[10px] font-bold text-indigo-600 uppercase">Junior Secondary</span>
                <h4 className="text-sm font-bold text-ink">JSS 1 - 3 (16 Arms)</h4>
                <p className="text-ink-muted">288 candidates enrolled</p>
                <div className="pt-2 border-t border-line text-[11px] text-ink-soft">
                  Lead: Ms. Chioma Okon (Junior Head)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GRADING RULES */}
        {activeTab === "grading" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-ink">Continuous Assessment &amp; Grading Policies</h3>
                <p className="text-xs text-ink-muted">Official academic calculation formulas and passing thresholds.</p>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-600">Standard WAEC / BECE Scale</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-1 text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-primary">Continuous Assessment 1</span>
                <h4 className="text-lg font-black text-ink">20% Weight</h4>
                <p className="text-ink-muted">Midterm assignments, homework, and weekly quizzes.</p>
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-1 text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-primary">Continuous Assessment 2</span>
                <h4 className="text-lg font-black text-ink">20% Weight</h4>
                <p className="text-ink-muted">Practical laboratory projects and mid-term exam test.</p>
              </div>

              <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-1 text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-primary">Terminal Examination</span>
                <h4 className="text-lg font-black text-ink">60% Weight</h4>
                <p className="text-ink-muted">Comprehensive end-of-term examinations and WAEC mocks.</p>
              </div>
            </div>

            {/* Letter Grade Cutoffs Table */}
            <div className="mt-4 pt-2">
              <span className="font-mono text-xs font-bold uppercase text-ink-muted block mb-2">Grade Cutoff Scale</span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-line font-mono text-[11px] text-ink-muted">
                      <th className="pb-2 font-bold">Grade</th>
                      <th className="pb-2 font-bold">Score Range</th>
                      <th className="pb-2 font-bold">GPA Points</th>
                      <th className="pb-2 font-bold">Standing Remark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-soft font-mono">
                    <tr><td className="py-2 font-bold text-primary">A1</td><td>75% - 100%</td><td>4.00</td><td className="text-emerald-600 font-bold font-sans">Excellent (Distinction)</td></tr>
                    <tr><td className="py-2 font-bold text-indigo-600">B2 - B3</td><td>65% - 74%</td><td>3.50</td><td className="text-indigo-600 font-bold font-sans">Very Good (Credit)</td></tr>
                    <tr><td className="py-2 font-bold text-amber-600">C4 - C6</td><td>50% - 64%</td><td>2.50</td><td className="text-amber-600 font-bold font-sans">Credit Pass</td></tr>
                    <tr><td className="py-2 font-bold text-danger">F9</td><td>0% - 49%</td><td>0.00</td><td className="text-danger font-bold font-sans">Fail (Academic Intervention)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GOVERNANCE MATRIX & PRIVILEGES */}
        {activeTab === "governance" && (
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
            <div className="border-b border-line pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-ink">Segregation of Duties &amp; Authority Matrix</h3>
                <p className="text-xs text-ink-muted">
                  Audits executive capabilities vs strict institutional boundaries for the Principal role.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-primary">Institutional Integrity Enforced</span>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Authorized Executive Privileges */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/20 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-emerald-600" />
                  <h4 className="text-sm font-bold text-ink">Authorized Executive Privileges</h4>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    "Confirm newly onboarded Teachers & Bursars registered by School Admin",
                    "Final sign-off authorizing publication of report cards & broadsheets",
                    "Authorize fee waivers and academic merit scholarships within policy",
                    "Approve faculty medical/duty leave requests and substitute cover",
                    "Approve operational departmental requisitions up to US$ 5,000.00",
                    "Direct emergency SMS and bulletin broadcasts to all parents and staff",
                    "Oversee pastoral discipline and confidential safeguarding referrals",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-ink-soft">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strict Institutional Boundaries */}
              <div className="rounded-2xl border border-rose-500/30 bg-rose-50/20 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="size-5 text-rose-600" />
                  <h4 className="text-sm font-bold text-ink">Institutional Boundaries &amp; Restrictions</h4>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    "Cannot directly enter continuous assessment marks (must be done by subject teachers)",
                    "Cannot manually record cash ledger receipts or reconcile bank feeds (restricted to Bursar)",
                    "Cannot unilaterally alter school-wide tuition tariff structures without School Owner authorization",
                    "Cannot change SaaS subscription, delete tenant database, or view other schools' data",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <Lock className="size-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span className="text-ink-soft">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EXECUTIVE PROFILE */}
        {activeTab === "profile" && (
          <AccountSettingsView currentRole="principal" />
        )}
      </div>
    </DashboardLayout>
  );
}
