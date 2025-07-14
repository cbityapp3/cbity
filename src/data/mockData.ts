// Mock data for the presentation version
export const mockSchools = [
  {
    id: 'school_1',
    name: 'Lagos State Model College',
    address: 'Ikeja, Lagos State',
    phone: '+234 802 123 4567',
    email: 'info@lagosmodeoll.edu.ng',
    logo: 'https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    studentsCount: 1245,
    teachersCount: 89,
    activeExams: 12,
    subscription: 'Premium',
    expiryDate: '2024-12-31',
    status: 'active'
  },
  {
    id: 'school_2',
    name: 'Federal Government College Warri',
    address: 'Warri, Delta State',
    phone: '+234 803 234 5678',
    email: 'admin@fgcwarri.edu.ng',
    logo: 'https://images.pexels.com/photos/5905494/pexels-photo-5905494.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    studentsCount: 2156,
    teachersCount: 156,
    activeExams: 18,
    subscription: 'Standard',
    expiryDate: '2024-11-30',
    status: 'active'
  },
  {
    id: 'school_3',
    name: 'King\'s College Lagos',
    address: 'Lagos Island, Lagos State',
    phone: '+234 804 345 6789',
    email: 'contact@kingscollegelagos.edu.ng',
    logo: 'https://images.pexels.com/photos/5905375/pexels-photo-5905375.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    studentsCount: 1876,
    teachersCount: 134,
    activeExams: 15,
    subscription: 'Premium',
    expiryDate: '2025-01-31',
    status: 'active'
  }
];

export const mockSubjects = [
  {
    id: 'sub_1',
    name: 'Mathematics',
    code: 'MTH',
    description: 'Core Mathematics for WAEC preparation',
    color: '#3B82F6',
    questionsCount: 850,
    difficulty: 'Medium',
    duration: 180,
    status: 'active'
  },
  {
    id: 'sub_2',
    name: 'English Language',
    code: 'ENG',
    description: 'English Language comprehension and writing',
    color: '#10B981',
    questionsCount: 720,
    difficulty: 'Medium',
    duration: 180,
    status: 'active'
  },
  {
    id: 'sub_3',
    name: 'Physics',
    code: 'PHY',
    description: 'Physics for science students',
    color: '#8B5CF6',
    questionsCount: 650,
    difficulty: 'Hard',
    duration: 180,
    status: 'active'
  },
  {
    id: 'sub_4',
    name: 'Chemistry',
    code: 'CHM',
    description: 'Chemistry for science students',
    color: '#EF4444',
    questionsCount: 680,
    difficulty: 'Hard',
    duration: 180,
    status: 'active'
  },
  {
    id: 'sub_5',
    name: 'Biology',
    code: 'BIO',
    description: 'Biology for science students',
    color: '#F59E0B',
    questionsCount: 590,
    difficulty: 'Medium',
    duration: 180,
    status: 'active'
  },
  {
    id: 'sub_6',
    name: 'Economics',
    code: 'ECO',
    description: 'Economics for commercial students',
    color: '#6366F1',
    questionsCount: 520,
    difficulty: 'Medium',
    duration: 180,
    status: 'active'
  },
  {
    id: 'sub_7',
    name: 'Geography',
    code: 'GEO',
    description: 'Geography and environmental science',
    color: '#EC4899',
    questionsCount: 480,
    difficulty: 'Medium',
    duration: 180,
    status: 'active'
  },
  {
    id: 'sub_8',
    name: 'History',
    code: 'HIS',
    description: 'Nigerian and world history',
    color: '#F97316',
    questionsCount: 450,
    difficulty: 'Medium',
    duration: 180,
    status: 'active'
  }
];

export const mockStudents = [
  {
    id: 'std_1',
    name: 'Adebayo Oluwaseun',
    email: 'adebayo@student.com',
    class: 'SS3A',
    studentId: 'STD001',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    phone: '+234 801 123 4567',
    address: 'Ikeja, Lagos',
    dateOfBirth: '2007-03-15',
    gender: 'Male',
    guardianName: 'Mr. Adebayo Olumide',
    guardianPhone: '+234 802 123 4567',
    subjects: ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology'],
    examsTaken: 15,
    averageScore: 78.5,
    status: 'active'
  },
  {
    id: 'std_2',
    name: 'Chinwe Okafor',
    email: 'chinwe@student.com',
    class: 'SS3B',
    studentId: 'STD002',
    avatar: 'https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    phone: '+234 803 234 5678',
    address: 'Victoria Island, Lagos',
    dateOfBirth: '2007-07-22',
    gender: 'Female',
    guardianName: 'Mrs. Okafor Ngozi',
    guardianPhone: '+234 804 234 5678',
    subjects: ['Mathematics', 'English Language', 'Economics', 'Geography', 'History'],
    examsTaken: 12,
    averageScore: 82.3,
    status: 'active'
  },
  {
    id: 'std_3',
    name: 'Mohammed Abdullahi',
    email: 'mohammed@student.com',
    class: 'SS3A',
    studentId: 'STD003',
    avatar: 'https://images.pexels.com/photos/2826131/pexels-photo-2826131.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    phone: '+234 805 345 6789',
    address: 'Surulere, Lagos',
    dateOfBirth: '2007-01-10',
    gender: 'Male',
    guardianName: 'Alhaji Abdullahi Ibrahim',
    guardianPhone: '+234 806 345 6789',
    subjects: ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Geography'],
    examsTaken: 18,
    averageScore: 75.8,
    status: 'active'
  },
  {
    id: 'std_4',
    name: 'Funmilayo Adeyemi',
    email: 'funmilayo@student.com',
    class: 'SS3C',
    studentId: 'STD004',
    avatar: 'https://images.pexels.com/photos/2896818/pexels-photo-2896818.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    phone: '+234 807 456 7890',
    address: 'Yaba, Lagos',
    dateOfBirth: '2007-09-05',
    gender: 'Female',
    guardianName: 'Dr. Adeyemi Olufunke',
    guardianPhone: '+234 808 456 7890',
    subjects: ['Mathematics', 'English Language', 'Biology', 'Chemistry', 'Physics'],
    examsTaken: 14,
    averageScore: 85.2,
    status: 'active'
  },
  {
    id: 'std_5',
    name: 'Emeka Okonkwo',
    email: 'emeka@student.com',
    class: 'SS3B',
    studentId: 'STD005',
    avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    phone: '+234 809 567 8901',
    address: 'Apapa, Lagos',
    dateOfBirth: '2007-11-18',
    gender: 'Male',
    guardianName: 'Mr. Okonkwo Chukwuma',
    guardianPhone: '+234 810 567 8901',
    subjects: ['Mathematics', 'English Language', 'Economics', 'Geography', 'History'],
    examsTaken: 16,
    averageScore: 73.7,
    status: 'active'
  }
];

export const mockTeachers = [
  {
    id: 'tch_1',
    name: 'Mrs. Adunni Fashola',
    email: 'adunni@teacher.com',
    subjects: ['Mathematics', 'Physics'],
    avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    phone: '+234 811 123 4567',
    address: 'Lekki, Lagos',
    qualification: 'M.Sc Mathematics',
    experience: '12 years',
    employeeId: 'TCH001',
    department: 'Mathematics',
    classesAssigned: ['SS3A', 'SS3B', 'SS2A'],
    studentsCount: 95,
    examsCreated: 25,
    status: 'active'
  },
  {
    id: 'tch_2',
    name: 'Mr. Olumide Bankole',
    email: 'olumide@teacher.com',
    subjects: ['Chemistry', 'Biology'],
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    phone: '+234 812 234 5678',
    address: 'Gbagada, Lagos',
    qualification: 'Ph.D Chemistry',
    experience: '15 years',
    employeeId: 'TCH002',
    department: 'Science',
    classesAssigned: ['SS3A', 'SS3C', 'SS2B'],
    studentsCount: 87,
    examsCreated: 30,
    status: 'active'
  },
  {
    id: 'tch_3',
    name: 'Mrs. Kemi Oladele',
    email: 'kemi@teacher.com',
    subjects: ['English Language'],
    avatar: 'https://images.pexels.com/photos/2381463/pexels-photo-2381463.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    phone: '+234 813 345 6789',
    address: 'Ikoyi, Lagos',
    qualification: 'M.A English Literature',
    experience: '10 years',
    employeeId: 'TCH003',
    department: 'Languages',
    classesAssigned: ['SS3A', 'SS3B', 'SS3C'],
    studentsCount: 120,
    examsCreated: 28,
    status: 'active'
  },
  {
    id: 'tch_4',
    name: 'Mr. Tunde Adebayo',
    email: 'tunde@teacher.com',
    subjects: ['Economics', 'Geography'],
    avatar: 'https://images.pexels.com/photos/2406949/pexels-photo-2406949.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    phone: '+234 814 456 7890',
    address: 'Mushin, Lagos',
    qualification: 'M.Sc Economics',
    experience: '8 years',
    employeeId: 'TCH004',
    department: 'Social Sciences',
    classesAssigned: ['SS3B', 'SS3C', 'SS2A'],
    studentsCount: 78,
    examsCreated: 22,
    status: 'active'
  },
  {
    id: 'tch_5',
    name: 'Mrs. Folake Adeyemi',
    email: 'folake@teacher.com',
    subjects: ['History'],
    avatar: 'https://images.pexels.com/photos/2381463/pexels-photo-2381463.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    phone: '+234 815 567 8901',
    address: 'Ajah, Lagos',
    qualification: 'M.A History',
    experience: '6 years',
    employeeId: 'TCH005',
    department: 'Social Sciences',
    classesAssigned: ['SS3C', 'SS2B'],
    studentsCount: 65,
    examsCreated: 18,
    status: 'active'
  }
];

export const mockExams = [
  {
    id: 'exam_1',
    title: 'WAEC Mathematics Mock Exam 2024',
    subject: 'Mathematics',
    class: 'SS3A',
    duration: 180,
    totalQuestions: 60,
    totalMarks: 100,
    examType: 'mock',
    scheduledDate: '2024-11-25',
    scheduledTime: '09:00',
    status: 'scheduled',
    createdBy: 'Mrs. Adunni Fashola',
    instructions: 'Answer all questions. Use of calculator is allowed.',
    studentsRegistered: 45,
    studentsCompleted: 0,
    averageScore: 0,
    passingScore: 50,
    difficulty: 'Medium',
    tags: ['WAEC', 'Mock', 'Mathematics'],
    questionTypes: {
      multiple_choice: 50,
      essay: 10
    }
  },
  {
    id: 'exam_2',
    title: 'Chemistry Mid-Term Assessment',
    subject: 'Chemistry',
    class: 'SS3A',
    duration: 120,
    totalQuestions: 40,
    totalMarks: 80,
    examType: 'assessment',
    scheduledDate: '2024-11-20',
    scheduledTime: '10:30',
    status: 'active',
    createdBy: 'Mr. Olumide Bankole',
    instructions: 'Answer all questions. Periodic table provided.',
    studentsRegistered: 42,
    studentsCompleted: 28,
    averageScore: 65.8,
    passingScore: 40,
    difficulty: 'Hard',
    tags: ['Mid-term', 'Chemistry', 'Assessment'],
    questionTypes: {
      multiple_choice: 30,
      essay: 10
    }
  },
  {
    id: 'exam_3',
    title: 'English Language Practice Test',
    subject: 'English Language',
    class: 'SS3B',
    duration: 150,
    totalQuestions: 50,
    totalMarks: 100,
    examType: 'practice',
    scheduledDate: '2024-11-18',
    scheduledTime: '14:00',
    status: 'completed',
    createdBy: 'Mrs. Kemi Oladele',
    instructions: 'Read all passages carefully before answering.',
    studentsRegistered: 38,
    studentsCompleted: 38,
    averageScore: 72.4,
    passingScore: 50,
    difficulty: 'Medium',
    tags: ['Practice', 'English', 'Comprehension'],
    questionTypes: {
      multiple_choice: 40,
      essay: 10
    }
  },
  {
    id: 'exam_4',
    title: 'Physics Practical Exam',
    subject: 'Physics',
    class: 'SS3A',
    duration: 90,
    totalQuestions: 25,
    totalMarks: 50,
    examType: 'practical',
    scheduledDate: '2024-11-22',
    scheduledTime: '11:00',
    status: 'scheduled',
    createdBy: 'Mrs. Adunni Fashola',
    instructions: 'Practical-based questions. Show all workings.',
    studentsRegistered: 35,
    studentsCompleted: 0,
    averageScore: 0,
    passingScore: 25,
    difficulty: 'Hard',
    tags: ['Practical', 'Physics', 'Laboratory'],
    questionTypes: {
      multiple_choice: 15,
      essay: 10
    }
  },
  {
    id: 'exam_5',
    title: 'Biology WAEC Prep Test',
    subject: 'Biology',
    class: 'SS3C',
    duration: 180,
    totalQuestions: 55,
    totalMarks: 90,
    examType: 'mock',
    scheduledDate: '2024-11-28',
    scheduledTime: '08:30',
    status: 'scheduled',
    createdBy: 'Mr. Olumide Bankole',
    instructions: 'WAEC standard questions. No use of notes.',
    studentsRegistered: 32,
    studentsCompleted: 0,
    averageScore: 0,
    passingScore: 45,
    difficulty: 'Medium',
    tags: ['WAEC', 'Biology', 'Preparation'],
    questionTypes: {
      multiple_choice: 40,
      essay: 15
    }
  },
  {
    id: 'exam_6',
    title: 'Economics Quiz',
    subject: 'Economics',
    class: 'SS3B',
    duration: 60,
    totalQuestions: 20,
    totalMarks: 40,
    examType: 'quiz',
    scheduledDate: '2024-11-19',
    scheduledTime: '13:00',
    status: 'active',
    createdBy: 'Mr. Tunde Adebayo',
    instructions: 'Quick quiz on market structures.',
    studentsRegistered: 28,
    studentsCompleted: 15,
    averageScore: 68.2,
    passingScore: 20,
    difficulty: 'Easy',
    tags: ['Quiz', 'Economics', 'Market'],
    questionTypes: {
      multiple_choice: 20,
      essay: 0
    }
  }
];

export const mockQuestions = [
  {
    id: 'q_1',
    subject: 'Mathematics',
    question: 'If 2x + 3 = 11, what is the value of x?',
    type: 'multiple_choice',
    options: ['A) 3', 'B) 4', 'C) 5', 'D) 6'],
    correctAnswer: 'B) 4',
    explanation: 'Solving: 2x + 3 = 11, 2x = 8, x = 4',
    difficulty: 'Easy',
    topic: 'Algebra',
    marks: 2,
    timeAllocation: 2,
    tags: ['algebra', 'linear equations']
  },
  {
    id: 'q_2',
    subject: 'Physics',
    question: 'What is the formula for calculating kinetic energy?',
    type: 'multiple_choice',
    options: ['A) KE = mv²', 'B) KE = ½mv²', 'C) KE = m²v', 'D) KE = 2mv²'],
    correctAnswer: 'B) KE = ½mv²',
    explanation: 'Kinetic energy is calculated as KE = ½mv², where m is mass and v is velocity.',
    difficulty: 'Medium',
    topic: 'Energy',
    marks: 3,
    timeAllocation: 3,
    tags: ['energy', 'kinetic', 'formula']
  },
  {
    id: 'q_3',
    subject: 'Chemistry',
    question: 'What is the atomic number of Carbon?',
    type: 'multiple_choice',
    options: ['A) 4', 'B) 6', 'C) 8', 'D) 12'],
    correctAnswer: 'B) 6',
    explanation: 'Carbon has 6 protons, hence atomic number 6.',
    difficulty: 'Easy',
    topic: 'Atomic Structure',
    marks: 2,
    timeAllocation: 2,
    tags: ['atomic number', 'carbon', 'periodic table']
  },
  {
    id: 'q_4',
    subject: 'English Language',
    question: 'Choose the correct spelling:',
    type: 'multiple_choice',
    options: ['A) Recieve', 'B) Receive', 'C) Receeve', 'D) Recive'],
    correctAnswer: 'B) Receive',
    explanation: 'The correct spelling is "receive" - i before e except after c.',
    difficulty: 'Easy',
    topic: 'Spelling',
    marks: 1,
    timeAllocation: 1,
    tags: ['spelling', 'grammar']
  },
  {
    id: 'q_5',
    subject: 'Biology',
    question: 'What is the powerhouse of the cell?',
    type: 'multiple_choice',
    options: ['A) Nucleus', 'B) Ribosome', 'C) Mitochondria', 'D) Lysosome'],
    correctAnswer: 'C) Mitochondria',
    explanation: 'Mitochondria produces ATP, the energy currency of the cell.',
    difficulty: 'Easy',
    topic: 'Cell Biology',
    marks: 2,
    timeAllocation: 2,
    tags: ['cell', 'mitochondria', 'energy']
  }
];

export const mockResults = [
  {
    id: 'result_1',
    examId: 'exam_3',
    studentId: 'std_1',
    studentName: 'Adebayo Oluwaseun',
    subject: 'English Language',
    examTitle: 'English Language Practice Test',
    score: 78,
    totalMarks: 100,
    percentage: 78,
    grade: 'B',
    timeSpent: 135,
    totalTime: 150,
    questionsAttempted: 48,
    totalQuestions: 50,
    correctAnswers: 39,
    wrongAnswers: 9,
    unattempted: 2,
    submittedAt: '2024-11-18T16:45:00Z',
    status: 'completed',
    remarks: 'Good performance, needs improvement in comprehension'
  },
  {
    id: 'result_2',
    examId: 'exam_2',
    studentId: 'std_2',
    studentName: 'Chinwe Okafor',
    subject: 'Chemistry',
    examTitle: 'Chemistry Mid-Term Assessment',
    score: 72,
    totalMarks: 80,
    percentage: 90,
    grade: 'A',
    timeSpent: 110,
    totalTime: 120,
    questionsAttempted: 40,
    totalQuestions: 40,
    correctAnswers: 36,
    wrongAnswers: 4,
    unattempted: 0,
    submittedAt: '2024-11-20T12:20:00Z',
    status: 'completed',
    remarks: 'Excellent performance, well prepared'
  },
  {
    id: 'result_3',
    examId: 'exam_6',
    studentId: 'std_3',
    studentName: 'Mohammed Abdullahi',
    subject: 'Economics',
    examTitle: 'Economics Quiz',
    score: 28,
    totalMarks: 40,
    percentage: 70,
    grade: 'B',
    timeSpent: 45,
    totalTime: 60,
    questionsAttempted: 20,
    totalQuestions: 20,
    correctAnswers: 14,
    wrongAnswers: 6,
    unattempted: 0,
    submittedAt: '2024-11-19T14:00:00Z',
    status: 'completed',
    remarks: 'Average performance, review market structures'
  }
];

export const mockAnalytics = {
  totalStudents: 1245,
  totalTeachers: 89,
  totalExams: 156,
  totalSubjects: 12,
  activeExams: 12,
  completedExams: 144,
  averageScore: 73.5,
  passRate: 82.3,
  topPerformingSubject: 'Mathematics',
  weeklyStats: [
    { week: 'Week 1', exams: 15, students: 234 },
    { week: 'Week 2', exams: 22, students: 345 },
    { week: 'Week 3', exams: 18, students: 298 },
    { week: 'Week 4', exams: 25, students: 412 }
  ],
  subjectPerformance: [
    { subject: 'Mathematics', averageScore: 78.5, studentsCount: 456 },
    { subject: 'English Language', averageScore: 82.3, studentsCount: 498 },
    { subject: 'Physics', averageScore: 68.7, studentsCount: 234 },
    { subject: 'Chemistry', averageScore: 71.2, studentsCount: 267 },
    { subject: 'Biology', averageScore: 75.8, studentsCount: 298 }
  ]
};

export const mockNotifications = [
  {
    id: 'notif_1',
    title: 'New Exam Scheduled',
    message: 'WAEC Mathematics Mock Exam has been scheduled for November 25, 2024',
    type: 'info',
    timestamp: '2024-11-15T10:30:00Z',
    read: false,
    recipient: 'all_students'
  },
  {
    id: 'notif_2',
    title: 'System Maintenance',
    message: 'System will be under maintenance on November 24, 2024 from 2:00 AM to 4:00 AM',
    type: 'warning',
    timestamp: '2024-11-14T15:00:00Z',
    read: false,
    recipient: 'all_users'
  },
  {
    id: 'notif_3',
    title: 'Exam Results Available',
    message: 'Results for Chemistry Mid-Term Assessment are now available',
    type: 'success',
    timestamp: '2024-11-13T09:15:00Z',
    read: true,
    recipient: 'ss3a_students'
  }
];

export const mockSettings = {
  school: {
    name: 'Lagos State Model College',
    address: 'Ikeja, Lagos State',
    phone: '+234 802 123 4567',
    email: 'info@lagosmodel.edu.ng',
    logo: 'https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    website: 'www.lagosmodel.edu.ng',
    established: '1956',
    motto: 'Excellence in Education'
  },
  exam: {
    defaultDuration: 180,
    autoSubmit: true,
    showResults: 'immediate',
    randomizeQuestions: true,
    allowReview: true,
    warningTime: 10,
    maxAttempts: 1,
    proctoring: false
  },
  security: {
    sessionTimeout: 30,
    deviceTracking: true,
    ipRestriction: false,
    passwordExpiry: 90,
    twoFactorAuth: false
  },
  notification: {
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    examReminders: true,
    resultNotifications: true
  }
};