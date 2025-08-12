'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { servicesApi, type ServiceItem } from '@/lib/servicesApi'

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getServices()
        setServices(data)
      } catch (err) {
        console.error('Failed to fetch services:', err)
        setError('获取服务数据失败')
        // 使用备用数据
        setServices([
          {
            id: 1,
            title: '实验技术服务',
            description: '提供专业的实验技术支持和数据分析服务',
            features: [
              '电生理数据预处理',
              '局部场电位数据分析 (LFP, EEG, ECOG)',
              'spike数据分析',
              'spike放电模式分析',
              'spike功能连接性分析',
              '神经元编码分析',
              'spike-rhythm分析',
              'Event-related分析',
              '神经解码',
              '数据分析系列培训课程'
            ],
            sort_order: 1,
            is_active: true,
            created_at: '',
            updated_at: ''
          },
          {
            id: 2,
            title: '仪器设备租赁',
            description: '提供专业的仪器设备租赁服务',
            features: [
              '小动物气体麻醉机',
              '小动物呼吸机',
              '脑立体定位仪'
            ],
            sort_order: 2,
            is_active: true,
            created_at: '',
            updated_at: ''
          },
          {
            id: 3,
            title: '仪器设备维修',
            description: '专业的仪器设备维修保养服务',
            features: [
              '生物安全柜维修保养',
              '超净台维护维修保养'
            ],
            sort_order: 3,
            is_active: true,
            created_at: '',
            updated_at: ''
          },
          {
            id: 4,
            title: '研发众筹',
            description: '提供专业的研发众筹服务',
            features: [],
            sort_order: 4,
            is_active: true,
            created_at: '',
            updated_at: ''
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

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

  return (
    <main className="min-h-screen p-8">
      {error && (
        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded">
          <p className="text-yellow-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services
          .filter(service => service.is_active)
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
            <p className="text-gray-600 mb-6">{service.description}</p>
            {service.features.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-4">服务内容：</h3>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <Link 
              href="/contact"
              className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              联系我们
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
} 