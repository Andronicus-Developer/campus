"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  FileSpreadsheet,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  Download,
  Calendar,
  Layers,
  ArrowUpRight,
  FileCheck,
  CreditCard,
  ShieldAlert,
} from "lucide-react";

interface BudgetItem {
  id: string;
  department: string;
  headOfDept: string;
  allocatedUsd: number;
  spentUsd: number;
  committedPoUsd: number;
  category: "Academics" | "Operations & Facilities" | "Technology & ICT" | "Boarding & Welfare" | "Co-Curricular";
}

interface ExpenseVoucher {
  id: string;
  voucherNo: string;
  vendorName: string;
  department: string;
  category: string;
  poNumber: string;
  amount: number;
  date: string;
  status: "approved" | "pending_bursar" | "disbursed" | "rejected";
  paymentMethod: "Bank Transfer" | "Company Cheque" | "Petty Cash";
  invoiceDocRef: string;
  signatory: string;
}

export default function BursarBudgetPage() {
  const [activeTab, setActiveTab] = useState<"departments" | "expenses" | "cashflow">("departments");
  const [toast, setToast] = useState<string | null>(null);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDept, setFilterDept] = useState("all");

  const [budgets, setBudgets] = useState<BudgetItem[]>([
    {
      id: "BDG-01",
      department: "Science Laboratories & STEM",
      headOfDept: "Dr. K. Mensah (HOD Science)",
      allocatedUsd: 65000.0,
      spentUsd: 41200.0,
      committedPoUsd: 4800.0,
      category: "Academics",
    },
    {
      id: "BDG-02",
      department: "ICT, EdTech & Fiber Internet",
      headOfDept: "Engr. P. Bassey (Admin/ICT)",
      allocatedUsd: 85000.0,
      spentUsd: 61500.0,
      committedPoUsd: 7200.0,
      category: "Technology & ICT",
    },
    {
      id: "BDG-03",
      department: "Boarding House & Kitchen Provisions",
      headOfDept: "Mrs. H. Al-Mansoor (Matron)",
      allocatedUsd: 140000.0,
      spentUsd: 68400.0,
      committedPoUsd: 12000.0,
      category: "Boarding & Welfare",
    },
    {
      id: "BDG-04",
      department: "Campus Utilities & Generator Fuel",
      headOfDept: "Maintenance Director (Facilities)",
      allocatedUsd: 95000.0,
      spentUsd: 52100.0,
      committedPoUsd: 8500.0,
      category: "Operations & Facilities",
    },
    {
      id: "BDG-05",
      department: "Library, Textbooks & Publishing",
      headOfDept: "Mrs. F. Nwosu (Chief Librarian)",
      allocatedUsd: 45000.0,
      spentUsd: 18900.0,
      committedPoUsd: 3100.0,
      category: "Academics",
    },
    {
      id: "BDG-06",
      department: "Athletics, Pitch & Co-Curricular",
      headOfDept: "Coach B. Adeleke (Sports Director)",
      allocatedUsd: 50000.0,
      spentUsd: 21200.0,
      committedPoUsd: 1900.0,
      category: "Co-Curricular",
    },
  ]);

  const [vouchers, setVouchers] = useState<ExpenseVoucher[]>([
    {
      id: "VCH-001",
      voucherNo: "PV-2026-081",
      vendorName: "AfriLab Scientific Equipment Ltd.",
      department: "Science Laboratories & STEM",
      category: "Reagents & Lab Glassware",
      poNumber: "PO-2026-041",
      amount: 4800.0,
      date: "Today, 10:30 AM",
      status: "approved",
      paymentMethod: "Bank Transfer",
      invoiceDocRef: "INV-AFR-8812.pdf",
      signatory: "J. Mensah (Bursar Approved)",
    },
    {
      id: "VCH-002",
      voucherNo: "PV-2026-080",
      vendorName: "MainOne Broadband Solutions",
      department: "ICT, EdTech & Fiber Internet",
      category: "Fiber Internet Dedicated Link (Q1)",
      poNumber: "PO-2026-038",
      amount: 3200.0,
      date: "Yesterday",
      status: "disbursed",
      paymentMethod: "Bank Transfer",
      invoiceDocRef: "MO-INV-9901.pdf",
      signatory: "J. Mensah (Bursar Cleared)",
    },
    {
      id: "VCH-003",
      voucherNo: "PV-2026-079",
      vendorName: "Metro Diesel Logistics Supply",
      department: "Campus Utilities & Generator Fuel",
      category: "Heavy Duty Generator Fuel (10,000L)",
      poNumber: "PO-2026-035",
      amount: 8500.0,
      date: "Jan 22, 2026",
      status: "disbursed",
      paymentMethod: "Bank Transfer",
      invoiceDocRef: "MDL-TANK-440.pdf",
      signatory: "School Owner & Bursar Approved",
    },
    {
      id: "VCH-004",
      voucherNo: "PV-2026-078",
      vendorName: "Riverside Farm & Food Wholesale",
      department: "Boarding House & Kitchen Provisions",
      category: "Monthly Bulk Grain & Protein Supplies",
      poNumber: "PO-2026-044",
      amount: 6400.0,
      date: "Jan 24, 2026",
      status: "pending_bursar",
      paymentMethod: "Bank Transfer",
      invoiceDocRef: "RFF-SUPPLY-12.pdf",
      signatory: "Under Bursar Document Verification",
    },
  ]);

  // Form states for new voucher
  const [vendorName, setVendorName] = useState("");
  const [department, setDepartment] = useState("Science Laboratories & STEM");
  const [category, setCategory] = useState("STEM Equipment & Consumables");
  const [amount, setAmount] = useState("");
  const [poNumber, setPoNumber] = useState("PO-2026-045");
  const [paymentMethod, setPaymentMethod] = useState<ExpenseVoucher["paymentMethod"]>("Bank Transfer");
  const [invoiceDocRef, setInvoiceDocRef] = useState("SUPPLIER-INVOICE.pdf");

  const totalAllocated = budgets.reduce((acc, b) => acc + b.allocatedUsd, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spentUsd, 0);
  const totalCommitted = budgets.reduce((acc, b) => acc + b.committedPoUsd, 0);
  const totalAvailable = totalAllocated - totalSpent - totalCommitted;

  const handleCreateVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const amtNum = parseFloat(amount) || 0;
    if (amtNum <= 0) return;

    const newVoucher: ExpenseVoucher = {
      id: `VCH-${String(vouchers.length + 1).padStart(3, "0")}`,
      voucherNo: `PV-2026-${String(vouchers.length + 82).padStart(3, "0")}`,
      vendorName,
      department,
      category,
      poNumber,
      amount: amtNum,
      date: "Today",
      status: amtNum > 5000 ? "pending_bursar" : "approved",
      paymentMethod,
      invoiceDocRef,
      signatory: amtNum > 5000 ? "Requires School Owner Sign-Off" : "J. Mensah (Bursar Cleared)",
    };

    setVouchers([newVoucher, ...vouchers]);

    // update budget spent
    setBudgets((prev) =>
      prev.map((b) =>
        b.department === department
          ? {
              ...b,
              spentUsd: b.spentUsd + amtNum,
            }
          : b
      )
    );

    setIsVoucherModalOpen(false);
    setToast(
      amtNum > 5000
        ? `Voucher ${newVoucher.voucherNo} logged (US$ ${amtNum.toFixed(2)}). Routed for School Owner dual approval.`
        : `Voucher ${newVoucher.voucherNo} approved and logged to ${department}.`
    );
  };

  const handleDisburseVoucher = (id: string) => {
    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "disbursed" } : v))
    );
    setToast("Disbursement recorded. Payment batch exported to bank treasury account.");
  };

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <DollarSign className="w-4 h-4" />
              Treasury Control · Section J
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Budgeting & Expenditure Management
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Departmental allocations, purchase order tracking, supplier invoice auditing, and cash-flow projections.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsVoucherModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              Record Expenditure Voucher
            </button>
            <button
              onClick={() => {
                alert("Generating Executive Income & Expenditure Summary for School Owner & Principal...");
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4 text-muted-foreground" />
              Executive Financial Report
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

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Total Approved Budget</span>
              <Layers className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-foreground">
              US$ {totalAllocated.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground mt-1">2025/2026 Academic Year Allocation</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Total YTD Expenditure</span>
              <TrendingDown className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-black text-rose-600">
              US$ {totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {((totalSpent / totalAllocated) * 100).toFixed(1)}% of total school budget consumed
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Committed Purchase Orders</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">
              US$ {totalCommitted.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Pending vendor invoice delivery & payment</div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              <span>Unencumbered Reserve</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600">
              US$ {totalAvailable.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Healthy liquidity buffer across all cost centers</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("departments")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "departments"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Departmental Budgets & Limits
          </button>
          <button
            onClick={() => setActiveTab("expenses")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "expenses"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Expense Vouchers & Invoices ({vouchers.length})
          </button>
          <button
            onClick={() => setActiveTab("cashflow")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeTab === "cashflow"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            Cash-Flow Projections & Runway
          </button>
        </div>

        {/* TAB 1: Departmental Budgets */}
        {activeTab === "departments" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets.map((b) => {
              const pct = Math.round((b.spentUsd / b.allocatedUsd) * 100);
              const remaining = b.allocatedUsd - b.spentUsd - b.committedPoUsd;
              return (
                <div key={b.id} className="p-5 rounded-2xl bg-card border border-border shadow-xs space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                      {b.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-muted-foreground">{b.id}</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-foreground leading-snug">{b.department}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{b.headOfDept}</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Budget Burn</span>
                      <span className="font-bold text-foreground">{pct}% Used</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-canvas border border-border overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          pct > 80 ? "bg-rose-500" : pct > 60 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-canvas border border-border text-xs">
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Allocated</span>
                      <span className="font-bold text-foreground">
                        US$ {b.allocatedUsd.toLocaleString("en-US", { minimumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">YTD Disbursed</span>
                      <span className="font-bold text-rose-600">
                        US$ {b.spentUsd.toLocaleString("en-US", { minimumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Pending POs</span>
                      <span className="font-semibold text-amber-600">
                        US$ {b.committedPoUsd.toLocaleString("en-US", { minimumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Available</span>
                      <span className="font-bold text-emerald-600">
                        US$ {remaining.toLocaleString("en-US", { minimumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert(`Exporting line-item ledger statement for ${b.department}...`);
                    }}
                    className="w-full py-2 rounded-xl bg-canvas border border-border hover:bg-muted text-foreground text-xs font-medium transition"
                  >
                    View Line-Item Ledger
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: Expense Vouchers */}
        {activeTab === "expenses" && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Voucher No. / Vendor</th>
                      <th className="py-3 px-4">Department & Category</th>
                      <th className="py-3 px-4">PO Ref / Invoice</th>
                      <th className="py-3 px-4 text-right">Amount (US$)</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Bursary Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {vouchers.map((v) => (
                      <tr key={v.id} className="hover:bg-canvas/50 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-foreground">{v.vendorName}</div>
                          <div className="text-xs font-mono text-amber-600">{v.voucherNo}</div>
                          <div className="text-[11px] text-muted-foreground">{v.date}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-foreground font-medium">{v.department}</div>
                          <div className="text-xs text-muted-foreground">{v.category}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-muted-foreground">
                          <div>{v.poNumber}</div>
                          <div className="text-[11px] text-blue-600 underline cursor-pointer">
                            {v.invoiceDocRef}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-foreground text-sm">
                          US$ {v.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {v.status === "approved" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200 dark:border-blue-800">
                              <CheckCircle2 className="w-3 h-3" /> Approved
                            </span>
                          )}
                          {v.status === "disbursed" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                              <FileCheck className="w-3 h-3" /> Paid / Disbursed
                            </span>
                          )}
                          {v.status === "pending_bursar" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800">
                              <Clock className="w-3 h-3" /> Pending Dual Sign-off
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {v.status === "approved" ? (
                            <button
                              onClick={() => handleDisburseVoucher(v.id)}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition"
                            >
                              Release Payment
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                alert(`Audit voucher slip #${v.voucherNo}\nSignatory: ${v.signatory}\nMethod: ${v.paymentMethod}`);
                              }}
                              className="px-2.5 py-1.5 rounded-lg border border-border hover:bg-muted text-xs font-medium text-foreground transition"
                            >
                              Audit Slip
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Cash Flow Projections */}
        {activeTab === "cashflow" && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-foreground">Termly Cash-Flow & Runway Forecast</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Projections benchmarked against actual confirmed fee receipts vs committed vendor operational outlays.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800">
                  Surplus Projected: +US$ 488,450.00
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-canvas border border-border">
                  <span className="text-xs text-muted-foreground block">Term 1 Confirmed Inflows</span>
                  <span className="text-xl font-black text-emerald-600">US$ 1,048,450.00</span>
                  <span className="text-[11px] text-muted-foreground mt-1 block">85.9% collection realization</span>
                </div>
                <div className="p-4 rounded-xl bg-canvas border border-border">
                  <span className="text-xs text-muted-foreground block">Committed Term Outflows</span>
                  <span className="text-xl font-black text-rose-600">US$ 560,000.00</span>
                  <span className="text-[11px] text-muted-foreground mt-1 block">Salaries, utilities & operations</span>
                </div>
                <div className="p-4 rounded-xl bg-canvas border border-border">
                  <span className="text-xs text-muted-foreground block">Net Operating Reserve</span>
                  <span className="text-xl font-black text-foreground">US$ 488,450.00</span>
                  <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                    8.4 Months Operational Runway
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-300">
                <strong>Fiscal Prudence Advisory:</strong> Collections from SSS 3 graduation fees and new JSS 1 enrollments provide strong working capital through Q2 2026. Capital expenditure on the new STEM block can proceed without bridge bank financing.
              </div>
            </div>
          </div>
        )}

        {/* Modal: New Voucher */}
        {isVoucherModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-foreground text-base">Record Expenditure Voucher</h3>
                </div>
                <button
                  onClick={() => setIsVoucherModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateVoucher} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Supplier / Vendor Name</label>
                  <input
                    type="text"
                    placeholder="e.g., CleanEnergy Generator Fuel Ltd."
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Cost Center / Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    >
                      {budgets.map((b) => (
                        <option key={b.id} value={b.department}>
                          {b.department}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Expense Line Item</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Voucher Amount (US$)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground font-bold"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Purchase Order Ref</label>
                    <input
                      type="text"
                      value={poNumber}
                      onChange={(e) => setPoNumber(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                    >
                      <option value="Bank Transfer">Bank Wire / ACH</option>
                      <option value="Company Cheque">School Corporate Cheque</option>
                      <option value="Petty Cash">Authorized Petty Cash Counter</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-foreground block mb-1">Supplier Invoice Document Ref</label>
                    <input
                      type="text"
                      value={invoiceDocRef}
                      onChange={(e) => setInvoiceDocRef(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-canvas border border-border text-foreground"
                      required
                    />
                  </div>
                </div>

                {parseFloat(amount) > 5000 && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300">
                    <strong>Dual Control Requirement:</strong> Expenditures exceeding US$ 5,000.00 will be held in pending status until signed off by the School Owner.
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsVoucherModalOpen(false)}
                    className="px-3 py-2 rounded-xl border border-border hover:bg-muted text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold"
                  >
                    Commit Voucher
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
