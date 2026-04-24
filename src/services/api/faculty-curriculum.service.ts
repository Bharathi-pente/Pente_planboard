/**
 * Faculty Curriculum API Service
 */

import { apiClient } from '@/lib/api-client'
import {
  mockActivityTemplates,
  mockActivityCategories,
  mockRecentActivities,
  mockSubjectsForCurriculum,
  mockClassesForCurriculum,
} from '@/data/mock-faculty-curriculum'

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

export const facultyCurriculumService = {
  /**
   * Get all activity templates
   */
  async getActivityTemplates(category?: string) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      if (!category || category === 'all') {
        return mockActivityTemplates
      }
      
      return mockActivityTemplates.filter(
        (template) => template.category.toLowerCase() === category.toLowerCase()
      )
    }
    
    const response = await apiClient.get('/faculty/curriculum/templates', {
      params: { category },
    })
    return response.data
  },

  /**
   * Get activity categories
   */
  async getCategories() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockActivityCategories
    }
    
    const response = await apiClient.get('/faculty/curriculum/categories')
    return response.data
  },

  /**
   * Get recent activities created
   */
  async getRecentActivities() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockRecentActivities
    }
    
    const response = await apiClient.get('/faculty/curriculum/recent-activities')
    return response.data
  },

  /**
   * Get subjects list
   */
  async getSubjects() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockSubjectsForCurriculum
    }
    
    const response = await apiClient.get('/faculty/curriculum/subjects')
    return response.data
  },

  /**
   * Get classes list
   */
  async getClasses() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockClassesForCurriculum
    }
    
    const response = await apiClient.get('/faculty/curriculum/classes')
    return response.data
  },

  /**
   * Create new activity from template
   */
  async createActivity(activityData: {
    templateId: number
    title: string
    description: string
    classId: string
    subject: string
    dueDate: string
    maxScore: number
    instructions?: string
  }) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        success: true,
        message: 'Activity created successfully',
        activityId: Math.floor(Math.random() * 1000) + 100,
      }
    }
    
    const response = await apiClient.post('/faculty/curriculum/activities', activityData)
    return response.data
  },

  /**
   * Import activities from file
   */
  async importActivities(file: File) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        success: true,
        message: 'Activities imported successfully',
        imported: 5,
        failed: 0,
      }
    }
    
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await apiClient.post('/faculty/curriculum/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  },

  /**
   * Export activities to file
   */
  async exportActivities(format: 'csv' | 'json' | 'pdf') {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return {
        success: true,
        downloadUrl: '#',
        filename: `activities-export.${format}`,
      }
    }
    
    const response = await apiClient.get('/faculty/curriculum/export', {
      params: { format },
      responseType: 'blob',
    })
    return response.data
  },
}
