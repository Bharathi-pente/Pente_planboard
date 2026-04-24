import * as React from 'react'
import { X, FileText, Calendar, User, ExternalLink, File, Download } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { formatDateTime } from '@/utils'
import { getStatusBadgeVariant } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ActivityFile {
  name: string
  size: string
  uploadedAt: string
}

interface ActivityDetailModalProps {
  isOpen: boolean
  onClose: () => void
  activity: {
    id: number
    title: string
    type: string
    subject: string
    description: string
    submittedDate: string
    status: string
    grade?: string
    faculty: string
    feedback?: string
    files?: ActivityFile[]
    links?: string[]
  } | null
}

export function ActivityDetailModal({ isOpen, onClose, activity }: ActivityDetailModalProps) {
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

  if (!isOpen || !activity) return null

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
            'bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh]',
            'flex flex-col animate-fadeIn'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[hsl(214,32%,91%)]">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="student" size="md">
                  {activity.type}
                </Badge>
                <Badge variant={getStatusBadgeVariant(activity.status as any)} size="md">
                  {activity.status}
                </Badge>
                {activity.grade && (
                  <Badge variant="approved" size="md">
                    Grade: {activity.grade}
                  </Badge>
                )}
              </div>
              <h2 className="text-xl font-semibold text-[hsl(222,84%,5%)]">
                {activity.title}
              </h2>
              <p className="text-sm text-[hsl(220,9%,46%)] mt-1">{activity.subject}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[hsl(240,20%,96%)] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[hsl(220,9%,46%)]" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            {/* Description */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Description
                </h4>
              </div>
              <p className="text-sm text-[hsl(222,84%,5%)] leading-relaxed">
                {activity.description}
              </p>
            </div>

            {/* Submission Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                  <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Submitted
                  </h4>
                </div>
                <p className="text-sm text-[hsl(222,84%,5%)] font-medium">
                  {formatDateTime(activity.submittedDate)}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                  <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Faculty
                  </h4>
                </div>
                <p className="text-sm text-[hsl(222,84%,5%)] font-medium">
                  {activity.faculty}
                </p>
              </div>
            </div>

            {/* Files */}
            {activity.files && activity.files.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] mb-3 uppercase tracking-wider">
                  Attached Files ({activity.files.length})
                </h4>
                <div className="space-y-2">
                  {activity.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-[hsl(240,20%,96%)] rounded-lg hover:bg-[hsl(214,32%,91%)] transition-colors cursor-pointer"
                    >
                      <File className="w-5 h-5 text-[hsl(238,74%,59%)] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[hsl(222,84%,5%)] truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-[hsl(220,9%,46%)]">
                          {file.size} • Uploaded {formatDateTime(file.uploadedAt)}
                        </p>
                      </div>
                      <button className="p-1.5 hover:bg-white rounded transition-colors">
                        <Download className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {activity.links && activity.links.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] mb-3 uppercase tracking-wider">
                  Links ({activity.links.length})
                </h4>
                <div className="space-y-2">
                  {activity.links.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-[hsl(240,20%,96%)] rounded-lg hover:bg-[hsl(214,32%,91%)] transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-[hsl(238,74%,59%)] flex-shrink-0" />
                      <p className="text-sm text-[hsl(238,74%,59%)] truncate flex-1">
                        {link}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback */}
            {activity.feedback && (
              <div>
                <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] mb-2 uppercase tracking-wider">
                  Faculty Feedback
                </h4>
                <div className="bg-[hsl(152,76%,94%)] border border-[hsl(158,64%,52%)]/20 rounded-lg p-4">
                  <p className="text-sm text-[hsl(222,84%,5%)] leading-relaxed">
                    {activity.feedback}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[hsl(214,32%,91%)] bg-[hsl(240,20%,98%)]">
            <div className="flex gap-3">
              <Button variant="bgo" size="md" fullWidth onClick={onClose}>
                Close
              </Button>
              {activity.status !== 'approved' && activity.status !== 'completed' && (
                <Button variant="bacc" size="md" fullWidth>
                  Resubmit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
