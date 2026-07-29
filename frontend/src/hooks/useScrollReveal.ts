import { useRef, useState, useEffect } from "react"

interface UseScrollRevealOptions {
  threshold?: number
}

export function useScrollReveal(options?: UseScrollRevealOptions) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const [isVisible, setIsVisible] = useState(prefersReducedMotion)
  const threshold = options?.threshold ?? 0.1

  useEffect(() => {
    if (prefersReducedMotion) return
    if (typeof IntersectionObserver === "undefined") return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, prefersReducedMotion])

  return { ref, isVisible }
}
