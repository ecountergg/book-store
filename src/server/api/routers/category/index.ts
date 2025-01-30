import { TRPCError } from "@trpc/server";
import { TRPC_ERROR_CODES_BY_NUMBER } from "@trpc/server/unstable-core-do-not-import";

import { bookCategoryFormSchema } from "@/components/Forms/BookCategoryForm/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import {
  filterbookCategoryResponseSchema,
  paginatedCategoryResponseSchema,
} from "./schema";
import { responsePagination } from "@/utils/pagination";

export const categoryRouter = createTRPCRouter({
  createCategory: protectedProcedure
    .input(bookCategoryFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, description } = input;

      const exists = await ctx.prisma.category.findFirst({
        where: { name },
      });

      if (exists) {
        throw new TRPCError({
          code: TRPC_ERROR_CODES_BY_NUMBER["-32009"],
          message: "Category already exists.",
        });
      }

      const result = await ctx.prisma.category.create({
        data: {
          name,
          description: description ?? "",
        },
      });

      return {
        status: 201,
        message: "Category created successfully",
        result: result.name,
      };
    }),
  listCategory: protectedProcedure
    .input(filterbookCategoryResponseSchema)
    .query(async ({ ctx, input }) => {
      const { pageIndex, pageSize, name } = input;

      const skip = pageIndex * pageSize;

      const where: { name?: { contains: string; mode: "insensitive" } } = {};

      if (name) {
        where.name = { contains: name, mode: "insensitive" };
      }

      const [categories, totalCount] = await ctx.prisma.$transaction([
        ctx.prisma.category.findMany({
          where,
          skip,
          take: pageSize,
        }),
        ctx.prisma.category.count(),
      ]);

      const response = responsePagination(
        pageIndex,
        pageSize,
        totalCount,
        categories
      );

      paginatedCategoryResponseSchema.parse(response);

      return response;
    }),
});
