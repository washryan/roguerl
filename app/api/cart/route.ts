import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart, generateCartId } from "@/lib/cart"

// GET - Obter o carrinho atual
export async function GET() {
  try {
    const cookieStore = cookies()
    const cartId = cookieStore.get("cart_id")?.value

    if (!cartId) {
      return NextResponse.json({ items: [], subtotal: 0, total: 0, itemCount: 0 })
    }

    const cart = await getCart(cartId)
    return NextResponse.json(cart)
  } catch (error) {
    console.error("Erro ao obter carrinho:", error)
    return NextResponse.json({ error: "Erro ao obter carrinho" }, { status: 500 })
  }
}

// POST - Adicionar item ao carrinho
export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    let cartId = cookieStore.get("cart_id")?.value

    // Se não houver ID de carrinho, criar um novo
    if (!cartId) {
      cartId = generateCartId()
    }

    const body = await request.json()
    const { productId, variantId, quantity } = body

    if (!productId || !variantId || !quantity) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    const cart = await addToCart(cartId, productId, variantId, quantity)

    const response = NextResponse.json({
      success: true,
      message: "Item adicionado ao carrinho",
      cart,
    })

    // Definir cookie
    response.cookies.set("cart_id", cartId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Erro ao adicionar ao carrinho:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao adicionar ao carrinho" },
      { status: 400 },
    )
  }
}

// PATCH - Atualizar item no carrinho
export async function PATCH(request: Request) {
  try {
    const cookieStore = cookies()
    const cartId = cookieStore.get("cart_id")?.value

    if (!cartId) {
      return NextResponse.json({ error: "Carrinho não encontrado" }, { status: 404 })
    }

    const body = await request.json()
    const { itemId, quantity } = body

    if (!itemId || quantity === undefined) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    const cart = await updateCartItem(cartId, itemId, quantity)

    return NextResponse.json({
      success: true,
      message: "Carrinho atualizado",
      cart,
    })
  } catch (error) {
    console.error("Erro ao atualizar carrinho:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao atualizar carrinho" },
      { status: 400 },
    )
  }
}

// DELETE - Remover item do carrinho
export async function DELETE(request: Request) {
  try {
    const cookieStore = cookies()
    const cartId = cookieStore.get("cart_id")?.value

    if (!cartId) {
      return NextResponse.json({ error: "Carrinho não encontrado" }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const itemId = searchParams.get("itemId")
    const clearAll = searchParams.get("clear") === "true"

    let cart

    if (clearAll) {
      cart = await clearCart(cartId)
    } else if (itemId) {
      cart = await removeCartItem(cartId, itemId)
    } else {
      return NextResponse.json({ error: "ID do item não fornecido" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: clearAll ? "Carrinho limpo" : "Item removido do carrinho",
      cart,
    })
  } catch (error) {
    console.error("Erro ao remover do carrinho:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao remover do carrinho" },
      { status: 400 },
    )
  }
}
