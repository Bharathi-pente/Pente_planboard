/**
 * Mock Data - Student Dashboard
 */

export const mockStudentStats = {
  pendingSubmissions: 5,
  underReview: 3,
  approvedItems: 24,
  attendanceRate: 92,
  attendanceIncrease: 5,
}

export const mockRecentSubmissions = [
  {
    id: 1,
    activity: 'AI Research Paper',
    type: 'Research',
    date: 'Apr 21',
    status: 'pending',
  },
  {
    id: 2,
    activity: 'Database Assignment',
    type: 'Curriculum',
    date: 'Apr 20',
    status: 'review',
  },
  {
    id: 3,
    activity: 'E-Commerce Project',
    type: 'Project',
    date: 'Apr 19',
    status: 'approved',
  },
  {
    id: 4,
    activity: 'Data Structures Test',
    type: 'Curriculum',
    date: 'Apr 18',
    status: 'approved',
  },
]

export const mockUpcomingDeadlines = [
  {
    id: 1,
    title: 'Machine Learning Assignment',
    tag: 'Urgent',
    date: 'Tomorrow · Apr 22',
    color: 'red' as const,
  },
  {
    id: 2,
    title: 'Physics Lab Report',
    tag: '2 Days',
    date: 'Apr 24',
    color: 'yellow' as const,
  },
  {
    id: 3,
    title: 'Software Project Demo',
    tag: '6 Days',
    date: 'Apr 27',
    color: 'blue' as const,
  },
]

export const mockPortfolioProgress = {
  completion: 68,
  target: 80,
  completedItems: 24,
  inProgress: 8,
  breakdown: {
    curriculumActivities: 10,
    projects: 6,
    eventsAndCertificates: 8,
  },
  totalRequired: 35,
}

export const mockDigitalLockerSummary = {
  verifiedEvidence: 24,
  certificates: 8,
  projects: 6,
  assignments: 10,
}


