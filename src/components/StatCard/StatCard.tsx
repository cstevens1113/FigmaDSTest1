import React from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type StatCardTrend = 'up' | 'down' | 'neutral'

export interface SparkPoint {
  value: number
}

export interface StatCardProps {
  /** Card label (e.g. "Total Revenue") */
  title: string
  /** Primary displayed value (e.g. "$84,230") */
  value: string
  /** Change label (e.g. "+12.5%") */
  change?: string
  /** Direction of the change — drives colour */
  trend?: StatCardTrend
  /** Supporting sub-text below the value */
  description?: string
  /** Optional data points for the mini sparkline bar chart */
  sparkline?: SparkPoint[]
  className?: string
}

// ─── Colour maps ──────────────────────────────────────────────────────────────

const trendBg: Record<StatCardTrend, string> = {
  up:      'bg-[#eef2ff] text-[var(--primary)]',          // indigo/50
  down:    'bg-[#fef2f2] text-[#dc2626]',                 // red/50
  neutral: 'bg-[var(--secondary)] text-[var(--foreground)]',
}

const barColor: Record<StatCardTrend, string> = {
  up:      'bg-[var(--primary)]',
  down:    'bg-[#dc2626]',
  neutral: 'bg-[var(--muted-foreground)]',
}

const barOpacity = 'opacity-25 group-last:opacity-100'

// ─── StatCard ─────────────────────────────────────────────────────────────────

/**
 * KPI / Stat card — matches the Dashboard KPI cards pattern.
 * Shows a title, large value, trend badge, description, and optional sparkline.
 *
 * @example
 * <StatCard
 *   title="Total Revenue"
 *   value="$84,230"
 *   change="+12.5%"
 *   trend="up"
 *   description="vs. last month"
 *   sparkline={[{value:14},{value:22},{value:18},{value:30},{value:26},{value:32}]}
 * />
 */
export const StatCard = ({
  title,
  value,
  change,
  trend = 'neutral',
  description,
  sparkline,
  className = '',
}: StatCardProps) => {
  const maxVal = sparkline ? Math.max(...sparkline.map(p => p.value), 1) : 1

  return (
    <div
      className={[
        'flex flex-col gap-2 p-5 bg-[var(--card)] rounded-lg border border-[var(--border)]',
        'shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]',
        className,
      ].join(' ')}
    >
      {/* Title row + trend pill */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-medium text-[var(--muted-foreground)]">{title}</span>
        {change && (
          <span className={['text-[12px] font-medium px-2 py-0.5 rounded-full', trendBg[trend]].join(' ')}>
            {change}
          </span>
        )}
      </div>

      {/* Value */}
      <p className="text-[30px] font-bold leading-none text-[var(--foreground)]">{value}</p>

      {/* Description */}
      {description && (
        <p className="text-[12px] text-[var(--muted-foreground)]">{description}</p>
      )}

      {/* Sparkline */}
      {sparkline && sparkline.length > 0 && (
        <div className="flex items-end gap-[3px] h-9 mt-1">
          {sparkline.map((pt, i) => {
            const pct = (pt.value / maxVal) * 100
            const isLast = i === sparkline.length - 1
            return (
              <div
                key={i}
                className={[
                  'flex-1 rounded-sm transition-opacity',
                  barColor[trend],
                  isLast ? 'opacity-100' : 'opacity-25',
                ].join(' ')}
                style={{ height: `${pct}%` }}
                aria-hidden
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

StatCard.displayName = 'StatCard'

// ─── StatCardGrid ─────────────────────────────────────────────────────────────

export interface StatCardGridProps {
  cards: StatCardProps[]
  columns?: 1 | 2 | 3 | 4
  className?: string
}

/**
 * Responsive grid wrapper for StatCard — 1 col mobile → up to 4 cols desktop.
 *
 * @example
 * <StatCardGrid
 *   columns={3}
 *   cards={[
 *     { title:'Revenue', value:'$84k', change:'+12%', trend:'up' },
 *     { title:'Users',   value:'12.8k',change:'+8%',  trend:'up' },
 *     { title:'Churn',   value:'2.1%', change:'+0.3%',trend:'down' },
 *   ]}
 * />
 */
export const StatCardGrid = ({ cards, columns = 3, className = '' }: StatCardGridProps) => {
  const colClass: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }
  return (
    <div className={['grid gap-6', colClass[columns], className].join(' ')}>
      {cards.map((card, i) => <StatCard key={i} {...card} />)}
    </div>
  )
}

StatCardGrid.displayName = 'StatCardGrid'
