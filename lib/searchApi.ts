import { http } from '@/lib/request';

const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

function getCached<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

let debounceTimer: NodeJS.Timeout | null = null;

function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return (...args: Parameters<T>) => {
    return new Promise<ReturnType<T>>((resolve, reject) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(async () => {
        try {
          const result = await func(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}

export interface SearchResult {
  id: string
  title: string
  content: string
  path: string
  category: 'equipment' | 'reagents' | 'services' | 'blog' | 'pages' | 'agents' | 'service-categories' | 'published-articles'
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
  const cacheKey = `instruments`;
  let allInstruments = getCached<any[]>(cacheKey);
  
  if (!allInstruments) {
    try {
      const [equipmentResponse, reagentsResponse] = await Promise.all([
        http.get(`/instrument?typeType=1`),
        http.get(`/instrument?typeType=2`)
      ]);
      
      allInstruments = [...equipmentResponse.data, ...reagentsResponse.data];
      setCache(cacheKey, allInstruments);
    } catch (error) {
      console.error('Error searching instruments:', error);
      return [];
    }
  }
  
  const searchTerm = query.toLowerCase();
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
    }));
}

// 搜索代理品牌
async function searchAgents(query: string): Promise<SearchResult[]> {
  const cacheKey = 'agents';
  let agents = getCached<any[]>(cacheKey);
  
  if (!agents) {
    try {
      const response = await http.get('/agent-brand');
      agents = response.data || [];
      setCache(cacheKey, agents);
    } catch (error) {
      console.error('Error searching agents:', error);
      return [];
    }
  }
  
  const searchTerm = query.toLowerCase();
  return (agents || [])
    .filter((item: any) => 
      item.name?.toLowerCase().includes(searchTerm) ||
      item.description?.toLowerCase().includes(searchTerm)
    )
    .map((item: any) => ({
      id: item.id.toString(),
      title: item.name || '未知品牌',
      content: item.description || '暂无描述',
      path: `/`,
      category: 'agents' as const,
      icon: '🏭',
      createTime: item.createTime
    }));
}

// 搜索技术服务分类
async function searchServiceCategories(query: string): Promise<SearchResult[]> {
  const cacheKey = 'service-categories';
  let serviceCategories = getCached<any[]>(cacheKey);

  if (!serviceCategories) {
    try {
      const response = await http.get('/service-categories');
      serviceCategories = response.data || [];
      setCache(cacheKey, serviceCategories);
    } catch (error) {
      console.error('Error searching service categories:', error);
      return [];
    }
  }

  const searchTerm = query.toLowerCase();
  return (serviceCategories || [])
    .filter((item: any) =>
      item.name?.toLowerCase().includes(searchTerm) ||
      item.description?.toLowerCase().includes(searchTerm)
    )
    .map((item: any) => ({
      id: item.id.toString(),
      title: item.name || '未知服务',
      content: item.description || '暂无描述',
      path: `/services/category/${item.id}`,
      category: 'service-categories' as const,
      icon: '🛠️',
      createTime: item.createTime
    }));
}

// 搜索技术分享内容
async function searchPublishedArticles(query: string): Promise<SearchResult[]> {
  const cacheKey = 'published-articles';
  let publishedArticles = getCached<any[]>(cacheKey);

  if (!publishedArticles) {
    try {
      const response = await http.get('/articles/published');
      publishedArticles = response.data || [];
      setCache(cacheKey, publishedArticles);
    } catch (error) {
      console.error('Error searching published articles:', error);
      return [];
    }
  }

  const searchTerm = query.toLowerCase();
  return (publishedArticles || [])
    .filter((item: any) =>
      item.title?.toLowerCase().includes(searchTerm) ||
      item.content?.toLowerCase().includes(searchTerm) ||
      item.summary?.toLowerCase().includes(searchTerm)
    )
    .slice(0, 10) // 限制返回数量
    .map((item: any) => ({
      id: item.id.toString(),
      title: item.title || '未知文章',
      content: item.summary || item.content?.substring(0, 100) || '暂无内容',
      path: `/articles/${item.id}`,
      category: 'published-articles' as const,
      icon: '📚',
      createTime: item.createTime
    }));
}

// 搜索消息/技术分享
async function searchMessages(query: string): Promise<SearchResult[]> {
  const cacheKey = 'messages';
  let messages = getCached<any[]>(cacheKey);
  
  if (!messages) {
    try {
      const response = await http.get('/message');
      messages = response.data || [];
      setCache(cacheKey, messages);
    } catch (error) {
      console.error('Error searching messages:', error);
      return [];
    }
  }
  
  const searchTerm = query.toLowerCase();
  return (messages || [])
    .filter((item: any) => 
      item.title?.toLowerCase().includes(searchTerm) ||
      item.content?.toLowerCase().includes(searchTerm)
    )
    .slice(0, 10)
    .map((item: any) => ({
      id: item.id.toString(),
      title: item.title || '未知标题',
      content: item.content || '暂无内容',
      path: `/blog/${item.id}`,
      category: 'blog' as const,
      icon: '📝',
      createTime: item.createTime
    }));
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
async function _searchContent(query: string): Promise<SearchResponse> {
  if (!query || query.trim().length < 2) {
    return { results: [], total: 0 };
  }

  try {
    const [
      instruments,
      agents,
      serviceCategories,
      publishedArticles,
      messages,
      staticPages
    ] = await Promise.all([
      searchInstruments(query),
      searchAgents(query),
      searchServiceCategories(query),
      searchPublishedArticles(query),
      searchMessages(query),
      Promise.resolve(searchStaticPages(query))
    ]);

    const allResults = [
      ...instruments,
      ...agents,
      ...serviceCategories,
      ...publishedArticles,
      ...messages,
      ...staticPages
    ].slice(0, 20);

    const sortedResults = allResults.sort((a, b) => {
      const queryLower = query.toLowerCase();
      const aTitle = a.title.toLowerCase().includes(queryLower);
      const bTitle = b.title.toLowerCase().includes(queryLower);
      
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      return 0;
    });

    return {
      results: sortedResults,
      total: sortedResults.length
    };
  } catch (error) {
    console.error('Search error:', error);
    return { results: [], total: 0 };
  }
}

export const searchContent = debounce(_searchContent, 300);

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