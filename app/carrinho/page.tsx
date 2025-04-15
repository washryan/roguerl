"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size: string
  color: string
}

export default function CarrinhoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [couponCode, setCouponCode] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Simulação de carregamento do carrinho
    setTimeout(() => {
      setCartItems([
        {
          id: 1,
          name: "Camiseta Oversized Rogue",
          price: 89.9,
          image: "/placeholder.svg?height=400&width=300",
          quantity: 1,
          size: "M",
          color: "Preto",
        },
        {
          id: 5,
          name: "Moletom Oversized",
          price: 159.9,
          image: "/placeholder.svg?height=400&width=300",
          quantity: 1,
          size: "G",
          color: "Cinza",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    )
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
    toast({
      title: "Item removido",
      description: "O item foi removido do seu carrinho.",
    })
  }

  const applyCoupon = () => {
    if (!couponCode) {
      toast({
        title: "Código vazio",
        description: "Por favor, insira um código de cupom.",
        variant: "destructive",
      })
      return
    }

    // Simulação de aplicação de cupom
    toast({
      title: "Cupom aplicado",
      description: "O cupom foi aplicado com sucesso!",
    })
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 19.9 : 0
  const discount = 0 // Implementar lógica de desconto com cupom
  const total = subtotal + shipping - discount

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho antes de finalizar a compra.",
        variant: "destructive",
      })
      return
    }

    // Redirecionar para a página de checkout
    window.location.href = "/checkout"
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Carregando seu carrinho...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Seu Carrinho</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">Seu carrinho está vazio</h2>
          <p className="mb-6 text-muted-foreground">Adicione produtos ao seu carrinho para continuar comprando.</p>
          <Button asChild>
            <Link href="/produtos">Ver Produtos</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 rounded-lg border p-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-md">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="mt-1 text-sm text-muted-foreground">
                        <span>Tamanho: {item.size}</span> • <span>Cor: {item.color}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <div className="flex h-8 w-8 items-center justify-center border-y bg-background">
                          {item.quantity}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span>R$ {shipping.toFixed(2).replace(".", ",")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Desconto</span>
                    <span className="text-green-600">-R$ {discount.toFixed(2).replace(".", ",")}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Código de cupom"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={applyCoupon}>
                    Aplicar
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCheckout} className="w-full gap-2">
                  Finalizar Compra <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
