/**
 * Faculty Dashboard Mock Data
 */

export const mockFacultyStats = {
  pendingSubmissions: 15,
  evidenceValidations: 7,
  totalClasses: 3,
  totalStudents: 86,
  classCompletionRate: 78,
  completionIncrease: 8,
}

export const mockFacultyRecentActivities = [
  {
    id: 1,
    title: 'AI Research Paper',
    student: { name: 'Arjun Sharma', avatar: 'AS', color: '#6366F1' },
    type: 'Submission',
    date: '2 hours ago',
    status: 'pending',
    icon: '📄',
  },
  {
    id: 2,
    title: 'Tech Conference Certificate',
    student: { name: 'Arjun Sharma', avatar: 'AS', color: '#6366F1' },
    type: 'Evidence',
    date: 'Today',
    status: 'pending',
    icon: '📎',
  },
  {
    id: 3,
    title: 'Physics Lab Report',
    student: { name: 'Kavya Raj', avatar: 'KR', color: '#10B981' },
    type: 'Submission',
    date: 'Today',
    status: 'pending',
    icon: '📄',
  },
  {
    id: 4,
    title: 'Hackathon Winner Badge',
    student: { name: 'Kavya Raj', avatar: 'KR', color: '#10B981' },
    type: 'Evidence',
    date: 'Apr 20',
    status: 'pending',
    icon: '📎',
  },
  {
    id: 5,
    title: 'E-Commerce Project',
    student: { name: 'Rohit M.', avatar: 'RM', color: '#8B5CF6' },
    type: 'Submission',
    date: 'Yesterday',
    status: 'pending',
    icon: '📄',
  },
  {
    id: 6,
    title: 'Internship Completion Letter',
    student: { name: 'Rohit M.', avatar: 'RM', color: '#8B5CF6' },
    type: 'Evidence',
    date: 'Apr 19',
    status: 'pending',
    icon: '📎',
  },
  {
    id: 7,
    title: 'Database Assignment',
    student: { name: 'Meena K.', avatar: 'MK', color: '#F59E0B' },
    type: 'Submission',
    date: 'Apr 19',
    status: 'pending',
    icon: '📄',
  },
  {
    id: 8,
    title: 'Data Structures Test',
    student: { name: 'Nisha P.', avatar: 'NP', color: '#10B981' },
    type: 'Submission',
    date: 'Apr 18',
    status: 'approved',
    icon: '✓',
  },
]

export const mockClassPerformance = [
  {
    id: 1,
    className: 'CSE 4A',
    subject: 'Machine Learning',
    totalStudents: 32,
    avgCompletion: 72,
    trend: 'up',
    pendingSubmissions: 5,
  },
  {
    id: 2,
    className: 'CSE 4B',
    subject: 'Database Systems',
    totalStudents: 28,
    avgCompletion: 68,
    trend: 'up',
    pendingSubmissions: 8,
  },
  {
    id: 3,
    className: 'CSE 3A',
    subject: 'Data Structures',
    totalStudents: 26,
    avgCompletion: 85,
    trend: 'up',
    pendingSubmissions: 2,
  },
]

export const mockFacultyUpcomingDeadlines = [
  {
    id: 1,
    title: 'Final Project Review',
    className: 'CSE 4A',
    date: 'Apr 25',
    daysLeft: 4,
    priority: 'high',
    submissions: { received: 18, total: 32 },
  },
  {
    id: 2,
    title: 'Mid-Term Exam',
    className: 'CSE 4B',
    date: 'Apr 28',
    daysLeft: 7,
    priority: 'medium',
    submissions: { received: 0, total: 28 },
  },
  {
    id: 3,
    title: 'Lab Assignment 5',
    className: 'CSE 3A',
    date: 'May 2',
    daysLeft: 11,
    priority: 'low',
    submissions: { received: 22, total: 26 },
  },
]

export const mockWeeklySchedule = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  times: ['9:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'],
  classes: [
    {
      day: 0, // Monday
      startTime: '9:00',
      endTime: '11:00',
      subject: 'Machine Learning',
      className: 'CSE 4A',
      room: 'Lab 301',
      type: 'Lecture',
    },
    {
      day: 0, // Monday
      startTime: '14:00',
      endTime: '16:00',
      subject: 'Database Systems',
      className: 'CSE 4B',
      room: 'Room 205',
      type: 'Lab',
    },
    {
      day: 1, // Tuesday
      startTime: '10:00',
      endTime: '12:00',
      subject: 'Data Structures',
      className: 'CSE 3A',
      room: 'Room 101',
      type: 'Lecture',
    },
    {
      day: 2, // Wednesday
      startTime: '9:00',
      endTime: '11:00',
      subject: 'Machine Learning',
      className: 'CSE 4A',
      room: 'Lab 301',
      type: 'Lab',
    },
    {
      day: 3, // Thursday
      startTime: '14:00',
      endTime: '16:00',
      subject: 'Database Systems',
      className: 'CSE 4B',
      room: 'Lab 202',
      type: 'Lab',
    },
    {
      day: 4, // Friday
      startTime: '10:00',
      endTime: '12:00',
      subject: 'Data Structures',
      className: 'CSE 3A',
      room: 'Room 101',
      type: 'Tutorial',
    },
  ],
}

// Class Performance Chart Data
export const mockClassPerformanceChartData = {
  monthly: {
    January: [
      // CSE 4A - Machine Learning
      [
        { label: 'Week 1', value: 65 },
        { label: 'Week 2', value: 68 },
        { label: 'Week 3', value: 70 },
        { label: 'Week 4', value: 72 },
      ],
      // CSE 4B - Database Systems
      [
        { label: 'Week 1', value: 60 },
        { label: 'Week 2', value: 62 },
        { label: 'Week 3', value: 65 },
        { label: 'Week 4', value: 68 },
      ],
      // CSE 3A - Data Structures
      [
        { label: 'Week 1', value: 78 },
        { label: 'Week 2', value: 80 },
        { label: 'Week 3', value: 82 },
        { label: 'Week 4', value: 85 },
      ],
    ],
    February: [
      [
        { label: 'Week 1', value: 70 },
        { label: 'Week 2', value: 72 },
        { label: 'Week 3', value: 74 },
        { label: 'Week 4', value: 76 },
      ],
      [
        { label: 'Week 1', value: 66 },
        { label: 'Week 2', value: 68 },
        { label: 'Week 3', value: 70 },
        { label: 'Week 4', value: 72 },
      ],
      [
        { label: 'Week 1', value: 82 },
        { label: 'Week 2', value: 84 },
        { label: 'Week 3', value: 86 },
        { label: 'Week 4', value: 88 },
      ],
    ],
    March: [
      [
        { label: 'Week 1', value: 74 },
        { label: 'Week 2', value: 76 },
        { label: 'Week 3', value: 78 },
        { label: 'Week 4', value: 80 },
      ],
      [
        { label: 'Week 1', value: 70 },
        { label: 'Week 2', value: 72 },
        { label: 'Week 3', value: 74 },
        { label: 'Week 4', value: 76 },
      ],
      [
        { label: 'Week 1', value: 85 },
        { label: 'Week 2', value: 87 },
        { label: 'Week 3', value: 89 },
        { label: 'Week 4', value: 90 },
      ],
    ],
    April: [
      [
        { label: 'Week 1', value: 68 },
        { label: 'Week 2', value: 70 },
        { label: 'Week 3', value: 72 },
        { label: 'Week 4', value: 75 },
      ],
      [
        { label: 'Week 1', value: 64 },
        { label: 'Week 2', value: 66 },
        { label: 'Week 3', value: 68 },
        { label: 'Week 4', value: 70 },
      ],
      [
        { label: 'Week 1', value: 83 },
        { label: 'Week 2', value: 85 },
        { label: 'Week 3', value: 86 },
        { label: 'Week 4', value: 88 },
      ],
    ],
    May: [
      [
        { label: 'Week 1', value: 75 },
        { label: 'Week 2', value: 77 },
        { label: 'Week 3', value: 79 },
        { label: 'Week 4', value: 81 },
      ],
      [
        { label: 'Week 1', value: 70 },
        { label: 'Week 2', value: 72 },
        { label: 'Week 3', value: 75 },
        { label: 'Week 4', value: 78 },
      ],
      [
        { label: 'Week 1', value: 88 },
        { label: 'Week 2', value: 90 },
        { label: 'Week 3', value: 91 },
        { label: 'Week 4', value: 92 },
      ],
    ],
    June: [
      [
        { label: 'Week 1', value: 78 },
        { label: 'Week 2', value: 80 },
        { label: 'Week 3', value: 82 },
        { label: 'Week 4', value: 84 },
      ],
      [
        { label: 'Week 1', value: 75 },
        { label: 'Week 2', value: 77 },
        { label: 'Week 3', value: 79 },
        { label: 'Week 4', value: 81 },
      ],
      [
        { label: 'Week 1', value: 90 },
        { label: 'Week 2', value: 91 },
        { label: 'Week 3', value: 92 },
        { label: 'Week 4', value: 93 },
      ],
    ],
    July: [
      [
        { label: 'Week 1', value: 80 },
        { label: 'Week 2', value: 82 },
        { label: 'Week 3', value: 84 },
        { label: 'Week 4', value: 85 },
      ],
      [
        { label: 'Week 1', value: 78 },
        { label: 'Week 2', value: 80 },
        { label: 'Week 3', value: 82 },
        { label: 'Week 4', value: 83 },
      ],
      [
        { label: 'Week 1', value: 91 },
        { label: 'Week 2', value: 92 },
        { label: 'Week 3', value: 93 },
        { label: 'Week 4', value: 94 },
      ],
    ],
    August: [
      [
        { label: 'Week 1', value: 82 },
        { label: 'Week 2', value: 84 },
        { label: 'Week 3', value: 85 },
        { label: 'Week 4', value: 86 },
      ],
      [
        { label: 'Week 1', value: 80 },
        { label: 'Week 2', value: 82 },
        { label: 'Week 3', value: 83 },
        { label: 'Week 4', value: 84 },
      ],
      [
        { label: 'Week 1', value: 92 },
        { label: 'Week 2', value: 93 },
        { label: 'Week 3', value: 94 },
        { label: 'Week 4', value: 95 },
      ],
    ],
    September: [
      [
        { label: 'Week 1', value: 70 },
        { label: 'Week 2', value: 72 },
        { label: 'Week 3', value: 74 },
        { label: 'Week 4', value: 76 },
      ],
      [
        { label: 'Week 1', value: 68 },
        { label: 'Week 2', value: 70 },
        { label: 'Week 3', value: 72 },
        { label: 'Week 4', value: 74 },
      ],
      [
        { label: 'Week 1', value: 85 },
        { label: 'Week 2', value: 87 },
        { label: 'Week 3', value: 88 },
        { label: 'Week 4', value: 90 },
      ],
    ],
    October: [
      [
        { label: 'Week 1', value: 73 },
        { label: 'Week 2', value: 75 },
        { label: 'Week 3', value: 77 },
        { label: 'Week 4', value: 79 },
      ],
      [
        { label: 'Week 1', value: 71 },
        { label: 'Week 2', value: 73 },
        { label: 'Week 3', value: 75 },
        { label: 'Week 4', value: 77 },
      ],
      [
        { label: 'Week 1', value: 87 },
        { label: 'Week 2', value: 89 },
        { label: 'Week 3', value: 90 },
        { label: 'Week 4', value: 91 },
      ],
    ],
    November: [
      [
        { label: 'Week 1', value: 76 },
        { label: 'Week 2', value: 78 },
        { label: 'Week 3', value: 80 },
        { label: 'Week 4', value: 82 },
      ],
      [
        { label: 'Week 1', value: 74 },
        { label: 'Week 2', value: 76 },
        { label: 'Week 3', value: 78 },
        { label: 'Week 4', value: 80 },
      ],
      [
        { label: 'Week 1', value: 89 },
        { label: 'Week 2', value: 90 },
        { label: 'Week 3', value: 91 },
        { label: 'Week 4', value: 92 },
      ],
    ],
    December: [
      [
        { label: 'Week 1', value: 80 },
        { label: 'Week 2', value: 82 },
        { label: 'Week 3', value: 84 },
        { label: 'Week 4', value: 86 },
      ],
      [
        { label: 'Week 1', value: 78 },
        { label: 'Week 2', value: 80 },
        { label: 'Week 3', value: 82 },
        { label: 'Week 4', value: 84 },
      ],
      [
        { label: 'Week 1', value: 90 },
        { label: 'Week 2', value: 91 },
        { label: 'Week 3', value: 92 },
        { label: 'Week 4', value: 93 },
      ],
    ],
  },
  yearly: [
    // CSE 4A - Machine Learning
    [
      { label: 'Jan', value: 72 },
      { label: 'Feb', value: 76 },
      { label: 'Mar', value: 80 },
      { label: 'Apr', value: 75 },
      { label: 'May', value: 81 },
      { label: 'Jun', value: 84 },
      { label: 'Jul', value: 85 },
      { label: 'Aug', value: 86 },
      { label: 'Sep', value: 76 },
      { label: 'Oct', value: 79 },
      { label: 'Nov', value: 82 },
      { label: 'Dec', value: 86 },
    ],
    // CSE 4B - Database Systems
    [
      { label: 'Jan', value: 68 },
      { label: 'Feb', value: 72 },
      { label: 'Mar', value: 76 },
      { label: 'Apr', value: 70 },
      { label: 'May', value: 78 },
      { label: 'Jun', value: 81 },
      { label: 'Jul', value: 83 },
      { label: 'Aug', value: 84 },
      { label: 'Sep', value: 74 },
      { label: 'Oct', value: 77 },
      { label: 'Nov', value: 80 },
      { label: 'Dec', value: 84 },
    ],
    // CSE 3A - Data Structures
    [
      { label: 'Jan', value: 85 },
      { label: 'Feb', value: 88 },
      { label: 'Mar', value: 90 },
      { label: 'Apr', value: 88 },
      { label: 'May', value: 92 },
      { label: 'Jun', value: 93 },
      { label: 'Jul', value: 94 },
      { label: 'Aug', value: 95 },
      { label: 'Sep', value: 90 },
      { label: 'Oct', value: 91 },
      { label: 'Nov', value: 92 },
      { label: 'Dec', value: 93 },
    ],
  ],
}
