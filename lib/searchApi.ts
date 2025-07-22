import { http } from '@/lib/request';

export interface SearchResult {
  id: string
  title: string
  content: string
  path: string
  category: 'equipment' | 'reagents' | 'services' | 'blog' | 'pages' | 'agents'
  icon: string
  type?: string
  images?: { id: number; url: string }[]
  createTime?: string
}

export interface SearchResponse {
  results: SearchResult[]
  total: number
}

// 搜索仪器设备
async function searchInstruments(query: string): Promise<SearchResult[]> {
  try {
    const [equipmentResponse, reagentsResponse] = await Promise.all([
      http.get(`/instrument?typeType=1`),
      http.get(`/instrument?typeType=2`)
    ])
    
    const allInstruments = [...equipmentResponse.data, ...reagentsResponse.data]
    const searchTerm = query.toLowerCase()
    // console.log('allInstruments', allInstruments, searchTerm)
    return allInstruments
      .filter((item: any) => 
        item.name?.toLowerCase().includes(searchTerm) ||
        item.desc?.toLowerCase().includes(searchTerm) ||
        item.type?.name?.toLowerCase().includes(searchTerm)
      )
      .map((item: any) => ({
        id: item.id.toString(),
        title: item.name || '未知设备',
        content: item.desc || '暂无描述',
        path: item.type?.typeType === 1 ? `/equipment/${item.id}` : `/reagents/${item.id}`,
        category: item.type?.typeType === 1 ? 'equipment' as const : 'reagents' as const,
        icon: item.type?.typeType === 1 ? '🔬' : '🧪',
        type: item.type?.name,
        images: item.images || [],
        createTime: item.createTime
      }))
  } catch (error) {
    console.error('Error searching instruments:', error)
    return []
  }
}

// 搜索代理品牌
async function searchAgents(query: string): Promise<SearchResult[]> {
  try {
    const response = await http.get('/agent-brand')
    const agents = response.data || []
    const searchTerm = query.toLowerCase()
    
    return agents
      .filter((item: any) => 
        item.name?.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm)
      )
      .map((item: any) => ({
        id: item.id.toString(),
        title: item.name || '未知品牌',
        content: item.description || '暂无描述',
        path: `/home`,
        category: 'agents' as const,
        icon: '🏭',
        createTime: item.createTime
      }))
  } catch (error) {
    console.error('Error searching agents:', error)
    return []
  }
}

// 搜索消息/技术分享
async function searchMessages(query: string): Promise<SearchResult[]> {
  try {
    const response = await http.get('/message')
    const messages = response.data || []
    const searchTerm = query.toLowerCase()
    
    return messages
      .filter((item: any) => 
        item.title?.toLowerCase().includes(searchTerm) ||
        item.content?.toLowerCase().includes(searchTerm)
      )
      .slice(0, 10) // 限制结果数量
      .map((item: any) => ({
        id: item.id.toString(),
        title: item.title || '未知标题',
        content: item.content || '暂无内容',
        path: `/blog/${item.id}`,
        category: 'blog' as const,
        icon: '📝',
        createTime: item.createTime
      }))
  } catch (error) {
    console.error('Error searching messages:', error)
    return []
  }
}

// 搜索静态页面
function searchStaticPages(query: string): SearchResult[] {
  const staticPages = [
    {
      id: 'home',
      title: '首页',
      content: '上海雷鼠仪器仪表有限公司主页，了解我们的产品和服务',
      path: '/',
      category: 'pages' as const,
      icon: '🏠'
    },
    {
      id: 'about',
      title: '关于我们',
      content: '了解上海雷鼠仪器仪表有限公司的历史、愿景和团队',
      path: '/about',
      category: 'pages' as const,
      icon: '🏢'
    },
    {
      id: 'contact',
      title: '联系我们',
      content: '获取联系方式、地址信息和技术支持',
      path: '/contact',
      category: 'pages' as const,
      icon: '📞'
    },
    {
      id: 'services',
      title: '技术服务',
      content: '专业的技术支持和解决方案服务',
      path: '/services',
      category: 'services' as const,
      icon: '⚙️'
    }
  ]
  
  const searchTerm = query.toLowerCase()
  return staticPages.filter(page => 
    page.title.toLowerCase().includes(searchTerm) ||
    page.content.toLowerCase().includes(searchTerm)
  )
}

// 主搜索函数
export async function searchContent(query: string): Promise<SearchResponse> {
  if (!query || query.trim().length < 1) {
    return { results: [], total: 0 }
  }

  try {
    const [
      instruments,
      agents, 
      messages,
      staticPages
    ] = await Promise.all([
      searchInstruments(query),
      searchAgents(query),
      searchMessages(query),
      Promise.resolve(searchStaticPages(query))
    ])
    console.log('instruments', instruments)
    console.log('agents', agents)
    console.log('messages', messages)
    console.log('staticPages', staticPages)

    const allResults = [
      ...instruments,
      ...agents,
      ...messages,
      ...staticPages
    ].slice(0, 20) // 限制总结果数量

    // 按相关性排序 (标题匹配优先)
    const sortedResults = allResults.sort((a, b) => {
      const queryLower = query.toLowerCase()
      const aTitle = a.title.toLowerCase().includes(queryLower)
      const bTitle = b.title.toLowerCase().includes(queryLower)
      
      if (aTitle && !bTitle) return -1
      if (!aTitle && bTitle) return 1
      return 0
    })

    return {
      results: sortedResults,
      total: sortedResults.length
    }
  } catch (error) {
    console.error('Search error:', error)
    return { results: [], total: 0 }
  }
}

// 获取搜索建议（基于已有数据）
export async function getSearchSuggestions(): Promise<string[]> {
  try {
    const [instruments, agents] = await Promise.all([
      http.get('/api/instrument'),
      http.get('/api/agent-brand')
    ])
    
    const suggestions = [
      ...instruments.slice(0, 5).map((item: any) => item.name),
      ...agents.slice(0, 3).map((item: any) => item.name),
      '技术服务',
      '联系我们',
      '关于我们'
    ].filter(Boolean)

    return suggestions
  } catch (error) {
    console.error('Error getting suggestions:', error)
    return ['显微镜', 'PCR仪', '培养基', '技术服务', '联系我们']
  }
}