/**
 * Mock Data - Faculty Evidence Validation
 */

export interface Evidence {
  id: number
  title: string
  student: {
    name: string
    avatar: string
    color: string
  }
  category: string
  fileType: string
  fileSize: string
  uploadedDate: string
  status: 'pending' | 'validated' | 'rejected'
  validatedDate?: string
}

export const mockEvidence: Evidence[] = [
  {
    id: 1,
    title: 'Tech Symposium 2025 Certificate',
    student: {
      name: 'Arjun Sharma',
      avatar: 'AS',
      color: 'hsl(238, 74%, 59%)',
    },
    category: 'Event Participation',
    fileType: 'certificate.pdf',
    fileSize: '856 KB',
    uploadedDate: 'Today',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Hackathon Winner Badge',
    student: {
      name: 'Kavya Raj',
      avatar: 'KR',
      color: 'hsl(158, 64%, 52%)',
    },
    category: 'First Place Achievement',
    fileType: 'badge.jpg',
    fileSize: '245 KB',
    uploadedDate: 'Yesterday',
    status: 'pending',
  },
  {
    id: 3,
    title: 'AWS Cloud Certification',
    student: {
      name: 'Rohit M.',
      avatar: 'RM',
      color: 'hsl(271, 81%, 56%)',
    },
    category: 'Professional Certification',
    fileType: 'certificate.pdf',
    fileSize: '1.2 MB',
    uploadedDate: '2 days ago',
    status: 'pending',
  },
  {
    id: 4,
    title: 'Python Certification',
    student: {
      name: 'Meena K.',
      avatar: 'MK',
      color: 'hsl(38, 92%, 50%)',
    },
    category: 'Professional Certification',
    fileType: 'certificate.pdf',
    fileSize: '980 KB',
    uploadedDate: 'Apr 20, 2026',
    status: 'validated',
    validatedDate: 'Apr 20, 2026',
  },
  {
    id: 5,
    title: 'Lab Equipment Training',
    student: {
      name: 'Rohit M.',
      avatar: 'RM',
      color: 'hsl(271, 81%, 56%)',
    },
    category: 'Training Certificate',
    fileType: 'training.pdf',
    fileSize: '654 KB',
    uploadedDate: 'Apr 19, 2026',
    status: 'validated',
    validatedDate: 'Apr 19, 2026',
  },
  {
    id: 6,
    title: 'Internship Letter',
    student: {
      name: 'Dev Joshi',
      avatar: 'DJ',
      color: 'hsl(0, 72%, 51%)',
    },
    category: 'Work Experience',
    fileType: 'letter.pdf',
    fileSize: '421 KB',
    uploadedDate: 'Apr 18, 2026',
    status: 'rejected',
    validatedDate: 'Apr 18, 2026',
  },
]

export const evidenceStats = {
  pending: mockEvidence.filter((e) => e.status === 'pending').length,
  validatedToday: mockEvidence.filter(
    (e) => e.status === 'validated' && e.validatedDate === 'Apr 20, 2026'
  ).length,
  rejected: mockEvidence.filter((e) => e.status === 'rejected').length,
}
