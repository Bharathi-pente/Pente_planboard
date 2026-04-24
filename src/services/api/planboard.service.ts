/**
 * Planboard API Service
 */

import { apiClient } from '@/lib/api-client'
import { mockTimelineActivities, mockTaskDetails } from '@/data'

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

export const planboardService = {
  async getActivities() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockTimelineActivities
    }
    
    const response = await apiClient.get('/planboard/activities')
    return response.data
  },

  async getTaskDetails(taskId: number) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockTaskDetails[taskId as keyof typeof mockTaskDetails] || null
    }
    
    const response = await apiClient.get(`/planboard/tasks/${taskId}`)
    return response.data
  },
}
