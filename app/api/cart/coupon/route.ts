import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { applyCoupon, removeCoupon } from "@/lib/cart"

// POST - Aplicar cupom ao carrinho
export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const cartId = cookieStore.get("cart_id")?.value

    if (!cartId) {
      return NextResponse.json({ error: "Carrinho não encontrado" }, { status: 404 })
    }

    const body = await request.json()
    const { code } = body

    if (!code) {
      return NextResponse.json({ error: "Código do cupom não fornecido" }, { status: 400 })
    }

    const cart = await applyCoupon(cartId, code)

    return NextResponse.json({
      success: true,
      message: "Cupom aplicado com sucesso",
      cart,
    })
  } catch (error) {
    console.error("Erro ao aplicar cupom:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao aplicar cupom" },
      { status: 400 },
    )
  }
}

// DELETE - Remover cupom do carrinho
export async function DELETE(request: Request) {
  try {
    const cookieStore = cookies()
    const cartId = cookieStore.get("cart_id")?.value

    if (!cartId) {
      return NextResponse.json({ error: "Carrinho não encontrado" }, { status: 404 })
    }

    const cart = await removeCoupon(cartId)

    return NextResponse.json({
      success: true,
      message: "Cupom removido com sucesso",
      cart,
    })
  } catch (error) {
    console.error("Erro ao remover cupom:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao remover cupom" },
      { status: 400 },
    )
  }
}
