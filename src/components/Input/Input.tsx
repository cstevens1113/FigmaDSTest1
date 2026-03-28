import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, leftElement, rightElement, className = '', id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    const wrapperBase =
      'flex items-center h-10 w-full rounded-lg border bg-[var(--background)] px-3 ' +
      'text-[14px] leading-[20px] text-[var(--foreground)] ' +
      'transition-colors duration-150 ' +
      'focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--ring)] focus-within:ring-offset-0'

    const wrapperState = error
      ? 'border-[var(--destructive)] focus-within:ring-[var(--destructive)]'
      : 'border-[var(--border)] hover:border-[var(--zinc-400)]'

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[14px] font-medium leading-[20px] text-[var(--foreground)]"
          >
            {label}
          </label>
        )}

        <div className={[wrapperBase, wrapperState, className].join(' ')}>
          {leftElement && (
            <span className="mr-2 flex-shrink-0 text-[var(--muted-foreground)]">{leftElement}</span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              'flex-1 bg-transparent outline-none placeholder:text-[var(--muted-foreground)]',
              'disabled:cursor-not-allowed disabled:opacity-50',
            ].join(' ')}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />

          {rightElement && (
            <span className="ml-2 flex-shrink-0 text-[var(--muted-foreground)]">{rightElement}</span>
          )}
        </div>

        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-[12px] leading-[16px] text-[var(--muted-foreground)]">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-[12px] leading-[16px] text-[var(--destructive)]" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
