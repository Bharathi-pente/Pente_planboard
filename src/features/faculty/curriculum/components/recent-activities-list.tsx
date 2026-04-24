import { Clock, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui'
import { Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

interface Activity {
  id: number
  title: string
  template: string
  class: string
  createdDate: string
  dueDate: string
  status: string
  submissions: number
  totalStudents: number
}

interface RecentActivitiesListProps {
  activities: Activity[]
}

export function RecentActivitiesList({ activities }: RecentActivitiesListProps) {
  return (
    <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-[hsl(222,84%,5%)]">
          Recent Activities
        </h3>
        <a
          href="#"
          className="text-sm font-medium text-[hsl(158,64%,52%)] hover:text-[hsl(158,64%,42%)]"
        >
          View all →
        </a>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => {
          const completionPercentage = Math.round(
            (activity.submissions / activity.totalStudents) * 100
          )

          return (
            <Card
              key={activity.id}
              className={cn(
                'p-4 cursor-pointer hover:shadow-md transition-all',
                activity.status === 'completed' && 'opacity-60'
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[hsl(222,84%,5%)] mb-1 truncate">
                    {activity.title}
                  </h4>
                  <p className="text-xs text-[hsl(220,9%,46%)]">
                    {activity.template} • {activity.class}
                  </p>
                </div>
                <Badge
                  variant={activity.status === 'active' ? 'in-progress' : 'approved'}
                  size="sm"
                >
                  {activity.status === 'active' ? 'Active' : 'Completed'}
                </Badge>
              </div>

              {/* Submission Progress */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[hsl(220,9%,46%)]">Submissions</span>
                  <span className="text-xs font-semibold text-[hsl(222,84%,5%)]">
                    {activity.submissions}/{activity.totalStudents}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[hsl(240,20%,98%)] rounded-full overflow-hidden">
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

              {/* Footer */}
              <div className="flex items-center gap-3 text-xs text-[hsl(220,9%,46%)] pt-2 border-t border-[hsl(214,32%,91%)]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Due {activity.dueDate}
                </span>
                {activity.status === 'completed' && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[hsl(158,64%,52%)]">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </span>
                  </>
                )}
              </div>
            </Card>
          )
        })}

        {activities.length === 0 && (
          <div className="text-center py-8 text-sm text-[hsl(220,9%,46%)]">
            No recent activities yet
          </div>
        )}
      </div>
    </div>
  )
}
