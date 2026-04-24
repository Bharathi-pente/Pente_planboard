import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  count: number
  color: string
}

interface ActivityCategoriesProps {
  categories: Category[]
  selectedCategory: string
  onSelectCategory: (categoryId: string) => void
}

export function ActivityCategories({
  categories,
  selectedCategory,
  onSelectCategory,
}: ActivityCategoriesProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              selectedCategory === category.id
                ? 'bg-[hsl(158,64%,52%)] text-white shadow-md'
                : 'bg-white border border-[hsl(214,32%,91%)] text-[hsl(220,9%,46%)] hover:border-[hsl(158,64%,52%)] hover:text-[hsl(158,64%,52%)]'
            )}
          >
            {category.name}
            <span
              className={cn(
                'ml-2 px-2 py-0.5 rounded-full text-xs',
                selectedCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-[hsl(240,20%,98%)] text-[hsl(220,9%,46%)]'
              )}
            >
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
