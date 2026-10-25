export type RoleKey = 'principal' | 'teacher' | 'admin' | 'bursar' | 'student' | 'parent';

export type PermissionCode =
  // Students & Guardians
  | 'students.read'
  | 'students.create'
  | 'students.update'
  | 'students.delete'
  | 'parents.create'
  | 'parents.assign'
  | 'credentials.manage'
  // Admissions
  | 'admissions.read'
  | 'admissions.create'
  | 'admissions.update'
  | 'admissions.approve'
  | 'admissions.enroll'
  // Staff
  | 'staff.read'
  | 'staff.create'
  | 'staff.update'
  | 'staff.manage'
  | 'teachers.assign'
  // Attendance
  | 'attendance.read'
  | 'attendance.take'
  | 'attendance.correct'
  // Assessments
  | 'assessments.read'
  | 'assessments.create'
  | 'assessments.enter'
  | 'assessments.submit'
  | 'results.approve'
  | 'results.publish'
  // Fees & Payments
  | 'fees.read'
  | 'fees.create'
  | 'fees.update'
  | 'fees.invoice'
  | 'payments.read'
  | 'payments.record'
  | 'payments.reconcile'
  | 'payments.refund'
  // Reports
  | 'reports.view'
  | 'reports.generate'
  | 'reports.export'
  // Classes & Timetable
  | 'classes.read'
  | 'classes.create'
  | 'classes.update'
  | 'subjects.read'
  | 'subjects.create'
  | 'subjects.update'
  | 'subjects.manage'
  | 'subjects.assign'
  | 'timetable.manage'
  // Communication
  | 'announcements.create'
  | 'announcements.publish'
  // Settings
  | 'school.settings.read'
  | 'school.settings.manage'
  | 'school.roles.manage'
  | 'school.members.manage';

export interface RoleConfig {
  key: RoleKey;
  label: string;
  badge: string;
  tier: string;
  accentColor: string;
  gradient: string;
  description: string;
  route: string;
  persona: {
    name: string;
    email: string;
    roleTitle: string;
    department: string;
    idCode: string;
    avatarUrl?: string;
  };
  permissions: PermissionCode[];
  privileges: {
    category: string;
    items: {
      action: string;
      allowed: boolean;
      description: string;
    }[];
  }[];
  navItems: {
    label: string;
    href: string;
    icon: string;
    badge?: string;
  }[];
}

export const ROLES_CONFIG: Record<RoleKey, RoleConfig> = {
  principal: {
    key: 'principal',
    label: 'Principal / Head of School',
    badge: 'Executive Oversight',
    tier: 'Tier 1 — Head of Institution',
    accentColor: '#4f6ef7',
    gradient: 'from-blue-600 to-indigo-700',
    description: 'Executive governance across academic, staff, financial health, and final result sign-offs.',
    route: '/dashboard/principal',
    persona: {
      name: 'Dr. Evelyn Peters, Ph.D.',
      email: 'e.peters@riverside.edu',
      roleTitle: 'Principal & Chief Academic Officer',
      department: 'Executive Administration',
      idCode: 'PRIN-001',
    },
    permissions: [
      'students.read',
      'staff.read',
      'staff.manage',
      'attendance.read',
      'assessments.read',
      'results.approve',
      'results.publish',
      'fees.read',
      'reports.view',
      'reports.generate',
      'reports.export',
      'classes.read',
      'announcements.create',
      'announcements.publish',
      'school.settings.read',
      'school.roles.manage',
    ],
    privileges: [
      {
        category: 'Executive Approvals',
        items: [
          { action: 'Publish Term Report Cards', allowed: true, description: 'Final sign-off authorizing release of results to parents' },
          { action: 'Fee Waiver / Scholarship Approvals', allowed: true, description: 'Authorize bursar discounts or student bursary allocations' },
          { action: 'Staff Duty & Leave Authorizations', allowed: true, description: 'Approve teacher emergency leaves and substitution schedules' },
        ],
      },
      {
        category: 'Institutional Intelligence',
        items: [
          { action: 'School-Wide Attendance Radar', allowed: true, description: 'Real-time visibility across all 32 class arms and daily registers' },
          { action: 'Term Revenue & Fee Inflow Pulse', allowed: true, description: 'Access aggregate tuition collection rates and uncollected debt' },
          { action: 'Direct Emergency Broadcast', allowed: true, description: 'Send instant SMS/Push bulletins to all 850+ parents and staff' },
        ],
      },
      {
        category: 'Operational Boundaries',
        items: [
          { action: 'Direct Mark Entry for Classes', allowed: false, description: 'Marks entry must be performed by assigned subject teachers' },
          { action: 'Manual Cash Ledger Entries', allowed: false, description: 'Receipt recording is restricted to Bursary division' },
        ],
      },
    ],
    navItems: [
      { label: 'Executive Pulse', href: '/dashboard/principal', icon: 'LayoutDashboard' },
      { label: 'Result Approvals', href: '/dashboard/principal/approvals', icon: 'CheckCheck', badge: '3 Pending' },
      { label: 'Academic Radar', href: '/dashboard/principal/academics', icon: 'LineChart' },
      { label: 'Attendance Pulse', href: '/dashboard/principal/attendance', icon: 'Users' },
      { label: 'Staff Roster', href: '/dashboard/principal/staff', icon: 'Briefcase' },
      { label: 'Announcements', href: '/dashboard/principal/announcements', icon: 'Megaphone' },
    ],
  },

  teacher: {
    key: 'teacher',
    label: 'Teacher / Academic Head',
    badge: 'Faculty Operations',
    tier: 'Tier 2 — Academic Department',
    accentColor: '#7c3aed',
    gradient: 'from-violet-600 to-purple-800',
    description: 'Class registers, marks entry, continuous assessments, lesson timetables, and student progress.',
    route: '/dashboard/teacher',
    persona: {
      name: 'Mr. David Alabi',
      email: 'd.alabi@riverside.edu',
      roleTitle: 'Senior Mathematics Teacher & Form Master',
      department: 'Mathematics & STEM Department',
      idCode: 'TCH-084',
    },
    permissions: [
      'students.read',
      'attendance.read',
      'attendance.take',
      'attendance.correct',
      'assessments.read',
      'assessments.create',
      'assessments.enter',
      'assessments.submit',
      'classes.read',
      'subjects.manage',
      'reports.view',
      'announcements.create',
    ],
    privileges: [
      {
        category: 'Classroom & Academic Rights',
        items: [
          { action: 'Mark Class Attendance Register', allowed: true, description: 'Mark morning, afternoon, and subject-level attendance' },
          { action: 'Continuous Assessment & Exam Scores', allowed: true, description: 'Input CA1, CA2, project scores and terminal examination marks' },
          { action: 'Submit Results for Executive Sign-off', allowed: true, description: 'Submit terminal broadsheet to Principal for publication' },
          { action: 'Write Student Form Teacher Comments', allowed: true, description: 'Personalized behavioral remarks on terminal report cards' },
        ],
      },
      {
        category: 'Operational Boundaries',
        items: [
          { action: 'Directly Publish Results to Public', allowed: false, description: 'Requires Principal approval before releasing to parents' },
          { action: 'Access School Fee / Payment Records', allowed: false, description: 'Financial privacy enforced at database row level' },
          { action: 'Enroll or Expel Students', allowed: false, description: 'Admissions and status changes belong to School Admin' },
        ],
      },
    ],
    navItems: [
      { label: 'Teacher Station', href: '/dashboard/teacher', icon: 'LayoutDashboard' },
      { label: 'Take Attendance', href: '/dashboard/teacher/attendance', icon: 'UserCheck', badge: 'Due' },
      { label: 'Enter CA & Exam Scores', href: '/dashboard/teacher/scores', icon: 'GraduationCap' },
      { label: 'My Timetable', href: '/dashboard/teacher/schedule', icon: 'CalendarDays' },
      { label: 'Student Roster', href: '/dashboard/teacher/roster', icon: 'Users' },
      { label: 'Curriculum & Notes', href: '/dashboard/teacher/curriculum', icon: 'BookOpen' },
    ],
  },

  admin: {
    key: 'admin',
    label: 'School Administrator',
    badge: 'Operations & Registry',
    tier: 'Tier 2 — Systems Administration',
    accentColor: '#059669',
    gradient: 'from-emerald-600 to-teal-800',
    description: 'Admissions pipeline, student records, timetable slot configuration, and staff management.',
    route: '/dashboard/admin',
    persona: {
      name: 'Engr. Patrick Bassey',
      email: 'p.bassey@riverside.edu',
      roleTitle: 'Director of Registry & Operations',
      department: 'Admissions & Records',
      idCode: 'ADM-012',
    },
    permissions: [
      'students.read',
      'students.create',
      'students.update',
      'students.delete',
      'parents.create',
      'parents.assign',
      'admissions.read',
      'admissions.create',
      'admissions.update',
      'admissions.approve',
      'admissions.enroll',
      'staff.read',
      'staff.create',
      'staff.update',
      'teachers.assign',
      'classes.read',
      'classes.create',
      'classes.update',
      'subjects.read',
      'subjects.create',
      'subjects.update',
      'subjects.assign',
      'timetable.manage',
      'announcements.create',
      'announcements.publish',
      'school.settings.read',
      'school.settings.manage',
      'school.members.manage',
      'credentials.manage',
    ],
    privileges: [
      {
        category: 'Registry, Faculty & User Provisioning',
        items: [
          { action: 'Create Students, Teachers, Bursars & Parents', allowed: true, description: 'Direct authority to onboard students, teachers, bursars, and register parent/guardian profiles' },
          { action: 'Provision Login Email & Password Credentials', allowed: true, description: 'Direct authority to configure, manage, and reset login email and password portal credentials for teachers, students, parents, and bursars' },
          { action: 'Assign Parents to Students', allowed: true, description: 'Link parent and guardian accounts to their respective student wards with relationship designations' },
          { action: 'Assign Teachers to Classes & Subjects', allowed: true, description: 'Designate Form Masters and allocate teachers to core and elective subject streams' },
          { action: 'Assign Students to Class Arms', allowed: true, description: 'Enroll, stream, and reassign students to academic class arms and sets' },
          { action: 'Create & Manage Classes & Subjects', allowed: true, description: 'Add new class streams/arms, define subject codes, weekly period quotas, and curriculum units' },
        ],
      },
      {
        category: 'Operational Boundaries',
        items: [
          { action: 'Override Final Exam Grades', allowed: false, description: 'Academic integrity policy restricts grade mutations to faculty' },
          { action: 'Issue Tuition Fee Refunds', allowed: false, description: 'Financial transactions require Bursary validation' },
        ],
      },
    ],
    navItems: [
      { label: 'Admin Command', href: '/dashboard/admin', icon: 'LayoutDashboard' },
      { label: 'Admissions Queue', href: '/dashboard/admin/admissions', icon: 'UserPlus', badge: '14 New' },
      { label: 'Student Directory', href: '/dashboard/admin/students', icon: 'Contact' },
      { label: 'Staff Management', href: '/dashboard/admin/staff', icon: 'ShieldCheck' },
      { label: 'Classes & Streams', href: '/dashboard/admin/classes', icon: 'DoorOpen' },
      { label: 'Subjects & Allocations', href: '/dashboard/admin/subjects', icon: 'BookMarked' },
      { label: 'School Settings', href: '/dashboard/admin/settings', icon: 'Sliders' },
    ],
  },

  bursar: {
    key: 'bursar',
    label: 'Bursar / Finance Officer',
    badge: 'Treasury & Bursary',
    tier: 'Tier 2 — Financial Controller',
    accentColor: '#f59e0b',
    gradient: 'from-amber-600 to-orange-700',
    description: 'Fee structures, automated invoicing, Paystack reconciliation, receipting, and debt recovery.',
    route: '/dashboard/bursar',
    persona: {
      name: 'Mrs. Angela Nnamdi, FCA',
      email: 'a.nnamdi@riverside.edu',
      roleTitle: 'Bursar & Head of Financial Accounts',
      department: 'Bursary Division',
      idCode: 'BUR-005',
    },
    permissions: [
      'fees.read',
      'fees.create',
      'fees.update',
      'fees.invoice',
      'payments.read',
      'payments.record',
      'payments.reconcile',
      'payments.refund',
      'students.read',
      'reports.export',
      'reports.view',
      'announcements.create',
    ],
    privileges: [
      {
        category: 'Financial Treasury Rights',
        items: [
          { action: 'Create Fee Schedules & Levies', allowed: true, description: 'Configure tuition, boarding, uniform, science lab, and PTA charges' },
          { action: 'Batch Invoice Generation', allowed: true, description: 'Generate 800+ student invoices for incoming academic terms' },
          { action: 'Paystack Automated Reconciliation', allowed: true, description: 'Reconcile digital card payments, bank transfers, and USSD settlements' },
          { action: 'Issue Automated Receipts & Debt Notices', allowed: true, description: 'Send automated WhatsApp and SMS reminders to owing guardians' },
        ],
      },
      {
        category: 'Operational Boundaries',
        items: [
          { action: 'Alter Student Academic Scores', allowed: false, description: 'Strict segregation of duties between finance and academics' },
          { action: 'Expel Students for Non-Payment', allowed: false, description: 'Disciplinary actions require Principal authorization' },
        ],
      },
    ],
    navItems: [
      { label: 'Treasury Station', href: '/dashboard/bursar', icon: 'LayoutDashboard' },
      { label: 'Invoices & Billing', href: '/dashboard/bursar/invoices', icon: 'FileSpreadsheet' },
      { label: 'Payment Inflows', href: '/dashboard/bursar/payments', icon: 'Receipt', badge: 'Live' },
      { label: 'Fee Structures', href: '/dashboard/bursar/fees', icon: 'Layers' },
      { label: 'Debt Recovery Aging', href: '/dashboard/bursar/debt', icon: 'ClockAlert', badge: '$5.6M' },
      { label: 'Bank Reconciliation', href: '/dashboard/bursar/reconcile', icon: 'Landmark' },
    ],
  },

  student: {
    key: 'student',
    label: 'Student Portal',
    badge: 'Student Learner Portal',
    tier: 'Tier 3 — Learner Access',
    accentColor: '#06b6d4',
    gradient: 'from-cyan-600 to-blue-700',
    description: 'Personalized timetable, terminal results, attendance record, and school updates.',
    route: '/dashboard/student',
    persona: {
      name: 'Tobi Adeleke',
      email: 't.adeleke@student.riverside.edu',
      roleTitle: 'Grade 11 Student · Science Stream',
      department: 'Senior Secondary School (SSS 2A)',
      idCode: 'RC-2023-0184',
    },
    permissions: [
      'reports.view',
      'attendance.read',
      'assessments.read',
      'classes.read',
    ],
    privileges: [
      {
        category: 'Student Self-Service Rights',
        items: [
          { action: 'Download Verified PDF Report Cards', allowed: true, description: 'Instant access to official school report cards with cryptographic QR' },
          { action: 'Live Class Timetable Schedule', allowed: true, description: 'Real-time schedule of current and upcoming classroom periods' },
          { action: 'Personal Attendance History', allowed: true, description: 'Track monthly attendance compliance percentage (98.2%)' },
          { action: 'View Continuous Assessment Scores', allowed: true, description: 'Inspect marks for tests, lab assignments, and term examinations' },
        ],
      },
      {
        category: 'Security Constraints',
        items: [
          { action: 'Modify Any Grade or Score', allowed: false, description: 'Read-only access strictly enforced at database row level' },
          { action: 'View Other Students\' Performance', allowed: false, description: 'Strict FERPA/GDPR peer privacy protection' },
        ],
      },
    ],
    navItems: [
      { label: 'My Student Desk', href: '/dashboard/student', icon: 'LayoutDashboard' },
      { label: 'Class Timetable', href: '/dashboard/student/timetable', icon: 'CalendarDays' },
      { label: 'Term Results & Reports', href: '/dashboard/student/results', icon: 'Award', badge: 'New' },
      { label: 'My Attendance Streak', href: '/dashboard/student/attendance', icon: 'CheckCircle2' },
      { label: 'Enrolled Subjects', href: '/dashboard/student/subjects', icon: 'BookMarked' },
      { label: 'School Notices', href: '/dashboard/student/bulletins', icon: 'Bell' },
    ],
  },

  parent: {
    key: 'parent',
    label: 'Parent / Guardian Portal',
    badge: 'Family Portal',
    tier: 'Tier 3 — Guardian Access',
    accentColor: '#ec4899',
    gradient: 'from-pink-600 to-rose-700',
    description: 'Multi-child monitoring, fee payments via Paystack, daily attendance alerts, and teacher chats.',
    route: '/dashboard/parent',
    persona: {
      name: 'Mrs. Zainab Adeleke',
      email: 'zainab.adeleke@gmail.com',
      roleTitle: 'Registered Guardian of 2 Students',
      department: 'Parent-Teacher Association (PTA)',
      idCode: 'PAR-0492',
    },
    permissions: [
      'reports.view',
      'payments.read',
      'payments.record',
      'attendance.read',
      'assessments.read',
      'fees.read',
    ],
    privileges: [
      {
        category: 'Parent Caregiver Rights',
        items: [
          { action: 'Instant Paystack Tuition Settlement', allowed: true, description: 'Pay school fees via card, transfer or USSD with immediate receipt' },
          { action: 'Multi-Child Academic Switcher', allowed: true, description: 'Toggle between children across junior and senior secondary levels' },
          { action: 'Real-Time Gate Attendance Alerts', allowed: true, description: 'Immediate SMS/Push notifications when child arrives at school' },
          { action: 'Download Verified Term Results', allowed: true, description: 'Inspect approved grades, class rankings, and teacher assessments' },
        ],
      },
      {
        category: 'Security Constraints',
        items: [
          { action: 'Edit Academic Records', allowed: false, description: 'Read-only access to published evaluations' },
          { action: 'Access Unrelated Family Records', allowed: false, description: 'Guardian-to-student verification checks enforced' },
        ],
      },
    ],
    navItems: [
      { label: 'Family Hub', href: '/dashboard/parent', icon: 'LayoutDashboard' },
      { label: 'Pay Term School Fees', href: '/dashboard/parent/fees', icon: 'CreditCard', badge: 'Due' },
      { label: 'Children Results', href: '/dashboard/parent/results', icon: 'Award' },
      { label: 'Daily Gate Attendance', href: '/dashboard/parent/attendance', icon: 'Activity' },
      { label: 'Teacher Messages', href: '/dashboard/parent/messages', icon: 'MessageSquareText' },
      { label: 'School Calendar', href: '/dashboard/parent/calendar', icon: 'Calendar' },
    ],
  },
};

export function hasPermission(role: RoleKey, code: PermissionCode): boolean {
  return ROLES_CONFIG[role]?.permissions.includes(code) ?? false;
}
