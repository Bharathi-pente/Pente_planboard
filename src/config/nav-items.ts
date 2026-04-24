import type { Role } from '@/types'
import { ROUTES } from './constants'

export interface NavItem {
  label: string
  href: string
  icon: string
  badge?: number
}

export const studentNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: ROUTES.STUDENT_DASHBOARD,
    icon: 'LayoutDashboard',
  },
  {
    label: 'Plan Board',
    href: ROUTES.STUDENT_PLANBOARD,
    icon: 'Calendar',
  },
  {
    label: 'Activities',
    href: ROUTES.STUDENT_ACTIVITIES,
    icon: 'CheckSquare',
    badge: 8,
  },
  {
    label: 'Digital Locker',
    href: ROUTES.STUDENT_LOCKER,
    icon: 'Archive',
  },
  {
    label: 'Portfolio',
    href: ROUTES.STUDENT_PORTFOLIO,
    icon: 'FolderOpen',
  },
]

export const facultyNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: ROUTES.FACULTY_DASHBOARD,
    icon: 'LayoutDashboard',
  },
  {
    label: 'Curriculum',
    href: ROUTES.FACULTY_CURRICULUM,
    icon: 'BookOpen',
  },
  {
    label: 'Submissions',
    href: ROUTES.FACULTY_SUBMISSIONS,
    icon: 'FileText',
    badge: 12,
  },
  {
    label: 'Evidence',
    href: ROUTES.FACULTY_EVIDENCE,
    icon: 'CheckSquare',
    badge: 5,
  },
  {
    label: 'Classes',
    href: ROUTES.FACULTY_CLASSES,
    icon: 'Users',
  },
]

export const supervisorNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: ROUTES.SUPERVISOR_DASHBOARD,
    icon: 'LayoutDashboard',
  },
  {
    label: 'Portfolio Review',
    href: ROUTES.SUPERVISOR_PORTFOLIO,
    icon: 'FolderOpen',
  },
  {
    label: 'Monitoring',
    href: ROUTES.SUPERVISOR_MONITORING,
    icon: 'Eye',
  },
  {
    label: 'Escalations',
    href: ROUTES.SUPERVISOR_ESCALATIONS,
    icon: 'ShieldAlert',
    badge: 3,
  },
  {
    label: 'Reports',
    href: ROUTES.SUPERVISOR_REPORTS,
    icon: 'FileBarChart',
  },
]

export function getNavItems(role: Role): NavItem[] {
  switch (role) {
    case 'student':
      return studentNavItems
    case 'faculty':
      return facultyNavItems
    case 'supervisor':
      return supervisorNavItems
    default:
      return []
  }
}
