"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface AddToCartButtonProps {
  productId: number
  size: string
  color: string
  quantity: number
}

export default function AddToCartButton({ productId, size, color, quantity }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const addToCart = async () => {
    if (!size || !color) {
      toast({
        title: "Selecione as opções",
        description: "Por favor, selecione tamanho e cor antes de adicionar ao carrinho.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
          size,
          color,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Produto adicionado!",
          description: "O item foi adicionado ao seu carrinho.",
        })
      } else {
        throw new Error(data.error || "Erro ao adicionar ao carrinho")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o item ao carrinho.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={addToCart} disabled={isLoading} className="flex-1 gap-2">
      {isLoading ? (
        "Adicionando..."
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />
          Adicionar ao Carrinho
        </>
      )}
    </Button>
  )
}
