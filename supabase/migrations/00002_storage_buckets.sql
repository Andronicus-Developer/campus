-- ============================================================================
-- Campus360 — Supabase Storage Buckets Setup
-- ============================================================================
-- Run this in the Supabase SQL Editor to create all required storage buckets.
-- All buckets are PRIVATE by default — files are served via signed URLs.
-- ============================================================================

-- 1. School Logos & Branding
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'school-assets',
  'school-assets',
  TRUE,  -- logos can be public
  5242880,  -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
);

-- 2. Student Documents (admission forms, certificates, etc.)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'student-documents',
  'student-documents',
  FALSE,
  10485760,  -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
);

-- 3. Staff Documents (contracts, qualifications, etc.)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'staff-documents',
  'staff-documents',
  FALSE,
  10485760,  -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
);

-- 4. Profile Photos (avatars for users, students, staff)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-photos',
  'profile-photos',
  FALSE,
  2097152,  -- 2MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- 5. Report Cards (generated PDF report cards)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'report-cards',
  'report-cards',
  FALSE,
  20971520,  -- 20MB
  ARRAY['application/pdf']
);

-- 6. Receipts & Financial Documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'financial-documents',
  'financial-documents',
  FALSE,
  10485760,  -- 10MB
  ARRAY['application/pdf', 'image/jpeg', 'image/png']
);

-- 7. Exports (CSV, Excel data exports)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'exports',
  'exports',
  FALSE,
  52428800,  -- 50MB
  ARRAY['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf']
);

-- 8. Admission Documents (supporting docs for applications)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'admission-documents',
  'admission-documents',
  FALSE,
  10485760,  -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
);

-- 9. Announcements & Communication Attachments
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'announcement-attachments',
  'announcement-attachments',
  FALSE,
  10485760,  -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'application/msword',
         'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- ============================================================================
-- STORAGE POLICIES
-- ============================================================================

-- ── School Assets (public read, admin write) ──

CREATE POLICY "Anyone can view school assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'school-assets');

CREATE POLICY "School members can upload school assets"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'school-assets'
    AND auth.uid() IS NOT NULL
  );

-- ── Private bucket policies pattern ──
-- Members can read files from their school's folder.
-- Storage paths follow: {school_id}/{entity_type}/{filename}

CREATE POLICY "Members can view student documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'student-documents'
    AND auth.uid() IS NOT NULL
    AND public.has_school_membership((storage.foldername(name))[1]::UUID)
  );

CREATE POLICY "Members can upload student documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'student-documents'
    AND auth.uid() IS NOT NULL
    AND public.has_school_membership((storage.foldername(name))[1]::UUID)
  );

CREATE POLICY "Members can view staff documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'staff-documents'
    AND auth.uid() IS NOT NULL
    AND public.has_school_membership((storage.foldername(name))[1]::UUID)
  );

CREATE POLICY "Members can upload staff documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'staff-documents'
    AND auth.uid() IS NOT NULL
    AND public.has_school_membership((storage.foldername(name))[1]::UUID)
  );

CREATE POLICY "Users can view own profile photo"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'profile-photos'
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can upload own profile photo"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profile-photos'
    AND auth.uid() IS NOT NULL
    AND (storage.foldername(name))[1] = auth.uid()::TEXT
  );

CREATE POLICY "Members can view report cards"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'report-cards'
    AND auth.uid() IS NOT NULL
    AND public.has_school_membership((storage.foldername(name))[1]::UUID)
  );

CREATE POLICY "Members can upload report cards"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'report-cards'
    AND auth.uid() IS NOT NULL
    AND public.has_school_membership((storage.foldername(name))[1]::UUID)
  );

CREATE POLICY "Members can view financial documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'financial-documents'
    AND auth.uid() IS NOT NULL
    AND public.has_school_membership((storage.foldername(name))[1]::UUID)
  );

CREATE POLICY "Members can upload financial documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'financial-documents'
    AND auth.uid() IS NOT NULL
    AND public.has_school_membership((storage.foldername(name))[1]::UUID)
  );

CREATE POLICY "Members can view exports"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'exports'
    AND auth.uid() IS NOT NULL
    AND public.has_school_membership((storage.foldername(name))[1]::UUID)
  );

CREATE POLICY "Members can upload exports"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'exports'
    AND auth.uid() IS NOT NULL
    AND public.has_school_membership((storage.foldername(name))[1]::UUID)
  );

CREATE POLICY "Members can view admission documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'admission-documents'
    AND auth.uid() IS NOT NULL
    AND public.has_school_membership((storage.foldername(name))[1]::UUID)
  );

CREATE POLICY "Members can upload admission documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'admission-documents'
    AND auth.uid() IS NOT NULL
    AND public.has_school_membership((storage.foldername(name))[1]::UUID)
  );

CREATE POLICY "Members can view announcement attachments"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'announcement-attachments'
    AND auth.uid() IS NOT NULL
    AND public.has_school_membership((storage.foldername(name))[1]::UUID)
  );

CREATE POLICY "Members can upload announcement attachments"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'announcement-attachments'
    AND auth.uid() IS NOT NULL
    AND public.has_school_membership((storage.foldername(name))[1]::UUID)
  );
