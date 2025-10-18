import { getEquipmentById } from '@/lib/api'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Tabs from './Tabs'

export default async function EquipmentDetail({ params }: { params: { id: string } }) {
  const equipment = await getEquipmentById(params.id)
  
  if (!equipment) {
    notFound()
  }

  // 预留内容占位
  const placeholderLongDesc =
    equipment.desc ||
    '该设备支持自动化测量与分析，适用于多种实验与教学场景。支持多通道同步记录与结果导出，满足不同规模实验需求。'

  const placeholderFeatures =
    equipment.features?.map((f) => f.text) || [
      '模块化配置，灵活扩展',
      '上手简单，支持一键测量',
      '内置分析与报表导出',
      '支持多通道同步测量',
    ]

  const placeholderPrinciple =
    equipment.workingPrinciple ||
    '系统通过对目标部位压力的动态调控与光学/电学信号采集，提取脉搏波等特征并进行算法分析，从而得到关键生理参数。该方法已在多种动物模型中验证，能够协助研究人员快速、准确地完成测量。参考展示样式见站点：小动物无创血压计。'

  const placeholderScenes = (equipment.applicationScenes?.length || 0) > 0 ? equipment.applicationScenes! : [
    '药效学研究：评估给药前后关键指标变化，提供可靠数据支持',
    '病症模型研究：持续监测指标变化，辅助分析发病机制与进展',
    '教学演示：用于方法演示和数据分析流程教学',
  ]

  const hasModels = Array.isArray(equipment.models) && equipment.models.length > 0
  const exampleSpecs = [
    { name: '可测参数', value: '收缩压、平均压、舒张压、心率' },
    { name: '通道数量', value: '1-9通道（可选）' },
    { name: '适用对象', value: '小鼠/大鼠（20-950g）' },
    { name: '传感器类型', value: '光电传感器' },
    { name: '预热温度范围', value: '室温-50°C' },
  ]

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* 返回按钮 */}
        <Link href="/equipment" className="inline-flex items-center text-blue-600 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          返回
        </Link>

        {/* 顶部概览卡片 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/3">
              <div className="relative w-full h-64 md:h-96">
                <Image
                  src={equipment.images?.[0]?.url || '/logo.png'}
                  alt={equipment.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
            <div className="p-6 md:p-8 md:w-2/3">
              <h1 className="text-2xl md:text-3xl font-bold mb-3">{equipment.name}</h1>
              <p className="text-gray-700 mb-4 leading-7 line-clamp-4">{placeholderLongDesc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                {placeholderFeatures.slice(0, 4).map((feat, idx) => (
                  <div key={idx} className="inline-flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  联系咨询
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 详情分栏（滚动联动 tab） */}
        <div className="mt-8">
          <Tabs
            tabs={[
              { key: 'features', label: 'FEATURES', targetId: 'section-features' },
              { key: 'description', label: 'DESCRIPTION', targetId: 'section-description' },
              { key: 'more', label: 'MORE', targetId: 'section-more' },
            ]}
            initialKey="features"
            stickyTop={64}
            offset={64}
          />
        </div>

        {/* 内容区域（与 tab 锚点对应） */}
        <section id="section-features" className="scroll-mt-[64px] space-y-6 mt-12">
          <h2 className="text-xl font-semibold">产品特点</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {placeholderFeatures.map((item, idx) => (
              <li key={idx} className="rounded-md border p-4 bg-white">
                <div className="font-medium mb-1">特点 {idx + 1}</div>
                <div className="text-gray-700 text-sm leading-6">{item}</div>
              </li>
            ))}
          </ul>
        </section>

        <section id="section-description" className="scroll-mt-[64px] space-y-6 mt-6">
          <h2 className="text-xl font-semibold">产品详情</h2>
          <p className="text-gray-700 leading-7">{placeholderLongDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="relative h-40 w-full rounded-md overflow-hidden bg-gray-50">
                <Image
                  src={equipment.images?.[i]?.url || '/logo.png'}
                  alt={`${equipment.name}-image-${i + 1}`}
                  fill
                  className="object-contain p-6"
                />
              </div>
            ))}
          </div>
        </section>

        <section id="section-more" className="scroll-mt-[64px] space-y-6 mt-12">
          <h2 className="text-xl font-semibold">工作原理</h2>
          <p className="text-gray-700 leading-7">
            {placeholderPrinciple}
            {!equipment.workingPrinciple && (
              <>
                （参考页面：
                <a
                  className="text-blue-600 underline"
                  href="https://www.yuyanbio.com/xueliu/315.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  小动物无创血压计
                </a>
                ）
              </>
            )}
          </p>
          
          {placeholderScenes.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">应用场景</h3>
              <ul className="space-y-3">
                {placeholderScenes.map((scene, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 leading-6">{scene}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {hasModels && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">技术规格</h3>
              <div className="space-y-6">
                {equipment.models!.map((model) => (
                  <div key={model.id}>
                    <h4 className="text-md font-semibold mb-2">{model.name}</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200">
                          {model.params.map((spec, index) => (
                            <tr key={index}>
                              <td className="px-6 py-3 text-sm font-medium text-gray-900 bg-gray-50 w-1/3">{spec.name}</td>
                              <td className="px-6 py-3 text-sm text-gray-700">{spec.value}</td>
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
      </div>
    </main>
  )
}