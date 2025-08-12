"use client"

import React, { useEffect, useRef, useState } from "react"

export type TabItem = {
  key: string
  label: string
  targetId?: string
}

interface TabsProps {
  tabs: TabItem[]
  initialKey?: string
  onChange?: (key: string) => void
  offset?: number
  stickyTop?: number
}

export default function Tabs({ tabs, initialKey, onChange, offset, stickyTop = 0 }: TabsProps) {
  const [activeKey, setActiveKey] = useState<string>(initialKey || tabs[0]?.key)
  const effectiveOffset = (typeof offset === 'number' ? offset : stickyTop) || 0
  const [sections, setSections] = useState<{ key: string; id: string; el: HTMLElement }[]>([])
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)
  const [isFixed, setIsFixed] = useState(false)
  const [navHeight, setNavHeight] = useState(0)

  useEffect(() => {
    const found = tabs
      .map((t) => ({ key: t.key, id: t.targetId || t.key }))
      .map((s) => ({ ...s, el: document.getElementById(s.id) }))
      .filter((s): s is { key: string; id: string; el: HTMLElement } => !!s.el)
    setSections(found)
  }, [tabs])

  useEffect(() => {
    const handle = () => {
      const currentY = window.scrollY + effectiveOffset + 10
      let currentKey = tabs[0]?.key
      for (const s of sections) {
        if (!s.el) continue
        if (s.el.offsetTop <= currentY) {
          currentKey = s.key
        } else {
          break
        }
      }
      setActiveKey((prev) => (prev === currentKey ? prev : currentKey || prev))
      if (currentKey) onChange?.(currentKey)
    }
    handle()
    window.addEventListener('scroll', handle, { passive: true })
    window.addEventListener('resize', handle)
    return () => {
      window.removeEventListener('scroll', handle)
      window.removeEventListener('resize', handle)
    }
  }, [sections, tabs, effectiveOffset, onChange])

  // Fixed fallback if sticky fails (and also consistent behavior across browsers)
  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return
      const top = wrapperRef.current.getBoundingClientRect().top
      setIsFixed(top <= (stickyTop || 0))
    }
    const onResize = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight)
    }
    onResize()
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [stickyTop])

  const scrollToKey = (key: string) => {
    const target = sections.find((s) => s.key === key)?.el
    if (target) {
      const top = target.offsetTop - effectiveOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full" ref={wrapperRef}>
      {isFixed && <div style={{ height: navHeight }} />}
      <div
        className={
          (isFixed ? 'fixed left-0 right-0 ' : 'sticky ') +
          'z-10 bg-white/80 backdrop-blur border-b'
        }
        style={{ top: stickyTop }}
        ref={navRef}
      >
        <nav className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto p-2">
          {tabs.map((tab) => {
            const isActive = tab.key === activeKey
            return (
              <button
                key={tab.key}
                type="button"
                className={
                  "whitespace-nowrap rounded-md px-4 py-2 text-sm transition " +
                  (isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100")
                }
                onClick={() => scrollToKey(tab.key)}
              >
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}


