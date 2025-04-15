import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"
import Link from "next/link"

// Dados simulados de produtos
const products = [
  {
    id: 1,
    name: "Camiseta Oversized Rogue",
    price: 89.9,
    image: "/placeholder.svg?height=400&width=300",
    category: "camisetas",
  },
  {
    id: 2,
    name: "Camiseta Estampada IA",
    price: 99.9,
    image: "/placeholder.svg?height=400&width=300",
    category: "camisetas",
  },
  {
    id: 3,
    name: "Camiseta Minimalista",
    price: 79.9,
    image: "/placeholder.svg?height=400&width=300",
    category: "camisetas",
  },
  {
    id: 4,
    name: "Camiseta Manga Longa",
    price: 109.9,
    image: "/placeholder.svg?height=400&width=300",
    category: "camisetas",
  },
  {
    id: 5,
    name: "Moletom Oversized",
    price: 159.9,
    image: "/placeholder.svg?height=400&width=300",
    category: "moletons",
  },
  {
    id: 6,
    name: "Moletom Capuz",
    price: 179.9,
    image: "/placeholder.svg?height=400&width=300",
    category: "moletons",
  },
  {
    id: 7,
    name: "Moletom Estampado",
    price: 189.9,
    image: "/placeholder.svg?height=400&width=300",
    category: "moletons",
  },
  {
    id: 8,
    name: "Moletom Cropped",
    price: 149.9,
    image: "/placeholder.svg?height=400&width=300",
    category: "moletons",
  },
  {
    id: 9,
    name: "Calça Cargo",
    price: 199.9,
    image: "/placeholder.svg?height=400&width=300",
    category: "calcas",
  },
  {
    id: 10,
    name: "Calça Moletom",
    price: 149.9,
    image: "/placeholder.svg?height=400&width=300",
    category: "calcas",
  },
  {
    id: 11,
    name: "Calça Jeans",
    price: 189.9,
    image: "/placeholder.svg?height=400&width=300",
    category: "calcas",
  },
  {
    id: 12,
    name: "Calça Wide Leg",
    price: 209.9,
    image: "/placeholder.svg?height=400&width=300",
    category: "calcas",
  },
]

export default function ProdutosPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
        <p className="mt-2 text-muted-foreground">Explore nossa coleção de roupas prontas para expressar seu estilo</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-lg font-medium">Categorias</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                Todos os Produtos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Camisetas
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Moletons
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Calças
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium">Filtrar por Preço</h3>
            <div className="space-y-4">
              <Slider defaultValue={[0, 250]} min={0} max={250} step={10} />
              <div className="flex items-center justify-between">
                <span className="text-sm">R$ 0</span>
                <span className="text-sm">R$ 250</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-medium">Ordenar por</h3>
            <Select defaultValue="relevancia">
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevancia">Relevância</SelectItem>
                <SelectItem value="preco-menor">Menor Preço</SelectItem>
                <SelectItem value="preco-maior">Maior Preço</SelectItem>
                <SelectItem value="mais-recente">Mais Recentes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2 p-4">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">R$ {product.price.toFixed(2).replace(".", ",")}</p>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/produtos/${product.id}`}>Ver Detalhes</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
