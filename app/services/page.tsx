'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { servicesApi } from '@/lib/servicesApi'

// 须知标题映射
const NOTICE_TITLES: { key: string; title: string }[] = [
  { key: 'deposit', title: '关于押金' },
  { key: 'service', title: '服务内容' },
  { key: 'rental_period', title: '关于租期' },
  { key: 'delivery', title: '货物取送' },
  { key: 'renewal', title: '关于续租' },
  { key: 'refund', title: '租金退换' },
  { key: 'quality', title: '质量保证' },
  { key: 'early_return', title: '提前归还' },
  { key: 'cancel', title: '取消订单' },
]

export default function Services() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [activeNoticeKey, setActiveNoticeKey] = useState<string>('deposit')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await servicesApi.getRentalProducts()
        setProducts(productsData)
        // 默认选中第一个可用产品
        const availableProducts = productsData.filter((p: any) => p.status === 'available')
        if (availableProducts.length > 0) {
          setSelectedProduct(availableProducts[0])
        }
      } catch (err) {
        console.error('Failed to fetch data:', err)
        setError('获取租赁信息失败')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen p-8 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">正在加载资讯...</p>
        </div>
      </main>
    )
  }

  const availableProducts = products.filter(p => p.status === 'available')

  // 获取当前选中产品的须知列表
  const getNoticesForProduct = (product: any) => {
    if (!product?.notices) return []
    return NOTICE_TITLES.map(item => ({
      key: item.key,
      title: item.title,
      content: product.notices[item.key] || ''
    })).filter(n => n.content) // 只显示有内容的须知
  }

  const currentNotices = selectedProduct ? getNoticesForProduct(selectedProduct) : []
  const activeNotice = currentNotices.find(n => n.key === activeNoticeKey) || currentNotices[0]

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            租赁产品与服务
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            专业租赁，品质保证。提供全方位的租赁解决方案。
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Products Table Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">产品价目表</h2>
          </div>
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-semibold uppercase text-sm">
                    <th className="py-4 px-6 border-b">产品名称</th>
                    <th className="py-4 px-6 border-b text-center">首日</th>
                    <th className="py-4 px-6 border-b text-center">次日</th>
                    <th className="py-4 px-6 border-b text-center">第三天</th>
                    <th className="py-4 px-6 border-b text-center">第四天</th>
                    <th className="py-4 px-6 border-b text-center">质保金</th>
                    <th className="py-4 px-6 border-b">备注</th>
                    <th className="py-4 px-6 border-b text-center">详情</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {availableProducts.length > 0 ? (
                    availableProducts.map((product) => (
                      <tr
                        key={product.id}
                        onClick={() => {
                          setSelectedProduct(product)
                          // 重置到第一个有内容的须知
                          const notices = getNoticesForProduct(product)
                          if (notices.length > 0) {
                            setActiveNoticeKey(notices[0].key)
                          }
                        }}
                        className={`cursor-pointer transition-colors duration-150 ${
                          selectedProduct?.id === product.id
                            ? 'bg-blue-100'
                            : 'hover:bg-blue-50'
                        }`}
                      >
                        <td className="py-4 px-6 font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="py-4 px-6 text-center text-blue-600 font-bold">¥{product.day1_price}</td>
                        <td className="py-4 px-6 text-center text-gray-600">¥{product.day2_price}</td>
                        <td className="py-4 px-6 text-center text-gray-600">¥{product.day3_price}</td>
                        <td className="py-4 px-6 text-center text-gray-600">¥{product.day4_price}</td>
                        <td className="py-4 px-6 text-center font-semibold text-orange-600">¥{product.deposit}</td>
                        <td className="py-4 px-6 text-sm text-gray-500 max-w-xs truncate">{product.remarks}</td>
                        <td className="py-4 px-6 text-center">
                          <Link
                            href={`/services/rental/${product.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            查看详情
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-10 text-center text-gray-500 italic">暂无租赁产品数据</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Notices Section */}
        {/* {selectedProduct && currentNotices.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedProduct.name} - 租赁须知
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-2">
                {currentNotices.map((notice) => (
                  <button
                    key={notice.key}
                    onClick={() => setActiveNoticeKey(notice.key)}
                    className={`w-full text-left px-6 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-102 ${
                      activeNoticeKey === notice.key
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-100 shadow-sm'
                    }`}
                  >
                    {notice.title}
                  </button>
                ))}
              </div>

              <div className="lg:col-span-2">
                {activeNotice ? (
                  <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 min-h-64 animate-fadeIn">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
                      {activeNotice.title}
                    </h3>
                    <div
                      className="prose prose-blue prose-lg max-w-none text-gray-600"
                      dangerouslySetInnerHTML={{ __html: activeNotice.content }}
                    />
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-12 text-center text-gray-500 shadow border border-dashed border-gray-300">
                    请选择左侧条目查看详细说明
                  </div>
                )}
              </div>
            </div>
          </section>
        )} */}

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </main>
  )
}
