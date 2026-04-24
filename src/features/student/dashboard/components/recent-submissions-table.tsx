import { cn } from '@/lib/utils'
import { FileText, GraduationCap, CheckSquare } from 'lucide-react'

interface RecentSubmission {
  id: number
  activity: string
  type: string
  date: string
  status: string
}

interface RecentSubmissionsTableProps {
  submissions: RecentSubmission[]
}

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,50%)] border-[hsl(38,92%,50%)]/20',
  },
  review: {
    label: 'Under Review',
    color: 'bg-[hsl(238,74%,59%)]/10 text-[hsl(238,74%,59%)] border-[hsl(238,74%,59%)]/20',
  },
  approved: {
    label: 'Approved',
    color: 'bg-[hsl(158,64%,52%)]/10 text-[hsl(158,64%,52%)] border-[hsl(158,64%,52%)]/20',
  },
}

const typeConfig = {
  Research: {
    color: 'bg-[hsl(271,81%,56%)]/10 text-[hsl(271,81%,56%)]',
    icon: FileText,
  },
  Curriculum: {
    color: 'bg-[hsl(238,74%,59%)]/10 text-[hsl(238,74%,59%)]',
    icon: GraduationCap,
  },
  Project: {
    color: 'bg-[hsl(158,64%,52%)]/10 text-[hsl(158,64%,52%)]',
    icon: CheckSquare,
  },
}

export function RecentSubmissionsTable({ submissions }: RecentSubmissionsTableProps) {
  return (
    <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <div className="px-6 py-4 border-b border-[hsl(214,32%,91%)] flex items-center justify-between">
        <h3 className="text-base font-semibold text-[hsl(222,84%,5%)]">Recent Submissions</h3>
        <a
          href="#"
          className="text-sm text-[hsl(238,74%,59%)] hover:text-[hsl(238,74%,54%)] font-semibold transition-colors duration-200"
        >
          View all →
        </a>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead>
            <tr className="bg-[hsl(240,20%,98%)] border-b border-[hsl(214,32%,91%)]">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Activity
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Type
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => {
              const config = statusConfig[submission.status as keyof typeof statusConfig]
              const typeConf = typeConfig[submission.type as keyof typeof typeConfig]

              return (
                <tr
                  key={submission.id}
                  className={cn(
                    'border-b border-[hsl(214,32%,91%)] last:border-0 transition-all duration-150',
                    'hover:bg-[hsl(240,20%,98%)]',
                    submission.status === 'approved' && 'opacity-70'
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-200 hover:scale-110', typeConf?.color)}>
                        {typeConf?.icon && <typeConf.icon className="w-4.5 h-4.5" />}
                      </div>
                      <span className="text-sm font-medium text-[hsl(222,84%,5%)]">
                        {submission.activity}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-lg', typeConf?.color)}>
                      {submission.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-[hsl(220,9%,46%)] font-medium">{submission.date}</span>
                  </td>
                  <td className="px-6 py-4">
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
    </div>
  )
}
