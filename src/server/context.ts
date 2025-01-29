import { PrismaClient } from "@prisma/client";
import * as trpcNext from "@trpc/server/adapters/next";

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  const prisma = new PrismaClient();

  return { prisma, req: opts?.req, res: opts?.res };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
