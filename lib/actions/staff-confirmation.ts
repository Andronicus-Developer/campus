"use server";

export interface ConfirmStaffPayload {
  staffId: string;
  principalName?: string;
  approvalNotes?: string;
}

export interface RejectStaffPayload {
  staffId: string;
  reason: string;
}

export async function confirmStaffAppointment(payload: ConfirmStaffPayload) {
  try {
    // In production, update Supabase staff table with confirmation_status = 'confirmed'
    return {
      success: true,
      staffId: payload.staffId,
      confirmedBy: payload.principalName || "Dr. Evelyn Peters (Principal)",
      confirmedAt: new Date().toISOString(),
      message: "Staff appointment authorized and confirmed by Principal.",
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to confirm staff appointment";
    return { success: false, error: message };
  }
}

export async function rejectStaffAppointment(payload: RejectStaffPayload) {
  try {
    return {
      success: true,
      staffId: payload.staffId,
      reason: payload.reason,
      rejectedAt: new Date().toISOString(),
      message: "Staff appointment rejected / returned to School Admin for revision.",
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to reject staff appointment";
    return { success: false, error: message };
  }
}
