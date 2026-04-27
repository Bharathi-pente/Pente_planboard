import { cn } from '@/lib/utils'
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { useState } from 'react'
import { Pagination } from '@/components/shared'

interface Review {
  id: number
  student: {
    name: string
    initials: string
    department: string
    semester: string
  }
  portfolioCompletion: number
  verifiedItems: string
  status: 'complete' | 'review-needed' | 'incomplete'
  statusLabel: string
}

interface RecentPortfolioReviewsProps {
  reviews: Review[]
}

const statusConfig = {
  complete: {
    label: 'Complete',
    color: 'bg-[hsl(158,64%,52%)]/10 text-[hsl(158,64%,52%)] border-[hsl(158,64%,52%)]/20',
  },
  'review-needed': {
    label: 'Review Needed',
    color: 'bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,50%)] border-[hsl(38,92%,50%)]/20',
  },
  incomplete: {
    label: 'Incomplete',
    color: 'bg-[hsl(0,72%,51%)]/10 text-[hsl(0,72%,51%)] border-[hsl(0,72%,51%)]/20',
  },
}

const typeConfig = {
  complete: {
    color: 'bg-[hsl(158,64%,52%)]/10 text-[hsl(158,64%,52%)]',
    icon: CheckCircle,
  },
  'review-needed': {
    color: 'bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,50%)]',
    icon: AlertTriangle,
  },
  incomplete: {
    color: 'bg-[hsl(0,72%,51%)]/10 text-[hsl(0,72%,51%)]',
    icon: XCircle,
  },
}

export function RecentPortfolioReviews({ reviews }: RecentPortfolioReviewsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Calculate pagination
  const totalPages = Math.ceil(reviews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentReviews = reviews.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 max-h-[500px] flex flex-col">
      <div className="px-6 py-4 border-b border-[hsl(214,32%,91%)] flex items-center justify-between flex-shrink-0">
        <h3 className="text-base font-semibold text-[hsl(222,84%,5%)]">Recent Portfolio Reviews</h3>
        <button
          className="text-sm text-[hsl(0,72%,51%)] hover:text-[hsl(0,72%,46%)] font-semibold transition-colors duration-200 cursor-pointer"
        >
          View all →
        </button>
      </div>

      <div className="overflow-x-auto custom-scrollbar flex-1">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-[hsl(240,20%,98%)] border-b border-[hsl(214,32%,91%)]">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[25%]">
                Student
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[20%]">
                Department
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[20%]">
                Completion
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[20%]">
                Verified Items
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[15%]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {currentReviews.map((review) => {
              const config = statusConfig[review.status]
              const typeConf = typeConfig[review.status]

              return (
                <tr
                  key={review.id}
                  className={cn(
                    'border-b border-[hsl(214,32%,91%)] last:border-0 transition-all duration-150',
                    'hover:bg-[hsl(240,20%,98%)]',
                    review.status === 'complete' && 'opacity-70'
                  )}
                >
                  <td className="px-6 py-4 w-[25%]">
                    <div className="flex items-center gap-3">
                      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-200 hover:scale-110', typeConf?.color)}>
                        {typeConf?.icon && <typeConf.icon className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="text-sm font-normal text-[hsl(222,84%,5%)] block">
                          {review.student.name}
                        </span>
                        <span className="text-xs text-[hsl(220,9%,46%)]">
                          {review.student.semester}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 w-[20%]">
                    <span className="text-sm text-[hsl(220,9%,46%)] font-normal">{review.student.department}</span>
                  </td>
                  <td className="px-6 py-4 w-[20%]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[hsl(240,20%,98%)] rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)] transition-all duration-300"
                          style={{ width: `${review.portfolioCompletion}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-[hsl(158,64%,52%)] min-w-[35px]">
                        {review.portfolioCompletion}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 w-[20%]">
                    <span className="text-sm text-[hsl(220,9%,46%)] font-normal">{review.verifiedItems}</span>
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
