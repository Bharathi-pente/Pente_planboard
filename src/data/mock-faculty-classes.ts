/**
 * Mock Data - Faculty Classes
 */

export interface ClassInfo {
  id: number
  name: string
  subject: string
  icon: string
  color: string
  totalStudents: number
  activeActivities: number
  completionRate: number
  avgGrade: number
}

export const mockClasses: ClassInfo[] = [
  {
    id: 1,
    name: 'CS-B',
    subject: 'Mathematics',
    icon: '📐',
    color: 'hsl(238, 74%, 59%)',
    totalStudents: 28,
    activeActivities: 12,
    completionRate: 78,
    avgGrade: 82,
  },
  {
    id: 2,
    name: 'CS-A',
    subject: 'Physics',
    icon: '🔬',
    color: 'hsl(14, 186%, 52%)',
    totalStudents: 30,
    activeActivities: 10,
    completionRate: 65,
    avgGrade: 79,
  },
  {
    id: 3,
    name: 'CS-C',
    subject: 'Data Structures',
    icon: '💻',
    color: 'hsl(158, 64%, 52%)',
    totalStudents: 32,
    activeActivities: 15,
    completionRate: 85,
    avgGrade: 88,
  },
  {
    id: 4,
    name: 'CS-D',
    subject: 'Web Development',
    icon: '🌐',
    color: 'hsl(271, 81%, 56%)',
    totalStudents: 26,
    activeActivities: 8,
    completionRate: 72,
    avgGrade: 76,
  },
]
