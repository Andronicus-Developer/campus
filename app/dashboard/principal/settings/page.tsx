"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AccountSettingsView } from "@/components/dashboard/account-settings-view";

export default function PrincipalSettingsPage() {
  return (
    <DashboardLayout currentRole="principal">
      <AccountSettingsView currentRole="principal" />
    </DashboardLayout>
  );
}
