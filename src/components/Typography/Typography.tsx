import React from 'react'

/* ── Shared helper ─────────────────────────────────────── */
function cx(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}

/* ── Display ─────────────────────────────────────────────
   Display 2xl: 60/72 Bold
   Display xl:  48/60 Bold
   Display lg:  36/44 Bold
   Display md:  30/38 Bold
   ─────────────────────────────────────────────────────── */
type DisplaySize = '2xl' | 'xl' | 'lg' | 'md'

const displaySizes: Record<DisplaySize, string> = {
  '2xl': 'text-[60px] leading-[72px] font-bold',
  'xl':  'text-[48px] leading-[60px] font-bold',
  'lg':  'text-[36px] leading-[44px] font-bold',
  'md':  'text-[30px] leading-[38px] font-bold',
}

export interface DisplayProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: DisplaySize
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p'
}

export const Display: React.FC<DisplayProps> = ({
  size = 'xl',
  as: Tag = 'h1',
  className,
  children,
  ...props
}) => (
  <Tag
    className={cx(
      'font-sans text-[var(--foreground)] tracking-tight',
      displaySizes[size],
      className,
    )}
    {...props}
  >
    {children}
  </Tag>
)

/* ── Heading ─────────────────────────────────────────────
   Heading xl: 24/32 Bold
   Heading lg: 20/28 SemiBold
   Heading md: 18/28 SemiBold
   ─────────────────────────────────────────────────────── */
type HeadingSize = 'xl' | 'lg' | 'md'

const headingSizes: Record<HeadingSize, string> = {
  xl: 'text-[24px] leading-[32px] font-bold',
  lg: 'text-[20px] leading-[28px] font-semibold',
  md: 'text-[18px] leading-[28px] font-semibold',
}

const headingTags: Record<HeadingSize, 'h1' | 'h2' | 'h3' | 'h4'> = {
  xl: 'h2',
  lg: 'h3',
  md: 'h4',
}

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: HeadingSize
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Heading: React.FC<HeadingProps> = ({
  size = 'lg',
  as,
  className,
  children,
  ...props
}) => {
  const Tag = as ?? headingTags[size]
  return (
    <Tag
      className={cx(
        'font-sans text-[var(--foreground)]',
        headingSizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

/* ── Text (Body) ─────────────────────────────────────────
   Body lg: 18/28 Regular
   Body md: 16/24 Regular
   Body sm: 14/20 Regular
   ─────────────────────────────────────────────────────── */
type TextSize = 'lg' | 'md' | 'sm'

const textSizes: Record<TextSize, string> = {
  lg: 'text-[18px] leading-[28px] font-normal',
  md: 'text-[16px] leading-[24px] font-normal',
  sm: 'text-[14px] leading-[20px] font-normal',
}

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize
  muted?: boolean
  as?: 'p' | 'span' | 'div'
}

export const Text: React.FC<TextProps> = ({
  size = 'md',
  muted = false,
  as: Tag = 'p',
  className,
  children,
  ...props
}) => (
  <Tag
    className={cx(
      'font-sans',
      textSizes[size],
      muted ? 'text-[var(--muted-foreground)]' : 'text-[var(--foreground)]',
      className,
    )}
    {...props}
  >
    {children}
  </Tag>
)

/* ── Label ───────────────────────────────────────────────
   Label md: 14/20 Medium
   Label sm: 12/18 Medium
   ─────────────────────────────────────────────────────── */
type LabelSize = 'md' | 'sm'

const labelSizes: Record<LabelSize, string> = {
  md: 'text-[14px] leading-[20px] font-medium',
  sm: 'text-[12px] leading-[18px] font-medium',
}

export interface LabelTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: LabelSize
  muted?: boolean
}

export const LabelText: React.FC<LabelTextProps> = ({
  size = 'md',
  muted = false,
  className,
  children,
  ...props
}) => (
  <span
    className={cx(
      'font-sans',
      labelSizes[size],
      muted ? 'text-[var(--muted-foreground)]' : 'text-[var(--foreground)]',
      className,
    )}
    {...props}
  >
    {children}
  </span>
)

/* ── Caption ─────────────────────────────────────────────
   12/16 Regular
   ─────────────────────────────────────────────────────── */
export interface CaptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  muted?: boolean
}

export const Caption: React.FC<CaptionProps> = ({
  muted = true,
  className,
  children,
  ...props
}) => (
  <span
    className={cx(
      'font-sans text-[12px] leading-[16px] font-normal',
      muted ? 'text-[var(--muted-foreground)]' : 'text-[var(--foreground)]',
      className,
    )}
    {...props}
  >
    {children}
  </span>
)
