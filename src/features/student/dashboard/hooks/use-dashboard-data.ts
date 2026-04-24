import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services'

export function useDashboardData() {
  const statsQuery = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardService.getStats(),
  })

  const recentSubmissionsQuery = useQuery({
    queryKey: ['dashboard', 'recent-submissions'],
    queryFn: () => dashboardService.getRecentSubmissions(),
  })

  const upcomingDeadlinesQuery = useQuery({
    queryKey: ['dashboard', 'upcoming-deadlines'],
    queryFn: () => dashboardService.getUpcomingDeadlines(),
  })

  const portfolioProgressQuery = useQuery({
    queryKey: ['dashboard', 'portfolio-progress'],
    queryFn: () => dashboardService.getPortfolioProgress(),
  })

  const digitalLockerQuery = useQuery({
    queryKey: ['dashboard', 'digital-locker'],
    queryFn: () => dashboardService.getDigitalLockerSummary(),
  })

  return {
    stats: statsQuery.data,
    recentSubmissions: recentSubmissionsQuery.data || [],
    upcomingDeadlines: upcomingDeadlinesQuery.data || [],
    portfolioProgress: portfolioProgressQuery.data,
    digitalLockerSummary: digitalLockerQuery.data,
    isLoading:
      statsQuery.isLoading ||
      recentSubmissionsQuery.isLoading ||
      upcomingDeadlinesQuery.isLoading ||
      portfolioProgressQuery.isLoading ||
      digitalLockerQuery.isLoading,
  }
}
