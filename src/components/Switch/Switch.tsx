import React from 'react'

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, className = '', id, ...props }, ref) => {
    const switchId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <label
        htmlFor={switchId}
        className={[
          'inline-flex items-start gap-3 cursor-pointer',
          props.disabled ? 'opacity-50 cursor-not-allowed' : '',
          className,
        ].join(' ')}
      >
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={switchId}
            className="peer sr-only"
            {...props}
          />
          {/* Track */}
          <div
            className={[
              'w-10 h-6 rounded-full border-2 border-transparent bg-[var(--zinc-300)]',
              'transition-colors duration-200',
              'peer-checked:bg-[var(--primary)]',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--ring)] peer-focus-visible:ring-offset-2',
            ].join(' ')}
          />
          {/* Thumb */}
          <div
            className={[
              'absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm',
              'transition-transform duration-200',
              'peer-checked:translate-x-4',
            ].join(' ')}
          />
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

Switch.displayName = 'Switch'
