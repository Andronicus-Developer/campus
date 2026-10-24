import { createClient } from '@/lib/supabase/server';

interface AuditLogEntry {
  schoolId?: string;
  actorId?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  reason?: string;
}

/**
 * Creates an immutable audit log entry.
 * Use for all sensitive operations: grade changes, attendance corrections,
 * financial adjustments, role changes, exports, etc.
 */
export async function createAuditLog(entry: AuditLogEntry) {
  const supabase = await createClient();

  const { error } = await supabase.from('audit_logs').insert({
    school_id: entry.schoolId,
    actor_id: entry.actorId,
    action: entry.action,
    resource_type: entry.resourceType,
    resource_id: entry.resourceId,
    metadata: entry.metadata ?? {},
    ip_address: entry.ipAddress,
    user_agent: entry.userAgent,
    reason: entry.reason,
  });

  if (error) {
    // Audit log failures should not block operations, but should be logged
    console.error('[AUDIT] Failed to write audit log:', error.message, entry);
  }
}

/**
 * Standard audit actions for consistency across the application.
 */
export const AUDIT_ACTIONS = {
  // Auth
  USER_LOGIN: 'user.login',
  USER_LOGOUT: 'user.logout',

  // Schools
  SCHOOL_CREATED: 'school.created',
  SCHOOL_UPDATED: 'school.updated',
  SCHOOL_SUSPENDED: 'school.suspended',
  SCHOOL_REACTIVATED: 'school.reactivated',

  // Memberships
  MEMBER_ADDED: 'member.added',
  MEMBER_REMOVED: 'member.removed',
  MEMBER_ROLE_CHANGED: 'member.role_changed',

  // Students
  STUDENT_CREATED: 'student.created',
  STUDENT_UPDATED: 'student.updated',
  STUDENT_ARCHIVED: 'student.archived',
  STUDENT_TRANSFERRED: 'student.transferred',

  // Admissions
  ADMISSION_SUBMITTED: 'admission.submitted',
  ADMISSION_REVIEWED: 'admission.reviewed',
  ADMISSION_ACCEPTED: 'admission.accepted',
  ADMISSION_REJECTED: 'admission.rejected',
  ADMISSION_ENROLLED: 'admission.enrolled',

  // Attendance
  ATTENDANCE_TAKEN: 'attendance.taken',
  ATTENDANCE_CORRECTED: 'attendance.corrected',

  // Assessments
  ASSESSMENT_CREATED: 'assessment.created',
  SCORES_ENTERED: 'scores.entered',
  SCORES_SUBMITTED: 'scores.submitted',
  RESULTS_APPROVED: 'results.approved',
  RESULTS_PUBLISHED: 'results.published',

  // Finance
  INVOICE_CREATED: 'invoice.created',
  INVOICE_ISSUED: 'invoice.issued',
  PAYMENT_RECORDED: 'payment.recorded',
  PAYMENT_VERIFIED: 'payment.verified',
  REFUND_ISSUED: 'refund.issued',
  PAYMENT_RECONCILED: 'payment.reconciled',

  // Report Cards
  REPORT_GENERATED: 'report.generated',
  REPORT_APPROVED: 'report.approved',
  REPORT_PUBLISHED: 'report.published',

  // Files
  FILE_UPLOADED: 'file.uploaded',
  FILE_DELETED: 'file.deleted',
  EXPORT_GENERATED: 'export.generated',

  // Settings
  SETTINGS_UPDATED: 'settings.updated',
  ROLE_CREATED: 'role.created',
  ROLE_UPDATED: 'role.updated',
  ROLE_DELETED: 'role.deleted',

  // Platform
  PLATFORM_SUPPORT_ACCESS: 'platform.support_access',
} as const;
