import { useState, useEffect, useRef } from "react"

function getInitialTheme(): boolean {
  if (typeof document === "undefined") return true
  const saved = localStorage.getItem("theme")
  if (saved) return saved === "dark"
  const attr = document.documentElement.getAttribute("data-theme")
  if (attr === "light") return false
  if (attr === "dark") return true
  return window.matchMedia("(prefers-color-scheme: dark)").matches
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
