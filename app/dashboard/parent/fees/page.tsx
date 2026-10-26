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
  Users,
  Upload,
  HelpCircle,
  Clock,
  Printer,
  Calendar,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { CHILDREN_PROFILES, FAMILY_DATA, ChildProfile } from "@/lib/family-data";

export default function ParentFeesPage() {
  const [selectedChildId, setSelectedChildId] = useState<string>("child-2"); // Maryam has balance due
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Modals for governance & requests
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [isInstallmentModalOpen, setIsInstallmentModalOpen] = useState(false);
  const [isConcessionModalOpen, setIsConcessionModalOpen] = useState(false);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Forms
  const [selectedMethod, setSelectedMethod] = useState<"card" | "transfer" | "momo">("card");
  const [customPayAmount, setCustomPayAmount] = useState("650.00");
  const [proofBankRef, setProofBankRef] = useState("CHASE-WIRE-88912");
  const [installmentTranches, setInstallmentTranches] = useState("2 Tranches ($325 x 2)");
  const [disputeMessage, setDisputeMessage] = useState("");

  const [children, setChildren] = useState(CHILDREN_PROFILES);

  const activeChild = children.find((c) => c.id === selectedChildId) || children[0];

  const totalFamilyBalance = children.reduce((sum, c) => sum + c.balanceDue, 0);

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPayModalOpen(false);
      setPaySuccess(true);
      const paidAmt = parseFloat(customPayAmount) || 0;

      setChildren((prev) =>
        prev.map((c) =>
          c.id === activeChild.id
            ? {
                ...c,
                amountPaid: c.amountPaid + paidAmt,
                balanceDue: Math.max(0, c.balanceDue - paidAmt),
                feeStatus: c.balanceDue - paidAmt <= 0 ? "cleared" : "partial",
              }
            : c
        )
      );

      setToast(
        `Payment of US$ ${paidAmt.toFixed(2)} confirmed via Paystack. Official Receipt #REC-2026-0042 generated.`
      );
    }, 1400);
  };

  const handleUploadProof = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProofModalOpen(false);
    setToast(
      `Bank wire transfer proof (${proofBankRef}) submitted to Bursary Division. Once reconciled against Chase Bank statement, ledger will be cleared.`
    );
  };

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <CreditCard className="w-4 h-4" />
              Family Invoicing &amp; Bursary Payments · Section F
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Fees, Invoices &amp; Online Settlement
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Secure fee payment gateway powered by Paystack. View fee structures, download receipts, and manage installments.
            </p>
          </div>

          {/* Child Switcher */}
          <div className="flex items-center gap-2 bg-card border border-border rounded-2xl p-1.5 shadow-xs">
            {children.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedChildId(c.id);
                  setCustomPayAmount(c.balanceDue > 0 ? c.balanceDue.toFixed(2) : "0.00");
                  setPaySuccess(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  selectedChildId === c.id
                    ? "bg-pink-600 text-white shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{c.preferredName}</span>
                {c.balanceDue > 0 && (
                  <span className="px-1.5 py-0.2 rounded-md bg-white text-pink-700 text-[10px] font-extrabold">
                    ${c.balanceDue}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              {toast}
            </span>
            <button onClick={() => setToast(null)} className="text-emerald-600 hover:underline text-xs ml-4">
              Dismiss
            </button>
          </div>
        )}

        {/* Governance & Anti-Tampering Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-foreground">Strict Financial Ledger Safeguard:</span>{" "}
            <span className="text-muted-foreground">
              Official invoices and payment receipts are generated automatically through verified bank or gateway transactions. Parents cannot edit balances or mark accounts as paid without audited banking evidence.
            </span>
          </div>
        </div>

        {/* Consolidated Family Standing Card */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
                Consolidated Family Billing · File #{FAMILY_DATA.familyCode}
              </span>
              <h2 className="text-xl font-extrabold text-foreground mt-0.5">
                {FAMILY_DATA.familyName} Account
              </h2>
              <p className="text-xs text-muted-foreground">
                Total 2 Enrolled Students: Tobi Adeleke (Grade 11) &amp; Maryam Adeleke (Grade 8)
              </p>
            </div>

            <div className="flex items-center gap-2">
              {totalFamilyBalance > 0 ? (
                <button
                  onClick={() => {
                    setCustomPayAmount(totalFamilyBalance.toFixed(2));
                    setPayModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Pay Full Family Balance (US$ {totalFamilyBalance.toFixed(2)})
                </button>
              ) : (
                <span className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  All Family Fees Cleared
                </span>
              )}

              <button
                onClick={() => setIsProofModalOpen(true)}
                className="px-3.5 py-2.5 rounded-xl bg-canvas border border-border hover:bg-muted text-foreground font-semibold text-xs transition flex items-center gap-1.5"
              >
                <Upload className="w-4 h-4 text-muted-foreground" />
                Upload Wire Slip
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-canvas border border-border">
              <span className="text-xs text-muted-foreground block">Combined Term Billings</span>
              <span className="text-2xl font-black text-foreground">US$ 2,700.00</span>
              <span className="text-[11px] text-muted-foreground mt-1 block">Tobi ($1,450) + Maryam ($1,250)</span>
            </div>
            <div className="p-4 rounded-xl bg-canvas border border-border">
              <span className="text-xs text-muted-foreground block">Total Received &amp; Reconciled</span>
              <span className="text-2xl font-black text-emerald-600">US$ 2,050.00</span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Confirmed via Paystack</span>
            </div>
            <div className="p-4 rounded-xl bg-canvas border border-border">
              <span className="text-xs text-muted-foreground block">Net Outstanding Family Due</span>
              <span
                className={`text-2xl font-black ${
                  totalFamilyBalance > 0 ? "text-amber-600" : "text-emerald-600"
                }`}
              >
                US$ {totalFamilyBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[11px] text-amber-600 font-semibold mt-1 block">
                Next Deadline: Feb 15, 2026
              </span>
            </div>
          </div>
        </div>

        {/* Selected Child Bill & Breakdown */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 block">
                Itemized Invoice Breakdown
              </span>
              <h3 className="text-base font-extrabold text-foreground">
                {activeChild.name} — {activeChild.classGroup}
              </h3>
              <p className="text-xs text-muted-foreground">
                Invoice #{activeChild.invoiceNo} · 2025/2026 Term 1
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                activeChild.feeStatus === "cleared"
                  ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                  : "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800"
              }`}
            >
              {activeChild.feeStatus === "cleared" ? "Cleared / 100% Paid" : "Installment Balance Due"}
            </span>
          </div>

          {/* Itemized List */}
          <div className="divide-y divide-border text-xs">
            <div className="py-2.5 flex justify-between">
              <span className="text-foreground">
                {selectedChildId === "child-1" ? "Senior Secondary Tuition & Instruction" : "Junior Secondary Tuition & Books"}
              </span>
              <span className="font-mono font-bold text-foreground">
                {selectedChildId === "child-1" ? "US$ 1,150.00" : "US$ 980.00"}
              </span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-foreground">
                {selectedChildId === "child-1" ? "Science & STEM Laboratory Consumables" : "Basic Science & Technology Workshop"}
              </span>
              <span className="font-mono font-bold text-foreground">
                {selectedChildId === "child-1" ? "US$ 150.00" : "US$ 120.00"}
              </span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-foreground">PTA Institutional Development Levy</span>
              <span className="font-mono font-bold text-foreground">US$ 75.00</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-foreground">Digital Campus &amp; LMS Cloud License</span>
              <span className="font-mono font-bold text-foreground">US$ 75.00</span>
            </div>

            <div className="pt-3 flex justify-between font-bold text-sm">
              <span className="text-foreground">Total Terminal Billed Tariff</span>
              <span className="font-mono text-foreground text-base">
                US$ {activeChild.termTuition.toFixed(2)}
              </span>
            </div>

            <div className="py-2 flex justify-between text-emerald-600 font-semibold">
              <span>Confirmed Payments Credited</span>
              <span className="font-mono">-US$ {activeChild.amountPaid.toFixed(2)}</span>
            </div>

            <div className="py-3 flex justify-between font-black text-base border-t-2 border-border">
              <span className="text-foreground">Remaining Balance Payable</span>
              <span
                className={`font-mono ${
                  activeChild.balanceDue > 0 ? "text-amber-600" : "text-emerald-600"
                }`}
              >
                US$ {activeChild.balanceDue.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secured with 256-bit Paystack PCI-DSS Gateway</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsReceiptModalOpen(true)}
                className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground flex items-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                Receipt #{activeChild.receiptNo}
              </button>

              <button
                onClick={() => setIsInstallmentModalOpen(true)}
                className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground transition"
              >
                Installment Arrangement
              </button>

              <button
                onClick={() => setIsConcessionModalOpen(true)}
                className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-foreground transition"
              >
                Apply Sibling Concession
              </button>

              <button
                onClick={() => setIsDisputeModalOpen(true)}
                className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-rose-600 transition"
              >
                Billing Query
              </button>

              {activeChild.balanceDue > 0 && (
                <button
                  onClick={() => {
                    setCustomPayAmount(activeChild.balanceDue.toFixed(2));
                    setPayModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  Pay US$ {activeChild.balanceDue.toFixed(2)} Online
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal: Online Payment via Paystack */}
        {payModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-pink-600" />
                  <h3 className="font-bold text-foreground text-base">Paystack Checkout Gateway</h3>
                </div>
                <button
                  onClick={() => setPayModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-canvas border border-border flex justify-between items-center">
                  <span className="text-muted-foreground">Paying For:</span>
                  <span className="font-bold text-foreground">{activeChild.name} ({activeChild.classGroup})</span>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Payment Amount (US$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={customPayAmount}
                    onChange={(e) => setCustomPayAmount(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground font-black text-base"
                    required
                  />
                  <span className="text-[11px] text-muted-foreground mt-0.5 block">
                    Full or partial payment permitted under school policy.
                  </span>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Select Payment Channel</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMethod("card")}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        selectedMethod === "card"
                          ? "border-pink-600 bg-pink-500/10 text-pink-600 font-bold"
                          : "border-border bg-canvas text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Debit / Visa Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMethod("transfer")}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        selectedMethod === "transfer"
                          ? "border-pink-600 bg-pink-500/10 text-pink-600 font-bold"
                          : "border-border bg-canvas text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Instant ACH Transfer
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMethod("momo")}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        selectedMethod === "momo"
                          ? "border-pink-600 bg-pink-500/10 text-pink-600 font-bold"
                          : "border-border bg-canvas text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Mobile Money
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-[11px] text-pink-800 dark:text-pink-300">
                  Transaction is verified server-side with Chase Bank / Paystack webhook callbacks before generating official receipt.
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setPayModalOpen(false)}
                  className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePay}
                  disabled={isPaying}
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold transition disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isPaying ? "Processing..." : `Pay US$ ${customPayAmount}`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Official Receipt Preview */}
        {isReceiptModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <span className="text-xs font-mono text-pink-600 font-bold">{activeChild.receiptNo}</span>
                  <h3 className="font-bold text-foreground text-base">Official Electronic Receipt</h3>
                </div>
                <button
                  onClick={() => setIsReceiptModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-border space-y-2 text-xs">
                <div className="text-center pb-2 border-b border-border">
                  <h4 className="font-extrabold uppercase text-foreground">Riverside International College</h4>
                  <p className="text-muted-foreground text-[11px]">Bursary Division · Official Payment Voucher</p>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Payer:</span>
                  <span className="font-semibold text-foreground">{FAMILY_DATA.primaryGuardian.name}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Student:</span>
                  <span className="font-semibold text-foreground">{activeChild.name} ({activeChild.admissionNo})</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Amount Confirmed:</span>
                  <span className="font-black text-emerald-600 text-sm">US$ {activeChild.amountPaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Payment Channel:</span>
                  <span className="text-foreground">Paystack Automated Card Settlement</span>
                </div>
                <div className="flex justify-between py-1 border-t border-border pt-1">
                  <span className="text-muted-foreground">Bursar Seal:</span>
                  <span className="font-mono text-pink-600 font-bold">CERTIFIED-BURSARY-2026</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => {
                    alert(`Printing official receipt #${activeChild.receiptNo}...`);
                  }}
                  className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground text-xs font-medium flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print PDF
                </button>
                <button
                  onClick={() => setIsReceiptModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-700 text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Manual Bank Wire Proof Upload */}
        {isProofModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-pink-600" />
                  <h3 className="font-bold text-foreground text-base">Submit Direct Bank Wire Proof</h3>
                </div>
                <button
                  onClick={() => setIsProofModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUploadProof} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Bank Wire Reference / Narration</label>
                  <input
                    type="text"
                    value={proofBankRef}
                    onChange={(e) => setProofBankRef(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground font-mono"
                    required
                  />
                  <span className="text-[11px] text-muted-foreground mt-0.5 block">
                    Enter the exact bank transaction reference or teller deposit ID.
                  </span>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">School Account Credited</label>
                  <div className="p-3 rounded-xl bg-canvas border border-border space-y-1">
                    <div className="font-semibold text-foreground">Chase Bank Operating Account</div>
                    <div className="text-muted-foreground">Account #: 1029384729 · Riverside International College</div>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Attach Deposit Slip / Wire Receipt</label>
                  <input
                    type="file"
                    className="w-full text-xs text-muted-foreground file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border file:border-border file:bg-canvas file:text-foreground hover:file:bg-muted"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsProofModalOpen(false)}
                    className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold"
                  >
                    Submit Proof for Reconcile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Installment Arrangement */}
        {isInstallmentModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-pink-600" />
                  <h3 className="font-bold text-foreground text-base">Request Installment Schedule</h3>
                </div>
                <button
                  onClick={() => setIsInstallmentModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs text-muted-foreground space-y-2">
                <p>
                  You are requesting an installment division for <strong>{activeChild.name}</strong>'s remaining balance of <strong>US$ {activeChild.balanceDue.toFixed(2)}</strong>.
                </p>
                <div>
                  <label className="font-semibold text-foreground block mb-1">Proposed Tranches</label>
                  <select
                    value={installmentTranches}
                    onChange={(e) => setInstallmentTranches(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  >
                    <option value="2 Tranches ($325 x 2)">2 Tranches: 50% Feb 15 &amp; 50% Mar 15</option>
                    <option value="3 Tranches">3 Tranches: Equal monthly distributions</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => setIsInstallmentModalOpen(false)}
                  className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsInstallmentModalOpen(false);
                    setToast("Installment arrangement request submitted to Bursar for sign-off.");
                  }}
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs"
                >
                  Submit Schedule Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Sibling Concession Application */}
        {isConcessionModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-600" />
                  <h3 className="font-bold text-foreground text-base">Apply Sibling Concession (10% Rebate)</h3>
                </div>
                <button
                  onClick={() => setIsConcessionModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs text-muted-foreground space-y-2">
                <p>
                  As an enrolled family with multiple children (Tobi &amp; Maryam), you qualify for the school's authorized <strong>10% sibling tuition rebate</strong> on the second child's invoice.
                </p>
                <div className="p-3 rounded-xl bg-canvas border border-border">
                  Estimated deduction: <strong>-US$ 125.00</strong> applied as credit note to Maryam Adeleke's ledger.
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => setIsConcessionModalOpen(false)}
                  className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsConcessionModalOpen(false);
                    setToast("Sibling discount application recorded. Dispatched to Bursar for statutory credit note issuance.");
                  }}
                  className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs"
                >
                  Confirm Sibling Application
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Billing Dispute */}
        {isDisputeModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <h3 className="font-bold text-foreground text-base">Raise Billing Query to Bursar</h3>
                </div>
                <button
                  onClick={() => setIsDisputeModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <textarea
                  rows={3}
                  placeholder="Explain invoice discrepancy or fee dispute (e.g. Science lab fee billed for day student)..."
                  value={disputeMessage}
                  onChange={(e) => setDisputeMessage(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  onClick={() => setIsDisputeModalOpen(false)}
                  className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsDisputeModalOpen(false);
                    setToast("Billing inquiry logged (#DISP-481). Bursar J. Mensah will review your ledger statement.");
                    setDisputeMessage("");
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
                >
                  Submit Inquiry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
