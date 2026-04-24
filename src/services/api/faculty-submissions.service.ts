/**
 * Faculty Submissions API Service
 */

import { apiClient } from '@/lib/api-client'
import { mockSubmissions, mockSubmissionDetails } from '@/data/mock-faculty-submissions'

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

export const facultySubmissionsService = {
  /**
   * Get all submissions with optional filters
   */
  async getSubmissions(filters?: {
    status?: string
    className?: string
    subject?: string
    search?: string
  }) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      let filtered = [...mockSubmissions]
      
      if (filters?.status && filters.status !== 'all') {
        filtered = filtered.filter(s => s.status === filters.status)
      }
      if (filters?.className && filters.className !== 'all') {
        filtered = filtered.filter(s => s.className === filters.className)
      }
      if (filters?.subject && filters.subject !== 'all') {
        filtered = filtered.filter(s => s.subject === filters.subject)
      }
      if (filters?.search) {
        const search = filters.search.toLowerCase()
        filtered = filtered.filter(s => 
          s.title.toLowerCase().includes(search) ||
          s.student.name.toLowerCase().includes(search)
        )
      }
      
      return filtered
    }
    
    const response = await apiClient.get('/faculty/submissions', { params: filters })
    return response.data
  },

  /**
   * Get submission details by ID
   */
  async getSubmissionDetails(submissionId: number) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockSubmissionDetails[submissionId as keyof typeof mockSubmissionDetails] || null
    }
    
    const response = await apiClient.get(`/faculty/submissions/${submissionId}`)
    return response.data
  },

  /**
   * Grade a submission
   */
  async gradeSubmission(submissionId: number, gradeData: {
    score: number
    maxScore: number
    letter?: string
    feedback: string
    rubricScores?: Array<{ criterion: string; score: number }>
  }) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { success: true, message: 'Submission graded successfully' }
    }
    
    const response = await apiClient.post(`/faculty/submissions/${submissionId}/grade`, gradeData)
    return response.data
  },

  /**
   * Reject a submission
   */
  async rejectSubmission(submissionId: number, reason: string) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { success: true, message: 'Submission rejected' }
    }
    
    const response = await apiClient.post(`/faculty/submissions/${submissionId}/reject`, { reason })
    return response.data
  },

  /**
   * Request resubmission
   */
  async requestResubmission(submissionId: number, feedback: string) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { success: true, message: 'Resubmission requested' }
    }
    
    const response = await apiClient.post(`/faculty/submissions/${submissionId}/request-resubmission`, { feedback })
    return response.data
  },
}
