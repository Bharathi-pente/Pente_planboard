import { Archive, FileText, LayoutDashboard } from 'lucide-react'
import { KPICard } from '@/components/shared'

interface LockerStatsProps {
  stats: {
    verified: number
    pending: number
    total: number
    progressPercentage: number
  }
}

export function LockerStats({ stats }: LockerStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KPICard
        title="Verified Documents"
        value={stats.verified}
        subtitle={`${stats.progressPercentage}% of total`}
        icon={<Archive className="w-6 h-6" />}
        variant="faculty"
        trend={{
          value: 15,
          label: 'vs last month',
          isPositive: true,
        }}
      />

      <KPICard
        title="Pending Verification"
        value={stats.pending}
        subtitle="Awaiting approval"
        icon={<FileText className="w-6 h-6" />}
        variant="supervisor"
      />

      <KPICard
        title="Total Items"
        value={stats.total}
        subtitle="In your locker"
        icon={<LayoutDashboard className="w-6 h-6" />}
        variant="student"
      />
    </div>
  )
}
