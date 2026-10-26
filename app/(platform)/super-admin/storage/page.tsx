import type { Metadata } from "next";
import { Download, FileText, HardDrive, Lock, Trash2 } from "lucide-react";
import { Card, KpiCard, PageHeader, Pill } from "@/components/platform/ui";
import { formatNumber } from "@/lib/platform";

export const metadata: Metadata = { title: "Storage & Data" };

const ghostButton =
  "inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-5 text-sm font-bold text-ink hover:bg-surface-raised transition-all shadow-xs";

type FileCategory = "report-card" | "export" | "document" | "avatar" | "backup";

const categoryMeta: Record<FileCategory, { label: string; tone: "neutral" | "muted" | "positive" | "warning" }> = {
  "report-card": { label: "Report card", tone: "neutral" },
  export:        { label: "Export",       tone: "warning" as "neutral" },
  document:      { label: "Document",     tone: "muted" },
  avatar:        { label: "Avatar",       tone: "muted" },
  backup:        { label: "Backup",       tone: "positive" },
};

type StoredFileRecord = {
  id: string;
  name: string;
  school: string;
  category: FileCategory;
  sizeMb: number;
  uploadedAt: string;
  expiresAt: string | null;
};

const files: StoredFileRecord[] = [
  { id: "sf-001", name: "Term2_ReportCards_Greenfield.zip",    school: "Greenfield Academy",   category: "report-card", sizeMb: 12.4, uploadedAt: "22 Oct 2026", expiresAt: null },
  { id: "sf-002", name: "StudentExport_Horizon_Oct2026.csv",   school: "Horizon International",category: "export",      sizeMb: 2.1,  uploadedAt: "21 Oct 2026", expiresAt: "28 Oct 2026" },
  { id: "sf-003", name: "AdmissionDocs_AlNoor_2026.zip",       school: "Al-Noor Academy",      category: "document",    sizeMb: 8.7,  uploadedAt: "20 Oct 2026", expiresAt: null },
  { id: "sf-004", name: "FeeReceipts_Pinnacle_Oct2026.zip",    school: "Pinnacle Academy",     category: "export",      sizeMb: 1.4,  uploadedAt: "20 Oct 2026", expiresAt: "27 Oct 2026" },
  { id: "sf-005", name: "PlatformBackup_2026-10-22.tar.gz",    school: "Platform",             category: "backup",      sizeMb: 1840, uploadedAt: "22 Oct 2026", expiresAt: null },
  { id: "sf-006", name: "StaffProfiles_Meridian.zip",          school: "Meridian Schools",     category: "document",    sizeMb: 3.2,  uploadedAt: "18 Oct 2026", expiresAt: null },
];

const bucketBreakdown = [
  { name: "report-cards",   used: 8.4,  total: 50 },
  { name: "exports",        used: 3.5,  total: 20 },
  { name: "documents",      used: 11.9, total: 100 },
  { name: "avatars",        used: 0.8,  total: 5 },
  { name: "backups",        used: 17.5, total: 200 },
];

const totalUsed = bucketBreakdown.reduce((acc, b) => acc + b.used, 0);

export default function StoragePage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform Operations"
        title="Storage & data."
        description="Supabase Storage usage, private file metadata, retention policies and storage diagnostics."
        actions={
          <button type="button" className={ghostButton}>
            <Download className="size-4" aria-hidden="true" />
            Export manifest
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Total used"
          value={`${totalUsed.toFixed(1)} GB`}
          hint="across all buckets"
          icon={<HardDrive className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Files stored"
          value={formatNumber(files.length)}
          hint="private objects only"
          icon={<FileText className="size-5" aria-hidden="true" />}
        />
        <KpiCard
          label="Expiring (7d)"
          value={formatNumber(files.filter((f) => f.expiresAt).length)}
          hint="signed URL exports"
          icon={<Trash2 className="size-5" aria-hidden="true" />}
        />
      </div>

      {/* Bucket usage */}
      <div className="mt-8">
        <Card title="Bucket breakdown" description="Storage consumption by bucket across all tenants.">
          <ul className="space-y-4">
            {bucketBreakdown.map((bucket) => {
              const pct = Math.min(100, (bucket.used / bucket.total) * 100);
              return (
                <li key={bucket.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono text-xs sm:text-sm font-bold text-ink">{bucket.name}</span>
                    <span className="font-mono text-xs sm:text-sm font-semibold text-ink-muted">
                      <strong className="text-ink font-bold">{bucket.used} GB</strong> / {bucket.total} GB
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-sand">
                    <div
                      className={`h-full rounded-full transition-all ${pct > 80 ? "bg-vermilion" : "bg-pine"}`}
                      style={{ width: `${pct}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      {/* File table */}
      <div className="mt-8">
        <Card title="Stored files" description="Private Supabase Storage objects. Access via signed URLs only.">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line bg-surface-raised/60">
                  {["File", "School", "Type", "Size", "Uploaded", "Expires", ""].map((h) => (
                    <th key={h} className="py-4 px-6 font-sans text-xs font-bold uppercase tracking-wider text-slate-700 last:text-right">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-sand/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Lock className="size-4 shrink-0 text-ink-muted" aria-hidden="true" />
                        <span className="text-sm sm:text-base font-bold text-ink">{file.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm font-bold text-ink-soft">{file.school}</td>
                    <td className="py-4 px-6">
                      <Pill tone={categoryMeta[file.category].tone}>
                        {categoryMeta[file.category].label}
                      </Pill>
                    </td>
                    <td className="py-4 px-6 font-mono text-xs font-bold text-ink">{file.sizeMb} MB</td>
                    <td className="py-4 px-6 text-sm font-medium text-ink-muted">{file.uploadedAt}</td>
                    <td className="py-4 px-6 text-sm font-medium text-ink-muted">{file.expiresAt ?? "No expiry"}</td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        className="rounded-xl border border-line bg-surface px-4 py-2 text-xs font-bold text-ink hover:bg-surface-raised transition-colors shadow-xs"
                      >
                        Signed URL
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-surface-raised/40 p-6 shadow-xs">
        <div className="flex items-start gap-3.5">
          <Lock className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="text-sm sm:text-base font-bold text-ink">Storage security policy</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              All objects are stored in private Supabase Storage buckets. Direct public URLs are
              disabled. Access is granted only through short-lived signed URLs generated after
              server-side authorization. File type and size are validated at upload. Tenant
              ownership is verified before any URL is issued.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
