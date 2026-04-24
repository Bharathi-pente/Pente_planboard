import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Role, Status } from '@/config/theme'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'default'
    | 'student'
    | 'faculty'
    | 'supervisor'
    | 'pending'
    | 'in-progress'
    | 'completed'
    | 'approved'
    | 'rejected'
    | 'review'
  size?: 'sm' | 'md' | 'lg'
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles - more refined
          'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200',
          'border',

          // Size variants
          {
            'h-5 px-2.5 text-[10px] gap-1': size === 'sm',
            'h-6 px-3 text-xs gap-1.5': size === 'md',
            'h-7 px-3.5 text-xs gap-2': size === 'lg',
          },

          // Color variants - Role pills with better contrast
          {
            // Default
            'bg-[hsl(240,20%,97%)] text-[hsl(220,9%,46%)] border-[hsl(214,32%,91%)]':
              variant === 'default',

            // Student - Blue/Purple
            'bg-[hsl(238,94%,96%)] text-[hsl(238,74%,54%)] border-[hsl(238,74%,59%)]/15':
              variant === 'student' || variant === 'in-progress',

            // Faculty - Green
            'bg-[hsl(152,76%,95%)] text-[hsl(158,64%,42%)] border-[hsl(158,64%,52%)]/15':
              variant === 'faculty' || variant === 'completed' || variant === 'approved',

            // Supervisor - Red
            'bg-[hsl(0,86%,97%)] text-[hsl(0,72%,46%)] border-[hsl(0,72%,51%)]/15':
              variant === 'supervisor' || variant === 'rejected',

            // Status: Pending
            'bg-[hsl(48,96%,92%)] text-[hsl(38,92%,42%)] border-[hsl(38,92%,50%)]/15':
              variant === 'pending',

            // Status: Review
            'bg-[hsl(271,91%,96%)] text-[hsl(271,81%,51%)] border-[hsl(271,81%,56%)]/15':
              variant === 'review',
          },

          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }

// Helper functions for role and status badges
export function getRoleBadgeVariant(role: Role): BadgeProps['variant'] {
  const roleMap: Record<Role, BadgeProps['variant']> = {
    student: 'student',
    faculty: 'faculty',
    supervisor: 'supervisor',
  }
  return roleMap[role] || 'default'
}

export function getStatusBadgeVariant(status: Status): BadgeProps['variant'] {
  const statusMap: Record<Status, BadgeProps['variant']> = {
    pending: 'pending',
    'in-progress': 'in-progress',
    completed: 'completed',
    approved: 'approved',
    rejected: 'rejected',
    review: 'review',
  }
  return statusMap[status] || 'default'
}
