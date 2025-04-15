"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Star } from "lucide-react"
import AddToCartButton from "@/components/add-to-cart-button"

export default function ProdutoPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products?id=${params.id}`)
        if (!response.ok) {
          throw new Error("Produto não encontrado")
        }
        const data = await response.json()
        setProduct(data)

        // Definir valores padrão
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0])
        }
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0].name)
        }
      } catch (error) {
        console.error("Erro ao carregar produto:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Carregando produto...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Produto não encontrado</h1>
        <p className="mt-4 text-muted-foreground">O produto que você está procurando não existe ou foi removido.</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} - Imagem ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} avaliações)
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold">R$ {product.price.toFixed(2).replace(".", ",")}</p>
            <p className="text-sm text-muted-foreground">Em até 12x sem juros</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Cor</h3>
              <div className="flex gap-2">
                {product.colors.map((color: any) => (
                  <div
                    key={color.name}
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
                      selectedColor === color.name ? "ring-2 ring-primary ring-offset-2" : "border"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                  >
                    <span className="sr-only">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Tamanho</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size: string) => (
                  <div
                    key={size}
                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-md ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground"
                        : "border bg-background hover:bg-muted"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Quantidade</h3>
              <div className="flex w-32 items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <div className="flex h-10 w-10 items-center justify-center border-y bg-background">{quantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <AddToCartButton
              productId={product.id}
              variantId={
                product.variants.find((v: any) => v.size === selectedSize && v.color === selectedColor)?.id || ""
              }
              quantity={quantity}
              className="flex-1"
            />
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
