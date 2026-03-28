import React from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-50 select-none'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--primary)] text-[var(--primary-foreground)] ' +
    'hover:bg-[#4338ca] active:bg-[#3730a3]',
  secondary:
    'bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] ' +
    'hover:bg-[var(--accent)] active:bg-[var(--zinc-200)]',
  outline:
    'border border-[var(--border)] bg-transparent text-[var(--foreground)] ' +
    'hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] active:bg-[var(--zinc-100)]',
  ghost:
    'bg-transparent text-[var(--foreground)] ' +
    'hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] active:bg-[var(--zinc-200)]',
  destructive:
    'bg-[var(--destructive)] text-[var(--destructive-foreground)] ' +
    'hover:bg-[#dc2626] active:bg-[#b91c1c]',
  link:
    'bg-transparent text-[var(--primary)] underline-offset-4 ' +
    'hover:underline active:text-[#4338ca]',
}

const sizes: Record<ButtonSize, string> = {
  sm:   'h-8 rounded-md px-3 text-[13px] leading-[18px]',
  md:   'h-10 rounded-lg px-4 text-[14px] leading-[20px]',
  lg:   'h-11 rounded-lg px-6 text-[16px] leading-[24px]',
  icon: 'h-10 w-10 rounded-lg',
}

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
)

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      className = '',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[base, variants[variant], sizes[size], className].join(' ')}
        {...props}
      >
        {loading ? <Spinner /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    )
  },
)

Button.displayName = 'Button'
