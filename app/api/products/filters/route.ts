import { NextResponse } from "next/server"
import { getColors, getSizes, getTags } from "@/lib/db/products"

export async function GET() {
  try {
    // Obter todos os filtros disponíveis em paralelo
    const [colors, sizes, tags] = await Promise.all([getColors(), getSizes(), getTags()])

    return NextResponse.json({
      colors,
      sizes,
      tags,
    })
  } catch (error) {
    console.error("Error fetching filters:", error)
    return NextResponse.json({ error: "Failed to fetch filters" }, { status: 500 })
  }
}
