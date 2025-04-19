import type { ShippingOption } from "@/lib/types"

// Função para calcular opções de frete baseado no CEP
export async function calculateShipping(zipCode: string): Promise<ShippingOption[]> {
  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Validar formato do CEP (apenas números, 8 dígitos)
  const zipCodeClean = zipCode.replace(/\D/g, "")
  if (zipCodeClean.length !== 8) {
    throw new Error("CEP inválido")
  }

  // Simulação de cálculo de frete baseado no CEP
  // Em produção, você usaria uma API real como Correios, Jadlog, etc.

  // Extrair o primeiro dígito do CEP para simular diferentes regiões
  const region = Number.parseInt(zipCodeClean[0])

  // Opções padrão de frete
  const options: ShippingOption[] = [
    {
      id: "standard",
      name: "Entrega Padrão",
      price: 19.9,
      estimatedDays: 5,
    },
    {
      id: "express",
      name: "Entrega Expressa",
      price: 29.9,
      estimatedDays: 2,
    },
  ]

  // Ajustar preços e prazos baseado na região
  if (region >= 0 && region <= 2) {
    // Sul e Sudeste
    options[0].price = 19.9
    options[0].estimatedDays = 3
    options[1].price = 29.9
    options[1].estimatedDays = 1
  } else if (region >= 3 && region <= 5) {
    // Centro-Oeste e Nordeste
    options[0].price = 24.9
    options[0].estimatedDays = 5
    options[1].price = 34.9
    options[1].estimatedDays = 2
  } else {
    // Norte
    options[0].price = 29.9
    options[0].estimatedDays = 7
    options[1].price = 39.9
    options[1].estimatedDays = 3
  }

  return options
}
