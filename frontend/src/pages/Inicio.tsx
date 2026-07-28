import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { PageTransitionWrapper } from "../components/sections/PageTransitionWrapper"
import { useScrollPageTransition } from "../hooks/useScrollPageTransition"
import { PersistentBackground } from "../components/sections/PersistentBackground"
import { FloatingRobot } from "../components/sections/FloatingRobot"
import { Hero } from "../components/sections/Hero"
import { TrabajosGrid } from "../components/sections/TrabajosGrid"
import { Spinner } from "../components/ui/Spinner"
import { lazy, Suspense } from "react"

const Cotizacion = lazy(() => import("./Cotizacion").then((m) => ({ default: m.Cotizacion })))
const Integrantes = lazy(() => import("./Integrantes").then((m) => ({ default: m.Integrantes })))
const PreguntasFrecuentes = lazy(() => import("./PreguntasFrecuentes").then((m) => ({ default: m.PreguntasFrecuentes })))
const QuienesSomos = lazy(() => import("./QuienesSomos").then((m) => ({ default: m.QuienesSomos })))
const PricingSection = lazy(() => import("../components/sections/PricingSection").then((m) => ({ default: m.PricingSection })))

const SECTION_IDS = [
  "hero",
  "trabajos",
  "cotizacion",
  "planes",
  "quienes-somos",
  "integrantes",
  "preguntas-frecuentes",
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
    sectionIds: [...SECTION_IDS],
  })

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1)
      const idx = SECTION_IDS.indexOf(targetId as (typeof SECTION_IDS)[number])
      if (idx >= 0) {
        setTimeout(() => {
          scrollToSection(idx)
        }, 150)
      }
    }
  }, [hash, scrollToSection])

  return (
    <div>
      <PersistentBackground />
      <FloatingRobot />

      <PageTransitionWrapper
        isActive={activeIndex === 0}
        isNavigating={navigating}
        navDirection={navDirection}
        scrollDirection={scrollDirection}
        index={0}
      >
        <div
          id="hero"
          ref={(el) => registerSection(0, el)}
          className="min-h-screen"
        >
          <Hero />
        </div>
      </PageTransitionWrapper>

      <PageTransitionWrapper
        isActive={activeIndex === 1}
        isNavigating={navigating}
        navDirection={navDirection}
        scrollDirection={scrollDirection}
        index={1}
      >
        <div
          id="trabajos"
          ref={(el) => registerSection(1, el)}
          className="min-h-screen"
        >
          <TrabajosGrid />
        </div>
      </PageTransitionWrapper>

      <PageTransitionWrapper
        isActive={activeIndex === 2}
        isNavigating={navigating}
        navDirection={navDirection}
        scrollDirection={scrollDirection}
        index={2}
      >
        <div
          id="cotizacion"
          ref={(el) => registerSection(2, el)}
          className="min-h-screen"
        >
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Spinner /></div>}>
            <Cotizacion />
          </Suspense>
        </div>
      </PageTransitionWrapper>

      <PageTransitionWrapper
        isActive={activeIndex === 3}
        isNavigating={navigating}
        navDirection={navDirection}
        scrollDirection={scrollDirection}
        index={3}
      >
        <div
          id="planes"
          ref={(el) => registerSection(3, el)}
          className="min-h-screen"
        >
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Spinner /></div>}>
            <PricingSection />
          </Suspense>
        </div>
      </PageTransitionWrapper>

      <PageTransitionWrapper
        isActive={activeIndex === 4}
        isNavigating={navigating}
        navDirection={navDirection}
        scrollDirection={scrollDirection}
        index={4}
      >
        <div
          id="quienes-somos"
          ref={(el) => registerSection(4, el)}
          className="min-h-screen"
        >
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Spinner /></div>}>
            <QuienesSomos />
          </Suspense>
        </div>
      </PageTransitionWrapper>

      <PageTransitionWrapper
        isActive={activeIndex === 5}
        isNavigating={navigating}
        navDirection={navDirection}
        scrollDirection={scrollDirection}
        index={5}
      >
        <div
          id="integrantes"
          ref={(el) => registerSection(5, el)}
          className="min-h-screen"
        >
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Spinner /></div>}>
            <Integrantes />
          </Suspense>
        </div>
      </PageTransitionWrapper>

      <PageTransitionWrapper
        isActive={activeIndex === 6}
        isNavigating={navigating}
        navDirection={navDirection}
        scrollDirection={scrollDirection}
        index={6}
      >
        <div
          id="preguntas-frecuentes"
          ref={(el) => registerSection(6, el)}
          className="min-h-screen"
        >
          <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Spinner /></div>}>
            <PreguntasFrecuentes />
          </Suspense>
        </div>
      </PageTransitionWrapper>
    </div>
  )
}
