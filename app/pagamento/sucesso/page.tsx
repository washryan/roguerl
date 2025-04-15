import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function PagamentoSucessoPage() {
  return (
    <div className="container flex flex-col items-center justify-center py-16 text-center">
      <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
      <h1 className="mb-2 text-3xl font-bold">Pedido Realizado com Sucesso!</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Seu pedido foi processado com sucesso. Você receberá um email com os detalhes da sua compra e informações de
        rastreamento.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/conta/pedidos">Ver Meus Pedidos</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Voltar para a Loja</Link>
        </Button>
      </div>
    </div>
  )
}
