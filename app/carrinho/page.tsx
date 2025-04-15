"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"

export default function CarrinhoPage() {
  const router = useRouter()
  const { cart, loading, error, updateItemQuantity, removeItem, clearCart } = useCart()
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  // Função para atualizar a quantidade com debounce
  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setIsUpdating(itemId)
    try {
      await updateItemQuantity(itemId, newQuantity)
    } finally {
      setIsUpdating(null)
    }
  }

  // Função para remover um item
  const handleRemoveItem = async (itemId: string) => {
    setIsUpdating(itemId)
    try {
      await removeItem(itemId)
    } finally {
      setIsUpdating(null)
    }
  }

  // Função para limpar o carrinho
  const handleClearCart = async () => {
    if (window.confirm("Tem certeza que deseja limpar o carrinho?")) {
      await clearCart()
    }
  }

  // Função para ir para o checkout
  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (loading && cart.items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
        <h1 className="mb-4 text-2xl font-bold">Carregando seu carrinho...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-16 text-center">
        <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <ShoppingBag className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="mb-4 text-2xl font-bold">Erro ao carregar o carrinho</h1>
        <p className="mb-8 text-muted-foreground">{error}</p>
        <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="mb-4 text-2xl font-bold">Seu carrinho está vazio</h1>
        <p className="mb-8 text-muted-foreground">Adicione alguns produtos para começar a comprar.</p>
        <Button asChild>
          <Link href="/produtos">Ver produtos</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Seu Carrinho</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Itens ({cart.itemCount})</CardTitle>
              <Button variant="outline" size="sm" onClick={handleClearCart} disabled={loading}>
                Limpar carrinho
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <Link href={`/produtos/${item.productId}`} className="font-medium hover:underline">
                          {item.name}
                        </Link>
                        <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</p>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        <p>
                          {item.color} / {item.size}
                        </p>
                        <p>R$ {item.price.toFixed(2).replace(".", ",")} cada</p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={isUpdating === item.id || item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Diminuir quantidade</span>
                          </Button>
                          <div className="flex h-8 w-10 items-center justify-center border-y bg-background">
                            {isUpdating === item.id ? (
                              <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                            ) : (
                              item.quantity
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            disabled={isUpdating === item.id}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Aumentar quantidade</span>
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-muted-foreground"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isUpdating === item.id}
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {cart.subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span>Calculado no checkout</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total estimado</span>
                <span>R$ {cart.total.toFixed(2).replace(".", ",")}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" onClick={handleCheckout} disabled={loading}>
                Finalizar Compra
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/produtos">Continuar Comprando</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
