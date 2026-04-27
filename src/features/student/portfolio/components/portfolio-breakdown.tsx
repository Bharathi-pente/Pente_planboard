import * as React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '@/components/ui'

interface Subject {
  code: string
  name: string
  credits: number
  grade: string
  type: string
}

interface Semester {
  semester: number
  subjects: Subject[]
  gpa: number
}

interface YearData {
  year: number
  semesters: Semester[]
}

interface PortfolioBreakdownProps {
  years: YearData[]
}

export function PortfolioBreakdown({ years }: PortfolioBreakdownProps) {
  const [expandedYear, setExpandedYear] = React.useState<number | null>(years[0]?.year || null)
  const [expandedSemester, setExpandedSemester] = React.useState<{ year: number; semester: number } | null>(
    years[0] ? { year: years[0].year, semester: years[0].semesters[0]?.semester } : null
  )

  const toggleYear = (year: number) => {
    if (expandedYear === year) {
      setExpandedYear(null)
      setExpandedSemester(null)
    } else {
      setExpandedYear(year)
      const firstSemester = years.find(y => y.year === year)?.semesters[0]
      setExpandedSemester(firstSemester ? { year, semester: firstSemester.semester } : null)
    }
  }

  const toggleSemester = (year: number, semester: number) => {
    if (expandedSemester?.year === year && expandedSemester?.semester === semester) {
      setExpandedSemester(null)
    } else {
      setExpandedSemester({ year, semester })
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'hsl(158,64%,52%)'
    if (grade === 'B+' || grade === 'B') return 'hsl(238,74%,59%)'
    if (grade === 'C+' || grade === 'C') return 'hsl(38,92%,50%)'
    return 'hsl(0,72%,51%)'
  }

  return (
    <div className="space-y-4">
      {years.map((yearData) => (
        <div key={yearData.year} className="bg-white rounded-xl border border-[hsl(214,32%,91%)] shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          {/* Year Header */}
          <button
            onClick={() => toggleYear(yearData.year)}
            className="w-full flex items-center justify-between p-5 hover:bg-[hsl(240,20%,98%)] transition-all duration-150"
          >
            <div className="flex items-center gap-4">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-[hsl(222,84%,5%)]">
                  Year {yearData.year}
                </h3>
                <p className="text-sm text-[hsl(220,9%,46%)]">
                  {yearData.semesters.length} Semesters
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="student" size="lg">
                GPA: {(yearData.semesters.reduce((sum, s) => sum + s.gpa, 0) / yearData.semesters.length).toFixed(2)}
              </Badge>
              {expandedYear === yearData.year ? (
                <ChevronUp className="w-5 h-5 text-[hsl(220,9%,46%)]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[hsl(220,9%,46%)]" />
              )}
            </div>
          </button>

          {/* Semesters */}
          {expandedYear === yearData.year && (
            <div className="border-t border-[hsl(214,32%,91%)]">
              {yearData.semesters.map((semesterData) => (
                <div key={semesterData.semester} className="border-b border-[hsl(214,32%,91%)] last:border-0">
                  {/* Semester Header */}
                  <button
                    onClick={() => toggleSemester(yearData.year, semesterData.semester)}
                    className="w-full flex items-center justify-between p-4 pl-8 hover:bg-[hsl(240,20%,98%)] transition-all duration-150"
                  >
                    <div>
                      <h4 className="text-base font-medium text-[hsl(222,84%,5%)]">
                        Semester {semesterData.semester}
                      </h4>
                      <p className="text-sm text-[hsl(220,9%,46%)]">
                        {semesterData.subjects.length} Subjects
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="approved" size="md">
                        GPA: {semesterData.gpa}
                      </Badge>
                      {expandedSemester?.year === yearData.year && expandedSemester?.semester === semesterData.semester ? (
                        <ChevronUp className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                      )}
                    </div>
                  </button>

                  {/* Subjects Table */}
                  {expandedSemester?.year === yearData.year && expandedSemester?.semester === semesterData.semester && (
                    <div className="bg-[hsl(240,20%,98%)] p-4 pl-8">
                      <div className="bg-white rounded-lg border border-[hsl(214,32%,91%)] shadow-sm overflow-hidden">
                        <table className="w-full table-fixed">
                          <thead>
                            <tr className="bg-[hsl(240,20%,98%)] border-b border-[hsl(214,32%,91%)]">
                              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[15%]">
                                Code
                              </th>
                              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[40%]">
                                Subject
                              </th>
                              <th className="text-left px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[15%]">
                                Type
                              </th>
                              <th className="text-center px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[15%]">
                                Credits
                              </th>
                              <th className="text-center px-6 py-3.5 text-xs font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider w-[15%]">
                                Grade
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {semesterData.subjects.map((subject, index) => (
                              <tr
                                key={index}
                                className="border-b border-[hsl(214,32%,91%)] last:border-0 hover:bg-[hsl(240,20%,98%)] transition-all duration-150"
                              >
                                <td className="px-6 py-4 text-sm font-medium text-[hsl(220,9%,46%)]">
                                  {subject.code}
                                </td>
                                <td className="px-6 py-4 text-sm text-[hsl(222,84%,5%)] font-medium">
                                  {subject.name}
                                </td>
                                <td className="px-6 py-4">
                                  <Badge variant="student" size="sm">
                                    {subject.type}
                                  </Badge>
                                </td>
                                <td className="px-6 py-4 text-sm text-center text-[hsl(222,84%,5%)] font-medium">
                                  {subject.credits}
                                </td>
                                <td className="px-6 py-4 text-center">
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
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
