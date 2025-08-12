'use client'

import { useState } from 'react'
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { GroupedInstrument } from '@/lib/api'

interface CategoryNavigationProps {
  categories: GroupedInstrument[]
  onCategorySelect?: (categoryId: number) => void
}

export default function CategoryNavigation({ categories, onCategorySelect }: CategoryNavigationProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')

  const handleCategoryClick = (categoryId: number) => {
    if (expandedCategories.has(categoryId)) {
      setExpandedCategories(prev => {
        const newSet = new Set(prev)
        newSet.delete(categoryId)
        return newSet
      })
    } else {
      setExpandedCategories(prev => new Set(prev).add(categoryId))
    }
    setSelectedCategory(categoryId)
    onCategorySelect?.(categoryId)
  }

  const filteredCategories = categories.filter(category =>
    category.typeName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      {/* Search bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="输入关键词搜索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category list */}
      <div className="p-4">
        <nav className="space-y-2">
          {filteredCategories.map((category) => (
            <div key={category.typeId}>
              <button
                onClick={() => handleCategoryClick(category.typeId)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                  selectedCategory === category.typeId
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="font-medium">{category.typeName}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {category.items.length}
                  </span>
                  <ChevronRightIcon
                    className={`w-5 h-5 transition-transform ${
                      expandedCategories.has(category.typeId) ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Subcategory items */}
              {expandedCategories.has(category.typeId) && (
                <div className="ml-4 mt-2 space-y-1">
                  {category.items.map((item) => (
                    <a
                      key={item.id}
                      href={`#item-${item.id}`}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}