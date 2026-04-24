import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 1
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-end gap-1.5 px-6 py-3 border-t border-[hsl(214,32%,91%)]">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[hsl(220,9%,46%)] bg-white border border-[hsl(214,32%,91%)] rounded-lg hover:bg-[hsl(240,20%,98%)] hover:text-[hsl(238,74%,59%)] hover:border-[hsl(238,74%,59%)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`min-w-[32px] px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
              page === currentPage
                ? 'bg-gradient-to-br from-[hsl(238,74%,59%)] to-[hsl(271,81%,56%)] text-white shadow-md'
                : page === '...'
                ? 'cursor-default text-[hsl(220,9%,46%)] bg-transparent border-0'
                : 'text-[hsl(220,9%,46%)] bg-white border border-[hsl(214,32%,91%)] hover:bg-[hsl(238,74%,97%)] hover:text-[hsl(238,74%,59%)] hover:border-[hsl(238,74%,59%)]'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[hsl(220,9%,46%)] bg-white border border-[hsl(214,32%,91%)] rounded-lg hover:bg-[hsl(240,20%,98%)] hover:text-[hsl(238,74%,59%)] hover:border-[hsl(238,74%,59%)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}