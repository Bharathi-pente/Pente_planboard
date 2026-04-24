import { Badge, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { formatDate, getDaysUntil } from '@/utils'
import { Calendar, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UpcomingEvent {
  id: number
  title: string
  dueDate: string
  subject: string
  priority: 'low' | 'medium' | 'high'
}

interface UpcomingWidgetProps {
  events: UpcomingEvent[]
}

export function UpcomingWidget({ events }: UpcomingWidgetProps) {
  const getPriorityColor = (priority: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      high: { bg: 'hsl(0, 86%, 97%)', text: 'hsl(0, 72%, 51%)' },
      medium: { bg: 'hsl(48, 96%, 89%)', text: 'hsl(38, 92%, 50%)' },
      low: { bg: 'hsl(152, 76%, 94%)', text: 'hsl(158, 64%, 52%)' },
    }
    return colors[priority] || colors.medium
  }

  const getPriorityIcon = (_priority: string, daysUntil: number) => {
    if (daysUntil <= 3) {
      return <AlertCircle className="w-4 h-4" />
    }
    return <Calendar className="w-4 h-4" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.length === 0 ? (
            <div className="text-center py-8 text-sm text-[hsl(220,9%,46%)]">
              No upcoming deadlines
            </div>
          ) : (
            events.map((event) => {
              const daysUntil = getDaysUntil(event.dueDate)
              const priorityColor = getPriorityColor(event.priority)

              return (
                <div
                  key={event.id}
                  className="flex items-start gap-3 pb-4 border-b border-[hsl(214,32%,91%)] last:border-0 hover:bg-[hsl(240,20%,96%)] -mx-2 px-2 rounded-lg transition-colors cursor-pointer"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: priorityColor.bg,
                      color: priorityColor.text,
                    }}
                  >
                    {getPriorityIcon(event.priority, daysUntil)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[hsl(222,84%,5%)]">
                      {event.title}
                    </p>
                    <p className="text-xs text-[hsl(220,9%,46%)] mt-1">
                      {event.subject}
                    </p>
                    <p className="text-xs text-[hsl(220,9%,46%)] mt-1">
                      Due: {formatDate(event.dueDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        event.priority === 'high'
                          ? 'rejected'
                          : event.priority === 'medium'
                          ? 'pending'
                          : 'approved'
                      }
                      size="sm"
                    >
                      {event.priority.toUpperCase()}
                    </Badge>
                    <p
                      className={cn(
                        'text-xs font-medium mt-1',
                        daysUntil <= 3
                          ? 'text-[hsl(0,72%,51%)]'
                          : 'text-[hsl(220,9%,46%)]'
                      )}
                    >
                      {daysUntil === 0
                        ? 'Today'
                        : daysUntil === 1
                        ? 'Tomorrow'
                        : `${daysUntil} days`}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {events.length > 0 && (
          <button className="w-full mt-4 text-sm text-[hsl(238,74%,59%)] hover:text-[hsl(238,74%,54%)] font-medium transition-colors">
            View full calendar →
          </button>
        )}
      </CardContent>
    </Card>
  )
}
