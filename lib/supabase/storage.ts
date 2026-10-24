import { createClient } from '@/lib/supabase/server';

/**
 * Storage bucket names used throughout the application.
 */
export const STORAGE_BUCKETS = {
  SCHOOL_ASSETS: 'school-assets',
  STUDENT_DOCUMENTS: 'student-documents',
  STAFF_DOCUMENTS: 'staff-documents',
  PROFILE_PHOTOS: 'profile-photos',
  REPORT_CARDS: 'report-cards',
  FINANCIAL_DOCUMENTS: 'financial-documents',
  EXPORTS: 'exports',
  ADMISSION_DOCUMENTS: 'admission-documents',
  ANNOUNCEMENT_ATTACHMENTS: 'announcement-attachments',
} as const;

export type StorageBucket = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];

/**
 * Allowed MIME types per bucket for client-side validation.
 */
export const BUCKET_MIME_TYPES: Record<StorageBucket, string[]> = {
  [STORAGE_BUCKETS.SCHOOL_ASSETS]: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  [STORAGE_BUCKETS.STUDENT_DOCUMENTS]: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  [STORAGE_BUCKETS.STAFF_DOCUMENTS]: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  [STORAGE_BUCKETS.PROFILE_PHOTOS]: ['image/jpeg', 'image/png', 'image/webp'],
  [STORAGE_BUCKETS.REPORT_CARDS]: ['application/pdf'],
  [STORAGE_BUCKETS.FINANCIAL_DOCUMENTS]: ['application/pdf', 'image/jpeg', 'image/png'],
  [STORAGE_BUCKETS.EXPORTS]: ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf'],
  [STORAGE_BUCKETS.ADMISSION_DOCUMENTS]: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  [STORAGE_BUCKETS.ANNOUNCEMENT_ATTACHMENTS]: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

/**
 * Max file sizes per bucket in bytes.
 */
export const BUCKET_SIZE_LIMITS: Record<StorageBucket, number> = {
  [STORAGE_BUCKETS.SCHOOL_ASSETS]: 5 * 1024 * 1024,        // 5MB
  [STORAGE_BUCKETS.STUDENT_DOCUMENTS]: 10 * 1024 * 1024,    // 10MB
  [STORAGE_BUCKETS.STAFF_DOCUMENTS]: 10 * 1024 * 1024,      // 10MB
  [STORAGE_BUCKETS.PROFILE_PHOTOS]: 2 * 1024 * 1024,        // 2MB
  [STORAGE_BUCKETS.REPORT_CARDS]: 20 * 1024 * 1024,         // 20MB
  [STORAGE_BUCKETS.FINANCIAL_DOCUMENTS]: 10 * 1024 * 1024,   // 10MB
  [STORAGE_BUCKETS.EXPORTS]: 50 * 1024 * 1024,              // 50MB
  [STORAGE_BUCKETS.ADMISSION_DOCUMENTS]: 10 * 1024 * 1024,   // 10MB
  [STORAGE_BUCKETS.ANNOUNCEMENT_ATTACHMENTS]: 10 * 1024 * 1024, // 10MB
};

/**
 * Generates a safe, unique storage path for a file within a school's folder.
 * Format: {school_id}/{entity_type}/{timestamp}_{safe_filename}
 */
export function generateStoragePath(
  schoolId: string,
  entityType: string,
  originalFilename: string
): string {
  // Sanitize the filename: remove path traversal and special characters
  const safeName = originalFilename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/\.{2,}/g, '.')
    .toLowerCase();

  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);

  return `${schoolId}/${entityType}/${timestamp}_${randomSuffix}_${safeName}`;
}

/**
 * Validates a file before upload.
 */
export function validateFile(
  file: File,
  bucket: StorageBucket
): { valid: boolean; error?: string } {
  const allowedTypes = BUCKET_MIME_TYPES[bucket];
  const maxSize = BUCKET_SIZE_LIMITS[bucket];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type "${file.type}" is not allowed. Accepted: ${allowedTypes.join(', ')}`,
    };
  }

  if (file.size > maxSize) {
    const maxMB = Math.round(maxSize / (1024 * 1024));
    return {
      valid: false,
      error: `File size exceeds ${maxMB}MB limit.`,
    };
  }

  return { valid: true };
}

/**
 * Uploads a file to a Supabase Storage bucket (server-side).
 * Returns the storage path on success.
 */
export async function uploadFile(
  bucket: StorageBucket,
  storagePath: string,
  file: File | Buffer,
  contentType: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, file, {
      contentType,
      upsert: false,
    });

  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`);
  }

  return data.path;
}

/**
 * Generates a short-lived signed URL for private file access.
 * Default expiry: 1 hour (3600 seconds).
 */
export async function getSignedUrl(
  bucket: StorageBucket,
  storagePath: string,
  expiresIn: number = 3600
) {
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(storagePath, expiresIn);

  if (error) {
    throw new Error(`Failed to generate signed URL: ${error.message}`);
  }

  return data.signedUrl;
}

/**
 * Gets the public URL for files in public buckets (e.g., school-assets).
 */
export async function getPublicUrl(
  bucket: StorageBucket,
  storagePath: string
) {
  const supabase = await createClient();

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(storagePath);

  return data.publicUrl;
}

/**
 * Deletes a file from storage.
 */
export async function deleteFile(
  bucket: StorageBucket,
  storagePath: string
) {
  const supabase = await createClient();

  const { error } = await supabase.storage
    .from(bucket)
    .remove([storagePath]);

  if (error) {
    throw new Error(`Storage delete failed: ${error.message}`);
  }
}
