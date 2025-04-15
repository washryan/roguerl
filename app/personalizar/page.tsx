"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sparkles, Loader2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

export default function PersonalizarPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("descricao")
  const [description, setDescription] = useState("")
  const [designUrl, setDesignUrl] = useState("")
  const [clothingType, setClothingType] = useState("camiseta")
  const [fit, setFit] = useState("regular")
  const [color, setColor] = useState("black")
  const [material, setMaterial] = useState("algodao")
  const [weight, setWeight] = useState([180])
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!description) {
      toast({
        title: "Descrição necessária",
        description: "Por favor, descreva como você quer que sua roupa seja.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // Chamada à API de IA
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: description,
          style: fit,
          material,
          color,
        }),
      })

      if (!response.ok) {
        throw new Error("Falha ao gerar design")
      }

      const data = await response.json()
      setDesignUrl(data.designUrl)

      toast({
        title: "Design gerado com sucesso!",
        description: "Seu design personalizado foi criado.",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível gerar o design. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Personalize Sua Roupa com IA</h1>
        <p className="mt-2 text-muted-foreground">Crie designs únicos que expressam sua verdadeira essência</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Tabs defaultValue="descricao" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="descricao">Descrição</TabsTrigger>
              <TabsTrigger value="estilo">Estilo</TabsTrigger>
              <TabsTrigger value="material">Material</TabsTrigger>
            </TabsList>

            <TabsContent value="descricao" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Descreva sua ideia</Label>
                <Textarea
                  id="prompt"
                  placeholder="Ex: Uma camiseta com estampa abstrata em tons de azul e roxo, com elementos geométricos"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Exemplos de prompts</Label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    "Camiseta com estampa minimalista inspirada em natureza",
                    "Design urbano com elementos de street art",
                    "Padrão geométrico em tons monocromáticos",
                    "Arte abstrata com cores vibrantes",
                  ].map((example, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="justify-start text-left"
                      onClick={() => setDescription(example)}
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="estilo" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Roupa</Label>
                <Select value={clothingType} onValueChange={setClothingType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="camiseta">Camiseta</SelectItem>
                    <SelectItem value="moletom">Moletom</SelectItem>
                    <SelectItem value="regata">Regata</SelectItem>
                    <SelectItem value="cropped">Cropped</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fit">Modelagem</Label>
                <Select value={fit} onValueChange={setFit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a modelagem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oversized">Oversized</SelectItem>
                    <SelectItem value="regular">Regular Fit</SelectItem>
                    <SelectItem value="slim">Slim Fit</SelectItem>
                    <SelectItem value="cropped">Cropped</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cor">Cor Principal</Label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "Preto", hex: "#000000", id: "black" },
                    { name: "Branco", hex: "#ffffff", id: "white" },
                    { name: "Cinza", hex: "#808080", id: "gray" },
                    { name: "Azul", hex: "#0000ff", id: "blue" },
                    { name: "Vermelho", hex: "#ff0000", id: "red" },
                    { name: "Verde", hex: "#00ff00", id: "green" },
                    { name: "Roxo", hex: "#800080", id: "purple" },
                    { name: "Amarelo", hex: "#ffff00", id: "yellow" },
                  ].map((colorOption) => (
                    <div
                      key={colorOption.id}
                      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border ${
                        color === colorOption.id ? "ring-2 ring-primary ring-offset-2" : ""
                      }`}
                      style={{ backgroundColor: colorOption.hex }}
                      title={colorOption.name}
                      onClick={() => setColor(colorOption.id)}
                    >
                      <span className="sr-only">{colorOption.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="material" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="algodao">100% Algodão</SelectItem>
                    <SelectItem value="poliester">100% Poliéster</SelectItem>
                    <SelectItem value="misto">Misto (50% Algodão, 50% Poliéster)</SelectItem>
                    <SelectItem value="organico">Algodão Orgânico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gramatura">Gramatura</Label>
                <div className="space-y-4">
                  <Slider value={weight} onValueChange={setWeight} min={120} max={280} step={10} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Leve (120g)</span>
                    <span>Médio (180g)</span>
                    <span>Pesado (280g)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="acabamento">Acabamento</Label>
                <Select defaultValue="padrao">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o acabamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="padrao">Padrão</SelectItem>
                    <SelectItem value="reativo">Tingimento Reativo</SelectItem>
                    <SelectItem value="vintage">Efeito Vintage</SelectItem>
                    <SelectItem value="stonewashed">Stonewashed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                const prevTab =
                  activeTab === "descricao" ? "descricao" : activeTab === "estilo" ? "descricao" : "estilo"
                setActiveTab(prevTab)
              }}
              disabled={activeTab === "descricao"}
            >
              Anterior
            </Button>

            {activeTab !== "material" ? (
              <Button
                onClick={() => {
                  const nextTab = activeTab === "descricao" ? "estilo" : "material"
                  setActiveTab(nextTab)
                }}
              >
                Próximo
              </Button>
            ) : (
              <Button onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Gerar com IA
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={designUrl || "/placeholder.svg?height=600&width=600"}
              alt="Visualização da roupa personalizada"
              fill
              className="object-cover"
            />
            {isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-center font-medium">Gerando seu design personalizado...</p>
              </div>
            ) : !designUrl && description === "" ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <p className="text-center text-lg font-medium text-white">
                  Preencha os detalhes para visualizar sua criação
                </p>
              </div>
            ) : null}
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-medium">Resumo da Personalização</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Tipo:</div>
                  <div>{clothingType === "camiseta" ? "Camiseta" : 
                         clothingType === "moletom" ? "Moletom" : 
                         clothingType === "regata" ? "Regata" : "Cropped"}</div>
                  <div className="text-muted-foreground">Modelagem:</div>
                  <div>{fit === "oversized" ? "Oversized" : 
                         fit === "regular" ? "Regular Fit" : 
                         fit === "slim" ? "Slim Fit" : "Cropped"}</div>
                  <div className="text-muted-foreground">Material:</div>
                  <div>{material === "algodao" ? "100% Algodão" : 
                         material === "poliester" ? "100% Poliéster" : 
                         material === "misto" ? "Misto" : "Algodão Orgânico"}</div>
                  <div className="text-muted-foreground">Gramatura:</div>
                  <div>{weight[0]}g</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Descrição:</div>
                  <div className="text-sm">{description || "Nenhuma descrição fornecida"}</div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">Preço estimado:</span>
                    <span className="text-lg font-bold">R$ 129,90</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    *O preço pode variar de acordo com as opções selecionadas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
