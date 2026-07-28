import { useState, useCallback } from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { faqs } from "../data/faqs"
import { AccordionItem } from "../components/ui/AccordionItem"

export function PreguntasFrecuentes() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { ref, isVisible } = useScrollReveal()

  const handleKeyNavigation = useCallback(
    (direction: "up" | "down" | "home" | "end") => {
      const total = faqs.length
      if (total === 0) return

      let nextIndex: number

      switch (direction) {
        case "down":
          nextIndex = openIndex === null ? 0 : (openIndex + 1) % total
          break
        case "up":
          nextIndex = openIndex === null ? total - 1 : (openIndex - 1 + total) % total
          break
        case "home":
          nextIndex = 0
          break
        case "end":
          nextIndex = total - 1
          break
      }

      setOpenIndex(nextIndex)

      requestAnimationFrame(() => {
        const button = document.getElementById(`faq-question-${nextIndex}`)
        button?.focus()
      })
    },
    [openIndex]
  )

  return (
    <section className="py-24 sm:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-accent-400 font-accent tracking-[0.2em] text-sm uppercase">
            FAQ
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-900 leading-tight">
            Preguntas frecuentes
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-700 max-w-xl mx-auto leading-relaxed">
            Respuestas a las dudas más comunes sobre nuestros servicios y
            proceso de trabajo.
          </p>
        </div>

        <div
          ref={ref}
          className={`rounded-md border border-neutral-300/50 dark:border-neutral-300/30 shadow-md px-6 bg-neutral-50 dark:bg-neutral-100 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          role="region"
          aria-label="Preguntas frecuentes"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              pregunta={faq.pregunta}
              respuesta={faq.respuesta}
              index={i}
              abierto={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              onKeyNavigation={handleKeyNavigation}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
