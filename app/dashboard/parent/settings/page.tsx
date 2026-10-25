"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AccountSettingsView } from "@/components/dashboard/account-settings-view";

export default function ParentSettingsPage() {
  return (
    <DashboardLayout currentRole="parent">
      <AccountSettingsView currentRole="parent" />
    </DashboardLayout>
  );
}
