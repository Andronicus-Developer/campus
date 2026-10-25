"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Award,
  Download,
  CheckCircle2,
  TrendingUp,
  Star,
  Printer,
  ChevronRight,
  ShieldCheck,
  User,
} from "lucide-react";

interface SubjectResult {
  name: string;
  ca: number; // max 40
  exam: number; // max 60
  total: number;
  grade: string;
  classAvg: number;
  comment: string;
}

export default function ParentResultsPage() {
  const [selectedChild, setSelectedChild] = useState<"tobi" | "maryam">("tobi");
  const [selectedTerm, setSelectedTerm] = useState("Term 1, 2025/2026");

  const tobiScores: SubjectResult[] = [
    { name: "Mathematics", ca: 39, exam: 58, total: 97, grade: "A1", classAvg: 74.2, comment: "Exceptional mathematical rigour" },
    { name: "Further Mathematics", ca: 38, exam: 56, total: 94, grade: "A1", classAvg: 68.5, comment: "Brilliant aptitude in advanced calculus" },
    { name: "Physics", ca: 37, exam: 55, total: 92, grade: "A1", classAvg: 71.0, comment: "Consistently top practical lab scores" },
    { name: "Chemistry", ca: 37, exam: 54, total: 91, grade: "A1", classAvg: 72.8, comment: "Excellent understanding of stoichiometry" },
    { name: "Biology", ca: 35, exam: 53, total: 88, grade: "A1", classAvg: 69.4, comment: "Very strong diagrams and theory" },
    { name: "English Language", ca: 34, exam: 51, total: 85, grade: "A1", classAvg: 76.1, comment: "Articulate essay structure and vocabulary" },
    { name: "Computer Science", ca: 40, exam: 58, total: 98, grade: "A1", classAvg: 75.6, comment: "Outstanding Python programming skills" },
  ];

  const maryamScores: SubjectResult[] = [
    { name: "Mathematics", ca: 36, exam: 52, total: 88, grade: "A1", classAvg: 70.4, comment: "Strong problem solving skills" },
    { name: "English Studies", ca: 38, exam: 54, total: 92, grade: "A1", classAvg: 73.1, comment: "Exceptional reading comprehension" },
    { name: "Basic Science & Technology", ca: 35, exam: 50, total: 85, grade: "A1", classAvg: 68.2, comment: "Curious and active during workshops" },
    { name: "Social Studies & Civic", ca: 36, exam: 49, total: 85, grade: "A1", classAvg: 71.5, comment: "Very good community awareness" },
    { name: "Business Studies", ca: 34, exam: 47, total: 81, grade: "B2", classAvg: 65.0, comment: "Good bookkeeping fundamentals" },
    { name: "French Language", ca: 33, exam: 48, total: 81, grade: "B2", classAvg: 67.8, comment: "Improving conversational vocabulary" },
  ];

  const currentScores = selectedChild === "tobi" ? tobiScores : maryamScores;
  const currentChildName = selectedChild === "tobi" ? "Tobi Adeleke (SSS 2A)" : "Maryam Adeleke (JSS 1C)";
  const currentAvg = (currentScores.reduce((a, b) => a + b.total, 0) / currentScores.length).toFixed(1);
  const currentRank = selectedChild === "tobi" ? "1st / 38" : "3rd / 42";

  return (
    <DashboardLayout currentRole="parent">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-1">
              <Award className="w-4 h-4" />
              Family Portal · Terminal Progress Reports
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Children Academic Report Cards
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Approved term grades, GPA transcripts, and teacher formative appraisals.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => alert(`Downloading Official PDF Report Card for ${currentChildName}`)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              Download Report Card (PDF)
            </button>
          </div>
        </div>

        {/* Child Selector Tabs */}
        <div className="flex items-center gap-2 bg-card border border-border p-1.5 rounded-2xl shadow-xs">
          <button
            onClick={() => setSelectedChild("tobi")}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
              selectedChild === "tobi"
                ? "bg-pink-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <span>Tobi Adeleke</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-md ${selectedChild === "tobi" ? "bg-white/20" : "bg-canvas border border-border"}`}>
              SSS 2A
            </span>
          </button>

          <button
            onClick={() => setSelectedChild("maryam")}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
              selectedChild === "maryam"
                ? "bg-pink-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <span>Maryam Adeleke</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-md ${selectedChild === "maryam" ? "bg-white/20" : "bg-canvas border border-border"}`}>
              JSS 1C
            </span>
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Terminal Average</div>
            <div className="text-3xl font-black text-pink-600 mt-1">{currentAvg}%</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">Excellent Standing</div>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Class Ranking</div>
            <div className="text-3xl font-black text-amber-500 mt-1">{currentRank}</div>
            <div className="text-[11px] text-muted-foreground mt-1">Cohort percentile: Top 5%</div>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Term Attendance</div>
            <div className="text-3xl font-black text-foreground mt-1">{selectedChild === "tobi" ? "98.2%" : "97.5%"}</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">55 of 56 sessions attended</div>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border shadow-xs">
            <div className="text-xs font-medium text-muted-foreground">Verification Seal</div>
            <div className="text-3xl font-black text-emerald-600 mt-1">VERIFIED</div>
            <div className="text-[11px] text-muted-foreground mt-1">Dr. Evelyn Peters, Principal</div>
          </div>
        </div>

        {/* Scores Table */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-xs">
          <div className="p-4 bg-canvas border-b border-border flex items-center justify-between">
            <div className="font-bold text-foreground text-sm">{currentChildName} · {selectedTerm}</div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
              <ShieldCheck className="w-3.5 h-3.5" /> Published by Examination Office
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-canvas border-b border-border text-muted-foreground uppercase text-[11px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-3 text-right">CA Total (40)</th>
                  <th className="py-3 px-3 text-right">Exam Score (60)</th>
                  <th className="py-3 px-3 text-right">Aggregate (100)</th>
                  <th className="py-3 px-3 text-center">Grade</th>
                  <th className="py-3 px-3 text-right">Class Avg</th>
                  <th className="py-3 px-4">Subject Teacher Feedback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentScores.map((sc) => (
                  <tr key={sc.name} className="hover:bg-canvas/50 transition">
                    <td className="py-3.5 px-4 font-semibold text-foreground">{sc.name}</td>
                    <td className="py-3.5 px-3 text-right font-medium text-muted-foreground">{sc.ca}</td>
                    <td className="py-3.5 px-3 text-right font-semibold text-foreground">{sc.exam}</td>
                    <td className="py-3.5 px-3 text-right font-black text-pink-600">{sc.total}</td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-black bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                        {sc.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right text-xs text-muted-foreground">{sc.classAvg}%</td>
                    <td className="py-3.5 px-4 text-xs text-muted-foreground">{sc.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Official Faculty Remarks */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase font-bold text-pink-600 tracking-wider">
            <Star className="w-4 h-4" /> Form Master & Principal Term Remarks
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-canvas border border-border">
              <span className="font-bold text-foreground block mb-1">Form Teacher's Commentary:</span>
              <p className="text-muted-foreground italic leading-relaxed">
                {selectedChild === "tobi"
                  ? '"Tobi has consistently maintained outstanding discipline, focus and analytical brilliance in SSS 2A. A model student for his peers."'
                  : '"Maryam shows remarkable creativity and linguistic poise. Her teamwork during collaborative projects is commendable."'}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-canvas border border-border">
              <span className="font-bold text-foreground block mb-1">Principal's Executive Sign-off:</span>
              <p className="text-muted-foreground italic leading-relaxed">
                "Promoted with academic distinction standing. Keep up the disciplined standard."
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
