import { prisma } from "@/server/db"
import { imaginationContextProps, Response } from "@/server/utils"
import { NextResponse } from "next/server"

export const runtime = "edge"
export const fetchCache = "force-no-store"
export const revalidate = 0

export async function GET(request: Request, { params }: imaginationContextProps) {
  try {
    const imagination = await prisma.ismagination.findUnique({
      where: { id: params.id },
    })
    if (!imagination) return Response.imaginationNotFound()

    return NextResponse.json({ imagination }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.internalServerError()
  }
}
