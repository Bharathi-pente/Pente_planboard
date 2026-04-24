import { Card } from '@/components/ui'
import { Avatar } from '@/components/ui'
import { Badge } from '@/components/ui'

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
    variant: 'approved' as const,
    color: 'text-[hsl(158,64%,52%)]',
  },
  'review-needed': {
    variant: 'review' as const,
    color: 'text-[hsl(38,92%,50%)]',
  },
  incomplete: {
    variant: 'rejected' as const,
    color: 'text-[hsl(0,72%,51%)]',
  },
}

export function RecentPortfolioReviews({ reviews }: RecentPortfolioReviewsProps) {
  return (
    <Card className="overflow-hidden">
      <div className="px-6 py-4 border-b border-[hsl(214,32%,91%)] flex items-center justify-between">
        <h3 className="text-base font-semibold text-[hsl(222,84%,5%)]">
          Recent Portfolio Reviews
        </h3>
        <a
          href="#"
          className="text-sm text-[hsl(0,72%,51%)] hover:text-[hsl(0,72%,46%)] font-semibold transition-colors duration-200"
        >
          View all →
        </a>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead>
            <tr className="bg-[hsl(240,20%,98%)] border-b border-[hsl(214,32%,91%)]">
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Student
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Dept / Semester
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Completion
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Verified Items
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => {
              const config = statusConfig[review.status]

              return (
                <tr
                  key={review.id}
                  className="border-b border-[hsl(214,32%,91%)] last:border-0 transition-all duration-150 hover:bg-[hsl(240,20%,98%)]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[hsl(0,72%,51%)] to-[hsl(330,81%,60%)] flex items-center justify-center text-white text-xs font-bold">
                          {review.student.initials}
                        </div>
                      </Avatar>
                      <span className="text-sm font-semibold text-[hsl(222,84%,5%)]">
                        {review.student.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-[hsl(220,9%,46%)]">
                      {review.student.department} · {review.student.semester}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${config.color}`}>
                        {review.portfolioCompletion}%
                      </span>
                      <div className="w-16 h-2 bg-[hsl(214,32%,91%)] rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300`}
                          style={{
                            width: `${review.portfolioCompletion}%`,
                            background:
                              review.portfolioCompletion >= 90
                                ? 'hsl(158,64%,52%)'
                                : review.portfolioCompletion >= 70
                                ? 'hsl(38,92%,50%)'
                                : 'hsl(0,72%,51%)',
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-[hsl(220,9%,46%)]">
                      {review.verifiedItems}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={config.variant} size="md">
                      {review.statusLabel}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="h-7 px-3 text-xs font-semibold rounded-lg bg-white border border-[hsl(214,32%,91%)] text-[hsl(222,84%,5%)] hover:bg-[hsl(240,20%,97%)] transition-all duration-200">
                        View Portfolio
                      </button>
                      {review.status === 'complete' && (
                        <button className="h-7 px-3 text-xs font-semibold rounded-lg bg-gradient-to-b from-[hsl(158,64%,52%)] to-[hsl(158,64%,47%)] text-white hover:from-[hsl(158,64%,47%)] hover:to-[hsl(158,64%,42%)] transition-all duration-200">
                          ✓ Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
