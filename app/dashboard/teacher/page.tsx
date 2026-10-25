import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { TeacherDashboardView } from "@/components/dashboard/roles/teacher-view";

export const metadata: Metadata = {
  title: "Teacher Faculty Dashboard — Campus360",
  description: "Assigned class registers, continuous assessment score entries, and timetable schedules.",
};

export default function TeacherPage() {
  return (
    <DashboardLayout currentRole="teacher">
      <TeacherDashboardView />
    </DashboardLayout>
  );
}
