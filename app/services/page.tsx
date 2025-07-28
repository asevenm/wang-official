import Link from 'next/link'

export default function Services() {
  const services = [
    {
      title: '实验技术服务',
      description: '提供专业的实验技术支持和数据分析服务',
      features: [
        '电生理数据预处理',
        '局部场电位数据分析 (LFP, EEG, ECOG)',
        'spike数据分析',
        'spike放电模式分析',
        'spike功能连接性分析',
        '神经元编码分析',
        'spike-rhythm分析',
        'Event-related分析',
        '神经解码',
        '数据分析系列培训课程'
      ]
    },
    {
      title: '仪器设备租赁',
      description: '提供专业的仪器设备租赁服务',
      features: [
        '小动物气体麻醉机',
        '小动物呼吸机',
        '脑立体定位仪'
      ]
    },
    {
      title: '仪器设备维修',
      description: '专业的仪器设备维修保养服务',
      features: [
        '生物安全柜维修保养',
        '超净台维护维修保养'
      ]
    },
    {
      title: '研发众筹',
      description: '提供专业的研发众筹服务',
      features: [
          // 'CNAS实验动物机构认证服务',
          // 'GLP, GCP, GMP, AAALAC认证服务'
      ]
    }
  ]

  return (
    <main className="min-h-screen p-8">
      {/* <h1 className="text-4xl font-bold mb-8">技术服务</h1> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
            <p className="text-gray-600 mb-6">{service.description}</p>
            <h3 className="text-lg font-semibold mb-4">服务内容：</h3>
            <ul className="space-y-2">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link 
              href="/contact"
              className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              联系我们
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
} 