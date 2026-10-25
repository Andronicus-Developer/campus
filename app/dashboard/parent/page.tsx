import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { ParentDashboardView } from "@/components/dashboard/roles/parent-view";

export const metadata: Metadata = {
  title: "Parent & Guardian Portal — Campus360",
  description: "Multi-child monitoring, online Paystack fee payment, gate arrival alerts, and teacher chat.",
};

export default function ParentPage() {
  return (
    <DashboardLayout currentRole="parent">
      <ParentDashboardView />
    </DashboardLayout>
  );
}
