"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Package, MapPin, CreditCard, User } from "lucide-react"

export default function ContaPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="container flex items-center justify-center py-20">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    redirect("/login")
  }

  const userInitials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "U"

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Minha Conta</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "Avatar"} />
                <AvatarFallback className="text-lg">{userInitials}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-semibold">{session?.user?.name}</h2>
              <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
              <Button asChild variant="outline" className="mt-4 w-full">
                <Link href="/conta/editar">Editar Perfil</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="pedidos">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
              <TabsTrigger value="enderecos">Endereços</TabsTrigger>
              <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
              <TabsTrigger value="dados">Dados</TabsTrigger>
            </TabsList>

            <TabsContent value="pedidos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Meus Pedidos
                  </CardTitle>
                  <CardDescription>Histórico de todos os seus pedidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border p-8 text-center">
                    <p className="text-muted-foreground">Você ainda não realizou nenhum pedido.</p>
                    <Button asChild className="mt-4">
                      <Link href="/produtos">Começar a Comprar</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="enderecos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Meus Endereços
                  </CardTitle>
                  <CardDescription>Gerencie seus endereços de entrega</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border p-8 text-center">
                    <p className="text-muted-foreground">Você ainda não cadastrou nenhum endereço.</p>
                    <Button asChild className="mt-4">
                      <Link href="/conta/enderecos/novo">Adicionar Endereço</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pagamentos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Métodos de Pagamento
                  </CardTitle>
                  <CardDescription>Gerencie seus cartões e métodos de pagamento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border p-8 text-center">
                    <p className="text-muted-foreground">Você ainda não cadastrou nenhum método de pagamento.</p>
                    <Button asChild className="mt-4">
                      <Link href="/conta/pagamentos/novo">Adicionar Método de Pagamento</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dados" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Dados Pessoais
                  </CardTitle>
                  <CardDescription>Gerencie suas informações pessoais</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Nome</h3>
                      <p>{session?.user?.name || "Não informado"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                      <p>{session?.user?.email || "Não informado"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Telefone</h3>
                      <p>Não informado</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">CPF</h3>
                      <p>Não informado</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/conta/editar">Editar Dados</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
