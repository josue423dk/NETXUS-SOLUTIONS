import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

const PAGE_TRANSITION_MS = 600

export function Layout() {
  const location = useLocation()
  const pathnameRef = useRef(location.pathname)
  const [isTransitioning, setIsTransitioning] = useState(false)

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
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Navbar />
      <main
        className={
          isTransitioning ? "page-transitioning-route" : "page-visible"
        }
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}