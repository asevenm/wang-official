import { http } from './request';

// 定义文章基础接口
interface ArticleBase {
  id: string
  title: string
  summary: string
  content?: string
  coverImage?: string
}

// 公众号文章接口
export interface WechatArticle extends ArticleBase {
  date: string
  author: string
}

// 视频分享接口
export interface VideoArticle extends ArticleBase {
  duration: string
  views: string
  videoUrl?: string
}

// 行业资讯接口
export interface NewsArticle extends ArticleBase {
  date: string
  category: string
}

// 文章类型联合类型
export type Article = WechatArticle | VideoArticle | NewsArticle

// 文章分类接口
export interface ArticleSection {
  type: string
  items: Article[]
}

// 定义后端文章接口
interface BackendArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverImage?: string;
  type: 'wechat' | 'video' | 'news';
  author?: string;
  category?: string;
  duration?: string;
  views?: string;
  videoUrl?: string;
  published: boolean;
  publishDate?: string;
  createdAt: string;
  updatedAt: string;
}

// 类型映射
const TYPE_MAPPING = {
  wechat: '公众号文章',
  video: '视频分享',
  news: '行业资讯'
};

// 获取所有博客文章
export async function getBlogArticles(): Promise<ArticleSection[]> {
  try {
    const res = await http.get(`/articles/published`);

    const backendArticles: BackendArticle[] = res.data || res;

    // 按类型分组文章
    const groupedArticles: { [key: string]: Article[] } = {
      '公众号文章': [],
      '视频分享': [],
      '行业资讯': []
    };

    // 转换数据格式并分组
    backendArticles.forEach(backendArticle => {
      const sectionType = TYPE_MAPPING[backendArticle.type];
      if (!sectionType) return;

      let article: Article;

      if (backendArticle.type === 'wechat') {
        article = {
          id: backendArticle.id,
          title: backendArticle.title,
          summary: backendArticle.summary,
          content: backendArticle.content,
          coverImage: backendArticle.coverImage,
          date: backendArticle.publishDate ? new Date(backendArticle.publishDate).toLocaleDateString('zh-CN') : '',
          author: backendArticle.author || '未知作者'
        } as WechatArticle;
      } else if (backendArticle.type === 'video') {
        article = {
          id: backendArticle.id,
          title: backendArticle.title,
          summary: backendArticle.summary,
          content: backendArticle.content,
          coverImage: backendArticle.coverImage,
          duration: backendArticle.duration || '未知时长',
          views: backendArticle.views || '0',
          videoUrl: backendArticle.videoUrl
        } as VideoArticle;
      } else { // news
        article = {
          id: backendArticle.id,
          title: backendArticle.title,
          summary: backendArticle.summary,
          content: backendArticle.content,
          coverImage: backendArticle.coverImage,
          date: backendArticle.publishDate ? new Date(backendArticle.publishDate).toLocaleDateString('zh-CN') : '',
          category: backendArticle.category || '未分类'
        } as NewsArticle;
      }

      groupedArticles[sectionType].push(article);
    });

    // 构建返回数据
    return [
      {
        type: '公众号文章',
        items: groupedArticles['公众号文章']
      },
      {
        type: '视频分享',
        items: groupedArticles['视频分享']
      },
      {
        type: '行业资讯',
        items: groupedArticles['行业资讯']
      }
    ].filter(section => section.items.length > 0); // 只返回有文章的分类

  } catch (error) {
    console.error('获取文章数据失败:', error);
    // 如果API调用失败，返回空数组
    return [];
  }
}

// 根据ID获取文章详情
export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(`${apiUrl}/articles/${id}`, {
      next: { revalidate: 3600 },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null; // 文章不存在
      }
      throw new Error(`获取文章详情失败: ${res.status}`);
    }

    const response = await res.json();
    const backendArticle: BackendArticle = response.data || response;

    // 转换数据格式
    let article: Article;

    if (backendArticle.type === 'wechat') {
      article = {
        id: backendArticle.id,
        title: backendArticle.title,
        summary: backendArticle.summary,
        content: backendArticle.content,
        coverImage: backendArticle.coverImage,
        date: backendArticle.publishDate ? new Date(backendArticle.publishDate).toLocaleDateString('zh-CN') : '',
        author: backendArticle.author || '未知作者'
      } as WechatArticle;
    } else if (backendArticle.type === 'video') {
      article = {
        id: backendArticle.id,
        title: backendArticle.title,
        summary: backendArticle.summary,
        content: backendArticle.content,
        coverImage: backendArticle.coverImage,
        duration: backendArticle.duration || '未知时长',
        views: backendArticle.views || '0',
        videoUrl: backendArticle.videoUrl
      } as VideoArticle;
    } else { // news
      article = {
        id: backendArticle.id,
        title: backendArticle.title,
        summary: backendArticle.summary,
        content: backendArticle.content,
        coverImage: backendArticle.coverImage,
        date: backendArticle.publishDate ? new Date(backendArticle.publishDate).toLocaleDateString('zh-CN') : '',
        category: backendArticle.category || '未分类'
      } as NewsArticle;
    }

    return article;

  } catch (error) {
    console.error('获取文章详情失败:', error);
    return null;
  }
}