export interface SearchResult {
  title: string
  path: string
  content: string
  category: 'equipment' | 'reagents' | 'services' | 'blog' | 'pages'
  icon: string
}

export const searchData: SearchResult[] = [
  { 
    title: '仪器设备 - 显微镜', 
    path: '/equipment/microscopes', 
    content: '高精度显微镜设备，适用于各类生物样本观察', 
    category: 'equipment', 
    icon: '🔬' 
  },
  { 
    title: '仪器设备 - PCR仪', 
    path: '/equipment/pcr', 
    content: '专业PCR扩增仪，满足分子生物学实验需求', 
    category: 'equipment', 
    icon: '🧬' 
  },
  { 
    title: '试剂耗材 - 培养基', 
    path: '/reagents/medium', 
    content: '各类细胞培养基，保证细胞培养最佳状态', 
    category: 'reagents', 
    icon: '🧪' 
  },
  { 
    title: '技术服务 - 基因测序', 
    path: '/services/sequencing', 
    content: '提供高通量基因测序服务，快速准确', 
    category: 'services', 
    icon: '🔬' 
  },
  { 
    title: '技术分享 - PCR技术原理', 
    path: '/blog/pcr-principles', 
    content: 'PCR技术原理及应用详解', 
    category: 'blog', 
    icon: '📝' 
  },
  { 
    title: '关于我们', 
    path: '/about', 
    content: '了解我们的公司历史和愿景', 
    category: 'pages', 
    icon: '🏢' 
  },
  { 
    title: '联系我们', 
    path: '/contact', 
    content: '获取联系方式和地址信息', 
    category: 'pages', 
    icon: '📞' 
  }
]

export const categoryColors = {
  equipment: 'text-blue-600 bg-blue-50',
  reagents: 'text-green-600 bg-green-50',
  services: 'text-purple-600 bg-purple-50',
  blog: 'text-orange-600 bg-orange-50',
  pages: 'text-gray-600 bg-gray-50'
}