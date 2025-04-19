"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useCart } from "@/hooks/use-cart"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck, X } from "lucide-react"

export default function CarrinhoPage() {
  const router = useRouter()
  const {
    cart,
    loading,
    error,
    couponLoading,
    shippingLoading,
    shippingOptions,
    updateItemQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    calculateShipping,
    selectShippingOption,
  } = useCart()

  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const [couponCode, setCouponCode] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false)

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

  // Função para aplicar cupom
  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!couponCode.trim()) return

    try {
      await applyCoupon(couponCode)
    } catch (error) {
      // Erro já tratado no hook
    }
  }

  // Função para remover cupom
  const handleRemoveCoupon = async () => {
    try {
      await removeCoupon()
      setCouponCode("")
    } catch (error) {
      // Erro já tratado no hook
    }
  }

  // Função para calcular frete
  const handleCalculateShipping = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!zipCode.trim() || zipCode.length < 8) return

    setIsCalculatingShipping(true)
    try {
      await calculateShipping(zipCode)
    } finally {
      setIsCalculatingShipping(false)
    }
  }

  // Função para selecionar opção de frete
  const handleSelectShipping = async (optionId: string) => {
    try {
      await selectShippingOption(optionId)
    } catch (error) {
      // Erro já tratado no hook
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

                {/* Cupom de desconto */}
                {cart.discounts.couponCode ? (
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-1 text-green-500" />
                      <span className="text-green-500">Cupom: {cart.discounts.couponCode}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-500">
                        -R$ {cart.discounts.couponDiscount.toFixed(2).replace(".", ",")}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-1"
                        onClick={handleRemoveCoupon}
                        disabled={couponLoading}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <Input
                      placeholder="Cupom de desconto"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponLoading}
                      className="flex-1"
                    />
                    <Button type="submit" variant="outline" size="sm" disabled={couponLoading || !couponCode.trim()}>
                      {couponLoading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                      ) : (
                        "Aplicar"
                      )}
                    </Button>
                  </form>
                )}

                {/* Cálculo de frete */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      Frete
                    </span>
                    {cart.shipping.shippingOption ? (
                      <span>R$ {cart.shipping.shippingPrice.toFixed(2).replace(".", ",")}</span>
                    ) : (
                      <span>Calcular</span>
                    )}
                  </div>

                  {!cart.shipping.shippingOption ? (
                    <form onSubmit={handleCalculateShipping} className="flex gap-2">
                      <Input
                        placeholder="CEP"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
                        maxLength={8}
                        disabled={shippingLoading}
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        disabled={shippingLoading || zipCode.length < 8}
                      >
                        {shippingLoading ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        ) : (
                          "Calcular"
                        )}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Entrega para o CEP {cart.shipping.zipCode}
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => {
                          setZipCode("")
                          calculateShipping("")
                        }}
                      >
                        Alterar
                      </Button>
                    </div>
                  )}

                  {/* Opções de frete */}
                  {shippingOptions.length > 0 && (
                    <div className="mt-2">
                      <RadioGroup
                        value={cart.shipping.shippingOption}
                        onValueChange={handleSelectShipping}
                        className="space-y-2"
                      >
                        {shippingOptions.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2 rounded-md border p-2">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <Label htmlFor={option.id} className="flex-1">
                              <div className="font-medium">{option.name}</div>
                              <div className="text-xs text-muted-foreground">
                                Entrega em até {option.estimatedDays} dias úteis
                              </div>
                            </Label>
                            <div className="font-medium">R$ {option.price.toFixed(2).replace(".", ",")}</div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>R$ {cart.total.toFixed(2).replace(".", ",")}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" onClick={handleCheckout} disabled={loading || !cart.shipping.shippingOption}>
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
