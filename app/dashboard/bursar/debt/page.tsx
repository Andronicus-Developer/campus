"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  ClockAlert,
  Search,
  Filter,
  Send,
  PhoneCall,
  Download,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  FileText,
  DollarSign,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

interface DebtorItem {
  id: string;
  studentName: string;
  studentId: string;
  classArm: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  balance: number;
  agingDays: number;
  bucket: "0-30" | "31-60" | "60+";
  lastPaymentDate: string;
  status: "first-notice" | "second-notice" | "final-demand" | "payment-plan";
}

export default function BursarDebtRecoveryPage() {
  const [bucketFilter, setBucketFilter] = useState<"all" | "0-30" | "31-60" | "60+">("all");
  const [search, setSearch] = useState("");
  const [bulkNoticeSending, setBulkNoticeSending] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [debtors, setDebtors] = useState<DebtorItem[]>([
    {
      id: "deb-1",
      studentName: "Chinedu Eze",
      studentId: "RC-2023-0210",
      classArm: "SSS 2B",
      guardianName: "Mr. Jude Eze",
      guardianPhone: "+234 802 889 1234",
      guardianEmail: "jude.eze@gmail.com",
      balance: 185000,
      agingDays: 42,
      bucket: "31-60",
      lastPaymentDate: "Nov 12, 2025",
      status: "second-notice",
    },
    {
      id: "deb-2",
      studentName: "Emeka Okafor",
      studentId: "RC-2023-0112",
      classArm: "SSS 1B",
      guardianName: "Mrs. N. Okafor",
      guardianPhone: "+234 803 999 1122",
      guardianEmail: "n.okafor@yahoo.com",
      balance: 175000,
      agingDays: 19,
      bucket: "0-30",
      lastPaymentDate: "Dec 05, 2025",
      status: "first-notice",
    },
    {
      id: "deb-3",
      studentName: "Bolanle Adeyemi",
      studentId: "RC-2022-0044",
      classArm: "SSS 3C",
      guardianName: "Chief T. Adeyemi",
      guardianPhone: "+234 802 334 5566",
      guardianEmail: "t.adeyemi@lawchambers.ng",
      balance: 310000,
      agingDays: 85,
      bucket: "60+",
      lastPaymentDate: "Oct 14, 2025",
      status: "final-demand",
    },
    {
      id: "deb-4",
      studentName: "Fatima Sani",
      studentId: "RC-2024-0199",
      classArm: "JSS 2B",
      guardianName: "Alhaji Garba Sani",
      guardianPhone: "+234 803 776 2211",
      guardianEmail: "g.sani@holdings.com",
      balance: 160000,
      agingDays: 24,
      bucket: "0-30",
      lastPaymentDate: "Dec 18, 2025",
      status: "first-notice",
    },
    {
      id: "deb-5",
      studentName: "Kelvin Okoli",
      studentId: "RC-2024-0048",
      classArm: "JSS 1A",
      guardianName: "Barr. Chuka Okoli",
      guardianPhone: "+234 807 888 9900",
      guardianEmail: "chuka.okoli@nigerianbar.org",
      balance: 120000,
      agingDays: 55,
      bucket: "31-60",
      lastPaymentDate: "Nov 02, 2025",
      status: "payment-plan",
    },
    {
      id: "deb-6",
      studentName: "Godwin Bassey",
      studentId: "RC-2022-0012",
      classArm: "SSS 3A",
      guardianName: "Mr. Victor Bassey",
      guardianPhone: "+234 803 555 1290",
      guardianEmail: "v.bassey@gmail.com",
      balance: 240000,
      agingDays: 92,
      bucket: "60+",
      lastPaymentDate: "Sep 28, 2025",
      status: "final-demand",
    },
  ]);

  const handleTriggerBulkReminders = () => {
    setBulkNoticeSending(true);
    setTimeout(() => {
      setBulkNoticeSending(false);
      setToastMessage("Automated SMS & WhatsApp payment links dispatched to all 32 outstanding guardian accounts.");
    }, 1200);
  };

  const filtered = debtors.filter((d) => {
    const matchesSearch =
      d.studentName.toLowerCase().includes(search.toLowerCase()) ||
      d.studentId.toLowerCase().includes(search.toLowerCase()) ||
      d.guardianName.toLowerCase().includes(search.toLowerCase()) ||
      d.classArm.toLowerCase().includes(search.toLowerCase());
    const matchesBucket = bucketFilter === "all" || d.bucket === bucketFilter;
    return matchesSearch && matchesBucket;
  });

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 mb-1">
              <ClockAlert className="w-4 h-4" />
              Bursary Division · Outstanding Receivables
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Debt Recovery & Aging Analysis
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Monitor overdue tuition aging buckets, initiate automated payment summons, and establish installment plans.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleTriggerBulkReminders}
              disabled={bulkNoticeSending}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs sm:text-sm shadow-sm transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {bulkNoticeSending ? "Dispatching..." : "Send Bulk Demand Notices"}
            </button>
            <button
              onClick={() => alert("Exporting Delinquent Debtor Schedule for Principal Review.")}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4 text-muted-foreground" />
              Export
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              {toastMessage}
            </span>
            <button onClick={() => setToastMessage(null)} className="text-emerald-600 hover:underline text-xs ml-4">
              Dismiss
            </button>
          </div>
        )}

        {/* Aging Buckets Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setBucketFilter("all")}
            className={`p-5 rounded-2xl bg-card border cursor-pointer transition ${
              bucketFilter === "all" ? "border-amber-500 ring-2 ring-amber-500/20" : "border-border hover:border-border"
            }`}
          >
            <div className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Total Delinquent</div>
            <div className="text-2xl font-black text-foreground mt-2">$5,600,000</div>
            <div className="text-xs text-muted-foreground mt-1">32 unpaid accounts across school</div>
          </div>

          <div
            onClick={() => setBucketFilter("0-30")}
            className={`p-5 rounded-2xl bg-card border cursor-pointer transition ${
              bucketFilter === "0-30" ? "border-amber-500 ring-2 ring-amber-500/20" : "border-border hover:border-border"
            }`}
          >
            <div className="text-xs font-semibold uppercase text-amber-600 tracking-wider">0–30 Days (Mild)</div>
            <div className="text-2xl font-black text-amber-600 mt-2">$2,140,000</div>
            <div className="text-xs text-muted-foreground mt-1">18 accounts · Courtesy SMS active</div>
          </div>

          <div
            onClick={() => setBucketFilter("31-60")}
            className={`p-5 rounded-2xl bg-card border cursor-pointer transition ${
              bucketFilter === "31-60" ? "border-amber-500 ring-2 ring-amber-500/20" : "border-border hover:border-border"
            }`}
          >
            <div className="text-xs font-semibold uppercase text-orange-600 tracking-wider">31–60 Days (Moderate)</div>
            <div className="text-2xl font-black text-orange-600 mt-2">$1,980,000</div>
            <div className="text-xs text-muted-foreground mt-1">9 accounts · Formal demand letter</div>
          </div>

          <div
            onClick={() => setBucketFilter("60+")}
            className={`p-5 rounded-2xl bg-card border cursor-pointer transition ${
              bucketFilter === "60+" ? "border-rose-500 ring-2 ring-rose-500/20" : "border-border hover:border-border"
            }`}
          >
            <div className="text-xs font-semibold uppercase text-rose-600 tracking-wider">60+ Days (Severe)</div>
            <div className="text-2xl font-black text-rose-600 mt-2">$1,480,000</div>
            <div className="text-xs text-rose-600 font-semibold mt-1">5 accounts · Portal access hold</div>
          </div>
        </div>

        {/* Search Toolbar */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student, parent name, student ID or class..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-canvas border border-border focus:outline-none focus:ring-2 focus:ring-rose-500/30"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Showing:</span>
            <span className="text-xs font-bold text-foreground">{filtered.length} Debtor Records</span>
          </div>
        </div>

        {/* Debtor Table */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Student & Class</th>
                  <th className="py-3 px-4">Guardian Contact</th>
                  <th className="py-3 px-4 text-right">Outstanding</th>
                  <th className="py-3 px-4 text-center">Aging Days</th>
                  <th className="py-3 px-4 text-center">Escalation Stage</th>
                  <th className="py-3 px-4">Last Payment</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-foreground">{item.studentName}</div>
                      <div className="text-xs text-muted-foreground">{item.studentId} · {item.classArm}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-foreground font-medium">{item.guardianName}</div>
                      <div className="text-xs text-muted-foreground">{item.guardianPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-rose-600">
                      ${item.balance.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                          item.agingDays > 60
                            ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-800"
                            : item.agingDays > 30
                            ? "bg-orange-50 dark:bg-orange-950/50 text-orange-600 border border-orange-200 dark:border-orange-800"
                            : "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800"
                        }`}
                      >
                        {item.agingDays} days
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {item.status === "first-notice" && (
                        <span className="text-xs text-muted-foreground">Courtesy Reminder</span>
                      )}
                      {item.status === "second-notice" && (
                        <span className="text-xs font-medium text-orange-600">Formal Warning</span>
                      )}
                      {item.status === "final-demand" && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Final Demand
                        </span>
                      )}
                      {item.status === "payment-plan" && (
                        <span className="text-xs font-medium text-blue-600">Active Installment</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-muted-foreground">
                      {item.lastPaymentDate}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => alert(`Direct WhatsApp & SMS Demand sent to ${item.guardianName}`)}
                          title="Send Demand SMS"
                          className="p-1.5 rounded-lg border border-border hover:bg-muted text-rose-600 transition"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert(`Calling guardian ${item.guardianPhone}...`)}
                          title="Call Guardian"
                          className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition"
                        >
                          <PhoneCall className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert(`Official Demand Letter PDF generated for ${item.studentName}`)}
                          title="Download Demand Letter"
                          className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
