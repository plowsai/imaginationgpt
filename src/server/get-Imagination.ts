import "server-only"
import { prisma } from "./db"

export const getimagination = async (id: string) =>
  prisma.imagination.findUnique({
    where: { id },
  })
