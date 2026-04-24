import { useQuery } from '@tanstack/react-query'
import { activitiesService } from '@/services'

export function useActivities() {
  const researchPapersQuery = useQuery({
    queryKey: ['activities', 'research-papers'],
    queryFn: () => activitiesService.getResearchPapers(),
  })

  const extraCurricularQuery = useQuery({
    queryKey: ['activities', 'extra-curricular'],
    queryFn: () => activitiesService.getExtraCurricular(),
  })

  const assignmentsQuery = useQuery({
    queryKey: ['activities', 'assignments'],
    queryFn: () => activitiesService.getAssignments(),
  })

  const projectsQuery = useQuery({
    queryKey: ['activities', 'projects'],
    queryFn: () => activitiesService.getProjects(),
  })

  const getActivityDetails = (activityId: number) => {
    return activitiesService.getActivityDetails(activityId)
  }

  return {
    researchPapers: researchPapersQuery.data || [],
    extraCurricular: extraCurricularQuery.data || [],
    assignments: assignmentsQuery.data || [],
    projects: projectsQuery.data || [],
    isLoading:
      researchPapersQuery.isLoading ||
      extraCurricularQuery.isLoading ||
      assignmentsQuery.isLoading ||
      projectsQuery.isLoading,
    getActivityDetails,
  }
}
