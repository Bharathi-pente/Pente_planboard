import * as React from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Column<T> {
  key: string
  header: string
  sortable?: boolean
  render?: (item: T) => React.ReactNode
  className?: string
  width?: string
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (item: T) => void
  className?: string
  emptyMessage?: string
}

type SortDirection = 'asc' | 'desc' | null

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  className,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)

  const handleSort = (columnKey: string) => {
    const column = columns.find((col) => col.key === columnKey)
    if (!column?.sortable) return

    if (sortKey === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortKey(null)
        setSortDirection(null)
      }
    } else {
      setSortKey(columnKey)
      setSortDirection('asc')
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortDirection) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortKey]
      const bValue = b[sortKey]

      if (aValue === bValue) return 0

      const comparison = aValue > bValue ? 1 : -1
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [data, sortKey, sortDirection])

  const getSortIcon = (columnKey: string) => {
    if (sortKey !== columnKey) {
      return <ChevronsUpDown className="w-4 h-4 text-[hsl(220,9%,66%)]" />
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-[hsl(238,74%,59%)]" />
    ) : (
      <ChevronDown className="w-4 h-4 text-[hsl(238,74%,59%)]" />
    )
  }

  return (
    <div className={cn('w-full overflow-x-auto custom-scrollbar', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[hsl(214,32%,91%)]">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'text-left py-3 px-4 text-xs font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider',
                  column.sortable && 'cursor-pointer hover:text-[hsl(222,84%,5%)]',
                  column.className
                )}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {column.sortable && getSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-12 text-center text-sm text-[hsl(220,9%,46%)]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((item, index) => (
              <tr
                key={index}
                className={cn(
                  'border-b border-[hsl(214,32%,91%)] transition-colors',
                  onRowClick &&
                    'cursor-pointer hover:bg-[hsl(240,20%,96%)]'
                )}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      'py-3 px-4 text-sm text-[hsl(222,84%,5%)]',
                      column.className
                    )}
                  >
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
