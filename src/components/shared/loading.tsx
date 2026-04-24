/**
 * Reusable Loading Spinner Component
 */

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  message?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  className,
  message = 'Loading...'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4',
  }

  return (
    <div className={cn('flex items-center justify-center py-20', className)}>
      <div className="text-center">
        <div 
          className={cn(
            sizeClasses[size],
            'border-[hsl(238,74%,59%)] border-t-transparent rounded-full animate-spin mx-auto mb-4'
          )}
        />
        <p className="text-sm text-[hsl(220,9%,46%)]">{message}</p>
      </div>
    </div>
  )
}

/**
 * Page Loading Skeleton
 */
export function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-gray-200 rounded w-1/4" />
      <div className="grid grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-xl" />
        ))}
      </div>
      <div className="h-64 bg-gray-200 rounded-xl" />
    </div>
  )
}

/**
 * Card Skeleton
 */
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-2/3" />
    </div>
  )
}
