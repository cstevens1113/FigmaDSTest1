import React from 'react'
import { Calendar } from '../Calendar/Calendar'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DatePickerProps {
  value?: Date | null
  onChange?: (date: Date | null) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  className?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatDate(date: Date): string {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

// ─── DatePicker ───────────────────────────────────────────────────────────────

/**
 * DatePicker — matches Figma "Date Picker" (node 37:123).
 * A trigger button showing the selected date + calendar popover beneath.
 *
 * @example
 * const [date, setDate] = React.useState<Date | null>(null)
 * <DatePicker label="Due date" value={date} onChange={setDate} />
 */
export const DatePicker = ({
  value,
  onChange,
  placeholder = 'Pick a date',
  label,
  disabled = false,
  minDate,
  maxDate,
  className = '',
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false)
  const containerRef    = React.useRef<HTMLDivElement>(null)

  // Close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (date: Date) => {
    onChange?.(date)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className={['relative inline-block w-full max-w-[240px]', className].join(' ')}>
      {label && (
        <label className="block text-[13px] font-medium text-[var(--foreground)] mb-[6px]">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={[
          'flex items-center justify-between w-full h-9 px-3 gap-2',
          'bg-[var(--background)] border rounded-md',
          'text-[14px] transition-all duration-150',
          open
            ? 'border-[var(--primary)] ring-[3px] ring-[var(--primary)]/20'
            : 'border-[var(--border)] hover:border-[var(--zinc-400)]',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <span className="flex items-center gap-2 min-w-0">
          {/* Calendar icon */}
          <span className="flex-shrink-0 size-[14px] rounded-sm bg-[var(--muted-foreground)]" aria-hidden />
          <span className={['truncate', value ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'].join(' ')}>
            {value ? formatDate(value) : placeholder}
          </span>
        </span>
        {/* Chevron */}
        <span className="text-[12px] text-[var(--muted-foreground)] flex-shrink-0 select-none" aria-hidden>▾</span>
      </button>

      {/* Popover calendar */}
      {open && (
        <div
          role="dialog"
          aria-label="Date picker calendar"
          className="absolute top-[calc(100%+4px)] left-0 z-30 animate-[dialogIn_120ms_ease-out]"
        >
          <Calendar
            value={value ?? null}
            onChange={handleSelect}
            today={new Date()}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  )
}

DatePicker.displayName = 'DatePicker'
