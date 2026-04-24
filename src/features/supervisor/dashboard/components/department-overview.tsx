import { Card } from '@/components/ui'

interface Department {
  name: string
  color: string
  percentage: number
}

interface DepartmentOverviewProps {
  departments: Department[]
}

export function DepartmentOverview({ departments }: DepartmentOverviewProps) {
  const overallPercentage = Math.round(
    departments.reduce((sum, dept) => sum + dept.percentage, 0) / departments.length
  )

  return (
    <Card className="p-6">
      <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] mb-6">
        Department Performance Overview
      </h3>

      <div className="space-y-5">
        {departments.map((dept, index) => (
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
              {overallPercentage}%
            </span>
          </div>
          <div className="h-2.5 bg-[hsl(214,32%,91%)] rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${overallPercentage}%`,
                background: 'linear-gradient(90deg, hsl(271,81%,56%), hsl(271,81%,70%))',
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
