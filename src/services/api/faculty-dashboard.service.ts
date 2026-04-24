/**
 * Faculty Dashboard API Service
 */

import { apiClient } from '@/lib/api-client'
import {
  mockFacultyStats,
  mockFacultyRecentActivities,
  mockClassPerformance,
  mockFacultyUpcomingDeadlines,
  mockWeeklySchedule,
} from '@/data/mock-faculty-dashboard'

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

export const facultyDashboardService = {
  /**
   * Get faculty dashboard statistics
   */
  async getStats() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockFacultyStats
    }
    
    const response = await apiClient.get('/faculty/dashboard/stats')
    return response.data
  },

  /**
   * Get recent activities (submissions and evidence validations)
   */
  async getRecentActivities() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockFacultyRecentActivities
    }
    
    const response = await apiClient.get('/faculty/dashboard/recent-activities')
    return response.data
  },

  /**
   * Get class performance overview
   */
  async getClassPerformance() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockClassPerformance
    }
    
    const response = await apiClient.get('/faculty/dashboard/class-performance')
    return response.data
  },

  /**
   * Get upcoming deadlines
   */
  async getUpcomingDeadlines() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockFacultyUpcomingDeadlines
    }
    
    const response = await apiClient.get('/faculty/dashboard/upcoming-deadlines')
    return response.data
  },

  /**
   * Get weekly schedule
   */
  async getWeeklySchedule() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockWeeklySchedule
    }
    
    const response = await apiClient.get('/faculty/dashboard/weekly-schedule')
    return response.data
  },
}
