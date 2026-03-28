import React from 'react'

/* ── Card root ──────────────────────────────────────────── */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl'
}

const shadowMap: Record<NonNullable<CardProps['shadow']>, string> = {
  none:  '',
  sm:    'shadow-[var(--shadow-sm)]',
  base:  'shadow-[var(--shadow-base)]',
  md:    'shadow-[var(--shadow-md)]',
  lg:    'shadow-[var(--shadow-lg)]',
  xl:    'shadow-[var(--shadow-xl)]',
  '2xl': 'shadow-[var(--shadow-2xl)]',
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ shadow = 'base', className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={[
        'rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]',
        shadowMap[shadow],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  ),
)
Card.displayName = 'Card'

/* ── Card Header ─────────────────────────────────────────── */
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={['flex flex-col gap-1.5 p-6', className].join(' ')}
      {...props}
    />
  ),
)
CardHeader.displayName = 'CardHeader'

/* ── Card Title ──────────────────────────────────────────── */
export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', ...props }, ref) => (
    <h3
      ref={ref}
      className={['text-[18px] font-semibold leading-[28px] text-[var(--foreground)]', className].join(' ')}
      {...props}
    />
  ),
)
CardTitle.displayName = 'CardTitle'

/* ── Card Description ────────────────────────────────────── */
export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = '', ...props }, ref) => (
    <p
      ref={ref}
      className={['text-[14px] leading-[20px] text-[var(--muted-foreground)]', className].join(' ')}
      {...props}
    />
  ),
)
CardDescription.displayName = 'CardDescription'

/* ── Card Content ────────────────────────────────────────── */
export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={['px-6 pb-6', className].join(' ')} {...props} />
  ),
)
CardContent.displayName = 'CardContent'

/* ── Card Footer ─────────────────────────────────────────── */
export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={[
        'flex items-center gap-3 px-6 pb-6 pt-0',
        className,
      ].join(' ')}
      {...props}
    />
  ),
)
CardFooter.displayName = 'CardFooter'
