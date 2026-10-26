/**
 * Campus360 — Supabase Database Type Definitions
 *
 * These types represent the database schema for type-safe Supabase client usage.
 * In production, regenerate with: npx supabase gen types typescript --local
 */

// ─── Enum Types ──────────────────────────────────────────────────────────

export type SchoolStatus = 'pending' | 'trial' | 'active' | 'suspended' | 'closed';
export type MembershipStatus = 'active' | 'inactive' | 'suspended' | 'revoked';
export type StudentStatus = 'active' | 'graduated' | 'transferred' | 'withdrawn' | 'archived' | 'suspended';
export type AdmissionStatus = 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted' | 'enrolled' | 'withdrawn';
export type EnrollmentStatus = 'active' | 'completed' | 'transferred' | 'withdrawn' | 'repeated';
export type AttendanceValue = 'present' | 'absent' | 'late' | 'excused';
export type AssessmentState = 'draft' | 'submitted' | 'approved' | 'published';
export type InvoiceStatus = 'draft' | 'issued' | 'partially_paid' | 'paid' | 'overdue' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'successful' | 'failed' | 'reversed' | 'refunded';
export type RefundStatus = 'pending' | 'processed' | 'failed';
export type WebhookEventStatus = 'pending' | 'processing' | 'processed' | 'failed' | 'ignored';
export type AnnouncementTarget = 'school' | 'class' | 'staff' | 'parents' | 'students' | 'individual';
export type NotificationStatus = 'pending' | 'sent' | 'delivered' | 'failed' | 'bounced';
export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'cancelled' | 'expired';
export type BillingEventType = 'invoice_created' | 'payment_succeeded' | 'payment_failed' | 'subscription_updated' | 'subscription_cancelled' | 'refund_issued' | 'trial_started' | 'trial_ended';
export type GenderType = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type GuardianRelationship = 'father' | 'mother' | 'guardian' | 'sibling' | 'uncle' | 'aunt' | 'grandparent' | 'other';
export type StaffEmploymentStatus = 'active' | 'on_leave' | 'suspended' | 'terminated' | 'resigned' | 'retired';
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type ReportCardStatus = 'draft' | 'generated' | 'approved' | 'published';

// ─── Database Interface ──────────────────────────────────────────────────

export interface RawTables {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          phone: string | null;
          is_platform_admin: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string;
          avatar_url?: string | null;
          phone?: string | null;
          is_platform_admin?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          phone?: string | null;
          is_platform_admin?: boolean;
          is_active?: boolean;
          updated_at?: string;
        };
      };

      schools: {
        Row: {
          id: string;
          name: string;
          slug: string;
          code: string | null;
          logo_url: string | null;
          email: string | null;
          phone: string | null;
          website: string | null;
          address: string | null;
          city: string | null;
          state_province: string | null;
          country: string;
          timezone: string;
          locale: string;
          currency: string;
          status: SchoolStatus;
          settings: Record<string, unknown>;
          motto: string | null;
          established_year: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          code?: string | null;
          logo_url?: string | null;
          email?: string | null;
          phone?: string | null;
          website?: string | null;
          address?: string | null;
          city?: string | null;
          state_province?: string | null;
          country?: string;
          timezone?: string;
          locale?: string;
          currency?: string;
          status?: SchoolStatus;
          settings?: Record<string, unknown>;
          motto?: string | null;
          established_year?: number | null;
        };
        Update: {
          name?: string;
          slug?: string;
          code?: string | null;
          logo_url?: string | null;
          email?: string | null;
          phone?: string | null;
          website?: string | null;
          address?: string | null;
          city?: string | null;
          state_province?: string | null;
          country?: string;
          timezone?: string;
          locale?: string;
          currency?: string;
          status?: SchoolStatus;
          settings?: Record<string, unknown>;
          motto?: string | null;
          established_year?: number | null;
          updated_at?: string;
        };
      };

      permissions: {
        Row: {
          id: string;
          code: string;
          name: string;
          description: string | null;
          module: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          name: string;
          description?: string | null;
          module: string;
        };
        Update: {
          code?: string;
          name?: string;
          description?: string | null;
          module?: string;
        };
      };

      roles: {
        Row: {
          id: string;
          school_id: string | null;
          name: string;
          description: string | null;
          is_system: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id?: string | null;
          name: string;
          description?: string | null;
          is_system?: boolean;
        };
        Update: {
          name?: string;
          description?: string | null;
          is_system?: boolean;
          updated_at?: string;
        };
      };

      role_permissions: {
        Row: {
          id: string;
          role_id: string;
          permission_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          role_id: string;
          permission_id: string;
        };
        Update: {
          role_id?: string;
          permission_id?: string;
        };
      };

      school_memberships: {
        Row: {
          id: string;
          school_id: string;
          user_id: string;
          status: MembershipStatus;
          joined_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          user_id: string;
          status?: MembershipStatus;
          joined_at?: string;
        };
        Update: {
          status?: MembershipStatus;
          updated_at?: string;
        };
      };

      membership_roles: {
        Row: {
          id: string;
          membership_id: string;
          role_id: string;
          assigned_at: string;
          assigned_by: string | null;
        };
        Insert: {
          id?: string;
          membership_id: string;
          role_id: string;
          assigned_by?: string | null;
        };
        Update: {
          membership_id?: string;
          role_id?: string;
          assigned_by?: string | null;
        };
      };

      academic_years: {
        Row: {
          id: string;
          school_id: string;
          name: string;
          start_date: string;
          end_date: string;
          is_current: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          name: string;
          start_date: string;
          end_date: string;
          is_current?: boolean;
        };
        Update: {
          name?: string;
          start_date?: string;
          end_date?: string;
          is_current?: boolean;
          updated_at?: string;
        };
      };

      terms: {
        Row: {
          id: string;
          school_id: string;
          academic_year_id: string;
          name: string;
          start_date: string;
          end_date: string;
          is_current: boolean;
          sequence: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          academic_year_id: string;
          name: string;
          start_date: string;
          end_date: string;
          is_current?: boolean;
          sequence?: number;
        };
        Update: {
          name?: string;
          start_date?: string;
          end_date?: string;
          is_current?: boolean;
          sequence?: number;
          updated_at?: string;
        };
      };

      class_groups: {
        Row: {
          id: string;
          school_id: string;
          name: string;
          level: number | null;
          stream: string | null;
          capacity: number | null;
          class_teacher_id: string | null;
          academic_year_id: string | null;
          room: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          name: string;
          level?: number | null;
          stream?: string | null;
          capacity?: number | null;
          class_teacher_id?: string | null;
          academic_year_id?: string | null;
          room?: string | null;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          level?: number | null;
          stream?: string | null;
          capacity?: number | null;
          class_teacher_id?: string | null;
          academic_year_id?: string | null;
          room?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
      };

      subjects: {
        Row: {
          id: string;
          school_id: string;
          name: string;
          code: string | null;
          description: string | null;
          is_elective: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          name: string;
          code?: string | null;
          description?: string | null;
          is_elective?: boolean;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          code?: string | null;
          description?: string | null;
          is_elective?: boolean;
          is_active?: boolean;
          updated_at?: string;
        };
      };

      teaching_assignments: {
        Row: {
          id: string;
          school_id: string;
          teacher_id: string;
          class_group_id: string;
          subject_id: string;
          academic_year_id: string | null;
          term_id: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          teacher_id: string;
          class_group_id: string;
          subject_id: string;
          academic_year_id?: string | null;
          term_id?: string | null;
          is_active?: boolean;
        };
        Update: {
          is_active?: boolean;
        };
      };

      timetable_periods: {
        Row: {
          id: string;
          school_id: string;
          name: string;
          start_time: string;
          end_time: string;
          sequence: number;
          is_break: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          name: string;
          start_time: string;
          end_time: string;
          sequence: number;
          is_break?: boolean;
        };
        Update: {
          name?: string;
          start_time?: string;
          end_time?: string;
          sequence?: number;
          is_break?: boolean;
        };
      };

      timetable_slots: {
        Row: {
          id: string;
          school_id: string;
          class_group_id: string;
          subject_id: string | null;
          teacher_id: string | null;
          period_id: string;
          day_of_week: DayOfWeek;
          room: string | null;
          academic_year_id: string | null;
          term_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          class_group_id: string;
          subject_id?: string | null;
          teacher_id?: string | null;
          period_id: string;
          day_of_week: DayOfWeek;
          room?: string | null;
          academic_year_id?: string | null;
          term_id?: string | null;
        };
        Update: {
          subject_id?: string | null;
          teacher_id?: string | null;
          room?: string | null;
        };
      };

      students: {
        Row: {
          id: string;
          school_id: string;
          user_id: string | null;
          student_number: string;
          first_name: string;
          last_name: string;
          other_names: string | null;
          date_of_birth: string | null;
          gender: GenderType | null;
          blood_group: string | null;
          nationality: string | null;
          state_of_origin: string | null;
          address: string | null;
          photo_url: string | null;
          status: StudentStatus;
          admission_date: string | null;
          current_class_id: string | null;
          medical_info: Record<string, unknown>;
          emergency_contact: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          user_id?: string | null;
          student_number: string;
          first_name: string;
          last_name: string;
          other_names?: string | null;
          date_of_birth?: string | null;
          gender?: GenderType | null;
          blood_group?: string | null;
          nationality?: string | null;
          state_of_origin?: string | null;
          address?: string | null;
          photo_url?: string | null;
          status?: StudentStatus;
          admission_date?: string | null;
          current_class_id?: string | null;
          medical_info?: Record<string, unknown>;
          emergency_contact?: Record<string, unknown>;
        };
        Update: {
          user_id?: string | null;
          student_number?: string;
          first_name?: string;
          last_name?: string;
          other_names?: string | null;
          date_of_birth?: string | null;
          gender?: GenderType | null;
          blood_group?: string | null;
          nationality?: string | null;
          state_of_origin?: string | null;
          address?: string | null;
          photo_url?: string | null;
          status?: StudentStatus;
          admission_date?: string | null;
          current_class_id?: string | null;
          medical_info?: Record<string, unknown>;
          emergency_contact?: Record<string, unknown>;
          updated_at?: string;
        };
      };

      guardians: {
        Row: {
          id: string;
          school_id: string;
          user_id: string | null;
          first_name: string;
          last_name: string;
          email: string | null;
          phone: string;
          phone_alt: string | null;
          address: string | null;
          occupation: string | null;
          employer: string | null;
          photo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          user_id?: string | null;
          first_name: string;
          last_name: string;
          email?: string | null;
          phone: string;
          phone_alt?: string | null;
          address?: string | null;
          occupation?: string | null;
          employer?: string | null;
          photo_url?: string | null;
        };
        Update: {
          first_name?: string;
          last_name?: string;
          email?: string | null;
          phone?: string;
          phone_alt?: string | null;
          address?: string | null;
          occupation?: string | null;
          employer?: string | null;
          photo_url?: string | null;
          updated_at?: string;
        };
      };

      student_guardians: {
        Row: {
          id: string;
          student_id: string;
          guardian_id: string;
          relationship: GuardianRelationship;
          is_primary: boolean;
          is_emergency: boolean;
          can_pickup: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          guardian_id: string;
          relationship?: GuardianRelationship;
          is_primary?: boolean;
          is_emergency?: boolean;
          can_pickup?: boolean;
        };
        Update: {
          relationship?: GuardianRelationship;
          is_primary?: boolean;
          is_emergency?: boolean;
          can_pickup?: boolean;
        };
      };

      admission_applications: {
        Row: {
          id: string;
          school_id: string;
          academic_year_id: string;
          application_number: string;
          first_name: string;
          last_name: string;
          other_names: string | null;
          date_of_birth: string | null;
          gender: GenderType | null;
          previous_school: string | null;
          class_applied: string | null;
          guardian_name: string;
          guardian_email: string | null;
          guardian_phone: string;
          guardian_relationship: GuardianRelationship | null;
          guardian_address: string | null;
          status: AdmissionStatus;
          documents: unknown[];
          notes: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          converted_student_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          academic_year_id: string;
          application_number: string;
          first_name: string;
          last_name: string;
          other_names?: string | null;
          date_of_birth?: string | null;
          gender?: GenderType | null;
          previous_school?: string | null;
          class_applied?: string | null;
          guardian_name: string;
          guardian_email?: string | null;
          guardian_phone: string;
          guardian_relationship?: GuardianRelationship | null;
          guardian_address?: string | null;
          status?: AdmissionStatus;
          documents?: unknown[];
          notes?: string | null;
        };
        Update: {
          first_name?: string;
          last_name?: string;
          other_names?: string | null;
          date_of_birth?: string | null;
          gender?: GenderType | null;
          previous_school?: string | null;
          class_applied?: string | null;
          guardian_name?: string;
          guardian_email?: string | null;
          guardian_phone?: string;
          guardian_relationship?: GuardianRelationship | null;
          guardian_address?: string | null;
          status?: AdmissionStatus;
          documents?: unknown[];
          notes?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          converted_student_id?: string | null;
          updated_at?: string;
        };
      };

      enrollments: {
        Row: {
          id: string;
          school_id: string;
          student_id: string;
          academic_year_id: string;
          class_group_id: string;
          term_id: string | null;
          status: EnrollmentStatus;
          enrolled_at: string;
          completed_at: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          student_id: string;
          academic_year_id: string;
          class_group_id: string;
          term_id?: string | null;
          status?: EnrollmentStatus;
          notes?: string | null;
        };
        Update: {
          class_group_id?: string;
          status?: EnrollmentStatus;
          completed_at?: string | null;
          notes?: string | null;
          updated_at?: string;
        };
      };

      staff_profiles: {
        Row: {
          id: string;
          school_id: string;
          user_id: string;
          staff_number: string;
          department: string | null;
          designation: string | null;
          qualification: string | null;
          date_of_hire: string | null;
          employment_status: StaffEmploymentStatus;
          salary_grade: string | null;
          bank_name: string | null;
          bank_account: string | null;
          tax_id: string | null;
          emergency_contact: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          user_id: string;
          staff_number: string;
          department?: string | null;
          designation?: string | null;
          qualification?: string | null;
          date_of_hire?: string | null;
          employment_status?: StaffEmploymentStatus;
          salary_grade?: string | null;
          bank_name?: string | null;
          bank_account?: string | null;
          tax_id?: string | null;
          emergency_contact?: Record<string, unknown>;
        };
        Update: {
          staff_number?: string;
          department?: string | null;
          designation?: string | null;
          qualification?: string | null;
          date_of_hire?: string | null;
          employment_status?: StaffEmploymentStatus;
          salary_grade?: string | null;
          bank_name?: string | null;
          bank_account?: string | null;
          tax_id?: string | null;
          emergency_contact?: Record<string, unknown>;
          updated_at?: string;
        };
      };

      attendance_sessions: {
        Row: {
          id: string;
          school_id: string;
          class_group_id: string;
          term_id: string;
          date: string;
          session_name: string;
          taken_by: string;
          is_locked: boolean;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          class_group_id: string;
          term_id: string;
          date: string;
          session_name?: string;
          taken_by: string;
          is_locked?: boolean;
          notes?: string | null;
        };
        Update: {
          is_locked?: boolean;
          notes?: string | null;
          updated_at?: string;
        };
      };

      attendance_records: {
        Row: {
          id: string;
          session_id: string;
          student_id: string;
          status: AttendanceValue;
          remarks: string | null;
          recorded_by: string;
          corrected_by: string | null;
          correction_reason: string | null;
          previous_status: AttendanceValue | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          student_id: string;
          status?: AttendanceValue;
          remarks?: string | null;
          recorded_by: string;
        };
        Update: {
          status?: AttendanceValue;
          remarks?: string | null;
          corrected_by?: string | null;
          correction_reason?: string | null;
          previous_status?: AttendanceValue | null;
          updated_at?: string;
        };
      };

      grade_scales: {
        Row: {
          id: string;
          school_id: string;
          name: string;
          is_default: boolean;
          bands: unknown[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          name: string;
          is_default?: boolean;
          bands?: unknown[];
        };
        Update: {
          name?: string;
          is_default?: boolean;
          bands?: unknown[];
          updated_at?: string;
        };
      };

      assessments: {
        Row: {
          id: string;
          school_id: string;
          class_group_id: string;
          subject_id: string;
          term_id: string;
          academic_year_id: string;
          name: string;
          category: string;
          max_score: number;
          weight: number;
          state: AssessmentState;
          grade_scale_id: string | null;
          due_date: string | null;
          submitted_by: string | null;
          submitted_at: string | null;
          approved_by: string | null;
          approved_at: string | null;
          published_by: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          class_group_id: string;
          subject_id: string;
          term_id: string;
          academic_year_id: string;
          name: string;
          category: string;
          max_score: number;
          weight?: number;
          state?: AssessmentState;
          grade_scale_id?: string | null;
          due_date?: string | null;
        };
        Update: {
          name?: string;
          category?: string;
          max_score?: number;
          weight?: number;
          state?: AssessmentState;
          grade_scale_id?: string | null;
          due_date?: string | null;
          submitted_by?: string | null;
          submitted_at?: string | null;
          approved_by?: string | null;
          approved_at?: string | null;
          published_by?: string | null;
          published_at?: string | null;
          updated_at?: string;
        };
      };

      assessment_scores: {
        Row: {
          id: string;
          assessment_id: string;
          student_id: string;
          score: number | null;
          is_absent: boolean;
          is_exempt: boolean;
          remarks: string | null;
          entered_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          assessment_id: string;
          student_id: string;
          score?: number | null;
          is_absent?: boolean;
          is_exempt?: boolean;
          remarks?: string | null;
          entered_by: string;
        };
        Update: {
          score?: number | null;
          is_absent?: boolean;
          is_exempt?: boolean;
          remarks?: string | null;
          updated_at?: string;
        };
      };

      report_cards: {
        Row: {
          id: string;
          school_id: string;
          student_id: string;
          academic_year_id: string;
          term_id: string;
          class_group_id: string;
          status: ReportCardStatus;
          data: Record<string, unknown>;
          file_url: string | null;
          class_teacher_remarks: string | null;
          principal_remarks: string | null;
          generated_at: string | null;
          approved_by: string | null;
          approved_at: string | null;
          published_by: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          student_id: string;
          academic_year_id: string;
          term_id: string;
          class_group_id: string;
          status?: ReportCardStatus;
          data?: Record<string, unknown>;
          file_url?: string | null;
          class_teacher_remarks?: string | null;
          principal_remarks?: string | null;
        };
        Update: {
          status?: ReportCardStatus;
          data?: Record<string, unknown>;
          file_url?: string | null;
          class_teacher_remarks?: string | null;
          principal_remarks?: string | null;
          generated_at?: string | null;
          approved_by?: string | null;
          approved_at?: string | null;
          published_by?: string | null;
          published_at?: string | null;
          updated_at?: string;
        };
      };

      report_card_publications: {
        Row: {
          id: string;
          report_card_id: string;
          published_by: string;
          published_at: string;
          file_url: string | null;
          version: number;
          notes: string | null;
        };
        Insert: {
          id?: string;
          report_card_id: string;
          published_by: string;
          file_url?: string | null;
          version?: number;
          notes?: string | null;
        };
        Update: {
          file_url?: string | null;
          notes?: string | null;
        };
      };

      fee_structures: {
        Row: {
          id: string;
          school_id: string;
          academic_year_id: string;
          term_id: string | null;
          name: string;
          description: string | null;
          class_group_id: string | null;
          amount: number;
          currency: string;
          category: string;
          is_mandatory: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          academic_year_id: string;
          term_id?: string | null;
          name: string;
          description?: string | null;
          class_group_id?: string | null;
          amount: number;
          currency?: string;
          category?: string;
          is_mandatory?: boolean;
          is_active?: boolean;
        };
        Update: {
          name?: string;
          description?: string | null;
          class_group_id?: string | null;
          amount?: number;
          currency?: string;
          category?: string;
          is_mandatory?: boolean;
          is_active?: boolean;
          updated_at?: string;
        };
      };

      invoices: {
        Row: {
          id: string;
          school_id: string;
          student_id: string;
          academic_year_id: string;
          term_id: string | null;
          invoice_number: string;
          total_amount: number;
          discount_amount: number;
          paid_amount: number;
          balance: number;
          currency: string;
          status: InvoiceStatus;
          due_date: string | null;
          notes: string | null;
          issued_by: string | null;
          issued_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          student_id: string;
          academic_year_id: string;
          term_id?: string | null;
          invoice_number: string;
          total_amount: number;
          discount_amount?: number;
          paid_amount?: number;
          balance: number;
          currency?: string;
          status?: InvoiceStatus;
          due_date?: string | null;
          notes?: string | null;
          issued_by?: string | null;
          issued_at?: string | null;
        };
        Update: {
          total_amount?: number;
          discount_amount?: number;
          paid_amount?: number;
          balance?: number;
          status?: InvoiceStatus;
          due_date?: string | null;
          notes?: string | null;
          issued_by?: string | null;
          issued_at?: string | null;
          updated_at?: string;
        };
      };

      invoice_lines: {
        Row: {
          id: string;
          invoice_id: string;
          fee_structure_id: string | null;
          description: string;
          amount: number;
          currency: string;
          quantity: number;
          discount: number;
          total: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          fee_structure_id?: string | null;
          description: string;
          amount: number;
          currency?: string;
          quantity?: number;
          discount?: number;
          total: number;
        };
        Update: {
          description?: string;
          amount?: number;
          quantity?: number;
          discount?: number;
          total?: number;
        };
      };

      payments: {
        Row: {
          id: string;
          school_id: string;
          invoice_id: string | null;
          student_id: string;
          amount: number;
          currency: string;
          status: PaymentStatus;
          payment_method: string | null;
          provider: string | null;
          provider_reference: string | null;
          internal_reference: string;
          provider_metadata: Record<string, unknown>;
          paid_at: string | null;
          verified_at: string | null;
          verified_by: string | null;
          receipt_number: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          invoice_id?: string | null;
          student_id: string;
          amount: number;
          currency?: string;
          status?: PaymentStatus;
          payment_method?: string | null;
          provider?: string | null;
          provider_reference?: string | null;
          internal_reference: string;
          provider_metadata?: Record<string, unknown>;
          notes?: string | null;
        };
        Update: {
          status?: PaymentStatus;
          payment_method?: string | null;
          provider_reference?: string | null;
          provider_metadata?: Record<string, unknown>;
          paid_at?: string | null;
          verified_at?: string | null;
          verified_by?: string | null;
          receipt_number?: string | null;
          notes?: string | null;
          updated_at?: string;
        };
      };

      payment_allocations: {
        Row: {
          id: string;
          payment_id: string;
          invoice_id: string;
          amount: number;
          currency: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          payment_id: string;
          invoice_id: string;
          amount: number;
          currency?: string;
        };
        Update: {
          amount?: number;
        };
      };

      refunds: {
        Row: {
          id: string;
          school_id: string;
          payment_id: string;
          amount: number;
          currency: string;
          reason: string;
          status: RefundStatus;
          provider_reference: string | null;
          processed_by: string | null;
          processed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          payment_id: string;
          amount: number;
          currency?: string;
          reason: string;
          status?: RefundStatus;
        };
        Update: {
          status?: RefundStatus;
          provider_reference?: string | null;
          processed_by?: string | null;
          processed_at?: string | null;
          updated_at?: string;
        };
      };

      webhook_events: {
        Row: {
          id: string;
          provider: string;
          provider_event_id: string;
          event_type: string;
          payload: Record<string, unknown>;
          status: WebhookEventStatus;
          attempts: number;
          last_error: string | null;
          processed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider: string;
          provider_event_id: string;
          event_type: string;
          payload?: Record<string, unknown>;
          status?: WebhookEventStatus;
        };
        Update: {
          status?: WebhookEventStatus;
          attempts?: number;
          last_error?: string | null;
          processed_at?: string | null;
        };
      };

      announcements: {
        Row: {
          id: string;
          school_id: string;
          title: string;
          content: string;
          target: AnnouncementTarget;
          target_id: string | null;
          priority: string;
          is_pinned: boolean;
          published_at: string | null;
          expires_at: string | null;
          author_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          title: string;
          content: string;
          target?: AnnouncementTarget;
          target_id?: string | null;
          priority?: string;
          is_pinned?: boolean;
          published_at?: string | null;
          expires_at?: string | null;
          author_id: string;
        };
        Update: {
          title?: string;
          content?: string;
          target?: AnnouncementTarget;
          target_id?: string | null;
          priority?: string;
          is_pinned?: boolean;
          published_at?: string | null;
          expires_at?: string | null;
          updated_at?: string;
        };
      };

      notification_deliveries: {
        Row: {
          id: string;
          announcement_id: string | null;
          recipient_id: string;
          channel: string;
          status: NotificationStatus;
          sent_at: string | null;
          read_at: string | null;
          error_message: string | null;
          attempts: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          announcement_id?: string | null;
          recipient_id: string;
          channel?: string;
          status?: NotificationStatus;
        };
        Update: {
          status?: NotificationStatus;
          sent_at?: string | null;
          read_at?: string | null;
          error_message?: string | null;
          attempts?: number;
          updated_at?: string;
        };
      };

      stored_files: {
        Row: {
          id: string;
          school_id: string;
          bucket: string;
          storage_path: string;
          original_name: string;
          mime_type: string;
          size_bytes: number;
          uploaded_by: string;
          entity_type: string | null;
          entity_id: string | null;
          is_public: boolean;
          metadata: Record<string, unknown>;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          bucket: string;
          storage_path: string;
          original_name: string;
          mime_type: string;
          size_bytes: number;
          uploaded_by: string;
          entity_type?: string | null;
          entity_id?: string | null;
          is_public?: boolean;
          metadata?: Record<string, unknown>;
        };
        Update: {
          entity_type?: string | null;
          entity_id?: string | null;
          is_public?: boolean;
          metadata?: Record<string, unknown>;
        };
      };

      audit_logs: {
        Row: {
          id: string;
          school_id: string | null;
          actor_id: string | null;
          action: string;
          resource_type: string;
          resource_id: string | null;
          metadata: Record<string, unknown>;
          ip_address: string | null;
          user_agent: string | null;
          reason: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id?: string | null;
          actor_id?: string | null;
          action: string;
          resource_type: string;
          resource_id?: string | null;
          metadata?: Record<string, unknown>;
          ip_address?: string | null;
          user_agent?: string | null;
          reason?: string | null;
        };
        Update: Record<string, never>;
      };

      plans: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price_monthly: number;
          price_yearly: number;
          currency: string;
          max_students: number | null;
          max_staff: number | null;
          max_storage_mb: number | null;
          features: Record<string, unknown>;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price_monthly?: number;
          price_yearly?: number;
          currency?: string;
          max_students?: number | null;
          max_staff?: number | null;
          max_storage_mb?: number | null;
          features?: Record<string, unknown>;
          is_active?: boolean;
          sort_order?: number;
        };
        Update: {
          name?: string;
          description?: string | null;
          price_monthly?: number;
          price_yearly?: number;
          currency?: string;
          max_students?: number | null;
          max_staff?: number | null;
          max_storage_mb?: number | null;
          features?: Record<string, unknown>;
          is_active?: boolean;
          sort_order?: number;
          updated_at?: string;
        };
      };

      subscriptions: {
        Row: {
          id: string;
          school_id: string;
          plan_id: string;
          status: SubscriptionStatus;
          billing_cycle: string;
          current_period_start: string;
          current_period_end: string;
          trial_end: string | null;
          cancelled_at: string | null;
          provider: string | null;
          provider_subscription_id: string | null;
          provider_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          plan_id: string;
          status?: SubscriptionStatus;
          billing_cycle?: string;
          current_period_start: string;
          current_period_end: string;
          trial_end?: string | null;
          provider?: string | null;
          provider_subscription_id?: string | null;
          provider_customer_id?: string | null;
        };
        Update: {
          plan_id?: string;
          status?: SubscriptionStatus;
          billing_cycle?: string;
          current_period_start?: string;
          current_period_end?: string;
          trial_end?: string | null;
          cancelled_at?: string | null;
          provider?: string | null;
          provider_subscription_id?: string | null;
          provider_customer_id?: string | null;
          updated_at?: string;
        };
      };

      billing_events: {
        Row: {
          id: string;
          subscription_id: string;
          event_type: BillingEventType;
          amount: number | null;
          currency: string | null;
          provider_reference: string | null;
          metadata: Record<string, unknown>;
          created_at: string;
        };
        Insert: {
          id?: string;
          subscription_id: string;
          event_type: BillingEventType;
          amount?: number | null;
          currency?: string | null;
          provider_reference?: string | null;
          metadata?: Record<string, unknown>;
        };
        Update: {
          amount?: number | null;
          currency?: string | null;
          metadata?: Record<string, unknown>;
        };
      };

      lesson_plans: {
        Row: {
          id: string;
          school_id: string;
          staff_id: string;
          subject_id: string;
          class_group_id: string;
          term_id: string | null;
          week_number: number;
          topic: string;
          objectives: string[];
          teaching_aids: string[] | null;
          lab_safety_notes: string | null;
          content_summary: string | null;
          status: 'draft' | 'submitted' | 'approved' | 'revision_requested';
          feedback: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          staff_id: string;
          subject_id: string;
          class_group_id: string;
          term_id?: string | null;
          week_number: number;
          topic: string;
          objectives?: string[];
          teaching_aids?: string[] | null;
          lab_safety_notes?: string | null;
          content_summary?: string | null;
          status?: 'draft' | 'submitted' | 'approved' | 'revision_requested';
          feedback?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          week_number?: number;
          topic?: string;
          objectives?: string[];
          teaching_aids?: string[] | null;
          lab_safety_notes?: string | null;
          content_summary?: string | null;
          status?: 'draft' | 'submitted' | 'approved' | 'revision_requested';
          feedback?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          updated_at?: string;
        };
      };

      classroom_observations: {
        Row: {
          id: string;
          school_id: string;
          teacher_id: string;
          observer_id: string;
          class_group_id: string | null;
          subject_id: string | null;
          observation_date: string;
          rating: number;
          pedagogy_notes: string | null;
          strengths: string | null;
          recommendations: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          teacher_id: string;
          observer_id: string;
          class_group_id?: string | null;
          subject_id?: string | null;
          observation_date: string;
          rating: number;
          pedagogy_notes?: string | null;
          strengths?: string | null;
          recommendations?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          rating?: number;
          pedagogy_notes?: string | null;
          strengths?: string | null;
          recommendations?: string | null;
          updated_at?: string;
        };
      };

      academic_intervention_plans: {
        Row: {
          id: string;
          school_id: string;
          student_id: string;
          mentor_staff_id: string | null;
          subject_id: string | null;
          diagnosed_gap: string;
          action_plan: string;
          weekly_target: string;
          target_gpa: number | null;
          status: 'active' | 'review_required' | 'completed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          student_id: string;
          mentor_staff_id?: string | null;
          subject_id?: string | null;
          diagnosed_gap: string;
          action_plan: string;
          weekly_target: string;
          target_gpa?: number | null;
          status?: 'active' | 'review_required' | 'completed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          diagnosed_gap?: string;
          action_plan?: string;
          weekly_target?: string;
          target_gpa?: number | null;
          status?: 'active' | 'review_required' | 'completed';
          updated_at?: string;
        };
      };

      grade_amendment_audits: {
        Row: {
          id: string;
          school_id: string;
          assessment_score_id: string | null;
          student_id: string;
          subject_id: string;
          teacher_id: string;
          original_score: number;
          amended_score: number;
          justification: string;
          approved_by: string | null;
          status: 'pending' | 'approved' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          assessment_score_id?: string | null;
          student_id: string;
          subject_id: string;
          teacher_id: string;
          original_score: number;
          amended_score: number;
          justification: string;
          approved_by?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          amended_score?: number;
          justification?: string;
          approved_by?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          updated_at?: string;
        };
      };

      staff_confirmation_requests: {
        Row: {
          id: string;
          school_id: string;
          staff_profile_id: string;
          role_key: string;
          form_class_id: string | null;
          qualifications: string | null;
          onboarded_by: string | null;
          confirmed_by: string | null;
          confirmed_at: string | null;
          status: 'pending' | 'confirmed' | 'rejected';
          rejection_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          staff_profile_id: string;
          role_key: string;
          form_class_id?: string | null;
          qualifications?: string | null;
          onboarded_by?: string | null;
          confirmed_by?: string | null;
          confirmed_at?: string | null;
          status?: 'pending' | 'confirmed' | 'rejected';
          rejection_reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: 'pending' | 'confirmed' | 'rejected';
          confirmed_by?: string | null;
          confirmed_at?: string | null;
          rejection_reason?: string | null;
          updated_at?: string;
        };
      };

      staff_leaves: {
        Row: {
          id: string;
          school_id: string;
          staff_id: string;
          substitute_staff_id: string | null;
          start_date: string;
          end_date: string;
          reason: string;
          periods_covered: string | null;
          status: 'pending' | 'approved' | 'rejected';
          approved_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          staff_id: string;
          substitute_staff_id?: string | null;
          start_date: string;
          end_date: string;
          reason: string;
          periods_covered?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          approved_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: 'pending' | 'approved' | 'rejected';
          approved_by?: string | null;
          substitute_staff_id?: string | null;
          updated_at?: string;
        };
      };

      disciplinary_incidents: {
        Row: {
          id: string;
          school_id: string;
          student_id: string;
          reported_by: string | null;
          category: 'routine' | 'escalated' | 'safeguarding';
          infraction: string;
          location: string | null;
          incident_date: string;
          recommended_action: string | null;
          principal_decision: string | null;
          parent_notified: boolean;
          status: 'pending_review' | 'resolved' | 'conference_booked';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          student_id: string;
          reported_by?: string | null;
          category?: 'routine' | 'escalated' | 'safeguarding';
          infraction: string;
          location?: string | null;
          incident_date?: string;
          recommended_action?: string | null;
          principal_decision?: string | null;
          parent_notified?: boolean;
          status?: 'pending_review' | 'resolved' | 'conference_booked';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          principal_decision?: string | null;
          parent_notified?: boolean;
          status?: 'pending_review' | 'resolved' | 'conference_booked';
          updated_at?: string;
        };
      };

      parent_conferences: {
        Row: {
          id: string;
          school_id: string;
          student_id: string;
          guardian_id: string | null;
          staff_id: string | null;
          scheduled_time: string;
          venue: string;
          agenda: string;
          meeting_notes: string | null;
          status: 'scheduled' | 'completed' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          student_id: string;
          guardian_id?: string | null;
          staff_id?: string | null;
          scheduled_time: string;
          venue: string;
          agenda: string;
          meeting_notes?: string | null;
          status?: 'scheduled' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          scheduled_time?: string;
          venue?: string;
          meeting_notes?: string | null;
          status?: 'scheduled' | 'completed' | 'cancelled';
          updated_at?: string;
        };
      };

      safeguarding_records: {
        Row: {
          id: string;
          school_id: string;
          student_id: string;
          dsl_staff_id: string | null;
          case_code: string;
          incident_summary: string;
          action_taken: string;
          external_referrals: string | null;
          is_restricted: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          student_id: string;
          dsl_staff_id?: string | null;
          case_code: string;
          incident_summary: string;
          action_taken: string;
          external_referrals?: string | null;
          is_restricted?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          action_taken?: string;
          external_referrals?: string | null;
          is_restricted?: boolean;
          updated_at?: string;
        };
      };

      school_events: {
        Row: {
          id: string;
          school_id: string;
          title: string;
          category: 'academic' | 'examination' | 'meeting' | 'co-curricular';
          start_time: string;
          end_time: string;
          venue: string;
          lead_coordinator_id: string | null;
          description: string | null;
          published_to_parents: boolean;
          published_to_students: boolean;
          status: 'pending' | 'approved';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          title: string;
          category?: 'academic' | 'examination' | 'meeting' | 'co-curricular';
          start_time: string;
          end_time: string;
          venue: string;
          lead_coordinator_id?: string | null;
          description?: string | null;
          published_to_parents?: boolean;
          published_to_students?: boolean;
          status?: 'pending' | 'approved';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          start_time?: string;
          end_time?: string;
          venue?: string;
          published_to_parents?: boolean;
          published_to_students?: boolean;
          status?: 'pending' | 'approved';
          updated_at?: string;
        };
      };

      timetable_change_requests: {
        Row: {
          id: string;
          school_id: string;
          requester_id: string;
          change_type: 'room_swap' | 'period_adjustment' | 'emergency_cover';
          details: string;
          affected_classes: string;
          status: 'pending' | 'approved' | 'rejected';
          approved_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          requester_id: string;
          change_type: 'room_swap' | 'period_adjustment' | 'emergency_cover';
          details: string;
          affected_classes: string;
          status?: 'pending' | 'approved' | 'rejected';
          approved_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: 'pending' | 'approved' | 'rejected';
          approved_by?: string | null;
          updated_at?: string;
        };
      };

      attendance_corrections: {
        Row: {
          id: string;
          school_id: string;
          student_id: string;
          attendance_record_id: string | null;
          original_status: AttendanceValue;
          requested_status: AttendanceValue;
          reason: string;
          submitted_by: string;
          approved_by: string | null;
          status: 'pending' | 'approved' | 'rejected';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          student_id: string;
          attendance_record_id?: string | null;
          original_status: AttendanceValue;
          requested_status: AttendanceValue;
          reason: string;
          submitted_by: string;
          approved_by?: string | null;
          status?: 'pending' | 'approved' | 'rejected';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: 'pending' | 'approved' | 'rejected';
          approved_by?: string | null;
          updated_at?: string;
        };
      };

      expenditure_requisitions: {
        Row: {
          id: string;
          school_id: string;
          department: string;
          title: string;
          amount_cents: number;
          currency: string;
          submitted_by: string;
          purpose: string;
          within_limit: boolean;
          status: 'pending' | 'approved' | 'escalated_owner' | 'rejected';
          approved_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          department: string;
          title: string;
          amount_cents: number;
          currency?: string;
          submitted_by: string;
          purpose: string;
          within_limit?: boolean;
          status?: 'pending' | 'approved' | 'escalated_owner' | 'rejected';
          approved_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: 'pending' | 'approved' | 'escalated_owner' | 'rejected';
          approved_by?: string | null;
          updated_at?: string;
        };
      };

      scholarships_and_waivers: {
        Row: {
          id: string;
          school_id: string;
          student_id: string;
          invoice_id: string | null;
          waiver_type: 'academic_merit' | 'staff_child' | 'hardship' | 'sibling';
          discount_percentage: number;
          amount_cents: number;
          currency: string;
          justification: string;
          status: 'pending' | 'approved' | 'rejected';
          approved_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          student_id: string;
          invoice_id?: string | null;
          waiver_type: 'academic_merit' | 'staff_child' | 'hardship' | 'sibling';
          discount_percentage: number;
          amount_cents: number;
          currency?: string;
          justification: string;
          status?: 'pending' | 'approved' | 'rejected';
          approved_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: 'pending' | 'approved' | 'rejected';
          approved_by?: string | null;
          updated_at?: string;
        };
      };

      school_bank_accounts: {
        Row: {
          id: string;
          school_id: string;
          bank_name: string;
          account_number: string;
          account_name: string;
          sort_code: string | null;
          currency: string;
          is_active: boolean;
          is_primary: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          bank_name: string;
          account_number: string;
          account_name: string;
          sort_code?: string | null;
          currency?: string;
          is_active?: boolean;
          is_primary?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          bank_name?: string;
          account_number?: string;
          account_name?: string;
          is_active?: boolean;
          is_primary?: boolean;
          updated_at?: string;
        };
      };

      bank_statement_transactions: {
        Row: {
          id: string;
          school_id: string;
          bank_account_id: string;
          transaction_date: string;
          reference: string;
          description: string;
          amount_cents: number;
          currency: string;
          payment_id: string | null;
          is_reconciled: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          bank_account_id: string;
          transaction_date: string;
          reference: string;
          description: string;
          amount_cents: number;
          currency?: string;
          payment_id?: string | null;
          is_reconciled?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          payment_id?: string | null;
          is_reconciled?: boolean;
          updated_at?: string;
        };
      };

      petty_cash_disbursements: {
        Row: {
          id: string;
          school_id: string;
          voucher_number: string;
          amount_cents: number;
          currency: string;
          disbursed_to: string;
          purpose: string;
          custodian_id: string | null;
          approved_by: string | null;
          disbursed_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          voucher_number: string;
          amount_cents: number;
          currency?: string;
          disbursed_to: string;
          purpose: string;
          custodian_id?: string | null;
          approved_by?: string | null;
          disbursed_at?: string;
          created_at?: string;
        };
        Update: {
          amount_cents?: number;
          purpose?: string;
          approved_by?: string | null;
        };
      };

      homework_assignments: {
        Row: {
          id: string;
          school_id: string;
          subject_id: string;
          class_group_id: string;
          teacher_id: string;
          title: string;
          instructions: string;
          due_date: string;
          total_points: number;
          attachment_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          subject_id: string;
          class_group_id: string;
          teacher_id: string;
          title: string;
          instructions: string;
          due_date: string;
          total_points?: number;
          attachment_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          instructions?: string;
          due_date?: string;
          total_points?: number;
          attachment_url?: string | null;
          updated_at?: string;
        };
      };

      homework_submissions: {
        Row: {
          id: string;
          homework_id: string;
          student_id: string;
          submission_text: string | null;
          attachment_url: string | null;
          submitted_at: string;
          grade_score: number | null;
          teacher_feedback: string | null;
          graded_at: string | null;
          graded_by: string | null;
        };
        Insert: {
          id?: string;
          homework_id: string;
          student_id: string;
          submission_text?: string | null;
          attachment_url?: string | null;
          submitted_at?: string;
          grade_score?: number | null;
          teacher_feedback?: string | null;
          graded_at?: string | null;
          graded_by?: string | null;
        };
        Update: {
          submission_text?: string | null;
          attachment_url?: string | null;
          grade_score?: number | null;
          teacher_feedback?: string | null;
          graded_at?: string | null;
          graded_by?: string | null;
        };
      };

      learning_resources: {
        Row: {
          id: string;
          school_id: string;
          subject_id: string;
          class_group_id: string;
          title: string;
          description: string | null;
          resource_type: 'pdf' | 'video' | 'slides' | 'past_questions';
          file_url: string;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          subject_id: string;
          class_group_id: string;
          title: string;
          description?: string | null;
          resource_type?: 'pdf' | 'video' | 'slides' | 'past_questions';
          file_url: string;
          uploaded_by?: string | null;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          file_url?: string;
        };
      };

      authorized_pickup_persons: {
        Row: {
          id: string;
          school_id: string;
          student_id: string;
          guardian_id: string;
          name: string;
          relationship: string;
          phone: string;
          pickup_pin_hash: string | null;
          photo_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          student_id: string;
          guardian_id: string;
          name: string;
          relationship: string;
          phone: string;
          pickup_pin_hash?: string | null;
          photo_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          phone?: string;
          pickup_pin_hash?: string | null;
          photo_url?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
      };

      transport_routes: {
        Row: {
          id: string;
          school_id: string;
          route_name: string;
          driver_name: string;
          driver_phone: string;
          vehicle_reg: string;
          stops: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          route_name: string;
          driver_name: string;
          driver_phone: string;
          vehicle_reg: string;
          stops?: string[];
          created_at?: string;
        };
        Update: {
          route_name?: string;
          driver_name?: string;
          driver_phone?: string;
          vehicle_reg?: string;
          stops?: string[];
        };
      };

      student_transport_bookings: {
        Row: {
          id: string;
          route_id: string;
          student_id: string;
          pickup_stop: string;
          dropoff_stop: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          route_id: string;
          student_id: string;
          pickup_stop: string;
          dropoff_stop: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          pickup_stop?: string;
          dropoff_stop?: string;
          is_active?: boolean;
        };
      };

      boarding_rooms: {
        Row: {
          id: string;
          school_id: string;
          hall_name: string;
          room_number: string;
          capacity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          hall_name: string;
          room_number: string;
          capacity?: number;
          created_at?: string;
        };
        Update: {
          hall_name?: string;
          room_number?: string;
          capacity?: number;
        };
      };

      boarding_allocations: {
        Row: {
          id: string;
          room_id: string;
          student_id: string;
          bed_number: string;
          academic_year_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          room_id: string;
          student_id: string;
          bed_number: string;
          academic_year_id?: string | null;
          created_at?: string;
        };
        Update: {
          bed_number?: string;
        };
      };

      parent_inquiries: {
        Row: {
          id: string;
          school_id: string;
          parent_id: string;
          student_id: string | null;
          category: 'academic' | 'financial_dispute' | 'portal_access' | 'transport';
          subject: string;
          message: string;
          assigned_to_role: 'teacher' | 'bursar' | 'admin' | 'principal';
          status: 'open' | 'in_progress' | 'resolved' | 'delegated_bursar' | 'delegated_admin';
          resolution_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          parent_id: string;
          student_id?: string | null;
          category: 'academic' | 'financial_dispute' | 'portal_access' | 'transport';
          subject: string;
          message: string;
          assigned_to_role?: 'teacher' | 'bursar' | 'admin' | 'principal';
          status?: 'open' | 'in_progress' | 'resolved' | 'delegated_bursar' | 'delegated_admin';
          resolution_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          assigned_to_role?: 'teacher' | 'bursar' | 'admin' | 'principal';
          status?: 'open' | 'in_progress' | 'resolved' | 'delegated_bursar' | 'delegated_admin';
          resolution_notes?: string | null;
          updated_at?: string;
        };
      };

      campuses: {
        Row: {
          id: string;
          organization_name: string;
          headquarters_address: string | null;
          school_id: string;
          campus_code: string;
          is_main_campus: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_name: string;
          headquarters_address?: string | null;
          school_id: string;
          campus_code: string;
          is_main_campus?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          organization_name?: string;
          headquarters_address?: string | null;
          campus_code?: string;
          is_main_campus?: boolean;
          updated_at?: string;
        };
      };

      platform_coupons: {
        Row: {
          id: string;
          code: string;
          description: string | null;
          discount_type: 'percentage' | 'fixed_amount';
          discount_value: number;
          currency: string;
          valid_from: string;
          valid_until: string | null;
          max_redemptions: number | null;
          times_redeemed: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          code: string;
          description?: string | null;
          discount_type?: 'percentage' | 'fixed_amount';
          discount_value: number;
          currency?: string;
          valid_from?: string;
          valid_until?: string | null;
          max_redemptions?: number | null;
          times_redeemed?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          is_active?: boolean;
          times_redeemed?: number;
          valid_until?: string | null;
        };
      };

      support_sessions: {
        Row: {
          id: string;
          operator_id: string;
          school_id: string;
          reason: string;
          ticket_reference: string | null;
          ip_address: string | null;
          started_at: string;
          expires_at: string;
          revoked_at: string | null;
          status: 'active' | 'expired' | 'revoked';
          created_at: string;
        };
        Insert: {
          id?: string;
          operator_id: string;
          school_id: string;
          reason: string;
          ticket_reference?: string | null;
          ip_address?: string | null;
          started_at?: string;
          expires_at: string;
          revoked_at?: string | null;
          status?: 'active' | 'expired' | 'revoked';
          created_at?: string;
        };
        Update: {
          status?: 'active' | 'expired' | 'revoked';
          revoked_at?: string | null;
        };
      };

      support_tickets: {
        Row: {
          id: string;
          school_id: string;
          submitted_by: string;
          ticket_number: string;
          subject: string;
          description: string;
          priority: 'low' | 'normal' | 'high' | 'critical';
          status: 'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed';
          assigned_operator_id: string | null;
          sla_due_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          school_id: string;
          submitted_by: string;
          ticket_number: string;
          subject: string;
          description: string;
          priority?: 'low' | 'normal' | 'high' | 'critical';
          status?: 'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed';
          assigned_operator_id?: string | null;
          sla_due_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          priority?: 'low' | 'normal' | 'high' | 'critical';
          status?: 'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed';
          assigned_operator_id?: string | null;
          updated_at?: string;
        };
      };

      support_ticket_messages: {
        Row: {
          id: string;
          ticket_id: string;
          author_id: string;
          message: string;
          is_internal_note: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          ticket_id: string;
          author_id: string;
          message: string;
          is_internal_note?: boolean;
          created_at?: string;
        };
        Update: {
          message?: string;
          is_internal_note?: boolean;
        };
      };

      feature_flags: {
        Row: {
          id: string;
          key: string;
          name: string;
          description: string | null;
          enabled_globally: boolean;
          rollout_percentage: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          name: string;
          description?: string | null;
          enabled_globally?: boolean;
          rollout_percentage?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          enabled_globally?: boolean;
          rollout_percentage?: number;
          updated_at?: string;
        };
      };

      tenant_feature_flags: {
        Row: {
          id: string;
          feature_flag_id: string;
          school_id: string;
          enabled: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          feature_flag_id: string;
          school_id: string;
          enabled: boolean;
          created_at?: string;
        };
        Update: {
          enabled?: boolean;
        };
      };

      platform_integrations: {
        Row: {
          id: string;
          provider: string;
          category: 'payment' | 'sms' | 'email' | 'storage';
          is_enabled: boolean;
          config: Record<string, unknown>;
          health_status: 'healthy' | 'degraded' | 'offline';
          last_tested_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          provider: string;
          category: 'payment' | 'sms' | 'email' | 'storage';
          is_enabled?: boolean;
          config?: Record<string, unknown>;
          health_status?: 'healthy' | 'degraded' | 'offline';
          last_tested_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          is_enabled?: boolean;
          config?: Record<string, unknown>;
          health_status?: 'healthy' | 'degraded' | 'offline';
          last_tested_at?: string | null;
          updated_at?: string;
        };
      };

      background_jobs: {
        Row: {
          id: string;
          queue_name: string;
          job_name: string;
          school_id: string | null;
          payload: Record<string, unknown>;
          status: 'queued' | 'processing' | 'completed' | 'failed' | 'retrying';
          attempts: number;
          max_attempts: number;
          scheduled_for: string;
          started_at: string | null;
          completed_at: string | null;
          error_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          queue_name: string;
          job_name: string;
          school_id?: string | null;
          payload?: Record<string, unknown>;
          status?: 'queued' | 'processing' | 'completed' | 'failed' | 'retrying';
          attempts?: number;
          max_attempts?: number;
          scheduled_for?: string;
          started_at?: string | null;
          completed_at?: string | null;
          error_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: 'queued' | 'processing' | 'completed' | 'failed' | 'retrying';
          attempts?: number;
          started_at?: string | null;
          completed_at?: string | null;
          error_message?: string | null;
          updated_at?: string;
        };
      };

      system_incidents: {
        Row: {
          id: string;
          title: string;
          impact: 'none' | 'minor' | 'major' | 'critical';
          status: 'scheduled' | 'in_progress' | 'resolved';
          start_time: string;
          end_time: string | null;
          description: string;
          affected_services: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          impact?: 'none' | 'minor' | 'major' | 'critical';
          status?: 'scheduled' | 'in_progress' | 'resolved';
          start_time: string;
          end_time?: string | null;
          description: string;
          affected_services?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          impact?: 'none' | 'minor' | 'major' | 'critical';
          status?: 'scheduled' | 'in_progress' | 'resolved';
          end_time?: string | null;
          description?: string;
          affected_services?: string[];
          updated_at?: string;
        };
      };

      platform_announcements: {
        Row: {
          id: string;
          title: string;
          content: string;
          priority: 'normal' | 'urgent' | 'maintenance';
          target_plans: string[];
          published_by: string | null;
          published_at: string;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          priority?: 'normal' | 'urgent' | 'maintenance';
          target_plans?: string[];
          published_by?: string | null;
          published_at?: string;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          title?: string;
          content?: string;
          priority?: 'normal' | 'urgent' | 'maintenance';
          target_plans?: string[];
          expires_at?: string | null;
        };
      };
}

export type TablesRecord = {
  [K in keyof RawTables]: RawTables[K] & {
    Relationships: [];
  };
};

export interface Database {
  public: {
    Tables: TablesRecord;
    Views: Record<string, never>;

    Functions: {
      has_school_membership: {
        Args: { p_school_id: string };
        Returns: boolean;
      };
      is_platform_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };

    Enums: {
      school_status: SchoolStatus;
      membership_status: MembershipStatus;
      student_status: StudentStatus;
      admission_status: AdmissionStatus;
      enrollment_status: EnrollmentStatus;
      attendance_value: AttendanceValue;
      assessment_state: AssessmentState;
      invoice_status: InvoiceStatus;
      payment_status: PaymentStatus;
      refund_status: RefundStatus;
      webhook_event_status: WebhookEventStatus;
      announcement_target: AnnouncementTarget;
      notification_status: NotificationStatus;
      subscription_status: SubscriptionStatus;
      billing_event_type: BillingEventType;
      gender_type: GenderType;
      guardian_relationship: GuardianRelationship;
      staff_employment_status: StaffEmploymentStatus;
      day_of_week: DayOfWeek;
      report_card_status: ReportCardStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

// ─── Convenience type helpers ────────────────────────────────────────────

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

// Common entity shortcuts
export type Profile = Tables<'profiles'>;
export type School = Tables<'schools'>;
export type SchoolMembership = Tables<'school_memberships'>;
export type Role = Tables<'roles'>;
export type Permission = Tables<'permissions'>;
export type AcademicYear = Tables<'academic_years'>;
export type Term = Tables<'terms'>;
export type ClassGroup = Tables<'class_groups'>;
export type Subject = Tables<'subjects'>;
export type Student = Tables<'students'>;
export type Guardian = Tables<'guardians'>;
export type StaffProfile = Tables<'staff_profiles'>;
export type Assessment = Tables<'assessments'>;
export type AssessmentScore = Tables<'assessment_scores'>;
export type Enrollment = Tables<'enrollments'>;
export type AttendanceSession = Tables<'attendance_sessions'>;
export type AttendanceRecord = Tables<'attendance_records'>;
export type Invoice = Tables<'invoices'>;
export type Payment = Tables<'payments'>;
export type Announcement = Tables<'announcements'>;
export type AuditLog = Tables<'audit_logs'>;
export type Plan = Tables<'plans'>;
export type Subscription = Tables<'subscriptions'>;
export type ReportCard = Tables<'report_cards'>;
export type StoredFile = Tables<'stored_files'>;

// Academic Leadership & Teaching
export type LessonPlan = Tables<'lesson_plans'>;
export type ClassroomObservation = Tables<'classroom_observations'>;
export type AcademicInterventionPlan = Tables<'academic_intervention_plans'>;
export type GradeAmendmentAudit = Tables<'grade_amendment_audits'>;

// Staff Administration & Leave
export type StaffConfirmationRequest = Tables<'staff_confirmation_requests'>;
export type StaffLeave = Tables<'staff_leaves'>;

// Pastoral, Discipline & Safeguarding
export type DisciplinaryIncident = Tables<'disciplinary_incidents'>;
export type ParentConference = Tables<'parent_conferences'>;
export type SafeguardingRecord = Tables<'safeguarding_records'>;

// Operations & Timetable
export type SchoolEvent = Tables<'school_events'>;
export type TimetableChangeRequest = Tables<'timetable_change_requests'>;
export type AttendanceCorrection = Tables<'attendance_corrections'>;

// Financial Operations & Banking
export type ExpenditureRequisition = Tables<'expenditure_requisitions'>;
export type ScholarshipAndWaiver = Tables<'scholarships_and_waivers'>;
export type SchoolBankAccount = Tables<'school_bank_accounts'>;
export type BankStatementTransaction = Tables<'bank_statement_transactions'>;
export type PettyCashDisbursement = Tables<'petty_cash_disbursements'>;

// Student & Parent Experience
export type HomeworkAssignment = Tables<'homework_assignments'>;
export type HomeworkSubmission = Tables<'homework_submissions'>;
export type LearningResource = Tables<'learning_resources'>;
export type AuthorizedPickupPerson = Tables<'authorized_pickup_persons'>;
export type TransportRoute = Tables<'transport_routes'>;
export type StudentTransportBooking = Tables<'student_transport_bookings'>;
export type BoardingRoom = Tables<'boarding_rooms'>;
export type BoardingAllocation = Tables<'boarding_allocations'>;
export type ParentInquiry = Tables<'parent_inquiries'>;

// Platform & Super Admin Multi-Tenancy
export type Campus = Tables<'campuses'>;
export type PlatformCoupon = Tables<'platform_coupons'>;
export type SupportSession = Tables<'support_sessions'>;
export type SupportTicket = Tables<'support_tickets'>;
export type SupportTicketMessage = Tables<'support_ticket_messages'>;
export type FeatureFlag = Tables<'feature_flags'>;
export type TenantFeatureFlag = Tables<'tenant_feature_flags'>;
export type PlatformIntegration = Tables<'platform_integrations'>;
export type BackgroundJob = Tables<'background_jobs'>;
export type SystemIncident = Tables<'system_incidents'>;
export type PlatformAnnouncement = Tables<'platform_announcements'>;
