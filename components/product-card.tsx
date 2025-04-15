import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  // Encontrar o menor e o maior preço entre as variantes
  const prices = product.variants.map((variant) => variant.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  // Verificar se há desconto
  const hasDiscount = product.variants.some(
    (variant) => variant.compareAtPrice && variant.compareAtPrice > variant.price,
  )

  // Obter cores disponíveis
  const availableColors = [...new Set(product.variants.map((variant) => variant.color))]

  // Obter tamanhos disponíveis
  const availableSizes = [...new Set(product.variants.map((variant) => variant.size))]

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-0">
        <Link href={`/produtos/${product.slug}`} className="relative block aspect-square overflow-hidden">
          <Image
            src={product.images[0]?.url || "/placeholder.svg?height=600&width=600"}
            alt={product.images[0]?.alt || product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {hasDiscount && <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">Oferta</Badge>}
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4 flex-grow">
        <div className="flex-grow">
          <Link href={`/produtos/${product.slug}`} className="hover:underline">
            <h3 className="font-medium line-clamp-2">{product.name}</h3>
          </Link>
          <div className="mt-1 flex items-center gap-2">
            {minPrice === maxPrice ? (
              <p className="font-semibold">R$ {minPrice.toFixed(2).replace(".", ",")}</p>
            ) : (
              <p className="font-semibold">
                R$ {minPrice.toFixed(2).replace(".", ",")} - R$ {maxPrice.toFixed(2).replace(".", ",")}
              </p>
            )}
            {hasDiscount && (
              <p className="text-sm text-muted-foreground line-through">
                R${" "}
                {Math.max(...product.variants.map((v) => v.compareAtPrice || 0))
                  .toFixed(2)
                  .replace(".", ",")}
              </p>
            )}
          </div>
        </div>

        <div className="w-full">
          {/* Cores disponíveis */}
          {availableColors.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {availableColors.slice(0, 4).map((color) => (
                <div
                  key={color}
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: getColorHex(color) }}
                  title={color}
                />
              ))}
              {availableColors.length > 4 && (
                <div className="flex h-4 w-4 items-center justify-center rounded-full border text-[10px]">
                  +{availableColors.length - 4}
                </div>
              )}
            </div>
          )}

          {/* Tamanhos disponíveis */}
          {availableSizes.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {availableSizes.slice(0, 4).map((size) => (
                <div
                  key={size}
                  className="flex h-5 min-w-5 items-center justify-center rounded-sm border bg-background px-1 text-[10px]"
                >
                  {size}
                </div>
              ))}
              {availableSizes.length > 4 && (
                <div className="flex h-5 min-w-5 items-center justify-center rounded-sm border bg-background px-1 text-[10px]">
                  +{availableSizes.length - 4}
                </div>
              )}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

// Função auxiliar para obter código hexadecimal da cor
function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    Preto: "#000000",
    Branco: "#ffffff",
    Cinza: "#808080",
    Azul: "#0000ff",
    Vermelho: "#ff0000",
    Verde: "#00ff00",
    Amarelo: "#ffff00",
    Roxo: "#800080",
    Caqui: "#d2b48c",
  }

  return colorMap[colorName] || "#cccccc"
}
