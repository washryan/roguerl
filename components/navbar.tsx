import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Search } from "lucide-react"
import UserNav from "@/components/user-nav"
import { CartButton } from "@/components/cart-button"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-between md:justify-start md:gap-10">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">RogueRL</span>
          </Link>
          <nav className="hidden md:flex md:gap-6">
            <Link href="/produtos" className="text-sm font-medium transition-colors hover:text-primary">
              Produtos
            </Link>
            <Link href="/personalizar" className="text-sm font-medium transition-colors hover:text-primary">
              Personalizar
            </Link>
            <Link href="/sobre" className="text-sm font-medium transition-colors hover:text-primary">
              Sobre
            </Link>
            <Link href="/contato" className="text-sm font-medium transition-colors hover:text-primary">
              Contato
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <CartButton />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
