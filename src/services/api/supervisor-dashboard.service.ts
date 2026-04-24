import { mockSupervisorDashboardData } from '@/data/mock-supervisor-dashboard'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true'

export const supervisorDashboardService = {
  async getDashboardData() {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockSupervisorDashboardData
    }

    // Real API call would go here
    // const response = await apiClient.get('/api/supervisor/dashboard')
    // return response.data
    return mockSupervisorDashboardData
  },
}
