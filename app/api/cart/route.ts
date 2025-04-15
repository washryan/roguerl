import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// Simulação de carrinho de compras
const carts: Record<string, any[]> = {}

export async function GET(request: Request) {
  const cookieStore = cookies()
  const cartId = cookieStore.get("cart_id")?.value || ""

  if (!cartId || !carts[cartId]) {
    return NextResponse.json({ items: [] })
  }

  return NextResponse.json({ items: carts[cartId] })
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    let cartId = cookieStore.get("cart_id")?.value

    if (!cartId) {
      cartId = Math.random().toString(36).substring(2, 15)
      // Em produção, use um método mais seguro para gerar IDs
    }

    const body = await request.json()
    const { productId, quantity, size, color } = body

    if (!carts[cartId]) {
      carts[cartId] = []
    }

    // Verificar se o produto já está no carrinho
    const existingItemIndex = carts[cartId].findIndex(
      (item) => item.productId === productId && item.size === size && item.color === color,
    )

    if (existingItemIndex >= 0) {
      // Atualizar quantidade
      carts[cartId][existingItemIndex].quantity += quantity
    } else {
      // Adicionar novo item
      carts[cartId].push({ productId, quantity, size, color })
    }

    const response = NextResponse.json({
      success: true,
      message: "Item adicionado ao carrinho",
      items: carts[cartId],
    })

    // Definir cookie
    response.cookies.set("cart_id", cartId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: "/",
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Erro ao adicionar ao carrinho" }, { status: 400 })
  }
}
