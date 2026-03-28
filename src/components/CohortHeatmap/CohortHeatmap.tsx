import React from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface CohortRow {
  /** Label for this cohort, e.g. "Jan 2024" */
  label: string
  /**
   * Retention values for Month 0, 1, 2, … in order.
   * Use `null` to indicate data not yet available (future months).
   */
  values: (number | null)[]
}

export interface CohortHeatmapProps {
  rows: CohortRow[]
  /** Column headers, e.g. ["Month 0","Month 1",…] */
  columnLabels?: string[]
  /** Low-retention colour (0%) */
  colorLow?: string
  /** High-retention colour (100%) */
  colorHigh?: string
  className?: string
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Linearly interpolate between two hex colours. */
function lerpColor(a: string, b: string, t: number): string {
  const parse = (hex: string) => {
    const h = hex.replace('#', '')
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ]
  }
  const [ar, ag, ab] = parse(a)
  const [br, bg, bb] = parse(b)
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const bl2 = Math.round(ab + (bb - ab) * t)
  return `rgb(${r},${g},${bl2})`
}

// ── Component ──────────────────────────────────────────────────────────────────

export const CohortHeatmap = ({
  rows,
  columnLabels,
  colorLow = '#fee2e2',
  colorHigh = '#166534',
  className = '',
}: CohortHeatmapProps) => {
  if (!rows.length) return null

  const maxCols = Math.max(...rows.map((r) => r.values.length))
  const cols =
    columnLabels ??
    Array.from({ length: maxCols }, (_, i) =>
      i === 0 ? 'Month 0' : `Month ${i}`
    )

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr>
            <th className="text-left font-medium text-[var(--muted-foreground)] py-2 pr-3 whitespace-nowrap w-24">
              Cohort
            </th>
            {cols.map((col) => (
              <th
                key={col}
                className="text-center font-medium text-[var(--muted-foreground)] py-2 px-1 whitespace-nowrap min-w-[60px]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="text-[var(--muted-foreground)] py-1 pr-3 font-medium whitespace-nowrap">
                {row.label}
              </td>
              {cols.map((_, ci) => {
                const val = row.values[ci]
                if (val === null || val === undefined) {
                  return (
                    <td
                      key={ci}
                      className="py-1 px-1 text-center rounded"
                    >
                      <span className="block w-full h-8 rounded-md bg-[var(--muted)]" />
                    </td>
                  )
                }
                const t = Math.min(1, Math.max(0, val / 100))
                const bg = lerpColor(colorLow, colorHigh, t)
                const fg = t > 0.55 ? '#ffffff' : '#111827'
                return (
                  <td key={ci} className="py-1 px-1 text-center">
                    <span
                      title={`${val}%`}
                      className="flex items-center justify-center w-full h-8 rounded-md text-[11px] font-semibold transition-transform hover:scale-105 cursor-default"
                      style={{ backgroundColor: bg, color: fg }}
                    >
                      {val}%
                    </span>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
