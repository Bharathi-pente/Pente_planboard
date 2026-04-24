import * as React from 'react'
import { MoreVertical, Eye, Upload, Download } from 'lucide-react'
import { Badge } from '@/components/ui'
import { DataTable, type Column } from '@/components/shared'
import { formatDate } from '@/utils'
import { getStatusBadgeVariant } from '@/components/ui/badge'

interface Activity {
  id: number
  title: string
  subject?: string
  submittedDate?: string
  status: string
  grade?: string
  faculty?: string
  category?: string
  date?: string
  certificate?: boolean
  hours?: number
  rank?: string
  dueDate?: string
  teamSize?: number
}

interface ActivitiesTableProps {
  data: Activity[]
  type: 'research' | 'extracurricular' | 'assignments' | 'projects'
  onView: (activity: Activity) => void
  onSubmit: (activity: Activity) => void
  onExport: (activity: Activity) => void
}

export function ActivitiesTable({
  data,
  type,
  onView,
  onSubmit,
  onExport,
}: ActivitiesTableProps) {
  const [openDropdownId, setOpenDropdownId] = React.useState<number | null>(null)

  const ActionMenu = ({ activity }: { activity: Activity }) => {
    const isOpen = openDropdownId === activity.id

    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setOpenDropdownId(isOpen ? null : activity.id)
          }}
          className="p-1.5 hover:bg-[hsl(240,20%,96%)] rounded-lg transition-colors"
        >
          <MoreVertical className="w-4 h-4 text-[hsl(220,9%,46%)]" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setOpenDropdownId(null)}
            />
            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg border border-[hsl(214,32%,91%)] shadow-lg z-40 py-1 animate-fadeIn">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onView(activity)
                  setOpenDropdownId(null)
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[hsl(222,84%,5%)] hover:bg-[hsl(240,20%,96%)] transition-colors"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onSubmit(activity)
                  setOpenDropdownId(null)
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[hsl(222,84%,5%)] hover:bg-[hsl(240,20%,96%)] transition-colors"
              >
                <Upload className="w-4 h-4" />
                {activity.status === 'approved' ? 'Resubmit' : 'Submit'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onExport(activity)
                  setOpenDropdownId(null)
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[hsl(222,84%,5%)] hover:bg-[hsl(240,20%,96%)] transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  const getColumns = (): Column<Activity>[] => {
    switch (type) {
      case 'research':
        return [
          {
            key: 'title',
            header: 'Title',
            sortable: true,
            render: (item) => (
              <div>
                <p className="font-medium text-[hsl(222,84%,5%)]">{item.title}</p>
                <p className="text-xs text-[hsl(220,9%,46%)] mt-0.5">{item.subject}</p>
              </div>
            ),
          },
          {
            key: 'submittedDate',
            header: 'Submitted',
            sortable: true,
            render: (item) => (
              <span className="text-sm">{formatDate(item.submittedDate || '')}</span>
            ),
            width: '150px',
          },
          {
            key: 'status',
            header: 'Status',
            sortable: true,
            render: (item) => (
              <Badge variant={getStatusBadgeVariant(item.status as any)} size="md">
                {item.status}
              </Badge>
            ),
            width: '120px',
          },
          {
            key: 'grade',
            header: 'Grade',
            render: (item) => (
              <span className="font-medium text-[hsl(158,64%,52%)]">
                {item.grade || '—'}
              </span>
            ),
            width: '80px',
          },
          {
            key: 'faculty',
            header: 'Faculty',
            render: (item) => (
              <span className="text-sm text-[hsl(220,9%,46%)]">{item.faculty}</span>
            ),
            width: '180px',
          },
          {
            key: 'actions',
            header: '',
            render: (item) => <ActionMenu activity={item} />,
            width: '60px',
          },
        ]

      case 'extracurricular':
        return [
          {
            key: 'title',
            header: 'Title',
            sortable: true,
            render: (item) => (
              <div>
                <p className="font-medium text-[hsl(222,84%,5%)]">{item.title}</p>
                <p className="text-xs text-[hsl(220,9%,46%)] mt-0.5">{item.category}</p>
              </div>
            ),
          },
          {
            key: 'date',
            header: 'Date',
            sortable: true,
            render: (item) => (
              <span className="text-sm">{formatDate(item.date || '')}</span>
            ),
            width: '150px',
          },
          {
            key: 'status',
            header: 'Status',
            sortable: true,
            render: (item) => (
              <Badge variant={getStatusBadgeVariant(item.status as any)} size="md">
                {item.status}
              </Badge>
            ),
            width: '120px',
          },
          {
            key: 'certificate',
            header: 'Certificate',
            render: (item) => (
              <span className="text-sm">
                {item.certificate ? '✓ Yes' : item.hours ? `${item.hours}h` : item.rank || '—'}
              </span>
            ),
            width: '120px',
          },
          {
            key: 'actions',
            header: '',
            render: (item) => <ActionMenu activity={item} />,
            width: '60px',
          },
        ]

      case 'assignments':
        return [
          {
            key: 'title',
            header: 'Assignment',
            sortable: true,
            render: (item) => (
              <div>
                <p className="font-medium text-[hsl(222,84%,5%)]">{item.title}</p>
                <p className="text-xs text-[hsl(220,9%,46%)] mt-0.5">{item.subject}</p>
              </div>
            ),
          },
          {
            key: 'submittedDate',
            header: 'Submitted',
            sortable: true,
            render: (item) => (
              <span className="text-sm">{formatDate(item.submittedDate || '')}</span>
            ),
            width: '150px',
          },
          {
            key: 'dueDate',
            header: 'Due Date',
            sortable: true,
            render: (item) => (
              <span className="text-sm">{formatDate(item.dueDate || '')}</span>
            ),
            width: '150px',
          },
          {
            key: 'status',
            header: 'Status',
            sortable: true,
            render: (item) => (
              <Badge variant={getStatusBadgeVariant(item.status as any)} size="md">
                {item.status}
              </Badge>
            ),
            width: '120px',
          },
          {
            key: 'grade',
            header: 'Grade',
            render: (item) => (
              <span className="font-medium text-[hsl(158,64%,52%)]">
                {item.grade || '—'}
              </span>
            ),
            width: '80px',
          },
          {
            key: 'actions',
            header: '',
            render: (item) => <ActionMenu activity={item} />,
            width: '60px',
          },
        ]

      case 'projects':
        return [
          {
            key: 'title',
            header: 'Project',
            sortable: true,
            render: (item) => (
              <div>
                <p className="font-medium text-[hsl(222,84%,5%)]">{item.title}</p>
                <p className="text-xs text-[hsl(220,9%,46%)] mt-0.5">
                  {item.subject} • Team of {item.teamSize}
                </p>
              </div>
            ),
          },
          {
            key: 'submittedDate',
            header: 'Submitted',
            sortable: true,
            render: (item) => (
              <span className="text-sm">{formatDate(item.submittedDate || '')}</span>
            ),
            width: '150px',
          },
          {
            key: 'status',
            header: 'Status',
            sortable: true,
            render: (item) => (
              <Badge variant={getStatusBadgeVariant(item.status as any)} size="md">
                {item.status}
              </Badge>
            ),
            width: '120px',
          },
          {
            key: 'grade',
            header: 'Grade',
            render: (item) => (
              <span className="font-medium text-[hsl(158,64%,52%)]">
                {item.grade || '—'}
              </span>
            ),
            width: '80px',
          },
          {
            key: 'actions',
            header: '',
            render: (item) => <ActionMenu activity={item} />,
            width: '60px',
          },
        ]

      default:
        return []
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)]">
      <DataTable
        data={data}
        columns={getColumns()}
        onRowClick={(activity) => onView(activity)}
        emptyMessage={`No ${type} activities yet`}
      />
    </div>
  )
}
