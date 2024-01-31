import "server-only"
import { prisma } from "./db"

export const getImaginationsCount = async () => prisma.Imagination.count()
