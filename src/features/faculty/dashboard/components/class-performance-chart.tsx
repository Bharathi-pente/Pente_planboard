import { useState } from 'react'
import { BarChart3, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface ClassPerformanceDataPoint {
  label: string
  value: number
}

interface ClassPerformanceChartProps {
  monthlyData: { [key: string]: ClassPerformanceDataPoint[][] }
  yearlyData: ClassPerformanceDataPoint[][]
}

const seriesConfig = [
  { name: 'CSE 4A - ML', dataKey: 'class1', color: '#4C4BC8', fillOpacity: 0.15 },
  { name: 'CSE 4B - DB', dataKey: 'class2', color: '#10B981', fillOpacity: 0.18 },
  { name: 'CSE 3A - DS', dataKey: 'class3', color: '#F59E0B', fillOpacity: 0.15 },
]

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export function ClassPerformanceChart({ monthlyData, yearlyData }: ClassPerformanceChartProps) {
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly')
  const [chartType, setChartType] = useState<'line' | 'bar'>('bar')
  const [currentMonthIndex, setCurrentMonthIndex] = useState(3) // Start with April (index 3)
  
  const currentMonthName = monthNames[currentMonthIndex]
  const dataSeries = viewMode === 'monthly' 
    ? monthlyData[currentMonthName] 
    : yearlyData
  
  // Transform data for Recharts format
  const chartData = dataSeries[0].map((_, index) => ({
    label: dataSeries[0][index].label,
    class1: dataSeries[0][index].value,
    class2: dataSeries[1][index].value,
    class3: dataSeries[2][index].value,
  }))
  
  // Calculate stats from all series
  const calculateAverage = (series: ClassPerformanceDataPoint[]) => 
    Math.round(series.reduce((sum, d) => sum + d.value, 0) / series.length)
  
  const averageCompletion = Math.round(
    (calculateAverage(dataSeries[0]) + 
     calculateAverage(dataSeries[1]) + 
     calculateAverage(dataSeries[2])) / 3
  )
  
  const currentCompletion = Math.round(
    (dataSeries[0][dataSeries[0].length - 1].value +
     dataSeries[1][dataSeries[1].length - 1].value +
     dataSeries[2][dataSeries[2].length - 1].value) / 3
  )
  
  const trend = currentCompletion > averageCompletion ? 'up' : 'down'
  
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
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(158,64%,52%)]/5 via-transparent to-[hsl(173,58%,39%)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)] flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-500">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] group-hover:text-[hsl(158,64%,52%)] transition-colors duration-300">
                Class Performance Analytics
              </h3>
              <p className="text-xs text-[hsl(220,9%,46%)]">
                {viewMode === 'monthly' ? currentMonthName : 'Track completion rates'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Month Navigation (only in monthly view) */}
            {viewMode === 'monthly' && (
              <div className="flex items-center gap-1 bg-[hsl(240,20%,98%)] p-1 rounded-lg border border-[hsl(214,32%,91%)] mr-2">
                <button
                  onClick={handlePreviousMonth}
                  className="p-1.5 rounded-md text-[hsl(220,9%,46%)] hover:text-[hsl(158,64%,52%)] hover:bg-white transition-all duration-300"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-3 text-xs font-semibold text-[hsl(222,84%,5%)] min-w-[80px] text-center">
                  {currentMonthName}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-md text-[hsl(220,9%,46%)] hover:text-[hsl(158,64%,52%)] hover:bg-white transition-all duration-300"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Chart Type Toggle */}
            <div className="flex gap-1 bg-[hsl(240,20%,98%)] p-1 rounded-lg border border-[hsl(214,32%,91%)] mr-2">
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-300 ${
                  chartType === 'bar'
                    ? 'bg-gradient-to-br from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)] text-white shadow-md'
                    : 'text-[hsl(220,9%,46%)] hover:text-[hsl(158,64%,52%)]'
                }`}
              >
                Bar
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-300 ${
                  chartType === 'line'
                    ? 'bg-gradient-to-br from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)] text-white shadow-md'
                    : 'text-[hsl(220,9%,46%)] hover:text-[hsl(158,64%,52%)]'
                }`}
              >
                Line
              </button>
            </div>

            {/* View Mode Toggle Buttons */}
            <div className="flex gap-1 bg-[hsl(240,20%,98%)] p-1 rounded-lg border border-[hsl(214,32%,91%)]">
              <button
                onClick={() => setViewMode('monthly')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-300 ${
                  viewMode === 'monthly'
                    ? 'bg-gradient-to-br from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)] text-white shadow-md'
                    : 'text-[hsl(220,9%,46%)] hover:text-[hsl(158,64%,52%)]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setViewMode('yearly')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-300 ${
                  viewMode === 'yearly'
                    ? 'bg-gradient-to-br from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)] text-white shadow-md'
                    : 'text-[hsl(220,9%,46%)] hover:text-[hsl(158,64%,52%)]'
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
            <div className="text-xl font-bold text-[hsl(158,64%,52%)]">{currentCompletion}%</div>
          </div>
          <div className="bg-[hsl(240,20%,98%)] rounded-lg p-3 border border-[hsl(214,32%,91%)]">
            <div className="text-xs text-[hsl(220,9%,46%)] mb-1">Average</div>
            <div className="text-xl font-bold text-[hsl(222,84%,5%)]">{averageCompletion}%</div>
          </div>
          <div className="bg-[hsl(240,20%,98%)] rounded-lg p-3 border border-[hsl(214,32%,91%)]">
            <div className="text-xs text-[hsl(220,9%,46%)] mb-1">Trend</div>
            <div className={`text-xl font-bold flex items-center gap-1 ${trend === 'up' ? 'text-[hsl(158,64%,52%)]' : 'text-[hsl(0,72%,51%)]'}`}>
              <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
              {trend === 'up' ? '+' : '-'}{Math.abs(currentCompletion - averageCompletion)}%
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 flex flex-col">
          <div className="bg-gradient-to-br from-[hsl(240,20%,98%)] to-white rounded-xl p-4 border border-[hsl(214,32%,91%)] flex-1 flex flex-col">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 4"
                    stroke="hsl(214,32%,85%)"
                    strokeWidth={0.5}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: 'hsl(220,9%,46%)' }}
                    tickLine={false}
                    axisLine={{ stroke: 'hsl(214,32%,91%)', strokeWidth: 1 }}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: 'hsl(220,9%,46%)' }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Bar
                    dataKey="class1"
                    name={seriesConfig[0].name}
                    fill={seriesConfig[0].color}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="class2"
                    name={seriesConfig[1].name}
                    fill={seriesConfig[1].color}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="class3"
                    name={seriesConfig[2].name}
                    fill={seriesConfig[2].color}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              ) : (
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 4"
                    stroke="hsl(214,32%,85%)"
                    strokeWidth={0.5}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 10, fill: 'hsl(220,9%,46%)' }}
                    tickLine={false}
                    axisLine={{ stroke: 'hsl(214,32%,91%)', strokeWidth: 1 }}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: 'hsl(220,9%,46%)' }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    iconType="circle"
                    iconSize={8}
                  />
                  <Line
                    type="monotone"
                    dataKey="class1"
                    name={seriesConfig[0].name}
                    stroke={seriesConfig[0].color}
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: 'white', stroke: seriesConfig[0].color, strokeWidth: 2 }}
                    activeDot={{ r: 5, fill: seriesConfig[0].color }}
                    fill={seriesConfig[0].color}
                    fillOpacity={seriesConfig[0].fillOpacity}
                  />
                  <Line
                    type="monotone"
                    dataKey="class2"
                    name={seriesConfig[1].name}
                    stroke={seriesConfig[1].color}
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: 'white', stroke: seriesConfig[1].color, strokeWidth: 2 }}
                    activeDot={{ r: 5, fill: seriesConfig[1].color }}
                    fill={seriesConfig[1].color}
                    fillOpacity={seriesConfig[1].fillOpacity}
                  />
                  <Line
                    type="monotone"
                    dataKey="class3"
                    name={seriesConfig[2].name}
                    stroke={seriesConfig[2].color}
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: 'white', stroke: seriesConfig[2].color, strokeWidth: 2 }}
                    activeDot={{ r: 5, fill: seriesConfig[2].color }}
                    fill={seriesConfig[2].color}
                    fillOpacity={seriesConfig[2].fillOpacity}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
