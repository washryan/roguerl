"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { ProductSort } from "@/components/product-sort"
import { Pagination } from "@/components/pagination"
import { useProducts } from "@/hooks/use-products"
import { Filter, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { ProductFilters as ProductFiltersType } from "@/types/product"

export default function ProdutosPage() {
  const searchParams = useSearchParams()
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Obter filtros iniciais da URL
  const initialFilters: ProductFiltersType = {
    category: searchParams.get("categoria") || undefined,
    subcategory: searchParams.get("subcategoria") || undefined,
    search: searchParams.get("busca") || undefined,
    sort: (searchParams.get("ordenar") as any) || "newest",
  }

  const { products, loading, error, filters, pagination, updateFilters, goToPage } = useProducts(initialFilters)

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
        <p className="mt-2 text-muted-foreground">Explore nossa coleção de roupas prontas para expressar seu estilo</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] lg:hidden">
              <div className="h-full overflow-y-auto py-6 pr-6">
                <ProductFilters filters={filters} onFilterChange={updateFilters} />
              </div>
            </SheetContent>
          </Sheet>

          <ProductSort
            value={filters.sort || "newest"}
            onValueChange={(value) => updateFilters({ sort: value as any })}
          />
        </div>

        <div className="text-sm text-muted-foreground">
          {loading ? (
            "Carregando produtos..."
          ) : (
            <>
              Mostrando <strong>{products.length}</strong> de <strong>{pagination.total}</strong> produtos
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filtros para desktop */}
        <div className="hidden lg:block">
          <ProductFilters filters={filters} onFilterChange={updateFilters} className="sticky top-20" />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-md bg-muted"></div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 p-6 text-center">
              <p className="text-destructive">{error}</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                Tentar novamente
              </Button>
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-md border p-6 text-center">
              <h2 className="text-lg font-semibold">Nenhum produto encontrado</h2>
              <p className="mt-2 text-muted-foreground">Tente ajustar seus filtros ou buscar por outro termo.</p>
              {Object.values(filters).some((v) => v !== undefined) && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() =>
                    updateFilters({
                      category: undefined,
                      subcategory: undefined,
                      minPrice: undefined,
                      maxPrice: undefined,
                      colors: undefined,
                      sizes: undefined,
                      tags: undefined,
                      search: undefined,
                    })
                  }
                >
                  <X className="mr-2 h-4 w-4" />
                  Limpar filtros
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-8">
                <Pagination currentPage={pagination.page} totalPages={pagination.totalPages} onPageChange={goToPage} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
