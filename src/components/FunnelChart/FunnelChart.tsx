import React from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────

export interface FunnelStep {
  label: string
  count: number
  /** Percentage of the first (top) step. Computed automatically if omitted. */
  pct?: number
}

export interface FunnelChartProps {
  steps: FunnelStep[]
  /** Colour of the funnel bars. Defaults to the primary CSS variable. */
  color?: string
  className?: string
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `${(n / 1_000).toFixed(1)}K`
    : String(n)

// ── Component ──────────────────────────────────────────────────────────────────

export const FunnelChart = ({
  steps,
  color = 'var(--primary)',
  className = '',
}: FunnelChartProps) => {
  if (!steps.length) return null

  const top = steps[0].count

  const resolved = steps.map((s) => ({
    ...s,
    pct: s.pct !== undefined ? s.pct : Math.round((s.count / top) * 100),
  }))

  return (
    <div className={`flex flex-col gap-0 ${className}`}>
      {resolved.map((step, i) => {
        const next = resolved[i + 1]
        const dropOff =
          next !== undefined
            ? Math.round(((step.count - next.count) / step.count) * 100)
            : null

        /* Bar width scales linearly from 100% (top) to the pct value */
        const barWidth = `${step.pct}%`

        return (
          <React.Fragment key={step.label}>
            {/* Step row */}
            <div className="flex items-center gap-3 group">
              {/* Label */}
              <span className="w-24 text-[12px] font-medium text-[var(--muted-foreground)] text-right shrink-0">
                {step.label}
              </span>

              {/* Bar */}
              <div className="flex-1 h-10 rounded-md bg-[var(--muted)] overflow-hidden relative">
                <div
                  className="h-full rounded-md flex items-center px-3 transition-all duration-500"
                  style={{
                    width: barWidth,
                    backgroundColor: color,
                    opacity: 1 - i * 0.12,
                  }}
                >
                  <span className="text-[12px] font-semibold text-white whitespace-nowrap">
                    {fmt(step.count)}
                  </span>
                </div>
              </div>

              {/* Pct label */}
              <span className="w-12 text-[13px] font-semibold text-[var(--foreground)] text-right shrink-0">
                {step.pct}%
              </span>
            </div>

            {/* Drop-off arrow between steps */}
            {dropOff !== null && (
              <div className="flex items-center gap-3 py-0.5">
                <div className="w-24" />
                <div className="flex items-center gap-1.5 pl-3">
                  <svg className="w-3 h-3 text-[var(--muted-foreground)]" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 2v8M3 7l3 3 3-3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[11px] text-[var(--muted-foreground)]">
                    -{dropOff}% drop-off
                  </span>
                </div>
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
