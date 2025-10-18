'use client'

import { useState } from 'react'
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { GroupedInstrument } from '@/lib/api'
import { useRouter } from 'next/navigation'

interface CategoryNavigationProps {
  categories: GroupedInstrument[]
  onCategorySelect?: (categoryId: number) => void
  type: 'equipment' | 'reagents'
}

export default function CategoryNavigation({ categories, onCategorySelect, type }: CategoryNavigationProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

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

  const handleProductClick = (productId: number) => {
    if (type === 'equipment') {
      router.push(`/equipment/${productId}`)
    } else {
      router.push(`/reagents/${productId}`)
    }
  }

  // 改进搜索功能：同时搜索分类名称和产品名称
  const filteredCategories = categories.filter(category => {
    const categoryMatches = category.typeName.toLowerCase().includes(searchTerm.toLowerCase())
    const itemMatches = category.items.some(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return categoryMatches || itemMatches
  }).map(category => ({
    ...category,
    items: category.items.filter(item =>
      searchTerm === '' ||
      category.typeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }))

  return (
    <div className="w-80 bg-gradient-to-b from-slate-50 to-white border-r border-gray-200 shadow-lg" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Search bar */}
      <div className="p-3 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={`搜索${type === 'equipment' ? '仪器设备' : '试剂耗材'}分类或产品...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70"
          />
        </div>
      </div>

      {/* Category list */}
      <div className="overflow-y-auto" style={{ height: 'calc(100% - 80px)' }}>
        <div className="p-3">
          <nav className="space-y-1">
            {filteredCategories.map((category) => (
              <div key={category.typeId} className="group">
                <button
                  onClick={() => handleCategoryClick(category.typeId)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-left rounded-lg transition-all duration-200 group-hover:shadow-sm ${
                    selectedCategory === category.typeId
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm'
                      : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                  }`}
                >
                  <span className="font-medium text-sm">{category.typeName}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      selectedCategory === category.typeId
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {category.items.length}
                    </span>
                    <ChevronRightIcon
                      className={`w-4 h-4 transition-transform duration-200 ${
                        expandedCategories.has(category.typeId) ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Subcategory items */}
                {expandedCategories.has(category.typeId) && (
                  <div className="ml-3 mt-1 space-y-0.5 animate-in slide-in-from-top-1 duration-200">
                    {category.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleProductClick(item.id)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/70 rounded-md transition-all duration-150 border border-transparent hover:border-blue-100"
                      >
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2"></div>
                          {item.name}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Empty state */}
        {filteredCategories.length === 0 && searchTerm && (
          <div className="p-6 text-center">
            <MagnifyingGlassIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">未找到匹配的分类或产品</p>
            <p className="text-gray-400 text-xs mt-1">请尝试其他关键词</p>
          </div>
        )}
      </div>
    </div>
  )
}