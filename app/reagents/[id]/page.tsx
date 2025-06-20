import { getSubcategoryById } from '@/lib/reagentsApi'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ReagentSubcategoryDetail({ params }: { params: { id: string } }) {
  const subcategory = await getSubcategoryById(params.id)
  
  if (!subcategory) {
    notFound()
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* 返回按钮 */}
        <Link href="/reagents" className="inline-flex items-center text-blue-600 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          返回试剂耗材列表
        </Link>
        
        {/* 子类别标题和描述 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{subcategory.name}</h1>
          {subcategory.description && (
            <p className="text-gray-600">{subcategory.description}</p>
          )}
        </div>
        
        {/* 试剂项目列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategory.items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                {item.specifications && item.specifications.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">规格参数</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {item.specifications.map((spec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-4">
                  {item.price && (
                    <span className="text-red-600 font-medium">{item.price}</span>
                  )}
                  {item.stock && (
                    <span className={`text-sm ${item.stock === '现货' ? 'text-green-600' : 'text-orange-500'}`}>
                      {item.stock}
                    </span>
                  )}
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    询价
                  </button>
                  <button className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
                    索取样品
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}