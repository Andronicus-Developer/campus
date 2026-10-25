import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { BursarDashboardView } from "@/components/dashboard/roles/bursar-view";

export const metadata: Metadata = {
  title: "Bursar & Treasury Dashboard — Campus360",
  description: "Fee structures, Paystack collection inflows, reconciliation, and debt aging notices.",
};

export default function BursarPage() {
  return (
    <DashboardLayout currentRole="bursar">
      <BursarDashboardView />
    </DashboardLayout>
  );
}
