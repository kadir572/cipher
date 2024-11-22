import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { useTranslation } from 'react-i18next'

type Props<TData extends { type: string }, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export default function LogsTable<TData extends { type: string }, TValue>({
  columns,
  data,
}: Props<TData, TValue>) {
  const { t } = useTranslation()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table className='dark:text-slate-200'>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableHead key={header.id} className='dark:text-slate-300'>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className={`${
                index % 2 === 1 ? 'bg-slate-100 dark:bg-slate-600' : ''
              }`}
            >
              {row.getVisibleCells().map((cell, index) => (
                <TableCell
                  className={`${
                    index === 0
                      ? 'relative before:absolute before:w-1 before:h-full before:top-0 before:bottom-0 before:left-0'
                      : ''
                  } ${
                    index === 0 && cell.row.original.type === 'success'
                      ? 'before:bg-green-500'
                      : 'before:bg-red-500'
                  }`}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='h-24 text-center'>
              {t('logs.no_logs')}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
