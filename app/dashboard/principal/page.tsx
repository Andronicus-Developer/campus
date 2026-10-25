import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { PrincipalDashboardView } from "@/components/dashboard/roles/principal-view";

export const metadata: Metadata = {
  title: "Principal Executive Dashboard — Campus360",
  description: "Executive oversight, institutional KPI radar, staff appraisal, and result publication approvals.",
};

export default function PrincipalPage() {
  return (
    <DashboardLayout currentRole="principal">
      <PrincipalDashboardView />
    </DashboardLayout>
  );
}
