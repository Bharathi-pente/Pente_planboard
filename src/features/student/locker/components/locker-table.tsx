import * as React from 'react'
import { MoreVertical, Eye, Download, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui'
import { DataTable, type Column } from '@/components/shared'
import { formatDate } from '@/utils'

interface LockerItem {
  id: number
  name: string
  type: string
  category: string
  verifiedDate: string
  status: string
  issuedBy?: string
}

interface LockerTableProps {
  data: LockerItem[]
  onView: (item: LockerItem) => void
  onDownload: (item: LockerItem) => void
  onShare: (item: LockerItem) => void
}

export function LockerTable({ data, onView, onDownload, onShare }: LockerTableProps) {
  const [openDropdownId, setOpenDropdownId] = React.useState<number | null>(null)

  const ActionMenu = ({ item }: { item: LockerItem }) => {
    const isOpen = openDropdownId === item.id

    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setOpenDropdownId(isOpen ? null : item.id)
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
                  onView(item)
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
                  onDownload(item)
                  setOpenDropdownId(null)
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[hsl(222,84%,5%)] hover:bg-[hsl(240,20%,96%)] transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onShare(item)
                  setOpenDropdownId(null)
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[hsl(222,84%,5%)] hover:bg-[hsl(240,20%,96%)] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Share
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Certificate':
        return '🏆'
      case 'Project':
        return '💼'
      case 'Test':
        return '📝'
      default:
        return '📄'
    }
  }

  const columns: Column<LockerItem>[] = [
    {
      key: 'name',
      header: 'Document Name',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <span className="text-2xl flex-shrink-0">{getTypeIcon(item.type)}</span>
          <div>
            <p className="font-medium text-[hsl(222,84%,5%)]">{item.name}</p>
            <p className="text-xs text-[hsl(220,9%,46%)] mt-0.5">{item.type}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (item) => (
        <Badge variant="student" size="md">
          {item.category}
        </Badge>
      ),
      width: '150px',
    },
    {
      key: 'verifiedDate',
      header: 'Verified Date',
      sortable: true,
      render: (item) => <span className="text-sm">{formatDate(item.verifiedDate)}</span>,
      width: '150px',
    },
    {
      key: 'issuedBy',
      header: 'Issued By',
      render: (item) => (
        <span className="text-sm text-[hsl(220,9%,46%)]">
          {item.issuedBy || '—'}
        </span>
      ),
      width: '180px',
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (item) => (
        <Badge variant="approved" size="md">
          {item.status}
        </Badge>
      ),
      width: '100px',
    },
    {
      key: 'actions',
      header: '',
      render: (item) => <ActionMenu item={item} />,
      width: '60px',
    },
  ]

  return (
    <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)]">
      <DataTable
        data={data}
        columns={columns}
        onRowClick={(item) => onView(item)}
        emptyMessage="No verified items in your locker yet"
      />
    </div>
  )
}
