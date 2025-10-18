import { getReagentsData, GroupedInstrument } from '@/lib/reagentsApi'
import ProductItem from '../components/ProductItem'
import CategoryNavigation from '../components/CategoryNavigation'
import { logger } from '@/lib/logger'

export const dynamic = 'force-dynamic';

export default async function Reagents() {
  const reagentCategories: GroupedInstrument[] = await getReagentsData()
  logger.info('Reagents page data loaded successfully', {
    reagentCategoriesCount: reagentCategories.length,
    timestamp: new Date().toISOString()
  })

  return (
    <div className="min-h-screen flex">
      <CategoryNavigation categories={reagentCategories} />
      <main className="flex-1 p-8">
        {reagentCategories.map((category) => (
          <section key={category.typeId} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{category.typeName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item) => (
                <ProductItem key={item.id} item={item} type="reagents" />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}