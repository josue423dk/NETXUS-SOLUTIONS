import { useRef, useEffect } from "react"

interface AccordionItemProps {
  pregunta: string
  respuesta: string
  index: number
  abierto: boolean
  onToggle: () => void
  onKeyNavigation: (direction: "up" | "down" | "home" | "end") => void
}

export function AccordionItem({
  pregunta,
  respuesta,
  index,
  abierto,
  onToggle,
  onKeyNavigation,
}: AccordionItemProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!abierto) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target !== buttonRef.current) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          onKeyNavigation("down")
          break
        case "ArrowUp":
          e.preventDefault()
          onKeyNavigation("up")
          break
        case "Home":
          e.preventDefault()
          onKeyNavigation("home")
          break
        case "End":
          e.preventDefault()
          onKeyNavigation("end")
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [abierto, onKeyNavigation])

  const questionId = `faq-question-${index}`
  const answerId = `faq-answer-${index}`

  return (
    <div className="border-b border-neutral-300/50 dark:border-neutral-300/30">
      <button
        ref={buttonRef}
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left hover:bg-neutral-300/10 dark:hover:bg-neutral-300/10 transition-colors duration-200 -mx-1 px-1 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-700/50 dark:focus-visible:ring-primary-500/50"
        aria-expanded={abierto}
        aria-controls={answerId}
        id={questionId}
        tabIndex={0}
      >
        <span className="font-heading font-medium text-primary-900 dark:text-neutral-900 pr-4">
          {pregunta}
        </span>
        <svg
          className={`w-5 h-5 text-neutral-500 dark:text-neutral-500 flex-shrink-0 transition-transform duration-300 ease-out ${
            abierto ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        role="region"
        aria-labelledby={questionId}
        id={answerId}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: abierto ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden min-h-0">
          <div
            className={`px-1 pb-5 transition-opacity duration-300 ease-out ${
              abierto ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-sm text-neutral-700 dark:text-neutral-700 leading-relaxed">
              {respuesta}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
