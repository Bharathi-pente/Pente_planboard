import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { TrendingUp } from 'lucide-react'

interface Department {
  name: string
  color: string
  percentage: number
}

interface DepartmentOverviewProps {
  departments: Department[]
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white border border-[hsl(214,32%,91%)] rounded-lg shadow-lg p-3">
        <p className="text-sm font-semibold text-[hsl(222,84%,5%)]">{data.name}</p>
        <p className="text-sm text-[hsl(220,9%,46%)]">
          Completion Rate: <span className="font-bold" style={{ color: data.color }}>{data.percentage}%</span>
        </p>
      </div>
    )
  }
  return null
}

export function DepartmentOverview({ departments }: DepartmentOverviewProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const overallPercentage = Math.round(
    departments.reduce((sum, dept) => sum + dept.percentage, 0) / departments.length
  )

  return (
    <div className="bg-gradient-to-br from-white to-[hsl(240,20%,99%)] rounded-2xl border border-[hsl(214,32%,91%)] p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(271,81%,56%)]/5 via-transparent to-[hsl(295,77%,63%)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(271,81%,56%)] to-[hsl(295,77%,63%)] flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-500">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] group-hover:text-[hsl(271,81%,56%)] transition-colors duration-300">
                Department Performance
              </h3>
              <p className="text-xs text-[hsl(220,9%,46%)]">
                Overall completion overview
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Overall Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[hsl(240,20%,98%)] rounded-lg p-3 border border-[hsl(214,32%,91%)]">
              <div className="text-xs text-[hsl(220,9%,46%)] mb-1">Overall</div>
              <div className="text-xl font-bold text-[hsl(271,81%,56%)]">{overallPercentage}%</div>
            </div>
            <div className="bg-[hsl(240,20%,98%)] rounded-lg p-3 border border-[hsl(214,32%,91%)]">
              <div className="text-xs text-[hsl(220,9%,46%)] mb-1">Departments</div>
              <div className="text-xl font-bold text-[hsl(222,84%,5%)]">{departments.length}</div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="flex-1 flex flex-col" style={{ minHeight: '280px' }}>
            <div className="bg-gradient-to-br from-[hsl(240,20%,98%)] to-white rounded-xl p-4 border border-[hsl(214,32%,91%)] flex-1 flex flex-col">
              <ResponsiveContainer width="100%" height="100%" minHeight={240}>
                <PieChart>
                  <Pie
                    data={departments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                    onMouseEnter={(_, index) => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {departments.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={hoveredIndex === index ? entry.color : 'transparent'}
                        strokeWidth={hoveredIndex === index ? 3 : 0}
                        style={{
                          filter: hoveredIndex === index ? 'brightness(1.1)' : 'brightness(1)',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 space-y-2">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-[hsl(240,20%,98%)] transition-colors duration-200"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full transition-transform duration-200"
                    style={{
                      background: dept.color,
                      transform: hoveredIndex === index ? 'scale(1.2)' : 'scale(1)',
                    }}
                  />
                  <span className="text-sm text-[hsl(222,84%,5%)]">{dept.name}</span>
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: dept.color }}
                >
                  {dept.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
