import * as React from 'react'
import { X, User, Calendar, Clock, TrendingUp, FileText } from 'lucide-react'
import { Button, Badge, Progress } from '@/components/ui'
import { formatDate } from '@/utils'
import { cn } from '@/lib/utils'

interface TaskDetails {
  id: number
  subject: string
  title: string
  description: string
  status: string
  priority: string
  startDate: string
  endDate: string
  progress: number
  faculty: string
  submissions?: number
  grade?: string
  comments?: string
  estimatedHours?: number
  completedHours?: number
  dueInDays?: number
}

interface TaskDrawerProps {
  isOpen: boolean
  onClose: () => void
  task: TaskDetails | null
}

export function TaskDrawer({ isOpen, onClose, task }: TaskDrawerProps) {
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

  if (!task) return null

  const getStatusColor = (status?: string) => {
    if (!status) return 'pending'
    const colors: Record<string, string> = {
      completed: 'approved',
      'in-progress': 'in-progress',
      planned: 'pending',
      review: 'review',
    }
    return colors[status.toLowerCase()] || 'pending'
  }

  const getPriorityColor = (priority?: string) => {
    if (!priority) return 'pending'
    const colors: Record<string, string> = {
      urgent: 'rejected',
      high: 'pending',
      medium: 'in-progress',
      low: 'approved',
    }
    return colors[priority.toLowerCase()] || 'pending'
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-screen w-full sm:w-[480px] bg-white shadow-2xl z-50',
          'transform transition-transform duration-300 ease-out',
          'flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[hsl(214,32%,91%)]">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-[hsl(222,84%,5%)] mb-1">
              Task Details
            </h2>
            <p className="text-sm text-[hsl(220,9%,46%)]">{task.subject}</p>
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
          {/* Title & Badges */}
          <div>
            <h3 className="text-lg font-medium text-[hsl(222,84%,5%)] mb-3">
              {task.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={getStatusColor(task.status) as any} size="md">
                {task.status}
              </Badge>
              <Badge variant={getPriorityColor(task.priority) as any} size="md">
                {task.priority} Priority
              </Badge>
              {task.grade && (
                <Badge variant="approved" size="md">
                  Grade: {task.grade}
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Description
                </h4>
              </div>
              <p className="text-sm text-[hsl(222,84%,5%)] leading-relaxed">
                {task.description}
              </p>
            </div>
          )}

          {/* Progress */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[hsl(220,9%,46%)]" />
              <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Progress
              </h4>
            </div>
            <Progress
              value={task.progress}
              max={100}
              variant="student"
              size="md"
              showLabel
            />
          </div>

          {/* Timeline */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-[hsl(220,9%,46%)]" />
              <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Timeline
              </h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[hsl(220,9%,46%)]">Start Date:</span>
                <span className="text-[hsl(222,84%,5%)] font-medium">
                  {formatDate(task.startDate)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[hsl(220,9%,46%)]">End Date:</span>
                <span className="text-[hsl(222,84%,5%)] font-medium">
                  {formatDate(task.endDate)}
                </span>
              </div>
              {task.dueInDays !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="text-[hsl(220,9%,46%)]">Time Remaining:</span>
                  <span
                    className={cn(
                      'font-medium',
                      task.dueInDays <= 3
                        ? 'text-[hsl(0,72%,51%)]'
                        : 'text-[hsl(158,64%,52%)]'
                    )}
                  >
                    {task.dueInDays} days
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Faculty */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-[hsl(220,9%,46%)]" />
              <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                Faculty
              </h4>
            </div>
            <p className="text-sm text-[hsl(222,84%,5%)] font-medium">
              {task.faculty}
            </p>
          </div>

          {/* Hours */}
          {task.estimatedHours !== undefined && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[hsl(220,9%,46%)]" />
                <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Time Tracking
                </h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[hsl(220,9%,46%)]">Estimated Hours:</span>
                  <span className="text-[hsl(222,84%,5%)] font-medium">
                    {task.estimatedHours}h
                  </span>
                </div>
                {task.completedHours !== undefined && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(220,9%,46%)]">Completed Hours:</span>
                    <span className="text-[hsl(222,84%,5%)] font-medium">
                      {task.completedHours}h
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Comments/Feedback */}
          {task.comments && (
            <div>
              <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] mb-2 uppercase tracking-wider">
                Faculty Comments
              </h4>
              <div className="bg-[hsl(152,76%,94%)] border border-[hsl(158,64%,52%)]/20 rounded-lg p-4">
                <p className="text-sm text-[hsl(222,84%,5%)] leading-relaxed">
                  {task.comments}
                </p>
              </div>
            </div>
          )}

          {/* Submissions */}
          {task.submissions !== undefined && (
            <div>
              <h4 className="text-sm font-medium text-[hsl(220,9%,46%)] mb-2 uppercase tracking-wider">
                Submissions
              </h4>
              <p className="text-sm text-[hsl(222,84%,5%)]">
                {task.submissions} {task.submissions === 1 ? 'submission' : 'submissions'}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[hsl(214,32%,91%)] bg-[hsl(240,20%,98%)]">
          <div className="flex gap-3">
            <Button variant="bgo" size="md" fullWidth onClick={onClose}>
              Close
            </Button>
            {task.status.toLowerCase() !== 'completed' && (
              <Button variant="bacc" size="md" fullWidth>
                Submit Work
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
