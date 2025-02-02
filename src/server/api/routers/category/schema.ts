import { z } from "zod";

import { filterPaginationSchema, paginationSchema } from "@/schemas/pagination";
import { filterBookCategorySchema } from "@/components/Forms/FilterBookCategoryForm/schema";

export const filterBookCategoryResponseSchema = filterPaginationSchema(
  filterBookCategorySchema
);

export const bookCategoryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export const paginatedCategoryResponseSchema = paginationSchema(
  bookCategoryResponseSchema
);

export type BookCategoryResponseSchema = z.infer<
  typeof bookCategoryResponseSchema
>;

export type PaginatedCategoryResponseSchema = z.infer<
  typeof paginatedCategoryResponseSchema
>;

export type FilterBookCategoryResponseSchema = z.infer<
  typeof filterBookCategoryResponseSchema
>;
