export interface ProductImage {
  id: string
  url: string
  alt?: string
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
  material?: string
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

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface CartItem {
  id: string
  productId: string
  variantId: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image: string
}

export interface Coupon {
  code: string
  type: "percentage" | "fixed"
  value: number
  minValue?: number
  expiresAt?: string
  isActive: boolean
}

export interface ShippingOption {
  id: string
  name: string
  price: number
  estimatedDays: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  discounts: {
    couponCode?: string
    couponDiscount: number
  }
  shipping: {
    zipCode?: string
    shippingOption?: string
    shippingPrice: number
  }
  total: number
  itemCount: number
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  images: ProductImage[]
  verified: boolean
  helpful: number
  notHelpful: number
  createdAt: string
  updatedAt: string
}

export interface ReviewFilters {
  rating?: number
  verified?: boolean
  withImages?: boolean
  sortBy?: "newest" | "oldest" | "highest" | "lowest" | "mostHelpful"
}
