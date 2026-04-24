import { Progress } from '@/components/ui'

interface PortfolioProgressProps {
  data: {
    completion: number
    target: number
    completedItems: number
    inProgress: number
    breakdown: {
      curriculumActivities: number
      projects: number
      eventsAndCertificates: number
    }
    totalRequired: number
  }
}

export function PortfolioProgressCard({ data }: PortfolioProgressProps) {
  return (
    <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] p-6 shadow-sm">
      <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] mb-4">Portfolio Progress</h3>

      {/* Completion Circle or Number */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-4xl font-bold text-[hsl(271,81%,56%)] mb-1">{data.completion}%</div>
          <p className="text-xs text-[hsl(220,9%,46%)]">
            Target: {data.target}% for graduation clearance
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <Progress value={data.completion} variant="student" className="h-3" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-[hsl(214,32%,91%)]">
        <div>
          <div className="text-xl font-bold text-[hsl(158,64%,52%)]">{data.completedItems}</div>
          <p className="text-xs text-[hsl(220,9%,46%)]">Completed Items</p>
        </div>
        <div>
          <div className="text-xl font-bold text-[hsl(38,92%,50%)]">{data.inProgress}</div>
          <p className="text-xs text-[hsl(220,9%,46%)]">In Progress</p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider mb-2">
          Breakdown
        </h4>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[hsl(220,9%,46%)]">Curriculum Activities</span>
          <span className="font-semibold text-[hsl(222,84%,5%)]">{data.breakdown.curriculumActivities}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[hsl(220,9%,46%)]">Projects</span>
          <span className="font-semibold text-[hsl(222,84%,5%)]">{data.breakdown.projects}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[hsl(220,9%,46%)]">Events & Certificates</span>
          <span className="font-semibold text-[hsl(222,84%,5%)]">{data.breakdown.eventsAndCertificates}</span>
        </div>
        <div className="flex items-center justify-between text-sm pt-2 border-t border-[hsl(214,32%,91%)]">
          <span className="font-semibold text-[hsl(222,84%,5%)]">Total Required</span>
          <span className="font-bold text-[hsl(238,74%,59%)]">{data.totalRequired}</span>
        </div>
      </div>
    </div>
  )
}
