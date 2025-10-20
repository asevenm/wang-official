import { getReagentItemById } from '@/lib/reagentsApi'
import { getReagentsByPage } from '@/lib/api'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Tabs from '../../components/Tabs'
import ProductImageCarousel from '../../components/ProductImageCarousel'

export default async function ReagentSubcategoryDetail({ params }: { params: { id: string } }) {
  // 并行获取当前试剂信息和相关试剂
  const [item, relatedReagents] = await Promise.all([
    getReagentItemById(params.id),
    getReagentsByPage(1, 6) // 获取6个试剂用于推荐
  ])

  if (!item) {
    notFound()
  }

  // 过滤掉当前试剂，只显示其他试剂作为推荐
  const filteredRelatedReagents = relatedReagents.filter(reagent => reagent.id.toString() !== params.id)

  // 预留内容占位
  const placeholderLongDesc = item.desc;

  const placeholderFeatures = item.features?.map((f) => f.text) || []

  const placeholderPrinciple = item.workingPrinciple;

  const placeholderScenes = item.applicationScenes || [];

  const hasModels = Array.isArray(item.models) && item.models.length > 0

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* 返回按钮 */}
        <Link href="/reagents" className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          返回试剂耗材列表
        </Link>

        {/* 顶部概览卡片 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="lg:flex">
            <div className="lg:flex-shrink-0 lg:w-1/2">
              <div className="relative w-full h-64 md:h-80 lg:h-96">
                <ProductImageCarousel
                  images={item.images || []}
                  productName={item.name}
                />
              </div>
            </div>
            <div className="p-6 md:p-8 lg:w-1/2 lg:flex lg:flex-col lg:justify-center">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{item.name}</h1>
              <p className="text-gray-700 mb-6 leading-7 line-clamp-4">{placeholderLongDesc}</p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium inline-block text-center"
                >
                  联系咨询
                </Link>
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
                {item.images?.map((image, i) => (
                  <div key={i} className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                    <Image
                      src={item.images?.[i]?.url || '/logo.png'}
                      alt={`${item.name}-image-${i + 1}`}
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
                  {item.workingPrinciple}
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
                  {item.models!.map((model) => (
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
            {filteredRelatedReagents.length > 0 ? (
              <div>
                <h3 className="text-xl font-semibold mb-6 text-gray-900">相关试剂推荐</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRelatedReagents.slice(0, 3).map((item) => (
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
                          {item.desc || '专业的实验试剂，支持多种研究应用'}
                        </p>
                        <Link
                          href={`/reagents/${item.id}`}
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
                <p className="text-gray-600 mb-4">请查看我们的全部试剂或联系我们了解更多信息</p>
                <Link
                  href="/reagents"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  查看全部试剂
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}