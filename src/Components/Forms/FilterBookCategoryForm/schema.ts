import { z } from "zod";

export const filterBookCategorySchema = z.object({
  search: z.string().nullable().optional(),
});

export type FilterBookCategorySchema = z.infer<typeof filterBookCategorySchema>;
