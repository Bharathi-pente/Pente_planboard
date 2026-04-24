import { Button } from '@/components/ui'
import { ArrowRight, Archive, CheckSquare, FileText, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface DigitalLockerSummaryProps {
  data: {
    verifiedEvidence: number
    certificates: number
    projects: number
    assignments: number
  }
}

export function DigitalLockerCard({ data }: DigitalLockerSummaryProps) {
  const navigate = useNavigate()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const total = data.certificates + data.projects + data.assignments
  const certificatesPercent = (data.certificates / total) * 100
  const projectsPercent = (data.projects / total) * 100
  const assignmentsPercent = (data.assignments / total) * 100

  const items = [
    { 
      label: 'Certificates', 
      value: data.certificates, 
      color: 'hsl(158,64%,52%)', 
      bgColor: 'bg-[hsl(158,64%,52%)]',
      lightBg: 'bg-[hsl(158,64%,95%)]',
      icon: Archive, 
      percent: certificatesPercent 
    },
    { 
      label: 'Projects', 
      value: data.projects, 
      color: 'hsl(238,74%,59%)', 
      bgColor: 'bg-[hsl(238,74%,59%)]',
      lightBg: 'bg-[hsl(238,74%,95%)]',
      icon: CheckSquare, 
      percent: projectsPercent 
    },
    { 
      label: 'Assignments', 
      value: data.assignments, 
      color: 'hsl(38,92%,50%)', 
      bgColor: 'bg-[hsl(38,92%,50%)]',
      lightBg: 'bg-[hsl(38,92%,95%)]',
      icon: FileText, 
      percent: assignmentsPercent 
    },
  ]

  return (
    <div className="bg-gradient-to-br from-white to-[hsl(240,20%,99%)] rounded-2xl border border-[hsl(214,32%,91%)] p-6 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden h-full flex flex-col">
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(158,64%,52%)]/5 via-transparent to-[hsl(238,74%,59%)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(158,64%,52%)] to-[hsl(158,64%,62%)] flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-500">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] group-hover:text-[hsl(158,64%,52%)] transition-colors duration-300">
              Digital Locker
            </h3>
            <p className="text-xs text-[hsl(220,9%,46%)]">Secure document storage</p>
          </div>
        </div>

        {/* Verified Evidence Count */}
        <div className="mb-5 p-4 rounded-xl bg-gradient-to-r from-[hsl(158,64%,52%)]/10 to-[hsl(158,64%,52%)]/5 border border-[hsl(158,64%,52%)]/20">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-bold bg-gradient-to-r from-[hsl(158,64%,52%)] to-[hsl(158,64%,42%)] bg-clip-text text-transparent">
              {data.verifiedEvidence}
            </span>
            <span className="text-sm font-medium text-[hsl(158,64%,52%)]">verified items</span>
          </div>
          <p className="text-xs text-[hsl(220,9%,46%)]">Securely stored in your locker</p>
        </div>

        {/* Visual Bar Chart */}
        <div className="mb-5">
          <div className="flex h-3 rounded-full overflow-hidden shadow-sm mb-3">
            {items.map((item) => (
              <div
                key={item.label}
                className={`${item.bgColor} transition-all duration-500 cursor-pointer hover:opacity-80`}
                style={{ width: `${item.percent}%` }}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                title={`${item.label}: ${item.value} (${item.percent.toFixed(1)}%)`}
              />
            ))}
          </div>

          {/* Stats Grid with Hover Effect */}
          <div className="space-y-2">
            {items.map((item) => {
              const Icon = item.icon
              const isHovered = hoveredItem === item.label
              
              return (
                <div
                  key={item.label}
                  className={`flex items-center justify-between p-2.5 rounded-lg transition-all duration-300 cursor-pointer border ${
                    isHovered 
                      ? `${item.lightBg} border-opacity-20 shadow-sm scale-[1.02]` 
                      : 'border-transparent hover:bg-[hsl(240,20%,98%)]'
                  }`}
                  style={{ borderColor: isHovered ? item.color : 'transparent' }}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex items-center gap-2.5">
                    <div 
                      className={`w-8 h-8 rounded-lg ${item.bgColor} flex items-center justify-center shadow-sm transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-[hsl(222,84%,5%)]">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold" style={{ color: item.color }}>
                      {item.value}
                    </span>
                    <span className="text-xs text-[hsl(220,9%,46%)] font-medium">
                      ({item.percent.toFixed(0)}%)
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Browse Button */}
        <Button 
          variant="bacc" 
          size="md" 
          fullWidth
          onClick={() => navigate('/student/locker')}
          className="shadow-md hover:shadow-lg transition-all duration-300"
        >
          Browse All Files
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
