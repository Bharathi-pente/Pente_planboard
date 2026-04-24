import { useState } from 'react'
import { Calendar, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface AttendanceDataPoint {
  label: string
  value: number
}

interface AttendanceChartProps {
  monthlyData: { [key: string]: AttendanceDataPoint[][] }
  yearlyData: AttendanceDataPoint[][]
}

const seriesConfig = [
  { name: 'Present', dataKey: 'present', color: '#4C4BC8', fillOpacity: 0.15 },
  { name: 'Late', dataKey: 'late', color: '#E040FB', fillOpacity: 0.18 },
  { name: 'Absent', dataKey: 'absent', color: '#29B6F6', fillOpacity: 0.15 },
]

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export function AttendanceChart({ monthlyData, yearlyData }: AttendanceChartProps) {
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly')
  const [currentMonthIndex, setCurrentMonthIndex] = useState(3) // Start with April (index 3)
  
  const currentMonthName = monthNames[currentMonthIndex]
  const dataSeries = viewMode === 'monthly' 
    ? monthlyData[currentMonthName] 
    : yearlyData
  
  // Transform data for Recharts format
  const chartData = dataSeries[0].map((_, index) => ({
    label: dataSeries[0][index].label,
    present: dataSeries[0][index].value,
    late: dataSeries[1][index].value,
    absent: dataSeries[2][index].value,
  }))
  
  // Calculate stats from first series (Present)
  const primaryData = dataSeries[0]
  const averageValue = Math.round(primaryData.reduce((sum, d) => sum + d.value, 0) / primaryData.length)
  const currentValue = primaryData[primaryData.length - 1].value
  const trend = currentValue > averageValue ? 'up' : 'down'
  
  // Month navigation handlers
  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1))
  }
  
  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1))
  }
  
  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[hsl(214,32%,91%)] rounded-lg shadow-lg p-3">
          <p className="text-xs font-semibold text-[hsl(222,84%,5%)] mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value}%</span>
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-gradient-to-br from-white to-[hsl(240,20%,99%)] rounded-2xl border border-[hsl(214,32%,91%)] p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(238,74%,59%)]/5 via-transparent to-[hsl(271,81%,56%)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(238,74%,59%)] to-[hsl(271,81%,56%)] flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-500">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] group-hover:text-[hsl(238,74%,59%)] transition-colors duration-300">
                Attendance Analytics
              </h3>
              <p className="text-xs text-[hsl(220,9%,46%)]">
                {viewMode === 'monthly' ? currentMonthName : 'Track your presence'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Month Navigation (only in monthly view) */}
            {viewMode === 'monthly' && (
              <div className="flex items-center gap-1 bg-[hsl(240,20%,98%)] p-1 rounded-lg border border-[hsl(214,32%,91%)] mr-2">
                <button
                  onClick={handlePreviousMonth}
                  className="p-1.5 rounded-md text-[hsl(220,9%,46%)] hover:text-[hsl(238,74%,59%)] hover:bg-white transition-all duration-300"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 text-xs font-semibold text-[hsl(222,84%,5%)] min-w-[80px] text-center">
                  {currentMonthName}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-md text-[hsl(220,9%,46%)] hover:text-[hsl(238,74%,59%)] hover:bg-white transition-all duration-300"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Toggle Buttons */}
            <div className="flex gap-1 bg-[hsl(240,20%,98%)] p-1 rounded-lg border border-[hsl(214,32%,91%)]">
              <button
                onClick={() => setViewMode('monthly')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-300 ${
                  viewMode === 'monthly'
                    ? 'bg-gradient-to-br from-[hsl(238,74%,59%)] to-[hsl(271,81%,56%)] text-white shadow-md'
                    : 'text-[hsl(220,9%,46%)] hover:text-[hsl(238,74%,59%)]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setViewMode('yearly')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-300 ${
                  viewMode === 'yearly'
                    ? 'bg-gradient-to-br from-[hsl(238,74%,59%)] to-[hsl(271,81%,56%)] text-white shadow-md'
                    : 'text-[hsl(220,9%,46%)] hover:text-[hsl(238,74%,59%)]'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-[hsl(240,20%,98%)] rounded-lg p-3 border border-[hsl(214,32%,91%)]">
            <div className="text-xs text-[hsl(220,9%,46%)] mb-1">Current</div>
            <div className="text-xl font-bold text-[hsl(238,74%,59%)]">{currentValue}%</div>
          </div>
          <div className="bg-[hsl(240,20%,98%)] rounded-lg p-3 border border-[hsl(214,32%,91%)]">
            <div className="text-xs text-[hsl(220,9%,46%)] mb-1">Average</div>
            <div className="text-xl font-bold text-[hsl(222,84%,5%)]">{averageValue}%</div>
          </div>
          <div className="bg-[hsl(240,20%,98%)] rounded-lg p-3 border border-[hsl(214,32%,91%)]">
            <div className="text-xs text-[hsl(220,9%,46%)] mb-1">Trend</div>
            <div className={`text-xl font-bold flex items-center gap-1 ${trend === 'up' ? 'text-[hsl(158,64%,52%)]' : 'text-[hsl(0,72%,51%)]'}`}>
              <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
              {trend === 'up' ? '+' : '-'}{Math.abs(currentValue - averageValue)}%
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 flex flex-col">
          <div className="bg-gradient-to-br from-[hsl(240,20%,98%)] to-white rounded-xl p-4 border border-[hsl(214,32%,91%)] flex-1 flex flex-col">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                {/* Dashed grid lines */}
                <CartesianGrid
                  strokeDasharray="3 4"
                  stroke="hsl(214,32%,85%)"
                  strokeWidth={0.5}
                  vertical={false}
                />
                
                {/* X Axis */}
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fill: 'hsl(220,9%,46%)' }}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(214,32%,91%)', strokeWidth: 1 }}
                  interval={0}
                />
                
                {/* Y Axis */}
                <YAxis
                  tick={{ fontSize: 10, fill: 'hsl(220,9%,46%)' }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 'auto']}
                />
                
                {/* Tooltip */}
                <Tooltip content={<CustomTooltip />} />
                
                {/* Legend */}
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                  iconType="circle"
                  iconSize={8}
                />
                
                {/* Line for Present - Dark Indigo with fill */}
                <Line
                  type="monotone"
                  dataKey="present"
                  name="Present"
                  stroke={seriesConfig[0].color}
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: 'white', stroke: seriesConfig[0].color, strokeWidth: 2 }}
                  activeDot={{ r: 5, fill: seriesConfig[0].color }}
                  fill={seriesConfig[0].color}
                  fillOpacity={seriesConfig[0].fillOpacity}
                />
                
                {/* Line for Late - Magenta/Pink with fill */}
                <Line
                  type="monotone"
                  dataKey="late"
                  name="Late"
                  stroke={seriesConfig[1].color}
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: 'white', stroke: seriesConfig[1].color, strokeWidth: 2 }}
                  activeDot={{ r: 5, fill: seriesConfig[1].color }}
                  fill={seriesConfig[1].color}
                  fillOpacity={seriesConfig[1].fillOpacity}
                />
                
                {/* Line for Absent - Cyan/Sky Blue with fill */}
                <Line
                  type="monotone"
                  dataKey="absent"
                  name="Absent"
                  stroke={seriesConfig[2].color}
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: 'white', stroke: seriesConfig[2].color, strokeWidth: 2 }}
                  activeDot={{ r: 5, fill: seriesConfig[2].color }}
                  fill={seriesConfig[2].color}
                  fillOpacity={seriesConfig[2].fillOpacity}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
