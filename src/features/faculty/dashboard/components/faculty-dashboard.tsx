import { FileText, Paperclip, Users, TrendingUp } from 'lucide-react'
import { useFacultyDashboard } from '../hooks/use-faculty-dashboard'
import { KPICard, LoadingSpinner } from '@/components/shared'
import { RecentActivitiesTable } from './recent-activities-table'
import { ClassPerformanceCards } from './class-performance-cards'
import { FacultyDeadlines } from './faculty-deadlines'
import { FacultySchedule } from './faculty-schedule'
import { FacultyDashboardHeader } from './faculty-dashboard-header'

export function FacultyDashboard() {
  const {
    stats,
    recentActivities,
    classPerformance,
    upcomingDeadlines,
    weeklySchedule,
    isLoading,
  } = useFacultyDashboard()

  if (isLoading || !stats) {
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

      {/* Main Content: 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Recent Activities Table */}
          <RecentActivitiesTable activities={recentActivities} />

          {/* Class Performance Cards */}
          <ClassPerformanceCards classes={classPerformance} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <FacultyDeadlines deadlines={upcomingDeadlines} />

          {/* Weekly Schedule */}
          {weeklySchedule && <FacultySchedule schedule={weeklySchedule} />}
        </div>
      </div>
    </div>
  )
}
