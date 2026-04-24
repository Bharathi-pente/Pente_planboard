import * as React from 'react'
import { Filter } from 'lucide-react'
import { Badge } from '@/components/ui'

export interface PlanboardFilters {
  year: string
  semester: string
  status: string
  subject: string
}

interface FiltersProps {
  filters: PlanboardFilters
  onFilterChange: (filters: PlanboardFilters) => void
}

export function Filters({ filters, onFilterChange }: FiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const years = ['All Years', 'First Year', 'Second Year', 'Third Year', 'Fourth Year']
  const semesters = ['All Semesters', 'Semester 1', 'Semester 2']
  const statuses = ['All Status', 'Pending', 'In Progress', 'Completed', 'Review']
  const subjects = [
    'All Subjects',
    'Mathematics',
    'Computer Science',
    'Database Systems',
    'Web Technologies',
    'Software Engineering',
  ]

  const handleFilterChange = (key: keyof PlanboardFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const activeFilterCount = Object.values(filters).filter(
    (v) => v && !v.startsWith('All')
  ).length

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[hsl(214,32%,91%)] bg-white hover:bg-[hsl(240,20%,96%)] transition-colors"
      >
        <Filter className="w-4 h-4 text-[hsl(220,9%,46%)]" />
        <span className="text-sm font-medium text-[hsl(222,84%,5%)]">Filters</span>
        {activeFilterCount > 0 && (
          <Badge variant="student" size="sm">
            {activeFilterCount}
          </Badge>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-[hsl(214,32%,91%)] shadow-lg z-50 animate-fadeIn">
            <div className="p-4 border-b border-[hsl(214,32%,91%)]">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[hsl(222,84%,5%)]">
                  Filter Activities
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() =>
                      onFilterChange({
                        year: 'All Years',
                        semester: 'All Semesters',
                        status: 'All Status',
                        subject: 'All Subjects',
                      })
                    }
                    className="text-xs text-[hsl(238,74%,59%)] hover:text-[hsl(238,74%,54%)] font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
              {/* Year Filter */}
              <div>
                <label className="block text-xs font-medium text-[hsl(220,9%,46%)] mb-2 uppercase tracking-wider">
                  Academic Year
                </label>
                <select
                  value={filters.year}
                  onChange={(e) => handleFilterChange('year', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-sm text-[hsl(222,84%,5%)] focus:outline-none focus:ring-2 focus:ring-[hsl(238,74%,59%)] focus:border-transparent"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Semester Filter */}
              <div>
                <label className="block text-xs font-medium text-[hsl(220,9%,46%)] mb-2 uppercase tracking-wider">
                  Semester
                </label>
                <select
                  value={filters.semester}
                  onChange={(e) => handleFilterChange('semester', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-sm text-[hsl(222,84%,5%)] focus:outline-none focus:ring-2 focus:ring-[hsl(238,74%,59%)] focus:border-transparent"
                >
                  {semesters.map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-xs font-medium text-[hsl(220,9%,46%)] mb-2 uppercase tracking-wider">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-sm text-[hsl(222,84%,5%)] focus:outline-none focus:ring-2 focus:ring-[hsl(238,74%,59%)] focus:border-transparent"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Filter */}
              <div>
                <label className="block text-xs font-medium text-[hsl(220,9%,46%)] mb-2 uppercase tracking-wider">
                  Subject
                </label>
                <select
                  value={filters.subject}
                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-sm text-[hsl(222,84%,5%)] focus:outline-none focus:ring-2 focus:ring-[hsl(238,74%,59%)] focus:border-transparent"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
