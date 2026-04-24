import { CheckSquare, FileText, Archive, BarChart3 } from 'lucide-react'
import { useDashboardData } from '../hooks/use-dashboard-data'
import { DashboardHeader } from './dashboard-header'
import { KPICard } from '@/components/shared'
import { RecentSubmissionsTable } from './recent-submissions-table'
import { PortfolioProgressCard } from './portfolio-progress-card'
import { DigitalLockerCard } from './digital-locker-card'
import { AttendanceChart } from './attendance-chart'

export function StudentDashboard() {
  const {
    stats,
    recentSubmissions,
    portfolioProgress,
    digitalLockerSummary,
    attendanceData,
    isLoading,
  } = useDashboardData()

  if (isLoading || !stats || !portfolioProgress || !digitalLockerSummary || !attendanceData) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[hsl(238,74%,59%)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[hsl(220,9%,46%)]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <DashboardHeader />

      {/* Top Stats Cards (4 Cards in 1 Row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Pending Submissions"
          value={stats.pendingSubmissions}
          subtitle="Complete to improve portfolio"
          icon={<CheckSquare className="w-6 h-6" />}
          variant="student"
        />
        <KPICard
          title="Under Review"
          value={stats.underReview}
          subtitle="Awaiting faculty feedback"
          icon={<FileText className="w-6 h-6" />}
          variant="faculty"
        />
        <KPICard
          title="Approved Items"
          value={stats.approvedItems}
          subtitle="Great progress!"
          icon={<Archive className="w-6 h-6" />}
          variant="supervisor"
        />
        <KPICard
          title="Attendance Rate"
          value={`${stats.attendanceRate}%`}
          subtitle="vs last month"
          icon={<BarChart3 className="w-6 h-6" />}
          variant="student"
        />
      </div>

      {/* Main Content: 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[68%_30%] gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-3">
          {/* Attendance Chart - NEW at top */}
          <div className="min-h-[550px]">
            <AttendanceChart 
              monthlyData={attendanceData.monthly} 
              yearlyData={attendanceData.yearly}
            />
          </div>

          {/* Recent Submissions - MOVED to bottom */}
          <div className="flex-1">
            <RecentSubmissionsTable submissions={recentSubmissions} />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3">
          {/* Portfolio Progress Card */}
          <div className="min-h-[550px]">
            <PortfolioProgressCard data={portfolioProgress} />
          </div>

          {/* Digital Locker Summary */}
          <div className="flex-1">
            <DigitalLockerCard data={digitalLockerSummary} />
          </div>
        </div>
      </div>
    </div>
  )
}
