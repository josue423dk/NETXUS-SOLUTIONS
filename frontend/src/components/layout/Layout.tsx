import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useRef, useState, lazy, Suspense } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

const PersistentBackground = lazy(() => import("../sections/PersistentBackground").then((m) => ({ default: m.PersistentBackground })))
const FloatingRobot = lazy(() => import("../sections/FloatingRobot").then((m) => ({ default: m.FloatingRobot })))

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
    <div className="min-h-screen bg-neutral-50 text-neutral-700">
      <Suspense fallback={null}><PersistentBackground /></Suspense>
      <Suspense fallback={null}><FloatingRobot /></Suspense>
      <header>
        <Navbar />
      </header>
      <main
        id="main-content"
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
