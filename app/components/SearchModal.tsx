'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { SearchResult, searchData, categoryColors } from '../lib/searchData'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // 防抖工具函数
  function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timeoutId: NodeJS.Timeout
    return ((...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(null, args), delay)
    }) as T
  }

  // 防抖搜索
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim().length > 1) {
        const searchTerm = query.toLowerCase()
        const results = searchData.filter(item => 
          item.title.toLowerCase().includes(searchTerm) || 
          item.content.toLowerCase().includes(searchTerm)
        )
        setSearchResults(results)
        setSelectedIndex(-1)
      } else {
        setSearchResults([])
        setSelectedIndex(-1)
      }
    }, 300),
    []
  )

  useEffect(() => {
    debouncedSearch(searchQuery)
  }, [searchQuery, debouncedSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const targetIndex = selectedIndex >= 0 ? selectedIndex : 0
      if (searchResults.length > 0 && searchResults[targetIndex]) {
        router.push(searchResults[targetIndex].path)
      } else {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      }
      closeSearch()
    }
  }

  const handleResultClick = (path: string) => {
    router.push(path)
    closeSearch()
  }

  const closeSearch = () => {
    onClose()
    setSearchQuery('')
    setSearchResults([])
    setSelectedIndex(-1)
  }

  // 键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          handleResultClick(searchResults[selectedIndex].path)
        }
        break
      case 'Escape':
        e.preventDefault()
        closeSearch()
        break
    }
  }

  // 点击外部区域关闭搜索
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && !searchRef.current?.contains(e.target as Node)) {
        closeSearch()
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // 自动聚焦
  useEffect(() => {
    if (isOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 100)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" onClick={closeSearch} />
        
        <div className="relative transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          <div className="bg-white">
            {/* Search Input */}
            <div className="border-b border-gray-200">
              <form onSubmit={handleSearch}>
                <div className="flex items-center px-4">
                  <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="搜索内容..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 py-4 text-lg text-gray-900 placeholder-gray-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={closeSearch}
                    className="ml-3 flex-shrink-0 p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">关闭</span>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Search Results */}
            <div ref={resultsRef} className="max-h-96 overflow-y-auto">
              {searchQuery.trim().length > 1 ? (
                searchResults.length > 0 ? (
                  <div className="p-2">
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result.path)}
                        className={`w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors group ${
                          selectedIndex === index ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                            categoryColors[result.category]
                          }`}>
                            {result.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                              {result.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate mt-1">
                              {result.content}
                            </div>
                          </div>
                          <div className="flex-shrink-0 text-xs text-gray-400">
                            {selectedIndex === index && (
                              <kbd className="inline-flex items-center px-2 py-1 bg-white border rounded text-xs">↵</kbd>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="mt-4 text-sm text-gray-600">没有找到相关内容</p>
                    <p className="text-xs text-gray-500 mt-1">尝试使用不同的关键词</p>
                  </div>
                )
              ) : (
                <div className="p-8 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="mt-4 text-sm text-gray-600">开始输入以搜索内容</p>
                  <div className="mt-4 flex justify-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <kbd className="mr-1 px-2 py-1 bg-gray-100 rounded">↑↓</kbd> 导航
                    </span>
                    <span className="flex items-center">
                      <kbd className="mr-1 px-2 py-1 bg-gray-100 rounded">↵</kbd> 选择
                    </span>
                    <span className="flex items-center">
                      <kbd className="mr-1 px-2 py-1 bg-gray-100 rounded">esc</kbd> 关闭
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}