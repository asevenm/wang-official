import { getArticleById } from '@/lib/blogApi'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function ArticleDetail({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id)
  
  if (!article) {
    notFound()
  }

  // 判断文章类型
  const isWechatArticle = 'author' in article
  const isVideoArticle = 'duration' in article
  const isNewsArticle = 'category' in article

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 返回按钮 */}
        <Link href="/blog" className="inline-flex items-center text-blue-600 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          返回技术分享
        </Link>
        
        {/* 文章标题 */}
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        
        {/* 文章元信息 */}
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6">
          {isWechatArticle && (
            <>
              <span className="mr-4">作者: {article.author}</span>
              <span className="mr-4">发布日期: {article.date}</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">公众号文章</span>
            </>
          )}
          
          {isVideoArticle && (
            <>
              <span className="mr-4">时长: {article.duration}</span>
              <span className="mr-4">播放量: {article.views}</span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded">视频分享</span>
            </>
          )}
          
          {isNewsArticle && (
            <>
              <span className="mr-4">发布日期: {article.date}</span>
              <span className="mr-4">分类: {article.category}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">行业资讯</span>
            </>
          )}
        </div>
        
        {/* 封面图片 */}
        {article.coverImage && (
          <div className="mb-8">
            <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg"></div>
          </div>
        )}
        
        {/* 视频播放器 */}
        {isVideoArticle && article.videoUrl && (
          <div className="mb-8">
            <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg">
              <div className="flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {/* 文章内容 */}
        <div className="prose max-w-none">
          {article.content ? (
            <MDXRemote source={article.content} />
          ) : (
            <p className="text-gray-600">{article.summary}</p>
          )}
        </div>
        
        {/* 分享和评论区 */}
        {/* <div className="mt-12 border-t pt-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">分享文章</h2>
            <div className="flex space-x-4">
              <button className="p-2 bg-gray-100 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </button>
              <button className="p-2 bg-gray-100 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="p-2 bg-gray-100 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                </svg>
              </button>
              <button className="p-2 bg-gray-100 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">评论</h2>
            <form className="mb-6">
              <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="分享您的想法..."
              ></textarea>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                提交评论
              </button>
            </form>
          </div>
        </div> */}
        
        {/* 相关推荐 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">相关推荐</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold mb-2">实验室设备维护指南</h3>
              <p className="text-gray-600 text-sm mb-2">定期维护实验室设备的重要性和方法...</p>
              <Link href="#" className="text-blue-600 text-sm">阅读更多</Link>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold mb-2">科研数据管理最佳实践</h3>
              <p className="text-gray-600 text-sm mb-2">如何有效管理和保存科研数据...</p>
              <Link href="#" className="text-blue-600 text-sm">阅读更多</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}