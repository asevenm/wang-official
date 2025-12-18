'use client'

import { useEffect, useState } from 'react'
import { servicesApi } from '@/lib/servicesApi'

export default function Services() {
  const [products, setProducts] = useState<any[]>([])
  const [notices, setNotices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeNotice, setActiveNotice] = useState<number | null>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, noticesData] = await Promise.all([
          servicesApi.getRentalProducts(),
          servicesApi.getRentalNotices()
        ])
        setProducts(productsData)
        setNotices(noticesData)
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
            <div className="h-1 w-20 bg-blue-600 rounded"></div>
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.length > 0 ? (
                    products.filter(p => p.status === 'available').map((product) => (
                      <tr key={product.id} className="hover:bg-blue-50 transition-colors duration-150">
                        <td className="py-4 px-6 font-medium text-gray-900">{product.name}</td>
                        <td className="py-4 px-6 text-center text-blue-600 font-bold">¥{product.day1_price}</td>
                        <td className="py-4 px-6 text-center text-gray-600">¥{product.day2_price}</td>
                        <td className="py-4 px-6 text-center text-gray-600">¥{product.day3_price}</td>
                        <td className="py-4 px-6 text-center text-gray-600">¥{product.day4_price}</td>
                        <td className="py-4 px-6 text-center font-semibold text-orange-600">¥{product.deposit}</td>
                        <td className="py-4 px-6 text-sm text-gray-500 max-w-xs truncate">{product.remarks}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-gray-500 italic">暂无租赁产品数据</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Notices Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">租赁须知</h2>
            <div className="h-1 w-20 bg-blue-600 rounded"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar Titles */}
            <div className="lg:col-span-1 space-y-2">
              {notices.map((notice, index) => (
                <button
                  key={notice.id || index}
                  onClick={() => setActiveNotice(index)}
                  className={`w-full text-left px-6 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-102 ${activeNotice === index
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-100 shadow-sm'
                    }`}
                >
                  {notice.title}
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="lg:col-span-2">
              {notices.length > 0 && activeNotice !== null ? (
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 min-h-64 flex flex-col md:flex-row gap-8 animate-fadeIn">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
                      {notices[activeNotice].title}
                    </h3>
                    <div
                      className="prose prose-blue prose-lg max-w-none text-gray-600"
                      dangerouslySetInnerHTML={{ __html: notices[activeNotice].content }}
                    />
                  </div>
                  {notices[activeNotice].image_url && (
                    <div className="md:w-1/3 flex-shrink-0">
                      <img
                        src={notices[activeNotice].image_url}
                        alt={notices[activeNotice].title}
                        className="w-full h-auto rounded-2xl shadow-md object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center text-gray-500 shadow border border-dashed border-gray-300">
                  请选择左侧条目查看详细说明
                </div>
              )}
            </div>
          </div>
        </section>
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