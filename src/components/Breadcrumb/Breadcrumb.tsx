import React from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: React.ReactNode
  href?: string
  /** Mark as current page (renders bold, no link) */
  current?: boolean
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /** Custom separator character/node (default "/") */
  separator?: React.ReactNode
  className?: string
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

/**
 * Navigation breadcrumb trail — matches Figma "Breadcrumb" (node 35:25).
 * Renders linked ancestors separated by "/" and bolds the current page.
 *
 * @example
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Components', href: '/components' },
 *     { label: 'Breadcrumb', current: true },
 *   ]}
 * />
 */
export const Breadcrumb = ({ items, separator = '/', className = '' }: BreadcrumbProps) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex flex-wrap items-center gap-[6px] text-[14px] leading-[20px]">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <React.Fragment key={i}>
            <li>
              {isLast || item.current ? (
                <span
                  aria-current="page"
                  className="font-semibold text-[var(--foreground)]"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href ?? '#'}
                  className={[
                    'font-normal text-[var(--muted-foreground)]',
                    'hover:text-[var(--foreground)] transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-sm',
                  ].join(' ')}
                >
                  {item.label}
                </a>
              )}
            </li>
            {!isLast && (
              <li aria-hidden className="text-[var(--zinc-300)] select-none font-normal">
                {separator}
              </li>
            )}
          </React.Fragment>
        )
      })}
    </ol>
  </nav>
)

Breadcrumb.displayName = 'Breadcrumb'
