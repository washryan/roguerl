import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react'

export default function AboutSection() {
  const features = [
    "Roupas personalizadas com IA",
    "Materiais de alta qualidade",
    "Produção sustentável",
    "Entrega para todo o Brasil",
  ]

  return (
    <section className="container py-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Sobre a <span className="text-primary">RogueRL</span>
          </h2>
          <p className="text-muted-foreground">
            A RogueRL nasceu da ideia de unir tecnologia e moda para criar roupas que expressam a verdadeira essência de
            cada pessoa. Nosso nome representa a liberdade de seguir seu próprio caminho e expressar sua verdade através
            do que você veste.
          </p>
          <p className="text-muted-foreground">
            Utilizamos inteligência artificial para criar designs únicos e personalizados, permitindo que você escolha
            desde o estilo até o material da sua roupa ideal.
          </p>
          <ul className="grid gap-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Button asChild>
              <Link href="/sobre">Saiba Mais</Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-lg md:aspect-auto">
          <Image src="/placeholder.svg?height=600&width=600" alt="Sobre a RogueRL" fill className="object-cover" />
        </div>
      </div>
    </section>
  )
}
