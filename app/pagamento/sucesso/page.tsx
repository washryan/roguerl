"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, ShoppingBag, Truck, Calendar } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useRouter } from "next/navigation"

export default function PagamentoSucessoPage() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const [orderNumber, setOrderNumber] = useState("")
  const [estimatedDelivery, setEstimatedDelivery] = useState("")

  useEffect(() => {
    // Gerar número de pedido aleatório
    const generateOrderNumber = () => {
      const random = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")
      return `#${random}`
    }

    // Calcular data estimada de entrega
    const calculateDeliveryDate = () => {
      const today = new Date()
      const days = cart.shipping.shippingOption === "express" ? 3 : 7
      const deliveryDate = new Date(today.setDate(today.getDate() + days))

      return deliveryDate.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    }

    // Verificar se há itens no carrinho
    if (cart.items.length === 0) {
      // Se não houver itens, provavelmente o usuário já completou o pedido
      // ou acessou esta página diretamente
      setOrderNumber(generateOrderNumber())
      setEstimatedDelivery(calculateDeliveryDate())
    } else {
      // Se houver itens, gerar número de pedido e data de entrega
      setOrderNumber(generateOrderNumber())
      setEstimatedDelivery(calculateDeliveryDate())

      // Limpar o carrinho após o pedido ser concluído
      clearCart()
    }
  }, [cart, clearCart])

  return (
    <div className="container flex flex-col items-center justify-center py-16">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>

      <h1 className="mb-2 text-3xl font-bold">Pedido Realizado com Sucesso!</h1>
      <p className="mb-8 max-w-md text-center text-muted-foreground">
        Seu pedido {orderNumber} foi confirmado. Você receberá um email com os detalhes da sua compra e informações de
        rastreamento.
      </p>

      <Card className="mb-8 w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Detalhes do Pedido</CardTitle>
          <CardDescription>Informações sobre seu pedido e entrega</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg border p-4">
              <ShoppingBag className="mb-2 h-8 w-8 text-primary" />
              <h3 className="text-sm font-medium">Pedido</h3>
              <p className="text-center text-sm text-muted-foreground">{orderNumber}</p>
            </div>

            <div className="flex flex-col items-center rounded-lg border p-4">
              <Truck className="mb-2 h-8 w-8 text-primary" />
              <h3 className="text-sm font-medium">Envio</h3>
              <p className="text-center text-sm text-muted-foreground">
                {cart.shipping.shippingOption === "express" ? "Entrega Expressa" : "Entrega Padrão"}
              </p>
            </div>

            <div className="flex flex-col items-center rounded-lg border p-4">
              <Calendar className="mb-2 h-8 w-8 text-primary" />
              <h3 className="text-sm font-medium">Entrega Estimada</h3>
              <p className="text-center text-sm text-muted-foreground">{estimatedDelivery}</p>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Status do Pagamento</h3>
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="mr-2 h-4 w-4" />
              Pagamento aprovado
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-medium">Resumo do Pedido</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>R$ {cart.subtotal.toFixed(2).replace(".", ",")}</span>
              </div>

              {cart.discounts.couponDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Desconto</span>
                  <span className="text-green-600">
                    -R$ {cart.discounts.couponDiscount.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frete</span>
                <span>R$ {cart.shipping.shippingPrice.toFixed(2).replace(".", ",")}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>R$ {cart.total.toFixed(2).replace(".", ",")}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Button asChild variant="outline">
            <Link href="/conta/pedidos">Ver Meus Pedidos</Link>
          </Button>
          <Button asChild>
            <Link href="/">Voltar para a Loja</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
