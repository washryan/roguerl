import { getProductById } from "@/lib/db/products"
import type { Cart, CartItem } from "@/lib/types"

// Simulação de carrinho de compras em memória
const carts: Record<string, CartItem[]> = {}

// Função para gerar um ID único para o carrinho
export function generateCartId(): string {
  return Math.random().toString(36).substring(2, 15)
}

// Função para obter o carrinho atual
export async function getCart(cartId: string): Promise<Cart> {
  const items = carts[cartId] || []

  // Calcular subtotal
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  // Por enquanto, o total é igual ao subtotal (sem frete ou descontos)
  const total = subtotal

  // Contar itens
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return {
    items,
    subtotal,
    total,
    itemCount,
  }
}

// Função para adicionar um item ao carrinho
export async function addToCart(cartId: string, productId: string, variantId: string, quantity: number): Promise<Cart> {
  // Inicializar o carrinho se não existir
  if (!carts[cartId]) {
    carts[cartId] = []
  }

  // Buscar o produto
  const product = await getProductById(productId)
  if (!product) {
    throw new Error("Produto não encontrado")
  }

  // Buscar a variante
  const variant = product.variants.find((v) => v.id === variantId)
  if (!variant) {
    throw new Error("Variante não encontrada")
  }

  // Verificar estoque
  if (variant.inventory < quantity) {
    throw new Error("Quantidade solicitada não disponível em estoque")
  }

  // Verificar se o item já existe no carrinho
  const existingItemIndex = carts[cartId].findIndex(
    (item) => item.productId === productId && item.variantId === variantId,
  )

  if (existingItemIndex >= 0) {
    // Atualizar quantidade
    carts[cartId][existingItemIndex].quantity += quantity
  } else {
    // Adicionar novo item
    const newItem: CartItem = {
      id: `${productId}-${variantId}`,
      productId,
      variantId,
      name: product.name,
      price: variant.price,
      quantity,
      size: variant.size,
      color: variant.color,
      image: product.images[0]?.url || "/placeholder.svg?height=600&width=600",
    }

    carts[cartId].push(newItem)
  }

  // Retornar o carrinho atualizado
  return getCart(cartId)
}

// Função para atualizar a quantidade de um item no carrinho
export async function updateCartItem(cartId: string, itemId: string, quantity: number): Promise<Cart> {
  // Verificar se o carrinho existe
  if (!carts[cartId]) {
    throw new Error("Carrinho não encontrado")
  }

  // Encontrar o item
  const itemIndex = carts[cartId].findIndex((item) => item.id === itemId)
  if (itemIndex === -1) {
    throw new Error("Item não encontrado no carrinho")
  }

  if (quantity <= 0) {
    // Remover o item se a quantidade for zero ou negativa
    carts[cartId] = carts[cartId].filter((item) => item.id !== itemId)
  } else {
    // Atualizar a quantidade
    carts[cartId][itemIndex].quantity = quantity
  }

  // Retornar o carrinho atualizado
  return getCart(cartId)
}

// Função para remover um item do carrinho
export async function removeCartItem(cartId: string, itemId: string): Promise<Cart> {
  // Verificar se o carrinho existe
  if (!carts[cartId]) {
    throw new Error("Carrinho não encontrado")
  }

  // Remover o item
  carts[cartId] = carts[cartId].filter((item) => item.id !== itemId)

  // Retornar o carrinho atualizado
  return getCart(cartId)
}

// Função para limpar o carrinho
export async function clearCart(cartId: string): Promise<Cart> {
  carts[cartId] = []
  return getCart(cartId)
}
