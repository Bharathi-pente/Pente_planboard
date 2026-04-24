/**
 * Dashboard API Service
 * Abstracts data fetching - can switch between mock and real API
 */

import { apiClient } from '@/lib/api-client'
import {
  mockStudentStats,
  mockRecentSubmissions,
  mockUpcomingDeadlines,
  mockPortfolioProgress,
  mockDigitalLockerSummary,
} from '@/data'

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

export const dashboardService = {
  /**
   * Get student statistics
   */
  async getStats() {
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockStudentStats
    }
    
    const response = await apiClient.get('/dashboard/stats')
    return response.data
  },

  /**
   * Get recent submissions
   */
  async getRecentSubmissions() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockRecentSubmissions
    }
    
    const response = await apiClient.get('/dashboard/recent-submissions')
    return response.data
  },

  /**
   * Get upcoming deadlines
   */
  async getUpcomingDeadlines() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockUpcomingDeadlines
    }
    
    const response = await apiClient.get('/dashboard/upcoming-deadlines')
    return response.data
  },

  /**
   * Get portfolio progress
   */
  async getPortfolioProgress() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockPortfolioProgress
    }
    
    const response = await apiClient.get('/dashboard/portfolio-progress')
    return response.data
  },

  /**
   * Get digital locker summary
   */
  async getDigitalLockerSummary() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockDigitalLockerSummary
    }
    
    const response = await apiClient.get('/dashboard/digital-locker')
    return response.data
  },
}
