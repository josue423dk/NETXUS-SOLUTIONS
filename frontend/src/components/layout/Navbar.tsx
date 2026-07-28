import { useState, useEffect, useCallback, useRef } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { HashLink } from "../ui/HashLink"
import { Logo } from "../ui/Logo"
import { ThemeToggle } from "../ui/ThemeToggle"
import { navLinks } from "../../data/navigation"
import { useActiveSection } from "../../hooks/useActiveSection"

export function Navbar() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()
  const hashIds = navLinks
    .filter((l) => l.href.startsWith("#"))
    .map((l) => l.href.slice(1))
  const activeSection = useActiveSection(hashIds)

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false)
  }, [])

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [open, handleEscape])

  useEffect(() => {
    if (!open) {
      toggleButtonRef.current?.focus()
      return
    }
    const menu = menuRef.current
    if (!menu) return
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length > 0) focusable[0].focus()
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", handleTab)
    return () => document.removeEventListener("keydown", handleTab)
  }, [open])

  return (
    <nav aria-label="Navegación principal" className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/70 dark:bg-neutral-50/70 backdrop-blur-md border-b border-neutral-300 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith("#")
              const sectionId = isHash ? link.href.slice(1) : null
              const isActiveSection = isHash && pathname === "/" && activeSection === sectionId
              return isHash ? (
                <HashLink
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm transition-colors ${
                    isActiveSection
                      ? "text-primary-700 font-semibold"
                      : "text-neutral-700 hover:text-primary-900"
                  }`}
                >
                  {link.label}
                  {isActiveSection && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-700 rounded-full" />
                  )}
                </HashLink>
              ) : (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `text-sm transition-colors ${
                      isActive
                        ? "text-primary-700 font-semibold"
                        : "text-neutral-700 hover:text-primary-900"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              ref={toggleButtonRef}
              className="md:hidden text-neutral-900"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
              ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div ref={menuRef} className="md:hidden bg-neutral-50 border-t border-neutral-300" role="menu">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => {
              const isHash = link.href.startsWith("#")
              const sectionId = isHash ? link.href.slice(1) : null
              const isActiveSection = isHash && pathname === "/" && activeSection === sectionId
              return isHash ? (
                <HashLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  role="menuitem"
                  className={`block text-sm transition-colors ${
                    isActiveSection
                      ? "text-primary-700 font-semibold"
                      : "text-neutral-700 hover:text-primary-900"
                  }`}
                >
                  {link.label}
                </HashLink>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  role="menuitem"
                  className="block text-sm text-neutral-700 hover:text-primary-900 transition-colors"
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
