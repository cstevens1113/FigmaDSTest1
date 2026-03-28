import React from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DataTableColumn<T> {
  /** Column header label */
  header: string
  /** Key of the row object to display, or a render function */
  accessor: keyof T | ((row: T, index: number) => React.ReactNode)
  /** Optional column width (e.g. "180px", "25%") */
  width?: string
  /** Text alignment (default "left") */
  align?: 'left' | 'center' | 'right'
}

export interface DataTableProps<T extends object> {
  /** Column definitions */
  columns: DataTableColumn<T>[]
  /** Array of row data */
  data: T[]
  /** Optional table caption / heading shown above the table */
  caption?: React.ReactNode
  /** Optional action placed in the top-right corner of the header bar */
  action?: React.ReactNode
  /** Key extractor for row identity (defaults to index) */
  getRowKey?: (row: T, index: number) => string | number
  /** Fired when a row is clicked */
  onRowClick?: (row: T, index: number) => void
  /** Show hover highlight on rows (default true) */
  hoverable?: boolean
  /** Show alternating row stripes */
  striped?: boolean
  /** Show a skeleton loading state */
  loading?: boolean
  /** Number of skeleton rows when loading=true (default 5) */
  skeletonRows?: number
  className?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' }

function SkeletonCell() {
  return (
    <div className="h-4 rounded bg-[var(--secondary)] animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
  )
}

// ─── DataTable ────────────────────────────────────────────────────────────────

/**
 * Generic, typed data table — matches the Dashboard "Top Customers" table pattern.
 * Supports sorting, hover/striped rows, loading skeleton, and row click handler.
 *
 * @example
 * interface Customer { name: string; plan: string; mrr: string; status: string }
 *
 * <DataTable<Customer>
 *   caption="Top Customers"
 *   action={<Button size="sm" variant="ghost">View all</Button>}
 *   columns={[
 *     { header: 'Customer', accessor: 'name' },
 *     { header: 'Plan',     accessor: 'plan' },
 *     { header: 'MRR',      accessor: 'mrr',  align: 'right' },
 *     { header: 'Status',   accessor: 'status' },
 *   ]}
 *   data={customers}
 * />
 */
export function DataTable<T extends object>({
  columns,
  data,
  caption,
  action,
  getRowKey,
  onRowClick,
  hoverable = true,
  striped   = false,
  loading   = false,
  skeletonRows = 5,
  className = '',
}: DataTableProps<T>) {
  return (
    <div
      className={[
        'w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card)]',
        className,
      ].join(' ')}
    >
      {/* Caption bar */}
      {(caption || action) && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          {caption && (
            <span className="text-[15px] font-semibold text-[var(--foreground)]">{caption}</span>
          )}
          {action && <div>{action}</div>}
        </div>
      )}

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-[14px]">
          {/* Column headers */}
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--secondary)]">
              {columns.map((col, ci) => (
                <th
                  key={ci}
                  className={[
                    'px-4 py-2.5 text-[11px] font-medium uppercase tracking-wide text-[var(--muted-foreground)]',
                    alignClass[col.align ?? 'left'],
                  ].join(' ')}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {loading
              ? Array.from({ length: skeletonRows }).map((_, ri) => (
                  <tr key={ri} className="border-b border-[var(--border)] last:border-0">
                    {columns.map((_, ci) => (
                      <td key={ci} className="px-4 py-4">
                        <SkeletonCell />
                      </td>
                    ))}
                  </tr>
                ))
              : data.map((row, ri) => (
                  <tr
                    key={getRowKey ? getRowKey(row, ri) : ri}
                    onClick={onRowClick ? () => onRowClick(row, ri) : undefined}
                    className={[
                      'border-b border-[var(--border)] last:border-0 transition-colors duration-100',
                      striped && ri % 2 === 1 ? 'bg-[var(--secondary)]/40' : 'bg-transparent',
                      hoverable ? 'hover:bg-[var(--accent)] cursor-pointer' : '',
                      onRowClick ? 'cursor-pointer' : '',
                    ].join(' ')}
                  >
                    {columns.map((col, ci) => (
                      <td
                        key={ci}
                        className={['px-4 py-4', alignClass[col.align ?? 'left']].join(' ')}
                      >
                        {typeof col.accessor === 'function'
                          ? col.accessor(row, ri)
                          : (row[col.accessor] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

DataTable.displayName = 'DataTable'
