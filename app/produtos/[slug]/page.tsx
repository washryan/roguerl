import { notFound } from "next/navigation"
import Image from "next/image"
import { getProductBySlug } from "@/lib/db/products"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Truck, RefreshCw, ShieldCheck, Star } from "lucide-react"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // Obter cores e tamanhos disponíveis
  const availableColors = Array.from(new Set(product.variants.map((variant) => variant.color)))
  const availableSizes = Array.from(new Set(product.variants.map((variant) => variant.size)))

  // Calcular preço mínimo e máximo
  const prices = product.variants.map((variant) => variant.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  // Verificar se há desconto
  const hasDiscount = product.variants.some((variant) => variant.compareAtPrice)
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.variants[0].compareAtPrice! - product.variants[0].price) / product.variants[0].compareAtPrice!) * 100,
      )
    : 0

  return (
    <main className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Galeria de Imagens */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-background">
            <Image
              src={product.images[0]?.url || "/placeholder.svg?height=600&width=600"}
              alt={product.images[0]?.alt || product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <div key={index} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                  <Image
                    src={image.url || "/placeholder.svg?height=80&width=80"}
                    alt={image.alt || `${product.name} - Imagem ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informações do Produto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating?.toFixed(1)} ({product.reviewCount} avaliações)
              </span>
              <Button variant="link" className="p-0 h-auto text-sm">
                Guia de Tamanhos
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              {minPrice === maxPrice
                ? `R$ ${minPrice.toFixed(2).replace(".", ",")}`
                : `R$ ${minPrice.toFixed(2).replace(".", ",")} - R$ ${maxPrice.toFixed(2).replace(".", ",")}`}
            </span>
            {hasDiscount && (
              <>
                <span className="text-gray-500 line-through text-sm">
                  R$ {product.variants[0].compareAtPrice?.toFixed(2).replace(".", ",")}
                </span>
                <Badge className="bg-red-500">{discountPercentage}% OFF</Badge>
              </>
            )}
          </div>

          <Separator />

          {/* Seleção de Variantes */}
          <div className="space-y-4">
            {/* Seleção de Cor */}
            <div>
              <h3 className="font-medium mb-2">
                Cor: <span className="font-normal text-gray-500">Selecione</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <button key={color} className="border rounded-md px-3 py-1 text-sm hover:border-primary">
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Seleção de Tamanho */}
            <div>
              <h3 className="font-medium mb-2">
                Tamanho: <span className="font-normal text-gray-500">Selecione</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    className="border rounded-md w-12 h-10 flex items-center justify-center text-sm hover:border-primary"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Botão de Compra */}
            <div className="pt-4">
              <Button className="w-full py-6 text-lg">Adicionar ao Carrinho</Button>
              <div className="flex justify-center mt-4">
                <Button variant="outline" className="w-full">
                  Comprar Agora
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Informações de Entrega e Garantia */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-gray-500" />
              <span className="text-sm">Frete grátis para compras acima de R$ 200,00</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-gray-500" />
              <span className="text-sm">30 dias para troca ou devolução</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-gray-500" />
              <span className="text-sm">Garantia de 3 meses contra defeitos de fabricação</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-gray-500" />
              <span className="text-sm">Produto em estoque - Envio em até 24h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detalhes do Produto */}
      <div className="mb-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="features">Características</TabsTrigger>
            <TabsTrigger value="specifications">Especificações</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-4">
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="features" className="py-4">
            <ul className="space-y-2">
              {product.features?.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Informações Gerais</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between border-b pb-1">
                    <span className="text-gray-500">Categoria</span>
                    <span className="font-medium">{product.category}</span>
                  </li>
                  {product.subcategory && (
                    <li className="flex justify-between border-b pb-1">
                      <span className="text-gray-500">Subcategoria</span>
                      <span className="font-medium">{product.subcategory}</span>
                    </li>
                  )}
                  <li className="flex justify-between border-b pb-1">
                    <span className="text-gray-500">SKU</span>
                    <span className="font-medium">{product.variants[0].sku}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Materiais e Cuidados</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between border-b pb-1">
                    <span className="text-gray-500">Material</span>
                    <span className="font-medium">{product.variants[0].material || "Não especificado"}</span>
                  </li>
                  <li className="flex justify-between border-b pb-1">
                    <span className="text-gray-500">Instruções de Lavagem</span>
                    <span className="font-medium">Lavar à mão ou máquina (água fria)</span>
                  </li>
                  <li className="flex justify-between border-b pb-1">
                    <span className="text-gray-500">Secagem</span>
                    <span className="font-medium">Não usar secadora</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Produtos Relacionados */}
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Produtos relacionados seriam renderizados aqui */}
          <div className="text-center py-4">Carregando produtos relacionados...</div>
        </div>
      </div>

      {/* Sistema de Avaliações */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Avaliações dos Clientes</h2>
        <div className="text-center py-4">Carregando avaliações...</div>
      </div>
    </main>
  )
}
