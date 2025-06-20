// 使用服务端组件获取数据
import { getEquipmentData } from '@/lib/api'
import Link from 'next/link'

// 定义设备类型接口
interface EquipmentItem {
  name: string
  description: string
  image: string
  id: string // 添加id字段用于路由
}

interface EquipmentCategory {
  title: string
  items: EquipmentItem[]
}

// 这是一个服务端组件，不需要'use client'
export default async function Equipment() {
  // 从API获取数据
  const equipmentCategories: EquipmentCategory[] = await getEquipmentData()

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">仪器设备</h1>
      
      {equipmentCategories.map((category, index) => (
        <section key={index} className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 relative">
                  {/* 图片占位符 */}
                  <div className="w-full h-48 bg-gray-200"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <Link href={`/equipment/${item.id}`}>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                      了解详情
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}