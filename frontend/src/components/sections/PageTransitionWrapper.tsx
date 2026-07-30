import type { ReactNode } from "react"
import { useMediaQuery } from "../../hooks/use-media-query"

interface PageTransitionWrapperProps {
  isActive: boolean
  isNavigating: boolean
  navDirection: "down" | "up" | null
  scrollDirection: "down" | "up" | null
  index: number
  className?: string
  children: ReactNode
}

function getDirection(
  navDirection: string | null,
  scrollDirection: string | null
): string {
  return navDirection ?? scrollDirection ?? ""
}

export function PageTransitionWrapper({
  isActive,
  isNavigating,
  navDirection,
  scrollDirection,
  index,
  className = "",
  children,
}: PageTransitionWrapperProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (!isDesktop) {
    return <div className={className}>{children}</div>
  }

  const direction = getDirection(navDirection, scrollDirection)
  const isEntering = isNavigating && isActive
  const isExiting = isNavigating && !isActive
  const dirClass = direction ? `dir-${direction}` : ""

  const classes = [
    "page-section",
    isActive ? "sec-active" : "sec-inactive",
    isEntering ? "sec-entering" : "",
    isExiting ? "sec-exiting" : "",
    dirClass,
    `sec-index-${index}`,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      className={classes}
      style={{ "--stagger-index": index } as React.CSSProperties}
    >
      {children}
    </div>
  )
}