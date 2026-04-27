import * as React from 'react'
import { PageHeader } from '@/components/layout'
import { Search } from 'lucide-react'
import { useLocker } from '../hooks/use-locker'
import { LockerStats } from './locker-stats'
import { LockerTable } from './locker-table'
import { LockerItemModal } from './locker-item-modal'
import { LockerFilters, type LockerFilters as LockerFiltersType } from './locker-filters'

export function DigitalLocker() {
  const { stats, items, isLoading, getItemDetails } = useLocker()
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState<any>(null)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [filters, setFilters] = React.useState<LockerFiltersType>({
    status: 'All Status',
    category: 'All Categories',
  })
  const [fromDate, setFromDate] = React.useState('')
  const [toDate, setToDate] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 10

  // Filter and search logic
  const filteredItems = React.useMemo(() => {
    return items.filter((item: any) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (!item.name.toLowerCase().includes(query) &&
            !item.type.toLowerCase().includes(query) &&
            !item.category.toLowerCase().includes(query)) {
          return false
        }
      }

      // Status filter
      if (filters.status !== 'All Status') {
        if (item.status.toLowerCase() !== filters.status.toLowerCase()) return false
      }

      // Category filter
      if (filters.category !== 'All Categories') {
        if (item.category.toLowerCase() !== filters.category.toLowerCase()) return false
      }

      // Date range filter
      if (fromDate || toDate) {
        const itemDate = new Date(item.verifiedDate)
        
        if (fromDate) {
          const fromDateObj = new Date(fromDate)
          if (itemDate < fromDateObj) return false
        }
        
        if (toDate) {
          const toDateObj = new Date(toDate)
          // Set to end of day for inclusive filtering
          toDateObj.setHours(23, 59, 59, 999)
          if (itemDate > toDateObj) return false
        }
      }

      return true
    })
  }, [items, searchQuery, filters, fromDate, toDate])

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const paginatedItems = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredItems.slice(startIndex, endIndex)
  }, [filteredItems, currentPage, itemsPerPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filters, fromDate, toDate])

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
      <div className="space-y-6">
        <PageHeader
          title="Digital Locker"
          description="Verified credentials and achievements in one secure place"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Digital Locker' },
          ]}
          actions={
            <div className="flex items-end gap-4">
              <div>
                <label className="block text-xs font-medium text-[hsl(220,9%,46%)] mb-1 uppercase tracking-wider">
                  From Date
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="h-10 px-3 text-sm rounded-lg border border-[hsl(214,32%,91%)] bg-white text-[hsl(222,84%,5%)] focus:outline-none focus:ring-2 focus:ring-[hsl(238,74%,59%)] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[hsl(220,9%,46%)] mb-1 uppercase tracking-wider">
                  To Date
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="h-10 px-3 text-sm rounded-lg border border-[hsl(214,32%,91%)] bg-white text-[hsl(222,84%,5%)] focus:outline-none focus:ring-2 focus:ring-[hsl(238,74%,59%)] focus:border-transparent"
                />
              </div>
              {(fromDate || toDate) && (
                <button
                  onClick={() => {
                    setFromDate('')
                    setToDate('')
                  }}
                  className="h-10 px-3 text-sm text-[hsl(238,74%,59%)] hover:text-[hsl(238,74%,54%)] font-medium border border-[hsl(238,74%,59%)] rounded-lg hover:bg-[hsl(238,94%,95%)] transition-colors"
                >
                  Clear Dates
                </button>
              )}
              <LockerFilters
                filters={filters}
                onFilterChange={setFilters}
              />
            </div>
          }
        />

        {/* KPI Cards */}
        <LockerStats stats={stats} />

        {/* Search Bar */}
        <div className="mb-6 flex justify-end">
          <div className="relative w-80">
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
          data={paginatedItems}
          onView={handleViewItem}
          onDownload={handleDownloadItem}
          onShare={handleShareItem}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
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
