import { useQuery } from '@tanstack/react-query'
import { supervisorDashboardService } from '@/services/api/supervisor-dashboard.service'

export function useSupervisorDashboardData() {
  return useQuery({
    queryKey: ['supervisor-dashboard'],
    queryFn: () => supervisorDashboardService.getDashboardData(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
