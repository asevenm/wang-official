import { getReagentItemById } from '@/lib/reagentsApi'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function ReagentSubcategoryDetail({ params }: { params: { id: string } }) {
  const item = await getReagentItemById(params.id)
  
  if (!item) {
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

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/3">
              <div className="relative w-full h-64 md:h-96">
                <Image
                  src={item.images?.[0]?.url || ''}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="p-8 md:w-2/3">
              <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
              <p className="text-gray-700 mb-6">{item.desc}</p>
              
              {item.features && item.features.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">功能特性</h2>
                  <p className="text-gray-600">{item.features.map(feature => feature.text).join(', ')}</p>
                </div>
              )}
              {item.models && item.models.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">型号参数</h2>
                  {item.models.map(model => (
                    <div key={model.id}>
                      <h3 className="text-lg font-semibold mb-2">{model.name}</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <tbody className="bg-white divide-y divide-gray-200">
                            {model.params.map((spec, index) => {
                              return (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50 w-1/3">
                                    {spec.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {spec.value}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-8">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  联系咨询
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}