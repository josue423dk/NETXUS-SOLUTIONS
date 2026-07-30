import { Link } from "react-router-dom"
import type { ReactNode } from "react"
import { buttonVariants } from "./button"
import { cn } from "../../lib/utils"

type Variant = "primary" | "secondary" | "outline" | "ghost"
type Size = "sm" | "md" | "lg"

const variantMap: Record<Variant, NonNullable<Parameters<typeof buttonVariants>[0]>["variant"]> = {
  primary: "default",
  secondary: "secondary",
  outline: "outline",
  ghost: "ghost",
}

const sizeMap: Record<Size, NonNullable<Parameters<typeof buttonVariants>[0]>["size"]> = {
  sm: "sm",
  md: "default",
  lg: "lg",
}

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
  const classes = cn(
    buttonVariants({ variant: variantMap[variant], size: sizeMap[size], className })
  )

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto")
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
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
    <button type={btnType} disabled={disabled} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
