import { getReagentsData } from '@/lib/reagentsApi'
import ProductItem from '../components/ProductItem'

export default async function Reagents() {
  // 从服务端获取数据
  const categories = await getReagentsData()

  return (
    <main className="min-h-screen p-8">
      {/* <h1 className="text-4xl font-bold mb-8">试剂耗材</h1> */}

      {categories.map((category) => (
        <section key={category.typeId} className="mb-12">
          <h2 className="text-3xl font-bold mb-6">{category.typeName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.items.map((item) => (
              <ProductItem key={item.id} item={item} type="reagents" />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}