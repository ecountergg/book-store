import { useEffect, useMemo, useState } from "react";

import { MRT_PaginationState } from "mantine-react-table";

interface UseTableQueryProps<T> {
  filter: T;
  setFilter: (filter: T) => void;
}

const useTableQuery = <T>({ filter, setFilter }: UseTableQueryProps<T>) => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState<string>("");

  useEffect(() => {
    setFilter({
      ...filter,
      search: globalFilter ?? undefined,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, globalFilter]);

  const tableState = useMemo(
    () => ({ pagination, globalFilter }),
    [pagination, globalFilter]
  );

  return {
    tableState,
    setPagination,
    setGlobalFilter,
  };
};

export default useTableQuery;
