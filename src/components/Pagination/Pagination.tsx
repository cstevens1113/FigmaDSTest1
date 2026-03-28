import React from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginationProps {
  /** Total number of pages */
  total: number
  /** Currently active page (1-indexed) */
  page: number
  /** Called when user selects a new page */
  onChange: (page: number) => void
  /**
   * Maximum page buttons to show before collapsing with "…"
   * (default 5 — matches Figma design)
   */
  siblings?: number
  className?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildPages(page: number, total: number, siblings: number): (number | '…')[] {
  if (total <= siblings + 4) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const left  = Math.max(2, page - siblings)
  const right = Math.min(total - 1, page + siblings)
  const pages: (number | '…')[] = [1]
  if (left > 2) pages.push('…')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('…')
  pages.push(total)
  return pages
}

// ─── Shared button styles ─────────────────────────────────────────────────────

const baseBtn =
  'inline-flex items-center justify-center h-9 min-w-[36px] px-2.5 rounded-md ' +
  'text-[14px] font-normal leading-9 transition-colors duration-150 select-none ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-1 '

// ─── Pagination ───────────────────────────────────────────────────────────────

/**
 * Pagination control — matches Figma "Pagination" (node 35:31).
 * Shows ← prev, page numbers with … ellipsis, and → next.
 *
 * @example
 * const [page, setPage] = React.useState(3)
 * <Pagination total={12} page={page} onChange={setPage} />
 */
export const Pagination = ({ total, page, onChange, siblings = 2, className = '' }: PaginationProps) => {
  const pages = buildPages(page, total, siblings)

  return (
    <nav aria-label="Pagination" className={['flex items-center gap-1', className].join(' ')}>
      {/* Previous */}
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={[
          baseBtn,
          page <= 1
            ? 'opacity-40 cursor-not-allowed text-[var(--muted-foreground)]'
            : 'text-[var(--foreground)] hover:bg-[var(--accent)]',
        ].join(' ')}
      >
        ←
      </button>

      {/* Pages */}
      {pages.map((p, i) =>
        p === '…' ? (
          <span
            key={`ellipsis-${i}`}
            className="inline-flex items-center justify-center h-9 px-1 text-[14px] text-[var(--muted-foreground)] select-none"
            aria-hidden
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onChange(p as number)}
            className={[
              baseBtn,
              p === page
                ? 'bg-[var(--foreground)] text-[var(--background)] font-semibold'
                : 'border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--accent)]',
            ].join(' ')}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        type="button"
        aria-label="Next page"
        disabled={page >= total}
        onClick={() => onChange(page + 1)}
        className={[
          baseBtn,
          'border border-[var(--border)]',
          page >= total
            ? 'opacity-40 cursor-not-allowed text-[var(--muted-foreground)]'
            : 'text-[var(--foreground)] hover:bg-[var(--accent)]',
        ].join(' ')}
      >
        →
      </button>
    </nav>
  )
}

Pagination.displayName = 'Pagination'
