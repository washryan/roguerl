"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Truck, MapPin, DollarSign } from "lucide-react"

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const router = useRouter()
  const { toast } = useToast()

  // Simulação de itens do carrinho
  const cartItems = [
    {
      id: 1,
      name: "Camiseta Oversized Rogue",
      price: 89.9,
      quantity: 1,
      size: "M",
      color: "Preto",
    },
    {
      id: 5,
      name: "Moletom Oversized",
      price: 159.9,
      quantity: 1,
      size: "G",
      color: "Cinza",
    },
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 19.9
  const total = subtotal + shipping

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      // Simulação de processamento de pagamento
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Em produção, você faria uma chamada à API para processar o pagamento
      // const response = await fetch("/api/checkout", { ... })

      toast({
        title: "Pedido realizado com sucesso!",
        description: "Você receberá um email com os detalhes do seu pedido.",
      })

      // Redirecionar para página de sucesso
      router.push("/pagamento/sucesso")
    } catch (error) {
      toast({
        title: "Erro ao processar pagamento",
        description: "Ocorreu um erro ao processar seu pagamento. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Finalizar Compra</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle>Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" placeholder="Seu nome" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input id="cep" placeholder="00000-000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" placeholder="Rua, Avenida, etc." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="number">Número</Label>
                  <Input id="number" placeholder="123" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="complement">Complemento</Label>
                  <Input id="complement" placeholder="Apto, Bloco, etc." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input id="neighborhood" placeholder="Seu bairro" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" placeholder="Sua cidade" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input id="state" placeholder="UF" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <CardTitle>Método de Envio</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="standard">
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="flex-1">
                    <div className="font-medium">Entrega Padrão</div>
                    <div className="text-sm text-muted-foreground">Entrega em 5-7 dias úteis</div>
                  </Label>
                  <div className="font-medium">R$ 19,90</div>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="flex-1">
                    <div className="font-medium">Entrega Expressa</div>
                    <div className="text-sm text-muted-foreground">Entrega em 2-3 dias úteis</div>
                  </Label>
                  <div className="font-medium">R$ 29,90</div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <CardTitle>Método de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="credit-card" value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="credit-card">Cartão de Crédito</TabsTrigger>
                  <TabsTrigger value="pix">PIX</TabsTrigger>
                  <TabsTrigger value="boleto">Boleto</TabsTrigger>
                </TabsList>
                <TabsContent value="credit-card" className="space-y-4 pt-4">
                  <div className="grid gap-2">
                    <Label htmlFor="card-number">Número do Cartão</Label>
                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Validade</Label>
                      <Input id="expiry" placeholder="MM/AA" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="card-name">Nome no Cartão</Label>
                    <Input id="card-name" placeholder="Nome como está no cartão" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="installments">Parcelas</Label>
                    <select
                      id="installments"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="1">1x de R$ {total.toFixed(2).replace(".", ",")} sem juros</option>
                      <option value="2">2x de R$ {(total / 2).toFixed(2).replace(".", ",")} sem juros</option>
                      <option value="3">3x de R$ {(total / 3).toFixed(2).replace(".", ",")} sem juros</option>
                      <option value="4">4x de R$ {(total / 4).toFixed(2).replace(".", ",")} sem juros</option>
                      <option value="5">5x de R$ {(total / 5).toFixed(2).replace(".", ",")} sem juros</option>
                      <option value="6">6x de R$ {(total / 6).toFixed(2).replace(".", ",")} sem juros</option>
                    </select>
                  </div>
                </TabsContent>
                <TabsContent value="pix" className="pt-4">
                  <div className="rounded-md border p-4 text-center">
                    <DollarSign className="mx-auto h-12 w-12 text-primary" />
                    <p className="mt-2">Ao finalizar a compra, você receberá um QR Code para pagamento via PIX.</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      O pagamento via PIX é processado instantaneamente.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="boleto" className="pt-4">
                  <div className="rounded-md border p-4 text-center">
                    <p>Ao finalizar a compra, você receberá um boleto bancário para pagamento.</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      O prazo de compensação do boleto é de até 3 dias úteis.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
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
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {item.name} ({item.quantity}x)
                    </span>
                    <span>R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span>R$ {shipping.toFixed(2).replace(".", ",")}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>R$ {total.toFixed(2).replace(".", ",")}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCheckout} disabled={isLoading} className="w-full">
                {isLoading ? "Processando..." : "Finalizar Compra"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
