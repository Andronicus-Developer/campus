import type { Metadata } from "next";
import { Download, MessageSquare, Plus } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Support Tickets" };

const ghostButton =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-xs font-medium text-ink-soft transition-colors hover:text-ink";
const primaryButton =
  "inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-xs font-medium text-paper transition-colors hover:bg-ink-soft";

type TicketStatus   = "open" | "pending" | "resolved" | "escalated";
type TicketPriority = "low" | "normal" | "high" | "urgent";

type Ticket = {
  id: string;
  subject: string;
  school: string;
  submittedBy: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
};

const statusMeta: Record<TicketStatus, { tone: "positive" | "neutral" | "muted" | "critical" }> = {
  open:      { tone: "neutral" },
  pending:   { tone: "warning" as "neutral" },
  resolved:  { tone: "positive" },
  escalated: { tone: "critical" },
};

const priorityMeta: Record<TicketPriority, { tone: "muted" | "neutral" | "warning" | "critical" }> = {
  low:    { tone: "muted" },
  normal: { tone: "neutral" },
  high:   { tone: "warning" as "neutral" },
  urgent: { tone: "critical" },
};

const tickets: Ticket[] = [
  { id: "TKT-0441", subject: "Students cannot log in after password reset", school: "Greenfield Academy", submittedBy: "D. Okafor", status: "open", priority: "urgent", assignedTo: "T. Mensah", createdAt: "22 Oct · 10:14", updatedAt: "22 Oct · 11:02" },
  { id: "TKT-0440", subject: "Report card PDF generation failing for Term 2", school: "Horizon International", submittedBy: "M. Njeru", status: "open", priority: "high", assignedTo: "T. Mensah", createdAt: "21 Oct · 16:45", updatedAt: "22 Oct · 09:30" },
  { id: "TKT-0439", subject: "Invoice not sent after payment confirmation", school: "Pinnacle Academy", submittedBy: "K. Asante", status: "pending", priority: "high", assignedTo: null, createdAt: "21 Oct · 09:12", updatedAt: "21 Oct · 09:12" },
  { id: "TKT-0438", subject: "Timetable overlap not flagged for three teachers", school: "Meridian Schools", submittedBy: "C. Hughes", status: "pending", priority: "normal", assignedTo: "T. Mensah", createdAt: "20 Oct · 14:30", updatedAt: "21 Oct · 08:15" },
  { id: "TKT-0437", subject: "Parent portal shows wrong term dates", school: "Sunrise Primary", submittedBy: "F. Adamu", status: "open", priority: "normal", assignedTo: null, createdAt: "20 Oct · 11:20", updatedAt: "20 Oct · 11:20" },
  { id: "TKT-0436", subject: "Export of student data missing guardian contacts", school: "St. Catherine's", submittedBy: "M. Njeru", status: "escalated", priority: "urgent", assignedTo: "S. Adeyemi", createdAt: "19 Oct · 08:55", updatedAt: "22 Oct · 10:50" },
  { id: "TKT-0435", subject: "Attendance summary incorrect for mixed sessions", school: "Galaxy International", submittedBy: "R. Patel", status: "resolved", priority: "low", assignedTo: "T. Mensah", createdAt: "18 Oct · 15:00", updatedAt: "20 Oct · 12:30" },
  { id: "TKT-0434", subject: "Bulk fee waiver not applying discount correctly", school: "Brighter Futures", submittedBy: "A. Mensah", status: "resolved", priority: "normal", assignedTo: "T. Mensah", createdAt: "17 Oct · 10:20", updatedAt: "19 Oct · 16:00" },
];

const openCount     = tickets.filter((t) => t.status === "open").length;
const pendingCount  = tickets.filter((t) => t.status === "pending").length;
const escalated     = tickets.filter((t) => t.status === "escalated").length;
const unassigned    = tickets.filter((t) => !t.assignedTo && t.status !== "resolved").length;

export default function TicketsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support & Communication"
        title="Support tickets."
        description="Open, pending and resolved tickets with priority, assignment and escalation tracking."
        actions={
          <>
            <button type="button" className={ghostButton}>
              <Download className="size-3.5" aria-hidden="true" />
              Export
            </button>
            <button type="button" className={primaryButton}>
              <Plus className="size-3.5" aria-hidden="true" />
              New ticket
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Open" value={formatNumber(openCount)} hint="awaiting response" icon={<MessageSquare className="size-3.5" aria-hidden="true" />} />
        <KpiCard label="Pending" value={formatNumber(pendingCount)} hint="awaiting school" icon={<MessageSquare className="size-3.5" aria-hidden="true" />} />
        <KpiCard label="Escalated" value={formatNumber(escalated)} hint="needs senior review" icon={<MessageSquare className="size-3.5" aria-hidden="true" />} />
        <KpiCard label="Unassigned" value={formatNumber(unassigned)} hint="no agent yet" icon={<MessageSquare className="size-3.5" aria-hidden="true" />} />
      </div>

      <div className="mt-6">
        <Card title="Ticket queue" description="All tickets sorted by last activity.">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-line">
                  {["ID", "Subject", "School", "Priority", "Status", "Assigned to", "Updated", ""].map((h) => (
                    <th key={h} className="pb-3 pr-4 text-left font-mono text-[9px] uppercase tracking-[0.15em] text-ink-muted last:pr-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="py-3 pr-4 font-mono text-[10px] text-ink-muted">{ticket.id}</td>
                    <td className="py-3 pr-4 font-medium">{ticket.subject}</td>
                    <td className="py-3 pr-4 text-ink-soft">{ticket.school}</td>
                    <td className="py-3 pr-4">
                      <Pill tone={priorityMeta[ticket.priority].tone}>{ticket.priority}</Pill>
                    </td>
                    <td className="py-3 pr-4">
                      <Pill tone={statusMeta[ticket.status].tone}>{ticket.status}</Pill>
                    </td>
                    <td className="py-3 pr-4 text-ink-muted">{ticket.assignedTo ?? "—"}</td>
                    <td className="py-3 pr-4 text-ink-muted">{ticket.updatedAt}</td>
                    <td className="py-3 text-right">
                      <button type="button" className="rounded-full border border-line bg-surface px-3 py-1 text-[11px] text-ink-soft transition-colors hover:text-ink">
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
