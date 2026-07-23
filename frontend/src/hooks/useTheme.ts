import { useState, useEffect, useRef } from "react"

function getInitialTheme(): boolean {
  if (typeof document === "undefined") return true
  const saved = localStorage.getItem("theme")
  if (saved) return saved === "dark"
  return document.documentElement.getAttribute("data-theme") !== "light"
}

export function useTheme(): { isDark: boolean } {
  const [isDark, setIsDark] = useState(getInitialTheme)
  const observerRef = useRef<MutationObserver | null>(null)

  useEffect(() => {
    observerRef.current = new MutationObserver(() => {
      const current = document.documentElement.getAttribute("data-theme")
      setIsDark(current !== "light")
    })

    observerRef.current.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    return () => observerRef.current?.disconnect()
  }, [])

  return { isDark }
}
