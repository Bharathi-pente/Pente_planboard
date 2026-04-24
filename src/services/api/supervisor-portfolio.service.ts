import { mockPortfolioReviewData } from '@/data/mock-supervisor-portfolio'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true'

export const supervisorPortfolioService = {
  async getPortfolioReview() {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockPortfolioReviewData
    }

    // Real API call
    // const response = await apiClient.get('/api/supervisor/portfolio')
    // return response.data
    return mockPortfolioReviewData
  },

  async approveStudent(_studentId: number) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { success: true, message: 'Student approved for graduation' }
    }

    // Real API call
    // const response = await apiClient.post(`/api/supervisor/portfolio/${studentId}/approve`)
    // return response.data
    return { success: true, message: 'Student approved for graduation' }
  },

  async requestChanges(_studentId: number, _reason: string) {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return { success: true, message: 'Changes requested' }
    }

    // Real API call
    // const response = await apiClient.post(`/api/supervisor/portfolio/${studentId}/request-changes`, { reason })
    // return response.data
    return { success: true, message: 'Changes requested' }
  },
}
