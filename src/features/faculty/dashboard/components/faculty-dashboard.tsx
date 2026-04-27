import { FileText, Paperclip, Users, TrendingUp } from 'lucide-react'
import { useFacultyDashboard } from '../hooks/use-faculty-dashboard'
import { KPICard, LoadingSpinner } from '@/components/shared'
import { RecentActivitiesTable } from './recent-activities-table'
import { ClassPerformanceChart } from './class-performance-chart'
import { FacultyDeadlines } from './faculty-deadlines'
import { FacultySchedule } from './faculty-schedule'
import { FacultyDashboardHeader } from './faculty-dashboard-header'

export function FacultyDashboard() {
  const {
    stats,
    recentActivities,
    classPerformanceChartData,
    upcomingDeadlines,
    weeklySchedule,
    isLoading,
  } = useFacultyDashboard()

  if (isLoading || !stats || !classPerformanceChartData) {
    return <LoadingSpinner message="Loading faculty dashboard..." />
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <FacultyDashboardHeader />

      {/* Top Stats Cards (4 Cards in 1 Row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Pending Submissions"
          value={stats.pendingSubmissions}
          subtitle="Awaiting review"
          icon={<FileText className="w-6 h-6" />}
          variant="faculty"
        />
        <KPICard
          title="Evidence Validations"
          value={stats.evidenceValidations}
          subtitle="Needs validation"
          icon={<Paperclip className="w-6 h-6" />}
          variant="supervisor"
        />
        <KPICard
          title="Total Classes"
          value={stats.totalClasses}
          subtitle={`${stats.totalStudents} total students`}
          icon={<Users className="w-6 h-6" />}
          variant="faculty"
        />
        <KPICard
          title="Class Completion Rate"
          value={`${stats.classCompletionRate}%`}
          subtitle="Great progress!"
          icon={<TrendingUp className="w-6 h-6" />}
          variant="faculty"
          trend={{
            value: stats.completionIncrease,
            label: 'vs last month',
            isPositive: true,
          }}
        />
      </div>

      {/* Main Content: Top Row - Class Performance and Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-[68%_30%] gap-6 mb-6">
        {/* Class Performance Chart */}
        <div className="flex-1">
          <ClassPerformanceChart
            monthlyData={classPerformanceChartData.monthly}
            yearlyData={classPerformanceChartData.yearly}
          />
        </div>

        {/* Upcoming Deadlines - Same width as Weekly Schedule */}
        <div className="flex-1">
          <FacultyDeadlines deadlines={upcomingDeadlines} />
        </div>
      </div>

      {/* Bottom Row - Recent Submissions and Weekly Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-[68%_30%] gap-6">
        {/* Recent Submissions */}
        <div className="flex-1">
          <RecentActivitiesTable activities={recentActivities} />
        </div>

        {/* Weekly Schedule */}
        {weeklySchedule && (
          <div className="flex-1">
            <FacultySchedule schedule={weeklySchedule} />
          </div>
        )}
      </div>
    </div>
  )
}
