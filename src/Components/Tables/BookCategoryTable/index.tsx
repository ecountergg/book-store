"use client";

import { useMemo } from "react";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";

import { BookCategoryFormModal } from "@/components/Modals/BookCategoryFormModal";
import {
  BookCategoryResponseSchema,
  FilterBookCategoryResponseSchema,
} from "@/server/api/routers/category/schema";
import { useGetCategoryListQuery } from "@/hooks/services/categories/queries/useGetCategoryList.query";
import useTableQuery from "@/hooks/useTableQuery";

import CustomMRTTable from "../CustomMRTTable";

const BookCategoryTable = () => {
  const [
    openedCreateCategory,
    { open: setOpenCreateCategory, close: setCloseCreateCategory },
  ] = useDisclosure(false);
  const {
    filter: filterCategory,
    setFilter: setFilterCategory,
    data: categories,
    isPending: isPendingCategories,
  } = useGetCategoryListQuery();
  const { tableState, setPagination, setGlobalFilter } =
    useTableQuery<FilterBookCategoryResponseSchema>({
      filter: filterCategory,
      setFilter: setFilterCategory,
    });

  const columns: MRT_ColumnDef<BookCategoryResponseSchema>[] = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "description", header: "Description" },
    ],
    []
  );

  return (
    <>
      <CustomMRTTable
        rowCount={categories?.totalCount}
        columns={columns}
        data={categories?.items ?? []}
        enableSorting={false}
        manualFiltering
        manualPagination
        mantineSearchTextInputProps={{
          placeholder: "Search Category",
        }}
        state={{
          isLoading: isPendingCategories,
          showProgressBars: isPendingCategories,
          density: "xs",
          globalFilter: tableState.globalFilter,
          pagination: tableState.pagination,
        }}
        renderTopToolbarCustomActions={() => (
          <Button variant="filled" onClick={() => setOpenCreateCategory()}>
            Create Category
          </Button>
        )}
        onPaginationChange={setPagination}
        onGlobalFilterChange={setGlobalFilter}
      />

      <BookCategoryFormModal
        opened={openedCreateCategory}
        close={setCloseCreateCategory}
      />
    </>
  );
};

export default BookCategoryTable;
