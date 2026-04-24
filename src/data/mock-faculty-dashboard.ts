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
