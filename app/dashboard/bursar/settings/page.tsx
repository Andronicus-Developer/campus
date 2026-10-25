"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AccountSettingsView } from "@/components/dashboard/account-settings-view";

export default function BursarSettingsPage() {
  return (
    <DashboardLayout currentRole="bursar">
      <AccountSettingsView currentRole="bursar" />
    </DashboardLayout>
  );
}
