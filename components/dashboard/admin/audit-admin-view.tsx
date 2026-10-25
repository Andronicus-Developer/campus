"use client";

import { useState } from "react";
import Link from "next/link";
import {
  History,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Lock,
  UserX,
  UserCheck,
  Search,
  Filter,
  CheckCircle2,
  LifeBuoy,
  Clock,
  ExternalLink,
  Shield,
  Check,
  X,
} from "lucide-react";

interface AuditEntry {
  id: string;
  actor: string;
  actorRole: string;
  action: string;
  target: string;
  category: "credentials" | "enrollment" | "security" | "configuration";
  ipAddress: string;
  timestamp: string;
  status: "success" | "flagged" | "blocked";
}

interface UserSecurityStatus {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  twoFactorActive: boolean;
  accountStatus: "active" | "suspended" | "pending_activation";
}

const INITIAL_AUDIT_LOGS: AuditEntry[] = [
  {
    id: "aud-1",
    actor: "Engr. Patrick Bassey",
    actorRole: "School Administrator",
    action: "Provisioned portal credentials for new faculty teacher",
    target: "Mrs. Folake Adeyemi (f.adeyemi@riverside.edu)",
    category: "credentials",
    ipAddress: "197.210.226.44 (Lagos, NG)",
    timestamp: "Today, 09:14 AM",
    status: "success",
  },
  {
    id: "aud-2",
    actor: "Engr. Patrick Bassey",
    actorRole: "School Administrator",
    action: "Attempted role escalation to 'Principal' / 'Executive Owner'",
    target: "Self (Engr. Patrick Bassey)",
    category: "security",
    ipAddress: "197.210.226.44 (Lagos, NG)",
    timestamp: "Today, 08:30 AM",
    status: "blocked",
  },
  {
    id: "aud-3",
    actor: "Dr. Evelyn Peters",
    actorRole: "Principal / Head of School",
    action: "Authorized appointment confirmation for teacher",
    target: "Mr. David Alabi (Mathematics Lead)",
    category: "configuration",
    ipAddress: "105.112.98.12 (Lagos, NG)",
    timestamp: "Yesterday, 04:22 PM",
    status: "success",
  },
  {
    id: "aud-4",
    actor: "System Gateway",
    actorRole: "Automated Security Agent",
    action: "Failed login attempt with incorrect credentials (3x)",
    target: "p.bassey@riverside.edu",
    category: "security",
    ipAddress: "41.184.42.10 (Abuja, NG)",
    timestamp: "Oct 23, 11:45 PM",
    status: "flagged",
  },
  {
    id: "aud-5",
    actor: "Engr. Patrick Bassey",
    actorRole: "School Administrator",
    action: "Generated term tuition fee invoices batch",
    target: "842 Enrolled Students",
    category: "enrollment",
    ipAddress: "197.210.226.44 (Lagos, NG)",
    timestamp: "Oct 22, 10:15 AM",
    status: "success",
  },
];

const INITIAL_USERS: UserSecurityStatus[] = [
  {
    id: "usr-1",
    name: "Dr. Evelyn Peters",
    email: "e.peters@riverside.edu",
    role: "Principal & CAO",
    lastLogin: "Active Now",
    twoFactorActive: true,
    accountStatus: "active",
  },
  {
    id: "usr-2",
    name: "Mr. David Alabi",
    email: "d.alabi@riverside.edu",
    role: "Teacher / Form Master",
    lastLogin: "Today, 08:14 AM",
    twoFactorActive: true,
    accountStatus: "active",
  },
  {
    id: "usr-3",
    name: "Mrs. Angela Nnamdi",
    email: "a.nnamdi@riverside.edu",
    role: "Bursar & Treasury Head",
    lastLogin: "Today, 09:05 AM",
    twoFactorActive: true,
    accountStatus: "active",
  },
  {
    id: "usr-4",
    name: "Tobi Adeleke",
    email: "t.adeleke@student.riverside.edu",
    role: "Student (Grade 11)",
    lastLogin: "Yesterday, 06:12 PM",
    twoFactorActive: false,
    accountStatus: "active",
  },
  {
    id: "usr-5",
    name: "Mrs. Zainab Adeleke",
    email: "zainab.adeleke@gmail.com",
    role: "Parent / Guardian",
    lastLogin: "Oct 22, 02:40 PM",
    twoFactorActive: false,
    accountStatus: "active",
  },
];

export function AuditAdminView() {
  const [logs, setLogs] = useState<AuditEntry[]>(INITIAL_AUDIT_LOGS);
  const [users, setUsers] = useState<UserSecurityStatus[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              accountStatus: u.accountStatus === "active" ? "suspended" : "active",
            }
          : u
      )
    );
    showToast("User account access state updated and recorded in audit log.");
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header & Security Authority Station */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-slate-900 text-white px-3 py-1 font-mono text-[11px] font-bold">
                Security Governance &amp; Audit Radar
              </span>
              <span className="text-xs text-ink-muted">School-Level Cryptographic Logs</span>
            </div>
            <h2 className="mt-2 text-2xl font-black text-ink">Audit Logs, Security &amp; Access Controls</h2>
            <p className="text-xs text-ink-muted">
              Inspect school-level administrative action logs, review account status and last-login records, monitor suspicious activity, and contact platform engineering support.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setSupportModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-slate-800 active:scale-95 transition-all"
            >
              <LifeBuoy className="size-4 text-emerald-400" />
              <span>Contact Platform Support</span>
            </button>
          </div>
        </div>

        {/* STRICT ROLE BOUNDARY SAFEGUARD BANNER */}
        <div className="rounded-2xl border border-amber-300 bg-amber-50/80 dark:bg-amber-950/20 dark:border-amber-900/40 p-4.5 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3.5">
          <ShieldAlert className="size-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-extrabold text-sm block">Strict Role Elevation Policy Enforced</span>
            <p className="text-amber-800 dark:text-amber-300 text-[11px] leading-relaxed">
              As School Administrator, you are authorized to manage user accounts, classes, and administrative records. However, <strong>you cannot grant yourself Principal, Bursar, or School Owner privileges</strong>. Elevation to higher-level executive roles strictly requires formal sign-off from the School Board or Platform Super-Administrator.
            </p>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMsg && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950 p-4 text-xs text-white font-semibold flex items-center justify-between shadow-xl animate-in slide-in-from-top-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="size-4.5 text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-300">Live Active</span>
        </div>
      )}

      {/* SECTION 1: USER ACCOUNT ACCESS & LAST-LOGIN REVIEW */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-ink">User Account Access &amp; Status Controls</h3>
            <p className="text-xs text-ink-muted">Inspect account status, last-login timestamps, and manage deactivation or reactivation.</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-xs text-ink">
            <thead className="bg-surface-raised font-mono text-[11px] font-bold uppercase tracking-wider text-ink-muted border-b border-line">
              <tr>
                <th className="p-3.5">User Persona</th>
                <th className="p-3.5">Assigned Role</th>
                <th className="p-3.5">2FA Status</th>
                <th className="p-3.5">Last Login Recorded</th>
                <th className="p-3.5">Access State</th>
                <th className="p-3.5 text-right">Access Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-surface-raised/60 transition-colors">
                  <td className="p-3.5">
                    <span className="font-bold text-ink block">{u.name}</span>
                    <span className="font-mono text-[10px] text-ink-muted">{u.email}</span>
                  </td>
                  <td className="p-3.5 font-mono text-xs text-ink-soft">
                    {u.role}
                  </td>
                  <td className="p-3.5">
                    {u.twoFactorActive ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-600 font-bold">
                        <Check className="size-3" /> Enabled
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-ink-muted">Disabled</span>
                    )}
                  </td>
                  <td className="p-3.5 font-mono text-xs text-ink-muted">
                    {u.lastLogin}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        u.accountStatus === "active"
                          ? "bg-emerald-500/10 text-emerald-700"
                          : "bg-rose-500/10 text-rose-700"
                      }`}
                    >
                      {u.accountStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => handleToggleUserStatus(u.id)}
                      className={`rounded-xl px-3 py-1 font-mono text-[11px] font-bold transition-all ${
                        u.accountStatus === "active"
                          ? "border border-rose-300 text-rose-600 hover:bg-rose-50"
                          : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                      }`}
                    >
                      {u.accountStatus === "active" ? "Deactivate" : "Reactivate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: AUDIT LOGS TABLE */}
      <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-ink">Administrative Action Audit Trail</h3>
            <p className="text-xs text-ink-muted">Immutable log of security, credential, and enrollment operations.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-3.5 text-ink-muted" />
              <input
                type="text"
                placeholder="Search actor, action, or target..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 rounded-xl border border-line bg-surface-raised pl-8 pr-3 py-1.5 text-xs text-ink focus:border-slate-800 focus:outline-none"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-line bg-surface-raised px-3 py-1.5 text-xs font-semibold text-ink focus:border-slate-800 focus:outline-none"
            >
              <option value="all">All Audit Categories</option>
              <option value="credentials">Credentials &amp; Access</option>
              <option value="security">Security &amp; Boundaries</option>
              <option value="enrollment">Enrollment &amp; Invoicing</option>
              <option value="configuration">Configuration</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left text-xs text-ink">
            <thead className="bg-surface-raised font-mono text-[11px] font-bold uppercase tracking-wider text-ink-muted border-b border-line">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Actor</th>
                <th className="p-3.5">Action Executed</th>
                <th className="p-3.5">Target / Subject</th>
                <th className="p-3.5">Origin IP</th>
                <th className="p-3.5 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-raised/60 transition-colors">
                  <td className="p-3.5 font-mono text-ink-muted text-[11px]">{log.timestamp}</td>
                  <td className="p-3.5">
                    <span className="font-bold text-ink block">{log.actor}</span>
                    <span className="text-[10px] text-ink-muted font-mono">{log.actorRole}</span>
                  </td>
                  <td className="p-3.5 font-medium text-ink-soft">{log.action}</td>
                  <td className="p-3.5 font-mono text-xs text-ink">{log.target}</td>
                  <td className="p-3.5 font-mono text-[11px] text-ink-muted">{log.ipAddress}</td>
                  <td className="p-3.5 text-right">
                    {log.status === "success" && (
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700">
                        SUCCESS
                      </span>
                    )}
                    {log.status === "blocked" && (
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-700">
                        BLOCKED (RBAC)
                      </span>
                    )}
                    {log.status === "flagged" && (
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700">
                        FLAGGED
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: CONTACT PLATFORM SUPPORT */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2 text-ink">
                <LifeBuoy className="size-5 text-emerald-600" />
                <h3 className="text-base font-extrabold">Campus360 Engineering Support</h3>
              </div>
              <button
                type="button"
                onClick={() => setSupportModalOpen(false)}
                className="text-ink-muted hover:text-ink"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <p className="text-ink-muted">
                Submit an urgent infrastructure, data restoration, or permission change ticket directly to the core Campus360 SaaS engineering team.
              </p>

              <div>
                <label className="block font-semibold text-ink-muted mb-1">Issue Category</label>
                <select className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink">
                  <option value="data_sync">Database Sync &amp; Backup</option>
                  <option value="permission_change">Role Elevation / Ownership Authorization</option>
                  <option value="gateway">Paystack Payment Gateway Webhook Issue</option>
                  <option value="incident">Report Suspected Unauthorized Access</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-ink-muted mb-1">Detailed Explanation</label>
                <textarea
                  rows={3}
                  placeholder="Describe the technical issue or security alert..."
                  className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-line">
              <button
                type="button"
                onClick={() => setSupportModalOpen(false)}
                className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setSupportModalOpen(false);
                  showToast("Support ticket #CS-9912 dispatched to Campus360 Technical Support.");
                }}
                className="rounded-xl bg-slate-900 px-5 py-2 font-mono text-xs font-bold text-white shadow-md hover:bg-slate-800"
              >
                Dispatch Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
