import { cn } from '@/lib/utils'
import { FileText, Paperclip } from 'lucide-react'
import { useState } from 'react'
import { Pagination } from '@/components/shared'

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

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,50%)] border-[hsl(38,92%,50%)]/20',
  },
  'under-review': {
    label: 'Under Review',
    color: 'bg-[hsl(238,74%,59%)]/10 text-[hsl(238,74%,59%)] border-[hsl(238,74%,59%)]/20',
  },
  approved: {
    label: 'Approved',
    color: 'bg-[hsl(158,64%,52%)]/10 text-[hsl(158,64%,52%)] border-[hsl(158,64%,52%)]/20',
  },
  graded: {
    label: 'Graded',
    color: 'bg-[hsl(158,64%,52%)]/10 text-[hsl(158,64%,52%)] border-[hsl(158,64%,52%)]/20',
  },
}

const typeConfig = {
  Submission: {
    color: 'bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,50%)]',
    icon: FileText,
  },
  Evidence: {
    color: 'bg-[hsl(0,72%,51%)]/10 text-[hsl(0,72%,51%)]',
    icon: Paperclip,
  },
}

export function RecentActivitiesTable({ activities }: RecentActivitiesTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Calculate pagination
  const totalPages = Math.ceil(activities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentActivities = activities.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 max-h-[530px] flex flex-col">
      <div className="px-6 py-4 border-b border-[hsl(214,32%,91%)] flex items-center justify-between flex-shrink-0">
        <h3 className="text-base font-semibold text-[hsl(222,84%,5%)]">Recent Submissions</h3>
        <button
          className="text-sm text-[hsl(158,64%,52%)] hover:text-[hsl(158,64%,42%)] font-semibold transition-colors duration-200 cursor-pointer"
        >
          View all →
        </button>
      </div>

      <div className="overflow-x-auto custom-scrollbar flex-1">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-[hsl(240,20%,98%)] border-b border-[hsl(214,32%,91%)]">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[30%]">
                Activity
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[25%]">
                Student
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[15%]">
                Type
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[15%]">
                Date
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[15%]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {currentActivities.map((activity) => {
              const config = statusConfig[activity.status as keyof typeof statusConfig] || statusConfig.pending
              const typeConf = typeConfig[activity.type as keyof typeof typeConfig]

              return (
                <tr
                  key={activity.id}
                  className={cn(
                    'border-b border-[hsl(214,32%,91%)] last:border-0 transition-all duration-150',
                    'hover:bg-[hsl(240,20%,98%)]',
                    activity.status === 'approved' && 'opacity-70'
                  )}
                >
                  <td className="px-6 py-4 w-[30%]">
                    <div className="flex items-center gap-3">
                      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-200 hover:scale-110', typeConf?.color)}>
                        {typeConf?.icon && <typeConf.icon className="w-4 h-4" />}
                      </div>
                      <span className="text-sm font-normal text-[hsl(222,84%,5%)] truncate">
                        {activity.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 w-[25%]">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: activity.student.color }}
                      >
                        {activity.student.avatar}
                      </div>
                      <span className="text-sm text-[hsl(220,9%,46%)] truncate">
                        {activity.student.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 w-[15%]">
                    <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-lg', typeConf?.color)}>
                      {activity.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 w-[15%]">
                    <span className="text-xs text-[hsl(220,9%,46%)] font-normal">{activity.date}</span>
                  </td>
                  <td className="px-6 py-4 w-[15%]">
                    <span className={cn('text-xs font-semibold px-3 py-1.5 rounded-lg border', config?.color)}>
                      {config?.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
