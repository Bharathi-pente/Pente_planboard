import { KPICard } from '@/components/shared'
import { useSupervisorDashboardData } from '../hooks/use-supervisor-dashboard'
import { FileCheck, AlertTriangle, CheckCircle, Users, TrendingUp } from 'lucide-react'
import { RecentPortfolioReviews } from './recent-portfolio-reviews'
import { DepartmentOverview } from './department-overview'
import { SupervisorDashboardHeader } from './supervisor-dashboard-header'

export function SupervisorDashboard() {
  const { data, isLoading } = useSupervisorDashboardData()

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[hsl(0,72%,51%)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[hsl(220,9%,46%)]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const { stats, recentReviews, departments } = data

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <SupervisorDashboardHeader />

      {/* Top Stats Cards (5 Cards in 1 Row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
        <KPICard
          title="Total Students"
          value={stats.totalStudents.toString()}
          subtitle={`${stats.totalBatches} Batches`}
          icon={<Users className="w-6 h-6" />}
          variant="student"
          trend={{
            value: 12,
            label: 'vs last semester',
            isPositive: true,
          }}
        />

        <KPICard
          title="Pending Reviews"
          value={stats.pendingReviews.toString()}
          subtitle="Action Required"
          icon={<FileCheck className="w-6 h-6" />}
          variant="faculty"
          trend={{
            value: 5,
            label: 'since yesterday',
            isPositive: false,
          }}
        />

        <KPICard
          title="Escalations"
          value={stats.criticalEscalations.toString()}
          subtitle="Requires decision"
          icon={<AlertTriangle className="w-6 h-6" />}
          variant="supervisor"
        />

        <KPICard
          title="Graduation Clearance"
          value={stats.graduationClearance.toString()}
          subtitle="Ready for final review"
          icon={<CheckCircle className="w-6 h-6" />}
          variant="faculty"
        />

        <KPICard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          subtitle="+5% improvement"
          icon={<TrendingUp className="w-6 h-6" />}
          variant="student"
          trend={{
            value: 5,
            label: 'vs last quarter',
            isPositive: true,
          }}
        />
      </div>

      {/* Main Content: 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
        {/* Left Column - Recent Portfolio Reviews */}
        <div className="space-y-6">
          <RecentPortfolioReviews reviews={recentReviews} />
        </div>

        {/* Right Column - Department Overview */}
        <div className="space-y-6">
          <DepartmentOverview departments={departments} />
        </div>
      </div>
    </div>
  )
}
