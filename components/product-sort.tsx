"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductSortProps {
  value: string
  onValueChange: (value: string) => void
}

export function ProductSort({ value, onValueChange }: ProductSortProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Mais recentes</SelectItem>
        <SelectItem value="price-asc">Menor preço</SelectItem>
        <SelectItem value="price-desc">Maior preço</SelectItem>
        <SelectItem value="rating">Melhor avaliados</SelectItem>
        <SelectItem value="popularity">Mais populares</SelectItem>
      </SelectContent>
    </Select>
  )
}
