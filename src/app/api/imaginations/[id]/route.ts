import { prisma } from "@/server/db"
import { ImaginationContextProps, Response } from "@/server/utils"
import { NextResponse } from "next/server"

export const runtime = "edge"
export const fetchCache = "force-no-store"
export const revalidate = 0

export async function GET(request: Request, { params }: ImaginationContextProps) {
  try {
    const Imagination = await prisma.Imagination.findUnique({
      where: { id: params.id },
    })
    if (!Imagination) return Response.ImaginationNotFound()

    return NextResponse.json({ Imagination }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.internalServerError()
  }
}
