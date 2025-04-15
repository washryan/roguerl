import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/toaster"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })

export const metadata: Metadata = {
  title: {
    default: "RogueRL - Wear Your Truth",
    template: "%s | RogueRL",
  },
  description: "Roupas personalizadas com IA para expressar sua verdade. Crie, personalize e vista sua verdade.",
  keywords: ["roupas", "moda", "personalização", "IA", "inteligência artificial", "camisetas", "moletons"],
  authors: [{ name: "RogueRL" }],
  creator: "RogueRL",
  publisher: "RogueRL",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://roguerl.com.br",
    title: "RogueRL - Wear Your Truth",
    description: "Roupas personalizadas com IA para expressar sua verdade",
    siteName: "RogueRL",
  },
  twitter: {
    card: "summary_large_image",
    title: "RogueRL - Wear Your Truth",
    description: "Roupas personalizadas com IA para expressar sua verdade",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
