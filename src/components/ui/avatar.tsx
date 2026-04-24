import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Role } from '@/config/theme'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  role?: Role
  src?: string
  alt?: string
  fallback?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, size = 'md', role, src, alt, fallback, children, ...props },
    ref
  ) => {
    const initials = fallback || alt?.charAt(0).toUpperCase() || '?'

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center rounded-full font-medium overflow-hidden',
          'bg-gradient-to-br',

          // Size variants
          {
            'h-8 w-8 text-xs': size === 'sm',
            'h-10 w-10 text-sm': size === 'md',
            'h-12 w-12 text-base': size === 'lg',
            'h-16 w-16 text-xl': size === 'xl',
          },

          // Role-based gradient backgrounds
          {
            // Student - Blue/Purple gradient
            'from-[hsl(238,74%,59%)] to-[hsl(271,81%,56%)] text-white':
              role === 'student',

            // Faculty - Green/Teal gradient
            'from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)] text-white':
              role === 'faculty',

            // Supervisor - Red/Rose gradient
            'from-[hsl(0,72%,51%)] to-[hsl(330,81%,60%)] text-white':
              role === 'supervisor',

            // Default - Neutral
            'bg-[hsl(240,20%,96%)] text-[hsl(220,9%,46%)]': !role,
          },

          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="select-none">{children || initials}</span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar }
