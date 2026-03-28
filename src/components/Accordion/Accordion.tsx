import React from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AccordionItem {
  /** Unique key */
  value: string
  /** Clickable trigger label */
  trigger: React.ReactNode
  /** Body content revealed when expanded */
  content: React.ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  /**
   * - `"single"` — only one item open at a time (default)
   * - `"multiple"` — any number open simultaneously
   */
  type?: 'single' | 'multiple'
  /** Pre-open items by value */
  defaultOpen?: string | string[]
  className?: string
}

// ─── Chevron icon ─────────────────────────────────────────────────────────────

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden
    className={['flex-shrink-0 transition-transform duration-200', open ? 'rotate-180' : ''].join(' ')}
  >
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ─── Accordion ────────────────────────────────────────────────────────────────

/**
 * Accordion — matches Figma "AccordionItem" / "Accordion/Demo" (nodes 60:21).
 * Supports single and multiple expansion modes.
 *
 * @example
 * <Accordion
 *   type="single"
 *   defaultOpen="item-1"
 *   items={[
 *     { value: 'item-1', trigger: 'What are your shipping options?', content: 'We offer standard…' },
 *     { value: 'item-2', trigger: 'What is your return policy?', content: '30-day returns…' },
 *   ]}
 * />
 */
export const Accordion = ({
  items,
  type = 'single',
  defaultOpen,
  className = '',
}: AccordionProps) => {
  const initial = React.useMemo<Set<string>>(() => {
    if (!defaultOpen) return new Set()
    return new Set(Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen])
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [open, setOpen] = React.useState<Set<string>>(initial)

  const toggle = (value: string) => {
    setOpen(prev => {
      const next = new Set(prev)
      if (next.has(value)) {
        next.delete(value)
      } else {
        if (type === 'single') next.clear()
        next.add(value)
      }
      return next
    })
  }

  return (
    <div className={['w-full', className].join(' ')}>
      {items.map(item => {
        const isOpen = open.has(item.value)
        const triggerId = `accordion-trigger-${item.value}`
        const contentId = `accordion-content-${item.value}`

        return (
          <div
            key={item.value}
            className="border-b border-[var(--border)] first:border-t"
          >
            {/* Trigger */}
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggle(item.value)}
              className={[
                'flex w-full items-center justify-between',
                'py-4 pr-0 text-left',
                'text-[14px] font-medium leading-[20px] text-[var(--foreground)]',
                'hover:text-[var(--foreground)] transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-1 rounded-sm',
              ].join(' ')}
            >
              <span className="flex-1 pr-4">{item.trigger}</span>
              <Chevron open={isOpen} />
            </button>

            {/* Content — height animation via grid trick */}
            <div
              id={contentId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className={[
                'overflow-hidden text-[14px] font-normal leading-[20px] text-[var(--muted-foreground)]',
                isOpen ? 'pb-4' : '',
              ].join(' ')}
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}

Accordion.displayName = 'Accordion'
