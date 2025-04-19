"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Star, StarHalf, ThumbsUp, ThumbsDown, ImageIcon, Check, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import type { Review, ReviewFilters } from "@/lib/types"

// Definir o tipo para as estatísticas de avaliação
type ReviewStats = {
  averageRating: number
  totalReviews: number
  ratingCounts: {
    "1": number
    "2": number
    "3": number
    "4": number
    "5": number
  }
}

// Simulação de funções do módulo reviews
async function getProductReviews(productId: string, filters: ReviewFilters = {}): Promise<Review[]> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Retornar dados simulados
  return [
    {
      id: "1",
      productId,
      userId: "user1",
      userName: "João Silva",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      title: "Excelente produto!",
      comment: "Camiseta de ótima qualidade, tecido macio e confortável. Recomendo!",
      images: [
        {
          id: "img1",
          url: "/placeholder.svg?height=200&width=200",
          alt: "Foto da camiseta",
        },
      ],
      verified: true,
      helpful: 12,
      notHelpful: 2,
      createdAt: "2023-05-15T14:30:00Z",
      updatedAt: "2023-05-15T14:30:00Z",
    },
    {
      id: "2",
      productId,
      userId: "user2",
      userName: "Maria Oliveira",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      title: "Bom produto",
      comment: "Gostei bastante da camiseta, mas achei que o tamanho ficou um pouco maior do que esperava.",
      images: [],
      verified: true,
      helpful: 8,
      notHelpful: 1,
      createdAt: "2023-04-20T10:15:00Z",
      updatedAt: "2023-04-20T10:15:00Z",
    },
  ]
}

async function getProductReviewStats(productId: string): Promise<ReviewStats> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Retornar dados simulados
  return {
    averageRating: 4.5,
    totalReviews: 2,
    ratingCounts: {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 1,
      "5": 1,
    },
  }
}

async function addReview(
  review: Omit<Review, "id" | "createdAt" | "updatedAt" | "helpful" | "notHelpful">,
): Promise<Review> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Retornar dados simulados
  return {
    ...review,
    id: `review-${Date.now()}`,
    helpful: 0,
    notHelpful: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

async function rateReview(reviewId: string, userId: string, isHelpful: boolean): Promise<Review> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Retornar dados simulados
  return {
    id: reviewId,
    productId: "1",
    userId: "user1",
    userName: "João Silva",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    title: "Excelente produto!",
    comment: "Camiseta de ótima qualidade, tecido macio e confortável. Recomendo!",
    images: [],
    verified: true,
    helpful: isHelpful ? 13 : 12,
    notHelpful: isHelpful ? 2 : 3,
    createdAt: "2023-05-15T14:30:00Z",
    updatedAt: new Date().toISOString(),
  }
}

interface ReviewSystemProps {
  productId: string
}

export function ReviewSystem({ productId }: ReviewSystemProps) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats>({
    averageRating: 0,
    totalReviews: 0,
    ratingCounts: {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
    },
  })
  const [filters, setFilters] = useState<ReviewFilters>({
    sortBy: "newest",
  })
  const [loading, setLoading] = useState(true)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
    images: [] as { id: string; url: string; alt: string }[],
  })
  const [showFilters, setShowFilters] = useState(false)

  // Carregar avaliações e estatísticas
  useEffect(() => {
    const loadReviewData = async () => {
      try {
        setLoading(true)
        const [reviewsData, statsData] = await Promise.all([
          getProductReviews(productId, filters),
          getProductReviewStats(productId),
        ])
        setReviews(reviewsData)
        setStats(statsData)
      } catch (error) {
        console.error("Erro ao carregar avaliações:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar as avaliações.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadReviewData()
  }, [productId, filters, toast])

  // Função para enviar uma nova avaliação
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para enviar uma avaliação.",
        variant: "destructive",
      })
      return
    }

    try {
      const reviewData = {
        productId,
        userId: session.user.email || "anonymous",
        userName: session.user.name || "Usuário Anônimo",
        userAvatar: session.user.image || undefined,
        rating: newReview.rating,
        title: newReview.title,
        comment: newReview.comment,
        images: newReview.images,
        verified: true, // Simulando que é uma compra verificada
      }

      const addedReview = await addReview(reviewData)

      // Atualizar a lista de avaliações e estatísticas
      setReviews((prev) => [addedReview, ...prev])

      // Resetar o formulário
      setNewReview({
        rating: 5,
        title: "",
        comment: "",
        images: [],
      })

      // Atualizar estatísticas
      const newStats = await getProductReviewStats(productId)
      setStats(newStats)

      toast({
        title: "Avaliação enviada",
        description: "Sua avaliação foi enviada com sucesso!",
      })
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error)
      toast({
        title: "Erro",
        description: "Não foi possível enviar sua avaliação.",
        variant: "destructive",
      })
    }
  }

  // Função para marcar uma avaliação como útil ou não útil
  const handleRateReview = async (reviewId: string, isHelpful: boolean) => {
    if (!session?.user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para avaliar uma avaliação.",
        variant: "destructive",
      })
      return
    }

    try {
      const updatedReview = await rateReview(reviewId, session.user.email || "anonymous", isHelpful)

      // Atualizar a avaliação na lista
      setReviews((prev) => prev.map((review) => (review.id === reviewId ? updatedReview : review)))

      toast({
        title: "Obrigado pelo feedback",
        description: "Seu voto foi registrado com sucesso.",
      })
    } catch (error) {
      console.error("Erro ao avaliar review:", error)
      toast({
        title: "Erro",
        description: "Não foi possível registrar seu voto.",
        variant: "destructive",
      })
    }
  }

  // Função para adicionar imagem à avaliação
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Em um ambiente real, você faria upload das imagens para um serviço de armazenamento
    // Aqui estamos apenas simulando com URLs de placeholder
    const newImages = Array.from(files).map((file, index) => ({
      id: `temp-${Date.now()}-${index}`,
      url: "/placeholder.svg?height=200&width=200",
      alt: "Imagem enviada pelo usuário",
    }))

    setNewReview((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }))

    // Limpar o input de arquivo
    e.target.value = ""
  }

  // Função para remover imagem da avaliação
  const handleRemoveImage = (imageId: string) => {
    setNewReview((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }))
  }

  // Renderizar estrelas para a avaliação média
  const renderRatingStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="fill-yellow-400 text-yellow-400" />)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarHalf key={i} className="fill-yellow-400 text-yellow-400" />)
      } else {
        stars.push(<Star key={i} className="text-gray-300" />)
      }
    }

    return stars
  }

  // Calcular a porcentagem para a barra de progresso
  const calculatePercentage = (count: number) => {
    return stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0
  }

  // Função auxiliar para obter a contagem de avaliações por estrela
  const getRatingCount = (star: number): number => {
    const key = star.toString() as keyof typeof stats.ratingCounts
    return stats.ratingCounts[key]
  }

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Avaliações dos Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Resumo das avaliações */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold">{stats.averageRating.toFixed(1)}</span>
                <div className="flex">{renderRatingStars(stats.averageRating)}</div>
                <span className="text-sm text-gray-500">({stats.totalReviews} avaliações)</span>
              </div>

              {/* Barras de progresso para cada estrela */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="w-8 text-sm">{star} ★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{
                          width: `${calculatePercentage(getRatingCount(star))}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{getRatingCount(star)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filtros */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Filtrar avaliações</h3>
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>

              {showFilters && (
                <div className="space-y-4 p-4 border rounded-md">
                  <div>
                    <Label htmlFor="sort-by">Ordenar por</Label>
                    <select
                      id="sort-by"
                      className="w-full p-2 border rounded-md mt-1"
                      value={filters.sortBy}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                    >
                      <option value="newest">Mais recentes</option>
                      <option value="oldest">Mais antigas</option>
                      <option value="highest">Maior avaliação</option>
                      <option value="lowest">Menor avaliação</option>
                      <option value="mostHelpful">Mais úteis</option>
                    </select>
                  </div>

                  <div>
                    <Label>Filtrar por estrelas</Label>
                    <RadioGroup
                      value={filters.rating?.toString() || ""}
                      onValueChange={(value) =>
                        setFilters({
                          ...filters,
                          rating: value ? Number.parseInt(value) : undefined,
                        })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="all-stars" />
                        <Label htmlFor="all-stars">Todas as estrelas</Label>
                      </div>
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center space-x-2">
                          <RadioGroupItem value={star.toString()} id={`star-${star}`} />
                          <Label htmlFor={`star-${star}`}>{star} estrelas</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={filters.verified || false}
                      onCheckedChange={(checked) =>
                        setFilters({ ...filters, verified: checked === true ? true : undefined })
                      }
                    />
                    <Label htmlFor="verified">Apenas compras verificadas</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="with-images"
                      checked={filters.withImages || false}
                      onCheckedChange={(checked) =>
                        setFilters({ ...filters, withImages: checked === true ? true : undefined })
                      }
                    />
                    <Label htmlFor="with-images">Apenas com fotos</Label>
                  </div>

                  <Button variant="outline" onClick={() => setFilters({ sortBy: "newest" })}>
                    Limpar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs para avaliações e formulário */}
      <Tabs defaultValue="reviews">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reviews">Avaliações ({stats.totalReviews})</TabsTrigger>
          <TabsTrigger value="write-review">Escrever avaliação</TabsTrigger>
        </TabsList>

        {/* Lista de avaliações */}
        <TabsContent value="reviews">
          {loading ? (
            <div className="text-center py-8">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
              <p>Carregando avaliações...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Ainda não há avaliações para este produto.</p>
              <Button
                className="mt-4"
                onClick={() => {
                  const writeReviewTab = document.querySelector('[data-value="write-review"]')
                  if (writeReviewTab instanceof HTMLElement) {
                    writeReviewTab.click()
                  }
                }}
              >
                Seja o primeiro a avaliar
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
                          <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{review.userName}</h4>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span>•</span>
                            <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      {review.verified && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Compra verificada
                        </Badge>
                      )}
                    </div>

                    <div className="mt-4">
                      <h3 className="font-medium text-lg">{review.title}</h3>
                      <p className="mt-2 text-gray-700">{review.comment}</p>
                    </div>

                    {review.images.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Fotos do cliente</h4>
                        <div className="flex flex-wrap gap-2">
                          {review.images.map((image) => (
                            <Dialog key={image.id}>
                              <DialogTrigger asChild>
                                <button className="overflow-hidden rounded-md border hover:opacity-80">
                                  <img
                                    src={image.url || "/placeholder.svg"}
                                    alt={image.alt}
                                    className="h-20 w-20 object-cover"
                                  />
                                </button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Foto do cliente</DialogTitle>
                                </DialogHeader>
                                <div className="flex justify-center">
                                  <img
                                    src={image.url || "/placeholder.svg"}
                                    alt={image.alt}
                                    className="max-h-[70vh] object-contain"
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-4">
                      <span className="text-sm text-gray-500">Esta avaliação foi útil?</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleRateReview(review.id, true)}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.helpful}</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleRateReview(review.id, false)}
                      >
                        <ThumbsDown className="h-4 w-4" />
                        <span>{review.notHelpful}</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Formulário para escrever avaliação */}
        <TabsContent value="write-review">
          {!session ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="mb-4">Você precisa estar logado para deixar uma avaliação.</p>
                <Button>Fazer login</Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div>
                    <Label htmlFor="rating" className="block mb-2">
                      Sua avaliação
                    </Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title" className="block mb-2">
                      Título da avaliação
                    </Label>
                    <Input
                      id="title"
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                      placeholder="Resuma sua experiência em uma frase"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="comment" className="block mb-2">
                      Sua avaliação
                    </Label>
                    <Textarea
                      id="comment"
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="O que você achou do produto? Quais são os prós e contras?"
                      rows={5}
                      required
                    />
                  </div>

                  <div>
                    <Label className="block mb-2">Adicionar fotos (opcional)</Label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {newReview.images.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.alt}
                            className="h-20 w-20 object-cover rounded-md border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(image.id)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      <label className="h-20 w-20 flex items-center justify-center border border-dashed rounded-md cursor-pointer hover:bg-gray-50">
                        <input type="file" accept="image/*" multiple className="hidden" onChange={handleAddImage} />
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      Você pode adicionar até 5 fotos. Cada foto deve ter no máximo 5MB.
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    Enviar avaliação
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
