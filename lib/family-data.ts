export interface ChildProfile {
  id: string;
  name: string;
  preferredName: string;
  admissionNo: string;
  classGroup: string;
  yearGroup: string;
  avatar: string;
  gender: "Male" | "Female";
  dateOfBirth: string;
  house: string;
  busRoute: string;
  boardingStatus: "Day Student" | "Boarding House";
  classTeacher: {
    name: string;
    email: string;
    subject: string;
    phone: string;
  };
  attendancePct: string;
  lastArrival: string;
  gpa: string;
  termTuition: number;
  amountPaid: number;
  balanceDue: number;
  feeStatus: "cleared" | "partial" | "due";
  invoiceNo: string;
  receiptNo: string;
  subjects: {
    name: string;
    teacher: string;
    grade: string;
    caScore: number;
    examScore: number;
    total: number;
  }[];
  upcomingAssignments: {
    id: string;
    title: string;
    subject: string;
    dueDate: string;
    status: "submitted" | "pending" | "graded";
    grade?: string;
    feedback?: string;
  }[];
  alerts: {
    id: string;
    title: string;
    date: string;
    type: "academic" | "attendance" | "fee" | "event";
    severity: "info" | "warning" | "urgent";
  }[];
}

export interface FamilyAccount {
  familyCode: string;
  familyName: string;
  residentialAddress: string;
  primaryGuardian: {
    name: string;
    relationship: string;
    email: string;
    phone: string;
    occupation: string;
    financialAccess: boolean;
    pickupAuthorized: boolean;
  };
  secondaryGuardian: {
    name: string;
    relationship: string;
    email: string;
    phone: string;
    occupation: string;
    financialAccess: boolean;
    pickupAuthorized: boolean;
  };
  emergencyPickupContacts: {
    id: string;
    name: string;
    relationship: string;
    phone: string;
    gatePin: string;
    photoUrl?: string;
    status: "active" | "temporary_revoked";
  }[];
}

export const FAMILY_DATA: FamilyAccount = {
  familyCode: "FAM-0492",
  familyName: "The Adeleke Family",
  residentialAddress: "Plot 14 Admiralty Way, Lekki Phase 1, Lagos",
  primaryGuardian: {
    name: "Mrs. Zainab Adeleke",
    relationship: "Mother (Primary Caregiver)",
    email: "zainab.adeleke@gmail.com",
    phone: "+234 803 291 0021",
    occupation: "Senior Legal Counsel",
    financialAccess: true,
    pickupAuthorized: true,
  },
  secondaryGuardian: {
    name: "Dr. Babatunde Adeleke",
    relationship: "Father",
    email: "babatunde.adeleke@firm.com",
    phone: "+234 802 110 9942",
    occupation: "Consultant Radiologist",
    financialAccess: true,
    pickupAuthorized: true,
  },
  emergencyPickupContacts: [
    {
      id: "PC-01",
      name: "Mrs. Folake Adeleke-Cole",
      relationship: "Paternal Aunt",
      phone: "+234 805 441 3320",
      gatePin: "PIN-8421",
      status: "active",
    },
    {
      id: "PC-02",
      name: "Mr. Emmanuel Chukwu",
      relationship: "Family Chauffeur",
      phone: "+234 814 990 1204",
      gatePin: "PIN-4409",
      status: "active",
    },
  ],
};

export const CHILDREN_PROFILES: ChildProfile[] = [
  {
    id: "child-1",
    name: "Tobi Adeleke",
    preferredName: "Tobi",
    admissionNo: "RC-2023-0184",
    classGroup: "Grade 11 (SSS 2A - Science Stream)",
    yearGroup: "Senior Secondary 2 (SSS 2)",
    avatar: "TA",
    gender: "Male",
    dateOfBirth: "Nov 14, 2009",
    house: "Blue House (Tigers)",
    busRoute: "Route 4 (Lekki / Victoria Island Corridor)",
    boardingStatus: "Day Student",
    classTeacher: {
      name: "Mr. David Alabi",
      email: "d.alabi@riverside.edu",
      subject: "Further Mathematics",
      phone: "+234 802 334 1101",
    },
    attendancePct: "98.2%",
    lastArrival: "Today, 07:38 AM (Main Gate Turnstile A)",
    gpa: "3.88 / 4.0",
    termTuition: 1450.0,
    amountPaid: 1450.0,
    balanceDue: 0.0,
    feeStatus: "cleared",
    invoiceNo: "INV-2026-0084",
    receiptNo: "REC-2026-0004",
    subjects: [
      { name: "Mathematics", teacher: "Mr. D. Alabi", grade: "A1", caScore: 39, examScore: 58, total: 97 },
      { name: "Further Mathematics", teacher: "Mr. D. Alabi", grade: "A1", caScore: 38, examScore: 56, total: 94 },
      { name: "Physics", teacher: "Engr. P. Bassey", grade: "A1", caScore: 37, examScore: 55, total: 92 },
      { name: "Chemistry", teacher: "Dr. K. Mensah", grade: "A1", caScore: 37, examScore: 54, total: 91 },
      { name: "Biology", teacher: "Mrs. A. Adeleke", grade: "A1", caScore: 35, examScore: 53, total: 88 },
      { name: "English Language", teacher: "Ms. C. Okon", grade: "A1", caScore: 34, examScore: 51, total: 85 },
      { name: "Computer Science", teacher: "Engr. P. Bassey", grade: "A1", caScore: 40, examScore: 58, total: 98 },
      { name: "Technical Drawing", teacher: "Arch. B. Yusuf", grade: "A1", caScore: 36, examScore: 52, total: 88 },
    ],
    upcomingAssignments: [
      {
        id: "ASG-101",
        title: "Calculus Optimization Lab Report",
        subject: "Further Mathematics",
        dueDate: "Tomorrow, 04:00 PM",
        status: "pending",
      },
      {
        id: "ASG-102",
        title: "Spectroscopy & Ionic Bonding Worksheet",
        subject: "Chemistry",
        dueDate: "Friday, 11:59 PM",
        status: "pending",
      },
      {
        id: "ASG-103",
        title: "Electromagnetic Induction Simulation",
        subject: "Physics",
        dueDate: "Jan 22, 2026",
        status: "graded",
        grade: "96 / 100",
        feedback: "Excellent precision in circuit impedance calculations.",
      },
    ],
    alerts: [
      {
        id: "ALT-01",
        title: "Mid-Term Examination timetable published",
        date: "Today, 08:30 AM",
        type: "academic",
        severity: "info",
      },
      {
        id: "ALT-02",
        title: "STEM Science Fair Excursion Consent Form Due",
        date: "Yesterday",
        type: "event",
        severity: "warning",
      },
    ],
  },
  {
    id: "child-2",
    name: "Maryam Adeleke",
    preferredName: "Maryam",
    admissionNo: "RC-2025-0412",
    classGroup: "Grade 8 (JSS 2A - Junior Secondary)",
    yearGroup: "Junior Secondary 2 (JSS 2)",
    avatar: "MA",
    gender: "Female",
    dateOfBirth: "May 22, 2012",
    house: "Green House (Eagles)",
    busRoute: "Route 4 (Lekki / Victoria Island Corridor)",
    boardingStatus: "Day Student",
    classTeacher: {
      name: "Ms. Chioma Okon",
      email: "c.okon@riverside.edu",
      subject: "English Studies",
      phone: "+234 803 771 9920",
    },
    attendancePct: "99.4%",
    lastArrival: "Today, 07:38 AM (Main Gate Turnstile A)",
    gpa: "3.92 / 4.0",
    termTuition: 1250.0,
    amountPaid: 600.0,
    balanceDue: 650.0,
    feeStatus: "partial",
    invoiceNo: "INV-2026-0091",
    receiptNo: "REC-2026-0012",
    subjects: [
      { name: "Mathematics", teacher: "Mr. T. Balogun", grade: "A1", caScore: 36, examScore: 52, total: 88 },
      { name: "English Studies", teacher: "Ms. C. Okon", grade: "A1", caScore: 38, examScore: 54, total: 92 },
      { name: "Basic Science & Technology", teacher: "Mr. J. Peter", grade: "A1", caScore: 35, examScore: 50, total: 85 },
      { name: "Social Studies & Civic", teacher: "Mrs. O. Danjuma", grade: "A1", caScore: 36, examScore: 49, total: 85 },
      { name: "Business Studies", teacher: "Mr. K. Ojo", grade: "B2", caScore: 34, examScore: 47, total: 81 },
      { name: "French Language", teacher: "Madame L. Dubois", grade: "B2", caScore: 33, examScore: 48, total: 81 },
      { name: "Agricultural Science", teacher: "Mr. S. Garba", grade: "A1", caScore: 37, examScore: 53, total: 90 },
      { name: "Creative & Cultural Arts", teacher: "Mrs. E. Bassey", grade: "A1", caScore: 38, examScore: 54, total: 92 },
    ],
    upcomingAssignments: [
      {
        id: "ASG-201",
        title: "African Folktales Comparative Essay",
        subject: "English Studies",
        dueDate: "Thursday, 05:00 PM",
        status: "pending",
      },
      {
        id: "ASG-202",
        title: "Algebraic Factorization Set B",
        subject: "Mathematics",
        dueDate: "Friday, 02:00 PM",
        status: "pending",
      },
    ],
    alerts: [
      {
        id: "ALT-03",
        title: "Tuition 2nd installment of US$ 650.00 due Feb 15",
        date: "2 days ago",
        type: "fee",
        severity: "warning",
      },
    ],
  },
];
