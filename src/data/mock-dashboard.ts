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
  {
    id: 5,
    activity: 'Ai Automation',
    type: 'Mini Project',
    date: 'Apr 20',
    status: 'approved',
  },
  {
    id: 6,
    activity: 'Web Development Portfolio',
    type: 'Project',
    date: 'Apr 19',
    status: 'review',
  },
  {
    id: 7,
    activity: 'Machine Learning Model',
    type: 'Project',
    date: 'Apr 17',
    status: 'approved',
  },
  {
    id: 8,
    activity: 'Network Security Lab',
    type: 'Curriculum',
    date: 'Apr 16',
    status: 'pending',
  },
  {
    id: 9,
    activity: 'Mobile App Development',
    type: 'Mini Project',
    date: 'Apr 15',
    status: 'review',
  },
  {
    id: 10,
    activity: 'Cloud Computing Assignment',
    type: 'Research',
    date: 'Apr 14',
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

export const mockAttendanceData = {
  monthly: {
    // Each month has 4 weeks of data for 3 series (Present, Late, Absent)
    January: [
      [
        { label: 'W1', value: 88 },
        { label: 'W2', value: 92 },
        { label: 'W3', value: 85 },
        { label: 'W4', value: 95 },
      ],
      [
        { label: 'W1', value: 8 },
        { label: 'W2', value: 5 },
        { label: 'W3', value: 10 },
        { label: 'W4', value: 3 },
      ],
      [
        { label: 'W1', value: 4 },
        { label: 'W2', value: 3 },
        { label: 'W3', value: 5 },
        { label: 'W4', value: 2 },
      ],
    ],
    February: [
      [
        { label: 'W1', value: 90 },
        { label: 'W2', value: 93 },
        { label: 'W3', value: 89 },
        { label: 'W4', value: 94 },
      ],
      [
        { label: 'W1', value: 7 },
        { label: 'W2', value: 5 },
        { label: 'W3', value: 8 },
        { label: 'W4', value: 4 },
      ],
      [
        { label: 'W1', value: 3 },
        { label: 'W2', value: 2 },
        { label: 'W3', value: 3 },
        { label: 'W4', value: 2 },
      ],
    ],
    March: [
      [
        { label: 'W1', value: 91 },
        { label: 'W2', value: 96 },
        { label: 'W3', value: 92 },
        { label: 'W4', value: 93 },
      ],
      [
        { label: 'W1', value: 6 },
        { label: 'W2', value: 2 },
        { label: 'W3', value: 5 },
        { label: 'W4', value: 4 },
      ],
      [
        { label: 'W1', value: 3 },
        { label: 'W2', value: 2 },
        { label: 'W3', value: 3 },
        { label: 'W4', value: 3 },
      ],
    ],
    April: [
      [
        { label: 'W1', value: 89 },
        { label: 'W2', value: 94 },
        { label: 'W3', value: 91 },
        { label: 'W4', value: 96 },
      ],
      [
        { label: 'W1', value: 8 },
        { label: 'W2', value: 4 },
        { label: 'W3', value: 6 },
        { label: 'W4', value: 2 },
      ],
      [
        { label: 'W1', value: 3 },
        { label: 'W2', value: 2 },
        { label: 'W3', value: 3 },
        { label: 'W4', value: 2 },
      ],
    ],
    May: [
      [
        { label: 'W1', value: 94 },
        { label: 'W2', value: 92 },
        { label: 'W3', value: 93 },
        { label: 'W4', value: 95 },
      ],
      [
        { label: 'W1', value: 4 },
        { label: 'W2', value: 5 },
        { label: 'W3', value: 5 },
        { label: 'W4', value: 3 },
      ],
      [
        { label: 'W1', value: 2 },
        { label: 'W2', value: 3 },
        { label: 'W3', value: 2 },
        { label: 'W4', value: 2 },
      ],
    ],
    June: [
      [
        { label: 'W1', value: 91 },
        { label: 'W2', value: 93 },
        { label: 'W3', value: 90 },
        { label: 'W4', value: 92 },
      ],
      [
        { label: 'W1', value: 6 },
        { label: 'W2', value: 5 },
        { label: 'W3', value: 7 },
        { label: 'W4', value: 5 },
      ],
      [
        { label: 'W1', value: 3 },
        { label: 'W2', value: 2 },
        { label: 'W3', value: 3 },
        { label: 'W4', value: 3 },
      ],
    ],
    July: [
      [
        { label: 'W1', value: 93 },
        { label: 'W2', value: 95 },
        { label: 'W3', value: 92 },
        { label: 'W4', value: 94 },
      ],
      [
        { label: 'W1', value: 5 },
        { label: 'W2', value: 3 },
        { label: 'W3', value: 5 },
        { label: 'W4', value: 4 },
      ],
      [
        { label: 'W1', value: 2 },
        { label: 'W2', value: 2 },
        { label: 'W3', value: 3 },
        { label: 'W4', value: 2 },
      ],
    ],
    August: [
      [
        { label: 'W1', value: 95 },
        { label: 'W2', value: 94 },
        { label: 'W3', value: 96 },
        { label: 'W4', value: 93 },
      ],
      [
        { label: 'W1', value: 3 },
        { label: 'W2', value: 4 },
        { label: 'W3', value: 2 },
        { label: 'W4', value: 5 },
      ],
      [
        { label: 'W1', value: 2 },
        { label: 'W2', value: 2 },
        { label: 'W3', value: 2 },
        { label: 'W4', value: 2 },
      ],
    ],
    September: [
      [
        { label: 'W1', value: 92 },
        { label: 'W2', value: 91 },
        { label: 'W3', value: 93 },
        { label: 'W4', value: 90 },
      ],
      [
        { label: 'W1', value: 5 },
        { label: 'W2', value: 6 },
        { label: 'W3', value: 5 },
        { label: 'W4', value: 7 },
      ],
      [
        { label: 'W1', value: 3 },
        { label: 'W2', value: 3 },
        { label: 'W3', value: 2 },
        { label: 'W4', value: 3 },
      ],
    ],
    October: [
      [
        { label: 'W1', value: 96 },
        { label: 'W2', value: 95 },
        { label: 'W3', value: 94 },
        { label: 'W4', value: 97 },
      ],
      [
        { label: 'W1', value: 2 },
        { label: 'W2', value: 3 },
        { label: 'W3', value: 4 },
        { label: 'W4', value: 2 },
      ],
      [
        { label: 'W1', value: 2 },
        { label: 'W2', value: 2 },
        { label: 'W3', value: 2 },
        { label: 'W4', value: 1 },
      ],
    ],
    November: [
      [
        { label: 'W1', value: 94 },
        { label: 'W2', value: 92 },
        { label: 'W3', value: 93 },
        { label: 'W4', value: 95 },
      ],
      [
        { label: 'W1', value: 4 },
        { label: 'W2', value: 5 },
        { label: 'W3', value: 5 },
        { label: 'W4', value: 3 },
      ],
      [
        { label: 'W1', value: 2 },
        { label: 'W2', value: 3 },
        { label: 'W3', value: 2 },
        { label: 'W4', value: 2 },
      ],
    ],
    December: [
      [
        { label: 'W1', value: 93 },
        { label: 'W2', value: 91 },
        { label: 'W3', value: 94 },
        { label: 'W4', value: 92 },
      ],
      [
        { label: 'W1', value: 5 },
        { label: 'W2', value: 6 },
        { label: 'W3', value: 4 },
        { label: 'W4', value: 5 },
      ],
      [
        { label: 'W1', value: 2 },
        { label: 'W2', value: 3 },
        { label: 'W3', value: 2 },
        { label: 'W4', value: 3 },
      ],
    ],
  },
  yearly: [
    // Series 1: Present (Dark Indigo)
    [
      { label: 'Jan', value: 88 },
      { label: 'Feb', value: 90 },
      { label: 'Mar', value: 92 },
      { label: 'Apr', value: 89 },
      { label: 'May', value: 94 },
      { label: 'Jun', value: 91 },
      { label: 'Jul', value: 93 },
      { label: 'Aug', value: 95 },
      { label: 'Sep', value: 92 },
      { label: 'Oct', value: 96 },
      { label: 'Nov', value: 94 },
      { label: 'Dec', value: 93 },
    ],
    // Series 2: Late (Magenta/Pink)
    [
      { label: 'Jan', value: 8 },
      { label: 'Feb', value: 7 },
      { label: 'Mar', value: 5 },
      { label: 'Apr', value: 8 },
      { label: 'May', value: 4 },
      { label: 'Jun', value: 6 },
      { label: 'Jul', value: 5 },
      { label: 'Aug', value: 3 },
      { label: 'Sep', value: 5 },
      { label: 'Oct', value: 2 },
      { label: 'Nov', value: 4 },
      { label: 'Dec', value: 5 },
    ],
    // Series 3: Absent (Cyan/Sky Blue)
    [
      { label: 'Jan', value: 4 },
      { label: 'Feb', value: 3 },
      { label: 'Mar', value: 3 },
      { label: 'Apr', value: 3 },
      { label: 'May', value: 2 },
      { label: 'Jun', value: 3 },
      { label: 'Jul', value: 2 },
      { label: 'Aug', value: 2 },
      { label: 'Sep', value: 3 },
      { label: 'Oct', value: 2 },
      { label: 'Nov', value: 2 },
      { label: 'Dec', value: 2 },
    ],
  ],
}


