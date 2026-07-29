import { useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"

interface HashLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  role?: string
  style?: React.CSSProperties
  tabIndex?: number
}

export function HashLink({ href, children, className, onClick, role, style, tabIndex }: HashLinkProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      onClick?.()
      if (pathname === "/") {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
      } else {
        navigate("/" + href)
      }
    },
    [href, navigate, pathname, onClick]
  )

  return (
    <a href={href} onClick={handleClick} className={className} role={role} style={style} tabIndex={tabIndex}>
      {children}
    </a>
  )
}