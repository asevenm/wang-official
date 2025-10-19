"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface ImageItem {
  url: string
  alt?: string
}

interface ProductImageCarouselProps {
  images: ImageItem[]
  productName: string
}

export default function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // 确保至少有一张图片
  const displayImages = images.length > 0 ? images : [{ url: '/logo.png', alt: productName }]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // 键盘导航支持
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious()
      } else if (event.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="w-full h-full flex flex-col">
      {/* 主图片区域 */}
      <div className="relative flex-1 bg-gray-50 overflow-hidden group rounded-lg">
        <Image
          src={displayImages[currentIndex].url}
          alt={displayImages[currentIndex].alt || `${productName}-${currentIndex + 1}`}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={currentIndex === 0}
        />

        {/* 左右切换按钮 - 只在有多张图片时显示 */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
              aria-label="上一张图片"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-10"
              aria-label="下一张图片"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* 图片指示器 - 只在有多张图片时显示 */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`切换到第${index + 1}张图片`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 缩略图列表 - 只在有多张图片时显示 */}
      {displayImages.length > 1 && (
        <div className="mt-3 px-2">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden border-2 transition-all hover:scale-105 ${
                  index === currentIndex
                    ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt || `${productName}缩略图${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 56px, 64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}