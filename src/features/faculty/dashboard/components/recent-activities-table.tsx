import { Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

interface Activity {
  id: number
  title: string
  student: {
    name: string
    avatar: string
    color: string
  }
  type: string
  date: string
  status: string
  icon: string
}

interface RecentActivitiesTableProps {
  activities: Activity[]
}

export function RecentActivitiesTable({ activities }: RecentActivitiesTableProps) {
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, 'pending' | 'in-progress' | 'approved'> = {
      pending: 'pending',
      'under-review': 'in-progress',
      approved: 'approved',
      graded: 'approved',
    }
    return statusMap[status] || 'pending'
  }

  const getTypeBadge = (type: string) => {
    if (type === 'Submission') {
      return { bg: 'bg-[hsl(48,96%,89%)]', text: 'text-[hsl(38,92%,50%)]' }
    }
    return { bg: 'bg-[hsl(0,86%,97%)]', text: 'text-[hsl(0,72%,51%)]' }
  }

  return (
    <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-[hsl(214,32%,91%)] flex items-center justify-between">
        <h3 className="text-base font-semibold text-[hsl(222,84%,5%)]">Recent Activities</h3>
        <a
          href="#"
          className="text-sm text-[hsl(158,64%,52%)] hover:text-[hsl(158,64%,42%)] font-medium"
        >
          View all →
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[hsl(240,20%,96%)] border-b border-[hsl(214,32%,91%)]">
              <th className="text-left px-6 py-3 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Activity
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Student
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Type
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => {
              const typeBadge = getTypeBadge(activity.type)
              return (
                <tr
                  key={activity.id}
                  className={cn(
                    'border-b border-[hsl(214,32%,91%)] last:border-0 transition-colors hover:bg-[hsl(240,20%,96%)]',
                    activity.status === 'approved' && 'opacity-70'
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center text-sm',
                        typeBadge.bg
                      )}>
                        {activity.icon}
                      </div>
                      <span className="text-sm font-semibold text-[hsl(222,84%,5%)]">
                        {activity.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: activity.student.color }}
                      >
                        {activity.student.avatar}
                      </div>
                      <span className="text-sm text-[hsl(220,9%,46%)]">
                        {activity.student.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                      typeBadge.bg,
                      typeBadge.text
                    )}>
                      {activity.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[hsl(220,9%,46%)]">
                      {activity.date}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusBadge(activity.status)} size="sm">
                      {activity.status === 'pending' && 'Pending'}
                      {activity.status === 'under-review' && 'Under Review'}
                      {activity.status === 'approved' && 'Approved'}
                      {activity.status === 'graded' && 'Graded'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {activity.status !== 'approved' && activity.status !== 'graded' ? (
                      <button className="text-sm font-medium text-[hsl(158,64%,52%)] hover:text-[hsl(158,64%,42%)] px-3 py-1 rounded-lg hover:bg-[hsl(152,76%,94%)] transition-colors">
                        {activity.type === 'Submission' ? 'Review' : 'Validate'}
                      </button>
                    ) : (
                      <span className="text-sm text-[hsl(220,9%,46%)]">Completed</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
