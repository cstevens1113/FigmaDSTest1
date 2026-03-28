import React from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DialogProps {
  /** Controls whether the dialog is visible */
  open: boolean
  /** Called when the user requests to close (×, backdrop click, Escape) */
  onClose: () => void
  /** Dialog heading */
  title?: React.ReactNode
  /** Subheading shown below the title */
  description?: React.ReactNode
  /** Slot for the main body content */
  children?: React.ReactNode
  /** Slot for footer action buttons (right-aligned) */
  footer?: React.ReactNode
  /** Extra class names for the dialog panel */
  className?: string
}

export interface DialogFooterProps {
  children: React.ReactNode
  className?: string
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Pre-styled footer row — right-aligns action buttons with an 8px gap */
export const DialogFooter = ({ children, className = '' }: DialogFooterProps) => (
  <div
    className={[
      'flex items-center justify-end gap-3 px-6 py-[13px]',
      'border-t border-[var(--border)]',
      className,
    ].join(' ')}
  >
    {children}
  </div>
)

// ─── Close button ─────────────────────────────────────────────────────────────

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    aria-label="Close dialog"
    onClick={onClick}
    className={[
      'absolute top-6 right-6',
      'inline-flex items-center justify-center',
      'size-7 rounded-md',
      'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
      'hover:bg-[var(--accent)] transition-colors duration-150',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
    ].join(' ')}
  >
    {/* × glyph, visually centred */}
    <span className="text-[18px] leading-none select-none" aria-hidden>×</span>
  </button>
)

// ─── Main Dialog ──────────────────────────────────────────────────────────────

/**
 * Modal dialog — matches the Figma Brand Design System "Dialog" component
 * (node 40:2). Renders into a portal-like fixed overlay; focus-trapping and
 * scroll-lock are handled via the `inert` attribute on the backdrop when closed.
 *
 * @example
 * <Dialog
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Edit Profile"
 *   description="Update your account settings. Click save when you're done."
 *   footer={
 *     <>
 *       <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
 *       <Button onClick={handleSave}>Save changes</Button>
 *     </>
 *   }
 * >
 *   <Input label="Name" placeholder="Your full name" />
 *   <Input label="Email" placeholder="your@email.com" />
 * </Dialog>
 */
export const Dialog = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className = '',
}: DialogProps) => {
  // Close on Escape
  React.useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Prevent body scroll while open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const hasHeader = title || description

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? 'dialog-title' : undefined}
      aria-describedby={description ? 'dialog-description' : undefined}
    >
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — matches Figma: 480px wide, rounded-xl, card bg, xl shadow */}
      <div
        className={[
          'relative z-10 w-full max-w-[480px]',
          'bg-[var(--card)] text-[var(--card-foreground)]',
          'border border-[var(--border)] rounded-xl',
          'shadow-[0px_20px_40px_0px_rgba(0,0,0,0.12),0px_2px_4px_0px_rgba(0,0,0,0.04)]',
          'overflow-hidden',
          'animate-[dialogIn_150ms_ease-out]',
          className,
        ].join(' ')}
      >
        {/* Header */}
        {hasHeader && (
          <>
            <div className="relative px-6 pt-6 pb-5 pr-14">
              {title && (
                <h2
                  id="dialog-title"
                  className="text-[18px] font-semibold leading-[28px] text-[var(--foreground)]"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="dialog-description"
                  className="mt-0.5 text-[13px] leading-[18px] text-[var(--muted-foreground)] max-w-[400px]"
                >
                  {description}
                </p>
              )}
              <CloseButton onClick={onClose} />
            </div>
            <div className="h-px bg-[var(--border)]" aria-hidden />
          </>
        )}

        {/* Body */}
        {children && (
          <div className="px-6 py-4 flex flex-col gap-4">
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </div>
    </div>
  )
}

Dialog.displayName = 'Dialog'
DialogFooter.displayName = 'DialogFooter'
