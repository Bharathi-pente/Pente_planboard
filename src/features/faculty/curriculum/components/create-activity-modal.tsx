import * as React from 'react'
import { X, Calendar, BookOpen, Users as UsersIcon } from 'lucide-react'
import { Button } from '@/components/ui'
import { facultyCurriculumService } from '@/services'

interface CreateActivityModalProps {
  isOpen: boolean
  onClose: () => void
  template: any | null
  subjects: string[]
  classes: Array<{ id: string; name: string; students: number }>
}

export function CreateActivityModal({
  isOpen,
  onClose,
  template,
  subjects,
  classes,
}: CreateActivityModalProps) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    classId: '',
    subject: '',
    dueDate: '',
    maxScore: 100,
    instructions: '',
  })
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    if (template) {
      setFormData((prev) => ({
        ...prev,
        title: template.title,
        description: template.description,
      }))
    }
  }, [template])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await facultyCurriculumService.createActivity({
        templateId: template?.id || 0,
        ...formData,
      })
      
      // Show success notification
      alert('Activity created successfully!')
      onClose()
    } catch (error) {
      console.error('Failed to create activity:', error)
      alert('Failed to create activity. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[hsl(214,32%,91%)]">
            <div>
              <h2 className="text-xl font-semibold text-[hsl(222,84%,5%)]">
                Create New Activity
              </h2>
              {template && (
                <p className="text-sm text-[hsl(220,9%,46%)] mt-1">
                  Using template: {template.title}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[hsl(240,20%,96%)] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[hsl(220,9%,46%)]" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-[hsl(220,9%,46%)] mb-2">
                Activity Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Machine Learning Assignment 1"
                className="w-full px-4 py-2 border border-[hsl(214,32%,91%)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(158,64%,52%)] focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[hsl(220,9%,46%)] mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the activity..."
                rows={3}
                className="w-full px-4 py-2 border border-[hsl(214,32%,91%)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(158,64%,52%)] focus:border-transparent resize-none"
              />
            </div>

            {/* Class and Subject Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(220,9%,46%)] mb-2">
                  <UsersIcon className="w-4 h-4 inline mr-1" />
                  Class *
                </label>
                <select
                  required
                  value={formData.classId}
                  onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                  className="w-full px-4 py-2 border border-[hsl(214,32%,91%)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(158,64%,52%)] focus:border-transparent"
                >
                  <option value="">Select class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.students} students)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(220,9%,46%)] mb-2">
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  Subject *
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-[hsl(214,32%,91%)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(158,64%,52%)] focus:border-transparent"
                >
                  <option value="">Select subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Due Date and Max Score Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[hsl(220,9%,46%)] mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Due Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-[hsl(214,32%,91%)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(158,64%,52%)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[hsl(220,9%,46%)] mb-2">
                  Maximum Score *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.maxScore}
                  onChange={(e) => setFormData({ ...formData, maxScore: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-[hsl(214,32%,91%)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(158,64%,52%)] focus:border-transparent"
                />
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium text-[hsl(220,9%,46%)] mb-2">
                Additional Instructions (Optional)
              </label>
              <textarea
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                placeholder="Any additional instructions for students..."
                rows={4}
                className="w-full px-4 py-2 border border-[hsl(214,32%,91%)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(158,64%,52%)] focus:border-transparent resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[hsl(214,32%,91%)]">
              <Button type="button" variant="bgo" size="md" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="bgrn"
                size="md"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Activity'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
