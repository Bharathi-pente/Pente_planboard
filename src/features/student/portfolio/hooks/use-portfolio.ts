import { useQuery } from '@tanstack/react-query'
import { portfolioService } from '@/services'

export function usePortfolio() {
  const portfolioQuery = useQuery({
    queryKey: ['portfolio'],
    queryFn: () => portfolioService.getPortfolioData(),
  })

  const calculateGPA = (year?: number) => {
    if (!portfolioQuery.data) return 0

    const data = portfolioQuery.data
    let totalCredits = 0
    let weightedSum = 0

    const yearsToInclude = year ? [data.years.find((y: any) => y.year === year)] : data.years

    yearsToInclude.forEach((yearData: any) => {
      if (!yearData) return
      yearData.semesters.forEach((semester: any) => {
        semester.subjects.forEach((subject: any) => {
          const gradeValue = convertGradeToPoints(subject.grade)
          totalCredits += subject.credits
          weightedSum += gradeValue * subject.credits
        })
      })
    })

    return totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : 0
  }

  const convertGradeToPoints = (grade: string): number => {
    const gradeMap: Record<string, number> = {
      'A+': 10,
      'A': 9,
      'B+': 8,
      'B': 7,
      'C+': 6,
      'C': 5,
      'D': 4,
      'E': 3,
      'F': 0,
    }
    return gradeMap[grade] || 0
  }

  const getTotalCredits = () => {
    if (!portfolioQuery.data) return 0
    let total = 0
    portfolioQuery.data.years.forEach((year: any) => {
      year.semesters.forEach((semester: any) => {
        semester.subjects.forEach((subject: any) => {
          total += subject.credits
        })
      })
    })
    return total
  }

  return {
    portfolio: portfolioQuery.data,
    isLoading: portfolioQuery.isLoading,
    calculateGPA,
    getTotalCredits,
  }
}
