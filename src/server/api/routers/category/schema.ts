import { z } from "zod";

import { filterPaginationSchema, paginationSchema } from "@/schemas/pagination";
import { filterBookCategory } from "@/components/Forms/FilterBookCategoryForm/schema";

export const filterbookCategoryResponseSchema =
  filterPaginationSchema(filterBookCategory);

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
