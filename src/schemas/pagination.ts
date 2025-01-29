import { z } from "zod";

export const filterPaginationSchema = <ItemType extends z.AnyZodObject>(
  filterSchema: ItemType
) => {
  return z
    .object({
      pageIndex: z.number().int().nonnegative(),
      pageSize: z.number().int().positive(),
    })
    .merge(filterSchema);
};

export const itemsSchema = <ItemType extends z.ZodTypeAny>(
  itemSchema: ItemType
) => z.array(itemSchema);

export type ItemSchema<ItemType extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof itemsSchema<ItemType>>
>;

export const paginationSchema = <ItemType extends z.ZodTypeAny>(
  itemSchema: ItemType
) =>
  z.object({
    pageIndex: z.number(),
    pageSize: z.number(),
    totalCount: z.number(),
    totalPages: z.number(),
    items: itemsSchema(itemSchema),
  });

export type PaginationSchema<ItemType extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof paginationSchema<ItemType>>
>;
