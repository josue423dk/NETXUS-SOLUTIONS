import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { Link, useLocation } from "react-router-dom"
import { LimelightNav } from "../ui/limelight-nav"
import { Logo } from "../ui/Logo"
import { CinematicThemeSwitcher } from "../ui/cinematic-theme-switcher"
import { navLinks } from "../../data/navigation"
import { useActiveSection } from "../../hooks/useActiveSection"
import { Briefcase, FileText, Package, Users, UserPlus, HelpCircle } from "lucide-react"

const iconMap: Record<string, React.ReactElement> = {
  "#trabajos": <Briefcase />,
  "#cotizacion": <FileText />,
  "#planes": <Package />,
  "#quienes-somos": <Users />,
  "#integrantes": <UserPlus />,
  "#preguntas-frecuentes": <HelpCircle />,
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()
  const hashIds = navLinks
    .filter((l) => l.href.startsWith("#"))
    .map((l) => l.href.slice(1))
  const activeSection = useActiveSection(hashIds)

  const activeIndex = useMemo(() => {
    if (!activeSection) return -1
    const idx = hashIds.indexOf(activeSection)
    return idx >= 0 ? idx : -1
  }, [activeSection, hashIds])

  const handleHashClick = useCallback((href: string) => () => {
    if (pathname === "/") {
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: "smooth" })
    }
  }, [pathname])

  const limelightItems = useMemo(() =>
    navLinks.map((link) => ({
      id: link.href,
      icon: iconMap[link.href] || <Briefcase />,
      label: link.label,
      onClick: link.href.startsWith("#") ? handleHashClick(link.href) : undefined,
    })),
  [handleHashClick])

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

          <div className="hidden md:flex items-center">
            <LimelightNav
              items={limelightItems}
              defaultActiveIndex={activeIndex >= 0 ? activeIndex : 0}
              className="bg-transparent border-none h-auto gap-0"
              iconContainerClassName="p-3"
              iconClassName=""
            />
          </div>

          <div className="flex items-center gap-3">
            <CinematicThemeSwitcher />
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
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    setOpen(false)
                    const el = document.querySelector(link.href)
                    el?.scrollIntoView({ behavior: "smooth" })
                  }}
                  role="menuitem"
                  className={`flex items-center gap-3 text-sm transition-colors ${
                    isActiveSection
                      ? "text-primary-700 font-semibold"
                      : "text-neutral-700 hover:text-primary-900"
                  }`}
                >
                  {iconMap[link.href]}
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-3 text-sm text-neutral-700 hover:text-primary-900 transition-colors"
                >
                  {iconMap[link.href]}
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
