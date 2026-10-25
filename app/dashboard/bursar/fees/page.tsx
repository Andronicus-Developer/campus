"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Copy,
  Download,
  ShieldCheck,
  Percent,
  Sliders,
  DollarSign,
  AlertCircle,
} from "lucide-react";

interface FeeItem {
  id: string;
  name: string;
  category: "mandatory" | "optional" | "levy";
  applicableTo: "SSS" | "JSS" | "Primary" | "All";
  amount: number;
  frequency: "Per Term" | "Annual" | "One-Time";
  description: string;
}

export default function BursarFeeStructuresPage() {
  const [activeTab, setActiveTab] = useState<"SSS" | "JSS" | "All">("SSS");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeItem | null>(null);

  const [feeItems, setFeeItems] = useState<FeeItem[]>([
    {
      id: "fee-1",
      name: "Senior Tuition & Instructional Materials",
      category: "mandatory",
      applicableTo: "SSS",
      amount: 120000,
      frequency: "Per Term",
      description: "Core classroom instruction, library access, and examination preparation materials.",
    },
    {
      id: "fee-2",
      name: "Advanced STEM & Chemistry/Physics Lab Consumables",
      category: "mandatory",
      applicableTo: "SSS",
      amount: 35000,
      frequency: "Per Term",
      description: "Science practical reagents, apparatus maintenance, and computer programming lab access.",
    },
    {
      id: "fee-3",
      name: "Junior Secondary Tuition & Formative Books",
      category: "mandatory",
      applicableTo: "JSS",
      amount: 105000,
      frequency: "Per Term",
      description: "Foundational basic education curriculum, continuous assessments, and physical health.",
    },
    {
      id: "fee-4",
      name: "Junior Basic Technology & Creative Arts Workshop",
      category: "mandatory",
      applicableTo: "JSS",
      amount: 25000,
      frequency: "Per Term",
      description: "Workshop materials, woodcraft kits, and introductory robotics equipment.",
    },
    {
      id: "fee-5",
      name: "PTA Institutional Development Levy",
      category: "levy",
      applicableTo: "All",
      amount: 15000,
      frequency: "Per Term",
      description: "Managed by the Parent-Teacher Association for school bus fleet maintenance and sports clinic.",
    },
    {
      id: "fee-6",
      name: "Digital Campus & Smart Cloud Portal License",
      category: "mandatory",
      applicableTo: "All",
      amount: 15000,
      frequency: "Per Term",
      description: "Secure student portal access, SMS attendance alerts, and digital report card generation.",
    },
    {
      id: "fee-7",
      name: "Term Boarding, Catering & Laundry Services",
      category: "optional",
      applicableTo: "All",
      amount: 220000,
      frequency: "Per Term",
      description: "Full residential boarding, 3 daily meals, evening study hall, and linen laundry.",
    },
  ]);

  const filteredFees = feeItems.filter(
    (item) => activeTab === "All" || item.applicableTo === "All" || item.applicableTo === activeTab
  );

  const totalMandatory = filteredFees
    .filter((f) => f.category === "mandatory" || f.category === "levy")
    .reduce((sum, f) => sum + f.amount, 0);

  return (
    <DashboardLayout currentRole="bursar">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <Layers className="w-4 h-4" />
              Bursary Division · Fee Schedule Configuration
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Fee Structures & Levies
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Define tuition rates, laboratory charges, boarding fees, and automatic concession policies.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setSelectedFee(null);
                setEditModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              Add Fee Item
            </button>
            <button
              onClick={() => alert("Official Fee Structure PDF exported for 2025/2026 Academic Session")}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card border border-border hover:bg-muted text-foreground font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4 text-muted-foreground" />
              Export Schedule
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2 bg-canvas border border-border rounded-xl p-1 text-xs">
            <button
              onClick={() => setActiveTab("SSS")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === "SSS"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Senior Secondary (SSS 1–3)
            </button>
            <button
              onClick={() => setActiveTab("JSS")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === "JSS"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Junior Secondary (JSS 1–3)
            </button>
            <button
              onClick={() => setActiveTab("All")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === "All"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Unified Overview
            </button>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs text-muted-foreground">Standard Day Student Term Bill:</span>
            <span className="ml-2 text-lg font-black text-foreground">${totalMandatory.toLocaleString()}</span>
          </div>
        </div>

        {/* Fee Item Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFees.map((fee) => (
            <div
              key={fee.id}
              className="p-5 rounded-2xl bg-card border border-border shadow-xs hover:border-amber-500/40 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      fee.category === "mandatory"
                        ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 border border-blue-200 dark:border-blue-800"
                        : fee.category === "levy"
                        ? "bg-amber-50 dark:bg-amber-950/50 text-amber-600 border border-amber-200 dark:border-amber-800"
                        : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 border border-emerald-200 dark:border-emerald-800"
                    }`}
                  >
                    {fee.category}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">{fee.frequency}</span>
                </div>

                <h3 className="font-bold text-foreground text-base mb-1">{fee.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                  {fee.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-muted-foreground">Term Assessment</div>
                  <div className="text-xl font-black text-foreground">${fee.amount.toLocaleString()}</div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setSelectedFee(fee);
                      setEditModalOpen(true);
                    }}
                    className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => alert(`Fee item "${fee.name}" duplicate template created.`)}
                    className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Automated Concession & Discounts Policy Rules */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Percent className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-foreground">Active Concession & Waiver Rules</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Rules configured here automatically calculate discounts when batch term billing invoices are generated.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-canvas border border-border">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">Academic Merit Concession</span>
                <span className="text-xs font-black text-emerald-600">25% Waiver</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Applied to 1st position rank in overall stream examinations (e.g., Tobi Adeleke).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">Sibling Discount (3rd Child)</span>
                <span className="text-xs font-black text-blue-600">15% Tuition</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Triggered automatically for enrolled families with 3 or more biological children.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-border">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-foreground">Full-Time Staff Ward Concession</span>
                <span className="text-xs font-black text-purple-600">50% Tuition</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Statutory benefit for certified teaching and non-academic institutional staff.
              </p>
            </div>
          </div>
        </div>

        {/* Edit / Add Modal */}
        {editModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-foreground">
                {selectedFee ? "Modify Fee Item" : "Create New Fee Component"}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-muted-foreground mb-1 font-medium">Component Title</label>
                  <input
                    type="text"
                    defaultValue={selectedFee?.name || ""}
                    placeholder="e.g., Robotics & AI Lab Levy"
                    className="w-full px-3 py-2 rounded-xl bg-canvas border border-border text-foreground"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-muted-foreground mb-1 font-medium">Amount ($)</label>
                    <input
                      type="number"
                      defaultValue={selectedFee?.amount || 25000}
                      className="w-full px-3 py-2 rounded-xl bg-canvas border border-border text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1 font-medium">Applicability</label>
                    <select
                      defaultValue={selectedFee?.applicableTo || "SSS"}
                      className="w-full px-3 py-2 rounded-xl bg-canvas border border-border text-foreground"
                    >
                      <option value="SSS">Senior Secondary (SSS)</option>
                      <option value="JSS">Junior Secondary (JSS)</option>
                      <option value="All">All Grades (Unified)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-muted-foreground mb-1 font-medium">Schedule Description</label>
                  <textarea
                    rows={3}
                    defaultValue={selectedFee?.description || ""}
                    placeholder="Provide details on deliverables covered by this fee levy..."
                    className="w-full px-3 py-2 rounded-xl bg-canvas border border-border text-foreground"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Fee schedule parameters updated successfully.");
                    setEditModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
