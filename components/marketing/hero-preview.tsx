import {
  ArrowUpRight,
  Bell,
  CalendarCheck,
  GraduationCap,
  LayoutDashboard,
  Receipt,
  Search,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: UsersRound, label: "Students", active: false },
  { icon: CalendarCheck, label: "Attendance", active: false },
  { icon: Receipt, label: "Finance", active: false },
  { icon: ShieldCheck, label: "Security", active: false },
];

const week = [
  { label: "Mon", value: 74 },
  { label: "Tue", value: 88 },
  { label: "Wed", value: 66 },
  { label: "Thu", value: 92 },
  { label: "Fri", value: 81 },
];

const attention = [
  { name: "Ada Okonkwo", note: "Absent 2 days", tone: "text-vermilion-deep" },
  { name: "Liam Petrov", note: "Fee balance $240", tone: "text-ink-muted" },
  { name: "Grace Mensah", note: "Marks awaiting review", tone: "text-pine" },
];

export function HeroPreview() {
  return (
    <div className="flex min-h-[360px] text-left">
      <aside className="hidden w-44 shrink-0 flex-col gap-1 border-r border-line bg-sand/40 p-4 sm:flex">
        <div className="mb-3 flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-ink text-paper">
            <GraduationCap className="size-4" />
          </span>
          <span className="text-xs font-semibold tracking-tight">
            Riverside Academy
          </span>
        </div>
        {navItems.map((item) => (
          <span
            key={item.label}
            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs ${
              item.active
                ? "bg-ink text-paper"
                : "text-ink-muted"
            }`}
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </span>
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-line bg-sand/50 px-3 py-1.5 text-[11px] text-ink-muted">
            <Search className="size-3.5" />
            Search students, invoices, classes
          </div>
          <Bell className="size-4 text-ink-muted" />
          <span className="grid size-7 place-items-center rounded-full bg-pine text-[10px] font-semibold text-paper">
            AO
          </span>
        </div>

        <div className="flex-1 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-lg leading-tight">
                Good morning, Mrs. Adeyemi
              </h3>
              <p className="mt-0.5 text-[11px] text-ink-muted">
                Term 1 · Week 6 · Tuesday
              </p>
            </div>
            <span className="hidden rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-muted sm:inline-block">
              Live
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {[
              { label: "Students", value: "1,248", delta: "+2.1%" },
              { label: "Attendance", value: "96.4%", delta: "+0.6%" },
              { label: "Fees in", value: "82%", delta: "+5.3%" },
            ].map((tile) => (
              <div
                key={tile.label}
                className="rounded-xl border border-line bg-sand/30 p-3"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">
                  {tile.label}
                </p>
                <p className="mt-1.5 font-display text-xl leading-none">
                  {tile.value}
                </p>
                <p className="mt-1.5 flex items-center gap-1 text-[10px] text-pine">
                  <ArrowUpRight className="size-3" />
                  {tile.delta}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-[1.35fr_1fr]">
            <div className="rounded-xl border border-line p-3.5">
              <p className="text-[11px] font-medium">Attendance this week</p>
              <div className="mt-3 flex h-24 items-end gap-2" aria-hidden="true">
                {week.map((day) => (
                  <div
                    key={day.label}
                    className="flex-1 rounded-t-md bg-pine/80"
                    style={{ height: `${day.value}%` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                {week.map((day) => (
                  <span
                    key={day.label}
                    className="flex-1 text-center font-mono text-[9px] uppercase text-ink-muted"
                  >
                    {day.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-line p-3.5">
              <p className="text-[11px] font-medium">Needs attention</p>
              <ul className="mt-3 space-y-2.5">
                {attention.map((item) => (
                  <li key={item.name} className="flex flex-col">
                    <span className="text-[11px] font-medium">{item.name}</span>
                    <span className={`text-[10px] ${item.tone}`}>{item.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
