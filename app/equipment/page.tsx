import { getEquipmentData, GroupedInstrument } from '@/lib/api'
import ProductItem from '../components/ProductItem'
import { logger } from '@/lib/logger'

export default async function Equipment() {
  const equipmentCategories: GroupedInstrument[] = await getEquipmentData()
  logger.info('Equipment page data loaded successfully', {
    equipmentCategoriesCount: equipmentCategories.length,
    timestamp: new Date().toISOString()
  })

  return (
    <main className="min-h-screen p-8">
      {/* <h1 className="text-4xl font-bold mb-8">仪器设备</h1> */}
      
      {equipmentCategories.map((category) => (
        <section key={category.typeId} className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{category.typeName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.items.map((item) => (
              <ProductItem key={item.id} item={item} type="equipment" />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}