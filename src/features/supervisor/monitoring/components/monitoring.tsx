import { useState } from 'react'
import { Card, Badge, Avatar, Button } from '@/components/ui'
import { useMonitoring } from '../hooks/use-monitoring'
import { KPICard, LoadingSpinner } from '@/components/shared'
import { Users, TrendingUp, AlertTriangle, AlertCircle, Filter, Download } from 'lucide-react'

export function Monitoring() {
  const [activeTab, setActiveTab] = useState(0)
  const { data, isLoading } = useMonitoring()

  if (isLoading || !data) {
    return <LoadingSpinner message="Loading monitoring data..." />
  }

  const tabs = [
    { label: `All Students (${data.stats.totalStudents})`, data: data.allStudents },
    { label: `Flagged (${data.stats.flagged})`, data: data.flaggedStudents },
    { label: 'Computer Science', data: data.csStudents },
    { label: 'Physics', data: data.physicsStudents },
    { label: 'Mathematics', data: data.mathsStudents },
  ]

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[hsl(222,84%,5%)] mb-2">
              Student Monitoring
            </h1>
            <p className="text-sm text-[hsl(220,9%,46%)]">
              Track all students across departments and semesters
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Total Students"
          value={data.stats.totalStudents.toString()}
          subtitle="All departments"
          icon={<Users className="w-6 h-6" />}
          variant="student"
        />
        <KPICard
          title="On Track"
          value={data.stats.onTrack.toString()}
          subtitle="79%"
          icon={<TrendingUp className="w-6 h-6" />}
          variant="faculty"
        />
        <KPICard
          title="Needs Attention"
          value={data.stats.needsAttention.toString()}
          subtitle="14%"
          icon={<AlertCircle className="w-6 h-6" />}
          variant="faculty"
        />
        <KPICard
          title="Flagged / At Risk"
          value={data.stats.flagged.toString()}
          subtitle="6.7% · Intervention needed"
          icon={<AlertTriangle className="w-6 h-6" />}
          variant="supervisor"
        />
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
                  Dept / Sem
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Avg Grade
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Portfolio Progress
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Flags
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
                    student.flagged ? 'bg-[hsl(0,86%,97%)]' : ''
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
                      {student.department} · Sem {student.semester}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-sm font-semibold"
                      style={{
                        color:
                          student.avgGrade >= 80
                            ? 'hsl(158,64%,52%)'
                            : student.avgGrade >= 60
                            ? 'hsl(38,92%,50%)'
                            : 'hsl(0,72%,51%)',
                      }}
                    >
                      {student.avgGrade}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{student.portfolioProgress}%</span>
                      <div className="w-16 h-2 bg-[hsl(214,32%,91%)] rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-300"
                          style={{
                            width: `${student.portfolioProgress}%`,
                            background:
                              student.portfolioProgress >= 80
                                ? 'hsl(158,64%,52%)'
                                : student.portfolioProgress >= 60
                                ? 'hsl(38,92%,50%)'
                                : 'hsl(0,72%,51%)',
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        student.status === 'on-track'
                          ? 'approved'
                          : student.status === 'watch'
                          ? 'review'
                          : student.status === 'needs-attention'
                          ? 'pending'
                          : 'rejected'
                      }
                      size="md"
                    >
                      {student.statusLabel}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    {student.flagged ? (
                      <Badge variant="rejected" size="sm">
                        🚩 {student.flagReason}
                      </Badge>
                    ) : (
                      <span className="text-xs text-[hsl(220,9%,46%)]">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="bgo" size="sm">
                        View Details
                      </Button>
                      {student.flagged && (
                        <Button variant="bred" size="sm">
                          Notify Faculty
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
