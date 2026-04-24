import { Card, Button } from '@/components/ui'
import { useReports } from '../hooks/use-reports'
import { KPICard, LoadingSpinner } from '@/components/shared'
import { BarChart, Users, CheckCircle, Download, RefreshCw } from 'lucide-react'

export function Reports() {
  const { data, isLoading } = useReports()

  if (isLoading || !data) {
    return <LoadingSpinner message="Loading reports..." />
  }

  const { stats, departments, recentExports } = data

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[hsl(222,84%,5%)] mb-2">
              Reports & Analytics
            </h1>
            <p className="text-sm text-[hsl(220,9%,46%)]">
              Generate institutional reports and export data
            </p>
          </div>
          <Button variant="bgo" size="sm">
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Total Reports"
          value={stats.totalReports.toString()}
          subtitle="Active"
          icon={<BarChart className="w-6 h-6" />}
          variant="faculty"
          trend={{
            value: 28,
            label: 'this month',
            isPositive: true,
          }}
        />
        <KPICard
          title="Students Tracked"
          value={stats.studentsTracked.toString()}
          subtitle="Across 4 departments"
          icon={<Users className="w-6 h-6" />}
          variant="student"
        />
        <KPICard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          subtitle="+6% from last quarter"
          icon={<CheckCircle className="w-6 h-6" />}
          variant="faculty"
          trend={{
            value: 6,
            label: 'improvement',
            isPositive: true,
          }}
        />
        <KPICard
          title="Export Downloads"
          value={stats.exportDownloads.toString()}
          subtitle="+12 this week"
          icon={<Download className="w-6 h-6" />}
          variant="supervisor"
          trend={{
            value: 12,
            label: 'this week',
            isPositive: true,
          }}
        />
      </div>

      {/* Report Generation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-5 border-l-4 border-[hsl(238,74%,59%)] hover:shadow-lg transition-all duration-200 cursor-pointer group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(238,74%,59%)] to-[hsl(271,81%,56%)] flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
              🎓
            </div>
            <div>
              <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] mb-1">
                Cohort Progress
              </h3>
              <p className="text-xs text-[hsl(220,9%,46%)]">
                Track student cohorts across semesters
              </p>
            </div>
          </div>
          <Button variant="bacc" size="sm" fullWidth>
            📊 Generate
          </Button>
        </Card>

        <Card className="p-5 border-l-4 border-[hsl(158,64%,52%)] hover:shadow-lg transition-all duration-200 cursor-pointer group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)] flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
              📝
            </div>
            <div>
              <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] mb-1">
                Completion Rate
              </h3>
              <p className="text-xs text-[hsl(220,9%,46%)]">
                Portfolio & submission analytics
              </p>
            </div>
          </div>
          <Button variant="bgrn" size="sm" fullWidth>
            📊 Generate
          </Button>
        </Card>

        <Card className="p-5 border-l-4 border-[hsl(271,81%,56%)] hover:shadow-lg transition-all duration-200 cursor-pointer group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(271,81%,56%)] to-[hsl(238,74%,59%)] flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
              🎯
            </div>
            <div>
              <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] mb-1">
                Portfolio Readiness
              </h3>
              <p className="text-xs text-[hsl(220,9%,46%)]">
                Graduation clearance status
              </p>
            </div>
          </div>
          <Button variant="bpur" size="sm" fullWidth>
            📊 Generate
          </Button>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <Card className="p-6 hover:shadow-md transition-all duration-200">
          <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] mb-6">
            Department Performance Overview
          </h3>

          <div className="space-y-5">
            {departments.map((dept: any, index: number) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: dept.color }}
                    />
                    <span className="text-sm font-semibold text-[hsl(222,84%,5%)]">
                      {dept.name}
                    </span>
                  </div>
                  <span
                    className="text-base font-bold"
                    style={{ color: dept.color }}
                  >
                    {dept.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-[hsl(214,32%,91%)] rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${dept.percentage}%`,
                      background: `linear-gradient(90deg, ${dept.color}, ${dept.color}dd)`,
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-4 border-t-2 border-[hsl(214,32%,91%)]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[hsl(271,81%,56%)]" />
                  <span className="text-sm font-bold text-[hsl(222,84%,5%)]">
                    Overall Institution
                  </span>
                </div>
                <span className="text-lg font-bold text-[hsl(271,81%,56%)]">
                  {stats.completionRate}%
                </span>
              </div>
              <div className="h-2.5 bg-[hsl(214,32%,91%)] rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${stats.completionRate}%`,
                    background: 'linear-gradient(90deg, hsl(271,81%,56%), hsl(271,81%,70%))',
                  }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Exports */}
        <Card className="p-6">
          <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] mb-5">
            Recent Report Exports
          </h3>

          <div className="space-y-3">
            {recentExports.map((report: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[hsl(240,20%,98%)] border border-[hsl(214,32%,91%)] rounded-xl hover:border-[hsl(238,74%,59%)] hover:bg-white transition-all duration-200 cursor-pointer group"
              >
                <span className="text-sm font-semibold text-[hsl(222,84%,5%)]">
                  {report.icon} {report.name}
                </span>
                <button className="text-sm font-semibold text-[hsl(238,74%,59%)] hover:text-[hsl(238,74%,54%)] transition-colors flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
