import React, { useState } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface DonutSlice {
  label: string
  value: number
  color: string
}

export interface DonutChartProps {
  slices: DonutSlice[]
  /** Outer radius in px */
  radius?: number
  /** Thickness of the ring in px */
  thickness?: number
  /** Central label — defaults to the total */
  centerLabel?: string
  /** Sub-label below the central label */
  centerSubLabel?: string
  formatValue?: (v: number) => string
  showLegend?: boolean
  className?: string
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const start = polarToCartesian(cx, cy, r, endDeg)
  const end = polarToCartesian(cx, cy, r, startDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`
}

const defaultFmt = (v: number) =>
  v >= 1_000_000
    ? `$${(v / 1_000_000).toFixed(1)}M`
    : v >= 1_000
    ? `$${(v / 1_000).toFixed(0)}K`
    : String(v)

// ── Component ──────────────────────────────────────────────────────────────────

export const DonutChart = ({
  slices,
  radius = 80,
  thickness = 28,
  centerLabel,
  centerSubLabel,
  formatValue = defaultFmt,
  showLegend = true,
  className = '',
}: DonutChartProps) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  if (!slices.length) return null

  const total = slices.reduce((s, d) => s + d.value, 0)
  const cx = radius
  const cy = radius
  const r = radius - thickness / 2
  const size = radius * 2

  /* Build arc paths */
  let cursor = 0
  const arcs = slices.map((s, i) => {
    const pct = total > 0 ? s.value / total : 0
    const sweep = pct * 360
    const start = cursor
    const end = cursor + sweep - (sweep > 1 ? 0.5 : 0) // small gap
    cursor += sweep
    return { ...s, pct, start, end, idx: i }
  })

  const displayLabel =
    centerLabel ??
    formatValue(
      activeIdx !== null ? slices[activeIdx].value : total
    )
  const displaySub =
    activeIdx !== null
      ? slices[activeIdx].label
      : centerSubLabel ?? 'Total'

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* SVG */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {arcs.map((arc) => (
          <path
            key={arc.label}
            d={describeArc(cx, cy, r, arc.start, arc.end)}
            stroke={arc.color}
            strokeWidth={
              activeIdx === arc.idx ? thickness + 4 : thickness
            }
            strokeLinecap="round"
            fill="none"
            className="cursor-pointer transition-all duration-150"
            onMouseEnter={() => setActiveIdx(arc.idx)}
            onMouseLeave={() => setActiveIdx(null)}
          />
        ))}

        {/* Centre text */}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          className="fill-[var(--foreground)] text-[15px] font-semibold"
          style={{ fontSize: 15, fontWeight: 600 }}
        >
          {displayLabel}
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          className="fill-[var(--muted-foreground)]"
          style={{ fontSize: 11 }}
        >
          {displaySub}
        </text>
      </svg>

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-col gap-1.5 w-full">
          {slices.map((s, i) => {
            const pct = total > 0 ? Math.round((s.value / total) * 100) : 0
            return (
              <div
                key={s.label}
                className={`flex items-center gap-2 cursor-default rounded-lg px-2 py-1 transition-colors ${
                  activeIdx === i ? 'bg-[var(--muted)]' : ''
                }`}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                <span
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{ backgroundColor: s.color }}
                />
                <span className="flex-1 text-[12px] text-[var(--foreground)]">
                  {s.label}
                </span>
                <span className="text-[12px] font-medium text-[var(--foreground)]">
                  {formatValue(s.value)}
                </span>
                <span className="text-[11px] text-[var(--muted-foreground)] w-8 text-right">
                  {pct}%
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
