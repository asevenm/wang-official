export default function Services() {
  const services = [
    {
      title: '仪器设备维修',
      description: '专业的仪器设备维修服务，确保您的设备始终保持最佳状态',
      features: [
        '专业维修团队',
        '快速响应服务',
        '原厂配件更换',
        '定期保养维护'
      ]
    },
    {
      title: '仪器设备租赁',
      description: '灵活的仪器设备租赁方案，满足您的临时需求',
      features: [
        '多种设备可选',
        '灵活租赁期限',
        '专业技术支持',
        '定期维护保养'
      ]
    },
    {
      title: '实验技术服务',
      description: '提供全方位的实验技术支持和服务',
      features: [
        '实验方案设计',
        '技术培训指导',
        '实验过程咨询',
        '数据分析支持'
      ]
    },
    {
      title: '资格认证',
      description: '专业的资格认证服务，助力您的实验室达到行业标准',
      features: [
        '实验室认证咨询',
        '质量体系建设',
        '认证材料准备',
        '认证过程辅导'
      ]
    }
  ]

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">技术服务</h1>

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
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              联系我们
            </button>
          </div>
        ))}
      </div>
    </main>
  )
} 