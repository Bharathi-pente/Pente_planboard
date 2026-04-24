import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardHeader } from '@/components/ui'

export interface KPICardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    label: string
    isPositive?: boolean
  }
  variant?: 'default' | 'student' | 'faculty' | 'supervisor'
  className?: string
}

export function KPICard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
  className,
}: KPICardProps) {
  const getGradient = () => {
    switch (variant) {
      case 'student':
        return 'linear-gradient(135deg, hsl(238, 74%, 59%), hsl(271, 81%, 56%))'
      case 'faculty':
        return 'linear-gradient(135deg, hsl(158, 64%, 52%), hsl(173, 58%, 39%))'
      case 'supervisor':
        return 'linear-gradient(135deg, hsl(0, 72%, 51%), hsl(330, 81%, 60%))'
      default:
        return 'linear-gradient(135deg, hsl(238, 74%, 59%), hsl(271, 81%, 56%))'
    }
  }

  const getColor = () => {
    switch (variant) {
      case 'student':
        return 'hsl(238, 74%, 59%)'
      case 'faculty':
        return 'hsl(158, 64%, 52%)'
      case 'supervisor':
        return 'hsl(0, 72%, 51%)'
      default:
        return 'hsl(238, 74%, 59%)'
    }
  }

  return (
    <Card className={cn('relative overflow-hidden group', className)}>
      {/* Background Gradient Accent - more subtle */}
      {icon && (
        <div
          className="absolute top-0 right-0 w-36 h-36 opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.06]"
          style={{
            background: getGradient(),
            borderRadius: '0 12px 0 100%',
          }}
        />
      )}

      <CardHeader className="relative pb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider mb-2">
              {title}
            </p>
            <div
              className="text-3xl font-bold mb-2 tracking-tight"
              style={{ color: getColor() }}
            >
              {value}
            </div>
            {subtitle && (
              <p className="text-sm text-[hsl(220,9%,46%)] leading-relaxed">{subtitle}</p>
            )}
          </div>

          {icon && (
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
              style={{ background: getGradient() }}
            >
              {icon}
            </div>
          )}
        </div>

        {trend && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[hsl(214,32%,91%)]">
            <span
              className={cn(
                'text-xs font-semibold',
                trend.isPositive !== false
                  ? 'text-[hsl(158,64%,52%)]'
                  : 'text-[hsl(0,72%,51%)]'
              )}
            >
              {trend.isPositive !== false ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-[hsl(220,9%,46%)]">
              {trend.label}
            </span>
          </div>
        )}
      </CardHeader>
    </Card>
  )
}
