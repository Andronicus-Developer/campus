"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AccountSettingsView } from "@/components/dashboard/account-settings-view";

export default function TeacherSettingsPage() {
  return (
    <DashboardLayout currentRole="teacher">
      <AccountSettingsView currentRole="teacher" />
    </DashboardLayout>
  );
}
