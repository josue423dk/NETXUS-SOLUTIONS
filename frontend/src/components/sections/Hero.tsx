import { useState, useEffect, useRef, useCallback } from "react"
import { useTheme } from "../../hooks/useTheme"

import heroBgLight from "../../assets/hero/hero-bg-light.webp"
import heroBgDark from "../../assets/hero/hero-bg-dark.webp"
import heroBgLightMovil from "../../assets/hero/hero-bg-light-movil.png"
import heroBgDarkMovil from "../../assets/hero/hero-bg-dark-movil.png"
import heroObjLight from "../../assets/hero/hero-object-light.png"
import heroObjDark from "../../assets/hero/hero-object-dark.png"

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

  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const preloaded = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)
  const objRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
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
  }, [isDark, isMobile])

  const handlePointer = useCallback((clientX: number, clientY: number) => {
    const section = sectionRef.current
    const obj = objRef.current
    if (!section || !obj) return

    const sectionRect = section.getBoundingClientRect()
    const objRect = obj.getBoundingClientRect()

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
        setOffset({ x: currentRef.current.x, y: currentRef.current.y })
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

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={bgSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {nextBg && (
          <img
            src={nextBg}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              showNext ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      <div className="absolute inset-0 bg-black/30 dark:bg-black/70" />

        <div
          ref={objRef}
          className="absolute z-20 animate-float right-[2%] top-[10%] w-[320px] sm:w-[420px] lg:w-[600px] max-md:right-2 max-md:top-16 max-md:w-[220px] hero-obj-transition"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
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
              alt="Netxus Solutions — objeto decorativo flotante"
              loading="lazy"
              className="w-full h-auto animate-fade-in"
            />
          </div>
        </div>

        <div className="relative z-10 h-screen flex items-center px-4 sm:px-6">
          <div className="w-full lg:max-w-2xl pt-20 lg:ml-[8%] xl:ml-[10%]">
            <span className="inline-block text-accent-400 dark:text-primary-500 font-semibold tracking-[0.2em] text-sm sm:text-base lg:text-lg" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
              CONSULTORÍA EN DESARROLLO DE SOFTWARE
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold mt-6 text-white leading-[1.1]" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)" }}>
              Transformar ideas en{" "}
              <span className="hero-animated-text animate__animated animate__backInUp">productos digitales</span>
            </h1>

            <p className="mt-8 text-white/90 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-xl" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
              Creamos soluciones digitales escalables, intuitivas y
              optimizadas, priorizando la calidad del código, la experiencia
              de usuario y la eficiencia técnica.
            </p>

            <div className="flex flex-wrap gap-4 sm:gap-5 mt-10">
              <a
                href="#"
                className="inline-flex items-center px-7 sm:px-8 py-3 sm:py-4 bg-primary-700 text-white font-semibold rounded-lg text-base sm:text-lg hover:opacity-90 transition-opacity"
              >
                Empezá tu proyecto
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-4 border-2 border-white/80 text-white font-semibold rounded-lg text-base sm:text-lg hover:bg-white/10 transition-all"
              >
                Ver servicios
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
    </section>
  )
}
