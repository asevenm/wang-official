import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-6">欢迎来到王氏生物科技</h1>
        <p className="text-xl text-gray-600">专业的生物科技解决方案提供商</p>
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
            <p className="text-gray-600">专业的实验室仪器设备</p>
          </Link>
          <Link href="/reagents" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">试剂耗材</h3>
            <p className="text-gray-600">高品质试剂和实验耗材</p>
          </Link>
          <Link href="/services" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">技术服务</h3>
            <p className="text-gray-600">专业的技术支持和服务</p>
          </Link>
        </div>
      </section>

      {/* Partners Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">合作单位</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Add partner logos or names here */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center">
            合作伙伴 1
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center">
            合作伙伴 2
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center">
            合作伙伴 3
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center">
            合作伙伴 4
          </div>
        </div>
      </section>
    </main>
  )
}
