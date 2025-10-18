'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { type CategoryItem, servicesApi } from '@/lib/servicesApi'

export default function CategoryDetail() {
  const params = useParams()
  const categoryId = parseInt(params.id as string)

  const [category, setCategory] = useState<CategoryItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await servicesApi.getCategoryById(categoryId)
        setCategory(data)
      } catch (err) {
        console.error('Failed to fetch category:', err)
        setError('获取服务分类详情失败')
      } finally {
        setLoading(false)
      }
    }

    if (categoryId) {
      fetchCategory()
    }
  }, [categoryId])

  if (loading) {
    return (
      <main className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </main>
    )
  }

  if (error || !category) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link
              href="/services"
              className="inline-flex items-center text-blue-600 mb-6"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              返回服务列表
            </Link>
          </div>

          <div className="bg-red-100 border border-red-400 rounded p-6 text-center">
            <h2 className="text-2xl font-bold text-red-700 mb-2">服务分类不存在</h2>
            <p className="text-red-600">{error || '未找到指定的服务分类'}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Link
            href="/services"
            className="inline-flex items-center text-blue-600 mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            返回服务列表
          </Link>
        </div>

        {/* 分类标题和描述 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
            <p className="text-blue-100 text-lg leading-relaxed">{category.description}</p>
          </div>
        </div>

        {/* 服务详情列表 */}
        {category.services && category.services.length > 0 ? (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">服务详情</h2>

            {category.services
              .filter(service => service.is_active)
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((service, index) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* 服务标题 */}
                <div className="bg-gray-50 p-6 border-b">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{service.name}</h3>
                      <p className="text-gray-600 mt-1">{service.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* 服务图片 */}
                  {service.images && service.images.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-4 text-gray-800">服务展示</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {service.images
                          .sort((a, b) => a.sort_order - b.sort_order)
                          .map((image) => (
                          <div key={image.id} className="relative group">
                            <div className="aspect-video relative overflow-hidden rounded-lg shadow-md">
                              <Image
                                src={image.url}
                                alt={image.description || service.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            {image.description && (
                              <p className="mt-2 text-sm text-gray-600">{image.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 详细描述 */}
                  {service.detailed_description && (
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-gray-800">详细介绍</h4>
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {service.detailed_description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">该分类下暂无服务内容</p>
          </div>
        )}

        {/* 联系方式 */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">需要{category.name}服务？</h3>
            <p className="text-gray-600 mb-6">
              我们提供专业的{category.name}解决方案，欢迎联系我们了解更多详情
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              立即联系我们
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}