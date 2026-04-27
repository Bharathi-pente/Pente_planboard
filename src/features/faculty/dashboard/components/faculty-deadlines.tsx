import { Clock, AlertCircle, Calendar } from 'lucide-react'
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
  return (
    <div className="bg-gradient-to-br from-white to-[hsl(240,20%,99%)] rounded-2xl border border-[hsl(214,32%,91%)] p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0,72%,51%)]/5 via-transparent to-[hsl(330,81%,60%)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(0,72%,51%)] to-[hsl(330,81%,60%)] flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-500">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] group-hover:text-[hsl(0,72%,51%)] transition-colors duration-300">
                Upcoming Deadlines
              </h3>
              <p className="text-xs text-[hsl(220,9%,46%)]">
                Track submission deadlines
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-3">
            {deadlines.map((deadline) => {
              const completionPercentage = Math.round(
                (deadline.submissions.received / deadline.submissions.total) * 100
              )

              return (
                <div
                  key={deadline.id}
                  className="bg-white/60 backdrop-blur-sm rounded-xl border border-[hsl(214,32%,91%)] p-4 hover:shadow-md transition-all duration-200 hover:bg-white/80"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-[hsl(222,84%,5%)] mb-1">
                        {deadline.title}
                      </h4>
                      <p className="text-xs text-[hsl(220,9%,46%)] mb-2">
                        {deadline.className}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[hsl(220,9%,46%)]">
                        <Clock className="w-3 h-3" />
                        <span>{deadline.date}</span>
                      </div>
                    </div>
                    <span
                      className={cn(
                        'text-xs font-semibold px-2 py-1 rounded-full text-white',
                        deadline.priority === 'high' && 'bg-[hsl(0,72%,51%)]',
                        deadline.priority === 'medium' && 'bg-[hsl(38,92%,50%)]',
                        deadline.priority === 'low' && 'bg-[hsl(238,74%,59%)]'
                      )}
                    >
                      {deadline.daysLeft} {deadline.daysLeft === 1 ? 'Day' : 'Days'}
                    </span>
                  </div>

                  {/* Submission Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[hsl(220,9%,46%)]">
                        Submissions Received
                      </span>
                      <span className="text-xs font-semibold text-[hsl(222,84%,5%)]">
                        {deadline.submissions.received}/{deadline.submissions.total}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[hsl(240,20%,98%)] rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full transition-all duration-300 rounded-full',
                          completionPercentage < 50 && 'bg-gradient-to-r from-[hsl(0,72%,51%)] to-[hsl(330,81%,60%)]',
                          completionPercentage >= 50 && completionPercentage < 80 && 'bg-gradient-to-r from-[hsl(38,92%,50%)] to-[hsl(48,96%,89%)]',
                          completionPercentage >= 80 && 'bg-gradient-to-r from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)]'
                        )}
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  {completionPercentage < 50 && deadline.daysLeft <= 3 && (
                    <div className="flex items-center gap-1 mt-3 text-xs text-[hsl(0,72%,51%)]">
                      <AlertCircle className="w-3 h-3" />
                      <span>Low submission rate</span>
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
