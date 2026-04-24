import { Play, Users } from 'lucide-react'
import { Card } from '@/components/ui'
import { Badge } from '@/components/ui'

interface ActivityTemplateCardProps {
  template: {
    id: number
    title: string
    category: string
    description: string
    duration: string
    icon: string
    color: string
    usageCount: number
    tags: string[]
  }
  onUseTemplate: (template: any) => void
}

export function ActivityTemplateCard({ template, onUseTemplate }: ActivityTemplateCardProps) {
  return (
    <Card className="p-5 hover:shadow-lg transition-all cursor-pointer group">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: `${template.color}15` }}
        >
          {template.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm font-semibold text-[hsl(222,84%,5%)] group-hover:text-[hsl(158,64%,52%)] transition-colors">
              {template.title}
            </h4>
            <Badge
              variant="pending"
              size="sm"
              style={{ backgroundColor: `${template.color}15`, color: template.color }}
            >
              {template.category}
            </Badge>
          </div>

          <p className="text-xs text-[hsl(220,9%,46%)] mb-3 line-clamp-2">
            {template.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {template.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-0.5 rounded bg-[hsl(240,20%,98%)] text-[hsl(220,9%,46%)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[hsl(214,32%,91%)]">
            <div className="flex items-center gap-3 text-xs text-[hsl(220,9%,46%)]">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {template.usageCount} uses
              </span>
              <span>•</span>
              <span>{template.duration}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                onUseTemplate(template)
              }}
              className="flex items-center gap-1 text-xs font-medium text-[hsl(158,64%,52%)] hover:text-[hsl(158,64%,42%)] transition-colors"
            >
              <Play className="w-3 h-3" />
              Use Template
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}
