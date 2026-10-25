import { Suspense } from "react";
import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardClientView } from "@/components/dashboard/dashboard-client-view";

export const metadata: Metadata = {
  title: "School Workspace Dashboard — Campus360",
  description: "Role-specific operational dashboard for school staff, teachers, bursars, students, and parents.",
};

export default function DashboardRootPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout currentRole="principal">
          <div className="flex h-96 items-center justify-center">
            <div className="flex items-center gap-2 font-mono text-xs text-ink-muted">
              <span className="inline-block size-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              Loading dashboard workspace...
            </div>
          </div>
        </DashboardLayout>
      }
    >
      <DashboardClientView />
    </Suspense>
  );
}
