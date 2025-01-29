import { PrismaClient } from "@prisma/client";
import * as trpcNext from "@trpc/server/adapters/next";

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  const prisma = new PrismaClient();
  const session = opts?.req.cookies["authjs.session-token"];

  return { prisma, req: opts?.req, res: opts?.res, session };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
