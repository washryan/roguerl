"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRelatedProducts } from "@/lib/db/products"
import type { Product } from "@/lib/types"

interface RelatedProductsProps {
  productId: string
  category: string
}

export function RelatedProducts({ productId, category }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const productsPerPage = 4

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true)
        const relatedProducts = await getRelatedProducts(productId, category)
        setProducts(relatedProducts)
      } catch (error) {
        console.error("Erro ao carregar produtos relacionados:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [productId, category])

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - productsPerPage))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(products.length - productsPerPage, prev + productsPerPage))
  }

  const visibleProducts = products.slice(currentIndex, currentIndex + productsPerPage)
  const canGoNext = currentIndex + productsPerPage < products.length
  const canGoPrevious = currentIndex > 0

  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <div className="aspect-square bg-muted"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="h-8 bg-muted rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Produtos Relacionados</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className="h-8 w-8 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Anterior</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={!canGoNext}
            className="h-8 w-8 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próximo</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleProducts.map((product) => {
          // Encontrar a variante com o menor preço
          const prices = product.variants.map((v) => v.price)
          const minPrice = Math.min(...prices)

          // Verificar se há desconto
          const hasDiscount = product.variants.some((v) => v.compareAtPrice)
          const discountVariant = product.variants.find((v) => v.compareAtPrice)
          const discountPercentage = hasDiscount
            ? Math.round(
                ((discountVariant?.compareAtPrice! - discountVariant?.price!) / discountVariant?.compareAtPrice!) * 100,
              )
            : 0

          return (
            <Card key={product.id} className="overflow-hidden group">
              <Link href={`/produtos/${product.slug}`} className="relative block aspect-square overflow-hidden">
                <Image
                  src={product.images[0]?.url || "/placeholder.svg?height=400&width=400"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {hasDiscount && <Badge className="absolute top-2 right-2 bg-red-500">-{discountPercentage}%</Badge>}
              </Link>
              <CardContent className="p-4">
                <h3 className="font-medium line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{product.category}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold">R$ {minPrice.toFixed(2).replace(".", ",")}</span>
                  {hasDiscount && (
                    <span className="text-sm text-muted-foreground line-through">
                      R$ {discountVariant?.compareAtPrice?.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
