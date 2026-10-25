"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AuditAdminView } from "@/components/dashboard/admin/audit-admin-view";

export default function AdminAuditPage() {
  return (
    <DashboardLayout currentRole="admin">
      <AuditAdminView />
    </DashboardLayout>
  );
}
