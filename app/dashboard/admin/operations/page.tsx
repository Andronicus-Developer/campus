"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { OperationsAdminView } from "@/components/dashboard/admin/operations-admin-view";

export default function AdminOperationsPage() {
  return (
    <DashboardLayout currentRole="admin">
      <OperationsAdminView />
    </DashboardLayout>
  );
}
