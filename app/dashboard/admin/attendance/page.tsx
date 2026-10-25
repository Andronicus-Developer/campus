"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AttendanceAdminView } from "@/components/dashboard/admin/attendance-admin-view";

export default function AdminAttendancePage() {
  return (
    <DashboardLayout currentRole="admin">
      <AttendanceAdminView />
    </DashboardLayout>
  );
}
