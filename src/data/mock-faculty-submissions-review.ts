/**
 * Mock Data - Faculty Submissions
 */

export interface Submission {
  id: number
  student: {
    name: string
    avatar: string
    color: string
  }
  activity: string
  type: string
  submittedDate: string
  status: 'pending' | 'approved' | 'needs-revision'
  priority?: 'urgent' | 'high' | 'normal'
  grade?: number
  reviewedDate?: string
  revisionReason?: string
}

export const mockSubmissions: Submission[] = [
  {
    id: 1,
    student: {
      name: 'Arjun Sharma',
      avatar: 'AS',
      color: 'hsl(238, 74%, 59%)',
    },
    activity: 'AI Research Paper',
    type: 'Research',
    submittedDate: 'Apr 21, 2026 · 2 hrs ago',
    status: 'pending',
    priority: 'urgent',
  },
  {
    id: 2,
    student: {
      name: 'Kavya Raj',
      avatar: 'KR',
      color: 'hsl(158, 64%, 52%)',
    },
    activity: 'Physics Lab Report',
    type: 'Curriculum',
    submittedDate: 'Apr 21, 2026 · 5 hrs ago',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 3,
    student: {
      name: 'Rohit M.',
      avatar: 'RM',
      color: 'hsl(271, 81%, 56%)',
    },
    activity: 'E-Commerce Project',
    type: 'Project',
    submittedDate: 'Apr 20, 2026',
    status: 'pending',
    priority: 'normal',
  },
  {
    id: 4,
    student: {
      name: 'Meena K.',
      avatar: 'MK',
      color: 'hsl(38, 92%, 50%)',
    },
    activity: 'Database Assignment',
    type: 'Curriculum',
    submittedDate: 'Apr 19, 2026',
    status: 'pending',
    priority: 'normal',
  },
  {
    id: 5,
    student: {
      name: 'Nisha P.',
      avatar: 'NP',
      color: 'hsl(14, 186%, 52%)',
    },
    activity: 'Data Structures Test',
    type: 'Curriculum',
    submittedDate: 'Apr 18, 2026',
    status: 'approved',
    grade: 92,
    reviewedDate: 'Apr 18, 2026 · 3 days ago',
  },
  {
    id: 6,
    student: {
      name: 'Dev Joshi',
      avatar: 'DJ',
      color: 'hsl(0, 72%, 51%)',
    },
    activity: 'Algorithm Implementation',
    type: 'Curriculum',
    submittedDate: 'Apr 17, 2026',
    status: 'needs-revision',
    revisionReason: 'Incomplete code comments',
    reviewedDate: 'Apr 17, 2026 · 4 days ago',
  },
  {
    id: 7,
    student: {
      name: 'Priya K.',
      avatar: 'PK',
      color: 'hsl(158, 64%, 52%)',
    },
    activity: 'Software Testing Report',
    type: 'Assignment',
    submittedDate: 'Apr 17, 2026',
    status: 'approved',
    grade: 88,
    reviewedDate: 'Apr 17, 2026 · 4 days ago',
  },
  {
    id: 8,
    student: {
      name: 'Vijay N.',
      avatar: 'VN',
      color: 'hsl(238, 74%, 59%)',
    },
    activity: 'Operating Systems Lab',
    type: 'Lab Work',
    submittedDate: 'Apr 16, 2026',
    status: 'approved',
    grade: 95,
    reviewedDate: 'Apr 16, 2026 · 5 days ago',
  },
  {
    id: 9,
    student: {
      name: 'Sita M.',
      avatar: 'SM',
      color: 'hsl(38, 92%, 50%)',
    },
    activity: 'Network Security Paper',
    type: 'Research',
    submittedDate: 'Apr 15, 2026',
    status: 'needs-revision',
    revisionReason: 'Missing references & citations',
    reviewedDate: 'Apr 15, 2026 · 6 days ago',
  },
]

export const submissionsStats = {
  total: mockSubmissions.length,
  pending: mockSubmissions.filter((s) => s.status === 'pending').length,
  approved: mockSubmissions.filter((s) => s.status === 'approved').length,
  needsRevision: mockSubmissions.filter((s) => s.status === 'needs-revision').length,
}
