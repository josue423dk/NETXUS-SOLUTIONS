import { useState, useEffect, useRef, useCallback } from "react"
import { useTheme } from "../../hooks/useTheme"
import { HashLink } from "../ui/HashLink"
import { planes } from "../../data/planes"

import heroBgLight from "../../assets/hero/hero-bg-light.webp"
import heroBgDark from "../../assets/hero/hero-bg-dark.webp"
import heroBgLightMovil from "../../assets/hero/hero-bg-light-movil.webp"
import heroBgDarkMovil from "../../assets/hero/hero-bg-dark-movil.webp"
import heroObjLight from "../../assets/hero/hero-object-light.webp"
import heroObjDark from "../../assets/hero/hero-object-dark.webp"

const MOBILE_BREAKPOINT = 768

function getBgImage(isDark: boolean, isMobile: boolean): string {
  if (isMobile) return isDark ? heroBgDarkMovil : heroBgLightMovil
  return isDark ? heroBgDark : heroBgLight
}

function getInitialBg(): string {
  if (typeof localStorage === "undefined") return heroBgDark
  const saved = localStorage.getItem("theme")
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT
  return getBgImage(saved === "light", isMobile)
}

function getInitialObj(): string {
  if (typeof localStorage === "undefined") return heroObjDark
  const saved = localStorage.getItem("theme")
  return saved === "light" ? heroObjLight : heroObjDark
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function Hero() {
  const { isDark } = useTheme()

  const [bgSrc, setBgSrc] = useState(getInitialBg)
  const [nextBg, setNextBg] = useState<string | null>(null)
  const [showNext, setShowNext] = useState(false)
  const [objectSrc, setObjectSrc] = useState(getInitialObj)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BREAKPOINT)

  const scrollProgressRef = useRef(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const offsetRef = useRef({ x: 0, y: 0 })
  const objElRef = useRef<HTMLDivElement>(null)

  const preloaded = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number>(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY
          const h = window.innerHeight
          const progress = clamp(y / h, 0, 1)
          scrollProgressRef.current = progress
          setScrollProgress(progress)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const newBg = getBgImage(isDark, isMobile)
    const newObj = isDark ? heroObjDark : heroObjLight

    if (newBg === bgSrc) return

    if (!preloaded.current) {
      preloaded.current = true
      const otherThemeBgs = [heroBgLight, heroBgDark, heroBgLightMovil, heroBgDarkMovil]
      const otherObjs = [heroObjLight, heroObjDark]
      ;[...otherThemeBgs, ...otherObjs].forEach((src) => {
        const img = new Image()
        img.src = src
      })
    }

    setObjectSrc(newObj)

    const img = new Image()
    img.onload = () => {
      setNextBg(newBg)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShowNext(true)
        })
      })
      setTimeout(() => {
        setBgSrc(newBg)
        setNextBg(null)
        setShowNext(false)
      }, 500)
    }
    img.src = newBg
  }, [isDark, isMobile, bgSrc])

  const handlePointer = useCallback((clientX: number, clientY: number) => {
    const section = sectionRef.current
    const objEl = objElRef.current
    if (!section || !objEl) return

    const sectionRect = section.getBoundingClientRect()
    const objRect = objEl.getBoundingClientRect()

    const objCenterX = objRect.left + objRect.width / 2 - sectionRect.left
    const objCenterY = objRect.top + objRect.height / 2 - sectionRect.top

    const dx = clientX - sectionRect.left - objCenterX
    const dy = clientY - sectionRect.top - objCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)

    const fleeRadius = 150

    if (distance < fleeRadius && distance > 0) {
      const strength = 1 - distance / fleeRadius
      targetRef.current = {
        x: clamp(-dx * 0.3 * strength, -60, 60),
        y: clamp(-dy * 0.3 * strength, -60, 60),
      }
    } else if (distance >= fleeRadius) {
      targetRef.current = {
        x: clamp(dx * 0.1, -80, 80),
        y: clamp(dy * 0.1, -80, 80),
      }
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onMouseMove = (e: MouseEvent) => {
      handlePointer(e.clientX, e.clientY)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointer(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.08
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.08

      if (
        Math.abs(targetRef.current.x - currentRef.current.x) > 0.05 ||
        Math.abs(targetRef.current.y - currentRef.current.y) > 0.05
      ) {
        offsetRef.current = { x: currentRef.current.x, y: currentRef.current.y }
        if (objElRef.current) {
          objElRef.current.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px) scale(${1 - scrollProgressRef.current * 0.05})`
          objElRef.current.style.opacity = String(1 - scrollProgressRef.current)
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    section.addEventListener("mousemove", onMouseMove, { passive: true })
    section.addEventListener("touchmove", onTouchMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      section.removeEventListener("mousemove", onMouseMove)
      section.removeEventListener("touchmove", onTouchMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handlePointer])

  const featuredPlans = planes.slice(0, 3)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{ opacity: 1 - scrollProgress, transition: "opacity 0.1s" }}
      >
        <img
          src={bgSrc}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {nextBg && (
          <img
            src={nextBg}
            alt=""
            width={1920}
            height={1080}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              showNext ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/70"
        style={{ opacity: 1 - scrollProgress, transition: "opacity 0.1s" }}
      />

      <div
        ref={objElRef}
        className="absolute z-20 animate-float right-[2%] top-[10%] w-[320px] sm:w-[420px] lg:w-[600px] max-md:right-2 max-md:top-16 max-md:w-[220px]"
        style={{
          transform: `translate(${offsetRef.current.x}px, ${offsetRef.current.y}px) scale(${1 - scrollProgress * 0.05})`,
          opacity: 1 - scrollProgress,
          willChange: "transform, opacity",
        }}
      >
        <div
          className="transition-all duration-500 ease-out
            hover:scale-105
            hover:drop-shadow-[0_0_30px_rgba(45,212,191,0.7)]
            dark:hover:drop-shadow-[0_0_20px_rgba(255,184,0,0.4)]"
        >
          <img
            key={isDark ? "obj-dark" : "obj-light"}
            src={objectSrc}
            alt=""
            aria-hidden="true"
            className="w-full h-auto animate-fade-in"
          />
        </div>
      </div>

      <div
        className="relative z-10 h-screen flex items-center px-4 sm:px-6 lg:px-8"
        style={{
          transform: `scale(${1 - scrollProgress * 0.05})`,
          opacity: 1 - scrollProgress,
          pointerEvents: scrollProgress > 0.8 ? "none" : "auto",
          transition: "transform 0.1s, opacity 0.1s",
        }}
      >
        <div className="w-full max-w-7xl mx-auto pt-20 lg:pt-0">
          <div className="lg:max-w-3xl">
            <span
              className="inline-block text-primary-700 dark:text-primary-500 font-accent tracking-[0.2em] text-sm sm:text-base lg:text-lg"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
            >
              CONSULTORÍA EN DESARROLLO DE SOFTWARE
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mt-4 text-white leading-[1.1]"
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)" }}
            >
              Software a medida que{" "}
              <span className="hero-animated-text animate-back-in-up">impulsa tu negocio</span>
            </h1>

            <p
              className="mt-4 text-white/80 text-base sm:text-lg lg:text-xl max-w-xl"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
            >
              Desarrollamos productos digitales escalables, intuitivos y optimizados para convertir ideas en resultados concretos.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {featuredPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-lg backdrop-blur-md border p-4 transition-all duration-300 hover:scale-[1.02] ${
                    plan.destacado
                      ? "bg-primary-700/30 border-primary-500/50"
                      : "bg-white/10 border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-accent tracking-wider text-white/60 uppercase">
                      {plan.nombre}
                    </p>
                    {plan.badge && (
                      <span className="text-[10px] font-accent font-semibold uppercase tracking-wider text-accent-400 dark:text-primary-500">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-2xl sm:text-3xl font-heading font-bold mt-2 text-white">
                    ${plan.precio.toLocaleString("es-AR")}
                    <span className="text-xs font-body text-white/50 font-normal">/{plan.precioPeriodo}</span>
                  </p>
                  <p className="text-xs text-white/60 mt-1.5 leading-relaxed line-clamp-2">
                    {plan.descripción}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="https://wa.me/5491100000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg text-sm hover:bg-green-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg shadow-green-600/30"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Cotizar por WhatsApp
              </a>
              <a
                href="mailto:contacto@monru.ux"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-lg text-sm hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4l-10 8L2 4" />
                </svg>
                Enviar email
              </a>
              <HashLink
                href="#planes"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/40 text-white font-semibold rounded-lg text-sm hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Ver todos los planes
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </HashLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
