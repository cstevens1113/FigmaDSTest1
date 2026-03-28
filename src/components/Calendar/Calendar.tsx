import React from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CalendarProps {
  /** Controlled selected date */
  value?: Date | null
  /** Called when the user clicks a day */
  onChange?: (date: Date) => void
  /** Highlight a secondary "today" indicator */
  today?: Date
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  className?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DAYS  = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate()
}

function startOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay() // 0=Sun
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

// ─── Calendar ─────────────────────────────────────────────────────────────────

/**
 * Month-grid Calendar — matches Figma "Calendar" (node 37:2).
 * Selected day: indigo fill · today badge: indigo/10 bg · nav: ‹ › buttons
 *
 * @example
 * const [date, setDate] = React.useState<Date | null>(null)
 * <Calendar value={date} onChange={setDate} today={new Date()} />
 */
export const Calendar = ({
  value,
  onChange,
  today = new Date(),
  minDate,
  maxDate,
  className = '',
}: CalendarProps) => {
  const [viewYear,  setViewYear]  = React.useState(today.getFullYear())
  const [viewMonth, setViewMonth] = React.useState(today.getMonth())

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const firstDow = startOfMonth(viewYear, viewMonth) // 0-6
  const totalDays = daysInMonth(viewYear, viewMonth)

  // Build 6-row × 7-col grid (nulls for padding)
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]
  // Pad to multiple of 7
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks: (number | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    if (minDate && d < minDate) return true
    if (maxDate && d > maxDate) return true
    return false
  }

  return (
    <div
      className={[
        'inline-flex flex-col gap-[6px]',
        'bg-[var(--card)] border border-[var(--border)] rounded-lg',
        'p-4 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.06)]',
        className,
      ].join(' ')}
    >
      {/* Month navigation */}
      <div className="flex items-center justify-between h-8 w-[252px]">
        <button
          type="button"
          aria-label="Previous month"
          onClick={prevMonth}
          className="flex items-center justify-center size-7 rounded-md bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        >
          <span className="text-[16px] leading-none select-none" aria-hidden>‹</span>
        </button>
        <span className="text-[14px] font-semibold text-[var(--foreground)]">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          aria-label="Next month"
          onClick={nextMonth}
          className="flex items-center justify-center size-7 rounded-md bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        >
          <span className="text-[16px] leading-none select-none" aria-hidden>›</span>
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="flex gap-1">
        {DAYS.map(d => (
          <div key={d} className="flex items-center justify-center size-8">
            <span className="text-[12px] font-medium text-[var(--muted-foreground)]">{d}</span>
          </div>
        ))}
      </div>

      {/* Weeks */}
      {weeks.map((week, wi) => (
        <div key={wi} className="flex gap-1">
          {week.map((day, di) => {
            if (!day) return <div key={di} className="size-8 rounded-md" />

            const date = new Date(viewYear, viewMonth, day)
            const isSelected = value ? isSameDay(date, value) : false
            const isToday    = today ? isSameDay(date, today) : false
            const disabled   = isDisabled(day)

            return (
              <button
                key={di}
                type="button"
                aria-label={`${MONTHS[viewMonth]} ${day}, ${viewYear}`}
                aria-pressed={isSelected}
                disabled={disabled}
                onClick={() => !disabled && onChange?.(date)}
                className={[
                  'flex items-center justify-center size-8 rounded-md',
                  'text-[13px] transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
                  disabled
                    ? 'opacity-30 cursor-not-allowed text-[var(--foreground)]'
                    : isSelected
                    ? 'bg-[var(--primary)] text-white font-semibold cursor-pointer'
                    : isToday
                    ? 'bg-[var(--indigo-50)] text-[var(--primary)] font-medium cursor-pointer hover:bg-[var(--indigo-100)]'
                    : 'text-[var(--foreground)] font-normal cursor-pointer hover:bg-[var(--accent)]',
                ].join(' ')}
              >
                {day}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

Calendar.displayName = 'Calendar'
