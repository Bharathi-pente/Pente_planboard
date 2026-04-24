import { Button } from '@/components/ui'
import { ArrowRight, Archive, CheckSquare, FileText } from 'lucide-react'

interface DigitalLockerSummaryProps {
  data: {
    verifiedEvidence: number
    certificates: number
    projects: number
    assignments: number
  }
}

export function DigitalLockerCard({ data }: DigitalLockerSummaryProps) {
  return (
    <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] p-6 shadow-sm">
      <h3 className="text-base font-semibold text-[hsl(222,84%,5%)] mb-4">Digital Locker Summary</h3>

      {/* Verified Evidence Count */}
      <div className="mb-5">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-bold text-[hsl(158,64%,52%)]">{data.verifiedEvidence}</span>
          <span className="text-sm text-[hsl(220,9%,46%)]">verified items</span>
        </div>
        <p className="text-xs text-[hsl(220,9%,46%)]">Stored in your locker</p>
      </div>

      {/* Stats Grid */}
      <div className="space-y-3 mb-5 pb-5 border-b border-[hsl(214,32%,91%)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Archive className="w-4 h-4 text-[hsl(158,64%,52%)]" />
            <span className="text-sm text-[hsl(220,9%,46%)]">Certificates</span>
          </div>
          <span className="text-sm font-semibold text-[hsl(222,84%,5%)]">{data.certificates}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[hsl(238,74%,59%)]" />
            <span className="text-sm text-[hsl(220,9%,46%)]">Projects</span>
          </div>
          <span className="text-sm font-semibold text-[hsl(222,84%,5%)]">{data.projects}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[hsl(38,92%,50%)]" />
            <span className="text-sm text-[hsl(220,9%,46%)]">Assignments</span>
          </div>
          <span className="text-sm font-semibold text-[hsl(222,84%,5%)]">{data.assignments}</span>
        </div>
      </div>

      {/* Browse Button */}
      <Button variant="bacc" size="md" fullWidth>
        Browse All Files
        <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  )
}
