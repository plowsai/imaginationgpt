import "server-only"
import { prisma } from "./db"

export const getimaginationsCount = async () => prisma.imagination.count()
