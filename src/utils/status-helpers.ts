/**
 * Status Helper Utilities
 */

import type { Status, Priority } from '@/types'

export function getStatusColor(status: Status): {
  bg: string
  text: string
  border: string
} {
  const statusColors: Record<Status, { bg: string; text: string; border: string }> = {
    pending: {
      bg: 'hsl(48, 96%, 89%)',
      text: 'hsl(38, 92%, 50%)',
      border: 'hsl(38, 92%, 50%)/10',
    },
    'in-progress': {
      bg: 'hsl(238, 94%, 95%)',
      text: 'hsl(238, 74%, 59%)',
      border: 'hsl(238, 74%, 59%)/10',
    },
    completed: {
      bg: 'hsl(152, 76%, 94%)',
      text: 'hsl(158, 64%, 52%)',
      border: 'hsl(158, 64%, 52%)/10',
    },
    approved: {
      bg: 'hsl(152, 76%, 94%)',
      text: 'hsl(158, 64%, 52%)',
      border: 'hsl(158, 64%, 52%)/10',
    },
    rejected: {
      bg: 'hsl(0, 86%, 97%)',
      text: 'hsl(0, 72%, 51%)',
      border: 'hsl(0, 72%, 51%)/10',
    },
    review: {
      bg: 'hsl(271, 91%, 95%)',
      text: 'hsl(271, 81%, 56%)',
      border: 'hsl(271, 81%, 56%)/10',
    },
  }

  return statusColors[status] || statusColors.pending
}

export function getPriorityColor(priority: Priority): {
  bg: string
  text: string
} {
  const priorityColors: Record<Priority, { bg: string; text: string }> = {
    low: {
      bg: 'hsl(152, 76%, 94%)',
      text: 'hsl(158, 64%, 52%)',
    },
    medium: {
      bg: 'hsl(238, 94%, 95%)',
      text: 'hsl(238, 74%, 59%)',
    },
    high: {
      bg: 'hsl(48, 96%, 89%)',
      text: 'hsl(38, 92%, 50%)',
    },
    urgent: {
      bg: 'hsl(0, 86%, 97%)',
      text: 'hsl(0, 72%, 51%)',
    },
  }

  return priorityColors[priority] || priorityColors.medium
}

export function getStatusLabel(status: Status): string {
  const labels: Record<Status, string> = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
    approved: 'Approved',
    rejected: 'Rejected',
    review: 'Under Review',
  }

  return labels[status] || status
}

export function getPriorityLabel(priority: Priority): string {
  const labels: Record<Priority, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  }

  return labels[priority] || priority
}
