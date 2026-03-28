import React from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = 'default' | 'success' | 'warning' | 'destructive'

export interface ToastProps {
  /** Visual style */
  variant?: ToastVariant
  /** Bold heading line */
  title: React.ReactNode
  /** Secondary description line */
  description?: React.ReactNode
  /** Called when the × button is clicked */
  onClose?: () => void
  className?: string
}

export interface ToastItem {
  id: string
  variant?: ToastVariant
  title: React.ReactNode
  description?: React.ReactNode
  /** Auto-dismiss delay in ms (default 4000, set 0 to disable) */
  duration?: number
}

// ─── Config maps ──────────────────────────────────────────────────────────────

const bg: Record<ToastVariant, string> = {
  default:     'bg-[var(--card)] border-[var(--border)]',
  success:     'bg-[#f0fdf4] border-[#bbf7d0]',
  warning:     'bg-[#fffbeb] border-[#fde68a]',
  destructive: 'bg-[#fef2f2] border-[#fecaca]',
}

const iconBg: Record<ToastVariant, string> = {
  default:     'bg-[var(--secondary)]',
  success:     'bg-[#dcfce7]',
  warning:     'bg-[#fef3c7]',
  destructive: 'bg-[#fee2e2]',
}

const iconColor: Record<ToastVariant, string> = {
  default:     'text-[var(--foreground)]',
  success:     'text-[#14532d]',
  warning:     'text-[#92400e]',
  destructive: 'text-[#991b1b]',
}

const titleColor: Record<ToastVariant, string> = {
  default:     'text-[var(--foreground)]',
  success:     'text-[#14532d]',
  warning:     'text-[#92400e]',
  destructive: 'text-[#991b1b]',
}

const descColor: Record<ToastVariant, string> = {
  default:     'text-[var(--muted-foreground)]',
  success:     'text-[#15803d]',
  warning:     'text-[#b45309]',
  destructive: 'text-[#b91c1c]',
}

const iconGlyph: Record<ToastVariant, string> = {
  default:     '💬',
  success:     '✓',
  warning:     '⚠',
  destructive: '✕',
}

// ─── Toast ────────────────────────────────────────────────────────────────────

/**
 * Single toast notification — matches Figma "Toast" component (node 34:85).
 * Variants: default · success · warning · destructive
 *
 * @example
 * <Toast variant="success" title="Saved!" description="Your changes were saved." onClose={() => {}} />
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ variant = 'default', title, description, onClose, className = '' }, ref) => (
    <div
      ref={ref}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={[
        'relative flex items-start gap-3 w-[360px] max-w-full',
        'border rounded-lg p-[14px]',
        'shadow-[0px_4px_12px_0px_rgba(0,0,0,0.10)]',
        bg[variant],
        className,
      ].join(' ')}
    >
      {/* Icon badge */}
      <div className={['flex-shrink-0 flex items-center justify-center size-8 rounded-lg', iconBg[variant]].join(' ')}>
        <span className={['text-[13px] font-bold select-none', iconColor[variant]].join(' ')} aria-hidden>
          {iconGlyph[variant]}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <p className={['text-[14px] font-semibold leading-[20px]', titleColor[variant]].join(' ')}>
          {title}
        </p>
        {description && (
          <p className={['text-[13px] font-normal leading-[18px]', descColor[variant]].join(' ')}>
            {description}
          </p>
        )}
      </div>

      {/* Close */}
      {onClose && (
        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={onClose}
          className="flex-shrink-0 flex items-center justify-center size-4 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        >
          <span className="text-[13px] leading-none select-none" aria-hidden>×</span>
        </button>
      )}
    </div>
  ),
)
Toast.displayName = 'Toast'

// ─── ToastProvider + useToast ─────────────────────────────────────────────────

interface ToastContextValue {
  toast: (item: Omit<ToastItem, 'id'>) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

/**
 * Wrap your app (or demo) with <ToastProvider> to enable imperative toasts via useToast().
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([])

  const dismiss = React.useCallback((id: string) => {
    setItems(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = React.useCallback((item: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    const duration = item.duration ?? 4000
    setItems(prev => [...prev, { ...item, id }])
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration)
    }
  }, [dismiss])

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {/* Viewport — fixed bottom-right */}
      <div
        aria-label="Notifications"
        className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 items-end"
      >
        {items.map(item => (
          <div
            key={item.id}
            className="animate-[toastIn_200ms_ease-out]"
          >
            <Toast
              variant={item.variant}
              title={item.title}
              description={item.description}
              onClose={() => dismiss(item.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

/** Access the imperative toast() / dismiss() API inside <ToastProvider>. */
export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
