"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export function CartButton() {
  const { cart } = useCart()
  const itemCount = cart.itemCount || 0

  return (
    <Link href="/carrinho">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingBag className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </Button>
    </Link>
  )
}
