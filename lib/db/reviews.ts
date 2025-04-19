import type { Review, ReviewFilters } from "@/lib/types"

// Simulação de banco de dados com avaliações
const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
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
    productId: "1",
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
  {
    id: "3",
    productId: "1",
    userId: "user3",
    userName: "Pedro Santos",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    title: "Superou minhas expectativas",
    comment: "Estampa de alta qualidade e o tecido é muito confortável. Já comprei outras cores!",
    images: [
      {
        id: "img2",
        url: "/placeholder.svg?height=200&width=200",
        alt: "Foto da estampa",
      },
      {
        id: "img3",
        url: "/placeholder.svg?height=200&width=200",
        alt: "Foto do tecido",
      },
    ],
    verified: true,
    helpful: 15,
    notHelpful: 0,
    createdAt: "2023-06-05T16:45:00Z",
    updatedAt: "2023-06-05T16:45:00Z",
  },
  {
    id: "4",
    productId: "1",
    userId: "user4",
    userName: "Ana Costa",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 3,
    title: "Produto razoável",
    comment: "A camiseta é boa, mas esperava mais pela descrição. O tecido não é tão macio quanto eu esperava.",
    images: [],
    verified: false,
    helpful: 3,
    notHelpful: 5,
    createdAt: "2023-03-10T09:20:00Z",
    updatedAt: "2023-03-10T09:20:00Z",
  },
  {
    id: "5",
    productId: "2",
    userId: "user5",
    userName: "Lucas Mendes",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    title: "Moletom perfeito!",
    comment:
      "Muito confortável e quente. Ideal para os dias frios. O capuz tem um bom tamanho e o bolso canguru é espaçoso.",
    images: [
      {
        id: "img4",
        url: "/placeholder.svg?height=200&width=200",
        alt: "Foto do moletom",
      },
    ],
    verified: true,
    helpful: 20,
    notHelpful: 3,
    createdAt: "2023-05-25T11:30:00Z",
    updatedAt: "2023-05-25T11:30:00Z",
  },
  {
    id: "6",
    productId: "2",
    userId: "user6",
    userName: "Juliana Alves",
    userAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    title: "Ótimo moletom",
    comment: "Gostei muito do moletom, mas achei que o tamanho ficou um pouco justo. Recomendo pegar um tamanho acima.",
    images: [],
    verified: true,
    helpful: 10,
    notHelpful: 2,
    createdAt: "2023-04-15T13:20:00Z",
    updatedAt: "2023-04-15T13:20:00Z",
  },
]

// Função para obter avaliações de um produto
export async function getProductReviews(productId: string, filters: ReviewFilters = {}): Promise<Review[]> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 300))

  let filteredReviews = reviews.filter((review) => review.productId === productId)

  // Aplicar filtros
  if (filters.rating !== undefined) {
    filteredReviews = filteredReviews.filter((review) => review.rating === filters.rating)
  }

  if (filters.verified !== undefined) {
    filteredReviews = filteredReviews.filter((review) => review.verified === filters.verified)
  }

  if (filters.withImages !== undefined && filters.withImages) {
    filteredReviews = filteredReviews.filter((review) => review.images.length > 0)
  }

  // Aplicar ordenação
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "newest":
        filteredReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "oldest":
        filteredReviews.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "highest":
        filteredReviews.sort((a, b) => b.rating - a.rating)
        break
      case "lowest":
        filteredReviews.sort((a, b) => a.rating - b.rating)
        break
      case "mostHelpful":
        filteredReviews.sort((a, b) => b.helpful - a.helpful)
        break
    }
  } else {
    // Ordenação padrão: mais recentes primeiro
    filteredReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  return filteredReviews
}

// Função para adicionar uma nova avaliação
export async function addReview(
  review: Omit<Review, "id" | "createdAt" | "updatedAt" | "helpful" | "notHelpful">,
): Promise<Review> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newReview: Review = {
    ...review,
    id: `review-${Date.now()}`,
    helpful: 0,
    notHelpful: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  // Em um ambiente real, você salvaria isso no banco de dados
  reviews.push(newReview)

  return newReview
}

// Função para marcar uma avaliação como útil ou não útil
export async function rateReview(reviewId: string, userId: string, isHelpful: boolean): Promise<Review> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 300))

  const reviewIndex = reviews.findIndex((r) => r.id === reviewId)
  if (reviewIndex === -1) {
    throw new Error("Avaliação não encontrada")
  }

  const review = { ...reviews[reviewIndex] }

  // Em um ambiente real, você verificaria se o usuário já votou nesta avaliação
  // e atualizaria seu voto em vez de permitir votos múltiplos

  if (isHelpful) {
    review.helpful += 1
  } else {
    review.notHelpful += 1
  }

  review.updatedAt = new Date().toISOString()
  reviews[reviewIndex] = review

  return review
}

// Função para obter estatísticas de avaliações de um produto
export async function getProductReviewStats(productId: string): Promise<{
  averageRating: number
  totalReviews: number
  ratingCounts: Record<number, number>
}> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 200))

  const productReviews = reviews.filter((review) => review.productId === productId)
  const totalReviews = productReviews.length

  if (totalReviews === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingCounts: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    }
  }

  // Calcular média de avaliações
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
  const averageRating = sum / totalReviews

  // Contar avaliações por estrela
  const ratingCounts: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  }

  productReviews.forEach((review) => {
    ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1
  })

  return {
    averageRating,
    totalReviews,
    ratingCounts,
  }
}
