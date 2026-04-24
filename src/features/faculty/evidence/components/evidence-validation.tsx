import { CheckCircle, XCircle, Eye } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { KPICard } from '@/components/shared'
import { mockEvidence, evidenceStats } from '@/data'
import { cn } from '@/lib/utils'

export function EvidenceValidation() {
  const pendingEvidence = mockEvidence.filter((e) => e.status === 'pending')
  const recentlyValidated = mockEvidence.filter((e) => e.status !== 'pending')

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[hsl(222,84%,5%)] mb-2">
              Evidence Validation
            </h1>
            <p className="text-sm text-[hsl(220,9%,46%)]">
              Validate student evidence and supporting documents
            </p>
          </div>
          <Badge variant="pending" size="md">
            {evidenceStats.pending} Pending
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <KPICard
          title="Pending Validation"
          value={evidenceStats.pending}
          subtitle="Needs review"
          variant="supervisor"
        />
        <KPICard
          title="Validated Today"
          value={evidenceStats.validatedToday}
          subtitle="Good progress"
          variant="faculty"
        />
        <KPICard
          title="Rejected"
          value={evidenceStats.rejected}
          subtitle="Needs resubmit"
          variant="supervisor"
        />
      </div>

      {/* Main Content: 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
        {/* Left: Pending Evidence */}
        <div>
          <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[hsl(222,84%,5%)]">
                Certificates & Achievements
              </h3>
            </div>

            <div className="space-y-4">
              {pendingEvidence.map((evidence) => (
                <div
                  key={evidence.id}
                  className="p-4 bg-[hsl(240,20%,98%)] border border-[hsl(214,32%,91%)] rounded-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-[hsl(222,84%,5%)] mb-1">
                        {evidence.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[hsl(220,9%,46%)]">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                          style={{ background: evidence.student.color }}
                        >
                          {evidence.student.avatar}
                        </div>
                        <span>{evidence.student.name}</span>
                        <span>·</span>
                        <span>{evidence.category}</span>
                      </div>
                    </div>
                    <Badge variant="review" size="sm">
                      Pending
                    </Badge>
                  </div>

                  <div className="text-xs text-[hsl(220,9%,46%)] mb-3">
                    📄 {evidence.fileType} · {evidence.fileSize} · Uploaded {evidence.uploadedDate}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="bgrn" size="sm">
                      <CheckCircle className="w-3 h-3" />
                      Validate
                    </Button>
                    <Button variant="bred" size="sm">
                      <XCircle className="w-3 h-3" />
                      Reject
                    </Button>
                    <Button variant="bgo" size="sm">
                      <Eye className="w-3 h-3" />
                      View Document
                    </Button>
                  </div>
                </div>
              ))}

              {pendingEvidence.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-sm text-[hsl(220,9%,46%)]">
                    No pending evidence to validate.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Recently Validated */}
        <div>
          <div className="bg-white rounded-xl border border-[hsl(214,32%,91%)] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[hsl(222,84%,5%)]">
                Recently Validated
              </h3>
            </div>

            <div className="space-y-3">
              {recentlyValidated.map((evidence) => (
                <div
                  key={evidence.id}
                  className={cn(
                    'p-3 rounded-lg flex items-center justify-between',
                    evidence.status === 'validated'
                      ? 'bg-[hsl(152,76%,94%)]'
                      : 'bg-[hsl(0,86%,97%)]'
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div
                      className={cn(
                        'text-sm font-semibold mb-1',
                        evidence.status === 'validated'
                          ? 'text-[hsl(158,64%,52%)]'
                          : 'text-[hsl(0,72%,51%)]'
                      )}
                    >
                      {evidence.title}
                    </div>
                    <div className="text-xs text-[hsl(220,9%,46%)]">
                      {evidence.student.name} · {evidence.validatedDate}
                    </div>
                  </div>
                  <Badge
                    variant={evidence.status === 'validated' ? 'approved' : 'rejected'}
                    size="sm"
                  >
                    {evidence.status === 'validated' ? '✓ Valid' : '✗ Invalid'}
                  </Badge>
                </div>
              ))}

              {recentlyValidated.length === 0 && (
                <div className="text-center py-8 text-sm text-[hsl(220,9%,46%)]">
                  No recently validated evidence
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
