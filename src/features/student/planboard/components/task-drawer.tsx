import * as React from 'react'
import { X } from 'lucide-react'
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

  const getStatusConfig = (status: string) => {
    const statusLower = status.toLowerCase().replace('-', '').replace(' ', '')
    const configs: Record<string, { bg: string; color: string; label: string }> = {
      assign: { bg: 'hsl(240, 20%, 98%)', color: 'hsl(220, 13%, 50%)', label: 'Assign' },
      inprogress: { bg: 'hsl(48, 96%, 95%)', color: 'hsl(38, 92%, 40%)', label: 'In Progress' },
      done: { bg: 'hsl(152, 76%, 96%)', color: 'hsl(158, 64%, 35%)', label: 'Done' },
      review: { bg: 'hsl(238, 94%, 96%)', color: 'hsl(238, 74%, 45%)', label: 'Review' },
      approved: { bg: 'hsl(180, 77%, 96%)', color: 'hsl(173, 58%, 30%)', label: 'Approved' },
      feedback: { bg: 'hsl(0, 86%, 97%)', color: 'hsl(0, 72%, 40%)', label: 'Feedback' },
      // Legacy support for existing statuses
      urgent: { bg: 'hsl(0, 86%, 97%)', color: 'hsl(0, 72%, 40%)', label: 'Urgent' },
      'in-progress': { bg: 'hsl(48, 96%, 95%)', color: 'hsl(38, 92%, 40%)', label: 'In Progress' },
      completed: { bg: 'hsl(152, 76%, 96%)', color: 'hsl(158, 64%, 35%)', label: 'Completed' },
      planned: { bg: 'hsl(271, 91%, 95%)', color: 'hsl(271, 81%, 56%)', label: 'Planned' },
      upcoming: { bg: 'hsl(240, 20%, 98%)', color: 'hsl(220, 13%, 50%)', label: 'Upcoming' },
    }
    return configs[statusLower] || configs.assign
  }

  const getPriorityConfig = (priority: string) => {
    const priorityLower = priority.toLowerCase()
    const configs: Record<string, { bg: string; color: string }> = {
      urgent: { bg: 'hsl(0, 86%, 97%)', color: 'hsl(0, 72%, 51%)' },
      high: { bg: 'hsl(48, 96%, 89%)', color: 'hsl(38, 92%, 50%)' },
      medium: { bg: 'hsl(238, 94%, 95%)', color: 'hsl(238, 74%, 59%)' },
      low: { bg: 'hsl(152, 76%, 94%)', color: 'hsl(158, 64%, 52%)' },
    }
    return configs[priorityLower] || configs.medium
  }

  const statusConfig = getStatusConfig(task.status)
  const priorityConfig = getPriorityConfig(task.priority)

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] transition-all duration-300',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-screen w-full sm:w-[480px] sm:max-w-[90vw] bg-white border-l border-[hsl(214,32%,91%)] shadow-2xl z-[1001]',
          'transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'flex flex-col overflow-hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-[hsl(214,32%,91%)] bg-[hsl(240,20%,98%)]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[hsl(240,20%,98%)] border border-[hsl(214,32%,91%)] flex items-center justify-center text-[hsl(220,9%,46%)] hover:bg-[hsl(0,86%,97%)] hover:text-[hsl(0,72%,51%)] hover:border-[hsl(0,72%,51%)] transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center pr-10">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-[hsl(222,84%,5%)] mb-1 line-clamp-1">
                {task.title}
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="text-[11px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-[hsl(240,20%,98%)]"
                  style={{ color: 'hsl(220, 9%, 66%)' }}
                >
                  {task.subject}
                </span>
                <span
                  className="text-[11px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md"
                  style={{ background: statusConfig.bg, color: statusConfig.color }}
                >
                  {statusConfig.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Task Details Section */}
          <div className="px-6 py-6 border-b border-[hsl(214,32%,91%)]">
            <h3 className="text-sm font-semibold text-[hsl(222,84%,5%)] mb-4">
              Details
            </h3>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Assigned To
                </label>
                <span className="text-[13px] text-[hsl(222,84%,5%)] font-medium">
                  {task.faculty || 'Student'}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Due Date
                </label>
                <span className="text-[13px] text-[hsl(222,84%,5%)] font-medium">
                  {formatDate(task.endDate)}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Priority
                </label>
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md inline-flex items-center w-fit"
                  style={{ background: priorityConfig.bg, color: priorityConfig.color }}
                >
                  {task.priority}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-[hsl(220,9%,46%)] uppercase tracking-wider">
                  Progress
                </label>
                <div>
                  <div className="h-1.5 bg-[hsl(214,32%,91%)] rounded-full overflow-hidden mb-1">
                    <div
                      className="h-full bg-gradient-to-r from-[hsl(238,74%,59%)] to-[hsl(271,81%,56%)] rounded-full transition-all duration-500"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-[hsl(238,74%,59%)]">
                    {task.progress}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="px-6 py-6 border-b border-[hsl(214,32%,91%)]">
            <h3 className="text-sm font-semibold text-[hsl(222,84%,5%)] mb-4">
              Description
            </h3>
            <div className="text-[13px] leading-relaxed text-[hsl(220,9%,46%)] p-3 bg-[hsl(240,20%,98%)] border border-[hsl(214,32%,91%)] rounded-lg">
              {task.description}
            </div>
          </div>

          {/* Activity/Comments Section */}
          <div className="px-6 py-6 border-b border-[hsl(214,32%,91%)]">
            <h3 className="text-sm font-semibold text-[hsl(222,84%,5%)] mb-4">
              Activity
            </h3>
            <div className="space-y-4">
              {task.comments && (
                <div className="p-3 bg-[hsl(240,20%,98%)] border border-[hsl(214,32%,91%)] rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-semibold text-[hsl(222,84%,5%)]">
                        {task.faculty}
                      </span>
                      <span className="text-[10px] text-[hsl(220,9%,66%)]">
                        2 hours ago
                      </span>
                    </div>
                    <p className="text-[12px] text-[hsl(220,9%,46%)] leading-snug">
                      {task.comments}
                    </p>
                  </div>
                </div>
              )}

              <div className="p-3 bg-[hsl(240,20%,98%)] border border-[hsl(214,32%,91%)] rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] font-semibold text-[hsl(222,84%,5%)]">
                      You
                    </span>
                    <span className="text-[10px] text-[hsl(220,9%,66%)]">
                      1 day ago
                    </span>
                  </div>
                  <p className="text-[12px] text-[hsl(220,9%,46%)] leading-snug">
                    Started working on this task
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*update Section */}
          <div className="px-6 py-6">
            <h3 className="text-sm font-semibold text-[hsl(222,84%,5%)] mb-4">
              Status Update
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-3 rounded-lg text-[12px] font-semibold text-[hsl(222,84%,5%)] bg-white border-[1.5px] border-[hsl(214,32%,91%)] hover:border-[hsl(238,74%,59%)] hover:bg-[hsl(238,94%,95%)] hover:text-[hsl(238,74%,59%)] transition-all duration-200 flex items-center justify-center">
                Mark as Done
              </button>
              <button className="px-4 py-3 rounded-lg text-[12px] font-semibold text-[hsl(222,84%,5%)] bg-white border-[1.5px] border-[hsl(214,32%,91%)] hover:border-[hsl(238,74%,59%)] hover:bg-[hsl(238,94%,95%)] hover:text-[hsl(238,74%,59%)] transition-all duration-200 flex items-center justify-center">
               In Progress
              </button>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="px-6 py-6">
            <h3 className="text-sm font-semibold text-[hsl(222,84%,5%)] mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-3 rounded-lg text-[12px] font-semibold text-[hsl(222,84%,5%)] bg-white border-[1.5px] border-[hsl(214,32%,91%)] hover:border-[hsl(238,74%,59%)] hover:bg-[hsl(238,94%,95%)] hover:text-[hsl(238,74%,59%)] transition-all duration-200 flex items-center justify-center">
                Add Comment
              </button>
              <button className="px-4 py-3 rounded-lg text-[12px] font-semibold text-[hsl(222,84%,5%)] bg-white border-[1.5px] border-[hsl(214,32%,91%)] hover:border-[hsl(238,74%,59%)] hover:bg-[hsl(238,94%,95%)] hover:text-[hsl(238,74%,59%)] transition-all duration-200 flex items-center justify-center">
                Request Extension
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
