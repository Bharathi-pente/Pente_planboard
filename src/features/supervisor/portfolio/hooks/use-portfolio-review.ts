import { useQuery } from '@tanstack/react-query'
import { supervisorPortfolioService } from '@/services/api/supervisor-portfolio.service'

export function usePortfolioReview() {
  return useQuery({
    queryKey: ['supervisor-portfolio-review'],
    queryFn: () => supervisorPortfolioService.getPortfolioReview(),
    staleTime: 1000 * 60 * 5,
  })
}
