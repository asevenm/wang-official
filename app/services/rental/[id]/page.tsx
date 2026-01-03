'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { servicesApi } from '@/lib/servicesApi'

// 须知标题映射
const NOTICE_TITLES: { key: string; title: string; icon: string }[] = [
  { key: 'deposit', title: '关于押金', icon: '💰' },
  { key: 'service', title: '服务内容', icon: '🛠️' },
  { key: 'rental_period', title: '关于租期', icon: '📅' },
  { key: 'delivery', title: '货物取送', icon: '🚚' },
  { key: 'renewal', title: '关于续租', icon: '🔄' },
  { key: 'refund', title: '租金退换', icon: '💱' },
  { key: 'quality', title: '质量保证', icon: '✅' },
  { key: 'early_return', title: '提前归还', icon: '⏪' },
  { key: 'cancel', title: '取消订单', icon: '❌' },
]

export default function RentalProductDetail() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, allProducts] = await Promise.all([
          servicesApi.getRentalProductById(params.id as string),
          servicesApi.getRentalProducts()
        ])
        setProduct(productData)
        // 过滤掉当前产品，获取其他可用产品作为推荐
        setRelatedProducts(
          allProducts
            .filter((p: any) => p.id.toString() !== params.id && p.status === 'available')
            .slice(0, 3)
        )
      } catch (err) {
        console.error('Failed to fetch product:', err)
        setError('获取产品信息失败')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchData()
    }
  }, [params.id])

  if (loading) {
    return (
      <main className="min-h-screen p-8 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">正在加载产品信息...</p>
        </div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="min-h-screen p-8 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{error || '产品不存在'}</h2>
          <Link href="/services" className="text-blue-600 hover:text-blue-700">
            返回租赁产品列表
          </Link>
        </div>
      </main>
    )
  }

  // 获取有内容的须知列表
  const notices = NOTICE_TITLES.map(item => ({
    ...item,
    content: product.notices?.[item.key] || ''
  })).filter(n => n.content)

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* 返回按钮 */}
        <Link href="/services" className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          返回租赁产品列表
        </Link>

        {/* 产品概览卡片 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="lg:flex">
            {/* 左侧：产品图标/图片区域 */}
            <div className="lg:flex-shrink-0 lg:w-1/3 bg-gradient-to-br from-blue-500 to-blue-700 p-8 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z"/>
                  </svg>
                </div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                  product.status === 'available'
                    ? 'bg-green-400/30 text-green-100'
                    : 'bg-gray-400/30 text-gray-200'
                }`}>
                  {product.status === 'available' ? '可租赁' : '已下架'}
                </span>
              </div>
            </div>

            {/* 右侧：价格信息 */}
            <div className="p-6 md:p-8 lg:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">租赁价格</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">首日</div>
                  <div className="text-2xl font-bold text-blue-600">¥{product.day1_price}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">次日</div>
                  <div className="text-2xl font-bold text-gray-700">¥{product.day2_price}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">第三天</div>
                  <div className="text-2xl font-bold text-gray-700">¥{product.day3_price}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">第四天起</div>
                  <div className="text-2xl font-bold text-gray-700">¥{product.day4_price}</div>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">质保金：</span>
                  <span className="text-xl font-bold text-orange-600">¥{product.deposit}</span>
                </div>
              </div>

              {product.remarks && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-6">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-medium text-yellow-800">备注</div>
                      <div className="text-yellow-700 text-sm mt-1">{product.remarks}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  立即咨询
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 租赁须知区域 - 直接展示所有内容 */}
        {notices.length > 0 && (
          <section id="notices" className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              租赁须知
            </h2>

            <div className="space-y-6">
              {notices.map((notice, index) => (
                <div key={notice.key} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">{notice.icon}</span>
                    <span>{index + 1}. {notice.title}</span>
                  </h3>
                  <div
                    className="prose prose-blue max-w-none text-gray-600 pl-8"
                    dangerouslySetInnerHTML={{ __html: notice.content }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 无须知提示 */}
        {notices.length === 0 && (
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无租赁须知</h3>
            <p className="text-gray-600">如有疑问，请直接联系我们咨询</p>
          </section>
        )}

        {/* 相关产品推荐 */}
        {relatedProducts.length > 0 && (
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">其他租赁产品</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/services/rental/${item.id}`}
                  className="block bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow border border-gray-100"
                >
                  <h3 className="font-semibold text-gray-900 mb-3">{item.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-sm text-gray-500">首日</span>
                    <span className="text-xl font-bold text-blue-600">¥{item.day1_price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>质保金 ¥{item.deposit}</span>
                  </div>
                  <div className="mt-4 text-blue-600 text-sm font-medium flex items-center">
                    查看详情
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
