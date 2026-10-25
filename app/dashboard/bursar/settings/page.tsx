"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AccountSettingsView } from "@/components/dashboard/account-settings-view";
import {
  Sliders,
  User,
  CreditCard,
  Building2,
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Save,
  BellRing,
  Smartphone,
  Landmark,
  Webhook,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

export default function BursarSettingsPage() {
  const [activeTab, setActiveTab] = useState<"finance_config" | "account_profile">("finance_config");
  const [toast, setToast] = useState<string | null>(null);

  // Financial Config States
  const [currencySymbol, setCurrencySymbol] = useState("US$");
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [receiptPrefix, setReceiptPrefix] = useState("REC-2026-");
  const [invoicePrefix, setInvoicePrefix] = useState("INV-2026-");
  const [installmentAllowed, setInstallmentAllowed] = useState(true);
  const [defaultInstallmentSplits, setDefaultInstallmentSplits] = useState("50% - 30% - 20%");
  const [dueGraceDays, setDueGraceDays] = useState("14");

  // Payment Channels Allowed
  const [acceptCash, setAcceptCash] = useState(true);
  const [acceptBankTransfer, setAcceptBankTransfer] = useState(true);
  const [acceptPaystack, setAcceptPaystack] = useState(true);
  const [acceptFlutterwave, setAcceptFlutterwave] = useState(true);
  const [acceptMobileMoney, setAcceptMobileMoney] = useState(true);

  // Cashier Collection Desks
  const [cashierPoints, setCashierPoints] = useState([
    { id: "CP-01", name: "Main Hall Bursary Counter #1", cashier: "Grace Temitope", active: true },
    { id: "CP-02", name: "Boarding House Admin Counter #2", cashier: "David O. Okafor", active: true },
    { id: "CP-03", name: "Uniform & Textbook Express Depot", cashier: "Amina Al-Hassan", active: true },
  ]);

  // Notifications
  const [sendInvoiceEmail, setSendInvoiceEmail] = useState(true);
  const [sendInvoiceWhatsApp, setSendInvoiceWhatsApp] = useState(true);
  const [sendReminderDaysBefore, setSendReminderDaysBefore] = useState("3");
  const [sendOverdueEscalation, setSendOverdueEscalation] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setToast("Financial system settings and integration configurations successfully committed.");
  };

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <Sliders className="w-4 h-4" />
              Bursary Administration · Section L
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Bursary Settings & Integrations
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Configure accepted payment methods, receipt numbering rules, cashier desks, and gateway connections.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-1 text-xs">
            <button
              onClick={() => setActiveTab("finance_config")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-semibold transition ${
                activeTab === "finance_config"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              Financial Policies & Integrations
            </button>
            <button
              onClick={() => setActiveTab("account_profile")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-semibold transition ${
                activeTab === "account_profile"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Bursar Profile & Security
            </button>
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

        {/* TAB 1: Financial Configuration */}
        {activeTab === "finance_config" && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            {/* Payment Methods Accepted */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Accepted Payment Channels & Gateway Webhooks</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select which collection channels are active for parents and cashiers. Online gateway callbacks are verified server-side.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                <label className="flex items-start gap-3 p-4 rounded-xl bg-canvas border border-border cursor-pointer hover:border-amber-500/40 transition">
                  <input
                    type="checkbox"
                    checked={acceptCash}
                    onChange={(e) => setAcceptCash(e.target.checked)}
                    className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="font-semibold text-xs text-foreground block">Physical Cash Counter</span>
                    <span className="text-[11px] text-muted-foreground">Admin Bursary Cashier Desk with daily drawer balancing</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-xl bg-canvas border border-border cursor-pointer hover:border-amber-500/40 transition">
                  <input
                    type="checkbox"
                    checked={acceptBankTransfer}
                    onChange={(e) => setAcceptBankTransfer(e.target.checked)}
                    className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="font-semibold text-xs text-foreground block">Bank Direct Wire / ACH</span>
                    <span className="text-[11px] text-muted-foreground">Chase Bank Operating Account statement import</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-xl bg-canvas border border-border cursor-pointer hover:border-amber-500/40 transition">
                  <input
                    type="checkbox"
                    checked={acceptPaystack}
                    onChange={(e) => setAcceptPaystack(e.target.checked)}
                    className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="font-semibold text-xs text-foreground block">Paystack Web & Card Gateway</span>
                    <span className="text-[11px] text-emerald-600 font-medium">Webhook Verified · T+1 Auto Payout</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-xl bg-canvas border border-border cursor-pointer hover:border-amber-500/40 transition">
                  <input
                    type="checkbox"
                    checked={acceptFlutterwave}
                    onChange={(e) => setAcceptFlutterwave(e.target.checked)}
                    className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="font-semibold text-xs text-foreground block">Flutterwave / International Cards</span>
                    <span className="text-[11px] text-emerald-600 font-medium">Webhook Verified · Visa / Mastercard</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-xl bg-canvas border border-border cursor-pointer hover:border-amber-500/40 transition">
                  <input
                    type="checkbox"
                    checked={acceptMobileMoney}
                    onChange={(e) => setAcceptMobileMoney(e.target.checked)}
                    className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="font-semibold text-xs text-foreground block">Mobile Money / Wallets</span>
                    <span className="text-[11px] text-muted-foreground">M-Pesa, MTN MoMo merchant aggregation</span>
                  </div>
                </label>
              </div>

              {/* Secure Secrets Callout */}
              <div className="p-3.5 rounded-xl bg-canvas border border-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    API Secret Keys (Paystack / Flutterwave) are encrypted in server environment vaults (HSM). They are never exposed client-side.
                  </span>
                </div>
                <span className="font-mono text-emerald-600 font-bold text-[11px]">STATUS: ENCRYPTED & ACTIVE</span>
              </div>
            </div>

            {/* Invoicing, Receipts & Installment Schedules */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Document Numbering & Installment Policies</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Establish unique sequential numbering prefixes and standard tuition installment parameters.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Currency Code & Display</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={currencySymbol}
                      onChange={(e) => setCurrencySymbol(e.target.value)}
                      className="p-2.5 rounded-xl bg-canvas border border-border text-foreground font-bold"
                    />
                    <input
                      type="text"
                      value={currencyCode}
                      onChange={(e) => setCurrencyCode(e.target.value)}
                      className="p-2.5 rounded-xl bg-canvas border border-border text-foreground font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Receipt Numbering Prefix</label>
                  <input
                    type="text"
                    value={receiptPrefix}
                    onChange={(e) => setReceiptPrefix(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground font-mono"
                  />
                  <span className="text-[11px] text-muted-foreground mt-0.5 block">Next: {receiptPrefix}0042</span>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Invoice Numbering Prefix</label>
                  <input
                    type="text"
                    value={invoicePrefix}
                    onChange={(e) => setInvoicePrefix(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground font-mono"
                  />
                  <span className="text-[11px] text-muted-foreground mt-0.5 block">Next: {invoicePrefix}0481</span>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Standard Installment Split</label>
                  <input
                    type="text"
                    value={defaultInstallmentSplits}
                    onChange={(e) => setDefaultInstallmentSplits(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  />
                  <span className="text-[11px] text-muted-foreground mt-0.5 block">3 tranches: On Enrollment, Mid-Term, End-Term</span>
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Grace Period Days Before Overdue</label>
                  <input
                    type="number"
                    value={dueGraceDays}
                    onChange={(e) => setDueGraceDays(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                  />
                  <span className="text-[11px] text-muted-foreground mt-0.5 block">Standard 14 days after term resumption</span>
                </div>
              </div>
            </div>

            {/* Cashier Assignments */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-foreground">Cashier Collection Desks & Responsibilities</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Authorized collection points for physical cash, bank teller slips, and POS counter transactions.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Creating new cashier desk profile...")}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white transition"
                >
                  Add Collection Point
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {cashierPoints.map((cp) => (
                  <div key={cp.id} className="p-4 rounded-xl bg-canvas border border-border space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-amber-600 font-bold">{cp.id}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                        Active
                      </span>
                    </div>
                    <div className="font-semibold text-foreground">{cp.name}</div>
                    <div className="text-muted-foreground text-[11px]">Assigned Cashier: {cp.cashier}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications & Reminders */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Automated Invoicing & Reminder Dispatch</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Privacy-conscious notification schedules sent to registered parent guardian channels.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-canvas border border-border cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendInvoiceEmail}
                    onChange={(e) => setSendInvoiceEmail(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Dispatch PDF invoice & official receipts via Email</span>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-canvas border border-border cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendInvoiceWhatsApp}
                    onChange={(e) => setSendInvoiceWhatsApp(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Send instant WhatsApp payment confirmation & receipt link</span>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl bg-canvas border border-border cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendOverdueEscalation}
                    onChange={(e) => setSendOverdueEscalation(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Automated respectful reminder 3 days prior to installment deadline</span>
                </label>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-sm transition"
              >
                <Save className="w-4 h-4" />
                Save Financial Policies
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: Bursar Account Profile */}
        {activeTab === "account_profile" && (
          <div className="pt-2">
            <AccountSettingsView currentRole="bursar" />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
