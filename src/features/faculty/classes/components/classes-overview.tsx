import { BarChart3 } from 'lucide-react'
import { Button, Card } from '@/components/ui'
import { mockClasses } from '@/data'

export function ClassesOverview() {
  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[hsl(222,84%,5%)] mb-2">
              Class Overview
            </h1>
            <p className="text-sm text-[hsl(220,9%,46%)]">
              {mockClasses.length} assigned classes · Semester 2 · 2026
            </p>
          </div>
          <Button variant="bgo" size="md">
            <BarChart3 className="w-4 h-4" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClasses.map((classInfo) => (
          <Card
            key={classInfo.id}
            className="p-6 hover:shadow-lg transition-all cursor-pointer"
            style={{ borderTop: `3px solid ${classInfo.color}` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${classInfo.color}15` }}
              >
                {classInfo.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-[hsl(222,84%,5%)]">
                  {classInfo.icon} {classInfo.subject} {classInfo.name}
                </h3>
                <p className="text-xs text-[hsl(220,9%,46%)]">
                  {classInfo.totalStudents} students · {classInfo.activeActivities} active
                  activities
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full h-2 bg-[hsl(240,20%,98%)] rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${classInfo.completionRate}%`,
                    background: classInfo.color,
                  }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-[hsl(220,9%,46%)]">
                  {classInfo.completionRate}% completion
                </span>
                <span className="text-xs text-[hsl(220,9%,46%)]">
                  Avg: {classInfo.avgGrade}%
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-[hsl(214,32%,91%)]">
              <div className="text-center">
                <div className="text-lg font-bold text-[hsl(222,84%,5%)]">
                  {classInfo.totalStudents}
                </div>
                <div className="text-xs text-[hsl(220,9%,46%)]">Students</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[hsl(222,84%,5%)]">
                  {classInfo.activeActivities}
                </div>
                <div className="text-xs text-[hsl(220,9%,46%)]">Activities</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="bgrn" size="sm" className="flex-1">
                View Activities
              </Button>
              <Button variant="bgo" size="sm" className="flex-1">
                Manage
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
