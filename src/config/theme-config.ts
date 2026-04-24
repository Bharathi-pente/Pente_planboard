/**
 * Universal Theme Configuration
 * Single source of truth for all design tokens
 */

export const theme = {
  // Color Palette
  colors: {
    // Base
    background: 'bg-[hsl(240,20%,98%)]',
    surface: 'bg-white',
    text: 'text-[hsl(222,84%,5%)]',
    textSecondary: 'text-[hsl(220,9%,46%)]',
    textTertiary: 'text-[hsl(220,9%,66%)]',

    // Borders
    border: 'border-[hsl(214,32%,91%)]',
    borderHover: 'border-[hsl(214,32%,81%)]',

    // Role Colors - Student (Blue/Purple)
    student: {
      primary: 'hsl(238,74%,59%)',
      light: 'hsl(238,94%,95%)',
      gradient: 'linear-gradient(135deg, hsl(238,74%,59%), hsl(271,81%,56%))',
      classes: {
        bg: 'bg-[hsl(238,74%,59%)]',
        bgLight: 'bg-[hsl(238,94%,95%)]',
        text: 'text-[hsl(238,74%,59%)]',
        border: 'border-[hsl(238,74%,59%)]',
        hover: 'hover:bg-[hsl(238,74%,59%)]',
        ring: 'ring-[hsl(238,74%,59%)]',
      },
    },

    // Faculty (Green)
    faculty: {
      primary: 'hsl(158,64%,52%)',
      light: 'hsl(152,76%,94%)',
      gradient: 'linear-gradient(135deg, hsl(158,64%,52%), hsl(173,58%,39%))',
      classes: {
        bg: 'bg-[hsl(158,64%,52%)]',
        bgLight: 'bg-[hsl(152,76%,94%)]',
        text: 'text-[hsl(158,64%,52%)]',
        border: 'border-[hsl(158,64%,52%)]',
        hover: 'hover:bg-[hsl(158,64%,52%)]',
        ring: 'ring-[hsl(158,64%,52%)]',
      },
    },

    // Supervisor (Red/Rose)
    supervisor: {
      primary: 'hsl(0,72%,51%)',
      light: 'hsl(0,86%,97%)',
      gradient: 'linear-gradient(135deg, hsl(0,72%,51%), hsl(330,81%,60%))',
      classes: {
        bg: 'bg-[hsl(0,72%,51%)]',
        bgLight: 'bg-[hsl(0,86%,97%)]',
        text: 'text-[hsl(0,72%,51%)]',
        border: 'border-[hsl(0,72%,51%)]',
        hover: 'hover:bg-[hsl(0,72%,51%)]',
        ring: 'ring-[hsl(0,72%,51%)]',
      },
    },

    // Status Colors
    warning: {
      primary: 'hsl(38,92%,50%)',
      light: 'hsl(48,96%,89%)',
      classes: {
        bg: 'bg-[hsl(38,92%,50%)]',
        bgLight: 'bg-[hsl(48,96%,89%)]',
        text: 'text-[hsl(38,92%,50%)]',
      },
    },

    success: {
      primary: 'hsl(158,64%,52%)',
      light: 'hsl(152,76%,94%)',
      classes: {
        bg: 'bg-[hsl(158,64%,52%)]',
        bgLight: 'bg-[hsl(152,76%,94%)]',
        text: 'text-[hsl(158,64%,52%)]',
      },
    },

    error: {
      primary: 'hsl(0,72%,51%)',
      light: 'hsl(0,86%,97%)',
      classes: {
        bg: 'bg-[hsl(0,72%,51%)]',
        bgLight: 'bg-[hsl(0,86%,97%)]',
        text: 'text-[hsl(0,72%,51%)]',
      },
    },
  },

  // Spacing
  spacing: {
    headerHeight: '64px',
    sidebarWidth: '240px',
  },

  // Border Radius
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.06)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
    lg: '0 8px 24px rgba(0,0,0,0.12)',
  },

  // Typography
  typography: {
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
  },
} as const

/**
 * Get role-based theme colors
 */
export const getRoleTheme = (role: 'student' | 'faculty' | 'supervisor' = 'student') => {
  return theme.colors[role]
}

/**
 * Get status colors
 */
export const getStatusColor = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: theme.colors.warning.primary,
    review: theme.colors.student.primary,
    'in-progress': theme.colors.student.primary,
    approved: theme.colors.success.primary,
    completed: theme.colors.success.primary,
    rejected: theme.colors.error.primary,
    failed: theme.colors.error.primary,
  }

  return statusMap[status.toLowerCase()] || theme.colors.textSecondary
}

export default theme
