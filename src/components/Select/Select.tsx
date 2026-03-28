import React from 'react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  hint?: string
  error?: string
  placeholder?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, placeholder, className = '', id, children, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    const wrapperBase =
      'relative flex items-center h-10 w-full rounded-lg border bg-[var(--background)] px-3 ' +
      'text-[14px] leading-[20px] text-[var(--foreground)] transition-colors duration-150 ' +
      'focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--ring)]'

    const wrapperState = error
      ? 'border-[var(--destructive)] focus-within:ring-[var(--destructive)]'
      : 'border-[var(--border)] hover:border-[var(--zinc-400)]'

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-[14px] font-medium leading-[20px] text-[var(--foreground)]"
          >
            {label}
          </label>
        )}

        <div className={[wrapperBase, wrapperState].join(' ')}>
          <select
            ref={ref}
            id={selectId}
            className={[
              'flex-1 bg-transparent outline-none appearance-none cursor-pointer',
              'disabled:cursor-not-allowed disabled:opacity-50',
              className,
            ].join(' ')}
            aria-invalid={!!error}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>

          {/* Chevron icon */}
          <svg
            className="pointer-events-none ml-2 flex-shrink-0 text-[var(--muted-foreground)] h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {hint && !error && (
          <p className="text-[12px] leading-[16px] text-[var(--muted-foreground)]">{hint}</p>
        )}
        {error && (
          <p className="text-[12px] leading-[16px] text-[var(--destructive)]" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'
