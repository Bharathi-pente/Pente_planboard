import type { BaseEntity, Status, Priority, ActivityType } from './index'

export interface Activity extends BaseEntity {
  title: string
  subject: string
  type: ActivityType
  status: Status
  priority?: Priority
  description?: string
  dueDate?: string
  submittedDate?: string
  grade?: string
  faculty?: string
}

export interface TimelineActivity extends BaseEntity {
  subject: string
  title: string
  startWeek: number
  duration: number
  status: Status
  priority: Priority
  progress: number
}

export interface LockerItem extends BaseEntity {
  name: string
  type: 'Certificate' | 'Project' | 'Test' | 'Award'
  category: string
  verifiedDate: string
  status: 'verified' | 'pending'
  grade?: string
  issuer?: string
}

export interface PortfolioYear {
  id: string
  year: string
  academicYear: string
  semesters: PortfolioSemester[]
}

export interface PortfolioSemester {
  id: string
  name: string
  subjects: PortfolioSubject[]
  achievements: string[]
  inProgress?: boolean
  upcoming?: boolean
}

export interface PortfolioSubject {
  name: string
  code: string
  grade: string
  credits: number
  activities: number
}
