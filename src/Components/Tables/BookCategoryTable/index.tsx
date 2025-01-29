"use client";

import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MRT_ColumnDef } from "mantine-react-table";

import { trpc } from "@/utils/trpc";
import { BookCategoryFormModal } from "@/components/Modals/BookCategoryFormModal";

import CustomMRTTable from "../CustomMRTTable";

const BookCategoryTable = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: categories, isPending: isPenddingCategories } =
    trpc.category.listCategory.useQuery({
      pageIndex: 0,
      pageSize: 100,
    });

  // eslint-disable-next-line camelcase, @typescript-eslint/no-explicit-any
  const columns: MRT_ColumnDef<any>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "description", header: "Description" },
  ];

  return (
    <>
      <CustomMRTTable
        rowCount={categories?.totalCount}
        columns={columns}
        data={categories?.items ?? []}
        manualFiltering
        manualPagination
        enableRowActions={false}
        state={{
          showProgressBars: isPenddingCategories,
          density: "xs",
        }}
        renderTopToolbarCustomActions={() => (
          <Button variant="filled-primary" onClick={() => open()}>
            Create Category
          </Button>
        )}
      />

      <BookCategoryFormModal opened={opened} close={close} />
    </>
  );
};

export default BookCategoryTable;
