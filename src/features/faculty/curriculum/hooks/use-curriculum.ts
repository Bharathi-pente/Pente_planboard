import { useQuery } from '@tanstack/react-query'
import { facultyCurriculumService } from '@/services'

export function useCurriculum(selectedCategory?: string) {
  const templatesQuery = useQuery({
    queryKey: ['faculty', 'curriculum', 'templates', selectedCategory],
    queryFn: () => facultyCurriculumService.getActivityTemplates(selectedCategory),
  })

  const categoriesQuery = useQuery({
    queryKey: ['faculty', 'curriculum', 'categories'],
    queryFn: () => facultyCurriculumService.getCategories(),
  })

  const recentActivitiesQuery = useQuery({
    queryKey: ['faculty', 'curriculum', 'recent-activities'],
    queryFn: () => facultyCurriculumService.getRecentActivities(),
  })

  const subjectsQuery = useQuery({
    queryKey: ['faculty', 'curriculum', 'subjects'],
    queryFn: () => facultyCurriculumService.getSubjects(),
  })

  const classesQuery = useQuery({
    queryKey: ['faculty', 'curriculum', 'classes'],
    queryFn: () => facultyCurriculumService.getClasses(),
  })

  return {
    templates: templatesQuery.data || [],
    categories: categoriesQuery.data || [],
    recentActivities: recentActivitiesQuery.data || [],
    subjects: subjectsQuery.data || [],
    classes: classesQuery.data || [],
    isLoading:
      templatesQuery.isLoading ||
      categoriesQuery.isLoading ||
      recentActivitiesQuery.isLoading ||
      subjectsQuery.isLoading ||
      classesQuery.isLoading,
  }
}
