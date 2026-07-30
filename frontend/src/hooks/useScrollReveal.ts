import { useRef, useState, useEffect } from "react"

interface UseScrollRevealOptions {
  threshold?: number
}

export function useScrollReveal(options?: UseScrollRevealOptions) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: options?.threshold ?? 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options?.threshold])

  return { ref, isVisible }
}
