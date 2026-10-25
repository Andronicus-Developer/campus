import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AdminDashboardView } from "@/components/dashboard/roles/admin-view";

export const metadata: Metadata = {
  title: "School Administrator Dashboard — Campus360",
  description: "Admissions pipeline, student matriculation, class arms capacity, and staff management.",
};

export default function AdminPage() {
  return (
    <DashboardLayout currentRole="admin">
      <AdminDashboardView />
    </DashboardLayout>
  );
}
