
import { cn } from '@/lib/utils'
import { Calendar, Clock, MapPin } from 'lucide-react'

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

  return (
    <div className="bg-gradient-to-br from-white to-[hsl(240,20%,99%)] rounded-2xl border border-[hsl(214,32%,91%)] p-6 shadow-lg hover:shadow-xl transition-all duration-300 max-h-[500px] flex flex-col group relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(238,74%,59%)]/5 via-transparent to-[hsl(271,81%,56%)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(238,74%,59%)] to-[hsl(271,81%,56%)] flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-500">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] group-hover:text-[hsl(238,74%,59%)] transition-colors duration-300">
                This Week's Schedule
              </h3>
              <p className="text-xs text-[hsl(220,9%,46%)]">
                Your class timetable
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(500px - 120px)' }}>
          <div className="space-y-3">
            {schedule.days.map((day, dayIndex) => {
              const dayClasses = schedule.classes.filter((c) => c.day === dayIndex)
              const isToday = dayIndex === currentDay

              return (
                <div
                  key={day}
                  className={cn(
                    'p-4 rounded-xl border transition-all duration-200',
                    isToday
                      ? 'bg-[hsl(152,76%,94%)]/80 backdrop-blur-sm border-[hsl(158,64%,52%)] shadow-md'
                      : dayIndex % 2 === 0
                      ? 'bg-[hsl(240,20%,98%)]/80 backdrop-blur-sm border-[hsl(214,32%,91%)] hover:bg-[hsl(240,20%,96%)]/90 hover:shadow-md'
                      : 'bg-[hsl(240,20%,99%)]/80 backdrop-blur-sm border-[hsl(214,32%,91%)] hover:bg-[hsl(240,20%,97%)]/90 hover:shadow-md'
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={cn(
                        'text-sm font-semibold uppercase tracking-wide',
                        isToday
                          ? 'text-[hsl(158,64%,52%)]'
                          : 'text-[hsl(222,84%,5%)]'
                      )}
                    >
                      {day}
                    </span>
                    {isToday && (
                      <span className="text-xs font-medium text-[hsl(158,64%,52%)] bg-[hsl(152,76%,94%)] px-2 py-1 rounded-full">
                        Today
                      </span>
                    )}
                  </div>

                  {dayClasses.length > 0 ? (
                    <div className="space-y-3">
                      {dayClasses.map((classInfo, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            'rounded-lg border p-3 transition-all duration-200',
                            idx % 2 === 0
                              ? 'bg-[hsl(240,20%,98%)]/70 backdrop-blur-sm border-[hsl(214,32%,91%)] hover:bg-[hsl(240,20%,96%)]/80 hover:shadow-sm'
                              : 'bg-white/70 backdrop-blur-sm border-[hsl(214,32%,91%)] hover:bg-white/80 hover:shadow-sm'
                          )}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-[hsl(222,84%,5%)] truncate">
                                {classInfo.subject}
                              </p>
                              <p className="text-xs text-[hsl(220,9%,46%)] truncate">
                                {classInfo.className}
                              </p>
                            </div>
                            <span className={cn(
                              'text-xs font-medium px-2 py-1 rounded-full text-white ml-2 flex-shrink-0',
                              classInfo.type.toLowerCase() === 'lecture' && 'bg-[hsl(238,74%,59%)]',
                              classInfo.type.toLowerCase() === 'lab' && 'bg-[hsl(158,64%,52%)]',
                              classInfo.type.toLowerCase() === 'tutorial' && 'bg-[hsl(38,92%,50%)]'
                            )}>
                              {classInfo.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-[hsl(220,9%,46%)]">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{classInfo.startTime} - {classInfo.endTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{classInfo.room}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-[hsl(220,9%,46%)] italic">
                        No classes scheduled
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
