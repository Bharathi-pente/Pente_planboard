import * as React from 'react'
import { Filter } from 'lucide-react'
import { Badge } from '@/components/ui'

export interface LockerFilters {
  status: string
  category: string
}

interface LockerFiltersProps {
  filters: LockerFilters
  onFilterChange: (filters: LockerFilters) => void
}

export function LockerFilters({ filters, onFilterChange }: LockerFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const statuses = ['All Status', 'Verified', 'Pending', 'Expired']
  const categories = ['All Categories', 'Academic', 'Extracurricular', 'Certification', 'Project', 'Test']

  const handleFilterChange = (key: keyof LockerFilters, value: string) => {
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
                  Filter Documents
                </h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() =>
                      onFilterChange({
                        status: 'All Status',
                        category: 'All Categories',
                      })
                    }
                    className="text-xs text-[hsl(238,74%,59%)] hover:text-[hsl(238,74%,54%)] font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 space-y-4">
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

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-medium text-[hsl(220,9%,46%)] mb-2 uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-sm text-[hsl(222,84%,5%)] focus:outline-none focus:ring-2 focus:ring-[hsl(238,74%,59%)] focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
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