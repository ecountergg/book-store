import { z } from "zod";

export const filterBookCategory = z.object({
  name: z.string().nullable().optional(),
});

export type FilterBookCategory = z.infer<typeof filterBookCategory>;
