/**
 * Mock Data - Student Activities & Submissions
 */

export const mockResearchPapers = [
  {
    id: 1,
    title: 'Machine Learning in Healthcare',
    subject: 'Computer Science',
    submittedDate: '2026-04-15',
    status: 'approved',
    grade: 'A+',
    faculty: 'Dr. Sarah Mitchell',
  },
  {
    id: 2,
    title: 'Quantum Computing Fundamentals',
    subject: 'Physics',
    submittedDate: '2026-04-10',
    status: 'review',
    faculty: 'Prof. Robert Chen',
  },
  {
    id: 3,
    title: 'Blockchain Technology Applications',
    subject: 'Computer Science',
    submittedDate: '2026-03-28',
    status: 'approved',
    grade: 'A',
    faculty: 'Dr. Sarah Mitchell',
  },
]

export const mockExtraCurricular = [
  {
    id: 1,
    title: 'National Hackathon 2026 - Winner',
    category: 'Competition',
    date: '2026-03-15',
    status: 'approved',
    certificate: true,
  },
  {
    id: 2,
    title: 'Web Development Workshop',
    category: 'Workshop',
    date: '2026-02-20',
    status: 'approved',
    hours: 8,
  },
  {
    id: 3,
    title: 'State Level Coding Competition',
    category: 'Competition',
    date: '2026-01-10',
    status: 'pending',
    rank: '3rd Place',
  },
]

export const mockAssignments = [
  {
    id: 1,
    title: 'Data Structures - Binary Trees',
    subject: 'Computer Science',
    submittedDate: '2026-04-18',
    dueDate: '2026-04-20',
    status: 'pending',
    faculty: 'Prof. Michael Chen',
  },
  {
    id: 2,
    title: 'Database Normalization Exercise',
    subject: 'Database Systems',
    submittedDate: '2026-04-16',
    dueDate: '2026-04-17',
    status: 'approved',
    grade: 'A',
    faculty: 'Dr. Emily Rodriguez',
  },
  {
    id: 3,
    title: 'Linear Algebra Problem Set',
    subject: 'Mathematics',
    submittedDate: '2026-04-12',
    dueDate: '2026-04-15',
    status: 'approved',
    grade: 'A+',
    faculty: 'Dr. Sarah Johnson',
  },
  {
    id: 4,
    title: 'React Component Design',
    subject: 'Web Technologies',
    submittedDate: '2026-04-14',
    dueDate: '2026-04-18',
    status: 'review',
    faculty: 'Prof. David Lee',
  },
]

export const mockProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform with React',
    subject: 'Web Technologies',
    submittedDate: '2026-03-25',
    status: 'approved',
    grade: 'A+',
    faculty: 'Prof. David Lee',
    teamSize: 4,
  },
  {
    id: 2,
    title: 'AI Chatbot System',
    subject: 'Artificial Intelligence',
    submittedDate: '2026-04-05',
    status: 'review',
    faculty: 'Dr. Lisa Wang',
    teamSize: 3,
  },
  {
    id: 3,
    title: 'Library Management System',
    subject: 'Database Systems',
    submittedDate: '2026-02-28',
    status: 'approved',
    grade: 'A',
    faculty: 'Dr. Emily Rodriguez',
    teamSize: 2,
  },
]

export const mockActivityDetails = {
  1: {
    id: 1,
    title: 'Machine Learning in Healthcare',
    type: 'Research Paper',
    subject: 'Computer Science',
    description:
      'Comprehensive research paper on machine learning applications in healthcare diagnostics and patient care.',
    submittedDate: '2026-04-15T14:30:00',
    status: 'approved',
    grade: 'A+',
    faculty: 'Dr. Sarah Mitchell',
    feedback:
      'Outstanding research with excellent analysis. Your insights on ML applications in diagnostics are particularly strong.',
    files: [
      {
        name: 'ML_Healthcare_Research.pdf',
        size: '2.4 MB',
        uploadedAt: '2026-04-15T14:30:00',
      },
      {
        name: 'Dataset_Analysis.xlsx',
        size: '890 KB',
        uploadedAt: '2026-04-15T14:32:00',
      },
    ],
    links: ['https://github.com/student/ml-healthcare-research'],
  },
}
