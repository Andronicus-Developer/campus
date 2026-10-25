"use client";

import { useEffect } from "react";
import { getStoredWorkspaceConfig, applyThemeToDocument } from "@/lib/workspace-customization";

export function ThemeProvider() {
  useEffect(() => {
    // Initial sync
    const config = getStoredWorkspaceConfig();
    applyThemeToDocument(config.themeId, config.dashboardColors);

    // Event listener for live updates across components or tabs
    const handleUpdate = () => {
      const updated = getStoredWorkspaceConfig();
      applyThemeToDocument(updated.themeId, updated.dashboardColors);
    };

    window.addEventListener("campus360:workspace-customized", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("campus360:workspace-customized", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return null;
}
