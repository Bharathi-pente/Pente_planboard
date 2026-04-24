import { mockEscalationsData } from '@/data/mock-supervisor-escalations'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true'

export const supervisorEscalationsService = {
  async getEscalations() {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockEscalationsData
    }

    // Real API call
    // const response = await apiClient.get('/api/supervisor/escalations')
    // return response.data
    return mockEscalationsData
  },

  async resolveEscalation(_caseId: string, _decision: string, _reasoning: string) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { success: true, message: 'Escalation resolved' }
    }

    // Real API call
    // const response = await apiClient.post(`/api/supervisor/escalations/${caseId}/resolve`, { decision, reasoning })
    // return response.data
    return { success: true, message: 'Escalation resolved' }
  },

  async approveCase(_caseId: string) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { success: true, message: 'Case approved' }
    }

    // Real API call
    // const response = await apiClient.post(`/api/supervisor/escalations/${caseId}/approve`)
    // return response.data
    return { success: true, message: 'Case approved' }
  },

  async rejectCase(_caseId: string, _reason: string) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { success: true, message: 'Case rejected' }
    }

    // Real API call
    // const response = await apiClient.post(`/api/supervisor/escalations/${caseId}/reject`, { reason })
    // return response.data
    return { success: true, message: 'Case rejected' }
  },
}
