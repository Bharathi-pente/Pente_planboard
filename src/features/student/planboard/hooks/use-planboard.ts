import { useQuery } from '@tanstack/react-query'
import { planboardService } from '@/services'
import type { TimelineActivity } from '@/components/shared'

export function usePlanboard() {
  const activitiesQuery = useQuery({
    queryKey: ['planboard', 'activities'],
    queryFn: () => planboardService.getActivities(),
  })

  const getTaskDetails = (taskId: number) => {
    return planboardService.getTaskDetails(taskId)
  }

  return {
    activities: (activitiesQuery.data || []) as TimelineActivity[],
    isLoading: activitiesQuery.isLoading,
    getTaskDetails,
  }
}
