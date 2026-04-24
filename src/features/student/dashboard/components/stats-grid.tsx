import { Upload, Clock, CheckCircle, TrendingUp } from 'lucide-react'
import { KPICard } from '@/components/shared'

interface StatsGridProps {
  stats: {
    totalActivities: number
    completedActivities: number
    pendingSubmissions: number
    underReview: number
    verifiedDocuments: number
    attendanceRate: number
  }
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Pending Submissions"
        value={stats.pendingSubmissions}
        subtitle="Complete to improve portfolio"
        icon={<Upload className="w-6 h-6" />}
        variant="supervisor"
      />

      <KPICard
        title="Under Review"
        value={stats.underReview}
        subtitle="Awaiting faculty feedback"
        icon={<Clock className="w-6 h-6" />}
        variant="student"
      />

      <KPICard
        title="Approved Items"
        value={stats.completedActivities}
        subtitle="Great progress!"
        icon={<CheckCircle className="w-6 h-6" />}
        variant="faculty"
        trend={{
          value: 0,
          label: '',
          isPositive: true,
        }}
      />

      <KPICard
        title="Attendance Rate"
        value={`${stats.attendanceRate}%` as any}
        subtitle={`+5% increase`}
        icon={<TrendingUp className="w-6 h-6" />}
        variant="student"
        trend={{
          value: 5,
          label: 'vs last month',
          isPositive: true,
        }}
      />
    </div>
  )
}
