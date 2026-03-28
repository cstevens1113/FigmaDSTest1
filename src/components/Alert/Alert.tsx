import React from 'react'

export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  icon?: React.ReactNode
}

const variants: Record<AlertVariant, string> = {
  default:
    'bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]',
  destructive:
    'bg-[#fef2f2] border-[#fecaca] text-[#991b1b]',
  success:
    'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]',
  warning:
    'bg-[#fffbeb] border-[#fde68a] text-[#92400e]',
}

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  default: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  destructive: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  success: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  warning: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'default',
  icon,
  className = '',
  children,
  ...props
}) => (
  <div
    role="alert"
    className={['flex gap-3 rounded-xl border p-4', variants[variant], className].join(' ')}
    {...props}
  >
    <span className="flex-shrink-0 mt-0.5">{icon ?? defaultIcons[variant]}</span>
    <div className="flex flex-col gap-1 text-[14px] leading-[20px]">{children}</div>
  </div>
)

export const AlertTitle: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  ...props
}) => (
  <p className={['font-semibold leading-[20px]', className].join(' ')} {...props} />
)

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  ...props
}) => (
  <p className={['opacity-80 text-[13px] leading-[18px]', className].join(' ')} {...props} />
)
