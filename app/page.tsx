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
    <main className="min-h-screen p-8">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-6">欢迎来到上海雷鼠仪器仪表有限公司</h1>
        <p className="text-xl text-gray-600">专业的仪器仪表提供商</p>
      </section>

      {/* Company Info Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">公司使命</h2>
          <p className="text-gray-600">致力于为生物科技领域提供创新解决方案，推动行业发展</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">公司文化</h2>
          <p className="text-gray-600">创新、专业、诚信、合作</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">产品展示</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/equipment" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">仪器设备</h3>
            <p className="text-gray-600 mb-4">专业的实验室仪器设备</p>
            <div className="flex gap-4">
              {equipments.length > 0 && equipments.map(item => (
                <div key={item.id} className="flex flex-col gap-2 items-center space-x-2">
                  {item.images?.[0] && (
                    <Image
                      src={item.images?.[0]?.url || ''}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-cover rounded"
                    />
                  )}
                  <span className="text-gray-800 text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </Link>
          <Link href="/reagents" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">试剂耗材</h3>
            <p className="text-gray-600 mb-4">高品质试剂和实验耗材</p>
            <div className="flex gap-4">
              {reagents.length > 0 && reagents.map(item => (
                <div key={item.id} className="flex flex-col gap-2 items-center space-x-2">
                  {item.images?.[0] && (
                    <Image
                      src={item.images?.[0]?.url || ''}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-cover rounded"
                    />
                  )}
                  <span className="text-gray-800 text-sm">{item.name}</span>
                </div>
              ))}
            </div>
          </Link>
          <Link href="/services" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">技术服务</h3>
            <p className="text-gray-600">专业的技术支持和服务</p>
          </Link>
        </div>
      </section>

      {/* Partners Section */}
      {partners.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">合作单位</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.length > 0 ? (
              partners.map((partner: any) => (
                <div key={partner.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-center">
                  {partner.icon ? (
                    <Image
                      src={partner.icon}
                      alt={partner.name}
                      width={80}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-center">{partner.name}</span>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                暂无合作单位信息
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  )
}
