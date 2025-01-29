// eslint-disable-next-line camelcase
import { type MRT_RowData, type MRT_TableOptions } from "mantine-react-table";

// eslint-disable-next-line camelcase
const getDefaultMRTOptions = <TData extends MRT_RowData>(): Partial<
  MRT_TableOptions<TData>
> => ({
  enableColumnFilters: false,
  enableDensityToggle: false,
  enableColumnActions: false,
  enableFullScreenToggle: false,
  enableRowActions: true,
  enableExpandAll: false,
  enableEditing: false,
  enableRowNumbers: true,
  rowNumberDisplayMode: "static",
  mantineTableProps: {
    striped: "odd",
    withTableBorder: false,
  },
  positionActionsColumn: "last",
  mantinePaginationProps: {
    rowsPerPageOptions: ["10", "25", "50", "100"],
  },
});

export default getDefaultMRTOptions;
