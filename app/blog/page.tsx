'use client'

import { getBlogArticles, Article } from '@/lib/blogApi'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Pagination from '@/components/Pagination'

export default function Blog() {
  const [allArticles, setAllArticles] = useState<Article[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const articlesPerPage = 6

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const sections = await getBlogArticles()
        // 将所有分类的文章合并为一个数组
        const flattenedArticles = sections.flatMap(section => section.items)
        setAllArticles(flattenedArticles)
      } catch (error) {
        console.error('获取文章数据失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // 计算分页数据
  const totalPages = Math.ceil(allArticles.length / articlesPerPage)
  const startIndex = (currentPage - 1) * articlesPerPage
  const endIndex = startIndex + articlesPerPage
  const currentArticles = allArticles.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg text-gray-600">加载中...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      {/* <h1 className="text-4xl font-bold mb-8">技术分享</h1> */}

      {/* 文章列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentArticles.map((item, index) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.summary}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                {'date' in item && <span>{item.date}</span>}
                {'duration' in item && (
                  <div className="flex items-center space-x-2">
                    <span>时长: {item.duration}</span>
                    <span>播放: {item.views}</span>
                  </div>
                )}
                {'category' in item && <span>{item.category}</span>}
                {'author' in item && <span>作者: {item.author}</span>}
              </div>
              <Link href={`/blog/${item.id}`}>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  阅读更多
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 分页组件 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* 订阅区域 */}
      {/* <section className="mt-12 bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">订阅我们</h2>
        <p className="text-gray-600 mb-6">
          关注我们的公众号和视频号，获取最新技术资讯和行业动态
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 bg-white p-4 rounded-lg shadow text-center">
            <h3 className="font-bold mb-2">微信公众号</h3>
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg mb-2"></div>
            <p className="text-sm text-gray-600">扫码关注公众号</p>
          </div>
          <div className="flex-1 bg-white p-4 rounded-lg shadow text-center">
            <h3 className="font-bold mb-2">视频号</h3>
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg mb-2"></div>
            <p className="text-sm text-gray-600">扫码关注视频号</p>
          </div>
        </div>
      </section> */}
    </main>
  )
}