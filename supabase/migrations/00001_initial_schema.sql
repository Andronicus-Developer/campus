-- ============================================================================
-- Campus360 — Initial Database Migration
-- ============================================================================
-- This migration creates all tables for the Campus360 SaaS School Management
-- System. Run this in Supabase SQL Editor or via supabase migration.
--
-- Key design decisions:
--   • All tenant-owned tables have school_id with FK + index
--   • Money stored as INTEGER (minor units, e.g. kobo/cents) + currency code
--   • Timestamps in UTC; timezone rendering in application layer
--   • Soft-delete via status fields; academic/financial records are never deleted
--   • UUID primary keys throughout
--   • RLS enabled on all tables
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE school_status AS ENUM (
  'pending', 'trial', 'active', 'suspended', 'closed'
);

CREATE TYPE membership_status AS ENUM (
  'active', 'inactive', 'suspended', 'revoked'
);

CREATE TYPE student_status AS ENUM (
  'active', 'graduated', 'transferred', 'withdrawn', 'archived', 'suspended'
);

CREATE TYPE admission_status AS ENUM (
  'draft', 'submitted', 'under_review', 'accepted', 'rejected', 'waitlisted', 'enrolled', 'withdrawn'
);

CREATE TYPE enrollment_status AS ENUM (
  'active', 'completed', 'transferred', 'withdrawn', 'repeated'
);

CREATE TYPE attendance_value AS ENUM (
  'present', 'absent', 'late', 'excused'
);

CREATE TYPE assessment_state AS ENUM (
  'draft', 'submitted', 'approved', 'published'
);

CREATE TYPE invoice_status AS ENUM (
  'draft', 'issued', 'partially_paid', 'paid', 'overdue', 'cancelled', 'refunded'
);

CREATE TYPE payment_status AS ENUM (
  'pending', 'successful', 'failed', 'reversed', 'refunded'
);

CREATE TYPE refund_status AS ENUM (
  'pending', 'processed', 'failed'
);

CREATE TYPE webhook_event_status AS ENUM (
  'pending', 'processing', 'processed', 'failed', 'ignored'
);

CREATE TYPE announcement_target AS ENUM (
  'school', 'class', 'staff', 'parents', 'students', 'individual'
);

CREATE TYPE notification_status AS ENUM (
  'pending', 'sent', 'delivered', 'failed', 'bounced'
);

CREATE TYPE subscription_status AS ENUM (
  'trialing', 'active', 'past_due', 'cancelled', 'expired'
);

CREATE TYPE billing_event_type AS ENUM (
  'invoice_created', 'payment_succeeded', 'payment_failed', 'subscription_updated',
  'subscription_cancelled', 'refund_issued', 'trial_started', 'trial_ended'
);

CREATE TYPE gender_type AS ENUM (
  'male', 'female', 'other', 'prefer_not_to_say'
);

CREATE TYPE guardian_relationship AS ENUM (
  'father', 'mother', 'guardian', 'sibling', 'uncle', 'aunt', 'grandparent', 'other'
);

CREATE TYPE staff_employment_status AS ENUM (
  'active', 'on_leave', 'suspended', 'terminated', 'resigned', 'retired'
);

CREATE TYPE day_of_week AS ENUM (
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
);

CREATE TYPE report_card_status AS ENUM (
  'draft', 'generated', 'approved', 'published'
);

-- ============================================================================
-- 1. PROFILES (extends Supabase Auth users)
-- ============================================================================

CREATE TABLE profiles (
  id             UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email          TEXT NOT NULL,
  full_name      TEXT NOT NULL DEFAULT '',
  avatar_url     TEXT,
  phone          TEXT,
  is_platform_admin BOOLEAN NOT NULL DEFAULT FALSE,
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_profiles_email ON profiles(email);

COMMENT ON TABLE profiles IS 'Global user profile extending Supabase Auth. Not tenant-specific.';

-- ============================================================================
-- 2. SCHOOLS (tenants)
-- ============================================================================

CREATE TABLE schools (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  slug           TEXT NOT NULL UNIQUE,
  code           TEXT UNIQUE,
  logo_url       TEXT,
  email          TEXT,
  phone          TEXT,
  website        TEXT,
  address        TEXT,
  city           TEXT,
  state_province TEXT,
  country        TEXT NOT NULL DEFAULT 'NG',
  timezone       TEXT NOT NULL DEFAULT 'Africa/Lagos',
  locale         TEXT NOT NULL DEFAULT 'en',
  currency       TEXT NOT NULL DEFAULT 'NGN',
  status         school_status NOT NULL DEFAULT 'pending',
  settings       JSONB NOT NULL DEFAULT '{}',
  motto          TEXT,
  established_year INTEGER,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_schools_slug ON schools(slug);
CREATE INDEX idx_schools_status ON schools(status);

COMMENT ON TABLE schools IS 'Tenant (school) profile. Every tenant-owned entity references this table.';

-- ============================================================================
-- 3. RBAC: Roles, Permissions, and Memberships
-- ============================================================================

CREATE TABLE permissions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code           TEXT NOT NULL UNIQUE,
  name           TEXT NOT NULL,
  description    TEXT,
  module         TEXT NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE permissions IS 'Global permission catalog (e.g. students.read, attendance.take).';

CREATE TABLE roles (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID REFERENCES schools(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  description    TEXT,
  is_system      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, name)
);

CREATE INDEX idx_roles_school ON roles(school_id);

COMMENT ON TABLE roles IS 'School-scoped roles. is_system=true for platform-defined roles.';

CREATE TABLE role_permissions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id        UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id  UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(role_id, permission_id)
);

CREATE TABLE school_memberships (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id        UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status         membership_status NOT NULL DEFAULT 'active',
  joined_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, user_id)
);

CREATE INDEX idx_memberships_school ON school_memberships(school_id);
CREATE INDEX idx_memberships_user ON school_memberships(user_id);
CREATE INDEX idx_memberships_status ON school_memberships(status);

COMMENT ON TABLE school_memberships IS 'Links users to schools. Every tenant-scoped action requires an active membership.';

CREATE TABLE membership_roles (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id  UUID NOT NULL REFERENCES school_memberships(id) ON DELETE CASCADE,
  role_id        UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  assigned_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  assigned_by    UUID REFERENCES profiles(id),
  UNIQUE(membership_id, role_id)
);

CREATE INDEX idx_membership_roles_membership ON membership_roles(membership_id);

-- ============================================================================
-- 4. ACADEMIC CALENDAR
-- ============================================================================

CREATE TABLE academic_years (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  start_date     DATE NOT NULL,
  end_date       DATE NOT NULL,
  is_current     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, name),
  CHECK (end_date > start_date)
);

CREATE INDEX idx_academic_years_school ON academic_years(school_id);
CREATE INDEX idx_academic_years_current ON academic_years(school_id, is_current) WHERE is_current = TRUE;

CREATE TABLE terms (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  start_date     DATE NOT NULL,
  end_date       DATE NOT NULL,
  is_current     BOOLEAN NOT NULL DEFAULT FALSE,
  sequence       INTEGER NOT NULL DEFAULT 1,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(academic_year_id, name),
  CHECK (end_date > start_date)
);

CREATE INDEX idx_terms_school ON terms(school_id);
CREATE INDEX idx_terms_academic_year ON terms(academic_year_id);

-- ============================================================================
-- 5. CLASS GROUPS, SUBJECTS, AND TEACHING
-- ============================================================================

CREATE TABLE class_groups (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  level          INTEGER,
  stream         TEXT,
  capacity       INTEGER,
  class_teacher_id UUID REFERENCES profiles(id),
  academic_year_id UUID REFERENCES academic_years(id),
  room           TEXT,
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, name, academic_year_id)
);

CREATE INDEX idx_class_groups_school ON class_groups(school_id);
CREATE INDEX idx_class_groups_year ON class_groups(academic_year_id);

CREATE TABLE subjects (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  code           TEXT,
  description    TEXT,
  is_elective    BOOLEAN NOT NULL DEFAULT FALSE,
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, name)
);

CREATE INDEX idx_subjects_school ON subjects(school_id);

CREATE TABLE teaching_assignments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  teacher_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  class_group_id UUID NOT NULL REFERENCES class_groups(id) ON DELETE CASCADE,
  subject_id     UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  academic_year_id UUID REFERENCES academic_years(id),
  term_id        UUID REFERENCES terms(id),
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, teacher_id, class_group_id, subject_id, academic_year_id)
);

CREATE INDEX idx_teaching_assignments_school ON teaching_assignments(school_id);
CREATE INDEX idx_teaching_assignments_teacher ON teaching_assignments(teacher_id);
CREATE INDEX idx_teaching_assignments_class ON teaching_assignments(class_group_id);

-- ============================================================================
-- 6. TIMETABLE
-- ============================================================================

CREATE TABLE timetable_periods (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  start_time     TIME NOT NULL,
  end_time       TIME NOT NULL,
  sequence       INTEGER NOT NULL,
  is_break       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, name),
  CHECK (end_time > start_time)
);

CREATE INDEX idx_timetable_periods_school ON timetable_periods(school_id);

CREATE TABLE timetable_slots (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  class_group_id UUID NOT NULL REFERENCES class_groups(id) ON DELETE CASCADE,
  subject_id     UUID REFERENCES subjects(id) ON DELETE SET NULL,
  teacher_id     UUID REFERENCES profiles(id) ON DELETE SET NULL,
  period_id      UUID NOT NULL REFERENCES timetable_periods(id) ON DELETE CASCADE,
  day_of_week    day_of_week NOT NULL,
  room           TEXT,
  academic_year_id UUID REFERENCES academic_years(id),
  term_id        UUID REFERENCES terms(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, class_group_id, period_id, day_of_week, academic_year_id)
);

CREATE INDEX idx_timetable_slots_school ON timetable_slots(school_id);
CREATE INDEX idx_timetable_slots_class ON timetable_slots(class_group_id);
CREATE INDEX idx_timetable_slots_teacher ON timetable_slots(teacher_id);

-- ============================================================================
-- 7. STUDENTS AND GUARDIANS
-- ============================================================================

CREATE TABLE students (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id        UUID REFERENCES profiles(id),
  student_number TEXT NOT NULL,
  first_name     TEXT NOT NULL,
  last_name      TEXT NOT NULL,
  other_names    TEXT,
  date_of_birth  DATE,
  gender         gender_type,
  blood_group    TEXT,
  nationality    TEXT,
  state_of_origin TEXT,
  address        TEXT,
  photo_url      TEXT,
  status         student_status NOT NULL DEFAULT 'active',
  admission_date DATE,
  current_class_id UUID REFERENCES class_groups(id),
  medical_info   JSONB DEFAULT '{}',
  emergency_contact JSONB DEFAULT '{}',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, student_number)
);

CREATE INDEX idx_students_school ON students(school_id);
CREATE INDEX idx_students_status ON students(school_id, status);
CREATE INDEX idx_students_class ON students(current_class_id);
CREATE INDEX idx_students_user ON students(user_id);

CREATE TABLE guardians (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id        UUID REFERENCES profiles(id),
  first_name     TEXT NOT NULL,
  last_name      TEXT NOT NULL,
  email          TEXT,
  phone          TEXT NOT NULL,
  phone_alt      TEXT,
  address        TEXT,
  occupation     TEXT,
  employer       TEXT,
  photo_url      TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_guardians_school ON guardians(school_id);
CREATE INDEX idx_guardians_user ON guardians(user_id);

CREATE TABLE student_guardians (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id     UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  guardian_id    UUID NOT NULL REFERENCES guardians(id) ON DELETE CASCADE,
  relationship   guardian_relationship NOT NULL DEFAULT 'guardian',
  is_primary     BOOLEAN NOT NULL DEFAULT FALSE,
  is_emergency   BOOLEAN NOT NULL DEFAULT FALSE,
  can_pickup     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, guardian_id)
);

CREATE INDEX idx_student_guardians_student ON student_guardians(student_id);
CREATE INDEX idx_student_guardians_guardian ON student_guardians(guardian_id);

-- ============================================================================
-- 8. ADMISSIONS AND ENROLLMENTS
-- ============================================================================

CREATE TABLE admission_applications (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id),
  application_number TEXT NOT NULL,
  first_name     TEXT NOT NULL,
  last_name      TEXT NOT NULL,
  other_names    TEXT,
  date_of_birth  DATE,
  gender         gender_type,
  previous_school TEXT,
  class_applied  UUID REFERENCES class_groups(id),
  guardian_name  TEXT NOT NULL,
  guardian_email TEXT,
  guardian_phone TEXT NOT NULL,
  guardian_relationship guardian_relationship DEFAULT 'guardian',
  guardian_address TEXT,
  status         admission_status NOT NULL DEFAULT 'draft',
  documents      JSONB DEFAULT '[]',
  notes          TEXT,
  reviewed_by    UUID REFERENCES profiles(id),
  reviewed_at    TIMESTAMPTZ,
  converted_student_id UUID REFERENCES students(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, application_number)
);

CREATE INDEX idx_admissions_school ON admission_applications(school_id);
CREATE INDEX idx_admissions_status ON admission_applications(school_id, status);
CREATE INDEX idx_admissions_year ON admission_applications(academic_year_id);

CREATE TABLE enrollments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id     UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id),
  class_group_id UUID NOT NULL REFERENCES class_groups(id),
  term_id        UUID REFERENCES terms(id),
  status         enrollment_status NOT NULL DEFAULT 'active',
  enrolled_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at   TIMESTAMPTZ,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, academic_year_id, class_group_id)
);

CREATE INDEX idx_enrollments_school ON enrollments(school_id);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_class ON enrollments(class_group_id);
CREATE INDEX idx_enrollments_year ON enrollments(academic_year_id);

-- ============================================================================
-- 9. STAFF PROFILES
-- ============================================================================

CREATE TABLE staff_profiles (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  user_id        UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  staff_number   TEXT NOT NULL,
  department     TEXT,
  designation    TEXT,
  qualification  TEXT,
  date_of_hire   DATE,
  employment_status staff_employment_status NOT NULL DEFAULT 'active',
  salary_grade   TEXT,
  bank_name      TEXT,
  bank_account   TEXT,
  tax_id         TEXT,
  emergency_contact JSONB DEFAULT '{}',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, staff_number),
  UNIQUE(school_id, user_id)
);

CREATE INDEX idx_staff_school ON staff_profiles(school_id);
CREATE INDEX idx_staff_user ON staff_profiles(user_id);
CREATE INDEX idx_staff_status ON staff_profiles(school_id, employment_status);

-- ============================================================================
-- 10. ATTENDANCE
-- ============================================================================

CREATE TABLE attendance_sessions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  class_group_id UUID NOT NULL REFERENCES class_groups(id) ON DELETE CASCADE,
  term_id        UUID NOT NULL REFERENCES terms(id),
  date           DATE NOT NULL,
  session_name   TEXT NOT NULL DEFAULT 'morning',
  taken_by       UUID NOT NULL REFERENCES profiles(id),
  is_locked      BOOLEAN NOT NULL DEFAULT FALSE,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, class_group_id, date, session_name)
);

CREATE INDEX idx_attendance_sessions_school ON attendance_sessions(school_id);
CREATE INDEX idx_attendance_sessions_class ON attendance_sessions(class_group_id);
CREATE INDEX idx_attendance_sessions_date ON attendance_sessions(school_id, date);

CREATE TABLE attendance_records (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id     UUID NOT NULL REFERENCES attendance_sessions(id) ON DELETE CASCADE,
  student_id     UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  status         attendance_value NOT NULL DEFAULT 'present',
  remarks        TEXT,
  recorded_by    UUID NOT NULL REFERENCES profiles(id),
  corrected_by   UUID REFERENCES profiles(id),
  correction_reason TEXT,
  previous_status attendance_value,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(session_id, student_id)
);

CREATE INDEX idx_attendance_records_session ON attendance_records(session_id);
CREATE INDEX idx_attendance_records_student ON attendance_records(student_id);

-- ============================================================================
-- 11. GRADING AND ASSESSMENTS
-- ============================================================================

CREATE TABLE grade_scales (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  is_default     BOOLEAN NOT NULL DEFAULT FALSE,
  bands          JSONB NOT NULL DEFAULT '[]',
  -- bands format: [{ "grade": "A", "label": "Excellent", "min_score": 70, "max_score": 100, "gpa": 4.0 }]
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, name)
);

CREATE INDEX idx_grade_scales_school ON grade_scales(school_id);

CREATE TABLE assessments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  class_group_id UUID NOT NULL REFERENCES class_groups(id) ON DELETE CASCADE,
  subject_id     UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  term_id        UUID NOT NULL REFERENCES terms(id),
  academic_year_id UUID NOT NULL REFERENCES academic_years(id),
  name           TEXT NOT NULL,
  category       TEXT NOT NULL,  -- e.g. 'exam', 'test', 'assignment', 'project', 'ca1', 'ca2'
  max_score      NUMERIC(6,2) NOT NULL,
  weight         NUMERIC(5,2) NOT NULL DEFAULT 100,
  state          assessment_state NOT NULL DEFAULT 'draft',
  grade_scale_id UUID REFERENCES grade_scales(id),
  due_date       DATE,
  submitted_by   UUID REFERENCES profiles(id),
  submitted_at   TIMESTAMPTZ,
  approved_by    UUID REFERENCES profiles(id),
  approved_at    TIMESTAMPTZ,
  published_by   UUID REFERENCES profiles(id),
  published_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_assessments_school ON assessments(school_id);
CREATE INDEX idx_assessments_class ON assessments(class_group_id);
CREATE INDEX idx_assessments_subject ON assessments(subject_id);
CREATE INDEX idx_assessments_term ON assessments(term_id);
CREATE INDEX idx_assessments_state ON assessments(school_id, state);

CREATE TABLE assessment_scores (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id  UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  student_id     UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  score          NUMERIC(6,2),
  is_absent      BOOLEAN NOT NULL DEFAULT FALSE,
  is_exempt      BOOLEAN NOT NULL DEFAULT FALSE,
  remarks        TEXT,
  entered_by     UUID NOT NULL REFERENCES profiles(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(assessment_id, student_id),
  CHECK (
    (is_absent = TRUE AND score IS NULL) OR
    (is_exempt = TRUE AND score IS NULL) OR
    (is_absent = FALSE AND is_exempt = FALSE AND score IS NOT NULL AND score >= 0)
  )
);

CREATE INDEX idx_scores_assessment ON assessment_scores(assessment_id);
CREATE INDEX idx_scores_student ON assessment_scores(student_id);

-- ============================================================================
-- 12. REPORT CARDS
-- ============================================================================

CREATE TABLE report_cards (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id     UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id),
  term_id        UUID NOT NULL REFERENCES terms(id),
  class_group_id UUID NOT NULL REFERENCES class_groups(id),
  status         report_card_status NOT NULL DEFAULT 'draft',
  data           JSONB NOT NULL DEFAULT '{}',
  file_url       TEXT,
  class_teacher_remarks TEXT,
  principal_remarks TEXT,
  generated_at   TIMESTAMPTZ,
  approved_by    UUID REFERENCES profiles(id),
  approved_at    TIMESTAMPTZ,
  published_by   UUID REFERENCES profiles(id),
  published_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, academic_year_id, term_id)
);

CREATE INDEX idx_report_cards_school ON report_cards(school_id);
CREATE INDEX idx_report_cards_student ON report_cards(student_id);
CREATE INDEX idx_report_cards_term ON report_cards(term_id);
CREATE INDEX idx_report_cards_status ON report_cards(school_id, status);

CREATE TABLE report_card_publications (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_card_id UUID NOT NULL REFERENCES report_cards(id) ON DELETE CASCADE,
  published_by   UUID NOT NULL REFERENCES profiles(id),
  published_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  file_url       TEXT,
  version        INTEGER NOT NULL DEFAULT 1,
  notes          TEXT
);

CREATE INDEX idx_report_publications_card ON report_card_publications(report_card_id);

-- ============================================================================
-- 13. FEES AND INVOICING
-- ============================================================================

CREATE TABLE fee_structures (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id),
  term_id        UUID REFERENCES terms(id),
  name           TEXT NOT NULL,
  description    TEXT,
  class_group_id UUID REFERENCES class_groups(id),
  amount         INTEGER NOT NULL,  -- minor units (kobo/cents)
  currency       TEXT NOT NULL DEFAULT 'NGN',
  category       TEXT NOT NULL DEFAULT 'tuition',  -- tuition, boarding, transport, uniform, books, etc.
  is_mandatory   BOOLEAN NOT NULL DEFAULT TRUE,
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (amount >= 0)
);

CREATE INDEX idx_fee_structures_school ON fee_structures(school_id);
CREATE INDEX idx_fee_structures_year ON fee_structures(academic_year_id);
CREATE INDEX idx_fee_structures_class ON fee_structures(class_group_id);

CREATE TABLE invoices (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id     UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id),
  term_id        UUID REFERENCES terms(id),
  invoice_number TEXT NOT NULL,
  total_amount   INTEGER NOT NULL,  -- minor units
  discount_amount INTEGER NOT NULL DEFAULT 0,
  paid_amount    INTEGER NOT NULL DEFAULT 0,
  balance        INTEGER NOT NULL,
  currency       TEXT NOT NULL DEFAULT 'NGN',
  status         invoice_status NOT NULL DEFAULT 'draft',
  due_date       DATE,
  notes          TEXT,
  issued_by      UUID REFERENCES profiles(id),
  issued_at      TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, invoice_number),
  CHECK (total_amount >= 0),
  CHECK (discount_amount >= 0),
  CHECK (paid_amount >= 0)
);

CREATE INDEX idx_invoices_school ON invoices(school_id);
CREATE INDEX idx_invoices_student ON invoices(student_id);
CREATE INDEX idx_invoices_status ON invoices(school_id, status);

CREATE TABLE invoice_lines (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id     UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  fee_structure_id UUID REFERENCES fee_structures(id),
  description    TEXT NOT NULL,
  amount         INTEGER NOT NULL,  -- minor units
  currency       TEXT NOT NULL DEFAULT 'NGN',
  quantity       INTEGER NOT NULL DEFAULT 1,
  discount       INTEGER NOT NULL DEFAULT 0,
  total          INTEGER NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (amount >= 0),
  CHECK (quantity > 0)
);

CREATE INDEX idx_invoice_lines_invoice ON invoice_lines(invoice_id);

-- ============================================================================
-- 14. PAYMENTS AND RECONCILIATION
-- ============================================================================

CREATE TABLE payments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  invoice_id     UUID REFERENCES invoices(id),
  student_id     UUID NOT NULL REFERENCES students(id),
  amount         INTEGER NOT NULL,  -- minor units
  currency       TEXT NOT NULL DEFAULT 'NGN',
  status         payment_status NOT NULL DEFAULT 'pending',
  payment_method TEXT,  -- card, bank_transfer, cash, paystack, etc.
  provider       TEXT,  -- paystack, manual, bank
  provider_reference TEXT,
  internal_reference TEXT NOT NULL,
  provider_metadata JSONB DEFAULT '{}',
  paid_at        TIMESTAMPTZ,
  verified_at    TIMESTAMPTZ,
  verified_by    UUID REFERENCES profiles(id),
  receipt_number TEXT,
  notes          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id, internal_reference)
);

CREATE INDEX idx_payments_school ON payments(school_id);
CREATE INDEX idx_payments_invoice ON payments(invoice_id);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(school_id, status);
CREATE INDEX idx_payments_provider_ref ON payments(provider_reference);

CREATE TABLE payment_allocations (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id     UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  invoice_id     UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  amount         INTEGER NOT NULL,
  currency       TEXT NOT NULL DEFAULT 'NGN',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (amount > 0)
);

CREATE INDEX idx_allocations_payment ON payment_allocations(payment_id);
CREATE INDEX idx_allocations_invoice ON payment_allocations(invoice_id);

CREATE TABLE refunds (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  payment_id     UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  amount         INTEGER NOT NULL,
  currency       TEXT NOT NULL DEFAULT 'NGN',
  reason         TEXT NOT NULL,
  status         refund_status NOT NULL DEFAULT 'pending',
  provider_reference TEXT,
  processed_by   UUID REFERENCES profiles(id),
  processed_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (amount > 0)
);

CREATE INDEX idx_refunds_school ON refunds(school_id);
CREATE INDEX idx_refunds_payment ON refunds(payment_id);

-- ============================================================================
-- 15. WEBHOOK EVENTS
-- ============================================================================

CREATE TABLE webhook_events (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider       TEXT NOT NULL,
  provider_event_id TEXT NOT NULL,
  event_type     TEXT NOT NULL,
  payload        JSONB NOT NULL DEFAULT '{}',
  status         webhook_event_status NOT NULL DEFAULT 'pending',
  attempts       INTEGER NOT NULL DEFAULT 0,
  last_error     TEXT,
  processed_at   TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(provider, provider_event_id)
);

CREATE INDEX idx_webhook_events_status ON webhook_events(status);
CREATE INDEX idx_webhook_events_provider ON webhook_events(provider, provider_event_id);

-- ============================================================================
-- 16. ANNOUNCEMENTS AND NOTIFICATIONS
-- ============================================================================

CREATE TABLE announcements (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title          TEXT NOT NULL,
  content        TEXT NOT NULL,
  target         announcement_target NOT NULL DEFAULT 'school',
  target_id      UUID,  -- class_group_id, user_id, etc. depending on target
  priority       TEXT NOT NULL DEFAULT 'normal',  -- low, normal, high, urgent
  is_pinned      BOOLEAN NOT NULL DEFAULT FALSE,
  published_at   TIMESTAMPTZ,
  expires_at     TIMESTAMPTZ,
  author_id      UUID NOT NULL REFERENCES profiles(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_announcements_school ON announcements(school_id);
CREATE INDEX idx_announcements_target ON announcements(school_id, target);
CREATE INDEX idx_announcements_author ON announcements(author_id);

CREATE TABLE notification_deliveries (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id UUID REFERENCES announcements(id) ON DELETE CASCADE,
  recipient_id   UUID NOT NULL REFERENCES profiles(id),
  channel        TEXT NOT NULL DEFAULT 'in_app',  -- in_app, email, sms
  status         notification_status NOT NULL DEFAULT 'pending',
  sent_at        TIMESTAMPTZ,
  read_at        TIMESTAMPTZ,
  error_message  TEXT,
  attempts       INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_recipient ON notification_deliveries(recipient_id);
CREATE INDEX idx_notifications_announcement ON notification_deliveries(announcement_id);
CREATE INDEX idx_notifications_status ON notification_deliveries(status);

-- ============================================================================
-- 17. FILE STORAGE METADATA
-- ============================================================================

CREATE TABLE stored_files (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  bucket         TEXT NOT NULL,
  storage_path   TEXT NOT NULL,
  original_name  TEXT NOT NULL,
  mime_type      TEXT NOT NULL,
  size_bytes     BIGINT NOT NULL,
  uploaded_by    UUID NOT NULL REFERENCES profiles(id),
  entity_type    TEXT,   -- e.g. 'student_document', 'report_card', 'admission', 'profile_photo'
  entity_id      UUID,   -- the related entity's ID
  is_public      BOOLEAN NOT NULL DEFAULT FALSE,
  metadata       JSONB DEFAULT '{}',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (size_bytes > 0)
);

CREATE INDEX idx_stored_files_school ON stored_files(school_id);
CREATE INDEX idx_stored_files_entity ON stored_files(entity_type, entity_id);
CREATE INDEX idx_stored_files_uploader ON stored_files(uploaded_by);

-- ============================================================================
-- 18. AUDIT LOG
-- ============================================================================

CREATE TABLE audit_logs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID REFERENCES schools(id),
  actor_id       UUID REFERENCES profiles(id),
  action         TEXT NOT NULL,
  resource_type  TEXT NOT NULL,
  resource_id    UUID,
  metadata       JSONB DEFAULT '{}',
  ip_address     INET,
  user_agent     TEXT,
  reason         TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_school ON audit_logs(school_id);
CREATE INDEX idx_audit_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at);

COMMENT ON TABLE audit_logs IS 'Immutable audit trail. Never update or delete rows.';

-- ============================================================================
-- 19. SAAS PLANS AND SUBSCRIPTIONS
-- ============================================================================

CREATE TABLE plans (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL UNIQUE,
  description    TEXT,
  price_monthly  INTEGER NOT NULL DEFAULT 0,  -- minor units
  price_yearly   INTEGER NOT NULL DEFAULT 0,  -- minor units
  currency       TEXT NOT NULL DEFAULT 'NGN',
  max_students   INTEGER,
  max_staff      INTEGER,
  max_storage_mb INTEGER,
  features       JSONB NOT NULL DEFAULT '{}',
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE subscriptions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id      UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  plan_id        UUID NOT NULL REFERENCES plans(id),
  status         subscription_status NOT NULL DEFAULT 'trialing',
  billing_cycle  TEXT NOT NULL DEFAULT 'monthly',  -- monthly, yearly
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end   TIMESTAMPTZ NOT NULL,
  trial_end      TIMESTAMPTZ,
  cancelled_at   TIMESTAMPTZ,
  provider       TEXT,  -- paystack, manual
  provider_subscription_id TEXT,
  provider_customer_id TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(school_id)
);

CREATE INDEX idx_subscriptions_school ON subscriptions(school_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_plan ON subscriptions(plan_id);

CREATE TABLE billing_events (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  event_type     billing_event_type NOT NULL,
  amount         INTEGER,
  currency       TEXT DEFAULT 'NGN',
  provider_reference TEXT,
  metadata       JSONB DEFAULT '{}',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_billing_events_subscription ON billing_events(subscription_id);

-- ============================================================================
-- 20. UPDATED_AT TRIGGER FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all relevant tables
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN
    SELECT unnest(ARRAY[
      'profiles', 'schools', 'roles', 'school_memberships',
      'academic_years', 'terms', 'class_groups', 'subjects',
      'students', 'guardians', 'admission_applications', 'enrollments',
      'staff_profiles', 'attendance_sessions', 'attendance_records',
      'grade_scales', 'assessments', 'assessment_scores',
      'report_cards', 'fee_structures', 'invoices', 'payments',
      'refunds', 'announcements', 'notification_deliveries',
      'subscriptions'
    ])
  LOOP
    EXECUTE format(
      'CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I
       FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()',
      t
    );
  END LOOP;
END;
$$;

-- ============================================================================
-- 21. HANDLE NEW USER — auto-create profile on signup
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 22. ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE teaching_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE grade_scales ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_card_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE stored_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_events ENABLE ROW LEVEL SECURITY;

-- ── Helper function: check if user has active membership in a school ──

CREATE OR REPLACE FUNCTION public.has_school_membership(p_school_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.school_memberships
    WHERE school_id = p_school_id
      AND user_id = auth.uid()
      AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ── Helper function: check if user is platform admin ──

CREATE OR REPLACE FUNCTION public.is_platform_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
      AND is_platform_admin = TRUE
      AND is_active = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ── PROFILES ──

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "Platform admins can view all profiles"
  ON profiles FOR SELECT
  USING (is_platform_admin());

-- ── SCHOOLS ──

CREATE POLICY "Members can view their schools"
  ON schools FOR SELECT
  USING (has_school_membership(id) OR is_platform_admin());

CREATE POLICY "Platform admins can manage schools"
  ON schools FOR ALL
  USING (is_platform_admin());

-- ── PERMISSIONS ──

CREATE POLICY "Anyone authenticated can view permissions"
  ON permissions FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- ── ROLES ──

CREATE POLICY "Members can view school roles"
  ON roles FOR SELECT
  USING (has_school_membership(school_id) OR is_platform_admin());

-- ── ROLE_PERMISSIONS ──

CREATE POLICY "Members can view role permissions"
  ON role_permissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM roles r
      WHERE r.id = role_permissions.role_id
        AND (has_school_membership(r.school_id) OR is_platform_admin())
    )
  );

-- ── SCHOOL MEMBERSHIPS ──

CREATE POLICY "Users can view own memberships"
  ON school_memberships FOR SELECT
  USING (user_id = auth.uid() OR has_school_membership(school_id) OR is_platform_admin());

-- ── MEMBERSHIP ROLES ──

CREATE POLICY "Members can view membership roles"
  ON membership_roles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM school_memberships sm
      WHERE sm.id = membership_roles.membership_id
        AND (sm.user_id = auth.uid() OR has_school_membership(sm.school_id) OR is_platform_admin())
    )
  );

-- ── Tenant-scoped tables: SELECT policy pattern ──
-- All school-scoped tables follow the same pattern: read access for active members

DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN
    SELECT unnest(ARRAY[
      'academic_years', 'terms', 'class_groups', 'subjects',
      'teaching_assignments', 'timetable_periods', 'timetable_slots',
      'students', 'guardians', 'admission_applications', 'enrollments',
      'staff_profiles', 'attendance_sessions', 'grade_scales',
      'assessments', 'report_cards', 'fee_structures', 'invoices',
      'payments', 'refunds', 'announcements', 'stored_files',
      'subscriptions'
    ])
  LOOP
    EXECUTE format(
      'CREATE POLICY "Members can view %1$s" ON %1$I FOR SELECT
       USING (has_school_membership(school_id) OR is_platform_admin())',
      t
    );
  END LOOP;
END;
$$;

-- ── PLANS (public read) ──

CREATE POLICY "Anyone can view active plans"
  ON plans FOR SELECT
  USING (is_active = TRUE OR is_platform_admin());

CREATE POLICY "Platform admins can manage plans"
  ON plans FOR ALL
  USING (is_platform_admin());

-- ── AUDIT LOGS ──

CREATE POLICY "Admins can view school audit logs"
  ON audit_logs FOR SELECT
  USING (has_school_membership(school_id) OR is_platform_admin());

CREATE POLICY "System can insert audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ── WEBHOOK EVENTS (service role only, no anon access) ──

CREATE POLICY "No anon access to webhook events"
  ON webhook_events FOR SELECT
  USING (is_platform_admin());

-- ── NOTIFICATION DELIVERIES ──

CREATE POLICY "Users can view own notifications"
  ON notification_deliveries FOR SELECT
  USING (recipient_id = auth.uid());

-- ── STUDENT GUARDIANS ──

CREATE POLICY "Members can view student guardians"
  ON student_guardians FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM students s
      WHERE s.id = student_guardians.student_id
        AND has_school_membership(s.school_id)
    )
    OR is_platform_admin()
  );

-- ── ATTENDANCE RECORDS ──

CREATE POLICY "Members can view attendance records"
  ON attendance_records FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM attendance_sessions a
      WHERE a.id = attendance_records.session_id
        AND has_school_membership(a.school_id)
    )
    OR is_platform_admin()
  );

-- ── ASSESSMENT SCORES ──

CREATE POLICY "Members can view assessment scores"
  ON assessment_scores FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM assessments a
      WHERE a.id = assessment_scores.assessment_id
        AND has_school_membership(a.school_id)
    )
    OR is_platform_admin()
  );

-- ── INVOICE LINES ──

CREATE POLICY "Members can view invoice lines"
  ON invoice_lines FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM invoices i
      WHERE i.id = invoice_lines.invoice_id
        AND has_school_membership(i.school_id)
    )
    OR is_platform_admin()
  );

-- ── PAYMENT ALLOCATIONS ──

CREATE POLICY "Members can view payment allocations"
  ON payment_allocations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM payments p
      WHERE p.id = payment_allocations.payment_id
        AND has_school_membership(p.school_id)
    )
    OR is_platform_admin()
  );

-- ── REPORT CARD PUBLICATIONS ──

CREATE POLICY "Members can view report card publications"
  ON report_card_publications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM report_cards rc
      WHERE rc.id = report_card_publications.report_card_id
        AND has_school_membership(rc.school_id)
    )
    OR is_platform_admin()
  );

-- ── BILLING EVENTS ──

CREATE POLICY "Members can view billing events"
  ON billing_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM subscriptions s
      WHERE s.id = billing_events.subscription_id
        AND has_school_membership(s.school_id)
    )
    OR is_platform_admin()
  );

-- ============================================================================
-- 23. SEED DEFAULT PERMISSIONS
-- ============================================================================

INSERT INTO permissions (code, name, description, module) VALUES
  -- Students
  ('students.read', 'View Students', 'View student records', 'students'),
  ('students.create', 'Create Students', 'Create student records', 'students'),
  ('students.update', 'Update Students', 'Update student records', 'students'),
  ('students.delete', 'Archive Students', 'Archive/delete student records', 'students'),
  -- Admissions
  ('admissions.read', 'View Admissions', 'View admission applications', 'admissions'),
  ('admissions.create', 'Create Admissions', 'Create admission applications', 'admissions'),
  ('admissions.update', 'Update Admissions', 'Update admission applications', 'admissions'),
  ('admissions.approve', 'Approve Admissions', 'Approve or reject admissions', 'admissions'),
  ('admissions.enroll', 'Enroll Students', 'Convert admissions to enrollment', 'admissions'),
  -- Staff
  ('staff.read', 'View Staff', 'View staff profiles', 'staff'),
  ('staff.create', 'Create Staff', 'Create staff profiles', 'staff'),
  ('staff.update', 'Update Staff', 'Update staff profiles', 'staff'),
  ('staff.manage', 'Manage Staff', 'Full staff management', 'staff'),
  -- Attendance
  ('attendance.read', 'View Attendance', 'View attendance records', 'attendance'),
  ('attendance.take', 'Take Attendance', 'Record attendance', 'attendance'),
  ('attendance.correct', 'Correct Attendance', 'Correct attendance records with reason', 'attendance'),
  -- Assessments
  ('assessments.read', 'View Assessments', 'View assessment data', 'assessments'),
  ('assessments.create', 'Create Assessments', 'Create assessments', 'assessments'),
  ('assessments.enter', 'Enter Scores', 'Enter assessment scores', 'assessments'),
  ('assessments.submit', 'Submit Scores', 'Submit scores for review', 'assessments'),
  ('results.approve', 'Approve Results', 'Approve submitted results', 'assessments'),
  ('results.publish', 'Publish Results', 'Publish results to parents/students', 'assessments'),
  -- Fees & Payments
  ('fees.read', 'View Fees', 'View fee structures', 'finance'),
  ('fees.create', 'Create Fee Structures', 'Create fee structures', 'finance'),
  ('fees.update', 'Update Fee Structures', 'Update fee structures', 'finance'),
  ('fees.invoice', 'Create Invoices', 'Create and issue invoices', 'finance'),
  ('payments.read', 'View Payments', 'View payment records', 'finance'),
  ('payments.record', 'Record Payments', 'Record manual payments', 'finance'),
  ('payments.reconcile', 'Reconcile Payments', 'Reconcile payments', 'finance'),
  ('payments.refund', 'Issue Refunds', 'Issue payment refunds', 'finance'),
  -- Reports
  ('reports.view', 'View Reports', 'View report cards and analytics', 'reports'),
  ('reports.generate', 'Generate Reports', 'Generate report cards', 'reports'),
  ('reports.export', 'Export Reports', 'Export data and reports', 'reports'),
  -- Classes & Timetable
  ('classes.read', 'View Classes', 'View class groups', 'academics'),
  ('classes.create', 'Create Classes', 'Create class groups', 'academics'),
  ('classes.update', 'Update Classes', 'Update class groups', 'academics'),
  ('subjects.manage', 'Manage Subjects', 'Create/update subjects', 'academics'),
  ('timetable.manage', 'Manage Timetable', 'Create/update timetable', 'academics'),
  -- Communication
  ('announcements.create', 'Create Announcements', 'Create announcements', 'communication'),
  ('announcements.publish', 'Publish Announcements', 'Publish announcements', 'communication'),
  -- School Settings
  ('school.settings.read', 'View School Settings', 'View school configuration', 'settings'),
  ('school.settings.manage', 'Manage School Settings', 'Update school configuration', 'settings'),
  ('school.roles.manage', 'Manage Roles', 'Create/edit roles and permissions', 'settings'),
  ('school.members.manage', 'Manage Members', 'Manage school memberships', 'settings'),
  -- Platform
  ('platform.tenants.manage', 'Manage Tenants', 'Platform-level tenant management', 'platform'),
  ('platform.plans.manage', 'Manage Plans', 'Manage subscription plans', 'platform'),
  ('platform.billing.manage', 'Manage Billing', 'Platform billing management', 'platform');
