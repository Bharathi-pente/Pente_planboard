import * as React from 'react'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { Plus, Search, Filter as FilterIcon, FileText, CheckSquare, Clock, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { KPICard } from '@/components/shared'
import { useActivities } from '../hooks/use-activities'
import { ActivitiesTable } from './activities-table'
import { SubmissionModal } from './submission-modal'
import { ActivityDetailModal } from './activity-detail-modal'

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

  const tabs: Array<{ id: TabType; label: string; count: number }> = [
    { id: 'research', label: 'Research Papers', count: researchPapers.length },
    { id: 'extracurricular', label: 'Extra Curricular', count: extraCurricular.length },
    { id: 'assignments', label: 'Assignments', count: assignments.length },
    { id: 'projects', label: 'Projects', count: projects.length },
  ]

  const getActiveData = () => {
    switch (activeTab) {
      case 'research':
        return researchPapers
      case 'extracurricular':
        return extraCurricular
      case 'assignments':
        return assignments
      case 'projects':
        return projects
      default:
        return []
    }
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
            <>
              <Button variant="bgo" size="md">
                <FilterIcon className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="bacc" size="md" onClick={() => setSubmissionModalOpen(true)}>
                <Plus className="w-4 h-4" />
                New Submission
              </Button>
            </>
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
