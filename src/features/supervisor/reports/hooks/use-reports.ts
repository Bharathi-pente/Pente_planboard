import { useQuery } from '@tanstack/react-query'
import { supervisorReportsService } from '@/services/api/supervisor-reports.service'

export function useReports() {
  return useQuery({
    queryKey: ['supervisor-reports'],
    queryFn: () => supervisorReportsService.getReports(),
    staleTime: 1000 * 60 * 5,
  })
}
