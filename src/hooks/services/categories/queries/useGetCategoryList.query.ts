import { useEffect, useState } from "react";

import {
  FilterBookCategoryResponseSchema,
  PaginatedCategoryResponseSchema,
} from "@/server/api/routers/category/schema";

import { trpc } from "@/utils/trpc";
import { TRPCQueryError } from "@/server/type";

export const useGetCategoryListQuery = (
  opts?: TRPCQueryError<PaginatedCategoryResponseSchema>
) => {
  const utils = trpc.useUtils();
  const [filter, setFilter] = useState<FilterBookCategoryResponseSchema>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    console.log(filter);
    utils.category.listCategory.invalidate({ ...filter });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return {
    filter,
    setFilter,
    ...trpc.category.listCategory.useQuery(
      {
        search: filter.search,
        pageIndex: filter.pageIndex,
        pageSize: filter.pageSize,
      },
      opts
    ),
  };
};
