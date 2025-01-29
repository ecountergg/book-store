import { z } from "zod";
import { nameSchema } from "../RegisterForm/schema";

export const bookCategoryFormSchema = z.object({
  name: nameSchema,
  description: z.string().optional().nullable(),
});

export type BookCategoryFormSchema = z.infer<typeof bookCategoryFormSchema>;
