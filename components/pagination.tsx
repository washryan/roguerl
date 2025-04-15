"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Não mostrar paginação se houver apenas uma página
  if (totalPages <= 1) {
    return null
  }

  // Função para gerar array de páginas a serem exibidas
  const getPageNumbers = () => {
    const pageNumbers = []

    // Sempre mostrar a primeira página
    pageNumbers.push(1)

    // Calcular páginas intermediárias
    const leftSide = currentPage - 1
    const rightSide = currentPage + 1

    // Se a página atual for maior que 3, adicionar ellipsis após a primeira página
    if (currentPage > 3) {
      pageNumbers.push("ellipsis-left")
    }

    // Adicionar páginas ao redor da página atual
    if (currentPage > 2) {
      pageNumbers.push(currentPage - 1)
    }

    // Adicionar página atual se não for a primeira ou a última
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageNumbers.push(currentPage)
    }

    // Adicionar página após a atual
    if (currentPage < totalPages - 1) {
      pageNumbers.push(currentPage + 1)
    }

    // Se a página atual estiver longe da última, adicionar ellipsis
    if (currentPage < totalPages - 2) {
      pageNumbers.push("ellipsis-right")
    }

    // Sempre mostrar a última página se houver mais de uma página
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Página anterior</span>
      </Button>

      {pageNumbers.map((page, index) => {
        if (page === "ellipsis-left" || page === "ellipsis-right") {
          return (
            <Button key={`${page}-${index}`} variant="outline" size="icon" disabled>
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Mais páginas</span>
            </Button>
          )
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Próxima página</span>
      </Button>
    </div>
  )
}
