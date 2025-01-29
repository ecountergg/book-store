import { PrismaClient } from "@prisma/client";
import { verify } from "argon2";
import Credentials from "next-auth/providers/credentials";

import { loginFormSchema } from "@/components/Forms/LoginForm/schema";

export const CredentialsProvider = Credentials({
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    const parsed = await loginFormSchema.parseAsync(credentials);
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: { email: parsed.email },
    });

    if (!user) {
      return null;
    }

    const isValidPassword = await verify(user.password, parsed.password);

    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
    };
  },
});
