import { useState, useEffect, useCallback, useRef } from "react"

interface UseScrollPageTransitionOptions {
  sectionIds: string[]
}

export function useScrollPageTransition({
  sectionIds,
}: UseScrollPageTransitionOptions) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<
    "down" | "up" | null
  >(null)
  const [navigating, setNavigating] = useState(false)
  const [navDirection, setNavDirection] = useState<"down" | "up" | null>(
    null
  )
  const scrollYRef = useRef(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const isNavigatingRef = useRef(false)

  const registerSection = useCallback(
    (index: number, el: HTMLElement | null) => {
      sectionRefs.current[index] = el
    },
    []
  )

  const scrollToSection = useCallback(
    (index: number) => {
      if (index < 0 || index >= sectionIds.length) return

      const dir = index > activeIndex ? "down" : "up"
      setNavDirection(dir)
      setNavigating(true)
      isNavigatingRef.current = true

      const el = sectionRefs.current[index]
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }

      setTimeout(() => {
        setNavigating(false)
        setNavDirection(null)
        isNavigatingRef.current = false
      }, 650)
    },
    [sectionIds.length, activeIndex]
  )

  useEffect(() => {
    const tickingRef = { current: false }
    const onScroll = () => {
      if (tickingRef.current) return
      tickingRef.current = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        if (y > scrollYRef.current + 8) {
          setScrollDirection("down")
        } else if (y < scrollYRef.current - 8) {
          setScrollDirection("up")
        }
        scrollYRef.current = y
        tickingRef.current = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const elements = sectionRefs.current.filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.3)

        if (visible.length > 0) {
          const sorted = [...visible].sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          )
          const id = sorted[0].target.id
          const newIndex = sectionIds.indexOf(id)
          if (newIndex >= 0 && newIndex !== activeIndex && !isNavigatingRef.current) {
            setActiveIndex(newIndex)
          }
        }
      },
      { threshold: [0.3, 0.5, 0.7] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds, activeIndex])

  return {
    activeIndex,
    scrollDirection,
    navigating,
    navDirection,
    scrollToSection,
    registerSection,
    totalSections: sectionIds.length,
  }
}