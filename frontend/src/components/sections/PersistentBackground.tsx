import { useEffect, useRef, useState } from "react"
import { useTheme } from "../../hooks/useTheme"

import heroBgLight from "../../assets/hero/hero-bg-light.webp"
import heroBgDark from "../../assets/hero/hero-bg-dark.webp"
import heroBgLightMovil from "../../assets/hero/hero-bg-light-movil.webp"
import heroBgDarkMovil from "../../assets/hero/hero-bg-dark-movil.webp"

const MOBILE_BREAKPOINT = 768
const MAX_BLUR = 20
const IMG_NATURAL = { desktop: { w: 1672, h: 941 }, mobile: { w: 853, h: 1844 } }

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

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function PersistentBackground() {
  const { isDark } = useTheme()
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BREAKPOINT)
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth)
  const [bgSrc, setBgSrc] = useState(getInitialBg)
  const [nextBg, setNextBg] = useState<string | null>(null)
  const [showNext, setShowNext] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const blurRef = useRef(0)
  const preloaded = useRef(false)

  const natural = isMobile ? IMG_NATURAL.mobile : IMG_NATURAL.desktop
  const scale = viewportWidth / natural.w

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      setViewportWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const newBg = getBgImage(isDark, isMobile)
    if (newBg === bgSrc) return

    if (!preloaded.current) {
      preloaded.current = true
      ;[heroBgLight, heroBgDark, heroBgLightMovil, heroBgDarkMovil].forEach((src) => {
        const img = new Image()
        img.src = src
      })
    }

    const img = new Image()
    img.onload = () => {
      setNextBg(newBg)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShowNext(true))
      })
      setTimeout(() => {
        setBgSrc(newBg)
        setNextBg(null)
        setShowNext(false)
      }, 500)
    }
    img.src = newBg
  }, [isDark, isMobile, bgSrc])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const vh = window.innerHeight
          const targetBlur = clamp((window.scrollY / vh) * MAX_BLUR, 0, MAX_BLUR)
          if (Math.abs(targetBlur - blurRef.current) > 0.1) {
            blurRef.current = targetBlur
            if (containerRef.current) {
              containerRef.current.style.filter = `blur(${targetBlur}px)`
            }
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      className="persistent-bg"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <img
        src={bgSrc}
        alt=""
        fetchPriority="high"
        className="absolute top-1/2 left-1/2"
        style={{
          width: natural.w,
          height: natural.h,
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
        }}
      />
      {nextBg && (
        <img
          src={nextBg}
          alt=""
          className={`absolute top-1/2 left-1/2 transition-opacity duration-500 ${
            showNext ? "opacity-100" : "opacity-0"
          }`}
          style={{
            width: natural.w,
            height: natural.h,
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: "center center",
          }}
        />
      )}
      <div className="absolute inset-0 bg-black/25 dark:bg-black/50" />
    </div>
  )
}
