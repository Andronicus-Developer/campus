-- ============================================================================
-- Campus360 — Migration 00003: Dashboards & Super Admin Platform Schema
-- ============================================================================
-- This migration creates all relational tables corresponding to the interface
-- modules across the Principal, Teacher, Student, Bursar, Parent, School Admin,
-- and Super Admin dashboards that were not in the initial migration.
--
-- Features:
--   • Academic Leadership & Curriculum (Lesson Plans, Observations, AIP, Grade Audits)
--   • Staff Administration (Candidate Confirmation, Leaves & Substitute Cover)
--   • Pastoral, Discipline & Welfare (Discipline Incidents, Safeguarding, PTM)
--   • Events, Calendar & Timetabling (Events, Timetable Requests, Attendance Corrections)
--   • Financial Operations (Requisitions, Fee Waivers, Bank Accounts, Petty Cash)
--   • Student & Parent Portals (Homework, Resources, Authorized Pickups, Transport)
--   • Super Admin SaaS Platform (Campuses, Coupons, Support Access, Tickets, Flags, Jobs)
-- ============================================================================

-- ============================================================================
-- 1. ACADEMIC LEADERSHIP & CURRICULUM
-- ============================================================================

CREATE TABLE IF NOT EXISTS lesson_plans (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  staff_id            UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  subject_id          UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  class_group_id      UUID NOT NULL REFERENCES class_groups(id) ON DELETE CASCADE,
  term_id             UUID REFERENCES terms(id) ON DELETE SET NULL,
  week_number         INTEGER NOT NULL,
  topic               TEXT NOT NULL,
  objectives          TEXT[] NOT NULL DEFAULT '{}',
  teaching_aids       TEXT[] DEFAULT '{}',
  lab_safety_notes    TEXT,
  content_summary     TEXT,
  status              TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'approved', 'revision_requested')),
  feedback            TEXT,
  reviewed_by         UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reviewed_at         TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lesson_plans_school ON lesson_plans(school_id);
CREATE INDEX IF NOT EXISTS idx_lesson_plans_staff ON lesson_plans(staff_id);
CREATE INDEX IF NOT EXISTS idx_lesson_plans_term_week ON lesson_plans(term_id, week_number);

-- Classroom Observations & Appraisals
CREATE TABLE IF NOT EXISTS classroom_observations (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  teacher_id          UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  observer_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  class_group_id      UUID REFERENCES class_groups(id) ON DELETE SET NULL,
  subject_id          UUID REFERENCES subjects(id) ON DELETE SET NULL,
  observation_date    DATE NOT NULL,
  rating              NUMERIC(3, 1) NOT NULL CHECK (rating >= 1.0 AND rating <= 5.0),
  pedagogy_notes      TEXT,
  strengths           TEXT,
  recommendations     TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_observations_school ON classroom_observations(school_id);
CREATE INDEX IF NOT EXISTS idx_observations_teacher ON classroom_observations(teacher_id);

-- Academic Intervention Plans (AIP) for At-Risk Students
CREATE TABLE IF NOT EXISTS academic_intervention_plans (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id          UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  mentor_staff_id     UUID REFERENCES staff_profiles(id) ON DELETE SET NULL,
  subject_id          UUID REFERENCES subjects(id) ON DELETE SET NULL,
  diagnosed_gap       TEXT NOT NULL,
  action_plan         TEXT NOT NULL,
  weekly_target       TEXT NOT NULL,
  target_gpa          NUMERIC(3, 2),
  status              TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'review_required', 'completed')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_aip_school ON academic_intervention_plans(school_id);
CREATE INDEX IF NOT EXISTS idx_aip_student ON academic_intervention_plans(student_id);

-- Exceptional Grade Amendment Audits
CREATE TABLE IF NOT EXISTS grade_amendment_audits (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  assessment_score_id UUID REFERENCES assessment_scores(id) ON DELETE CASCADE,
  student_id          UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject_id          UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id          UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  original_score      NUMERIC(5, 2) NOT NULL,
  amended_score       NUMERIC(5, 2) NOT NULL,
  justification       TEXT NOT NULL,
  approved_by         UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_grade_amendments_school ON grade_amendment_audits(school_id);

-- ============================================================================
-- 2. STAFF SUPERVISION & EXECUTIVE CONFIRMATION
-- ============================================================================

-- Candidate Staff Confirmations (School Admin onboarded -> Principal confirmed)
CREATE TABLE IF NOT EXISTS staff_confirmation_requests (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  staff_profile_id    UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  role_key            TEXT NOT NULL,
  form_class_id       UUID REFERENCES class_groups(id) ON DELETE SET NULL,
  qualifications      TEXT,
  onboarded_by        UUID REFERENCES profiles(id) ON DELETE SET NULL,
  confirmed_by        UUID REFERENCES profiles(id) ON DELETE SET NULL,
  confirmed_at        TIMESTAMPTZ,
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected')),
  rejection_reason    TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_staff_confirmation_school ON staff_confirmation_requests(school_id);

-- Staff Leaves & Substitute Classroom Cover
CREATE TABLE IF NOT EXISTS staff_leaves (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  staff_id            UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  substitute_staff_id UUID REFERENCES staff_profiles(id) ON DELETE SET NULL,
  start_date          DATE NOT NULL,
  end_date            DATE NOT NULL,
  reason              TEXT NOT NULL,
  periods_covered     TEXT,
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by         UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_staff_leaves_school ON staff_leaves(school_id);

-- ============================================================================
-- 3. PASTORAL, DISCIPLINE & SAFEGUARDING
-- ============================================================================

-- Disciplinary Incidents & Conduct Records
CREATE TABLE IF NOT EXISTS disciplinary_incidents (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id          UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  reported_by         UUID REFERENCES profiles(id) ON DELETE SET NULL,
  category            TEXT NOT NULL DEFAULT 'routine' CHECK (category IN ('routine', 'escalated', 'safeguarding')),
  infraction          TEXT NOT NULL,
  location            TEXT,
  incident_date       TIMESTAMPTZ NOT NULL DEFAULT now(),
  recommended_action  TEXT,
  principal_decision  TEXT,
  parent_notified     BOOLEAN NOT NULL DEFAULT FALSE,
  status              TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'resolved', 'conference_booked')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_discipline_school ON disciplinary_incidents(school_id);
CREATE INDEX IF NOT EXISTS idx_discipline_student ON disciplinary_incidents(student_id);

-- Parent-Teacher Conferences (PTM)
CREATE TABLE IF NOT EXISTS parent_conferences (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id          UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  guardian_id         UUID REFERENCES guardians(id) ON DELETE SET NULL,
  staff_id            UUID REFERENCES staff_profiles(id) ON DELETE SET NULL,
  scheduled_time      TIMESTAMPTZ NOT NULL,
  venue               TEXT NOT NULL,
  agenda              TEXT NOT NULL,
  meeting_notes       TEXT,
  status              TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_conferences_school ON parent_conferences(school_id);

-- Confidential Safeguarding Vault
CREATE TABLE IF NOT EXISTS safeguarding_records (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id          UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  dsl_staff_id        UUID REFERENCES staff_profiles(id) ON DELETE SET NULL,
  case_code           TEXT NOT NULL,
  incident_summary    TEXT NOT NULL,
  action_taken        TEXT NOT NULL,
  external_referrals  TEXT,
  is_restricted       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_safeguarding_school ON safeguarding_records(school_id);

-- ============================================================================
-- 4. CALENDAR, EVENTS, TIMETABLE & ATTENDANCE EXCEPTIONS
-- ============================================================================

-- Master School Events Calendar
CREATE TABLE IF NOT EXISTS school_events (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  title               TEXT NOT NULL,
  category            TEXT NOT NULL DEFAULT 'academic' CHECK (category IN ('academic', 'examination', 'meeting', 'co-curricular')),
  start_time          TIMESTAMPTZ NOT NULL,
  end_time            TIMESTAMPTZ NOT NULL,
  venue               TEXT NOT NULL,
  lead_coordinator_id UUID REFERENCES staff_profiles(id) ON DELETE SET NULL,
  description         TEXT,
  published_to_parents BOOLEAN NOT NULL DEFAULT FALSE,
  published_to_students BOOLEAN NOT NULL DEFAULT FALSE,
  status              TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_school ON school_events(school_id);

-- Timetable Change Requests
CREATE TABLE IF NOT EXISTS timetable_change_requests (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  requester_id        UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  change_type         TEXT NOT NULL CHECK (change_type IN ('room_swap', 'period_adjustment', 'emergency_cover')),
  details             TEXT NOT NULL,
  affected_classes    TEXT NOT NULL,
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by         UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_timetable_requests_school ON timetable_change_requests(school_id);

-- Exceptional Attendance Corrections (Medical or Official Duty)
CREATE TABLE IF NOT EXISTS attendance_corrections (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id          UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  attendance_record_id UUID REFERENCES attendance_records(id) ON DELETE CASCADE,
  original_status     attendance_value NOT NULL,
  requested_status    attendance_value NOT NULL,
  reason              TEXT NOT NULL,
  submitted_by        UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  approved_by         UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_attendance_corrections_school ON attendance_corrections(school_id);

-- ============================================================================
-- 5. FINANCIAL OVERSIGHT, REQUISITIONS & BANKING
-- ============================================================================

-- Expenditure Requisitions (Delegated Principal Sign-Off <= $5,000)
CREATE TABLE IF NOT EXISTS expenditure_requisitions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  department          TEXT NOT NULL,
  title               TEXT NOT NULL,
  amount_cents        INTEGER NOT NULL CHECK (amount_cents > 0),
  currency            TEXT NOT NULL DEFAULT 'USD',
  submitted_by        UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  purpose             TEXT NOT NULL,
  within_limit        BOOLEAN NOT NULL DEFAULT TRUE,
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'escalated_owner', 'rejected')),
  approved_by         UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_requisitions_school ON expenditure_requisitions(school_id);

-- Scholarships, Bursary Discounts & Fee Waivers
CREATE TABLE IF NOT EXISTS scholarships_and_waivers (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id          UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  invoice_id          UUID REFERENCES invoices(id) ON DELETE SET NULL,
  waiver_type         TEXT NOT NULL CHECK (waiver_type IN ('academic_merit', 'staff_child', 'hardship', 'sibling')),
  discount_percentage NUMERIC(5, 2) NOT NULL CHECK (discount_percentage > 0 AND discount_percentage <= 100),
  amount_cents        INTEGER NOT NULL CHECK (amount_cents >= 0),
  currency            TEXT NOT NULL DEFAULT 'USD',
  justification       TEXT NOT NULL,
  status              TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by         UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_scholarships_school ON scholarships_and_waivers(school_id);

-- School Bank Accounts (for fee bank transfers & reconciliation)
CREATE TABLE IF NOT EXISTS school_bank_accounts (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  bank_name           TEXT NOT NULL,
  account_number      TEXT NOT NULL,
  account_name        TEXT NOT NULL,
  sort_code           TEXT,
  currency            TEXT NOT NULL DEFAULT 'USD',
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  is_primary          BOOLEAN NOT NULL DEFAULT FALSE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_school_bank_accounts_school ON school_bank_accounts(school_id);

-- Bank Statement Feed for Bursar Reconciliation
CREATE TABLE IF NOT EXISTS bank_statement_transactions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  bank_account_id     UUID NOT NULL REFERENCES school_bank_accounts(id) ON DELETE CASCADE,
  transaction_date    DATE NOT NULL,
  reference           TEXT NOT NULL,
  description         TEXT NOT NULL,
  amount_cents        INTEGER NOT NULL,
  currency            TEXT NOT NULL DEFAULT 'USD',
  payment_id          UUID REFERENCES payments(id) ON DELETE SET NULL,
  is_reconciled       BOOLEAN NOT NULL DEFAULT FALSE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bank_tx_school ON bank_statement_transactions(school_id);

-- Petty Cash Ledgers
CREATE TABLE IF NOT EXISTS petty_cash_disbursements (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  voucher_number      TEXT NOT NULL,
  amount_cents        INTEGER NOT NULL CHECK (amount_cents > 0),
  currency            TEXT NOT NULL DEFAULT 'USD',
  disbursed_to        TEXT NOT NULL,
  purpose             TEXT NOT NULL,
  custodian_id        UUID REFERENCES staff_profiles(id) ON DELETE SET NULL,
  approved_by         UUID REFERENCES profiles(id) ON DELETE SET NULL,
  disbursed_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_petty_cash_school ON petty_cash_disbursements(school_id);

-- ============================================================================
-- 6. STUDENT & PARENT LEARNING & PASTORAL SERVICES
-- ============================================================================

-- Homework Assignments
CREATE TABLE IF NOT EXISTS homework_assignments (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  subject_id          UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  class_group_id      UUID NOT NULL REFERENCES class_groups(id) ON DELETE CASCADE,
  teacher_id          UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  title               TEXT NOT NULL,
  instructions        TEXT NOT NULL,
  due_date            TIMESTAMPTZ NOT NULL,
  total_points        INTEGER NOT NULL DEFAULT 100,
  attachment_url      TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_homework_school ON homework_assignments(school_id);
CREATE INDEX IF NOT EXISTS idx_homework_class ON homework_assignments(class_group_id);

-- Homework Submissions & Feedback
CREATE TABLE IF NOT EXISTS homework_submissions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  homework_id         UUID NOT NULL REFERENCES homework_assignments(id) ON DELETE CASCADE,
  student_id          UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  submission_text     TEXT,
  attachment_url      TEXT,
  submitted_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  grade_score         NUMERIC(5, 2),
  teacher_feedback    TEXT,
  graded_at           TIMESTAMPTZ,
  graded_by           UUID REFERENCES staff_profiles(id) ON DELETE SET NULL,
  UNIQUE(homework_id, student_id)
);

CREATE INDEX IF NOT EXISTS idx_homework_submissions_student ON homework_submissions(student_id);

-- Learning Resources & Study Handouts
CREATE TABLE IF NOT EXISTS learning_resources (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  subject_id          UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  class_group_id      UUID REFERENCES class_groups(id) ON DELETE CASCADE,
  title               TEXT NOT NULL,
  description         TEXT,
  resource_type       TEXT NOT NULL DEFAULT 'pdf' CHECK (resource_type IN ('pdf', 'video', 'slides', 'past_questions')),
  file_url            TEXT NOT NULL,
  uploaded_by         UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_learning_resources_school ON learning_resources(school_id);

-- Authorized Guardians & Pickup Security PINs
CREATE TABLE IF NOT EXISTS authorized_pickup_persons (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id          UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  guardian_id         UUID REFERENCES guardians(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  relationship        TEXT NOT NULL,
  phone               TEXT NOT NULL,
  pickup_pin_hash     TEXT,
  photo_url           TEXT,
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_pickups_student ON authorized_pickup_persons(student_id);

-- Transport Bus Routes & Bookings
CREATE TABLE IF NOT EXISTS transport_routes (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  route_name          TEXT NOT NULL,
  driver_name         TEXT NOT NULL,
  driver_phone        TEXT NOT NULL,
  vehicle_reg         TEXT NOT NULL,
  stops               TEXT[] NOT NULL DEFAULT '{}',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS student_transport_bookings (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id            UUID NOT NULL REFERENCES transport_routes(id) ON DELETE CASCADE,
  student_id          UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  pickup_stop         TEXT NOT NULL,
  dropoff_stop        TEXT NOT NULL,
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(route_id, student_id)
);

-- Boarding Hostels & Bed Allocations
CREATE TABLE IF NOT EXISTS boarding_rooms (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  hall_name           TEXT NOT NULL,
  room_number         TEXT NOT NULL,
  capacity            INTEGER NOT NULL DEFAULT 4,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS boarding_allocations (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id             UUID NOT NULL REFERENCES boarding_rooms(id) ON DELETE CASCADE,
  student_id          UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  bed_number          TEXT NOT NULL,
  academic_year_id    UUID REFERENCES academic_years(id) ON DELETE CASCADE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, academic_year_id)
);

-- Parent Inquiries & Complaints Desk
CREATE TABLE IF NOT EXISTS parent_inquiries (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  parent_id           UUID NOT NULL REFERENCES guardians(id) ON DELETE CASCADE,
  student_id          UUID REFERENCES students(id) ON DELETE SET NULL,
  category            TEXT NOT NULL CHECK (category IN ('academic', 'financial_dispute', 'portal_access', 'transport')),
  subject             TEXT NOT NULL,
  message             TEXT NOT NULL,
  assigned_to_role    TEXT NOT NULL DEFAULT 'teacher' CHECK (assigned_to_role IN ('teacher', 'bursar', 'admin', 'principal')),
  status              TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'delegated_bursar', 'delegated_admin')),
  resolution_notes    TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_parent_inquiries_school ON parent_inquiries(school_id);

-- ============================================================================
-- 7. SUPER ADMIN & SAAS PLATFORM CONTROL CENTER
-- ============================================================================

-- Multi-Campus School Groups
CREATE TABLE IF NOT EXISTS campuses (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name   TEXT NOT NULL,
  headquarters_address TEXT,
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  campus_code         TEXT NOT NULL,
  is_main_campus      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_campuses_school ON campuses(school_id);

-- Platform Subscription Coupons & Promos
CREATE TABLE IF NOT EXISTS platform_coupons (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code                TEXT UNIQUE NOT NULL,
  description         TEXT,
  discount_type       TEXT NOT NULL DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'fixed_amount')),
  discount_value      NUMERIC(10, 2) NOT NULL,
  currency            TEXT NOT NULL DEFAULT 'USD',
  valid_from          TIMESTAMPTZ NOT NULL DEFAULT now(),
  valid_until         TIMESTAMPTZ,
  max_redemptions     INTEGER,
  times_redeemed      INTEGER NOT NULL DEFAULT 0,
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Time-Boxed Operator Support Impersonation Sessions
CREATE TABLE IF NOT EXISTS support_sessions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  reason              TEXT NOT NULL,
  ticket_reference    TEXT,
  ip_address          TEXT,
  started_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at          TIMESTAMPTZ NOT NULL,
  revoked_at          TIMESTAMPTZ,
  status              TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'revoked')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_support_sessions_school ON support_sessions(school_id);
CREATE INDEX IF NOT EXISTS idx_support_sessions_operator ON support_sessions(operator_id);

-- SaaS Customer Support Tickets
CREATE TABLE IF NOT EXISTS support_tickets (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  submitted_by        UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  ticket_number       TEXT UNIQUE NOT NULL,
  subject             TEXT NOT NULL,
  description         TEXT NOT NULL,
  priority            TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'critical')),
  status              TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_customer', 'resolved', 'closed')),
  assigned_operator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  sla_due_at          TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_support_tickets_school ON support_tickets(school_id);

CREATE TABLE IF NOT EXISTS support_ticket_messages (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id           UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  author_id           UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message             TEXT NOT NULL,
  is_internal_note    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ticket_messages_ticket ON support_ticket_messages(ticket_id);

-- Feature Flags Engine
CREATE TABLE IF NOT EXISTS feature_flags (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key                 TEXT UNIQUE NOT NULL,
  name                TEXT NOT NULL,
  description         TEXT,
  enabled_globally    BOOLEAN NOT NULL DEFAULT FALSE,
  rollout_percentage  INTEGER NOT NULL DEFAULT 0 CHECK (rollout_percentage >= 0 AND rollout_percentage <= 100),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tenant_feature_flags (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_flag_id     UUID NOT NULL REFERENCES feature_flags(id) ON DELETE CASCADE,
  school_id           UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  enabled             BOOLEAN NOT NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(feature_flag_id, school_id)
);

-- Platform Gateways & Integrations
CREATE TABLE IF NOT EXISTS platform_integrations (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider            TEXT NOT NULL,
  category            TEXT NOT NULL CHECK (category IN ('payment', 'sms', 'email', 'storage')),
  is_enabled          BOOLEAN NOT NULL DEFAULT FALSE,
  config              JSONB NOT NULL DEFAULT '{}',
  health_status       TEXT NOT NULL DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'degraded', 'offline')),
  last_tested_at      TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Background Queue Jobs
CREATE TABLE IF NOT EXISTS background_jobs (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  queue_name          TEXT NOT NULL,
  job_name            TEXT NOT NULL,
  school_id           UUID REFERENCES schools(id) ON DELETE SET NULL,
  payload             JSONB NOT NULL DEFAULT '{}',
  status              TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed', 'retrying')),
  attempts            INTEGER NOT NULL DEFAULT 0,
  max_attempts        INTEGER NOT NULL DEFAULT 3,
  scheduled_for       TIMESTAMPTZ NOT NULL DEFAULT now(),
  started_at          TIMESTAMPTZ,
  completed_at        TIMESTAMPTZ,
  error_message       TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bg_jobs_status ON background_jobs(status, scheduled_for);

-- System Incidents & Maintenance Notices
CREATE TABLE IF NOT EXISTS system_incidents (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title               TEXT NOT NULL,
  impact              TEXT NOT NULL DEFAULT 'minor' CHECK (impact IN ('none', 'minor', 'major', 'critical')),
  status              TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'resolved')),
  start_time          TIMESTAMPTZ NOT NULL,
  end_time            TIMESTAMPTZ,
  description         TEXT NOT NULL,
  affected_services   TEXT[] NOT NULL DEFAULT '{}',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Platform-Wide Broadcast Bulletins to School Leaders
CREATE TABLE IF NOT EXISTS platform_announcements (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title               TEXT NOT NULL,
  content             TEXT NOT NULL,
  priority            TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'urgent', 'maintenance')),
  target_plans        TEXT[] NOT NULL DEFAULT '{}',
  published_by        UUID REFERENCES profiles(id) ON DELETE SET NULL,
  published_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at          TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES FOR NEW TABLES
-- ============================================================================

ALTER TABLE lesson_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE classroom_observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_intervention_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE grade_amendment_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_confirmation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE disciplinary_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_conferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE safeguarding_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable_change_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_corrections ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenditure_requisitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE scholarships_and_waivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE school_bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_statement_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE petty_cash_disbursements ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorized_pickup_persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE transport_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_transport_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE boarding_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE boarding_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE campuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_ticket_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE background_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_announcements ENABLE ROW LEVEL SECURITY;

-- Standard tenant isolation policy macro
DO $$
DECLARE
  t text;
  tenant_tables text[] := ARRAY[
    'lesson_plans', 'classroom_observations', 'academic_intervention_plans',
    'grade_amendment_audits', 'staff_confirmation_requests', 'staff_leaves',
    'disciplinary_incidents', 'parent_conferences', 'safeguarding_records',
    'school_events', 'timetable_change_requests', 'attendance_corrections',
    'expenditure_requisitions', 'scholarships_and_waivers', 'school_bank_accounts',
    'bank_statement_transactions', 'petty_cash_disbursements', 'homework_assignments',
    'learning_resources', 'authorized_pickup_persons', 'transport_routes',
    'student_transport_bookings', 'boarding_rooms', 'boarding_allocations',
    'parent_inquiries', 'campuses', 'tenant_feature_flags'
  ];
BEGIN
  FOREACH t IN ARRAY tenant_tables LOOP
    EXECUTE format('
      DROP POLICY IF EXISTS %I_tenant_policy ON %I;
      CREATE POLICY %I_tenant_policy ON %I
        FOR ALL USING (
          has_school_membership(school_id) OR is_platform_admin()
        )
        WITH CHECK (
          has_school_membership(school_id) OR is_platform_admin()
        );
    ', t, t, t, t);
  END LOOP;
END $$;

-- Platform-only operator policy macro
DO $$
DECLARE
  pt text;
  platform_tables text[] := ARRAY[
    'platform_coupons', 'support_sessions', 'feature_flags',
    'platform_integrations', 'background_jobs', 'system_incidents'
  ];
BEGIN
  FOREACH pt IN ARRAY platform_tables LOOP
    EXECUTE format('
      DROP POLICY IF EXISTS %I_operator_policy ON %I;
      CREATE POLICY %I_operator_policy ON %I
        FOR ALL USING (is_platform_admin())
        WITH CHECK (is_platform_admin());
    ', pt, pt, pt, pt);
  END LOOP;
END $$;

-- Support tickets policy (Tenant member can view own school tickets, operator can manage all)
DROP POLICY IF EXISTS support_tickets_policy ON support_tickets;
CREATE POLICY support_tickets_policy ON support_tickets
  FOR ALL USING (
    requester_id = auth.uid()
    OR (school_id IS NOT NULL AND has_school_membership(school_id))
    OR is_platform_admin()
  )
  WITH CHECK (
    requester_id = auth.uid()
    OR (school_id IS NOT NULL AND has_school_membership(school_id))
    OR is_platform_admin()
  );

DROP POLICY IF EXISTS support_messages_policy ON support_ticket_messages;
CREATE POLICY support_messages_policy ON support_ticket_messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM support_tickets st
      WHERE st.id = support_ticket_messages.ticket_id
        AND (
          st.requester_id = auth.uid()
          OR (st.school_id IS NOT NULL AND has_school_membership(st.school_id))
          OR is_platform_admin()
        )
    )
  )
  WITH CHECK (
    sender_id = auth.uid()
  );

-- Homework submissions policy (student accesses own submissions, school staff access class, platform admin accesses all)
DROP POLICY IF EXISTS homework_submissions_policy ON homework_submissions;
CREATE POLICY homework_submissions_policy ON homework_submissions
  FOR ALL USING (
    student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
    OR EXISTS (
      SELECT 1 FROM homework_assignments ha
      WHERE ha.id = homework_submissions.homework_id
        AND (has_school_membership(ha.school_id) OR is_platform_admin())
    )
    OR is_platform_admin()
  )
  WITH CHECK (
    student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
    OR EXISTS (
      SELECT 1 FROM homework_assignments ha
      WHERE ha.id = homework_submissions.homework_id
        AND (has_school_membership(ha.school_id) OR is_platform_admin())
    )
    OR is_platform_admin()
  );

-- Platform announcements policy (read by all authenticated users, write by platform admin)
DROP POLICY IF EXISTS announcements_read_policy ON platform_announcements;
CREATE POLICY announcements_read_policy ON platform_announcements
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS announcements_admin_policy ON platform_announcements;
CREATE POLICY announcements_admin_policy ON platform_announcements
  FOR ALL USING (is_platform_admin())
  WITH CHECK (is_platform_admin());
