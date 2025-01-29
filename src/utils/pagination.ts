type PaginationResponse<T> = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items: T[];
};

export const responsePagination = <T>(
  pageIndex: number,
  pageSize: number,
  totalCount: number,
  categories: T[]
): PaginationResponse<T> => {
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    pageIndex,
    pageSize,
    totalCount,
    totalPages,
    items: categories,
  };
};
