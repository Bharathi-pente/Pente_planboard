import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TimelineActivity {
  id: string | number
  subject: string
  title: string
  startWeek: number
  duration: number
  status: 'urgent' | 'in-progress' | 'completed' | 'planned' | 'review' | 'upcoming'
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  progress?: number
}

export interface GanttTimelineProps {
  activities: TimelineActivity[]
  weeks?: number
  onActivityClick?: (activity: TimelineActivity) => void
  className?: string
}

export function GanttTimeline({
  activities,
  weeks = 8,
  onActivityClick,
  className,
}: GanttTimelineProps) {
  const weeksArray = Array.from({ length: weeks }, (_, i) => i + 1)

  // Group activities by subject
  const groupedActivities = React.useMemo(() => {
    const grouped = new Map<string, TimelineActivity[]>()
    activities.forEach((activity) => {
      const existing = grouped.get(activity.subject) || []
      grouped.set(activity.subject, [...existing, activity])
    })
    return grouped
  }, [activities])

  const getActivityColor = (status: TimelineActivity['status']) => {
    const statusLower = status.toLowerCase().replace('-', '').replace(' ', '')
    const colors: Record<string, { bg: string; border: string; label: string; isDashed?: boolean }> = {
      assign: {
        bg: 'hsl(220, 13%, 85%)',
        border: 'hsl(220, 13%, 50%)',
        label: 'ASSIGN',
      },
      inprogress: {
        bg: 'hsl(38, 92%, 80%)',
        border: 'hsl(38, 92%, 40%)',
        label: 'IN PROGRESS',
      },
      done: {
        bg: 'hsl(158, 64%, 80%)',
        border: 'hsl(173, 58%, 35%)',
        label: 'DONE',
      },
      review: {
        bg: 'hsl(238, 74%, 85%)',
        border: 'hsl(238, 74%, 45%)',
        label: 'REVIEW',
      },
      approved: {
        bg: 'hsl(173, 58%, 80%)',
        border: 'hsl(173, 58%, 30%)',
        label: 'APPROVED',
      },
      feedback: {
        bg: 'hsl(0, 72%, 85%)',
        border: 'hsl(0, 72%, 40%)',
        label: 'FEEDBACK',
      },
      // Legacy support
      urgent: {
        bg: 'hsl(0, 72%, 85%)',
        border: 'hsl(0, 72%, 40%)',
        label: 'URGENT',
      },
      'in-progress': {
        bg: 'hsl(38, 92%, 80%)',
        border: 'hsl(38, 92%, 40%)',
        label: 'ACTIVE',
      },
      completed: {
        bg: 'hsl(158, 64%, 80%)',
        border: 'hsl(173, 58%, 35%)',
        label: '✓ DONE',
      },
      planned: {
        bg: 'hsl(271, 81%, 85%)',
        border: 'hsl(271, 81%, 45%)',
        label: 'PLANNED',
      },
      upcoming: {
        bg: 'hsl(240, 20%, 98%)',
        border: 'hsl(214, 32%, 91%)',
        label: 'UPCOMING',
        isDashed: true,
      },
    }
    return colors[statusLower] || colors.assign
  }

  const subjectColors = [
    'hsl(238, 74%, 59%)',
    'hsl(158, 64%, 52%)',
    'hsl(271, 81%, 56%)',
    'hsl(0, 72%, 51%)',
    'hsl(38, 92%, 50%)',
  ]

  return (
    <div className={cn('w-full overflow-x-auto custom-scrollbar', className)}>
      <div className="min-w-[1000px] bg-white rounded-xl border border-[hsl(214,32%,91%)] shadow-sm">
        <div className="p-6">
          {/* Timeline Header */}
          <div className="grid gap-0 mb-2" style={{ gridTemplateColumns: '180px 1fr' }}>
            <div className="py-3 px-4 font-semibold text-xs text-[hsl(220,9%,46%)] uppercase tracking-wider bg-[hsl(240,20%,98%)] rounded-tl-lg">
              Subjects
            </div>
            <div className="grid gap-0 bg-[hsl(240,20%,98%)] rounded-tr-lg" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
              {weeksArray.map((week) => (
                <div
                  key={week}
                  className="py-3 px-2 text-center border-l border-[hsl(214,32%,91%)]"
                >
                  <div className="text-[10px] font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Week {week}-{week + 1}
                  </div>
                  <div className="text-[9px] text-[hsl(220,9%,66%)] mt-0.5">
                    Apr {14 + (week - 1) * 7} - {14 + week * 7}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Rows */}
          <div className="space-y-4 mt-4">
            {Array.from(groupedActivities.entries()).map(([subject, subjectActivities], idx) => {
              const subjectColor = subjectColors[idx % subjectColors.length]

              return (
                <div key={subject} className="border-b border-[hsl(214,32%,91%)] pb-4 last:border-0">
                  {/* Subject Row */}
                  <div className="grid gap-0" style={{ gridTemplateColumns: '180px 1fr' }}>
                    <div className="flex items-center gap-2 px-4 py-3">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ background: subjectColor }}
                      />
                      <div className="text-sm font-semibold text-[hsl(222,84%,5%)] truncate">
                        {subject}
                      </div>
                    </div>

                    {/* Timeline Grid */}
                    <div className="relative" style={{ minHeight: '80px' }}>
                      {/* Grid lines */}
                      <div
                        className="absolute inset-0 grid gap-0 pointer-events-none"
                        style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}
                      >
                        {weeksArray.map((week) => (
                          <div key={week} className="border-l border-[hsl(214,32%,91%)]" />
                        ))}
                      </div>

                      {/* Activity Bars */}
                      {subjectActivities.map((activity) => {
                        const colors = getActivityColor(activity.status)
                        const leftPosition = ((activity.startWeek - 1) / weeks) * 100
                        const widthPercent = (activity.duration / weeks) * 100

                        return (
                          <div
                            key={activity.id}
                            className="absolute cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                            style={{
                              left: `${leftPosition}%`,
                              width: `${widthPercent}%`,
                              top: '12px',
                              height: '56px',
                            }}
                            onClick={() => onActivityClick?.(activity)}
                          >
                            <div
                              className="h-full rounded-lg overflow-hidden shadow-md"
                              style={{
                                background: colors.bg,
                                border: colors.isDashed ? `2px dashed ${colors.border}` : 'none',
                                borderLeft: !colors.isDashed ? `4px solid ${colors.border}` : undefined,
                              }}
                            >
                              <div className="p-2 h-full flex flex-col justify-between">
                                {/* Header */}
                                <div className="flex justify-between items-start gap-2">
                                  <div
                                    className="text-[11px] font-semibold truncate flex-1"
                                    style={{ color: 'hsl(222, 84%, 5%)' }}
                                  >
                                    {activity.title}
                                  </div>
                                  <div
                                    className="text-[8px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap flex-shrink-0"
                                    style={{
                                      background: colors.isDashed
                                        ? 'hsl(214, 32%, 91%)'
                                        : 'rgba(255, 255, 255, 0.9)',
                                      color: 'hsl(222, 84%, 5%)',
                                      backdropFilter: !colors.isDashed ? 'blur(4px)' : undefined,
                                    }}
                                  >
                                    {colors.label}
                                  </div>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-between items-center gap-2">
                                  <div
                                    className="text-[9px] font-medium"
                                    style={{ color: 'hsl(222, 84%, 5%)' }}
                                  >
                                    Due: Week {activity.startWeek + activity.duration - 1}
                                  </div>
                                  {activity.progress !== undefined && (
                                    <div className="flex items-center gap-1">
                                      <div
                                        className="w-8 h-1 rounded-full overflow-hidden"
                                        style={{ background: 'hsl(214, 32%, 91%)' }}
                                      >
                                        <div
                                          className="h-full rounded-full transition-all duration-300"
                                          style={{
                                            width: `${activity.progress}%`,
                                            background: 'hsl(222, 84%, 5%)',
                                          }}
                                        />
                                      </div>
                                      <div
                                        className="text-[9px] font-semibold"
                                        style={{ color: 'hsl(222, 84%, 5%)' }}
                                      >
                                        {activity.progress}%
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-[hsl(214,32%,91%)]">
            <span className="text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
              Status:
            </span>
            {[
              { status: 'assign', label: 'Assign' },
              { status: 'inprogress', label: 'In Progress' },
              { status: 'done', label: 'Done' },
              { status: 'review', label: 'Review' },
              { status: 'approved', label: 'Approved' },
              { status: 'feedback', label: 'Feedback' },
            ].map(({ status, label }) => {
              const colors = getActivityColor(status as TimelineActivity['status'])
              return (
                <div key={status} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{
                      background: colors.bg,
                      border: colors.isDashed ? `2px dashed ${colors.border}` : undefined,
                    }}
                  />
                  <span className="text-xs text-[hsl(220,9%,46%)]">{label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
