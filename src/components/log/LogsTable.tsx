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
} from '../ui/table'
import { useTranslation } from 'react-i18next'
import { Log } from '@/lib/types'
import { Skeleton } from '../ui/skeleton'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollArea } from '../ui/scroll-area'

type Props<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
}

export default function LogsTable<TData extends Log, TValue>({
  columns,
  data,
  isLoading = false,
}: Props<TData, TValue>) {
  const { t } = useTranslation()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    >
      <ScrollArea className='h-[calc(100vh-14rem)] w-full rounded-sm border'>
        <Table className='dark:text-slate-200'>
          <TableHeader className='bg-white dark:bg-slate-800 z-10'>
            <AnimatePresence mode='wait'>
              {isLoading ? (
                <TableRow key='skeleton-header'>
                  <TableHead style={{ width: '100px' }}>
                    <Skeleton className='h-6 w-[100px]' />
                  </TableHead>
                  <TableHead style={{ width: '80px' }}>
                    <Skeleton className='h-6 w-[80px]' />
                  </TableHead>
                  <TableHead>
                    <Skeleton className='h-6 w-[100px]' />
                  </TableHead>
                </TableRow>
              ) : (
                table.getHeaderGroups().map(headerGroup => (
                  <motion.tr
                    key={headerGroup.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {headerGroup.headers.map((header, index) => (
                      <TableHead
                        key={header.id}
                        className='dark:text-slate-300'
                        style={{
                          width:
                            index === 0
                              ? '110px'
                              : index === 1
                              ? '60px'
                              : 'auto',
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode='wait'>
              {isLoading ? (
                [...Array(7)].map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    <TableCell style={{ width: '100px' }}>
                      <Skeleton className='h-6 w-[100px]' />
                    </TableCell>
                    <TableCell style={{ width: '100px' }}>
                      <Skeleton className='h-6 w-[80px]' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-full' />
                    </TableCell>
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.05,
                    }}
                    data-state={row.getIsSelected() && 'selected'}
                    className={`${
                      index % 2 === 1 ? 'bg-slate-100 dark:bg-slate-600' : ''
                    }`}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className={`${
                          index === 1 || index === 2
                            ? cell.row.original.level === 'error'
                              ? 'text-red-500 font-medium'
                              : cell.row.original.level === 'critical'
                              ? 'text-red-600 font-semibold'
                              : cell.row.original.level === 'warning'
                              ? 'text-amber-600 font-medium'
                              : cell.row.original.level === 'debug'
                              ? 'text-blue-500'
                              : ''
                            : ''
                        } w-fit`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    {t('logs.status.empty')}
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </ScrollArea>
    </motion.div>
  )
}
