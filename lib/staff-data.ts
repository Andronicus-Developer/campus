export type StaffRole = "teacher" | "bursar" | "admin";
export type ConfirmationStatus = "confirmed" | "pending" | "rejected";

export interface TeachingSubject {
  subject: string;
  classArm: string;
  periodsPerWeek: number;
}

export interface StaffMember {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  staffId: string;
  role: StaffRole;
  designation: string;
  department: string;
  email: string;
  phone: string;
  formClass: string;
  teachingSubjects: TeachingSubject[];
  status: "Active" | "On Leave" | "Pending Confirmation" | "Rejected";
  confirmationStatus: ConfirmationStatus;
  confirmedBy?: string;
  confirmedAt?: string;
  onboardedBy?: string;
  onboardedAt?: string;
  rejectionReason?: string;
  qualifications?: string;
  teachingLoad?: string;
  loginPassword?: string;
  portalAccess?: boolean;
}

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: "stf-01",
    name: "Mr. David Alabi",
    firstName: "David",
    lastName: "Alabi",
    staffId: "TCH-084",
    role: "teacher",
    designation: "Senior Mathematics Master & Form Master",
    department: "STEM & Mathematics",
    email: "d.alabi@riverside.edu",
    phone: "+234 803 119 4432",
    formClass: "SSS 2A (Pure Science)",
    qualifications: "B.Sc. Ed. Mathematics (Unilag)",
    teachingLoad: "18 Periods/wk",
    teachingSubjects: [
      { subject: "Mathematics", classArm: "SSS 2A (Pure Science)", periodsPerWeek: 5 },
      { subject: "Mathematics", classArm: "SSS 1 Science", periodsPerWeek: 5 },
    ],
    status: "Active",
    confirmationStatus: "confirmed",
    confirmedBy: "Dr. Evelyn Peters (Principal)",
    confirmedAt: "Aug 15, 2025",
    onboardedBy: "Engr. Patrick Bassey (School Admin)",
    loginPassword: "Alabi#2026!",
    portalAccess: true,
  },
  {
    id: "stf-02",
    name: "Mrs. Grace Okon",
    firstName: "Grace",
    lastName: "Okon",
    staffId: "TCH-092",
    role: "teacher",
    designation: "Biology Senior Faculty",
    department: "Pure Sciences",
    email: "g.okon@riverside.edu",
    phone: "+234 802 331 8844",
    formClass: "SSS 1 Science",
    qualifications: "M.Sc. Cell Biology (UI)",
    teachingLoad: "16 Periods/wk",
    teachingSubjects: [
      { subject: "Biology", classArm: "SSS 1 Science", periodsPerWeek: 4 },
      { subject: "Biology", classArm: "SSS 2A (Pure Science)", periodsPerWeek: 4 },
    ],
    status: "Active",
    confirmationStatus: "confirmed",
    confirmedBy: "Dr. Evelyn Peters (Principal)",
    confirmedAt: "Aug 18, 2025",
    onboardedBy: "Engr. Patrick Bassey (School Admin)",
    loginPassword: "Okon#2026!",
    portalAccess: true,
  },
  {
    id: "stf-03",
    name: "Ms. Chioma Okon",
    firstName: "Chioma",
    lastName: "Okon",
    staffId: "TCH-104",
    role: "teacher",
    designation: "Basic Science Faculty Lead",
    department: "Junior Secondary",
    email: "c.okon@riverside.edu",
    phone: "+234 818 902 3310",
    formClass: "JSS 2 Gold",
    qualifications: "B.Ed. Science Education (UNN)",
    teachingLoad: "20 Periods/wk",
    teachingSubjects: [
      { subject: "Basic Science & Tech", classArm: "JSS 2 Gold", periodsPerWeek: 4 },
      { subject: "Basic Science & Tech", classArm: "JSS 1 Alpha", periodsPerWeek: 4 },
    ],
    status: "Active",
    confirmationStatus: "confirmed",
    confirmedBy: "Dr. Evelyn Peters (Principal)",
    confirmedAt: "Sep 01, 2025",
    onboardedBy: "Engr. Patrick Bassey (School Admin)",
    loginPassword: "Chioma#2026!",
    portalAccess: true,
  },
  {
    id: "stf-04",
    name: "Mr. Francis Eze",
    firstName: "Francis",
    lastName: "Eze",
    staffId: "TCH-078",
    role: "teacher",
    designation: "Physics & Technical Drawing Lead",
    department: "Applied Sciences",
    email: "f.eze@riverside.edu",
    phone: "+234 703 112 9901",
    formClass: "SSS 3 Science A",
    qualifications: "B.Eng. Mechanical Engineering (OAU)",
    teachingLoad: "18 Periods/wk",
    teachingSubjects: [
      { subject: "Physics", classArm: "SSS 3 Science A", periodsPerWeek: 5 },
      { subject: "Physics", classArm: "SSS 2A (Pure Science)", periodsPerWeek: 5 },
      { subject: "Technical Drawing", classArm: "SSS 2A (Pure Science)", periodsPerWeek: 3 },
    ],
    status: "Active",
    confirmationStatus: "confirmed",
    confirmedBy: "Dr. Evelyn Peters (Principal)",
    confirmedAt: "Jul 22, 2025",
    onboardedBy: "Engr. Patrick Bassey (School Admin)",
    loginPassword: "Eze#2026!",
    portalAccess: true,
  },
  {
    id: "stf-05",
    name: "Mrs. Nneka Udoh",
    firstName: "Nneka",
    lastName: "Udoh",
    staffId: "TCH-110",
    role: "teacher",
    designation: "English & Literature Faculty",
    department: "Humanities & Languages",
    email: "n.udoh@riverside.edu",
    phone: "+234 809 445 1120",
    formClass: "SSS 3 Arts",
    qualifications: "B.A. English & Literary Studies (Calabar)",
    teachingLoad: "18 Periods/wk",
    teachingSubjects: [
      { subject: "English Language & Literature", classArm: "SSS 3 Arts", periodsPerWeek: 5 },
      { subject: "English Language & Literature", classArm: "SSS 2A (Pure Science)", periodsPerWeek: 5 },
    ],
    status: "Active",
    confirmationStatus: "confirmed",
    confirmedBy: "Dr. Evelyn Peters (Principal)",
    confirmedAt: "Aug 10, 2025",
    onboardedBy: "Engr. Patrick Bassey (School Admin)",
    loginPassword: "Udoh#2026!",
    portalAccess: true,
  },
  {
    id: "stf-06",
    name: "Mrs. Angela Nnamdi, FCA",
    firstName: "Angela",
    lastName: "Nnamdi",
    staffId: "BUR-005",
    role: "bursar",
    designation: "Bursar & Head of Financial Accounts",
    department: "Bursary & Treasury Division",
    email: "a.nnamdi@riverside.edu",
    phone: "+234 802 555 7711",
    formClass: "None (Bursary Division)",
    qualifications: "B.Sc. Accounting, Fellow Chartered Accountant (ICAN)",
    teachingLoad: "Financial Admin",
    teachingSubjects: [],
    status: "Active",
    confirmationStatus: "confirmed",
    confirmedBy: "Dr. Evelyn Peters (Principal)",
    confirmedAt: "Jun 12, 2025",
    onboardedBy: "Engr. Patrick Bassey (School Admin)",
    loginPassword: "Bursar#2026!",
    portalAccess: true,
  },
  {
    id: "stf-07",
    name: "Mr. Samuel Oladipo",
    firstName: "Samuel",
    lastName: "Oladipo",
    staffId: "BUR-006",
    role: "bursar",
    designation: "Deputy Bursar & Student Billings",
    department: "Bursary & Treasury Division",
    email: "s.oladipo@riverside.edu",
    phone: "+234 803 881 2290",
    formClass: "None (Bursary Division)",
    qualifications: "HND Accountancy, ACA",
    teachingLoad: "Student Billing Admin",
    teachingSubjects: [],
    status: "Active",
    confirmationStatus: "confirmed",
    confirmedBy: "Dr. Evelyn Peters (Principal)",
    confirmedAt: "Sep 15, 2025",
    onboardedBy: "Engr. Patrick Bassey (School Admin)",
    loginPassword: "Bursar#2026!",
    portalAccess: true,
  },
  {
    id: "stf-08",
    name: "Engr. Patrick Bassey",
    firstName: "Patrick",
    lastName: "Bassey",
    staffId: "ADM-012",
    role: "admin",
    designation: "Director of Registry & Operations",
    department: "Admissions & Records",
    email: "p.bassey@riverside.edu",
    phone: "+234 803 999 1100",
    formClass: "None (School Administration)",
    qualifications: "B.Eng. Computer Engineering",
    teachingLoad: "Registry Operations",
    teachingSubjects: [],
    status: "Active",
    confirmationStatus: "confirmed",
    confirmedBy: "Dr. Evelyn Peters (Principal)",
    confirmedAt: "May 02, 2025",
    onboardedBy: "Executive Council",
    loginPassword: "Admin#2026!",
    portalAccess: true,
  },

  // NEW STAFF MEMBERS ADDED BY SCHOOL ADMIN AWAITING PRINCIPAL CONFIRMATION
  {
    id: "stf-09",
    name: "Mr. Kenneth Adeleke",
    firstName: "Kenneth",
    lastName: "Adeleke",
    staffId: "TCH-115",
    role: "teacher",
    designation: "Chemistry & Physics Master",
    department: "Pure Sciences",
    email: "k.adeleke@riverside.edu",
    phone: "+234 803 661 8840",
    formClass: "SSS 1 Science",
    qualifications: "B.Sc. Industrial Chemistry (Ibadan)",
    teachingLoad: "14 Periods/wk",
    teachingSubjects: [
      { subject: "Chemistry", classArm: "SSS 1 Science", periodsPerWeek: 4 },
      { subject: "Physics", classArm: "SSS 1 Science", periodsPerWeek: 4 },
    ],
    status: "Pending Confirmation",
    confirmationStatus: "pending",
    onboardedBy: "Engr. Patrick Bassey (School Admin)",
    onboardedAt: "Today, 11:30 AM",
    loginPassword: "Faculty#2026!",
    portalAccess: true,
  },
  {
    id: "stf-10",
    name: "Mrs. Bukola Adebayo",
    firstName: "Bukola",
    lastName: "Adebayo",
    staffId: "BUR-007",
    role: "bursar",
    designation: "Assistant Bursar & Revenue Officer",
    department: "Bursary & Treasury Division",
    email: "b.adebayo@riverside.edu",
    phone: "+234 802 770 1199",
    formClass: "None (Bursary Division)",
    qualifications: "B.Sc. Banking & Finance, ACA In-view",
    teachingLoad: "Revenue & Fee Collection Desk",
    teachingSubjects: [],
    status: "Pending Confirmation",
    confirmationStatus: "pending",
    onboardedBy: "Engr. Patrick Bassey (School Admin)",
    onboardedAt: "Today, 10:45 AM",
    loginPassword: "Bursar#2026!",
    portalAccess: true,
  },
];

const STORAGE_KEY = "campus360_staff_members_v1";

export function getStoredStaff(): StaffMember[] {
  if (typeof window === "undefined") {
    return INITIAL_STAFF;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STAFF));
      return INITIAL_STAFF;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_STAFF;
  } catch {
    return INITIAL_STAFF;
  }
}

export function saveStoredStaff(staff: StaffMember[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(staff));
    window.dispatchEvent(new Event("campus360:staff-updated"));
  } catch {
    // Ignore storage errors
  }
}

export function confirmStaffInStorage(
  staffId: string,
  principalName = "Dr. Evelyn Peters (Principal)"
): StaffMember[] {
  const current = getStoredStaff();
  const updated = current.map((s) =>
    s.id === staffId
      ? {
          ...s,
          confirmationStatus: "confirmed" as ConfirmationStatus,
          status: "Active" as const,
          confirmedBy: principalName,
          confirmedAt: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        }
      : s
  );
  saveStoredStaff(updated);
  return updated;
}

export function rejectStaffInStorage(staffId: string, reason = "Documentation incomplete"): StaffMember[] {
  const current = getStoredStaff();
  const updated = current.map((s) =>
    s.id === staffId
      ? {
          ...s,
          confirmationStatus: "rejected" as ConfirmationStatus,
          status: "Rejected" as const,
          rejectionReason: reason,
        }
      : s
  );
  saveStoredStaff(updated);
  return updated;
}
