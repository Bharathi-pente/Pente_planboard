/**
 * Reusable Error Display Component
 */

import { AlertCircle, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

interface ErrorDisplayProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorDisplay({
  title = 'Something went wrong',
  message = 'An error occurred while loading data. Please try again.',
  onRetry,
  className,
}: ErrorDisplayProps) {
  return (
    <div className={cn('flex items-center justify-center py-20', className)}>
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(0,86%,97%)] mb-4">
          <AlertCircle className="w-8 h-8 text-[hsl(0,72%,51%)]" />
        </div>
        <h3 className="text-lg font-semibold text-[hsl(222,84%,5%)] mb-2">
          {title}
        </h3>
        <p className="text-sm text-[hsl(220,9%,46%)] mb-6">
          {message}
        </p>
        {onRetry && (
          <Button variant="bacc" onClick={onRetry}>
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}

/**
 * Inline Error Message
 */
export function InlineError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 p-4 bg-[hsl(0,86%,97%)] border border-[hsl(0,72%,51%)] rounded-lg">
      <AlertCircle className="w-5 h-5 text-[hsl(0,72%,51%)] flex-shrink-0" />
      <p className="text-sm text-[hsl(0,72%,51%)]">{message}</p>
    </div>
  )
}
