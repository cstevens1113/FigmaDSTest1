import React from 'react'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className = '', id, ...props }, ref) => {
    const checkId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <label
        htmlFor={checkId}
        className={[
          'inline-flex items-start gap-2.5 cursor-pointer',
          props.disabled ? 'opacity-50 cursor-not-allowed' : '',
          className,
        ].join(' ')}
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={checkId}
            className="peer sr-only"
            {...props}
          />
          {/* Custom checkbox box */}
          <div
            className={[
              'h-4 w-4 rounded-md border-2 border-[var(--border)] bg-[var(--background)]',
              'transition-colors duration-150',
              'peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)]',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ring)] peer-focus-visible:ring-offset-2',
            ].join(' ')}
          />
          {/* Checkmark SVG */}
          <svg
            className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="2 6 5 9 10 3" />
          </svg>
        </div>

        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <span className="text-[14px] font-medium leading-[20px] text-[var(--foreground)]">
                {label}
              </span>
            )}
            {description && (
              <span className="text-[12px] leading-[16px] text-[var(--muted-foreground)]">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
