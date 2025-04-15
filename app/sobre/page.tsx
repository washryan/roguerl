import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function SobrePage() {
  const values = [
    {
      title: "Inovação",
      description: "Combinamos tecnologia de ponta com design para criar experiências únicas.",
    },
    {
      title: "Autenticidade",
      description: "Acreditamos que cada pessoa deve expressar sua verdadeira essência através do que veste.",
    },
    {
      title: "Sustentabilidade",
      description: "Comprometidos com práticas sustentáveis e materiais de baixo impacto ambiental.",
    },
    {
      title: "Qualidade",
      description: "Utilizamos apenas materiais premium para garantir durabilidade e conforto.",
    },
  ]

  const team = [
    {
      name: "Ana Silva",
      role: "CEO & Fundadora",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Carlos Mendes",
      role: "Diretor Criativo",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Juliana Costa",
      role: "Desenvolvedora de IA",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Rafael Santos",
      role: "Gerente de Produção",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div className="container py-8">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Sobre a <span className="text-primary">RogueRL</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Conheça nossa história, valores e a equipe por trás da revolução na moda personalizada com IA
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-6">
          <h2 className="text-2xl font-bold tracking-tight">Nossa História</h2>
          <p className="text-muted-foreground">
            A RogueRL nasceu em 2023 da visão de unir tecnologia e moda para criar roupas que expressam a verdadeira
            essência de cada pessoa. Fundada por um grupo de entusiastas de tecnologia e design, nossa empresa busca
            revolucionar a forma como as pessoas se expressam através do que vestem.
          </p>
          <p className="text-muted-foreground">
            O nome RogueRL representa a liberdade de seguir seu próprio caminho e expressar sua verdade. O "Rogue"
            simboliza a quebra de padrões tradicionais, enquanto o "RL" (Real Life) nos lembra que a moda deve refletir
            quem realmente somos no mundo real.
          </p>
          <p className="text-muted-foreground">
            Começamos como uma pequena startup em um coworking em São Paulo, e hoje estamos expandindo nossa presença
            para todo o Brasil, com planos de internacionalização nos próximos anos.
          </p>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-lg md:aspect-auto">
          <Image src="/placeholder.svg?height=600&width=600" alt="História da RogueRL" fill className="object-cover" />
        </div>
      </div>

      <div className="my-16">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">Nossos Valores</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <CheckCircle className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="my-16">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">Nossa Equipe</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative mb-4 h-64 w-64 overflow-hidden rounded-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-16 rounded-lg bg-muted p-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">Nossa Missão</h2>
          <p className="text-lg">
            "Capacitar cada pessoa a expressar sua verdadeira essência através de roupas personalizadas, combinando
            tecnologia de ponta com design de qualidade, de forma sustentável e acessível."
          </p>
        </div>
      </div>
    </div>
  )
}
