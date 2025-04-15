"use client"

import { useState, useEffect } from "react"
import type { Product, ProductFilters, ProductsResponse } from "@/lib/types"

export function useProducts(initialFilters: ProductFilters = {}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ProductFilters>(initialFilters)
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    total: 0,
    totalPages: 0,
  })

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        // Construir URL com parâmetros de consulta
        const params = new URLSearchParams()
        params.append("page", pagination.page.toString())
        params.append("pageSize", pagination.pageSize.toString())

        if (filters.category) params.append("category", filters.category)
        if (filters.subcategory) params.append("subcategory", filters.subcategory)
        if (filters.minPrice !== undefined) params.append("minPrice", filters.minPrice.toString())
        if (filters.maxPrice !== undefined) params.append("maxPrice", filters.maxPrice.toString())
        if (filters.sizes?.length) params.append("sizes", filters.sizes.join(","))
        if (filters.colors?.length) params.append("colors", filters.colors.join(","))
        if (filters.tags?.length) params.append("tags", filters.tags.join(","))
        if (filters.sort) params.append("sort", filters.sort)
        if (filters.search) params.append("search", filters.search)

        const response = await fetch(`/api/products?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Falha ao buscar produtos")
        }

        const data: ProductsResponse = await response.json()
        setProducts(data.products)
        setPagination({
          page: data.page,
          pageSize: data.pageSize,
          total: data.total,
          totalPages: data.totalPages,
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters, pagination.page, pagination.pageSize])

  // Função para atualizar filtros
  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    // Resetar para a primeira página quando os filtros mudam
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  // Função para mudar de página
  const goToPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }))
  }

  return {
    products,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    goToPage,
  }
}
