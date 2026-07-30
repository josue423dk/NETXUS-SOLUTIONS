import { ButtonPrimary } from "./ButtonPrimary"
import type { ReactNode } from "react"

interface ButtonSecondaryProps {
  children: ReactNode
  size?: "sm" | "md" | "lg"
  href?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
  onClick?: () => void
  ariaLabel?: string
}

export function ButtonSecondary(props: ButtonSecondaryProps) {
  return <ButtonPrimary variant="secondary" {...props} />
}
