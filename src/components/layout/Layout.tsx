import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { ShaderBackground } from "../ui/adisyon-shader"

const PAGE_TRANSITION_MS = 600

export function Layout() {
  const location = useLocation()
  const pathnameRef = useRef(location.pathname)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { resolvedTheme } = useTheme()
  const isLight = resolvedTheme !== "dark"

  useEffect(() => {
    if (location.pathname !== pathnameRef.current) {
      pathnameRef.current = location.pathname
      setIsTransitioning(true)
      const timer = setTimeout(
        () => setIsTransitioning(false),
        PAGE_TRANSITION_MS
      )
      return () => clearTimeout(timer)
    }
  }, [location])

  return (
    <div className="relative min-h-screen text-neutral-900 dark:bg-neutral-50">
      {isLight && (
        <ShaderBackground className="fixed inset-0 h-full w-full" />
      )}
      <div className="relative z-10">
        <header>
          <Navbar />
        </header>
        <main
          id="main-content"
          className={`pt-14 sm:pt-16 ${
            isTransitioning ? "page-transitioning-route" : "page-visible"
          }`}
        >
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}