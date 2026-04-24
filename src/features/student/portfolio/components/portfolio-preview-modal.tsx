import * as React from 'react'
import { X, Download, Share2, Calendar } from 'lucide-react'
import { Button, Badge, Avatar } from '@/components/ui'
import { formatDate } from '@/utils'
import { cn } from '@/lib/utils'

interface PortfolioPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    student: {
      name: string
      rollNumber: string
      department: string
      year: string
    }
    years: Array<{
      year: number
      semesters: Array<{
        semester: number
        subjects: Array<{
          code: string
          name: string
          credits: number
          grade: string
          type: string
        }>
        gpa: number
      }>
    }>
    overallGPA: number
    totalCredits: number
  } | null
}

export function PortfolioPreviewModal({ isOpen, onClose, data }: PortfolioPreviewModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !data) return null

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'hsl(158,64%,52%)'
    if (grade === 'B+' || grade === 'B') return 'hsl(238,74%,59%)'
    if (grade === 'C+' || grade === 'C') return 'hsl(38,92%,50%)'
    return 'hsl(0,72%,51%)'
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={cn(
            'bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh]',
            'flex flex-col animate-fadeIn'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[hsl(214,32%,91%)]">
            <h2 className="text-2xl font-semibold text-[hsl(222,84%,5%)]">
              Portfolio Preview
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="bgo" size="sm">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="bacc" size="sm">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[hsl(240,20%,96%)] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[hsl(220,9%,46%)]" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
            {/* Portfolio Header */}
            <div className="bg-gradient-to-br from-[hsl(238,74%,59%)] to-[hsl(271,81%,56%)] rounded-2xl p-8 mb-8 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                  <Avatar
                    src=""
                    fallback={data.student.name.charAt(0)}
                    size="lg"
                    className="ring-4 ring-white/30"
                  />
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {data.student.name}
                    </h1>
                    <p className="text-white/90 mb-1">{data.student.rollNumber}</p>
                    <p className="text-white/80">
                      {data.student.department} • {data.student.year}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm mb-1">Overall GPA</p>
                  <p className="text-5xl font-bold">{data.overallGPA}</p>
                  <p className="text-white/80 text-sm mt-2">{data.totalCredits} Credits</p>
                </div>
              </div>
            </div>

            {/* Academic Record */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-[hsl(238,74%,59%)]" />
                <h3 className="text-xl font-semibold text-[hsl(222,84%,5%)]">
                  Academic Record
                </h3>
              </div>

              <div className="space-y-8">
                {data.years.map((yearData) => (
                  <div key={yearData.year}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-[hsl(222,84%,5%)]">
                        Year {yearData.year}
                      </h4>
                      <Badge variant="student" size="lg">
                        GPA: {(yearData.semesters.reduce((sum, s) => sum + s.gpa, 0) / yearData.semesters.length).toFixed(2)}
                      </Badge>
                    </div>

                    <div className="space-y-6">
                      {yearData.semesters.map((semesterData) => (
                        <div key={semesterData.semester}>
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="text-base font-medium text-[hsl(220,9%,46%)]">
                              Semester {semesterData.semester}
                            </h5>
                            <Badge variant="approved" size="md">
                              GPA: {semesterData.gpa}
                            </Badge>
                          </div>

                          <div className="bg-white rounded-lg border border-[hsl(214,32%,91%)] overflow-hidden">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-[hsl(240,20%,96%)] border-b border-[hsl(214,32%,91%)]">
                                  <th className="text-left px-4 py-3 text-xs font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                                    Code
                                  </th>
                                  <th className="text-left px-4 py-3 text-xs font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                                    Subject
                                  </th>
                                  <th className="text-left px-4 py-3 text-xs font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                                    Type
                                  </th>
                                  <th className="text-center px-4 py-3 text-xs font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                                    Credits
                                  </th>
                                  <th className="text-center px-4 py-3 text-xs font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                                    Grade
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {semesterData.subjects.map((subject, index) => (
                                  <tr
                                    key={index}
                                    className="border-b border-[hsl(214,32%,91%)] last:border-0"
                                  >
                                    <td className="px-4 py-3 text-sm font-medium text-[hsl(220,9%,46%)]">
                                      {subject.code}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-[hsl(222,84%,5%)]">
                                      {subject.name}
                                    </td>
                                    <td className="px-4 py-3">
                                      <Badge variant="student" size="sm">
                                        {subject.type}
                                      </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-center text-[hsl(222,84%,5%)]">
                                      {subject.credits}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <span
                                        className="inline-block px-3 py-1 rounded-lg text-sm font-bold"
                                        style={{
                                          backgroundColor: `${getGradeColor(subject.grade)}20`,
                                          color: getGradeColor(subject.grade),
                                        }}
                                      >
                                        {subject.grade}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-[hsl(214,32%,91%)] text-center text-sm text-[hsl(220,9%,46%)]">
              <p>Generated on {formatDate(new Date().toISOString())}</p>
              <p className="mt-1">This is an official academic portfolio from PlanBoard System</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
