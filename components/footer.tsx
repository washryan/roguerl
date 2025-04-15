import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">RogueRL</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Roupas personalizadas com IA para expressar sua verdade.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Produtos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/produtos/camisetas"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Camisetas
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos/moletons"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Moletons
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos/acessorios"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Acessórios
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos/novidades"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Novidades
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Informações</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="text-muted-foreground transition-colors hover:text-foreground">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground transition-colors hover:text-foreground">
                  Perguntas frequentes
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-medium">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/termos" className="text-muted-foreground transition-colors hover:text-foreground">
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-muted-foreground transition-colors hover:text-foreground">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground transition-colors hover:text-foreground">
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link href="/trocas" className="text-muted-foreground transition-colors hover:text-foreground">
                  Trocas e devoluções
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RogueRL. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
