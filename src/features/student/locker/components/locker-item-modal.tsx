import * as React from 'react'
import { X, Calendar, User, FileText, ExternalLink, Download, File } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { formatDate, formatDateTime } from '@/utils'
import { cn } from '@/lib/utils'

interface LockerItemFile {
  name: string
  size: string
  type: string
}

interface LockerItemModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    name: string
    type: string
    category: string
    description: string
    verifiedDate: string
    issuedDate?: string
    expiryDate?: string
    issuer?: string
    status: string
    verifiedBy: string
    faculty?: string
    submittedDate?: string
    grade?: string
    files?: LockerItemFile[]
    links?: string[]
    metadata?: Record<string, any>
  } | null
}

export function LockerItemModal({ isOpen, onClose, item }: LockerItemModalProps) {
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

  if (!isOpen || !item) return null

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Certificate':
        return '🏆'
      case 'Project':
        return '💼'
      case 'Test':
        return '📝'
      default:
        return '📄'
    }
  }

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
                <span className="text-3xl">{getTypeIcon(item.type)}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="approved" size="md">
                      {item.type}
                    </Badge>
                    <Badge variant="student" size="md">
                      {item.category}
                    </Badge>
                  </div>
                  <h2 className="text-xl font-semibold text-[hsl(222,84%,5%)]">
                    {item.name}
                  </h2>
                </div>
              </div>
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
                {item.description}
              </p>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                  <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Verified Date
                  </h4>
                </div>
                <p className="text-sm text-[hsl(222,84%,5%)] font-medium">
                  {formatDateTime(item.verifiedDate)}
                </p>
              </div>

              {item.issuedDate && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                    <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                      Issued Date
                    </h4>
                  </div>
                  <p className="text-sm text-[hsl(222,84%,5%)] font-medium">
                    {formatDate(item.issuedDate)}
                  </p>
                </div>
              )}

              {item.submittedDate && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                    <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                      Submitted Date
                    </h4>
                  </div>
                  <p className="text-sm text-[hsl(222,84%,5%)] font-medium">
                    {formatDate(item.submittedDate)}
                  </p>
                </div>
              )}

              {item.expiryDate && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                    <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                      Valid Until
                    </h4>
                  </div>
                  <p className="text-sm text-[hsl(222,84%,5%)] font-medium">
                    {formatDate(item.expiryDate)}
                  </p>
                </div>
              )}
            </div>

            {/* Issuer/Faculty/Grade */}
            <div className="grid grid-cols-2 gap-4">
              {item.issuer && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                    <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                      Issued By
                    </h4>
                  </div>
                  <p className="text-sm text-[hsl(222,84%,5%)] font-medium">
                    {item.issuer}
                  </p>
                </div>
              )}

              {item.faculty && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                    <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                      Faculty
                    </h4>
                  </div>
                  <p className="text-sm text-[hsl(222,84%,5%)] font-medium">
                    {item.faculty}
                  </p>
                </div>
              )}

              {item.grade && (
                <div>
                  <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] mb-2 uppercase tracking-wider">
                    Grade
                  </h4>
                  <Badge variant="approved" size="lg">
                    {item.grade}
                  </Badge>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                  <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                    Verified By
                  </h4>
                </div>
                <p className="text-sm text-[hsl(222,84%,5%)] font-medium">
                  {item.verifiedBy}
                </p>
              </div>
            </div>

            {/* Metadata */}
            {item.metadata && Object.keys(item.metadata).length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] mb-3 uppercase tracking-wider">
                  Additional Details
                </h4>
                <div className="bg-[hsl(240,20%,96%)] rounded-lg p-4 space-y-2">
                  {Object.entries(item.metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-[hsl(220,9%,46%)] capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-[hsl(222,84%,5%)] font-medium">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Files */}
            {item.files && item.files.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] mb-3 uppercase tracking-wider">
                  Attached Files ({item.files.length})
                </h4>
                <div className="space-y-2">
                  {item.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-[hsl(240,20%,96%)] rounded-lg hover:bg-[hsl(214,32%,91%)] transition-colors cursor-pointer"
                    >
                      <File className="w-5 h-5 text-[hsl(238,74%,59%)] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[hsl(222,84%,5%)] truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-[hsl(220,9%,46%)]">{file.size}</p>
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
            {item.links && item.links.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] mb-3 uppercase tracking-wider">
                  Links ({item.links.length})
                </h4>
                <div className="space-y-2">
                  {item.links.map((link, index) => (
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
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[hsl(214,32%,91%)] bg-[hsl(240,20%,98%)]">
            <div className="flex gap-3">
              <Button variant="bgo" size="md" fullWidth onClick={onClose}>
                Close
              </Button>
              <Button variant="bacc" size="md" fullWidth>
                <Download className="w-4 h-4" />
                Download Certificate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
