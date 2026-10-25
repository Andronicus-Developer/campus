"use client";

import { useSearchParams } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { PrincipalDashboardView } from "@/components/dashboard/roles/principal-view";
import { TeacherDashboardView } from "@/components/dashboard/roles/teacher-view";
import { AdminDashboardView } from "@/components/dashboard/roles/admin-view";
import { BursarDashboardView } from "@/components/dashboard/roles/bursar-view";
import { StudentDashboardView } from "@/components/dashboard/roles/student-view";
import { ParentDashboardView } from "@/components/dashboard/roles/parent-view";
import { RoleKey } from "@/lib/rbac";

export function DashboardClientView() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role")?.toLowerCase() as RoleKey;

  const validRoles: RoleKey[] = [
    "principal",
    "teacher",
    "admin",
    "bursar",
    "student",
    "parent",
  ];

  const activeRole: RoleKey = validRoles.includes(roleParam)
    ? roleParam
    : "principal";

  return (
    <DashboardLayout currentRole={activeRole}>
      {activeRole === "principal" && <PrincipalDashboardView />}
      {activeRole === "teacher" && <TeacherDashboardView />}
      {activeRole === "admin" && <AdminDashboardView />}
      {activeRole === "bursar" && <BursarDashboardView />}
      {activeRole === "student" && <StudentDashboardView />}
      {activeRole === "parent" && <ParentDashboardView />}
    </DashboardLayout>
  );
}
