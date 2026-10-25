"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  CreditCard,
  CheckCircle2,
  ClockAlert,
  Download,
  ShieldCheck,
  Smartphone,
  Landmark,
  Receipt,
  ArrowRight,
  Sparkles,
  User,
} from "lucide-react";

interface ChildBill {
  childId: string;
  name: string;
  classArm: string;
  avatar: string;
  term: string;
  totalBilled: number;
  totalPaid: number;
  balanceDue: number;
  dueDate: string;
  items: { title: string; amount: number }[];
}

export default function ParentFeesPage() {
  const [selectedChildId, setSelectedChildId] = useState("child-2"); // Maryam Adeleke has balance
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  const childrenData: ChildBill[] = [
    {
      childId: "child-1",
      name: "Tobi Adeleke",
      classArm: "SSS 2A (Science)",
      avatar: "TA",
      term: "Term 2, 2025/2026",
      totalBilled: 185000,
      totalPaid: 185000,
      balanceDue: 0,
      dueDate: "Jan 30, 2026",
      items: [
        { title: "Senior Tuition & Instruction", amount: 120000 },
        { title: "Science & STEM Lab Consumables", amount: 35000 },
        { title: "PTA Institutional Development Levy", amount: 15000 },
        { title: "Digital Campus License", amount: 15000 },
      ],
    },
    {
      childId: "child-2",
      name: "Maryam Adeleke",
      classArm: "JSS 1C (Junior)",
      avatar: "MA",
      term: "Term 2, 2025/2026",
      totalBilled: 165000,
      totalPaid: 100000,
      balanceDue: 65000,
      dueDate: "Feb 15, 2026",
      items: [
        { title: "Junior Secondary Tuition & Books", amount: 105000 },
        { title: "Basic Technology & Arts Workshop", amount: 30000 },
        { title: "PTA Institutional Development Levy", amount: 15000 },
        { title: "Digital Campus License", amount: 15000 },
      ],
    },
  ];

  const currentChild = childrenData.find((c) => c.childId === selectedChildId) || childrenData[0];

  const handlePay = () => {
    setPayModalOpen(false);
    setPaySuccess(true);
    currentChild.totalPaid += currentChild.balanceDue;
    currentChild.balanceDue = 0;
  };

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <CreditCard className="w-4 h-4" />
              Family Portal · Tuition & School Fees
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Pay Term School Fees
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Secure fee settlement powered by Paystack. Instant digital receipt and ledger reconciliation.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert("Downloading Unified Family Term Invoices (PDF)")}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4 text-muted-foreground" />
              Download Statement
            </button>
          </div>
        </div>

        {/* Child Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {childrenData.map((child) => (
            <div
              key={child.childId}
              onClick={() => setSelectedChildId(child.childId)}
              className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                selectedChildId === child.childId
                  ? "bg-pink-500/10 border-pink-500/40 ring-2 ring-pink-500/20"
                  : "bg-card border-border hover:border-pink-500/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                  {child.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm sm:text-base">{child.name}</h3>
                  <p className="text-xs text-muted-foreground">{child.classArm}</p>
                </div>
              </div>

              <div className="text-right">
                {child.balanceDue === 0 ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                  </span>
                ) : (
                  <div>
                    <span className="text-[10px] font-bold text-rose-600 uppercase">Balance Due</span>
                    <div className="text-base font-black text-rose-600">${child.balanceDue.toLocaleString()}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Success Alert */}
        {paySuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              Payment Successful! $65,000 settled via Paystack. Official electronic receipt #PSTK_2026_098235 generated and sent to zainab.adeleke@gmail.com.
            </span>
            <button onClick={() => setPaySuccess(false)} className="text-emerald-600 hover:underline text-xs ml-4">
              Dismiss
            </button>
          </div>
        )}

        {/* Main Fee Card */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Current Billing Statement
              </span>
              <h3 className="text-xl font-bold text-foreground">{currentChild.name} · {currentChild.term}</h3>
              <p className="text-xs text-muted-foreground">Payment Deadline: {currentChild.dueDate}</p>
            </div>

            <div className="text-right">
              <div className="text-xs text-muted-foreground font-medium">Outstanding Balance</div>
              <div className="text-2xl sm:text-3xl font-black text-rose-600">
                ${currentChild.balanceDue.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Schedule Breakdown</h4>
            <div className="divide-y divide-border rounded-xl bg-canvas border border-border overflow-hidden">
              {currentChild.items.map((item) => (
                <div key={item.title} className="p-3.5 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-foreground font-medium">{item.title}</span>
                  <span className="font-semibold text-foreground">${item.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="p-3.5 bg-muted/30 flex items-center justify-between text-xs sm:text-sm font-bold">
                <span>Total Term Assessment</span>
                <span>${currentChild.totalBilled.toLocaleString()}</span>
              </div>
              <div className="p-3.5 bg-muted/30 flex items-center justify-between text-xs sm:text-sm font-semibold text-emerald-600">
                <span>Total Paid to Date</span>
                <span>- ${currentChild.totalPaid.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Checkout CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-pink-600" />
              <span>PCI-DSS Level 1 256-bit encrypted checkout via Paystack Gateway</span>
            </div>

            {currentChild.balanceDue > 0 ? (
              <button
                onClick={() => setPayModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm shadow-md shadow-pink-600/20 transition flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Pay ${currentChild.balanceDue.toLocaleString()} Now
              </button>
            ) : (
              <button
                onClick={() => alert(`Receipt downloaded for ${currentChild.name}`)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground transition flex items-center justify-center gap-2"
              >
                <Receipt className="w-4 h-4 text-emerald-600" />
                Download Official Paid Receipt
              </button>
            )}
          </div>
        </div>

        {/* Paystack Checkout Simulation Modal */}
        {payModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    P
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">Paystack Checkout</h3>
                    <p className="text-[11px] text-muted-foreground">Riverside College Bursary Account</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-foreground">${currentChild.balanceDue.toLocaleString()}</div>
                  <div className="text-[10px] text-muted-foreground">Term 2 Balance</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl border border-border bg-canvas flex items-center gap-3 cursor-pointer hover:border-pink-500">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Debit / Credit Card</div>
                    <div className="text-[11px] text-muted-foreground">Pay with Mastercard, Visa, or Verve</div>
                  </div>
                  <span className="text-[10px] font-bold text-pink-600">Selected</span>
                </div>

                <div className="p-3 rounded-xl border border-border bg-canvas flex items-center gap-3 cursor-pointer hover:border-pink-500">
                  <Landmark className="w-5 h-5 text-emerald-500" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Pay with Bank Transfer</div>
                    <div className="text-[11px] text-muted-foreground">Instant dedicated virtual account</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-border bg-canvas flex items-center gap-3 cursor-pointer hover:border-pink-500">
                  <Smartphone className="w-5 h-5 text-amber-500" />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">USSD Code</div>
                    <div className="text-[11px] text-muted-foreground">GTBank, Access, Zenith, UBA & more</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setPayModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePay}
                  className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-sm transition"
                >
                  Authorize ${currentChild.balanceDue.toLocaleString()}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
