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
  | 'staff.confirm'
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
      'staff.confirm',
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
        category: 'Executive Leadership & Academic Authority',
        items: [
          { action: 'Confirm & Authorize Teachers & Bursars', allowed: true, description: 'Final executive appointment sign-off confirming newly onboarded teachers and bursars registered by the School Administrator' },
          { action: 'Publish Term Report Cards & Examination Broadsheets', allowed: true, description: 'Final sign-off authorizing release of academic results and report cards to parents' },
          { action: 'Fee Waiver & Scholarship Endorsements', allowed: true, description: 'Authorize bursar discounts or student bursary allocations within delegated authority' },
          { action: 'Staff Duty & Leave Authorizations', allowed: true, description: 'Approve teacher emergency leaves and substitution cover schedules' },
          { action: 'School-Wide Attendance & Lateness Oversight', allowed: true, description: 'Audit daily student registers and staff punctuality compliance' },
          { action: 'Disciplinary Actions & Safeguarding Escalations', allowed: true, description: 'Approve student suspensions, parental conferences, and oversee welfare cases' },
          { action: 'Emergency Broadcast to Parents & Faculty', allowed: true, description: 'Send instant SMS, push, and portal circulars to all 842 parents and staff' },
          { action: 'Expenditure Sign-off within Delegated Limits', allowed: true, description: 'Approve operational departmental requisitions up to US$ 5,000.00' },
        ],
      },
      {
        category: 'Institutional Boundaries & Segregation of Duties',
        items: [
          { action: 'Direct Mark Entry on Classroom Gradebooks', allowed: false, description: 'Continuous assessment score entry is restricted to assigned subject teachers' },
          { action: 'Manual Cash Ledger Entries & Direct Bank Reconcile', allowed: false, description: 'Payment receipting and bank reconciliations are restricted to the Bursary division' },
          { action: 'Unilateral Tuition Tariff Structural Increases', allowed: false, description: 'School-wide pricing modifications strictly require School Owner or Board authorization' },
          { action: 'Alter SaaS Tenant Configuration or Delete School Database', allowed: false, description: 'Tenant infrastructure settings are restricted to Super Admin and School Owner' },
        ],
      },
    ],
    navItems: [
      { label: 'Executive Cockpit', href: '/dashboard/principal', icon: 'LayoutDashboard' },
      { label: 'My Tasks & Approvals', href: '/dashboard/principal/approvals', icon: 'CheckCheck', badge: '3 Pending' },
      { label: 'Curriculum & Academics', href: '/dashboard/principal/academics', icon: 'LineChart' },
      { label: 'Faculty Supervision', href: '/dashboard/principal/staff', icon: 'Briefcase' },
      { label: 'Student Oversight', href: '/dashboard/principal/students', icon: 'GraduationCap' },
      { label: 'Attendance Oversight', href: '/dashboard/principal/attendance', icon: 'Users' },
      { label: 'Exams & Results', href: '/dashboard/principal/examinations', icon: 'Award' },
      { label: 'Timetable & Rooms', href: '/dashboard/principal/timetable', icon: 'CalendarDays' },
      { label: 'Discipline & Welfare', href: '/dashboard/principal/discipline', icon: 'ShieldAlert' },
      { label: 'Parent Circulars', href: '/dashboard/principal/announcements', icon: 'Megaphone' },
      { label: 'Financial Oversight', href: '/dashboard/principal/finance', icon: 'DollarSign' },
      { label: 'School Calendar', href: '/dashboard/principal/calendar', icon: 'Calendar' },
      { label: 'Executive Reports', href: '/dashboard/principal/reports', icon: 'BarChart3' },
      { label: 'Quality Assurance', href: '/dashboard/principal/quality', icon: 'ShieldCheck' },
      { label: 'Academic Settings', href: '/dashboard/principal/settings', icon: 'Sliders' },
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
      { label: 'Assignments & Homework', href: '/dashboard/teacher/assignments', icon: 'FileSpreadsheet', badge: '12 Due' },
      { label: 'Curriculum & Lesson Plans', href: '/dashboard/teacher/curriculum', icon: 'BookOpen' },
      { label: 'My Classes & Students', href: '/dashboard/teacher/roster', icon: 'Users' },
      { label: 'Timetable & Invigilation', href: '/dashboard/teacher/schedule', icon: 'CalendarDays' },
      { label: 'Parent & Class Messages', href: '/dashboard/teacher/communications', icon: 'MessageSquareText' },
      { label: 'Account Settings', href: '/dashboard/teacher/settings', icon: 'Sliders' },
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
        category: 'Operational Boundaries & Security Safeguards',
        items: [
          { action: 'Self-Grant Principal, Bursar or Owner Privileges', allowed: false, description: 'School Admin cannot grant themselves Principal, Bursar, or School Owner privileges. Higher-level role elevations strictly require Board or School Owner authorization' },
          { action: 'Override Final Exam Grades', allowed: false, description: 'Academic integrity policy restricts grade mutations to faculty and Principal approval' },
          { action: 'Issue Direct Tuition Fee Refunds & Cash Entries', allowed: false, description: 'Financial ledger modifications, reconciliations, and refunds are restricted to Bursary division' },
        ],
      },
    ],
    navItems: [
      { label: 'Admin Command', href: '/dashboard/admin', icon: 'LayoutDashboard' },
      { label: 'Admissions Queue', href: '/dashboard/admin/admissions', icon: 'UserPlus', badge: '14 New' },
      { label: 'Student Directory', href: '/dashboard/admin/students', icon: 'Contact' },
      { label: 'Staff Administration', href: '/dashboard/admin/staff', icon: 'ShieldCheck' },
      { label: 'Classes & Streams', href: '/dashboard/admin/classes', icon: 'DoorOpen' },
      { label: 'Subjects & Allocations', href: '/dashboard/admin/subjects', icon: 'BookMarked' },
      { label: 'Attendance Radar', href: '/dashboard/admin/attendance', icon: 'ClipboardCheck', badge: 'Daily' },
      { label: 'Finance Support', href: '/dashboard/admin/finance', icon: 'DollarSign' },
      { label: 'Parent Communications', href: '/dashboard/admin/communications', icon: 'Megaphone' },
      { label: 'Documents & IDs', href: '/dashboard/admin/documents', icon: 'FileText' },
      { label: 'Reports & Data Hub', href: '/dashboard/admin/reports', icon: 'BarChart3' },
      { label: 'School Operations', href: '/dashboard/admin/operations', icon: 'Bus' },
      { label: 'Audit & Security', href: '/dashboard/admin/audit', icon: 'History' },
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
    description: 'Fee structures, automated invoicing, multi-channel payment recording, bank reconciliation, debt recovery, and financial audit controls.',
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
        category: 'Financial Treasury & Collection Authority',
        items: [
          { action: 'Create & Manage Approved Fee Structures', allowed: true, description: 'Configure tuition, boarding, STEM lab, technology, and examination fees within authorized policies' },
          { action: 'Batch Student Invoicing & Consolidated Statements', allowed: true, description: 'Generate student invoices, installment plans, and consolidated multi-child family billing statements' },
          { action: 'Multi-Channel Payment Recording & Receipting', allowed: true, description: 'Record cash, direct bank wire, POS, mobile money, and automated payment gateway settlements with unique receipt issuance' },
          { action: 'Debt Recovery & Aging Management', allowed: true, description: 'Track 0-30, 31-60, 60+ days overdue balances, record approved payment arrangements, and dispatch privacy-compliant reminders' },
          { action: 'Bank & Payment Gateway Reconciliation', allowed: true, description: 'Match recorded inflows against bank statements, reconcile cashier drawers, and finalize closed accounting periods' },
          { action: 'Departmental Budget & Expense Ledger Tracking', allowed: true, description: 'Monitor department allocations, upload supplier invoices, track purchase orders, and produce cash-flow projections' },
        ],
      },
      {
        category: 'Operational Governance & Financial Safeguards',
        items: [
          { action: 'Overwriting Issued Invoices Directly', allowed: false, description: 'Financial adjustments strictly require controlled credit notes or traceable accounting entries' },
          { action: 'Unilateral High-Value Refund Approval', allowed: false, description: 'Refunds exceeding threshold require executive sign-off from School Owner or Principal' },
          { action: 'Unapproved Fee Increases or Waivers', allowed: false, description: 'Fee structural tariff modifications and discretionary waivers require School Owner approval' },
          { action: 'Alter Student Academic Scores or Registers', allowed: false, description: 'Strict segregation of duties between finance division and academic faculty' },
          { action: 'Expel Students for Non-Payment', allowed: false, description: 'Disciplinary student exclusions strictly require Principal and Board authorization' },
        ],
      },
    ],
    navItems: [
      { label: 'Financial Console', href: '/dashboard/bursar', icon: 'LayoutDashboard' },
      { label: 'Fee Structures', href: '/dashboard/bursar/fees', icon: 'Layers' },
      { label: 'Billing & Invoices', href: '/dashboard/bursar/invoices', icon: 'FileSpreadsheet' },
      { label: 'Payment Inflows', href: '/dashboard/bursar/payments', icon: 'Receipt', badge: 'Live' },
      { label: 'Receipts Repository', href: '/dashboard/bursar/receipts', icon: 'FileText' },
      { label: 'Debt Aging & Recovery', href: '/dashboard/bursar/debt', icon: 'ClockAlert', badge: '$172K' },
      { label: 'Bank Reconciliation', href: '/dashboard/bursar/reconcile', icon: 'Landmark' },
      { label: 'Refunds & Reversals', href: '/dashboard/bursar/refunds', icon: 'History' },
      { label: 'Scholarships & Waivers', href: '/dashboard/bursar/concessions', icon: 'Award' },
      { label: 'Budgets & Expenses', href: '/dashboard/bursar/budget', icon: 'DollarSign' },
      { label: 'Financial Reports', href: '/dashboard/bursar/reports', icon: 'BarChart3' },
      { label: 'Bursary Settings', href: '/dashboard/bursar/settings', icon: 'Sliders' },
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
        category: 'Learner Self-Service Rights',
        items: [
          { action: 'Download Verified PDF Report Cards', allowed: true, description: 'Instant access to official school report cards with cryptographic QR' },
          { action: 'Live Class Timetable Schedule', allowed: true, description: 'Real-time schedule of current and upcoming classroom periods' },
          { action: 'Personal Attendance History & Excuse Filing', allowed: true, description: 'Track monthly attendance compliance percentage (98.2%) and submit medical excuses' },
          { action: 'View Continuous Assessment Scores & Feedback', allowed: true, description: 'Inspect marks for tests, lab assignments, and term examinations' },
          { action: 'Online Assignment Submissions & Drafts', allowed: true, description: 'Upload homework, project files, and track teacher feedback and resubmissions' },
          { action: 'Participate in Scheduled Online Quizzes', allowed: true, description: 'Access computer-based assessment simulator during authorized testing windows' },
          { action: 'Digital Library & Course Materials Access', allowed: true, description: 'Download lecture notes, scheme of work, worksheets, and syllabus resources' },
          { action: 'Personal Study Planner & Goal Tracking', allowed: true, description: 'Organize study tasks, revision targets, and personal study reminders' },
          { action: 'Extracurricular Club & Sports Registration', allowed: true, description: 'Enroll in authorized societies, athletics houses, and campus clubs' },
          { action: 'Request Official Documents & Enrollment Letters', allowed: true, description: 'Order bonafide student certificates, recommendation letters, and transcripts' },
          { action: 'Permitted Fee & Invoicing Statements', allowed: true, description: 'View student fee receipts and cleared tuition standing' },
        ],
      },
      {
        category: 'Security Constraints & Student Boundaries',
        items: [
          { action: 'Modify Any Grade, CA Score, or Report Card', allowed: false, description: 'Academic records are cryptographically verified and immutable at student level' },
          { action: 'Alter Admission Number, Biodata or Enrollment Status', allowed: false, description: 'Personal record changes require formal Registry correction requests' },
          { action: 'Direct Mutation of Biometric Gate Logs', allowed: false, description: 'Attendance logs can only be amended via authorized Registry workflows' },
          { action: 'Access Unpublished Exams, Answer Keys, or Peer Scores', allowed: false, description: 'Strict test integrity and peer privacy protections enforced' },
          { action: 'Modify Official School Timetables or Classroom Allocations', allowed: false, description: 'Official timetable editing is restricted to academic administration' },
          { action: 'View Complete Family Financial Ledger or Payment Card Details', allowed: false, description: 'Detailed financial management and settlements are restricted to Parent / Guardian portal' },
          { action: 'Access Confidential Medical, Safeguarding or Counselling Case Files', allowed: false, description: 'Sensitive student wellbeing records are restricted to Principal and designated welfare officers' },
        ],
      },
    ],
    navItems: [
      { label: 'My Student Desk', href: '/dashboard/student', icon: 'LayoutDashboard' },
      { label: 'My Profile & Records', href: '/dashboard/student/profile', icon: 'User' },
      { label: 'Enrolled Subjects', href: '/dashboard/student/subjects', icon: 'BookMarked' },
      { label: 'Class Timetable', href: '/dashboard/student/timetable', icon: 'CalendarDays' },
      { label: 'Assignments & Work', href: '/dashboard/student/assignments', icon: 'FileText', badge: '2 Due' },
      { label: 'Tests & Quizzes', href: '/dashboard/student/assessments', icon: 'ClipboardCheck', badge: 'Active' },
      { label: 'Results & Reports', href: '/dashboard/student/results', icon: 'Award' },
      { label: 'Attendance Streak', href: '/dashboard/student/attendance', icon: 'CheckCircle2' },
      { label: 'Digital Library', href: '/dashboard/student/resources', icon: 'FolderOpen' },
      { label: 'School Notices', href: '/dashboard/student/bulletins', icon: 'Bell' },
      { label: 'Study Planner', href: '/dashboard/student/planner', icon: 'ListTodo' },
      { label: 'Learning Support', href: '/dashboard/student/support', icon: 'Sparkles' },
      { label: 'Clubs & Sports', href: '/dashboard/student/activities', icon: 'Activity' },
      { label: 'Fee Notices', href: '/dashboard/student/fees', icon: 'DollarSign' },
      { label: 'Letters & Requests', href: '/dashboard/student/documents', icon: 'FileSpreadsheet' },
      { label: 'Account Settings', href: '/dashboard/student/settings', icon: 'Sliders' },
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
        category: 'Parent Caregiver Rights & Multi-Child Monitoring',
        items: [
          { action: 'Multi-Child Profile Switcher', allowed: true, description: 'Single parent account toggle between linked children across junior and senior secondary levels' },
          { action: 'Online Tuition Settlement & Installments', allowed: true, description: 'Pay school fees via Paystack, card, or bank transfer with official verified receipt generation' },
          { action: 'Real-Time Biometric Gate & Attendance Alerts', allowed: true, description: 'Immediate SMS, WhatsApp, and push alerts when child checks in at campus turnstiles' },
          { action: 'Download Verified PDF Report Cards', allowed: true, description: 'Inspect approved grades, teacher recommendations, and download cryptographic QR report cards' },
          { action: 'Homework & Assignment Progress Monitoring', allowed: true, description: 'Track upcoming deadlines, submission status, and teacher feedback (student completes work)' },
          { action: 'Book Parent-Teacher Consultation Meetings', allowed: true, description: 'Reserve one-on-one conference slots with subject teachers and school counselors' },
          { action: 'Authorized Pickup List & Guardian Access Management', allowed: true, description: 'Configure authorized collection guardians and manage emergency contacts' },
          { action: 'Submit Absence Notes & Letter Requests', allowed: true, description: 'Notify school of planned absences and request bonafide student enrollment letters' },
        ],
      },
      {
        category: 'Security Constraints & Parent Boundaries',
        items: [
          { action: 'Directly Modify Academic Grades or Records', allowed: false, description: 'Academic records, enrollment status, and grades are strictly immutable by parents' },
          { action: 'Submit Homework or Complete Assessments for Student', allowed: false, description: 'Assessments and online quizzes must be completed solely by the student' },
          { action: 'Edit Payment Ledgers or Issue Self-Receipts', allowed: false, description: 'Payment records and receipts strictly require verified banking or gateway evidence' },
          { action: 'Access Unrelated Students or Peer Academic Records', allowed: false, description: 'Strict privacy safeguards enforce guardian-to-student verification' },
          { action: 'Unrestricted Broadcast Messaging to All Staff or Students', allowed: false, description: 'Communications are routed through authorized channels (Teacher, Admin, Bursar, Principal)' },
        ],
      },
    ],
    navItems: [
      { label: 'Family Hub', href: '/dashboard/parent', icon: 'LayoutDashboard' },
      { label: 'Children Profiles', href: '/dashboard/parent/children', icon: 'Users' },
      { label: 'Gate Attendance', href: '/dashboard/parent/attendance', icon: 'Activity' },
      { label: 'Report Cards', href: '/dashboard/parent/results', icon: 'Award' },
      { label: 'Homework Radar', href: '/dashboard/parent/assignments', icon: 'FileText' },
      { label: 'Tuition & Fees', href: '/dashboard/parent/fees', icon: 'CreditCard', badge: 'Due' },
      { label: 'Teacher Chats', href: '/dashboard/parent/messages', icon: 'MessageSquareText' },
      { label: 'PTM Conferences', href: '/dashboard/parent/ptm', icon: 'HeartHandshake' },
      { label: 'Events & Consent', href: '/dashboard/parent/calendar', icon: 'Calendar' },
      { label: 'Leave & Requests', href: '/dashboard/parent/requests', icon: 'ClipboardCheck' },
      { label: 'Documents & Forms', href: '/dashboard/parent/documents', icon: 'FileSpreadsheet' },
      { label: 'Guardians & Pickup', href: '/dashboard/parent/guardians', icon: 'ShieldCheck' },
      { label: 'Bus & Boarding', href: '/dashboard/parent/services', icon: 'Building2' },
      { label: 'Alerts & Notices', href: '/dashboard/parent/notifications', icon: 'Bell' },
      { label: 'Account & Security', href: '/dashboard/parent/settings', icon: 'Sliders' },
    ],
  },
};

export function hasPermission(role: RoleKey, code: PermissionCode): boolean {
  return ROLES_CONFIG[role]?.permissions.includes(code) ?? false;
}
