import React from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────

export type AIInsightType = 'positive' | 'warning' | 'info' | 'negative'

export interface AIInsightCardProps {
  /** Short title / headline */
  title: string
  /** Explanatory body text */
  description: string
  /** Confidence 0–100 */
  confidence?: number
  /** Icon badge type — controls colour */
  type?: AIInsightType
  /** Optional call-to-action label */
  action?: string
  onAction?: () => void
  className?: string
}

// ── Palette mapping ────────────────────────────────────────────────────────────

const typeConfig: Record<
  AIInsightType,
  { bg: string; fg: string; barColor: string; icon: React.ReactNode }
> = {
  positive: {
    bg: 'bg-[#dcfce7]',
    fg: 'text-[#16a34a]',
    barColor: '#16a34a',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12ZM5.5 8l1.75 1.75L10.5 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  warning: {
    bg: 'bg-[#fef9c3]',
    fg: 'text-[#ca8a04]',
    barColor: '#ca8a04',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 6v3M8 11h.01M6.3 2.8 1.5 11a1.9 1.9 0 0 0 1.65 2.8h9.7A1.9 1.9 0 0 0 14.5 11L9.7 2.8a1.9 1.9 0 0 0-3.4 0Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  negative: {
    bg: 'bg-[#fee2e2]',
    fg: 'text-[#dc2626]',
    barColor: '#dc2626',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12ZM6 6l4 4M10 6l-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  info: {
    bg: 'bg-[#dbeafe]',
    fg: 'text-[#2563eb]',
    barColor: '#2563eb',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12ZM8 7v4M8 5.5h.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
}

// ── Component ──────────────────────────────────────────────────────────────────

export const AIInsightCard = ({
  title,
  description,
  confidence,
  type = 'info',
  action,
  onAction,
  className = '',
}: AIInsightCardProps) => {
  const cfg = typeConfig[type]

  return (
    <div
      className={`flex flex-col gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:shadow-md transition-shadow ${className}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <span
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${cfg.bg} ${cfg.fg}`}
        >
          {cfg.icon}
        </span>
        <div className="flex flex-col gap-0.5 pt-0.5">
          <p className="text-[13px] font-semibold text-[var(--foreground)] leading-snug">
            {title}
          </p>
          {/* AI badge */}
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[var(--muted-foreground)]">
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1l1.2 2.4L10 4.5 7.6 6.6 8.4 10 6 8.5 3.6 10l.8-3.4L2 4.5l2.8-1.1L6 1Z"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </svg>
            AI Insight
          </span>
        </div>
      </div>

      {/* Body */}
      <p className="text-[12px] text-[var(--muted-foreground)] leading-relaxed">
        {description}
      </p>

      {/* Confidence bar */}
      {confidence !== undefined && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[var(--muted-foreground)]">
              Confidence
            </span>
            <span className="text-[11px] font-semibold text-[var(--foreground)]">
              {confidence}%
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[var(--muted)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${confidence}%`,
                backgroundColor: cfg.barColor,
              }}
            />
          </div>
        </div>
      )}

      {/* Action */}
      {action && (
        <button
          onClick={onAction}
          className={`self-start text-[11px] font-semibold ${cfg.fg} hover:underline`}
        >
          {action} →
        </button>
      )}
    </div>
  )
}
