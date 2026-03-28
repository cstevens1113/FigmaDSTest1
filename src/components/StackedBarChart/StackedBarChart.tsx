import React, { useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface StackedBarSeries {
  key: string
  label: string
  color: string
}

export interface StackedBarDataPoint {
  label: string
  /** Map of series key → value */
  values: Record<string, number>
}

export interface StackedBarChartProps {
  series: StackedBarSeries[]
  data: StackedBarDataPoint[]
  height?: number
  yAxisLabel?: string
  formatValue?: (v: number) => string
  showLegend?: boolean
  className?: string
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const defaultFmt = (v: number) =>
  v >= 1_000 ? `${(v / 1_000).toFixed(0)}K` : String(v)

// ── Component ──────────────────────────────────────────────────────────────────

export const StackedBarChart = ({
  series,
  data,
  height = 220,
  yAxisLabel,
  formatValue = defaultFmt,
  showLegend = true,
  className = '',
}: StackedBarChartProps) => {
  const [hovered, setHovered] = useState<{ idx: number; key: string } | null>(null)

  if (!data.length || !series.length) return null

  /* Compute stacked totals */
  const totals = data.map((d) =>
    series.reduce((sum, s) => sum + (d.values[s.key] ?? 0), 0)
  )
  const maxTotal = Math.max(...totals, 1)

  /* Nice Y-axis ticks (5 ticks) */
  const yTicks = Array.from({ length: 5 }, (_, i) =>
    Math.round((maxTotal / 4) * (4 - i))
  )

  const barWidth = `${Math.max(8, Math.floor(80 / data.length))}%`

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex gap-2">
        {/* Y-axis */}
        <div
          className="flex flex-col justify-between items-end pr-2 shrink-0"
          style={{ height }}
        >
          {yTicks.map((t) => (
            <span
              key={t}
              className="text-[10px] text-[var(--muted-foreground)] leading-none"
            >
              {formatValue(t)}
            </span>
          ))}
        </div>

        {/* Chart area */}
        <div className="flex-1 relative" style={{ height }}>
          {/* Grid lines */}
          {yTicks.map((t, i) => (
            <div
              key={t}
              className="absolute left-0 right-0 border-t border-dashed border-[var(--border)]"
              style={{ top: `${(i / (yTicks.length - 1)) * 100}%` }}
            />
          ))}

          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-around gap-1 px-1">
            {data.map((d, di) => {
              const total = totals[di]
              let stackOffset = 0

              return (
                <div
                  key={d.label}
                  className="flex flex-col-reverse items-center gap-0"
                  style={{ width: barWidth, height: '100%', justifyContent: 'flex-start', position: 'relative' }}
                >
                  <div
                    className="absolute bottom-0 w-full flex flex-col-reverse overflow-hidden rounded-t-md"
                    style={{ height: `${(total / maxTotal) * 100}%` }}
                  >
                    {series.map((s) => {
                      const val = d.values[s.key] ?? 0
                      const pct = total > 0 ? (val / total) * 100 : 0
                      const isHov = hovered?.idx === di && hovered?.key === s.key
                      return (
                        <div
                          key={s.key}
                          title={`${s.label}: ${formatValue(val)}`}
                          onMouseEnter={() => setHovered({ idx: di, key: s.key })}
                          onMouseLeave={() => setHovered(null)}
                          className="w-full transition-opacity cursor-default"
                          style={{
                            height: `${pct}%`,
                            backgroundColor: s.color,
                            opacity: isHov ? 0.8 : 1,
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-around pl-10 gap-1">
        {data.map((d) => (
          <span
            key={d.label}
            className="text-[10px] text-[var(--muted-foreground)] text-center flex-1"
          >
            {d.label}
          </span>
        ))}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap gap-3 pl-10">
          {series.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-[11px] text-[var(--muted-foreground)]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
