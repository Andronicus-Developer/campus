"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { CommunicationsAdminView } from "@/components/dashboard/admin/communications-admin-view";

export default function AdminCommunicationsPage() {
  return (
    <DashboardLayout currentRole="admin">
      <CommunicationsAdminView />
    </DashboardLayout>
  );
}
