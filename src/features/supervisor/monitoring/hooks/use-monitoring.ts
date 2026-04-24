import { useQuery } from '@tanstack/react-query'
import { supervisorMonitoringService } from '@/services/api/supervisor-monitoring.service'

export function useMonitoring() {
  return useQuery({
    queryKey: ['supervisor-monitoring'],
    queryFn: () => supervisorMonitoringService.getMonitoringData(),
    staleTime: 1000 * 60 * 5,
  })
}
