import { useQuery } from '@tanstack/react-query'
import { supervisorEscalationsService } from '@/services/api/supervisor-escalations.service'

export function useEscalations() {
  return useQuery({
    queryKey: ['supervisor-escalations'],
    queryFn: () => supervisorEscalationsService.getEscalations(),
    staleTime: 1000 * 60 * 5,
  })
}
