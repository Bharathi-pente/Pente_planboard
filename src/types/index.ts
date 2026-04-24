/**
 * Common Type Definitions
 */

export type Role = 'student' | 'faculty' | 'supervisor'

export type Status =
  | 'pending'
  | 'in-progress'
  | 'completed'
  | 'approved'
  | 'rejected'
  | 'review'

export type Priority = 'low' | 'medium' | 'high' | 'urgent'

export type ActivityType =
  | 'assignment'
  | 'project'
  | 'test'
  | 'research'
  | 'extracurricular'

export interface BaseEntity {
  id: string | number
  createdAt?: string
  updatedAt?: string
}

export interface User extends BaseEntity {
  name: string
  email: string
  role: Role
  avatar?: string | null
}

export interface Student extends User {
  role: 'student'
  rollNumber: string
  program: string
  batch: string
  year: number
  semester: number
}

export interface Faculty extends User {
  role: 'faculty'
  employeeId: string
  department: string
  designation: string
  subjects: string[]
}

export interface Supervisor extends User {
  role: 'supervisor'
  employeeId: string
  designation: string
  department: string
}

export * from './auth.types'
