import { TRPCError } from "@trpc/server";
import { hash } from "argon2";
import { TRPC_ERROR_CODES_BY_NUMBER } from "@trpc/server/unstable-core-do-not-import";

import { registerFormSchema } from "@/components/Forms/RegisterForm/schema";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { email, name, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: TRPC_ERROR_CODES_BY_NUMBER["-32009"],
          message: "User already exists.",
        });
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      return {
        status: 201,
        message: "User created successfully",
        result: result.email,
      };
    }),
});
