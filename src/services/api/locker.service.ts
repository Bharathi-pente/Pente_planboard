/**
 * Locker API Service
 */

import { apiClient } from '@/lib/api-client'
import { mockLockerStats, mockLockerItems, mockLockerItemDetails } from '@/data'

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

export const lockerService = {
  async getStats() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockLockerStats
    }
    
    const response = await apiClient.get('/locker/stats')
    return response.data
  },

  async getItems() {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockLockerItems
    }
    
    const response = await apiClient.get('/locker/items')
    return response.data
  },

  async getItemDetails(itemName: string) {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockLockerItemDetails[itemName as keyof typeof mockLockerItemDetails] || null
    }
    
    const response = await apiClient.get(`/locker/items/${itemName}`)
    return response.data
  },
}
