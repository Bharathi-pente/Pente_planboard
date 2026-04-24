import * as React from 'react'
import { PageHeader } from '@/components/layout'
import { Button, Progress } from '@/components/ui'
import { Plus, Search, Filter as FilterIcon } from 'lucide-react'
import { useLocker } from '../hooks/use-locker'
import { LockerStats } from './locker-stats'
import { LockerTable } from './locker-table'
import { LockerItemModal } from './locker-item-modal'

export function DigitalLocker() {
  const { stats, items, isLoading, getItemDetails } = useLocker()
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState<any>(null)
  const [modalOpen, setModalOpen] = React.useState(false)

  const handleViewItem = async (item: any) => {
    const details = await getItemDetails(item.name)
    setSelectedItem(details || item)
    setModalOpen(true)
  }

  const handleDownloadItem = (item: any) => {
    console.log('Download item:', item)
    // In real app, this would trigger download
  }

  const handleShareItem = (item: any) => {
    console.log('Share item:', item)
    // In real app, this would open share dialog
  }

  if (isLoading || !stats) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[hsl(238,74%,59%)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[hsl(220,9%,46%)]">Loading digital locker...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div>
        <PageHeader
          title="Digital Locker"
          description="Verified credentials and achievements in one secure place"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Digital Locker' },
          ]}
          actions={
            <>
              <Button variant="bgo" size="md">
                <FilterIcon className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="bacc" size="md">
                <Plus className="w-4 h-4" />
                Add Document
              </Button>
            </>
          }
        />

        {/* KPI Cards */}
        <div className="mb-6">
          <LockerStats stats={stats} />
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-[hsl(222,84%,5%)] mb-1">
                Verification Progress
              </h3>
              <p className="text-sm text-[hsl(220,9%,46%)]">
                {stats.verified} of {stats.total} documents verified
              </p>
            </div>
            <span className="text-3xl font-bold text-[hsl(238,74%,59%)]">
              {stats.progressPercentage}%
            </span>
          </div>
          <Progress value={stats.progressPercentage} variant="student" />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(220,9%,46%)]" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-sm text-[hsl(222,84%,5%)] placeholder:text-[hsl(220,9%,46%)] focus:outline-none focus:ring-2 focus:ring-[hsl(238,74%,59%)] focus:border-transparent"
            />
          </div>
        </div>

        {/* Locker Table */}
        <LockerTable
          data={items.filter((item: any) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          onView={handleViewItem}
          onDownload={handleDownloadItem}
          onShare={handleShareItem}
        />
      </div>

      {/* Modal */}
      <LockerItemModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setSelectedItem(null)
        }}
        item={selectedItem}
      />
    </>
  )
}
