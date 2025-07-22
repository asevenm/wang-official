'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { SearchResult, searchContent } from '@/lib/searchApi'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  // console.log('searchResults', searchResults)

  const categoryColors = {
    equipment: 'text-blue-600 bg-blue-50',
    reagents: 'text-green-600 bg-green-50',
    services: 'text-purple-600 bg-purple-50',
    blog: 'text-orange-600 bg-orange-50',
    pages: 'text-gray-600 bg-gray-50',
    agents: 'text-indigo-600 bg-indigo-50'
  }

  // 防抖工具函数
  const debounce = useCallback(<T extends (...args: any[]) => void>(
    func: T, 
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }, [])

  // 防抖搜索
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim().length > 1) {
        setIsLoading(true)
        setError(null)
        try {
          const response = await searchContent(query)
          setSearchResults(response.results)
          setSelectedIndex(-1)
        } catch (err) {
          setError('搜索出错，请稍后重试')
          setSearchResults([])
        } finally {
          setIsLoading(false)
        }
      } else {
        setSearchResults([])
        setSelectedIndex(-1)
        setIsLoading(false)
      }
    }, 300),
    [debounce]
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

  const closeSearch = useCallback(() => {
    onClose()
    setSearchQuery('')
    setSearchResults([])
    setSelectedIndex(-1)
    setError(null)
    setIsLoading(false)
  }, [onClose])

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
  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (isOpen && !searchRef.current?.contains(e.target as Node)) {
  //       closeSearch()
  //     }
  //   }
    
  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => document.removeEventListener('mousedown', handleClickOutside)
  // }, [isOpen, closeSearch])

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
                    placeholder="搜索设备、试剂、服务..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 py-4 text-lg text-gray-900 placeholder-gray-500 focus:outline-none"
                  />
                  {isLoading && (
                    <div className="ml-3 flex-shrink-0">
                      <svg className="animate-spin h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
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
              {error ? (
                <div className="p-8 text-center">
                  <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="mt-4 text-sm text-red-600">{error}</p>
                  <button 
                    onClick={() => debouncedSearch(searchQuery)}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                  >
                    重试
                  </button>
                </div>
              ) : searchQuery.trim().length > 1 ? (
                searchResults.length > 0 ? (
                  <div className="p-2">
                    {searchResults.map((result, index) => (
                      <button
                        key={`${result.category}-${result.id}`}
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
                              {result.type && (
                                <span className="ml-2 text-xs text-gray-500">
                                  ({result.type})
                                </span>
                              )}
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
                ) : !isLoading ? (
                  <div className="p-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="mt-4 text-sm text-gray-600">没有找到相关内容</p>
                    <p className="text-xs text-gray-500 mt-1">尝试使用不同的关键词</p>
                  </div>
                ) : null
              ) : (
                <div className="p-8 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="mt-4 text-sm text-gray-600">搜索设备、试剂、技术服务和更多内容</p>
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