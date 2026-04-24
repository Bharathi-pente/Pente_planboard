import type { Role, Student, Faculty, Supervisor } from './index'

export interface LoginCredentials {
  email: string
  password: string
  role: Role
}

export interface AuthResponse {
  success: boolean
  token: string
  user: Student | Faculty | Supervisor
}

export interface AuthState {
  isAuthenticated: boolean
  user: Student | Faculty | Supervisor | null
  token: string | null
  role: Role | null
}
