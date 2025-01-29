import getDefaultMRTOptions from "@/utils/mantine-react-table";
import {
  MantineReactTable,
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_TableOptions,
  useMantineReactTable,
} from "mantine-react-table";

import "mantine-react-table/styles.css";

interface Props<TData extends MRT_RowData> extends MRT_TableOptions<TData> {
  columns: MRT_ColumnDef<TData>[];
  rowCount?: number;
  data: TData[];
}

export const CustomMRTTable = <TData extends MRT_RowData>({
  columns,
  data,
  rowCount,
  ...rest
}: Props<TData>) => {
  const defaultMRTOptions = getDefaultMRTOptions<TData>();

  const table = useMantineReactTable({
    ...defaultMRTOptions,
    columns,
    data,
    rowCount,
    ...rest,
  });

  return <MantineReactTable table={table} />;
};

export default CustomMRTTable;
