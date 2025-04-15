import { type NextRequest, NextResponse } from "next/server"
import { getSubcategories } from "@/lib/db/products"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category") || undefined

    const subcategories = await getSubcategories(category)
    return NextResponse.json({ subcategories })
  } catch (error) {
    console.error("Error fetching subcategories:", error)
    return NextResponse.json({ error: "Failed to fetch subcategories" }, { status: 500 })
  }
}
