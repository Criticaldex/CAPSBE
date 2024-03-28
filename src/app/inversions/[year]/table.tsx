'use client'
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import {
   Column,
   Table,
   ColumnDef,
   useReactTable,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   SortingState,
   flexRender,
   RowData,
} from '@tanstack/react-table'
import 'react-toastify/dist/ReactToastify.css';
import { Person, makeData } from './makeData';

declare module '@tanstack/react-table' {
   interface TableMeta<TData extends RowData> {
      updateData: (rowIndex: number, columnId: string, value: unknown) => void;
   }
}

function useSkipper() {
   const shouldSkipRef = useRef(true);
   const shouldSkip = shouldSkipRef.current;

   // Wrap a function with this to skip a pagination reset temporarily
   const skip = useCallback(() => {
      shouldSkipRef.current = false;
   }, []);

   useEffect(() => {
      shouldSkipRef.current = true;
   });

   return [shouldSkip, skip] as const;
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<Person>> = {
   cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue();
      // We need to keep and update the state of the cell normally
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [value, setValue] = useState(initialValue);

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
         table.options.meta?.updateData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
         setValue(initialValue);
      }, [initialValue]);

      return (
         <input
            className="bg-bgLight text-textColor"
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
         />
      );
   },
};

export function AdminTable() {

   const rerender = useReducer(() => ({}), {})[1];
   const [sorting, setSorting] = useState<SortingState>([])

   const columns = useMemo<ColumnDef<Person>[]>(
      () => [
         {
            accessorKey: 'firstName',
            header: () => <span>First Name</span>,
            footer: (props) => props.column.id,
         },
         {
            accessorKey: 'lastName',
            header: () => <span>Last Name</span>,
            footer: (props) => props.column.id,
         },
         {
            accessorKey: 'age',
            header: () => 'Age',
            footer: (props) => props.column.id,
         },
         {
            accessorKey: 'visits',
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
         },
         {
            accessorKey: 'status',
            header: 'Status',
            footer: (props) => props.column.id,
         },
         {
            accessorKey: 'progress',
            header: 'Profile Progress',
            footer: (props) => props.column.id,
         },
      ],
      []
   );

   const [data, setData] = useState(() => makeData(1000));
   const refreshData = () => setData(() => makeData(1000));

   const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

   const table = useReactTable({
      data,
      columns,
      defaultColumn,
      state: {
         sorting,
      },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      debugTable: true,
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      autoResetPageIndex,
      // Provide our updateData function to our table meta
      meta: {
         updateData: (rowIndex, columnId, value) => {
            // Skip page index reset until after next rerender
            skipAutoResetPageIndex();
            setData((old: any) =>
               old.map((row: any, index: any) => {
                  if (index === rowIndex) {
                     return {
                        ...old[rowIndex]!,
                        [columnId]: value,
                     };
                  }
                  return row;
               })
            );
         },
      },
   });

   return (
      <div className="p-2 rounded-md bg-bgLight">
         <div className="h-2" />
         <table className="text-textColor bg-bgDark rounded-md p-1 ml-4">
            <thead className="bg-bgLight">
               {table.getHeaderGroups().map((headerGroup) => (
                  <tr className="bg-bgLight" key={headerGroup.id}>
                     {headerGroup.headers.map((header) => {
                        return (
                           <th key={header.id} colSpan={header.colSpan}>
                              {header.isPlaceholder ? null : (
                                 <div
                                    className={
                                       header.column.getCanSort()
                                          ? 'cursor-pointer select-none'
                                          : ''
                                    }
                                    onClick={header.column.getToggleSortingHandler()}
                                    title={
                                       header.column.getCanSort()
                                          ? header.column.getNextSortingOrder() === 'asc'
                                             ? 'Sort ascending'
                                             : header.column.getNextSortingOrder() === 'desc'
                                                ? 'Sort descending'
                                                : 'Clear sort'
                                          : undefined
                                    }
                                 >
                                    {flexRender(
                                       header.column.columnDef.header,
                                       header.getContext()
                                    )}
                                    {{
                                       asc: ' 🔼',
                                       desc: ' 🔽',
                                    }[header.column.getIsSorted() as string] ?? null}
                                 </div>
                              )}
                           </th>
                        );
                     })}
                  </tr>
               ))}
            </thead>
            <tbody>
               {table.getRowModel().rows.map((row) => {
                  return (
                     <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                           return (
                              <td className="bg-bgDark" key={cell.id}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                 )}
                              </td>
                           );
                        })}
                     </tr>
                  );
               })}
            </tbody>
         </table>
         <div className="h-2" />
         <div className="flex items-center gap-2">
            <button
               className="border rounded p-1"
               onClick={() => table.setPageIndex(0)}
               disabled={!table.getCanPreviousPage()}
            >
               {'<<'}
            </button>
            <button
               className="border rounded p-1"
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
            >
               {'<'}
            </button>
            <button
               className="border rounded p-1"
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
            >
               {'>'}
            </button>
            <button
               className="border rounded p-1"
               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
               disabled={!table.getCanNextPage()}
            >
               {'>>'}
            </button>
            <span className="flex items-center gap-1">
               <div>Page</div>
               <strong>
                  {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
               </strong>
            </span>
            <select
               className="bg-bgDark"
               value={table.getState().pagination.pageSize}
               onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
               }}
            >
               {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                     Show {pageSize}
                  </option>
               ))}
            </select>
         </div>
      </div>
   );
};
function Filter({
   column,
   table,
}: {
   column: Column<any, any>;
   table: Table<any>;
}) {
   const firstValue = table
      .getPreFilteredRowModel()
      .flatRows[0]?.getValue(column.id);

   const columnFilterValue = column.getFilterValue();

   return typeof firstValue === 'number' ? (
      <div className="flex space-x-2">
         <input
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(e) =>
               column.setFilterValue((old: [number, number]) => [
                  e.target.value,
                  old?.[1],
               ])
            }
            placeholder={`Min`}
            className="w-24 border shadow rounded"
         />
         <input
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(e) =>
               column.setFilterValue((old: [number, number]) => [
                  old?.[0],
                  e.target.value,
               ])
            }
            placeholder={`Max`}
            className="w-24 border shadow rounded"
         />
      </div>
   ) : (
      <input
         type="text"
         value={(columnFilterValue ?? '') as string}
         onChange={(e) => column.setFilterValue(e.target.value)}
         placeholder={`Search...`}
         className="w-36 border shadow rounded"
      />
   );
}