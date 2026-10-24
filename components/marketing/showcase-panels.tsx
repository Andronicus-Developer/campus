import type { ReactNode } from "react";
import { Clock3, TrendingUp } from "lucide-react";

type Tone = "positive" | "warning" | "neutral" | "muted";

const toneClass: Record<Tone, string> = {
  positive: "bg-success-light text-success-deep",
  warning:  "bg-warning-light text-warning",
  neutral:  "bg-primary-light text-primary",
  muted:    "bg-line-soft text-ink-muted",
};

function Pill({ children, tone = "muted" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}

function PanelShell({
  title,
  meta,
  children,
}: {
  title: string;
  meta: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="border-b border-line px-5 py-4">
        <h3 className="text-lg font-bold leading-tight">{title}</h3>
        <p className="mt-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-muted">
          {meta}
        </p>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-canvas p-3">
      <p className="font-mono text-[9px] font-semibold uppercase tracking-widest text-ink-muted">
        {label}
      </p>
      <p className="mt-2 text-xl font-extrabold leading-none">{value}</p>
    </div>
  );
}

const gradeLabels = ["G4", "G5", "G6", "G7", "G8", "G9", "G10"];
const gradeBars = [34, 46, 41, 62, 38, 44, 29];

export function OverviewPanel() {
  return (
    <PanelShell title="School overview" meta="Riverside Academy · Term 1">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatTile label="Students" value="1,248" />
        <StatTile label="Attendance today" value="96.4%" />
        <StatTile label="Fees collected" value="$184,300" />
        <StatTile label="Open invoices" value="37" />
      </div>

      <div className="mt-5 rounded-xl border border-line p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold">Enrolment by grade</p>
          <Pill tone="positive">
            <TrendingUp className="mr-1 size-3" aria-hidden="true" />
            +2.1% term on term
          </Pill>
        </div>
        <div className="mt-4 flex h-28 items-end gap-3" aria-hidden="true">
          {gradeBars.map((value, index) => (
            <div
              key={gradeLabels[index]}
              className="flex-1 rounded-t-md bg-primary/80"
              style={{ height: `${value + 34}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex gap-3">
          {gradeLabels.map((label) => (
            <span
              key={label}
              className="flex-1 text-center font-mono text-[9px] uppercase text-ink-muted"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

const roster = [
  { name: "Ada Okonkwo",   id: "STU-1043", status: "Present" },
  { name: "Liam Petrov",   id: "STU-1044", status: "Present" },
  { name: "Grace Mensah",  id: "STU-1051", status: "Late" },
  { name: "Noah Bennett",  id: "STU-1058", status: "Present" },
  { name: "Zara Ibrahim",  id: "STU-1062", status: "Excused" },
  { name: "Tom Whitfield", id: "STU-1067", status: "Absent" },
];

const statusTone: Record<string, Tone> = {
  Present: "positive",
  Late:    "warning",
  Absent:  "neutral",
  Excused: "muted",
};

export function AttendancePanel() {
  const summary: { label: string; value: string; tone: Tone }[] = [
    { label: "Present", value: "28", tone: "positive" },
    { label: "Late",    value: "2",  tone: "warning"  },
    { label: "Absent",  value: "1",  tone: "neutral"  },
    { label: "Excused", value: "1",  tone: "muted"    },
  ];

  return (
    <PanelShell title="Attendance register" meta="Grade 7B · Morning session · Mon 12 Oct">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {summary.map((item) => (
          <div key={item.label} className="rounded-xl border border-line bg-canvas p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-widest text-ink-muted">
                {item.label}
              </p>
              <Pill tone={item.tone}>{item.value}</Pill>
            </div>
            <p className="mt-2 text-xl font-extrabold leading-none">{item.value}</p>
          </div>
        ))}
      </div>

      <ul className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line">
        {roster.map((student) => (
          <li key={student.id} className="flex items-center gap-3 px-4 py-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary-light font-mono text-[10px] font-bold text-primary">
              {student.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold">
                {student.name}
              </span>
              <span className="block font-mono text-[10px] text-ink-muted">
                {student.id}
              </span>
            </span>
            <Pill tone={statusTone[student.status]}>{student.status}</Pill>
          </li>
        ))}
      </ul>

      <p className="mt-4 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-muted">
        <Clock3 className="size-3" aria-hidden="true" />
        Saved 08:12 · 32 records · Duplicates blocked
      </p>
    </PanelShell>
  );
}

const marks = [
  { name: "Ada Okonkwo",  maths: 88, english: 91, science: 84 },
  { name: "Liam Petrov",  maths: 74, english: 68, science: 79 },
  { name: "Grace Mensah", maths: 92, english: 86, science: 90 },
  { name: "Noah Bennett", maths: 65, english: 72, science: 61 },
  { name: "Zara Ibrahim", maths: 81, english: 78, science: 88 },
];

function gradeOf(average: number) {
  if (average >= 85) return "A";
  if (average >= 70) return "B";
  if (average >= 60) return "C";
  return "D";
}

function gradeClass(grade: string) {
  if (grade === "A") return "bg-success-light text-success-deep";
  if (grade === "D") return "bg-danger-light text-danger-deep";
  return "bg-canvas text-ink-soft";
}

export function AssessmentsPanel() {
  return (
    <PanelShell title="Assessment scores" meta="Grade 7B · Mid-term · Awaiting approval">
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[520px] text-left text-xs">
          <thead className="bg-canvas">
            <tr className="font-mono text-[9px] font-bold uppercase tracking-widest text-ink-muted">
              <th className="px-4 py-2.5 font-normal">Student</th>
              <th className="px-3 py-2.5 font-normal">Maths</th>
              <th className="px-3 py-2.5 font-normal">English</th>
              <th className="px-3 py-2.5 font-normal">Science</th>
              <th className="px-3 py-2.5 font-normal">Average</th>
              <th className="px-4 py-2.5 font-normal">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {marks.map((student) => {
              const average = Math.round(
                (student.maths + student.english + student.science) / 3,
              );
              const grade = gradeOf(average);
              return (
                <tr key={student.name}>
                  <td className="px-4 py-2.5 font-semibold">{student.name}</td>
                  <td className="px-3 py-2.5 text-ink-muted">{student.maths}</td>
                  <td className="px-3 py-2.5 text-ink-muted">{student.english}</td>
                  <td className="px-3 py-2.5 text-ink-muted">{student.science}</td>
                  <td className="px-3 py-2.5 font-mono font-semibold">{average}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-grid size-6 place-items-center rounded-md font-mono text-[10px] font-bold ${gradeClass(grade)}`}
                    >
                      {grade}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-muted">
        Scale A–F · CA 40% · Exam 60% · Published after approval
      </p>
    </PanelShell>
  );
}

const invoices = [
  { id: "INV-2041", student: "Ada Okonkwo",  amount: "$1,200", status: "Paid"    },
  { id: "INV-2042", student: "Liam Petrov",   amount: "$1,200", status: "Partial" },
  { id: "INV-2043", student: "Grace Mensah",  amount: "$980",   status: "Paid"    },
  { id: "INV-2044", student: "Zara Ibrahim",  amount: "$1,200", status: "Overdue" },
];

const invoiceTone: Record<string, Tone> = {
  Paid:    "positive",
  Partial: "warning",
  Overdue: "neutral",
};

export function FinancePanel() {
  return (
    <PanelShell title="Fee collection" meta="Term 1 invoices · All classes">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatTile label="Invoiced"     value="$184,300" />
        <StatTile label="Collected"    value="$151,200" />
        <StatTile label="Outstanding"  value="$33,100"  />
      </div>

      <div className="mt-5 rounded-xl border border-line p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold">Collection progress</span>
          <span className="font-mono font-semibold text-ink-muted">82%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
          <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>
      </div>

      <ul className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line">
        {invoices.map((invoice) => (
          <li key={invoice.id} className="flex items-center gap-3 px-4 py-2.5">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-semibold">
                {invoice.student}
              </span>
              <span className="block font-mono text-[10px] text-ink-muted">
                {invoice.id}
              </span>
            </span>
            <span className="font-mono text-xs font-semibold">{invoice.amount}</span>
            <Pill tone={invoiceTone[invoice.status]}>{invoice.status}</Pill>
          </li>
        ))}
      </ul>
    </PanelShell>
  );
}
