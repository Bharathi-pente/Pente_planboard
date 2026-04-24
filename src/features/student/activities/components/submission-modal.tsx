import * as React from 'react'
import { X, Upload, Link as LinkIcon, File, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { validateFileSize, validateFileType, formatFileSize } from '@/utils'
import { FILE_UPLOAD } from '@/config/constants'

interface SubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  activity?: {
    title: string
    subject: string
  } | null
}

export function SubmissionModal({ isOpen, onClose, activity }: SubmissionModalProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [links, setLinks] = React.useState<string[]>([''])
  const [submissionType, setSubmissionType] = React.useState<'file' | 'link'>('file')
  const [errors, setErrors] = React.useState<string[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setFiles([])
      setLinks([''])
      setErrors([])
      setSubmissionType('file')
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const newErrors: string[] = []

    selectedFiles.forEach((file) => {
      if (!validateFileSize(file, FILE_UPLOAD.MAX_SIZE / (1024 * 1024))) {
        newErrors.push(`${file.name}: File size exceeds 10MB`)
      } else if (!validateFileType(file, [...FILE_UPLOAD.ALLOWED_TYPES])) {
        newErrors.push(`${file.name}: Invalid file type`)
      }
    })

    setErrors(newErrors)
    if (newErrors.length === 0) {
      setFiles((prev) => [...prev, ...selectedFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const addLink = () => {
    setLinks((prev) => [...prev, ''])
  }

  const updateLink = (index: number, value: string) => {
    setLinks((prev) => prev.map((link, i) => (i === index ? value : link)))
  }

  const removeLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    // In real app, this would submit to API
    console.log('Submitting:', { files, links: links.filter(l => l), activity })
    onClose()
  }

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
            'bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh]',
            'flex flex-col animate-fadeIn'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[hsl(214,32%,91%)]">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-[hsl(222,84%,5%)] mb-1">
                Submit Work
              </h2>
              <p className="text-sm text-[hsl(220,9%,46%)]">
                {activity.title} • {activity.subject}
              </p>
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
            {/* Submission Type Tabs */}
            <div>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setSubmissionType('file')}
                  className={cn(
                    'flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all',
                    submissionType === 'file'
                      ? 'bg-[hsl(238,74%,59%)] text-white'
                      : 'bg-[hsl(240,20%,96%)] text-[hsl(220,9%,46%)] hover:bg-[hsl(214,32%,91%)]'
                  )}
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  Upload Files
                </button>
                <button
                  onClick={() => setSubmissionType('link')}
                  className={cn(
                    'flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all',
                    submissionType === 'link'
                      ? 'bg-[hsl(238,74%,59%)] text-white'
                      : 'bg-[hsl(240,20%,96%)] text-[hsl(220,9%,46%)] hover:bg-[hsl(214,32%,91%)]'
                  )}
                >
                  <LinkIcon className="w-4 h-4 inline mr-2" />
                  Add Links
                </button>
              </div>
            </div>

            {/* File Upload */}
            {submissionType === 'file' && (
              <div>
                <label className="block text-sm font-medium text-[hsl(220,9%,46%)] mb-2 uppercase tracking-wider">
                  Upload Files
                </label>
                
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[hsl(214,32%,91%)] rounded-lg p-8 text-center cursor-pointer hover:border-[hsl(238,74%,59%)] hover:bg-[hsl(238,94%,95%)] transition-all"
                >
                  <Upload className="w-12 h-12 mx-auto mb-3 text-[hsl(220,9%,66%)]" />
                  <p className="text-sm font-medium text-[hsl(222,84%,5%)] mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-[hsl(220,9%,46%)]">
                    PDF, DOC, DOCX, ZIP, TXT (Max 10MB)
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={FILE_UPLOAD.ALLOWED_EXTENSIONS.join(',')}
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* Uploaded Files */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-[hsl(240,20%,96%)] rounded-lg"
                      >
                        <File className="w-5 h-5 text-[hsl(238,74%,59%)] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[hsl(222,84%,5%)] truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-[hsl(220,9%,46%)]">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-white rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Errors */}
                {errors.length > 0 && (
                  <div className="mt-4 p-3 bg-[hsl(0,86%,97%)] border border-[hsl(0,72%,51%)]/20 rounded-lg">
                    <div className="flex gap-2">
                      <AlertCircle className="w-5 h-5 text-[hsl(0,72%,51%)] flex-shrink-0" />
                      <div>
                        {errors.map((error, index) => (
                          <p key={index} className="text-sm text-[hsl(0,72%,51%)]">
                            {error}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Link Input */}
            {submissionType === 'link' && (
              <div>
                <label className="block text-sm font-medium text-[hsl(220,9%,46%)] mb-2 uppercase tracking-wider">
                  Add Links
                </label>
                <div className="space-y-3">
                  {links.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="url"
                        value={link}
                        onChange={(e) => updateLink(index, e.target.value)}
                        placeholder="https://github.com/username/repository"
                        className="flex-1 px-3 py-2 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-sm text-[hsl(222,84%,5%)] placeholder:text-[hsl(220,9%,46%)] focus:outline-none focus:ring-2 focus:ring-[hsl(238,74%,59%)] focus:border-transparent"
                      />
                      {links.length > 1 && (
                        <button
                          onClick={() => removeLink(index)}
                          className="p-2 hover:bg-[hsl(240,20%,96%)] rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-[hsl(220,9%,46%)]" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={addLink}
                  className="mt-3 text-sm text-[hsl(238,74%,59%)] hover:text-[hsl(238,74%,54%)] font-medium"
                >
                  + Add another link
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[hsl(214,32%,91%)] bg-[hsl(240,20%,98%)]">
            <div className="flex gap-3">
              <Button variant="bgo" size="md" fullWidth onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="bacc"
                size="md"
                fullWidth
                onClick={handleSubmit}
                disabled={
                  (submissionType === 'file' && files.length === 0) ||
                  (submissionType === 'link' && !links.some((l) => l))
                }
              >
                Submit Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
