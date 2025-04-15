import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
        }}
      >
        <div className="container flex h-full flex-col items-start justify-center gap-4 py-12">
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">WEAR YOUR</span>
            <span className="block text-primary">TRUTH</span>
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Roupas personalizadas com IA para expressar sua verdadeira essência. Crie, personalize e vista sua verdade.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/produtos">Ver Produtos</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/personalizar">Personalizar Agora</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
