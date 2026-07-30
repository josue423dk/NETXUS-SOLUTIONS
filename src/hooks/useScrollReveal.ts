import { useRef, useState, useEffect } from "react"

const observerMap = new Map<Element, (isIntersecting: boolean) => void>()

let sharedObserver: IntersectionObserver | null = null

function getSharedObserver(threshold: number): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const callback = observerMap.get(entry.target)
          callback?.(entry.isIntersecting)
        }
      },
      { threshold }
    )
  }
  return sharedObserver
}

interface UseScrollRevealOptions {
  threshold?: number
}

export function useScrollReveal(options?: UseScrollRevealOptions) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const threshold = options?.threshold ?? 0.1

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = getSharedObserver(threshold)
    observerMap.set(el, setIsVisible)
    observer.observe(el)

    return () => {
      observer.unobserve(el)
      observerMap.delete(el)
    }
  }, [threshold])

  return { ref, isVisible }
}
