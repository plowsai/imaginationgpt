import { Prisma } from "@prisma/client"
import "server-only"
import { prisma } from "./db"
import { VALID_Imagination_FILTER } from "./utils"
import { PrismaCacheStrategy } from "@prisma/extension-accelerate"

export const getImaginations = async (opts: {
  take?: number
  skip?: number
  orderBy?:
    | Prisma.ImaginationOrderByWithRelationAndSearchRelevanceInput
    | Prisma.ImaginationOrderByWithRelationAndSearchRelevanceInput[]
  cacheStrategy?: PrismaCacheStrategy["cacheStrategy"]
}) => {
  const take = opts.take ?? 100
  const skip = opts.skip ?? undefined
  const orderBy = opts.orderBy ?? { createdAt: Prisma.SortOrder.desc }
  const cacheStrategy = opts.cacheStrategy ?? undefined

  return prisma.Imagination.findMany({
    select: { id: true, updatedAt: true },
    orderBy,
    where: VALID_Imagination_FILTER,
    take,
    skip,
    cacheStrategy,
  })
}
