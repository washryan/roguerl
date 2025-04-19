"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ProductImage {
  url: string
  alt: string
}

interface ProductImageGalleryProps {
  images: ProductImage[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showZoom, setShowZoom] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [zoomImagePosition, setZoomImagePosition] = useState({ x: 50, y: 50 })

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showZoom) return

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x: e.clientX - left, y: e.clientY - top })
    setZoomImagePosition({ x, y })
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-background">
        <div
          className="relative h-full w-full cursor-zoom-in"
          onClick={() => setShowZoom(true)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={images[currentIndex]?.url || "/placeholder.svg?height=600&width=600"}
            alt={images[currentIndex]?.alt || productName}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />

          {showZoom && (
            <div
              className="absolute h-24 w-24 rounded-full border-2 border-primary bg-white/10 backdrop-blur-sm"
              style={{
                left: zoomPosition.x - 48,
                top: zoomPosition.y - 48,
                pointerEvents: "none",
              }}
            ></div>
          )}
        </div>

        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Imagem anterior</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Próxima imagem</span>
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={() => setShowZoom(true)}
        >
          <ZoomIn className="h-4 w-4" />
          <span className="sr-only">Ampliar imagem</span>
        </Button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                index === currentIndex ? "ring-2 ring-primary ring-offset-2" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={image.url || "/placeholder.svg?height=80&width=80"}
                alt={image.alt || `${productName} - Imagem ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      <Dialog open={showZoom} onOpenChange={setShowZoom}>
        <DialogContent className="max-w-4xl p-0 sm:p-0">
          <div className="relative aspect-square w-full overflow-hidden bg-background">
            <div className="h-full w-full">
              <Image
                src={images[currentIndex]?.url || "/placeholder.svg?height=1200&width=1200"}
                alt={images[currentIndex]?.alt || productName}
                fill
                className="object-contain"
                style={{
                  objectPosition: `${zoomImagePosition.x}% ${zoomImagePosition.y}%`,
                }}
                sizes="100vw"
                priority
              />
            </div>

            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Imagem anterior</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Próxima imagem</span>
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
