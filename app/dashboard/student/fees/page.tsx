"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  DollarSign,
  ShieldCheck,
  ShieldAlert,
  Download,
  Receipt,
  CheckCircle2,
  Calendar,
  AlertCircle,
  HelpCircle,
  Send,
  CreditCard,
} from "lucide-react";

export default function StudentFeesPage() {
  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [querySubject, setQuerySubject] = useState("Tuition Clearance");
  const [queryText, setQueryText] = useState("");
  const [querySubmitted, setQuerySubmitted] = useState(false);

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryText.trim()) return;
    setQuerySubmitted(true);
    setTimeout(() => {
      setQuerySubmitted(false);
      setQueryText("");
      setQueryModalOpen(false);
      alert("Billing status inquiry submitted to the Bursary and Student Accounts Directorate (Ref: BQ-5821).");
    }, 1200);
  };

  return (
    <DashboardLayout currentRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-1">
              <DollarSign className="size-4" />
              Student Portal · Permitted Financial Notices
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Fees & Student Account Information
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Approved term fee clearance statement, authorized receipt downloads, and bursary inquiry desk.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Downloading official Term 2 Bursary Clearance Receipt (PDF with serial RC-REC-2026-0814)")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="size-4" />
              Download Term Receipt (PDF)
            </button>
          </div>
        </div>

        {/* Financial Separation & Privacy Rule Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-start gap-3">
          <ShieldAlert className="size-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-ink-soft">
            <span className="font-bold text-ink block">Student Financial Access Policy</span>
            <p>
              Students have read-only access to verify their academic fee clearance status and download clearance receipts.
              To protect family financial privacy, detailed bank statements, stored payment methods, refund ledgers,
              and direct settlement gateways are restricted exclusively to authorized guardians in the Parent Portal.
            </p>
          </div>
        </div>

        {/* Fee Standing Overview Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600/15 via-teal-600/10 to-transparent border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md">
              <ShieldCheck className="size-8" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Financial Clearance Confirmed
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground">
                Term 2, 2025/2026 Tuition: Paid in Full
              </h2>
              <p className="text-xs text-muted-foreground">
                Account Status: <strong className="text-emerald-600">Good Financial Standing</strong> · Eligible for all term examinations & activities
              </p>
            </div>
          </div>

          <div className="text-right self-start sm:self-auto bg-card border border-border p-4 rounded-2xl shrink-0">
            <span className="text-[11px] text-muted-foreground block font-medium">Outstanding Balance</span>
            <span className="text-2xl font-black text-emerald-600 block mt-0.5">US$ 0.00</span>
            <span className="text-[10px] text-muted-foreground font-mono">Bursary Docket: CLR-2026-981</span>
          </div>
        </div>

        {/* Permitted Term Fee Statements Breakdown */}
        <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="p-4 bg-canvas border-b border-border flex items-center justify-between">
            <div className="font-bold text-foreground text-sm">Term 2 Approved Fee Invoices & Receipts</div>
            <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="size-3.5" /> All Levies Settled
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Invoice / Receipt #</th>
                  <th className="py-3 px-4">Fee Item Description</th>
                  <th className="py-3 px-4">Billing Date</th>
                  <th className="py-3 px-4 text-right">Amount (USD)</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { id: "RC-INV-2026-0814", item: "Senior Secondary Tuition Fee (SSS 2A)", date: "Jan 05, 2026", amount: "US$ 1,450.00", status: "Paid in Full" },
                  { id: "RC-INV-2026-0815", item: "Senior Science Laboratory & Apparatus Levy", date: "Jan 05, 2026", amount: "US$ 180.00", status: "Paid in Full" },
                  { id: "RC-INV-2026-0816", item: "Digital Learning & School Cloud LMS Fee", date: "Jan 05, 2026", amount: "US$ 70.00", status: "Paid in Full" },
                  { id: "RC-INV-2026-0817", item: "Inter-House Sports & Extra-Curriculars", date: "Jan 05, 2026", amount: "US$ 50.00", status: "Paid in Full" },
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4 font-mono font-semibold text-foreground">{row.id}</td>
                    <td className="py-3.5 px-4 font-bold text-foreground">{row.item}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{row.date}</td>
                    <td className="py-3.5 px-4 text-right font-black text-foreground">{row.amount}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => alert(`Downloading official PDF receipt for ${row.id}`)}
                        className="inline-flex items-center gap-1 font-semibold text-cyan-600 hover:underline"
                      >
                        <Download className="size-3" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bursary Assistance & Inquiries Desk */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-foreground text-sm">Have a Question Regarding Fee Clearance?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If an examination docket or activity clearance error occurs, submit an inquiry directly to the Bursar desk.
            </p>
          </div>

          <button
            onClick={() => setQueryModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-canvas border border-border hover:bg-muted text-foreground font-semibold text-xs transition shrink-0"
          >
            Submit Billing Query
          </button>
        </div>

        {/* Billing Query Modal */}
        {queryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-surface border border-line rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="size-5 text-cyan-600" />
                  <h3 className="text-base font-extrabold text-ink">Submit Fee Clearance Inquiry</h3>
                </div>
                <button
                  onClick={() => setQueryModalOpen(false)}
                  className="size-7 rounded-lg hover:bg-surface-raised flex items-center justify-center text-ink-muted"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">
                Send a clearance verification note to the Bursar desk. Detailed family payment plans or transaction
                amendments must be initiated by your registered guardian.
              </p>

              <form onSubmit={handleQuerySubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-ink font-semibold mb-1">Inquiry Category</label>
                  <select
                    value={querySubject}
                    onChange={(e) => setQuerySubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink font-medium focus:outline-none"
                  >
                    <option value="Tuition Clearance">Tuition Clearance Ticket for Mid-Terms</option>
                    <option value="Lab Levy">Science Laboratory Apparatus Receipt</option>
                    <option value="LMS Cloud Fee">Digital Learning LMS Authorization</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ink font-semibold mb-1">Inquiry Details</label>
                  <textarea
                    rows={4}
                    required
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    placeholder="Describe your inquiry or question regarding fee clearance..."
                    className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setQueryModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-line hover:bg-surface-raised font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={querySubmitted}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition"
                  >
                    {querySubmitted ? "Submitting..." : "Submit Inquiry"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
