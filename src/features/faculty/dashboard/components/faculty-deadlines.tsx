import { Clock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Deadline {
  id: number
  title: string
  className: string
  date: string
  daysLeft: number
  priority: 'high' | 'medium' | 'low'
  submissions: {
    received: number
    total: number
  }
}

interface FacultyDeadlinesProps {
  deadlines: Deadline[]
}

export function FacultyDeadlines({ deadlines }: FacultyDeadlinesProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          bg: 'bg-[hsl(0,86%,97%)]',
          border: 'border-[hsl(0,72%,51%)]',
          text: 'text-[hsl(0,72%,51%)]',
          badge: 'bg-[hsl(0,72%,51%)]',
        }
      case 'medium':
        return {
          bg: 'bg-[hsl(48,96%,89%)]',
          border: 'border-[hsl(38,92%,50%)]',
          text: 'text-[hsl(38,92%,50%)]',
          badge: 'bg-[hsl(38,92%,50%)]',
        }
      default:
        return {
          bg: 'bg-[hsl(238,94%,95%)]',
          border: 'border-[hsl(238,74%,59%)]',
          text: 'text-[hsl(238,74%,59%)]',
          badge: 'bg-[hsl(238,74%,59%)]',
        }
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-[hsl(222,84%,5%)]">
          Upcoming Deadlines
        </h3>
      </div>

      <div className="space-y-3">
        {deadlines.map((deadline) => {
          const colors = getPriorityColor(deadline.priority)
          const completionPercentage = Math.round(
            (deadline.submissions.received / deadline.submissions.total) * 100
          )

          return (
            <div
              key={deadline.id}
              className={cn(
                'p-4 rounded-lg border-l-4 transition-all hover:shadow-md',
                colors.bg,
                colors.border
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className={cn('text-sm font-semibold mb-1', colors.text)}>
                    {deadline.title}
                  </h4>
                  <p className="text-xs text-[hsl(220,9%,46%)]">
                    {deadline.className}
                  </p>
                </div>
                <span
                  className={cn(
                    'text-xs font-semibold px-2 py-1 rounded text-white',
                    colors.badge
                  )}
                >
                  {deadline.daysLeft} {deadline.daysLeft === 1 ? 'Day' : 'Days'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[hsl(220,9%,46%)] mb-3">
                <Clock className="w-3 h-3" />
                <span>{deadline.date}</span>
              </div>

              {/* Submission Progress */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[hsl(220,9%,46%)]">
                    Submissions Received
                  </span>
                  <span className="text-xs font-semibold text-[hsl(222,84%,5%)]">
                    {deadline.submissions.received}/{deadline.submissions.total}
                  </span>
                </div>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full transition-all duration-300',
                      completionPercentage < 50 && 'bg-[hsl(0,72%,51%)]',
                      completionPercentage >= 50 && completionPercentage < 80 && 'bg-[hsl(38,92%,50%)]',
                      completionPercentage >= 80 && 'bg-[hsl(158,64%,52%)]'
                    )}
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              {completionPercentage < 50 && deadline.daysLeft <= 3 && (
                <div className="flex items-center gap-1 mt-2 text-xs text-[hsl(0,72%,51%)]">
                  <AlertCircle className="w-3 h-3" />
                  <span>Low submission rate</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
