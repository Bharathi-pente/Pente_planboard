import { Badge, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { formatRelativeTime } from '@/utils'
import { getStatusBadgeVariant } from '@/components/ui/badge'
import type { Status } from '@/types'

interface ActivityFeedItem {
  id: number
  type: string
  title: string
  subject: string
  timestamp: string
  status: Status
}

interface ActivityFeedProps {
  activities: ActivityFeedItem[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getActivityIcon = (type: string) => {
    const colors: Record<string, string> = {
      submission: 'hsl(238, 74%, 59%)',
      approval: 'hsl(158, 64%, 52%)',
      deadline: 'hsl(38, 92%, 50%)',
      grade: 'hsl(271, 81%, 56%)',
    }
    return colors[type] || colors.submission
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-sm text-[hsl(220,9%,46%)]">
              No recent activities
            </div>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 pb-4 border-b border-[hsl(214,32%,91%)] last:border-0 hover:bg-[hsl(240,20%,96%)] -mx-2 px-2 rounded-lg transition-colors cursor-pointer"
              >
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ background: getActivityIcon(activity.type) }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[hsl(222,84%,5%)]">
                    {activity.title}
                  </p>
                  <p className="text-xs text-[hsl(220,9%,46%)] mt-1">
                    {activity.subject} • {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
                <Badge variant={getStatusBadgeVariant(activity.status)} size="sm">
                  {activity.status === 'in-progress'
                    ? 'In Progress'
                    : activity.status.charAt(0).toUpperCase() +
                      activity.status.slice(1)}
                </Badge>
              </div>
            ))
          )}
        </div>

        {activities.length > 0 && (
          <button className="w-full mt-4 text-sm text-[hsl(238,74%,59%)] hover:text-[hsl(238,74%,54%)] font-medium transition-colors">
            View all activities →
          </button>
        )}
      </CardContent>
    </Card>
  )
}
