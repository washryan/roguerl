import type { Product, ProductFilters, ProductsResponse } from "@/lib/types"

// Simulação de banco de dados com produtos
const products: Product[] = [
  {
    id: "1",
    name: "Camiseta Oversized Rogue",
    slug: "camiseta-oversized-rogue",
    description:
      "Camiseta oversized com estampa exclusiva. Feita com algodão 100% orgânico, proporciona conforto e estilo para o dia a dia.",
    features: [
      "Algodão 100% orgânico",
      "Estampa exclusiva",
      "Corte oversized",
      "Gola reforçada",
      "Lavagem industrial para maior maciez",
    ],
    category: "camisetas",
    subcategory: "oversized",
    tags: ["oversized", "algodão orgânico", "estampa", "exclusivo"],
    images: [
      {
        id: "1-1",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Camiseta Oversized Rogue - Frente",
      },
      {
        id: "1-2",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Camiseta Oversized Rogue - Costas",
      },
      {
        id: "1-3",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Camiseta Oversized Rogue - Detalhe",
      },
    ],
    variants: [
      {
        id: "1-1",
        name: "Preto / P",
        sku: "CAMS-OS-ROGUE-P-PRETO",
        size: "P",
        color: "Preto",
        price: 89.9,
        compareAtPrice: 119.9,
        inventory: 15,
      },
      {
        id: "1-2",
        name: "Preto / M",
        sku: "CAMS-OS-ROGUE-M-PRETO",
        size: "M",
        color: "Preto",
        price: 89.9,
        compareAtPrice: 119.9,
        inventory: 20,
      },
      {
        id: "1-3",
        name: "Preto / G",
        sku: "CAMS-OS-ROGUE-G-PRETO",
        size: "G",
        color: "Preto",
        price: 89.9,
        compareAtPrice: 119.9,
        inventory: 18,
      },
      {
        id: "1-4",
        name: "Preto / GG",
        sku: "CAMS-OS-ROGUE-GG-PRETO",
        size: "GG",
        color: "Preto",
        price: 89.9,
        compareAtPrice: 119.9,
        inventory: 10,
      },
      {
        id: "1-5",
        name: "Branco / P",
        sku: "CAMS-OS-ROGUE-P-BRANCO",
        size: "P",
        color: "Branco",
        price: 89.9,
        compareAtPrice: 119.9,
        inventory: 12,
      },
      {
        id: "1-6",
        name: "Branco / M",
        sku: "CAMS-OS-ROGUE-M-BRANCO",
        size: "M",
        color: "Branco",
        price: 89.9,
        compareAtPrice: 119.9,
        inventory: 22,
      },
      {
        id: "1-7",
        name: "Branco / G",
        sku: "CAMS-OS-ROGUE-G-BRANCO",
        size: "G",
        color: "Branco",
        price: 89.9,
        compareAtPrice: 119.9,
        inventory: 16,
      },
      {
        id: "1-8",
        name: "Branco / GG",
        sku: "CAMS-OS-ROGUE-GG-BRANCO",
        size: "GG",
        color: "Branco",
        price: 89.9,
        compareAtPrice: 119.9,
        inventory: 8,
      },
    ],
    rating: 4.8,
    reviewCount: 124,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-06-20T14:30:00Z",
  },
  {
    id: "2",
    name: "Moletom Oversized Essential",
    slug: "moletom-oversized-essential",
    description:
      "Moletom oversized com design minimalista. Confeccionado em algodão e poliéster, oferece conforto e aquecimento para os dias mais frios.",
    features: [
      "Composição: 80% algodão, 20% poliéster",
      "Forro em fleece",
      "Capuz ajustável",
      "Bolso canguru",
      "Acabamento em ribana",
    ],
    category: "moletons",
    subcategory: "oversized",
    tags: ["oversized", "moletom", "inverno", "conforto"],
    images: [
      {
        id: "2-1",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Moletom Oversized Essential - Frente",
      },
      {
        id: "2-2",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Moletom Oversized Essential - Costas",
      },
      {
        id: "2-3",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Moletom Oversized Essential - Detalhe",
      },
    ],
    variants: [
      {
        id: "2-1",
        name: "Cinza / P",
        sku: "MOLT-OS-ESS-P-CINZA",
        size: "P",
        color: "Cinza",
        price: 159.9,
        compareAtPrice: 199.9,
        inventory: 10,
      },
      {
        id: "2-2",
        name: "Cinza / M",
        sku: "MOLT-OS-ESS-M-CINZA",
        size: "M",
        color: "Cinza",
        price: 159.9,
        compareAtPrice: 199.9,
        inventory: 15,
      },
      {
        id: "2-3",
        name: "Cinza / G",
        sku: "MOLT-OS-ESS-G-CINZA",
        size: "G",
        color: "Cinza",
        price: 159.9,
        compareAtPrice: 199.9,
        inventory: 12,
      },
      {
        id: "2-4",
        name: "Cinza / GG",
        sku: "MOLT-OS-ESS-GG-CINZA",
        size: "GG",
        color: "Cinza",
        price: 159.9,
        compareAtPrice: 199.9,
        inventory: 8,
      },
      {
        id: "2-5",
        name: "Preto / P",
        sku: "MOLT-OS-ESS-P-PRETO",
        size: "P",
        color: "Preto",
        price: 159.9,
        compareAtPrice: 199.9,
        inventory: 14,
      },
      {
        id: "2-6",
        name: "Preto / M",
        sku: "MOLT-OS-ESS-M-PRETO",
        size: "M",
        color: "Preto",
        price: 159.9,
        compareAtPrice: 199.9,
        inventory: 20,
      },
      {
        id: "2-7",
        name: "Preto / G",
        sku: "MOLT-OS-ESS-G-PRETO",
        size: "G",
        color: "Preto",
        price: 159.9,
        compareAtPrice: 199.9,
        inventory: 18,
      },
      {
        id: "2-8",
        name: "Preto / GG",
        sku: "MOLT-OS-ESS-GG-PRETO",
        size: "GG",
        color: "Preto",
        price: 159.9,
        compareAtPrice: 199.9,
        inventory: 10,
      },
    ],
    rating: 4.7,
    reviewCount: 98,
    createdAt: "2023-02-10T09:15:00Z",
    updatedAt: "2023-06-18T11:45:00Z",
  },
  {
    id: "3",
    name: "Calça Cargo Streetwear",
    slug: "calca-cargo-streetwear",
    description:
      "Calça cargo com design streetwear e múltiplos bolsos. Perfeita para compor looks urbanos com estilo e funcionalidade.",
    features: [
      "Tecido resistente",
      "Múltiplos bolsos",
      "Cintura com elástico e cordão",
      "Acabamento premium",
      "Corte relaxed fit",
    ],
    category: "calcas",
    subcategory: "cargo",
    tags: ["cargo", "streetwear", "urban", "bolsos"],
    images: [
      {
        id: "3-1",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Calça Cargo Streetwear - Frente",
      },
      {
        id: "3-2",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Calça Cargo Streetwear - Costas",
      },
      {
        id: "3-3",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Calça Cargo Streetwear - Detalhe",
      },
    ],
    variants: [
      {
        id: "3-1",
        name: "Preto / 38",
        sku: "CALC-CARGO-38-PRETO",
        size: "38",
        color: "Preto",
        price: 179.9,
        compareAtPrice: 229.9,
        inventory: 12,
      },
      {
        id: "3-2",
        name: "Preto / 40",
        sku: "CALC-CARGO-40-PRETO",
        size: "40",
        color: "Preto",
        price: 179.9,
        compareAtPrice: 229.9,
        inventory: 18,
      },
      {
        id: "3-3",
        name: "Preto / 42",
        sku: "CALC-CARGO-42-PRETO",
        size: "42",
        color: "Preto",
        price: 179.9,
        compareAtPrice: 229.9,
        inventory: 15,
      },
      {
        id: "3-4",
        name: "Preto / 44",
        sku: "CALC-CARGO-44-PRETO",
        size: "44",
        color: "Preto",
        price: 179.9,
        compareAtPrice: 229.9,
        inventory: 10,
      },
      {
        id: "3-5",
        name: "Caqui / 38",
        sku: "CALC-CARGO-38-CAQUI",
        size: "38",
        color: "Caqui",
        price: 179.9,
        compareAtPrice: 229.9,
        inventory: 8,
      },
      {
        id: "3-6",
        name: "Caqui / 40",
        sku: "CALC-CARGO-40-CAQUI",
        size: "40",
        color: "Caqui",
        price: 179.9,
        compareAtPrice: 229.9,
        inventory: 14,
      },
      {
        id: "3-7",
        name: "Caqui / 42",
        sku: "CALC-CARGO-42-CAQUI",
        size: "42",
        color: "Caqui",
        price: 179.9,
        compareAtPrice: 229.9,
        inventory: 12,
      },
      {
        id: "3-8",
        name: "Caqui / 44",
        sku: "CALC-CARGO-44-CAQUI",
        size: "44",
        color: "Caqui",
        price: 179.9,
        compareAtPrice: 229.9,
        inventory: 6,
      },
    ],
    rating: 4.6,
    reviewCount: 75,
    createdAt: "2023-03-05T14:20:00Z",
    updatedAt: "2023-06-15T09:30:00Z",
  },
  {
    id: "4",
    name: "Jaqueta Corta-Vento Urban",
    slug: "jaqueta-corta-vento-urban",
    description: "Jaqueta corta-vento leve e impermeável. Ideal para dias chuvosos sem abrir mão do estilo urbano.",
    features: [
      "Tecido impermeável",
      "Capuz ajustável",
      "Bolsos com zíper",
      "Punhos elásticos",
      "Dobrável para fácil transporte",
    ],
    category: "jaquetas",
    subcategory: "corta-vento",
    tags: ["corta-vento", "impermeável", "leve", "urbano"],
    images: [
      {
        id: "4-1",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Jaqueta Corta-Vento Urban - Frente",
      },
      {
        id: "4-2",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Jaqueta Corta-Vento Urban - Costas",
      },
      {
        id: "4-3",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Jaqueta Corta-Vento Urban - Detalhe",
      },
    ],
    variants: [
      {
        id: "4-1",
        name: "Preto / P",
        sku: "JAQ-VENTO-P-PRETO",
        size: "P",
        color: "Preto",
        price: 149.9,
        compareAtPrice: 189.9,
        inventory: 10,
      },
      {
        id: "4-2",
        name: "Preto / M",
        sku: "JAQ-VENTO-M-PRETO",
        size: "M",
        color: "Preto",
        price: 149.9,
        compareAtPrice: 189.9,
        inventory: 15,
      },
      {
        id: "4-3",
        name: "Preto / G",
        sku: "JAQ-VENTO-G-PRETO",
        size: "G",
        color: "Preto",
        price: 149.9,
        compareAtPrice: 189.9,
        inventory: 12,
      },
      {
        id: "4-4",
        name: "Preto / GG",
        sku: "JAQ-VENTO-GG-PRETO",
        size: "GG",
        color: "Preto",
        price: 149.9,
        compareAtPrice: 189.9,
        inventory: 8,
      },
      {
        id: "4-5",
        name: "Azul / P",
        sku: "JAQ-VENTO-P-AZUL",
        size: "P",
        color: "Azul",
        price: 149.9,
        compareAtPrice: 189.9,
        inventory: 9,
      },
      {
        id: "4-6",
        name: "Azul / M",
        sku: "JAQ-VENTO-M-AZUL",
        size: "M",
        color: "Azul",
        price: 149.9,
        compareAtPrice: 189.9,
        inventory: 14,
      },
      {
        id: "4-7",
        name: "Azul / G",
        sku: "JAQ-VENTO-G-AZUL",
        size: "G",
        color: "Azul",
        price: 149.9,
        compareAtPrice: 189.9,
        inventory: 11,
      },
      {
        id: "4-8",
        name: "Azul / GG",
        sku: "JAQ-VENTO-GG-AZUL",
        size: "GG",
        color: "Azul",
        price: 149.9,
        compareAtPrice: 189.9,
        inventory: 7,
      },
    ],
    rating: 4.5,
    reviewCount: 62,
    createdAt: "2023-04-12T11:30:00Z",
    updatedAt: "2023-06-10T16:45:00Z",
  },
  {
    id: "5",
    name: "Boné Trucker Logo",
    slug: "bone-trucker-logo",
    description:
      "Boné trucker com logo bordado. Ajustável e confortável, perfeito para complementar seu visual streetwear.",
    features: [
      "Frente estruturada com logo bordado",
      "Parte traseira em tela para ventilação",
      "Ajuste snapback",
      "Aba curva",
    ],
    category: "acessorios",
    subcategory: "bones",
    tags: ["boné", "trucker", "streetwear", "acessórios"],
    images: [
      {
        id: "5-1",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Boné Trucker Logo - Frente",
      },
      {
        id: "5-2",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Boné Trucker Logo - Lateral",
      },
      {
        id: "5-3",
        url: "/placeholder.svg?height=600&width=600",
        alt: "Boné Trucker Logo - Detalhe",
      },
    ],
    variants: [
      {
        id: "5-1",
        name: "Preto / Único",
        sku: "BONE-TRUCK-PRETO",
        size: "Único",
        color: "Preto",
        price: 69.9,
        compareAtPrice: 89.9,
        inventory: 25,
      },
      {
        id: "5-2",
        name: "Branco / Único",
        sku: "BONE-TRUCK-BRANCO",
        size: "Único",
        color: "Branco",
        price: 69.9,
        compareAtPrice: 89.9,
        inventory: 20,
      },
      {
        id: "5-3",
        name: "Vermelho / Único",
        sku: "BONE-TRUCK-VERMELHO",
        size: "Único",
        color: "Vermelho",
        price: 69.9,
        compareAtPrice: 89.9,
        inventory: 15,
      },
    ],
    rating: 4.9,
    reviewCount: 45,
    createdAt: "2023-05-20T10:45:00Z",
    updatedAt: "2023-06-05T13:20:00Z",
  },
]

// Função para obter todos os produtos com paginação e filtros
export async function getProducts(page = 1, pageSize = 10, filters: ProductFilters = {}): Promise<ProductsResponse> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 300))

  let filteredProducts = [...products]

  // Aplicar filtros
  if (filters.category) {
    filteredProducts = filteredProducts.filter((product) => product.category === filters.category)
  }

  if (filters.subcategory) {
    filteredProducts = filteredProducts.filter((product) => product.subcategory === filters.subcategory)
  }

  if (filters.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product) => {
      const lowestPrice = Math.min(...product.variants.map((variant) => variant.price))
      return lowestPrice >= filters.minPrice!
    })
  }

  if (filters.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product) => {
      const highestPrice = Math.max(...product.variants.map((variant) => variant.price))
      return highestPrice <= filters.maxPrice!
    })
  }

  if (filters.sizes && filters.sizes.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      product.variants.some((variant) => filters.sizes!.includes(variant.size)),
    )
  }

  if (filters.colors && filters.colors.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      product.variants.some((variant) => filters.colors!.includes(variant.color)),
    )
  }

  if (filters.tags && filters.tags.length > 0) {
    filteredProducts = filteredProducts.filter((product) => filters.tags!.some((tag) => product.tags.includes(tag)))
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
    )
  }

  // Aplicar ordenação
  if (filters.sort) {
    switch (filters.sort) {
      case "price-asc":
        filteredProducts.sort((a, b) => {
          const aPrice = Math.min(...a.variants.map((v) => v.price))
          const bPrice = Math.min(...b.variants.map((v) => v.price))
          return aPrice - bPrice
        })
        break
      case "price-desc":
        filteredProducts.sort((a, b) => {
          const aPrice = Math.min(...a.variants.map((v) => v.price))
          const bPrice = Math.min(...b.variants.map((v) => v.price))
          return bPrice - aPrice
        })
        break
      case "newest":
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "rating":
        filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "popularity":
        filteredProducts.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
        break
    }
  }

  // Calcular paginação
  const total = filteredProducts.length
  const totalPages = Math.ceil(total / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  return {
    products: paginatedProducts,
    total,
    page,
    pageSize,
    totalPages,
  }
}

// Função para obter um produto pelo slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 300))

  const product = products.find((p) => p.slug === slug)
  return product || null
}

// Função para obter um produto pelo ID
export async function getProductById(id: string): Promise<Product | null> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 300))

  const product = products.find((p) => p.id === id)
  return product || null
}

// Função para obter categorias disponíveis
export async function getCategories(): Promise<string[]> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 300))

  const categories = [...new Set(products.map((product) => product.category))]
  return categories
}

// Função para obter subcategorias de uma categoria
export async function getSubcategories(category?: string): Promise<string[]> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 300))

  let filteredProducts = products
  if (category) {
    filteredProducts = products.filter((p) => p.category === category)
  }

  const subcategories = [
    ...new Set(
      filteredProducts
        .map((product) => product.subcategory)
        .filter((subcategory): subcategory is string => !!subcategory),
    ),
  ]
  return subcategories
}

// Função para obter todas as cores disponíveis
export async function getColors(): Promise<string[]> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 300))

  const colors = [...new Set(products.flatMap((product) => product.variants.map((variant) => variant.color)))]
  return colors
}

// Função para obter todos os tamanhos disponíveis
export async function getSizes(): Promise<string[]> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 300))

  const sizes = [...new Set(products.flatMap((product) => product.variants.map((variant) => variant.size)))]
  return sizes
}

// Função para obter todas as tags disponíveis
export async function getTags(): Promise<string[]> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 300))

  const tags = [...new Set(products.flatMap((product) => product.tags))]
  return tags
}
