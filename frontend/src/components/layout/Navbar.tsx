import { useState, useEffect, useCallback, useRef, useMemo } from "react"
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
  const hashIds = useMemo(() =>
    navLinks.filter((l) => l.href.startsWith("#")).map((l) => l.href.slice(1)),
    []
  )
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
    <nav aria-label="Navegación principal" className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[1120px] rounded-full bg-neutral-50/80 dark:bg-neutral-50/80 backdrop-blur-xl shadow-lg border border-neutral-300/50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
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
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-700 rounded-full" aria-hidden="true" />
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
                className="md:hidden text-neutral-900 p-1"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
              >
                  <span className="flex flex-col justify-center items-center w-6 h-6 gap-1.5" aria-hidden="true">
                    <span
                      className={`block h-0.5 w-6 bg-current transition-all duration-300 origin-center ${
                        open ? "rotate-45 translate-y-[4px]" : ""
                      }`}
                    />
                    <span
                      className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                        open ? "opacity-0" : ""
                      }`}
                    />
                    <span
                      className={`block h-0.5 w-6 bg-current transition-all duration-300 origin-center ${
                        open ? "-rotate-45 -translate-y-[4px]" : ""
                      }`}
                    />
                  </span>
              </button>
          </div>
        </div>
      </div>

      {open && (
        <div ref={menuRef} className="md:hidden border-t border-neutral-300/50 rounded-b-3xl overflow-hidden" role="menu">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link, index) => {
              const isHash = link.href.startsWith("#")
              const sectionId = isHash ? link.href.slice(1) : null
              const isActiveSection = isHash && pathname === "/" && activeSection === sectionId
              return isHash ? (
                <HashLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  role="menuitem"
                  style={{ animation: `menuFadeInUp 0.3s ease-out ${index * 50}ms both` }}
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
                  style={{ animation: `menuFadeInUp 0.3s ease-out ${index * 50}ms both` }}
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
