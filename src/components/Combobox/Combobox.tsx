import React from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ComboboxOption {
  value: string
  label: string
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
}

// ─── Combobox ─────────────────────────────────────────────────────────────────

/**
 * Searchable select (Combobox) — matches Figma "Combobox" (node 40:23).
 * Filters options by typed query; shows check-mark next to selected item;
 * keyboard navigable (↑ ↓ Enter Escape).
 *
 * @example
 * const [fw, setFw] = React.useState('')
 * <Combobox
 *   label="Framework"
 *   placeholder="Search frameworks…"
 *   options={[
 *     { value: 'next', label: 'Next.js' },
 *     { value: 'svelte', label: 'SvelteKit' },
 *   ]}
 *   value={fw}
 *   onChange={setFw}
 * />
 */
export const Combobox = ({
  options,
  value = '',
  onChange,
  placeholder = 'Search…',
  label,
  disabled = false,
  className = '',
}: ComboboxProps) => {
  const [open, setOpen]   = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [cursor, setCursor] = React.useState(-1)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef  = React.useRef<HTMLUListElement>(null)

  const selectedLabel = options.find(o => o.value === value)?.label ?? ''

  const filtered = query
    ? options.filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
    : options

  const openDropdown = () => {
    if (disabled) return
    setOpen(true)
    setQuery('')
    setCursor(-1)
  }

  const closeDropdown = () => {
    setOpen(false)
    setQuery('')
    setCursor(-1)
  }

  const select = (opt: ComboboxOption) => {
    onChange?.(opt.value)
    closeDropdown()
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); openDropdown() }
      return
    }
    if (e.key === 'Escape') { e.preventDefault(); closeDropdown(); inputRef.current?.blur(); return }
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(c + 1, filtered.length - 1)); return }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)); return }
    if (e.key === 'Enter' && cursor >= 0 && filtered[cursor]) {
      e.preventDefault()
      select(filtered[cursor])
    }
  }

  // Close on outside click
  const containerRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Scroll highlighted item into view
  React.useEffect(() => {
    if (cursor >= 0 && listRef.current) {
      const el = listRef.current.children[cursor] as HTMLElement
      el?.scrollIntoView({ block: 'nearest' })
    }
  }, [cursor])

  return (
    <div ref={containerRef} className={['relative w-full max-w-[240px]', className].join(' ')}>
      {label && (
        <label className="block text-[13px] font-medium text-[var(--foreground)] mb-[6px]">
          {label}
        </label>
      )}

      {/* Trigger input */}
      <div
        className={[
          'flex items-center h-9 px-3 gap-2',
          'bg-[var(--background)] border rounded-md',
          'text-[14px] cursor-pointer transition-all duration-150',
          open
            ? 'border-[var(--primary)] ring-[3px] ring-[var(--primary)]/20'
            : 'border-[var(--border)] hover:border-[var(--zinc-400)]',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
        ].join(' ')}
        onClick={() => (open ? closeDropdown() : openDropdown())}
      >
        {/* Search icon placeholder */}
        <div className="flex-shrink-0 size-[14px] rounded-sm bg-[var(--muted-foreground)]" aria-hidden />

        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] cursor-pointer"
          placeholder={open ? placeholder : (selectedLabel || placeholder)}
          value={open ? query : (selectedLabel || '')}
          readOnly={!open}
          disabled={disabled}
          onChange={e => setQuery(e.target.value)}
          onFocus={openDropdown}
          onKeyDown={handleKeyDown}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className={[
            'absolute top-[calc(100%+4px)] left-0 right-0 z-20',
            'bg-[var(--card)] border border-[var(--border)] rounded-md',
            'shadow-[0px_4px_8px_0px_rgba(0,0,0,0.08)]',
            'py-1 max-h-52 overflow-y-auto',
            'animate-[dialogIn_120ms_ease-out]',
          ].join(' ')}
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-[13px] text-[var(--muted-foreground)]">No results found.</li>
          ) : (
            filtered.map((opt, i) => {
              const isSelected = opt.value === value
              const isHighlit  = i === cursor
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => select(opt)}
                  onMouseEnter={() => setCursor(i)}
                  className={[
                    'flex items-center gap-2 mx-1 px-2 h-8 rounded cursor-pointer select-none',
                    'text-[14px] transition-colors duration-100',
                    isHighlit || isSelected
                      ? 'bg-[var(--indigo-50)] text-[var(--primary)]'
                      : 'text-[var(--foreground)] hover:bg-[var(--accent)]',
                    isSelected ? 'font-medium' : 'font-normal',
                  ].join(' ')}
                >
                  {/* Check */}
                  <span className={['size-[14px] flex-shrink-0', isSelected ? 'opacity-100' : 'opacity-0'].join(' ')} aria-hidden>
                    ✓
                  </span>
                  {opt.label}
                </li>
              )
            })
          )}
        </ul>
      )}
    </div>
  )
}

Combobox.displayName = 'Combobox'
