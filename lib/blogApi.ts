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

// 获取所有博客文章
export async function getBlogArticles(): Promise<ArticleSection[]> {
  // 这里可以从外部API获取数据
  // const res = await fetch('https://api.example.com/blog', { next: { revalidate: 3600 } })
  // if (!res.ok) throw new Error('获取博客数据失败')
  // return res.json()
  
  // 目前使用模拟数据
  return [
    {
      type: '公众号文章',
      items: [
        {
          id: 'wechat-article-1',
          title: '最新实验技术解析',
          date: '2024-03-24',
          summary: '详细介绍最新的实验技术和应用方法...',
          author: '技术部',
          content: `
# 最新实验技术解析

## 引言
随着科学技术的不断发展，实验技术也在不断更新迭代。本文将详细介绍几种最新的实验技术和应用方法，帮助研究人员提高实验效率和准确性。

## 单细胞测序技术
单细胞测序技术是近年来发展迅速的一项技术，它允许研究人员在单细胞水平上分析基因表达。这项技术的优势在于可以揭示细胞群体中的异质性，为疾病研究和药物开发提供更精确的信息。

### 应用领域
- 肿瘤异质性研究
- 免疫细胞分类
- 发育生物学研究

## CRISPR基因编辑技术
CRISPR-Cas9系统是一种高效的基因编辑工具，可以精确地修改DNA序列。近期的技术改进使其特异性和效率进一步提高。

### 最新进展
- 碱基编辑器的开发
- 无PAM限制的Cas变体
- 更高效的递送系统

## 结论
这些新技术的应用将大大推动生命科学研究的发展，为解决复杂的生物学问题提供强大工具。
          `,
          coverImage: '/blog/experiment-tech.jpg'
        },
        {
          id: 'wechat-article-2',
          title: '实验室安全指南',
          date: '2024-03-23',
          summary: '实验室安全操作规范和注意事项...',
          author: '安全部',
          content: `
# 实验室安全指南

## 前言
实验室安全是科研工作的基础，本指南旨在提供全面的安全操作规范和注意事项，确保实验人员的人身安全和实验数据的可靠性。

## 个人防护
- 始终佩戴适当的个人防护装备（PPE）
- 实验室内禁止饮食
- 长发应束起，避免佩戴悬垂的首饰

## 化学品安全
- 了解所用化学品的危险特性
- 正确存储和处理化学废弃物
- 熟悉紧急处理程序

## 生物安全
- 遵循生物安全等级要求
- 正确处理生物样本
- 避免产生气溶胶

## 紧急情况处理
- 熟悉紧急出口位置
- 了解灭火器、洗眼器和紧急淋浴的使用方法
- 掌握基本的急救知识

## 总结
安全是实验室工作的首要原则，每位实验人员都应严格遵守安全规范，共同维护实验室的安全环境。
          `,
          coverImage: '/blog/lab-safety.jpg'
        }
      ]
    },
    {
      type: '视频分享',
      items: [
        {
          id: 'video-1',
          title: '仪器操作教程',
          duration: '15:30',
          summary: '详细演示仪器的正确使用方法...',
          views: '1.2k',
          content: `
# 仪器操作教程

本视频详细演示了实验室常用仪器的正确使用方法，包括操作步骤、注意事项和常见问题解决方案。

## 视频内容
- 高效液相色谱仪(HPLC)的操作流程
- 质谱仪的样品准备和分析方法
- 离心机的平衡技巧和安全使用指南

通过本教程，您将掌握这些仪器的基本操作技能，提高实验效率和数据准确性。
          `,
          videoUrl: 'https://example.com/videos/instrument-tutorial.mp4',
          coverImage: '/blog/instrument-tutorial.jpg'
        },
        {
          id: 'video-2',
          title: '实验技巧分享',
          duration: '10:45',
          summary: '经验丰富的技术人员分享实验技巧...',
          views: '980',
          content: `
# 实验技巧分享

本视频由经验丰富的技术人员分享多年积累的实验技巧和经验，帮助您避免常见错误，提高实验成功率。

## 视频内容
- 细胞培养的关键技巧
- PCR反应的优化方法
- 蛋白质提取和纯化的实用技巧

这些技巧来自于实际工作经验，将帮助您更高效地完成实验，获得更可靠的结果。
          `,
          videoUrl: 'https://example.com/videos/lab-tips.mp4',
          coverImage: '/blog/lab-tips.jpg'
        }
      ]
    },
    {
      type: '行业资讯',
      items: [
        {
          id: 'news-1',
          title: '生物技术最新发展趋势',
          date: '2024-03-22',
          summary: '解析行业最新发展动态和未来趋势...',
          category: '行业动态',
          content: `
# 生物技术最新发展趋势

## 概述
本文解析生物技术行业的最新发展动态和未来趋势，为从业者和投资者提供参考。

## 合成生物学的崛起
合成生物学正从实验室走向产业化应用，在医药、材料、能源等领域展现巨大潜力。

## 人工智能与生物技术的融合
AI技术在药物发现、蛋白质结构预测和基因组分析等领域的应用正在改变传统研究模式。

## 精准医疗的进展
基因测序成本的降低和分析技术的提升推动了精准医疗的快速发展。

## 市场展望
预计未来五年，生物技术市场将保持两位数增长，特别是在亚太地区。

## 结论
生物技术正处于创新爆发期，跨学科融合将催生更多突破性进展。
          `,
          coverImage: '/blog/biotech-trends.jpg'
        },
        {
          id: 'news-2',
          title: '实验室发展新方向',
          date: '2024-03-21',
          summary: '探讨实验室未来发展方向和机遇...',
          category: '发展趋势',
          content: `
# 实验室发展新方向

## 引言
随着科技进步和研究需求的变化，实验室的设计、管理和运营模式也在不断演变。本文探讨实验室未来发展的新方向和机遇。

## 智能化实验室
- 自动化设备的广泛应用
- 物联网技术实现远程监控
- 实验数据的智能分析和管理

## 开放式实验室
- 资源共享模式的兴起
- 跨学科合作平台的建设
- 产学研一体化的发展趋势

## 绿色实验室
- 节能环保设计
- 试剂和废弃物管理的创新
- 可持续发展理念的实践

## 机遇与挑战
实验室转型升级既面临技术和资金挑战，也蕴含巨大的发展机遇和市场潜力。

## 结语
把握新趋势，拥抱新技术，实验室将迎来更高效、更创新的发展阶段。
          `,
          coverImage: '/blog/lab-future.jpg'
        }
      ]
    }
  ]
}

// 根据ID获取文章详情
export async function getArticleById(id: string): Promise<Article | null> {
  const sections = await getBlogArticles()
  
  for (const section of sections) {
    const article = section.items.find(item => item.id === id)
    if (article) {
      return article
    }
  }
  
  return null
}