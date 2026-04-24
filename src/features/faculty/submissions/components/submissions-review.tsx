import * as React from 'react'
import { FileText, Filter, Download } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { mockSubmissionsReview as mockSubmissions, submissionsReviewStats as submissionsStats } from '@/data'
import { cn } from '@/lib/utils'

type TabType = 'all' | 'pending' | 'approved' | 'needs-revision'

export function SubmissionsReview() {
  const [activeTab, setActiveTab] = React.useState<TabType>('all')

  const getFilteredSubmissions = () => {
    if (activeTab === 'all') return mockSubmissions
    return mockSubmissions.filter((s) => {
      if (activeTab === 'needs-revision') return s.status === 'needs-revision'
      return s.status === activeTab
    })
  }

  const filteredSubmissions = getFilteredSubmissions()

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[hsl(222,84%,5%)] mb-2">
              Submissions Review
            </h1>
            <p className="text-sm text-[hsl(220,9%,46%)]">
              Review and grade student submissions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="bgo" size="md">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="bgo" size="md">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-[hsl(214,32%,91%)]">
        <button
          onClick={() => setActiveTab('all')}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'all'
              ? 'border-[hsl(158,64%,52%)] text-[hsl(158,64%,52%)]'
              : 'border-transparent text-[hsl(220,9%,46%)] hover:text-[hsl(222,84%,5%)]'
          )}
        >
          All ({submissionsStats.total})
        </button>
        <button
          onClick={() => setActiveTab('pending')}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'pending'
              ? 'border-[hsl(158,64%,52%)] text-[hsl(158,64%,52%)]'
              : 'border-transparent text-[hsl(220,9%,46%)] hover:text-[hsl(222,84%,5%)]'
          )}
        >
          Pending ({submissionsStats.pending})
        </button>
        <button
          onClick={() => setActiveTab('approved')}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'approved'
              ? 'border-[hsl(158,64%,52%)] text-[hsl(158,64%,52%)]'
              : 'border-transparent text-[hsl(220,9%,46%)] hover:text-[hsl(222,84%,5%)]'
          )}
        >
          Approved ({submissionsStats.approved})
        </button>
        <button
          onClick={() => setActiveTab('needs-revision')}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'needs-revision'
              ? 'border-[hsl(158,64%,52%)] text-[hsl(158,64%,52%)]'
              : 'border-transparent text-[hsl(220,9%,46%)] hover:text-[hsl(222,84%,5%)]'
          )}
        >
          Needs Revision ({submissionsStats.needsRevision})
        </button>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[hsl(240,20%,96%)] border-b border-[hsl(214,32%,91%)]">
                <th className="text-left px-6 py-3 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Student
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Activity
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  {activeTab === 'approved' ? 'Grade' : 'Submitted'}
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  {activeTab === 'needs-revision' ? 'Reason' : 'Status'}
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr
                  key={submission.id}
                  className={cn(
                    'border-b border-[hsl(214,32%,91%)] last:border-0 transition-colors hover:bg-[hsl(240,20%,96%)]',
                    submission.status === 'approved' && 'opacity-70',
                    submission.status === 'needs-revision' && 'bg-[hsl(48,96%,89%)]/20'
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: submission.student.color }}
                      >
                        {submission.student.avatar}
                      </div>
                      <span className="text-sm font-semibold text-[hsl(222,84%,5%)]">
                        {submission.student.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[hsl(222,84%,5%)]">
                      {submission.activity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="pending" size="sm">
                      {submission.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {activeTab === 'approved' && submission.grade ? (
                      <span className="text-sm font-semibold text-[hsl(158,64%,52%)]">
                        {submission.grade}%
                      </span>
                    ) : (
                      <span className="text-sm text-[hsl(220,9%,46%)]">
                        {submission.submittedDate}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {activeTab === 'needs-revision' && submission.revisionReason ? (
                      <span className="text-sm text-[hsl(220,9%,46%)]">
                        {submission.revisionReason}
                      </span>
                    ) : (
                      <Badge
                        variant={
                          submission.status === 'approved'
                            ? 'approved'
                            : submission.status === 'needs-revision'
                            ? 'review'
                            : 'pending'
                        }
                        size="sm"
                      >
                        {submission.status === 'approved'
                          ? 'Approved'
                          : submission.status === 'needs-revision'
                          ? 'Revision'
                          : 'Pending'}
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {submission.status === 'pending' ? (
                      <Button variant="bgrn" size="sm">
                        Review
                      </Button>
                    ) : submission.status === 'needs-revision' ? (
                      <Button variant="bgo" size="sm">
                        View Feedback
                      </Button>
                    ) : (
                      <Button variant="bgo" size="sm">
                        View Details
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-[hsl(220,9%,46%)] mx-auto mb-3" />
              <p className="text-sm text-[hsl(220,9%,46%)]">
                No submissions found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
