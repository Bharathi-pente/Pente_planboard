import * as React from 'react'
import { PageHeader } from '@/components/layout'
import { Search, FileText, CheckSquare, Clock, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { KPICard } from '@/components/shared'
import { useActivities } from '../hooks/use-activities'
import { ActivitiesTable } from './activities-table'
import { SubmissionModal } from './submission-modal'
import { ActivityDetailModal } from './activity-detail-modal'
import { ActivitiesFilters, type ActivitiesFilters as ActivitiesFiltersType } from './activities-filters'

type TabType = 'research' | 'extracurricular' | 'assignments' | 'projects'

export function ActivitiesPage() {
  const {
    researchPapers,
    extraCurricular,
    assignments,
    projects,
    isLoading,
    getActivityDetails,
  } = useActivities()

  const [activeTab, setActiveTab] = React.useState<TabType>('assignments')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [submissionModalOpen, setSubmissionModalOpen] = React.useState(false)
  const [detailModalOpen, setDetailModalOpen] = React.useState(false)
  const [selectedActivity, setSelectedActivity] = React.useState<any>(null)
  const [filters, setFilters] = React.useState<ActivitiesFiltersType>({
    status: 'All Status',
    grade: 'All Grades',
  })
  const [fromDate, setFromDate] = React.useState('')
  const [toDate, setToDate] = React.useState('')

  const tabs: Array<{ id: TabType; label: string; count: number }> = [
    { id: 'research', label: 'Research Papers', count: researchPapers.length },
    { id: 'extracurricular', label: 'Extra Curricular', count: extraCurricular.length },
    { id: 'assignments', label: 'Assignments', count: assignments.length },
    { id: 'projects', label: 'Projects', count: projects.length },
  ]

  const getActiveData = () => {
    let data: any[] = []
    switch (activeTab) {
      case 'research':
        data = researchPapers
        break
      case 'extracurricular':
        data = extraCurricular
        break
      case 'assignments':
        data = assignments
        break
      case 'projects':
        data = projects
        break
      default:
        data = []
    }

    // Apply filters
    return data.filter((activity) => {
      // Status filter
      if (filters.status !== 'All Status') {
        const statusMatch = activity.status.toLowerCase().replace('-', ' ')
        const filterStatus = filters.status.toLowerCase()
        if (statusMatch !== filterStatus) return false
      }

      // Grade filter (only for activities that have grades)
      if (filters.grade !== 'All Grades') {
        if (!activity.grade || activity.grade !== filters.grade) return false
      }

      // Date range filter
      if (fromDate || toDate) {
        // Get the relevant date field based on activity type
        let activityDate = ''
        if (activity.submittedDate) {
          activityDate = activity.submittedDate
        } else if (activity.date) {
          activityDate = activity.date
        } else if (activity.dueDate) {
          activityDate = activity.dueDate
        }

        if (activityDate) {
          const activityDateObj = new Date(activityDate)
          
          if (fromDate) {
            const fromDateObj = new Date(fromDate)
            if (activityDateObj < fromDateObj) return false
          }
          
          if (toDate) {
            const toDateObj = new Date(toDate)
            // Set to end of day for inclusive filtering
            toDateObj.setHours(23, 59, 59, 999)
            if (activityDateObj > toDateObj) return false
          }
        }
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const searchableFields = [
          activity.title,
          activity.subject,
          activity.faculty,
          activity.category,
          activity.status,
          activity.grade,
        ].filter(Boolean)

        if (!searchableFields.some(field => field.toLowerCase().includes(query))) {
          return false
        }
      }

      return true
    })
  }

  const handleViewActivity = async (activity: any) => {
    const details = await getActivityDetails(activity.id)
    setSelectedActivity(details || activity)
    setDetailModalOpen(true)
  }

  const handleSubmitActivity = (activity: any) => {
    setSelectedActivity(activity)
    setSubmissionModalOpen(true)
  }

  const handleExportActivity = (activity: any) => {
    console.log('Export activity:', activity)
    // In real app, this would trigger export functionality
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[hsl(238,74%,59%)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[hsl(220,9%,46%)]">Loading activities...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div>
        <PageHeader
          title="Activities"
          description="Manage your academic submissions and achievements"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Activities' },
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
              <ActivitiesFilters
                filters={filters}
                onFilterChange={setFilters}
              />
            </div>
          }
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <KPICard
            title="Total Submissions"
            value={researchPapers.length + extraCurricular.length + assignments.length + projects.length}
            subtitle="All activities"
            icon={<FileText className="w-6 h-6" />}
            variant="student"
          />
          <KPICard
            title="Approved"
            value={[...researchPapers, ...assignments, ...projects].filter((a) => a.status === 'approved').length}
            subtitle="Successfully completed"
            icon={<CheckSquare className="w-6 h-6" />}
            variant="faculty"
          />
          <KPICard
            title="Under Review"
            value={[...researchPapers, ...assignments, ...projects].filter((a) => a.status === 'pending' || a.status === 'review').length}
            subtitle="Awaiting feedback"
            icon={<Clock className="w-6 h-6" />}
            variant="supervisor"
          />
          <KPICard
            title="Extra Curricular"
            value={extraCurricular.length}
            subtitle="Additional achievements"
            icon={<Trophy className="w-6 h-6" />}
            variant="student"
          />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(220,9%,46%)]" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-sm text-[hsl(222,84%,5%)] placeholder:text-[hsl(220,9%,46%)] focus:outline-none focus:ring-2 focus:ring-[hsl(238,74%,59%)] focus:border-transparent"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-[hsl(214,32%,91%)]">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-4 py-3 text-sm font-medium transition-all relative',
                  activeTab === tab.id
                    ? 'text-[hsl(238,74%,59%)]'
                    : 'text-[hsl(220,9%,46%)] hover:text-[hsl(222,84%,5%)]'
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    'ml-2 px-2 py-0.5 rounded-full text-xs',
                    activeTab === tab.id
                      ? 'bg-[hsl(238,94%,95%)] text-[hsl(238,74%,59%)]'
                      : 'bg-[hsl(240,20%,96%)] text-[hsl(220,9%,46%)]'
                  )}
                >
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(238,74%,59%)]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Activities Table */}
        <ActivitiesTable
          data={getActiveData()}
          type={activeTab}
          onView={handleViewActivity}
          onSubmit={handleSubmitActivity}
          onExport={handleExportActivity}
        />
      </div>

      {/* Modals */}
      <SubmissionModal
        isOpen={submissionModalOpen}
        onClose={() => {
          setSubmissionModalOpen(false)
          setSelectedActivity(null)
        }}
        activity={selectedActivity}
      />

      <ActivityDetailModal
        isOpen={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false)
          setSelectedActivity(null)
        }}
        activity={selectedActivity}
      />
    </>
  )
}
