import { useState, useEffect, useRef } from "react"
import { useTheme } from "../hooks/useTheme"

import heroBgLight from "../assets/hero/hero-bg-light.webp"
import heroBgDark from "../assets/hero/hero-bg-dark.webp"
import heroObjLight from "../assets/hero/hero-object-light.png"
import heroObjDark from "../assets/hero/hero-object-dark.png"

function getInitialBg(): string {
  if (typeof localStorage === "undefined") return heroBgDark
  const saved = localStorage.getItem("theme")
  return saved === "light" ? heroBgLight : heroBgDark
}

function getInitialObj(): string {
  if (typeof localStorage === "undefined") return heroObjDark
  const saved = localStorage.getItem("theme")
  return saved === "light" ? heroObjLight : heroObjDark
}

export function Hero() {
  const { isDark } = useTheme()

  const [bgSrc, setBgSrc] = useState(getInitialBg)
  const [nextBg, setNextBg] = useState<string | null>(null)
  const [showNext, setShowNext] = useState(false)
  const [objectSrc, setObjectSrc] = useState(getInitialObj)

  const preloaded = useRef(false)

  useEffect(() => {
    const newBg = isDark ? heroBgDark : heroBgLight
    const newObj = isDark ? heroObjDark : heroObjLight

    if (newBg === bgSrc) return

    if (!preloaded.current) {
      preloaded.current = true
      const otherBg = isDark ? heroBgLight : heroBgDark
      const otherObj = isDark ? heroObjLight : heroObjDark
      ;[otherBg, otherObj].forEach((src) => {
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
  }, [isDark])

  return (
    <section className="relative min-h-screen overflow-hidden">
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

      <div className="absolute z-20 animate-float right-[6%] top-[22%] w-[140px] sm:w-[180px] lg:w-[260px] max-md:right-4 max-md:top-28 max-md:w-[100px]">
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
        <div className="w-full lg:max-w-xl pt-20 lg:ml-[10%] xl:ml-[12%]">
          <div className="bg-transparent backdrop-blur-md border border-neutral-300 rounded-xl shadow-lg overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-[10px] border-b border-neutral-300">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>

            <div className="px-5 sm:px-8 py-6 sm:py-8">
              <span className="inline-block text-accent-400 dark:text-primary-500 font-semibold tracking-[0.15em] text-xs sm:text-sm">
                CONSULTORÍA EN DESARROLLO DE SOFTWARE
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 text-neutral-500 dark:text-neutral-700 leading-tight">
                Transformamos ideas en{" "}
                <span className="text-accent-400 dark:text-primary-500">productos digitales</span>
              </h1>

              <p className="mt-5 text-neutral-500 dark:text-neutral-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                Creamos soluciones digitales escalables, intuitivas y
                optimizadas, priorizando la calidad del código, la experiencia
                de usuario y la eficiencia técnica.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
                <a
                  href="#"
                  className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-primary-700 text-white font-semibold rounded-lg text-sm sm:text-base hover:opacity-90 transition-opacity"
                >
                  Empezá tu proyecto
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-primary-700 text-primary-700 font-semibold rounded-lg text-sm sm:text-base hover:bg-primary-700 hover:text-white transition-all"
                >
                  Ver servicios
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
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
