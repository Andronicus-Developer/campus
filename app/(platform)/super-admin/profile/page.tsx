import type { Metadata } from "next";
import {
  Clock,
  Download,
  Globe2,
  Key,
  LogOut,
  Mail,
  Save,
  ShieldCheck,
  User,
} from "lucide-react";
import { Avatar, Card, PageHeader, Pill } from "@/components/platform/ui";

export const metadata: Metadata = { title: "My Profile" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink hover:bg-surface-raised transition-all shadow-xs";
const primaryButton =
  "inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white transition-all hover:bg-primary-hover shadow-xs";
const dangerButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-5 text-sm font-bold text-danger-deep transition-all hover:bg-danger/20 shadow-xs";

const profile = {
  fullName: "Sola Adeyemi",
  email: "s.adeyemi@campus360.io",
  role: "Super Admin",
  timezone: "Africa/Lagos (UTC+1)",
  locale: "en-NG",
  joinedAt: "January 2025",
  lastLogin: "Today · 09:14",
};

const activeSessions = [
  { device: "Chrome · macOS",  location: "Lagos, NG", ip: "41.58.102.14", startedAt: "Today · 09:14",      current: true  },
  { device: "Safari · iPhone", location: "Lagos, NG", ip: "41.58.103.22", startedAt: "Yesterday · 20:00",  current: false },
];

const activityLog = [
  { action: "Signed in",                        time: "Today · 09:14",    device: "Chrome · macOS" },
  { action: "Suspended tenant — Galaxy Int.",    time: "22 Oct · 09:45",   device: "Chrome · macOS" },
  { action: "Opened support session",            time: "20 Oct · 14:12",   device: "Chrome · macOS" },
  { action: "Changed platform default timezone", time: "18 Oct · 11:30",   device: "Chrome · macOS" },
  { action: "Exported audit trail",              time: "15 Oct · 16:00",   device: "Chrome · macOS" },
];

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        eyebrow="My Account"
        title="My profile."
        description="Your name, email, preferences, security settings and active sessions."
        actions={
          <button type="button" className={primaryButton}>
            <Save className="size-4" aria-hidden="true" />
            Save changes
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card title="Profile details" description="Your name, email address and display preferences.">
            <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-line pb-6">
              <Avatar name={profile.fullName} className="size-16 text-xl ring-2 ring-primary/20" />
              <div>
                <p className="text-lg sm:text-xl font-black text-ink">{profile.fullName}</p>
                <p className="font-mono text-xs sm:text-sm font-semibold text-primary">{profile.email}</p>
                <div className="mt-2">
                  <Pill tone="neutral">{profile.role}</Pill>
                </div>
              </div>
              <button type="button" className={`ml-auto ${ghostButton}`}>
                Change avatar
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { id: "full-name", label: "Full name",     type: "text",  value: profile.fullName },
                { id: "email",     label: "Email address", type: "email", value: profile.email    },
                { id: "timezone",  label: "Timezone",      type: "text",  value: profile.timezone },
                { id: "locale",    label: "Locale",        type: "text",  value: profile.locale   },
              ].map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-bold text-ink-soft" htmlFor={field.id}>
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    defaultValue={field.value}
                    className="mt-2 h-11 w-full rounded-xl border border-line bg-canvas px-4 text-sm font-semibold text-ink outline-none transition-colors focus:border-primary focus:bg-surface shadow-xs"
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card title="Recent activity" description="Your last actions in the operator console.">
            <ul className="divide-y divide-line">
              {activityLog.map((entry) => (
                <li
                  key={`${entry.action}-${entry.time}`}
                  className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <span className="text-sm sm:text-base font-bold text-ink">{entry.action}</span>
                  <div className="flex items-center gap-3 font-mono text-xs font-semibold text-ink-muted">
                    <span>{entry.device}</span>
                    <span>·</span>
                    <span>{entry.time}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line pt-4">
              <button type="button" className={ghostButton}>
                <Download className="size-4" aria-hidden="true" />
                Export my activity
              </button>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card title="Account summary">
            <ul className="space-y-4">
              {[
                { icon: User,   label: "Role",       value: profile.role       },
                { icon: Mail,   label: "Email",      value: profile.email      },
                { icon: Globe2, label: "Timezone",   value: profile.timezone   },
                { icon: Clock,  label: "Joined",     value: profile.joinedAt   },
                { icon: Clock,  label: "Last login", value: profile.lastLogin  },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-3.5">
                  <item.icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-sans text-xs font-bold uppercase tracking-wider text-slate-700">{item.label}</p>
                    <p className="mt-0.5 text-sm font-bold text-ink">{item.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Security" description="Password and two-factor authentication.">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-sm font-bold text-ink">
                  <ShieldCheck className="size-5 text-pine shrink-0" aria-hidden="true" />
                  MFA (TOTP)
                </div>
                <Pill tone="positive">Active</Pill>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
                <div className="flex items-center gap-2.5 text-sm font-bold text-ink">
                  <Key className="size-5 text-ink-muted shrink-0" aria-hidden="true" />
                  Password
                </div>
                <button type="button" className="rounded-xl border border-line bg-surface px-4 py-2 text-xs font-bold text-ink hover:bg-surface-raised transition-colors shadow-xs">Change</button>
              </div>
            </div>
          </Card>

          <Card title="Active sessions">
            <ul className="space-y-4">
              {activeSessions.map((session) => (
                <li key={session.ip}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-sm sm:text-base font-bold text-ink">
                      {session.device}
                      {session.current && <Pill tone="positive">Current</Pill>}
                    </span>
                    {!session.current && (
                      <button type="button" className="text-xs font-bold text-danger hover:underline">
                        Revoke
                      </button>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-xs font-semibold text-primary">
                    {session.ip} · {session.location}
                  </p>
                  <p className="mt-0.5 font-mono text-xs font-medium text-ink-muted">{session.startedAt}</p>
                </li>
              ))}
            </ul>
          </Card>

          <div className="rounded-2xl border border-line bg-surface p-6 shadow-xs">
            <p className="mb-4 text-sm leading-relaxed text-ink-soft">
              Sign out of the platform operator console. Your active sessions on other devices
              will remain until they expire or are revoked.
            </p>
            <button type="button" className={dangerButton}>
              <LogOut className="size-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
