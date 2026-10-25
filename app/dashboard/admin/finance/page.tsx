"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FinanceAdminView } from "@/components/dashboard/admin/finance-admin-view";

export default function AdminFinancePage() {
  return (
    <DashboardLayout currentRole="admin">
      <FinanceAdminView />
    </DashboardLayout>
  );
}
