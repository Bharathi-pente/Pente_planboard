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
    const colors = {
      urgent: {
        bg: 'hsl(0, 72%, 51%)',
        light: 'hsl(0, 86%, 97%)',
      },
      'in-progress': {
        bg: 'hsl(238, 74%, 59%)',
        light: 'hsl(238, 94%, 95%)',
      },
      completed: {
        bg: 'hsl(158, 64%, 52%)',
        light: 'hsl(152, 76%, 94%)',
      },
      planned: {
        bg: 'hsl(220, 9%, 66%)',
        light: 'hsl(240, 20%, 96%)',
      },
      review: {
        bg: 'hsl(271, 81%, 56%)',
        light: 'hsl(271, 91%, 95%)',
      },
      upcoming: {
        bg: 'hsl(173, 58%, 39%)',
        light: 'hsl(180, 77%, 94%)',
      },
    }
    return colors[status] || colors.planned
  }

  return (
    <div className={cn('w-full overflow-x-auto custom-scrollbar', className)}>
      <div className="min-w-[800px]">
        {/* Timeline Header */}
        <div className="grid gap-0 mb-4" style={{ gridTemplateColumns: '200px 1fr' }}>
          <div className="py-3 px-4 font-medium text-sm text-[hsl(220,9%,46%)]">
            Subject / Activity
          </div>
          <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
            {weeksArray.map((week) => (
              <div
                key={week}
                className="py-3 px-2 text-center text-xs font-medium text-[hsl(220,9%,46%)] border-l border-[hsl(214,32%,91%)]"
              >
                Week {week}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Rows */}
        <div className="space-y-1">
          {Array.from(groupedActivities.entries()).map(([subject, subjectActivities]) => (
            <div key={subject}>
              {/* Subject Header */}
              <div className="bg-[hsl(240,20%,96%)] rounded-lg mb-1">
                <div className="grid gap-0" style={{ gridTemplateColumns: '200px 1fr' }}>
                  <div className="py-2 px-4 font-medium text-sm text-[hsl(222,84%,5%)]">
                    {subject}
                  </div>
                  <div className="relative" style={{ height: '36px' }}>
                    {/* Grid lines */}
                    <div className="absolute inset-0 grid gap-0" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
                      {weeksArray.map((week) => (
                        <div key={week} className="border-l border-[hsl(214,32%,91%)]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Activities */}
              {subjectActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white rounded-lg border border-[hsl(214,32%,91%)] mb-1 hover:shadow-sm transition-shadow"
                >
                  <div className="grid gap-0" style={{ gridTemplateColumns: '200px 1fr' }}>
                    <div className="py-3 px-4 flex items-center border-r border-[hsl(214,32%,91%)]">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[hsl(222,84%,5%)] truncate">
                          {activity.title}
                        </p>
                        {activity.progress !== undefined && (
                          <p className="text-xs text-[hsl(220,9%,46%)] mt-0.5">
                            {activity.progress}% complete
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Activity Bar */}
                    <div className="relative py-3 px-2">
                      {/* Grid lines */}
                      <div className="absolute inset-0 grid gap-0" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
                        {weeksArray.map((week) => (
                          <div key={week} className="border-l border-[hsl(214,32%,91%)]" />
                        ))}
                      </div>

                      {/* Activity Bar */}
                      <div
                        className="relative h-full cursor-pointer group"
                        style={{
                          marginLeft: `${((activity.startWeek - 1) / weeks) * 100}%`,
                          width: `${(activity.duration / weeks) * 100}%`,
                        }}
                        onClick={() => onActivityClick?.(activity)}
                      >
                        <div
                          className="h-full rounded-lg transition-all group-hover:scale-105"
                          style={{
                            background: getActivityColor(activity.status).bg,
                            opacity: 0.9,
                          }}
                        >
                          {activity.progress !== undefined && (
                            <div
                              className="h-full rounded-lg"
                              style={{
                                width: `${activity.progress}%`,
                                background: 'rgba(255, 255, 255, 0.3)',
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Today Marker */}
        <div className="relative mt-4" style={{ height: '2px' }}>
          <div
            className="absolute top-0 w-0.5 h-full"
            style={{
              left: '35%', // Positioned at week 3
              background: 'linear-gradient(to bottom, hsl(238, 74%, 59%), hsl(271, 81%, 56%))',
              boxShadow: '0 0 8px hsla(238, 74%, 59%, 0.5)',
            }}
          >
            <div className="absolute -top-6 -left-6 bg-[hsl(238,74%,59%)] text-white text-xs px-2 py-1 rounded">
              Today
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-[hsl(214,32%,91%)]">
          <span className="text-xs font-medium text-[hsl(220,9%,46%)]">Status:</span>
          {[
            { status: 'urgent', label: 'Urgent' },
            { status: 'in-progress', label: 'In Progress' },
            { status: 'completed', label: 'Completed' },
            { status: 'planned', label: 'Planned' },
            { status: 'review', label: 'Review' },
            { status: 'upcoming', label: 'Upcoming' },
          ].map(({ status, label }) => (
            <div key={status} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{
                  background: getActivityColor(status as TimelineActivity['status']).bg,
                }}
              />
              <span className="text-xs text-[hsl(220,9%,46%)]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
