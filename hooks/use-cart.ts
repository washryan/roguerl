"use client"

import { useState, useEffect, useCallback } from "react"
import type { Cart } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], subtotal: 0, total: 0, itemCount: 0 })
  const [loading, setLoading] = useState(true)
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
    error,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    refreshCart: fetchCart,
  }
}
