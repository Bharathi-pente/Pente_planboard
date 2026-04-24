/**
 * Design System Theme Configuration
 * Extracted from the original HTML implementation
 */

export const colors = {
  // Base colors
  background: 'hsl(240, 20%, 98%)',
  surface: 'hsl(0, 0%, 100%)',
  text: 'hsl(222, 84%, 5%)',
  textSecondary: 'hsl(220, 9%, 46%)',
  textTertiary: 'hsl(220, 9%, 66%)',

  // Border
  border: 'hsl(214, 32%, 91%)',
  borderHover: 'hsl(214, 32%, 81%)',

  // Accent (Student role) - Blue/Purple gradient
  accent: {
    DEFAULT: 'hsl(238, 74%, 59%)',
    light: 'hsl(238, 94%, 95%)',
    gradient: 'linear-gradient(135deg, hsl(238, 74%, 59%), hsl(271, 81%, 56%))',
  },

  // Green (Faculty role)
  green: {
    DEFAULT: 'hsl(158, 64%, 52%)',
    light: 'hsl(152, 76%, 94%)',
    gradient: 'linear-gradient(135deg, hsl(158, 64%, 52%), hsl(173, 58%, 39%))',
  },

  // Amber (Warning)
  amber: {
    DEFAULT: 'hsl(38, 92%, 50%)',
    light: 'hsl(48, 96%, 89%)',
  },

  // Red (Supervisor role / Danger)
  red: {
    DEFAULT: 'hsl(0, 72%, 51%)',
    light: 'hsl(0, 86%, 97%)',
    gradient: 'linear-gradient(135deg, hsl(0, 72%, 51%), hsl(330, 81%, 60%))',
  },

  // Purple
  purple: {
    DEFAULT: 'hsl(271, 81%, 56%)',
    light: 'hsl(271, 91%, 95%)',
  },

  // Teal
  teal: {
    DEFAULT: 'hsl(173, 58%, 39%)',
    light: 'hsl(180, 77%, 94%)',
  },

  // Rose
  rose: {
    DEFAULT: 'hsl(330, 81%, 60%)',
    light: 'hsl(336, 100%, 96%)',
  },
} as const

export const spacing = {
  headerHeight: '64px',
  sidebarWidth: '240px',
} as const

export const borderRadius = {
  DEFAULT: '12px',
  small: '8px',
} as const

export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.06)',
  md: '0 4px 12px rgba(0,0,0,0.08)',
  lg: '0 8px 24px rgba(0,0,0,0.12)',
} as const

export const typography = {
  fontFamily: {
    sans: "'DM Sans', sans-serif",
    serif: "'DM Serif Display', serif",
  },
  fontSize: {
    xs: '10px',
    sm: '11px',
    base: '13px',
    md: '14px',
    lg: '15px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '28px',
  },
} as const

export const roleColors = {
  student: {
    primary: colors.accent.DEFAULT,
    light: colors.accent.light,
    gradient: colors.accent.gradient,
  },
  faculty: {
    primary: colors.green.DEFAULT,
    light: colors.green.light,
    gradient: colors.green.gradient,
  },
  supervisor: {
    primary: colors.red.DEFAULT,
    light: colors.red.light,
    gradient: colors.red.gradient,
  },
} as const

export const statusColors = {
  pending: {
    bg: colors.amber.light,
    text: colors.amber.DEFAULT,
  },
  'in-progress': {
    bg: colors.accent.light,
    text: colors.accent.DEFAULT,
  },
  completed: {
    bg: colors.green.light,
    text: colors.green.DEFAULT,
  },
  approved: {
    bg: colors.green.light,
    text: colors.green.DEFAULT,
  },
  rejected: {
    bg: colors.red.light,
    text: colors.red.DEFAULT,
  },
  review: {
    bg: colors.amber.light,
    text: colors.amber.DEFAULT,
  },
} as const

export type Role = 'student' | 'faculty' | 'supervisor'
export type Status = 'pending' | 'in-progress' | 'completed' | 'approved' | 'rejected' | 'review'
