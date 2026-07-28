import { Link } from "react-router-dom"
import type { ReactNode } from "react"

type Variant = "primary" | "secondary" | "outline" | "ghost"
type Size = "sm" | "md" | "lg"

interface ButtonPrimaryProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  href?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
  onClick?: () => void
  ariaLabel?: string
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary-700 text-white hover:bg-primary-500 focus-visible:ring-2 focus-visible:ring-primary-700/50 active:bg-primary-900",
  secondary:
    "bg-transparent border-2 border-primary-700 text-primary-700 hover:bg-primary-700/10 focus-visible:ring-2 focus-visible:ring-primary-700/30 active:bg-primary-700/20",
  outline:
    "bg-transparent border border-neutral-300 text-neutral-700 hover:border-primary-700 hover:text-primary-700 focus-visible:ring-2 focus-visible:ring-primary-700/30 active:bg-neutral-100",
  ghost:
    "bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-primary-900 focus-visible:ring-2 focus-visible:ring-primary-700/30 active:text-primary-700",
}

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-xs rounded-lg gap-1.5",
  md: "px-6 py-3 text-sm rounded-lg gap-2",
  lg: "px-8 py-4 text-base rounded-lg gap-2.5",
}

export function ButtonPrimary({
  children,
  variant = "primary",
  size = "md",
  href,
  type: btnType = "button",
  disabled = false,
  className = "",
  onClick,
  ariaLabel,
}: ButtonPrimaryProps) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"

  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto")
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      )
    }
    return (
      <Link to={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={btnType}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}