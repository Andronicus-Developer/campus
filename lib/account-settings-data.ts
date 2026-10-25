import { RoleKey, ROLES_CONFIG } from "./rbac";

export interface AccountNotificationPreferences {
  emailAlerts: boolean;
  smsAlerts: boolean;
  whatsappAlerts: boolean;
  pushAlerts: boolean;
  weeklyDigest: boolean;
}

export interface AccountSecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod: "sms" | "authenticator";
  lastPasswordChange: string;
  activeSessions: {
    device: string;
    browser: string;
    location: string;
    ipAddress: string;
    lastActive: string;
    isCurrent: boolean;
  }[];
}

export interface UserAccountProfile {
  role: RoleKey;
  idCode: string;
  fullName: string;
  email: string;
  phone: string;
  roleTitle: string;
  department: string;
  bio?: string;
  avatarUrl?: string;
  avatarBgColor?: string;
  avatarTextColor?: string;
  qualifications?: string;
  security: AccountSecuritySettings;
  notifications: AccountNotificationPreferences;
  roleSpecific: Record<string, string | boolean | number>;
  updatedAt?: string;
}

const DEFAULT_SECURITY: AccountSecuritySettings = {
  twoFactorEnabled: false,
  twoFactorMethod: "authenticator",
  lastPasswordChange: "Aug 15, 2025",
  activeSessions: [
    {
      device: "Windows Desktop",
      browser: "Chrome 124.0",
      location: "Lagos, Nigeria",
      ipAddress: "197.210.226.44",
      lastActive: "Active Now",
      isCurrent: true,
    },
    {
      device: "Apple iPhone 15 Pro",
      browser: "Mobile Safari",
      location: "Lagos, Nigeria",
      ipAddress: "105.112.98.12",
      lastActive: "Yesterday, 8:42 PM",
      isCurrent: false,
    },
  ],
};

const DEFAULT_NOTIFICATIONS: AccountNotificationPreferences = {
  emailAlerts: true,
  smsAlerts: true,
  whatsappAlerts: true,
  pushAlerts: true,
  weeklyDigest: true,
};

export function getDefaultAccountProfile(role: RoleKey): UserAccountProfile {
  const config = ROLES_CONFIG[role];
  const persona = config.persona;

  const roleSpecificDefaults: Record<RoleKey, Record<string, string | boolean | number>> = {
    principal: {
      broadsheetDigest: "daily",
      autoSignBroadsheet: false,
      concessionAlertThreshold: 50000,
      digitalSignatureTitle: "Dr. Evelyn Peters, Ph.D. — Principal & CAO",
    },
    teacher: {
      autoSaveScores: true,
      autoSaveIntervalSeconds: 30,
      attendanceReminderTime: "08:15",
      autoFillRemarks: true,
    },
    admin: {
      auditLoggingLevel: "verbose",
      autoGeneratePasswords: true,
      defaultPassPrefix: "Campus#2026!",
      sessionTimeoutMinutes: 60,
    },
    bursar: {
      receiptNumberPrefix: "RC-REC-2026-",
      defaultCurrency: "US$",
      automatedOverdueReminderDays: 7,
      bankAutoReconcile: true,
    },
    student: {
      classReminderMinutesBefore: 10,
      examCountdownActive: true,
      assignmentAlerts: true,
      privacyShareRanking: false,
    },
    parent: {
      instantGateSms: true,
      receiptAutoEmail: true,
      monthlyBalanceAlertWhatsapp: true,
      busTrackerAlerts: true,
    },
  };

  const defaultPhones: Record<RoleKey, string> = {
    principal: "+234 803 555 0101",
    teacher: "+234 803 119 4432",
    admin: "+234 803 999 1100",
    bursar: "+234 802 555 7711",
    student: "+234 818 440 2210",
    parent: "+234 809 112 3344",
  };

  const defaultBios: Record<RoleKey, string> = {
    principal: "Principal and Chief Academic Officer providing executive institutional oversight across academic quality, bursary operations, and faculty development at Riverside International College.",
    teacher: "Senior Mathematics Master and Form Master committed to STEM excellence, WAEC Olympiad coaching, and student continuous assessment mentorship.",
    admin: "Director of Admissions, Registry & Systems Operations administering student quotas, class allocations, timetable slots, and staff credentials.",
    bursar: "Fellow Chartered Accountant leading the Bursary & Treasury Division, revenue forecasting, digital fees reconciliation, and student billings.",
    student: "Grade 11 Senior Secondary Student (Pure Science Stream). Passionate about Robotics, Chemistry Olympiad, and mathematics simulation.",
    parent: "Parent of 2 students enrolled at Riverside International College. Member of the Parent-Teacher Association (PTA) executive council.",
  };

  return {
    role,
    idCode: persona.idCode,
    fullName: persona.name,
    email: persona.email,
    phone: defaultPhones[role] || "+234 800 000 0000",
    roleTitle: persona.roleTitle,
    department: persona.department,
    bio: defaultBios[role],
    avatarBgColor: config.accentColor,
    avatarTextColor: "#ffffff",
    qualifications: role === "principal" ? "Ph.D. Educational Administration" : role === "teacher" ? "B.Sc. Ed. Mathematics (Unilag)" : role === "bursar" ? "B.Sc. Accounting, FCA" : role === "admin" ? "B.Eng. Computer Engineering" : undefined,
    security: DEFAULT_SECURITY,
    notifications: DEFAULT_NOTIFICATIONS,
    roleSpecific: roleSpecificDefaults[role] || {},
  };
}

const STORAGE_PREFIX = "campus360_account_profile_";

export function getStoredAccountProfile(role: RoleKey): UserAccountProfile {
  if (typeof window === "undefined") {
    return getDefaultAccountProfile(role);
  }
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${role}`);
    if (!raw) {
      const def = getDefaultAccountProfile(role);
      localStorage.setItem(`${STORAGE_PREFIX}${role}`, JSON.stringify(def));
      return def;
    }
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultAccountProfile(role),
      ...parsed,
      security: {
        ...DEFAULT_SECURITY,
        ...(parsed.security || {}),
      },
      notifications: {
        ...DEFAULT_NOTIFICATIONS,
        ...(parsed.notifications || {}),
      },
      roleSpecific: {
        ...(getDefaultAccountProfile(role).roleSpecific),
        ...(parsed.roleSpecific || {}),
      },
    };
  } catch {
    return getDefaultAccountProfile(role);
  }
}

export function saveStoredAccountProfile(role: RoleKey, profile: UserAccountProfile): void {
  if (typeof window === "undefined") return;
  try {
    const updated = {
      ...profile,
      updatedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    localStorage.setItem(`${STORAGE_PREFIX}${role}`, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("campus360:account-updated", { detail: { role, profile: updated } }));
  } catch {
    // Ignore storage quota errors
  }
}
