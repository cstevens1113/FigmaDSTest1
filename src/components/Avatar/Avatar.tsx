import React from 'react'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: AvatarSize
}

const sizes: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-[12px]',
  md: 'h-10 w-10 text-[14px]',
  lg: 'h-12 w-12 text-[16px]',
  xl: 'h-16 w-16 text-[20px]',
}

function getInitials(fallback?: string): string {
  if (!fallback) return '?'
  const parts = fallback.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  size = 'md',
  className = '',
  ...props
}) => {
  const [imgError, setImgError] = React.useState(false)

  return (
    <div
      className={[
        'relative inline-flex flex-shrink-0 items-center justify-center',
        'rounded-full overflow-hidden bg-[var(--muted)]',
        'font-medium text-[var(--muted-foreground)]',
        sizes[size],
        className,
      ].join(' ')}
      aria-label={alt ?? fallback}
      {...props}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt ?? fallback ?? ''}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span aria-hidden="true">{getInitials(fallback)}</span>
      )}
    </div>
  )
}
