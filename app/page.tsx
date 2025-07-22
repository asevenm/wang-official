import Link from 'next/link'
import Image from 'next/image'
import { getPartners } from '../lib/partnersApi'
import { getEquipmentByPage, getReagentsByPage } from '../lib/api'
import { logger } from '../lib/logger'

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 服务端请求合作单位
  const partners = await getPartners()
  const equipments = await getEquipmentByPage()
  const reagents = await getReagentsByPage()

  // 记录成功日志
  logger.info('Home page data loaded successfully', {
    partnersCount: partners.length,
    equipmentsCount: equipments.length,
    reagentsCount: reagents.length,
    timestamp: new Date().toISOString()
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <header className="text-center mb-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              <span className="block text-blue-600 mt-2">
                上海雷鼠仪器仪表有限公司
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
              专业的仪器仪表提供商，为科技创新赋能
            </p>
          </div>
        </header>

        {/* Company Info Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    公司使命
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    专注于小动物实验设备40年，为客户提供优质创新和高性价比的小动物实验解决方案。
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                    公司文化
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    专业，坦诚，服务至上
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">产品展示</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              提供全方位的实验室解决方案，满足您的科研需求
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <Link 
              href="/equipment" 
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200"
            >
              <div className="p-8">
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  仪器设备
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  专业的实验室仪器设备，精准可靠，助力您的科研工作
                </p>
                
                {equipments.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {equipments.slice(0, 3).map(item => (
                      <div key={item.id} className="flex flex-col items-center space-y-2">
                        {item.images?.[0] && (
                          <div className="relative overflow-hidden rounded-xl">
                            <Image
                              src={item.images[0].url || ''}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        )}
                        <span className="text-xs text-gray-500 text-center max-w-[80px] truncate">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Link>

            <Link 
              href="/reagents" 
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200"
            >
              <div className="p-8">
                <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                  试剂耗材
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  高品质试剂和实验耗材，保障实验结果的准确性
                </p>
                
                {reagents.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {reagents.slice(0, 3).map(item => (
                      <div key={item.id} className="flex flex-col items-center space-y-2">
                        {item.images?.[0] && (
                          <div className="relative overflow-hidden rounded-xl">
                            <Image
                              src={item.images[0].url || ''}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        )}
                        <span className="text-xs text-gray-500 text-center max-w-[80px] truncate">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Link>

            <Link 
              href="/services" 
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200"
            >
              <div className="p-8">
                <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  技术服务
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  专业的技术支持和服务，为您提供全方位解决方案
                </p>
                <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                  <span>了解更多</span>
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Partners Section */}
        {partners.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">合作单位</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                与行业领先企业携手合作，共创美好未来
              </p>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4 max-w-6xl mx-auto">
              {partners.map((partner: any) => (
                <div 
                  key={partner.id} 
                  className="group bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center w-20 h-20 mx-auto border border-gray-100 hover:border-gray-200"
                >
                  {partner.icon ? (
                    <Image
                      src={partner.icon}
                      alt={partner.name}
                      width={50}
                      height={30}
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 max-h-[30px] max-w-[45px]"
                    />
                  ) : (
                    <div className="text-gray-600 font-medium text-xs text-center group-hover:text-gray-800 transition-colors leading-tight">
                      {partner.name.slice(0, 6)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
