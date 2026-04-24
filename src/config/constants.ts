/**
 * App Constants
 */

export const APP_NAME = 'PlanBoard'
export const APP_DESCRIPTION = 'Academic Portfolio Management System'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  
  // Student routes
  STUDENT_DASHBOARD: '/student/dashboard',
  STUDENT_PLANBOARD: '/student/planboard',
  STUDENT_ACTIVITIES: '/student/activities',
  STUDENT_LOCKER: '/student/locker',
  STUDENT_PORTFOLIO: '/student/portfolio',
  
  // Faculty routes
  FACULTY_DASHBOARD: '/faculty/dashboard',
  FACULTY_CURRICULUM: '/faculty/curriculum',
  FACULTY_SUBMISSIONS: '/faculty/submissions',
  FACULTY_EVIDENCE: '/faculty/evidence',
  FACULTY_CLASSES: '/faculty/classes',
  FACULTY_GRADING: '/faculty/grading',
  
  // Supervisor routes
  SUPERVISOR_DASHBOARD: '/supervisor/dashboard',
  SUPERVISOR_PORTFOLIO: '/supervisor/portfolio',
  SUPERVISOR_MONITORING: '/supervisor/monitoring',
  SUPERVISOR_ESCALATIONS: '/supervisor/escalations',
  SUPERVISOR_REPORTS: '/supervisor/reports',
} as const

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebarState',
} as const

export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
    'text/plain',
    'image/png',
    'image/jpeg',
  ],
  ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx', '.zip', '.txt', '.png', '.jpg', '.jpeg'],
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const
