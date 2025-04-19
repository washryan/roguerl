"use client"

import { useState, useEffect, useCallback } from "react"
import type { Cart, ShippingOption } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    discounts: { couponDiscount: 0 },
    shipping: { shippingPrice: 0 },
    total: 0,
    itemCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [couponLoading, setCouponLoading] = useState(false)
  const [shippingLoading, setShippingLoading] = useState(false)
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Função para buscar o carrinho atual
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/cart")

      if (!response.ok) {
        throw new Error("Erro ao buscar carrinho")
      }

      const data = await response.json()
      setCart(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
      console.error("Erro ao buscar carrinho:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Carregar o carrinho quando o componente for montado
  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  // Função para adicionar um item ao carrinho
  const addItem = async (productId: string, variantId: string, quantity: number) => {
    try {
      setLoading(true)
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          variantId,
          quantity,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao adicionar ao carrinho")
      }

      const data = await response.json()
      setCart(data.cart)

      toast({
        title: "Item adicionado",
        description: "O item foi adicionado ao seu carrinho.",
      })

      return data.cart
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao adicionar ao carrinho"
      setError(errorMessage)

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })

      throw err
    } finally {
      setLoading(false)
    }
  }

  // Função para atualizar a quantidade de um item
  const updateItemQuantity = async (itemId: string, quantity: number) => {
    try {
      setLoading(true)
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          quantity,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao atualizar carrinho")
      }

      const data = await response.json()
      setCart(data.cart)
      return data.cart
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar carrinho"
      setError(errorMessage)

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })

      throw err
    } finally {
      setLoading(false)
    }
  }

  // Função para remover um item do carrinho
  const removeItem = async (itemId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/cart?itemId=${itemId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao remover item do carrinho")
      }

      const data = await response.json()
      setCart(data.cart)

      toast({
        title: "Item removido",
        description: "O item foi removido do seu carrinho.",
      })

      return data.cart
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao remover item do carrinho"
      setError(errorMessage)

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })

      throw err
    } finally {
      setLoading(false)
    }
  }

  // Função para aplicar um cupom
  const applyCoupon = async (code: string) => {
    try {
      setCouponLoading(true)
      const response = await fetch("/api/cart/coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao aplicar cupom")
      }

      const data = await response.json()
      setCart(data.cart)

      toast({
        title: "Cupom aplicado",
        description: "O cupom foi aplicado com sucesso.",
      })

      return data.cart
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao aplicar cupom"
      setError(errorMessage)

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })

      throw err
    } finally {
      setCouponLoading(false)
    }
  }

  // Função para remover um cupom
  const removeCoupon = async () => {
    try {
      setCouponLoading(true)
      const response = await fetch("/api/cart/coupon", {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao remover cupom")
      }

      const data = await response.json()
      setCart(data.cart)

      toast({
        title: "Cupom removido",
        description: "O cupom foi removido com sucesso.",
      })

      return data.cart
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao remover cupom"
      setError(errorMessage)

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })

      throw err
    } finally {
      setCouponLoading(false)
    }
  }

  // Função para calcular frete
  const calculateShipping = async (zipCode: string) => {
    try {
      setShippingLoading(true)
      const response = await fetch("/api/cart/shipping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zipCode }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao calcular frete")
      }

      const data = await response.json()
      setShippingOptions(data.shippingOptions)

      return data.shippingOptions
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao calcular frete"
      setError(errorMessage)

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })

      throw err
    } finally {
      setShippingLoading(false)
    }
  }

  // Função para selecionar opção de frete
  const selectShippingOption = async (shippingOptionId: string) => {
    try {
      setShippingLoading(true)
      const response = await fetch("/api/cart/shipping", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingOptionId }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao selecionar frete")
      }

      const data = await response.json()
      setCart(data.cart)

      toast({
        title: "Frete selecionado",
        description: "A opção de frete foi selecionada com sucesso.",
      })

      return data.cart
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao selecionar frete"
      setError(errorMessage)

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })

      throw err
    } finally {
      setShippingLoading(false)
    }
  }

  // Função para limpar o carrinho
  const clearCart = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/cart?clear=true", {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao limpar carrinho")
      }

      const data = await response.json()
      setCart(data.cart)

      toast({
        title: "Carrinho limpo",
        description: "Todos os itens foram removidos do seu carrinho.",
      })

      return data.cart
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao limpar carrinho"
      setError(errorMessage)

      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })

      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    cart,
    loading,
    couponLoading,
    shippingLoading,
    shippingOptions,
    error,
    addItem,
    updateItemQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    calculateShipping,
    selectShippingOption,
    clearCart,
    refreshCart: fetchCart,
  }
}
