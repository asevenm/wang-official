import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Nav from './components/Nav'
import './globals.css'
import {NextUIProvider} from "@nextui-org/react";
import MessageModal from './components/MesageModal'
import Categories from './components/Categories'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <NextUIProvider>
          <Nav />
          <main className="flex w-[100vw] overflow-hidden">
            {/* <Categories />   */}
            <div className="pb-12 w-[calc(100vw-2rem)] sm:w-[calc(100vw-16rem)] my-4 mx-auto">{children}</div>
            <MessageModal />
          </main>
        </NextUIProvider>
      </body>
    </html>
  )
}