import React, { useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface FilterChip {
  id: string
  label: string
}

export interface FilterGroup {
  id: string
  label: string
  options: FilterChip[]
}

export interface DateRange {
  label: string
  value: string
}

export interface FilterBarProps {
  /** Preset date range options */
  dateRanges?: DateRange[]
  /** Active date range value */
  activeDateRange?: string
  onDateRangeChange?: (value: string) => void

  /** Filter groups (e.g. Plan, Geography, Channel) */
  filterGroups?: FilterGroup[]
  /** Map of groupId → selected chip ids */
  activeFilters?: Record<string, string[]>
  onFilterChange?: (groupId: string, chipId: string) => void

  /** Whether comparison mode is active */
  compareEnabled?: boolean
  onCompareToggle?: (enabled: boolean) => void

  className?: string
}

const DEFAULT_DATE_RANGES: DateRange[] = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'This year', value: 'ytd' },
  { label: 'All time', value: 'all' },
]

// ── Component ──────────────────────────────────────────────────────────────────

export const FilterBar = ({
  dateRanges = DEFAULT_DATE_RANGES,
  activeDateRange = '30d',
  onDateRangeChange,
  filterGroups = [],
  activeFilters = {},
  onFilterChange,
  compareEnabled = false,
  onCompareToggle,
  className = '',
}: FilterBarProps) => {
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  const handleGroupToggle = (groupId: string) => {
    setOpenGroup(openGroup === groupId ? null : groupId)
  }

  const isChipActive = (groupId: string, chipId: string) =>
    (activeFilters[groupId] ?? []).includes(chipId)

  const activeChipCount = (groupId: string) =>
    (activeFilters[groupId] ?? []).length

  return (
    <div
      className={`flex items-center gap-2 flex-wrap px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] ${className}`}
    >
      {/* Date range pills */}
      <div className="flex items-center gap-1 bg-[var(--muted)] rounded-lg p-1">
        {dateRanges.map((dr) => (
          <button
            key={dr.value}
            onClick={() => onDateRangeChange?.(dr.value)}
            className={`px-3 py-1 rounded-md text-[12px] font-medium transition-all ${
              activeDateRange === dr.value
                ? 'bg-[var(--background)] text-[var(--foreground)] shadow-sm'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            {dr.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-5 w-px bg-[var(--border)]" />

      {/* Filter groups */}
      {filterGroups.map((group) => {
        const count = activeChipCount(group.id)
        const isOpen = openGroup === group.id
        return (
          <div key={group.id} className="relative">
            <button
              onClick={() => handleGroupToggle(group.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-all ${
                count > 0
                  ? 'border-[var(--primary)] bg-[var(--primary)]/8 text-[var(--primary)]'
                  : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--foreground)]'
              }`}
            >
              {group.label}
              {count > 0 && (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[var(--primary)] text-white text-[10px] font-semibold">
                  {count}
                </span>
              )}
              <svg
                className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 mt-1 z-50 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-lg p-2 min-w-[160px] flex flex-col gap-0.5">
                {group.options.map((chip) => {
                  const active = isChipActive(group.id, chip.id)
                  return (
                    <button
                      key={chip.id}
                      onClick={() => {
                        onFilterChange?.(group.id, chip.id)
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] text-left transition-colors ${
                        active
                          ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-medium'
                          : 'text-[var(--foreground)] hover:bg-[var(--muted)]'
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded flex items-center justify-center border flex-shrink-0 ${
                          active
                            ? 'bg-[var(--primary)] border-[var(--primary)]'
                            : 'border-[var(--border)]'
                        }`}
                      >
                        {active && (
                          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M2 5l2.5 2.5L8 3"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      {chip.label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Compare toggle */}
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <span className="text-[12px] font-medium text-[var(--muted-foreground)]">
          Compare
        </span>
        <span
          role="checkbox"
          aria-checked={compareEnabled}
          onClick={() => onCompareToggle?.(!compareEnabled)}
          className={`relative inline-flex h-5 w-9 rounded-full transition-colors cursor-pointer ${
            compareEnabled ? 'bg-[var(--primary)]' : 'bg-[var(--muted-foreground)]/30'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
              compareEnabled ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </span>
      </label>
    </div>
  )
}
