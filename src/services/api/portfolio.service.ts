/**
 * Portfolio API Service
 */

import { apiClient } from '@/lib/api-client'
import { mockPortfolioData } from '@/data'

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

export const portfolioService = {
  async getPortfolioData() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockPortfolioData
    }
    
    const response = await apiClient.get('/portfolio')
    return response.data
  },
}
