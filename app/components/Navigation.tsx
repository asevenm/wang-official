'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)

  // 站内内容数据（实际项目中可能需要从API获取或使用静态数据）
  const siteContent = [
    { title: '仪器设备 - 显微镜', path: '/equipment/microscopes', content: '高精度显微镜设备，适用于各类生物样本观察' },
    { title: '仪器设备 - PCR仪', path: '/equipment/pcr', content: '专业PCR扩增仪，满足分子生物学实验需求' },
    { title: '试剂耗材 - 培养基', path: '/reagents/medium', content: '各类细胞培养基，保证细胞培养最佳状态' },
    { title: '技术服务 - 基因测序', path: '/services/sequencing', content: '提供高通量基因测序服务，快速准确' },
    { title: '技术分享 - PCR技术原理', path: '/blog/pcr-principles', content: 'PCR技术原理及应用详解' },
    // 可以添加更多内容
  ]

  const navigation = [
    { name: '首页', href: '/' },
    { name: '仪器设备', href: '/equipment' },
    { name: '试剂耗材', href: '/reagents' },
    { name: '技术服务', href: '/services' },
    { name: '技术分享', href: '/blog' },
    { name: '联系我们', href: '/contact' },
  ]

  // 搜索内容变化时进行模糊匹配
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase()
      const results = siteContent.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.content.toLowerCase().includes(query)
      )
      setSearchResults(results)
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // 如果有搜索结果且用户提交了搜索，跳转到第一个结果
      if (searchResults.length > 0) {
        router.push(searchResults[0].path)
      } else {
        // 如果没有结果，可以跳转到搜索结果页面
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      }
      setIsSearchOpen(false)
      setShowResults(false)
    }
  }

  const handleResultClick = (path: string) => {
    router.push(path)
    setIsSearchOpen(false)
    setShowResults(false)
  }

  // 点击页面其他区域关闭搜索结果
  useEffect(() => {
    const handleClickOutside = () => {
      setShowResults(false)
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">
                  王氏生物科技
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Search Icon and Form */}
            <div className="flex items-center">
              {isSearchOpen ? (
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      placeholder="搜索..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </form>
                  
                  {/* 搜索结果下拉框 */}
                  {showResults && searchResults.length > 0 && (
                    <div className="absolute top-full mt-1 w-64 bg-white border rounded-md shadow-lg z-20 max-h-60 overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <div 
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                          onClick={() => handleResultClick(result.path)}
                        >
                          <div className="font-medium text-sm">{result.title}</div>
                          <div className="text-xs text-gray-500 truncate">{result.content}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center ml-2">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">打开主菜单</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
      {/* 添加一个占位div，防止内容被固定导航栏遮挡 */}
      <div className="h-16"></div>
    </>
  )
}