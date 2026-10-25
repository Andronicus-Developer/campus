import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { StudentDashboardView } from "@/components/dashboard/roles/student-view";

export const metadata: Metadata = {
  title: "Student Learner Portal — Campus360",
  description: "Personal timetable, subject continuous assessment, published results, and attendance.",
};

export default function StudentPage() {
  return (
    <DashboardLayout currentRole="student">
      <StudentDashboardView />
    </DashboardLayout>
  );
}
