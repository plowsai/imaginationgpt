import "server-only"
import { prisma } from "./db"

export const getImagination = async (id: string) =>
  prisma.Imagination.findUnique({
    where: { id },
  })
