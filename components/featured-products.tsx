"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados simulados de produtos
const products = {
  camisetas: [
    {
      id: 1,
      name: "Camiseta Oversized Rogue",
      price: 89.9,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 2,
      name: "Camiseta Estampada IA",
      price: 99.9,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 3,
      name: "Camiseta Minimalista",
      price: 79.9,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 4,
      name: "Camiseta Manga Longa",
      price: 109.9,
      image: "/placeholder.svg?height=400&width=300",
    },
  ],
  moletons: [
    {
      id: 5,
      name: "Moletom Oversized",
      price: 159.9,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 6,
      name: "Moletom Capuz",
      price: 179.9,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 7,
      name: "Moletom Estampado",
      price: 189.9,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 8,
      name: "Moletom Cropped",
      price: 149.9,
      image: "/placeholder.svg?height=400&width=300",
    },
  ],
  calcas: [
    {
      id: 9,
      name: "Calça Cargo",
      price: 199.9,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 10,
      name: "Calça Moletom",
      price: 149.9,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 11,
      name: "Calça Jeans",
      price: 189.9,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 12,
      name: "Calça Wide Leg",
      price: 209.9,
      image: "/placeholder.svg?height=400&width=300",
    },
  ],
}

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("camisetas")

  return (
    <section className="container py-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Produtos em Destaque</h2>
        <p className="max-w-[700px] text-muted-foreground">
          Confira nossa seleção de produtos prontos para expressar seu estilo único.
        </p>
      </div>

      <Tabs defaultValue="camisetas" className="mt-8" onValueChange={setActiveTab}>
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger value="camisetas">Camisetas</TabsTrigger>
            <TabsTrigger value="moletons">Moletons</TabsTrigger>
            <TabsTrigger value="calcas">Calças</TabsTrigger>
          </TabsList>
        </div>

        {Object.entries(products).map(([category, items]) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              {items.map((product) => (
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
            <div className="mt-8 flex justify-center">
              <Button asChild variant="outline">
                <Link href={`/produtos?categoria=${activeTab}`}>Ver Todos</Link>
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
