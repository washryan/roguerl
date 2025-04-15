import { type NextRequest, NextResponse } from "next/server"
import { getProducts } from "@/lib/db/products"
import type { ProductFilters } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    // Obter parâmetros da query
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "10")

    // Construir objeto de filtros
    const filters: ProductFilters = {}

    if (searchParams.has("category")) {
      filters.category = searchParams.get("category") || undefined
    }

    if (searchParams.has("subcategory")) {
      filters.subcategory = searchParams.get("subcategory") || undefined
    }

    if (searchParams.has("minPrice")) {
      filters.minPrice = Number.parseFloat(searchParams.get("minPrice") || "0")
    }

    if (searchParams.has("maxPrice")) {
      filters.maxPrice = Number.parseFloat(searchParams.get("maxPrice") || "1000000")
    }

    if (searchParams.has("sizes")) {
      filters.sizes = searchParams.get("sizes")?.split(",")
    }

    if (searchParams.has("colors")) {
      filters.colors = searchParams.get("colors")?.split(",")
    }

    if (searchParams.has("tags")) {
      filters.tags = searchParams.get("tags")?.split(",")
    }

    if (searchParams.has("sort")) {
      const sortValue = searchParams.get("sort")
      if (
        sortValue === "price-asc" ||
        sortValue === "price-desc" ||
        sortValue === "newest" ||
        sortValue === "rating" ||
        sortValue === "popularity"
      ) {
        filters.sort = sortValue
      }
    }

    if (searchParams.has("search")) {
      filters.search = searchParams.get("search") || undefined
    }

    // Obter produtos com filtros e paginação
    const result = await getProducts(page, pageSize, filters)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
