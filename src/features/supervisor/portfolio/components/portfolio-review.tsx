import { useState } from 'react'
import { Card, Badge, Avatar, Button } from '@/components/ui'
import { usePortfolioReview } from '../hooks/use-portfolio-review'
import { LoadingSpinner } from '@/components/shared'
import { Filter, Download } from 'lucide-react'

export function PortfolioReview() {
  const [activeTab, setActiveTab] = useState(0)
  const { data, isLoading } = usePortfolioReview()

  if (isLoading || !data) {
    return <LoadingSpinner message="Loading portfolio reviews..." />
  }

  const tabs = [
    { label: `Clearance Queue (${data.clearanceQueue.length})`, data: data.clearanceQueue },
    { label: `Approved (${data.approved.length})`, data: data.approved },
    { label: `Needs Changes (${data.needsChanges.length})`, data: data.needsChanges },
    { label: 'All Students', data: data.allStudents },
  ]

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[hsl(222,84%,5%)] mb-2">
              Portfolio Review - Graduation Clearance
            </h1>
            <p className="text-sm text-[hsl(220,9%,46%)]">
              Review student portfolios for graduation approval
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="bgo" size="sm">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="bgo" size="sm">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[hsl(214,32%,91%)]">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-3 text-sm font-semibold transition-all duration-200 border-b-2 ${
              activeTab === index
                ? 'border-[hsl(0,72%,51%)] text-[hsl(0,72%,51%)]'
                : 'border-transparent text-[hsl(220,9%,46%)] hover:text-[hsl(222,84%,5%)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
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
                  Portfolio Completion
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
              {tabs[activeTab].data.map((student: any) => (
                <tr
                  key={student.id}
                  className={`border-b border-[hsl(214,32%,91%)] last:border-0 transition-all duration-150 hover:bg-[hsl(240,20%,98%)] ${
                    student.status === 'incomplete' ? 'bg-[hsl(0,86%,97%)]' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9">
                        <div
                          className="w-full h-full rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: student.avatarColor }}
                        >
                          {student.initials}
                        </div>
                      </Avatar>
                      <span className="text-sm font-semibold text-[hsl(222,84%,5%)]">
                        {student.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-[hsl(220,9%,46%)]">
                      {student.department} · {student.semester}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{student.completion}%</span>
                      <div className="w-16 h-2 bg-[hsl(214,32%,91%)] rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${student.completion}%`,
                            background:
                              student.completion >= 90
                                ? 'hsl(158,64%,52%)'
                                : student.completion >= 70
                                ? 'hsl(38,92%,50%)'
                                : 'hsl(0,72%,51%)',
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={student.verifiedStatus === 'good' ? 'approved' : 'review'}
                      size="sm"
                    >
                      {student.verifiedItems}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        student.status === 'complete'
                          ? 'approved'
                          : student.status === 'review-needed'
                          ? 'review'
                          : 'rejected'
                      }
                      size="md"
                    >
                      {student.statusLabel}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="bgo" size="sm">
                        View Portfolio
                      </Button>
                      {student.status === 'complete' && (
                        <Button variant="bgrn" size="sm">
                          ✓ Approve
                        </Button>
                      )}
                      {(student.status === 'review-needed' || student.status === 'incomplete') && (
                        <Button variant="bred" size="sm">
                          Request Changes
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
