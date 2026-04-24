
import { cn } from '@/lib/utils'

interface ScheduleClass {
  day: number
  startTime: string
  endTime: string
  subject: string
  className: string
  room: string
  type: string
}

interface WeeklySchedule {
  days: string[]
  times: string[]
  classes: ScheduleClass[]
}

interface FacultyScheduleProps {
  schedule: WeeklySchedule
}

export function FacultySchedule({ schedule }: FacultyScheduleProps) {
  const today = new Date().getDay() // 0 = Sunday, 1 = Monday, etc.
  const currentDay = today === 0 ? -1 : today - 1 // Convert to 0 = Monday

  const getClassTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lecture':
        return 'bg-[hsl(238,94%,95%)] text-[hsl(238,74%,59%)] border-l-[hsl(238,74%,59%)]'
      case 'lab':
        return 'bg-[hsl(152,76%,94%)] text-[hsl(158,64%,52%)] border-l-[hsl(158,64%,52%)]'
      case 'tutorial':
        return 'bg-[hsl(48,96%,89%)] text-[hsl(38,92%,50%)] border-l-[hsl(38,92%,50%)]'
      default:
        return 'bg-[hsl(240,20%,98%)] text-[hsl(220,9%,46%)] border-l-[hsl(220,9%,46%)]'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-[hsl(222,84%,5%)]">
          This Week's Schedule
        </h3>
      </div>

      <div className="space-y-2">
        {schedule.days.map((day, dayIndex) => {
          const dayClasses = schedule.classes.filter((c) => c.day === dayIndex)
          const isToday = dayIndex === currentDay

          return (
            <div
              key={day}
              className={cn(
                'p-3 rounded-lg border transition-all',
                isToday
                  ? 'bg-[hsl(152,76%,94%)] border-[hsl(158,64%,52%)]'
                  : 'bg-[hsl(240,20%,98%)] border-transparent'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={cn(
                    'text-xs font-semibold uppercase tracking-wide',
                    isToday
                      ? 'text-[hsl(158,64%,52%)]'
                      : 'text-[hsl(220,9%,46%)]'
                  )}
                >
                  {day}
                </span>
                {isToday && (
                  <span className="text-xs font-medium text-[hsl(158,64%,52%)]">
                    Today
                  </span>
                )}
              </div>

              {dayClasses.length > 0 ? (
                <div className="space-y-2">
                  {dayClasses.map((classInfo, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'p-2 rounded border-l-4 transition-all hover:shadow-sm',
                        getClassTypeColor(classInfo.type)
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate">
                            {classInfo.subject}
                          </p>
                          <p className="text-xs opacity-75 truncate">
                            {classInfo.className}
                          </p>
                        </div>
                        <span className="text-xs font-medium opacity-75 ml-2">
                          {classInfo.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs opacity-75">
                        <span>
                          {classInfo.startTime} - {classInfo.endTime}
                        </span>
                        <span>•</span>
                        <span>{classInfo.room}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[hsl(220,9%,46%)] italic">
                  No classes scheduled
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
