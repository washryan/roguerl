"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import type { ProductFilters as ProductFiltersType } from "@/types/product"
import { X } from "lucide-react"

interface ProductFiltersProps {
  filters: ProductFiltersType
  onFilterChange: (filters: Partial<ProductFiltersType>) => void
  className?: string
}

export function ProductFilters({ filters, onFilterChange, className }: ProductFiltersProps) {
  const [categories, setCategories] = useState<string[]>([])
  const [subcategories, setSubcategories] = useState<string[]>([])
  const [availableColors, setAvailableColors] = useState<string[]>([])
  const [availableSizes, setAvailableSizes] = useState<string[]>([])
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [loading, setLoading] = useState(true)

  // Buscar categorias
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/products/categories")
        if (response.ok) {
          const data = await response.json()
          setCategories(data.categories)
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error)
      }
    }

    fetchCategories()
  }, [])

  // Buscar subcategorias quando a categoria muda
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const url = filters.category
          ? `/api/products/subcategories?category=${filters.category}`
          : "/api/products/subcategories"
        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          setSubcategories(data.subcategories)
        }
      } catch (error) {
        console.error("Erro ao buscar subcategorias:", error)
      }
    }

    fetchSubcategories()
  }, [filters.category])

  // Buscar filtros disponíveis (cores, tamanhos, tags)
  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/products/filters")
        if (response.ok) {
          const data = await response.json()
          setAvailableColors(data.colors)
          setAvailableSizes(data.sizes)
          setAvailableTags(data.tags)
        }
      } catch (error) {
        console.error("Erro ao buscar filtros:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFilters()
  }, [])

  // Manipuladores de eventos para filtros
  const handleCategoryChange = (category: string) => {
    onFilterChange({
      category: filters.category === category ? undefined : category,
      subcategory: undefined, // Resetar subcategoria quando a categoria muda
    })
  }

  const handleSubcategoryChange = (subcategory: string) => {
    onFilterChange({
      subcategory: filters.subcategory === subcategory ? undefined : subcategory,
    })
  }

  const handleColorChange = (color: string) => {
    const currentColors = filters.colors || []
    const newColors = currentColors.includes(color)
      ? currentColors.filter((c) => c !== color)
      : [...currentColors, color]
    onFilterChange({ colors: newColors.length > 0 ? newColors : undefined })
  }

  const handleSizeChange = (size: string) => {
    const currentSizes = filters.sizes || []
    const newSizes = currentSizes.includes(size) ? currentSizes.filter((s) => s !== size) : [...currentSizes, size]
    onFilterChange({ sizes: newSizes.length > 0 ? newSizes : undefined })
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
  }

  const applyPriceFilter = () => {
    onFilterChange({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    })
  }

  const clearFilters = () => {
    onFilterChange({
      category: undefined,
      subcategory: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      colors: undefined,
      sizes: undefined,
      tags: undefined,
    })
    setPriceRange([0, 500])
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filtros</h2>
        {Object.values(filters).some((v) => v !== undefined) && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 gap-1">
            <X className="h-4 w-4" />
            Limpar
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categorias */}
        <Card>
          <CardHeader className="py-4 px-5">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-5">
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Button
                    variant={filters.category === category ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start h-8 font-normal"
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subcategorias (mostrar apenas se uma categoria estiver selecionada) */}
        {filters.category && subcategories.length > 0 && (
          <Card>
            <CardHeader className="py-4 px-5">
              <CardTitle className="text-sm font-medium">Subcategorias</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-5">
              <div className="space-y-2">
                {subcategories.map((subcategory) => (
                  <div key={subcategory} className="flex items-center space-x-2">
                    <Button
                      variant={filters.subcategory === subcategory ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start h-8 font-normal"
                      onClick={() => handleSubcategoryChange(subcategory)}
                    >
                      {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preço */}
        <Card>
          <CardHeader className="py-4 px-5">
            <CardTitle className="text-sm font-medium">Preço</CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-5">
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 500]}
                value={priceRange}
                min={0}
                max={500}
                step={10}
                onValueChange={handlePriceChange}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">R$ {priceRange[0]}</span>
                <span className="text-sm">R$ {priceRange[1]}</span>
              </div>
              <Button size="sm" className="w-full" onClick={applyPriceFilter}>
                Aplicar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cores */}
        {availableColors.length > 0 && (
          <Card>
            <CardHeader className="py-4 px-5">
              <CardTitle className="text-sm font-medium">Cores</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-5">
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => {
                  const isSelected = filters.colors?.includes(color) || false
                  return (
                    <div
                      key={color}
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border ${
                        isSelected ? "ring-2 ring-primary ring-offset-2" : ""
                      }`}
                      style={{ backgroundColor: getColorHex(color) }}
                      onClick={() => handleColorChange(color)}
                      title={color}
                    >
                      <span className="sr-only">{color}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tamanhos */}
        {availableSizes.length > 0 && (
          <Card>
            <CardHeader className="py-4 px-5">
              <CardTitle className="text-sm font-medium">Tamanhos</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-5">
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => {
                  const isSelected = filters.sizes?.includes(size) || false
                  return (
                    <div
                      key={size}
                      className={`flex h-8 min-w-8 cursor-pointer items-center justify-center rounded-md px-2 ${
                        isSelected ? "bg-primary text-primary-foreground" : "border bg-background hover:bg-muted"
                      }`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Função auxiliar para obter código hexadecimal da cor
function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    Preto: "#000000",
    Branco: "#ffffff",
    Cinza: "#808080",
    Azul: "#0000ff",
    Vermelho: "#ff0000",
    Verde: "#00ff00",
    Amarelo: "#ffff00",
    Roxo: "#800080",
    Caqui: "#d2b48c",
  }

  return colorMap[colorName] || "#cccccc"
}
