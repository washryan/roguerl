import { getProductById } from "@/lib/db/products"
import { validateCoupon, calculateDiscount } from "@/lib/db/coupons"
import { calculateShipping } from "@/lib/db/shipping"
import type { Cart, CartItem, ShippingOption } from "@/lib/types"

// Simulação de carrinho de compras em memória
const carts: Record<
  string,
  {
    items: CartItem[]
    couponCode?: string
    zipCode?: string
    shippingOption?: string
  }
> = {}

// Função para gerar um ID único para o carrinho
export function generateCartId(): string {
  return Math.random().toString(36).substring(2, 15)
}

// Função para obter o carrinho atual
export async function getCart(cartId: string): Promise<Cart> {
  const cartData = carts[cartId] || { items: [] }
  const items = cartData.items || []

  // Calcular subtotal
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  // Inicializar valores
  let couponDiscount = 0
  let shippingPrice = 0

  // Aplicar cupom se existir
  if (cartData.couponCode) {
    const coupon = await validateCoupon(cartData.couponCode, subtotal)
    if (coupon) {
      couponDiscount = calculateDiscount(coupon, subtotal)
    }
  }

  // Aplicar frete se existir
  if (cartData.zipCode && cartData.shippingOption) {
    try {
      const shippingOptions = await calculateShipping(cartData.zipCode)
      const selectedOption = shippingOptions.find((option) => option.id === cartData.shippingOption)
      if (selectedOption) {
        shippingPrice = selectedOption.price
      }
    } catch (error) {
      console.error("Erro ao calcular frete:", error)
    }
  }

  // Calcular total
  const total = subtotal - couponDiscount + shippingPrice

  // Contar itens
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return {
    items,
    subtotal,
    discounts: {
      couponCode: cartData.couponCode,
      couponDiscount,
    },
    shipping: {
      zipCode: cartData.zipCode,
      shippingOption: cartData.shippingOption,
      shippingPrice,
    },
    total,
    itemCount,
  }
}

// Função para adicionar um item ao carrinho
export async function addToCart(cartId: string, productId: string, variantId: string, quantity: number): Promise<Cart> {
  // Inicializar o carrinho se não existir
  if (!carts[cartId]) {
    carts[cartId] = { items: [] }
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
  const existingItemIndex = carts[cartId].items.findIndex(
    (item) => item.productId === productId && item.variantId === variantId,
  )

  if (existingItemIndex >= 0) {
    // Atualizar quantidade
    carts[cartId].items[existingItemIndex].quantity += quantity
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

    carts[cartId].items.push(newItem)
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
  const itemIndex = carts[cartId].items.findIndex((item) => item.id === itemId)
  if (itemIndex === -1) {
    throw new Error("Item não encontrado no carrinho")
  }

  if (quantity <= 0) {
    // Remover o item se a quantidade for zero ou negativa
    carts[cartId].items = carts[cartId].items.filter((item) => item.id !== itemId)
  } else {
    // Atualizar a quantidade
    carts[cartId].items[itemIndex].quantity = quantity
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
  carts[cartId].items = carts[cartId].items.filter((item) => item.id !== itemId)

  // Retornar o carrinho atualizado
  return getCart(cartId)
}

// Função para aplicar um cupom ao carrinho
export async function applyCoupon(cartId: string, couponCode: string): Promise<Cart> {
  // Verificar se o carrinho existe
  if (!carts[cartId]) {
    throw new Error("Carrinho não encontrado")
  }

  // Obter o subtotal atual para validação
  const { subtotal } = await getCart(cartId)

  // Validar o cupom
  const coupon = await validateCoupon(couponCode, subtotal)
  if (!coupon) {
    throw new Error("Cupom inválido ou expirado")
  }

  // Aplicar o cupom ao carrinho
  carts[cartId].couponCode = couponCode

  // Retornar o carrinho atualizado
  return getCart(cartId)
}

// Função para remover um cupom do carrinho
export async function removeCoupon(cartId: string): Promise<Cart> {
  // Verificar se o carrinho existe
  if (!carts[cartId]) {
    throw new Error("Carrinho não encontrado")
  }

  // Remover o cupom
  delete carts[cartId].couponCode

  // Retornar o carrinho atualizado
  return getCart(cartId)
}

// Função para calcular e selecionar opções de frete
export async function calculateCartShipping(cartId: string, zipCode: string): Promise<ShippingOption[]> {
  // Verificar se o carrinho existe
  if (!carts[cartId]) {
    throw new Error("Carrinho não encontrado")
  }

  // Calcular opções de frete
  const shippingOptions = await calculateShipping(zipCode)

  // Salvar o CEP no carrinho
  carts[cartId].zipCode = zipCode

  return shippingOptions
}

// Função para selecionar uma opção de frete
export async function selectShippingOption(cartId: string, shippingOptionId: string): Promise<Cart> {
  // Verificar se o carrinho existe
  if (!carts[cartId]) {
    throw new Error("Carrinho não encontrado")
  }

  // Verificar se o CEP foi informado
  if (!carts[cartId].zipCode) {
    throw new Error("Informe o CEP antes de selecionar o frete")
  }

  // Verificar se a opção de frete é válida
  const shippingOptions = await calculateShipping(carts[cartId].zipCode!)
  const isValidOption = shippingOptions.some((option) => option.id === shippingOptionId)

  if (!isValidOption) {
    throw new Error("Opção de frete inválida")
  }

  // Salvar a opção de frete
  carts[cartId].shippingOption = shippingOptionId

  // Retornar o carrinho atualizado
  return getCart(cartId)
}

// Função para limpar o carrinho
export async function clearCart(cartId: string): Promise<Cart> {
  carts[cartId] = { items: [] }
  return getCart(cartId)
}
