export interface ProductImage {
    id: string
    url: string
    alt: string
  }
  
  export interface ProductVariant {
    id: string
    name: string
    sku: string
    size: string
    color: string
    price: number
    compareAtPrice?: number
    inventory: number
  }
  
  export interface Product {
    id: string
    name: string
    slug: string
    description: string
    features?: string[]
    category: string
    subcategory?: string
    tags: string[]
    images: ProductImage[]
    variants: ProductVariant[]
    rating?: number
    reviewCount?: number
    createdAt: string
    updatedAt: string
  }
  
  export interface ProductsResponse {
    products: Product[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
  
  export interface ProductFilters {
    category?: string
    subcategory?: string
    minPrice?: number
    maxPrice?: number
    sizes?: string[]
    colors?: string[]
    tags?: string[]
    sort?: "price-asc" | "price-desc" | "newest" | "rating" | "popularity"
    search?: string
  }
  