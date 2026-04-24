import { mockMonitoringData } from '@/data/mock-supervisor-monitoring'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true'

export const supervisorMonitoringService = {
  async getMonitoringData() {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockMonitoringData
    }

    // Real API call
    // const response = await apiClient.get('/api/supervisor/monitoring')
    // return response.data
    return mockMonitoringData
  },

  async flagStudent(_studentId: number, _reason: string) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { success: true, message: 'Student flagged successfully' }
    }

    // Real API call
    // const response = await apiClient.post(`/api/supervisor/monitoring/${studentId}/flag`, { reason })
    // return response.data
    return { success: true, message: 'Student flagged successfully' }
  },

  async notifyFaculty(_studentId: number, _message: string) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { success: true, message: 'Faculty notified' }
    }

    // Real API call
    // const response = await apiClient.post(`/api/supervisor/monitoring/${studentId}/notify`, { message })
    // return response.data
    return { success: true, message: 'Faculty notified' }
  },
}
