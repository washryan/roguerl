"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Loader2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface AddToCartButtonProps {
  productId: string
  variantId: string
  quantity: number
  disabled?: boolean
  className?: string
}

export function AddToCartButton({ productId, variantId, quantity, disabled, className }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = async () => {
    if (isLoading || disabled) return

    setIsLoading(true)
    try {
      await addItem(productId, variantId, quantity)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleAddToCart} disabled={isLoading || disabled || !variantId} className={className}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adicionando...
        </>
      ) : (
        <>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Adicionar ao Carrinho
        </>
      )}
    </Button>
  )
}
