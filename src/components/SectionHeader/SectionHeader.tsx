import React from 'react'

export interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  className?: string
}

export const SectionHeader = ({
  title,
  subtitle,
  action,
  className = '',
}: SectionHeaderProps) => {
  return (
    <div className={`flex items-start justify-between gap-4 ${className}`}>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-[15px] font-semibold text-[var(--foreground)] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[13px] text-[var(--muted-foreground)]">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
