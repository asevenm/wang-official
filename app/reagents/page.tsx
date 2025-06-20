import { getReagentsData } from '@/lib/reagentsApi'
import Link from 'next/link'

export default async function Reagents() {
  // 从服务端获取数据
  const categories = await getReagentsData()

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">试剂耗材</h1>

      {categories.map((category, index) => (
        <section key={index} className="mb-12">
          <h2 className="text-3xl font-bold mb-6">{category.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.subcategories.map((subcategory, subIndex) => (
              <div key={subIndex} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-4">{subcategory.name}</h3>
                <ul className="space-y-2">
                  {subcategory.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/reagents/${subcategory.id}`}>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    查看详情
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}