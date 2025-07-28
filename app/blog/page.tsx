import { getBlogArticles } from '@/lib/blogApi'
import Link from 'next/link'

export default async function Blog() {
  // 从服务端获取数据
  const articles = await getBlogArticles()

  return (
    <main className="min-h-screen p-8">
      {/* <h1 className="text-4xl font-bold mb-8">技术分享</h1> */}

      {articles.map((section, index) => (
        <section key={index} className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{section.type}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.summary}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    {'date' in item && <span>{item.date}</span>}
                    {'duration' in item && (
                      <div className="flex items-center space-x-2">
                        <span>时长: {item.duration}</span>
                        <span>播放: {item.views}</span>
                      </div>
                    )}
                    {'category' in item && <span>{item.category}</span>}
                    {'author' in item && <span>作者: {item.author}</span>}
                  </div>
                  <Link href={`/blog/${item.id}`}>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                      阅读更多
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* 订阅区域 */}
      <section className="mt-12 bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">订阅我们</h2>
        <p className="text-gray-600 mb-6">
          关注我们的公众号和视频号，获取最新技术资讯和行业动态
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 bg-white p-4 rounded-lg shadow text-center">
            <h3 className="font-bold mb-2">微信公众号</h3>
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg mb-2"></div>
            <p className="text-sm text-gray-600">扫码关注公众号</p>
          </div>
          <div className="flex-1 bg-white p-4 rounded-lg shadow text-center">
            <h3 className="font-bold mb-2">视频号</h3>
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg mb-2"></div>
            <p className="text-sm text-gray-600">扫码关注视频号</p>
          </div>
        </div>
      </section>
    </main>
  )
}