import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  title: string
  count: number | string
  subtitle: string
  badge?: {
    text: string
    variant: 'orange' | 'blue' | 'green' | 'purple'
  }
  color: 'orange' | 'blue' | 'green' | 'purple'
  showProgress?: boolean
  progressValue?: number
}

const colorClasses = {
  orange: {
    bg: 'bg-gradient-to-br from-[hsl(38,92%,50%)]/5 to-white',
    border: 'border-l-[hsl(38,92%,50%)]',
    text: 'text-[hsl(38,92%,50%)]',
    icon: 'bg-gradient-to-br from-[hsl(38,92%,50%)] to-[hsl(45,92%,55%)]',
    progress: 'bg-gradient-to-r from-[hsl(38,92%,50%)] to-[hsl(45,92%,55%)]',
  },
  blue: {
    bg: 'bg-gradient-to-br from-[hsl(238,74%,59%)]/5 to-white',
    border: 'border-l-[hsl(238,74%,59%)]',
    text: 'text-[hsl(238,74%,59%)]',
    icon: 'bg-gradient-to-br from-[hsl(238,74%,59%)] to-[hsl(271,81%,56%)]',
    progress: 'bg-gradient-to-r from-[hsl(238,74%,59%)] to-[hsl(271,81%,56%)]',
  },
  green: {
    bg: 'bg-gradient-to-br from-[hsl(158,64%,52%)]/5 to-white',
    border: 'border-l-[hsl(158,64%,52%)]',
    text: 'text-[hsl(158,64%,52%)]',
    icon: 'bg-gradient-to-br from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)]',
    progress: 'bg-gradient-to-r from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)]',
  },
  purple: {
    bg: 'bg-gradient-to-br from-[hsl(271,81%,56%)]/5 to-white',
    border: 'border-l-[hsl(271,81%,56%)]',
    text: 'text-[hsl(271,81%,56%)]',
    icon: 'bg-gradient-to-br from-[hsl(271,81%,56%)] to-[hsl(238,74%,59%)]',
    progress: 'bg-gradient-to-r from-[hsl(271,81%,56%)] to-[hsl(238,74%,59%)]',
  },
}

const badgeVariants = {
  orange: 'bg-[hsl(38,92%,50%)] text-white border border-[hsl(38,92%,50%)]/20',
  blue: 'bg-[hsl(238,74%,59%)] text-white border border-[hsl(238,74%,59%)]/20',
  green: 'bg-[hsl(158,64%,52%)] text-white border border-[hsl(158,64%,52%)]/20',
  purple: 'bg-[hsl(271,81%,56%)] text-white border border-[hsl(271,81%,56%)]/20',
}

export function StatCard({
  icon: Icon,
  title,
  count,
  subtitle,
  badge,
  color,
  showProgress,
  progressValue,
}: StatCardProps) {
  const colors = colorClasses[color]

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-white rounded-xl border border-[hsl(214,32%,91%)] border-l-2 p-4',
        'shadow-sm hover:shadow-md transition-all duration-200',
        colors.border,
        colors.bg
      )}
    >
      {/* Background Gradient Accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 opacity-5"
        style={{
          background: `linear-gradient(135deg, ${colors.text.replace('text-', '')}, transparent)`,
          borderRadius: '0 12px 0 100%',
        }}
      />

      <div className="relative z-10">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-3">
          {/* Icon Container */}
          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm', colors.icon)}>
            <Icon className="w-5 h-5" strokeWidth={2} />
          </div>

          {/* Badge */}
          {badge && (
            <span
              className={cn(
                'text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide',
                badgeVariants[badge.variant]
              )}
            >
              {badge.text}
            </span>
          )}
        </div>

        {/* Title */}
        <div className="text-xs font-medium text-[hsl(220,9%,46%)] mb-1">
          {title}
        </div>

        {/* Count/Value */}
        <div className={cn('text-2xl font-semibold mb-1 leading-none', colors.text)}>
          {count}
        </div>

        {/* Subtitle or Progress */}
        {showProgress && progressValue !== undefined ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[hsl(214,32%,91%)] rounded-full overflow-hidden">
                <div
                  className={cn('h-full transition-all duration-700 ease-out', colors.progress)}
                  style={{ width: `${progressValue}%` }}
                />
              </div>
              <span className="text-xs font-bold text-[hsl(158,64%,52%)]">+5%</span>
            </div>
            <p className="text-xs text-[hsl(220,9%,46%)]">{subtitle}</p>
          </div>
        ) : (
          <p className="text-xs text-[hsl(220,9%,46%)]">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
