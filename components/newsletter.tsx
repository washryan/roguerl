"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de envio
    setTimeout(() => {
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas novidades no email fornecido.",
      })
      setEmail("")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <section className="bg-muted py-16">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Fique por dentro das novidades</h2>
          <p className="mt-4 text-muted-foreground">
            Inscreva-se para receber atualizações sobre novos produtos, promoções e dicas de estilo.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Inscrevendo..." : "Inscrever"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
