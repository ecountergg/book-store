import { z } from "zod";

import { filterPaginationSchema, paginationSchema } from "@/schemas/pagination";
import { filterBookCategory } from "@/components/Forms/FilterBookCategoryForm/schema";

export const filterBookCategorySchema =
  filterPaginationSchema(filterBookCategory);

export const bookCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export const paginatedCategorySchema = paginationSchema(bookCategorySchema);
