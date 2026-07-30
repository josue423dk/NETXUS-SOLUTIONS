import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"

import heroBgLight from "../../assets/hero/hero-bg-light.webp"
import heroBgDark from "../../assets/hero/hero-bg-dark.webp"
import heroBgLightMovil from "../../assets/hero/hero-bg-light-movil.webp"
import heroBgDarkMovil from "../../assets/hero/hero-bg-dark-movil.webp"

const MOBILE_BREAKPOINT = 768

function getBgImage(isDark: boolean, isMobile: boolean): string {
  if (isMobile) return isDark ? heroBgDarkMovil : heroBgLightMovil
  return isDark ? heroBgDark : heroBgLight
}

interface HeroBackgroundProps {
  scrollProgress: number
}

export function HeroBackground({ scrollProgress }: HeroBackgroundProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [isMobile, setIsMobile] = useState(false)
  const [bgSrc, setBgSrc] = useState(heroBgDark)
  const [nextBg, setNextBg] = useState<string | null>(null)
  const [showNext, setShowNext] = useState(false)
  const preloaded = useRef(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setBgSrc(getBgImage(isDark, isMobile))
  }, [isDark, isMobile])

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

  return (
    <div className="absolute inset-0" style={{ opacity: 1 - scrollProgress, transition: "opacity 0.1s" }}>
      <picture>
        <source media="(min-width: 768px)" srcSet={isDark ? heroBgDark : heroBgLight} type="image/webp" />
        <source media="(max-width: 767px)" srcSet={isDark ? heroBgDarkMovil : heroBgLightMovil} type="image/webp" />
        <img src={bgSrc} alt="" width={1920} height={1080} fetchPriority="high"
             className="absolute inset-0 w-full h-full object-cover" />
      </picture>
      {nextBg && (
        <img src={nextBg} alt="" width={1920} height={1080}
             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showNext ? "opacity-100" : "opacity-0"}`} />
      )}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/70"
           style={{ opacity: 1 - scrollProgress, transition: "opacity 0.1s" }} />
    </div>
  )
}
