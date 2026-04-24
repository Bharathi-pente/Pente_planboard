import { cn } from '@/lib/utils'
import { Calendar } from 'lucide-react'

interface Deadline {
  id: number
  title: string
  tag: string
  date: string
  color: 'red' | 'yellow' | 'blue'
}

interface DeadlineCardProps {
  deadline: Deadline
}

const colorConfig = {
  red: {
    bg: 'bg-[hsl(0,72%,51%)]/10',
    border: 'border-[hsl(0,72%,51%)]',
    text: 'text-[hsl(0,72%,51%)]',
    badge: 'bg-[hsl(0,72%,51%)] text-white',
  },
  yellow: {
    bg: 'bg-[hsl(38,92%,50%)]/10',
    border: 'border-[hsl(38,92%,50%)]',
    text: 'text-[hsl(38,92%,50%)]',
    badge: 'bg-[hsl(38,92%,50%)] text-white',
  },
  blue: {
    bg: 'bg-[hsl(238,74%,59%)]/10',
    border: 'border-[hsl(238,74%,59%)]',
    text: 'text-[hsl(238,74%,59%)]',
    badge: 'bg-[hsl(238,74%,59%)] text-white',
  },
}

export function DeadlineCard({ deadline }: DeadlineCardProps) {
  const colors = colorConfig[deadline.color]

  return (
    <div
      className={cn(
        'p-4 rounded-lg border-l-4 transition-all hover:shadow-md',
        colors.bg,
        colors.border
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className={cn('text-sm font-semibold', colors.text)}>{deadline.title}</h4>
        <span className={cn('text-[10px] font-semibold px-2 py-1 rounded', colors.badge)}>
          {deadline.tag}
        </span>
      </div>
      <p className="text-[10px] text-[hsl(220,9%,46%)] flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        {deadline.date}
      </p>
    </div>
  )
}
