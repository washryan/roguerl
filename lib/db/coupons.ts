import type { Coupon } from "@/lib/types"

// Simulação de banco de dados com cupons
const coupons: Coupon[] = [
  {
    code: "BEMVINDO10",
    type: "percentage",
    value: 10,
    minValue: 100,
    expiresAt: "2025-12-31T23:59:59Z",
    isActive: true,
  },
  {
    code: "FRETE",
    type: "fixed",
    value: 20,
    minValue: 150,
    expiresAt: "2025-12-31T23:59:59Z",
    isActive: true,
  },
  {
    code: "ROGUERL20",
    type: "percentage",
    value: 20,
    minValue: 200,
    expiresAt: "2025-12-31T23:59:59Z",
    isActive: true,
  },
]

// Função para validar um cupom
export async function validateCoupon(code: string, cartTotal: number): Promise<Coupon | null> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Buscar o cupom pelo código (case insensitive)
  const coupon = coupons.find((c) => c.code.toLowerCase() === code.toLowerCase())

  // Se o cupom não existe ou não está ativo
  if (!coupon || !coupon.isActive) {
    return null
  }

  // Verificar se o cupom expirou
  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return null
  }

  // Verificar se o valor mínimo foi atingido
  if (coupon.minValue && cartTotal < coupon.minValue) {
    return null
  }

  return coupon
}

// Função para calcular o desconto de um cupom
export function calculateDiscount(coupon: Coupon, subtotal: number): number {
  if (coupon.type === "percentage") {
    return (subtotal * coupon.value) / 100
  } else {
    // Para cupons de valor fixo, o desconto não pode ser maior que o subtotal
    return Math.min(coupon.value, subtotal)
  }
}
