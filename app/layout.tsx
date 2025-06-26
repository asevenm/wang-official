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
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
