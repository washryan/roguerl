import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { calculateCartShipping, selectShippingOption } from "@/lib/cart"

// POST - Calcular opções de frete
export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const cartId = cookieStore.get("cart_id")?.value

    if (!cartId) {
      return NextResponse.json({ error: "Carrinho não encontrado" }, { status: 404 })
    }

    const body = await request.json()
    const { zipCode } = body

    if (!zipCode) {
      return NextResponse.json({ error: "CEP não fornecido" }, { status: 400 })
    }

    const shippingOptions = await calculateCartShipping(cartId, zipCode)

    return NextResponse.json({
      success: true,
      shippingOptions,
    })
  } catch (error) {
    console.error("Erro ao calcular frete:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao calcular frete" },
      { status: 400 },
    )
  }
}

// PATCH - Selecionar opção de frete
export async function PATCH(request: Request) {
  try {
    const cookieStore = cookies()
    const cartId = cookieStore.get("cart_id")?.value

    if (!cartId) {
      return NextResponse.json({ error: "Carrinho não encontrado" }, { status: 404 })
    }

    const body = await request.json()
    const { shippingOptionId } = body

    if (!shippingOptionId) {
      return NextResponse.json({ error: "Opção de frete não fornecida" }, { status: 400 })
    }

    const cart = await selectShippingOption(cartId, shippingOptionId)

    return NextResponse.json({
      success: true,
      message: "Opção de frete selecionada com sucesso",
      cart,
    })
  } catch (error) {
    console.error("Erro ao selecionar frete:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro ao selecionar frete" },
      { status: 400 },
    )
  }
}
