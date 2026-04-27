import * as React from 'react'
import { PageHeader } from '@/components/layout'
import { Button } from '@/components/ui'
import { FileText, BarChart3, GraduationCap, CheckSquare, Calendar } from 'lucide-react'
import { usePortfolio } from '../hooks/use-portfolio'
import { PortfolioBreakdown } from './portfolio-breakdown'
import { PortfolioPreviewModal } from './portfolio-preview-modal'
import { KPICard } from '@/components/shared'

export function Portfolio() {
  const { portfolio, isLoading, calculateGPA, getTotalCredits } = usePortfolio()
  const [previewModalOpen, setPreviewModalOpen] = React.useState(false)

  if (isLoading || !portfolio) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[hsl(238,74%,59%)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[hsl(220,9%,46%)]">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  const overallGPA = calculateGPA()
  const totalCredits = getTotalCredits()
  const currentYear = portfolio.student.year
  const totalSubjects = portfolio.years.reduce(
    (sum: number, year: any) => sum + year.semesters.reduce((s: number, sem: any) => s + sem.subjects.length, 0),
    0
  )

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Portfolio"
          description="Your complete academic journey and achievements"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Portfolio' },
          ]}
          actions={
            <Button variant="bacc" size="md" onClick={() => setPreviewModalOpen(true)}>
              <FileText className="w-4 h-4" />
              Generate Portfolio
            </Button>
          }
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Overall GPA"
            value={overallGPA as any}
            subtitle="Cumulative"
            icon={<BarChart3 className="w-6 h-6" />}
            variant="student"
          />

          <KPICard
            title="Total Credits"
            value={totalCredits}
            subtitle="Earned"
            icon={<GraduationCap className="w-6 h-6" />}
            variant="faculty"
          />

          <KPICard
            title="Subjects Completed"
            value={totalSubjects}
            subtitle={`Year ${currentYear}`}
            icon={<CheckSquare className="w-6 h-6" />}
            variant="supervisor"
          />

          <KPICard
            title="Current Year"
            value={currentYear as any}
            subtitle={portfolio.student.department}
            icon={<Calendar className="w-6 h-6" />}
            variant="student"
          />
        </div>

        {/* Student Info Banner */}
        <div className="bg-gradient-to-br from-[hsl(238,74%,59%)] to-[hsl(271,81%,56%)] rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(0,72%,51%)] to-[hsl(330,81%,60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {portfolio.student.name}
              </h2>
              <p className="text-white/90 mb-1 font-medium">{portfolio.student.rollNumber}</p>
              <p className="text-white/80 text-sm">
                {portfolio.student.department} • Year {portfolio.student.year}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm mb-1 font-medium">Overall GPA</p>
              <p className="text-5xl font-bold tracking-tight">{overallGPA}</p>
            </div>
          </div>
        </div>

        {/* Year/Semester Breakdown */}
        <div>
          <h3 className="text-lg font-semibold text-[hsl(222,84%,5%)] mb-4">
            Academic Record
          </h3>
          <PortfolioBreakdown years={portfolio.years} />
        </div>
      </div>

      {/* Preview Modal */}
      <PortfolioPreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        data={
          portfolio
            ? {
                student: portfolio.student,
                years: portfolio.years,
                overallGPA: Number(overallGPA),
                totalCredits,
              }
            : null
        }
      />
    </>
  )
}
