import { useEffect, lazy, Suspense } from "react"
import { useLocation } from "react-router-dom"
import { PageTransitionWrapper } from "../components/sections/PageTransitionWrapper"
import { useScrollPageTransition } from "../hooks/useScrollPageTransition"
import { Hero } from "../components/sections/Hero"
import { TrabajosGrid } from "../components/sections/TrabajosGrid"
import { Spinner } from "../components/ui/Spinner"

const LazyCotizacion = lazy(() => import("./Cotizacion").then((m) => ({ default: m.Cotizacion })))
const LazyIntegrantes = lazy(() => import("./Integrantes").then((m) => ({ default: m.Integrantes })))
const LazyPreguntasFrecuentes = lazy(() => import("./PreguntasFrecuentes").then((m) => ({ default: m.PreguntasFrecuentes })))
const LazyQuienesSomos = lazy(() => import("./QuienesSomos").then((m) => ({ default: m.QuienesSomos })))
const LazyPricingSection = lazy(() => import("../components/sections/PricingSection").then((m) => ({ default: m.PricingSection })))

function Loader() {
  return <div className="flex items-center justify-center min-h-[60vh]"><Spinner /></div>
}

const SECTIONS = [
  { id: "hero",                Component: Hero },
  { id: "trabajos",            Component: TrabajosGrid },
  { id: "cotizacion",          Component: () => <Suspense fallback={<Loader />}><LazyCotizacion /></Suspense> },
  { id: "planes",              Component: () => <Suspense fallback={<Loader />}><LazyPricingSection /></Suspense> },
  { id: "quienes-somos",       Component: () => <Suspense fallback={<Loader />}><LazyQuienesSomos /></Suspense> },
  { id: "integrantes",         Component: () => <Suspense fallback={<Loader />}><LazyIntegrantes /></Suspense> },
  { id: "preguntas-frecuentes", Component: () => <Suspense fallback={<Loader />}><LazyPreguntasFrecuentes /></Suspense> },
] as const

export function Inicio() {
  const { hash } = useLocation()

  const {
    activeIndex,
    scrollDirection,
    navigating,
    navDirection,
    scrollToSection,
    registerSection,
  } = useScrollPageTransition({
    sectionIds: SECTIONS.map(s => s.id),
  })

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1)
      const idx = SECTIONS.findIndex(s => s.id === targetId)
      if (idx >= 0) {
        setTimeout(() => scrollToSection(idx), 150)
      }
    }
  }, [hash, scrollToSection])

  return (
    <div>
      {SECTIONS.map(({ id, Component }, index) => (
        <PageTransitionWrapper
          key={id}
          isActive={activeIndex === index}
          isNavigating={navigating}
          navDirection={navDirection}
          scrollDirection={scrollDirection}
          index={index}
        >
          <div
            id={id}
            ref={(el) => registerSection(index, el)}
            className="min-h-0 md:min-h-screen"
          >
            <Component />
          </div>
        </PageTransitionWrapper>
      ))}
    </div>
  )
}
