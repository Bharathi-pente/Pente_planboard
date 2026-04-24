import { mockReportsData } from '@/data/mock-supervisor-reports'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true'

export const supervisorReportsService = {
  async getReports() {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockReportsData
    }

    // Real API call
    // const response = await apiClient.get('/api/supervisor/reports')
    // return response.data
    return mockReportsData
  },

  async generateReport(_reportType: string) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        success: true,
        message: 'Report generated successfully',
        downloadUrl: '/downloads/report.pdf',
      }
    }

    // Real API call
    // const response = await apiClient.post('/api/supervisor/reports/generate', { reportType })
    // return response.data
    return {
      success: true,
      message: 'Report generated successfully',
      downloadUrl: '/downloads/report.pdf',
    }
  },

  async exportReport(_reportId: string) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { success: true, message: 'Report exported' }
    }

    // Real API call
    // const response = await apiClient.get(`/api/supervisor/reports/${reportId}/export`)
    // return response.data
    return { success: true, message: 'Report exported' }
  },
}
