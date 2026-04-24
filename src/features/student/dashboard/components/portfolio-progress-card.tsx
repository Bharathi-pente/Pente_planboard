import { useState, useEffect, useRef } from 'react'
import { FolderOpen } from 'lucide-react'

interface PortfolioProgressProps {
  data: {
    completion: number
    target: number
    completedItems: number
    inProgress: number
    breakdown: {
      curriculumActivities: number
      projects: number
      eventsAndCertificates: number
    }
    totalRequired: number
  }
}

const GAP = 6
const COLORS = {
  completed: '#1DD1A1',
  inProgress: '#FECA57',
  remaining: '#A29BFE'
}

export function PortfolioProgressCard({ data }: PortfolioProgressProps) {
  const completedPercent = (data.completedItems / data.totalRequired) * 100
  const inProgressPercent = (data.inProgress / data.totalRequired) * 100
  const remainingPercent = 100 - completedPercent - inProgressPercent

  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [animatedCompleted, setAnimatedCompleted] = useState(0)
  const [animatedInProgress, setAnimatedInProgress] = useState(0)
  const [animatedRemaining, setAnimatedRemaining] = useState(0)
  
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>()

  useEffect(() => {
    const duration = 900
    
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }
      
      const elapsed = currentTime - startTimeRef.current
      const t = Math.min(elapsed / duration, 1)
      
      // Cubic ease-out: ease = 1 - Math.pow(1-t, 3)
      const ease = 1 - Math.pow(1 - t, 3)
      
      setAnimatedCompleted(completedPercent * ease)
      setAnimatedInProgress(inProgressPercent * ease)
      setAnimatedRemaining(remainingPercent * ease)
      
      if (t < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }
    
    animationRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [completedPercent, inProgressPercent, remainingPercent])

  const radius = 85
  const circumference = 2 * Math.PI * radius
  
  const completedDashLen = (animatedCompleted / 100) * circumference - GAP
  const inProgressDashLen = (animatedInProgress / 100) * circumference - GAP
  const remainingDashLen = (animatedRemaining / 100) * circumference - GAP
  
  const completedOffset = 0
  const inProgressOffset = -((animatedCompleted / 100) * circumference)
  const remainingOffset = -(((animatedCompleted + animatedInProgress) / 100) * circumference)

  const getCenterTextColor = () => {
    if (hoveredSection === 'completed') return COLORS.completed
    if (hoveredSection === 'inProgress') return COLORS.inProgress
    if (hoveredSection === 'remaining') return COLORS.remaining
    return 'hsl(222,84%,5%)'
  }

  return (
    <div className="bg-gradient-to-br from-white via-white to-[hsl(240,20%,99%)] rounded-2xl border border-[hsl(214,32%,91%)] p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col relative overflow-hidden group">
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(238,74%,59%)]/5 via-transparent to-[hsl(271,81%,56%)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[hsl(238,74%,59%)] to-[hsl(271,81%,56%)] flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
              <FolderOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] group-hover:text-[hsl(238,74%,59%)] transition-colors duration-300">
                Portfolio Progress
              </h3>
              <p className="text-xs text-[hsl(220,9%,46%)]">Track your achievements</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[hsl(158,64%,52%)]/10 to-[hsl(158,64%,52%)]/5 border border-[hsl(158,64%,52%)]/20">
            <span className="text-xs font-semibold text-[hsl(158,64%,52%)]">{data.completion}%</span>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative w-52 h-52">
            
            <svg className="w-full h-full -rotate-90 drop-shadow-xl">
              {/* Background circle */}
              <circle
                cx="104"
                cy="104"
                r={radius}
                stroke="hsl(214,32%,91%)"
                strokeWidth="16"
                fill="none"
              />

              {/* Completed Section */}
              <circle
                cx="104"
                cy="104"
                r={radius}
                stroke={COLORS.completed}
                strokeWidth={hoveredSection === 'completed' ? '24' : '16'}
                fill="none"
                strokeDasharray={`${Math.max(0, completedDashLen)} ${circumference}`}
                strokeDashoffset={completedOffset}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out cursor-pointer"
                style={{
                  filter: hoveredSection === 'completed' 
                    ? `drop-shadow(0 0 8px ${COLORS.completed})` 
                    : 'none'
                }}
                onMouseEnter={() => setHoveredSection('completed')}
                onMouseLeave={() => setHoveredSection(null)}
              />

              {/* In Progress Section */}
              <circle
                cx="104"
                cy="104"
                r={radius}
                stroke={COLORS.inProgress}
                strokeWidth={hoveredSection === 'inProgress' ? '24' : '16'}
                fill="none"
                strokeDasharray={`${Math.max(0, inProgressDashLen)} ${circumference}`}
                strokeDashoffset={inProgressOffset}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out cursor-pointer"
                style={{
                  filter: hoveredSection === 'inProgress' 
                    ? `drop-shadow(0 0 8px ${COLORS.inProgress})` 
                    : 'none'
                }}
                onMouseEnter={() => setHoveredSection('inProgress')}
                onMouseLeave={() => setHoveredSection(null)}
              />

              {/* Remaining Section */}
              <circle
                cx="104"
                cy="104"
                r={radius}
                stroke={COLORS.remaining}
                strokeWidth={hoveredSection === 'remaining' ? '24' : '16'}
                fill="none"
                strokeDasharray={`${Math.max(0, remainingDashLen)} ${circumference}`}
                strokeDashoffset={remainingOffset}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out cursor-pointer"
                style={{
                  filter: hoveredSection === 'remaining' 
                    ? `drop-shadow(0 0 8px ${COLORS.remaining})` 
                    : 'none'
                }}
                onMouseEnter={() => setHoveredSection('remaining')}
                onMouseLeave={() => setHoveredSection(null)}
              />
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {hoveredSection === 'completed' && (
                <div className="text-center animate-fade-in">
                  <div className="text-4xl font-bold mb-1 transition-colors duration-300" style={{ color: getCenterTextColor() }}>
                    {data.completedItems}
                  </div>
                  <div className="text-xs text-[hsl(220,9%,46%)] tracking-widest uppercase font-semibold">
                    Completed
                  </div>
                  <div className="text-sm font-semibold text-[hsl(222,84%,5%)] mt-2 px-3 py-1 bg-[hsl(158,64%,95%)] rounded-full">
                    {completedPercent.toFixed(1)}%
                  </div>
                </div>
              )}
              {hoveredSection === 'inProgress' && (
                <div className="text-center animate-fade-in">
                  <div className="text-4xl font-bold mb-1 transition-colors duration-300" style={{ color: getCenterTextColor() }}>
                    {data.inProgress}
                  </div>
                  <div className="text-xs text-[hsl(220,9%,46%)] tracking-widest uppercase font-semibold">
                    In Progress
                  </div>
                  <div className="text-sm font-semibold text-[hsl(222,84%,5%)] mt-2 px-3 py-1 bg-[hsl(38,92%,95%)] rounded-full">
                    {inProgressPercent.toFixed(1)}%
                  </div>
                </div>
              )}
              {hoveredSection === 'remaining' && (
                <div className="text-center animate-fade-in">
                  <div className="text-4xl font-bold mb-1 transition-colors duration-300" style={{ color: getCenterTextColor() }}>
                    {data.totalRequired - data.completedItems - data.inProgress}
                  </div>
                  <div className="text-xs text-[hsl(220,9%,46%)] tracking-widest uppercase font-semibold">
                    Remaining
                  </div>
                  <div className="text-sm font-semibold text-[hsl(222,84%,5%)] mt-2 px-3 py-1 bg-[hsl(238,74%,95%)] rounded-full">
                    {remainingPercent.toFixed(1)}%
                  </div>
                </div>
              )}
              {!hoveredSection && (
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1 transition-colors duration-300" style={{ color: getCenterTextColor() }}>
                    {data.totalRequired}
                  </div>
                  <div className="text-xs text-[hsl(220,9%,46%)] tracking-widest uppercase font-semibold">
                    Total Items
                  </div>
                  <div className="text-xs text-[hsl(238,74%,59%)] mt-2 font-medium">
                    Target: {data.target}%
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2.5 border-t border-[hsl(214,32%,91%)] pt-5">
          <div 
            className="flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:shadow-md hover:scale-[1.02]"
            style={{
              backgroundColor: hoveredSection === 'completed' ? 'rgba(29, 209, 161, 0.1)' : 'transparent',
              borderColor: hoveredSection === 'completed' ? 'rgba(29, 209, 161, 0.2)' : 'transparent'
            }}
            onMouseEnter={() => setHoveredSection('completed')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full shadow-md ring-2 ring-offset-2 transition-all duration-300"
                style={{ 
                  backgroundColor: COLORS.completed
                }}
              ></div>
              <span className="text-sm font-medium text-[hsl(222,84%,5%)]">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold" style={{ color: COLORS.completed }}>
                {data.completedItems}
              </span>
              <span className="text-xs text-[hsl(220,9%,46%)] bg-[hsl(158,64%,95%)] px-2 py-0.5 rounded-full font-semibold">
                {completedPercent.toFixed(0)}%
              </span>
            </div>
          </div>

          <div 
            className="flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:shadow-md hover:scale-[1.02]"
            style={{
              backgroundColor: hoveredSection === 'inProgress' ? 'rgba(254, 202, 87, 0.1)' : 'transparent',
              borderColor: hoveredSection === 'inProgress' ? 'rgba(254, 202, 87, 0.2)' : 'transparent'
            }}
            onMouseEnter={() => setHoveredSection('inProgress')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full shadow-md ring-2 ring-offset-2 transition-all duration-300 animate-pulse"
                style={{ 
                  backgroundColor: COLORS.inProgress
                }}
              ></div>
              <span className="text-sm font-medium text-[hsl(222,84%,5%)]">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold" style={{ color: COLORS.inProgress }}>
                {data.inProgress}
              </span>
              <span className="text-xs text-[hsl(220,9%,46%)] bg-[hsl(38,92%,95%)] px-2 py-0.5 rounded-full font-semibold">
                {inProgressPercent.toFixed(0)}%
              </span>
            </div>
          </div>

          <div 
            className="flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:shadow-md hover:scale-[1.02]"
            style={{
              backgroundColor: hoveredSection === 'remaining' ? 'rgba(162, 155, 254, 0.1)' : 'transparent',
              borderColor: hoveredSection === 'remaining' ? 'rgba(162, 155, 254, 0.2)' : 'transparent'
            }}
            onMouseEnter={() => setHoveredSection('remaining')}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full shadow-md ring-2 ring-offset-2 transition-all duration-300"
                style={{ 
                  backgroundColor: COLORS.remaining
                }}
              ></div>
              <span className="text-sm font-medium text-[hsl(222,84%,5%)]">Remaining</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold" style={{ color: COLORS.remaining }}>
                {data.totalRequired - data.completedItems - data.inProgress}
              </span>
              <span className="text-xs text-[hsl(220,9%,46%)] bg-[hsl(238,74%,95%)] px-2 py-0.5 rounded-full font-semibold">
                {remainingPercent.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
