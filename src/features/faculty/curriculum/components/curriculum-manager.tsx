import * as React from 'react'
import { Plus, Download, Upload, Search } from 'lucide-react'
import { useCurriculum } from '../hooks/use-curriculum'
import { Button } from '@/components/ui'
import { LoadingSpinner } from '@/components/shared'
import { ActivityTemplateCard } from './activity-template-card'
import { ActivityCategories } from './activity-categories'
import { CreateActivityModal } from './create-activity-modal'
import { RecentActivitiesList } from './recent-activities-list'

export function CurriculumManager() {
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [createModalOpen, setCreateModalOpen] = React.useState(false)
  const [selectedTemplate, setSelectedTemplate] = React.useState<any>(null)

  const { templates, categories, recentActivities, subjects, classes, isLoading } =
    useCurriculum(selectedCategory)

  const filteredTemplates = React.useMemo(() => {
    if (!searchQuery) return templates

    const query = searchQuery.toLowerCase()
    return templates.filter(
      (template: any) =>
        template.title.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.tags.some((tag: string) => tag.toLowerCase().includes(query))
    )
  }, [templates, searchQuery])

  const handleCreateFromTemplate = (template: any) => {
    setSelectedTemplate(template)
    setCreateModalOpen(true)
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading curriculum manager..." />
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[hsl(222,84%,5%)] mb-2">
              Curriculum Manager
            </h1>
            <p className="text-sm text-[hsl(220,9%,46%)]">
              Create, manage, and organize academic activities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="bgo" size="md">
              <Upload className="w-4 h-4" />
              Import
            </Button>
            <Button variant="bgo" size="md">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button variant="bgrn" size="md" onClick={() => setCreateModalOpen(true)}>
              <Plus className="w-4 h-4" />
              Create Activity
            </Button>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(220,9%,46%)]" />
          <input
            type="text"
            placeholder="Search templates by name, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-lg border border-[hsl(214,32%,91%)] bg-white text-sm text-[hsl(222,84%,5%)] placeholder:text-[hsl(220,9%,46%)] focus:outline-none focus:ring-2 focus:ring-[hsl(158,64%,52%)] focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <ActivityCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Content: 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
        {/* Left Column: Activity Templates */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-[hsl(222,84%,5%)]">
              Activity Templates
            </h3>
            <p className="text-sm text-[hsl(220,9%,46%)]">
              {filteredTemplates.length} templates available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template: any) => (
              <ActivityTemplateCard
                key={template.id}
                template={template}
                onUseTemplate={handleCreateFromTemplate}
              />
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-[hsl(220,9%,46%)]">
                No templates found matching your search.
              </p>
            </div>
          )}
        </div>

        {/* Right: Recent Activities */}
        <div>
          <RecentActivitiesList activities={recentActivities} />
        </div>
      </div>

      {/* Create Activity Modal */}
      {createModalOpen && (
        <CreateActivityModal
          isOpen={createModalOpen}
          onClose={() => {
            setCreateModalOpen(false)
            setSelectedTemplate(null)
          }}
          template={selectedTemplate}
          subjects={subjects}
          classes={classes}
        />
      )}
    </div>
  )
}
