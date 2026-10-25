"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DocumentsAdminView } from "@/components/dashboard/admin/documents-admin-view";

export default function AdminDocumentsPage() {
  return (
    <DashboardLayout currentRole="admin">
      <DocumentsAdminView />
    </DashboardLayout>
  );
}
