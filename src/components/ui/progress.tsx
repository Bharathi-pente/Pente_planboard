import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  variant?: 'default' | 'student' | 'faculty' | 'supervisor'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant = 'default',
      size = 'md',
      showLabel = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
      <div ref={ref} className="w-full" {...props}>
        <div
          className={cn(
            'relative w-full overflow-hidden rounded-full bg-[hsl(240,20%,96%)]',

            // Size variants
            {
              'h-1.5': size === 'sm',
              'h-2.5': size === 'md',
              'h-3': size === 'lg',
            },

            className
          )}
        >
          <div
            className={cn(
              'h-full transition-all duration-500 ease-out rounded-full',

              // Color variants
              {
                'bg-[hsl(238,74%,59%)]': variant === 'default',
                'bg-gradient-to-r from-[hsl(238,74%,59%)] to-[hsl(271,81%,56%)]':
                  variant === 'student',
                'bg-gradient-to-r from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)]':
                  variant === 'faculty',
                'bg-gradient-to-r from-[hsl(0,72%,51%)] to-[hsl(330,81%,60%)]':
                  variant === 'supervisor',
              }
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showLabel && (
          <div className="mt-1.5 flex items-center justify-between text-xs text-[hsl(220,9%,46%)]">
            <span>
              {value} / {max}
            </span>
            <span className="font-medium">{Math.round(percentage)}%</span>
          </div>
        )}
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export { Progress }
