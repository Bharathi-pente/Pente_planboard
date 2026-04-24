import * as React from 'react'
import { PageHeader } from '@/components/layout'
import { Button, Card, CardContent } from '@/components/ui'
import { GanttTimeline, type TimelineActivity, KPICard } from '@/components/shared'
import { Download, Calendar as CalendarIcon, CheckSquare, Clock, TrendingUp, Calendar, ChevronDown, ChevronRight } from 'lucide-react'
import { usePlanboard } from '../hooks/use-planboard'
import { Filters, type PlanboardFilters } from './filters'
import { TaskDrawer } from './task-drawer'

export function Planboard() {
  const { activities, isLoading, getTaskDetails } = usePlanboard()
  const [filters, setFilters] = React.useState<PlanboardFilters>({
    year: 'All Years',
    semester: 'All Semesters',
    status: 'All Status',
    subject: 'All Subjects',
  })
  const [selectedTask, setSelectedTask] = React.useState<any>(null)
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [calendarView, setCalendarView] = React.useState(false)
  const [expandedSubjects, setExpandedSubjects] = React.useState<Set<string>>(new Set())

  const toggleSubjectExpansion = (subject: string) => {
    const newExpanded = new Set(expandedSubjects)
    if (newExpanded.has(subject)) {
      newExpanded.delete(subject)
    } else {
      newExpanded.add(subject)
    }
    setExpandedSubjects(newExpanded)
  }

  const filteredActivities = React.useMemo(() => {
    return activities.filter((activity) => {
      if (filters.status !== 'All Status') {
        const statusMatch = activity.status.toLowerCase().replace('-', ' ')
        const filterStatus = filters.status.toLowerCase()
        if (statusMatch !== filterStatus) return false
      }
      if (filters.subject !== 'All Subjects') {
        if (activity.subject !== filters.subject) return false
      }
      return true
    })
  }, [activities, filters])

  const activitiesBySubject = React.useMemo(() => {
    const grouped: Record<string, TimelineActivity[]> = {}
    filteredActivities.forEach((activity) => {
      if (!grouped[activity.subject]) {
        grouped[activity.subject] = []
      }
      grouped[activity.subject].push(activity)
    })
    return grouped
  }, [filteredActivities])

  const handleActivityClick = async (activity: TimelineActivity) => {
    const details = await getTaskDetails(Number(activity.id))
    if (details) {
      setSelectedTask(details)
      setDrawerOpen(true)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[hsl(238,74%,59%)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[hsl(220,9%,46%)]">Loading timeline...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div>
        <PageHeader
          title="Plan Board"
          description="Track your academic activities across the timeline"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Plan Board' },
          ]}
          actions={
            <>
              <div className="flex items-center gap-3 mr-4">
                <input
                  type="checkbox"
                  id="calendar-view"
                  checked={calendarView}
                  onChange={(e) => setCalendarView(e.target.checked)}
                  className="w-4 h-4 text-[hsl(238,74%,59%)] bg-white border border-[hsl(214,32%,91%)] rounded focus:ring-[hsl(238,74%,59%)] focus:ring-2"
                />
                <label
                  htmlFor="calendar-view"
                  className="text-sm font-medium text-[hsl(220,9%,46%)] cursor-pointer"
                >
                  Calendar View
                </label>
              </div>
              <Filters filters={filters} onFilterChange={setFilters} />
              <Button variant="bgo" size="md">
                <CalendarIcon className="w-4 h-4" />
                View Calendar
              </Button>
              <Button variant="bacc" size="md">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </>
          }
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <KPICard
            title="Total Activities"
            value={activities.length}
            subtitle="All planned tasks"
            icon={<CheckSquare className="w-6 h-6" />}
            variant="student"
          />
          <KPICard
            title="Completed"
            value={activities.filter((a) => a.status === 'completed').length}
            subtitle="Successfully finished"
            icon={<TrendingUp className="w-6 h-6" />}
            variant="faculty"
          />
          <KPICard
            title="In Progress"
            value={activities.filter((a) => a.status === 'in-progress').length}
            subtitle="Currently working on"
            icon={<Clock className="w-6 h-6" />}
            variant="supervisor"
          />
          <KPICard
            title="Upcoming"
            value={activities.filter((a) => a.status === 'upcoming' || a.status === 'planned').length}
            subtitle="Scheduled ahead"
            icon={<Calendar className="w-6 h-6" />}
            variant="student"
          />
        </div>

        {/* Active Filters Display */}
        {Object.values(filters).some((v) => v && !v.startsWith('All')) && (
          <div className="mb-4 p-4 bg-[hsl(238,94%,95%)] border border-[hsl(238,74%,59%)]/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-[hsl(222,84%,5%)]">
                  Active Filters:
                </span>
                {Object.entries(filters).map(
                  ([key, value]) =>
                    value &&
                    !value.startsWith('All') && (
                      <span
                        key={key}
                        className="px-2 py-1 bg-white rounded text-xs font-medium text-[hsl(238,74%,59%)]"
                      >
                        {value}
                      </span>
                    )
                )}
              </div>
              <button
                onClick={() =>
                  setFilters({
                    year: 'All Years',
                    semester: 'All Semesters',
                    status: 'All Status',
                    subject: 'All Subjects',
                  })
                }
                className="text-sm text-[hsl(238,74%,59%)] hover:text-[hsl(238,74%,54%)] font-medium"
              >
                Clear all
              </button>
            </div>
          </div>
        )}

        {/* Content View */}
        {calendarView ? (
          /* Calendar Accordion View */
          <div className="space-y-4">
            {Object.entries(activitiesBySubject).map(([subject, subjectActivities]) => (
              <Card key={subject}>
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleSubjectExpansion(subject)}
                    className="w-full flex items-center justify-between p-6 hover:bg-[hsl(240,20%,96%)] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {expandedSubjects.has(subject) ? (
                        <ChevronDown className="w-5 h-5 text-[hsl(238,74%,59%)]" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-[hsl(238,74%,59%)]" />
                      )}
                      <h3 className="text-lg font-semibold text-[hsl(222,84%,5%)]">{subject}</h3>
                      <span className="px-2 py-1 bg-[hsl(238,94%,95%)] text-[hsl(238,74%,59%)] text-xs font-medium rounded-full">
                        {subjectActivities.length} activities
                      </span>
                    </div>
                  </button>

                  {expandedSubjects.has(subject) && (
                    <div className="border-t border-[hsl(214,32%,91%)]">
                      <div className="p-6 space-y-4">
                        {subjectActivities.map((activity) => {
                          const statusColors = {
                            completed: 'bg-[hsl(158,64%,52%)]/10 text-[hsl(158,64%,52%)] border-[hsl(158,64%,52%)]/20',
                            'in-progress': 'bg-[hsl(238,74%,59%)]/10 text-[hsl(238,74%,59%)] border-[hsl(238,74%,59%)]/20',
                            planned: 'bg-[hsl(38,92%,50%)]/10 text-[hsl(38,92%,50%)] border-[hsl(38,92%,50%)]/20',
                            upcoming: 'bg-[hsl(271,81%,56%)]/10 text-[hsl(271,81%,56%)] border-[hsl(271,81%,56%)]/20',
                            review: 'bg-[hsl(0,72%,51%)]/10 text-[hsl(0,72%,51%)] border-[hsl(0,72%,51%)]/20',
                          }

                          return (
                            <div
                              key={activity.id}
                              onClick={() => handleActivityClick(activity)}
                              className="flex items-center justify-between p-4 bg-white border border-[hsl(214,32%,91%)] rounded-lg hover:shadow-md transition-all cursor-pointer"
                            >
                              <div className="flex-1">
                                <h4 className="font-medium text-[hsl(222,84%,5%)] mb-1">{activity.title}</h4>
                                <div className="flex items-center gap-4 text-sm text-[hsl(220,9%,46%)]">
                                  <span>Week {activity.startWeek} - {activity.startWeek + activity.duration - 1}</span>
                                  <span>Priority: {activity.priority}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`px-2 py-1 text-xs font-medium rounded border ${statusColors[activity.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-600'}`}>
                                  {activity.status.replace('-', ' ')}
                                </span>
                                <div className="w-2 h-2 rounded-full bg-[hsl(238,74%,59%)]"></div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Timeline View */
          <Card>
            <CardContent className="p-6">
              {filteredActivities.length === 0 ? (
                <div className="text-center py-20">
                  <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-[hsl(220,9%,66%)]" />
                  <h3 className="text-lg font-medium text-[hsl(222,84%,5%)] mb-2">
                    No activities found
                  </h3>
                  <p className="text-sm text-[hsl(220,9%,46%)]">
                    Try adjusting your filters or add new activities
                  </p>
                </div>
              ) : (
                <GanttTimeline
                  activities={filteredActivities}
                  weeks={8}
                  onActivityClick={handleActivityClick}
                />
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Task Details Drawer */}
      <TaskDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        task={selectedTask}
      />
    </>
  )
}
