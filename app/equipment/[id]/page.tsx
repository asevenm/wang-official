import { getEquipmentById, getEquipmentByPage } from '@/lib/api'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Tabs from './Tabs'
import ProductImageCarousel from './ProductImageCarousel'

export default async function EquipmentDetail({ params }: { params: { id: string } }) {
  // 并行获取当前设备信息和相关设备
  const [equipment, relatedEquipment] = await Promise.all([
    getEquipmentById(params.id),
    getEquipmentByPage(1, 6) // 获取6个设备用于推荐
  ])

  if (!equipment) {
    notFound()
  }

  // 过滤掉当前设备，只显示其他设备作为推荐
  const filteredRelatedEquipment = relatedEquipment.filter(item => item.id.toString() !== params.id)

  // 预留内容占位
  const placeholderLongDesc = equipment.desc;

  const placeholderFeatures = equipment.features?.map((f) => f.text) || []

  const placeholderPrinciple = equipment.workingPrinciple;

  const placeholderScenes = equipment.applicationScenes || [];

  const hasModels = Array.isArray(equipment.models) && equipment.models.length > 0

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* 返回按钮 */}
        <Link href="/equipment" className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          返回仪器设备列表
        </Link>

        {/* 顶部概览卡片 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="lg:flex">
            <div className="lg:flex-shrink-0 lg:w-1/2">
              <div className="relative w-full h-64 md:h-80 lg:h-96">
                <ProductImageCarousel
                  images={equipment.images || []}
                  productName={equipment.name}
                />
              </div>
            </div>
            <div className="p-6 md:p-8 lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{equipment.name}</h1>
              <p className="text-gray-700 mb-6 leading-7 line-clamp-4">{placeholderLongDesc}</p>

              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 mb-6">
                {placeholderFeatures.slice(0, 4).map((feat, idx) => (
                  <div key={idx} className="inline-flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div> */}

              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/contact"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-block text-center"
                >
                  联系咨询
                </Link>
                {/* <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  技术资料
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* 详情分栏（滚动联动 tab） */}
        <div>
          <Tabs
            tabs={[
              { key: 'description', label: '产品详情', targetId: 'section-description' },
              { key: 'features', label: '产品特点', targetId: 'section-features' },
              { key: 'more', label: '更多推荐', targetId: 'section-more' },
            ]}
            initialKey="description"
            stickyTop={64}
            offset={64}
          />
        </div>

        {/* 内容区域（与 tab 锚点对应） */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <section id="section-description" className="scroll-mt-[64px] space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">产品详情</h2>

            {/* 产品描述 */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">产品介绍</h3>
              <p className="text-gray-700 leading-7 text-lg">{placeholderLongDesc}</p>
            </div>

            {/* 产品图片展示 */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">产品展示</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {equipment.images?.map((image, i) => (
                  <div key={i} className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                    <Image
                      src={equipment.images?.[i]?.url || '/logo.png'}
                      alt={`${equipment.name}-image-${i + 1}`}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 工作原理 */}
            {placeholderPrinciple && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">工作原理</h3>
                <p className="text-gray-700 leading-7">
                  {equipment.workingPrinciple}
                </p>
              </div>
            )}
          </section>

          <hr className="my-12 border-gray-200" />

          <section id="section-features" className="scroll-mt-[64px] space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">产品特点</h2>

            {/* 产品特点列表 */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-900">核心特点</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {placeholderFeatures.map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-gray-200 p-6 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-blue-600 font-semibold text-sm">{idx + 1}</span>
                      </div>
                      <div>
                        {/* <div className="font-semibold text-gray-900 mb-2">特点 {idx + 1}</div> */}
                        <div className="text-gray-700 leading-6">{item}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 应用场景 */}
            {placeholderScenes.length > 0 && (
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">应用场景</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {placeholderScenes.map((scene, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-green-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          {/* <h4 className="font-semibold text-gray-900 mb-2">应用场景 {index + 1}</h4> */}
                          <p className="text-gray-700 text-sm leading-6">{scene}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 技术规格 */}
            {hasModels && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">技术规格</h3>
                <div className="space-y-6">
                  {equipment.models!.map((model) => (
                    <div key={model.id}>
                      <h4 className="text-lg font-semibold mb-3 text-gray-800">{model.name}</h4>
                      <div className="border rounded-lg overflow-hidden bg-white">
                        <table className="min-w-full divide-y divide-gray-200">
                          <tbody className="bg-white divide-y divide-gray-200">
                            {model.params.map((spec, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 bg-gray-50/50 w-1/3">{spec.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{spec.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <hr className="my-12 border-gray-200" />

          <section id="section-more" className="scroll-mt-[64px] space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">更多推荐</h2>

            {/* 相关产品推荐 */}
            {filteredRelatedEquipment.length > 0 ? (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900">相关设备推荐</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRelatedEquipment.slice(0, 3).map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-40 bg-gray-50">
                        <Image
                          src={item.images?.[0]?.url || '/logo.png'}
                          alt={item.name}
                          fill
                          className="object-contain p-6"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {item.desc || '专业的实验设备，支持多种研究应用'}
                        </p>
                        <Link
                          href={`/equipment/${item.id}`}
                          className="inline-flex items-center text-blue-600 text-sm font-medium hover:text-blue-700"
                        >
                          查看详情
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">暂无相关产品</h3>
                <p className="text-gray-600 mb-4">请查看我们的全部设备或联系我们了解更多信息</p>
                <Link
                  href="/equipment"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  查看全部设备
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}

            {/* 快捷操作 */}
            {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">快捷操作</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/equipment" className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-900">全部设备</span>
                  </div>
                </Link>

                <button className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-900">技术资料</span>
                  </div>
                </button>

                <button className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.65 11.945a11.007 11.007 0 0011 11l2.555-3.453a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-900">联系我们</span>
                  </div>
                </button>

                <button className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-900">技术支持</span>
                  </div>
                </button>
              </div>
            </div> */}
          </section>
        </div>
      </div>
    </main>
  )
}