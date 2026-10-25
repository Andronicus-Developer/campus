"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AccountSettingsView } from "@/components/dashboard/account-settings-view";

export default function StudentSettingsPage() {
  return (
    <DashboardLayout currentRole="student">
      <AccountSettingsView currentRole="student" />
    </DashboardLayout>
  );
}
