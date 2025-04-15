// Este é um arquivo de exemplo para conexão com banco de dados
// Em produção, você usaria um ORM como Prisma ou Drizzle

export interface Product {
    id: number
    name: string
    price: number
    image: string
    category: string
    description: string
    sizes: string[]
    colors: { name: string; hex: string }[]
    material: string
    rating: number
    reviews: number
    stock: number
    featured: boolean
  }
  
  export interface CartItem {
    productId: number
    quantity: number
    size: string
    color: string
  }
  
  export interface User {
    id: string
    name: string
    email: string
    password: string // Em produção, armazene apenas hashes de senha
    address?: {
      street: string
      city: string
      state: string
      zipCode: string
    }
  }
  
  // Simulação de banco de dados em memória
  const db = {
    products: [] as Product[],
    carts: {} as Record<string, CartItem[]>,
    users: [] as User[],
    orders: [] as any[],
  }
  
  // Funções de acesso ao banco de dados
  export async function getProducts(category?: string) {
    if (category) {
      return db.products.filter((p) => p.category === category)
    }
    return db.products
  }
  
  export async function getProductById(id: number) {
    return db.products.find((p) => p.id === id)
  }
  
  export async function createProduct(product: Omit<Product, "id">) {
    const newProduct = {
      id: db.products.length + 1,
      ...product,
    }
    db.products.push(newProduct)
    return newProduct
  }
  
  // Funções para o carrinho
  export async function getCart(cartId: string) {
    return db.carts[cartId] || []
  }
  
  export async function addToCart(cartId: string, item: CartItem) {
    if (!db.carts[cartId]) {
      db.carts[cartId] = []
    }
  
    const existingItemIndex = db.carts[cartId].findIndex(
      (i) => i.productId === item.productId && i.size === item.size && i.color === item.color,
    )
  
    if (existingItemIndex >= 0) {
      db.carts[cartId][existingItemIndex].quantity += item.quantity
    } else {
      db.carts[cartId].push(item)
    }
  
    return db.carts[cartId]
  }
  
  // Inicializar com alguns produtos
  db.products = [
    {
      id: 1,
      name: "Camiseta Oversized Rogue",
      price: 89.9,
      image: "/placeholder.svg?height=400&width=300",
      category: "camisetas",
      description: "Camiseta oversized com estampa exclusiva RogueRL.",
      sizes: ["P", "M", "G", "GG"],
      colors: [
        { name: "Preto", hex: "#000000" },
        { name: "Branco", hex: "#ffffff" },
        { name: "Cinza", hex: "#808080" },
      ],
      material: "100% Algodão",
      rating: 4.8,
      reviews: 24,
      stock: 50,
      featured: true,
    },
    // Adicione mais produtos conforme necessário
  ]
  