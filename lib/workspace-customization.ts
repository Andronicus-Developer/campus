export type WorkspaceThemeId = "modern-campus" | "classic-academic" | "midnight-executive";

export interface DashboardRoleColors {
  principal: string;
  admin: string;
  teacher: string;
  bursar: string;
  student: string;
  parent: string;
}

export type LogoType = "preset" | "upload" | "initials";
export type LogoPreset = "shield-crest" | "university-pillar" | "golden-quill" | "royal-crown" | "laurel-globe";

export interface WorkspaceBranding {
  schoolName: string;
  schoolCode: string;
  subdomainSlug: string;
  motto: string;
  logoType: LogoType;
  logoUrl?: string; // base64 or URL
  logoPreset: LogoPreset;
  logoInitials: string;
  logoBgColor: string;
  logoTextColor: string;
}

export interface AcademicCalendarConfig {
  academicYear: string;
  currentTerm: string;
  termStartDate: string;
  termEndDate: string;
}

export interface WorkspaceConfig {
  themeId: WorkspaceThemeId;
  branding: WorkspaceBranding;
  dashboardColors: DashboardRoleColors;
  calendar: AcademicCalendarConfig;
  lastUpdated?: string;
  updatedBy?: string;
}

export interface ThemeDefinition {
  id: WorkspaceThemeId;
  name: string;
  tagline: string;
  description: string;
  mode: "light" | "warm" | "dark";
  badge: string;
  primaryPreview: string;
  accentPreview: string;
  canvasPreview: string;
  surfacePreview: string;
  inkPreview: string;
  paletteDescription: string;
}

export const WORKSPACE_THEMES: ThemeDefinition[] = [
  {
    id: "modern-campus",
    name: "Modern Campus",
    tagline: "Vibrant Neo-Azure & Modern Slate",
    description: "High-contrast dynamic university aesthetic with crisp indigo accents and clear surface elevation.",
    mode: "light",
    badge: "Default Standard",
    primaryPreview: "#4f6ef7",
    accentPreview: "#7c3aed",
    canvasPreview: "#f0f4ff",
    surfacePreview: "#ffffff",
    inkPreview: "#0f172a",
    paletteDescription: "Cool off-white canvas, vibrant royal blue highlights, purple accents",
  },
  {
    id: "classic-academic",
    name: "Classic Academic",
    tagline: "Heritage Oxford & Warm Ivory",
    description: "Prestigious collegiate styling with antique ivory backgrounds, forest ivy teal and burnished gold accents.",
    mode: "warm",
    badge: "Heritage Ivy",
    primaryPreview: "#0f766e",
    accentPreview: "#b45309",
    canvasPreview: "#fbfaf8",
    surfacePreview: "#ffffff",
    inkPreview: "#1c1917",
    paletteDescription: "Warm ivory parchment, British deep teal, burnished antique gold",
  },
  {
    id: "midnight-executive",
    name: "Midnight Executive",
    tagline: "Obsidian Cockpit & Neon Sky",
    description: "Ultra-sleek dark workspace engineered for nocturnal executive governance with glowing glass elements.",
    mode: "dark",
    badge: "Dark Mode",
    primaryPreview: "#38bdf8",
    accentPreview: "#a855f7",
    canvasPreview: "#0b0f19",
    surfacePreview: "#111827",
    inkPreview: "#f8fafc",
    paletteDescription: "Midnight obsidian background, slate glass cards, neon cyan highlights",
  },
];

export const PRESET_CRESTS = [
  { id: "shield-crest", label: "Shield & Laurel Crest", iconName: "Shield" },
  { id: "university-pillar", label: "Classical Pillars", iconName: "Landmark" },
  { id: "golden-quill", label: "Academic Book & Quill", iconName: "BookOpen" },
  { id: "royal-crown", label: "Regal Crown Crest", iconName: "Crown" },
  { id: "laurel-globe", label: "Global Academy Wreath", iconName: "Globe" },
] as const;

export const DEFAULT_DASHBOARD_COLORS: DashboardRoleColors = {
  principal: "#4f6ef7", // Royal Indigo
  admin: "#059669",     // Emerald
  teacher: "#7c3aed",   // Vivid Purple
  bursar: "#f59e0b",    // Amber Gold
  student: "#06b6d4",   // Cyan Blue
  parent: "#ec4899",    // Rose Pink
};

export const COLOR_PALETTE_PACKS = [
  {
    name: "Campus360 Classic",
    description: "Balanced, high-clarity institutional role distinctions",
    colors: {
      principal: "#4f6ef7",
      admin: "#059669",
      teacher: "#7c3aed",
      bursar: "#f59e0b",
      student: "#06b6d4",
      parent: "#ec4899",
    },
  },
  {
    name: "Oxford & Ivy Prestige",
    description: "Prestigious British collegiate deep jewel tones",
    colors: {
      principal: "#1e3a8a", // Oxford Navy
      admin: "#0f766e",     // Forest Ivy
      teacher: "#6b21a8",   // Regal Byzantine
      bursar: "#b45309",    // Burnished Gold
      student: "#0369a1",   // Academic Sapphire
      parent: "#9f1239",    // Crimson Rose
    },
  },
  {
    name: "Nordic Minimalist",
    description: "Modern Scandinavian clean pastels and saturated markers",
    colors: {
      principal: "#2563eb", // Nordic Blue
      admin: "#10b981",     // Mint Pine
      teacher: "#8b5cf6",   // Lavender Slate
      bursar: "#f97316",    // Terracotta Orange
      student: "#0ea5e9",   // Glacier Sky
      parent: "#f43f5e",    // Coral Pink
    },
  },
  {
    name: "Cyber Neon / Slate",
    description: "Electric luminous pigments optimized for dark cockpit modes",
    colors: {
      principal: "#38bdf8", // Electric Cyan
      admin: "#34d399",     // Neon Emerald
      teacher: "#c084fc",   // Radiant Violet
      bursar: "#fbbf24",    // Bright Amber
      student: "#67e8f9",   // Aqua Marine
      parent: "#f472b6",    // Hot Fuchsia
    },
  },
];

export const DEFAULT_WORKSPACE_CONFIG: WorkspaceConfig = {
  themeId: "modern-campus",
  branding: {
    schoolName: "Riverside International College",
    schoolCode: "RC-LOS-001",
    subdomainSlug: "riverside",
    motto: "Excellence, Integrity and Wisdom",
    logoType: "preset",
    logoPreset: "shield-crest",
    logoInitials: "RC",
    logoBgColor: "#4f6ef7",
    logoTextColor: "#ffffff",
  },
  dashboardColors: DEFAULT_DASHBOARD_COLORS,
  calendar: {
    academicYear: "2025/2026",
    currentTerm: "2",
    termStartDate: "2026-01-12",
    termEndDate: "2026-04-10",
  },
};

const STORAGE_KEY = "campus360_workspace_config_v1";

export function getStoredWorkspaceConfig(): WorkspaceConfig {
  if (typeof window === "undefined") {
    return DEFAULT_WORKSPACE_CONFIG;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_WORKSPACE_CONFIG));
      return DEFAULT_WORKSPACE_CONFIG;
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_WORKSPACE_CONFIG,
      ...parsed,
      branding: {
        ...DEFAULT_WORKSPACE_CONFIG.branding,
        ...(parsed.branding || {}),
      },
      dashboardColors: {
        ...DEFAULT_WORKSPACE_CONFIG.dashboardColors,
        ...(parsed.dashboardColors || {}),
      },
      calendar: {
        ...DEFAULT_WORKSPACE_CONFIG.calendar,
        ...(parsed.calendar || {}),
      },
    };
  } catch {
    return DEFAULT_WORKSPACE_CONFIG;
  }
}

export function saveStoredWorkspaceConfig(config: WorkspaceConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    applyThemeToDocument(config.themeId, config.dashboardColors);
    window.dispatchEvent(new CustomEvent("campus360:workspace-customized", { detail: config }));
  } catch {
    // Ignore storage quota errors
  }
}

export function applyThemeToDocument(themeId: WorkspaceThemeId, colors?: DashboardRoleColors): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", themeId);

  // If role colors are provided, set custom CSS variables on root
  if (colors) {
    root.style.setProperty("--color-role-principal", colors.principal);
    root.style.setProperty("--color-role-admin", colors.admin);
    root.style.setProperty("--color-role-teacher", colors.teacher);
    root.style.setProperty("--color-role-bursar", colors.bursar);
    root.style.setProperty("--color-role-student", colors.student);
    root.style.setProperty("--color-role-parent", colors.parent);
  }
}
