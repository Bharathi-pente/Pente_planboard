import { TrendingUp, Users, FileText } from 'lucide-react'
import { Card } from '@/components/ui'
import { cn } from '@/lib/utils'

interface ClassInfo {
  id: number
  className: string
  subject: string
  totalStudents: number
  avgCompletion: number
  trend: 'up' | 'down' | 'neutral'
  pendingSubmissions: number
}

interface ClassPerformanceCardsProps {
  classes: ClassInfo[]
}

export function ClassPerformanceCards({ classes }: ClassPerformanceCardsProps) {
  return (
    <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-[hsl(222,84%,5%)]">
          Class Performance
        </h3>
        <a
          href="#"
          className="text-sm font-medium text-[hsl(158,64%,52%)] hover:text-[hsl(158,64%,42%)]"
        >
          View all →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {classes.map((classInfo) => (
          <Card
            key={classInfo.id}
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold text-[hsl(222,84%,5%)] mb-1">
                  {classInfo.className}
                </h4>
                <p className="text-xs text-[hsl(220,9%,46%)]">
                  {classInfo.subject}
                </p>
              </div>
              <TrendingUp
                className={cn(
                  'w-4 h-4',
                  classInfo.trend === 'up' && 'text-[hsl(158,64%,52%)]',
                  classInfo.trend === 'down' && 'text-[hsl(0,72%,51%)]',
                  classInfo.trend === 'neutral' && 'text-[hsl(220,9%,46%)]'
                )}
              />
            </div>

            <div className="space-y-3">
              {/* Students Count */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[hsl(220,9%,46%)]">
                  <Users className="w-3 h-3" />
                  <span>Students</span>
                </div>
                <span className="text-sm font-semibold text-[hsl(222,84%,5%)]">
                  {classInfo.totalStudents}
                </span>
              </div>

              {/* Avg Completion */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[hsl(220,9%,46%)]">
                    Avg Completion
                  </span>
                  <span className="text-sm font-semibold text-[hsl(158,64%,52%)]">
                    {classInfo.avgCompletion}%
                  </span>
                </div>
                <div className="w-full h-2 bg-[hsl(240,20%,98%)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)] transition-all duration-300"
                    style={{ width: `${classInfo.avgCompletion}%` }}
                  />
                </div>
              </div>

              {/* Pending Submissions */}
              <div className="flex items-center justify-between pt-2 border-t border-[hsl(214,32%,91%)]">
                <div className="flex items-center gap-2 text-xs text-[hsl(220,9%,46%)]">
                  <FileText className="w-3 h-3" />
                  <span>Pending</span>
                </div>
                <span className={cn(
                  'text-sm font-semibold',
                  classInfo.pendingSubmissions > 5 ? 'text-[hsl(0,72%,51%)]' : 'text-[hsl(158,64%,52%)]'
                )}>
                  {classInfo.pendingSubmissions}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
