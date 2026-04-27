/**
 * Faculty Dashboard Hook
 */

import { useQuery } from '@tanstack/react-query'
import { facultyDashboardService } from '@/services'

export function useFacultyDashboard() {
  const statsQuery = useQuery({
    queryKey: ['faculty', 'dashboard', 'stats'],
    queryFn: () => facultyDashboardService.getStats(),
  })

  const recentActivitiesQuery = useQuery({
    queryKey: ['faculty', 'dashboard', 'recent-activities'],
    queryFn: () => facultyDashboardService.getRecentActivities(),
  })

  const classPerformanceQuery = useQuery({
    queryKey: ['faculty', 'dashboard', 'class-performance'],
    queryFn: () => facultyDashboardService.getClassPerformance(),
  })

  const classPerformanceChartDataQuery = useQuery({
    queryKey: ['faculty', 'dashboard', 'class-performance-chart-data'],
    queryFn: () => facultyDashboardService.getClassPerformanceChartData(),
  })

  const upcomingDeadlinesQuery = useQuery({
    queryKey: ['faculty', 'dashboard', 'upcoming-deadlines'],
    queryFn: () => facultyDashboardService.getUpcomingDeadlines(),
  })

  const weeklyScheduleQuery = useQuery({
    queryKey: ['faculty', 'dashboard', 'weekly-schedule'],
    queryFn: () => facultyDashboardService.getWeeklySchedule(),
  })

  return {
    stats: statsQuery.data,
    recentActivities: recentActivitiesQuery.data || [],
    classPerformance: classPerformanceQuery.data || [],
    classPerformanceChartData: classPerformanceChartDataQuery.data,
    upcomingDeadlines: upcomingDeadlinesQuery.data || [],
    weeklySchedule: weeklyScheduleQuery.data,
    isLoading:
      statsQuery.isLoading ||
      recentActivitiesQuery.isLoading ||
      classPerformanceQuery.isLoading ||
      classPerformanceChartDataQuery.isLoading ||
      upcomingDeadlinesQuery.isLoading ||
      weeklyScheduleQuery.isLoading,
  }
}
