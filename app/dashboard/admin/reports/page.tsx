"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ReportsAdminView } from "@/components/dashboard/admin/reports-admin-view";

export default function AdminReportsPage() {
  return (
    <DashboardLayout currentRole="admin">
      <ReportsAdminView />
    </DashboardLayout>
  );
}
