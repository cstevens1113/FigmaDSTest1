import React from 'react'

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
}

const base =
  'inline-flex items-center gap-1.5 font-medium rounded-full transition-colors'

const variants: Record<BadgeVariant, string> = {
  default:
    'bg-[var(--primary)] text-[var(--primary-foreground)]',
  secondary:
    'bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)]',
  outline:
    'border border-[var(--border)] text-[var(--foreground)] bg-transparent',
  destructive:
    'bg-[var(--destructive)] text-[var(--destructive-foreground)]',
  success:
    'bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]',
  warning:
    'bg-[#fef9c3] text-[#854d0e] border border-[#fef08a]',
}

const sizes: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[11px] leading-[16px]',
  md: 'px-2.5 py-0.5 text-[12px] leading-[18px]',
}

const dotColors: Record<BadgeVariant, string> = {
  default:     'bg-[var(--primary-foreground)]',
  secondary:   'bg-[var(--muted-foreground)]',
  outline:     'bg-[var(--muted-foreground)]',
  destructive: 'bg-[var(--destructive-foreground)]',
  success:     'bg-[#16a34a]',
  warning:     'bg-[#ca8a04]',
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', dot = false, className = '', children, ...props }, ref) => (
    <span
      ref={ref}
      className={[base, variants[variant], sizes[size], className].join(' ')}
      {...props}
    >
      {dot && (
        <span
          className={['inline-block w-1.5 h-1.5 rounded-full flex-shrink-0', dotColors[variant]].join(' ')}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  ),
)

Badge.displayName = 'Badge'
