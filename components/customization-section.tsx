"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from 'lucide-react'

export default function CustomizationSection() {
  const [selectedStyle, setSelectedStyle] = useState("oversized")
  const [selectedColor, setSelectedColor] = useState("black")

  const styles = [
    { id: "oversized", name: "Oversized" },
    { id: "regular", name: "Regular Fit" },
    { id: "slim", name: "Slim Fit" },
    { id: "cropped", name: "Cropped" },
  ]

  const colors = [
    { id: "black", name: "Preto", hex: "#000000" },
    { id: "white", name: "Branco", hex: "#ffffff" },
    { id: "gray", name: "Cinza", hex: "#808080" },
    { id: "purple", name: "Roxo", hex: "#800080" },
  ]

  return (
    <section className="container py-16">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
          <Sparkles className="mr-1 h-3.5 w-3.5" />
          Tecnologia IA
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Personalize Sua Roupa</h2>
        <p className="max-w-[700px] text-muted-foreground">
          Use nossa tecnologia de IA para criar roupas únicas que expressam sua verdadeira essência.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Visualização da roupa personalizada"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <p className="text-center text-lg font-medium text-white">Visualização da sua criação aparecerá aqui</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className="mb-3 text-lg font-medium">Escolha o Estilo</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {styles.map((style) => (
                <Card
                  key={style.id}
                  className={`cursor-pointer transition-all hover:border-primary ${
                    selectedStyle === style.id ? "border-2 border-primary" : ""
                  }`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <span className="text-sm font-medium">{style.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-medium">Escolha a Cor</h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <div
                  key={color.id}
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
                    selectedColor === color.id ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.id)}
                >
                  <span className="sr-only">{color.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-medium">Escolha o Material</h3>
            <Tabs defaultValue="algodao">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="algodao">Algodão</TabsTrigger>
                <TabsTrigger value="poliester">Poliéster</TabsTrigger>
                <TabsTrigger value="misto">Misto</TabsTrigger>
              </TabsList>
              <TabsContent value="algodao" className="mt-2 text-sm text-muted-foreground">
                100% Algodão - Confortável, respirável e durável. Ideal para uso diário.
              </TabsContent>
              <TabsContent value="poliester" className="mt-2 text-sm text-muted-foreground">
                100% Poliéster - Leve, de secagem rápida e resistente a rugas.
              </TabsContent>
              <TabsContent value="misto" className="mt-2 text-sm text-muted-foreground">
                50% Algodão, 50% Poliéster - Combina o conforto do algodão com a durabilidade do poliéster.
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/personalizar">Personalizar com IA</Link>
            </Button>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Crie designs únicos com nossa tecnologia de IA
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
