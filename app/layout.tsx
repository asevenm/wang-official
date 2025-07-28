import type { Metadata } from 'next'
import './globals.css'
import Navigation from './components/Navigation'

export const metadata: Metadata = {
  title: '上海雷鼠仪器仪表有限公司',
  description: '专业的仪器仪表提供商',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <meta name="baidu-site-verification" content="codeva-2Eo1SQbTac" />
      <body>
        <Navigation />
        {children}
      </body>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <a 
          href="https://beian.miit.gov.cn/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-gray-700 transition-colors"
        >
          沪ICP备2025134080号
        </a>
      </footer>
    </html>
  )
}
