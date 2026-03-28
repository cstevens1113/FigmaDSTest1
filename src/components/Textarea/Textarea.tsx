import React from 'react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className = '', id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    const base =
      'w-full min-h-[80px] rounded-lg border bg-[var(--background)] px-3 py-2 ' +
      'text-[14px] leading-[20px] text-[var(--foreground)] resize-y transition-colors duration-150 ' +
      'placeholder:text-[var(--muted-foreground)] outline-none ' +
      'focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-0 ' +
      'disabled:cursor-not-allowed disabled:opacity-50'

    const borderState = error
      ? 'border-[var(--destructive)] focus:ring-[var(--destructive)]'
      : 'border-[var(--border)] hover:border-[var(--zinc-400)]'

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-[14px] font-medium leading-[20px] text-[var(--foreground)]"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={[base, borderState, className].join(' ')}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined
          }
          {...props}
        />

        {hint && !error && (
          <p id={`${textareaId}-hint`} className="text-[12px] leading-[16px] text-[var(--muted-foreground)]">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${textareaId}-error`} className="text-[12px] leading-[16px] text-[var(--destructive)]" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
