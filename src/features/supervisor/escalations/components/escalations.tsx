import { useState } from 'react'
import { Card, Badge, Button } from '@/components/ui'
import { useEscalations } from '../hooks/use-escalations'
import { LoadingSpinner } from '@/components/shared'

export function Escalations() {
  const [activeTab, setActiveTab] = useState(0)
  const { data, isLoading } = useEscalations()

  if (isLoading || !data) {
    return <LoadingSpinner message="Loading escalations..." />
  }

  const tabs = [
    { label: `Open Cases (${data.openCases.length})`, data: data.openCases },
    { label: `Resolved (${data.resolvedCases.length})`, data: data.resolvedCases },
    { label: 'All Cases', data: [...data.openCases, ...data.resolvedCases] },
  ]

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[hsl(222,84%,5%)] mb-2">
              Escalations & Disputes
            </h1>
            <p className="text-sm text-[hsl(220,9%,46%)]">
              Handle special cases and faculty escalations
            </p>
          </div>
          <Badge variant="rejected" size="lg">
            {data.openCases.length} Open Cases
          </Badge>
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

      {/* Open Cases Grid */}
      {activeTab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.openCases.map((escalation: any) => (
            <Card
              key={escalation.id}
              className={`p-6 border-l-4 ${
                escalation.priority === 'urgent'
                  ? 'border-[hsl(0,72%,51%)] bg-[hsl(0,86%,97%)]'
                  : escalation.priority === 'medium'
                  ? 'border-[hsl(38,92%,50%)]'
                  : 'border-[hsl(238,74%,59%)]'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-semibold text-[hsl(220,9%,46%)] mb-2">
                    {escalation.caseId}
                  </div>
                  <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] mb-1">
                    {escalation.title}
                  </h3>
                  <p className="text-xs text-[hsl(220,9%,46%)]">
                    {escalation.openedDate} · {escalation.studentName} · {escalation.department}
                  </p>
                </div>
                <Badge
                  variant={
                    escalation.priority === 'urgent'
                      ? 'rejected'
                      : escalation.priority === 'medium'
                      ? 'pending'
                      : 'review'
                  }
                >
                  {escalation.priority === 'urgent'
                    ? 'Urgent'
                    : escalation.priority === 'medium'
                    ? 'Medium'
                    : 'Normal'}
                </Badge>
              </div>

              <div className="bg-white rounded-xl p-4 mb-4 text-xs text-[hsl(220,9%,46%)]">
                <p>{escalation.description}</p>
              </div>

              <div className="flex gap-2 mb-4">
                <Button variant="bgo" size="sm" fullWidth>
                  View Details
                </Button>
                <Button variant="bgo" size="sm" fullWidth>
                  View Submission
                </Button>
              </div>

              {escalation.priority === 'urgent' && (
                <>
                  <div className="pt-4 border-t border-[hsl(214,32%,91%)]">
                    <p className="text-xs font-semibold text-[hsl(220,9%,46%)] mb-3">
                      Your Decision:
                    </p>
                    <div className="flex gap-2 mb-3">
                      <Button variant="bgrn" size="sm" fullWidth>
                        ✅ Uphold Faculty
                      </Button>
                      <Button variant="bred" size="sm" fullWidth>
                        ⚠️ Override
                      </Button>
                    </div>
                    <textarea
                      placeholder="Document your reasoning (required for override)..."
                      className="w-full p-3 border-2 border-[hsl(214,32%,91%)] rounded-xl text-xs resize-none focus:outline-none focus:ring-2 focus:ring-[hsl(0,72%,51%)] focus:border-transparent"
                      rows={3}
                    />
                  </div>
                </>
              )}

              {escalation.priority !== 'urgent' && (
                <div className="flex gap-2">
                  <Button variant="bgrn" size="sm" fullWidth>
                    ✅ Approve
                  </Button>
                  <Button variant="bred" size="sm" fullWidth>
                    ✗ Reject
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Resolved Cases Table */}
      {activeTab === 1 && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full">
              <thead>
                <tr className="bg-[hsl(240,20%,98%)] border-b border-[hsl(214,32%,91%)]">
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Case ID
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Student
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Opened
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Resolved
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Decision
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.resolvedCases.map((escalation: any) => (
                  <tr
                    key={escalation.id}
                    className="border-b border-[hsl(214,32%,91%)] last:border-0 opacity-85 transition-all duration-150 hover:bg-[hsl(240,20%,98%)] hover:opacity-100"
                  >
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-[hsl(220,9%,46%)]">
                        {escalation.caseId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="review" size="sm">
                        {escalation.type}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-[hsl(222,84%,5%)]">
                        {escalation.studentName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-[hsl(220,9%,46%)]">
                        {escalation.openedDate}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-[hsl(220,9%,46%)]">
                        {escalation.resolvedDate}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={escalation.decision === 'approved' ? 'approved' : 'rejected'}
                        size="sm"
                      >
                        {escalation.decisionLabel}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="bgo" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* All Cases Table */}
      {activeTab === 2 && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full">
              <thead>
                <tr className="bg-[hsl(240,20%,98%)] border-b border-[hsl(214,32%,91%)]">
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Case ID
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Student
                  </th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Priority
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
                {tabs[activeTab].data.map((escalation: any) => (
                  <tr
                    key={escalation.id}
                    className={`border-b border-[hsl(214,32%,91%)] last:border-0 transition-all duration-150 hover:bg-[hsl(240,20%,98%)] ${
                      escalation.status === 'resolved' ? 'opacity-70' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-[hsl(220,9%,46%)]">
                        {escalation.caseId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="review" size="sm">
                        {escalation.type || escalation.title}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-[hsl(222,84%,5%)]">
                        {escalation.studentName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          escalation.priority === 'urgent'
                            ? 'rejected'
                            : escalation.priority === 'medium'
                            ? 'pending'
                            : 'review'
                        }
                        size="sm"
                      >
                        {escalation.priority || 'Normal'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={escalation.status === 'resolved' ? 'approved' : 'pending'}
                        size="md"
                      >
                        {escalation.status === 'resolved' ? 'Resolved' : 'Open'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="bgo" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
