"use client";

import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Building2,
  CheckCircle2,
  Save,
  Settings,
  ShieldCheck,
  Sliders,
  Palette,
  Image as ImageIcon,
  Sparkles,
  Upload,
  RotateCcw,
  Sun,
  Moon,
  Compass,
  Check,
  Trash2,
  Shield,
  Landmark,
  BookOpen,
  Crown,
  Globe,
  Eye,
  Calendar,
  Layers,
  GraduationCap,
  Users,
  Briefcase,
  Heart,
} from "lucide-react";
import {
  WorkspaceConfig,
  WorkspaceThemeId,
  WorkspaceBranding,
  DashboardRoleColors,
  WORKSPACE_THEMES,
  PRESET_CRESTS,
  COLOR_PALETTE_PACKS,
  DEFAULT_WORKSPACE_CONFIG,
  getStoredWorkspaceConfig,
  saveStoredWorkspaceConfig,
  applyThemeToDocument,
} from "@/lib/workspace-customization";

export default function AdminSettingsPage() {
  const [config, setConfig] = useState<WorkspaceConfig>(DEFAULT_WORKSPACE_CONFIG);
  const [activeTab, setActiveTab] = useState<"theme" | "logo" | "colors" | "calendar">("theme");
  const [saved, setSaved] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from store on mount
  useEffect(() => {
    const loaded = getStoredWorkspaceConfig();
    setConfig(loaded);
  }, []);

  // Live theme switch preview
  const handleSelectTheme = (themeId: WorkspaceThemeId) => {
    const nextConfig: WorkspaceConfig = {
      ...config,
      themeId,
    };
    setConfig(nextConfig);
    // Apply immediately to the DOM so the admin can experience the theme right away!
    applyThemeToDocument(themeId, nextConfig.dashboardColors);
  };

  // Handle Logo File Upload (reads as base64)
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB limit. Please upload a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setConfig((prev) => ({
          ...prev,
          branding: {
            ...prev.branding,
            logoType: "upload",
            logoUrl: result,
          },
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveUploadedLogo = () => {
    setConfig((prev) => ({
      ...prev,
      branding: {
        ...prev.branding,
        logoType: "preset",
        logoUrl: undefined,
      },
    }));
  };

  // Handle Palette Pack Selection
  const handleApplyPalettePack = (colors: DashboardRoleColors) => {
    const nextConfig = {
      ...config,
      dashboardColors: { ...colors },
    };
    setConfig(nextConfig);
    applyThemeToDocument(nextConfig.themeId, colors);
  };

  // Handle Individual Dashboard Color Change
  const handleRoleColorChange = (role: keyof DashboardRoleColors, color: string) => {
    const nextColors = {
      ...config.dashboardColors,
      [role]: color,
    };
    const nextConfig = {
      ...config,
      dashboardColors: nextColors,
    };
    setConfig(nextConfig);
    applyThemeToDocument(nextConfig.themeId, nextColors);
  };

  // Save changes
  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalConfig: WorkspaceConfig = {
      ...config,
      lastUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      updatedBy: "Engr. Patrick Bassey (School Admin)",
    };
    saveStoredWorkspaceConfig(finalConfig);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  // Reset to Factory Defaults
  const handleResetDefaults = () => {
    setConfig(DEFAULT_WORKSPACE_CONFIG);
    saveStoredWorkspaceConfig(DEFAULT_WORKSPACE_CONFIG);
    setResetModalOpen(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <DashboardLayout currentRole="admin">
      <div className="space-y-6">
        {/* Page Header Banner */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                  School Admin Authority
                </span>
                <span className="font-mono text-xs text-ink-muted">Tenant ID: 94a1-rc-lagos</span>
              </div>
              <h2 className="mt-2 text-2xl font-black text-ink">School Workspace Customization</h2>
              <p className="text-xs text-ink-muted">
                Personalize school branding, upload your institutional crest or logo, customize dashboard colors for each role, and select your workspace theme.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setResetModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3.5 py-2 text-xs font-semibold text-ink-muted hover:border-line-strong hover:text-ink active:scale-95 transition-all"
              >
                <RotateCcw className="size-3.5" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={() => handleSaveAll()}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
              >
                <Save className="size-4" />
                <span>Save Workspace Settings</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4">
            <button
              onClick={() => setActiveTab("theme")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "theme"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-surface-raised text-ink-muted hover:text-ink"
              }`}
            >
              <Palette className="size-4" />
              <span>1. Workspace Themes (3 Options)</span>
            </button>

            <button
              onClick={() => setActiveTab("logo")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "logo"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-surface-raised text-ink-muted hover:text-ink"
              }`}
            >
              <ImageIcon className="size-4" />
              <span>2. School Logo &amp; Identity</span>
            </button>

            <button
              onClick={() => setActiveTab("colors")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "colors"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-surface-raised text-ink-muted hover:text-ink"
              }`}
            >
              <Sparkles className="size-4" />
              <span>3. Dashboard Role Colors</span>
            </button>

            <button
              onClick={() => setActiveTab("calendar")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "calendar"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-surface-raised text-ink-muted hover:text-ink"
              }`}
            >
              <Calendar className="size-4" />
              <span>4. Calendar &amp; Session</span>
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {saved && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950 p-4 text-xs text-white font-semibold flex items-center justify-between shadow-xl animate-in slide-in-from-top-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="size-4.5 text-emerald-400" />
              <span>Workspace customizations applied and synchronized school-wide across all role surfaces!</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-300">Live Active</span>
          </div>
        )}

        {/* LIVE WORKSPACE PREVIEW SUMMARY BAR */}
        <div className="rounded-3xl border border-line bg-surface p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Logo Preview */}
              {config.branding.logoType === "upload" && config.branding.logoUrl ? (
                <img
                  src={config.branding.logoUrl}
                  alt={config.branding.schoolName}
                  className="size-11 rounded-2xl object-cover shadow-sm border border-line"
                />
              ) : config.branding.logoType === "initials" ? (
                <div
                  className="size-11 rounded-2xl flex items-center justify-center font-black text-sm shadow-sm"
                  style={{
                    backgroundColor: config.branding.logoBgColor,
                    color: config.branding.logoTextColor,
                  }}
                >
                  {config.branding.logoInitials || "RC"}
                </div>
              ) : (
                <div
                  className="size-11 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{
                    backgroundColor: config.branding.logoBgColor,
                    color: config.branding.logoTextColor,
                  }}
                >
                  {config.branding.logoPreset === "shield-crest" && <Shield className="size-6" />}
                  {config.branding.logoPreset === "university-pillar" && <Landmark className="size-6" />}
                  {config.branding.logoPreset === "golden-quill" && <BookOpen className="size-6" />}
                  {config.branding.logoPreset === "royal-crown" && <Crown className="size-6" />}
                  {config.branding.logoPreset === "laurel-globe" && <Globe className="size-6" />}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-ink">{config.branding.schoolName}</h3>
                  <span className="rounded-full bg-surface-raised px-2 py-0.5 font-mono text-[10px] font-bold text-ink-muted border border-line">
                    {config.branding.schoolCode}
                  </span>
                </div>
                <p className="text-xs text-ink-muted italic">{config.branding.motto}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 rounded-xl border border-line bg-surface-raised px-3 py-1.5">
                <span className="text-ink-muted">Active Theme:</span>
                <strong className="text-ink capitalize font-bold">
                  {WORKSPACE_THEMES.find((t) => t.id === config.themeId)?.name}
                </strong>
              </div>

              {/* Role Color Swatches Preview */}
              <div className="flex items-center gap-1">
                <span className="text-ink-muted mr-1">Dashboards:</span>
                <span
                  className="size-4 rounded-full ring-1 ring-white shadow-sm"
                  style={{ backgroundColor: config.dashboardColors.principal }}
                  title="Principal Dashboard"
                />
                <span
                  className="size-4 rounded-full ring-1 ring-white shadow-sm"
                  style={{ backgroundColor: config.dashboardColors.admin }}
                  title="School Admin Dashboard"
                />
                <span
                  className="size-4 rounded-full ring-1 ring-white shadow-sm"
                  style={{ backgroundColor: config.dashboardColors.teacher }}
                  title="Teacher Dashboard"
                />
                <span
                  className="size-4 rounded-full ring-1 ring-white shadow-sm"
                  style={{ backgroundColor: config.dashboardColors.bursar }}
                  title="Bursar Dashboard"
                />
                <span
                  className="size-4 rounded-full ring-1 ring-white shadow-sm"
                  style={{ backgroundColor: config.dashboardColors.student }}
                  title="Student Portal"
                />
                <span
                  className="size-4 rounded-full ring-1 ring-white shadow-sm"
                  style={{ backgroundColor: config.dashboardColors.parent }}
                  title="Parent Portal"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TAB 1: WORKSPACE THEMES (3 DISTINCT THEMES) */}
        {activeTab === "theme" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Palette className="size-4" />
                </span>
                <h3 className="text-lg font-extrabold text-ink">Choose Workspace Theme</h3>
              </div>
              <p className="mt-1 text-xs text-ink-muted">
                Select from three bespoke institutional themes. The chosen theme automatically shifts canvas colors, surface elevations, text contrast, and border styles.
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {WORKSPACE_THEMES.map((theme) => {
                  const isSelected = config.themeId === theme.id;
                  return (
                    <div
                      key={theme.id}
                      onClick={() => handleSelectTheme(theme.id)}
                      className={`relative cursor-pointer rounded-3xl border-2 p-5 transition-all flex flex-col justify-between ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50/20 shadow-xl ring-2 ring-emerald-600/30"
                          : "border-line bg-surface hover:border-line-strong hover:shadow-md"
                      }`}
                    >
                      <div>
                        {/* Theme Header */}
                        <div className="flex items-center justify-between">
                          <span
                            className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                              isSelected
                                ? "bg-emerald-600 text-white"
                                : "bg-surface-raised text-ink-muted"
                            }`}
                          >
                            {theme.badge}
                          </span>
                          {isSelected && (
                            <span className="flex items-center gap-1 font-mono text-xs font-bold text-emerald-600">
                              <Check className="size-4" />
                              Active
                            </span>
                          )}
                        </div>

                        <h4 className="mt-3 text-base font-black text-ink">{theme.name}</h4>
                        <p className="font-mono text-xs font-semibold text-primary">{theme.tagline}</p>
                        <p className="mt-2 text-xs text-ink-muted leading-relaxed">{theme.description}</p>

                        {/* Interactive Mini UI Mockup */}
                        <div
                          className="mt-4 rounded-2xl border p-3.5 space-y-2 shadow-inner"
                          style={{
                            backgroundColor: theme.canvasPreview,
                            borderColor: theme.id === "midnight-executive" ? "#1e293b" : "#e2e8f0",
                          }}
                        >
                          <div
                            className="rounded-xl p-2.5 shadow-sm flex items-center justify-between"
                            style={{
                              backgroundColor: theme.surfacePreview,
                              color: theme.inkPreview,
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="size-4 rounded-md"
                                style={{ backgroundColor: theme.primaryPreview }}
                              />
                              <span className="text-[11px] font-bold" style={{ color: theme.inkPreview }}>
                                Top Bar
                              </span>
                            </div>
                            <span
                              className="size-2 rounded-full"
                              style={{ backgroundColor: theme.accentPreview }}
                            />
                          </div>

                          <div
                            className="rounded-xl p-2 text-[10px] flex items-center justify-between font-mono"
                            style={{
                              backgroundColor: theme.surfacePreview,
                              color: theme.inkPreview,
                            }}
                          >
                            <span style={{ color: theme.inkPreview }}>Analytics Card</span>
                            <span className="font-bold" style={{ color: theme.primaryPreview }}>
                              98.2%
                            </span>
                          </div>
                        </div>

                        {/* Palette Color Chips */}
                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-line text-[11px] font-mono text-ink-muted">
                          <span>Palette Tokens:</span>
                          <div className="flex items-center gap-1">
                            <span
                              className="size-4 rounded-full border border-black/10 shadow-sm"
                              style={{ backgroundColor: theme.primaryPreview }}
                              title="Primary"
                            />
                            <span
                              className="size-4 rounded-full border border-black/10 shadow-sm"
                              style={{ backgroundColor: theme.accentPreview }}
                              title="Accent"
                            />
                            <span
                              className="size-4 rounded-full border border-black/10 shadow-sm"
                              style={{ backgroundColor: theme.canvasPreview }}
                              title="Canvas"
                            />
                            <span
                              className="size-4 rounded-full border border-black/10 shadow-sm"
                              style={{ backgroundColor: theme.surfacePreview }}
                              title="Surface"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectTheme(theme.id);
                        }}
                        className={`mt-4 w-full rounded-xl py-2 text-xs font-bold transition-all ${
                          isSelected
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "border border-line bg-surface-raised text-ink hover:bg-surface-raised/80"
                        }`}
                      >
                        {isSelected ? "Current Theme" : `Switch to ${theme.name}`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SCHOOL LOGO & IDENTITY */}
        {activeTab === "logo" && (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-12">
              {/* Left Column: Logo Customizer (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-5">
                  <div className="flex items-center gap-2 border-b border-line pb-3">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <ImageIcon className="size-4" />
                    </span>
                    <h3 className="text-base font-extrabold text-ink">School Logo &amp; Crest Customization</h3>
                  </div>

                  {/* Logo Mode Switcher */}
                  <div>
                    <label className="block text-xs font-bold text-ink mb-2">Logo Presentation Format</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setConfig((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, logoType: "upload" },
                          }))
                        }
                        className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition-all ${
                          config.branding.logoType === "upload"
                            ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                            : "border-line bg-surface-raised text-ink hover:border-line-strong"
                        }`}
                      >
                        <Upload className="size-4 text-emerald-700" />
                        <span className="font-bold text-xs">Custom Image</span>
                        <span className="text-[10px] text-ink-muted">Upload PNG/SVG</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setConfig((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, logoType: "preset" },
                          }))
                        }
                        className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition-all ${
                          config.branding.logoType === "preset"
                            ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                            : "border-line bg-surface-raised text-ink hover:border-line-strong"
                        }`}
                      >
                        <Shield className="size-4 text-emerald-700" />
                        <span className="font-bold text-xs">Academic Crest</span>
                        <span className="text-[10px] text-ink-muted">5 Vector Designs</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setConfig((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, logoType: "initials" },
                          }))
                        }
                        className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition-all ${
                          config.branding.logoType === "initials"
                            ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                            : "border-line bg-surface-raised text-ink hover:border-line-strong"
                        }`}
                      >
                        <Sparkles className="size-4 text-emerald-700" />
                        <span className="font-bold text-xs">Monogram Badge</span>
                        <span className="text-[10px] text-ink-muted">School Initials</span>
                      </button>
                    </div>
                  </div>

                  {/* Mode 1: Upload Custom Logo */}
                  {config.branding.logoType === "upload" && (
                    <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ink">Upload Institutional Logo Image</span>
                        {config.branding.logoUrl && (
                          <button
                            type="button"
                            onClick={handleRemoveUploadedLogo}
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-rose-600 hover:underline"
                          >
                            <Trash2 className="size-3" />
                            <span>Remove Upload</span>
                          </button>
                        )}
                      </div>

                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="cursor-pointer rounded-2xl border-2 border-dashed border-line hover:border-emerald-600 bg-surface p-6 text-center transition-all"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png, image/jpeg, image/svg+xml, image/webp"
                          className="hidden"
                          onChange={handleLogoFileUpload}
                        />
                        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                          <Upload className="size-6" />
                        </div>
                        <p className="mt-2 text-xs font-bold text-ink">
                          Click to select school logo from your device
                        </p>
                        <p className="text-[11px] text-ink-muted">Supports PNG, SVG, JPG, or WEBP (Up to 2MB)</p>
                      </div>

                      {/* Or enter remote URL */}
                      <div>
                        <label className="block text-[11px] font-semibold text-ink-muted mb-1">
                          Or paste CDN / Cloud image URL:
                        </label>
                        <input
                          type="url"
                          placeholder="https://example.com/school-logo.png"
                          value={config.branding.logoUrl || ""}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              branding: { ...prev.branding, logoUrl: e.target.value },
                            }))
                          }
                          className="w-full rounded-xl border border-line bg-surface p-2.5 text-xs text-ink placeholder:text-ink-muted focus:border-emerald-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Mode 2: Preset Crests */}
                  {config.branding.logoType === "preset" && (
                    <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-3">
                      <span className="text-xs font-bold text-ink block">Select Institutional Crest Icon</span>
                      <div className="grid grid-cols-5 gap-2">
                        {PRESET_CRESTS.map((crest) => {
                          const isSelected = config.branding.logoPreset === crest.id;
                          return (
                            <button
                              key={crest.id}
                              type="button"
                              onClick={() =>
                                setConfig((prev) => ({
                                  ...prev,
                                  branding: { ...prev.branding, logoPreset: crest.id },
                                }))
                              }
                              className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition-all ${
                                isSelected
                                  ? "border-emerald-600 bg-emerald-100 text-emerald-900 shadow-sm"
                                  : "border-line bg-surface text-ink hover:border-line-strong"
                              }`}
                            >
                              {crest.id === "shield-crest" && <Shield className="size-6 text-emerald-700" />}
                              {crest.id === "university-pillar" && <Landmark className="size-6 text-emerald-700" />}
                              {crest.id === "golden-quill" && <BookOpen className="size-6 text-emerald-700" />}
                              {crest.id === "royal-crown" && <Crown className="size-6 text-emerald-700" />}
                              {crest.id === "laurel-globe" && <Globe className="size-6 text-emerald-700" />}
                              <span className="text-[10px] font-bold truncate max-w-full">{crest.label.split(" ")[0]}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Color pickers for preset badge */}
                      <div className="mt-3 grid grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-ink-muted mb-1">Crest Background Color</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={config.branding.logoBgColor}
                              onChange={(e) =>
                                setConfig((prev) => ({
                                  ...prev,
                                  branding: { ...prev.branding, logoBgColor: e.target.value },
                                }))
                              }
                              className="size-8 rounded-lg border border-line cursor-pointer"
                            />
                            <span className="font-mono text-xs font-bold text-ink">{config.branding.logoBgColor}</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-ink-muted mb-1">Crest Icon Color</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={config.branding.logoTextColor}
                              onChange={(e) =>
                                setConfig((prev) => ({
                                  ...prev,
                                  branding: { ...prev.branding, logoTextColor: e.target.value },
                                }))
                              }
                              className="size-8 rounded-lg border border-line cursor-pointer"
                            />
                            <span className="font-mono text-xs font-bold text-ink">{config.branding.logoTextColor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mode 3: Monogram Initials */}
                  {config.branding.logoType === "initials" && (
                    <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-3">
                      <span className="text-xs font-bold text-ink block">Configure School Monogram Badge</span>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-ink-muted mb-1">Initials (2-4 letters)</label>
                          <input
                            type="text"
                            maxLength={4}
                            value={config.branding.logoInitials}
                            onChange={(e) =>
                              setConfig((prev) => ({
                                ...prev,
                                branding: { ...prev.branding, logoInitials: e.target.value.toUpperCase() },
                              }))
                            }
                            className="w-full rounded-xl border border-line bg-surface p-2 font-mono font-bold text-ink text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-ink-muted mb-1">Badge Background</label>
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="color"
                              value={config.branding.logoBgColor}
                              onChange={(e) =>
                                setConfig((prev) => ({
                                  ...prev,
                                  branding: { ...prev.branding, logoBgColor: e.target.value },
                                }))
                              }
                              className="size-8 rounded-lg border border-line cursor-pointer"
                            />
                            <span className="font-mono text-xs text-ink">{config.branding.logoBgColor}</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-ink-muted mb-1">Initials Text Color</label>
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="color"
                              value={config.branding.logoTextColor}
                              onChange={(e) =>
                                setConfig((prev) => ({
                                  ...prev,
                                  branding: { ...prev.branding, logoTextColor: e.target.value },
                                }))
                              }
                              className="size-8 rounded-lg border border-line cursor-pointer"
                            />
                            <span className="font-mono text-xs text-ink">{config.branding.logoTextColor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* School Profile Text Inputs */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">Official School Name</label>
                      <input
                        type="text"
                        value={config.branding.schoolName}
                        onChange={(e) =>
                          setConfig((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, schoolName: e.target.value },
                          }))
                        }
                        className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink focus:border-emerald-600 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-ink-muted mb-1">School Code</label>
                        <input
                          type="text"
                          value={config.branding.schoolCode}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              branding: { ...prev.branding, schoolCode: e.target.value },
                            }))
                          }
                          className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink focus:border-emerald-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink-muted mb-1">Subdomain Slug</label>
                        <input
                          type="text"
                          value={config.branding.subdomainSlug}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              branding: { ...prev.branding, subdomainSlug: e.target.value },
                            }))
                          }
                          className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink focus:border-emerald-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink-muted mb-1">Institutional Motto</label>
                      <input
                        type="text"
                        value={config.branding.motto}
                        onChange={(e) =>
                          setConfig((prev) => ({
                            ...prev,
                            branding: { ...prev.branding, motto: e.target.value },
                          }))
                        }
                        className="w-full rounded-xl border border-line bg-surface-raised p-2.5 text-ink italic focus:border-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Mockup Preview (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <div className="flex items-center gap-2">
                      <Eye className="size-4 text-emerald-600" />
                      <h4 className="text-sm font-bold text-ink">Sidebar Branding Preview</h4>
                    </div>
                    <span className="font-mono text-[10px] text-ink-muted">Live Rendering</span>
                  </div>

                  <p className="text-xs text-ink-muted">
                    This is how your school logo, name, and motto render in the workspace sidebar navigation.
                  </p>

                  <div className="rounded-2xl border border-line bg-surface-raised p-4">
                    <div className="flex items-center gap-3">
                      {config.branding.logoType === "upload" && config.branding.logoUrl ? (
                        <img
                          src={config.branding.logoUrl}
                          alt={config.branding.schoolName}
                          className="size-11 rounded-2xl object-cover shadow-md border border-line"
                        />
                      ) : config.branding.logoType === "initials" ? (
                        <div
                          className="size-11 rounded-2xl flex items-center justify-center font-black text-sm shadow-md"
                          style={{
                            backgroundColor: config.branding.logoBgColor,
                            color: config.branding.logoTextColor,
                          }}
                        >
                          {config.branding.logoInitials || "RC"}
                        </div>
                      ) : (
                        <div
                          className="size-11 rounded-2xl flex items-center justify-center shadow-md"
                          style={{
                            backgroundColor: config.branding.logoBgColor,
                            color: config.branding.logoTextColor,
                          }}
                        >
                          {config.branding.logoPreset === "shield-crest" && <Shield className="size-6" />}
                          {config.branding.logoPreset === "university-pillar" && <Landmark className="size-6" />}
                          {config.branding.logoPreset === "golden-quill" && <BookOpen className="size-6" />}
                          {config.branding.logoPreset === "royal-crown" && <Crown className="size-6" />}
                          {config.branding.logoPreset === "laurel-globe" && <Globe className="size-6" />}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <h4 className="font-extrabold text-sm text-ink truncate">{config.branding.schoolName}</h4>
                        <span className="font-mono text-[10px] font-semibold text-primary block truncate">
                          {config.branding.motto || "Campus360 Workspace"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between rounded-xl border border-line bg-surface px-3 py-1.5 font-mono text-[10px] text-ink-muted">
                      <span>{config.calendar.academicYear} Term {config.calendar.currentTerm}</span>
                      <span className="rounded bg-primary-light px-1.5 py-0.5 font-bold text-primary">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DASHBOARD ROLE COLORS */}
        {activeTab === "colors" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <Sparkles className="size-4" />
                    </span>
                    <h3 className="text-base font-extrabold text-ink">Customize Colors for Various Dashboards</h3>
                  </div>
                  <p className="text-xs text-ink-muted mt-1">
                    Set signature brand accents for each role cockpit across your school.
                  </p>
                </div>
              </div>

              {/* 1-Click Curated Palette Packs */}
              <div>
                <label className="block text-xs font-bold text-ink mb-2">1-Click Curated Institutional Palettes</label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {COLOR_PALETTE_PACKS.map((pack) => (
                    <div
                      key={pack.name}
                      onClick={() => handleApplyPalettePack(pack.colors)}
                      className="cursor-pointer rounded-2xl border border-line bg-surface-raised p-4 hover:border-emerald-600 hover:shadow-sm transition-all"
                    >
                      <h4 className="font-bold text-xs text-ink">{pack.name}</h4>
                      <p className="text-[10px] text-ink-muted mt-0.5 line-clamp-1">{pack.description}</p>
                      <div className="mt-3 flex items-center gap-1.5">
                        {Object.values(pack.colors).map((c, i) => (
                          <span
                            key={i}
                            className="size-5 rounded-full border border-black/10 shadow-sm"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Dashboard Color Customizers */}
              <div className="border-t border-line pt-4">
                <label className="block text-xs font-bold text-ink mb-3">Individual Dashboard Role Accents</label>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* 1. Principal */}
                  <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="size-4 text-ink-muted" />
                        <span className="font-bold text-xs text-ink">Principal Dashboard</span>
                      </div>
                      <span className="font-mono text-[10px] text-ink-muted uppercase">Executive</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.dashboardColors.principal}
                        onChange={(e) => handleRoleColorChange("principal", e.target.value)}
                        className="size-10 rounded-xl border border-line cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.dashboardColors.principal}
                        onChange={(e) => handleRoleColorChange("principal", e.target.value)}
                        className="w-28 rounded-xl border border-line bg-surface px-2.5 py-1.5 font-mono text-xs font-bold text-ink uppercase"
                      />
                      <span
                        className="size-6 rounded-full shadow-inner border border-line"
                        style={{ backgroundColor: config.dashboardColors.principal }}
                      />
                    </div>
                  </div>

                  {/* 2. School Admin */}
                  <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="size-4 text-ink-muted" />
                        <span className="font-bold text-xs text-ink">School Admin Dashboard</span>
                      </div>
                      <span className="font-mono text-[10px] text-ink-muted uppercase">Operations</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.dashboardColors.admin}
                        onChange={(e) => handleRoleColorChange("admin", e.target.value)}
                        className="size-10 rounded-xl border border-line cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.dashboardColors.admin}
                        onChange={(e) => handleRoleColorChange("admin", e.target.value)}
                        className="w-28 rounded-xl border border-line bg-surface px-2.5 py-1.5 font-mono text-xs font-bold text-ink uppercase"
                      />
                      <span
                        className="size-6 rounded-full shadow-inner border border-line"
                        style={{ backgroundColor: config.dashboardColors.admin }}
                      />
                    </div>
                  </div>

                  {/* 3. Teacher */}
                  <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="size-4 text-ink-muted" />
                        <span className="font-bold text-xs text-ink">Teacher Dashboard</span>
                      </div>
                      <span className="font-mono text-[10px] text-ink-muted uppercase">Faculty</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.dashboardColors.teacher}
                        onChange={(e) => handleRoleColorChange("teacher", e.target.value)}
                        className="size-10 rounded-xl border border-line cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.dashboardColors.teacher}
                        onChange={(e) => handleRoleColorChange("teacher", e.target.value)}
                        className="w-28 rounded-xl border border-line bg-surface px-2.5 py-1.5 font-mono text-xs font-bold text-ink uppercase"
                      />
                      <span
                        className="size-6 rounded-full shadow-inner border border-line"
                        style={{ backgroundColor: config.dashboardColors.teacher }}
                      />
                    </div>
                  </div>

                  {/* 4. Bursar */}
                  <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Landmark className="size-4 text-ink-muted" />
                        <span className="font-bold text-xs text-ink">Bursar Dashboard</span>
                      </div>
                      <span className="font-mono text-[10px] text-ink-muted uppercase">Finance</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.dashboardColors.bursar}
                        onChange={(e) => handleRoleColorChange("bursar", e.target.value)}
                        className="size-10 rounded-xl border border-line cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.dashboardColors.bursar}
                        onChange={(e) => handleRoleColorChange("bursar", e.target.value)}
                        className="w-28 rounded-xl border border-line bg-surface px-2.5 py-1.5 font-mono text-xs font-bold text-ink uppercase"
                      />
                      <span
                        className="size-6 rounded-full shadow-inner border border-line"
                        style={{ backgroundColor: config.dashboardColors.bursar }}
                      />
                    </div>
                  </div>

                  {/* 5. Student */}
                  <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="size-4 text-ink-muted" />
                        <span className="font-bold text-xs text-ink">Student Portal</span>
                      </div>
                      <span className="font-mono text-[10px] text-ink-muted uppercase">Learner</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.dashboardColors.student}
                        onChange={(e) => handleRoleColorChange("student", e.target.value)}
                        className="size-10 rounded-xl border border-line cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.dashboardColors.student}
                        onChange={(e) => handleRoleColorChange("student", e.target.value)}
                        className="w-28 rounded-xl border border-line bg-surface px-2.5 py-1.5 font-mono text-xs font-bold text-ink uppercase"
                      />
                      <span
                        className="size-6 rounded-full shadow-inner border border-line"
                        style={{ backgroundColor: config.dashboardColors.student }}
                      />
                    </div>
                  </div>

                  {/* 6. Parent */}
                  <div className="rounded-2xl border border-line bg-surface-raised p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="size-4 text-ink-muted" />
                        <span className="font-bold text-xs text-ink">Parent / Guardian Portal</span>
                      </div>
                      <span className="font-mono text-[10px] text-ink-muted uppercase">Caregiver</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.dashboardColors.parent}
                        onChange={(e) => handleRoleColorChange("parent", e.target.value)}
                        className="size-10 rounded-xl border border-line cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.dashboardColors.parent}
                        onChange={(e) => handleRoleColorChange("parent", e.target.value)}
                        className="w-28 rounded-xl border border-line bg-surface px-2.5 py-1.5 font-mono text-xs font-bold text-ink uppercase"
                      />
                      <span
                        className="size-6 rounded-full shadow-inner border border-line"
                        style={{ backgroundColor: config.dashboardColors.parent }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CALENDAR & ACADEMIC YEAR */}
        {activeTab === "calendar" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm space-y-4 text-xs">
              <div className="flex items-center gap-2 border-b border-line pb-3">
                <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <Calendar className="size-4" />
                </span>
                <h3 className="text-base font-extrabold text-ink">Academic Session &amp; Term Parameters</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={config.calendar.academicYear}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        calendar: { ...prev.calendar, academicYear: e.target.value },
                      }))
                    }
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink focus:border-emerald-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Active Term</label>
                  <select
                    value={config.calendar.currentTerm}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        calendar: { ...prev.calendar, currentTerm: e.target.value },
                      }))
                    }
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-bold text-ink focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="1">Term 1 (First Term)</option>
                    <option value="2">Term 2 (Second Term - Active)</option>
                    <option value="3">Term 3 (Third Term)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Term Start Date</label>
                  <input
                    type="date"
                    value={config.calendar.termStartDate}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        calendar: { ...prev.calendar, termStartDate: e.target.value },
                      }))
                    }
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink focus:border-emerald-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink-muted mb-1">Term End Date</label>
                  <input
                    type="date"
                    value={config.calendar.termEndDate}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        calendar: { ...prev.calendar, termEndDate: e.target.value },
                      }))
                    }
                    className="w-full rounded-xl border border-line bg-surface-raised p-2.5 font-mono text-ink focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM SAVE ACTIONS BAR */}
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-bold text-sm text-ink block">Ready to apply workspace customizations?</span>
            <span className="text-xs text-ink-muted">
              Settings persist school-wide across all Teacher broadsheets, Bursary ledgers, and Parent portals.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSaveAll()}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
            >
              <Save className="size-4" />
              <span>Save &amp; Apply All Settings</span>
            </button>
          </div>
        </div>

        {/* MODAL: RESET DEFAULTS CONFIRMATION */}
        {resetModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-6 shadow-2xl space-y-4">
              <div className="flex items-center gap-2.5 text-ink">
                <RotateCcw className="size-5 text-amber-600" />
                <h3 className="text-base font-extrabold">Reset Workspace to Defaults?</h3>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                This will reset the school theme to <strong>Modern Campus</strong>, reinstate default Riverside International College branding, and restore standard role dashboard colors.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
                <button
                  type="button"
                  onClick={() => setResetModalOpen(false)}
                  className="rounded-xl border border-line px-4 py-2 font-mono text-xs font-semibold text-ink-muted hover:bg-surface-raised"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="rounded-xl bg-rose-600 px-4 py-2 font-mono text-xs font-bold text-white shadow-sm hover:bg-rose-700 active:scale-95 transition-all"
                >
                  Reset Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
