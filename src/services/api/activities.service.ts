/**
 * Activities API Service
 */

import { apiClient } from '@/lib/api-client'
import {
  mockResearchPapers,
  mockExtraCurricular,
  mockAssignments,
  mockProjects,
  mockActivityDetails,
} from '@/data'

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

export const activitiesService = {
  async getResearchPapers() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockResearchPapers
    }
    
    const response = await apiClient.get('/activities/research-papers')
    return response.data
  },

  async getExtraCurricular() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockExtraCurricular
    }
    
    const response = await apiClient.get('/activities/extra-curricular')
    return response.data
  },

  async getAssignments() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockAssignments
    }
    
    const response = await apiClient.get('/activities/assignments')
    return response.data
  },

  async getProjects() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockProjects
    }
    
    const response = await apiClient.get('/activities/projects')
    return response.data
  },

  async getActivityDetails(activityId: number) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockActivityDetails[activityId as keyof typeof mockActivityDetails] || null
    }
    
    const response = await apiClient.get(`/activities/${activityId}`)
    return response.data
  },
}
