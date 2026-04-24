import { useQuery } from '@tanstack/react-query'
import { lockerService } from '@/services'

export function useLocker() {
  const statsQuery = useQuery({
    queryKey: ['locker', 'stats'],
    queryFn: () => lockerService.getStats(),
  })

  const itemsQuery = useQuery({
    queryKey: ['locker', 'items'],
    queryFn: () => lockerService.getItems(),
  })

  const getItemDetails = (itemName: string) => {
    return lockerService.getItemDetails(itemName)
  }

  return {
    stats: statsQuery.data,
    items: itemsQuery.data || [],
    isLoading: statsQuery.isLoading || itemsQuery.isLoading,
    getItemDetails,
  }
}
