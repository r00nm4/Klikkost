import "server-only";
import type { PrismaClient } from "@prisma/client";
import { createPrismaClient } from "./createPrismaClient";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}